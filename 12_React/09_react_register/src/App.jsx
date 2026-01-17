import { useRegisterUser } from "./hooks/useRegisterUser";

export function App() {
    const {register, data, message, loading, success, error} = useRegisterUser();

    const handleSubmit = async () => {
        await register({
            email: "email@domain.com",
            password: "test@123",
            role: "ADMIN",
            username: "john"
        });
    };

    return(
        <div>
            <h1>Register User</h1>
            <button onClick={handleSubmit} disabled={loading}>
                Register
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{color : "red"}}>{error}</p>}
            {success && <p style={{color : "green"}}>{message}</p>}

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default App;