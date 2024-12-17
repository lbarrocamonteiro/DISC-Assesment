// userData.js
const userData = {};
const LOCAL_STORAGE_KEYS = ["userData", "responses", "page"];

// Save user data
function saveUserData(name, surname, email) {
    userData.name = name;
    userData.surname = surname;
    userData.email = email;
    userData.date = new Date().toISOString().split(".")[0].replace("T", " ");
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Load user data
function loadUserData() {
    return JSON.parse(localStorage.getItem("userData")) || {};
}

function loadUserDataIntoForm() {
    const userData = loadUserData(); // Call the function to retrieve data
    console.log("Loaded User Data:", userData);

    if (userData) {
        try {
            const form = document.getElementById('userInfoForm');

            // Populate form fields if they exist
            form.name.value = userData.name || '';
            form.surname.value = userData.surname || '';
            form.email.value = userData.email || '';
        } catch (error) {
            console.error("Error populating form with userData:", error);
        }
    }
}

// Reset all local storage
function resetLocalStorage() {
    LOCAL_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
}

export { saveUserData, loadUserData, resetLocalStorage, loadUserDataIntoForm };
