

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
    .then(res => res.json())
    .then(body => {
        if (!body.isError) return location.reload(true);
        alert (body.message);
    })
    .catch(err => {
        console.log('Can not connect to server. :/');
        console.log(err);
    });
});

