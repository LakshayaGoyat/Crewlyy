// ===============================
// EDIT PROFILE FUNCTIONALITY
// ===============================

// Buttons and modal
const editProfileButton = document.querySelector(".edit-profile");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const cancelEdit = document.getElementById("cancelEdit");
const saveProfile = document.getElementById("saveProfile");


// ===============================
// EDIT INPUT FIELDS
// ===============================

const editName = document.getElementById("editName");
const editRole = document.getElementById("editRole");
const editLocation = document.getElementById("editLocation");

const editTeamSize = document.getElementById("editTeamSize");
const editTimezone = document.getElementById("editTimezone");
const editCapacity = document.getElementById("editCapacity");

const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");
const editGithub = document.getElementById("editGithub");
const editLinkedin = document.getElementById("editLinkedin");
const editTwitter = document.getElementById("editTwitter");
const editPortfolio = document.getElementById("editPortfolio");

const editAbout = document.getElementById("editAbout");


// ===============================
// PROFILE ELEMENTS
// ===============================

const profileName = document.querySelector(".profile-details h1");
const profileRole = document.querySelector(".profile-details .role");
const profileLocation = document.querySelector(".profile-details .location");

const aboutText = document.querySelector(".about-card p");


// ===============================
// AVAILABILITY ELEMENTS
// ===============================

const availabilityRows = document.querySelectorAll(
    ".availability-card .info-row"
);

const teamSizeText = availabilityRows[0].querySelector("strong");
const timezoneText = availabilityRows[1].querySelector("strong");
const capacityText = availabilityRows[2].querySelector("strong");


// ===============================
// CONTACT ELEMENTS
// ===============================

const contactRows = document.querySelectorAll(
    ".contact-card .contact-row"
);

const emailText = contactRows[0].querySelector("span:last-child");
const phoneText = contactRows[1].querySelector("span:last-child");
const githubText = contactRows[2].querySelector("span:last-child");
const linkedinText = contactRows[3].querySelector("span:last-child");
const twitterText = contactRows[4].querySelector("span:last-child");
const portfolioText = contactRows[5].querySelector("span:last-child");


// ===============================
// OPEN EDIT PROFILE
// ===============================

editProfileButton.addEventListener("click", function () {

    // Basic information
    editName.value = profileName.textContent.trim();
    editRole.value = profileRole.textContent.trim();

    editLocation.value = profileLocation.textContent
        .replace("♧ ", "")
        .replace(" • SYSTEM ARCHITECT VERIFIED", "")
        .trim();


    // Availability
    editTeamSize.value = teamSizeText.textContent.trim();
    editTimezone.value = timezoneText.textContent.trim();
    editCapacity.value = capacityText.textContent.trim();


    // Contact
    editEmail.value = emailText.textContent.trim();
    editPhone.value = phoneText.textContent.trim();
    editGithub.value = githubText.textContent.trim();
    editLinkedin.value = linkedinText.textContent.trim();
    editTwitter.value = twitterText.textContent.trim();
    editPortfolio.value = portfolioText.textContent.trim();


    // About
    editAbout.value = aboutText.textContent.trim();


    // Show modal
    editModal.style.display = "flex";
});


// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener("click", function () {
    editModal.style.display = "none";
});

cancelEdit.addEventListener("click", function () {
    editModal.style.display = "none";
});


// ===============================
// SAVE PROFILE
// ===============================

saveProfile.addEventListener("click", function () {

    // Basic information
    profileName.textContent = editName.value;
    profileRole.textContent = editRole.value;

    profileLocation.textContent =
        "♧ " + editLocation.value +
        " • SYSTEM ARCHITECT VERIFIED";


    // Availability
    teamSizeText.textContent = editTeamSize.value;
    timezoneText.textContent = editTimezone.value;
    capacityText.textContent = editCapacity.value;


    // Contact
    emailText.textContent = editEmail.value;
    phoneText.textContent = editPhone.value;
    githubText.textContent = editGithub.value;
    linkedinText.textContent = editLinkedin.value;
    twitterText.textContent = editTwitter.value;
    portfolioText.textContent = editPortfolio.value;


    // About
    aboutText.textContent = editAbout.value;


    // Close modal
    editModal.style.display = "none";


    console.log("Profile updated successfully!");
});


// ===============================
// SECTION EDIT ICONS
// ===============================

// Availability edit icon
const availabilityEdit =
    document.querySelector(".availability-card .card-title > span");

// Contact edit icon
const contactEdit =
    document.querySelector(".contact-card .card-title > span");

// About Me edit icon
const aboutEdit =
    document.querySelector(".about-card .card-title > span");


// Make the icons open the main Edit Profile modal

availabilityEdit.addEventListener("click", function () {
    editProfileButton.click();
});

contactEdit.addEventListener("click", function () {
    editProfileButton.click();
});

aboutEdit.addEventListener("click", function () {
    editProfileButton.click();
});


// ===============================
// NAME EDIT ICON
// ===============================

const nameEdit = document.querySelector(".name-row .edit-icon");

if (nameEdit) {
    nameEdit.style.cursor = "pointer";

    nameEdit.addEventListener("click", function () {
        editProfileButton.click();
    });
}


// ===============================
// REMOVE UNIMPLEMENTED EDIT ICONS
// ===============================

// Technical Arsenal
const skillsEdit =
    document.querySelector(".skills-card .card-title > span");

if (skillsEdit) {
    skillsEdit.remove();
}


// Hackathon Journey
const journeyEdit =
    document.querySelector(".journey-card .card-title > span");

if (journeyEdit) {
    journeyEdit.remove();
}


// ===============================
// PROFILE PICTURE
// ===============================

const changePhoto = document.getElementById("changePhoto");
const profileImageInput = document.getElementById("profileImageInput");
const profileImage = document.getElementById("profileImage");


// Open file selector when camera is clicked
changePhoto.addEventListener("click", function () {
    profileImageInput.click();
});


// Change profile picture after selecting an image
profileImageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    // Make sure the selected file is an image
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
    }

    // Create temporary URL for the selected image
    const imageURL = URL.createObjectURL(file);

    // Display the new profile picture
    profileImage.src = imageURL;

    console.log("Profile picture updated!");
});