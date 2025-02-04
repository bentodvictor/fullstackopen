import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
);
