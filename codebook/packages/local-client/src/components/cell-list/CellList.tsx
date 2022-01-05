import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../add-cell/AddCell";
import CellListItem from "./CellListItem";
import "./CellList.css";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) => order.map(cellId => data[cellId]));

    const renderedCells = cells.map(cell => (
        <React.Fragment key={cell.id}>
            <CellListItem key={cell.id} cell={cell} />
            <AddCell prevCellId={cell.id} />
        </ React.Fragment>
        )
    )
    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} prevCellId={null} />
            { renderedCells }
        </div>
    )
}

export default CellList;