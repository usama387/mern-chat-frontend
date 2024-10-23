import { useLocalStorage } from "@mantine/hooks";
import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

// Create the Socket context
const SocketContext = createContext();

// Hook to access the SocketContext
const GetSocket = () => useContext(SocketContext);

// SocketProvider Component
const SocketProvider = ({ children }) => {
  // Use `useLocalStorage` hook inside the component
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  // Memoize the socket instance
  const socket = useMemo(() => {
    return io("http://localhost:5000", {
      auth: {
        token: user?.token,
      },
    });
  }, [user?.token]); // Reconnect if the token changes // Provide socket to the context

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, GetSocket };
