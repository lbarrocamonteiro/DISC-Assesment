let userData = {};
let chartInstances = [];
const workEnvironmentTexts = {
    D: {
        low: "Prefere ambientes onde os conflitos são mínimos e as decisões são tomadas em consenso.",
        medium: "Gosta de ambientes desafiadores, mas com apoio na tomada de decisões.",
        high: "Ambientes competitivos com liberdade para decisões rápidas e foco em resultados.",
        veryHigh: "Exige ambientes desafiadores e de alta pressão, onde possa liderar e tomar decisões de forma independente."
    },
    I: {
        low: "Prefere ambientes tranquilos e com interações sociais limitadas.",
        medium: "Valoriza ambientes colaborativos, mas com equilíbrio entre trabalho individual e social.",
        high: "Gosta de ambientes criativos e interativos, com oportunidades de interação frequente.",
        veryHigh: "Exige ambientes dinâmicos, sociais e que incentivem a criatividade e expressão pessoal."
    },
    S: {
        low: "Funciona melhor em ambientes onde mudanças são bem estruturadas e previsíveis.",
        medium: "Prefere ambientes equilibrados, com rotinas claras e segurança.",
        high: "Gosta de ambientes tranquilos e previsíveis, com forte suporte de colegas e líderes.",
        veryHigh: "Exige ambientes altamente estáveis, com pouca pressão e relações harmoniosas."
    },
    C: {
        low: "Prefere ambientes flexíveis, sem muitas regras e estrutura.",
        medium: "Valoriza a organização, mas também aprecia certa liberdade criativa.",
        high: "Ambientes organizados, com processos claros e foco em qualidade e precisão.",
        veryHigh: "Exige ambientes rigorosamente estruturados, com padrões de qualidade elevados e foco em análises detalhadas."
    }
};

const motivatorsByDimension = {
    "D": [
        "Ambientes desafiadores e dinâmicos.",
        "Oportunidades de liderar e tomar decisões.",
        "Reconhecimento pelos resultados alcançados.",
        "Foco em metas claras e concretas.",
        "Autonomia para inovar e agir."
    ],
    "I": [
        "Interação frequente com outras pessoas.",
        "Ambientes energéticos e criativos.",
        "Oportunidades para inspirar e persuadir.",
        "Reconhecimento por ideias inovadoras.",
        "Projetos colaborativos e dinâmicos."
    ],
    "S": [
        "Ambientes tranquilos e previsíveis.",
        "Relações estáveis e de confiança.",
        "Trabalho em equipa colaborativo.",
        "Suporte de líderes e colegas.",
        "Rotinas consistentes e bem definidas."
    ],
    "C": [
        "Estrutura e regras claras.",
        "Foco em qualidade e precisão.",
        "Ambientes organizados e estruturados.",
        "Reconhecimento por excelência técnica.",
        "Soluções baseadas em análises detalhadas."
    ]
};

const demotivatorsByDimension = {
    "D": [
        "Ambientes sem desafios ou objetivos claros.",
        "Excesso de supervisão ou controle.",
        "Falta de autonomia para tomar decisões.",
        "Tarefas repetitivas e sem propósito.",
        "Ambientes que desencorajam a inovação."
    ],
    "I": [
        "Falta de interação social ou colaboração.",
        "Ausência de reconhecimento por suas ideias.",
        "Trabalho isolado por longos períodos.",
        "Ambientes altamente rígidos e estruturados.",
        "Poucas oportunidades para inspirar ou persuadir."
    ],
    "S": [
        "Mudanças frequentes ou inesperadas.",
        "Ambientes com conflitos constantes.",
        "Falta de suporte de colegas ou líderes.",
        "Pressão excessiva para resultados imediatos.",
        "Ambientes competitivos e agressivos."
    ],
    "C": [
        "Falta de clareza nas expectativas ou tarefas.",
        "Ambientes desorganizados ou sem estrutura.",
        "Pressão para decisões rápidas e impulsivas.",
        "Tarefas sem critérios de qualidade definidos.",
        "Pouca valorização de padrões e processos."
    ]
};

