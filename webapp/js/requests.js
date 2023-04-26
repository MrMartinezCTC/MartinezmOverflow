
const errorPopup = document.querySelector('.error-pop-up');

// const errorMsg = (status, msg) => `
//     <div>problem</div>
//     <div>
//         <div class="object__prop-row">
//             <div class="object__prop-val">status</div>
//             <div class="object__num">${status}</div>
//         </div>
//         <div class="object__prop-row">
//             <div class="object__prop-val">issue</div>
//             <div>${msg}</div>
//         </div>
//     </div>
// `;

const errorMsg = (status, msg) => {
    let errorBlock;

    if (typeof msg === 'object') {
        let issueList = '';
        for (const key in msg) {
            issueList += `
                <div class="object__prop-row">
                    <div class="object__prop-val">${key}</div>
                    <div>${msg[key]}</div>
                </div>
            `;
        }
        errorBlock = `
            <div class="object-block">
                <div>issues</div>
                <div>${issueList}</div>
            </div>
        `;
    } else {
        errorBlock = `
            <div class="object__prop-row">
                <div class="object__prop-val">issue</div>
                <div>${msg}</div>
            </div>
        `;
    }
    
    return `
        <div>problem</div>
        <div>
            <div class="object__prop-row">
                <div class="object__prop-val">status</div>
                <div class="object__num">${status}</div>
            </div>
            ${errorBlock}
        </div>
    `;
}


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
