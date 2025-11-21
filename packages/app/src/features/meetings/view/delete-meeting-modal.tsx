import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui";
import { Meeting } from "app/types/meetings";

interface Props {
  meeting?: Meeting;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteMeetingModal(props: Props) {
  const closeModal = () => {
    props.onOpenChange(false);
  };

  const handleConfirm = async () => {
    await props.onConfirm();
    closeModal();
  };

  return (
    <Dialog open={!!props.meeting} onOpenChange={props.onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={closeModal}>
        <DialogHeader>
          <DialogTitle>Delete Meeting</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this meeting? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal} disabled={props.isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={props.isLoading}>
            {props.isLoading ? "Deleting Meeting..." : "Delete Meeting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
