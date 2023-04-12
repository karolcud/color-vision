function setup(p) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.proportionWidth = (this.innerHeight - this.offset)*4/3;

    p.createCanvas(this.innerWidth, this.innerHeight - this.offset);
    this.capture = p.createCapture({
        audio: false,
        video: {
          facingMode: 'user'
        }
    });

    this.capture.hide();
}

function windowResized(p) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.proportionWidth = (this.innerHeight - this.offset)*4/3;
    p.resizeCanvas(this.innerWidth, this.innerHeight - this.offset);
}

export { setup, windowResized }