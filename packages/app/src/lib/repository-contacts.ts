import { storage } from "app/lib/local-storage";
import type { Contact } from "app/types/contacts";

const STORAGE_KEY = "personia-contacts";

export class ContactsRepository {
  private static instance: ContactsRepository;

  private constructor() {}

  static getInstance(): ContactsRepository {
    if (!ContactsRepository.instance) {
      ContactsRepository.instance = new ContactsRepository();
    }
    return ContactsRepository.instance;
  }

  getAll(): Contact[] {
    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((contact: Contact) => ({
        ...contact,
        createdAt: new Date(contact.createdAt)
      }));
    } catch (error) {
      console.error("Error parsing contacts from storage:", error);
      return [];
    }
  }

  getById(id: string): Contact | null {
    const contacts = this.getAll();
    return contacts.find((contact) => contact.id === id) || null;
  }

  add(contact: Contact): Contact {
    const contacts = this.getAll();
    const newContact: Contact = {
      ...contact,
      name: contact.name as string,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    const updatedContacts = [newContact, ...contacts];
    this.saveAll(updatedContacts);
    return newContact;
  }

  update(id: string, updatedContact: Partial<Contact>): boolean {
    const contacts = this.getAll();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return false;
    }

    contacts[index] = {
      ...contacts[index],
      ...updatedContact,
      name: updatedContact.name as string
    };

    this.saveAll(contacts);
    return true;
  }

  delete(id: string): boolean {
    const contacts = this.getAll();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);

    if (filteredContacts.length === contacts.length) {
      return false;
    }

    this.saveAll(filteredContacts);
    return true;
  }

  search(query: string): Contact[] {
    const contacts = this.getAll();

    if (!query.trim()) {
      return contacts;
    }

    const lowerQuery = query.toLowerCase();
    return contacts.filter((contact) => {
      return Object.entries(contact).some(([key, value]) => {
        if (key === "id" || key === "createdAt") return false;
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  }

  private saveAll(contacts: Contact[]): void {
    storage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  clear(): void {
    storage.removeItem(STORAGE_KEY);
  }
}

export const contactsRepository = ContactsRepository.getInstance();
