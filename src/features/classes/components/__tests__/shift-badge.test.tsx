import { render, screen } from '@testing-library/react-native';

import { SHIFT_LABELS, SHIFTS } from '@/domain/school-class';

import { ShiftBadge } from '../shift-badge';

describe('ShiftBadge', () => {
  it.each(SHIFTS)('mostra o rótulo do turno "%s"', (shift) => {
    render(<ShiftBadge shift={shift} />);

    expect(screen.getByText(SHIFT_LABELS[shift])).toBeOnTheScreen();
  });
});
