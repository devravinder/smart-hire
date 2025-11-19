import AuthProvider from "./hooks/use-auth.js";
import { ThemeProvider } from "./hooks/useTheme.js";
import Routes from "./routes/index.js";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
