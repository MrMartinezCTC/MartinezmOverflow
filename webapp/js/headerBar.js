
const accountForm = document.querySelector('.account-pop-up');
const accountBtns = document.querySelectorAll('.account-btns > button');

accountBtns.forEach(accountBtn => accountBtn.addEventListener('click', e => {
    e.stopPropagation();
    accountForm.style.display = 'block';
    let [action, actionTitle] = accountBtn.textContent.includes('og') ? ['add', 'Log In'] : ['remove', 'Sign Up'];
    accountForm.classList[action]('log-in');
    accountForm.firstElementChild.textContent = actionTitle;
    
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

    fetch(`/user/${route}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(objToSend)
    })
    .then(res => res.json())
    .then(body => {
        if (!body.isError) {
            return accountForm.style.display = 'none';
        }
        alert (body.msg);
    })
    .catch(err => {
        console.log('AAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHH!!!');
        console.log(err);
    });
});

