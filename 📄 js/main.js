console.log("✅ main.js 로드됨");

const questionInput = document.getElementById("question");
const submitBtn = document.getElementById("submitBtn");
const statusText = document.getElementById("status");

if (!questionInput || !submitBtn) {
  console.error("❌ DOM 요소 못 찾음");
}

if (localStorage.getItem("submitted") === "true") {
  questionInput.disabled = true;
  submitBtn.disabled = true;
  statusText.innerText = "이미 질문을 제출하셨습니다.";
}

submitBtn.onclick = async () => {
  console.log("🟢 질문 제출 클릭됨");

  const text = questionInput.value.trim();
  if (!text) {
    alert("질문을 입력하세요.");
    return;
  }

  try {
    await db.collection("questions").add({
      question: text,
      createdAt: new Date(),
      order: Date.now(),
      approved: false,
    });

    localStorage.setItem("submitted", "true");
    questionInput.disabled = true;
    submitBtn.disabled = true;
    statusText.innerText = "질문이 등록되었습니다.";

    console.log("✅ Firestore 저장 완료");
  } catch (e) {
    console.error("🔥 Firestore 에러", e);
    alert("에러 발생");
  }
};
