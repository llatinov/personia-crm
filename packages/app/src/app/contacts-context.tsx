import { Contact } from "app/types/contacts";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ContactsContextType {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  searchContacts: (query: string) => Contact[];
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("personia-contacts");
    if (stored) {
      const parsed = JSON.parse(stored);
      const contactsWithDates = parsed.map((contact: Contact) => ({
        ...contact,
        createdAt: new Date(contact.createdAt)
      }));
      setContacts(contactsWithDates);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("personia-contacts", JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  const addContact = (contact: Contact) => {
    const newContact: Contact = {
      ...contact,
      name: contact.name as string,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  const updateContact = (id: string, updatedContact: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updatedContact,
              name: updatedContact.name as string
            }
          : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const searchContacts = (query: string): Contact[] => {
    if (!query.trim()) return contacts;

    const lowerQuery = query.toLowerCase();
    return contacts.filter((contact) => {
      // Search through all string attributes
      return Object.entries(contact).some(([key, value]) => {
        if (key === "id" || key === "createdAt") return false;
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        searchContacts
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}
