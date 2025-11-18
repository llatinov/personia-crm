import { Button, Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { Contact, ContactAttribute } from "app/types/contacts";
import { Mail, Trash2 } from "lucide-react";

interface Props {
  contact: Contact;
  onDelete: (id: string, name: string) => void;
}

export function ContactCard(props: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{props.contact.name}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => props.onDelete(props.contact.id, props.contact.name)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0" />
          <a
            href={`mailto:${props.contact.attributes.find((attr: ContactAttribute) => attr.fieldType === "email")?.value}`}
            className="hover:text-primary truncate"
          >
            {props.contact.attributes.find((attr: ContactAttribute) => attr.fieldType === "email")?.value}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
