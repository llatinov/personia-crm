import { Button } from "@components/ui";
import { capacitorMobileDeviceOnly, capacitorScanQrCode } from "app/lib/capacitor";
import { createContactFromQrCode } from "app/lib/contacts";
import { Contact } from "app/types/contacts";
import { useState } from "react";
import { ContactForm } from "./contact-form";

export function AddContactPage() {
  const [contact, setContact] = useState<Contact>();

  const scanQrCode = async () => {
    const result = await capacitorScanQrCode();
    if (result) {
      const contact = createContactFromQrCode(result);
      setContact(contact);
    }
  };

  return (
    <div className="space-y-2 sm:space-y-6 w-full max-w-3xl mx-auto">
      <div className="flex gap-2 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Contact</h1>
          <p className="text-muted-foreground mt-1">Create a new contact in your CRM</p>
        </div>
        {capacitorMobileDeviceOnly() && (
          <div className="flex mt-1 sm:mt-0">
            <Button onClick={scanQrCode}>Scan QR Code</Button>
          </div>
        )}
      </div>
      <ContactForm contact={contact} />
    </div>
  );
}
