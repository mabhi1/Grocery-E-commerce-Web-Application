import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    updatePassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import "./Firebase";

const auth = getAuth();

async function createUser(email, password, displayName) {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: displayName });
}

async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

async function socialSignIn(provider) {
    let socialProvider = null;
    if (provider === "google") {
        socialProvider = new GoogleAuthProvider();
    } else if (provider === "facebook") {
        socialProvider = new FacebookAuthProvider();
    }
    try{
        await signInWithPopup(auth, socialProvider);
    }catch(error){
        console.log(error);
    }
    
}

async function passwordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

async function dosignOut() {
    await signOut(auth);
}

async function changePassword(password) {
    await updatePassword(auth, password);
}

async function updateName(name) {
    await updateProfile(auth.currentUser, { displayName: name });
}

export { createUser, dosignOut, passwordReset, signIn, changePassword, socialSignIn, updateName };