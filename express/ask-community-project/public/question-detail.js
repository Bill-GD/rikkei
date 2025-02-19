const parts = window.location.href.split('/');
const reqId = parts[parts.findIndex(e => e === 'question-detail') + 1];

fetch(`/api/v1/questions/${reqId}`)
  .then(e => e.json())
  .then(question => {
    document.querySelector('.question-content').innerText = question.content;
    const totalVote = question.like + question.dislike;
    document.querySelector('.vote-number').innerText = totalVote;

    const likeRatio = (question.like / totalVote) * 100;
    document.querySelector('.like').style.flex = `${likeRatio}%`;
    document.querySelector('.like').innerText = `${Math.round(likeRatio)}%`;

    const dislikeRatio = (question.dislike / totalVote) * 100;
    document.querySelector('.dislike').style.flex = `${dislikeRatio}%`;
    document.querySelector('.dislike').innerText = `${Math.round(dislikeRatio)}%`;

    document.querySelector('#btn').onclick = () => {
      console.log('to main');
      window.location.href = '/';
    };
  })
  .catch(console.error);
