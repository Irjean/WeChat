import { getAuth } from "firebase/auth";
import firebaseApp from "../config.js";

const auth = getAuth(firebaseApp);

function ChatMessage(props){
  
    return (
        <div className={props.userId === auth.currentUser.uid ? "text-container sent" : "text-container received"}>
        <span>{props.name}</span>
        <p>{props.message}</p>
    </div>
    )
  }

  export default ChatMessage;