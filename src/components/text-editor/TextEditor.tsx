import "./TextEditor.css";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [ editing, setEditing ] = useState(false);
    const [ value, setValue ] = useState("# Whats up mate!");

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

    if (editing) return <div className="text-editor" ref={ref}><MDEditor value={value} onChange={(v) => setValue(v || "")} /></div>

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor;