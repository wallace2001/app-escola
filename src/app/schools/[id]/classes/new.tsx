import { useLocalSearchParams, useRouter } from 'expo-router';

import { FormScreen } from '@/components/form-screen';
import type { SchoolClassInput } from '@/domain/school-class';
import { ClassForm } from '@/features/classes/components/class-form';
import { useCreateClass } from '@/features/classes/hooks/use-class-mutations';
import { useAppToast } from '@/hooks/use-app-toast';
import { getErrorMessage } from '@/lib/http';

export default function NewClassScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toast = useAppToast();
  const createClass = useCreateClass(id);

  function handleSubmit(values: SchoolClassInput) {
    createClass.mutate(values, {
      onSuccess: (schoolClass) => {
        toast.success('Turma cadastrada', `${schoolClass.name} foi adicionada à escola.`);
        router.back();
      },
      onError: (error) => toast.error('Não foi possível cadastrar', getErrorMessage(error)),
    });
  }

  return (
    <FormScreen>
      <ClassForm
        submitLabel="Cadastrar turma"
        isSubmitting={createClass.isPending}
        onSubmit={handleSubmit}
      />
    </FormScreen>
  );
}
