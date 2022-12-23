import firebaseApp from '../config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import reactImg from "../img/react.png"
import firebaseImg from "../img/firebase.png"
import { getDatabase, set, ref, serverTimestamp } from 'firebase/database';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

function Login(props) {

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((result) => {
      set(ref(database, `users/${auth.currentUser.uid}`), {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
        status: "online"
      })
    });
  }
  
  return (
    <div className='home-container'>
        <h1>Bienvenue sur WeChat !</h1>
        <p>Chat en ligne fait par <a href="https://clementspileers.fr">Clément Spileers</a> avec React et Firebase</p>
        <div className='img-container'>
          <img src={reactImg} alt="react" />
          <img src={firebaseImg} alt="firebase" />
        </div>
        <button className='login-button' onClick={signInWithGoogle}>Se connecter avec Google</button>
    </div>
  )
}

export default Login