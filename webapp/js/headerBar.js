
const accountForm = document.querySelector('.account-pop-up');
const accountBtns = document.querySelectorAll('.account-btns > button');

const ogAccountClass = accountForm.className;

accountBtns.forEach(accountBtn => accountBtn.addEventListener('click', e => {
    e.stopPropagation();

    accountForm.className = `${ogAccountClass} ${accountBtn.dataset.form_class}`;

    accountForm.style.display = 'block';
    accountForm.firstElementChild.textContent = accountBtn.dataset.object_title;
    
    document.body.addEventListener('click', closeAccountForm);
    
    
    function closeAccountForm (e) {
        if (e.target.closest('.account-pop-up')) return;
        accountForm.style.display = 'none';
        document.body.removeEventListener('click', closeAccountForm);
    }
}));


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

    sendRequest('POST', route, JSON.stringify(objToSend));
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

