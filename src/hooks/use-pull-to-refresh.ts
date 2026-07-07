import { useState } from 'react';

/**
 * Controla o RefreshControl a partir de um gesto explícito do usuário.
 *
 * O `refreshing` fica ligado apenas durante o pull-to-refresh e desliga quando o
 * refetch termina. Ligar o RefreshControl diretamente no `isFetching`/`isRefetching`
 * do React Query faz o spinner aparecer (e, no iOS, ficar preso) em refetches de
 * segundo plano disparados por invalidação de cache.
 */
export function usePullToRefresh(refetch: () => Promise<unknown>) {
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  return { refreshing, onRefresh };
}
