/***** Firebase 설정 *****/
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

/***** 1인 1질문 (브라우저 기준) *****/
if (localStorage.getItem("submitted") === "true") {
  document.getElementById("question").disabled = true;
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("status").innerText =
    "이미 질문을 제출하셨습니다.";
}

/***** 제출 *****/
document.getElementById("submitBtn").onclick = async () => {
  const text = document.getElementById("question").value.trim();
  if (!text) return alert("질문을 입력하세요.");

  await db.collection("questions").add({
    question: text,
    createdAt: new Date(),
    order: Date.now(),
    approved: false,
  });

  localStorage.setItem("submitted", "true");

  document.getElementById("question").disabled = true;
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("status").innerText =
    "질문이 등록되었습니다.";
};
