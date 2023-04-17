
function mirrorMessage (inputEl, outputEl, isMarkup) {
    inputEl.addEventListener('keypress', e => {
        e.preventDefault();
        const mousePos = inputEl.selectionStart;
        inputEl.value = mirrorType(inputEl, e.key);
        inputEl.setSelectionRange(mousePos+1, mousePos+1);

        setOutput();
    });

    inputEl.addEventListener('change', setOutput);

    function setOutput () {
        if (isMarkup) return makeTextFancy();
        outputEl.textContent = inputEl.value;
    }

    function makeTextFancy () {
        let inputText = inputEl.value, codeBlockChars = 0;
        
        inputText = inputText
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/```\w+ \n|```\w+ |```/g, match => {
                codeBlockChars++;

                const closeChar = codeBlockChars % 2 ? '' : '/';
                const tagsArr = [`<${closeChar}pre>`],

                language = closeChar ? '' : ` class="language-${match.slice(3)}"`;

                tagsArr[closeChar ? 'unshift' : 'push'](`<${closeChar}code${language}>`);

                return tagsArr.join('');
        });

        outputEl.innerHTML = inputText;
        outputEl.innerHTML = Array.from(outputEl.childNodes).map(child => child.nodeType === 3 ? child.textContent.replace(/\n/g, '</br>') : child.outerHTML).join('');
        Prism.highlightAll();
    }

    function mirrorType (txtInput, key) {
        let newStr = txtInput.value.split('');
        newStr.splice(txtInput.selectionStart, 0, key === 'Enter' ? '\n' : key);
        newStr = newStr.join('');

        return newStr;
    }
}

