// Bottle It service worker.
// Runs in the background. Registers the right-click menu and the periodic
// "are any bottles ready?" check. Wakes up when its events fire.

// 1. Right-click menu — register once when extension is installed/updated.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'bottleit-lock',
    title: 'Bottle it 🫙',
    contexts: ['page', 'link', 'image', 'selection'],
  });
});

// 2. When the user clicks our menu item, open the lock form.
//    We pass the source tab's ID so the form can scrape its title + og:image.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'bottleit-lock') return;
  const lockUrl = chrome.runtime.getURL('lock/lock.html') + `?tabId=${tab.id}`;
  chrome.tabs.create({ url: lockUrl });
});

// 3. Periodic check: every 5 minutes, look for items whose unlockAt has passed.
//    Notification logic lives here — gets fleshed out in Phase 4.
chrome.alarms.create('bottleit-tick', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== 'bottleit-tick') return;
  // Phase 4 will add: read storage, find ready bottles, fire notifications.
});
