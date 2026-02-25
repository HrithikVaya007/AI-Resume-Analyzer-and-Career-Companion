function ScoreCard({ score = 0 }) {
  return (
    <div className="meter-card">
      <h4>ATS Score</h4>

      <div className="score-bar">
        <div
          className="score-fill"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="score-value">{score}/100</p>
    </div>
  );
}

export default ScoreCard;
