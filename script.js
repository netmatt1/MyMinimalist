// Function to load Markdown content into the main section
async function loadPage(page) {
  try {
    const response = await fetch(`pages/${page}`);
    if (!response.ok) throw new Error('Page not found');
    const markdown = await response.text();

    // Convert Markdown to HTML using a simple Markdown library
    document.getElementById('content').innerHTML = marked.parse(markdown);
  } catch (error) {
    document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
  }
}

// Attach click event listeners to navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    loadPage(page);
  });
});

// Load the default page (Home) on initial load
loadPage('home.md');

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', () => {
  // Toggle the dark-mode class on the body
  document.body.classList.toggle('dark-mode');

  // Save preference in localStorage
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Load Dark Mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
});
