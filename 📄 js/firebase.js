/***** Firebase SDK 로드 *****/
importScripts?.(); // ❌ 이거 쓰지 마세요 (설명용)

/***** Firebase 설정 *****/
const firebaseConfig = {
  apiKey: "AIzaSyDtDtadwFVoYMSahJyeNKqh-3NfwSagi-o",
  authDomain: "eunbin-4ba29.firebaseapp.com",
  projectId: "eunbin-4ba29",
  storageBucket: "eunbin-4ba29.firebasestorage.app",
  messagingSenderId: "1042774764206",
  appId: "1:1042774764206:web:1068894ff8f3c583ef5b3f",
};

/***** Firebase 초기화 *****/
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
