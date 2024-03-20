import React from "react";

function ErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found.</p>
                <p className="text-gray-600 mt-2">The page you are looking for might have been removed or doesn't exist.</p>
            </div>
        </div>
    );
}

export default ErrorPage;