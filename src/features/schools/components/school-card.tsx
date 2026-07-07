import { ChevronRight, MapPin } from 'lucide-react-native';

import { Badge, BadgeText } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import type { School } from '@/domain/school';
import { pluralize } from '@/lib/format';

interface SchoolCardProps {
  school: School;
  onPress: () => void;
}

export function SchoolCard({ school, onPress }: SchoolCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir escola ${school.name}`}
      className="active:opacity-70"
    >
      <Card className="gap-3">
        <HStack className="items-center justify-between gap-3">
          <VStack className="flex-1 gap-1">
            <Heading size="sm">{school.name}</Heading>
            <HStack className="items-center gap-1.5">
              <Icon as={MapPin} size="sm" className="text-muted-foreground" />
              <Text size="sm" className="flex-1 text-muted-foreground">
                {school.address}
              </Text>
            </HStack>
          </VStack>
          <Icon as={ChevronRight} className="text-muted-foreground" />
        </HStack>
        <Badge variant="secondary" className="self-start rounded-full">
          <BadgeText>{pluralize(school.classesCount, 'turma', 'turmas')}</BadgeText>
        </Badge>
      </Card>
    </Pressable>
  );
}
