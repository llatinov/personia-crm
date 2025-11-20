import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Personia CRM</h1>
        <p className="text-muted-foreground mt-1">Your personal contact relationship management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Manage your personal and professional contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Store contact information, track relationships, and keep your network organized.
            </p>
            <Link to={Paths.CONTACTS}>
              <Button>View Contacts</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Contact</CardTitle>
            <CardDescription>Create a new contact entry</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add new people to your contact list with detailed information.
            </p>
            <Link to={Paths.CONTACTS_ADD}>
              <Button variant="outline">Add New Contact</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your contact overview</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track and manage all your relationships in one place. Personia helps you stay connected.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
