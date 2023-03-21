
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




