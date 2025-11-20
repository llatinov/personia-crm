import { Button } from "@components/ui";
import { Event } from "app/types/events";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { apiMockEvents } from "../api-mock";
import { DeleteEventModal } from "./delete-event-modal";

interface Props {
  event?: Event;
  onDelete: () => void;
}

export function DeleteEventButton(props: Props) {
  const [eventToDelete, setEventToDelete] = useState<Event>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEventToDelete(props.event);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      setIsLoading(true);
      await apiMockEvents.deleteEvent(eventToDelete.id);
      setEventToDelete(undefined);
      props.onDelete();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    props.event && (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteClick}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <DeleteEventModal
          event={eventToDelete}
          isLoading={isLoading}
          onOpenChange={(open) => !open && setEventToDelete(undefined)}
          onConfirm={handleDeleteConfirm}
        />
      </>
    )
  );
}
