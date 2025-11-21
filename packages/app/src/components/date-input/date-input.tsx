import { Button, Input, Label } from "@components/ui";
import { generateInputDateString } from "app/lib/date";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function DateInput(props: Props) {
  const handleNowClick = () => {
    props.onChange(generateInputDateString());
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={props.name}>
        {props.label} {props.required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex gap-2">
        <Input
          id={props.name}
          name={props.name}
          type="date"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          required={props.required}
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={handleNowClick}>
          Today
        </Button>
      </div>
    </div>
  );
}
