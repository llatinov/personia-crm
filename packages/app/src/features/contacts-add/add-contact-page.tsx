import { ContactForm } from "./contact-form";

export default function AddContactPage() {
  return (
    <div className="space-y-2 sm:space-y-6 w-full max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Contact</h1>
        <p className="text-muted-foreground mt-1">Create a new contact in your CRM</p>
      </div>
      <ContactForm />
    </div>
  );
}
