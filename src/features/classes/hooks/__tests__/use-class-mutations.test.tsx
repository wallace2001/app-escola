import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { classKeys, schoolKeys } from '@/lib/query-keys';

import { useCreateClass, useDeleteClass, useUpdateClass } from '../use-class-mutations';

jest.mock('@/repositories/classes-repository', () => ({
  classesRepository: {
    create: jest.fn().mockResolvedValue({ id: 'c1' }),
    update: jest.fn().mockResolvedValue({ id: 'c1' }),
    remove: jest.fn().mockResolvedValue(undefined),
  },
}));

function setup() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });
  const invalidate = jest.spyOn(queryClient, 'invalidateQueries').mockResolvedValue();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { invalidate, wrapper };
}

const input = { name: '1º Ano A', shift: 'morning', year: 2026 } as const;

describe('useCreateClass', () => {
  it('invalida as turmas da escola e os dados de escola no sucesso', async () => {
    const { invalidate, wrapper } = setup();
    const { result } = renderHook(() => useCreateClass('s1'), { wrapper });

    result.current.mutate(input);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidate).toHaveBeenCalledWith({ queryKey: classKeys.listBySchool('s1') });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: schoolKeys.lists() });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: schoolKeys.detail('s1') });
  });
});

describe('useUpdateClass', () => {
  it('invalida também o detalhe da turma editada', async () => {
    const { invalidate, wrapper } = setup();
    const { result } = renderHook(() => useUpdateClass('c1', 's1'), { wrapper });

    result.current.mutate(input);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidate).toHaveBeenCalledWith({ queryKey: classKeys.detail('c1') });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: schoolKeys.detail('s1') });
  });
});

describe('useDeleteClass', () => {
  it('invalida os dados após remover', async () => {
    const { invalidate, wrapper } = setup();
    const { result } = renderHook(() => useDeleteClass('s1'), { wrapper });

    result.current.mutate('c1');
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidate).toHaveBeenCalledWith({ queryKey: classKeys.listBySchool('s1') });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: schoolKeys.lists() });
  });
});
