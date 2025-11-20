import { Button } from "@components/ui";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { apiMock } from "app/lib/api-mock";
import { Paths } from "app/lib/consts";
import { Contact } from "app/types/contacts";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactCard } from "./contact-card";

export function ViewContactPage() {
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = async () => {
    if (!contactId) {
      setError("No contact ID provided");
      return;
    }

    try {
      setIsLoading(true);
      const result = await apiMock.getContactById(contactId);
      if (result) {
        setContact(result);
      } else {
        setError("Contact not found");
      }
    } catch {
      setError("Failed to load contact");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="flex items-center gap-4">
        <Link to={Paths.CONTACTS}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contacts
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error || !contact ? (
        <InfoCard message={error || "Contact not found"} />
      ) : (
        <ContactCard contact={contact} />
      )}
    </div>
  );
}
