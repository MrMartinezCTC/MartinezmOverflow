
const answerFormContainer = document.getElementById('answerForm');
const cancelBtn = document.getElementById('cancelSubmit');
const submitBtn = document.getElementById('submitSubmit');
const toggleLengthBtn = document.getElementById('toggleLengthBtn');
const answerFormInput = document.querySelector('textarea');
const answerFormOutput = document.querySelector('#answerOutput');
const answerView = document.querySelector('.answer-view');
const questionAcceptedVal = document.getElementById('questionAcceptedVal');

cancelBtn.addEventListener('click', () => answerFormInput.value = '');


toggleLengthBtn.addEventListener('click', () => {
    const hidden = answerFormContainer.classList.toggle('condensed');

    toggleLengthBtn.textContent = hidden ? 'expand' : 'condense';
});

document.getElementById('viewAnswerMarkup').addEventListener('click', e => {
    popup(answerView, e);
});

mirrorMessage(answerFormInput, answerFormOutput, true);

answerFormContainer.addEventListener('submit', e => {
    e.preventDefault();

    let status;

    fetch(`/answer/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            answerText: answerFormInput.value,
            answerMarkup: answerFormOutput.textContent,
            id: location.href.split('=')[1]
        })
    })
    .then(res => {
        status = res.status;
        return res.json();
    })
    .then(body => {
        if (!body.isError) return location.reload(true);
        displayError(status, body.message);
    })
    .catch(err => {
        console.log('Can not connect to server. :/');
        console.log(err);
    });
});


document.querySelectorAll('.votable-block').forEach(block => {
    block.addEventListener('click', e => {
        const btn = e.target.closest('.object__btn');
        if (!btn) return;

        if (btn.textContent.includes('ccept')) {
            const isAccepted = !btn.textContent.includes('un');
            return sendBoolRequest(block, 'question/updateAccepted', isAccepted, function () {
                questionAcceptedVal.textContent = isAccepted;
                btn.textContent = `${isAccepted ? 'un' : ''}accept`;
                block.querySelector('.accepted-bool').textContent = isAccepted;
                
                const newAcceptedAnswer = btn.closest('.object-block');
                
                if (!isAccepted) return newAcceptedAnswer.classList.remove('accepted-answer');
                
                const previousAcceptedAnswer = document.querySelector('.accepted-answer');
                if (previousAcceptedAnswer) {
                    previousAcceptedAnswer.classList.remove('accepted-answer');
                    previousAcceptedAnswer.querySelector('.accept-btn').textContent = 'accept';
                    previousAcceptedAnswer.querySelector('.accepted-bool').textContent = 'false';
                }

                newAcceptedAnswer.classList.add('accepted-answer');
            });
        }
    
        const add = btn.textContent.includes('up');

        sendBoolRequest(block, `${block.className.includes('question') ? 'question' : 'answer'}/updateUsefulness`, add, function () {
            const usefulnessEl = block.querySelector('.js-usefulness');
            usefulnessEl.textContent = usefulnessEl.textContent * 1 + (add ? 1 : -1);
        });
    });
    const messageTextEl = block.querySelector('.messageText');
    makeTextFancy(messageTextEl.textContent, messageTextEl);
});



function sendBoolRequest (block, route, boolVal, handleSuccess) {
    fetch(`/${route}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ boolVal, id: block.dataset.docId })
    })
    .then(async res => {
        if (res.status === 204) return handleSuccess();

        displayError(res.status, (await res.json()).message);
    })
    .catch(err => {
        console.log('Can not connect to server. :/');
        console.log(err);
    });
}


window.onunload = function () {
    fetch('/question/userIsLeaving');
};
