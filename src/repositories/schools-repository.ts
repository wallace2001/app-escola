import type { School, SchoolInput } from '@/domain/school';
import { buildQuery, http } from '@/lib/http';

export const schoolsRepository = {
  list: (filters: { search?: string } = {}) =>
    http.get<School[]>(`/schools${buildQuery({ q: filters.search })}`),

  getById: (id: string) => http.get<School>(`/schools/${id}`),

  create: (input: SchoolInput) => http.post<School>('/schools', input),

  update: (id: string, input: SchoolInput) => http.put<School>(`/schools/${id}`, input),

  remove: (id: string) => http.delete(`/schools/${id}`),
};
