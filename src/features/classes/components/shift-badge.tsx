import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { SHIFT_LABELS, type Shift } from '@/domain/school-class';

const shiftDotStyles: Record<Shift, string> = {
  morning: 'bg-amber-500',
  afternoon: 'bg-orange-500',
  evening: 'bg-indigo-500',
  full_time: 'bg-emerald-500',
};

export function ShiftBadge({ shift }: { shift: Shift }) {
  return (
    <Badge variant="outline" className="items-center gap-1.5 rounded-full">
      <Box className={`h-2 w-2 rounded-full ${shiftDotStyles[shift]}`} />
      <BadgeText className="normal-case">{SHIFT_LABELS[shift]}</BadgeText>
    </Badge>
  );
}
