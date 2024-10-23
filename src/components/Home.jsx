import { useLocalStorage } from "@mantine/hooks";
import React from "react";

const Home = () => {
  // to save user login data on browser
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  console.log("user", user);
  return <div>Home</div>;
};

export default Home;