import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../add-cell/AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => order.map(cellId => data[cellId]));

    const renderedCells = cells.map(cell => (
        <React.Fragment key={cell.id}>
            <AddCell nextCellId={cell.id} />
            <CellListItem key={cell.id} cell={cell} />
        </ React.Fragment>
        )
    )
    return (
        <div>
            { renderedCells }
            <AddCell forceVisible={cells.length === 0} nextCellId={null} />
        </div>
    )
}

export default CellList;