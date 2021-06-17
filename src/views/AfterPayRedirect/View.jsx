import React, { useState, useEffect } from "react";

const View = () => {
  useEffect(() => {
    if (window) {
      window?.top?.postMessage("3DS-authentication-complete", "*");
    }
  }, []);

  return (
    <h3>
      Il tuo pagamento è stato processato, ti stiamo redirezionando a
      storitalia.com
    </h3>
  );
};

export default View;