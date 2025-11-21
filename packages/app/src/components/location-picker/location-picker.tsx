import {
  Button,
  Check,
  ChevronsUpDown,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from "@components/ui";
import { DateInput } from "app/components/date-input/date-input";
import { apiMockEvents } from "app/features/events/api-mock";
import { formatDate } from "app/lib/date";
import { Event } from "app/types/events";
import { Location, LocationType } from "app/types/location";
import { useEffect, useState } from "react";
import { ErrorOverlay } from "../error-overlay/error-overlay";
import { Loader } from "../loader/loader";

interface Props {
  location?: Location;
  label: String;
  onLocationChange: (location: Location) => void;
  required?: boolean;
}

export function LocationPicker(props: Props) {
  const [locationType, setLocationType] = useState(LocationType.LOCATION);
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventOpen, setEventOpen] = useState(false);
  const [eventSearch, setEventSearch] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (props.location) {
      setLocationType(props.location.type);
      setLocation(props.location.location);
    }
  }, [props.location]);

  useEffect(() => {
    if (locationType === LocationType.EVENT) {
      loadEvents();
    } else {
      setLocation("");
    }
  }, [locationType]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setEventOpen(true);
      const events = await apiMockEvents.getEvents();
      setEvents(events);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEventOpen(!eventOpen);
    setEventSearch("");
    setEventName("");
    setEventDate("");
  };

  const handleCreateEvent = async () => {
    if (!eventName.trim() && !eventSearch.trim()) return;

    const newEvent = {
      name: eventName.trim() || eventSearch.trim(),
      date: eventDate
    } as Event;

    try {
      setIsLoading(true);
      const eventId = await apiMockEvents.createEvent(newEvent);
      const updatedEvents = await apiMockEvents.getEvents();
      setEvents(updatedEvents);
      resetForm();
      props.onLocationChange({ type: locationType, location: eventId });
    } catch (error) {
      setIsError(true);
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventButtonClick = () => {
    if (locationType === LocationType.EVENT) {
      setLocationType(LocationType.LOCATION);
    } else {
      setLocationType(LocationType.EVENT);
    }
  };

  const selectedEvent = events.find((event: Event) => event.id === location);
  const filteredEvents = events.filter((event: Event) => event.name.toLowerCase().includes(eventSearch.toLowerCase()));
  const isEventMode = locationType === LocationType.EVENT;
  const createDisabled = !eventName || !eventDate;

  return (
    <div className="space-y-2">
      <Label>
        {props.label} {props.required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex gap-2">
        {isEventMode ? (
          <Dialog open={eventOpen} onOpenChange={resetForm}>
            <DialogTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={eventOpen} className="flex-1 justify-between">
                {selectedEvent ? `Event: ${selectedEvent.name}` : "Select event..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0" aria-describedby={undefined}>
              <DialogHeader className="p-4 pb-0">
                <DialogTitle>Select Event</DialogTitle>
              </DialogHeader>
              <Command>
                <CommandInput placeholder="Search events..." value={eventSearch} onValueChange={setEventSearch} />
                <CommandList className="max-h-[70vh] h-fit">
                  {isLoading ? (
                    <div className="py-6">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {events.length > 0 ? (
                        <CommandGroup>
                          {filteredEvents.map((event) => (
                            <CommandItem
                              key={event.id}
                              value={event.name}
                              onSelect={() => {
                                setLocation(event.id);
                                setEventOpen(false);
                                setEventSearch("");
                                props.onLocationChange({ type: locationType, location: event.id });
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${location === event.id ? "opacity-100" : "opacity-0"}`}
                              />
                              <div className="flex flex-col">
                                <span>{event.name}</span>
                                <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ) : (
                        <p className="text-sm text-muted-foreground p-3 sm:p-6">No events found.</p>
                      )}
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem value={eventName || eventSearch}>
                          <div className="space-y-3 w-full">
                            <h1 className="text-base font-bold tracking-tight">Create Event</h1>
                            <div className="space-y-2">
                              <Label htmlFor="eventName">
                                Event name <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="eventName"
                                name="eventName"
                                value={eventName || eventSearch}
                                onChange={(e) => setEventName(e.target.value)}
                              />
                            </div>
                            <DateInput
                              label="Event date"
                              name="eventDate"
                              value={eventDate}
                              onChange={setEventDate}
                              required
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleCreateEvent}
                              className="gap-1"
                              disabled={createDisabled}
                            >
                              Create New Event
                            </Button>
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Coffee shop, Office, Online"
            className="flex-1"
          />
        )}
        <Button type="button" variant={isEventMode ? "default" : "outline"} onClick={handleEventButtonClick}>
          Event
        </Button>
      </div>

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
