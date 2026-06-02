export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder = "",
  required = false
}) {
  return (
    <label>
      {label}
      <textarea
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}