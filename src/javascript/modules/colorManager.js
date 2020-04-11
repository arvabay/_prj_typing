
import color_themes from '../../../config/color-themes.json';


const CURRENT_ICON_COLOR_OPACITY = 0.25;

/**
 * 
 * @param {*} menu - Instance of class Menu. Needed for coloring menu DOM icon elements
 */
export const changeColorTheme = function(menu) {
  let storage_color = window.localStorage.getItem('color-theme');
  const obj = findTheme(storage_color);
  changeCssColors(obj);
  changeMenuStyle(menu, obj);
}

/**
 * @private
 * @param {*} name - Name of the color containing the css values 
 */
const changeCssColors = function(obj) {
  document.documentElement.style.setProperty('--color-main', obj.main);
  document.documentElement.style.setProperty('--color-success', obj.success);
  document.documentElement.style.setProperty('--color-gradient', obj.gradient);
}

/**
 * @private
 * @param {*} menu 
 * @param {*} obj 
 */
const changeMenuStyle = function(menu, obj) {
  const elm_colors = menu.getDivColors();
  const elm_btn_colorchange = menu.getBtnColorChange();
  elm_btn_colorchange.querySelector('.circle').style.fill = obj.main;
  const children = elm_colors.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.style.opacity = child.dataset.color === obj.color ? CURRENT_ICON_COLOR_OPACITY : 1
  }
}

/**
 * 
 * @private
 * @param {*} name - Name of the color theme to find in the list
 */
const findTheme = function(name) {
  const obj = name ? color_themes.list.find( obj => obj.color === name ) :
                      color_themes.list[0];
  return obj;
}