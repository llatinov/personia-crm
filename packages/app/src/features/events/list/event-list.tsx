import { Input } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Event } from "app/types/events";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { apiMockEvents } from "../api-mock";
import { EventCard } from "./event-card";

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const response = await apiMockEvents.getEvents();
      setEvents(response || []);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedEvents = searchQuery
    ? events.filter((event) => {
        const lowerQuery = searchQuery.toLowerCase();
        return Object.entries(event).some(([key, value]) => {
          if (key === "id" || key === "createdAt") return false;
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowerQuery);
          }
          return false;
        });
      })
    : events;

  return (
    <div className="space-y-6 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events by name, location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : displayedEvents.length === 0 ? (
        <InfoCard
          message={
            searchQuery ? "No events found matching your search" : "No events yet. Add your first event to get started!"
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} onEventDelete={async () => await loadEvents()} />
          ))}
        </div>
      )}

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
