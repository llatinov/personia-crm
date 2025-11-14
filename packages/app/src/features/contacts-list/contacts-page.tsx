import { ContactList } from "./contact-list";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage and search your contacts</p>
        </div>
      </div>
      <ContactList />
    </div>
  );
}
