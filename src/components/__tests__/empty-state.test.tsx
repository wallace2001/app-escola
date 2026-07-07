import { fireEvent, render, screen } from '@testing-library/react-native';
import { School } from 'lucide-react-native';

import { Button, ButtonText } from '@/components/ui/button';

import { EmptyState } from '../empty-state';

describe('EmptyState', () => {
  it('mostra título e descrição', () => {
    render(
      <EmptyState icon={School} title="Nenhuma escola" description="Cadastre a primeira." />,
    );

    expect(screen.getByText('Nenhuma escola')).toBeOnTheScreen();
    expect(screen.getByText('Cadastre a primeira.')).toBeOnTheScreen();
  });

  it('omite a descrição quando não é passada', () => {
    render(<EmptyState icon={School} title="Nenhuma escola" />);

    expect(screen.getByText('Nenhuma escola')).toBeOnTheScreen();
    expect(screen.queryByText('Cadastre a primeira.')).toBeNull();
  });

  it('renderiza a ação e dispara seu callback', () => {
    const onPress = jest.fn();
    render(
      <EmptyState
        icon={School}
        title="Nenhuma escola"
        action={
          <Button onPress={onPress}>
            <ButtonText>Cadastrar escola</ButtonText>
          </Button>
        }
      />,
    );

    fireEvent.press(screen.getByText('Cadastrar escola'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
