import type { Message } from '../shared/messaging.js';

// Toggle annotaKit via keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
	if (command === 'toggle-annotakit') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tabId = tabs[0]?.id;
			if (tabId) {
				chrome.tabs.sendMessage(tabId, { type: 'toggle' } satisfies Message);
			}
		});
	}
});

// Update badge when content script reports state
chrome.runtime.onMessage.addListener((message: Message, sender) => {
	if (message.type === 'state-update' && sender.tab?.id) {
		const count = message.count;
		chrome.action.setBadgeText({
			text: count > 0 ? String(count) : '',
			tabId: sender.tab.id
		});
		chrome.action.setBadgeBackgroundColor({
			color: '#4ade80',
			tabId: sender.tab.id
		});
	}
});

// Propagate settings changes to all tabs
chrome.storage.onChanged.addListener((changes, area) => {
	if (area !== 'local' || !changes['annotakit-settings']) return;

	const newSettings = changes['annotakit-settings'].newValue;
	chrome.tabs.query({}, (tabs) => {
		for (const tab of tabs) {
			if (tab.id) {
				chrome.tabs.sendMessage(tab.id, {
					type: 'settings-changed',
					settings: newSettings
				} satisfies Message).catch(() => {
					// Tab may not have content script loaded
				});
			}
		}
	});
});
