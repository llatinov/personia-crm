import { Dialog, DialogContent, DialogTitle } from "@components/ui";

export function LoaderOverlay() {
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="w-fit border-transparent bg-transparent outline-none shadow-none flex items-center justify-center"
      >
        <DialogTitle></DialogTitle>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </DialogContent>
    </Dialog>
  );
}
