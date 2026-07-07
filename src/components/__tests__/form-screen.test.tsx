import { render, screen } from '@testing-library/react-native';

import { Text } from '@/components/ui/text';

import { FormScreen } from '../form-screen';

describe('FormScreen', () => {
  it('renderiza o conteúdo filho', () => {
    render(
      <FormScreen>
        <Text>Formulário aqui</Text>
      </FormScreen>,
    );

    expect(screen.getByText('Formulário aqui')).toBeOnTheScreen();
  });
});
