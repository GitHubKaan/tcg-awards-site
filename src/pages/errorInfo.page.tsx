import { useSearchParams } from "react-router-dom";
import "./errorInfo.page.css";

function ErrorInfo() {
    const [searchParams /* , setSearchParams */] = useSearchParams();
    class SearchParams {
        static readonly title: string | null = searchParams.get("title") || "Page not found"; // Error message title ("Page not found" because Router "*" will redirect here without params)
        static readonly message: string | null = searchParams.get("message"); // Error message
    }

    return (
        <div id="error-info">
            {/* Title */}
            <h3 className="title">{SearchParams.title}</h3>

            {/* Message */}
            {SearchParams.message && <p>{SearchParams.message}</p>}

            <p>Besteht das Problem weiterhin, kontaktiere bitte den Support.</p>
        </div>
    );
}

export default ErrorInfo;