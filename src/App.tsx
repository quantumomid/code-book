import React from "react";
import { Provider } from "react-redux";
import CellList from "./components/cell-list/CellList";
import CodeCell from "./components/code-cell/CodeCell";
import TextEditor from "./components/text-editor/TextEditor";
import store from "./redux/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            {/* <CodeCell /> */}
            {/* <TextEditor /> */}
            <CellList />
        </Provider>
    );
};

export default App;