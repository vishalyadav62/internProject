const form = document.getElementById('achievementForm');
const achievementsList = document.getElementById('achievementsList');

// Load achievements from local storage
window.addEventListener('load', () => {
    const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
    savedAchievements.forEach(addAchievementToList);
});

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const achievementText = e.target[0].value;
    const fileInput = e.target[1].files[0];

    if (achievementText.trim() === "") return alert("Achievement cannot be empty.");

    const newAchievement = {
        text: achievementText,
        image: fileInput ? URL.createObjectURL(fileInput) : null
    };

    addAchievementToList(newAchievement);

    const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    achievements.push(newAchievement);
    localStorage.setItem('achievements', JSON.stringify(achievements));

    form.reset();
});

// Add achievement to the list
function addAchievementToList(achievement) {
    const achievementDiv = document.createElement('div');
    achievementDiv.classList.add('alert', 'alert-info', 'd-flex', 'justify-content-between', 'align-items-center', 'mt-2');

    achievementDiv.innerHTML = `<span>${achievement.text}</span>`;
    
    if (achievement.image) {
        const img = document.createElement('img');
        img.src = achievement.image;
        img.alt = "Certificate";
        img.style.width = '50px';
        img.classList.add('ml-3');
        achievementDiv.appendChild(img);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-3');
    deleteBtn.onclick = () => {
        achievementDiv.remove();
        removeFromLocalStorage(achievement);
    };

    achievementDiv.appendChild(deleteBtn);
    achievementsList.appendChild(achievementDiv);
}

// Remove achievement from local storage
function removeFromLocalStorage(achievement) {
    const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    const updatedAchievements = achievements.filter(a => a.text !== achievement.text);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
}
