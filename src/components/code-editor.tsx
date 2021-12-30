import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => (
    <MonacoEditor 
        theme="dark" 
        language="javascript" 
        height="40vh"
        options={{
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            fontSize: 16,
            scrollBeyondLastLine: false,
            folding: false,
            lineNumbersMinChars: 3,
            automaticLayout: true,
        }}
    />
)

export default CodeEditor;