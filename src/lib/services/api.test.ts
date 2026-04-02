import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    statusText: ok ? 'OK' : 'Bad Request',
    json: () => Promise.resolve(data),
  });
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('api.createRoom', () => {
  it('sends POST request with deck type and settings', async () => {
    mockFetch.mockReturnValue(jsonResponse({ roomId: 'abc123' }));

    const result = await api.createRoom({ deckType: 'fibonacci' });

    expect(result).toEqual({ roomId: 'abc123' });
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/rooms');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({ deckType: 'fibonacci' });
  });

  it('includes settings when provided', async () => {
    mockFetch.mockReturnValue(jsonResponse({ roomId: 'xyz' }));

    await api.createRoom({ deckType: 'tshirt', settings: { autoReveal: true } });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.settings).toEqual({ autoReveal: true });
  });

  it('throws on error response', async () => {
    mockFetch.mockReturnValue(jsonResponse({ message: 'Invalid deck' }, false, 400));

    await expect(api.createRoom({ deckType: 'fibonacci' })).rejects.toThrow('Invalid deck');
  });

  it('throws with statusText when no JSON error body', async () => {
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('no json')),
      }),
    );

    await expect(api.createRoom({ deckType: 'fibonacci' })).rejects.toThrow(
      'Internal Server Error',
    );
  });
});

describe('api.getRoom', () => {
  it('sends GET request for room', async () => {
    const roomData = { room: { id: 'abc', deckType: 'fibonacci' } };
    mockFetch.mockReturnValue(jsonResponse(roomData));

    const result = await api.getRoom('abc');

    expect(result).toEqual(roomData);
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/rooms/abc');
  });

  it('throws on not found', async () => {
    mockFetch.mockReturnValue(jsonResponse({ message: 'Room not found' }, false, 404));

    await expect(api.getRoom('nonexistent')).rejects.toThrow('Room not found');
  });
});
