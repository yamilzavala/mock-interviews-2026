import React, { useState, useRef, useCallback, useEffect } from "react";

const OTP_LENGTH = 6;

export default function OTPInput_1({ onComplete }) {
  // 🧠 estado centralizado (1 sola fuente de verdad)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  // 🧠 refs para manejar foco imperativamente
  const inputsRef = useRef([]);

  /**
   * 🔥 helper: enfocar input
   */
  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  /**
   * 🔥 handle change (input normal)
   */
  const handleChange = useCallback((e, index) => {
    let value = e.target.value;

    // 🧠 solo 1 dígito numérico
    value = value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0]; // solo 1 char

    setOtp(newOtp);

    // 👉 mover foco al siguiente
    if (index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }, [otp]);

  /**
   * 🔥 handle keydown (backspace control)
   */
  const handleKeyDown = useCallback((e, index) => {
    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (otp[index]) {
      // 👉 si tiene valor → lo borro
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      // 👉 si está vacío → voy al anterior
      focusInput(index - 1);

      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  }, [otp]);

  /**
   * 🔥 handle paste (LO MÁS IMPORTANTE)
   */
  const handlePaste = useCallback((e, index) => {
    e.preventDefault();

    let pasteData = e.clipboardData.getData("text");

    // 🧠 limpiar todo lo que no sea número
    pasteData = pasteData.replace(/\D/g, "");

    if (!pasteData) return;

    const newOtp = [...otp];

    // 👉 distribuir desde el índice actual
    for (let i = 0; i < pasteData.length; i++) {
      if (index + i >= OTP_LENGTH) break;
      newOtp[index + i] = pasteData[i];
    }

    setOtp(newOtp);

    // 👉 mover foco al último completado
    const nextIndex = Math.min(index + pasteData.length, OTP_LENGTH - 1);
    focusInput(nextIndex);
  }, [otp]);

  /**
   * 🔥 detectar completitud
   */
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete?.(otp.join(""));
    }
  }, [otp, onComplete]);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "18px",
          }}
        />
      ))}
    </div>
  );
}