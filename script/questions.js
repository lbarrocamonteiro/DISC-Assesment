// questions.js
import { saveResponseInRealTime } from "./utils.js";

function loadQuestionResponsesIntoForm() {
    const savedResponses = localStorage.getItem('responses');
    if (savedResponses) {
        console.log("Saved responses:", savedResponses);
        try {
            const responses = JSON.parse(savedResponses);

            // Fill inputs based on stored responses
            for (const [key, value] of Object.entries(responses)) {
                // Select all inputs with the matching name
                const inputs = document.querySelectorAll(`input[name="${key}"]`);
                inputs.forEach(input => {
                    // Check if the input's value matches the saved response
                    if (input.value === String(value)) {
                        // For radio or checkbox inputs, set the checked property
                        if (input.type === 'radio' || input.type === 'checkbox') {
                            input.checked = true;
                        } else {
                            // For other input types, set the value
                            input.value = value;
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error parsing responses from localStorage')
        }
    }
}

function generateQuestions(containerId) {
    const questions = [
        ["Agressivo", "Amigável", "Calmo", "Meticuloso"],
        ["Decidido", "Persuasivo", "Paciente", "Cuidadoso"],
        ["Autoritário", "Sociável", "Leal", "Analítico"],
        ["Competitivo", "Entusiasta", "Compreensivo", "Organizado"],
        ["Determinado", "Inspirador", "Tranquilo", "Cauteloso"],
        ["Confrontador", "Carismático", "Reservado", "Detalhista"],
        ["Decisivo", "Influente", "Tolerante", "Preciso"],
        ["Independente", "Empático", "Fiável", "Rigoroso"],
        ["Audacioso", "Expressivo", "Sossegado", "Metódico"],
        ["Assertivo", "Enérgico", "Solidário", "Pragmático"],
        ["Corajoso", "Espontâneo", "Estável", "Objetivo"],
        ["Orientado a resultados", "Motivador", "Apoiante", "Estruturado"],
        ["Líder natural", "Inspirador", "Harmonioso", "Preciso"],
        ["Proativo", "Entusiasta", "Acolhedor", "Cuidadoso"],
        ["Focado", "Criativo", "Paciente", "Determinante"],
        ["Persistente", "Comunicativo", "Tolerante", "Meticuloso"],
        ["Organizado", "Visionário", "Calmo", "Perfeccionista"],
        ["Pragmático", "Amigável", "Leal", "Disciplinado"],
        ["Audaz", "Enérgico", "Flexível", "Estratégico"],
        ["Competitivo", "Carismático", "Metódico", "Cauteloso"],
        ["Ambicioso", "Encantador", "Paciente", "Conservador"],
        ["Decisivo", "Influenciador", "Estável", "Analítico"],
        ["Direto", "Entusiasta", "Colaborativo", "Racional"],
        ["Focado em Resultados", "Empático", "Adaptável", "Minucioso"]
    ];
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing content

    questions.forEach((options, index) => {
        const card = document.createElement("div");
        card.classList.add("question-card");

        card.innerHTML = `
            <h4>Grupo ${index + 1}: Escolha a palavra que mais e menos o descreve</h4>
            <div class="question-options">
                <div class="option-group">
                    <p>Mais Descritivo:</p>
                    ${options.map(option => `<label><input type="radio" name="most-${index}" value="${option}"> ${option}</label>`).join("")}
                </div>
                <div class="option-group">
                    <p>Menos Descritivo:</p>
                    ${options.map(option => `<label><input type="radio" name="least-${index}" value="${option}"> ${option}</label>`).join("")}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    // Add real-time save listeners
    setupRealTimeSave();
}

function setupRealTimeSave() {
    const inputs = document.querySelectorAll("input[type='radio']");
    inputs.forEach(input => input.addEventListener("change", saveResponseInRealTime));
}


// Fix processResponses to return valid data or errors gracefully
function processResponses() {

    const savedResponses = JSON.parse(localStorage.getItem("responses") || "{}");

    let natural_scores = { D: 0, I: 0, S: 0, C: 0 };
    let adaptado_scores = { D: 0, I: 0, S: 0, C: 0 };

    const dWords = ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado"];
    const iWords = ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador"];
    const sWords = ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo"];
    const cWords = ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso"];

    for (let i = 0; i < 24; i++) {
        const most = savedResponses[`most-${i}`];
        const least = savedResponses[`least-${i}`];

        if (!most || !least) {
            alert(`Pergunta ${i + 1} está incompleta!`);
            return null;
        }

        if (most === least) {
            alert(`Os valores "Mais" e "Menos" não podem ser iguais na pergunta ${i + 1}.`);
            return null;
        }

        if (dWords.includes(most)) natural_scores.D += 1;
        if (dWords.includes(least)) adaptado_scores.D += 1;

        if (iWords.includes(most)) natural_scores.I += 1;
        if (iWords.includes(least)) adaptado_scores.I += 1;

        if (sWords.includes(most)) natural_scores.S += 1;
        if (sWords.includes(least)) adaptado_scores.S += 1;

        if (cWords.includes(most)) natural_scores.C += 1;
        if (cWords.includes(least)) adaptado_scores.C += 1;
    }

    // Normalize scores (divide by total number of questions)
    Object.keys(natural_scores).forEach(key => {
        natural_scores[key] = ((natural_scores[key] / 24) * 100).toFixed(2);
    });

    Object.keys(adaptado_scores).forEach(key => {
        adaptado_scores[key] = ((adaptado_scores[key] / 24) * 100).toFixed(2);
    });

    console.log("Natural Scores:", natural_scores);
    console.log("Adapted Scores:", adaptado_scores);

    return { natural_scores, adaptado_scores };
}


export { generateQuestions, setupRealTimeSave, loadQuestionResponsesIntoForm, processResponses };
