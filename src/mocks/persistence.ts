import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@app-escola/db';

export interface DbSnapshot {
  schools: Record<string, unknown>[];
  classes: Record<string, unknown>[];
}

function isValidSnapshot(value: unknown): value is DbSnapshot {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as Partial<DbSnapshot>;
  return Array.isArray(snapshot.schools) && Array.isArray(snapshot.classes);
}

export async function loadSnapshot(): Promise<DbSnapshot | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isValidSnapshot(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function persistSnapshot(dump: () => DbSnapshot) {
  // Grava na hora: um debounce aqui perderia a escrita se o app recarregasse
  // logo após uma mutação (ex.: excluir uma escola e recarregar em seguida).
  let raw: string;
  try {
    raw = JSON.stringify(dump());
  } catch {
    return;
  }
  AsyncStorage.setItem(STORAGE_KEY, raw).catch(() => {});
}

export async function clearSnapshot() {
  await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
}
