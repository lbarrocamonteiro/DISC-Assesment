
const workEnvironmentTexts = {
     D: {
        low: "Prefere trabalhar em ambientes onde os conflitos são minimizados e a tomada de decisão é alcançada por consenso e cooperação. Estes contextos oferecem tranquilidade e foco no trabalho coletivo, proporcionando segurança na gestão de desafios diários.",
        medium: "Gosta de ambientes desafiadores, mas que disponibilizam suporte adequado na tomada de decisões. Procura contextos onde a sua capacidade de resolver problemas seja valorizada, sem abrir mão de orientações claras quando necessário.",
        high: "Prefere ambientes competitivos e orientados para resultados, onde tenha liberdade para tomar decisões rápidas e impactantes. Estes contextos alimentam a sua motivação por alcançar metas desafiadoras e superar adversidades com agilidade.",
        veryHigh: "Exige trabalhar em ambientes de alta pressão e desafios constantes, onde possa exercer liderança e tomar decisões de forma independente. Neste tipo de contexto, a sua busca por resultados é uma prioridade absoluta, e a autonomia é essencial."
    },
    I: {
        low: "Prefere ambientes calmos e reservados, com interações sociais limitadas e foco no trabalho individual. Estes cenários permitem maior concentração e evitam distrações, criando um espaço ideal para desempenhos mais introspectivos e detalhados.",
        medium: "Valoriza ambientes colaborativos que equilibrem momentos de trabalho individual e interação social. Gosta de contextos onde possa trocar ideias de forma estruturada, mas sem que as dinâmicas grupais se tornem excessivas ou desorganizadas.",
        high: "Prefere ambientes vibrantes e criativos, com muitas oportunidades de interagir com colegas e explorar ideias. Este tipo de cenário inspira inovação e mantém a sua energia elevada, favorecendo a troca constante de conhecimento.",
        veryHigh: "Exige contextos dinâmicos e sociais, onde a criatividade e a expressão pessoal sejam altamente incentivadas. Ambientes que promovem interação frequente e atividades coletivas são essenciais para o seu pleno desenvolvimento."
    },
    S: {
        low: "Trabalha melhor em ambientes que introduzem mudanças de forma bem estruturada e previsível. Estes contextos oferecem segurança e ajudam a adaptar-se gradualmente a novos processos sem sobressaltos ou pressões desnecessárias.",
        medium: "Prefere ambientes equilibrados, onde existam rotinas claras e um senso de estabilidade. Estes cenários permitem-lhe trabalhar com eficiência e manter um sentimento de conforto e confiança no dia a dia.",
        high: "Procura ambientes tranquilos e previsíveis, com um forte suporte por parte de colegas e líderes. Este tipo de contexto promove uma sensação de pertença e permite concentrar-se em tarefas de forma mais focada.",
        veryHigh: "Exige trabalhar em ambientes altamente estáveis, caracterizados por baixa pressão e relações harmoniosas. Gosta de contextos onde a previsibilidade e o apoio sejam constantes, promovendo tranquilidade e confiança."
    },
    C: {
        low: "Prefere ambientes flexíveis, com poucas regras e uma estrutura mínima, onde possa explorar abordagens criativas sem restrições rigorosas. Estes contextos favorecem a inovação e a autonomia no trabalho diário.",
        medium: "Valoriza ambientes organizados, mas que permitam algum grau de liberdade criativa. Este equilíbrio entre estrutura e flexibilidade é ideal para garantir qualidade e promover ideias inovadoras.",
        high: "Prefere trabalhar em ambientes altamente organizados, com processos claros e um foco constante em qualidade e precisão. Este tipo de cenário garante que o trabalho seja realizado com excelência e eficiência.",
        veryHigh: "Exige ambientes rigorosamente estruturados, com padrões de qualidade elevados e análises detalhadas em todas as etapas. Estes contextos permitem-lhe aplicar o seu rigor técnico e entregar resultados de elevada fiabilidade."
    }
};
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
