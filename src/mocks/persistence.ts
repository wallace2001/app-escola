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

let persistTimer: ReturnType<typeof setTimeout> | undefined;

export function schedulePersist(dump: () => DbSnapshot) {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dump())).catch(() => {});
  }, 250);
}

export async function clearSnapshot() {
  clearTimeout(persistTimer);
  await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
}
