let questions = [];
let index = 0;

const textEl = document.getElementById("questionText");
const counterEl = document.getElementById("counter");

/* 승인된 질문만 불러오기 */
db.collection("questions")
  .where("approved", "==", true)
  .orderBy("order", "asc")
  .onSnapshot(snapshot => {
    questions = snapshot.docs.map(doc => doc.data());
    index = 0;
    render();
  });

function render() {
  if (!questions.length) {
    textEl.innerText = "표시할 질문이 없습니다.";
    counterEl.innerText = "";
    return;
  }

  textEl.innerText = questions[index].question;
  counterEl.innerText = `${index + 1} / ${questions.length}`;
}

/* 이전 */
document.getElementById("prev").onclick = () => {
  if (index > 0) {
    index--;
    render();
  }
};

/* 다음 */
document.getElementById("next").onclick = () => {
  if (index < questions.length - 1) {
    index++;
    render();
  }
};

/* 음성 출력 (밝고 빠르게) */
document.getElementById("speak").onclick = () => {
  if (!questions[index]) return;

  const u = new SpeechSynthesisUtterance(questions[index].question);
  u.lang = "ko-KR";
  u.rate = 1.15;   // 속도 ↑
  u.pitch = 1.2;   // 밝은 톤

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
};
