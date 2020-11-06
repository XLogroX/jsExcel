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
