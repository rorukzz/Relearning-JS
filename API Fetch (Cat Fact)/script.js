let isFirstPress = true;

async function fetchCatFacts() {
    const button = document.getElementById('refresh-fact');
    const catFactElement = document.getElementById('catFact');

    // Disable the button only if it's not the first press
    if (!isFirstPress) {
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Refresh Cat Fact';
        }, 300000); // 5 minutes
    }
    isFirstPress = false;  // Update the flag after the first press

    try {
        const res = await fetch('https://catfact.ninja/fact');
        const data = await res.json();

        if (catFactElement) {
            catFactElement.textContent = data['fact'];
        } else {
            console.error('Element with id "catFact" not found.');
        }
    } catch (error) {
        console.error('Failed to fetch cat facts:', error);
        if (catFactElement) {
            catFactElement.textContent = 'Couldnt fetch cat fact';
        }
    }
}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-fact');
    refreshButton.addEventListener('click', fetchCatFacts);
});
