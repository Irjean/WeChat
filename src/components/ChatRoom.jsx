import { getFirestore, collection, doc, addDoc, getDocs, getDoc, orderBy, query, limit, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebaseApp from "../config";
import ChatMessage from "./ChatMessage";

const firestore = getFirestore(firebaseApp);

function ChatRoom(){
    const [messages, setMessages] = useState([]);
    const q = query(collection(firestore, "messages"), orderBy("createdAt"), limit(25));
    let [sauce, loading, error] = useCollectionData(collection(firestore, "messages"), orderBy("createdAt"), limit(25));

    useEffect(() => {
        fetchMessages();
        sauce.docs.map((doc) => {
            console.log(doc.data());
        })
        console.log("ahah")
    }, []);
    
    async function fetchMessages() {
        // const qSnap = await getDocs(q);
        // let arr = [];
        // qSnap.forEach((doc) => {
            //   arr.push(doc.data());
            // });
            // setMessages(arr);
        }
  
    return(
      <>
        <div>{messages && messages.map(msg => <ChatMessage key={msg.uid} message={msg.text} />)}</div>
      </>
    )
  }

  export default ChatRoom;