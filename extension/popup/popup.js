import { getAllItems } from '../lib/storage.js';

const subtitle = document.getElementById('subtitle');
const lockBtn = document.getElementById('lock-btn');
const jarBtn = document.getElementById('jar-btn');

async function refresh() {
  const items = await getAllItems();
  const count = items.filter(i => i.status !== 'shattered').length;
  subtitle.textContent = count === 0
    ? 'Your jar is empty.'
    : `${count} bottle${count === 1 ? '' : 's'} in your jar.`;
}

jarBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('jar/jar.html') });
  window.close();
});

lockBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = chrome.runtime.getURL('lock/lock.html') + `?tabId=${tab.id}`;
  chrome.tabs.create({ url });
  window.close();
});

refresh();
