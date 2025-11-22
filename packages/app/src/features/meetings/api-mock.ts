import { ApiBase } from "app/lib/api-mock";
import type { Meeting } from "app/types/meetings";
import { meetingsRepository } from "./repository";

export class API extends ApiBase {
  protected static instance: API;

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   * Get all meetings
   */
  async getMeetings(): Promise<Meeting[]> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch meetings. Please try again.");
    }

    return meetingsRepository.getAll();
  }

  /**
   * Get a meeting by ID
   */
  async getMeetingById(id: string): Promise<Meeting | undefined> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch meeting. Please try again.");
    }

    return meetingsRepository.getById(id);
  }

  /**
   * Get meetings by contact ID
   */
  async getMeetingsByContactId(contactId: string): Promise<Meeting[]> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch meetings. Please try again.");
    }

    return meetingsRepository.getByContactId(contactId);
  }

  /**
   * Create a new meeting
   */
  async createMeeting(meeting: Meeting): Promise<string> {
    await this.delay();

    if (this.shouldSimulateCreateError()) {
      throw new Error("Failed to create meeting. Please try again.");
    }

    return meetingsRepository.add(meeting).id;
  }

  /**
   * Update a meeting
   */
  async updateMeeting(id: string, meeting: Partial<Meeting>): Promise<boolean> {
    await this.delay();

    if (this.shouldSimulateCreateError()) {
      throw new Error("Failed to update meeting. Please try again.");
    }

    return meetingsRepository.update(id, meeting);
  }

  /**
   * Delete a meeting
   */
  async deleteMeeting(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateDeleteError()) {
      throw new Error("Failed to delete meeting. Please try again.");
    }

    meetingsRepository.delete(id);
  }
}

export const apiMockMeetings = API.getInstance();
