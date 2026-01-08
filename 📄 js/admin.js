const list = document.getElementById("reviewList");

db.collection("questions")
  .orderBy("order", "asc")
  .onSnapshot(snapshot => {
    list.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.className = "review-item";
      li.dataset.id = doc.id;
      li.draggable = true;

      if (data.approved) li.classList.add("approved");

      li.innerHTML = `
        <span>${data.question}</span>
        <div>
          <button onclick="approve('${doc.id}')">승인</button>
          <button onclick="removeQ('${doc.id}')">삭제</button>
        </div>
      `;

      addDrag(li);
      list.appendChild(li);
    });
  });

function approve(id) {
  db.collection("questions").doc(id).update({ approved: true });
}

function removeQ(id) {
  if (confirm("삭제할까요?")) {
    db.collection("questions").doc(id).delete();
  }
}

// 드래그 정렬
let dragEl = null;

function addDrag(el) {
  el.ondragstart = () => dragEl = el;
  el.ondragover = e => e.preventDefault();
  el.ondrop = () => {
    list.insertBefore(dragEl, el);
    updateOrder();
  };
}

function updateOrder() {
  [...list.children].forEach((el, i) => {
    db.collection("questions").doc(el.dataset.id).update({
      order: i + 1
    });
  });
}
