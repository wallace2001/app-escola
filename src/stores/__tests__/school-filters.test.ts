import { useSchoolFilters } from '../school-filters';

describe('useSchoolFilters', () => {
  beforeEach(() => {
    useSchoolFilters.getState().clearSearch();
  });

  it('atualiza o termo de busca', () => {
    useSchoolFilters.getState().setSearch('cora');

    expect(useSchoolFilters.getState().search).toBe('cora');
  });

  it('limpa o termo de busca', () => {
    useSchoolFilters.getState().setSearch('cora');
    useSchoolFilters.getState().clearSearch();

    expect(useSchoolFilters.getState().search).toBe('');
  });
});
