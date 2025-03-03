import React from "react";

function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div className={`${fullScreen ? "h-screen w-screen" : ""} flex-center text-xl`}>
      Loading...
    </div>
  );
}

export default Loader;
