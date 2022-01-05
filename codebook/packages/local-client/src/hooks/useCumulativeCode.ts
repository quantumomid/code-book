import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {

        // Get all the current cells in order with their data in an array i.e. orderedCells
        const { data, order } = state.cells;
        const orderedCells = order.map(cellId => data[cellId]);

        // Add each of the previous code cells up to and including the current code cell
        // Add show function as first element so that each cell has access to it
        const showFunc = `
            import _React from "react";
            import _ReactDOM from "react-dom";

            var show = (value) => {
                const rootDiv = document.getElementById("root");
                if (typeof value === "object"){
                    if(value.$$typeof && value.props){
                    // if React i.e. JSX code
                        _ReactDOM.render(value, rootDiv)
                    } else {
                    // if just plain object NOT jsx
                        rootDiv.innerHTML = JSON.stringify(value);
                    }
                } else {
                    rootDiv.innerHTML = value;
                }
            };
        `
        // For reinitialising show function to overwrite the previous calls from previous code cells!
        const showFuncNoop = "var show = () => {}";

        const cumulativeCode = [];

        for (let cel of orderedCells) {
            if(cel.type === "code") {

                // Cancelling show calls for any previous code for code cells 
                // with comulated code
                if (cel.id === cellId){
                    cumulativeCode.push(showFunc);
                } else {
                    cumulativeCode.push(showFuncNoop);
                }
                
                cumulativeCode.push(cel.content);
            }
            if (cel.id === cellId) break;
        }
        return cumulativeCode;
    }).join("\n");
}