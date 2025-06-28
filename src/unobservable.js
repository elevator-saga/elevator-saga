// ES module version of unobservable.js for Jest/Node compatibility

/**
 * CustomArray is a simple array-like class that allows preallocation of a fixed number of elements.
 * It provides methods to push elements and remove them at a specific index.
 * @class CustomArray
 * @param {number} numPreallocated - The number of elements to preallocate in the array.
 */
class CustomArray {
  constructor(numPreallocated) {
    this.arr = new Array(numPreallocated);
    this.len = 0;
  }

  /**
   * Pushes an element onto the end of the array.
   * @param {*} e - The element to add to the array.
   */
  push(e) {
    this.arr[this.len++] = e;
  }

  /**
   * Removes an element at a specific index.
   * @param {number} index - The index of the element to remove.
   */
  removeAt(index) {
    for (let j = index + 1; j < this.len; j++) {
      this.arr[j - 1] = this.arr[j];
    }
    this.len--;
  }
}

/**
 * Observable is a lightweight event emitter class that allows registering, deregistering,
 * and triggering event handlers for custom events. It supports registering handlers for
 * multiple events, one-time handlers, and passing arguments to event callbacks.
 *
 * @class Observable
 * @param {Object} [options={}] - Optional configuration object.
 * @param {number} [options.numPreallocatedHandlers=0] - Number of preallocated handler slots for each event.
 *
 * @example
 * const obs = new Observable();
 * obs.on('event1', () => console.log('event1 triggered'));
 * obs.trigger('event1');
 */
class Observable {
  constructor(options = {}) {
    this.callbacks = {};
    this._numPreallocatedHandlers = options.numPreallocatedHandlers || 0;
  }

  /**
   * Registers a callback function for one or more events.
   * If the event name is '*', it registers the callback for all events.
   * If the event name is a space-separated list,
   * it registers the callback for each event in the list.
   * If the callback is already registered for an event, it will not be added again.
   * @param {string} events - A space-separated string of event names or '*' for all events.
   * @param {function} fn - The callback function to register.
   * @returns {Observable} The Observable instance for chaining.
   */
  on(events, fn) {
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
        (this.callbacks[name] = this.callbacks[name] || new CustomArray(this._numPreallocatedHandlers)).push(fn);
      }
    }
    fn.typed = count > 1;
    return this;
  }

  /**
   * Deregisters a callback function for one or more events.
   * If the event name is '*', it removes all callbacks.
   * If a specific callback function is provided, it removes only that function from the event.
   * If no callback is provided, it removes all callbacks for the specified events.
   * @param {string} events - A space-separated string of event names or '*' for all events.
   * @param {function} [fn] - The callback function to deregister. If not provided, all callbacks for the specified events are removed.
   * @returns {Observable} The Observable instance for chaining.
   */
  off(events, fn) {
    if (events === '*') this.callbacks = {};
    else if (fn) {
      let fns = this.callbacks[events];
      for (let i = 0, len = fns ? fns.len : 0; i < len; ++i) {
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
  }

  /**
   * Registers a one-time callback function for one or more events.
   * The callback will be called only once and then removed.
   * If the event name is '*', it registers the callback for all events.
   * @param {string} name - The name of the event or a space-separated list of event names.
   * @param {function} fn - The callback function to register.
   * @returns {Observable} The Observable instance for chaining.
   */
  one(name, fn) {
    fn.one = true;
    return this.on(name, fn);
  }

  /**
   * Triggers the specified event with up to four arguments.
   * If the event has registered callbacks, they will be called with the provided arguments.
   * If the callback is registered for multiple events, it will be called once for each event.
   * If the callback is registered with `one`, it will be removed after being called.
   * @param {string} name - The name of the event to trigger.
   * @param {*} [arg1] - The first argument to pass to the event handler.
   * @param {*} [arg2] - The second argument to pass to the event handler.
   * @param {*} [arg3] - The third argument to pass to the event handler.
   * @param {*} [arg4] - The fourth argument to pass to the event handler.
   * @returns {Observable} The Observable instance for chaining.
   */
  trigger(name, arg1, arg2, arg3, arg4) {
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
  }
}

/**
 * Creates an observable object that can be used to emit and listen to events.
 * This function is a convenience wrapper around the Observable class.
 *
 * @param {Object} obj - The object to make observable.
 * @param {Object} [options={}] - Optional configuration for the observable instance.
 * @returns {Object} The observable object with event handling capabilities.
 */
function observable(obj, options = {}) {
  // For backward compatibility: mix observable methods into obj
  Object.setPrototypeOf(obj, Observable.prototype);
  Observable.call(obj, options);
  return obj;
}

export { observable, Observable };
