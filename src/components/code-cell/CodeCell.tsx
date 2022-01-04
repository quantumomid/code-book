import React, { useEffect } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import CodePreview from "../preview/CodePreview";
import Resizable from "../resizable/Resizable";
import { Cell } from "../../redux/cells/cellsType";
import { useCellActions } from "../../hooks/useCellActions";
import { useBundleActions } from "../../hooks/useBundleActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./CodeCell.css";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { createBundle } = useBundleActions();
    const { updateCell } = useCellActions();

    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    // console.log(bundle);
    const cumulativeCode = useTypedSelector((state) => {

        // Get all the current cells in order with their data in an array i.e. orderedCells
        const { data, order } = state.cells;
        const orderedCells = order.map(cellId => data[cellId]);

        // Add each of the previous code cells up to and including the current code cell
        // Add show function as first element so that each cell has access to it
        const cumulativeCode = [
            `
                const show = (value) => {
                    
                    if (typeof value === "object"){
                        document.getElementById("root").innerHTML = JSON.stringify(value);
                    } else {
                        document.getElementById("root").innerHTML = value;
                    }
                };
            `,
        ];

        for (let cel of orderedCells) {
            if(cel.type === "code") {
                cumulativeCode.push(cel.content);
            }
            if (cel.id === cell.id) break;
        }
        return cumulativeCode;
    });
    // console.log(cumulativeCode);

    useEffect(() => {
        if(!bundle) {
            createBundle(cell.id, cumulativeCode.join("\n"));
            return;
        }

        const timer = setTimeout(async() => {
            createBundle(cell.id, cumulativeCode.join("\n"));
        }, 1500);
        
        return () => {
            clearTimeout(timer);
        }
    }, [cell.id, cumulativeCode.join("\n"), createBundle]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
                </Resizable>
                <div className="progress-wrapper">
                    {
                        !bundle || bundle.loading
                            ?   <div className="progress-cover">
                                    <progress className="progress is-small is-primary" max="100">
                                        Loading
                                    </progress>
                                </div>
                            : <CodePreview code={bundle.code} bundlingError={bundle.error}/>
                    }
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;