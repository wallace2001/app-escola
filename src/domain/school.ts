import { z } from 'zod';

export const schoolSchema = z.object({
  name: z
    .string('Informe o nome da escola')
    .trim()
    .min(3, 'O nome precisa ter pelo menos 3 caracteres')
    .max(120, 'O nome pode ter no máximo 120 caracteres'),
  address: z
    .string('Informe o endereço')
    .trim()
    .min(5, 'Informe o endereço completo')
    .max(200, 'O endereço pode ter no máximo 200 caracteres'),
});

export type SchoolInput = z.infer<typeof schoolSchema>;

export interface School extends SchoolInput {
  id: string;
  classesCount: number;
  createdAt: string;
}
