import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout.jsx";
import { AuthorizationPage } from "./pages/AuthorizationPage.jsx";
import { ChatPage } from "./pages/ChatPage.jsx";
import { CreatAccountPage } from "./pages/CreateAccountPage.jsx";
import { CreateChatPage } from "./pages/CreateChatPage.jsx";
import { UserProfilePage } from "./pages/UserProfilePage.jsx";
import { SearchCreatedChatsPage } from "./pages/SearchCreatedChatsPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthorizationPage />,
      },
      {
        path: "/createAccount",
        element: <CreatAccountPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/createChat",
        element: <CreateChatPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/searchCreatedChats",
        element: <SearchCreatedChatsPage />,
      },
    ],
  },
]);
