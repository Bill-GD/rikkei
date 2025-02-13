fetch('http://localhost:3000/todos')
.then(res => {
  return res.json();
})
.then(value => {
  console.log(value);
  // uses DOM to render the list

  // Create a "close" button and append it to each list item
  let myNodelist = document.getElementById('myUL');

  for (const item of value) {
    let newItem = document.createElement('LI');
    newItem.innerText = item['content'];

    let span = document.createElement('SPAN');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    newItem.appendChild(span);

    myNodelist.appendChild(newItem);
  }

  // Click on a close button to hide the current list item
  let close = document.getElementsByClassName('close');
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    };
  }

  // Add a "checked" symbol when clicking on a list item
  let list = document.querySelector('ul');
  list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
})
.catch(err => {
  console.error(err);
});

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement('li');
  let inputValue = document.getElementById('myInput').value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert('You must write something!');
  } else {
    document.getElementById('myUL').appendChild(li);
  }
  document.getElementById('myInput').value = '';

  let span = document.createElement('SPAN');
  let txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  let close = document.getElementsByClassName('close');

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    };
  }
}
