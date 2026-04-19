function MissingSkills({ skills = [] }) {
  return (
    <div className="meter-card">
      <h4>Missing Skills</h4>

      {skills.map((skill, i) => (
        <div key={i} className="skill-bar">
          <span>{skill}</span>
          <div className="bar">
            <div className="bar-fill" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MissingSkills;
