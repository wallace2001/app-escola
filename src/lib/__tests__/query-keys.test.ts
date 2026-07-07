import { classKeys, schoolKeys } from '../query-keys';

describe('schoolKeys', () => {
  it('deriva a hierarquia a partir de all', () => {
    expect(schoolKeys.all).toEqual(['schools']);
    expect(schoolKeys.lists()).toEqual(['schools', 'list']);
    expect(schoolKeys.list('cora')).toEqual(['schools', 'list', { search: 'cora' }]);
    expect(schoolKeys.detail('1')).toEqual(['schools', 'detail', '1']);
  });

  it('a chave de lista é prefixada por lists() (invalidação em cascata)', () => {
    expect(schoolKeys.list('qualquer').slice(0, 2)).toEqual(schoolKeys.lists());
  });
});

describe('classKeys', () => {
  it('listBySchool e list compartilham o mesmo prefixo', () => {
    expect(classKeys.listBySchool('s1')).toEqual(['classes', 'list', 's1']);
    const list = classKeys.list('s1', { shift: 'morning' });
    expect(list.slice(0, 3)).toEqual(classKeys.listBySchool('s1'));
  });

  it('turmas de escolas diferentes geram chaves diferentes', () => {
    expect(classKeys.listBySchool('s1')).not.toEqual(classKeys.listBySchool('s2'));
  });
});
