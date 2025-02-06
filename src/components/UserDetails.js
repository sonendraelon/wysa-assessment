import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

function UserDetails({ user, onUpdateUser }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const [formData, setFormData] = useState({
    personal: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    address: {
      street: user?.address?.address || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
    },
    company: {
      name: user?.company?.name || "",
      title: user?.company?.title || "",
      department: user?.company?.department || "",
    },
  });

  // Update formData when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        personal: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        address: {
          street: user.address.address,
          city: user.address.city,
          state: user.address.state,
          postalCode: user.address.postalCode,
        },
        company: {
          name: user.company.name,
          title: user.company.title,
          department: user.company.department,
        },
      });
    }
  }, [user]);

  if (!user) return <Typography>Select a user to view details</Typography>;

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (section) => {
    const updatedUser = { ...user };

    switch (section) {
      case "personal":
        Object.assign(updatedUser, formData.personal);
        setIsEditingPersonal(false);
        break;
      case "address":
        updatedUser.address = { ...updatedUser.address, ...formData.address };
        setIsEditingAddress(false);
        break;
      case "company":
        updatedUser.company = { ...updatedUser.company, ...formData.company };
        setIsEditingCompany(false);
        break;
      default:
        break;
    }

    onUpdateUser?.(updatedUser);
  };

  const handleCancel = (section) => {
    setFormData({
      personal: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      address: {
        street: user.address.address,
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.postalCode,
      },
      company: {
        name: user.company.name,
        title: user.company.title,
        department: user.company.department,
      },
    });

    switch (section) {
      case "personal":
        setIsEditingPersonal(false);
        break;
      case "address":
        setIsEditingAddress(false);
        break;
      case "company":
        setIsEditingCompany(false);
        break;
      default:
        break;
    }
  };

  const EditButtons = ({ section, isEditing }) => (
    <>
      {isEditing ? (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            onClick={() => handleSave(section)}
            color="primary"
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleCancel(section)}
            color="error"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <IconButton
          size="small"
          onClick={() => {
            switch (section) {
              case "personal":
                setIsEditingPersonal(true);
                break;
              case "address":
                setIsEditingAddress(true);
                break;
              case "company":
                setIsEditingCompany(true);
                break;
              default:
                break;
            }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* User Details */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, border: 1, borderColor: "divider" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6" component="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.company.title}, {user.address.city}, {user.address.country}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Personal Information */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, border: 1, borderColor: "divider" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">Personal Information</Typography>
          <EditButtons section="personal" isEditing={isEditingPersonal} />
        </Stack>
        {isEditingPersonal ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="First Name"
                value={formData.personal.firstName}
                onChange={(e) =>
                  handleInputChange("personal", "firstName", e.target.value)
                }
              />
              <TextField
                fullWidth
                size="small"
                label="Last Name"
                value={formData.personal.lastName}
                onChange={(e) =>
                  handleInputChange("personal", "lastName", e.target.value)
                }
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={formData.personal.email}
                onChange={(e) =>
                  handleInputChange("personal", "email", e.target.value)
                }
              />
              <TextField
                fullWidth
                size="small"
                label="Phone"
                value={formData.personal.phone}
                onChange={(e) =>
                  handleInputChange("personal", "phone", e.target.value)
                }
              />
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Typography variant="body2">Email: {user.email}</Typography>
            <Typography variant="body2">Phone: {user.phone}</Typography>
          </Stack>
        )}
      </Paper>

      {/* Address */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, border: 1, borderColor: "divider" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">Address</Typography>
          <EditButtons section="address" isEditing={isEditingAddress} />
        </Stack>
        {isEditingAddress ? (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Street Address"
              value={formData.address.street}
              onChange={(e) =>
                handleInputChange("address", "street", e.target.value)
              }
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="City"
                value={formData.address.city}
                onChange={(e) =>
                  handleInputChange("address", "city", e.target.value)
                }
              />
              <TextField
                fullWidth
                size="small"
                label="State"
                value={formData.address.state}
                onChange={(e) =>
                  handleInputChange("address", "state", e.target.value)
                }
              />
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Typography variant="body2">{user.address.address}</Typography>
            <Typography variant="body2">
              {user.address.city}, {user.address.state}{" "}
              {user.address.postalCode}
            </Typography>
          </Stack>
        )}
      </Paper>

      {/* Company */}
      <Paper elevation={0} sx={{ p: 2, border: 1, borderColor: "divider" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">Company</Typography>
          <EditButtons section="company" isEditing={isEditingCompany} />
        </Stack>
        {isEditingCompany ? (
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Company Name"
              value={formData.company.name}
              onChange={(e) =>
                handleInputChange("company", "name", e.target.value)
              }
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Title"
                value={formData.company.title}
                onChange={(e) =>
                  handleInputChange("company", "title", e.target.value)
                }
              />
              <TextField
                fullWidth
                size="small"
                label="Department"
                value={formData.company.department}
                onChange={(e) =>
                  handleInputChange("company", "department", e.target.value)
                }
              />
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Typography variant="body2">{user.company.name}</Typography>
            <Typography variant="body2">
              {user.company.title} - {user.company.department}
            </Typography>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}

export default UserDetails;
