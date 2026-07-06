import { Pencil, Trash2 } from 'lucide-react-native';

import { Button, ButtonIcon } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import type { SchoolClass } from '@/domain/school-class';

import { ShiftBadge } from './shift-badge';

interface ClassCardProps {
  schoolClass: SchoolClass;
  onEdit: () => void;
  onDelete: () => void;
}

export function ClassCard({ schoolClass, onEdit, onDelete }: ClassCardProps) {
  return (
    <Card className="gap-2">
      <HStack className="items-center justify-between gap-3">
        <VStack className="flex-1 gap-2">
          <Heading size="xs" numberOfLines={1}>
            {schoolClass.name}
          </Heading>
          <HStack className="flex-wrap items-center gap-2">
            <ShiftBadge shift={schoolClass.shift} />
            <Text size="xs" className="text-muted-foreground">
              Ano letivo {schoolClass.year}
            </Text>
          </HStack>
        </VStack>
        <HStack className="gap-1">
          <Button
            variant="ghost"
            size="icon"
            onPress={onEdit}
            accessibilityLabel={`Editar turma ${schoolClass.name}`}
          >
            <ButtonIcon as={Pencil} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onPress={onDelete}
            accessibilityLabel={`Excluir turma ${schoolClass.name}`}
          >
            <ButtonIcon as={Trash2} className="text-destructive" />
          </Button>
        </HStack>
      </HStack>
    </Card>
  );
}
