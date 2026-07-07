import { render, screen } from '@testing-library/react-native';
import { School } from 'lucide-react-native';

import { StatCard } from '../stat-card';

describe('StatCard', () => {
  it('mostra o valor e o rótulo', () => {
    render(<StatCard icon={School} value={12} label="escolas" />);

    expect(screen.getByText('12')).toBeOnTheScreen();
    expect(screen.getByText('escolas')).toBeOnTheScreen();
  });

  it('aceita valor em texto', () => {
    render(<StatCard icon={School} value="—" label="turmas" />);

    expect(screen.getByText('—')).toBeOnTheScreen();
  });
});
