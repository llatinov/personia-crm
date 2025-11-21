import type { Meeting } from "app/types/meetings";
import { meetingsRepository } from "./repository";

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
   * Get all meetings
   */
  async getMeetings(): Promise<Meeting[]> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch meetings. Please try again.");
    }

    return meetingsRepository.getAll();
  }

  /**
   * Get a meeting by ID
   */
  async getMeetingById(id: string): Promise<Meeting | undefined> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch meeting. Please try again.");
    }

    return meetingsRepository.getById(id);
  }

  /**
   * Get meetings by contact ID
   */
  async getMeetingsByContactId(contactId: string): Promise<Meeting[]> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch meetings. Please try again.");
    }

    return meetingsRepository.getByContactId(contactId);
  }

  /**
   * Get meetings by event ID
   */
  async getMeetingsByEventId(eventId: string): Promise<Meeting[]> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch meetings. Please try again.");
    }

    return meetingsRepository.getByEventId(eventId);
  }

  /**
   * Create a new meeting
   */
  async createMeeting(meeting: Meeting): Promise<string> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to create meeting. Please try again.");
    }

    return meetingsRepository.add(meeting).id;
  }

  /**
   * Update a meeting
   */
  async updateMeeting(id: string, meeting: Partial<Meeting>): Promise<boolean> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to update meeting. Please try again.");
    }

    return meetingsRepository.update(id, meeting);
  }

  /**
   * Delete a meeting
   */
  async deleteMeeting(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to delete meeting. Please try again.");
    }

    meetingsRepository.delete(id);
  }
}

export const apiMockMeetings = API.getInstance();
