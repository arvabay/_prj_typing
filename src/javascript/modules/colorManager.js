// import configs
import color_themes from '../../../config/color-themes.json';
// import classes
import { Menu } from '../classes/Menu';

const CURRENT_ICON_COLOR_OPACITY = 0.25;

/**
 * Load a color theme
 * @returns {void}
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
 * Keep in browser memory (local storage) the selected color theme name. Call the color theme load
 * @returns {void}
 * @param {Menu} menu - Instance of Menu class
 * @param {string} color_name - name of the color config ("color: ")
 */
export const setColorTheme = function(menu, color_name) {
  window.localStorage.setItem('color-theme', color_name);
  loadColorTheme(menu, color_name);
}

/**
 * Change CSS variables for each entry in selected color theme (cf. config : color-themes.json)
 * @private
 * @returns {void}
 * @param {Object} obj - Current selected color items-list (color-themes.json)
 */
const changeCssColors = function(obj) {
  Object.entries(obj).forEach( (entry) => {
    if (entry[0] === "color") { return; }
    document.documentElement.style.setProperty('--color-'+entry[0], entry[1]);
  });
}

/**
 * Change appareance of buttons in colors menu selection
 * @private
 * @returns {void}
 * @param {Menu} menu - Instance of Menu class
 * @param {Object} obj - Current selected color items-list (color-themes.json)
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
 * Try to find and return a color-items-list from a given theme-name
 * @private
 * @returns {object}
 * @param {string} name - Name of the color theme to find in the list
 */
const findTheme = function(name) {
  const obj = name ? color_themes.list.find( obj => obj.color === name ) :
                      color_themes.list[0];
  return obj;
}