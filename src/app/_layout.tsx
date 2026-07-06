import '@/global.css';

import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
          <Stack />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
