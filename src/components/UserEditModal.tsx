import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Field,
  Dropdown,
  Option,
  Avatar,
  Text,
  tokens,
} from "@fluentui/react-components";
import { User } from "../pages/Users";
import { useTheme } from "../theme/ThemeProvider";

interface UserEditModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  // State to track form values
  const [formData, setFormData] = useState({
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    street: user.location.street.name,
    streetNumber: user.location.street.number,
    city: user.location.city,
    state: user.location.state,
    country: user.location.country,
    postcode: user.location.postcode,
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dropdown changes
  const handleDropdownChange =
    (field: string) => (_: any, data: { selectedOptions: string[] }) => {
      if (data.selectedOptions.length > 0) {
        setFormData((prev) => ({
          ...prev,
          [field]: data.selectedOptions[0],
        }));
      }
    };

  // Handle form submission
  const handleSubmit = () => {
    // Create updated user object
    const updatedUser: User = {
      ...user,
      name: {
        title: formData.title,
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      location: {
        ...user.location,
        street: {
          number: Number(formData.streetNumber),
          name: formData.street,
        },
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postcode: formData.postcode,
      },
    };

    onSave(updatedUser);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface
        style={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <DialogBody>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Avatar
                image={{ src: user.picture.large }}
                size={64}
                aria-label={`${user.name.first} ${user.name.last}`}
              />
              <Text size={500} weight="semibold" style={{ marginLeft: "16px" }}>
                {user.name.first} {user.name.last}
              </Text>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <Field label="Title">
                <Dropdown
                  value={formData.title}
                  onOptionSelect={handleDropdownChange("title")}
                >
                  <Option value="Mr">Mr</Option>
                  <Option value="Ms">Ms</Option>
                  <Option value="Mrs">Mrs</Option>
                  <Option value="Dr">Dr</Option>
                </Dropdown>
              </Field>

              <Field label="Gender">
                <Dropdown
                  value={formData.gender}
                  onOptionSelect={handleDropdownChange("gender")}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Dropdown>
              </Field>

              <Field label="First Name" required>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="Last Name" required>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="Email" required>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                />
              </Field>

              <Field label="Phone">
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                />
              </Field>

              <Field label="Street Number">
                <Input
                  name="streetNumber"
                  value={formData.streetNumber.toString()}
                  onChange={handleInputChange}
                  type="number"
                />
              </Field>

              <Field label="Street">
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="City">
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="State/Region">
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="Country">
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </Field>

              <Field label="Postal Code">
                <Input
                  name="postcode"
                  value={formData.postcode.toString()}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default UserEditModal;
