import type { Shift } from '@/domain/school-class';

export interface ClassListFilters {
  search?: string;
  shift?: Shift | 'all';
}

export const schoolKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolKeys.all, 'list'] as const,
  list: (search: string) => [...schoolKeys.lists(), { search }] as const,
  details: () => [...schoolKeys.all, 'detail'] as const,
  detail: (id: string) => [...schoolKeys.details(), id] as const,
};

export const classKeys = {
  all: ['classes'] as const,
  lists: () => [...classKeys.all, 'list'] as const,
  listBySchool: (schoolId: string) => [...classKeys.lists(), schoolId] as const,
  list: (schoolId: string, filters: ClassListFilters) =>
    [...classKeys.listBySchool(schoolId), filters] as const,
  details: () => [...classKeys.all, 'detail'] as const,
  detail: (id: string) => [...classKeys.details(), id] as const,
};
