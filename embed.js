// Place this script in a WordPress HTML block or use a plugin to insert site-wide
(function() {
  const script = document.createElement('script');
  script.src = "https://yourdomain.com/widget.js"; // replace with deployed script URL
  script.defer = true;
  document.body.appendChild(script);
})();
