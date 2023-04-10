import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { findClosest } from "../helpers";

const sketch = (p) => {
    const offset = 120;
    let capture;
    let {innerWidth, innerHeight} = window;
    let proportionWidth = (innerHeight - offset)*4/3;

    p.setup = () => {
        p.createCanvas(innerWidth, innerHeight - offset);
        capture = p.createCapture(p.VIDEO);
        capture.hide();
    };

    p.draw = () => {
        p.background(50, 0, 0);
        p.image(capture, innerWidth/2 - proportionWidth/2, 0, proportionWidth, innerHeight - offset);
        
        // cursor
        p.fill(255, 255, 255, 0);
        p.ellipse(p.mouseX, p.mouseY, 25, 25);
    }
}

let p5Instance;
const Camera = () => {
    const [color, setColor] = useState(null);
    const [averageColor, setAverageColor] = useState(null);
    const [colorName, setColorName] = useState('');
    const p5ContainerRef = useRef();

    useEffect(() => {
        p5Instance = new p5(sketch, p5ContainerRef.current);

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
        <div className="center">rgb({color}) - {colorName}</div>
        <div className="square" style={{backgroundColor: `rgb(${color})`}}></div>
    </>;
}

export default Camera;
