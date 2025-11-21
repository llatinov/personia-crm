import { Input } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Contact } from "app/types/contacts";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { apiMockContacts } from "../../contacts/api-mock";
import { apiMockEvents } from "../../events/api-mock";
import { apiMockMeetings } from "../api-mock";
import { MeetingCard } from "./meeting-card";

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [meetingsData, eventsData, contactsData] = await Promise.all([
        apiMockMeetings.getMeetings(),
        apiMockEvents.getEvents(),
        apiMockContacts.getContacts()
      ]);
      setMeetings(meetingsData || []);
      setEvents(eventsData || []);
      setContacts(contactsData || []);
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

  const getContactName = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name || "Unknown Contact";
  };

  const displayedMeetings = searchQuery
    ? meetings.filter((meeting) => {
        const lowerQuery = searchQuery.toLowerCase();
        if (meeting.notes?.toLowerCase().includes(lowerQuery)) return true;
        if (meeting.location?.location.toLowerCase().includes(lowerQuery)) return true;
        const event = getEventForMeeting(meeting);
        if (event?.name.toLowerCase().includes(lowerQuery)) return true;
        const contactName = getContactName(meeting.contactId);
        if (contactName.toLowerCase().includes(lowerQuery)) return true;
        return false;
      })
    : meetings;

  const sortedMeetings = [...displayedMeetings].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search meetings by contact, location, notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : sortedMeetings.length === 0 ? (
        <InfoCard
          message={
            searchQuery
              ? "No meetings found matching your search"
              : "No meetings yet. Schedule your first meeting to get started!"
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {sortedMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              event={getEventForMeeting(meeting)}
              showContact={true}
              contactName={getContactName(meeting.contactId)}
            />
          ))}
        </div>
      )}

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
