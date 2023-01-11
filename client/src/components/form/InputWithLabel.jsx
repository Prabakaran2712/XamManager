const InputWithLabel = ({ label, inputType, val, toUpdate, required }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={inputType}
        value={val}
        onChange={(e) => toUpdate(e.target.value)}
        required={required}
      />
    </div>
  );
};
export default InputWithLabel;
