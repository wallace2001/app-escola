import { Tabs } from 'expo-router';
import { House, UserRound } from 'lucide-react-native';
import { Platform, useColorScheme } from 'react-native';

const palette = {
  light: { active: '#2563eb', inactive: '#737373', bg: '#ffffff', border: '#e5e5e5' },
  dark: { active: '#60a5fa', inactive: '#a1a1a1', bg: '#0a0a0a', border: '#2e2e2e' },
};

export default function TabsLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = palette[scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 84 : 64,
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
  );
}
