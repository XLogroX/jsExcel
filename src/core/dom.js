class Dom {
  constructor(selector) {
    this._$el = typeof selector === 'string' ?
    document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this._$el.innerHTML = html;
      return this;
    }
    return this._$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this._$el.textContent = text;
      return this;
    }

    return this._$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this._$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this._$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node._$el;
    }

    if (Element.prototype.append) {
      this._$el.append(node);
    } else {
      this._$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this._$el.closest(selector));
  }

  getCoords() {
    return this._$el.getBoundingClientRect();
  }

  get data() {
    return this._$el.dataset;
  }

  focus() {
    this._$el.focus();
  }

  id(parse) {
    if (parse) {
      const id = this.id();
      const parsed = id.split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  findAll(selector) {
    return this._$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this._$el.querySelector(selector));
  }

  addClass(className) {
    this._$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this._$el.classList.remove(className);
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      if (styles[key] === null) {
        this._$el.style[key] = null;
      } else {
        this._$el.style[key] = styles[key];
      }
    });
    if (!this._$el.getAttribute('style')) {
      this._$el.removeAttribute('style');
    }
  }
}

const $ = function(selector) {
  return new Dom(selector);
};

$.create = (tagName, classes = []) => {
  const el = document.createElement(tagName);
  if (classes.length !== 0) {
    el.classList.add(...classes);
  }

  return $(el);
};

export default $;
