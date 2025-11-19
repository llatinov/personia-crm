import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui";
import { uiSetError, useAppContext } from "app/lib/app-context";
import { Paths } from "app/lib/consts";

interface Props {
  reload?: boolean;
}

export function ErrorOverlay(props: Props) {
  const [state, dispatch] = useAppContext();

  if (!state.hasError) {
    return null;
  }

  const handleClose = () => {
    uiSetError(dispatch, false);
    if (props.reload) {
      window.location.href = Paths.HOME;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Unexpected error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again. If the error persists, please contact support.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
