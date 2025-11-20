import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Personia CRM</h1>
        <p className="text-muted-foreground mt-1">Your personal contact relationship management system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Track and manage all your relationships and events in one place. Personia helps you stay connected.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Store contact information, track relationships, and keep your network organized.
            </p>
          </CardContent>
          <CardFooter>
            <Link to={Paths.CONTACTS}>
              <Button>View Contacts</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add new people to your contact list with detailed information.
            </p>
          </CardContent>
          <CardFooter>
            <Link to={Paths.CONTACTS_ADD}>
              <Button variant="outline">Add New Contact</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track events, meetings, and important dates in your calendar.
            </p>
          </CardContent>
          <CardFooter>
            <Link to={Paths.EVENTS}>
              <Button>View Events</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Add new events with date, location, and details.</p>
          </CardContent>
          <CardFooter>
            <Link to={Paths.EVENTS_ADD}>
              <Button variant="outline">Add New Event</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
