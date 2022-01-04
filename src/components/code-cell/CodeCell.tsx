import React, { useEffect } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import CodePreview from "../preview/CodePreview";
import Resizable from "../resizable/Resizable";
import { Cell } from "../../redux/cells/cellsType";
import { useCellActions } from "../../hooks/useCellActions";
import { useBundleActions } from "../../hooks/useBundleActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { createBundle } = useBundleActions();
    const { updateCell } = useCellActions();

    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    console.log(bundle);

    useEffect(() => {
        const timer = setTimeout(async() => {
            createBundle(cell.id, cell.content);
        }, 1500);
        
        return () => {
            clearTimeout(timer);
        }
    }, [cell.id, cell.content]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
                </Resizable>
                { bundle && <CodePreview code={bundle.code} bundlingError={bundle.error}/> }
            </div>
        </Resizable>
    );
};

export default CodeCell;