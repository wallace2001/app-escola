import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { usePathname, useRouter } from 'expo-router';
import { GraduationCap, House, type LucideIcon, UserRound } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const palette = {
  light: { bg: '#ffffff' },
  dark: { bg: '#0f0f0f' },
};

const items: { label: string; icon: LucideIcon; path: '/' | '/profile' }[] = [
  { label: 'Início', icon: House, path: '/' },
  { label: 'Perfil', icon: UserRound, path: '/profile' },
];

function DrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }}
    >
      <VStack className="gap-6 px-3">
        <HStack className="items-center gap-3 px-2 pt-2">
          <Box className="h-11 w-11 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap color="#ffffff" size={24} />
          </Box>
          <VStack>
            <Heading size="sm">Escolas</Heading>
            <Text size="xs" className="text-muted-foreground">
              Rede municipal
            </Text>
          </VStack>
        </HStack>

        <VStack className="gap-1">
          {items.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Pressable
                key={item.path}
                onPress={() => {
                  props.navigation.closeDrawer();
                  router.navigate(item.path);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                className={
                  isActive
                    ? 'flex-row items-center gap-3 rounded-xl bg-secondary px-3 py-3'
                    : 'flex-row items-center gap-3 rounded-xl px-3 py-3 active:bg-secondary'
                }
              >
                <Icon
                  as={item.icon}
                  size="md"
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
                <Text className={isActive ? 'font-medium text-foreground' : 'text-foreground'}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { backgroundColor: palette[scheme].bg, width: 288 },
        overlayColor: 'rgba(0, 0, 0, 0.25)',
        swipeEdgeWidth: 64,
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
