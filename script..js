window.onload = getAll();
let btn = document.getElementById('form-btn');
// btn.addEventListener("click",addUser)
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
                            <a href="#" onclick="updateUser(this); return false;"><i class="bi bi-pencil"></i></a>
                        </div>
                        <div class="col-6">
                            <a href="#" onclick="deleteUser(this); return false;"><i class="bi bi-trash3"></i></a>
                        </div>
                    </div>
                </td>
            </tr>
            `
            });
            document.getElementById('table-body').innerHTML = html
        })
}


function addUser() {
    console.log('add user');

    let payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        summary: document.getElementById('summary').value
    }
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

function deleteUser(link) {
    
    const row = link.closest('tr');
    const id = row.cells[0].innerText;
    let payload = { id: id }

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


function updateUser(link) {
    
    const row = link.closest('tr');
    let id = row.cells[0].innerText;
    console.log(id)

    fetch(`http://localhost:3000/getuser/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        document.getElementById('name').value = data[0]['name'];
        document.getElementById('email').value = data[0]['email'];
        document.getElementById('summary').value = data[0]['summary'];
        document.getElementById('message').value = data[0]['message'];
        document.getElementById('form-btn').textContent = "Update";

    })

    // let payload = { id: id }

    // fetch('http://localhost:3000/delete', {
    //     mode: 'cors',
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload),
    // })
    //     .then((res) => {
    //         return res.json()
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         getAll();
    //     })
}



