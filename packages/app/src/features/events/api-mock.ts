import type { Event } from "app/types/events";
import { eventsRepository } from "./repository";

export class API {
  private static instance: API;
  private simulateDelay: number = 300; // milliseconds
  private simulateErrors: boolean = false;

  private constructor() {}

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   * Configure API simulation settings
   */
  configure(options: { delay?: number; simulateErrors?: boolean }): void {
    if (options.delay !== undefined) {
      this.simulateDelay = options.delay;
    }
    if (options.simulateErrors !== undefined) {
      this.simulateErrors = options.simulateErrors;
    }
  }

  /**
   * Simulate network delay
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.simulateDelay));
  }

  /**
   * Simulate random API errors (for testing)
   */
  private shouldSimulateError(): boolean {
    return this.simulateErrors && Math.random() < 0.1; // 10% error rate
  }

  /**
   * Get all events
   */
  async getEvents(): Promise<Event[]> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch events. Please try again.");
    }

    return eventsRepository.getAll();
  }

  /**
   * Get an event by ID
   */
  async getEventById(id: string): Promise<Event | undefined> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch event. Please try again.");
    }

    return eventsRepository.getById(id);
  }

  /**
   * Create a new event
   */
  async createEvent(event: Event): Promise<string> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to create event. Please try again.");
    }

    return eventsRepository.add(event).id;
  }

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to delete event. Please try again.");
    }

    eventsRepository.delete(id);
  }
}

export const apiMockEvents = API.getInstance();
