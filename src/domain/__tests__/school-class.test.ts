import { SHIFTS, SHIFT_LABELS, schoolClassSchema } from '../school-class';

describe('schoolClassSchema', () => {
  const validClass = { name: '1º Ano A', shift: 'morning', year: 2026 };

  it('aceita uma turma válida', () => {
    expect(schoolClassSchema.safeParse(validClass).success).toBe(true);
  });

  it('rejeita turno fora da lista', () => {
    const result = schoolClassSchema.safeParse({ ...validClass, shift: 'madrugada' });

    expect(result.success).toBe(false);
  });

  it('rejeita ano letivo fora do intervalo', () => {
    expect(schoolClassSchema.safeParse({ ...validClass, year: 1990 }).success).toBe(false);
    expect(schoolClassSchema.safeParse({ ...validClass, year: 2150 }).success).toBe(false);
  });

  it('rejeita nome vazio', () => {
    expect(schoolClassSchema.safeParse({ ...validClass, name: '   ' }).success).toBe(false);
  });

  it('tem rótulo em português para todos os turnos', () => {
    for (const shift of SHIFTS) {
      expect(SHIFT_LABELS[shift]).toBeTruthy();
    }
  });
});
