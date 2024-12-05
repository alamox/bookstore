import { Link } from "react-router-dom";
import Update from "../pages/update";

export default function Upd({item}){
    return (
        <div>
            <Link to={`/update`}>
                <Update item={item}></Update>
            </Link>
        </div>
    )
}