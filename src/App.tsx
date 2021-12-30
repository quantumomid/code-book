import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect, useRef } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [ input, setInput ] = useState("");

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        // initialise esbuid to fetch the bundle from public folder
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });
        // console.log(ref);
    };

    const handleClick = async () => {
        // console.log(input);
        if(!ref.current) return;
        // console.log(ref.current);

        // Reset the iframe 
        iframe.current.srcdoc = html;

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
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
    };

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener("message", (event) => {
                        try {
                            // console.log(event.data);
                            eval(event.data);
                        } catch(error) {
                            const root = document.getElementById("root");
                            root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
                            throw error;
                            // console.error(error);
                        }

                    }, false);
                </script>
            </body>
        </html>
    `;

    return (
        <div>
            <textarea style={{ width: "50vw", height: "10vh" }} value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
            <iframe title="code-preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>
    );
};

export default App;