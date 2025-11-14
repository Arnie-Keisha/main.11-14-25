function toggleOverview() {
    const contentContainer = document.getElementById('tamsOverviewContent');
    const toggleButton = document.getElementById('toggleOverviewBtn');

    if (contentContainer && toggleButton) {
        // Toggles the 'expanded' class
        contentContainer.classList.toggle('expanded');
        
        // Updates the button text
        if (contentContainer.classList.contains('expanded')) {
            toggleButton.textContent = 'Read Less';
        } else {
            toggleButton.textContent = 'Read More';
        }
    }
}