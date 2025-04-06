import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";
import { SubJobProvider } from "./SubJobContext";
import { CommandProvider } from "./CommandContext";

function GlobalProvider({ children }) {
  return (
    <UserProvider>
    <JobProvider>
    <CommandProvider>
        {children}
    </CommandProvider>
    </JobProvider>
    </UserProvider>
  );
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
