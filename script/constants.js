
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

export { workEnvironmentTexts, motivatorsByDimension, demotivatorsByDimension }
