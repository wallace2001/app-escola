import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { ClassForm } from '../class-form';

describe('ClassForm', () => {
  it('mostra os campos e o botão de enviar', () => {
    render(<ClassForm submitLabel="Salvar" isSubmitting={false} onSubmit={jest.fn()} />);

    expect(screen.getByText('Nome da turma')).toBeOnTheScreen();
    expect(screen.getByText('Turno')).toBeOnTheScreen();
    expect(screen.getByText('Ano letivo')).toBeOnTheScreen();
    expect(screen.getByText('Salvar')).toBeOnTheScreen();
  });

  it('converte o ano para número e envia quando válido', async () => {
    const onSubmit = jest.fn();
    render(<ClassForm submitLabel="Salvar" isSubmitting={false} onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Ex.: 1º Ano A'), '1º Ano B');
    fireEvent.press(screen.getByText('Manhã'));
    fireEvent.changeText(screen.getByPlaceholderText('Ex.: 2026'), '2026');
    fireEvent.press(screen.getByText('Salvar'));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: '1º Ano B',
        shift: 'morning',
        year: 2026,
      }),
    );
  });

  it('valida o ano em formato inválido e não envia', async () => {
    const onSubmit = jest.fn();
    render(<ClassForm submitLabel="Salvar" isSubmitting={false} onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByPlaceholderText('Ex.: 1º Ano A'), 'Turma X');
    fireEvent.press(screen.getByText('Manhã'));
    fireEvent.changeText(screen.getByPlaceholderText('Ex.: 2026'), '20');
    fireEvent.press(screen.getByText('Salvar'));

    expect(await screen.findByText('Use o formato de 4 dígitos, ex.: 2026')).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
