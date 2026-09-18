export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  maxLength
}) {
  return (
    <label>
      {label}
      <textarea
        value={value}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
