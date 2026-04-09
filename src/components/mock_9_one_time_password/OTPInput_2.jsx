import React, { useState, useRef, useCallback } from "react";

const OTP_LENGTH = 6;

export default function OTPInput_2() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const isComplete = otp.every((d) => d !== "");
  const isEmpty = otp.every((d) => d === "");

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  /**
   * 🔥 INPUT CHANGE
   */
  const handleChange = useCallback((e, index) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];

    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }, [otp]);

  /**
   * 🔥 KEYDOWN
   */
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        focusInput(index - 1);
      }

      setOtp(newOtp);
    }

    // navegación opcional (bonus senior)
    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }, [otp]);

  /**
   * 🔥 PASTE (según consigna → limpiar todo)
   */
  const handlePaste = useCallback((e) => {
    e.preventDefault();

    let paste = e.clipboardData.getData("text").replace(/\D/g, "");

    const newOtp = Array(OTP_LENGTH).fill("");

    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = paste[i] || "";
    }

    setOtp(newOtp);

    // foco al último válido
    const lastIndex = Math.min(paste.length, OTP_LENGTH - 1);
    focusInput(lastIndex);
  }, []);

  /**
   * 🔥 RESET
   */
  const handleReset = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    focusInput(0);
  };

  /**
   * 🔥 SUBMIT
   */
  const handleSubmit = async () => {
    const code = otp.join("");

    try {
      const res = await fetch(
        "https://questions.greatfrontend.com/api/questions/auth-code-input",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: code }),
        }
      );

      if (res.status === 204 || res.status === 200) {
        alert("✅ Success");
      } else {
        alert("❌ Invalid OTP");
      }
    } catch (err) {
      alert("⚠️ Network error");
    }
  };

  return (
    <div>
      {/* INPUTS */}
      <div style={{ display: "flex", gap: "10px" }}>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            inputMode="numeric"
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        ))}
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={handleReset} disabled={isEmpty} style={{padding: '20px', cursor: 'pointer'}}>
          Reset
        </button>

        <button onClick={handleSubmit} disabled={!isComplete} style={{padding: '20px', cursor: 'pointer'}}>
          Submit
        </button>
      </div>
    </div>
  );
}