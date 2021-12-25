import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect } from "react";

const App = () => {
    const [ input, setInput ] = useState("");
    const [ code, setCode ] = useState("");

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        // initialise esbuid to fetch the bundle from public folder
        const service = await esbuild.startService({
            worker: true,
            wasmURL: "/esbuild.wasm"
        });
        console.log(service);
    };

    const handleClick = () => {
        console.log(input);
    };

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
            <pre>{ code }</pre>
        </div>
    );
};

export default App;