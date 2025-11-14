import { Dialog } from "@capacitor/dialog";
import { Card, CardContent, Input } from "@components/ui";
import { useContacts } from "app/app/contacts-context";
import { Search } from "lucide-react";
import { useState } from "react";
import { ContactCard } from "./contact-card";

export function ContactList() {
  const { contacts, searchContacts, deleteContact } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");

  const displayedContacts = searchQuery ? searchContacts(searchQuery) : contacts;

  const handleDelete = async (id: string, name: string) => {
    const { value } = await Dialog.confirm({
      title: "Confirm user deletion",
      message: `Are you sure you want to delete ${name}?`
    });

    if (value) {
      deleteContact(id);
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
