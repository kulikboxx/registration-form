'use strict';

const messages = {
    reqField: 'Please fill in this field',
    password: 'Passwords do not match',
    email: 'Invalid email address'
}

function checkInput(selector) {
    let inputs = document.querySelectorAll(selector),
        password, password2;

    inputs.forEach(input => {
        switch (input.id) {
            case 'username':
                checkInputValueLength(input, 6);
                break;
            case 'password':
                password = input;
                checkInputValueLength(input, 8);
                break;
            case 'password2':
                password2 = input;
                checkInputValueLength(input, 8);
                checkPassword(password, password2);
                break;
            case 'email':
                checkInputValueLength(input, 6);
                emailValidation(input);
                break;
        }
    });
}

function checkInputValueLength(input, min) {
    if (input.value.length == 0) {
        showAlertError(input, messages.reqField);
    } else if (input.value.length > 0 && input.value.length < min) {
        showAlertError(input, `Enter at least ${min} characters`);
    } else {
        hideAlertError(input);
    }
}

function checkPassword(pass1, pass2) {
    if (pass1.value != pass2.value) {
        showAlertError(pass2, messages.password);
    }
}

function emailValidation(email) {
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!res.test(String(email.value).toLowerCase()) && email.value != '') {
        showAlertError(email, messages.email);
    }
}

function checkError(selector) {
    let formBox = document.querySelectorAll(selector),
        countError = 0;

    formBox.forEach(el => {
        if (el.classList.contains('error')) {
            countError++;
        }
    });

    if (countError === 0) {
        return true;
    }
}

function showAlertError(selector, alert) {
    selector.parentElement.classList.add('error');
    selector.nextElementSibling.textContent = alert;
}

function hideAlertError(selector) {
    selector.parentElement.classList.remove('error');
    selector.nextElementSibling.textContent = '';
}

function formSend(selector) {
    if (checkError(selector)) {
        clearForm(selector);
        showModal();
    }
}

function showModal() {
    const modal = document.querySelector('.modal');

    if (!modal.classList.contains('show-modal')) {
        modal.classList.add('show-modal');
    } else {
        modal.classList.remove('show-modal');
    }
}

function clearForm(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.classList.remove('error');
        element.firstElementChild.value = '';
        element.lastElementChild.textContent = '';
    });
}

document.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('send')) {
        checkInput('.input');
        formSend('.form-box');
    }

    if (e.target.classList.contains('clear')) {
        clearForm('.form-box');
    }

    if (e.target.classList.contains('close')) {
        showModal();
    }
});

document.addEventListener('input', () => checkInput('.input'));