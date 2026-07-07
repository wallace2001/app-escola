import { schoolSchema } from '../school';

describe('schoolSchema', () => {
  it('aceita dados válidos e remove espaços das pontas', () => {
    const result = schoolSchema.parse({
      name: '  EMEF Central  ',
      address: 'Rua A, 10 - Centro',
    });

    expect(result).toEqual({ name: 'EMEF Central', address: 'Rua A, 10 - Centro' });
  });

  it('rejeita nome com menos de 3 caracteres', () => {
    const result = schoolSchema.safeParse({ name: 'AB', address: 'Rua A, 10 - Centro' });

    expect(result.success).toBe(false);
  });

  it('rejeita endereço vazio', () => {
    const result = schoolSchema.safeParse({ name: 'EMEF Central', address: '' });

    expect(result.success).toBe(false);
  });

  it('rejeita payload sem os campos obrigatórios', () => {
    const result = schoolSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toEqual(expect.arrayContaining(['name', 'address']));
    }
  });
});
