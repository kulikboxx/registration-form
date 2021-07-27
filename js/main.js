'use strict';

const formBoxes = document.querySelectorAll('.form .form-box'),
    inputs = document.querySelectorAll('.form input'),
    send = document.querySelector('.form .send'),
    clear = document.querySelector('.form .clear'),
    modal = document.querySelector('.modal'),
    close = document.querySelector('.close');

const messages = {
    user: 'Enter at least 4 characters',
    pass: 'Enter at least 7 characters',
    pass2: 'Passwords do not match',
    email: 'Enter email address',
    invalid: 'Invalid email address'
}

const showAlert = (parentEl, alert) => {
    parentEl.classList.add('error');
    parentEl.lastElementChild.textContent = alert;
}

const hideAlert = (parentEl) => {
    parentEl.classList.remove('error');
    parentEl.lastElementChild.textContent = '';
}

const emailValidation = (email) => {
    const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return result.test(String(email).toLowerCase());
}

const checkInputs = () => {
    let userName = document.querySelector('.username'),
        pass = document.querySelector('.password'),
        pass2 = document.querySelector('.password2'),
        email = document.querySelector('.email'),
        countError = 0;

    userName.value.length < 4 ? showAlert(userName.parentElement, messages.user) : hideAlert(userName.parentElement);

    if (pass.value == '' && pass2.value == '') {
        showAlert(pass.parentElement, messages.pass);
        showAlert(pass2.parentElement, messages.pass);
    } else if (pass.value !== '' || pass2.value !== '') {
        showAlert(pass.parentElement, messages.pass);
        showAlert(pass2.parentElement, messages.pass);
        if (pass.value !== pass2.value) {
            showAlert(pass2.parentElement, messages.pass2);
        } else if (pass.value.length < 7 && pass2.value.length < 7) {
            showAlert(pass.parentElement, messages.pass);
            showAlert(pass2.parentElement, messages.pass);
        } else {
            hideAlert(pass.parentElement);
            hideAlert(pass2.parentElement);
        }
    }

    if (email.value == '') {
        showAlert(email.parentElement, messages.email);
    } else if (emailValidation(email.value) === false) {
        showAlert(email.parentElement, messages.invalid);
    } else if (emailValidation(email.value) === true) {
        hideAlert(email.parentElement);
    }

    formBoxes.forEach(item => {
        if (item.classList.contains('error')) countError++;
    });

    if (countError === 0) {
        sendForm();
        clearForm();
    }
}

const sendForm = () => {
    modal.style.top = '40px';
}

const clearForm = () => {
    formBoxes.forEach(item => item.classList.remove('error'))
    inputs.forEach(item => item.value = '');
}

send.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs();
});

clear.addEventListener('click', (e) => {
    e.preventDefault();
    clearForm();
});

close.addEventListener('click', () => {
    modal.style.top = '-150%';
});