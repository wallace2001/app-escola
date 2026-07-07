import { http } from '@/lib/http';

import { classesRepository } from '../classes-repository';

jest.mock('@/lib/http', () => {
  const actual = jest.requireActual('@/lib/http');
  return {
    ...actual,
    http: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
  };
});

describe('classesRepository', () => {
  beforeEach(() => jest.clearAllMocks());

  it('listBySchool monta a URL com schoolId, busca e turno', () => {
    classesRepository.listBySchool('s1', { search: 'ana', shift: 'morning' });

    expect(http.get).toHaveBeenCalledWith('/classes?schoolId=s1&q=ana&shift=morning');
  });

  it('não envia o turno quando o filtro é "all"', () => {
    classesRepository.listBySchool('s1', { shift: 'all' });

    expect(http.get).toHaveBeenCalledWith('/classes?schoolId=s1');
  });

  it('create injeta o schoolId no corpo', () => {
    classesRepository.create('s1', { name: '1º Ano A', shift: 'morning', year: 2026 });

    expect(http.post).toHaveBeenCalledWith('/classes', {
      name: '1º Ano A',
      shift: 'morning',
      year: 2026,
      schoolId: 's1',
    });
  });

  it('remove chama o endpoint com o id', () => {
    classesRepository.remove('c9');

    expect(http.delete).toHaveBeenCalledWith('/classes/c9');
  });
});
