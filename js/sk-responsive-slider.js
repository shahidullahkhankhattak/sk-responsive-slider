const SkResponsiveSlider = function (options) {
  // constants
  const CONSTANTS = {
    DOTS_CONTAINER: "sk__responsive__dots",
    DOT: "sk__responsive__dot",
    SLIDER_CONTAINER: "sk__responsive__slider",
    SLIDE: "sk__responsive__slide",
    NEXT_BTN: "sk__responsive__next_slide",
    PREV_BTN: "sk__responsive__prev_slide",
    SLIDE_ACTIVE_OUT_LEFT: "sk__responsive__active_out_left",
    SLIDE_ACTIVE_OUT_RIGHT: "sk__responsive__active_out_right",
    SLIDE_ACTIVE_IN_LEFT: "sk__responsive__active_in_left",
    SLIDE_ACTIVE_IN_RIGHT: "sk__responsive__active_in_right",
    SLIDE_ACTIVE: "sk__responsive__active",
    SLIDE_CONTENT: "sk__responsive__slide_content",
    DIRECTION_FORWARD: "forward",
    DIRECTION_BACKWARD: "backward",
  };

  // slider object
  const slider = {
    container: null,
    slides: [],
    active: 0,
  };

  // SLIDER METHODS [start]
  slider.initializeDots = () => {
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add(CONSTANTS.DOTS_CONTAINER);

    slider.slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add(CONSTANTS.DOT);
      dot.setAttribute("data-index", index);
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", slider.handleDotClick);
    });

    slider.container.appendChild(dotsContainer);
  };

  slider.activateDot = (index) => {
    const dots = slider.container.querySelectorAll(`.${CONSTANTS.DOT}`);
    dots.forEach((dot) => {
      dot.classList.remove(CONSTANTS.SLIDE_ACTIVE);
    });
    dots[index].classList.add(CONSTANTS.SLIDE_ACTIVE);
  };

  slider.handleDotClick = (event) => {
    const dotIndex = parseInt(event.target.getAttribute("data-index"), 10);
    if (!isNaN(dotIndex)) {
      slider.showSlide(dotIndex);
    }
  };

  slider.initializeArrows = () => {
    const nextBtn = document.createElement("button");
    nextBtn.classList.add(CONSTANTS.NEXT_BTN);
    nextBtn.innerHTML = "&#8250;";
    nextBtn.addEventListener("click", slider.next);

    const prevBtn = document.createElement("button");
    prevBtn.classList.add(CONSTANTS.PREV_BTN);
    prevBtn.innerHTML = "&#8249;";
    prevBtn.addEventListener("click", slider.prev);

    slider.container.appendChild(nextBtn);
    slider.container.appendChild(prevBtn);
  };

  slider.next = () => {
    if (options.loop || slider.active < slider.slides.length - 1) {
      slider.showSlide(slider.active + 1);
    }
  };

  slider.prev = () => {
    if (options.loop || slider.active > 0) {
      slider.showSlide(slider.active - 1);
    }
  };

  slider.setSliderHeight = () => {
    const height =
      slider.container.querySelector(
        `.${CONSTANTS.SLIDE_ACTIVE} .${CONSTANTS.SLIDE_CONTENT}`
      ).clientHeight + 50; // 50px buffer height
    if (!options.height) {
      slider.container.style.height = `${height}px`;
    }
  };

  slider.onWindowResize = () => {
    new ResizeObserver(slider.setSliderHeight).observe(slider.container);
  };

  slider.showSlide = (index) => {
    const totalSlides = slider.slides.length;

    if (index >= totalSlides) {
      index = 0;
    } else if (index < 0) {
      index = totalSlides - 1;
    }

    const direction = index >= slider.active ? "forward" : "backward";

    slider.slides.forEach((slide) => {
      slide.classList.remove(
        CONSTANTS.SLIDE_ACTIVE_OUT_LEFT,
        CONSTANTS.SLIDE_ACTIVE_OUT_RIGHT,
        CONSTANTS.SLIDE_ACTIVE_IN_LEFT,
        CONSTANTS.SLIDE_ACTIVE_IN_RIGHT,
        CONSTANTS.SLIDE_ACTIVE
      );
    });

    const currentSlide = slider.slides[slider.active];
    const nextSlide = slider.slides[index];

    currentSlide.classList.add(
      direction === CONSTANTS.DIRECTION_FORWARD
        ? CONSTANTS.SLIDE_ACTIVE_OUT_LEFT
        : CONSTANTS.SLIDE_ACTIVE_OUT_RIGHT
    );

    nextSlide.classList.add(
      direction === CONSTANTS.DIRECTION_FORWARD
        ? CONSTANTS.SLIDE_ACTIVE_IN_RIGHT
        : CONSTANTS.SLIDE_ACTIVE_IN_LEFT
    );
    nextSlide.classList.add(CONSTANTS.SLIDE_ACTIVE);

    slider.active = index;
    slider.activateDot(index);

    // edge case to cover height in case of image loaded after slider initialization
    const images = nextSlide.querySelectorAll("img");
    if (images.length) {
      images.forEach((image) => {
        image.addEventListener("load", slider.setSliderHeight);
      });
    }

    // set slider height to the height of the current slide
    slider.setSliderHeight();
  };

  slider.autoPlay = (delay, loop) => {
    let intervalId;

    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        slider.next();
      }, delay);
    };

    const stopAutoPlay = () => {
      clearInterval(intervalId);
    };

    startAutoPlay();

    slider.container.addEventListener("mouseenter", stopAutoPlay);
    slider.container.addEventListener("mouseleave", startAutoPlay);

    if (!loop) {
      // Stop autoplay when the last slide is reached in non-loop mode
      slider.container.addEventListener("mouseover", () => {
        if (slider.active === slider.slides.length - 1) {
          stopAutoPlay();
        }
      });
    }
  };

  slider.initialize = (opts) => {
    const {
      slider: sliderSelector,
      slide: slideSelector,
      autoPlay = true,
      delay = 3000,
      loop = true,
      showArrows = true,
      showDots = true,
      height,
    } = opts;

    if (!sliderSelector) {
      throw new Error(
        "EsSix slider must be initialized with a selector to slider container."
      );
    }
    if (!slideSelector) {
      throw new Error(
        "EsSix slider must be initialized with a selector to slides."
      );
    }

    const container = document.querySelector(sliderSelector);
    if (!container) {
      throw new Error(
        "EsSix slider could not find a container with the given selector."
      );
    }

    slider.container = container;
    slider.container.classList.add(CONSTANTS.SLIDER_CONTAINER);
    if (height) {
      slider.container.style.height = `${height}px`;
    }

    const slides = Array.from(container.querySelectorAll(slideSelector));
    if (!slides.length) {
      throw new Error(
        "EsSix slider could not find any slides with the given selector."
      );
    }

    // initialize slides
    slider.slides = slides.map((slide) => {
      const slideContainer = document.createElement("div");
      slideContainer.classList.add(CONSTANTS.SLIDE);

      slider.container.appendChild(slideContainer);
      slideContainer.appendChild(slide);
      slide.classList.add(CONSTANTS.SLIDE_CONTENT);

      return slideContainer;
    });

    // initialize dots & buttons
    if (showDots) {
      slider.initializeDots();
    }
    if (showArrows) {
      slider.initializeArrows();
    }

    // initialize auto play
    if (autoPlay) {
      slider.autoPlay(delay, loop);
    }

    // show first slide
    slider.showSlide(0);
    // readjust slider height on window resize
    slider.onWindowResize();
  };

  // SLIDER METHODS [end]

  // initialize slider
  slider.initialize(options);

  return slider;
};
