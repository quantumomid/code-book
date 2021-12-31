import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import "./Resizable.css";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizableProps: ResizableBoxProps;

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [window.innerWidth*0.7, Infinity], 
            minConstraints: [window.innerWidth*0.4, Infinity],
            height: Infinity,
            width: window.innerWidth*0.7,
            resizeHandles: ["e"],
        }
    } else {
        resizableProps = {
            maxConstraints: [Infinity, window.innerHeight*0.9], 
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