import { pluralize } from '../format';

describe('pluralize', () => {
  it('usa singular para 1', () => {
    expect(pluralize(1, 'turma', 'turmas')).toBe('1 turma');
  });

  it('usa plural para 0 e para mais de 1', () => {
    expect(pluralize(0, 'turma', 'turmas')).toBe('0 turmas');
    expect(pluralize(3, 'turma', 'turmas')).toBe('3 turmas');
  });
});
