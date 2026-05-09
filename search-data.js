// search-data.js - Complete Working Version

// Search Index
const searchIndex = {
    species: [],
    articles: [
        {
            id: 1,
            title: "First Record of Spirobolid Trigoniulus corallinus from Nepal",
            category: "article",
            excerpt: "This paper reports the first confirmed presence of the rusty millipede, Trigoniulus corallinus, in the urban environments of Nepal.",
            url: "articles.html#article1",
            icon: "📄",
            tags: ["Trigoniulus corallinus", "Spirobolida", "Pachybolidae", "rusty millipede", "Kathmandu"]
        },
        {
            id: 2,
            title: "First Record of Gonoplectus lindbergi Demange, 1961 from Nepal",
            category: "article",
            excerpt: "The Harpagophorid species Gonoplectus lindbergi is documented for the first time in Nepal.",
            url: "articles.html#article2",
            icon: "📄",
            tags: ["Gonoplectus lindbergi", "Spirostreptida", "Harpagophoridae", "Eastern Nepal"]
        }
    ],
    faq: [
        { id: 1, question: "What are millipedes?", answer: "Millipedes are arthropods belonging to the class Diplopoda. They are characterized by having two pairs of jointed legs on most body segments.", url: "faq.html#q1", icon: "❓" },
        { id: 2, question: "How many legs do millipedes have?", answer: "The number of legs millipedes have can vary significantly, ranging from 30 to over 750 legs depending on the species.", url: "faq.html#q2", icon: "🦶" },
        { id: 3, question: "What do millipedes eat?", answer: "Millipedes are detritivores, meaning they primarily feed on decomposing plant material, dead leaves, and other organic matter.", url: "faq.html#q3", icon: "🍂" },
        { id: 4, question: "Where do millipedes live?", answer: "Millipedes are typically found in moist environments such as forest floors, leaf litter, under rocks, and decaying logs.", url: "faq.html#q4", icon: "🏞️" },
        { id: 5, question: "Are millipedes harmful to humans?", answer: "Millipedes are generally harmless to humans. They do not bite or sting, but some species can release a defensive chemical.", url: "faq.html#q5", icon: "⚠️" },
        { id: 6, question: "How do millipedes defend themselves?", answer: "Millipedes can curl into a tight coil to protect their soft underbelly. Many species also secrete toxic or foul-smelling chemicals.", url: "faq.html#q6", icon: "🛡️" },
        { id: 7, question: "How do millipedes reproduce?", answer: "Millipedes reproduce by laying eggs. Males transfer sperm to females using specialized limbs called gonopods.", url: "faq.html#q7", icon: "🥚" },
        { id: 8, question: "Why do I find millipedes in my house?", answer: "Millipedes may enter homes seeking moisture and shelter, especially during dry weather or heavy rain.", url: "faq.html#q8", icon: "🏠" },
        { id: 9, question: "Do millipedes play a role in the ecosystem?", answer: "Yes, millipedes play a crucial role in the ecosystem by breaking down decaying plant material and recycling nutrients.", url: "faq.html#q9", icon: "🌱" },
        { id: 10, question: "Can millipedes be kept as pets?", answer: "Yes, some species of millipedes are kept as pets. They require a habitat with high humidity and appropriate substrate.", url: "faq.html#q10", icon: "🏡" }
    ]
};

// Sample species data (in case checklist.json doesn't load)
const sampleSpecies = [
    { genus: "Gonoplectus", species: "malayus", family: "Harpagophoridae", order: "Spirostreptida" },
    { genus: "Gonoplectus", species: "lindbergi", family: "Harpagophoridae", order: "Spirostreptida" },
    { genus: "Trigoniulus", species: "corallinus", family: "Pachybolidae", order: "Spirobolida" },
    { genus: "Chondromorpha", species: "greke", family: "Paradoxosomatidae", order: "Polydesmida" },
    { genus: "Orthomorpha", species: "simulans", family: "Paradoxosomatidae", order: "Polydesmida" },
    { genus: "Streptogonopus", species: "phipsoni", family: "Paradoxosomatidae", order: "Polydesmida" },
    { genus: "Siphonorhinus", species: "sp.", family: "Siphonorhinidae", order: "Siphonophorida" },
    { genus: "Cryptocorypha", species: "sp.", family: "Pyrgodesmidae", order: "Polydesmida" }
];

// Load species data
async function loadSpeciesData() {
    try {
        const response = await fetch('checklist.json');
        if (response.ok) {
            const data = await response.json();
            searchIndex.species = data.map(s => ({
                name: `${s.genus || 'Unknown'} ${s.species || 'sp.'}`,
                genus: s.genus,
                species: s.species,
                family: s.family,
                order: s.order,
                category: "species",
                url: "checklist.html",
                icon: "🪲",
                tags: [s.genus, s.species, s.family, s.order].filter(t => t)
            }));
            console.log('✅ Species loaded from checklist.json:', searchIndex.species.length);
        } else {
            throw new Error('checklist.json not found');
        }
    } catch (error) {
        console.log('⚠️ Using sample species data');
        searchIndex.species = sampleSpecies.map(s => ({
            name: `${s.genus} ${s.species}`,
            genus: s.genus,
            species: s.species,
            family: s.family,
            order: s.order,
            category: "species",
            url: "checklist.html",
            icon: "🪲",
            tags: [s.genus, s.species, s.family, s.order]
        }));
    }
}

// Load data immediately
loadSpeciesData();

// Make searchIndex available globally
window.searchIndex = searchIndex;
console.log('✅ Search data loaded with:', searchIndex.species.length, 'species,', searchIndex.articles.length, 'articles,', searchIndex.faq.length, 'FAQs');
