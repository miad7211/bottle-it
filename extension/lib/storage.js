// Wrapper around Chrome's built-in chrome.storage.sync.
// We keep all locked items as a single array under one key.
// chrome.storage.sync auto-syncs across the user's Chrome browsers
// when they're signed in — that's why we don't need a backend.

const KEY = 'bottleit_items';

export async function getAllItems() {
  const result = await chrome.storage.sync.get(KEY);
  return result[KEY] || [];
}

export async function saveItem(item) {
  const items = await getAllItems();
  items.push(item);
  await chrome.storage.sync.set({ [KEY]: items });
}

export async function updateItem(id, patch) {
  const items = await getAllItems();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) throw new Error(`Item ${id} not found`);
  items[idx] = { ...items[idx], ...patch };
  await chrome.storage.sync.set({ [KEY]: items });
}

export async function removeItem(id) {
  const items = await getAllItems();
  const filtered = items.filter(i => i.id !== id);
  await chrome.storage.sync.set({ [KEY]: filtered });
}

export function generateId() {
  return `lock_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
}
