import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Fix: Declare global libraries to resolve 'Cannot find name' errors
declare const pdfjsLib: any;
declare const mammoth: any;
declare const marked: any;

const translations = {
    en: {
        // Step 1
        step1Title: 'Step 1: Provide Content',
        pasteTabText: 'Paste Text',
        uploadTabText: 'Upload File',
        topicTabText: 'Generate from Topic',
        loadCodeTabText: 'Load from Code',
        pastePlaceholder: 'Paste your text here to generate a quiz from it...',
        codePlaceholder: 'Paste your quiz code here...',
        loadQuizButton: 'Load Quiz',
        invalidQuizCode: 'Invalid Quiz Code. Please check the code and try again.',
        nextButton: 'Next',
        dropZoneText: 'Drag & drop a file (PDF, DOCX, JPG, PNG) or click to select',
        topicPlaceholder: 'e.g., The Roman Empire',
        generateUseTextButton: 'Generate & Use Text',
        // Step 2
        step2Title: 'Step 2: Customize Your Quiz',
        aiChooseAmountLabel: 'Let AI choose best question amount',
        numQuestionsLabel: 'Number of Questions',
        questionTypesLabel: 'Question Types (select at least one)',
        multipleChoice: 'Multiple Choice',
        trueFalse: 'True / False',
        matching: 'Matching',
        shortAnswer: 'Short Answer',
        longAnswer: 'Long Answer',
        fillInTheBlank: 'Fill in the Blank',
        correctionStyleLabel: 'Correction Style',
        immediate: 'Immediate',
        afterQuiz: 'After Quiz',
        both: 'Both',
        spacedRepetitionLabel: 'Spaced Repetition Mode',
        generateQuizButton: 'Generate Quiz',
        // Quiz Step
        reviewingQuestion: 'Reviewing',
        of: 'of',
        question: 'Question',
        maxAttemptsReached: "You've reached the maximum attempts for this question.",
        loadingMatchingGame: 'Loading matching game...',
        typeYourAnswer: 'Type your answer here...',
        submitAnswer: 'Submit Answer',
        grading: 'Grading...',
        continueToReview: 'Continue to Review',
        finishQuiz: 'Finish Quiz',
        // Results Step
        quizComplete: 'Quiz Complete!',
        score: 'Score',
        correct: 'Correct',
        reviewAnswers: 'Review Your Answers',
        yourAnswer: 'Your Answer',
        correctAnswer: 'Correct Answer',
        aiFeedback: 'AI Feedback',
        explanation: 'Explanation',
        tryAgain: 'Try Again',
        createNewQuiz: 'Create New Quiz',
        // Loading Screen
        generatingQuizLoader: 'Generating your quiz...',
        analyzingPdfLoader: 'Analyzing PDF...',
        analyzingDocxLoader: 'Analyzing DOCX...',
        analyzingImageLoader: 'Analyzing Image (OCR)...',
        researchingTopicLoader: 'Researching',
        loadingFromCode: 'Loading your quiz...',
        // Export
        export: 'Export',
        saveAsPdf: 'Save as PDF',
        generateAudio: 'Generate Audio File (.wav)',
        saveToCode: 'Save Quiz to Code',
        yourQuizCode: 'Your Quiz Code',
        copy: 'Copy',
        copied: 'Copied!',
        close: 'Close',
        generatingPdf: 'Generating PDF...',
        generatingAudioFor: 'Generating audio for question',
        combiningAudio: 'Combining audio files...',
    },
    es: {
        // Step 1
        step1Title: 'Paso 1: Proporcionar Contenido',
        pasteTabText: 'Pegar Texto',
        uploadTabText: 'Subir Archivo',
        topicTabText: 'Generar desde Tema',
        loadCodeTabText: 'Cargar desde Código',
        pastePlaceholder: 'Pega tu texto aquí para generar un cuestionario...',
        codePlaceholder: 'Pega tu código de cuestionario aquí...',
        loadQuizButton: 'Cargar Cuestionario',
        invalidQuizCode: 'Código de cuestionario inválido. Por favor, revisa el código e intenta de nuevo.',
        nextButton: 'Siguiente',
        dropZoneText: 'Arrastra y suelta un archivo (PDF, DOCX, JPG, PNG) o haz clic para seleccionar',
        topicPlaceholder: 'ej., El Imperio Romano',
        generateUseTextButton: 'Generar y Usar Texto',
        // Step 2
        step2Title: 'Paso 2: Personaliza tu Cuestionario',
        aiChooseAmountLabel: 'Dejar que la IA elija la cantidad de preguntas',
        numQuestionsLabel: 'Número de Preguntas',
        questionTypesLabel: 'Tipos de Pregunta (selecciona al menos uno)',
        multipleChoice: 'Opción Múltiple',
        trueFalse: 'Verdadero / Falso',
        matching: 'Relacionar',
        shortAnswer: 'Respuesta Corta',
        longAnswer: 'Respuesta Larga',
        fillInTheBlank: 'Rellenar el Espacio',
        correctionStyleLabel: 'Estilo de Corrección',
        immediate: 'Inmediata',
        afterQuiz: 'Después del Cuestionario',
        both: 'Ambos',
        spacedRepetitionLabel: 'Modo de Repetición Espaciada',
        generateQuizButton: 'Generar Cuestionario',
        // Quiz Step
        reviewingQuestion: 'Revisando',
        of: 'de',
        question: 'Pregunta',
        maxAttemptsReached: "Has alcanzado el máximo de intentos para esta pregunta.",
        loadingMatchingGame: 'Cargando juego de relacionar...',
        typeYourAnswer: 'Escribe tu respuesta aquí...',
        submitAnswer: 'Enviar Respuesta',
        grading: 'Calificando...',
        continueToReview: 'Continuar a la Revisión',
        finishQuiz: 'Finalizar Cuestionario',
        // Results Step
        quizComplete: '¡Cuestionario Completo!',
        score: 'Puntuación',
        correct: 'Correctas',
        reviewAnswers: 'Revisa tus Respuestas',
        yourAnswer: 'Tu Respuesta',
        correctAnswer: 'Respuesta Correcta',
        aiFeedback: 'Feedback de la IA',
        explanation: 'Explicación',
        tryAgain: 'Intentar de Nuevo',
        createNewQuiz: 'Crear Nuevo Cuestionario',
        // Loading Screen
        generatingQuizLoader: 'Generando tu cuestionario...',
        analyzingPdfLoader: 'Analizando PDF...',
        analyzingDocxLoader: 'Analizando DOCX...',
        analyzingImageLoader: 'Analizando Imagen (OCR)...',
        researchingTopicLoader: 'Investigando',
        loadingFromCode: 'Cargando tu cuestionario...',
        // Export
        export: 'Exportar',
        saveAsPdf: 'Guardar como PDF',
        generateAudio: 'Generar Archivo de Audio (.wav)',
        saveToCode: 'Guardar Cuestionario en Código',
        yourQuizCode: 'Tu Código de Cuestionario',
        copy: 'Copiar',
        copied: '¡Copiado!',
        close: 'Cerrar',
        generatingPdf: 'Generando PDF...',
        generatingAudioFor: 'Generando audio para la pregunta',
        combiningAudio: 'Combinando archivos de audio...',
    },
    fr: {
        // Step 1
        step1Title: 'Étape 1: Fournir le Contenu',
        pasteTabText: 'Coller le Texte',
        uploadTabText: 'Télécharger un Fichier',
        topicTabText: 'Générer à partir d\'un Sujet',
        loadCodeTabText: 'Charger depuis Code',
        pastePlaceholder: 'Collez votre texte ici pour générer un quiz...',
        codePlaceholder: 'Collez votre code de quiz ici...',
        loadQuizButton: 'Charger le Quiz',
        invalidQuizCode: 'Code de quiz invalide. Veuillez vérifier le code et réessayer.',
        nextButton: 'Suivant',
        dropZoneText: 'Glissez-déposez un fichier (PDF, DOCX, JPG, PNG) ou cliquez pour sélectionner',
        topicPlaceholder: 'ex., L\'Empire Romain',
        generateUseTextButton: 'Générer et Utiliser le Texte',
        // Step 2
        step2Title: 'Étape 2: Personnalisez votre Quiz',
        aiChooseAmountLabel: "Laisser l'IA choisir le nombre de questions",
        numQuestionsLabel: 'Nombre de Questions',
        questionTypesLabel: 'Types de Questions (sélectionnez-en au moins un)',
        multipleChoice: 'Choix Multiple',
        trueFalse: 'Vrai / Faux',
        matching: 'Association',
        shortAnswer: 'Réponse Courte',
        longAnswer: 'Réponse Longue',
        fillInTheBlank: 'Texte à Trous',
        correctionStyleLabel: 'Style de Correction',
        immediate: 'Immédiate',
        afterQuiz: 'Après le Quiz',
        both: 'Les Deux',
        spacedRepetitionLabel: 'Mode de Répétition Espacée',
        generateQuizButton: 'Générer le Quiz',
        // Quiz Step
        reviewingQuestion: 'En révision',
        of: 'de',
        question: 'Question',
        maxAttemptsReached: "Vous avez atteint le nombre maximum de tentatives pour cette question.",
        loadingMatchingGame: "Chargement du jeu d'association...",
        typeYourAnswer: 'Tapez votre réponse ici...',
        submitAnswer: 'Soumettre la Réponse',
        grading: 'Évaluation...',
        continueToReview: 'Continuer vers la Révision',
        finishQuiz: 'Terminer le Quiz',
        // Results Step
        quizComplete: 'Quiz Terminé !',
        score: 'Score',
        correct: 'Correctes',
        reviewAnswers: 'Révisez vos Réponses',
        yourAnswer: 'Votre Réponse',
        correctAnswer: 'Réponse Correcte',
        aiFeedback: 'Feedback de l\'IA',
        explanation: 'Explication',
        tryAgain: 'Réessayer',
        createNewQuiz: 'Créer un Nouveau Quiz',
        // Loading Screen
        generatingQuizLoader: 'Génération de votre quiz...',
        analyzingPdfLoader: 'Analyse du PDF...',
        analyzingDocxLoader: 'Analyse du DOCX...',
        analyzingImageLoader: "Analyse de l'Image (OCR)...",
        researchingTopicLoader: 'Recherche sur',
        loadingFromCode: 'Chargement de votre quiz...',
        // Export
        export: 'Exporter',
        saveAsPdf: 'Enregistrer en PDF',
        generateAudio: 'Générer un Fichier Audio (.wav)',
        saveToCode: 'Enregistrer le Quiz en Code',
        yourQuizCode: 'Votre Code de Quiz',
        copy: 'Copier',
        copied: 'Copié !',
        close: 'Fermer',
        generatingPdf: 'Génération du PDF...',
        generatingAudioFor: "Génération de l'audio pour la question",
        combiningAudio: "Combinaison des fichiers audio...",
    }
};

