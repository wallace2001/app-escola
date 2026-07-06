import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

export default function Home() {
  return (
    <Box className="flex-1 items-center justify-center gap-4 bg-background">
      <Heading size="xl">Escolas</Heading>
      <Button>
        <ButtonText>Ok</ButtonText>
      </Button>
    </Box>
  );
}
