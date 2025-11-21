import { Dialog } from "@capacitor/dialog";
import {
  Button,
  Input,
  Label,
  Plus,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from "@components/ui";
import { DateInput } from "app/components/date-input/date-input";
import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { LocationPicker } from "app/components/location-picker/location-picker";
import { CONTACT_ATTRIBUTES, CustomContactAttributeId, Paths } from "app/lib/consts";
import { newContactAttribute } from "app/lib/contacts";
import { Contact, ContactAttribute, ContactAttributeCategory } from "app/types/contacts";
import { Location } from "app/types/location";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMockContacts } from "../api-mock";
import { AttributeField } from "./attribute-field";

interface Props {
  contact?: Contact;
}

export function ContactForm(props: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetLocation, setMeetLocation] = useState<Location>();
  const [notes, setNotes] = useState("");
  const [attributes, setAttributes] = useState<ContactAttribute[]>([]);
  const [selectedField, setSelectedField] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customFieldName, setCustomFieldName] = useState("");
  const [lastAddedAttributeId, setLastAddedAttributeId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (props.contact) {
      setName(props.contact.name || "");
      setMeetDate(props.contact.meetDate || "");
      setMeetLocation(props.contact.meetLocation);
      setNotes(props.contact.notes || "");
      setAttributes(props.contact.attributes || []);
    }
  }, [props.contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      await Dialog.alert({
        title: "Required fields missing",
        message: "Please enter a name for the contact"
      });
      return;
    }

    const contact = {
      name: name.trim(),
      meetDate: meetDate.trim() || undefined,
      meetLocation: meetLocation,
      notes: notes.trim() || undefined,
      attributes: [] as ContactAttribute[]
    } as Contact;

    attributes.forEach((attr) => {
      if (attr.value.trim()) {
        contact.attributes.push(attr);
      }
    });

    try {
      setIsLoading(true);
      const contactId = await apiMockContacts.createContact(contact);
      navigate(Paths.CONTACTS_VIEW.replace(":contactId", contactId));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAttribute = (fieldType: string) => {
    const newAttribute: ContactAttribute = newContactAttribute(fieldType);
    setAttributes((prev) => [...prev, newAttribute]);
    setSelectedField("");
    setLastAddedAttributeId(newAttribute.id);
  };

  const handleUpdateAttribute = (id: string, updates: Partial<ContactAttribute>) => {
    setAttributes((prev) => prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr)));
  };

  const handleRemoveAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  };

  const closeCustomInput = () => {
    setSelectedField("");
    setShowCustomInput(false);
    setCustomFieldName("");
  };

  const handleAddCustomField = () => {
    if (customFieldName.trim()) {
      handleAddAttribute(customFieldName.trim());
      closeCustomInput();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name">
            What is you contact's name? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <DateInput label="When did you meet?" name="meetDate" value={meetDate} onChange={setMeetDate} />

        <div className="space-y-2">
          <LocationPicker location={meetLocation} label="Where did you meet?" onLocationChange={setMeetLocation} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">What is important about your contact?</Label>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this contact..."
          />
        </div>

        {attributes.length > 0 && (
          <div className="space-y-1 sm:space-y-3">
            {attributes.map((attribute) => (
              <AttributeField
                key={attribute.id}
                attribute={attribute}
                onUpdate={handleUpdateAttribute}
                onRemove={handleRemoveAttribute}
                focus={attribute.id === lastAddedAttributeId}
              />
            ))}
          </div>
        )}

        <div className="space-y-3 pt-2">
          {showCustomInput ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom info name..."
                value={customFieldName}
                onChange={(e) => setCustomFieldName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomField();
                  } else if (e.key === "Escape") {
                    closeCustomInput();
                  }
                }}
                autoFocus
              />
              <Button type="button" onClick={handleAddCustomField} disabled={!customFieldName.trim()}>
                Add
              </Button>
              <Button type="button" variant="outline" onClick={closeCustomInput}>
                Cancel
              </Button>
            </div>
          ) : (
            <Select
              value={selectedField}
              onValueChange={(value) => {
                setSelectedField(value);
                if (value === CustomContactAttributeId) {
                  setShowCustomInput(true);
                } else {
                  handleAddAttribute(value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <SelectValue placeholder="Add Info" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.values(ContactAttributeCategory).map((category) => {
                  const categoryAttrs = Object.entries(CONTACT_ATTRIBUTES).filter(
                    ([_, def]) => def.category === category
                  );

                  if (categoryAttrs.length === 0) return null;

                  return (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{category}</div>
                      {categoryAttrs.map(([id, def]) => (
                        <SelectItem key={id} value={id}>
                          <span className="flex items-center gap-2">
                            <span>{def.icon}</span>
                            <span>{def.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </div>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Adding Contact..." : "Add Contact"}
          </Button>
        </div>
      </form>

      <ErrorOverlay open={isError} onClose={() => setIsError(false)} />
    </div>
  );
}
