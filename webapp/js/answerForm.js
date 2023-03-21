

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
