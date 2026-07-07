import '@/global.css';

import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { navigationThemes } from '@/lib/navigation-theme';
import { queryClient } from '@/lib/query-client';
import { startMockServer } from '@/mocks/server';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    startMockServer()
      .catch(() => {
        // se o mock não subir, as telas mostram o estado de erro com retry
      })
      .finally(() => {
        if (isMounted) setIsApiReady(true);
        SplashScreen.hideAsync();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isApiReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider mode={mode}>
          <ThemeProvider value={navigationThemes[mode]}>
            <QueryClientProvider client={queryClient}>
              <StatusBar style="auto" />
              <Stack>
                <Stack.Screen name="index" options={{ title: 'Escolas' }} />
                <Stack.Screen
                  name="schools/new"
                  options={{ title: 'Nova escola', presentation: 'modal' }}
                />
                <Stack.Screen name="schools/[id]/index" options={{ title: 'Escola' }} />
                <Stack.Screen
                  name="schools/[id]/edit"
                  options={{ title: 'Editar escola', presentation: 'modal' }}
                />
                <Stack.Screen
                  name="schools/[id]/classes/new"
                  options={{ title: 'Nova turma', presentation: 'modal' }}
                />
                <Stack.Screen
                  name="schools/[id]/classes/[classId]/edit"
                  options={{ title: 'Editar turma', presentation: 'modal' }}
                />
              </Stack>
            </QueryClientProvider>
          </ThemeProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => Promise<void> }) {
  return (
    <Box className="flex-1 items-center justify-center gap-3 bg-background px-8">
      <Heading size="lg" className="text-center">
        Algo deu errado
      </Heading>
      <Text size="sm" className="text-center text-muted-foreground">
        {error.message}
      </Text>
      <Button className="mt-2" onPress={() => retry()}>
        <ButtonText>Tentar novamente</ButtonText>
      </Button>
    </Box>
  );
}
