import { useLocalSearchParams, useRouter } from 'expo-router';

import { ErrorState } from '@/components/error-state';
import { FormScreen } from '@/components/form-screen';
import { LoadingState } from '@/components/loading-state';
import { Box } from '@/components/ui/box';
import type { SchoolClassInput } from '@/domain/school-class';
import { ClassForm } from '@/features/classes/components/class-form';
import { useClass } from '@/features/classes/hooks/use-classes';
import { useUpdateClass } from '@/features/classes/hooks/use-class-mutations';
import { useAppToast } from '@/hooks/use-app-toast';
import { getErrorMessage } from '@/lib/http';

export default function EditClassScreen() {
  const { id, classId } = useLocalSearchParams<{ id: string; classId: string }>();
  const router = useRouter();
  const toast = useAppToast();

  const { data: schoolClass, isPending, isError, error, refetch } = useClass(classId);
  const updateClass = useUpdateClass(classId, id);

  function handleSubmit(values: SchoolClassInput) {
    updateClass.mutate(values, {
      onSuccess: () => {
        toast.success('Alterações salvas');
        router.back();
      },
      onError: (error) => toast.error('Não foi possível salvar', getErrorMessage(error)),
    });
  }

  if (isPending) {
    return (
      <Box className="flex-1 bg-background">
        <LoadingState label="Carregando turma..." />
      </Box>
    );
  }

  if (isError || !schoolClass) {
    return (
      <Box className="flex-1 bg-background">
        <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />
      </Box>
    );
  }

  return (
    <FormScreen>
      <ClassForm
        defaultValues={{
          name: schoolClass.name,
          shift: schoolClass.shift,
          year: schoolClass.year,
        }}
        submitLabel="Salvar alterações"
        isSubmitting={updateClass.isPending}
        onSubmit={handleSubmit}
      />
    </FormScreen>
  );
}
