import { Button } from "@components/ui";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Paths } from "app/lib/consts";
import { Event } from "app/types/events";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiMockEvents } from "../api-mock";
import { DeleteEventButton } from "./delete-event-button";
import { EventCard } from "./event-card";

export function ViewEventPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    if (!eventId) {
      setError("No event ID provided");
      return;
    }

    try {
      setIsLoading(true);
      const result = await apiMockEvents.getEventById(eventId);
      if (result) {
        setEvent(result);
      } else {
        setError("Event not found");
      }
    } catch {
      setError("Failed to load event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="flex items-center justify-between">
        <Link to={Paths.EVENTS}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
        <DeleteEventButton event={event} onDelete={() => navigate(Paths.EVENTS)} />
      </div>

      {isLoading ? (
        <Loader />
      ) : error || !event ? (
        <InfoCard message={error || "Event not found"} />
      ) : (
        <EventCard event={event} />
      )}
    </div>
  );
}
