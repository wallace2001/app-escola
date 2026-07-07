import { Tabs, usePathname, useRouter } from 'expo-router';
import { House, Plus, UserRound } from 'lucide-react-native';
import { Platform, Pressable, useColorScheme, View } from 'react-native';

import { Icon } from '@/components/ui/icon';

const palette = {
  light: { active: '#2563eb', inactive: '#737373', bg: '#ffffff', border: '#e5e5e5' },
  dark: { active: '#60a5fa', inactive: '#a1a1a1', bg: '#0a0a0a', border: '#2e2e2e' },
};

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 84 : 64;

export default function TabsLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = palette[scheme];
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.active,
          tabBarInactiveTintColor: colors.inactive,
          tabBarStyle: {
            backgroundColor: colors.bg,
            borderTopColor: colors.border,
            height: TAB_BAR_HEIGHT,
            paddingTop: 6,
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />,
          }}
        />
      </Tabs>

      {pathname !== '/profile' ? (
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: TAB_BAR_HEIGHT - 30,
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => router.push('/schools/new')}
            accessibilityLabel="Cadastrar nova escola"
            accessibilityRole="button"
            className="h-14 w-14 items-center justify-center rounded-full bg-primary active:opacity-90"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          >
            <Icon as={Plus} size="xl" className="text-primary-foreground" />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
