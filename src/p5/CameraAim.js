import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { findClosest } from "../helpers";
import { setup, windowResized } from "./common";

const sketchContext = {
    offset: 200,
    sketch: function(p) {
        p.setup = setup.bind(this, p)
        p.windowResized = windowResized.bind(this, p);

        p.draw = () => {
            p.background(0, 0, 0);
            p.image(this.capture, this.innerWidth/2 - this.proportionWidth/2, 0, this.proportionWidth, this.innerHeight - this.offset);

            this.selectedColor = p.get(this.innerWidth/2, (this.innerHeight - this.offset)/2).slice(0, 3);

            // aim cursor
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(255, 255, 255, 0);
            p.circle(this.innerWidth/2, (this.innerHeight - this.offset)/2, 12, 12);

            // text color code
            p.noStroke();
            p.fill(200, 200, 200, 100);
            p.rect(this.innerWidth/2 - 90, (this.innerHeight - this.offset)/2 + 20, 180, 25);
            p.textSize(18);
            p.fill(0, 102, 53);
            p.text(`rgb(${this.selectedColor})`, this.innerWidth/2 - 70, (this.innerHeight - this.offset)/2 + 38);
        }        
    }
}

let p5Instance;
const CameraAim = () => {
    const [color, setColor] = useState(null);
    const [colorName, setColorName] = useState('');
    const [test, setTest] = useState(null);
    const p5ContainerRef = useRef();

    useEffect(() => {
        p5Instance = new p5(sketchContext.sketch.bind(sketchContext), p5ContainerRef.current);

        (async function () {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const x = devices.filter(source => source.kind === 'videoinput');
            console.log('Dostępne kamery:', x);
            setTest(x);
        })();

        return () => {
            p5Instance.remove();
        };
    }, []);

    return <>
        <div className="p5-camera" ref={p5ContainerRef} />
            {
                test?.map((item, key) => <div key={key}>{key}. {item.label || 'empty info'}</div>)
            }
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
                    {colorName}
                </>}
            </div>
    </>;
}

export default CameraAim;
