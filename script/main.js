import { saveUserData, loadUserDataIntoForm } from "./userData.js";
import { processResponses, generateQuestions, loadQuestionResponsesIntoForm } from "./questions.js";
import { generateReport } from "./reports.js";
import { testGenerateReport } from "./tests.js";

window.onload = () => {
    if (localStorage.getItem('page') === "0" || !localStorage.getItem('page')) {
        localStorage.setItem('page', "0");
        document.getElementById('intro').style.display = 'block';
        document.getElementById('assessmentContainer').style.display = 'none';
        document.getElementById('report').style.display = 'none';
        loadUserDataIntoForm();
        
    } else if (localStorage.getItem('page') === "1") {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('assessmentContainer').style.display = 'block';
        document.getElementById('report').style.display = 'none';
        generateQuestions("questionsContainer");
        loadQuestionResponsesIntoForm();

    } else if (localStorage.getItem('page') === "2") {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('assessmentContainer').style.display = 'none';
        document.getElementById('report').style.display = 'block';
        const {natural_scores, adaptado_scores} = processResponses();
        generateReport(natural_scores, adaptado_scores);
        localStorage.setItem('page', "0");
    }
    // Ensure scrolling happens after rendering
    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });
};

function testReport() {
    testGenerateReport();
}


// Event listener for navigation back to user info page
document.getElementById("goToUserInfoPage").addEventListener("click", () => {
    localStorage.setItem("page", "0");
    location.reload();
});

// Event listener for user info form submission
document.getElementById("userInfoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    saveUserData(form.name.value, form.surname.value, form.email.value);
    localStorage.setItem("page", "1");
    location.reload();
});

// Event listener for assessment form submission
document.getElementById("assessmentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("page", "2");
    location.reload();
});
