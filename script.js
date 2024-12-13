let userData = {};

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
    const form = document.getElementById('userInfoForm');
    const name = form.name.value.trim();
    const surname = form.surname.value.trim();
    const email = form.email.value.trim();

    if (name && surname && validateEmail(email)) {
        userData.name = name;
        userData.surname = surname;
        userData.email = email;
        userData.date = new Date().toLocaleDateString();

        document.getElementById('intro').style.display = "none";
        document.getElementById('assessmentContainer').style.display = "block";
        generateQuestions();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
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
}

function processResponses(formData) {
    let scores = { D: 0, I: 0, S: 0, C: 0 };

    const dWords = ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado", "Confrontador", "Decisivo", "Independente", "Audacioso", "Assertivo", "Corajoso", "Orientado a resultados", "Líder natural", "Proativo", "Focado", "Persistente", "Organizado", "Pragmático", "Audaz", "Competitivo", "Ambicioso", "Decisivo", "Direto", "Focado em Resultados"];
    const iWords = ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador", "Carismático", "Influente", "Empático", "Expressivo", "Enérgico", "Espontâneo", "Motivador", "Inspirador", "Entusiasta", "Criativo", "Comunicativo", "Visionário", "Amigável", "Enérgico", "Carismático", "Encantador", "Influenciador", "Entusiasta", "Empático"];
    const sWords = ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo", "Reservado", "Tolerante", "Fiável", "Sossegado", "Solidário", "Estável", "Apoiante", "Harmonioso", "Acolhedor", "Paciente", "Tolerante", "Calmo", "Leal", "Flexível", "Metódico", "Paciente", "Estável", "Colaborativo", "Adaptável"];
    const cWords = ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso", "Detalhista", "Preciso", "Rigoroso", "Metódico", "Pragmático", "Objetivo", "Estruturado", "Preciso", "Cuidadoso", "Determinante", "Meticuloso", "Perfeccionista", "Disciplinado", "Estratégico", "Cauteloso", "Conservador", "Analítico", "Racional", "Minucioso"];

    for (let i = 0; i < 24; i++) {
        let most = formData.get(`most-${i}`);
        let least = formData.get(`least-${i}`);

        if(!most || !least) {
            alert('Todas as perguntas devem ser preenchidas para prosseguir!')
            document.querySelector(`[name="most-${i}"]`).focus(); // Focus on the "most" field
            return null;
        }

        // Validation: Check if most and least are the same
        if (most === least) {
            alert(`Os valores "Mais" e "Menos" não podem ser iguais na pergunta ${i + 1}.`);
            document.querySelector(`[name="most-${i}"]`).focus(); // Focus on the "most" field
            return null; // Stop processing and exit
        }

        if (dWords.includes(most)) scores.D += 2;
        if (dWords.includes(least)) scores.D -= 1;

        if (iWords.includes(most)) scores.I += 2;
        if (iWords.includes(least)) scores.I -= 1;

        if (sWords.includes(most)) scores.S += 2;
        if (sWords.includes(least)) scores.S -= 1;

        if (cWords.includes(most)) scores.C += 2;
        if (cWords.includes(least)) scores.C -= 1;
    }
    return scores;
}
function generateReport(formData) {
    const scores = processResponses(formData);

    if(!scores) return;

    document.getElementById("assessmentContainer").style.display = "none";
    document.getElementById("report").style.display = "block";

    document.getElementById("userName").innerText = userData.name;
    document.getElementById("userSurname").innerText = userData.surname;
    document.getElementById("userEmail").innerText = userData.email;
    document.getElementById("userDate").innerText = userData.date;

    const chartData = [scores.D, scores.I, scores.S, scores.C];
    const chartData2 = chartData
    const chartLabels = ["Dominância", "Influência", "Estabilidade", "Conformidade"];
    const chartColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
    
    console.log(scores);

    const createChart = (contextId, label, chartData) => {
        const ctx = document.getElementById(contextId).getContext("2d");
        new Chart(ctx, {
        type: "bar",
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: chartData,
                backgroundColor: chartColors
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 30
                }
            },
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
    createChart("comparisonChart", "Comparação", chartData.map((item, index) => item - chartData2[index]));

    const workEnvironment = getHighestScoreDescription(scores, workEnvironmentTexts);
    document.getElementById("profileSummary").innerText = workEnvironment;

    const userProfile = determineUserProfile(scores);
    const motivators = motivatorsByDimension[userProfile];
    const demotivators = demotivatorsByDimension[userProfile];

    document.getElementById("motivators").innerHTML = motivators.map(item => `<li>${item}</li>`).join("");
    document.getElementById("demotivators").innerHTML = demotivators.map(item => `<li>${item}</li>`).join("");

    const developmentSuggestions = getDevelopmentSuggestions(userProfile);
    document.getElementById("developmentSuggestions").innerHTML = developmentSuggestions.map(item => `<li>${item}</li>`).join("");

    const idealEnvironment = determineWorkEnvironment(scores);
    console.log(idealEnvironment)
    document.getElementById("idealWorkEnvironment").innerHTML = idealEnvironment.map(item => `<li>${item}</li>`).join("");

    

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




document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    startAssessment();
});

