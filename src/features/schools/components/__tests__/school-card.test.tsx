import { render, screen, userEvent } from '@testing-library/react-native';

import type { School } from '@/domain/school';

import { SchoolCard } from '../school-card';

const school: School = {
  id: '1',
  name: 'EMEF Central',
  address: 'Rua A, 10 - Centro',
  classesCount: 2,
  createdAt: '2026-02-10T12:00:00.000Z',
};

describe('SchoolCard', () => {
  it('mostra nome, endereço e total de turmas', async () => {
    await render(<SchoolCard school={school} onPress={jest.fn()} />);

    expect(screen.getByText('EMEF Central')).toBeOnTheScreen();
    expect(screen.getByText('Rua A, 10 - Centro')).toBeOnTheScreen();
    expect(screen.getByText('2 turmas')).toBeOnTheScreen();
  });

  it('usa singular quando há apenas uma turma', async () => {
    await render(<SchoolCard school={{ ...school, classesCount: 1 }} onPress={jest.fn()} />);

    expect(screen.getByText('1 turma')).toBeOnTheScreen();
  });

  it('dispara onPress ao tocar no card', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();

    await render(<SchoolCard school={school} onPress={onPress} />);
    await user.press(screen.getByLabelText('Abrir escola EMEF Central'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
