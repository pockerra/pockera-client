const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Request failed');
  }
  return res.json();
}

export const api = {
  createRoom(data: { deckType: string; settings?: Record<string, unknown> }) {
    return request<{ roomId: string }>('/rooms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getRoom(roomId: string) {
    return request<{ room: Record<string, unknown> }>(`/rooms/${roomId}`);
  },
};