document.getElementById('assessmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateReport(new FormData(document.getElementById('assessmentForm')));
});

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function testGenerateReport() {
    userData = {
        name: "Teste",
        surname: "Usuário",
        email: "teste@exemplo.com",
        date: new Date().toLocaleDateString()
    };

    const responses = {
        D: ["Agressivo", "Decidido", "Autoritário", "Competitivo", "Determinado", "Confrontador", "Decisivo", "Independente", "Audacioso", "Assertivo", "Corajoso", "Orientado a resultados", "Líder natural", "Proativo", "Focado", "Persistente", "Organizado", "Pragmático", "Audaz", "Competitivo", "Ambicioso", "Decisivo", "Direto", "Focado em Resultados"],
        I: ["Amigável", "Persuasivo", "Sociável", "Entusiasta", "Inspirador", "Carismático", "Influente", "Empático", "Expressivo", "Enérgico", "Espontâneo", "Motivador", "Inspirador", "Entusiasta", "Criativo", "Comunicativo", "Visionário", "Amigável", "Enérgico", "Carismático", "Encantador", "Influenciador", "Entusiasta", "Empático"],
        S: ["Calmo", "Paciente", "Leal", "Compreensivo", "Tranquilo", "Reservado", "Tolerante", "Fiável", "Sossegado", "Solidário", "Estável", "Apoiante", "Harmonioso", "Acolhedor", "Paciente", "Tolerante", "Calmo", "Leal", "Flexível", "Metódico", "Paciente", "Estável", "Colaborativo", "Adaptável"],
        C: ["Meticuloso", "Cuidadoso", "Analítico", "Organizado", "Cauteloso", "Detalhista", "Preciso", "Rigoroso", "Metódico", "Pragmático", "Objetivo", "Estruturado", "Preciso", "Cuidadoso", "Determinante", "Meticuloso", "Perfeccionista", "Disciplinado", "Estratégico", "Cauteloso", "Conservador", "Analítico", "Racional", "Minucioso"]
    };

    const formData = new FormData();
    const allWords = [...responses.D, ...responses.I, ...responses.S, ...responses.C];

    for (let i = 0; i < 24; i++) {
        let most = getRandomElement(allWords);
        let least = getRandomElement(allWords);

        while (most === least) {
            least = getRandomElement(allWords);
    }

        formData.append(`most-${i}`, most);
        formData.append(`least-${i}`, least);
    }
    document.getElementById('intro').style.display = "none";
    document.getElementById('assessmentContainer').style.display = "none";

    document.getElementById('report').style.display = "block";

    generateReport(formData);
}

// testGenerateReport();
