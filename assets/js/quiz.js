//const firstModal = document.querySelector('#myModal');
const form = document.querySelector("form");
const nameInput = document.querySelector('input[name="name"]');
const closeModalBtn = document.querySelector("#closeModal");
const questioner = document.querySelector("#questioner");
const modalTitle = document.querySelector("#modalTitle");
const answerBtn = document.querySelector("#answerBtn");
const MULTIPLE_CHOICE = "multiple choices";
const IDENTIFICATION = "identify";

$("#myModal").modal("toggle");

//function
const updateName = (name) => {
  localStorage.setItem("quizBeeName", JSON.stringify(name));
};

const getUser = () => {
  let user = localStorage.getItem("quizBeeName");
  if (user == null) {
    user = "invalid";
  } else {
    user = JSON.parse(user);
  }
  return user;
};

const getQuestionInLocal = () => {
  let entries = localStorage.getItem("entries");
  if (entries == null) {
    entries = [];
  } else {
    entries = JSON.parse(entries);
  }
  return entries;
};

const saveUserAndScoreOnLocal = (result) => {
  let userScore = localStorage.getItem("userScore");
  if (userScore == null) {
    userScore = [];
  } else {
    userScore = JSON.parse(localStorage.getItem("userScore"));
  }
  userScore.push(result);
  console.log("here at saveuser");
  localStorage.setItem("userScore", JSON.stringify(userScore));
};

const getUserAndScoreOnLocal = () => {
  let userScore = localStorage.getItem("userScore");
  if (userScore == null) {
    userScore = [];
  } else {
    userScore = JSON.parse(localStorage.getItem("userScore"));
  }
  return userScore;
};

const editUserAndScoreOnLocal = (user) => {
  console.log("edituser");
  let userScores = localStorage.getItem("userScore");
  if (userScores == null) {
    userScores = [];
  } else {
    userScores = JSON.parse(userScores);
  }

  origuser = user;
  console.log(user);
  console.log(userScores);

  localStorage.setItem(
    "userScore",
    JSON.stringify(
      userScores.map((el) => {
        if (el.name == user.name) return user;
        else return el
      })
    )
  );
};

//event

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let n = nameInput.value;
  if (n) {
    updateName(n);
    closeModalBtn.click();
  } else {
    alert("please fill up name");
  }
});

//proceed btn event listener
questioner.addEventListener("click", function (e) {
  let target = e.target;
  if (target.className.includes("btn-proceed")) {
    let entries = getQuestionInLocal();
    id = target.parentNode.parentNode.parentNode.getAttribute("data-id");
    document
      .querySelector("#questionModal")
      .setAttribute("data-question-id", id);
    let entry = entries.find((entry) => id == entry.id);
    modalTitle.innerHTML = entry.title;
    const modalBody = document.querySelector("#cardBody");
    modalBody.innerHTML = "";
    const question = document.createElement("h6");
    question.appendChild(document.createTextNode(entry.question));
    modalBody.appendChild(question);
    const MULTIPLE_CHOICE = "multiple choices";
    switch (entry.type) {
      case IDENTIFICATION:
        const formDiv = document.createElement("div");
        formDiv.className = "form-group";
        const label = document.createElement("label");
        const input = document.createElement("input");
        label.setAttribute("for", "ans");
        label.appendChild(document.createTextNode("Answer"));
        formDiv.appendChild(label);
        input.className = "form-control";
        input.setAttribute("type", "text");
        input.setAttribute("name", "answer");
        formDiv.appendChild(input);
        modalBody.appendChild(formDiv);
        break;
      case MULTIPLE_CHOICE:
        const aFormDiv = document.createElement("div");
        aFormDiv.className = "form-check form-check-inline";
        const inputA = document.createElement("input");
        inputA.setAttribute("type", "radio");
        inputA.setAttribute("checked", "true");
        inputA.setAttribute("name", "ansValue");
        inputA.setAttribute("id", "inputA");
        inputA.setAttribute("value", "a");
        const labelA = document.createElement("label");
        labelA.className = "form-check-label";
        labelA.setAttribute("for", "inputA");
        labelA.appendChild(document.createTextNode("A. " + entry.choices.a));
        aFormDiv.appendChild(inputA);
        aFormDiv.appendChild(labelA);
        modalBody.appendChild(aFormDiv);

        const bFormDiv = document.createElement("div");
        bFormDiv.className = "form-check form-check-inline";
        const inputB = document.createElement("input");
        inputB.setAttribute("type", "radio");
        inputB.setAttribute("name", "ansValue");
        inputB.setAttribute("id", "inputB");
        inputB.setAttribute("value", "b");
        const labelB = document.createElement("label");
        labelB.className = "form-check-label";
        labelB.setAttribute("for", "inputB");
        labelB.appendChild(document.createTextNode("B. " + entry.choices.b));
        bFormDiv.appendChild(inputB);
        bFormDiv.appendChild(labelB);
        modalBody.appendChild(bFormDiv);
        console.log(entry);
        const cFormDiv = document.createElement("div");
        cFormDiv.className = "form-check form-check-inline";
        const inputC = document.createElement("input");
        inputC.setAttribute("type", "radio");
        inputC.setAttribute("name", "ansValue");
        inputC.setAttribute("id", "inputC");
        inputC.setAttribute("value", "c");
        const labelC = document.createElement("label");
        labelC.className = "form-check-label";
        labelC.setAttribute("for", "inputC");
        labelC.appendChild(document.createTextNode("C. " + entry.choices.c));
        cFormDiv.appendChild(inputC);
        cFormDiv.appendChild(labelC);
        modalBody.appendChild(cFormDiv);
        break;
    }
  }
});

