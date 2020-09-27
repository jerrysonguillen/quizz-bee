const btnMulti = document.querySelector("#multi");
const form = document.querySelector("form");
const btnIdentify = document.querySelector("#identify");
const MULTIPLE_CHOICE = "multiple choices";
const IDENTIFICATION = "identify";
const saveBtn = document.querySelector("#save");
const table = document.querySelector("#table > tbody");
const addQuestionBtn = document.querySelector("#addQuestionBtn");
const participantTable = document.querySelector("#table-participant");
const tableQ = document.querySelector('#question-table');
let questionEntries = [];

let typeFlag = IDENTIFICATION;
let multipleChoiceAnswer = "a";

//function
const getUserAndScoreOnLocal = () => {
  let userScore = localStorage.getItem("userScore");
  if (userScore == null) {
    userScore = [];
  } else {
    userScore = JSON.parse(localStorage.getItem("userScore"));
  }
  return userScore;
};

const clearUserNadScore = ()=>{
  let userScore = localStorage.getItem("userScore");
  if (userScore == null) {
    userScore = [];
  } else {
    userScore = JSON.parse(localStorage.getItem("userScore"));
  }
  localStorage.setItem('userScore',JSON.stringify([]))

}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

const multi = () => {
  if (document.querySelector(".correct-answer")) {
    document.querySelector(".correct-answer").remove();
  }
  if (!document.querySelector(".multiple")) {
    const divRow = document.createElement("div");
    const inputA = document.createElement("input");
    const inputB = document.createElement("input");
    const inputC = document.createElement("input");
    const labelA = document.createElement("label");
    const labelB = document.createElement("label");
    const labelC = document.createElement("label");
    const small = document.createElement("small");
    const radioA = document.createElement("input");
    const radioB = document.createElement("input");
    const radioC = document.createElement("input");
    const divCheckGroupA = document.createElement("div");
    const divFormGroupA = document.createElement("div");
    const divFormGroupB = document.createElement("div");
    const divCheckGroupB = document.createElement("div");
    const divFormGroupC = document.createElement("div");
    const divCheckGroupC = document.createElement("div");

    const divFormCheckA = document.createElement("div");
    divFormCheckA.className = "form-check";
    divFormGroupA.className = "form-group col-md-11";

    const divFormCheckB = document.createElement("div");
    divFormCheckB.className = "form-check";
    divFormGroupB.className = "form-group col-md-11";

    const divFormCheckC = document.createElement("div");
    divFormCheckC.className = "form-check";
    divFormGroupC.className = "form-group col-md-11";

    radioA.className = "form-check-input";
    radioA.setAttribute("name", "answer");
    radioA.setAttribute("type", "radio");
    radioA.setAttribute("checked", "true");
    radioA.setAttribute("id", "radioA");
    radioA.setAttribute("value", "a");
    radioA.setAttribute("onClick", "multiAnswer(this.value)");
    divFormCheckA.appendChild(radioA);
    divFormCheckA.appendChild(labelA);

    radioB.className = "form-check-input";
    radioB.setAttribute("name", "answer");
    radioB.setAttribute("type", "radio");
    radioB.setAttribute("id", "radioB");
    radioB.setAttribute("value", "b");
    radioB.setAttribute("onClick", "multiAnswer(this.value)");
    divFormCheckB.appendChild(radioB);
    divFormCheckB.appendChild(labelB);

    radioC.className = "form-check-input";
    radioC.setAttribute("name", "answer");
    radioC.setAttribute("type", "radio");
    radioC.setAttribute("id", "radioC");
    radioC.setAttribute("value", "c");
    radioC.setAttribute("onClick", "multiAnswer(this.value)");
    divFormCheckC.appendChild(radioC);
    divFormCheckC.appendChild(labelC);

    labelA.appendChild(document.createTextNode("A"));
    labelA.setAttribute("for", "radioA");

    labelB.appendChild(document.createTextNode("B"));
    labelB.setAttribute("for", "radioB");

    labelC.appendChild(document.createTextNode("C"));
    labelC.setAttribute("for", "radioC");

    inputA.className = "form-control";
    inputA.setAttribute("name", "inputA");

    inputB.className = "form-control";
    inputB.setAttribute("name", "inputB");

    inputC.className = "form-control";
    inputC.setAttribute("name", "inputC");

    small.appendChild(document.createTextNode("Pick the correct Answer"));
    small.className = "form-text text-muted";

    divFormGroupA.appendChild(inputA);
    divFormCheckA.appendChild(labelA);
    divCheckGroupA.className = "form-group col-1";
    divCheckGroupA.appendChild(divFormCheckA);
    divRow.appendChild(divCheckGroupA);
    divRow.appendChild(divFormGroupA);

    divFormGroupB.appendChild(inputB);
    divFormCheckB.appendChild(labelB);
    divCheckGroupB.className = "form-group col-1";
    divCheckGroupB.appendChild(divFormCheckB);
    divRow.appendChild(divCheckGroupB);
    divRow.appendChild(divFormGroupB);

    divFormGroupC.appendChild(inputC);
    divFormCheckC.appendChild(labelC);
    divCheckGroupC.className = "form-group col-1";
    divCheckGroupC.appendChild(divFormCheckC);
    divRow.appendChild(divCheckGroupC);
    divRow.appendChild(divFormGroupC);

    divRow.className = "form-row multiple";
    divRow.appendChild(small);

    form.appendChild(divRow);
    typeFlag = MULTIPLE_CHOICE;
  }
};