function loadLocalData() {
    const page = localStorage.getItem('page') || "0"; // Default to page 0 if no page is stored
    const userForm = document.getElementById('intro'); // User form page
    const questionsForm = document.getElementById('assessmentContainer'); // Questions form page
    const reportPage = document.getElementById('report'); // Report page

    // Hide all pages by default
    [userForm, questionsForm, reportPage].forEach(pageElement => {
        if (pageElement) pageElement.style.display = 'none';
    });

    // Show the correct page based on the value of 'page'
    if (page === "0") {
        if (userForm) userForm.style.display = 'block';

        const savedUserInfo = localStorage.getItem('userData');
            if (savedUserInfo) {
                console.log("Saved User Info:", savedUserInfo);
                try {
                    const userData = JSON.parse(savedUserInfo);

                    // Fill inputs based on stored user data
                    document.getElementById('name').value = userData.name;
                    document.getElementById('surname').value = userData.surname;
                    document.getElementById('email').value = userData.email;
                } catch (error) {
                    console.error('Error parsing responses from localStorage')
                }
            }
    } else if (page === "1") {
        if (questionsForm) {
            questionsForm.style.display = 'block';
            generateQuestions();
            // Load responses from localStorage
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
    } else if (page === "2") {
        if (reportPage) {
            reportPage.style.display = 'block';

            // Load saved responses and user data to generate the report
            const savedResponses = JSON.parse(localStorage.getItem('responses')) || {};
            const formData = new FormData();

            for (const key in savedResponses) {
                formData.append(key, savedResponses[key]);
            }

            let scores = processResponses(formData);
            if (scores) {
                // Process percentage scores
                generateReport(scores.natural_scores, scores.adaptado_scores);
                localStorage.setItem("page", "0")
            }
        }
    }
}

// List of canvas IDs to manage
const chartCanvasIds = ["naturalChart", "adaptedChart", "ComparisonChart"];

// Function to safely destroy all existing charts
function destroyAllCharts() {
    chartCanvasIds.forEach((canvasId) => {
        const canvas = document.getElementById(canvasId);

        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
            delete chartInstances[canvasId];
        }

        // Clear the canvas
        if (canvas) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
}

window.onload = loadLocalData();

// Fix processResponses to return valid data or errors gracefully
function processResponses(formData) {
    let natural_scores = { D: 0, I: 0, S: 0, C: 0 };
    let adaptado_scores = { D: 0, I: 0, S: 0, C: 0 };

    const dWords = ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado"];
    const iWords = ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador"];
    const sWords = ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo"];
    const cWords = ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso"];

    for (let i = 0; i < 24; i++) {
        const most = formData.get(`most-${i}`);
        const least = formData.get(`least-${i}`);

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

    return { natural_scores, adaptado_scores };
}

// Attach functions to buttons
function changeToUserInfoPage() {
    localStorage.setItem('page', "0");
    loadLocalData();
}

// Attach functions to buttons
function changeToQuestionsPage() {
    localStorage.setItem('page', "1");
    loadLocalData();
}

function changeToReportPage() {
    const formData = new FormData(document.getElementById('assessmentForm'));
    const scores = processResponses(formData);
    if (scores) {
        localStorage.setItem('page', "2");
        localStorage.setItem('responses', JSON.stringify(Object.fromEntries(formData.entries())));
        loadLocalData();
    }
}

document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    startAssessment();
});

document.getElementById('assessmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    changeToReportPage();
});

function saveResponseInRealTime(event) {
    const input = event.target; // Get the input that triggered the event
    const name = input.name; // Input name (e.g., `most-1`, `least-1`)
    const value = input.value; // Input value

    console.log(`Input ${name} changed to ${value}`);

    // Retrieve saved responses from localStorage
    const savedResponses = JSON.parse(localStorage.getItem('responses')) || {};

    // Update the response
    savedResponses[name] = value;

    // Save back to localStorage
    localStorage.setItem('responses', JSON.stringify(savedResponses));
}

