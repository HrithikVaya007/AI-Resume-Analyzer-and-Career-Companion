function JDInput({ onChange }) {
  return (
    <textarea
      placeholder="Paste Job Description here..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default JDInput;
