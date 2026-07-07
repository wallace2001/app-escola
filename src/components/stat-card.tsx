import type { LucideIcon } from 'lucide-react-native';

import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex-1 gap-2" size="sm">
      <HStack className="items-center gap-2">
        <Box className="h-8 w-8 items-center justify-center rounded-lg bg-secondary">
          <Icon as={icon} size="sm" className="text-primary" />
        </Box>
        <Heading size="xl">{value}</Heading>
      </HStack>
      <VStack>
        <Text size="xs" className="uppercase text-muted-foreground">
          {label}
        </Text>
      </VStack>
    </Card>
  );
}
