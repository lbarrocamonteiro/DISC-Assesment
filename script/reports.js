// reports.js
import { createChart, destroyAllCharts, createComparisonChart } from "./charts.js";
import { getHighestScoreDescription, determineUserProfile, getDevelopmentSuggestions, determineWorkEnvironment } from './utils.js'
import { workEnvironmentTexts, motivatorsByDimension, demotivatorsByDimension } from './constants.js'
import { submitForm } from './cloud_function.js'
import { downloadPdf, downloadExcel } from './download.js'

async function generateReport(natural_scores, adaptado_scores) {
    destroyAllCharts();

    if(!natural_scores) {
        console.log("natural_scores not passed as parameter!")
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));

    if(!userData || !userData.name) {
        console.log("UserData not found in local storage!");
        localStorage.setItem("page","0");
        location.reload();
        return;
    }

    document.getElementById("userName").innerText = userData.name;
    document.getElementById("userSurname").innerText = userData.surname;
    document.getElementById("userEmail").innerText = userData.email;
    document.getElementById("userDate").innerText = userData.date;

    createChart("naturalChart", "Comportamento Natural", natural_scores);
    createChart("adaptedChart", "Comportamento Adaptado", adaptado_scores);
    createComparisonChart("comparisonChart", natural_scores, adaptado_scores)
    
    const workEnvironment = getHighestScoreDescription(natural_scores, workEnvironmentTexts);
    document.getElementById("profileSummary").innerText = workEnvironment;

    const userProfile = determineUserProfile(natural_scores);
    const motivators = motivatorsByDimension[userProfile];
    const demotivators = demotivatorsByDimension[userProfile];

    document.getElementById("motivators").innerHTML = motivators.map(item => `<li>${item}</li>`).join("");
    document.getElementById("demotivators").innerHTML = demotivators.map(item => `<li>${item}</li>`).join("");

    const developmentSuggestions = getDevelopmentSuggestions(userProfile);
    document.getElementById("developmentSuggestions").innerHTML = developmentSuggestions.map(item => `<li>${item}</li>`).join("");

    const idealEnvironment = determineWorkEnvironment(natural_scores, workEnvironmentTexts);
    document.getElementById("idealWorkEnvironment").innerHTML = idealEnvironment.map(item => `<li>${item}</li>`).join("");

    await submitForm(natural_scores, adaptado_scores);

    const downloadPdfButton = document.getElementById("downloadPdfBtn")
    downloadPdfButton.addEventListener("click", downloadPdf);
    downloadPdfButton.removeAttribute("disabled")

    const downloadExcelButton = document.getElementById("downloadExcelBtn")
    downloadExcelButton.addEventListener("click", () => downloadExcel(natural_scores, adaptado_scores));
    downloadExcelButton.removeAttribute("disabled")
}

export { generateReport };
