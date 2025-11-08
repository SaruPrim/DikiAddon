document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('language', (data) => {
        const lang = data.language || 'angielskiego';
        const url = `https://www.diki.pl/slownik-${lang}`;
        const frame = document.getElementById('dikiFrame');
        frame.src = url;
        console.log("Ustawiono iframe na:", url);
    });
});
