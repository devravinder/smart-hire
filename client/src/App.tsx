import SupabseAuth from "./auth/SupabaseAuth.js";
import { ThemeProvider } from "./hooks/useTheme.js";
import Routes from "./routes/index.js";

export default function App() {
  return (
    <ThemeProvider>
      <SupabseAuth/>
        {/* <Routes /> */}
    </ThemeProvider>
  );
}