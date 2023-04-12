function setup(p) {
    const ratio = 3/4;

    const tmpWidth = window.innerWidth;
    this.videoHeight = tmpWidth * ratio > window.innerHeight - this.offset

    if(window.innerHeight - this.offset > window.innerWidth * ratio) {
        this.videoWidth = window.innerWidth;
        this.videoHeight = this.videoWidth * ratio;
    } else {
        this.videoHeight = window.innerHeight - this.offset;
        this.videoWidth = this.videoHeight / ratio;
    }

    p.createCanvas(this.videoWidth, this.videoHeight);

    this.capture = p.createCapture({
        audio: false,
        video: {
          facingMode: 'environment'
        }
    });

    this.capture.hide();
}

function windowResized(p) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    p.resizeCanvas(this.innerWidth, this.innerHeight - this.offset);
}

export { setup, windowResized }