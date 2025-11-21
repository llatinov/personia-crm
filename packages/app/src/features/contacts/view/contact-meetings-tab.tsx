import { Button } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Paths } from "app/lib/consts";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiMockEvents } from "../../events/api-mock";
import { apiMockMeetings } from "../../meetings/api-mock";
import { MeetingCard } from "../../meetings/list/meeting-card";

interface Props {
  contactId: string;
}

export function ContactMeetingsTab(props: Props) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadMeetings();
  }, [props.contactId]);

  const loadMeetings = async () => {
    try {
      setIsLoading(true);
      const [meetingsData, eventsData] = await Promise.all([
        apiMockMeetings.getMeetingsByContactId(props.contactId),
        apiMockEvents.getEvents()
      ]);
      const sortedMeetings = meetingsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMeetings(sortedMeetings);
      setEvents(eventsData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventForMeeting = (meeting: Meeting) => {
    if (meeting.location && meeting.location.type == LocationType.EVENT && meeting.location?.location) {
      return events.find((e) => e.id === meeting.location!.location);
    }
    return undefined;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link to={`${Paths.MEETINGS_ADD}?contactId=${props.contactId}`}>
          <Button>Add Meeting</Button>
        </Link>
      </div>

      {meetings.length === 0 ? (
        <InfoCard message="No meetings with this contact yet. Add your first meeting!" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} event={getEventForMeeting(meeting)} />
          ))}
        </div>
      )}

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
