import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as bundleActionCreators from "../redux/bundles/bundlesActions";

export const useBundleActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(bundleActionCreators, dispatch);
}