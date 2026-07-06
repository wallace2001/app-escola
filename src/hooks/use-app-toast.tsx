import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';

type ToastAction = 'success' | 'error';

export function useAppToast() {
  const toast = useToast();

  function show(action: ToastAction, title: string, description?: string) {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action={action}>
          <ToastTitle>{title}</ToastTitle>
          {description ? <ToastDescription>{description}</ToastDescription> : null}
        </Toast>
      ),
    });
  }

  return {
    success: (title: string, description?: string) => show('success', title, description),
    error: (title: string, description?: string) => show('error', title, description),
  };
}
