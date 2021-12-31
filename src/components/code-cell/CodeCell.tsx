import React, { useState } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import CodePreview from "../preview/CodePreview";
import bundle from "../../bundler";
import Resizable from "../resizable/Resizable";

const CodeCell = () => {
    const [ input, setInput ] = useState("");
    const [ code, setCode ] = useState("");

    const handleClick = async () => {
        // console.log(input);
        const bundledCode = await bundle(input);
        // console.log(bundledCode);
        setCode(bundledCode);
    };

    return (
        <Resizable direction="vertical">
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue="const omid='omid';" onChange={(value) => setInput(value)} />
                </Resizable>
                {/* <button onClick={handleClick}>Submit</button> */}
                <CodePreview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;