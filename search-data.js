// search-data.js - Central search index for all content

const searchIndex = {
    // Species from checklist
    species: [],
    
    // Articles data
    articles: [
        {
            id: 1,
            title: "First Record of Spirobolid Trigoniulus corallinus from Nepal",
            category: "article",
            excerpt: "This paper reports the first confirmed presence of the rusty millipede in urban environments of Nepal.",
            url: "articles.html#article1",
            icon: "📄",
            tags: ["Trigoniulus corallinus", "Spirobolida", "Kathmandu"]
        },
        {
            id: 2,
            title: "First Record of Gonoplectus lindbergi Demange, 1961 from Nepal",
            category: "article",
            excerpt: "The Harpagophorid species Gonoplectus lindbergi is documented for the first time in Nepal.",
            url: "articles.html#article2",
            icon: "📄",
            tags: ["Gonoplectus lindbergi", "Spirostreptida", "Eastern Nepal"]
        }
    ],
    
    // FAQ data
    faq: [
        { id: 1, question: "What are millipedes?", answer: "Millipedes are arthropods belonging to the class Diplopoda...", url: "faq.html#q1", icon: "❓" },
        { id: 2, question: "How many legs do millipedes have?", answer: "The number of legs ranges from 30 to over 750...", url: "faq.html#q2", icon: "🦶" },
        { id: 3, question: "What do millipedes eat?", answer: "Millipedes are detritivores, feeding on decomposing plant material...", url: "faq.html#q3", icon: "🍂" },
        { id: 4, question: "Where do millipedes live?", answer: "Millipedes are found in moist environments such as forest floors...", url: "faq.html#q4", icon: "🏞️" },
        { id: 5, question: "Are millipedes harmful to humans?", answer: "Millipedes are generally harmless to humans...", url: "faq.html#q5", icon: "⚠️" },
        { id: 6, question: "How do millipedes defend themselves?", answer: "Millipedes curl into a tight coil and secrete defensive chemicals...", url: "faq.html#q6", icon: "🛡️" },
        { id: 7, question: "How do millipedes reproduce?", answer: "Millipedes reproduce by laying eggs...", url: "faq.html#q7", icon: "🥚" },
        { id: 8, question: "Why do I find millipedes in my house?", answer: "Millipedes enter homes seeking moisture and shelter...", url: "faq.html#q8", icon: "🏠" },
        { id: 9, question: "Do millipedes play a role in the ecosystem?", answer: "Yes, they break down decaying plant material...", url: "faq.html#q9", icon: "🌱" },
        { id: 10, question: "Can millipedes be kept as pets?", answer: "Yes, some species of millipedes are kept as pets...", url: "faq.html#q10", icon: "🏡" }
    ]
};

// Load species data from checklist.json
async function loadSpeciesData() {
    try {
        const response = await fetch('checklist.json');
        const speciesData = await response.json();
        searchIndex.species = speciesData.map(s => ({
            id: s.id,
            name: `${s.genus} ${s.species}`,
            fullName: `${s.genus} ${s.species}`,
            family: s.family,
            order: s.order,
            category: "species",
            url: `checklist.html#${s.genus}_${s.species}`.toLowerCase().replace(/\s+/g, '-'),
            icon: "🪲",
            tags: [s.genus, s.species, s.family, s.order]
        }));
        console.log('Species data loaded for search:', searchIndex.species.length);
    } catch (error) {
        console.error('Could not load species data for search:', error);
    }
}

// Call this when page loads
loadSpeciesData();
