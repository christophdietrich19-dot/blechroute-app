export default function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}