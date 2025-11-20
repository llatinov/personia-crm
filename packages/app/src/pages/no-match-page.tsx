import { Card } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Link } from "react-router-dom";

export default function NoMatchPage() {
  return (
    <div className="h-screen p-3">
      <Card className="h-full p-10">
        <h2>Page not found.</h2>
        <Link to={Paths.HOME} className="a">
          Go to the home page
        </Link>
      </Card>
    </div>
  );
}
