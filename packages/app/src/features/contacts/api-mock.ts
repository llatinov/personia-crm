import { ApiBase } from "app/lib/api-mock";
import type { Contact } from "app/types/contacts";
import { contactsRepository } from "./repository";

export class API extends ApiBase {
  protected static instance: API;

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  /**
   * Get all contacts
   */
  async getContacts(): Promise<Contact[]> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch contacts. Please try again.");
    }

    return contactsRepository.getAll();
  }

  /**
   * Get a contact by ID
   */
  async getContactById(id: string): Promise<Contact | undefined> {
    await this.delay();

    if (this.shouldSimulateGetError()) {
      throw new Error("Failed to fetch contact. Please try again.");
    }

    return contactsRepository.getById(id);
  }

  /**
   * Create a new contact
   */
  async createContact(contact: Contact): Promise<string> {
    await this.delay();

    if (this.shouldSimulateCreateError()) {
      throw new Error("Failed to create contact. Please try again.");
    }

    return contactsRepository.add(contact).id;
  }

  /**
   * Delete a contact
   */
  async deleteContact(id: string): Promise<void> {
    await this.delay();

    if (this.shouldSimulateDeleteError()) {
      throw new Error("Failed to delete contact. Please try again.");
    }

    contactsRepository.delete(id);
  }
}

export const apiMockContacts = API.getInstance();
