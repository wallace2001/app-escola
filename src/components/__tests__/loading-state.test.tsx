import { render, screen } from '@testing-library/react-native';

import { LoadingState } from '../loading-state';

describe('LoadingState', () => {
  it('mostra o label quando informado', () => {
    render(<LoadingState label="Carregando escolas..." />);

    expect(screen.getByText('Carregando escolas...')).toBeOnTheScreen();
  });

  it('não renderiza texto quando não há label', () => {
    render(<LoadingState />);

    expect(screen.queryByText('Carregando escolas...')).toBeNull();
  });
});
