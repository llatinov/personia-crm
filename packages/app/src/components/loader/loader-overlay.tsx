import { Dialog, DialogContent } from "@components/ui";
import { useAppContext } from "app/lib/app-context";

export function LoaderOverlay() {
  const [context] = useAppContext();

  return (
    <Dialog open={context.isLoading}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="w-fit border-transparent bg-transparent outline-none shadow-none flex items-center justify-center"
      >
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </DialogContent>
    </Dialog>
  );
}
