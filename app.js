window.onload = function () {
    fetchData();
};

function findIndexByID(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].ID == id)
            return i;
    }
    return -1;
}

function onDelete(id) {
    //console.log(`id = ${id}`);
    let container = JSON.parse(localStorage.getItem('container'));
    let ind = findIndexByID(container['employees'], id);

    //console.log(`index = ${ind}`);

    if (ind !== -1)
        container['employees'].splice(ind, 1);

    localStorage.setItem('container', JSON.stringify(container));
    fetchData();


}



function onRowClick(id) {
    
    let note = '';
    let employees = JSON.parse(localStorage.getItem('container'))["employees"];
    for(let item of employees){
        if(item.ID == id){
            note = item.note;
            break;
        }
    }

    document.getElementById('myModal').querySelector('.modal-body').innerHTML = note;
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), { keyboard: false });
    myModal.show();
}

function fetchData() {
    if (localStorage.getItem('container') !== null) {
        let employees = JSON.parse(localStorage.getItem('container'))["employees"];

        let table = document.getElementById('employeeTbl').querySelector("tbody");
        table.innerHTML = ``;

        employees.forEach(item => {
            ///????????????????????
            // console.log( item);
            table.innerHTML += `<tr onclick="onRowClick(${item.ID})">
               <td> ${item.ID} </td>
               <td> ${item.firstName} </td>
               <td> ${item.lastName} </td>
               <td> ${item.address} </td>
               <td> ${item.dob} </td>
               <td> ${item.gender} </td>
               <td> <button class="btn btn-danger" onclick=onDelete(${item.ID})> Delete </button> </td>
            </tr>
            `;

        });
    }
    else
        localStorage.setItem('container', JSON.stringify({ "employees": [] }));

}

//validation functions

function validateFirstName(firstName) {
    let len = firstName.length;
    if (len < 2 || len > 30)
        return false;

    for (let it of firstName) {
        if (!(it >= 'a' && it <= 'z' ||
            it >= 'A' && it <= 'Z' ||
            it === ' '))
            return false;
    }
    return true;
}

function validateLastName(lastName) {
    let len = lastName.length;
    if (len < 2 || len > 30)
        return false;

    for (let it of lastName) {
        if (!(it >= 'a' && it <= 'z' ||
            it >= 'A' && it <= 'Z' ||
            it === ' '))
            return false;
    }
    return true;

}

function validateAddress(address) {
    let len = address.length;
    return len >= 2 && len <= 35;
}

function validateDOB(dob) {
    let len = dob.length;
    return len > 0;
}
//end of validation functions

function validateForm(firstName, lastName, address, dob, gender) {
    let isFirstName = validateFirstName(firstName);
    let isLastName = validateLastName(lastName);
    let isAddress = validateAddress(address);
    let isDOB = validateDOB(dob);
    let isGender = gender !== '-1';

    //update messages
    let firstNameDIV = document.getElementById('firstName_messages');
    if (!isFirstName) {
        firstNameDIV.classList.add("error");
        firstNameDIV.innerHTML = `first name is not valid!`;
    }
    else {
        firstNameDIV.classList.remove("error");
        firstNameDIV.innerHTML = ``;
    }

    let lastNameDIV = document.getElementById('lastName_messages');
    if (!isLastName) {
        lastNameDIV.classList.add("error");
        lastNameDIV.innerHTML = `last name is not valid!`;
    }
    else {
        lastNameDIV.classList.remove("error");
        lastNameDIV.innerHTML = ``;
    }

    let addressDIV = document.getElementById('address_messages');
    if (!isAddress) {
        addressDIV.classList.add("error");
        addressDIV.innerHTML = `address is not valid!`;
    }
    else {
        addressDIV.classList.remove("error");
        addressDIV.innerHTML = ``;
    }

    let dobDIV = document.getElementById('dob_messages');
    if (!isDOB) {
        dobDIV.classList.add("error");
        dobDIV.innerHTML = `please select date of birth!`;
    }
    else {
        dobDIV.classList.remove("error");
        dobDIV.innerHTML = ``;
    }

    let genderDIV = document.getElementById('gender_messages');
    if (!isGender) {
        genderDIV.classList.add("error");
        genderDIV.innerHTML = `please select gender!`;
    }
    else {
        genderDIV.classList.remove("error");
        genderDIV.innerHTML = ``;
    }
    // end of update messages.

    return isFirstName && isLastName && isAddress && isDOB && isGender;
}

function getNextID() {
    let employees = JSON.parse(localStorage.getItem('container'))["employees"];
    if (employees.length > 0)
        return employees[employees.length - 1].ID + 1;

    return 1;
}

document.getElementById('myForm').addEventListener("submit", function (event) {
    event.preventDefault();
    //console.log(event.target);
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let address = document.getElementById("address").value.trim();
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let note = document.getElementById("note").value.trim();

    // console.log(`firstName = ${firstName}`);
    // console.log(`lastName = ${lastName}`);
    // console.log(`address = ${address}`);
    // console.log(`dob = ${dob}`);
    // console.log(`gender = ${gender}`);
    // console.log(`note = ${note}`);



    if (validateForm(firstName, lastName, address, dob, gender)) {
        let container = JSON.parse(localStorage.getItem('container'));
        let elem = {
            ID: getNextID(),
            firstName: firstName,
            lastName: lastName,
            address: address,
            dob: dob,
            gender: gender,
            note: note
        }

        //console.log(`container = ${container}   type = ${typeof container}`);
        container['employees'].push(elem);
        localStorage.setItem('container', JSON.stringify(container));
        fetchData();
        document.getElementById("myForm").reset();

    }




});

/*
[1,3,]

*/