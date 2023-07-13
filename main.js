// Пишемо форму для реєстрації

// Поля:

// Ім'я, Прізвище (Текстові поля)
// Дата народження (Текстове поле)
// Стать (radio)
// Місто (select)
// Адреса (textarea)
// Мови, якими володіє (checkbox)
// ….
// Кнопка "Зберегти"


// Після натискання на кнопку, замість форми повинна виводитися "таблиця" з даними, які ввів користувач.

const myform = document.getElementById('form');
// console.log(myform)
const fnameElement = myform.elements["fname"];
const lnameElement = myform.elements['lname'];
const genderElement = myform.elements['gender'];
const cityElement = myform.elements['city'];
const addressElement = myform.elements['address'];
const radioError = document.querySelector('.radio-header')
res = []

const FNAME_ERROR = 'Please input first name';
const LNAME_ERROR = 'Please input last name';
const GENDER_ERROR = 'Please indicate your gender';
const CITY_ERROR = 'Please check your city of living';
const ADDRESS_ERROR = 'Please input your address';

function ShowError(elem, msg) {
    console.log(elem);
    const errorAlert = elem.parentNode.querySelector('.alert');
    console.log(errorAlert);
    errorAlert.textContent = msg;
    elem.classList.add('.active');
}

function ShowSuccess(elem, msg) {
    console.log('true');
    const errorAlert = elem.parentNode.querySelector('.alert');
    errorAlert.textContent = '';
    elem.classList.remove('.active');
}

function validateFname(el, message) {
    // console.log(el)
    if (el.value !== "") {
        res.push(['Your name:', el.value]);
        ShowSuccess(el, message);
        return true;
    } else {
        // console.log(el, FNAME_ERROR);
        ShowError(el, message);
        return false;
    }
}

function validateLname(el, message) {
    // console.log(el)
    if (el.value !== "") {
        res.push(['Your surename', el.value]);
        ShowSuccess(el, message);
        return true;
    } else {
        // console.log(el, FNAME_ERROR);
        ShowError(el, message);
        return false;
    }
}

function validateGender(el, message) {
    let selectedGender;
    for (const radio of el) {
        if (radio.checked) {
            selectedGender = radio.value;
        }
    }
    if (selectedGender) {
        res.push(['Your gender:', selectedGender]);
        ShowSuccess(radioError, message);
        return true;
    }
    ShowError(radioError, message);
    return false;
}

function validateCity(el, message) {
    if (el.selectedIndex != 0) {
        res.push(['Your city:', el.value]);
        ShowSuccess(el, message);
        return true;
    }
    ShowError(el, message);
    return false;
}

function validateAddress(el, message) {
    // console.log(el)
    if (el.value !== "") {
        res.push(['Your address:', el.value]);
        ShowSuccess(el, message);
        return true;
    } else {
        // console.log(el, FNAME_ERROR);
        ShowError(el, message);
        return false;
    }
}

function datatable() {
    document.getElementById('form').setAttribute('style', 'display: none');
    const section = document.getElementById('section')
    table = document.createElement('table');
    table.setAttribute('id', 'datatable');
    section.appendChild(table);
    thead = document.createElement('th');
    thead.setAttribute('colspan', 2);
    thead.textContent = 'Your data';
    table.appendChild(thead);
    for (i of res) {
        const row = document.createElement('tr');
        const cellOne = document.createElement('td');
        cellOne.textContent = i[0];
        const cellTwo = document.createElement('td');
        cellTwo.textContent = i[1];
        row.appendChild(cellOne);
        row.appendChild(cellTwo);
        table.appendChild(row);
    }


    console.log(res);

}
//////// EventListener for the form.////////

myform.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(fnameElement, 'inside listener')
    res = []
    const isFnameValid = validateFname(fnameElement, FNAME_ERROR);
    const isLnameValid = validateLname(lnameElement, LNAME_ERROR);
    const isGenderValid = validateGender(genderElement, GENDER_ERROR);
    const isCityValid = validateCity(cityElement, CITY_ERROR);
    const isAddressValid = validateAddress(addressElement, ADDRESS_ERROR);

    if (isFnameValid && isLnameValid && isGenderValid && isCityValid && isAddressValid) {
        console.log('Submit');
        datatable();
    }
})