answerBtn.addEventListener("click", (e) => {
  let entries = getQuestionInLocal();
  let id = document
    .querySelector("#questionModal")
    .getAttribute("data-question-id");
  let entry = entries.find((el) => el.id == id);
  let answer = "empty";
  let correctAnswer = entry.answer;
  switch (entry.type) {
    case MULTIPLE_CHOICE:
      let inputAns2 = document.querySelectorAll('input[name="ansValue"]');
      for (const rb of inputAns2) {
        if (rb.checked) {
          answer = rb.value;
          break;
        }
      }
      break;
    case IDENTIFICATION:
      let inputAns = document.querySelector('input[name="answer"]');
      answer = inputAns.value;
      break;
  }
  let user = getUser();
  console.log("user");
  console.log(user);
  let userOnLocal = getUserAndScoreOnLocal();
  let findUser = userOnLocal.find((el) => el.name == user);
  console.log("find user value:" + findUser);
  let isGotCorrectAns = answer == correctAnswer;
  let userAndScore;
  if (isGotCorrectAns) {
    console.log("is correct");
    if (findUser) {
      console.log("find user");
      if (!findUser.question.includes(id)) {
        findUser.question.push(id);
        console.log("here at exec edit");
        editUserAndScoreOnLocal(findUser);
      }
      alert('Congrats you answer correctly')
      document.querySelector('#closeQuestionModal').click()
    } else {
      console.log("here not find user");
      userAndScore = {
        name: user,
        question: [id],
      };
      console.log(userAndScore);
      saveUserAndScoreOnLocal(userAndScore);
      alert('Congrats you answer correctly')
      document.querySelector('#closeQuestionModal').click()
    }
  }else {
    alert('Wrong Answer')
    document.querySelector('#closeQuestionModal').click();
  }
});

(function () {
  entries = getQuestionInLocal();
  if (entries.length == 0) {
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("No Question Available"));
    h1.className+='text-center';
    document.querySelector(".no-question").appendChild(h1);
  } else {
    entries.forEach((entry) => {
      const div = document.createElement("div");
      const cardDiv = document.createElement("div");
      const img = document.createElement("img");
      const cardBody = document.createElement("div");
      const title = document.createElement("h5");
      const proceedBtn = document.createElement("button");

      div.className = "col-12 col-md-6 col-lg-4 pt-3 pb-3";
      div.setAttribute("data-id", entry.id);
      cardDiv.className = "card border-primary card-size";
      img.setAttribute("src", "./assets/images/question-mark.jpg");
      img.setAttribute("alt", "question mark logo");
      img.className = "image";
      cardBody.className = "card-body text-dark";
      title.className = "card-title";
      title.appendChild(document.createTextNode(entry.title));
      proceedBtn.className = "btn btn-primary btn-proceed";
      proceedBtn.setAttribute("type", "button");
      proceedBtn.setAttribute("data-toggle", "modal");
      proceedBtn.setAttribute("data-target", "#questionModal");
      proceedBtn.appendChild(document.createTextNode("Proceed"));
      cardBody.appendChild(title);
      cardBody.appendChild(proceedBtn);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      div.appendChild(cardDiv);
      questioner.appendChild(div);
    });
  }
})();
