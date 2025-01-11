//toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector("nav");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
//scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 400;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector(`header nav a[href*=${id}]`)
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};
//Send Mail
function SendMail() {
  (function () {
    emailjs.init("0v1SlWBqDsT4egZto");
  })();

  const params = {
    from_name: document.getElementById("from_name").value.trim(),
    email_id: document.getElementById("email_id").value.trim(),
    phone_number: document.getElementById("phone_number").value.trim(),
    email_subject: document.getElementById("email_subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };
  let name_error = document.getElementById("name-error");
  let email_error = document.getElementById("email-error");
  let phone_error = document.getElementById("phone-error");
  let subject_error = document.getElementById("subject-error");
  let message_error = document.getElementById("message-error");
  const modal = document.getElementById("modal");
  const btn_modal = document.getElementById("modal-btn");
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  let form_validity = true;

  if (params.from_name === "") {
    name_error.textContent = "Name is empty";
    name_error.style.display = "block";
    form_validity = false;
  } else if (params.from_name.length < 3) {
    name_error.textContent = "Name is too short";
    name_error.style.display = "block";
    form_validity = false;
  } else {
    name_error.style.display = "none";
  }

  if (params.email_id === "") {
    email_error.textContent = "E-mail is empty";
    email_error.style.display = "block";
    form_validity = false;
  } else if (params.email_id.length < 3) {
    email_error.textContent = "E-mail is too short";
    email_error.style.display = "block";
    form_validity = false;
  } else if (!emailPattern.test(params.email_id)) {
    email_error.textContent = "E-mail is in an invalid format";
    email_error.style.display = "block";
    form_validity = false;
  } else {
    email_error.style.display = "none";
  }

  if (params.phone_number === "") {
    phone_error.textContent = "Phone Number is empty";
    phone_error.style.display = "block";
    form_validity = false;
  } else if (params.phone_number.length < 10) {
    phone_error.textContent = "Phone Number is too short";
    phone_error.style.display = "block";
    form_validity = false;
  } else if (params.phone_number.length > 10) {
    phone_error.textContent = "Phone Number is too long";
    phone_error.style.display = "block";
    form_validity = false;
  } else {
    phone_error.style.display = "none";
  }

  if (params.email_subject === "") {
    subject_error.textContent = "E-mail Subject is empty";
    subject_error.style.display = "block";
    form_validity = false;
  } else if (params.email_subject.length < 3) {
    subject_error.textContent = "E-mail Subject is too short";
    subject_error.style.display = "block";
    form_validity = false;
  } else {
    subject_error.style.display = "none";
  }

  if (params.message === "") {
    message_error.textContent = "Message is empty";
    message_error.style.display = "block";
    form_validity = false;
  } else {
    message_error.style.display = "none";
  }

  if (form_validity) {
    console.log("Sto mandando la mail");
    emailjs
      .send("service_y3faixn", "template_idszpj9", params)
      .then(function (res) {
        console.log(res);
        if (res.status == 200) {
          modal.classList.add("open");
        }
      });

    btn_modal.addEventListener("click", () => {
      modal.classList.remove("open");
      location.reload();
    });
  }
}

let form_btn = document.getElementById("form-btn");

form_btn.addEventListener("click", (e) => {
  e.preventDefault();
  SendMail();
});
