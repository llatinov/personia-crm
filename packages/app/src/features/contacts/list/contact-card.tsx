import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Contact, ContactAttribute } from "app/types/contacts";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteContactButton } from "../delete/delete-contact-button";

interface Props {
  contact: Contact;
  onContactDelete: () => void;
}

export function ContactCard(props: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(Paths.CONTACTS_VIEW.replace(":contactId", props.contact.id));
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{props.contact.name}</CardTitle>
          </div>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <DeleteContactButton contact={props.contact} onDelete={props.onContactDelete} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0" />
          <a
            href={`mailto:${props.contact.attributes.find((attr: ContactAttribute) => attr.fieldType === "email")?.value}`}
            className="hover:text-primary truncate"
            onClick={handleEmailClick}
          >
            {props.contact.attributes.find((attr: ContactAttribute) => attr.fieldType === "email")?.value}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
