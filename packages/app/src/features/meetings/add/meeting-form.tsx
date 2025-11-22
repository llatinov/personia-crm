import { Dialog as CapacitorDialog } from "@capacitor/dialog";
import {
  Button,
  Check,
  ChevronsUpDown,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea
} from "@components/ui";
import { DateInput } from "app/components/date-input/date-input";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { LocationPicker } from "app/components/location-picker/location-picker";
import { Paths } from "app/lib/consts";
import { Contact } from "app/types/contacts";
import { Location } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMockContacts } from "../../contacts/api-mock";
import { apiMockMeetings } from "../api-mock";

interface Props {
  contactId?: string;
  onSuccess?: (meetingId: string) => void;
}

export function MeetingForm(props: Props) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState(props.contactId || "");
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState<Location>();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const selectedContact = contacts.find((c) => c.id === selectedContactId);
    setSelectedContact(selectedContact);
    setTitle(`Catch up with ${selectedContact?.name}`);
  }, [selectedContactId]);

  const loadData = async () => {
    const contactsData = await apiMockContacts.getContacts();
    setContacts(contactsData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedContactId) {
      await CapacitorDialog.alert({
        title: "Required fields missing",
        message: "Please select a contact"
      });
      return;
    }

    if (!date) {
      await CapacitorDialog.alert({
        title: "Required fields missing",
        message: "Please enter a date for the meeting"
      });
      return;
    }

    const meeting = {
      contactId: selectedContactId,
      title: title.trim() || undefined,
      location,
      date,
      time: time || undefined,
      notes: notes.trim() || undefined
    } as Meeting;

    try {
      setIsLoading(true);
      const meetingId = await apiMockMeetings.createMeeting(meeting);
      if (props.onSuccess) {
        props.onSuccess(meetingId);
      } else {
        navigate(Paths.MEETINGS_VIEW.replace(":meetingId", meetingId));
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        {!props.contactId && (
          <div className="space-y-3">
            <Label>
              Contact <span className="text-destructive">*</span>
            </Label>
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={contactOpen}
                  className="w-full justify-between"
                >
                  {selectedContact ? selectedContact.name : "Select contact..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0" aria-describedby={undefined}>
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle>Select Contact</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Search contacts..." />
                  <CommandList className="max-h-[70vh] h-fit">
                    <CommandEmpty>No contact found.</CommandEmpty>
                    <CommandGroup>
                      {contacts.map((contact) => (
                        <CommandItem
                          key={contact.id}
                          value={contact.name}
                          onSelect={() => {
                            setSelectedContactId(contact.id);
                            setContactOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${selectedContactId === contact.id ? "opacity-100" : "opacity-0"}`}
                          />
                          {contact.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Meeting title..."
            required
          />
        </div>

        <DateInput label="Date" name="meetingDate" value={date} onChange={setDate} required />

        <div className="space-y-3">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <LocationPicker location={location} label="Location" onLocationChange={setLocation} />

        <div className="space-y-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What was discussed or planned..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Adding Meeting..." : "Add Meeting"}
          </Button>
        </div>
      </form>

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
