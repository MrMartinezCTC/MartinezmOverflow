

const errorMsg = (status, msg) => `
    <div class="object-block error-pop-up">
        <div>Problem</div>
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
    </div>
`;


function displayError (status, msg) {
    let errorElement = document.createElement('div');
    errorElement.innerHTML = errorMsg(status, msg).trim();
    errorElement = document.body.appendChild(errorElement);

    errorElement = errorElement.firstChild;

    document.body.addEventListener('click', closeError);

    function closeError () {
        errorElement.remove();
        errorElement.removeEventListener('click', closeError);
    };
}

