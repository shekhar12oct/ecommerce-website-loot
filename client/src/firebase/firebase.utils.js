import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config=
    {
        apiKey: "AIzaSyDWRdOUnE2SQQ9aWtfWR9nG43anx1iMTOE",
        authDomain: "clothe-dbs.firebaseapp.com",
        projectId: "clothe-dbs",
        storageBucket: "clothe-dbs.appspot.com",
        messagingSenderId: "678969804026",
        appId: "1:678969804026:web:809334e978dce33295f543",
        measurementId: "G-4WLVLCVJ6S"
      };

firebase.initializeApp(config);

export const createUserProfileDocument=async (userAuth,additionalData)=>{
   if(!userAuth){
     return;
   }
   const userRef=firestore.doc(`users/${userAuth.uid}`);
   const collectionRef=firestore.collection('users');


   const snapshot=await userRef.get();
   const  collectionSnapshot=await collectionRef.get();

   if(!snapshot.exists){
     const {displayName,email}=userAuth;
     const createdAt=new Date();

     try{
     await userRef.set({
       displayName,
       email,
       createdAt,
       ...additionalData
     })
     }
     catch(error){
        console.log(error);
     }
   }

   return userRef;
}


export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
  const collectionRef=firestore.collection(collectionKey);

  const batch=firestore.batch();
  objectsToAdd.forEach(obj=>{
    const newDocRef=collectionRef.doc();
    batch.set(newDocRef,obj)
  });

  return await batch.commit();
  };

export const auth=firebase.auth();
export const firestore=firebase.firestore();


const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle=()=> auth.signInWithPopup(provider);


export default firebase;

