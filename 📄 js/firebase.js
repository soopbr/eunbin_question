// ❌ 여기엔 <script> 태그 절대 없음

const firebaseConfig = {
  apiKey: "AIzaSyDtDtadwFVoYMSahJyeNKqh-3NfwSagi-o",
  authDomain: "eunbin-4ba29.firebaseapp.com",
  projectId: "eunbin-4ba29",
  storageBucket: "eunbin-4ba29.firebasestorage.app",
  messagingSenderId: "1042774764206",
  appId: "1:1042774764206:web:1068894ff8f3c583ef5b3f",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
