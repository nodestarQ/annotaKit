// Background service worker
chrome.commands.onCommand.addListener((command) => {
	if (command === 'toggle-annotakit') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tabId = tabs[0]?.id;
			if (tabId) {
				chrome.tabs.sendMessage(tabId, { type: 'toggle' });
			}
		});
	}
});
