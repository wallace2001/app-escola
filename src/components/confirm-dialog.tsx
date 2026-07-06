import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Excluir',
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onCancel}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="max-w-96">
        <AlertDialogHeader>
          <Heading size="md">{title}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-2">
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" size="sm" onPress={onCancel} isDisabled={isConfirming}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button variant="destructive" size="sm" onPress={onConfirm} isDisabled={isConfirming}>
            {isConfirming ? <ButtonSpinner /> : null}
            <ButtonText>{confirmLabel}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
