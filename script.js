function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function filterTags() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const listItems = document.querySelectorAll("#tag-list li");
  listItems.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(keyword) ? "list-item" : "none";
  });
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function runCode() {
  const prog = document.getElementById("code-area").value;
  const output = document.getElementById("output");
  Sk.configure({
    output: text => output.innerText += text + "\n",
    read: builtinRead
  });
  output.innerText = "";
  Sk.misceval.asyncToPromise(() =>
    Sk.importMainWithBody("<stdin>", false, prog)
  ).catch(err => {
    output.innerText += "\n[エラー]: " + err.toString();
  });
}

