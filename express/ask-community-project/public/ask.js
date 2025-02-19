window.addEventListener('load', () => {
  const textarea = document.querySelector('.question-content'),
    remainingLetter = document.querySelector('.letter'),
    mainForm = document.querySelector('.main-form'),
    maxLetterCount = 200;

  // readonly or disabled won't allow edit when max is reached
  textarea.setAttribute('maxlength', maxLetterCount);

  textarea.addEventListener('input', evt => {
    const inputValue = textarea.value;
    remainingLetter.innerText = maxLetterCount - inputValue.length;
  });

  mainForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const inputValue = textarea.value;
    if (inputValue.length <= 0) {
      return alert('Không được bỏ trống');
    }

    fetch('/api/v1/questions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: inputValue.trim() }),
    }).then(e => e.json()).then(res => {
      console.log(res);
      alert('Thêm câu hỏi thành công');
      window.location.href = '/';
    });
  });
});
