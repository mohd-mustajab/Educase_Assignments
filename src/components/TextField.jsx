import React from "react";

export default function TextField({
  error,
  label,
  required = false,
  ...props
}) {
  const inputId = props.id || props.name;

  return (
    <label className="field">
      <span>
        {label}
        {required && <b>*</b>}
      </span>
      <input
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={inputId}
        {...props}
      />
      {error && (
        <small className="field-error" id={inputId ? `${inputId}-error` : undefined}>
          {error}
        </small>
      )}
    </label>
  );
}
