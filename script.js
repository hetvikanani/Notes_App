const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));

const addNewnote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
          <div class="notes">
          <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
          </div>
        
          <div class="main ${text ? "" : "hidden"}"></div>
          <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>`;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const mainTextEl = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  mainTextEl.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    mainTextEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLocal();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    mainTextEl.innerHTML = marked(value);

    updateLocal();
  });

  document.body.appendChild(note);
};

if (notes) {
  notes.forEach((val) => {
    addNewnote(val);
  });
}

addBtn.addEventListener("click", () => {
  addNewnote();
});

const updateLocal = () => {
  const notesText = document.querySelectorAll("textarea");
  const arr = [];
  notesText.forEach((data) => {
    arr.push(data.value);
  });

  localStorage.setItem("notes", JSON.stringify(arr));
};
