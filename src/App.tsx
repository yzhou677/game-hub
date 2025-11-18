import { Center, Spinner } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./authstore";
import { auth } from "./firebase";
import router from "./routes";

const App = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setInitializing = useAuthStore((s) => s.setInitializing);
  const initializing = useAuthStore((s) => s.initializing);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return () => unsub();
  }, [setUser, setInitializing]);

  if (initializing) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
