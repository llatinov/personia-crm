import type { Contact } from "app/types/contacts";
import { contactsRepository } from "./repository-contacts";

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
   * Get all contacts
   */
  async getContacts(): Promise<Contact[]> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to fetch contacts. Please try again.");
    }

    return contactsRepository.getAll();
  }

  /**
   * Create a new contact
   */
  async createContact(contact: Contact): Promise<void> {
    await this.delay();

    // if (this.shouldSimulateError()) {
    throw new Error("Failed to create contact. Please try again.");
  }

  /**
   * Delete a contact
   */
  async deleteContact(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateError()) {
      throw new Error("Failed to delete contact. Please try again.");
    }

    contactsRepository.delete(id);
  }
}

export const apiMock = API.getInstance();
