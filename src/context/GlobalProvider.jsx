import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";
import { SubJobProvider } from "./SubJobContext";
import { CommandProvider } from "./CommandContext";

function GlobalProvider({ children }) {
  return (
    <UserProvider>
    <JobProvider>
    <SubJobProvider>
    <CommandProvider>
        {children}
    </CommandProvider>
    </SubJobProvider>
    </JobProvider>
    </UserProvider>
  );
}
export default GlobalProvider;
