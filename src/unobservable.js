// ES module version of unobservable.js for Jest/Node compatibility

class CustomArray {
  constructor(numPreallocated) {
    this.arr = new Array(numPreallocated);
    this.len = 0;
  }
  push(e) {
    this.arr[this.len++] = e;
  }
  removeAt(index) {
    for (let j = index + 1; j < this.len; j++) {
      this.arr[j - 1] = this.arr[j];
    }
    this.len--;
  }
}

function observable(obj, options = {}) {
  options.numPreallocatedHandlers = options.numPreallocatedHandlers || 0;
  options.addDataMembers = typeof options.addDataMembers !== 'undefined' ? options.addDataMembers : true;
  if (options.addDataMembers) {
    obj.callbacks = {};
  }
  obj.on = function (events, fn) {
    let count = 0;
    for (let i = 0, len = events.length; i < len; ++i) {
      let name = '';
      let i2 = events.indexOf(' ', i);
      if (i2 < 0) {
        if (i < events.length) {
          name = events.slice(i);
          count++;
        }
        i = len;
      } else if (i2 - i > 1) {
        name = events.slice(i, i2);
        count++;
        i = i2;
      }
      if (name.length > 0) {
        (this.callbacks[name] = this.callbacks[name] || new CustomArray()).push(fn);
      }
    }
    fn.typed = count > 1;
  };
  obj.off = function (events, fn) {
    if (events === '*') this.callbacks = {};
    else if (fn) {
      let fns = this.callbacks[events];
      for (let i = 0, len = fns.len; i < len; ++i) {
        let cb = fns.arr[i];
        if (cb === fn) {
          fns.removeAt(i);
        }
      }
    } else {
      for (let i = 0, len = events.length; i < len; ++i) {
        let name = '';
        let i2 = events.indexOf(' ', i);
        if (i2 < 0) {
          if (i < events.length) {
            name = events.slice(i);
          }
          i = len;
        } else if (i2 - i > 1) {
          name = events.slice(i, i2);
          i = i2;
        }
        if (name.length > 0) {
          this.callbacks[name] = undefined;
        }
      }
    }
    return this;
  };
  obj.one = function (name, fn) {
    fn.one = true;
    return this.on(name, fn);
  };
  obj.trigger = function (name, arg1, arg2, arg3, arg4) {
    let fns = this.callbacks[name];
    if (!fns) {
      return this;
    }
    for (let i = 0; i < fns.len; i++) {
      let fn = fns.arr[i];
      if (fn.typed) {
        fn.call(this, name, arg1, arg2, arg3, arg4);
      } else {
        fn.call(this, arg1, arg2, arg3, arg4);
      }
      if (fn.one) {
        fns.removeAt(i, 1);
        fn.one = false;
        i--;
      } else if (fns.arr[i] && fns.arr[i] !== fn) {
        i--;
      }
    }
    return this;
  };
  return obj;
}

class Observable {
  constructor() {
    this.callbacks = {};
  }
}

observable(Observable.prototype, { numPreallocatedHandlers: 2, addDataMembers: false });

export { CustomArray, observable, Observable };
