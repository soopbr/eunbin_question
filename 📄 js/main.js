const questionInput = document.getElementById("question");
const submitBtn = document.getElementById("submitBtn");
const statusText = document.getElementById("status");

// 새로고침해도 다시 못 쓰게
if (localStorage.getItem("submitted") === "true") {
  questionInput.disabled = true;
  submitBtn.disabled = true;
  statusText.innerText = "이미 질문을 제출하셨습니다.";
}

submitBtn.onclick = async () => {
  const text = questionInput.value.trim();
  if (!text) return alert("질문을 입력하세요.");

  submitBtn.disabled = true;

  await db.collection("questions").add({
    question: text,
    createdAt: new Date(),
    order: Date.now(),
    approved: false,
  });

  localStorage.setItem("submitted", "true");
  questionInput.disabled = true;
  statusText.innerText = "질문이 등록되었습니다.";
};