const AppLogo = () => (
    <svg viewBox="0 0 100 100" className="loading-icon-svg">
        <defs>
            <linearGradient id="grad-brain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#1cb0f6', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#85d837', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path fill="url(#grad-brain)" d="M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C58.5,90 66.5,87.3 73,82.8 C75.9,86.9 80.6,90 86,90 C90.4,90 94.2,87.8 96.5,84.5 C95.8,82.3 95.3,80 95,77.6 C97.6,73.1 99,68 99,62.5 C99,34.6 77,10 50,10 Z M50,18 C72.1,18 90,35.9 90,57.5 C90,62.2 88.9,66.6 87,70.5 C84.8,69.5 82.5,69 80,69 C73.4,69 67.5,72.4 64,77.8 C60,82.6 54.1,82.1 50,82 C27.9,82 18,64.1 18,42 C18,28.7 32.7,18 50,18 Z"></path>
        <text x="60" y="78" fontFamily="Nunito, sans-serif" fontSize="28" fontWeight="800" fill="#ffffff" textAnchor="middle">2.0</text>
    </svg>
);


const App = () => {
    const [step, setStep] = React.useState('input'); // 'input', 'options', 'quiz', 'results'
    const [contextText, setContextText] = React.useState('');
    const [quizOptions, setQuizOptions] = React.useState({
        numQuestions: 10,
        questionTypes: ['multiple-choice'],
        correctionStyle: 'after',
        spacedRepetition: false,
        aiChoosesAmount: false,
    });
    const [quizData, setQuizData] = React.useState(null);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [loadingState, setLoadingState] = React.useState({
        isLoading: false,
        text: '',
        context: null,
    });
    const [language, setLanguage] = React.useState('en');
    const t = (key) => translations[language][key] || key;


    const showLoader = (text, context = null) => setLoadingState({ isLoading: true, text, context });
    const hideLoader = () => setLoadingState({ isLoading: false, text: '', context: null });


    const handleContextReady = (text) => {
        setContextText(text);
        setStep('options');
    };

    const handleLoadFromCode = (encodedString) => {
        showLoader(t('loadingFromCode'));

        // Use setTimeout to allow the loader to render before blocking the thread with decoding
        setTimeout(() => {
            try {
                const jsonString = atob(encodedString.trim());
                const data = JSON.parse(jsonString);

                if (data.quizData && Array.isArray(data.quizData) && data.options) {
                    setQuizData(data.quizData);
                    setQuizOptions(data.options);
                    setUserAnswers(new Array(data.quizData.length).fill(null).map(() => ({ attempts: [] })));
                    setContextText(data.contextText || '');
                    setStep('quiz');
                } else {
                    throw new Error("Invalid data structure");
                }
            } catch (error) {
                console.error("Failed to load quiz from code:", error);
                alert(t('invalidQuizCode'));
            } finally {
                hideLoader();
            }
        }, 50); // A small delay to ensure UI updates
    };


    const handleOptionsConfirm = async (options) => {
        setQuizOptions(options);
        showLoader(t('generatingQuizLoader'), contextText);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING, description: "The question text. For fill-in-the-blank, use '_____' for the blank. For match-term, use an instruction like 'Match the terms to their definitions.'" },
                        type: { type: Type.STRING, enum: options.questionTypes },
                        options: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true, description: "A list of 4 options for multiple-choice questions. Null for other types." },
                        answer: { type: Type.STRING, nullable: true, description: "The correct answer. For fill-in-the-blank, this is the word for the blank. For short/long answer, this is a model correct answer. Not used for 'match-term'." },
                        explanation: { type: Type.STRING, description: "A brief explanation of why the answer is correct." },
                        matchPairs: {
                            type: Type.ARRAY,
                            nullable: true,
                            description: "ONLY for 'match-term' questions. An array of 3 to 5 objects, each with a 'term' and a 'definition'.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    term: { type: Type.STRING },
                                    definition: { type: Type.STRING }
                                },
                                required: ['term', 'definition']
                            }
                        }
                    },
                    required: ['question', 'type', 'explanation']
                }
            };
            
            const languageMap = { en: 'English', es: 'Spanish', fr: 'French' };
            const targetLanguage = languageMap[language];

            const numQuestionsPrompt = options.aiChoosesAmount
                ? "Based on the length and complexity of the text, generate an appropriate number of questions for a comprehensive quiz. The number should be between 5 and 100."
                : `Generate a quiz with approximately ${options.numQuestions} questions.`;
            
            const prompt = `Based on the following text, ${numQuestionsPrompt}
            The entire quiz, including all questions, options (for multiple-choice), answers, and explanations, MUST be in ${targetLanguage}.
            The question types should be from this list: [${options.questionTypes.join(', ')}].
            - For 'multiple-choice', provide exactly 4 options.
            - For 'true-false', the answer must be 'True' or 'False'. 
            - For 'fill-in-the-blank', provide a sentence with '_____' as the blank, and the answer should be the word that fills it.
            - For 'match-term', the 'question' should be an instruction like "Match the following terms to their definitions". Do not provide an 'answer'. Instead, populate the 'matchPairs' field with an array of 3 to 5 objects, where each object has a 'term' and a 'definition'. Keep terms and definitions relatively short.
            - For 'short-answer' and 'long-answer', the question is a prompt and the answer is a detailed model answer derived from the text.
            Provide a brief explanation for each correct answer.

            Context Text:
            ---
            ${contextText}
            ---
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                }
            });

            const generatedQuiz = JSON.parse(response.text);
            setQuizData(generatedQuiz);
            setUserAnswers(new Array(generatedQuiz.length).fill(null).map(() => ({ attempts: [] })));
            setStep('quiz');
        } catch (error) {
            console.error("Error generating quiz:", error);
            // This will be caught by the Error Boundary
            throw new Error(`Quiz generation failed. Details: ${error.message}`);
        } finally {
            hideLoader();
        }
    };

    const handleQuizComplete = (finalAnswers) => {
        setUserAnswers(finalAnswers);
        setStep('results');
    };

    const restartQuiz = () => {
        setStep('input');
        setContextText('');
        setQuizData(null);
        setUserAnswers([]);
    };
    
    const tryAgain = () => {
        setUserAnswers(new Array(quizData.length).fill(null).map(() => ({ attempts: [] })));
        setStep('quiz');
    };

    const renderStep = () => {
        switch (step) {
            case 'input':
                return <InputStep onContextReady={handleContextReady} onLoadFromCode={handleLoadFromCode} showLoader={showLoader} hideLoader={hideLoader} t={t} />;
            case 'options':
                return <OptionsStep onConfirm={handleOptionsConfirm} t={t} />;
            case 'quiz':
                return <QuizStep quizData={quizData} onComplete={handleQuizComplete} options={quizOptions} showLoader={showLoader} hideLoader={hideLoader} t={t} language={language} contextText={contextText} />;
            case 'results':
                return <ResultsStep quizData={quizData} userAnswers={userAnswers} onRestart={restartQuiz} onTryAgain={tryAgain} showLoader={showLoader} hideLoader={hideLoader} t={t} contextText={contextText} options={quizOptions}/>;
            default:
                return <div>Error: Unknown step.</div>;
        }
    };

    return (
        <div className="container">
            <div className="language-selector">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={step === 'quiz' || step === 'results'}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                </select>
            </div>
            {loadingState.isLoading && <LoadingScreen loadingText={loadingState.text} contextText={loadingState.context} language={language} />}
            <h1>OmniQuiz 2.0</h1>
            {renderStep()}
        </div>
    );
};


const LoadingScreen = ({ loadingText, contextText, language }) => {
    const [displayEmoji, setDisplayEmoji] = React.useState(null);
    const [displayFact, setDisplayFact] = React.useState('');

    const APP_FUN_FACTS = {
        en: [
            "You can export your quiz as a PDF to study offline!",
            "Try the 'Generate from Topic' feature to learn about something new.",
            "The app can generate audio files from your quiz for on-the-go learning.",
            "Our AI can grade short-answer questions, not just multiple choice.",
            "You can upload PDF, DOCX, and even image files to create a quiz.",
            "Challenge yourself with up to 100 questions in a single quiz."
        ],
        es: [
            "¡Puedes exportar tu cuestionario como PDF para estudiar sin conexión!",
            "Prueba la función 'Generar desde Tema' para aprender sobre algo nuevo.",
            "La aplicación puede generar archivos de audio de tu cuestionario para aprender sobre la marcha.",
            "Nuestra IA puede calificar preguntas de respuesta corta, no solo de opción múltiple.",
            "Puedes subir archivos PDF, DOCX e incluso imágenes para crear un cuestionario.",
            "Desafíate a ti mismo con hasta 100 preguntas en un solo cuestionario."
        ],
        fr: [
            "Vous pouvez exporter votre quiz au format PDF pour étudier hors ligne !",
            "Essayez la fonction 'Générer à partir d'un sujet' pour apprendre quelque chose de nouveau.",
            "L'application peut générer des fichiers audio à partir de votre quiz pour un apprentissage nomade.",
            "Notre IA peut noter les questions à réponse courte, pas seulement les choix multiples.",
            "Vous pouvez télécharger des fichiers PDF, DOCX et même des images pour créer un quiz.",
            "Relevez le défi avec jusqu'à 100 questions dans un seul quiz."
        ]
    };

    React.useEffect(() => {
        let isMounted = true;
        
        const getDynamicContent = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const languageMap = { en: 'English', es: 'Spanish', fr: 'French' };
                const targetLanguage = languageMap[language];

                // Fetch emoji
                const emojiPromise = ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Based on the following text, what is a single emoji that best represents the main topic? Respond with ONLY the emoji character itself and nothing else.\n\nText: "${contextText.substring(0, 500)}"`,
                });

                // Fetch fun fact
                const factPromise = ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Analyze the following text and extract a single, interesting, self-contained "fun fact". The fact must be a single, complete sentence in ${targetLanguage}. Do not add any introductory phrases like "Did you know...". Just provide the sentence.\n\nText: "${contextText}"`,
                });
                
                const [emojiResponse, factResponse] = await Promise.all([emojiPromise, factPromise]);
                
                if (isMounted) {
                    setDisplayEmoji(emojiResponse.text.trim());
                    setDisplayFact(factResponse.text.trim());
                }
            } catch (error) {
                console.error("Error fetching dynamic loading content:", error);
                if (isMounted) {
                     // Fallback to app facts if AI fails
                    const factsInLanguage = APP_FUN_FACTS[language];
                    setDisplayFact(factsInLanguage[Math.floor(Math.random() * factsInLanguage.length)]);
                }
            }
        };

        if (contextText) {
            getDynamicContent();
        } else {
            // Pick a random app fact
            const factsInLanguage = APP_FUN_FACTS[language];
            setDisplayFact(factsInLanguage[Math.floor(Math.random() * factsInLanguage.length)]);
        }
        
        return () => { isMounted = false; };
    }, [contextText, language]);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-icon">
                    {displayEmoji ? <span>{displayEmoji}</span> : <AppLogo />}
                </div>
                <p className="loading-text">{loadingText}</p>
            </div>
            <div className="loading-fact">
                <p>{displayFact}</p>
            </div>
        </div>
    );
};


const InputStep = ({ onContextReady, onLoadFromCode, showLoader, hideLoader, t }) => {
    const [activeTab, setActiveTab] = React.useState('paste');
    const [pastedText, setPastedText] = React.useState('');
    const [topic, setTopic] = React.useState('');
    const [quizCode, setQuizCode] = React.useState('');
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const handleFile = async (file) => {
        if (!file) return;
        
        try {
            if (file.type === 'application/pdf') {
                showLoader(t('analyzingPdfLoader'));
                const reader = new FileReader();
                reader.onload = async (e) => {
                    if (e.target.result instanceof ArrayBuffer) {
                        const typedarray = new Uint8Array(e.target.result);
                        const pdf = await pdfjsLib.getDocument(typedarray).promise;
                        let text = '';
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            text += content.items.map(item => item.str).join(' ');
                        }
                        onContextReady(text);
                    }
                     hideLoader();
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                showLoader(t('analyzingDocxLoader'));
                const reader = new FileReader();
                reader.onload = async (e) => {
                    if (e.target.result instanceof ArrayBuffer) {
                        const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                        onContextReady(result.value);
                    }
                    hideLoader();
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type.startsWith('image/')) {
                 showLoader(t('analyzingImageLoader'));
                const reader = new FileReader();
                reader.onload = async (e) => {
                    if (typeof e.target.result === 'string') {
                        const base64Data = e.target.result.split(',')[1];
                        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                        const response = await ai.models.generateContent({
                            model: 'gemini-2.5-flash',
                            contents: { parts: [
                                { inlineData: { mimeType: file.type, data: base64Data } },
                                { text: "Extract all text from this image." }
                            ]},
                        });
                        onContextReady(response.text);
                    }
                    hideLoader();
                };
                reader.readAsDataURL(file);
            } else {
                alert('Unsupported file type. Please upload a PDF, DOCX, or image file.');
            }
        } catch (error) {
            console.error("Error processing file:", error);
            throw new Error(`File processing failed. Details: ${error.message}`);
        }
    };

    const handleGenerateFromTopic = async () => {
        if (!topic.trim()) return;
        showLoader(`${t('researchingTopicLoader')} "${topic}"...`);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Write a detailed summary about "${topic}". The summary should be comprehensive and suitable for generating a quiz. Include key facts, definitions, and concepts.`,
            });
            setPastedText(response.text);
            setActiveTab('paste');
        } catch (error) {
            console.error("Error generating from topic:", error);
            throw new Error(`Topic generation failed. Details: ${error.message}`);
        } finally {
            hideLoader();
        }
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const SearchIcon = () => (
        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    );

    const PasteIcon = () => (
        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
    );
    
    const CodeIcon = () => (
        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    );

    return (
        <div>
            <h2>{t('step1Title')}</h2>
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'paste' ? 'active' : ''}`} onClick={() => setActiveTab('paste')}>{t('pasteTabText')}</button>
                <button className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>{t('uploadTabText')}</button>
                <button className={`tab-button ${activeTab === 'topic' ? 'active' : ''}`} onClick={() => setActiveTab('topic')}>{t('topicTabText')}</button>
                <button className={`tab-button ${activeTab === 'load' ? 'active' : ''}`} onClick={() => setActiveTab('load')}>{t('loadCodeTabText')}</button>
            </div>
            
            {activeTab === 'paste' && (
                <div className="tab-content">
                    <div className="input-group">
                        <div className="input-wrapper textarea-wrapper">
                            <PasteIcon />
                            <textarea 
                                placeholder={t('pastePlaceholder')}
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                aria-label="Paste text for quiz"
                            ></textarea>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" onClick={() => onContextReady(pastedText)} disabled={!pastedText.trim()}>{t('nextButton')}</button>
                    </div>
                </div>
            )}
            {activeTab === 'upload' && (
                <div className="tab-content">
                    <div 
                        role="button"
                        tabIndex="0"
                        className={`drop-zone ${isDragging ? 'active' : ''}`}
                        onClick={() => fileInputRef.current.click()}
                        onKeyPress={(e) => e.key === 'Enter' && fileInputRef.current.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                        onDrop={handleDrop}
                    >
                        <p>{t('dropZoneText')}</p>
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFile(e.target.files[0])} style={{display: 'none'}} accept=".pdf,.docx,.jpg,.jpeg,.png"/>
                    </div>
                </div>
            )}
            {activeTab === 'topic' && (
                <div className="tab-content">
                    <div className="input-group">
                         <div className="input-wrapper">
                            <SearchIcon />
                            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t('topicPlaceholder')}/>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" onClick={handleGenerateFromTopic} disabled={!topic.trim()}>{t('generateUseTextButton')}</button>
                    </div>
                </div>
            )}
            {activeTab === 'load' && (
                 <div className="tab-content">
                    <div className="input-group">
                        <div className="input-wrapper textarea-wrapper">
                            <CodeIcon />
                            <textarea 
                                placeholder={t('codePlaceholder')}
                                value={quizCode}
                                onChange={(e) => setQuizCode(e.target.value)}
                                aria-label="Paste quiz code"
                            ></textarea>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary" onClick={() => onLoadFromCode(quizCode)} disabled={!quizCode.trim()}>{t('loadQuizButton')}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const OptionsStep = ({ onConfirm, t }) => {
    const [numQuestions, setNumQuestions] = React.useState(10);
    const [aiChoosesAmount, setAiChoosesAmount] = React.useState(false);
    const [questionTypes, setQuestionTypes] = React.useState(['multiple-choice']);
    const [correctionStyle, setCorrectionStyle] = React.useState('after');
    const [spacedRepetition, setSpacedRepetition] = React.useState(false);

    const allQuestionTypes = [
        { id: 'multiple-choice', label: t('multipleChoice') },
        { id: 'true-false', label: t('trueFalse') },
        { id: 'match-term', label: t('matching') },
        { id: 'short-answer', label: t('shortAnswer') },
        { id: 'long-answer', label: t('longAnswer') },
        { id: 'fill-in-the-blank', label: t('fillInTheBlank') },
    ];

    const handleTypeChange = (typeId) => {
        setQuestionTypes(prev => 
            prev.includes(typeId) 
                ? prev.filter(t => t !== typeId) 
                : [...prev, typeId]
        );
    };

    return (
        <div>
            <h2>{t('step2Title')}</h2>
             <div className="input-group">
                <div className="toggle-group">
                    <span className="toggle-label">{t('aiChooseAmountLabel')}</span>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={aiChoosesAmount} onChange={(e) => setAiChoosesAmount(e.target.checked)} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="numQuestions">{t('numQuestionsLabel')}: {numQuestions}</label>
                <input type="range" id="numQuestions" min="5" max="100" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} disabled={aiChoosesAmount}/>
            </div>
            <div className="input-group">
                <label>{t('questionTypesLabel')}</label>
                 <div className="custom-choice-container" role="group" aria-label="Question types">
                    {allQuestionTypes.map(type => (
                        <div key={type.id} className="custom-choice">
                            <input type="checkbox" id={type.id} name="questionType" checked={questionTypes.includes(type.id)} onChange={() => handleTypeChange(type.id)} />
                            <label htmlFor={type.id}>{type.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-group">
                <label>{t('correctionStyleLabel')}</label>
                <div className="custom-choice-container" role="radiogroup">
                     <div className="custom-choice">
                        <input type="radio" id="immediate" name="correction" value="immediate" checked={correctionStyle === 'immediate'} onChange={(e) => setCorrectionStyle(e.target.value)} />
                        <label htmlFor="immediate">{t('immediate')}</label>
                    </div>
                    <div className="custom-choice">
                        <input type="radio" id="after" name="correction" value="after" checked={correctionStyle === 'after'} onChange={(e) => setCorrectionStyle(e.target.value)} />
                        <label htmlFor="after">{t('afterQuiz')}</label>
                    </div>
                     <div className="custom-choice">
                        <input type="radio" id="both" name="correction" value="both" checked={correctionStyle === 'both'} onChange={(e) => setCorrectionStyle(e.target.value)} />
                        <label htmlFor="both">{t('both')}</label>
                    </div>
                </div>
            </div>
            <div className="input-group">
                <div className="toggle-group">
                    <span className="toggle-label">{t('spacedRepetitionLabel')}</span>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={spacedRepetition} onChange={(e) => setSpacedRepetition(e.target.checked)} />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <div className="button-group">
                <button className="btn btn-primary" style={{width: 'auto'}} onClick={() => onConfirm({numQuestions, questionTypes, correctionStyle, spacedRepetition, aiChoosesAmount})} disabled={questionTypes.length === 0}>{t('generateQuizButton')}</button>
            </div>
        </div>
    );
};

const QuizStep = ({ quizData, onComplete, options, showLoader, hideLoader, t, language, contextText }) => {
    const { correctionStyle, spacedRepetition } = options;
    const [answers, setAnswers] = React.useState(() => new Array(quizData.length).fill(null).map(() => ({ attempts: [] })));
    
    // State for managing question flow
    const [questionPool, setQuestionPool] = React.useState(() => quizData.map((_, i) => i));
    const [poolIndex, setPoolIndex] = React.useState(0);
    const [quizPhase, setQuizPhase] = React.useState('initial'); // 'initial' or 'review'

    const currentQuestionIndex = questionPool[poolIndex];
    const currentQuestion = quizData[currentQuestionIndex];
    const numAttempts = answers[currentQuestionIndex].attempts.length;

    const [selectedOption, setSelectedOption] = React.useState(null);
    const [feedback, setFeedback] = React.useState(null);
    const [isAnswered, setIsAnswered] = React.useState(false);
    const [isGrading, setIsGrading] = React.useState(false);

    const [matchState, setMatchState] = React.useState(null);
    const [selectedTerm, setSelectedTerm] = React.useState(null);
    const [selectedDef, setSelectedDef] = React.useState(null);
    const [incorrectPair, setIncorrectPair] = React.useState(null);

    const handleAnswer = React.useCallback(async (answer) => {
        if (answer === null || (typeof answer === 'string' && answer.trim() === '') || isAnswered) return;
        
        let answerData: { text: any; isCorrect?: boolean; grade?: string; aiFeedback?: string } = { text: answer };

        if (currentQuestion.type === 'match-term') {
            answerData.isCorrect = answer === true;
        } else if (['multiple-choice', 'true-false', 'fill-in-the-blank'].includes(currentQuestion.type)) {
            answerData.isCorrect = answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
        } else if (['short-answer', 'long-answer'].includes(currentQuestion.type)) {
            setIsGrading(true);
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const languageMap = { en: 'English', es: 'Spanish', fr: 'French' };
                const targetLanguage = languageMap[language];
                const gradingSchema = {
                    type: Type.OBJECT,
                    properties: {
                        assessment: { type: Type.STRING, enum: ['correct', 'incorrect', 'partially-correct'] },
                        feedback: { type: Type.STRING, description: "A brief explanation for the assessment. For partially-correct, explain what's missing. For incorrect, explain the error." }
                    },
                    required: ['assessment', 'feedback']
                };
                const prompt = `Please assess the student's answer based on the model answer provided.
                - Model Answer: "${currentQuestion.answer}"
                - Student's Answer: "${answer}"
                - Determine if the student's answer is 'correct', 'incorrect', or 'partially-correct'.
                - 'partially-correct' means the student understood the main idea but missed some key details from the model answer.
                - Provide brief feedback explaining your assessment. The feedback MUST be in ${targetLanguage}.
                `;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: { responseMimeType: 'application/json', responseSchema: gradingSchema }
                });
                const grade = JSON.parse(response.text);
                answerData.grade = grade.assessment;
                answerData.aiFeedback = grade.feedback;
            } catch(error) {
                console.error("Error grading answer:", error);
                throw new Error(`AI grading failed. Details: ${error.message}`);
            } finally {
                setIsGrading(false);
            }
        }
        
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex].attempts.push(answerData);
        setAnswers(newAnswers);

        if (correctionStyle === 'immediate' || correctionStyle === 'both') {
            if (answerData.grade) {
                 setFeedback({ class: answerData.grade, text: `**${answerData.grade.replace('-', ' ')}!** ${answerData.aiFeedback}` });
            } else if (currentQuestion.type === 'match-term') {
                 setFeedback({ class: 'correct', text: "**Excellent!** All pairs matched correctly." });
            }
             else {
                setFeedback({
                    class: answerData.isCorrect ? 'correct' : 'incorrect',
                    text: answerData.isCorrect ? `**Correct!** ${currentQuestion.explanation}` : `**Incorrect.** The correct answer is: *${currentQuestion.answer}*. ${currentQuestion.explanation}`
                });
            }
        }
        setIsAnswered(true);
    }, [answers, currentQuestionIndex, currentQuestion, correctionStyle, isAnswered, language]);

    React.useEffect(() => {
        const question = quizData[currentQuestionIndex];
        if (question.type === 'match-term' && question.matchPairs) {
            const terms = question.matchPairs.map((p, i) => ({ id: i, text: p.term, matched: false }));
            const definitions = question.matchPairs.map((p, i) => ({ id: i, text: p.definition, matched: false }));
            for (let i = definitions.length - 1; i > 0; i--) { // Shuffle definitions
                const j = Math.floor(Math.random() * (i + 1));
                [definitions[i], definitions[j]] = [definitions[j], definitions[i]];
            }
            setMatchState({ terms, definitions });
        } else {
            setMatchState(null);
        }
        
        setSelectedOption(null);
        setFeedback(null);
        setIsAnswered(false);
        setIsGrading(false);
        setSelectedTerm(null);
        setSelectedDef(null);
        setIncorrectPair(null);
        
    }, [currentQuestionIndex, quizData]);

    React.useEffect(() => {
        if (!selectedTerm || !selectedDef) return;
        if (selectedTerm.id === selectedDef.id) { // Correct match
            setMatchState(prevState => {
                const newTerms = prevState.terms.map(t => t.id === selectedTerm.id ? { ...t, matched: true } : t);
                const newDefs = prevState.definitions.map(d => d.id === selectedDef.id ? { ...d, matched: true } : d);
                if (newTerms.every(t => t.matched)) handleAnswer(true);
                return { terms: newTerms, definitions: newDefs };
            });
        } else { // Incorrect match
            setIncorrectPair({ termId: selectedTerm.id, defId: selectedDef.id });
            setTimeout(() => setIncorrectPair(null), 800);
        }
        setSelectedTerm(null);
        setSelectedDef(null);
    }, [selectedTerm, selectedDef, handleAnswer]);


    const handleNext = () => {
        if (poolIndex < questionPool.length - 1) {
            setPoolIndex(prev => prev + 1);
        } else { // End of current pool
            if (!spacedRepetition) {
                onComplete(answers);
                return;
            }
            const reviewQueue = answers.reduce((acc, answerData, index) => {
                const latestAttempt = answerData.attempts[answerData.attempts.length - 1];
                let isCorrect = false;
                if (quizData[index].type === 'match-term' || ['multiple-choice', 'true-false', 'fill-in-the-blank'].includes(quizData[index].type)) {
                    isCorrect = latestAttempt.isCorrect;
                } else {
                    isCorrect = latestAttempt.grade === 'correct';
                }

                if (!isCorrect && answerData.attempts.length < 3) {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (reviewQueue.length > 0) {
                setQuestionPool(reviewQueue);
                setPoolIndex(0);
                setQuizPhase('review');
            } else {
                onComplete(answers);
            }
        }
    };

    const renderQuestionInput = () => {
        if (numAttempts >= 3) { // Force move on after 3 failed attempts
             setTimeout(() => handleNext(), 1500); // Give user time to see feedback
             return <p>{t('maxAttemptsReached')}</p>;
        }

        const questionType = currentQuestion.type;
        if (questionType === 'multiple-choice' || questionType === 'true-false') {
            const options = questionType === 'true-false' ? ['True', 'False'] : (currentQuestion.options || []);
            return (
                <ul className="options-list">
                    {options.map((option, index) => {
                         let btnClass = 'option-btn';
                         if (isAnswered && (correctionStyle === 'immediate' || correctionStyle === 'both')) {
                             if (option.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()) btnClass += ' correct';
                             else if (selectedOption === option) btnClass += ' incorrect';
                         } else if (selectedOption === option) btnClass += ' selected';
                        return (
                            <li key={index}>
                                <button className={btnClass} onClick={() => { if (!isAnswered) { setSelectedOption(option); handleAnswer(option); } }} disabled={isAnswered}>
                                    {option}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            );
        } else if (questionType === 'match-term') {
            if (!matchState) return <p>{t('loadingMatchingGame')}</p>;
            return (
                <div className="match-game-container">
                    <div className="match-column">
                        {matchState.terms.map(term => (
                            <button key={`term-${term.id}`} className={`match-btn ${selectedTerm?.id === term.id ? 'selected' : ''} ${term.matched ? 'correct' : ''} ${incorrectPair?.termId === term.id ? 'incorrect-selection' : ''}`}
                                onClick={() => !term.matched && setSelectedTerm(term)} disabled={term.matched}>
                                {term.text}
                            </button>
                        ))}
                    </div>
                    <div className="match-column">
                        {matchState.definitions.map(def => (
                             <button key={`def-${def.id}`} className={`match-btn ${selectedDef?.id === def.id ? 'selected' : ''} ${def.matched ? 'correct' : ''} ${incorrectPair?.defId === def.id ? 'incorrect-selection' : ''}`}
                                onClick={() => !def.matched && setSelectedDef(def)} disabled={def.matched || !selectedTerm}>
                                {def.text}
                             </button>
                        ))}
                    </div>
                </div>
            );
        } else if (['short-answer', 'long-answer', 'fill-in-the-blank'].includes(questionType)) {
             const TypeIcon = () => (
                <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
             );
             return (
                <div>
                    <div className="input-group">
                        <div className="input-wrapper textarea-wrapper">
                            <TypeIcon />
                            <textarea value={selectedOption || ''} onChange={(e) => setSelectedOption(e.target.value)}
                                placeholder={t('typeYourAnswer')} disabled={isAnswered} aria-label="Answer input" />
                        </div>
                    </div>
                    {!isAnswered && (
                        <div className="button-group">
                           <button className="btn btn-primary" onClick={() => handleAnswer(selectedOption)} disabled={!selectedOption || isGrading}>
                               {isGrading ? t('grading') : t('submitAnswer')}
                           </button>
                        </div>
                    )}
                </div>
             );
        }
        return <p>Unsupported question type.</p>;
    };

    const progressPercentage = quizPhase === 'initial' 
        ? ((poolIndex + 1) / questionPool.length) * 100
        : 100; // Keep it full during review

    return (
        <div>
            <div className="quiz-header">
                <h3>{quizPhase === 'review' ? `${t('reviewingQuestion')} ${poolIndex + 1} ${t('of')} ${questionPool.length}` : `${t('question')} ${currentQuestionIndex + 1} ${t('of')} ${quizData.length}`}</h3>
                {/* Fix: Added the missing 'isResults' prop to the ExportDropdown component call. */}
                <ExportDropdown quizData={quizData} userAnswers={answers} options={options} showLoader={showLoader} hideLoader={hideLoader} t={t} contextText={contextText} isResults={false} />
            </div>
            <div className="progress-bar" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar-inner" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="question-container">
                <p className="question-text" dangerouslySetInnerHTML={{__html: marked.parseInline(currentQuestion.question)}}></p>
                {renderQuestionInput()}
            </div>
            {feedback && (
                <div className={`feedback ${feedback.class}`} dangerouslySetInnerHTML={{__html: marked.parse(feedback.text || '')}}>
                </div>
            )}
            {isAnswered && (
                <div className="button-group">
                    <button className="btn btn-primary" style={{width: 'auto'}} onClick={handleNext}>
                        {poolIndex < questionPool.length - 1 ? t('nextButton') : (quizPhase === 'initial' && spacedRepetition ? t('continueToReview') : t('finishQuiz'))}
                    </button>
                </div>
            )}
        </div>
    );
};


const Mascot = ({ scorePercentage }) => {
    const getEmotion = () => {
        if (scorePercentage >= 80) return 'happy';
        if (scorePercentage >= 40) return 'neutral';
        return 'sad';
    };
    const emotion = getEmotion();

    const eyeTransform = {
        happy: 'M16 26 Q24 32 32 26 M48 26 Q56 32 64 26', // Upward curve
        neutral: 'M16 28 L32 28 M48 28 L64 28', // Straight line
        sad: 'M16 30 Q24 24 32 30 M48 30 Q56 24 64 30' // Downward curve
    };
    
    return (
        <svg viewBox="0 0 80 80" className="mascot-svg">
            <defs>
                <linearGradient id="grad-body" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#62d902', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: '#4aa502', stopOpacity:1}} />
                </linearGradient>
            </defs>
            <circle cx="40" cy="45" r="35" fill="url(#grad-body)" />
            <circle cx="24" cy="28" r="8" fill="white" />
            <circle cx="56" cy="28" r="8" fill="white" />
            <circle cx="24" cy="28" r="4" fill="#3c3c3c" />
            <circle cx="56" cy="28" r="4" fill="#3c3c3c" />
            <path d={eyeTransform[emotion]} stroke="#3c3c3c" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
    );
}

const ResultsStep = ({ quizData, userAnswers, onRestart, onTryAgain, showLoader, hideLoader, t, contextText, options }) => {
    
    const scoreData = React.useMemo(() => {
        let totalScore = 0;
        let correctCount = 0;

        userAnswers.forEach((answerData, index) => {
            if (!answerData || !answerData.attempts || answerData.attempts.length === 0) return;
            
            const question = quizData[index];
            let questionScore = 0;

            const correctAttemptIndex = answerData.attempts.findIndex(attempt => {
                if (['match-term', 'multiple-choice', 'true-false', 'fill-in-the-blank'].includes(question.type)) return attempt.isCorrect === true;
                if (['short-answer', 'long-answer'].includes(question.type)) return attempt.grade === 'correct';
                return false;
            });

            if (correctAttemptIndex !== -1) {
                correctCount++;
                const attemptNumber = correctAttemptIndex + 1;
                if (attemptNumber === 1) questionScore = 1;
                else if (attemptNumber === 2) questionScore = 0.5;
                else if (attemptNumber === 3) questionScore = 0.25;
            } else {
                const firstAttempt = answerData.attempts[0];
                if (firstAttempt && firstAttempt.grade === 'partially-correct') {
                    questionScore = 0.5;
                }
            }
            totalScore += questionScore;
        });
        
        return { score: totalScore, correctCount };
    }, [quizData, userAnswers]);

    const scorePercentage = quizData.length > 0 ? (scoreData.score / quizData.length) * 100 : 0;
    
    const getAttemptClass = (attempt, question) => {
        if (['match-term', 'multiple-choice', 'true-false', 'fill-in-the-blank'].includes(question.type)) {
            return attempt.isCorrect ? 'correct' : 'incorrect';
        }
        if (['short-answer', 'long-answer'].includes(question.type)) {
            return attempt.grade || 'incorrect';
        }
        return 'incorrect';
    };

    return (
        <div className="results-summary">
            <div className="results-header">
                 <Mascot scorePercentage={scorePercentage} />
                 <h2>{t('quizComplete')}</h2>
                 <ExportDropdown quizData={quizData} userAnswers={userAnswers} options={options} isResults={true} showLoader={showLoader} hideLoader={hideLoader} t={t} contextText={contextText} />
            </div>
             <div className="score-container">
                <div>
                    <p style={{margin: 0, textTransform: 'uppercase', color: 'var(--gray-medium)'}}>{t('score')}</p>
                    <div className="score">{Math.round(scorePercentage)}%</div>
                </div>
                <div>
                    <p style={{margin: 0, textTransform: 'uppercase', color: 'var(--gray-medium)'}}>{t('correct')}</p>
                    <div className="score" style={{color: 'var(--gray-dark)'}}>{scoreData.correctCount} / {quizData.length}</div>
                </div>
            </div>
            
            <div className="results-details">
                <h3>{t('reviewAnswers')}</h3>
                {quizData.map((question, index) => {
                    const userAnswerData = userAnswers[index] || { attempts: [] };
                    return (
                        <div key={index} className="result-question">
                            <p><strong>Q: {question.question}</strong></p>
                            
                            {userAnswerData.attempts.length > 1 && (
                                <ul className="attempt-history">
                                    {userAnswerData.attempts.map((attempt, attemptIdx) => {
                                        const attemptClass = getAttemptClass(attempt, question);
                                        return (
                                        <li key={attemptIdx} className={`attempt-item ${attemptClass}`}>
                                            <span className="attempt-label">Attempt {attemptIdx + 1}</span>
                                            <span className={`attempt-answer ${attemptClass}`}>{attempt.text || 'N/A'}</span>
                                        </li>
                                        )
                                    })}
                                </ul>
                            )}
                            
                            {userAnswerData.attempts.length === 1 && (
                                 <p>{t('yourAnswer')}: <span className={getAttemptClass(userAnswerData.attempts[0], question)}>{userAnswerData.attempts[0].text || 'No answer'}</span></p>
                            )}

                             {!userAnswerData.attempts.some(a => getAttemptClass(a, question) === 'correct') && (
                                <p><strong>{t('correctAnswer')}:</strong> {question.answer}</p>
                             )}

                            {userAnswerData.attempts[userAnswerData.attempts.length-1]?.aiFeedback && (
                                <p><em><strong>{t('aiFeedback')}:</strong> {userAnswerData.attempts[userAnswerData.attempts.length-1].aiFeedback}</em></p>
                            )}
                            <p><em><strong>{t('explanation')}:</strong> {question.explanation}</em></p>
                        </div>
                    )
                })}
            </div>

            <div className="button-group" style={{gap: '1rem', flexDirection: 'column'}}>
                <button className="btn btn-primary" onClick={onTryAgain}>{t('tryAgain')}</button>
                <button className="btn" onClick={onRestart}>{t('createNewQuiz')}</button>
            </div>
        </div>
    );
};

// Fix: Add userAnswers and isResults to props to match component usage in parent components.
const ExportDropdown = ({ quizData, userAnswers, isResults, contextText, options, showLoader, hideLoader, t }) => {
    const [modalContent, setModalContent] = React.useState(null);
    const [copyButtonText, setCopyButtonText] = React.useState(t('copy'));

    const handleSaveQuizToCode = () => {
        try {
            const dataToSave = { quizData, options, contextText };
            const encoded = btoa(JSON.stringify(dataToSave));
            setModalContent(encoded);
        } catch (error) {
            console.error("Error encoding quiz:", error);
            alert("Sorry, there was an error creating the quiz code.");
        }
    };

    const handleCopyToClipboard = () => {
        if (modalContent) {
            navigator.clipboard.writeText(modalContent).then(() => {
                setCopyButtonText(t('copied'));
                setTimeout(() => setCopyButtonText(t('copy')), 2000);
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        }
    };

    const handleSaveAsPdf = async () => {
        showLoader(t('generatingPdf'));
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            let topic = "Quiz";
            if (contextText) {
                const topicResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Generate a short, 3-5 word title for a quiz based on the following text. Respond with only the title text. Text: "${contextText.substring(0, 500)}"`,
                });
                topic = topicResponse.text.trim();
            }
            const filename = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_quiz.pdf';
            
            // Use a timeout to allow the loader to render before the blocking PDF generation starts.
            setTimeout(() => {
                const { jsPDF } = (window as any).jspdf;
                const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
                
                const MARGIN = 15;
                const PAGE_WIDTH = doc.internal.pageSize.getWidth();
                const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
                const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
                let y = MARGIN;

                const checkPageBreak = (neededHeight) => {
                    if (y + neededHeight > PAGE_HEIGHT - MARGIN) {
                        doc.addPage();
                        y = MARGIN;
                        return true;
                    }
                    return false;
                };
                
                // --- TITLE PAGE ---
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(24);
                doc.text(topic, PAGE_WIDTH / 2, 80, { align: 'center' });
                doc.setFontSize(16);
                doc.setFont('Helvetica', 'normal');
                doc.text("Quiz", PAGE_WIDTH / 2, 95, { align: 'center' });


                // --- QUESTIONS SECTION ---
                doc.addPage();
                y = MARGIN;
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(20);
                doc.text("Questions", MARGIN, y);
                y += 15;

                quizData.forEach((q, i) => {
                    const questionText = doc.splitTextToSize(`Q${i + 1}: ${q.question}`, CONTENT_WIDTH);
                    checkPageBreak(questionText.length * 5 + 15); // Estimate height
                    
                    doc.setFont('Helvetica', 'bold');
                    doc.setFontSize(12);
                    doc.text(questionText, MARGIN, y);
                    y += questionText.length * 5;
                    
                    doc.setFont('Helvetica', 'normal');
                    doc.setFontSize(11);
                    y += 5; // spacing before options/answer area

                    switch (q.type) {
                        case 'multiple-choice':
                            q.options.forEach(opt => {
                                 checkPageBreak(8);
                                 doc.circle(MARGIN + 2.5, y - 1.5, 2);
                                 doc.text(opt, MARGIN + 7, y);
                                 y += 7;
                            });
                            break;
                        case 'true-false':
                            checkPageBreak(14);
                            doc.circle(MARGIN + 2.5, y - 1.5, 2);
                            doc.text('True', MARGIN + 7, y);
                            y += 7;
                            doc.circle(MARGIN + 2.5, y - 1.5, 2);
                            doc.text('False', MARGIN + 7, y);
                            y += 7;
                            break;
                        case 'match-term':
                            const terms = q.matchPairs.map(p => p.term);
                            const shuffledDefs = [...q.matchPairs].sort(() => Math.random() - 0.5).map(p => p.definition);
                            const totalHeight = (q.matchPairs.length * 15) + 20;
                            checkPageBreak(totalHeight);

                            let listY = y;
                            doc.setFont('Helvetica', 'bold');
                            doc.text("Terms", MARGIN, listY);
                            doc.text("Definitions", PAGE_WIDTH / 2, listY);
                            doc.setFont('Helvetica', 'normal');
                            listY += 7;

                            for(let j=0; j<q.matchPairs.length; j++) {
                                const termText = doc.splitTextToSize(`${j+1}. ${terms[j]}`, CONTENT_WIDTH / 2 - 5);
                                doc.text(termText, MARGIN, listY);

                                const defText = doc.splitTextToSize(`${String.fromCharCode(65 + j)}. ${shuffledDefs[j]}`, CONTENT_WIDTH / 2 - 5);
                                doc.text(defText, PAGE_WIDTH / 2, listY);
                                listY += Math.max(termText.length, defText.length) * 5 + 4;
                            }
                            y = listY + 3;
                            doc.setFont('Helvetica', 'bold');
                            doc.text("Answers:", MARGIN, y);
                            doc.setFont('Helvetica', 'normal');
                            y += 7;
                            for(let j=0; j<terms.length; j++) {
                                doc.text(`${j+1}. ______`, MARGIN + (j % 4) * 40, y);
                                if ((j+1) % 4 === 0) y += 7;
                            }
                            if (terms.length % 4 !== 0) y += 7;
                            break;
                        case 'short-answer':
                            checkPageBreak(20);
                            for(let j=0; j<3; j++) {
                                doc.setDrawColor(200, 200, 200);
                                doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
                                y += 7;
                            }
                            break;
                        case 'long-answer':
                            checkPageBreak(40);
                             for(let j=0; j<6; j++) {
                                doc.setDrawColor(200, 200, 200);
                                doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
                                y += 7;
                            }
                            break;
                        case 'fill-in-the-blank':
                            y += 5;
                            break;
                    }
                    y += 10; // Spacing between questions
                });

                // --- ANSWERS SECTION ---
                doc.addPage();
                y = MARGIN;
                doc.setFont('Helvetica', 'bold');
                doc.setFontSize(20);
                doc.text("Answer Key", MARGIN, y);
                y += 15;
                
                quizData.forEach((q, i) => {
                    const qText = doc.splitTextToSize(`Q${i + 1}: ${q.question}`, CONTENT_WIDTH);
                    let answer;
                     if(q.type === 'match-term') {
                        const shuffledDefs = [...q.matchPairs].sort(() => Math.random() - 0.5);
                        const originalIndices = q.matchPairs.map(p => shuffledDefs.findIndex(sp => sp.definition === p.definition));
                        answer = q.matchPairs.map((p, idx) => `${idx + 1}. ${String.fromCharCode(65 + originalIndices[idx])}. (${p.term} - ${p.definition})`).join('\n');
                     } else {
                        answer = q.answer;
                     }
                    const aText = doc.splitTextToSize(`Answer: ${answer}`, CONTENT_WIDTH - 5);
                    const eText = doc.splitTextToSize(`Explanation: ${q.explanation}`, CONTENT_WIDTH - 5);

                    const neededHeight = (qText.length + aText.length + eText.length) * 5 + 10;
                    checkPageBreak(neededHeight);

                    doc.setFont('Helvetica', 'bold');
                    doc.setFontSize(12);
                    doc.text(qText, MARGIN, y);
                    y += qText.length * 5 + 3;
                    
                    doc.setFont('Helvetica', 'normal');
                    doc.setFontSize(11);
                    
                    doc.setTextColor(34, 139, 34); // ForestGreen
                    doc.text(aText, MARGIN + 5, y);
                    y += aText.length * 5 + 3;
                    
                    doc.setTextColor(128, 128, 128); // Gray
                    doc.text(eText, MARGIN + 5, y);
                    y += eText.length * 5 + 10;

                    doc.setTextColor(0, 0, 0); // Reset color
                });
                
                doc.save(filename);
                hideLoader();
            }, 100);

        } catch(error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF file.");
            hideLoader();
        }
    };

    const decode = (base64) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        return bytes;
    };

    const decodeAudioData = async (data, ctx, sampleRate, numChannels) => {
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length / numChannels;
        const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
        for (let channel = 0; channel < numChannels; channel++) {
            const channelData = buffer.getChannelData(channel);
            for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
        return buffer;
    };

    const audioBufferToWav = (buffer) => {
        const [numChannels, sampleRate] = [buffer.numberOfChannels, buffer.sampleRate];
        const bitDepth = 16;
        let result = new Float32Array(buffer.length * numChannels);
        for(let c = 0; c < numChannels; c++) result.set(buffer.getChannelData(c), c * buffer.length);
        const dataLength = result.length * (bitDepth / 8);
        const view = new DataView(new ArrayBuffer(44 + dataLength));

        const writeString = (view, offset, string) => {
            for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
        };

        let o = 0;
        writeString(view, o, 'RIFF'); o += 4; view.setUint32(o, 36 + dataLength, true); o += 4;
        writeString(view, o, 'WAVE'); o += 4; writeString(view, o, 'fmt '); o += 4;
        view.setUint32(o, 16, true); o += 4; view.setUint16(o, 1, true); o += 2;
        view.setUint16(o, numChannels, true); o += 2; view.setUint32(o, sampleRate, true); o += 4;
        view.setUint32(o, sampleRate * numChannels * (bitDepth / 8), true); o += 4;
        view.setUint16(o, numChannels * (bitDepth / 8), true); o += 2;
        view.setUint16(o, bitDepth, true); o += 2;
        writeString(view, o, 'data'); o += 4; view.setUint32(o, dataLength, true); o += 4;

        for (let i = 0; i < result.length; i++, o += 2) {
            let s = Math.max(-1, Math.min(1, result[i]));
            view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
        return new Blob([view], {type: 'audio/wav'});
    };

    const handleGenerateAudio = async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        try {
            const audioBuffers = [];
            for (let i = 0; i < quizData.length; i++) {
                showLoader(`${t('generatingAudioFor')} ${i+1}/${quizData.length}...`);
                const q = quizData[i];
                const textToSpeak = `Question ${i+1}. ${q.question}. <break time="5s" /> The answer is... ${q.answer}.`;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-preview-tts',
                    contents: [{ parts: [{ text: textToSpeak }] }],
                    config: {
                        responseModalities: [Modality.AUDIO],
                        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                    },
                });
                
                const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                if (base64Audio) {
                    audioBuffers.push(await decodeAudioData(decode(base64Audio), audioContext, 24000, 1));
                }
            }

            showLoader(t('combiningAudio'));
            if (audioBuffers.length > 0) {
                const totalLength = audioBuffers.reduce((acc, buf) => acc + buf.length, 0);
                const combinedBuffer = audioContext.createBuffer(1, totalLength, 24000);
                let offset = 0;
                for (const buffer of audioBuffers) {
                    combinedBuffer.getChannelData(0).set(buffer.getChannelData(0), offset);
                    offset += buffer.length;
                }

                const wavBlob = audioBufferToWav(combinedBuffer);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = URL.createObjectURL(wavBlob);
                a.download = 'quiz-audio.wav';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(a.href);
                a.remove();
            }
        } catch(error) {
            console.error("Error generating audio:", error);
            alert("Sorry, there was an error generating the audio file.");
        } finally {
            hideLoader();
        }
    };

    return (
        <>
        {modalContent && (
            <div className="modal-overlay" onClick={() => setModalContent(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>{t('yourQuizCode')}</h3>
                    <textarea readOnly value={modalContent}></textarea>
                    <div className="modal-footer">
                         <button className="btn" onClick={() => setModalContent(null)}>{t('close')}</button>
                         <button className="btn btn-primary" onClick={handleCopyToClipboard}>{copyButtonText}</button>
                    </div>
                </div>
            </div>
        )}
        <div className="dropdown">
            <button className="btn">{t('export')}</button>
            <div className="dropdown-content">
                <button onClick={handleSaveAsPdf}>{t('saveAsPdf')}</button>
                <button onClick={handleGenerateAudio}>{t('generateAudio')}</button>
                <button onClick={handleSaveQuizToCode}>{t('saveToCode')}</button>
            </div>
        </div>
        </>
    );
};

// Error Boundary Implementation
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null; }> {
  // Fix: Replaced the state property initializer with a constructor. This resolves
  // TypeScript errors where inherited component properties like `props` and
  // `setState` were not being recognized.
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }
    return this.props.children;
  }
}

const ErrorFallback = ({ error, errorInfo }: { error: Error | null; errorInfo: React.ErrorInfo | null; }) => {
    const handleEmailReport = () => {
        const subject = "OmniQuiz 2.0 Error Report";
        const body = `
Hello OmniQuiz Support,

I encountered an error while using the app. Here are the details:

Error Message:
${error?.toString()}

Component Stack:
${errorInfo?.componentStack}

Please describe what you were doing when the error occurred:
[Your description here]

Thank you!
        `;
        window.location.href = `mailto:support@omniquiz.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleGoHome = () => {
        window.location.reload();
    };

    return (
        <div className="error-boundary">
            <AppLogo />
            <h2>Oops! Something Went Wrong.</h2>
            <p>We're sorry for the inconvenience. Our team has been notified, but you can also help by sending us an error report.</p>
            <div className="button-group">
                <button className="btn btn-primary" onClick={handleEmailReport}>Email Report</button>
                <button className="btn" onClick={handleGoHome}>Return to Homepage</button>
            </div>
        </div>
    );
};


ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
