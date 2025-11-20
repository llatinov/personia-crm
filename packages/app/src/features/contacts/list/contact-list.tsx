import { Input } from "@components/ui";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { apiMock } from "app/lib/api-mock";
import { Contact } from "app/types/contacts";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactCard } from "./contact-card";

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const response = await apiMock.getContacts();
      setContacts(response || []);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const displayedContacts = searchQuery
    ? contacts.filter((contact) => {
        const lowerQuery = searchQuery.toLowerCase();
        return Object.entries(contact).some(([key, value]) => {
          if (key === "id" || key === "createdAt") return false;
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowerQuery);
          }
          return false;
        });
      })
    : contacts;

  return (
    <div className="space-y-6 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search contacts by name, email, phone, company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : displayedContacts.length === 0 ? (
        <InfoCard
          message={
            searchQuery
              ? "No contacts found matching your search"
              : "No contacts yet. Add your first contact to get started!"
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {displayedContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onContactDelete={async () => await loadContacts()} />
          ))}
        </div>
      )}
    </div>
  );
}