// Attach event listeners to all inputs in the assessment form
function setupRealTimeSave() {
    const inputs = document.querySelectorAll('#assessmentForm input[type="radio"]');
    inputs.forEach(input => {
        input.addEventListener('change', saveResponseInRealTime);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        emailInput.focus();
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

function startAssessment() {
    // localStorage.setItem("page", "1");
    window.scrollTo({top: 0});
    const form = document.getElementById('userInfoForm');
    const name = form.name.value.trim();
    const surname = form.surname.value.trim();
    const email = form.email.value.trim();

    if (name && surname && validateEmail(email)) {
        userData.name = name;
        userData.surname = surname;
        userData.email = email;
        userData.date = new Date().toISOString().replace("T", " ").split(".")[0].toString().replace("'", "");

        // Save userData to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        changeToQuestionsPage();
        // loadLocalData();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
        changeToUserInfoPage();
    }
}

function generateQuestions() {
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

    const container = document.getElementById("questionsContainer");
    container.innerHTML = ""; // Limpa as questões anteriores

    container.innerHTML = ""; 

    questions.forEach((options, index) => {
        const questionCard = document.createElement("div");
        questionCard.classList.add("question-card");

        const questionTitle = document.createElement("h4");
        questionTitle.innerText = `Grupo ${index + 1}: Escolha a palavra que mais e menos o descreve`;
        questionCard.appendChild(questionTitle);

        const optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("question-options");

        const mostDescriptive = document.createElement("div");
        mostDescriptive.classList.add("option-group");
        mostDescriptive.innerHTML = `
            <p><strong>Mais Descritivo:</strong></p>
            ${options.map(option => `<label><input type="radio" name="most-${index}" value="${option}" required> ${option}</label>`).join("")}
        `;

        const leastDescriptive = document.createElement("div");
        leastDescriptive.classList.add("option-group");
        leastDescriptive.innerHTML = `
            <p><strong>Menos Descritivo:</strong></p>
            ${options.map(option => `<label><input type="radio" name="least-${index}" value="${option}" required> ${option}</label>`).join("")}
        `;

        optionsWrapper.appendChild(mostDescriptive);
        optionsWrapper.appendChild(leastDescriptive);
        questionCard.appendChild(optionsWrapper);
        container.appendChild(questionCard);
        
    });
    // Call this function when the page loads or after generating questions
    setupRealTimeSave();
}


async function submitForm(natural_scores, adaptado_scores) {
    const userData = localStorage.getItem('userData');
    // Select the form element
    document.getElementById("userName").innerText = userData.name;
    document.getElementById("userSurname").innerText = userData.surname;
    document.getElementById("userEmail").innerText = userData.email;
    document.getElementById("userDate").innerText = userData.date;

    let jsonData = {
        "Name": userData.name,
        "Surname": userData.surname,
        "Email": userData.email,
        "Date": userData.date
    };

    Object.entries(natural_scores).forEach((value, key) => {
        jsonData[value[0]+" Natural"] = value[1];
    });

    Object.entries(adaptado_scores).forEach((value, key) => {
        jsonData[value[0]+" Adaptado"] = value[1];
    });

    console.log(jsonData);

    if(!jsonData.Name) {
        console.log("No user data found");
        return;
    }

    try {
        // Send the form data to the Cloud Function
        const response = await fetch('https://europe-west9-luis-disc-form.cloudfunctions.net/export_to_gs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        });

        // localStorage.removeItem('userData');
        // localStorage.removeItem('responses');
        // Handle the response
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            const error = await response.text();
            console.error('Error submitting form:', error);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

function generateReport(natural_scores, adaptado_scores) {
    destroyAllCharts();

    window.scrollTo({top: 0});
    if(!natural_scores) return;

    document.getElementById("userName").innerText = userData.name;
    document.getElementById("userSurname").innerText = userData.surname;
    document.getElementById("userEmail").innerText = userData.email;
    document.getElementById("userDate").innerText = userData.date;

    const chartData = [natural_scores.D, natural_scores.I, natural_scores.S, natural_scores.C];
    const chartData2 = [adaptado_scores.D, adaptado_scores.I, adaptado_scores.S, adaptado_scores.C];
    const chartLabels = ["Dominância", "Influência", "Estabilidade", "Conformidade"];
    const chartColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

    const createChart = (contextId, label, data) => {
        const ctx = document.getElementById(contextId).getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: chartLabels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: chartColors
                }]
            },
            options: {
                // scales: {
                //     y: {
                //         min: 0,
                //         max: 100
                //     }
                // },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'start',
                        formatter: (value) => value,
                        color: '#444'
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
        
    };

    createChart("naturalChart", "Comportamento Natural", chartData);
    createChart("adaptedChart", "Comportamento Adaptado", chartData2);

    const ctx = document.getElementById("comparisonChart").getContext("2d");
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: "Comportamento Natural",
                    data: chartData,
                    backgroundColor: "rgba(5, 150, 0, 0.2)"
                },
                {
                    label: "Comportamento Adaptado",
                    data: chartData2,
                    backgroundColor: "rgba(0, 87, 168, 0.2)"
                }
            ]
        },
        options: {
            // scales: {
            //     r: {
            //         min: 0,
            //         max: 100
            //     }
            // },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    const workEnvironment = getHighestScoreDescription(natural_scores, workEnvironmentTexts);
    document.getElementById("profileSummary").innerText = workEnvironment;

    const userProfile = determineUserProfile(natural_scores);
    const motivators = motivatorsByDimension[userProfile];
    const demotivators = demotivatorsByDimension[userProfile];

    document.getElementById("motivators").innerHTML = motivators.map(item => `<li>${item}</li>`).join("");
    document.getElementById("demotivators").innerHTML = demotivators.map(item => `<li>${item}</li>`).join("");

    const developmentSuggestions = getDevelopmentSuggestions(userProfile);
    document.getElementById("developmentSuggestions").innerHTML = developmentSuggestions.map(item => `<li>${item}</li>`).join("");

    const idealEnvironment = determineWorkEnvironment(natural_scores);
    document.getElementById("idealWorkEnvironment").innerHTML = idealEnvironment.map(item => `<li>${item}</li>`).join("");

    submitForm(natural_scores, adaptado_scores);

}

function getHighestScoreDescription(scores, textMapping) {
    const highestScoreKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return textMapping[highestScoreKey].high;
}

function determineUserProfile(scores) {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function getDevelopmentSuggestions(profileKey) {
    const suggestions = {
        D: ["Aprimore sua paciência", "Foque em escutar os outros", "Desenvolva habilidades de colaboração"],
        I: ["Pratique o foco e a concentração", "Desenvolva sua habilidade de análise crítica", "Foque em concluír tarefas"],
        S: ["Aprenda a lidar com mudanças", "Desenvolva a assertividade", "Explore novas abordagens e ideias"],
        C: ["Cultive a flexibilidade", "Encoraje o pensamento inovador", "Seja aberto a diferentes opções"]
    };
    return suggestions[profileKey] || [];
}

function determineWorkEnvironment(scores) {
    const envTexts = {
        D: getTextForScore(scores.D, workEnvironmentTexts.D),
        I: getTextForScore(scores.I, workEnvironmentTexts.I),
        S: getTextForScore(scores.S, workEnvironmentTexts.S),
        C: getTextForScore(scores.C, workEnvironmentTexts.C)
    };

    return [envTexts.D, envTexts.I, envTexts.S, envTexts.C]
}

function getTextForScore(score, texts) {
    if (score <= 3) {
        return texts.low;
    } else if (score <= 6) {
        return texts.medium;
    } else if (score <= 9) {
        return texts.high;
    } else {
        return texts.veryHigh;
    }
}

document.getElementById('userInfoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    startAssessment();
});

document.getElementById('assessmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('assessmentForm'));
    const scores = processResponses(formData);

    if (scores) {
        generateReport(scores.natural_scores, scores.adaptado_scores);
    }
});

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function resetLocalStorage() {
    localStorage.removeItem('userData');
    localStorage.removeItem('responses');
    localStorage.removeItem('page');
}

function testGenerateReport() {
    // Test user data
    userData = {
        name: "Teste",
        surname: "Usuário",
        email: "teste@exemplo.com",
        date: new Date().toISOString().replace("T", " ").split(".")[0].toString().replace("'", ""),
    };

    const dWords = ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado"];
    const iWords = ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador"];
    const sWords = ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo"];
    const cWords = ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso"];

    // Generate random responses for testing
    const formData = new FormData();
    const allWords = [...dWords, ...iWords, ...sWords, ...cWords];

    for (let i = 0; i < 24; i++) {
        let most = getRandomElement(allWords);
        let least = getRandomElement(allWords);

        // Ensure most and least are not the same
        while (most === least) {
            least = getRandomElement(allWords);
        }

        formData.append(`most-${i}`, most);
        formData.append(`least-${i}`, least);
    }

    // Update the page to the report view
    localStorage.setItem("page", "2"); // Set the report page state
    document.getElementById('intro').style.display = "none";
    document.getElementById('assessmentContainer').style.display = "none";
    document.getElementById('report').style.display = "block";

    // Process the generated test data and render the report
    const scores = processResponses(formData);
    if (scores) {
        generateReport(scores.natural_scores, scores.adaptado_scores);
    } else {
        console.error("Error: Invalid test data generated.");
    }
}


// testGenerateReport();
