// app.js — form wiring, UI state transitions, and result rendering.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("predict-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const predictAgainBtn = document.getElementById("predict-again-btn");
  const retryBtn = document.getElementById("retry-btn");
  const formLevelError = document.getElementById("form-level-error");
  const apiBaseLabel = document.getElementById("api-base-label");

  const states = {
    idle: document.getElementById("state-idle"),
    loading: document.getElementById("state-loading"),
    success: document.getElementById("state-success"),
    error: document.getElementById("state-error"),
  };

  apiBaseLabel.textContent = API_BASE_URL;

  let lastPayload = null;

  function showState(name) {
    Object.entries(states).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
  }

  function setSubmitting(isSubmitting) {
    submitBtn.disabled = isSubmitting;
    submitBtn.classList.toggle("is-loading", isSubmitting);
  }

  function clearFieldErrors() {
    form.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
    formLevelError.hidden = true;
    formLevelError.textContent = "";
  }

  function buildPayload() {
    const data = new FormData(form);
    return {
      age: Number(data.get("age")),
      gender: data.get("gender"),
      country: data.get("country"),
      academic_level: data.get("academic_level"),
      most_used_platform: data.get("most_used_platform"),
      purpose_of_use: data.get("purpose_of_use"),
      avg_daily_usage_hours: Number(data.get("avg_daily_usage_hours")),
      daily_unlocks: Number(data.get("daily_unlocks")),
      study_hours: Number(data.get("study_hours")),
      physical_activity_hours: Number(data.get("physical_activity_hours")),
      sleep_hours_per_night: Number(data.get("sleep_hours_per_night")),
      stress_level: data.get("stress_level"),
    };
  }

  // Score interpretation is a client-side heuristic layered on top of the
  // real prediction for readability. It assumes the model's target sits on
  // a 0–10 scale (consistent with the source dataset for this project).
  // Adjust these bands/scale if your model's actual output range differs.
  const SCORE_MAX = 10;
  const BANDS = [
    { max: 3.9, label: "Struggling", color: "var(--error)", bg: "#FBEAE6" },
    { max: 6.4, label: "Coping", color: "var(--warning)", bg: "#FBF1E3" },
    { max: 8.4, label: "Balanced", color: "var(--info)", bg: "#E9F1F6" },
    { max: SCORE_MAX, label: "Thriving", color: "var(--success)", bg: "#E9F5EC" },
  ];

  function bandFor(score) {
    return BANDS.find((b) => score <= b.max) || BANDS[BANDS.length - 1];
  }

  function renderResult(score) {
    const clamped = Math.max(0, Math.min(SCORE_MAX, score));
    const fraction = clamped / SCORE_MAX;
    const circumference = 251.2; // matches stroke-dasharray in CSS

    document.getElementById("score-number").textContent = score.toFixed(1);

    const gaugeFill = document.getElementById("gauge-fill");
    const band = bandFor(clamped);
    gaugeFill.style.stroke = band.color;
    // Force reflow so the transition replays on repeated predictions.
    gaugeFill.style.transition = "none";
    gaugeFill.style.strokeDashoffset = String(circumference);
    void gaugeFill.getBoundingClientRect();
    gaugeFill.style.transition = "";
    requestAnimationFrame(() => {
      gaugeFill.style.strokeDashoffset = String(circumference * (1 - fraction));
    });

    const bandEl = document.getElementById("result-band");
    bandEl.textContent = band.label;
    bandEl.style.color = band.color;
    bandEl.style.background = band.bg;

    document.getElementById("result-note").textContent =
      "Based on the habits and routine you entered, relative to other students in the model.";

    showState("success");
  }

  async function runPrediction(payload) {
    setSubmitting(true);
    showState("loading");
    clearFieldErrors();

    try {
      const result = await predictMentalHealthScore(payload);
      renderResult(result.predicted_mental_health_score);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      document.getElementById("error-message").textContent = message;
      showState("error");
    } finally {
      setSubmitting(false);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFieldErrors();

    if (!form.reportValidity()) return;

    lastPayload = buildPayload();
    runPrediction(lastPayload);
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    clearFieldErrors();
    showState("idle");
  });

  predictAgainBtn.addEventListener("click", () => {
    showState("idle");
    form.querySelector("input, select")?.focus();
  });

  retryBtn.addEventListener("click", () => {
    if (lastPayload) {
      runPrediction(lastPayload);
    } else {
      showState("idle");
    }
  });
});
