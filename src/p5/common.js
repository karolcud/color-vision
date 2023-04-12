function calculateViewportSize() {
    const ratio = 3/4;

    if(window.innerHeight - this.offset > window.innerWidth * ratio) {
        this.videoWidth = window.innerWidth;
        this.videoHeight = this.videoWidth * ratio;
    } else {
        this.videoHeight = window.innerHeight - this.offset;
        this.videoWidth = this.videoHeight / ratio;
    }
}

function setup(p) {
    calculateViewportSize.call(this);
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
    calculateViewportSize.call(this);
    p.resizeCanvas(this.videoWidth, this.videoHeight);
}

export { setup, windowResized }