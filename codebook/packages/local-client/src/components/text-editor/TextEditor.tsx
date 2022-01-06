import "./TextEditor.css";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../../redux/cells/cellsTypes";
import { useCellActions } from "../../hooks/useCellActions";

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [ editing, setEditing ] = useState(false);

    const { updateCell } = useCellActions();

    // Add event listener to watch for clicks outside the mark down editor to turn off
    // the editing mode
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            console.log(event.target);

            // Do empty return if clicked INSIDE editor - i.e. only turn off editor if click outside
            // the editor
            if(ref.current && event.target && ref.current.contains(event.target as Node)){
                console.log("Clicked inside the editor");
                return;
            }
            console.log("Clicked outside the editor");
            setEditing(false);
        }
        document.addEventListener("click", listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener, { capture: true });
        }
    }, []);

    if (editing) return <div className="text-editor" ref={ref}><MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || "")} /></div>

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || "Click to edit"} />
            </div>
        </div>
    )
}

export default TextEditor;