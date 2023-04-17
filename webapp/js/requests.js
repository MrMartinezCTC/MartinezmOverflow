
const errorPopup = document.querySelector('.error-pop-up');

const errorMsg = (status, msg) => `
    <div>problem</div>
    <div>
        <div class="object__prop-row">
            <div class="object__prop-val">status</div>
            <div class="object__num">${status}</div>
        </div>
        <div class="object__prop-row">
            <div class="object__prop-val">issue</div>
            <div>${msg}</div>
        </div>
    </div>
`;


function displayError (status, msg) {
    errorPopup.innerHTML = errorMsg(status, msg);
    popup(errorPopup);
}


function popup (element, e) {
    e && e.stopPropagation();

    element.style.display = 'block';
    document.body.addEventListener('click', closePopup);
    
    function closePopup (e) {
        if (element.contains(e.target)) return;
        element.style.display = 'none';
        document.body.removeEventListener('click', closePopup);
    }
}
