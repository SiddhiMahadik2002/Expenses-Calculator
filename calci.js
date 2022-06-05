let adbtn = document.getElementById("btn");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let input3 = document.querySelector(".input3");
let tabledata = document.querySelector(".tabledata");
let total = document.querySelector(".total");

displayExpenses();
calciTotal();
let editExpensesidx = 0;

adbtn.addEventListener("click", function () {
  if (adbtn.innerHTML == "update") {
    updateExpenses(editExpensesidx);
  } else {
    if (
      input1.value.length != 0 &&
      input2.value.length != 0 &&
      input3.value.length != 0
    ) {
      let getLocalStorage = localStorage.getItem("tracker");
      if (getLocalStorage == null) {
        expenses = [];
      } else {
        expenses = JSON.parse(getLocalStorage);
      }
      const expensesObj = {
        name: input1.value,
        date: input2.value,
        amount: Number(input3.value),
      };
      expenses.push(expensesObj);
      localStorage.setItem("tracker", JSON.stringify(expenses));
      input1.value = "";
      input2.value = "";
      input3.value = "";
    }
  }

  displayExpenses();
  calciTotal();
});

// get the tracker storage from localstorage
// traverse the storage
// add it in htmlStri
// append the string in html

function displayExpenses() {
  let getLocalStorage = localStorage.getItem("tracker");
  if (getLocalStorage == null) {
    expenses = [];
  } else {
    expenses = JSON.parse(getLocalStorage);
  }
  let htmlStr = "";
  for (let i = 0; i < expenses.length; i++) {
    htmlStr += `<tr>
       <th scope="row">${i + 1}</th>
       <td>${expenses[i].name}
       </td>
       <td>${expenses[i].date}</td>
       <td>${expenses[i].amount}</td>
       <td> 
       <button class="btn"   onclick="deleteExpenses(${i})" >Delete</button>
       <button class="btn"    onclick="editExpenses(${i})" >Edit</button>
       </td>
     </tr>`;
    tabledata.innerHTML = htmlStr;
  }
  calciTotal();
}
function calciTotal() {
  let getLocalStorage = localStorage.getItem("tracker");
  if (getLocalStorage == null) {
    expenses = [];
  } else {
    expenses = JSON.parse(getLocalStorage);
  }
  let totalAmount = 0;
  for (i = 0; i < expenses.length; i++) {
    totalAmount = totalAmount + expenses[i].amount;
  }
  total.innerText = totalAmount;
}
function deleteExpenses(idx) {
  let ls = localStorage.getItem("tracker");
  let expenses = JSON.parse(ls);
  expenses.splice(idx, 1);

  localStorage.setItem("tracker", JSON.stringify(expenses));
  displayExpenses();
  calciTotal();
}
function editExpenses(idx) {
  let ls = localStorage.getItem("tracker");
  if (ls == null) {
    expenses = [];
  } else {
    expenses = JSON.parse(ls);
  }
  input1.value = expenses[idx].name;
  input2.value = expenses[idx].date;
  input3.value = expenses[idx].amount;

  adbtn.innerHTML = "update";
  editExpensesidx = idx;
}

function updateExpenses(idx) {
  const name = input1.value;
  const date = input2.value;
  const amount = Number(input3.value);
  let ls = localStorage.getItem("tracker");
  if (ls == null) {
    expenses = [];
  } else {
    expenses = JSON.parse(ls);
  }
  expenses[idx].name = name;
  expenses[idx].date = date;
  expenses[idx].amount = amount;
  localStorage.setItem("tracker", JSON.stringify(expenses));
  adbtn.innerHTML = "Submit";

  displayExpenses();
  calciTotal();
}
