import { JobProvider } from "./JobContext";
import { UserProvider } from "./UserContext";
import { BarProvider } from "./BarContext";

function GlobalProvider({ children }) {
  return (
    <UserProvider>
    <JobProvider>
    <BarProvider>
        {children}
    </BarProvider>
    </JobProvider>
    </UserProvider>
  );
}

export default GlobalProvider;
