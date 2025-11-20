import { storage } from "app/lib/local-storage";
import type { Event } from "app/types/events";

const STORAGE_KEY = "personia-events";

export class EventsRepository {
  private static instance: EventsRepository;

  private constructor() {}

  static getInstance(): EventsRepository {
    if (!EventsRepository.instance) {
      EventsRepository.instance = new EventsRepository();
    }
    return EventsRepository.instance;
  }

  getAll(): Event[] {
    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((event: Event) => ({
        ...event,
        createdAt: new Date(event.createdAt)
      }));
    } catch (error) {
      console.error("Error parsing events from storage:", error);
      return [];
    }
  }

  getById(id: string): Event | undefined {
    const events = this.getAll();
    return events.find((event) => event.id === id);
  }

  add(event: Event): Event {
    const events = this.getAll();
    const newEvent: Event = {
      ...event,
      name: event.name as string,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    const updatedEvents = [newEvent, ...events];
    this.saveAll(updatedEvents);
    return newEvent;
  }

  update(id: string, updatedEvent: Partial<Event>): boolean {
    const events = this.getAll();
    const index = events.findIndex((event) => event.id === id);

    if (index === -1) {
      return false;
    }

    events[index] = {
      ...events[index],
      ...updatedEvent,
      name: updatedEvent.name as string
    };

    this.saveAll(events);
    return true;
  }

  delete(id: string): boolean {
    const events = this.getAll();
    const filteredEvents = events.filter((event) => event.id !== id);

    if (filteredEvents.length === events.length) {
      return false;
    }

    this.saveAll(filteredEvents);
    return true;
  }

  search(query: string): Event[] {
    const events = this.getAll();

    if (!query.trim()) {
      return events;
    }

    const lowerQuery = query.toLowerCase();
    return events.filter((event) => {
      return Object.entries(event).some(([key, value]) => {
        if (key === "id" || key === "createdAt") return false;
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  }

  private saveAll(events: Event[]): void {
    storage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  clear(): void {
    storage.removeItem(STORAGE_KEY);
  }
}

export const eventsRepository = EventsRepository.getInstance();
