import { initializeApp } from 'firebase/app';
import { getAuth, 
      signInWithPopup, 
      signInWithRedirect, 
      GoogleAuthProvider, 
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged
     } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBCDoWvAH5FEPEPq1df0MCeMdV8k4mMfog",
  authDomain: "crwn-clothing-3-db52f.firebaseapp.com",
  projectId: "crwn-clothing-3-db52f",
  storageBucket: "crwn-clothing-3-db52f.appspot.com",
  messagingSenderId: "526439994566",
  appId: "1:526439994566:web:7bf6e4f225af91acdaf3c7"
};

  // Initialize Firebase
  const firebaseApp = initializeApp ( firebaseConfig );

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGooglRederect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionkey, objectsToAdd) => {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
  }

  export const getCategoriesDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})

    return categoryMap;
  }

  export const createUserDocimentFromAuth = async (userAuth, additionalInfomation={}) => {
    if(!userAuth) return;
    
    const userDocref = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocref);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocref,{
                displayName,
                email,
                createAt,
                ...additionalInfomation
            })
        }catch(err) {
            console.log('error', err.message)
        }
    }
    return userDocref;
  }

  export const createAuthUSerWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;


    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUSerWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUSer = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => {
    
    onAuthStateChanged(auth, callback);
  };


  


