// Function to load the content of a markdown page
function loadPage(page) {
    // Set the file path to the 'pages' folder, assuming the files are in 'pages' and have .md extension
    var filePath = 'pages/' + page + '.md';

    // Fetch the Markdown file from the specified path
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(content => {
            // Use the 'marked' library to convert Markdown to HTML
            document.getElementById('content').innerHTML = marked(content);
        })
        .catch(error => {
            // Handle errors if the page couldn't be loaded
            document.getElementById('content').innerHTML = 'Error loading page.';
            console.error(error);
        });
}

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');

// Check if dark mode is stored in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Event listener for the dark mode toggle button
toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Store the current dark mode state in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
});

// Load the default page when the site is loaded
window.onload = function() {
    loadPage('home'); // Adjust 'home' to your default page filename (e.g., 'index' or 'home')
};
