window.onload = getAll();
let btn = document.getElementById('form-btn');
// btn.addEventListener("click",addUser)
function getAll() {
    fetch('http://localhost:3000/getall')
        .then((res) => res.json())
        .then((data) => {
            let html = '';
            console.log(data);
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
                        <div class="col-4">
                            <a href="">Edit</a>
                        </div>
                        <div class="col-4">
                            <a href="">Delete</a>
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
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        getAll();
    })
}



