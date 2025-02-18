fetch('http://localhost:3000/todos')
  .then(res => {
    return res.json();
  })
  .then(data => {
    // console.log(data);
    // uses DOM to render the list

    // Create a "close" button and append it to each list item
    let todoList = document.getElementById('todo-list-ul');

    const htmlItems = data.map(e => {
      return `<li id="${e.id}" ${e.status ? 'class="checked"' : ''}>
        ${e.content}
        <span class="close">&#10005;</span>
      </li>`;
    });
    todoList.innerHTML = htmlItems.join('');

    // Click on a close button to hide the current list item
    let close = document.getElementsByClassName('close');
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = 'none';
        deleteItem(div.id);
      };
    }

    // Add a "checked" symbol when clicking on a list item
    let list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        // console.log(ev.target.id);
        const status = ev.target.className === 'checked';
        fetch(`http://localhost:3000/todos/${ev.target.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: status }),
        }).then(e => e.json()).then(console.log);
      }
    }, false);
  })
  .catch(err => {
    console.error(err);
  });

// Create a new list item when clicking on the "Add" button
function newElement() {
  let inputValue = document.getElementById('new-todo-input').value;
  if (inputValue === '') {
    alert('You must write something!');
    return;
  }

  const postBody = JSON.stringify({ content: inputValue });
  // console.log(postBody);
  // post request with the data
  fetch('http://localhost:3000/todos', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: postBody,
  }).then(e => e.json()).then(data => {
    let li = document.createElement('li');
    li.innerText = inputValue;
    li.id = data.id;


    let span = document.createElement('span');
    span.className = 'close';
    span.innerHTML = '&#10005;';
    span.onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
      deleteItem(div.id);
    };
    li.appendChild(span);
    document.getElementById('todo-list-ul').appendChild(li);
    document.getElementById('new-todo-input').value = '';
    console.log(data);
  });
}

function deleteItem(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'delete',
  }).then(e => e.json()).then(console.log);
}
