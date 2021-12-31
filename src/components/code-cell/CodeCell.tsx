import React, { useEffect, useState } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import CodePreview from "../preview/CodePreview";
import bundle from "../../bundler";
import Resizable from "../resizable/Resizable";

const CodeCell = () => {
    const [ input, setInput ] = useState("");
    const [ error, setError ] = useState("");
    const [ code, setCode ] = useState("");

    useEffect(() => {
        const timer = setTimeout(async() => {
            const output = await bundle(input);
            setCode(output.code);
            setError(output.err);
        }, 1500);
        
        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue="const omid='omid';" onChange={(value) => setInput(value)} />
                </Resizable>
                <CodePreview code={code} bundlingError={error}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;