import ErrorBoundary from "./components/ErrorBoundary.js";
import ErrorCard from "./components/ErrorCard.js";
import AuthProvider from "./hooks/use-auth.js";
import { ThemeProvider } from "./hooks/useTheme.js";
import Routes from "./routes/index.js";

export default function App() {
  return (
    <ErrorBoundary fallback={err => <ErrorCard error={err}/>}>
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
