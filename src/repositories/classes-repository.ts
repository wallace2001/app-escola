import type { SchoolClass, SchoolClassInput } from '@/domain/school-class';
import { buildQuery, http } from '@/lib/http';
import type { ClassListFilters } from '@/lib/query-keys';

export const classesRepository = {
  listBySchool: (schoolId: string, filters: ClassListFilters = {}) =>
    http.get<SchoolClass[]>(
      `/classes${buildQuery({
        schoolId,
        q: filters.search,
        shift: filters.shift === 'all' ? undefined : filters.shift,
      })}`,
    ),

  getById: (id: string) => http.get<SchoolClass>(`/classes/${id}`),

  create: (schoolId: string, input: SchoolClassInput) =>
    http.post<SchoolClass>('/classes', { ...input, schoolId }),

  update: (id: string, input: SchoolClassInput) =>
    http.put<SchoolClass>(`/classes/${id}`, input),

  remove: (id: string) => http.delete(`/classes/${id}`),
};
