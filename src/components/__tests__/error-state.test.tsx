import { fireEvent, render, screen } from '@testing-library/react-native';

import { ErrorState } from '../error-state';

describe('ErrorState', () => {
  it('mostra a mensagem recebida', () => {
    render(<ErrorState message="Escola não encontrada." />);

    expect(screen.getByText('Não foi possível carregar')).toBeOnTheScreen();
    expect(screen.getByText('Escola não encontrada.')).toBeOnTheScreen();
  });

  it('usa a mensagem padrão quando nenhuma é passada', () => {
    render(<ErrorState />);

    expect(screen.getByText('Verifique sua conexão e tente novamente.')).toBeOnTheScreen();
  });

  it('dispara onRetry ao tocar em "Tentar novamente"', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="falhou" onRetry={onRetry} />);

    fireEvent.press(screen.getByText('Tentar novamente'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('não renderiza o botão de retry sem onRetry', () => {
    render(<ErrorState message="falhou" />);

    expect(screen.queryByText('Tentar novamente')).toBeNull();
  });
});
