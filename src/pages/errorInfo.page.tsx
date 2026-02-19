import { Link, useSearchParams } from "react-router-dom";
import "./errorInfo.page.css";
import BruhFace from "../assets/bruh_face.svg";

function ErrorInfo() {
    const [searchParams /* , setSearchParams */] = useSearchParams();
    class SearchParams {
        static readonly title: string | null = searchParams.get("title") || "Page not found"; // Error message title ("Page not found" because Router "*" will redirect here without params)
        static readonly message: string | null = searchParams.get("message"); // Error message
    }

    return (
        <div id="error-info">
            <div className="w-100 flex center items-center column gap">
                <img src={BruhFace} className="no-select" alt="bruh face" width={200} />

                {/* Title */}
                <h1 className="title">{SearchParams.title}</h1>

                {/* Message */}
                {SearchParams.message && <p>{SearchParams.message}</p>}

                <Link to="/">
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}

export default ErrorInfo;