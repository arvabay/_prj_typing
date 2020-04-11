
import '../../css/menu.css';
import { removeClass } from './helpers';

export const appendMenu = function(elm_root, append_home) {
  
  if (!elm_root) {
    return;
  }

  // FUNCTIONS
  // ========================================
  const changeOpacityColors = function(elm) {
    const children = div_colors.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.opacity = 1;
    }
    elm.style.opacity = CURRENT_ICON_COLOR_OPACITY;
  }

  const changeCssColors = function(obj) {
    document.documentElement.style.setProperty('--color-main', obj.main);
  }

  const clickOnIconColor = function(elm, obj) {
    current_color = obj.color;
    a_colorchange.querySelector('.circle').style.fill = obj.main;
    changeOpacityColors(elm);
    changeCssColors(obj);
  }

  const replyMenu = function() {
    div_form_and_colors.classList.remove('menu__colors-deploy');
    div_form_and_colors.classList.add('menu__colors-deploy-reverse');
  }

  // VARIABLES (others)
  // ========================================
  let current_color = 'blue';
  const CURRENT_ICON_COLOR_OPACITY = 0.25;
  const HOME_HREF = './index.html';
  const colors = [
    {color: 'green', main: '#67D20A'},
    {color: 'blue', main: '#0ABDD2'},
    {color: 'orange', main: '#FF9646'},
    {color: 'green', main: '#67D20A'}
  ];

  // VARIABLES (DOM elements)
  // ========================================
  const div_form = document.createElement('div');
  const div_form_1 = document.createElement('div');
  const div_form_2 = document.createElement('div');
  const div_colors_container = document.createElement('div');
  const div_colors = document.createElement('div');
  const div_form_and_colors = document.createElement('div');
  const div = document.createElement('div');
  const a_home = document.createElement('a');
  const a_colorchange = document.createElement('a');
  


  // Creating triangle form (2 forms for simulating border)
  div_form.classList.add('menu__form');
  div_form_1.classList.add('menu__form1');
  div_form_2.classList.add('menu__form2');
  div_form.appendChild(div_form_1);
  div_form.appendChild(div_form_2);
  // Creating colors selection panel
  div_colors_container.classList.add('menu__colorscontainer');
  div_colors_container.appendChild(div_colors);
  div_colors.classList.add('menu__colors');
  colors.forEach( (obj) => {
    const div = document.createElement('div');
    div.classList.add('menu__iconcolor');
    div.style.background = obj.main;
    div_colors.appendChild(div);
    if (current_color === obj.color) {
      div.style.opacity = CURRENT_ICON_COLOR_OPACITY;
    }
    // CLICK on icon color selection
    div.addEventListener('click', function(e) {
      clickOnIconColor(e.target || e.srcElement, obj);
    });
  });
  div_form_and_colors.classList.add('menu__formsandcolor');
  div_form_and_colors.appendChild(div_form);
  div_form_and_colors.appendChild(div_colors_container);
  div_form_and_colors.addEventListener('click', function(e) {
    // prevent the event body click closing colors picker
    e.stopPropagation();
  });

  // Creating main menu buttons (svg icons)
  div.classList.add('menu__items');
  a_home.classList.add('menu__item');
  a_home.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40.932" height="27.566" viewBox="0 0 40.932 27.566"><g transform="translate(-7164.068 51.821)"><rect width="39" height="4" rx="1" transform="translate(7166 -40)" fill="#fff"/><rect width="19.3" height="4.331" rx="1" transform="translate(7164.068 -38.174) rotate(-45)" fill="#fff"/><rect width="19.3" height="4.331" rx="1" transform="translate(7167.479 -40.965) rotate(45)" fill="#fff"/></g></svg>';
  a_home.href = HOME_HREF;
  a_colorchange.classList.add('menu__item');
  a_colorchange.innerHTML = '<svg class="color-change" xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32"><g class="color-change" transform="translate(-7229 51)"><g class="color-change" transform="translate(7229 -46)" fill="none" stroke="#fff" stroke-width="3"><circle class="color-change" cx="13.5" cy="13.5" r="13.5" stroke="none"/><circle class="color-change" cx="13.5" cy="13.5" r="12" fill="none"/></g><g class="circle color-change" transform="translate(7243 -51)" fill="#0abdd2" stroke="#fff" stroke-width="3"><circle class="color-change" cx="8.5" cy="8.5" r="8.5" stroke="none"/><circle class="color-change" cx="8.5" cy="8.5" r="7" fill="none"/></g></g></svg>';

  // Appending everything to original DOM node passed
  if (append_home) { div.appendChild(a_home); }
  div.appendChild(a_colorchange);
  elm_root.appendChild(div);
  elm_root.appendChild(div_form_and_colors);
  // CLICK on button opening colors selection panel
  a_colorchange.addEventListener('click', function(e) {
    // prevent the body event click - closing colors selection panel
    e.stopPropagation();
    if (!div_form_and_colors.classList.contains('menu__colors-deploy')) {
      removeClass(div_form_and_colors, 'menu__colors-deploy-reverse');
      div_colors.style.display = 'flex';
      div_form_1.style.display = 'inline-block';
      div_form_2.style.display = 'inline-block';
      div_form_and_colors.classList.add('menu__colors-deploy');
    } else {
      replyMenu();
    }
  });
  document.body.addEventListener('click', function(e) {
    replyMenu();
  });


};