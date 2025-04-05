import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";
import { SubJobProvider } from "./SubJobContext";

function GlobalProvider({ children }) {
    return (
        <UserProvider>
        <JobProvider>
        <SubJobProvider>
            {children}
        </SubJobProvider>
        </JobProvider>
        </UserProvider>
        
    );
}

export default GlobalProvider;

