import { useState } from "react";

export function useRegisterUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState(null);

    const register = async (payload) => {
        setSuccess(null);
        setMessage(null);
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload),
            });
            
            const response = await res.json();

            if(!res.ok){
                // API-specific error handling
                if(res.status === 409) {
                    throw new Error("User with email or username already exists");
                }
                // fallback error
                throw new Error(response.message || "Something went wrong !");
            }

            setSuccess(response.success || true);
            setMessage(response.message || null);

            if(response.data?.user){
                setData(response.data.user);
            }

            return response;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    
    return {register, data, error, loading, success, message};
}
