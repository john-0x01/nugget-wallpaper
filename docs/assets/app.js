(function () {
  var yearNodes = document.querySelectorAll('.year');
  var year = new Date().getFullYear().toString();

  yearNodes.forEach(function (node) {
    node.textContent = year;
  });

  var languageSelect = document.querySelector('[data-language-select]');
  if (languageSelect) {
    languageSelect.addEventListener('change', function (event) {
      if (event.target && event.target.value) {
        window.location.href = event.target.value;
      }
    });
  }

  var elements = document.querySelectorAll('.reveal');
  if (!elements.length || !('IntersectionObserver' in window)) {
    elements.forEach(function (element) {
      element.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  elements.forEach(function (element) {
    observer.observe(element);
  });
})();
