import React from "react";
import { Cell } from "../../redux/cells/cellsType";
import CodeCell from "../code-cell/CodeCell";
import TextEditor from "../text-editor/TextEditor";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child: JSX.Element;
    if(cell.type === "code") {
        child = <CodeCell />
    } else {
        child = <TextEditor />
    }

    return (
        <h3>{child}</h3>
    )
}

export default CellListItem;