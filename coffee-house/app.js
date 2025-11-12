const burger = document.querySelector('.burger')
const burgerMenu = document.querySelector('.burger__menu')
burger.addEventListener('click', () => {
    if(burger.classList.contains('active')) {
        burger.classList.remove('active')
        burgerMenu.classList.remove('active')
        document.documentElement.style.overflow = ''
      } else {
        burger.classList.add('active')
        burgerMenu.classList.add('active')
        document.documentElement.style.overflow = 'hidden'
      }
})
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.remove('active')
  burger.classList.remove('active')
  document.documentElement.style.overflow = ''
})

// carousel
const prev = document.querySelector('.favorite__left')
const next = document.querySelector('.favorite__right')
const items = document.querySelector('.item__container')
let slides = items.getElementsByClassName('favorite__item')
let firstSlide = slides[0]
let lastSlide = slides[slides.length - 1]
let cloneFirst = firstSlide.cloneNode(true)
let cloneLast = lastSlide.cloneNode(true)
let slidesLength = slides.length
items.prepend(cloneLast)
items.append(cloneFirst)

prev.addEventListener('click', shiftSlidePrev)
next.addEventListener('click', shiftSlideNext)
items.addEventListener('transitionend', checkIndex)

let posInitial
let slideSize = items.getElementsByClassName('favorite__item')[0].offsetWidth
let index = 0
let allowShift = true

function shiftSlidePrev() {
    progressItem[index].classList.remove('active')
    items.classList.add('smooth')
    posInitial = items.offsetLeft
    if(allowShift) {
        items.style.left = (posInitial + slideSize) + 'px'
        posInitial = posInitial + slideSize
        index--
    }
    allowShift = false;
}

function shiftSlideNext() {
    progressItem[index].classList.remove('active')
    items.classList.add('smooth')
    posInitial = items.offsetLeft
    if(allowShift) {
        items.style.left = (posInitial - slideSize) + 'px'
        posInitial = (posInitial - slideSize)
        index++
    }
    allowShift = false;
}

let progressItem = document.querySelectorAll('.progress__item')
progressItem[index].classList.add('active')


function checkIndex() {
    items.classList.remove('smooth')
    if(index == -1) {
        items.style.left = -(slidesLength * slideSize) + 'px'
        index = slidesLength - 1
    }
    if(index == slidesLength) {
        items.style.left = -(1 * slideSize) + 'px'
        index = 0
    }
    progressItem[index].classList.add('active')
    allowShift = true
}


// swiper

items.onmousedown = dragStart

items.addEventListener('touchstart', dragStart)
items.addEventListener('touchmove', dragAction)
items.addEventListener('touchend', dragEnd)

let posX1 = 0
let posX2 = 0
let threshold = 100
let posFinal

function dragStart(event) {
    event.preventDefault()
    posInitial = items.offsetLeft

    if(event.type == 'touchstart') {
        posX1 = event.touches[0].clientX
    } else {
        posX1 = event.clientX
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
    }
}

function dragAction(event) {
    if(event.type == 'touchmove') {
        posX2 = posX1 - event.touches[0].clientX
        posX1 = event.touches[0].clientX
    } else {
        posX2 = posX1 - event.clientX
        posX1 = event.clientX
    }
    items.style.left = (items.offsetLeft - posX2) + 'px'
}

function dragEnd(event) {
    posFinal = items.offsetLeft

    if(posFinal - posInitial < -threshold) {
        swipSlideNext()
    } else if(posFinal - posInitial > threshold) {
        swipSlidePrev()
    } else {
        items.style.left = (posInitial) + 'px'
    }
    document.onmouseup = null;
    document.onmousemove = null;
}
function swipSlidePrev() {
    progressItem[index].classList.remove('active')
    items.classList.add('smooth')
    if(allowShift) {
        items.style.left = (posInitial + slideSize) + 'px'
        posInitial = posInitial + slideSize
        index--
    }
    allowShift = false;
}
function swipSlideNext() {
    progressItem[index].classList.remove('active')
    items.classList.add('smooth')
    if(allowShift) {
        items.style.left = (posInitial - slideSize) + 'px'
        posInitial = (posInitial - slideSize)
        index++
    }
    allowShift = false;
}

