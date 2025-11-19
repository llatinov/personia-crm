import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui";
import { Contact } from "app/types/contacts";

interface Props {
  contact: Contact | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteContactModal(props: Props) {
  const handleConfirm = () => {
    props.onConfirm();
    props.onOpenChange(false);
  };

  return (
    <Dialog open={!!props.contact} onOpenChange={props.onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={() => props.onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {props.contact?.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => props.onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
