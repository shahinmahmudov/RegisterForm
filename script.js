const form = document.querySelector('form');
const usersList = document.querySelector('.users-list');

// Add event listener for submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get input values
  const nameInput = document.querySelector('#name');
  const surnameInput = document.querySelector('#surname');
  const fileInput = document.querySelector('#avatar');
  
  // Create user element
  const userDiv = document.createElement('div');
  userDiv.classList.add('user');

  // Create image element
  const img = document.createElement('img');
  img.classList.add('avatar');
  img.src = URL.createObjectURL(fileInput.files[0]);
  userDiv.appendChild(img);
  
  // Create name element
  const nameSurnameDiv = document.createElement('div');
  nameSurnameDiv.classList.add('name-surname');

  const userName = document.createElement('h4');
  userName.textContent = `${nameInput.value} ${surnameInput.value}`;
  nameSurnameDiv.appendChild(userName);
  
  // Create delete button element
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const modalText = document.createElement('p');
    modalText.textContent = 'Are you sure you want to delete this user?';
    modalContent.appendChild(modalText);
    
    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Yes';
    yesBtn.addEventListener('click', () => {
      userDiv.remove();
      modal.remove();
    });
    modalContent.appendChild(yesBtn);
    
    const noBtn = document.createElement('button');
    noBtn.textContent = 'No';
    noBtn.addEventListener('click', () => {
      modal.remove();
    });
    modalContent.appendChild(noBtn);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  });
  
  nameSurnameDiv.appendChild(deleteBtn);
  
  userDiv.appendChild(nameSurnameDiv);
  
  
  // Add user element to users list
  usersList.appendChild(userDiv);
  
  // Clear form inputs
  nameInput.value = '';
  surnameInput.value = '';
  fileInput.value = '';
});

const dropzone = document.querySelector('#dropzone');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropzone.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight dropzone on dragenter
dropzone.addEventListener('dragenter', highlight, false);

// Unhighlight dropzone on dragleave
dropzone.addEventListener('dragleave', unhighlight, false);

// Handle dropped files on drop
dropzone.addEventListener('drop', handleDrop, false);

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropzone.classList.add('highlight');
}

function unhighlight(e) {
  dropzone.classList.remove('highlight');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  [...files].forEach(uploadFile);
}

function uploadFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    const img = document.createElement('img');
    img.src = reader.result;
    dropzone.appendChild(img);
  }
}
