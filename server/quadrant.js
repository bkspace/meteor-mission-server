import EventEmitter from 'events';

export default class Quadrant extends EventEmitter {
  constructor() {
    super();
    this.quadrant = 'there is no quadrant';
  }
  addChangeListener(cb) {
    this.on('update quadrant', cb.bind(this.quadrant));
  }
  update(quadrant) {
    this.emit('update quadrant', {
      detail: {
        quadrant,
        
      },
    });
  }
}