const identify = (e) => {
  if (document.querySelector(".multiple")) {
    document.querySelector(".multiple").remove();
    divCorrectAns();
    typeFlag = IDENTIFICATION;
  }
};

const divCorrectAns = () => {
  if (!document.querySelector(".correct-answer")) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.appendChild(document.createTextNode("Correct Answer"));
    input.className = "form-control";
    input.setAttribute("type", "text");
    input.setAttribute("name", "answer");
    div.appendChild(label);
    div.appendChild(input);

    div.className = "form-group correct-answer";
    form.appendChild(div);
  }
};

const multiAnswer = (ans) => {
  multipleChoiceAnswer = ans;
};

const addEntry = (entry) => {
  let entries = getLocalStorage();
  let id = entries.length + 1;
  entry.id = id;
  entries.push(entry);
  questionEntries = entries;
  saveToLocalStorage(entries);
  const tr = document.createElement("tr");
  const thNum = document.createElement("th");
  const tdTitle = document.createElement("td");
  const tdQuestion = document.createElement("td");
  const tdType = document.createElement("td");
  const tdAction = document.createElement("td");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  editBtn.className = "btn btn-success edit-btn mr-2";
  editBtn.appendChild(document.createTextNode("Edit"));
  deleteBtn.className = "btn btn-danger delete-btn";
  deleteBtn.appendChild(document.createTextNode("Delete"));

  thNum.setAttribute("scope", "row");
  thNum.appendChild(document.createTextNode(entry.id));
  tdTitle.appendChild(document.createTextNode(entry.title));
  tdQuestion.appendChild(document.createTextNode(entry.question));
  tdType.appendChild(document.createTextNode(entry.type));
  // data-toggle="modal"
  //data-target="#addStudent"
  editBtn.setAttribute("data-toggle", "modal");
  editBtn.setAttribute("data-target", "questionModal");
  tdAction.appendChild(editBtn);
  tdAction.appendChild(deleteBtn);
  tr.setAttribute("data-id", id);
  tr.appendChild(thNum);
  tr.appendChild(tdTitle);
  tr.appendChild(tdQuestion);
  tr.appendChild(tdType);
  tr.appendChild(tdAction);
  table.appendChild(tr);
  location.reload();
};

const saveToLocalStorage = (entries) => {
  localStorage.setItem("entries", JSON.stringify(entries));
};

const deleteToLocalStorage = (id) => {
  let entries = getLocalStorage();
  entries.splice(entries.indexOf(entries.find((el) => el.id == id)), 1);
  questionEntries = entries;
  saveToLocalStorage(entries);

  console.log(entries);
};

const getLocalStorage = () => {
  let entries;
  if (localStorage.getItem("entries") == null) {
    entries = [];
  } else {
    entries = JSON.parse(localStorage.getItem("entries"));
  }
  return entries;
};

// event

document.getElementById("defaultOpen").click();

addQuestionBtn.addEventListener("click", (e) => {
  document.querySelector("#modalTitle").innerHTML = "Add Question";
});

btnMulti.addEventListener("click", multi);
btnIdentify.addEventListener("click", identify);

var getParams = function (url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector('input[name="title"]').value;
  let question = document.querySelector('input[name="question"]').value;
  let answer = "";
  switch (typeFlag) {
    case MULTIPLE_CHOICE:
      answer = multipleChoiceAnswer;
      break;
    case IDENTIFICATION:
      answer = document.querySelector('input[name="answer"]').value;
      break;
  }

  if (title && question && answer) {
    let ans;
    if (typeFlag == MULTIPLE_CHOICE) {
      let a = document.querySelector('input[name="inputA"]').value;
      let b = document.querySelector('input[name="inputB"]').value;
      let c = document.querySelector('input[name="inputC"]').value;
      ans = {
        a: a,
        b: b,
        c: c,
      };
    }
    title = capitalizeFirstLetter(title)
    question = capitalizeFirstLetter(question)
    let entry = {
      title: title,
      question: question,
      type: typeFlag,
      answer: answer,
      choices: ans,
    };

    addEntry(entry);
  } else {
    alert("all filed must not be empty");
  }
});

