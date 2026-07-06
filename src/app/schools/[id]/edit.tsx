import { useLocalSearchParams, useRouter } from 'expo-router';

import { ErrorState } from '@/components/error-state';
import { FormScreen } from '@/components/form-screen';
import { LoadingState } from '@/components/loading-state';
import { Box } from '@/components/ui/box';
import type { SchoolInput } from '@/domain/school';
import { SchoolForm } from '@/features/schools/components/school-form';
import { useSchool } from '@/features/schools/hooks/use-schools';
import { useUpdateSchool } from '@/features/schools/hooks/use-school-mutations';
import { useAppToast } from '@/hooks/use-app-toast';
import { getErrorMessage } from '@/lib/http';

export default function EditSchoolScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toast = useAppToast();

  const { data: school, isPending, isError, error, refetch } = useSchool(id);
  const updateSchool = useUpdateSchool(id);

  function handleSubmit(values: SchoolInput) {
    updateSchool.mutate(values, {
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
        <LoadingState label="Carregando escola..." />
      </Box>
    );
  }

  if (isError || !school) {
    return (
      <Box className="flex-1 bg-background">
        <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />
      </Box>
    );
  }

  return (
    <FormScreen>
      <SchoolForm
        defaultValues={{ name: school.name, address: school.address }}
        submitLabel="Salvar alterações"
        isSubmitting={updateSchool.isPending}
        onSubmit={handleSubmit}
      />
    </FormScreen>
  );
}
