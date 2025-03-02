import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb0wjVlVow33m_BhiwS8_xUtUbAaQ_dKM",
  authDomain: "kiran-2e197.firebaseapp.com",
  projectId: "kiran-2e197",
  storageBucket: "kiran-2e197.firebasestorage.app",
  messagingSenderId: "993414766022",
  appId: "1:993414766022:web:f98d33377d88f3409766c7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(
  app,
  process.env.NEXT_PUBLIC_FIREBASE_MUSIC_UPLOAD_URI
);

const uploadPhoto = async (thumbnail) => {
  const urlRef = ref(storage, `Photos/${Date.now()}`);
  const uploadUrl = await uploadBytes(urlRef, thumbnail);
  return uploadUrl;
};

export { app, auth, uploadPhoto };