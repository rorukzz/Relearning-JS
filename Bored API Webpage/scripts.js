async function getIdeas() {
    const button = document.getElementById('refresh-fact');  // Ensure this button is used if you have UI logic for it
    const activityElement = document.getElementById('activity'); // Changed from catFact to activity

    // Using a CORS proxy
    const url = 'https://www.boredapi.com/api/activity';  // Corrected API endpoint
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (activityElement) {
            activityElement.textContent = data.activity;
        } else {
            console.error('Element with id "activity" not found.');
        }
    } catch (error) {
        console.error('Failed to fetch activity:', error);
        if (activityElement) {
            activityElement.textContent = "Couldn't fetch activity";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getIdeas();  // Call getIdeas when the DOM is fully loaded
});
