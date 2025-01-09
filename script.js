const app = document.querySelector('#app');
const button = document.querySelector('#submit');
const addToHobby = document.querySelector('#addToHobby');
const hobbyList = document.querySelector('#hobbies');
const hobbyInput = document.querySelector('#hobbyinput');
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const userInfoDiv = document.getElementById('userInfo');


addToHobby.addEventListener('click', (e)=> {
    e.preventDefault();
    const hobby = hobbyInput.value.trim();
    
    if (hobby) {
        
        const hobbyItem = document.createElement('div');
        hobbyItem.classList.add('hobby-item');
        
        const hobbyText = document.createElement('span');
        hobbyText.textContent = hobby;
        
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'x';
        cancelButton.addEventListener('click', function() {
            hobbyList.removeChild(hobbyItem);
        });
        
        hobbyItem.appendChild(hobbyText);
        hobbyItem.appendChild(cancelButton);
        hobbyList.appendChild(hobbyItem);
        
        hobbyInput.value = '';
    }
});

button.addEventListener('click', (e)=> {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const gender = document.getElementById('gender').value;
    const hobbies = Array.from(hobbyList.querySelectorAll('.hobby-item')).map(tab => tab.textContent.replace('x', ''));
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (dobInput) {
        let age = today.getFullYear() - dob.getFullYear();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        userInfoDiv.innerHTML = `
            <p>My name is <strong>${name}</strong>, a <strong>${gender}</strong> of age <strong>${age}</strong> and listed below are my hobbies.</p>
            <p><strong>Hobbies:</strong></p>
            <ul>
                ${hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
            </ul>
        `;
        modal.style.display = "block";
    } else {
        alert('Please provide a valid date of birth.');
    }
});


closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
