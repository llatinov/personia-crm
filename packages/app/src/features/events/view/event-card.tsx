import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { formatDate } from "app/lib/date";
import { Event } from "app/types/events";

interface Props {
  event: Event;
}

export function EventCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 sm:space-y-3">
        <div>
          <span className="font-medium text-muted-foreground">Date: </span>
          <span>{formatDate(props.event.date)}</span>
        </div>
        {props.event.location && (
          <div>
            <span className="font-medium text-muted-foreground">Location: </span>
            <span>{props.event.location.location}</span>
          </div>
        )}
        {props.event.notes && (
          <div>
            <span className="font-medium text-muted-foreground">Notes: </span>
            <span className="whitespace-pre-wrap">{props.event.notes}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
