import React, { useEffect, useState } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import CodePreview from "../preview/CodePreview";
import bundle from "../../bundler";
import Resizable from "../resizable/Resizable";
import { Cell } from "../../redux/cells/cellsType";
import { useCellActions } from "../../hooks/useCellActions";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [ error, setError ] = useState("");
    const [ code, setCode ] = useState("");

    const { updateCell } = useCellActions();

    useEffect(() => {
        const timer = setTimeout(async() => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setError(output.err);
        }, 1500);
        
        return () => {
            clearTimeout(timer);
        }
    }, [cell.content]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
                </Resizable>
                <CodePreview code={code} bundlingError={error}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;