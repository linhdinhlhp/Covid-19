"use strict";

// JavaScript Document
$.getScript('_global.js');
var html = document.documentElement;
var body = document.body;
var menuLinks = document.querySelectorAll('.admin-menu a');
var collapsed = document.querySelectorAll('.admin-menu .nav-collapsed');
var collapseBtn = document.querySelector('.admin-menu .collapse-btn');
var toggleMobileMenu = document.querySelector('.toggle-mob-menu');
var switchInput = document.querySelector('.switch input');
var switchLabel = document.querySelector('.switch label');
var switchLabelText = switchLabel.querySelector('span:last-child');
var collapsedClass = 'collapsed';
var lightModeClass = 'light-mode';
/*TOGGLE COLLAPSE*/

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = collapsed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var collapseItem = _step.value;
    collapseItem.addEventListener('click', function () {
      //	  this.getAttribute("aria-expanded") == "true"
      //		? this.setAttribute("aria-expanded", "false")
      //		: this.setAttribute("aria-expanded", "true");
      var collapseStatus = this.getAttribute('data-target');

      if (this.getAttribute('class') == 'nav-link nav-collapsed') {
        this.setAttribute('class', 'nav-link');
        this.setAttribute('aria-expanded', 'false');
        document.querySelector(collapseStatus).setAttribute('class', 'collapse show');
      } else {
        this.setAttribute('class', 'nav-link nav-collapsed');
        this.setAttribute('aria-expanded', 'true');
        document.querySelector(collapseStatus).setAttribute('class', 'collapse');
      }
    });
  }
  /*TOGGLE HEADER STATE*/

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

collapseBtn.addEventListener('click', function () {
  body.classList.toggle(collapsedClass);
  document.querySelector('.page-header').classList.toggle('toggled');

  if (this.getAttribute('aria-expanded') == 'true') {
    this.setAttribute('aria-expanded', 'false');
  } else {
    this.setAttribute('aria-expanded', 'true');
  }

  this.getAttribute('aria-label') == 'collapse menu' ? this.setAttribute('aria-label', 'expand menu') : this.setAttribute('aria-label', 'collapse menu');
});
/*TOGGLE MOBILE MENU*/

toggleMobileMenu.addEventListener('click', function () {
  body.classList.toggle('mob-menu-opened');
  this.getAttribute('aria-expanded') == 'true' ? this.setAttribute('aria-expanded', 'false') : this.setAttribute('aria-expanded', 'true');
  this.getAttribute('aria-label') == 'open menu' ? this.setAttribute('aria-label', 'close menu') : this.setAttribute('aria-label', 'open menu');
});
/*SHOW TOOLTIP ON MENU LINK HOVER*/

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = menuLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var link = _step2.value;
    link.addEventListener('mouseenter', function () {
      if (body.classList.contains(collapsedClass) && window.matchMedia('(min-width: 768px)').matches) {
        var tooltip = this.querySelector('span').textContent;
        this.setAttribute('title', tooltip);
      } else {
        this.removeAttribute('title');
      }
    });
  }
  /*TOGGLE LIGHT/DARK MODE*/

} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

if (localStorage.getItem('dark-mode') === 'false') {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = 'Light';
}

switchInput.addEventListener('input', function () {
  html.classList.toggle(lightModeClass);

  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = 'Light';
    localStorage.setItem('dark-mode', 'false');
  } else {
    switchLabelText.textContent = 'Dark';
    localStorage.setItem('dark-mode', 'true');
  }
});