import firebaseApp from "./config.js";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import './App.css';
import { useState } from "react";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";

const auth = getAuth(firebaseApp);

function App() {
  const [lastMessage, setLastMessage] = useState(new Date());
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Chat lastMessage={lastMessage} setLastMessage={setLastMessage} /> : <Login />}
    </div>
  );
}

export default App;
