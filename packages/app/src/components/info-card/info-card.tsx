import { Card, CardContent } from "@components/ui";

interface Props {
  message: string;
}

export function InfoCard(props: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <p className="text-muted-foreground text-center">{props.message}</p>
      </CardContent>
    </Card>
  );
}
