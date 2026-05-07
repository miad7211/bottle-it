import { getAllItems } from '../lib/storage.js';
import { BOTTLE_TYPES } from '../lib/bottles.js';
import { isReady, formatRemaining } from '../lib/timer.js';

const $bounds = document.getElementById('jar-bounds');
const $empty = document.getElementById('empty-state');
const $hint = document.getElementById('hint-bar');
const $toast = document.getElementById('toast');

async function render() {
  const items = await getAllItems();
  const visibleItems = items.filter(i => i.status !== 'shattered');

  if (visibleItems.length === 0) {
    $empty.style.display = 'block';
    $bounds.style.display = 'none';
    $hint.textContent = '';
    updateStats(items);
    return;
  }

  $empty.style.display = 'none';
  $bounds.style.display = 'block';
  $hint.textContent = 'hover any bottle for details · click to open';

  const now = Date.now();
  $bounds.innerHTML = visibleItems.map(item => {
    const bottle = BOTTLE_TYPES[item.bottleType];
    const ready = isReady(now, item.unlockAt) && item.status === 'locked';
    const stateClass = ready ? 'ready' : item.status;
    const countdown = ready ? '✨ ready!' : formatRemaining(now, item.unlockAt);
    const px = (item.position?.x ?? 0.5) * 100;
    const py = (item.position?.y ?? 0.5) * 100;
    const dx = item.animDelay?.x ?? 0;
    const dy = item.animDelay?.y ?? 0;
    const dr = item.animDelay?.r ?? 0;
    const style = [
      `left: calc(${px}% - 48px)`,
      `top: calc(${py}% - 48px)`,
      `--delay-x: ${dx}s`,
      `--delay-y: ${dy}s`,
      `--delay-r: ${dr}s`,
      `--dur-x: ${10 + (item.id.charCodeAt(5) % 6)}s`,
      `--dur-y: ${7 + (item.id.charCodeAt(6) % 5)}s`,
      `--dur-r: ${5 + (item.id.charCodeAt(7) % 4)}s`,
    ].join('; ');
    return `
      <div class="bottle ${stateClass}" data-id="${item.id}" style="${style}">
        <span class="emoji">${bottle.emoji}</span>
        <div class="tooltip">${escapeHtml(item.productName)} · ${countdown}</div>
      </div>
    `;
  }).join('');

  $bounds.querySelectorAll('.bottle').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      chrome.tabs.create({ url: chrome.runtime.getURL(`unlock/unlock.html?id=${id}`) });
    });
  });

  updateStats(items);
  maybeShowFirstAppearanceToast(items);
}

function updateStats(items) {
  const bottles = items.filter(i => i.status !== 'shattered').length;
  const saved = items
    .filter(i => i.status === 'opened-tossed')
    .reduce((s, i) => s + (i.price || 0), 0);
  const bought = items
    .filter(i => i.status === 'opened-bought')
    .reduce((s, i) => s + (i.price || 0), 0);
  document.getElementById('stat-bottles').textContent = bottles;
  document.getElementById('stat-saved').textContent = `$${saved}`;
  document.getElementById('stat-bought').textContent = `$${bought}`;
}

async function maybeShowFirstAppearanceToast(items) {
  const SEEN_KEY = 'bottleit_seen_types';
  const { [SEEN_KEY]: seen = [] } = await chrome.storage.sync.get(SEEN_KEY);
  const present = new Set(
    items.filter(i => i.status !== 'shattered').map(i => i.bottleType)
  );
  const newTypes = [...present].filter(t => !seen.includes(t));
  if (newTypes.length === 0) return;

  $toast.hidden = false;
  $toast.textContent = 'a new kind of bottle has appeared in your jar ✨';
  setTimeout(() => { $toast.hidden = true; }, 4000);
  await chrome.storage.sync.set({ [SEEN_KEY]: [...seen, ...newTypes] });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

render();
setInterval(render, 30 * 1000);
