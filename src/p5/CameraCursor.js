import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { findClosest } from "../helpers";
import { setup, windowResized } from "./common";

const sketchContext = {
    offset: 120,
    sketch: function(p) {
        p.setup = setup.bind(this, p)
        p.windowResized = windowResized.bind(this, p);

        p.draw = () => {
            p.background(50, 0, 0);
            p.image(this.capture, 0, 0, this.videoWidth, this.videoHeight);

            // cursor
            p.fill(255, 255, 255, 0);
            p.ellipse(p.mouseX, p.mouseY, 25, 25);
        }        
    }
}

let p5Instance;
const CameraCursor = () => {
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
        <div className="p5-camera" ref={p5ContainerRef} onClick={ (event) => {
            const selectedColor = p5Instance.get(p5Instance.mouseX, p5Instance.mouseY).slice(0, 3);
            setColor(selectedColor.join(', '));

            const name = findClosest(selectedColor);
            setColorName(name);
        }}/>
        <div className="color-summary">
            { color && <>
                rgb({color})
                <div className="square" style={{backgroundColor: `rgb(${color})`}}></div>
                <span className="uppercase">{colorName}</span>
            </>}
        </div>
    </>;
}

export default CameraCursor;
