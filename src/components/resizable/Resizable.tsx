import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import "./Resizable.css";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizableProps: ResizableBoxProps;

    const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
    const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);


    // To dynamically resize the code cell as the browser window is changed
    useEffect(() => {
        const listener = () => {
            // console.log(window.innerWidth, window.innerHeight);
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        }
    }, []);

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth*0.7, Infinity], 
            minConstraints: [innerWidth*0.4, Infinity],
            height: Infinity,
            width: innerWidth*0.7,
            resizeHandles: ["e"],
        }
    } else {
        resizableProps = {
            maxConstraints: [Infinity, innerHeight*0.9], 
            minConstraints: [Infinity, 100],
            height: 300,
            width: Infinity,
            resizeHandles: ["s"],
        }
    }

    return (
        <ResizableBox 
            { ...resizableProps }
        >
            {children}
        </ ResizableBox>
    );
}

export default Resizable;