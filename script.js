// Function to load the content of a markdown page
function loadPage(page) {
    var filePath = 'pages/' + page;  // We assume the .md extension is already in the data-page attribute

    console.log('Fetching page:', filePath);  // Log to ensure it's calling the correct path

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(content => {
            document.getElementById('content').innerHTML = marked.parse(content);
        })
        .catch(error => {
            document.getElementById('content').innerHTML = 'Error loading page.';
            console.error(error);
        });
}

// Dark Mode Toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('dark-mode-toggle');

    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Event listener for the dark mode toggle button
    toggleButton.addEventListener('click', function () {
        console.log('Dark mode toggle clicked'); // Debug message
        document.body.classList.toggle('dark-mode');

        // Store the current dark mode state in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });
});

// Handle navigation link clicks
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the default link behavior

        const page = this.getAttribute('data-page');  // Get the page name from data-page
        console.log('Clicked on:', page);  // Log to see if the click event is being triggered

        loadPage(page);  // Load the corresponding page
    });
});

// Load the default page when the site is loaded
window.onload = function() {
    loadPage('home.md');  // Adjust to your default page with .md extension
};
