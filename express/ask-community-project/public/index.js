fetch('/api/v1/questions')
  .then(e => e.json())
  .then(data => {
    const question = data[Math.round(Math.random() * data.length)];

    document.querySelector('.question-content').innerText = question.content;
    document.querySelector('.question-content').id = question.id;
  })
  .catch(err => console.error(err));

async function dislikeQuestion() {
  const questionId = document.querySelector('.question-content').id;
  const question = await getQuestion(questionId);
  updateQuestion(questionId, {
    content: question.content,
    dislike: ++question.dislike,
    like: question.like,
  });
}

async function likeQuestion() {
  const questionId = document.querySelector('.question-content').id;
  const question = await getQuestion(questionId);
  updateQuestion(questionId, {
    content: question.content,
    dislike: question.dislike,
    like: ++question.like,
  });
}

async function getQuestion(id) {
  return (await fetch(`/api/v1/questions/${id}`)).json();
}

function updateQuestion(questionId, updatedQuestion) {
  fetch(`/api/v1/questions/${questionId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedQuestion),
  });
}
