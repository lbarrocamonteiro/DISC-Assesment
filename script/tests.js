import { processResponses } from './questions.js'
import { generateReport } from './reports.js'

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function resetLocalStorage() {
    localStorage.removeItem('userData');
    localStorage.removeItem('responses');
    localStorage.removeItem('page');
}

function testGenerateReport() {
    // Generate random user data
    const userData = {
        name: `Random_${Math.floor(Math.random() * 1000)}`,
        surname: `User_${Math.floor(Math.random() * 1000)}`,
        email: `random.user${Math.floor(Math.random() * 1000)}@test.com`,
        date: new Date().toISOString().replace("T", " ").split(".")[0]
    };

    // Save random user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Predefined word groups
    const dWords = ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado"];
    const iWords = ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador"];
    const sWords = ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo"];
    const cWords = ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso"];
    const allWords = [...dWords, ...iWords, ...sWords, ...cWords];

    // Generate random responses
    const responses = {};
    for (let i = 0; i < 24; i++) {
        let most = getRandomElement(allWords);
        let least = getRandomElement(allWords);

        // Ensure 'most' and 'least' are not the same
        while (most === least) {
            least = getRandomElement(allWords);
        }

        responses[`most-${i}`] = most;
        responses[`least-${i}`] = least;
    }

    // Save responses to localStorage
    localStorage.setItem("responses", JSON.stringify(responses));
    localStorage.setItem("page", "2"); // Simulate report page state

    // Update DOM visibility
    document.getElementById('intro').style.display = "none";
    document.getElementById('assessmentContainer').style.display = "none";
    document.getElementById('report').style.display = "block";

    const {natural_scores, adaptado_scores} = processResponses();
    if (natural_scores && adaptado_scores) {
        generateReport(natural_scores, adaptado_scores);
    } else {
        console.error("Error: Failed to generate report for test user.");
    }
}

window.testGenerateReport = testGenerateReport;
window.resetLocalStorage = resetLocalStorage;
export { testGenerateReport }
