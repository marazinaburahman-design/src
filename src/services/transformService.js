import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});
export async function transformText({ mode, text, tone, target }) {
  const response = await api.post("/api/transform", {
    mode,
    text,
    tone: mode === "rewrite" ? tone : undefined,
    target: mode === "translate" ? target : undefined,
  });
  return response.data?.output ?? response.data?.text ?? "";
}
