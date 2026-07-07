import { useQueryClient } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { Building2, Info, RotateCcw, School, Users } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { DrawerToggle } from '@/components/drawer-toggle';
import { StatCard } from '@/components/stat-card';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSchools } from '@/features/schools/hooks/use-schools';
import { useAppToast } from '@/hooks/use-app-toast';
import { getErrorMessage } from '@/lib/http';
import { resetMockData } from '@/mocks/server';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <HStack className="items-center justify-between">
      <Text size="sm" className="text-muted-foreground">
        {label}
      </Text>
      <Text size="sm" className="font-medium">
        {value}
      </Text>
    </HStack>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const toast = useAppToast();
  const queryClient = useQueryClient();

  const { data } = useSchools('');
  const schools = data ?? [];
  const totalClasses = schools.reduce((total, school) => total + school.classesCount, 0);

  const [isConfirming, setIsConfirming] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  async function handleReset() {
    setIsResetting(true);
    try {
      await resetMockData();
      await queryClient.invalidateQueries();
      toast.success('Dados restaurados', 'Os dados de exemplo foram recarregados.');
    } catch (error) {
      toast.error('Não foi possível restaurar', getErrorMessage(error));
    } finally {
      setIsResetting(false);
      setIsConfirming(false);
    }
  }

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Box className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
          gap: 20,
        }}
      >
        <HStack className="items-center gap-3">
          <DrawerToggle />
          <Heading size="xl">Perfil</Heading>
        </HStack>

        <Card className="flex-row items-center gap-4">
          <Box className="h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <Building2 color="#ffffff" size={28} />
          </Box>
          <VStack className="flex-1">
            <Heading size="sm">Secretaria de Educação</Heading>
            <Text size="sm" className="text-muted-foreground">
              Painel administrativo
            </Text>
          </VStack>
        </Card>

        <VStack className="gap-3">
          <Text size="xs" className="uppercase tracking-wide text-muted-foreground">
            Resumo da rede
          </Text>
          <HStack className="gap-3">
            <StatCard icon={School} value={schools.length} label="escolas" />
            <StatCard icon={Users} value={totalClasses} label="turmas" />
          </HStack>
        </VStack>

        <VStack className="gap-3">
          <Text size="xs" className="uppercase tracking-wide text-muted-foreground">
            Dados
          </Text>
          <Card className="gap-3">
            <HStack className="items-start gap-3">
              <Box className="h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <Icon as={RotateCcw} size="sm" className="text-primary" />
              </Box>
              <VStack className="flex-1">
                <Text size="sm" className="font-medium">
                  Restaurar dados de exemplo
                </Text>
                <Text size="xs" className="text-muted-foreground">
                  Recarrega as escolas e turmas iniciais. Suas alterações locais serão perdidas.
                </Text>
              </VStack>
            </HStack>
            <Button variant="outline" onPress={() => setIsConfirming(true)}>
              <ButtonIcon as={RotateCcw} />
              <ButtonText>Restaurar</ButtonText>
            </Button>
          </Card>
        </VStack>

        <VStack className="gap-3">
          <Text size="xs" className="uppercase tracking-wide text-muted-foreground">
            Sobre
          </Text>
          <Card className="gap-3">
            <HStack className="items-center gap-2">
              <Icon as={Info} size="sm" className="text-muted-foreground" />
              <Text size="sm" className="font-medium">
                Escolas
              </Text>
            </HStack>
            <VStack className="gap-2">
              <InfoRow label="Versão" value={appVersion} />
              <InfoRow label="Plataforma" value="Expo SDK 54 · React Native" />
              <InfoRow label="Back-end" value="MirageJS (simulado)" />
            </VStack>
          </Card>
        </VStack>
      </ScrollView>

      <ConfirmDialog
        isOpen={isConfirming}
        title="Restaurar dados de exemplo"
        description="Isso recarrega as escolas e turmas iniciais e descarta as alterações locais. Deseja continuar?"
        confirmLabel="Restaurar"
        isConfirming={isResetting}
        onConfirm={handleReset}
        onCancel={() => setIsConfirming(false)}
      />
    </Box>
  );
}
