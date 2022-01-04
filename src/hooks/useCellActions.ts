import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as cellActionCreators from "../redux/cells/cellsActions";

export const useCellActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(cellActionCreators, dispatch);
}

