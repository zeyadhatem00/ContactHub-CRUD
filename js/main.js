var fullname = document.getElementById("fullname");
var ph_number = document.getElementById("ph_number");
var email = document.getElementById("e_mail");
var adress = document.getElementById("adresss");
var note = document.getElementById("note");
var group = document.getElementById("group");
var layer = document.querySelector(".layer");
var fav_check = document.getElementById("fav-check");
var emergencycheck = document.getElementById("emergency-check");
var totalcount = document.getElementById("t-count");
var favoritecounter = document.getElementById("f-count");
var emergencycounter = document.getElementById("e-count");
var update = document.getElementById("update");
var savebtn = document.getElementById("save");
var layerhead = document.getElementById("layerhead");
var edithead = document.getElementById("edith");
var serchinput = document.getElementById("searchcontact");
var allcontacts = [];
var head = document.getElementById("thelast");
var stars = document.querySelectorAll(".floating-star");

function addContact() {
  layer.classList.replace("d-none", "d-flex");
  fullname.value = null;
  ph_number.value = null;
  email.value = null;
  adress.value = null;
  note.value = null;
  group.value = "Select a group";
  fav_check.checked = false;
  emergencycheck.checked = false;
  update.classList.replace("d-flex", "d-none");
  savebtn.classList.replace("d-none", "d-flex");
  layerhead.classList.replace("d-none", "d-block");
  edithead.classList.replace("d-block", "d-none");
}

function closeLayer() {
  layer.classList.replace("d-flex", "d-none");
}
if (localStorage.getItem("contactcontainer") != null) {
  allcontacts = JSON.parse(localStorage.getItem("contactcontainer"));
  displaycontact();
  totalcounter();
}

