document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage script loaded');

    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const nav = document.querySelector('nav'); 
    const petImage = document.getElementById('pet-image');
    const petName = document.getElementById('pet-name');
    const petDetails = document.getElementById('pet-details');
    const prevButton = document.getElementById('prev-pet');
    const nextButton = document.getElementById('next-pet');
    const featureButtons = document.querySelectorAll('.ft-btn');
    const logoutButton = document.getElementById('logout-button');
    const themeToggleButton = document.getElementById('theme-toggle-btn');

    console.log('Pet elements:', { petImage, petName, petDetails });
    console.log('Navigation buttons:', { prevButton, nextButton });

    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    console.log('Pets loaded from local storage:', pets);

    let currentPetIndex = 0;
    let currentPage = 'record';

    function updatePetDisplay() {
        console.log('Updating pet display');
        if (pets.length === 0) {
            petImage.src = 'images/pets.jpg';
            petName.textContent = 'No pets added yet';
            petDetails.textContent = 'Please add a pet from the Add Pet page';
            console.log('No pets to display');

            petImage.style.filter = "grayscale(100%)";
            petName.style.color = "#ff0000";

            return;
        }

        const pet = pets[currentPetIndex];
        console.log('Displaying pet:', pet);
        petImage.src = pet.image || 'images/pets.jpg';
        petImage.alt = pet.name;
        petName.textContent = pet.name;

        petImage.style.borderRadius = "15px";  

        updatePetDetails();
    }

    function updatePetDetails() {
        if (pets.length === 0) return;

        const pet = pets[currentPetIndex];
        switch(currentPage) {
            case 'record':
                petDetails.textContent = `Last checkup: Not available`;
                break;
            case 'appointment':
                petDetails.textContent = `Next appointment: Not scheduled`;
                break;
            case 'dietary':
                petDetails.textContent = `Dietary needs: Not specified`;
                break;
            case 'profile':
                petDetails.textContent = `${pet.name} is a ${pet.breed}. Birthday: ${pet.birthday}`;
                break;
            case 'wellness':
                petDetails.textContent = `Wellness status: Up to date`;
                break;
        }
    }

    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentPage = this.dataset.page;
            updatePetDetails();
        });
    });

    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (pets.length === 0) return;
        currentPetIndex = (currentPetIndex - 1 + pets.length) % pets.length;
        updatePetDisplay();
    });

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (pets.length === 0) return;
        currentPetIndex = (currentPetIndex + 1) % pets.length;
        updatePetDisplay();
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'Login.html';
        });
    }

    // Toggle the nav visibility
    hamburgerToggle.addEventListener('change', function() {
        if (this.checked) {
            nav.classList.add('show');
        } else {
            nav.classList.remove('show');
        }
    });

    // Theme Toggle Functionality
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        nav.classList.add('dark-theme');
        themeToggleButton.classList.add('dark-theme');
    }

    themeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        nav.classList.toggle('dark-theme');
        themeToggleButton.classList.toggle('dark-theme');

        const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

    updatePetDisplay();
});

// Update Content Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const updateContentButton = document.getElementById('update-content-btn');
    const contentUpdateSection = document.getElementById('content-update-section');

    updateContentButton.addEventListener('click', function() {
        contentUpdateSection.textContent = "Thank you for using Furfect Care! We strive to make your pet's care seamless.";
        contentUpdateSection.classList.add('updated');
    // Use of Countdown
    setTimeout(() => {
        contentUpdateSection.textContent = "Welcome to Furfect Care!"; 
        contentUpdateSection.classList.remove('updated'); 
    }, 3500);
    });
});
