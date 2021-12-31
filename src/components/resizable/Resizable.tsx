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
    const [ width, setWidth ] = useState(window.innerWidth*0.7);


    // To dynamically resize the code cell as the browser window is changed
    useEffect(() => {
        let timer:any;

        const listener = () => {
            // console.log(window.innerWidth, window.innerHeight);
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);

                if(window.innerWidth*0.7 < width) {
                    setWidth(window.innerWidth*0.7);
                }
            }, 100);

        };

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        }
    }, [width]);

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth*0.7, Infinity], 
            minConstraints: [innerWidth*0.4, Infinity],
            height: Infinity,
            width: width,
            resizeHandles: ["e"],
            onResizeStop: (event, data) => {
                // console.log(data);
                setWidth(data.size.width);
            },
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