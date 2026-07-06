import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ChipGroup } from '@/components/chip-group';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import {
  SHIFT_OPTIONS,
  schoolClassSchema,
  type SchoolClassInput,
} from '@/domain/school-class';

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

interface ClassFormProps {
  defaultValues?: SchoolClassInput;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: SchoolClassInput) => void;
}

export function ClassForm({ defaultValues, submitLabel, isSubmitting, onSubmit }: ClassFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: defaultValues
      ? { ...defaultValues, year: String(defaultValues.year) }
      : { name: '', shift: undefined, year: String(new Date().getFullYear()) },
  });

  function submit(values: ClassFormValues) {
    onSubmit(toSchoolClassInput(values));
  }

  return (
    <VStack className="gap-5">
      <FormControl isInvalid={Boolean(errors.name)} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Nome da turma</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input>
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ex.: 1º Ano A"
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.shift)} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Turno</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="shift"
          render={({ field: { value, onChange } }) => (
            <ChipGroup options={SHIFT_OPTIONS} value={value} onChange={onChange} />
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.shift?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.year)} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Ano letivo</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="year"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input>
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ex.: 2026"
                keyboardType="number-pad"
                maxLength={4}
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.year?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button size="lg" className="mt-2" onPress={handleSubmit(submit)} isDisabled={isSubmitting}>
        {isSubmitting ? <ButtonSpinner /> : null}
        <ButtonText>{submitLabel}</ButtonText>
      </Button>
    </VStack>
  );
}
