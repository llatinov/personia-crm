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
  contact?: Contact;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteContactModal(props: Props) {
  const closeModal = () => {
    props.onOpenChange(false);
  };

  const handleConfirm = async () => {
    await props.onConfirm();
    closeModal();
  };

  return (
    <Dialog open={!!props.contact} onOpenChange={props.onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeModal}>
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {props.contact?.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal} disabled={props.isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={props.isLoading}>
            {props.isLoading ? "Deleting Contact..." : "Delete Contact"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
