
const accountForm = document.querySelector('.account-pop-up');
const accountBtns = document.querySelectorAll('.account-btns > button');

const ogAccountClass = accountForm.className;

accountBtns.forEach(accountBtn => accountBtn.addEventListener('click', e => {
    popup(accountForm, e);

    accountForm.className = `${ogAccountClass} ${accountBtn.dataset.form_class}`;
    accountForm.firstElementChild.textContent = accountBtn.dataset.object_title;
}));


document.getElementById('logOutBtn').addEventListener('click', () => sendRequest('GET', 'logout'));

accountForm.addEventListener('submit', e => {
    e.preventDefault();

    let route = 'login';
    const objToSend = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if (!e.target.className.includes('log')) {
        route = 'signup';
        objToSend.firstName = document.getElementById('firstName').value;
        objToSend.lastName = document.getElementById('lastName').value;
    }

    return sendRequest('POST', route, JSON.stringify(objToSend));
});


function sendRequest (method, route, body) {
    let status;

    fetch(`/user/${route}`, {
        method,
        headers: {
            "Content-Type": "application/json",
          },
        body
    })
    .then(res => { status = res.status; return res.json(); })
    .then(body => {
        if (!body.isError) {
            accountForm.style.display = 'none';
            location.reload(true);
            return;
        }
        displayError(status, body.message);
    })
    .catch(err => {
        console.log('Can not connect to server. :/');
        console.log(err);
    });
}

