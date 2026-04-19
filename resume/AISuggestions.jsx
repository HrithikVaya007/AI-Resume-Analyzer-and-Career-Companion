function AISuggestions({suggestions = []}){
    return(
        <div className="ai-suggestions-card">
            <h3>AI Suggestions</h3>
            <ul>
                {suggestions.map((s, i) => (
          <li key={i} style={{ animationDelay: `${i * 0.15}s` }}>
            ✨ {s}
          </li>
        ))}
            </ul>
        </div>
    );
}
export default AISuggestions