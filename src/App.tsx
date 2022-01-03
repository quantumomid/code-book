import React from "react";
import { Provider } from "react-redux";
import CodeCell from "./components/code-cell/CodeCell";
import TextEditor from "./components/text-editor/TextEditor";
import store from "./redux/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            {/* <CodeCell /> */}
            <TextEditor />
        </Provider>
    );
};

export default App;