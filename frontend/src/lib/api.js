 
// frontend/src/lib/api.js (Ensure this change is applied)

const BASE_URL = import.meta.env.VITE_API_URL || ''; 

const api = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`; 
  // ... rest of the code


  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
};

export default api;