const questionInput = document.getElementById("question");
const submitBtn = document.getElementById("submitBtn");
const statusText = document.getElementById("status");

/* 🔒 로컬 잠금 체크 */
if (localStorage.getItem("submitted") === "true") {
  questionInput.disabled = true;
  submitBtn.disabled = true;
  statusText.innerText = "이미 질문을 제출하셨습니다.";
}

/* 제출 */
submitBtn.onclick = async () => {
  const text = questionInput.value.trim();
  if (!text) {
    alert("질문을 입력하세요.");
    return;
  }

  submitBtn.disabled = true;

  /* 🔐 Firestore 중복 방지 (브라우저 기준) */
  if (localStorage.getItem("submitted") === "true") {
    statusText.innerText = "이미 질문을 제출하셨습니다.";
    return;
  }

  await db.collection("questions").add({
    question: text,
    createdAt: new Date(),
    order: Date.now(),
    approved: false
  });

  localStorage.setItem("submitted", "true");

  questionInput.disabled = true;
  statusText.innerText = "질문이 등록되었습니다.";
};