function saveContact() {
  if (fullname.value == "") {
    Swal.fire({
      title: "missing contact name",
      text: `contact name should be provided`,
      icon: "error",
    });
  } else if (ph_number.value == "") {
    Swal.fire({
      title: "missing Phone Number",
      text: `phone number should be provided`,
      icon: "error",
    });
  } else if (
    allcontacts.some((contact) => contact.tel_number === ph_number.value)
  ) {
    Swal.fire({
      title: "Phone Number Exists",
      text: "This phone number already exists",
      icon: "error",
    });
    return;
  } else if (validateinputs(fullname) && validateinputs(ph_number)) {
    var contact = {
      name: fullname.value,
      tel_number: ph_number.value,
      mail: email.value,
      loaction: adress.value,
      notes: note.value,
      groups: group.value,
      check: fav_check.checked,
      heartCheck: emergencycheck.checked,
      grad: getRandomIntInclusive(),
    };

    allcontacts.push(contact);

    layer.classList.replace("d-flex", "d-none");
    Swal.fire({
      title: "Added",
      text: "Your contact has been added successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });

    localStorage.setItem("contactcontainer", JSON.stringify(allcontacts));

    displaycontact();
    resetinputs();
    totalcounter();
  }
}

function displaycontact() {
  var cart = "";
  for (var i = 0; i < allcontacts.length; i++) {
    cart += `
<div class="col-md-6 mb-3">

<div class="bg-body rounded-4 contact-grand ">
<div class="conatct-box ">

<div class="d-flex">
<div class="d-flex me-3 position-relative align-items-center justify-content-center ${accessrandomgrad(allcontacts[i].grad)} contact-profile">
<span class="text-uppercase" >
  ${allcontacts[i].name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")}
</span>
<div class=" ${displaystar(allcontacts[i].check)} floating-star  align-items-center justify-content-center position-absolute ">
<i class="fa-solid fa-star fa-2xs" style="color: rgb(255, 255, 255);"></i>
</div>
<div class=" ${displayheart(allcontacts[i].heartCheck)}  floating-heart  justify-content-center align-items-center position-absolute ">
<i class="fa-solid  fa-heart-pulse " style="color: rgb(255, 255, 255);"></i>
</div>



</div>

<div>
<p class="m-0 contact-name">${allcontacts[i].name}</p>
<div class="d-flex align-items-center mt-1">
<div class="icon-w d-flex justify-content-center align-items-center me-2">
<i class="fa-solid fa-phone fa-2xs" style="color: rgb(20, 94, 252);"></i>
</div>
<span class="tel-num">${allcontacts[i].tel_number}</span>
</div>

</div>

</div>

<div class="mt-3 ">
<div class=" ${emailshow(allcontacts[i].mail)}  align-items-center mb-2">
<div class="email me-2 d-flex justify-content-center align-items-center">
<i class="fa-solid fa-envelope fa-2xs" style="color: rgb(126, 33, 255);"></i>
</div>
<p class="m-0 email-info">${allcontacts[i].mail}</p>

</div>

<div class=" ${locationshow(allcontacts[i].loaction)}  align-items-center ">
<div class="location me-2 d-flex justify-content-center align-items-center">
<i class="fa-solid fa-location-dot fa-2xs" style="color: rgb(0, 153, 102);"></i>
</div>
<p class="m-0 email-info">${allcontacts[i].loaction}</p>
</div>
</div>

<div class="mt-3 d-flex column-gap-2">
<span class="py-1 px-2 fixed ${getGroupClass(allcontacts[i].groups)}">
  ${allcontacts[i].groups}
</span>
<span class=" ${displayheart(allcontacts[i].heartCheck)}   py-1 px-2  align-items-center fixed emergency"><i class="fa-solid fa-heart-pulse me-1 fa-sm" style="color: #ec003f;"></i>Emergency</span>
</div>



</div>
<div class="contact-footer d-flex justify-content-between">
<div class="d-flex column-gap-2">
<a href="tel:${allcontacts[i].tel_number}" title="call" class="text-decoration-none rounded-3 phone-foot d-flex align-items-center justify-content-center">
<i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i>
</a>

<a href="mailto:${allcontacts[i].mail}"  title="Email" class=" ${emailshow(allcontacts[i].mail)} d-flex align-items-center justify-content-center text-decoration-none rounded-3 mail-foot ">
    <i class="fa-solid fa-envelope" ></i>
</a>

</div>

<div class="d-flex column-gap-2">
<button  onclick="addstarstyle(this , ${i})" class=" ${allcontacts[i].check ? "KK" : "STAR-FOOT"} d-flex align-items-center border-0 justify-content-center rounded-3  ">
<i class="${allcontacts[i].check ? "fa-solid" : "fa-regular"}  fa-star" ></i>
</button>

<button onclick="addheartstyle(this , ${i})" class="  ${allcontacts[i].heartCheck ? "KKH" : "heart-foot"}   d-flex align-items-center border-0 justify-content-center rounded-3 ">
<i class="${allcontacts[i].heartCheck ? "fa-solid" : "fa-regular"}   fa-heart" ></i>
</button>

<button onclick="editcontact(${i})" class="d-flex align-items-center border-0 justify-content-center rounded-3 edit-btn">
<i class="fa-solid fa-pen" ></i>
</button>

<button onclick="deletecontct(${i})" class="d-flex align-items-center border-0 justify-content-center rounded-3 delete-btn">
<i class="fa-solid fa-trash"></i>
</button>

</div>

</div>


</div>

</div>

`;
  }
  if (cart == "") {
    cart = `<div class="no-contact ">

<div class="d-flex flex-column align-items-center">
<div class="dimin rounded-4 mb-3 d-flex align-items-center justify-content-center" >
    <i class="fa-solid fa-address-book fa-2x" style="color: rgb(208, 212, 219);"></i>
</div>
<p class="m-0 contact-p ">No contacts found</p>
<p class="mt-1 contact-p-2">Click "Add Contact" to get started</p>
</div>

</div>`;
  }

  displayemer();
  displayfav();
  document.getElementById("display").innerHTML = cart;
}

function displayemer(index) {
  var cart2 = "";

  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].heartCheck == true) {
      cart2 += `<div class="d-flex md mb-2 back-2 align-items-center justify-content-between">
<div class="d-flex align-items-center column-gap-2">
<div class="d-flex justify-content-center align-items-center ${accessrandomgrad(allcontacts[i].grad)} fav-contact-profile">
    <span  class="text-uppercase"> ${allcontacts[i].name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")}</span>
</div>
<div>
    <p class="p-fav  m-0">${allcontacts[i].name}</p>
    <p class="p-fav-2 m-0">${allcontacts[i].tel_number}</p>
</div>
</div>

<a href="tel:${allcontacts[i].tel_number}" title="call" class="text-decoration-none rounded-3 phone-foot d-flex align-items-center justify-content-center">
<i class="fa-solid fa-phone fa-sm"></i>
</a>


</div>`;
    }
  }
  if (cart2 == "") {
    cart2 = `<p class="down-p p-4 d-flex justify-content-center align-items-center m-0">
   No emergency contacts
</p>`;
  }
  emercount();
  document.getElementById("heart-down").innerHTML = cart2;
}

