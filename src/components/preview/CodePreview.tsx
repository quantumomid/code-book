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
            const handleError = (error) => {
                const root = document.getElementById("root");
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
                throw error;
            };

            window.addEventListener("error", (event) => {
                // console.log({event});
                event.preventDefault();
                handleError(event.error);

            });

            window.addEventListener("message", (event) => {
                try {
                    // console.log(event.data);
                    eval(event.data);
                } catch(error) {
                    // console.error(error);
                    handleError(error);
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
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*");
        }, 100);
    }, [code]);

    return (
        <div className="code-preview-wrapper">
            <iframe className="code-preview-iframe" title="code-preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>    
    )

}

export default CodePreview;