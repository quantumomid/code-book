import React, { useState } from "react";
import CodeEditor from "./components/code-editor/CodeEditor";
import CodePreview from "./components/preview/CodePreview";
import bundle from "./bundler";

const App = () => {
    const [ input, setInput ] = useState("");
    const [ code, setCode ] = useState("");

    const handleClick = async () => {
        // console.log(input);
        const bundledCode = await bundle(input);
        // console.log(bundledCode);
        setCode(bundledCode);
    };

    return (
        <div>
            <CodeEditor initialValue="const omid='omid';" onChange={(value) => setInput(value)} />
            <CodePreview code={code} />
            <button onClick={handleClick}>Submit</button>
        </div>
    );
};

export default App;