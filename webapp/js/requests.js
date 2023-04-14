

const errorMsg = (status, msg) => `
    <div style="width: unset; padding: 1em; font-size: 1.2em;" class="object-block error-pop-up">
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




