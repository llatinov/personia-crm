import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui";
import { Paths } from "app/lib/consts";

interface Props {
  reload?: boolean;
  onClose: () => void;
}

export function ErrorOverlay(props: Props) {
  const closeModal = () => {
    props.onClose();
    if (props.reload) {
      window.location.href = Paths.HOME;
    }
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeModal}>
        <DialogHeader>
          <DialogTitle>Unexpected error</DialogTitle>
          <DialogDescription>
            An unexpected error occurred. Please try again. If the error persists, please contact support.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