function displayfav(index) {
  var cart3 = "";

  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].check == true) {
      cart3 += `<div class="d-flex md mb-2 back align-items-center justify-content-between">
<div class="d-flex align-items-center column-gap-2">
<div class="d-flex justify-content-center align-items-center ${accessrandomgrad(allcontacts[i].grad)} fav-contact-profile">
    <span class="text-uppercase"> ${allcontacts[i].name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")}</span>
</div>
<div>
    <p class="p-fav  m-0">${allcontacts[i].name}</p>
    <p class="p-fav-2 m-0">${allcontacts[i].tel_number}</p>
</div>
</div>

<a href="tel:${allcontacts[i].tel_number}" title="call" class="text-decoration-none rounded-3 phone-foot d-flex align-items-center justify-content-center">
<i class="fa-solid fa-phone fa-sm"></i>
</a>
</div>`;
    }
  }

  if (cart3 == "") {
    cart3 =
      '<p class="down-p d-flex justify-content-center align-items-center p-4 m-0 "> No favorites yet</p>';
  }
  favcount();
  document.getElementById("fav-up").innerHTML = cart3;
}

function totalcounter() {
  var x = allcontacts.length;
  var cart4 = `<p class="total m-0">TOTAL</p>
<p class="zero m-0">${x}</p>`;
  var cart5 = `<h2 class="all-head m-0">All Contacts</h2>
              <p class="all-p mb-0 mt-1">Manage and organize your ${x} contacts</p>`;
  totalcount.innerHTML = cart4;
  head.innerHTML = cart5;
}

function favcount() {
  var count = 0;

  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].check) {
      count++;
    }
  }

  favoritecounter.innerHTML = `
    <p class="total m-0">FAVORITES</p>
    <p class="zero m-0">${count}</p>
  `;
}

function emercount() {
  var count = 0;

  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].heartCheck) {
      count++;
    }
  }

  emergencycounter.innerHTML = `
    <p class="total m-0">EMERGENCY</p>
    <p class="zero m-0">${count}</p>
  `;
}

function getGroupClass(group) {
  switch (group) {
    case "Family":
      return "family";
    case "Work":
      return "work";
    case "School":
      return "school";
    case "Other":
      return "other";
    case "Friends":
      return "friends";
    case "Select a group":
      return "d-none";
    default:
      return "";
  }
}

function locationshow(location) {
  switch (location) {
    case "":
      return "d-none";

    default:
      return "d-flex";
  }
}
function emailshow(email) {
  switch (email) {
    case "":
      return "d-none";

    default:
      return "d-flex";
  }
}

function resetinputs() {
  fullname.value = null;
  ph_number.value = null;
  email.value = null;
  adress.value = null;
  note.value = null;
  group.value = "Select a group";
  fav_check.checked = false;
  emergencycheck.checked = false;
}

function addstarstyle(btn, index) {
  allcontacts[index].check = !allcontacts[index].check;
  btn.classList.toggle("KK");
  btn.classList.toggle("STAR-FOOT");
  var icon = btn.querySelector("i");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  localStorage.setItem("contactcontainer", JSON.stringify(allcontacts));
  displayfav(index);
  displaycontact();
}

function addheartstyle(btn, index) {
  allcontacts[index].heartCheck = !allcontacts[index].heartCheck;
  btn.classList.toggle("KKH");
  btn.classList.toggle("heart-foot");
  var icon = btn.querySelector("i");
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");
  localStorage.setItem("contactcontainer", JSON.stringify(allcontacts));
  displayemer(index);
  displaycontact();
}

