/* sunbrand – menu, gallery and slide indicators (replaces the old jQuery theme script) */
(function () {
  var body = document.body;

  /* Full-screen menu */
  var menu = document.querySelector('.menuModal');
  var openBtn = document.querySelector('.header .navToggle');
  function closeMenu() { if (menu) { menu.classList.remove('active'); body.classList.remove('stopScroll'); } }
  if (menu && openBtn) {
    openBtn.addEventListener('click', function () { menu.classList.add('active'); body.classList.add('stopScroll'); });
  }
  if (menu) {
    menu.querySelectorAll('.navToggle, ul a').forEach(function (el) { el.addEventListener('click', closeMenu); });
  }

  /* Archive gallery */
  var modal = document.querySelector('.modelSlider');
  var items = [], idx = 0;
  function show() {
    if (!modal || !items.length) return;
    var it = items[idx];
    modal.querySelector('.sb-g-img').src = it.src;
    modal.querySelector('.sb-g-img').alt = it.cap;
    modal.querySelector('.sb-g-cap').textContent = it.cap;
    var multi = items.length > 1;
    modal.querySelector('.bx-prev').hidden = !multi;
    modal.querySelector('.bx-next').hidden = !multi;
  }
  function openGallery(post) {
    items = Array.prototype.map.call(post.querySelectorAll('.sliderContent li'), function (li) {
      var img = li.querySelector('img'), p = li.querySelector('p');
      return { src: img.getAttribute('src'), cap: p ? p.textContent.trim() : '' };
    });
    if (!items.length) return;
    idx = 0; show();
    modal.classList.add('active'); body.classList.add('stopScroll');
    modal.querySelector('.close').focus();
  }
  function closeGallery() { if (modal) { modal.classList.remove('active'); body.classList.remove('stopScroll'); } }
  if (modal) {
    document.querySelectorAll('.archives .post').forEach(function (post) {
      var hit = post.querySelector('.sb-post-hit');
      (hit || post).addEventListener('click', function () { openGallery(post); });
    });
    modal.querySelectorAll('.curtain, .close').forEach(function (el) { el.addEventListener('click', closeGallery); });
    modal.querySelector('.bx-prev').addEventListener('click', function () { idx = (idx - 1 + items.length) % items.length; show(); });
    modal.querySelector('.bx-next').addEventListener('click', function () { idx = (idx + 1) % items.length; show(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeGallery(); closeMenu(); }
    if (modal && modal.classList.contains('active') && items.length > 1) {
      if (e.key === 'ArrowLeft') { idx = (idx - 1 + items.length) % items.length; show(); }
      if (e.key === 'ArrowRight') { idx = (idx + 1) % items.length; show(); }
    }
  });

  /* Scroll states: menu button, slide dots, in-view slides */
  var dots = document.querySelector('.dotSlider');
  var slidesWrap = document.querySelector('.slides');
  function onScroll() {
    var y = window.pageYOffset;
    if (openBtn) openBtn.classList.toggle('active', y > 250);
    if (dots && slidesWrap) dots.classList.toggle('active', y > slidesWrap.offsetTop && y < slidesWrap.offsetTop + slidesWrap.offsetHeight);
    var half = y + window.innerHeight / 2;
    document.querySelectorAll('.slide').forEach(function (s) {
      var top = s.getBoundingClientRect().top + y;
      var inView = top + s.offsetHeight / 2 > y && top < half;
      s.classList.toggle('in-view', inView);
      var a = s.id && document.querySelector('.dotSlider .' + s.id);
      if (a) a.classList.toggle('active', inView);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
