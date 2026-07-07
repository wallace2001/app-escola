import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { SchoolForm } from '../school-form';

describe('SchoolForm', () => {
  it('mostra os campos e o botão de enviar', () => {
    render(<SchoolForm submitLabel="Salvar" isSubmitting={false} onSubmit={jest.fn()} />);

    expect(screen.getByText('Nome da escola')).toBeOnTheScreen();
    expect(screen.getByText('Endereço')).toBeOnTheScreen();
    expect(screen.getByText('Salvar')).toBeOnTheScreen();
  });

  it('preenche os valores iniciais quando editando', () => {
    render(
      <SchoolForm
        defaultValues={{ name: 'EMEF Central', address: 'Rua A, 10 - Centro' }}
        submitLabel="Salvar alterações"
        isSubmitting={false}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByDisplayValue('EMEF Central')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Rua A, 10 - Centro')).toBeOnTheScreen();
  });

  it('envia os valores quando o formulário é válido', async () => {
    const onSubmit = jest.fn();
    render(<SchoolForm submitLabel="Salvar" isSubmitting={false} onSubmit={onSubmit} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Ex.: EMEF Monteiro Lobato'),
      'Escola Nova',
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Ex.: Rua das Palmeiras, 45 - Centro'),
      'Rua Um, 100 - Centro',
    );
    fireEvent.press(screen.getByText('Salvar'));

    // handleSubmit do RHF passa (data, event); checamos só o payload.
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: 'Escola Nova',
      address: 'Rua Um, 100 - Centro',
    });
  });

  it('mostra erro de validação e não envia quando inválido', async () => {
    const onSubmit = jest.fn();
    render(<SchoolForm submitLabel="Salvar" isSubmitting={false} onSubmit={onSubmit} />);

    fireEvent.press(screen.getByText('Salvar'));

    expect(
      await screen.findByText('O nome precisa ter pelo menos 3 caracteres'),
    ).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
