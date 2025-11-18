import { Button, Input, Label, Textarea, X } from "@components/ui";
import { CONTACT_ATTRIBUTES, NotesIcon } from "app/lib/consts";
import { ContactAttribute } from "app/types/contacts";
import { useEffect, useRef, useState } from "react";

interface Props {
  attribute: ContactAttribute;
  onUpdate: (id: string, updates: Partial<ContactAttribute>) => void;
  onRemove: (id: string) => void;
  focus?: boolean;
}

export function AttributeField(props: Props) {
  const definition = CONTACT_ATTRIBUTES[props.attribute.fieldType];
  const [showNote, setShowNote] = useState(!!props.attribute.note);
  const inputRef = useRef<HTMLInputElement>(null);

  const icon = definition?.icon || NotesIcon;
  const displayName = definition?.name || props.attribute.fieldType;

  useEffect(() => {
    if (props.focus && inputRef.current) {
      // Delay focus to ensure Select has released focus
      const timeoutId = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [props.focus]);

  return (
    <div className="border rounded-lg p-2 sm:p-4 space-y-1 sm:space-y-3 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-lg">{icon}</span>
          <span className="font-medium">{displayName}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => props.onRemove(props.attribute.id)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Input
        ref={inputRef}
        type="text"
        value={props.attribute.value}
        onChange={(e) => props.onUpdate(props.attribute.id, { value: e.target.value })}
        placeholder={displayName}
      />

      {showNote ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Details</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowNote(false);
                props.onUpdate(props.attribute.id, { note: "" });
              }}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <Textarea
            value={props.attribute.note || ""}
            onChange={(e) => props.onUpdate(props.attribute.id, { note: e.target.value })}
            placeholder="Add a note or comment..."
            className="text-sm"
            rows={3}
          />
        </div>
      ) : (
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowNote(true)} className="h-8 text-xs">
          + Add more details
        </Button>
      )}
    </div>
  );
}
