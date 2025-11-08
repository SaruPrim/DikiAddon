chrome.runtime.onInstalled.addListener(() => {
    // menu po zaznaczeniu tekstu
    chrome.contextMenus.create({
        id: "dikiSearch",
        title: "Wyszukaj w Diki słowo: \"%s\"",
        contexts: ["selection"]
    });

    // menu po kliknięciu PPM na ikonę dodatku
    chrome.contextMenus.create({
        id: "dikiOptions",
        title: "Ustawienia Diki",
        contexts: ["browser_action"]
    });
});

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
