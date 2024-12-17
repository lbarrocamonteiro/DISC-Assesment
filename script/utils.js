// utils.js
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveResponseInRealTime(event) {
    const savedResponses = JSON.parse(localStorage.getItem("responses")) || {};
    savedResponses[event.target.name] = event.target.value;
    localStorage.setItem("responses", JSON.stringify(savedResponses));
}

function getHighestScoreDescription(scores, textMapping) {
    const highestKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return textMapping[highestKey]?.high || "Descrição não disponível";
}

function determineUserProfile(scores) {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function getDevelopmentSuggestions(profileKey) {
    const suggestions = {
        D: ["Aprimore sua paciência", "Foque em escutar os outros", "Desenvolva habilidades de colaboração"],
        I: ["Pratique o foco e a concentração", "Desenvolva sua habilidade de análise crítica", "Foque em concluir tarefas"],
        S: ["Aprenda a lidar com mudanças", "Desenvolva a assertividade", "Explore novas abordagens e ideias"],
        C: ["Cultive a flexibilidade", "Encoraje o pensamento inovador", "Seja aberto a diferentes opções"]
    };

    return suggestions[profileKey] || ["Nenhuma sugestão disponível"];
}

function determineWorkEnvironment(scores, workEnvironmentTexts) {
    return Object.keys(scores).map(key => {
        const score = scores[key];
        const environment = workEnvironmentTexts[key]; // Ensure key exists
        if (!environment) return null;

        if (score <= 25) return environment.low;
        if (score <= 50) return environment.medium;
        if (score <= 75) return environment.high;
        return environment.veryHigh;
    }).filter(Boolean); // Filter out null or undefined values
}

export { validateEmail, saveResponseInRealTime, getHighestScoreDescription, determineUserProfile, getDevelopmentSuggestions, determineWorkEnvironment };
