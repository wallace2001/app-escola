import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { ClassListFilters } from '@/lib/query-keys';
import { classKeys } from '@/lib/query-keys';
import { classesRepository } from '@/repositories/classes-repository';

export function useClasses(schoolId: string, filters: ClassListFilters) {
  return useQuery({
    queryKey: classKeys.list(schoolId, filters),
    queryFn: () => classesRepository.listBySchool(schoolId, filters),
    enabled: schoolId.length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useClass(id: string) {
  return useQuery({
    queryKey: classKeys.detail(id),
    queryFn: () => classesRepository.getById(id),
    enabled: id.length > 0,
  });
}
