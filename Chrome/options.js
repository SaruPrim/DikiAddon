document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('lang');
    const status = document.getElementById('status');

    // Wczytaj aktualne ustawienie
    chrome.storage.sync.get('language', (data) => {
        if (data.language) select.value = data.language;
    });

        // Zapisz po zmianie
        select.addEventListener('change', () => {
            const language = select.value;
            chrome.storage.sync.set({ language }, () => {
                status.textContent = 'Zapisano!';
                setTimeout(() => status.textContent = '', 1500);
            });
        });
});
