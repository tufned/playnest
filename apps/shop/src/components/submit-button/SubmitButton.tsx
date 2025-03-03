import React from "react";

function SubmitButton({
  children,
  disabled = false,
  className = ""
}: {
  children: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={`button-primary ${className} ${disabled ? "disabled" : ""}`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
