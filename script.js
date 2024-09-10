'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscroolto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnscroolto.addEventListener('click', function (e) {
  const coord = section1.getBoundingClientRect();
  console.log(coord);

  console.log(e.target.getBoundingClientRect());

  section1.scrollIntoView({ behavior: 'smooth' });
});



document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabcontent = document.querySelectorAll('.operations__content');

tabcontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabcontent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

const handleover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleover.bind(0.5));
nav.addEventListener('mouseout', handleover.bind(1));


const header = document.querySelector('.header');

const obscord = nav.getBoundingClientRect().height;

const stickynav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerobserver = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${obscord}px`,
});
headerobserver.observe(header);

const allsections = document.querySelectorAll('.section');
const revealsection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionobserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});

allsections.forEach(function (section) {
  sectionobserver.observe(section);
  section.classList.add('section--hidden')
});

const images = document.querySelectorAll('img[data-src]');

const lazyimg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgobserver = new IntersectionObserver(lazyimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
images.forEach(image => imgobserver.observe(image));

const slides = document.querySelectorAll('.slide');
const btnright = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');
const slider = document.querySelector('.slider');
const dotcontainer = document.querySelector('.dots');

const createdots = function () {
  slides.forEach(function (_, i) {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class ="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdots();

const activatedots = function(slide){
    document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active');
};
activatedots(0);

const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
gotoslide(0);

let curSlide = 0;
let maxSlide = slides.length;
const nextslide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoslide(curSlide);
  activatedots(curSlide);
};

const prevslide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoslide(curSlide);
  activatedots(curSlide);
};
btnright.addEventListener('click', nextslide);

btnleft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevslide();
  }
  e.key === 'ArrowRight' && nextslide();
});

dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    gotoslide(slide);
    activatedots(slide);
  }
});

