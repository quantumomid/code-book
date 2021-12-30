import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    
    // editorDidMount ONLY runs when editor first displayed on screen
    // First parameter is a callback that gives the current value
    // Second parameter is a reference to actual editor - therefore use this to keep track of changes made
    const handleEditorDidMount = (getValue: () => string, monacoEditor: any) => {
        // console.log(getValue());
        monacoEditor.onDidChangeModelContent(() => {
            // console.log(getValue());
            onChange(getValue());
        });
    };

    return (
        <MonacoEditor
            value={initialValue}
            editorDidMount={handleEditorDidMount}
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
}

export default CodeEditor;