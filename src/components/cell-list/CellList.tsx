import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => order.map(cellId => data[cellId]));

    const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />)

    return (
        <div>
            { renderedCells }
        </div>
    )
}

export default CellList;