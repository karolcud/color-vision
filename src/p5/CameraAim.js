import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { findClosest, inverseColor } from "../helpers";
import { setup, windowResized } from "./common";

const sketchContext = {
    offset: 200,
    sketch: function(p) {
        p.setup = setup.bind(this, p)
        p.windowResized = windowResized.bind(this, p);

        p.draw = () => {
            p.background(0, 0, 0);
            p.image(this.capture, 0, 0, this.videoWidth, this.videoHeight);

            this.selectedColor = p.get(this.videoWidth/2, this.videoHeight/2).slice(0, 3);

            // aim cursor
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(255, 255, 255, 0);
            p.circle(this.videoWidth/2, this.videoHeight/2, 12, 12);

            // text color code
            p.noStroke();
            p.fill(this.selectedColor);
            p.rect(this.videoWidth/2 - 90, this.videoHeight/2 + 20, 180, 25);
            p.textSize(18);
            p.fill(inverseColor(this.selectedColor));
            p.text(`rgb(${this.selectedColor})`, this.videoWidth/2 - 70, this.videoHeight/2 + 38);
        }        
    }
}

let p5Instance;
const CameraAim = () => {
    const [color, setColor] = useState(null);
    const [colorName, setColorName] = useState('');
    const p5ContainerRef = useRef();

    useEffect(() => {
        p5Instance = new p5(sketchContext.sketch.bind(sketchContext), p5ContainerRef.current);

        return () => {
            p5Instance.remove();
        };
    }, []);

    return <>
        <div className="p5-camera" ref={p5ContainerRef} />
            <button className="click-circle" onClick={ (event) => {
                event.preventDefault();
                const selectedColor = sketchContext.selectedColor;
                setColor(selectedColor.join(', '));

                const name = findClosest(selectedColor);
                setColorName(name);
            }}>
                <div className="inner-circle"></div>
            </button>
            <div className="color-summary">
                { color && <>
                    rgb({color})
                    <div className="square" style={{backgroundColor: `rgb(${color})`}}></div>
                    <span className="uppercase">{colorName}</span>
                </>}
            </div>
    </>;
}

export default CameraAim;
