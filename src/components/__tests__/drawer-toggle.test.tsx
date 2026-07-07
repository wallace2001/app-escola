import { fireEvent, render, screen } from '@testing-library/react-native';
import { useNavigation } from 'expo-router';

import { DrawerToggle } from '../drawer-toggle';

jest.mock('expo-router', () => ({ useNavigation: jest.fn() }));

describe('DrawerToggle', () => {
  it('abre o drawer ao ser tocado', () => {
    const dispatch = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ dispatch });

    render(<DrawerToggle />);
    fireEvent.press(screen.getByLabelText('Abrir menu'));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
