const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    token,
    body,
    headers = {},
  } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  login: (payload) => apiRequest('/api/auth/login', { method: 'POST', body: payload }),
  register: (payload) => apiRequest('/api/auth/register', { method: 'POST', body: payload }),
};

export const dashboardApi = {
  getSummary: (token) => apiRequest('/api/dashboard', { token }),
};

export const jobsApi = {
  getAll: (params, token) => {
    const query = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      query.append(key, String(value));
    });

    const suffix = query.toString() ? `?${query.toString()}` : '';
    return apiRequest(`/api/jobs${suffix}`, { token });
  },
  create: (payload, token) => apiRequest('/api/jobs', { method: 'POST', body: payload, token }),
  update: (id, payload, token) => apiRequest(`/api/jobs/${id}`, { method: 'PUT', body: payload, token }),
  remove: (id, token) => apiRequest(`/api/jobs/${id}`, { method: 'DELETE', token }),
};

export { API_BASE_URL };
