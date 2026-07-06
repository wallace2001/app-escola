import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { schoolKeys } from '@/lib/query-keys';
import { schoolsRepository } from '@/repositories/schools-repository';

export function useSchools(search: string) {
  return useQuery({
    queryKey: schoolKeys.list(search),
    queryFn: () => schoolsRepository.list({ search }),
    placeholderData: keepPreviousData,
  });
}

export function useSchool(id: string) {
  return useQuery({
    queryKey: schoolKeys.detail(id),
    queryFn: () => schoolsRepository.getById(id),
    enabled: id.length > 0,
  });
}
