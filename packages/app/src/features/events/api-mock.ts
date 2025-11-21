import { ApiBase } from "app/lib/api-mock";
import type { Event } from "app/types/events";
import { eventsRepository } from "./repository";

export class API extends ApiBase {
  protected static instance: API;

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   * Get all events
   */
  async getEvents(): Promise<Event[]> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch events. Please try again.");
    }

    return eventsRepository.getAll();
  }

  /**
   * Get an event by ID
   */
  async getEventById(id: string): Promise<Event | undefined> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch event. Please try again.");
    }

    return eventsRepository.getById(id);
  }

  /**
   * Create a new event
   */
  async createEvent(event: Event): Promise<string> {
    await this.delay();

    if (this.shouldSimulateCreateError()) {
      throw new Error("Failed to create event. Please try again.");
    }

    return eventsRepository.add(event).id;
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateDeleteError()) {
      throw new Error("Failed to delete event. Please try again.");
    }

    eventsRepository.delete(id);
  }
}

export const apiMockEvents = API.getInstance();
