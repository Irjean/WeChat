import firebaseApp from "./config.js";
import ChatRoom from "./components/ChatRoom.jsx";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, useCollection } from "react-firebase-hooks/firestore"

import './App.css';
import { useState } from "react";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

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
