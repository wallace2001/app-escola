import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus, School } from 'lucide-react-native';
import { RefreshControl, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { SearchField } from '@/components/search-field';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';
import { Text } from '@/components/ui/text';
import { SchoolCard } from '@/features/schools/components/school-card';
import { useSchools } from '@/features/schools/hooks/use-schools';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { pluralize } from '@/lib/format';
import { getErrorMessage } from '@/lib/http';
import { useSchoolFilters } from '@/stores/school-filters';

export default function SchoolsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const search = useSchoolFilters((state) => state.search);
  const setSearch = useSchoolFilters((state) => state.setSearch);
  const debouncedSearch = useDebouncedValue(search.trim());

  const { data, isPending, isError, error, refetch } = useSchools(debouncedSearch);
  const schools = data ?? [];

  const { refreshing, onRefresh } = usePullToRefresh(refetch);
  const numColumns = width >= 768 ? 2 : 1;

  return (
    <Box className="flex-1 bg-background">
      <Box className="px-4 pb-2 pt-3">
        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nome ou endereço"
        />
      </Box>

      {isPending ? (
        <LoadingState label="Carregando escolas..." />
      ) : isError ? (
        <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />
      ) : (
        <FlashList
          key={numColumns}
          data={schools}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flex: 1, paddingHorizontal: 6, paddingBottom: 12 }}>
              <SchoolCard school={item} onPress={() => router.push(`/schools/${item.id}`)} />
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 8,
            paddingBottom: insets.bottom + 96,
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            schools.length > 0 ? (
              <Text size="xs" className="mb-3 px-1.5 uppercase text-muted-foreground">
                {pluralize(schools.length, 'escola encontrada', 'escolas encontradas')}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            debouncedSearch ? (
              <EmptyState
                icon={School}
                title="Nenhuma escola encontrada"
                description={`Nenhum resultado para "${debouncedSearch}". Tente outro termo.`}
              />
            ) : (
              <EmptyState
                icon={School}
                title="Nenhuma escola cadastrada"
                description="Cadastre a primeira escola da rede para começar."
                action={
                  <Button onPress={() => router.push('/schools/new')}>
                    <ButtonIcon as={Plus} />
                    <ButtonText>Cadastrar escola</ButtonText>
                  </Button>
                }
              />
            )
          }
        />
      )}

      <Fab
        size="lg"
        placement="bottom right"
        onPress={() => router.push('/schools/new')}
        style={{ marginBottom: insets.bottom }}
        accessibilityLabel="Cadastrar nova escola"
      >
        <FabIcon as={Plus} />
        <FabLabel>Nova escola</FabLabel>
      </Fab>
    </Box>
  );
}
