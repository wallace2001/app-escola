import { classFormSchema, toSchoolClassInput } from '../class-form-schema';

describe('classFormSchema', () => {
  it('aceita o ano como texto de 4 dígitos', () => {
    const result = classFormSchema.safeParse({ name: '1º Ano A', shift: 'morning', year: '2026' });

    expect(result.success).toBe(true);
  });

  it('rejeita ano em formato inválido', () => {
    expect(classFormSchema.safeParse({ name: '1º Ano A', shift: 'morning', year: '26' }).success).toBe(false);
    expect(classFormSchema.safeParse({ name: '1º Ano A', shift: 'morning', year: 'abcd' }).success).toBe(false);
  });

  it('exige a seleção de um turno', () => {
    const result = classFormSchema.safeParse({ name: '1º Ano A', year: '2026' });

    expect(result.success).toBe(false);
  });
});

describe('toSchoolClassInput', () => {
  it('converte o ano para número', () => {
    expect(toSchoolClassInput({ name: '1º Ano A', shift: 'evening', year: '2026' })).toEqual({
      name: '1º Ano A',
      shift: 'evening',
      year: 2026,
    });
  });
});
