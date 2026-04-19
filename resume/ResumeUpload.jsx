function ResumeUpload({ onUpload }) {
  return (
    <input
      type="file"
      accept=".pdf,.docx"
      onChange={(e) => onUpload(e.target.files[0])}
    />
  );
}

export default ResumeUpload;
