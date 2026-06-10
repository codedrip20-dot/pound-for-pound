import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";



console.log('the firebase api key is',import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    await createUserDocumentFromAuth(response.user);

    console.log(response);
    
  
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {

  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any ) => 
  onAuthStateChanged(auth, callback);

export const sendEmailVerificationToUser = async (user: any) => {
  if (!user) return;
  await sendEmailVerification(user);
};

export const resetPassword = async (
  email: string
) => {

  if (!email) return;

  await sendPasswordResetEmail(
    auth,
    email
  );
};
// DataBase activities starts here

//adding all the sample data inside the firebase database
// export const addCollectionAndDocuments = async (
//   collectionKey: string,
//   objectsToAdd: any[]
// ) => {
//   const collectionRef = collection(db, collectionKey);

//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(
//       collectionRef,
//       object.uid // using your product uid as Firestore document id
//     );

//     batch.set(docRef, object);
//   });

//   await batch.commit();

//   alert("Products added to Firestore successfully!");
//   console.log("done");
// };

export const fetchProducts = async () => {
  const collectionRef = collection(db, "products");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
  }));

  return products;
};

//Adminlogiccs

//addproductsto firebase
export const addProductToFirestore = async (
  product: any
) => {
  try {
    const productRef = doc(
      db,
      "products",
      product.uid || crypto.randomUUID()
    );

    await setDoc(productRef, product);

    return {
      success: true,
      message:
        "Product added successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Failed to add product",
    };
  }
};


//update product images in firebase

export type ProductImage = {
  id: string;
  imageUrl: string;
  publicId: string;
  altText: string;
};

export const updateProductImages = async (
  uid: string,
  productImages: ProductImage[]
) => {
  try {
    const productRef = doc(db, "products", uid);

    await updateDoc(productRef, {
      productImages,
    });

    return {
      success: true,
      message: "Product images updated successfully",
    };
  } catch (error) {
    console.error("Error updating product images:", error);

    return {
      success: false,
      message: "Failed to update product images",
    };
  }
};

// delete product from firebase
export const deleteProduct = async (
  uid: string
): Promise<void> => {
  try {
    const productRef = doc(
      db,
      "products",
      uid
    );

    await deleteDoc(productRef);

    console.log(
      `Product ${uid} deleted successfully`
    );
  } catch (error) {
    console.error(
      "Error deleting product:",
      error
    );

    throw error;
  }
};


export const updatePrice = async (
  uid: string,
  price: number
): Promise<void> => {
  try {
    const productRef = doc(
      db,
      "products",
      uid
    );

    await updateDoc(productRef, {
      price,
    });

    console.log(
      `Price updated for ${uid}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};