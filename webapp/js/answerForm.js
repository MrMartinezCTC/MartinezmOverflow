

const answerFormContainer = document.getElementById('answerForm');
const cancelBtn = document.getElementById('cancelSubmit');
const submitBtn = document.getElementById('submitSubmit');
const toggleLengthBtn = document.getElementById('toggleLengthBtn');
const answerFormInput = document.querySelector('textarea');


cancelBtn.addEventListener('click', () => answerFormInput.value = '');


toggleLengthBtn.addEventListener('click', () => {
    const hidden = answerFormContainer.classList.toggle('condensed');

    toggleLengthBtn.textContent = hidden ? 'expand' : 'condense';
})


answerFormContainer.addEventListener('submit', e => {
    e.preventDefault();

    let status;

    fetch(`/answer/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: answerFormInput.value,
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



document.querySelectorAll('.votable-block').forEach(block => block.addEventListener('click', e => {
    const btn = e.target.closest('.object__btn');
    if (!btn) return;

    const add = btn.textContent.includes('up');

    fetch(`/${block.className.includes('question') ? 'question' : 'answer'}/updateUsefulness`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ add, id: block.dataset.docId })
    })
    .then(res => {
        if (res.status === 204) {
            const usefulnessEl = block.querySelector('.js-usefulness');
            usefulnessEl.textContent = usefulnessEl.textContent * 1 + 1 * (add ? 1 : -1);
        }
    })
    .catch(err => {
        console.log('Can not connect to server. :/');
        console.log(err);
    });
}));

