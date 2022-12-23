/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "../styles/Chat.css";
import { getFirestore, collection, addDoc, orderBy, serverTimestamp, query } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, onDisconnect, set } from "firebase/database";
import firebaseApp from "../config";
import ChatMessage from "../components/ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useList } from 'react-firebase-hooks/database';
import OnlineUser from "../components/OnlineUser";
import { uid } from "uid";

const auth = getAuth(firebaseApp);

function Chat() {
    const firestore = getFirestore(firebaseApp);
    const database = getDatabase(firebaseApp);
    const refMsg = query(collection(firestore, "messages"), orderBy("createdAt", "desc"));
    const [messages, loadingMsg, errorMsg] = useCollectionData(refMsg, {idField: "id"});
    const [users, loadingUser, errorUser] = useCollectionData(query(collection(firestore, "users"), orderBy("name")), {idField: "id"});
    const [snapshots, loading, error] = useList(ref(database, "users"))
    const [formValue, setFormValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    const presenceRef = ref(database, "users/" + auth.currentUser.uid + "/status");

    async function sendMsg(e) {
        e.preventDefault();

        if(formValue.split(" ").join("").length === 0){
            return
        };

        setInputDisabled(true);

        const { photoURL } = auth.currentUser;

        await addDoc(collection(firestore, "messages"), {
            text: formValue,
            createdAt: serverTimestamp(),
            uid: uid(116),
            userId: auth.currentUser.uid,
            photoURL,
            name: auth.currentUser.displayName
        })

        setFormValue("");
        setInputDisabled(false);
        let readBox = document.querySelector("#readtext-container");
        readBox.scrollTo(0, readBox.scrollHeight);
        setInterval(() => {
            document.querySelector(".send-input").focus();
        }, 5000)
        
    }

    function SignOutChat(){
        return auth.currentUser && (
          <button className="user-list-logout" onClick={async() => signOut(auth).then(
            await set(presenceRef, "offline")
          )}>Sign Out</button>
        )
      }

    


    const connectedRef = ref(database, '.info/connected');

    onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
        
        setTimeout(() => {
            if(auth.currentUser !== null){
                set(presenceRef, "online");
            }
        }, 1000)

        // When I disconnect, remove this device
        onDisconnect(presenceRef).set("offline");

        // When I disconnect, update the last time I was seen online
        onDisconnect(presenceRef).set("offline");
    }
    });
    

    return (
        <>
            <h1>Hello {auth.currentUser?.displayName} !</h1>
            <div id="chat-container">
                <div id="connected-container" className='pretty-border'>
                    <div className="user-list-container">
                        <h3 className="user-list-title">User List</h3>
                        {loadingUser && <>ça charge</>}
                        {!loading && snapshots && snapshots.map((snap) => {
                            let user = snap.val()
                                return <OnlineUser key={user.uid} name={user.name} status={user.status} img={user.photoURL} />
                        })}
                    </div>
                    <SignOutChat />
                </div>
                <div id="messages-container">
                    <div id='readtext-container' className='pretty-border'>
                        {loadingMsg && <h1>Loading</h1>}
                        {messages && messages.map(msg => <ChatMessage key={msg.uid} message={msg.text} name={msg.name} uid={msg.uid} userId={msg.userId} />)}
                    </div>
                    <form id='sendtext-container' onSubmit={sendMsg}>
                        <input className="send-input" type="text" placeholder='Your message here...' value={formValue} onChange={(e) => {setFormValue(e.target.value)}} disabled={inputDisabled}/>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Chat