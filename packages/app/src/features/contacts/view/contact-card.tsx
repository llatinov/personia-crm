import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { CONTACT_ATTRIBUTES, CustomContactAttributeIcon } from "app/lib/consts";
import { Contact } from "app/types/contacts";

interface Props {
  contact: Contact;
}

export function ContactCard(props: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{props.contact.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 sm:space-y-3">
          {props.contact.meetDate && (
            <div>
              <span className="font-medium text-muted-foreground">Met on: </span>
              <span>{new Date(props.contact.meetDate).toLocaleDateString()}</span>
            </div>
          )}
          {props.contact.meetLocation && (
            <div>
              <span className="font-medium text-muted-foreground">Met at: </span>
              <span>{props.contact.meetLocation}</span>
            </div>
          )}
          {props.contact.notes && (
            <div>
              <span className="font-medium text-muted-foreground">Notes: </span>
              <span className="whitespace-pre-wrap">{props.contact.notes}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {props.contact.attributes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {props.contact.attributes.map((attr) => {
                const definition = CONTACT_ATTRIBUTES[attr.fieldType];
                return (
                  <div key={attr.id} className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-lg">{definition?.icon || CustomContactAttributeIcon}</span>
                      <span className="text-sm font-medium text-muted-foreground mr-1">
                        {definition?.name || attr.fieldType}:
                      </span>
                      <span>{attr.value}</span>
                    </div>
                    {attr.note && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground mr-1">Notes: </span>
                        <span>{attr.note}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
