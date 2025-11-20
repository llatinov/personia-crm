import { Button } from "@components/ui";
import { apiMock } from "app/lib/api-mock";
import { Contact } from "app/types/contacts";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteContactModal } from "./delete-contact-modal";

interface Props {
  contact: Contact | null;
  onDelete: () => void;
}

export function DeleteContactButton(props: Props) {
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContactToDelete(props.contact);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    try {
      setIsLoading(true);
      await apiMock.deleteContact(contactToDelete.id);
      setContactToDelete(null);
      props.onDelete();
    } finally {
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
          onOpenChange={(open) => !open && setContactToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      </>
    )
  );
}
