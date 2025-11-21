import { storage } from "app/lib/local-storage";
import type { Meeting } from "app/types/meetings";

const STORAGE_KEY = "personia-crm-meetings";

export class MeetingsRepository {
  private static instance: MeetingsRepository;

  private constructor() {}

  static getInstance(): MeetingsRepository {
    if (!MeetingsRepository.instance) {
      MeetingsRepository.instance = new MeetingsRepository();
    }
    return MeetingsRepository.instance;
  }

  getAll(): Meeting[] {
    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((meeting: Meeting) => ({
        ...meeting,
        createdAt: new Date(meeting.createdAt)
      }));
    } catch (error) {
      console.error("Error parsing meetings from storage:", error);
      return [];
    }
  }

  getById(id: string): Meeting | undefined {
    const meetings = this.getAll();
    return meetings.find((meeting) => meeting.id === id);
  }

  getByContactId(contactId: string): Meeting[] {
    const meetings = this.getAll();
    return meetings.filter((meeting) => meeting.contactId === contactId);
  }

  getByEventId(eventId: string): Meeting[] {
    const meetings = this.getAll();
    return meetings.filter((meeting) => meeting.location?.location === eventId);
  }

  add(meeting: Meeting): Meeting {
    const meetings = this.getAll();
    const newMeeting: Meeting = {
      ...meeting,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    const updatedMeetings = [newMeeting, ...meetings];
    this.saveAll(updatedMeetings);
    return newMeeting;
  }

  update(id: string, updatedMeeting: Partial<Meeting>): boolean {
    const meetings = this.getAll();
    const index = meetings.findIndex((meeting) => meeting.id === id);

    if (index === -1) {
      return false;
    }

    meetings[index] = {
      ...meetings[index],
      ...updatedMeeting
    };

    this.saveAll(meetings);
    return true;
  }

  delete(id: string): boolean {
    const meetings = this.getAll();
    const filteredMeetings = meetings.filter((meeting) => meeting.id !== id);

    if (filteredMeetings.length === meetings.length) {
      return false;
    }

    this.saveAll(filteredMeetings);
    return true;
  }

  search(query: string): Meeting[] {
    const meetings = this.getAll();

    if (!query.trim()) {
      return meetings;
    }

    const lowerQuery = query.toLowerCase();
    return meetings.filter((meeting) => {
      if (meeting.notes?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      if (meeting.location?.location.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      return false;
    });
  }

  private saveAll(meetings: Meeting[]): void {
    storage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  }

  clear(): void {
    storage.removeItem(STORAGE_KEY);
  }
}

export const meetingsRepository = MeetingsRepository.getInstance();
