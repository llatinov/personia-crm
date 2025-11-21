import { Button } from "@components/ui";
import { Meeting } from "app/types/meetings";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { apiMockMeetings } from "../api-mock";
import { DeleteMeetingModal } from "./delete-meeting-modal";

interface Props {
  meeting?: Meeting;
  onDelete: () => void;
}

export function DeleteMeetingButton(props: Props) {
  const [meetingToDelete, setMeetingToDelete] = useState<Meeting>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMeetingToDelete(props.meeting);
  };

  const handleDeleteConfirm = async () => {
    if (!meetingToDelete) return;

    try {
      setIsLoading(true);
      await apiMockMeetings.deleteMeeting(meetingToDelete.id);
      setMeetingToDelete(undefined);
      props.onDelete();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    props.meeting && (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteClick}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <DeleteMeetingModal
          meeting={meetingToDelete}
          isLoading={isLoading}
          onOpenChange={(open) => !open && setMeetingToDelete(undefined)}
          onConfirm={handleDeleteConfirm}
        />
      </>
    )
  );
}
