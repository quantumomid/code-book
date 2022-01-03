import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const CellList: React.FC = () => {
    useTypedSelector(({ cells: { order, data } }) => {
        return order.map(cellId => {
            data[cellId]
        });
    });

    return (
        <h3>Cell List </h3>
    )
}

export default CellList;