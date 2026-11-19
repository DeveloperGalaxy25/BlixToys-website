/* BlixToys Products carousel: button-driven horizontal scrolling */
(() => {
  function initProductsCarousel() {
    const root = document.querySelector('[data-products-carousel]');
    if (!root || root.dataset.carouselReady === 'true') return;

    const track = root.querySelector('[data-products-track]');
    const slides = Array.from(root.querySelectorAll('.products-slide'));
    const controls = root.parentElement;
    const previous = controls.querySelector('[data-products-prev]');
    const next = controls.querySelector('[data-products-next]');
    const progress = controls.querySelector('[data-products-progress]');
    const counter = controls.querySelector('[data-products-count]');

    if (!track || slides.length === 0 || !previous || !next) return;
    root.dataset.carouselReady = 'true';

    let activeIndex = 0;
    let settleTimer;

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const getTargetLeft = (index) => {
      const trackBox = track.getBoundingClientRect();
      const slideBox = slides[index].getBoundingClientRect();
      return Math.max(0, Math.min(maxScroll(),
        track.scrollLeft + slideBox.left - trackBox.left));
    };

    function updateUI() {
      previous.disabled = activeIndex <= 0;
      next.disabled = activeIndex >= slides.length - 1;

      if (counter) {
        counter.textContent =
          `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      }
      if (progress) {
        progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
      }
    }

    function goTo(index) {
      const targetIndex = Math.max(0, Math.min(slides.length - 1, index));
      const targetLeft = getTargetLeft(targetIndex);

      // Assign scrollLeft directly: this works consistently in browsers where
      // scrollTo({behavior:'smooth'}) is ignored or intercepted by CSS.
      activeIndex = targetIndex;
      track.scrollLeft = targetLeft;
      if (typeof track.scrollTo === 'function') {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
      updateUI();
    }

    previous.addEventListener('click', (event) => {
      event.preventDefault();
      goTo(activeIndex - 1);
    });

    next.addEventListener('click', (event) => {
      event.preventDefault();
      goTo(activeIndex + 1);
    });

    function detectActiveSlide() {
      const trackLeft = track.getBoundingClientRect().left;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      activeIndex = nearestIndex;
      updateUI();
    }

    track.addEventListener('scroll', () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(detectActiveSlide, 100);
    }, { passive: true });

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(activeIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
    });

    window.addEventListener('resize', () => {
      goTo(activeIndex);
    }, { passive: true });

    // Disable the controls only when the browser genuinely has no overflow.
    requestAnimationFrame(() => {
      const hasOverflow = maxScroll() > 2;
      previous.disabled = true;
      next.disabled = !hasOverflow || slides.length < 2;
      updateUI();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsCarousel, { once: true });
  } else {
    initProductsCarousel();
  }
})();
