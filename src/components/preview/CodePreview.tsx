import React, { useEffect, useRef } from "react";
import "./CodePreview.css";

interface CodePreviewProps {
    code: string;
}

const html = `
<html>
    <head>
        <style>html { background-color: white; }</style>
    </head>
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

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    // Reset iframe whenever code changes
    useEffect(() => {
        iframe.current.srcdoc = html;
        iframe.current.contentWindow.postMessage(code, "*");
    }, [code]);

    return (
        <div className="code-preview-wrapper">
            <iframe className="code-preview-iframe" title="code-preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>    
    )

}

export default CodePreview;