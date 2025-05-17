const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Sign Up
var inputFname = document.getElementById('input_fname');
var inputEmail = document.getElementById('input_email');
var inputPass = document.getElementById('input_password');
var btnSend = document.getElementById('send');

// Sign In
var signEmail = document.getElementById('Sign-email');
var signPass = document.getElementById('sign-password');
var btnReSend = document.getElementById('resend');

var homeBtn1 = document.getElementById('homeToSignIn');
var homeBtn2 = document.getElementById('backToSignUp');


homeBtn1.addEventListener('click', () => {
    window.location.href = 'home.html';
});

homeBtn2.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.add("active");
});

window.addEventListener("load", () => {
    container.classList.add("active");
});


btnSend.addEventListener('click', () => {
    if (inputEmail.value === '' || inputFname.value === '' || inputPass.value === '') {
        alert('Please fill in all fields.');
    } else {
        localStorage.setItem('FirstName', inputFname.value);
        localStorage.setItem('Email', inputEmail.value);
        localStorage.setItem('Pass', inputPass.value);

        setTimeout(() => {
            container.classList.remove("active"); 
        }, 900);
    }
});

btnReSend.addEventListener('click', () => {
    const storedEmail = localStorage.getItem('Email');
    const storedPass = localStorage.getItem('Pass');
    if (signEmail.value === storedEmail && signPass.value === storedPass) {
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 900);
    } else {
        alert('❌ Email or password is incorrect.');
    }
});



  
