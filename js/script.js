// Number Run
const time = 1000
const fps = 30

const ounNum = (num, elem) => {
    const block = menu.children[2].children[elem].children[0]
    let number = 0, step = Math.trunc(num / time * fps), string_number

    const intervalF = setInterval(() => {
        number += step
        String(number).length > 3
            ? string_number = String(number).slice(0, String(number).length - 3) + ',' + String(number).slice(String(number).length - 3)
            : string_number = number

        if (number >= num) {
            number = string_number
            clearInterval(intervalF)
        }
        block.textContent = string_number
    }, fps)
}

let runOunNum = 'not run'
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}
const callback = function (entries, observer) {
    if (runOunNum === 'run') {
        ounNum(23567, 0)
        ounNum(431729, 1)
        ounNum(892173, 2)
        ounNum(56581, 3)
        ounNum(3182, 4)
        return runOunNum = false
    }
    else if (runOunNum === 'not run')
        return runOunNum = 'run'
    else return runOunNum = false

};
const observer = new IntersectionObserver(callback, options);

observer.observe(document.getElementsByClassName('number_block')[0])


// Slider
const btnSlid = document.getElementsByClassName('btnSlid')[0];
const allSlide = document.getElementsByClassName('allSlide')[0];

(function () {
    for (let i = 0; i < allSlide.children.length; i++) {
        const creatSpan = document.createElement('span')
        btnSlid.append(creatSpan)
    }
    btnSlid.children[0].classList.add('active')
}());
btnSlid.addEventListener('click', clickSlider);

function clickSlider(e) {
    if (e.target.localName === "span") {
        for (let i = 0; i < Array.from(btnSlid.children).length; i++) {
            btnSlid.children[i].classList.remove('active')
            allSlide.children[i].classList.remove('active')
        }

        e.target.classList.add('active')

        Array.from(btnSlid.children).forEach((e, index) => {
            if (e.classList.contains('active'))
                allSlide.children[index].classList.add("active")
        })
    }
};

// Modal
function ShowModal(type, visible = true) {

    let all_content_modal = Array.from(document.getElementsByClassName('all_content_modal')[0].children)
    all_content_modal.forEach(e => {
        e.classList.remove('active')
    })

    if (visible) {
        modal.classList.add('active')
        document.body.style.overflow = 'hidden';
    }
    else {
        modal.classList.remove('active')
        document.body.style.overflow = 'scroll';
    }

    switch (type) {
        case "log_in":
            document.getElementsByClassName('form_LOG_IN')[0].classList.add('active')
            break;
        case "sung_in":
            document.getElementsByClassName('form_SING_UP')[0].classList.add('active')
            break;
        case "menu":
            document.getElementsByClassName('menu')[0].classList.add('active')
            break;
        default:
            break;
    }
}

// Form
function submitForm(e) {
    e.preventDefault()
    switch (e.target.getAttribute('action')) {
        case 'form_LOG_IN':
            submit_form_LOG_IN(e)
            break;
        case 'form_SING_UP':
            submit_form_SING_UP(e)
            break;
        default:
            break;
    }
}
function submit_form_LOG_IN(e) {
    let inputEmail = e.target.querySelectorAll('input')[0].value
    let inputPassword = e.target.querySelectorAll('input')[1].value
    let error_message_form_password = document.getElementsByClassName('error_message_form_logIn')[1];
    let error_message_form_email = document.getElementsByClassName('error_message_form_logIn')[0];

    let passwordCheck = validatePassword(inputPassword)
    let emailCheck = validateEmail(inputEmail)

    !passwordCheck ? error_message_form_password.classList.add('active') : error_message_form_password.classList.remove('active')
    !inputEmail ? error_message_form_email.classList.add('active') : error_message_form_email.classList.remove('active')

    if (passwordCheck && emailCheck)
        alert('ви увійшли')
}

function submit_form_SING_UP(e) {
    let inputUserName = e.target.querySelectorAll('input')[0].value
    let inputEmail = e.target.querySelectorAll('input')[1].value
    let inputPassword = e.target.querySelectorAll('input')[2].value

    let error_message_form_userName = document.getElementsByClassName('error_message_form_singIn')[0];
    let error_message_form_email = document.getElementsByClassName('error_message_form_singIn')[1];
    let error_message_form_password = document.getElementsByClassName('error_message_form_singIn')[2];

    let userNameCheck = userName(inputUserName)
    let passwordCheck = validatePassword(inputPassword)
    let emailCheck = validateEmail(inputEmail)

    !passwordCheck ? error_message_form_password.classList.add('active') : error_message_form_password.classList.remove('active')
    !inputEmail ? error_message_form_email.classList.add('active') : error_message_form_email.classList.remove('active')
    !userNameCheck ? error_message_form_userName.classList.add('active') : error_message_form_userName.classList.remove('active')

    if (passwordCheck && emailCheck && userNameCheck)
        alert('ви зареєструвались')
}


// Validator
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const validatePassword = (password) => {
    if (
        password.length >= 8
        && password.match(/[0-9]/g)
        && password.match(/[A-Z]/g)
        && password.match(/[a-z]/g)) {
        return true
    } else {
        return false
    }
}
const userName = (userName) => {
    return /^[a-z0-9_\.]+$/.exec(userName);
}


// animate scroll menu a[href]...
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        document.body.style.overflow = 'scroll';
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        ShowModal(null, false)
    })
}
