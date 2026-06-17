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

  // FAQ 手风琴交互逻辑
  var accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var content = item.querySelector('.accordion-content');
      var isActive = item.classList.contains('active');

      // 收起其他所有项
      document.querySelectorAll('.accordion-item').forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
          otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      // 切换当前项
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 视频悬停播放控制 (为后续用户替换为真实 mp4 视频做准备)
  var wallpaperCards = document.querySelectorAll('.wallpaper-card');
  wallpaperCards.forEach(function (card) {
    var video = card.querySelector('video');
    if (video) {
      card.addEventListener('mouseenter', function () {
        video.play().catch(function() {});
      });
      card.addEventListener('mouseleave', function () {
        video.pause();
      });
    }
  });
})();
