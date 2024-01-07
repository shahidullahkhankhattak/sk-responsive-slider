# SK Responsive Slider

## Introduction

Sk responsive slider aka (Shahid khan responsive slider) is a lightweight and customizable JavaScript library for creating simple sliders with transition effects, autoplay, and navigation controls.

## Installation

To use SkResponsiveSlider, include the following JavaScript & css files in your HTML:

```html
<link rel="stylesheet" href="./css/sk-responsive-slider.css" />
<script src="./js/sk-responsive-slider.js"></script>
```

## Getting Started

1. Create a container for your slider in your HTML:

```html
<div class="slider-1">
  <div class="slide">
    <h2>Slide 1</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      voluptatum.
    </p>
    <button>Call for action 1</button>
  </div>
  <!-- more slides go here -->
</div>
```

2. Initialize SkResponsiveSlider in your JavaScript:

```html
<script>
  const slider = new SkResponsiveSlider({
    slider: ".slider-1",
    slide: ".slide",
    autoPlay: true,
    delay: 3000,
    loop: true,
    showArrows: true,
    showDots: true,
  });
</script>
```

## Options

- \`slider\` (required): Selector for the slider container.
- \`slide\` (required): Selector for individual slides within the slider.
- \`autoPlay\` (optional, default: \`true\`): Enable or disable autoplay.
- \`delay\` (optional, default: \`3000\`): Time interval in milliseconds for autoplay.
- \`loop\` (optional, default: \`true\`): Enable or disable looped playback.
- \`showArrows\` (optional, default: \`true\`): Show or hide navigation arrows.
- \`showDots\` (optional, default: \`true\`): Show or hide navigation dots.
- \`height\` (optional): Set a fixed height for the slider container.

## Methods

### \`next()\`

Move to the next slide.

```javascript
slider.next();
```

### \`prev()\`

Move to the previous slide.

```javascript
slider.prev();
```

### \`showSlide(index)\`

Show a specific slide by index.

```javascript
slider.showSlide(2); // Show the third slide
```

## Events

- **Dot Click:** Clicking on a dot navigates to the corresponding slide.

## Styling

Customize the slider appearance using the provided CSS classes. Refer to the CSS section for details.

## CSS Classes

- \`sk__responsive\_\_dots\`: Container for navigation dots.
- \`sk__responsive\_\_dot\`: Individual navigation dot.
- \`sk__responsive\_\_slider\`: Main slider container.
- \`sk__responsive\_\_slide\`: Container for each slide.
- \`sk__responsive\_\_next_slide\`: Button for next slide navigation.
- \`sk__responsive\_\_prev_slide\`: Button for previous slide navigation.
- \`sk__responsive\_\_active_out_left\`: Animation class for the current slide moving out to the left.
- \`sk__responsive\_\_active_out_right\`: Animation class for the current slide moving out to the right.
- \`sk__responsive\_\_active_in_left\`: Animation class for the next slide moving in from the left.
- \`sk__responsive\_\_active_in_right\`: Animation class for the next slide moving in from the right.
- \`sk__responsive\_\_active\`: Class indicating the active slide / dot.
- \`sk__responsive\_\_slide_content\`: Container for the content of each slide.

## Examples

### HTML Structure

```html
<div class="slider-1">
  <div class="slide">
    <h2>Slide 1</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      voluptatum.
    </p>
    <button>Call for action 1</button>
  </div>
  <!-- Additional slides -->
</div>
```

### JavaScript Initialization

```javascript
const slider = new SkResponsiveSlider({
  slider: ".slider-1",
  slide: ".slide",
  autoPlay: true,
  delay: 3000,
  loop: true,
  showArrows: true,
  showDots: true,
});
```
