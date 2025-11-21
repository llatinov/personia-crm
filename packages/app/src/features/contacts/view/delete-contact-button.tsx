import { Button } from "@components/ui";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { Contact } from "app/types/contacts";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { apiMockContacts } from "../api-mock";
import { DeleteContactModal } from "./delete-contact-modal";

interface Props {
  contact?: Contact;
  onDelete: () => void;
}

export function DeleteContactButton(props: Props) {
  const [contactToDelete, setContactToDelete] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContactToDelete(props.contact);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    try {
      setIsLoading(true);
      await apiMockContacts.deleteContact(contactToDelete.id);
      props.onDelete();
    } catch {
      setIsError(true);
    } finally {
      setContactToDelete(undefined);
      setIsLoading(false);
    }
  };

  return (
    props.contact && (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteClick}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <DeleteContactModal
          contact={contactToDelete}
          isLoading={isLoading}
          onOpenChange={(open) => !open && setContactToDelete(undefined)}
          onConfirm={handleDeleteConfirm}
        />

        <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
      </>
    )
  );
}
