function SkillMatch({ value = 0 }) {
  return (
    <div className="meter-card">
      <h4>Skill Match</h4>

      <div
        className="circular-meter"
        style={{
          background: `conic-gradient(
            #6d5dfc ${value * 3.6}deg,
            rgba(255,255,255,0.15) 0deg
          )`,
        }}
      >
        <span>{value}%</span>
      </div>
    </div>
  );
}

export default SkillMatch;
