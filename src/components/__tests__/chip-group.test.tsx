import { fireEvent, render, screen } from '@testing-library/react-native';

import { ChipGroup, type ChipOption } from '../chip-group';

const options: readonly ChipOption<'all' | 'morning' | 'afternoon'>[] = [
  { value: 'all', label: 'Todos' },
  { value: 'morning', label: 'Manhã' },
  { value: 'afternoon', label: 'Tarde' },
];

describe('ChipGroup', () => {
  it('renderiza todas as opções', () => {
    render(<ChipGroup options={options} value="all" onChange={jest.fn()} />);

    expect(screen.getByText('Todos')).toBeOnTheScreen();
    expect(screen.getByText('Manhã')).toBeOnTheScreen();
    expect(screen.getByText('Tarde')).toBeOnTheScreen();
  });

  it('dispara onChange com o valor da opção tocada', () => {
    const onChange = jest.fn();
    render(<ChipGroup options={options} value="all" onChange={onChange} />);

    fireEvent.press(screen.getByText('Manhã'));

    expect(onChange).toHaveBeenCalledWith('morning');
  });

  it('marca a opção selecionada com accessibilityState', () => {
    render(<ChipGroup options={options} value="afternoon" onChange={jest.fn()} />);

    const selected = screen.getByRole('button', { name: 'Tarde' });
    expect(selected.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true }),
    );

    const notSelected = screen.getByRole('button', { name: 'Manhã' });
    expect(notSelected.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: false }),
    );
  });
});
