'use strict';

window.addEventListener('DOMContentLoaded', () => {

   // slider

   const sliderInner = document.querySelector('.slider__inner');
   const sliderNextBtn = document.querySelector('.slider__arrow_next');
   const sliderPrevBtn = document.querySelector('.slider__arrow_prev');
   const slides = document.querySelectorAll('.slider__item-wrapper');
   const progressBar = document.querySelector('.slider__progress-bar');

   let count = 1;
   let offset = 0;
   let x1 = null;
   let y1 = null;
   let progressWidth = 0;

   sliderInner.style.width = 100 * slides.length + '%';

   function slidesMoveNext() {
      if (offset === (100 / slides.length) * (slides.length - count)) {
         offset = 0;
         progressWidth = (100 / slides.length) * count;
      } else {
         offset += 100 / slides.length;
         progressWidth += 100 / slides.length;
      }

      sliderInner.classList.remove('slider__inner_animation');
      progressBar.style.width = progressWidth + '%';
      sliderInner.style.transform = `translateX(-${offset / count}%)`;
   }

   function slidesMovePrev() {
      if (offset === 0) {
         offset = (100 / slides.length) * (slides.length - count);
         progressWidth = 100;
      } else {
         offset -= (100 / slides.length);
         progressWidth -= 100 / slides.length;
      }

      sliderInner.classList.remove('slider__inner_animation');
      progressBar.style.width = progressWidth + '%';
      sliderInner.style.transform = `translateX(-${offset / count}%)`;
   }

   function slidesWidth(c) {
      slides.forEach(slide => slide.style.width = (100 / slides.length) / c + '%');
      progressWidth = (100 / slides.length) * c;
      count = c;
   }

   if (document.documentElement.clientWidth > 1024) {
      slidesWidth(3);
   } else if (document.documentElement.clientWidth <= 1024 && document.documentElement.clientWidth > 768) {
      slidesWidth(2);
   } else if (document.documentElement.clientWidth <= 768) {
      slidesWidth(1);
      sliderInner.classList.add('slider__inner_animation');
   }

   progressBar.style.width = progressWidth + '%';

   sliderNextBtn.addEventListener('click', slidesMoveNext);
   sliderPrevBtn.addEventListener('click', slidesMovePrev);

   // SWIPER

   sliderInner.addEventListener('touchstart', handleTouchStart);
   sliderInner.addEventListener('touchmove', (e) => {
      let move = handleTouchMove(e);

      if (move === 'prev') {
         slidesMovePrev();
      } else if (move === 'next') {
         slidesMoveNext();
      }
   });

   function handleTouchStart(e) {
      x1 = e.touches[0].clientX;
      y1 = e.touches[0].clientY;
   }

   function handleTouchMove(e) {
      if (!x1 || !y1) {
         return false;
      }

      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      let xDiff = x2 - x1;
      let yDiff = y2 - y1;

      x1 = null;
      y1 = null;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
         if (xDiff > 0) {
            return 'prev';
         } else {
            return 'next';
         }
      }
   }

});