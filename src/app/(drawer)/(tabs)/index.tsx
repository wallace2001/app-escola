import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus, School, Users } from 'lucide-react-native';
import { RefreshControl, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrawerToggle } from '@/components/drawer-toggle';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { SearchField } from '@/components/search-field';
import { StatCard } from '@/components/stat-card';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
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

  const totalClasses = schools.reduce((total, school) => total + school.classesCount, 0);
  const isSearching = debouncedSearch.length > 0;

  return (
    <Box className="flex-1 bg-background">
      <VStack className="gap-4 px-4 pb-3" style={{ paddingTop: insets.top + 12 }}>
        <HStack className="items-center gap-3">
          <DrawerToggle />
          <VStack className="flex-1">
            <Text size="xs" className="uppercase tracking-wide text-muted-foreground">
              Rede municipal
            </Text>
            <Heading size="xl">Escolas públicas</Heading>
          </VStack>
        </HStack>

        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nome ou endereço"
        />
      </VStack>

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
            paddingTop: 4,
            paddingBottom: insets.bottom + 96,
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <VStack className="gap-3 px-1.5 pb-2">
              {!isSearching && schools.length > 0 ? (
                <HStack className="gap-3">
                  <StatCard icon={School} value={schools.length} label="escolas" />
                  <StatCard icon={Users} value={totalClasses} label="turmas" />
                </HStack>
              ) : null}
              {schools.length > 0 ? (
                <Text size="xs" className="uppercase text-muted-foreground">
                  {isSearching
                    ? pluralize(schools.length, 'resultado', 'resultados')
                    : pluralize(schools.length, 'escola cadastrada', 'escolas cadastradas')}
                </Text>
              ) : null}
            </VStack>
          }
          ListEmptyComponent={
            isSearching ? (
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
    </Box>
  );
}
