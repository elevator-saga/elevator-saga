import observable from '@riotjs/observable';

class Floor {
  constructor(obj, floorLevel, yPosition, errorHandler) {
    observable(this);
    this.level = floorLevel;
    this.yPosition = yPosition;
    this.buttonStates = { up: '', down: '' };
    this._errorHandler = errorHandler;
  }

  _tryTrigger(event, arg1, arg2, arg3, arg4) {
    try {
      this.trigger(event, arg1, arg2, arg3, arg4);
    } catch (e) {
      this._errorHandler(e);
    }
  }

  pressUpButton() {
    const prev = this.buttonStates.up;
    this.buttonStates.up = 'activated';
    if (prev !== this.buttonStates.up) {
      this._tryTrigger('buttonstate_change', this.buttonStates);
      this._tryTrigger('up_button_pressed', this);
    }
  }

  pressDownButton() {
    const prev = this.buttonStates.down;
    this.buttonStates.down = 'activated';
    if (prev !== this.buttonStates.down) {
      this._tryTrigger('buttonstate_change', this.buttonStates);
      this._tryTrigger('down_button_pressed', this);
    }
  }

  elevatorAvailable(elevator) {
    if (elevator.goingUpIndicator && this.buttonStates.up) {
      this.buttonStates.up = '';
      this._tryTrigger('buttonstate_change', this.buttonStates);
    }
    if (elevator.goingDownIndicator && this.buttonStates.down) {
      this.buttonStates.down = '';
      this._tryTrigger('buttonstate_change', this.buttonStates);
    }
  }

  getSpawnPosY() {
    return this.yPosition + 30;
  }

  floorNum() {
    return this.level;
  }
}

export default Floor;
