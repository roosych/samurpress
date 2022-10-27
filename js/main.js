"use strict";

// variables for menu
const _navbar = 'header-menu';
const _navbar_toggle = 'menu-toggle-sidebar';
const _navbar_active = 'active';
const _navbar_fixed = 'has-fixed';
const _navbar_mobile = 'mobile-menu';
const _navbar_break = 992;
const _menu_toggle = 'menu-toggle';
const _menu_sub = 'menu-sub';
const _menu_active = 'menu-active';


const navbar = document.querySelector('.'+_navbar);
const navbar_toggle = document.querySelector('.'+_navbar_toggle);
const menu_toggle = document.querySelectorAll('.'+_menu_toggle);

// Toggle Dropdown Menu
function toggleDropdown(parent, subMenu, _active) {
  if(!parent.classList.contains(_active)){
    parent.classList.add(_active);
    slideDown(subMenu);
  }else{
    parent.classList.remove(_active);
    slideUp(subMenu);
  }
}

// Close Dropdown Menu Siblings
function closeDropdownSiblings(siblings, menu, _sub, _active) {
  Array.from(siblings).forEach(item => {
      if(item.classList.contains(_active) && !menu.classList.contains(_active)){
        item.classList.remove(_active);
        Array.from(item.children).forEach(subItem => {
          if(subItem.classList.contains(_sub)){
            slideUp(subItem);
          }
        });
      }
  });
}

//Dropdown Menu
function menuDropdown(toggle, _sub, _active) {
  toggle.forEach(item => {
    item.addEventListener("click", function(e){
      e.preventDefault();
      let itemParent = item.parentElement;
      let itemSibling = item.nextElementSibling;
      let itemParentSiblings = item.parentElement.parentElement.children;
      closeDropdownSiblings(itemParentSiblings,itemParent,_sub,_active);
      toggleDropdown(itemParent,itemSibling,_active);
    });
  });
}
//Dropdown Menu Init
menuDropdown(menu_toggle, _menu_sub, _menu_active);

// mobile nav class add/remove
function mobileNavInit() {
  if (window.innerWidth <= _navbar_break) {
    navbar.classList.add(_navbar_mobile);
  }
}
mobileNavInit();

function mobileNavResize() {
  if (window.innerWidth <= _navbar_break) {
    navbar.classList.add(_navbar_mobile);
  }else{
    navbar.classList.remove(_navbar_mobile, _navbar_active);
    navbar_toggle.classList.remove(_navbar_active);
  }
}

window.addEventListener('resize', function () {
  if(navbar !== null){
    mobileNavResize();
  }
});

/*  =======================================================
  Mobile nav toggle
========================================================== */
function mobileNavToggle() {
  navbar_toggle.classList.toggle(_navbar_active);
  navbar.classList.toggle(_navbar_active);
}
if(navbar_toggle) {
  navbar_toggle.addEventListener("click", function () {
    mobileNavToggle();
  });
}

/*  =======================================================
  Mobile Remove / close nav when overlay is clicked
========================================================== */
function navOutSideClick(event) {
  if(event.target !== navbar && event.target !== navbar_toggle &&
    event.target.closest('.'+_navbar) == null &&  event.target.closest('.'+_navbar_toggle) == null){
    if(navbar_toggle) {
      navbar_toggle.classList.remove(_navbar_active);
    }
    navbar.classList.remove(_navbar_active);
  }
}

document.addEventListener("click", function (event) {
  navOutSideClick(event);
});

/*  =======================================================
  Preloader
========================================================== */
window.addEventListener("load", function (){
    const preloader = document.querySelector(".preloader");
    preloader.style.display = " none";                  
});
/*  =======================================================
  Search box
========================================================== */
function searchBox(selector, selectorTwo, selectorThree){
    let buttonElem = document.querySelectorAll(selector);
    let searchElem = document.querySelector(selectorTwo);
    let buttonCloseElem = document.querySelectorAll(selectorThree);
    //search open
    buttonElem.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            searchElem.classList.add('active');
        })
    })
    //search close
    buttonCloseElem.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            searchElem.classList.remove('active');
        })
    })
}

searchBox('.search-toggle', '.search-container', '.search-toggle-cancel');

/*  =======================================================
  Scroll to top
========================================================== */
function scrollToTop(selector){
    let scrollBtn = document.getElementById(selector);
    let btnVisibility = () => {
        if (window.scrollY > 500) {
            scrollBtn.style.visibility = "visible";
        } else {
            scrollBtn.style.visibility = "hidden";
        }
    };
    
    document.addEventListener("scroll", () => {
        btnVisibility();
    });

    if(scrollBtn !== null){
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    }
}

scrollToTop("scroll-to-top");

/*  =======================================================
  Set background to div
========================================================== */
function setBg(selector){
    let elem = document.querySelectorAll(selector);
    // Set background to div element
    elem.forEach(item => {
        let dataAttribute = item.getAttribute('data-bg');
        item.style.backgroundImage = 'url(' + dataAttribute + ')';
    })
}
  
setBg('.set-bg');

/*  =======================================================
  Swiper carousel
========================================================== */
function swiperCarousel(selector) {
  let elem = document.querySelectorAll(selector);
  if(elem.length > 0){
    elem.forEach(item => {
      let _breakpoints = item.dataset.breakpoints ? JSON.parse(item.dataset.breakpoints) : null;
      let _autoplay = item.dataset.autoplay ? JSON.parse(item.dataset.autoplay) : false;
      let _loop = item.dataset.loop ? JSON.parse(item.dataset.loop) : false;
      let _centeredSlides = item.dataset.centeredslides ? JSON.parse(item.dataset.centeredslides) : false;
      let _speed = item.dataset.speed ? parseInt(item.dataset.speed) : 1000;
      let _effect = item.dataset.effect ? item.dataset.effect : '';
      var swiper = new Swiper(item, {
        // Optional parameters
        centeredSlides: _centeredSlides,
        loop: _loop,
        speed: _speed,
        autoplay:_autoplay,
        effect: _effect,
        // Pagination
        pagination: {
          el: item.querySelectorAll(".swiper-pagination")[0],
          type: 'bullets',
          clickable: true,
        },
        // Navigation
        navigation: {
          prevEl: item.querySelectorAll('.swiper-button-prev')[0],
          nextEl: item.querySelectorAll('.swiper-button-next')[0],
          clickable: true,
        },
        breakpoints: _breakpoints,
      });
    });
  }
}

swiperCarousel('.swiper-carousel');

/*  =======================================================
  Progress indicator
========================================================== */
const progressIndicator = document.getElementById("progress-indicator");
function processScroll(){
  let scrollTopPosition = document.documentElement.scrollTop;
  let remaining = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let percentage = (scrollTopPosition / remaining) * 100;
  progressIndicator.style.width = percentage + "%";
}

if(progressIndicator !== null){
  document.addEventListener('scroll', function(){
    processScroll();
  });
}

/*  =======================================================
  Show/Hide passoword
========================================================== */
function showHidePassword(selector){
  let elem = document.querySelectorAll(selector);
  if(elem.length > 0){
    elem.forEach(item => {
      item.addEventListener("click", function(e){
        e.preventDefault();
        let target = document.getElementById(item.getAttribute("href"));
        if(target.type == "password") {
          target.type = "text";
          item.classList.add("is-shown");
        }else{
          target.type = "password";
          item.classList.remove("is-shown");
        }
      });

    });
  }
}

showHidePassword(".password-toggle");
