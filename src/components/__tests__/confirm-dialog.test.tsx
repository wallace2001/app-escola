import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import { ConfirmDialog } from '../confirm-dialog';

// AlertDialog do gluestack renderiza via overlay, então precisa do provider.
const renderDialog = (ui: ReactElement) =>
  render(<GluestackUIProvider>{ui}</GluestackUIProvider>);

const baseProps = {
  isOpen: true,
  title: 'Excluir escola',
  description: 'Essa ação não pode ser desfeita.',
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('ConfirmDialog', () => {
  it('mostra título e descrição quando aberto', () => {
    renderDialog(<ConfirmDialog {...baseProps} />);

    expect(screen.getByText('Excluir escola')).toBeOnTheScreen();
    expect(screen.getByText('Essa ação não pode ser desfeita.')).toBeOnTheScreen();
  });

  it('não renderiza o conteúdo quando fechado', () => {
    renderDialog(<ConfirmDialog {...baseProps} isOpen={false} />);

    expect(screen.queryByText('Excluir escola')).toBeNull();
  });

  it('dispara onConfirm ao confirmar', () => {
    const onConfirm = jest.fn();
    renderDialog(<ConfirmDialog {...baseProps} onConfirm={onConfirm} confirmLabel="Excluir" />);

    fireEvent.press(screen.getByText('Excluir'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('dispara onCancel ao cancelar', () => {
    const onCancel = jest.fn();
    renderDialog(<ConfirmDialog {...baseProps} onCancel={onCancel} />);

    fireEvent.press(screen.getByText('Cancelar'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('usa o confirmLabel customizado', () => {
    renderDialog(<ConfirmDialog {...baseProps} confirmLabel="Restaurar" />);

    expect(screen.getByText('Restaurar')).toBeOnTheScreen();
  });
});
