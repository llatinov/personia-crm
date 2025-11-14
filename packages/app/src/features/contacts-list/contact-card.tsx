import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui";
import { Contact } from "app/app/contacts-context";
import { Building, Mail, MapPin, Phone, Trash2 } from "lucide-react";

export function ContactCard({ contact, onDelete }: { contact: Contact; onDelete: (id: string, name: string) => void }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{contact.name}</CardTitle>
            {contact.jobTitle && <CardDescription className="mt-1">{contact.jobTitle}</CardDescription>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(contact.id, contact.name)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0" />
          <a href={`mailto:${contact.email}`} className="hover:text-primary truncate">
            {contact.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0" />
          <a href={`tel:${contact.phone}`} className="hover:text-primary">
            {contact.phone}
          </a>
        </div>
        {contact.company && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4 shrink-0" />
            <span className="truncate">{contact.company}</span>
          </div>
        )}
        {contact.address && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{contact.address}</span>
          </div>
        )}
        {contact.notes && (
          <div className="pt-2 mt-2 border-t text-muted-foreground">
            <p className="text-xs line-clamp-2">{contact.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
