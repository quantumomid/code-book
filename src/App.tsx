import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect, useRef } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

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
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });
        console.log(ref);
    };

    const handleClick = async () => {
        // console.log(input);
        if(!ref.current) return;
        // console.log(ref.current);
        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });
        // console.log(result);
        setCode(result.outputFiles[0].text);
    };

    return (
        <div>
            <textarea style={{ width: "50vw", height: "10vh" }} value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
            <pre>{ code }</pre>
        </div>
    );
};

export default App;