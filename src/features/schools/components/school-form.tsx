import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

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
import { schoolSchema, type SchoolInput } from '@/domain/school';

interface SchoolFormProps {
  defaultValues?: SchoolInput;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: SchoolInput) => void;
}

export function SchoolForm({ defaultValues, submitLabel, isSubmitting, onSubmit }: SchoolFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolInput>({
    resolver: zodResolver(schoolSchema),
    defaultValues: defaultValues ?? { name: '', address: '' },
  });

  return (
    <VStack className="gap-5">
      <FormControl isInvalid={Boolean(errors.name)} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Nome da escola</FormControlLabelText>
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
                placeholder="Ex.: EMEF Monteiro Lobato"
                autoCapitalize="words"
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.name?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.address)} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Endereço</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input>
              <InputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ex.: Rua das Palmeiras, 45 - Centro"
              />
            </Input>
          )}
        />
        <FormControlError>
          <FormControlErrorText>{errors.address?.message}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button size="lg" className="mt-2" onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        {isSubmitting ? <ButtonSpinner /> : null}
        <ButtonText>{submitLabel}</ButtonText>
      </Button>
    </VStack>
  );
}
