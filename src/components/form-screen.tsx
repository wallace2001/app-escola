import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Box } from '@/components/ui/box';

export function FormScreen({ children }: PropsWithChildren) {
  return (
    <Box className="flex-1 bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="w-full max-w-xl gap-6 self-center p-4 pb-10">{children}</Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
