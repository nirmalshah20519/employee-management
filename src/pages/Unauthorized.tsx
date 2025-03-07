import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mt-4">
                    Unauthorized
                </h2>
                <p className="text-gray-600 mt-2">
                    You don't have permission to access this page. Please contact the
                    administrator if you believe this is a mistake.
                </p>
                <div className="mt-6 space-y-4">
                    <Button
                        onClick={handleGoBack}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        className="w-full"
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
