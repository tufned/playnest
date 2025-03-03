import React from "react";

interface ModalShellProps {
  content: React.ReactElement;
}

function ModalShell({ content }: ModalShellProps) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-dimmedScreen flex-center">
      {content}
    </div>
  );
}

export default ModalShell;
