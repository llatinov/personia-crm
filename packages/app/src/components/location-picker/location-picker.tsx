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
  CommandSeparator,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@components/ui";
import { DateInput } from "app/components/date-input/date-input";
import { apiMockEvents } from "app/features/events/api-mock";
import { formatDate } from "app/lib/date";
import { Event } from "app/types/events";
import { Location, LocationType } from "app/types/location";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (props.location) {
      setLocationType(props.location.type);
      setLocation(props.location.location);
    }
  }, [props.location]);

  useEffect(() => {
    if (locationType === LocationType.EVENT) {
      loadEvents()
        .then((events: Event[]) => {
          setEvents(events);
        })
        .catch(() => setEvents([]));
      setEventOpen(true);
    } else {
      setLocation("");
    }
  }, [locationType]);

  const loadEvents = async () => {
    const eventsData = await apiMockEvents.getEvents();
    return eventsData;
  };

  const handleCreateEvent = async () => {
    if (!eventSearch.trim()) return;
    const newEvent = {
      name: eventName.trim() || eventSearch.trim(),
      date: eventDate
    } as Event;
    try {
      const eventId = await apiMockEvents.createEvent(newEvent);
      const updatedEvents = await apiMockEvents.getEvents();
      setEvents(updatedEvents);
      setEventOpen(false);
      setEventSearch("");
      props.onLocationChange({ type: locationType, location: eventId });
    } catch (error) {
      console.error("Failed to create event:", error);
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

  return (
    <div className="space-y-2">
      <Label>
        {props.label} {props.required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex gap-2">
        {isEventMode ? (
          <Popover open={eventOpen} onOpenChange={setEventOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={eventOpen} className="flex-1 justify-between">
                {selectedEvent ? selectedEvent.name : "Select event..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 min-w-[400px]">
              <Command>
                <CommandInput placeholder="Search events..." value={eventSearch} onValueChange={setEventSearch} />
                <CommandList>
                  <CommandEmpty>
                    <p className="text-sm text-muted-foreground mb-2">No event found.</p>
                  </CommandEmpty>
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
                        <Check className={`mr-2 h-4 w-4 ${location === event.id ? "opacity-100" : "opacity-0"}`} />
                        <div className="flex flex-col">
                          <span>{event.name}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {eventSearch.trim() && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem className="py-2" value={eventName || eventSearch}>
                          <div className="space-y-1 sm:space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="eventName">Event name</Label>
                              <Input
                                name="eventName"
                                value={eventName || eventSearch}
                                onChange={(e) => setEventName(e.target.value)}
                              />
                            </div>
                            <DateInput label="Event date" name="eventDate" value={eventDate} onChange={setEventDate} />
                            <Button type="button" size="sm" onClick={handleCreateEvent} className="gap-1">
                              Create New Event
                            </Button>
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
    </div>
  );
}
