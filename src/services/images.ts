import { type UploadImageData } from "../types/Image";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function getToken() {
  return localStorage.getItem("token");
}

export async function uploadImage(data: UploadImageData) {
  const formData = new FormData();

  Object.entries({
    file: data.file,
    dateSpecial: data.dateSpecial,
    title: data.title,
    location: data.location,
    description: data.description,
    tags: JSON.stringify(data.tags),
    taggedUsernames: data.taggedUsernames.join(","),
  }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  try {
    const res = await fetch(`${API_URL}/api/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "x-api-key": API_KEY,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Error al subir imagen: ${errorMsg}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserImages() {
  const res = await fetch(`${API_URL}/api/images`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) console.error("Error al obtener imágenes");
  return res.json();
}

export async function deleteImage(_id: string) {
  const res = await fetch(`${API_URL}/api/images/${_id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) console.error("Error al eliminar imagen");
  return res.json();
}

export async function searchImage(q: string) {
  const res = await fetch(
    `${API_URL}/api/images/search?q=${encodeURIComponent(q)}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "x-api-key": API_KEY,
      },
    }
  );

  if (!res.ok) console.error("Error al buscar imagen");
  return res.json();
}
