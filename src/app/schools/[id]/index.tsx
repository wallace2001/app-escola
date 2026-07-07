import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Pencil, Plus, Trash2, Users } from 'lucide-react-native';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChipGroup, type ChipOption } from '@/components/chip-group';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { SearchField } from '@/components/search-field';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SHIFT_OPTIONS, type SchoolClass, type Shift } from '@/domain/school-class';
import { ClassCard } from '@/features/classes/components/class-card';
import { useClasses } from '@/features/classes/hooks/use-classes';
import { useDeleteClass } from '@/features/classes/hooks/use-class-mutations';
import { useSchool } from '@/features/schools/hooks/use-schools';
import { useDeleteSchool } from '@/features/schools/hooks/use-school-mutations';
import { useAppToast } from '@/hooks/use-app-toast';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { pluralize } from '@/lib/format';
import { getErrorMessage } from '@/lib/http';
import { useSchoolFilters } from '@/stores/school-filters';

const CLASS_FILTER_OPTIONS: readonly ChipOption<Shift | 'all'>[] = [
  { value: 'all', label: 'Todos' },
  ...SHIFT_OPTIONS,
];

export default function SchoolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const toast = useAppToast();

  const clearSchoolSearch = useSchoolFilters((state) => state.clearSearch);

  const schoolQuery = useSchool(id);
  const school = schoolQuery.data;

  const [classSearch, setClassSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState<Shift | 'all'>('all');
  const debouncedClassSearch = useDebouncedValue(classSearch.trim());
  const hasActiveFilters = debouncedClassSearch.length > 0 || shiftFilter !== 'all';

  const classesQuery = useClasses(id, { search: debouncedClassSearch, shift: shiftFilter });
  const classes = classesQuery.data ?? [];

  const { refreshing, onRefresh } = usePullToRefresh(() =>
    Promise.all([schoolQuery.refetch(), classesQuery.refetch()]),
  );

  const deleteSchool = useDeleteSchool();
  const deleteClass = useDeleteClass(id);

  const [isConfirmingSchoolDelete, setIsConfirmingSchoolDelete] = useState(false);
  const [classPendingDelete, setClassPendingDelete] = useState<SchoolClass | null>(null);

  function handleDeleteSchool() {
    deleteSchool.mutate(id, {
      onSuccess: () => {
        setIsConfirmingSchoolDelete(false);
        toast.success('Escola excluída');
        clearSchoolSearch();
        router.back();
      },
      onError: (error) => {
        setIsConfirmingSchoolDelete(false);
        toast.error('Não foi possível excluir', getErrorMessage(error));
      },
    });
  }

  function handleDeleteClass() {
    if (!classPendingDelete) return;

    deleteClass.mutate(classPendingDelete.id, {
      onSuccess: () => {
        setClassPendingDelete(null);
        toast.success('Turma excluída');
      },
      onError: (error) => {
        setClassPendingDelete(null);
        toast.error('Não foi possível excluir', getErrorMessage(error));
      },
    });
  }

  if (schoolQuery.isPending) {
    return (
      <Box className="flex-1 bg-background">
        <LoadingState label="Carregando escola..." />
      </Box>
    );
  }

  if (schoolQuery.isError || !school) {
    return (
      <Box className="flex-1 bg-background">
        <ErrorState
          message={getErrorMessage(schoolQuery.error)}
          onRetry={() => schoolQuery.refetch()}
        />
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: school.name,
          headerRight: () => (
            <HStack className="gap-1">
              <Button
                variant="ghost"
                size="icon"
                onPress={() => router.push(`/schools/${id}/edit`)}
                accessibilityLabel="Editar escola"
              >
                <ButtonIcon as={Pencil} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onPress={() => setIsConfirmingSchoolDelete(true)}
                accessibilityLabel="Excluir escola"
              >
                <ButtonIcon as={Trash2} className="text-destructive" />
              </Button>
            </HStack>
          ),
        }}
      />

      <FlashList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box className="px-4 pb-3">
            <ClassCard
              schoolClass={item}
              onEdit={() => router.push(`/schools/${id}/classes/${item.id}/edit`)}
              onDelete={() => setClassPendingDelete(item)}
            />
          </Box>
        )}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <VStack className="gap-4 p-4">
            <Card className="gap-3">
              <HStack className="items-center gap-2">
                <Icon as={MapPin} size="sm" className="text-muted-foreground" />
                <Text size="sm" className="flex-1 text-muted-foreground">
                  {school.address}
                </Text>
              </HStack>
              <HStack className="items-center gap-2">
                <Icon as={Users} size="sm" className="text-muted-foreground" />
                <Text size="sm" className="text-muted-foreground">
                  {pluralize(school.classesCount, 'turma cadastrada', 'turmas cadastradas')}
                </Text>
              </HStack>
            </Card>

            <VStack className="gap-3">
              <Heading size="md">Turmas</Heading>
              <SearchField
                value={classSearch}
                onChangeText={setClassSearch}
                placeholder="Buscar turma"
              />
              <ChipGroup
                options={CLASS_FILTER_OPTIONS}
                value={shiftFilter}
                onChange={setShiftFilter}
              />
            </VStack>
          </VStack>
        }
        ListEmptyComponent={
          classesQuery.isPending ? (
            <LoadingState label="Carregando turmas..." />
          ) : classesQuery.isError ? (
            <ErrorState
              message={getErrorMessage(classesQuery.error)}
              onRetry={() => classesQuery.refetch()}
            />
          ) : hasActiveFilters ? (
            <EmptyState
              icon={Users}
              title="Nenhuma turma encontrada"
              description="Ajuste a busca ou o filtro de turno."
            />
          ) : (
            <EmptyState
              icon={Users}
              title="Nenhuma turma cadastrada"
              description="Cadastre a primeira turma desta escola."
              action={
                <Button onPress={() => router.push(`/schools/${id}/classes/new`)}>
                  <ButtonIcon as={Plus} />
                  <ButtonText>Cadastrar turma</ButtonText>
                </Button>
              }
            />
          )
        }
      />

      <Fab
        size="lg"
        placement="bottom right"
        onPress={() => router.push(`/schools/${id}/classes/new`)}
        style={{ marginBottom: insets.bottom }}
        accessibilityLabel="Cadastrar nova turma"
      >
        <FabIcon as={Plus} />
        <FabLabel>Nova turma</FabLabel>
      </Fab>

      <ConfirmDialog
        isOpen={isConfirmingSchoolDelete}
        title="Excluir escola"
        description={`Excluir "${school.name}" também remove todas as turmas vinculadas. Essa ação não pode ser desfeita.`}
        isConfirming={deleteSchool.isPending}
        onConfirm={handleDeleteSchool}
        onCancel={() => setIsConfirmingSchoolDelete(false)}
      />

      <ConfirmDialog
        isOpen={classPendingDelete !== null}
        title="Excluir turma"
        description={`A turma "${classPendingDelete?.name ?? ''}" será removida. Essa ação não pode ser desfeita.`}
        isConfirming={deleteClass.isPending}
        onConfirm={handleDeleteClass}
        onCancel={() => setClassPendingDelete(null)}
      />
    </Box>
  );
}