function deletecontct(index) {
  Swal.fire({
    title: "Are you sure?",
    text: `Are you sure you want to delete ${allcontacts[index].name} ? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
      });
      allcontacts.splice(index, 1);
      localStorage.setItem("contactcontainer", JSON.stringify(allcontacts));
      displaycontact();
      totalcounter();
    }
  });
}

var currentindex;

function editcontact(index) {
  layer.classList.replace("d-none", "d-flex");
  update.classList.replace("d-none", "d-flex");
  savebtn.classList.replace("d-flex", "d-none");
  layerhead.classList.replace("d-block", "d-none");
  edithead.classList.replace("d-none", "d-block");
  fullname.value = allcontacts[index].name;
  ph_number.value = allcontacts[index].tel_number;
  email.value = allcontacts[index].mail;
  adress.value = allcontacts[index].loaction;
  note.value = allcontacts[index].notes;
  group.value = allcontacts[index].groups;
  fav_check.checked = allcontacts[index].check;
  emergencycheck.checked = allcontacts[index].heartCheck;
  currentindex = index;
}
function finishedit() {
  if (
    allcontacts.some(
      (contact, index) =>
        contact.tel_number === ph_number.value && index !== currentindex,
    )
  ) {
    Swal.fire({
      title: "Phone Number Exists",
      text: "This phone number already exists",
      icon: "error",
    });
    return;
  } else {
    var contact = {
      name: fullname.value,
      tel_number: ph_number.value,
      mail: email.value,
      loaction: adress.value,
      notes: note.value,
      groups: group.value,
      check: fav_check.checked,
      heartCheck: emergencycheck.checked,
      grad: allcontacts[currentindex].grad,
    };
    closeLayer();
    Swal.fire({
      title: "Updated",
      text: "Your contact has been updated successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    allcontacts.splice(currentindex, 1, contact);
    resetinputs();
    localStorage.setItem("contactcontainer", JSON.stringify(allcontacts));
    displaycontact();
    totalcounter();
  }
}

function displaystar(check) {
  switch (check) {
    case true:
      return "d-flex";
    case false:
      return "d-none";

    default:
      return "";
      break;
  }
}
function displayheart(check) {
  switch (check) {
    case true:
      return "d-flex";
    case false:
      return "d-none";

    default:
      return "";
      break;
  }
}

function search() {
  var cart = "";
  var term = serchinput.value.toLowerCase().trim();
  for (var i = 0; i < allcontacts.length; i++) {
    if (
      allcontacts[i].name.toLowerCase().includes(term) ||
      allcontacts[i].mail.toLowerCase().includes(term) ||
      allcontacts[i].tel_number.includes(term)
    ) {
      cart += `
<div class="col-md-6 mb-3">

<div class="bg-body rounded-4 contact-grand ">
<div class="conatct-box ">

<div class="d-flex">
<div class="d-flex me-3 position-relative align-items-center justify-content-center ${accessrandomgrad(allcontacts[i].grad)} contact-profile">
<span class="text-uppercase" >
  ${allcontacts[i].name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")}
</span>
<div class=" ${displaystar(allcontacts[i].check)} floating-star  align-items-center justify-content-center position-absolute ">
<i class="fa-solid fa-star fa-2xs" style="color: rgb(255, 255, 255);"></i>
</div>
<div class=" ${displayheart(allcontacts[i].heartCheck)}  floating-heart  justify-content-center align-items-center position-absolute ">
<i class="fa-solid  fa-heart-pulse " style="color: rgb(255, 255, 255);"></i>
</div>



</div>

<div>
<p class="m-0 contact-name">${allcontacts[i].name}</p>
<div class="d-flex align-items-center mt-1">
<div class="icon-w d-flex justify-content-center align-items-center me-2">
<i class="fa-solid fa-phone fa-2xs" style="color: rgb(20, 94, 252);"></i>
</div>
<span class="tel-num">${allcontacts[i].tel_number}</span>
</div>

</div>

</div>

<div class="mt-3 ">
<div class=" ${emailshow(allcontacts[i].mail)}  align-items-center mb-2">
<div class="email me-2 d-flex justify-content-center align-items-center">
<i class="fa-solid fa-envelope fa-2xs" style="color: rgb(126, 33, 255);"></i>
</div>
<p class="m-0 email-info">${allcontacts[i].mail}</p>

</div>

<div class=" ${locationshow(allcontacts[i].loaction)}  align-items-center ">
<div class="location me-2 d-flex justify-content-center align-items-center">
<i class="fa-solid fa-location-dot fa-2xs" style="color: rgb(0, 153, 102);"></i>
</div>
<p class="m-0 email-info">${allcontacts[i].loaction}</p>
</div>
</div>

<div class="mt-3 d-flex column-gap-2">
<span class="py-1 px-2 fixed ${getGroupClass(allcontacts[i].groups)}">
  ${allcontacts[i].groups}
</span>
<span class=" ${displayheart(allcontacts[i].heartCheck)}   py-1 px-2  align-items-center fixed emergency"><i class="fa-solid fa-heart-pulse me-1 fa-sm" style="color: #ec003f;"></i>Emergency</span>
</div>



</div>
<div class="contact-footer d-flex justify-content-between">
<div class="d-flex column-gap-2">
<a href="tel:${allcontacts[i].tel_number}" title="call" class="text-decoration-none rounded-3 phone-foot d-flex align-items-center justify-content-center">
<i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i>
</a>

<a href="mailto:${allcontacts[i].mail}"  title="Email" class=" ${emailshow(allcontacts[i].mail)} d-flex align-items-center justify-content-center text-decoration-none rounded-3 mail-foot ">
    <i class="fa-solid fa-envelope" ></i>
</a>

</div>

<div class="d-flex column-gap-2">
<button  onclick="addstarstyle(this , ${i})" class=" ${allcontacts[i].check ? "KK" : "STAR-FOOT"} d-flex align-items-center border-0 justify-content-center rounded-3  ">
<i class="${allcontacts[i].check ? "fa-solid" : "fa-regular"}  fa-star" ></i>
</button>

<button onclick="addheartstyle(this , ${i})" class="  ${allcontacts[i].heartCheck ? "KKH" : "heart-foot"}   d-flex align-items-center border-0 justify-content-center rounded-3 ">
<i class="${allcontacts[i].heartCheck ? "fa-solid" : "fa-regular"}   fa-heart" ></i>
</button>

<button onclick="editcontact(${i})" class="d-flex align-items-center border-0 justify-content-center rounded-3 edit-btn">
<i class="fa-solid fa-pen" ></i>
</button>

<button onclick="deletecontct(${i})" class="d-flex align-items-center border-0 justify-content-center rounded-3 delete-btn">
<i class="fa-solid fa-trash"></i>
</button>

</div>

</div>


</div>

</div>

`;
    }
  }

  if (cart == "") {
    cart = `<div class="no-contact ">

<div class="d-flex flex-column align-items-center">
<div class="dimin rounded-4 mb-3 d-flex align-items-center justify-content-center" >
    <i class="fa-solid fa-address-book fa-2x" style="color: rgb(208, 212, 219);"></i>
</div>
<p class="m-0 contact-p ">No contacts found</p>
<p class="mt-1 contact-p-2">Click "Add Contact" to get started</p>
</div>

</div>`;
  }
  document.getElementById("display").innerHTML = cart;
}

function validateinputs(input) {
  var value = input.value;
  var id = input.id;
  var regex = {
    fullname: /^[a-zA-Z]{2}[a-z A-Z]{0,48}$/,
    ph_number: /^(01)[0512][0-9]{8}$/,
    e_mail: /^[A-Za-z0-9]{1,}(@)(yahoo\.com|gmail\.com|outlook\.com)$/,
  };

  if (regex[id].test(value)) {
    input.classList.remove("color-b");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.classList.add("color-b");
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

function getRandomIntInclusive() {
  min = Math.ceil(1);
  max = Math.floor(5);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function accessrandomgrad(number) {
  switch (number) {
    case 1:
      return "gradone";
    case 2:
      return "gradtwo";
    case 3:
      return "gradthree";
    case 4:
      return "gradfour";
    case 5:
      return "gradfive";
      break;

    default:
      return "";
      break;
  }
}