table.addEventListener("click", (e) => {
  const target = e.target;
  if (target.className.includes("delete-btn")) {
    if (confirm("are you sure you want to delete this question?")) {
      let id = target.parentNode.parentNode.getAttribute("data-id");
      deleteToLocalStorage(id);
      target.parentNode.parentNode.remove();
      location.reload()
    }
  }
  if (target.className.includes("edit-btn")) {
    document.querySelector("#modalTitle").innerHTML = "Update Question";
    id = target.parentNode.parentNode.getAttribute("data-id");
    let entries = getLocalStorage();
    let entry = entries.find((el) => el.id == id);
    console.log(entry);

    document.querySelector('input[name="title"]').value = entry.title;
    document.querySelector('input[name="question"]').value = entry.question;
    console.log(entry.answer);
    console.log(entry.type);
    switch (entry.type) {
      case MULTIPLE_CHOICE:
        multi();
        document.querySelector('input[name="inputA"]').value = entry.choices.a;
        document.querySelector('input[name="inputB"]').value = entry.choices.b;
        document.querySelector('input[name="inputC"]').value = entry.choices.c;
        break;
      case IDENTIFICATION:
        document.querySelector('input[name="answer"]').value = entry.answer;
        break;
    }
  }
});


// Get parameters from a URL string
//console.log(getParams(window.location.href)["a"]);

(function () {
  let entries = getLocalStorage();
  let participants = getUserAndScoreOnLocal();
  if(entries.length>=1){
  for (let entry of entries) {
    const tr = document.createElement("tr");
    const thNum = document.createElement("th");
    const tdTitle = document.createElement("td");
    const tdQuestion = document.createElement("td");
    const tdType = document.createElement("td");
    const tdAction = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.className = "btn btn-success edit-btn mr-2";
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#questionModal");
    deleteBtn.className = "btn btn-danger delete-btn";
    deleteBtn.appendChild(document.createTextNode("Delete"));

    thNum.setAttribute("scope", "row");
    thNum.appendChild(document.createTextNode(entry.id));
    tdTitle.appendChild(document.createTextNode(entry.title));
    tdQuestion.appendChild(document.createTextNode(entry.question));
    tdType.appendChild(document.createTextNode(entry.type));
    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);
    tr.setAttribute("data-id", entry.id);
    tr.appendChild(thNum);
    tr.appendChild(tdTitle);
    tr.appendChild(tdQuestion);
    tr.appendChild(tdType);
    tr.appendChild(tdAction);
    table.appendChild(tr);
  }
  const divRow = document.createElement('div');
  const divCol12 = document.createElement('div');
  const anchor = document.createElement('a');
  divRow.className = 'row';
  divCol12.className = 'col-12';
  anchor.setAttribute('href','/quizbee.html');
  anchor.setAttribute('type','button');
  anchor.setAttribute('target','_blank');
  anchor.className='btn btn-primary float-right';
  anchor.appendChild(document.createTextNode('Click here to go to Question Board'))
  console.log(tableQ)
  tableQ.appendChild(anchor)
  }else {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.className = 'text-center'
    td.setAttribute('colspan','5')
    td.style.backgroundColor = '#cacacaca'
    td.appendChild(document.createTextNode('No data'))
    tr.appendChild(td)
    table.appendChild(tr);
  }
  if(participants.length>0){
    participants = participants.sort((a,b)=>b.question.length-a.question.length)
    for (const participant of participants) {
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdScore = document.createElement("td");
      tdName.appendChild(document.createTextNode(participant.name));
      tdScore.appendChild(document.createTextNode(participant.question.length));
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      participantTable.appendChild(tr);
    }
    const button = document.createElement("button");
    button.appendChild(document.createTextNode('Clear'));
    button.className = 'btn btn-danger clear-participant float-right';

    document.querySelector('#answer').appendChild(button)
    const clearParticipantBtn = document.querySelector('.clear-participant');

    clearParticipantBtn.addEventListener('click',function(e){
      if(confirm('are you sure you want to clear the participants')) {
        clearUserNadScore()
        location.reload()
      }
      
    })
  }else {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    
    
    td.className = 'text-center'
    td.setAttribute('colspan','5')
    td.style.backgroundColor = '#cacacaca'
    td.appendChild(document.createTextNode('No data'))
    tr.appendChild(td)
    participantTable.appendChild(tr);
    
  }
})();


