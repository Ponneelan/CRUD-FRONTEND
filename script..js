window.onload = getAll();
let btn = document.getElementById('form-btn');
let form  = document.getElementById('cus-form');

let uniqueUserId;

function validation() {

    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    console.log(data);
    
    if ((data['name'] == '' || data['name'] == null) || (data['email'] == '' || data['email'] == null) || (data['message'] == '' || data['message'] == null) || (data['summary'] == '' || data['summary'] == null)) {
        alert('Invalid Form data');
    } else {
        btn.textContent == "Submit" ? addUser(data) : updateUser(data);
    }
}

function getAll() {
    fetch('http://localhost:3000/getall')
        .then((res) => res.json())
        .then((data) => {
            let html = '';
            // console.log(data);
            data.forEach(e => {
                html +=
                    `
            <tr>
                <th>${e['id']}</th>
                <td>${e['name']}</td>
                <td>${e['email']}</td>
                <td>${e['summary']}</td>
                <td>
                    <div class="d-flex">
                        <div class="col-6">
                            <a href="#" onclick="getFormdata(${e['id']}); return false;"><i class="bi bi-pencil"></i></a>
                        </div>
                        <div class="col-6">
                            <a href="#" onclick="deleteUser(${e['id']}); return false;"><i class="bi bi-trash3"></i></a>
                        </div>
                    </div>
                </td>
            </tr>
            `
            });
            document.getElementById('table-body').innerHTML = html
        })
}


function addUser(formData) {
    console.log('add user');

    let payload = formData;
    console.log(payload);

    fetch('http://localhost:3000/insert', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            // console.log(data);
            getAll();
        })
}

function deleteUser(userId) {

    let payload = { id: userId }

    fetch('http://localhost:3000/delete', {
        mode: 'cors',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            getAll();
        })
}


function getFormdata(userId) {

    
    uniqueUserId = userId;
    console.log(userId)

    fetch(`http://localhost:3000/getuser/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById('name').value = data[0]['name'];
            document.getElementById('email').value = data[0]['email'];
            document.getElementById('summary').value = data[0]['summary'];
            document.getElementById('message').value = data[0]['message'];
            document.getElementById('form-btn').textContent = "Update";
        })
}

function updateUser(formData) {
    let payload = {
        name: formData['name'],
        email: formData['email'],
        message: formData['message'],
        summary: formData['summary'],
        id: uniqueUserId,
    }

    fetch('http://localhost:3000/update', {
        mode: 'cors',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            getAll();
            document.getElementById('form-btn').textContent = "Submit";

        })
}



