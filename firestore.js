import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQflxrGezAuEO4NxO2EmhzhZjZjMYgHu4",
  authDomain: "my-project-eb44b.firebaseapp.com",
  databaseURL: "https://my-project-eb44b-default-rtdb.firebaseio.com",
  projectId: "my-project-eb44b",
  storageBucket: "my-project-eb44b.appspot.com",
  messagingSenderId: "738847674304",
  appId: "1:738847674304:web:7c1d180ca1d12404ff8225",
};

const app = initializeApp(firebaseConfig);

import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

let database = getFirestore(app);
const usersRef = collection(database, "users");

var saveButton = document.getElementById("saveButton");
var getButton = document.getElementById("getButton");
saveButton.onclick = add;
getButton.onclick = getAllData;
getIdButton.onclick = getDataWithID;
updateDataButton.onclick = updateData;
deleteButton.onclick = remove;
//add data with id
function add() {
  let username = document.getElementById("username");
  let age = document.getElementById("age");
  let id = document.getElementById("id");
  setDoc(doc(database, "users", id.value), {
    name: username.value,
    age: Number(age.value),
    id: id.value,
  });
  alert("user added");
}

// Get data with id
function getDataWithID() {
  (async () => {
    let id = document.getElementById("id").value;
    let username = document.getElementById("username").value;
    let age = document.getElementById("age").value;
    const querySnapshot = await getDoc(doc(database, "users", id));
    let demo = document.getElementById("demo");
    console.log(querySnapshot._document.data.value.mapValue.fields);
    demo.innerHTML = `Name:${querySnapshot._document.data.value.mapValue.fields.name.stringValue}
            <br>
            age:${querySnapshot._document.data.value.mapValue.fields.age.integerValue}
          `;
  })()
    .then(() => {
      console.log("Xuat du lieu thanh cong");
    })
    .catch((e) => {
      console.log("xuat du lieu khong thanh cong");
    });
}

// Get all data
async function getAllData() {
  const querySnapshot = await getDocs(collection(database, "users"));
  var users = [];
  let demo = document.getElementById("demo");
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  console.log(users);
  let wrapperDiv = document.createElement("div");
  users.forEach((element) => {
    let childDiv = document.createElement("div");
    childDiv.textContent = `ID:${element.id},Name:${element.name},AGE:${element.age}`;
    wrapperDiv.appendChild(childDiv);
  });
  document.getElementById("demo").innerHTML = "";
  demo.appendChild(wrapperDiv);
}

// update data
async function updateData() {
  let id = document.getElementById("id").value;
  let username = document.getElementById("username").value;
  let age = document.getElementById("age").value;
  updateDoc(doc(database, "users", id), {
    name: username,
    age: Number(age),
  })
    .then(console.log("cap nhat du lieu thanh cong"))
    .catch((e) => {
      console.log("cap nhat du lieu that bai");
    });
}
//remove
async function remove() {
  let id = document.getElementById("id").value;
  deleteDoc(doc(database, "users", id))
    .then(() => {
      console.log("xoa du lieu thanh cong");
    })
    .catch(() => {
      console.log("xoa that bai");
    });
}
