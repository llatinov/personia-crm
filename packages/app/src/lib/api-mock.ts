import type { Contact } from "app/types/contacts";
import { contactsRepository } from "./repository-contacts";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

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
  async getContacts(): Promise<ApiResponse<Contact[]>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to fetch contacts. Please try again."
      };
    }

    try {
      const contacts = contactsRepository.getAll();
      return {
        success: true,
        data: contacts
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  /**
   * Get a single contact by ID
   */
  async getContact(id: string): Promise<ApiResponse<Contact>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to fetch contact. Please try again."
      };
    }

    try {
      const contact = contactsRepository.getById(id);
      if (!contact) {
        return {
          success: false,
          error: "Contact not found"
        };
      }
      return {
        success: true,
        data: contact
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  /**
   * Create a new contact
   */
  async createContact(contact: Contact): Promise<ApiResponse<Contact>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to create contact. Please try again."
      };
    }

    try {
      const newContact = contactsRepository.add(contact);
      return {
        success: true,
        data: newContact
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  /**
   * Update an existing contact
   */
  async updateContact(id: string, contact: Partial<Contact>): Promise<ApiResponse<Contact>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to update contact. Please try again."
      };
    }

    try {
      const updated = contactsRepository.update(id, contact);
      if (!updated) {
        return {
          success: false,
          error: "Contact not found"
        };
      }
      const updatedContact = contactsRepository.getById(id);
      return {
        success: true,
        data: updatedContact!
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  /**
   * Delete a contact
   */
  async deleteContact(id: string): Promise<ApiResponse<void>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to delete contact. Please try again."
      };
    }

    try {
      const deleted = contactsRepository.delete(id);
      if (!deleted) {
        return {
          success: false,
          error: "Contact not found"
        };
      }
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }

  /**
   * Search contacts
   */
  async searchContacts(query: string): Promise<ApiResponse<Contact[]>> {
    await this.delay();

    if (this.shouldSimulateError()) {
      return {
        success: false,
        error: "Failed to search contacts. Please try again."
      };
    }

    try {
      const contacts = contactsRepository.search(query);
      return {
        success: true,
        data: contacts
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }
}

export const apiMock = API.getInstance();
