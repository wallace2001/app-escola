import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Menu } from 'lucide-react-native';

import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';

export function DrawerToggle() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      accessibilityLabel="Abrir menu"
      accessibilityRole="button"
      className="h-11 w-11 items-center justify-center rounded-2xl bg-secondary active:opacity-70"
    >
      <Icon as={Menu} className="text-foreground" />
    </Pressable>
  );
}
