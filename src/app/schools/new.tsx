import { useRouter } from 'expo-router';

import { FormScreen } from '@/components/form-screen';
import type { SchoolInput } from '@/domain/school';
import { SchoolForm } from '@/features/schools/components/school-form';
import { useCreateSchool } from '@/features/schools/hooks/use-school-mutations';
import { useAppToast } from '@/hooks/use-app-toast';
import { getErrorMessage } from '@/lib/http';

export default function NewSchoolScreen() {
  const router = useRouter();
  const toast = useAppToast();
  const createSchool = useCreateSchool();

  function handleSubmit(values: SchoolInput) {
    createSchool.mutate(values, {
      onSuccess: (school) => {
        toast.success('Escola cadastrada', `${school.name} foi adicionada à rede.`);
        router.back();
      },
      onError: (error) => toast.error('Não foi possível cadastrar', getErrorMessage(error)),
    });
  }

  return (
    <FormScreen>
      <SchoolForm
        submitLabel="Cadastrar escola"
        isSubmitting={createSchool.isPending}
        onSubmit={handleSubmit}
      />
    </FormScreen>
  );
}
