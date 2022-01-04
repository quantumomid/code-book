import { useCellActions } from "../../hooks/useCellActions";
import "./AddCell.css";

interface AddCellProps {
    nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
    const {insertCellBefore} = useCellActions();
    return (
        <div className="add-cell">
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, "code")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, "text")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default AddCell;