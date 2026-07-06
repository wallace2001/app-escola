import { CircleAlert } from 'lucide-react-native';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Center className="gap-3 px-8 py-16">
      <Box className="h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Icon as={CircleAlert} size="xl" className="text-destructive" />
      </Box>
      <Heading size="sm" className="text-center">
        Não foi possível carregar
      </Heading>
      <Text size="sm" className="text-center text-muted-foreground">
        {message ?? 'Verifique sua conexão e tente novamente.'}
      </Text>
      {onRetry ? (
        <Button variant="outline" className="mt-2" onPress={onRetry}>
          <ButtonText>Tentar novamente</ButtonText>
        </Button>
      ) : null}
    </Center>
  );
}
