import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';

import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Center className="gap-3 px-8 py-16">
      <Box className="h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Icon as={icon} size="xl" className="text-muted-foreground" />
      </Box>
      <Heading size="sm" className="text-center">
        {title}
      </Heading>
      {description ? (
        <Text size="sm" className="text-center text-muted-foreground">
          {description}
        </Text>
      ) : null}
      {action ? <Box className="mt-2">{action}</Box> : null}
    </Center>
  );
}
