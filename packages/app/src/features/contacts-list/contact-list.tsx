import { Card, CardContent, Input } from "@components/ui";
import { useApi } from "app/hooks/use-api";
import { Contact } from "app/types/contacts";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactCard } from "./contact-card";
import { DeleteContactModal } from "./delete-contact-modal";

export function ContactList() {
  const api = useApi();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const response = await api.getContacts();

    if (response.success) {
      setContacts(response.data || []);
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

  const handleDelete = async () => {
    if (!contactToDelete) return;

    const response = await api.deleteContact(contactToDelete.id);

    if (response.success) {
      await loadContacts();
      setContactToDelete(null);
    }
  };

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

      {displayedContacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              {searchQuery
                ? "No contacts found matching your search"
                : "No contacts yet. Add your first contact to get started!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {displayedContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onDelete={() => setContactToDelete(contact)} />
          ))}
        </div>
      )}

      <DeleteContactModal
        contact={contactToDelete}
        onOpenChange={() => setContactToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
