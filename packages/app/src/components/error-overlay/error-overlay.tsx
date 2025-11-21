import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ErrorOverlay(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={props.onClose}>
        <DialogHeader>
          <DialogTitle>Unexpected error</DialogTitle>
          <DialogDescription>
            An unexpected error occurred. Please try again. If the error persists, please contact support.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={props.onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
