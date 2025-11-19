import { Card, CardContent, Input } from "@components/ui";
import { useContacts } from "app/app/contacts-context";
import { Contact } from "app/types/contacts";
import { Search } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "./contact-card";
import { DeleteContactModal } from "./delete-contact-modal";

export function ContactList() {
  const { contacts, searchContacts, deleteContact } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const displayedContacts = searchQuery ? searchContacts(searchQuery) : contacts;

  const handleDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
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
