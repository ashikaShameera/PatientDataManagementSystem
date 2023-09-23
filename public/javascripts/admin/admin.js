
const currentPath = window.location.pathname;

const links = document.querySelectorAll('ul li a');

links.forEach((link) => {
  if (link.getAttribute('href') === currentPath) {
    link.parentNode.classList.add('active');
  }
});