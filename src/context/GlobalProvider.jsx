import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";
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
}

export default GlobalProvider;
