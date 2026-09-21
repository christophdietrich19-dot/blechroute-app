export default function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  maxLength,
  autoComplete
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
