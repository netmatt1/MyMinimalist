// Function to load the content of a markdown page
function loadPage(page) {
    var filePath = 'pages/' + page;

    console.log('Loading page:', filePath);  // Log the file being loaded

    // Fetch the Markdown file from the specified path
    fetch(filePath)
        .then(response => {
            console.log('Response status:', response.status); // Log the response status
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(content => {
            // Convert the Markdown to HTML using the 'marked' library
            document.getElementById('content').innerHTML = marked(content);
            console.log('Content loaded and converted successfully');
        })
        .catch(error => {
            // Handle errors if the page couldn't be loaded
            document.getElementById('content').innerHTML = 'Error loading page.';
            console.error('Error loading page:', error);  // Log the error
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

// Handle navigation link clicks
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent default link behavior
        event.preventDefault();

        // Get the page name from the 'data-page' attribute
        const page = this.getAttribute('data-page');

        // Load the page content
        loadPage(page);
    });
});

// Load the default page when the site is loaded
window.onload = function() {
    loadPage('home.md');  // Now references the pages folder and .md files
};
