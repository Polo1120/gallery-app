const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Error en login");
  return res.json();
}
