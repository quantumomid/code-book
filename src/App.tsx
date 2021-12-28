import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect, useRef } from "react";

const App = () => {
    const ref = useRef<any>();
    const [ input, setInput ] = useState("");
    const [ code, setCode ] = useState("");

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        // initialise esbuid to fetch the bundle from public folder
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "/esbuild.wasm"
        });
        console.log(ref);
    };

    const handleClick = async () => {
        console.log(input);
        if(!ref.current) return;
        // console.log(ref.current);
        const result = await ref.current.transform(input, {
            loader: "jsx",
            target: "es2015"
        });
        // console.log(result);
        setCode(result.code);
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