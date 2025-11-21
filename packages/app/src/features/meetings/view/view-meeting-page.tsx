import { Button } from "@components/ui";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Paths } from "app/lib/consts";
import { Contact } from "app/types/contacts";
import { Event } from "app/types/events";
import { Meeting } from "app/types/meetings";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiMockContacts } from "../../contacts/api-mock";
import { apiMockEvents } from "../../events/api-mock";
import { apiMockMeetings } from "../api-mock";
import { DeleteMeetingButton } from "./delete-meeting-button";
import { MeetingDetailCard } from "./meeting-detail-card";

export function ViewMeetingPage() {
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();
  const [meeting, setMeeting] = useState<Meeting>();
  const [contact, setContact] = useState<Contact>();
  const [event, setEvent] = useState<Event>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMeeting();
  }, [meetingId]);

  const loadMeeting = async () => {
    if (!meetingId) {
      setError("No meeting ID provided");
      return;
    }

    try {
      setIsLoading(true);
      const result = await apiMockMeetings.getMeetingById(meetingId);
      if (result) {
        setMeeting(result);

        const contactResult = await apiMockContacts.getContactById(result.contactId);
        setContact(contactResult);

        if (result.eventId) {
          const eventResult = await apiMockEvents.getEventById(result.eventId);
          setEvent(eventResult);
        }
      } else {
        setError("Meeting not found");
      }
    } catch {
      setError("Failed to load meeting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="flex items-center justify-between">
        <Link to={Paths.MEETINGS}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Meetings
          </Button>
        </Link>
        <DeleteMeetingButton meeting={meeting} onDelete={() => navigate(Paths.MEETINGS)} />
      </div>

      {isLoading ? (
        <Loader />
      ) : error || !meeting ? (
        <InfoCard message={error || "Meeting not found"} />
      ) : (
        <MeetingDetailCard meeting={meeting} contact={contact} event={event} />
      )}
    </div>
  );
}
