import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Creating Registered user profile and storing in Firestore
//{
const db = getFirestore(); //Initializing db
export const createUserProfileDocument = async (userAuth, additionalData) => {
  //This function checks the current sig in user in the db, if it is existed there it just return otherwise it creates a new user in the db
  if (!userAuth) return;

  //collection ref
  const userRef = doc(db, "users", `${userAuth.uid}`);

  //snapshot
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // console.log("Document data:", userSnap.data());
  } else {
    // doc.data() will be undefined in this case

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      //   console.log(userRef);
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
  //get collection data
  //   getDocs(userRef)
  //     .then((snapShot) => {
  //       let users = [];
  //       snapShot.docs.forEach((user) => {
  //         user.push({ ...user.data(), id: user.id });
  //       });
  //       console.log(users);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
};
//}
// Sign in with Google Authentication Code
//{
const provider = new GoogleAuthProvider();
export const auth = getAuth();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
//}
