import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";

function GlobalProvider({ children }) {
    return (
        <UserProvider>
            <JobProvider>
                    {children}
            </JobProvider>
        </UserProvider>
        
    );
}

export default GlobalProvider;

