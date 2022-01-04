import React from "react";
import { Cell } from "../../redux/cells/cellsType";
import ActionBar from "../action-bar/ActionBar";
import CodeCell from "../code-cell/CodeCell";
import TextEditor from "../text-editor/TextEditor";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    let child: JSX.Element;
    if(cell.type === "code") {
        child = <CodeCell cell={cell} />
    } else {
        child = <TextEditor cell={cell} />
    }

    return (
        <div>
            <ActionBar id={cell.id} />
            {child}
        </div>
    )
}

export default CellListItem;