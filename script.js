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
