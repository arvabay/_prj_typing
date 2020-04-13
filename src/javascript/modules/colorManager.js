
import color_themes from '../../../config/color-themes.json';
import { Menu } from '../classes/Menu';

const CURRENT_ICON_COLOR_OPACITY = 0.25;

/**
 * 
 * @param {Menu} menu - Instance of Menu class. Needed for coloring menu DOM icon elements
 * @param {string} color_name - name of the color config ("color: ")
 */
export const loadColorTheme = function(menu, color_name = null) {
  let storage_color = color_name ?? window.localStorage.getItem('color-theme');
  const obj = findTheme(storage_color);
  changeCssColors(obj);
  changeMenuStyle(menu, obj);
}

/**
 * 
 * @param {Menu} menu - Instance of Menu class
 * @param {string} color_name - name of the color config ("color: ")
 */
export const setColorTheme = function(menu, color_name) {
  window.localStorage.setItem('color-theme', color_name);
  loadColorTheme(menu, color_name);
}

/**
 * 
 * @private
 * @param {Object} name - item of list in Colors config file
 */
const changeCssColors = function(obj) {
  document.documentElement.style.setProperty('--color-main', obj.main);
  document.documentElement.style.setProperty('--color-success', obj.success);
  document.documentElement.style.setProperty('--color-gradient', obj.gradient);
  document.documentElement.style.setProperty('--color-maindark', obj.maindark);
}

/**
 * 
 * @private
 * @param {Menu} menu - Instance of Menu class
 * @param {Object} obj - item of list in Colors config file
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
 * @param {string} name - Name of the color theme to find in the list
 */
const findTheme = function(name) {
  const obj = name ? color_themes.list.find( obj => obj.color === name ) :
                      color_themes.list[0];
  return obj;
}