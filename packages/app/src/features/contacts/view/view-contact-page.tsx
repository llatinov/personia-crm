import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { InfoCard } from "app/components/info-card/info-card";
import { Loader } from "app/components/loader/loader";
import { Paths } from "app/lib/consts";
import { Contact } from "app/types/contacts";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiMockContacts } from "../api-mock";
import { ContactCard } from "./contact-card";
import { ContactMeetingsTab } from "./contact-meetings-tab";
import { DeleteContactButton } from "./delete-contact-button";

export function ViewContactPage() {
  const navigate = useNavigate();
  const { contactId } = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

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
      const result = await apiMockContacts.getContactById(contactId);
      if (result) {
        setContact(result);
      } else {
        setError("Contact not found");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="flex items-center justify-between">
        <Link to={Paths.CONTACTS}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contacts
          </Button>
        </Link>
        <DeleteContactButton contact={contact} onDelete={() => navigate(Paths.CONTACTS)} />
      </div>

      {isLoading ? (
        <Loader />
      ) : error || !contact ? (
        <InfoCard message={error || "Contact not found"} />
      ) : (
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <ContactCard contact={contact} />
          </TabsContent>
          <TabsContent value="meetings">
            <ContactMeetingsTab contactId={contact.id} />
          </TabsContent>
        </Tabs>
      )}

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
