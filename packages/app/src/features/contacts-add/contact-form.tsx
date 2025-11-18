import { Dialog } from "@capacitor/dialog";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { useContacts } from "app/app/contacts-context";
import { CONTACT_ATTRIBUTES, Paths } from "app/lib/consts";
import { Contact, ContactAttribute, ContactAttributeCategory } from "app/types/contacts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttributeField } from "./attribute-field";

export function ContactForm() {
  const navigate = useNavigate();
  const { addContact } = useContacts();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<ContactAttribute[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customFieldName, setCustomFieldName] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [lastAddedAttributeId, setLastAddedAttributeId] = useState<string | null>(null);

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
      description: description.trim() || undefined,
      attributes: [] as ContactAttribute[]
    } as Contact;

    attributes.forEach((attr) => {
      if (attr.value.trim()) {
        contact.attributes.push(attr);
      }
    });

    addContact(contact);
    navigate(Paths.HOME);
  };

  const handleAddAttribute = (fieldType: string) => {
    const newAttributeId = crypto.randomUUID();
    const newAttribute: ContactAttribute = {
      id: newAttributeId,
      fieldType,
      fieldCategory: CONTACT_ATTRIBUTES[fieldType]?.category || ContactAttributeCategory.Custom,
      value: ""
    };
    setAttributes((prev) => [...prev, newAttribute]);
    setSelectedField("");
    setLastAddedAttributeId(newAttributeId);
  };

  const handleUpdateAttribute = (id: string, updates: Partial<ContactAttribute>) => {
    setAttributes((prev) => prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr)));
  };

  const handleRemoveAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  };

  const handleAddCustomField = () => {
    if (customFieldName.trim()) {
      handleAddAttribute(customFieldName.trim());
      setCustomFieldName("");
      setShowCustomInput(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Contact</CardTitle>
        <CardDescription>Name is required, other attributes are optional</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
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

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                      setShowCustomInput(false);
                      setCustomFieldName("");
                    }
                  }}
                  autoFocus
                />
                <Button type="button" onClick={handleAddCustomField} disabled={!customFieldName.trim()}>
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomFieldName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Select
                  value={selectedField}
                  onValueChange={(value) => {
                    setSelectedField(value);
                    handleAddAttribute(value);
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

                <Button type="button" variant="outline" className="w-full" onClick={() => setShowCustomInput(true)}>
                  Or add custom info
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Add Contact
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(Paths.HOME)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
