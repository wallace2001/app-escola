import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

export function LoadingState({ label }: { label?: string }) {
  return (
    <Center className="gap-3 py-16">
      <Spinner size="large" className="text-primary" />
      {label ? (
        <Text size="sm" className="text-muted-foreground">
          {label}
        </Text>
      ) : null}
    </Center>
  );
}
