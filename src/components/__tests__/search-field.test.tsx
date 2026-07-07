import { fireEvent, render, screen } from '@testing-library/react-native';

import { SearchField } from '../search-field';

describe('SearchField', () => {
  it('renderiza com o placeholder e o valor atual', () => {
    render(<SearchField value="ana" onChangeText={jest.fn()} placeholder="Buscar turma" />);

    expect(screen.getByPlaceholderText('Buscar turma')).toBeOnTheScreen();
  });

  it('dispara onChangeText ao digitar', () => {
    const onChangeText = jest.fn();
    render(<SearchField value="" onChangeText={onChangeText} placeholder="Buscar turma" />);

    fireEvent.changeText(screen.getByPlaceholderText('Buscar turma'), 'ana');

    expect(onChangeText).toHaveBeenCalledWith('ana');
  });

  it('mostra o botão de limpar e o dispara com string vazia', () => {
    const onChangeText = jest.fn();
    render(<SearchField value="ana" onChangeText={onChangeText} placeholder="Buscar turma" />);

    fireEvent.press(screen.getByLabelText('Limpar busca', { includeHiddenElements: true }));

    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('esconde o botão de limpar quando o valor está vazio', () => {
    render(<SearchField value="" onChangeText={jest.fn()} placeholder="Buscar turma" />);

    expect(screen.queryByLabelText('Limpar busca')).toBeNull();
  });
});
