import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
// import Highlighter from "monaco-jsx-highlighter";
// import codeShift from 'jscodeshift'
import "./CodeEditor.css";


interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    // Below reference is for handleFormat to have access to the monaco editor
    const editorRef = useRef<any>();

    // editorDidMount ONLY runs when editor first displayed on screen
    // First parameter is a callback that gives the current value
    // Second parameter is a reference to actual editor - therefore use this to keep track of changes made
    const handleEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor; // Just to give handleFormat access to monaco editor
        // console.log(getValue());
        monacoEditor.onDidChangeModelContent(() => {
            // console.log(getValue());
            onChange(getValue());
        });
        // Change tab space to 2 spaces instead of default of 4
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        // Not working - packages for syntax highlighting
        // // For syntax highlighting for JSX
        // const highlighter = new Highlighter(
        //     // @ts-ignore
        //     window.monaco,
        //     codeShift,
        //     monacoEditor
        //   );
        //   highlighter.highLightOnDidChangeModelContent(
        //     () => {},
        //     () => {},
        //     undefined,
        //     () => {}
        //   );
    };

    const handleFormat = () => {
        // Get current value from editor
        const currentUnformattedValue = editorRef.current.getModel().getValue();
        console.log(currentUnformattedValue);

        // Format the value
        const formattedValue = prettier.format(currentUnformattedValue, {
            parser: "babel",
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: false,
        }).replace(/\n$/, "");

        // Set the formatted value back into the editor!
        editorRef.current.setValue(formattedValue);
    };

    return (
        <div className="editor-wrapper">
            <button 
                className="button button-format is-primary is-small" 
                onClick={handleFormat}>
                    Format
            </button>
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
        </div>
    )
}

export default CodeEditor;