import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
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
          <span>{new Date(props.event.date).toLocaleDateString()}</span>
        </div>
        {props.event.location && (
          <div>
            <span className="font-medium text-muted-foreground">Location: </span>
            <span>{props.event.location}</span>
          </div>
        )}
        {props.event.information && (
          <div>
            <span className="font-medium text-muted-foreground">Information: </span>
            <span className="whitespace-pre-wrap">{props.event.information}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
