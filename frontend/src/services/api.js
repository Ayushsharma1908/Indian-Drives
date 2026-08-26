const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const payload = await response.json().catch(() => ({ success: false, message: "Invalid server response" }));
  if (!response.ok || !payload.success) throw new Error(payload.message || "Request failed");
  return payload.data;
}

export const api = {
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request("/api/auth/me"),
  journey: () => request("/api/journey"),
  verifyLL: (body) => request("/api/licences/verify/ll", { method: "POST", body: JSON.stringify(body) }),
  verifyDL: (body) => request("/api/licences/verify/dl", { method: "POST", body: JSON.stringify(body) }),
  ll: () => request("/api/licences/ll"),
  dl: () => request("/api/licences/dl"),
  createApplication: (body) => request("/api/applications", { method: "POST", body: JSON.stringify(body) }),
  documents: () => request("/api/documents"),
  updateDocument: (id, body) => request(`/api/documents/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  payments: () => request("/api/payments"),
  createPayment: (body) => request("/api/payments", { method: "POST", body: JSON.stringify(body) }),
  services: () => request("/api/services"),
  serviceRequests: () => request("/api/service-requests"),
  createServiceRequest: (body) => request("/api/service-requests", { method: "POST", body: JSON.stringify(body) }),
  testCentres: () => request("/api/test-centres"),
  slots: (id, date) => request(`/api/test-centres/${id}/slots?date=${date}`),
  appointments: () => request("/api/appointments"),
  createAppointment: (body) => request("/api/appointments", { method: "POST", body: JSON.stringify(body) }),
  testResult: (id, result) => request(`/api/tests/${id}/result`, { method: "POST", body: JSON.stringify({ result }) }),
  notifications: () => request("/api/notifications"),
  readAllNotifications: () => request("/api/notifications/read-all", { method: "PATCH" }),
  askAI: (message) => request("/api/ai/chat", { method: "POST", body: JSON.stringify({ message }) }),
  help: () => request("/api/help")
};
