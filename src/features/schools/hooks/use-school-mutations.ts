import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SchoolInput } from '@/domain/school';
import { classKeys, schoolKeys } from '@/lib/query-keys';
import { schoolsRepository } from '@/repositories/schools-repository';

export function useCreateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SchoolInput) => schoolsRepository.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: schoolKeys.lists() }),
  });
}

export function useUpdateSchool(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SchoolInput) => schoolsRepository.update(id, input),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: schoolKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: schoolKeys.detail(id) }),
      ]),
  });
}

export function useDeleteSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => schoolsRepository.remove(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: schoolKeys.detail(id) });
      queryClient.removeQueries({ queryKey: classKeys.listBySchool(id) });
      return queryClient.invalidateQueries({ queryKey: schoolKeys.lists() });
    },
  });
}
