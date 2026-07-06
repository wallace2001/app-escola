import { z } from 'zod';

export const SHIFTS = ['morning', 'afternoon', 'evening', 'full_time'] as const;

export type Shift = (typeof SHIFTS)[number];

export const SHIFT_LABELS: Record<Shift, string> = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  evening: 'Noite',
  full_time: 'Integral',
};

export const SHIFT_OPTIONS = SHIFTS.map((shift) => ({
  value: shift,
  label: SHIFT_LABELS[shift],
}));

export const schoolClassSchema = z.object({
  name: z
    .string('Informe o nome da turma')
    .trim()
    .min(1, 'Informe o nome da turma')
    .max(60, 'O nome pode ter no máximo 60 caracteres'),
  shift: z.enum(SHIFTS, 'Selecione um turno'),
  year: z
    .number('Informe o ano letivo')
    .int('O ano letivo precisa ser um número inteiro')
    .min(2000, 'Ano letivo inválido')
    .max(2100, 'Ano letivo inválido'),
});

export type SchoolClassInput = z.infer<typeof schoolClassSchema>;

export interface SchoolClass extends SchoolClassInput {
  id: string;
  schoolId: string;
}
