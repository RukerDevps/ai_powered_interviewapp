"use client";

import type { ReactNode } from "react";

interface AuthTextFieldProps {
  autoComplete?: string;
  endAdornment?: ReactNode;
  errorMessages: string[];
  icon: ReactNode;
  id: string;
  label: string;
  name: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  showError: boolean;
  type: string;
  value: string;
}

export const AuthTextField = ({
  autoComplete,
  endAdornment,
  errorMessages,
  icon,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  showError,
  type,
  value,
}: AuthTextFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-dark">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent xl:py-3">
        <span className="shrink-0 text-text-secondary">{icon}</span>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={errorMessages.length > 0}
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {endAdornment}
      </div>
      {showError && errorMessages.length > 0 ? (
        <p className="mt-1.5 text-xs font-medium text-error">{errorMessages.join(", ")}</p>
      ) : null}
    </div>
  );
};
