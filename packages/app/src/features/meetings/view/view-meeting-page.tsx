import { Button } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { capacitorMobileDeviceOnly } from "app/lib/capacitor";
import { Paths } from "app/lib/consts";
import { Contact } from "app/types/contacts";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiMockContacts } from "../../contacts/api-mock";
import { apiMockEvents } from "../../events/api-mock";
import { apiMockMeetings } from "../api-mock";
import { CalendarControls } from "./calendar-controls";
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
  const [isError, setIsError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadMeeting();
  }, [meetingId, reload]);

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

        if (result.location && result.location.type === LocationType.EVENT && result.location.location) {
          const eventResult = await apiMockEvents.getEventById(result.location.location);
          setEvent(eventResult);
        }
      } else {
        setError("Meeting not found");
      }
    } catch {
      setIsError(true);
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
        <>
          <MeetingDetailCard meeting={meeting} contact={contact} event={event} />
          {capacitorMobileDeviceOnly && meeting && (
            <CalendarControls meeting={meeting} setError={setError} onMeetingUpdate={() => setReload(!reload)} />
          )}
        </>
      )}

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
