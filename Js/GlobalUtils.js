"use strict";

class GlobalUtils {
  constructor() {}

  /**
   * Random value x between min and max (both inclusive)
   * @param {number} min
   * @param {number} max
   * @returns {number} (min <= x <= max)
   */
  static randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Creates new DOM element with specifed tag, class name and innerText
   * @param {string} tag
   * @param {string} class_name
   * @param {string} text
   * @returns {HTMLElement}
   */
   static createNewDOM(tag = "div", class_name = "", text = "") {
    const new_element = document.createElement(tag);
    new_element.className = class_name;
    new_element.innerText = text;

    return new_element;
  }

  /**
   * Copy any dimensional array
   * @param {*} array
   * @returns
   */
   static copyArray(array) {
    return JSON.parse(JSON.stringify(array));
  }
}
