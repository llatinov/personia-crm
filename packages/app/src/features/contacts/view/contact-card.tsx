import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { CONTACT_ATTRIBUTES, CustomContactAttributeIcon, Paths } from "app/lib/consts";
import { formatDate } from "app/lib/date";
import { Contact } from "app/types/contacts";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiMockEvents } from "../../events/api-mock";

interface Props {
  contact: Contact;
}

export function ContactCard(props: Props) {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (props.contact.meetLocation?.type === LocationType.EVENT) {
      loadEvent();
    }
  }, [props.contact.meetLocation]);

  const loadEvent = async () => {
    if (props.contact.meetLocation?.location) {
      const eventData = await apiMockEvents.getEventById(props.contact.meetLocation?.location);
      setEvent(eventData);
    }
  };

  const getMeetLocationDisplay = () => {
    if (props.contact.meetLocation?.type === LocationType.EVENT && event) {
      return (
        <Link to={Paths.EVENTS_VIEW.replace(":eventId", event.id)} className="text-primary hover:underline">
          {event.name} ({formatDate(event.date)})
        </Link>
      );
    }
    if (props.contact.meetLocation) {
      return <span>{props.contact.meetLocation.location}</span>;
    }
    return null;
  };

  const meetLocationDisplay = getMeetLocationDisplay();

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
              <span>{formatDate(props.contact.meetDate)}</span>
            </div>
          )}
          {meetLocationDisplay && (
            <div>
              <span className="font-medium text-muted-foreground">Met at: </span>
              {meetLocationDisplay}
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
