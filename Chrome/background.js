chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "dikiSearch",
        title: "Wyszukaj w Diki słowo: \"%s\"",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "dikiSearch") {
        const selectedText = info.selectionText;
        const url = `https://www.diki.pl/slownik-angielskiego?q=${encodeURIComponent(selectedText)}`;
        chrome.windows.create({
            url: url,
            type: "popup",
            width: 750,
            height: 600
        });
    }
});
