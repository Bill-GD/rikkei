fetch('/api/v1/questions')
  .then(e => e.json())
  .then(data => {
    const question = data[Math.floor(Math.random() * data.length)];

    document.querySelector('.question-content').innerText = question.content;
    document.querySelector('.question-content').id = question.id;
    document.querySelector('#dislike').onclick = () => dislikeQuestion(question.id);
    document.querySelector('#like').onclick = () => likeQuestion(question.id);
  })
  .catch(err => console.error(err));

async function dislikeQuestion(questionId) {
  const question = await getQuestion(questionId);
  updateQuestion(questionId, {
    content: question.content,
    dislike: ++question.dislike,
    like: question.like,
  });
  redirectToDetail(questionId);
}

async function likeQuestion(questionId) {
  const question = await getQuestion(questionId);
  updateQuestion(questionId, {
    content: question.content,
    dislike: question.dislike,
    like: ++question.like,
  });
  redirectToDetail(questionId);
}

function redirectToDetail(questionId) {
  window.location.href = `/question-detail/${questionId}`;
}

async function getQuestion(id) {
  return (await fetch(`/api/v1/questions/${id}`)).json();
}

function updateQuestion(questionId, updatedQuestion) {
  fetch(`/api/v1/questions/${questionId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedQuestion),
  }).then(e => e.json()).then(console.log);
}
