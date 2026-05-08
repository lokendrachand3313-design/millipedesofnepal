// Global Search Functionality

const searchInput = document.getElementById('globalSearchInput');
const searchBtn = document.getElementById('globalSearchBtn');
const searchDropdown = document.getElementById('searchResultsDropdown');

let searchTimeout;

// Search function
function performSearch(query) {
    if (!query.trim() || query.length < 2) {
        searchDropdown.style.display = 'none';
        return;
    }
    
    searchDropdown.style.display = 'block';
    searchDropdown.innerHTML = '<div class="search-dropdown-loading">🔍 Searching...</div>';
    
    // Simulate async search (in real use, this would be instant)
    setTimeout(() => {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        // Search in species
        if (searchIndex.species) {
            searchIndex.species.forEach(species => {
                const matchName = species.name.toLowerCase().includes(searchTerm);
                const matchFamily = species.family && species.family.toLowerCase().includes(searchTerm);
                const matchOrder = species.order && species.order.toLowerCase().includes(searchTerm);
                const matchTags = species.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                
                if (matchName || matchFamily || matchOrder || matchTags) {
                    results.push({
                        ...species,
                        matchedText: highlightMatch(species.name, searchTerm),
                        preview: `Order: ${species.order} | Family: ${species.family}`
                    });
                }
            });
        }
        
        // Search in articles
        if (searchIndex.articles) {
            searchIndex.articles.forEach(article => {
                const matchTitle = article.title.toLowerCase().includes(searchTerm);
                const matchExcerpt = article.excerpt.toLowerCase().includes(searchTerm);
                const matchTags = article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
                
                if (matchTitle || matchExcerpt || matchTags) {
                    results.push({
                        ...article,
                        matchedText: highlightMatch(article.title, searchTerm),
                        preview: article.excerpt.substring(0, 100) + '...'
                    });
                }
            });
        }
        
        // Search in FAQ
        if (searchIndex.faq) {
            searchIndex.faq.forEach(faq => {
                const matchQuestion = faq.question.toLowerCase().includes(searchTerm);
                const matchAnswer = faq.answer.toLowerCase().includes(searchTerm);
                
                if (matchQuestion || matchAnswer) {
                    results.push({
                        ...faq,
                        matchedText: highlightMatch(faq.question, searchTerm),
                        preview: faq.answer.substring(0, 100) + '...'
                    });
                }
            });
        }
        
        displaySearchResults(results, searchTerm);
    }, 100);
}

// Highlight matching text
function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Display search results
function displaySearchResults(results, searchTerm) {
    if (results.length === 0) {
        searchDropdown.innerHTML = `
            <div class="search-dropdown-empty">
                🔍 No results found for "<strong>${escapeHtml(searchTerm)}</strong>"
                <br><small>Try searching for species name, article title, or question</small>
            </div>
        `;
        return;
    }
    
    // Get category icon
    const getIcon = (category) => {
        switch(category) {
            case 'species': return '🪲';
            case 'article': return '📄';
            case 'faq': return '💬';
            default: return '🔍';
        }
    };
    
    searchDropdown.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="window.location.href='${result.url}'">
            <div class="search-result-icon">${result.icon || getIcon(result.category)}</div>
            <div class="search-result-content">
                <div class="search-result-category">${result.category.toUpperCase()}</div>
                <div class="search-result-title">${result.matchedText}</div>
                <div class="search-result-preview">${escapeHtml(result.preview || '')}</div>
            </div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (searchDropdown && !e.target.closest('.search-wrapper')) {
        searchDropdown.style.display = 'none';
    }
});
