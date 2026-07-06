import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SchoolClassInput } from '@/domain/school-class';
import { classKeys, schoolKeys } from '@/lib/query-keys';
import { classesRepository } from '@/repositories/classes-repository';

// o total de turmas aparece na listagem e no detalhe da escola,
// então mutações de turma também invalidam os dados de escola
function useInvalidateClassData() {
  const queryClient = useQueryClient();

  return (schoolId: string) =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: classKeys.listBySchool(schoolId) }),
      queryClient.invalidateQueries({ queryKey: schoolKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: schoolKeys.detail(schoolId) }),
    ]);
}

export function useCreateClass(schoolId: string) {
  const invalidate = useInvalidateClassData();

  return useMutation({
    mutationFn: (input: SchoolClassInput) => classesRepository.create(schoolId, input),
    onSuccess: () => invalidate(schoolId),
  });
}

export function useUpdateClass(id: string, schoolId: string) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateClassData();

  return useMutation({
    mutationFn: (input: SchoolClassInput) => classesRepository.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.detail(id) });
      return invalidate(schoolId);
    },
  });
}

export function useDeleteClass(schoolId: string) {
  const invalidate = useInvalidateClassData();

  return useMutation({
    mutationFn: (id: string) => classesRepository.remove(id),
    onSuccess: () => invalidate(schoolId),
  });
}
