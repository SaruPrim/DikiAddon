function createMenus() {

    // Usuwa wszystkie stare wpisy
    chrome.contextMenus.removeAll(() => {

        // menu dla zaznaczonego tekstu
        chrome.contextMenus.create({
            id: "dikiSearch",
            title: "Wyszukaj w Diki słowo: \"%s\"",
            contexts: ["selection"]
        });

        // Chrome → action, Firefox → browser_action
        const isMV3 = chrome.runtime.getManifest().manifest_version === 3;

        chrome.contextMenus.create({
            id: "dikiOptions",
            title: "Ustawienia Diki",
            contexts: [isMV3 ? "action" : "browser_action"]
        });
    });
}

chrome.runtime.onInstalled.addListener(createMenus);
chrome.runtime.onStartup.addListener(createMenus);

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "dikiSearch") {
        chrome.storage.sync.get('language', (data) => {
            const lang = data.language || 'angielskiego';
            const selectedText = info.selectionText;
            const url = `https://www.diki.pl/slownik-${lang}?q=${encodeURIComponent(selectedText)}`;
            chrome.windows.create({
                url: url,
                type: "popup",
                width: 750,
                height: 600
            });
        });
    }

    if (info.menuItemId === "dikiOptions") {
        chrome.runtime.openOptionsPage();
    }
});
