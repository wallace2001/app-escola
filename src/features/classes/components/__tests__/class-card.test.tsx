import { fireEvent, render, screen } from '@testing-library/react-native';

import type { SchoolClass } from '@/domain/school-class';

import { ClassCard } from '../class-card';

const schoolClass: SchoolClass = {
  id: 'c1',
  schoolId: 's1',
  name: '1º Ano A',
  shift: 'morning',
  year: 2026,
};

describe('ClassCard', () => {
  it('mostra nome, turno e ano letivo', () => {
    render(<ClassCard schoolClass={schoolClass} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText('1º Ano A')).toBeOnTheScreen();
    expect(screen.getByText('Manhã')).toBeOnTheScreen();
    expect(screen.getByText('Ano letivo 2026')).toBeOnTheScreen();
  });

  it('dispara onEdit ao tocar em editar', () => {
    const onEdit = jest.fn();
    render(<ClassCard schoolClass={schoolClass} onEdit={onEdit} onDelete={jest.fn()} />);

    fireEvent.press(screen.getByLabelText('Editar turma 1º Ano A'));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('dispara onDelete ao tocar em excluir', () => {
    const onDelete = jest.fn();
    render(<ClassCard schoolClass={schoolClass} onEdit={jest.fn()} onDelete={onDelete} />);

    fireEvent.press(screen.getByLabelText('Excluir turma 1º Ano A'));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
