import { z } from 'zod';

import { schoolClassSchema, type SchoolClassInput } from '@/domain/school-class';

// no formulário o ano é digitado como texto; a conversão para número
// acontece no submit, depois de validado o formato
export const classFormSchema = schoolClassSchema.extend({
  year: z
    .string('Informe o ano letivo')
    .regex(/^\d{4}$/, 'Use o formato de 4 dígitos, ex.: 2026'),
});

export type ClassFormValues = z.infer<typeof classFormSchema>;

export function toSchoolClassInput(values: ClassFormValues): SchoolClassInput {
  return { ...values, year: Number(values.year) };
}
