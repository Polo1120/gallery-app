import { useState, DragEvent } from "react";
import { uploadImage } from "../../services/images";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Alert,
  Snackbar,
  FormLabel,
} from "@mui/material";

export default function UploadImage({ onUpload }: { onUpload: () => void }) {
  const [form, setForm] = useState({
    file: null as File | null,
    preview: null as string | null,
    title: "",
    location: "",
    description: "",
    dateSpecial: "",
    tags: "",
    taggedUsernames: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({
    file: false,
    title: false,
    location: false,
    description: false,
    dateSpecial: false,
    tags: false,
    taggedUsernames: false,
  });

  function handleChange(key: keyof typeof form, value: string | File | null) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateFields() {
    const newErrors = {
      file: !form.file,
      title: !form.title.trim(),
      location: !form.location.trim(),
      description: !form.description.trim(),
      dateSpecial: !form.dateSpecial.trim(),
      tags: !form.tags.trim(),
      taggedUsernames: !form.taggedUsernames.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);
    try {
      await uploadImage({
        file: form.file as File,
        title: form.title,
        location: form.location,
        description: form.description,
        dateSpecial: form.dateSpecial,
        tags: form.tags.split(",").map((t) => t.trim()),
        taggedUsernames: form.taggedUsernames.split(",").map((t) => t.trim()),
      });
      onUpload();
      setIsDragging(true);
      setForm({
        file: null,
        preview: null,
        title: "",
        location: "",
        description: "",
        dateSpecial: "",
        tags: "",
        taggedUsernames: "",
      });
      setErrors({
        file: false,
        title: false,
        location: false,
        description: false,
        dateSpecial: false,
        tags: false,
        taggedUsernames: false,
      });
    } catch {
      alert("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleChange("file", droppedFile);
      handleChange("preview", URL.createObjectURL(droppedFile));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      handleChange("file", selectedFile);
      handleChange("preview", URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveImage = () => {
    handleChange("file", null);
    handleChange("preview", null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, p: 2, borderRadius: 2 }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        paddingBottom={"3.5rem"}
        maxWidth={"960px"}
        margin={"0 auto"}
      >
        {/* Campos adicionales */}
        <Box width="100%">
          <FormLabel>Title</FormLabel>
          <TextField
            type="text"
            value={form.title}
            placeholder="Title for image"
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            required
            error={errors.title}
            helperText={errors.title ? "This field is required" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box width="100%">
          <FormLabel>Location</FormLabel>
          <TextField
            placeholder="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            fullWidth
            required
            error={errors.location}
            helperText={errors.location ? "This field is required" : ""}
          />
        </Box>

        <Box width="100%">
          <FormLabel>Description</FormLabel>
          <TextField
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
            rows={2}
            required
            error={errors.description}
            helperText={errors.description ? "This field is required" : ""}
          />
        </Box>

        <Box width="100%">
          <FormLabel>Special date</FormLabel>
          <TextField
            placeholder="Special date"
            type="date"
            value={form.dateSpecial}
            onChange={(e) => handleChange("dateSpecial", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            error={errors.dateSpecial}
            helperText={errors.dateSpecial ? "This field is required" : ""}
          />
        </Box>

        <Box width="100%">
          <FormLabel>Tags (comma separated)</FormLabel>
          <TextField
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            fullWidth
            required
            error={errors.tags}
            helperText={errors.tags ? "This field is required" : ""}
          />
        </Box>

        <Box width="100%">
          <FormLabel>Tag Usernames (comma separated)</FormLabel>
          <TextField
            placeholder="Tag Usernames (comma separated)"
            value={form.taggedUsernames}
            onChange={(e) => handleChange("taggedUsernames", e.target.value)}
            fullWidth
            required
            error={errors.taggedUsernames}
            helperText={errors.taggedUsernames ? "This field is required" : ""}
          />
        </Box>

        <Box
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            width: "100%",
            backgroundColor: isDragging ? "rgba(0,0,0,0.03)" : "transparent",
            transition: "background-color 0.3s ease",
            boxSizing: "border-box",
          }}
        >
          {!form.preview ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <FormLabel>Drag and drop a photo here</FormLabel>
              <FormLabel>Or click to select a file</FormLabel>

              <Button
                variant="outlined"
                component="label"
                color="success"
                sx={{
                  background: (theme) => theme.palette.secondary.main,
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                Select File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileInput}
                  required
                />
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" flexDirection="column">
              <Box className="image-preview-container-upload">
                <Box
                  className="image-preview-upload"
                  component="img"
                  src={form.preview}
                  alt="View preview"
                  sx={{
                    width: "100%",
                    maxWidth: "250px",
                    maxHeight: 220,
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveImage}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            </Box>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={
            loading ||
            !form.file ||
            !form.title.trim() ||
            !form.location.trim() ||
            !form.description.trim() ||
            !form.dateSpecial.trim() ||
            !form.tags.trim()
          }
          fullWidth
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
        {loading && <CircularProgress size={28} />}
      </Stack>

      <Snackbar
        open={isDragging}
        autoHideDuration={2000}
        sx={{ top: "5rem!important" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setIsDragging(false)}
      >
        <Alert
          onClose={() => setIsDragging(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "success.main",
            color: "info.contrastText",
          }}
        >
          Imagen subida exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}
