import { useMemo } from "react";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as cellActionCreators from "../redux/cells/cellsActions";

export const useCellActions = () => {
    const dispatch = useDispatch();

    // Only rerun the function in first argument if dispatch changes 
    return useMemo(() => {
        return bindActionCreators(cellActionCreators, dispatch);
    }, [dispatch]);
};