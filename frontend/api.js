// api.js — thin wrapper around the FastAPI backend.
// Change API_BASE_URL if the backend runs somewhere other than localhost:8000.
const API_BASE_URL = "https://mindscape-gjxu.onrender.com";

/**
 * Calls POST /predict on the FastAPI backend.
 * @param {object} payload - matches the StudentData pydantic model exactly.
 * @returns {Promise<{predicted_mental_health_score: number}>}
 */
async function predictMentalHealthScore(payload) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new ApiError(
      "Can't reach the prediction service. Make sure the FastAPI server is running at " +
        API_BASE_URL + ".",
      "network"
    );
  }

  if (!response.ok) {
    let detail = null;
    try {
      const body = await response.json();
      detail = body.detail;
    } catch (_) {
      // response wasn't JSON — ignore, fall back to generic message
    }

    if (response.status === 422) {
      throw new ApiError(
        formatValidationDetail(detail) ||
          "Some of the values entered aren't valid. Please check the form and try again.",
        "validation",
        detail
      );
    }

    throw new ApiError(
      `The prediction service returned an error (${response.status}).`,
      "server"
    );
  }

  return response.json();
}

function formatValidationDetail(detail) {
  if (!Array.isArray(detail) || detail.length === 0) return null;
  const first = detail[0];
  const field = Array.isArray(first.loc) ? first.loc[first.loc.length - 1] : null;
  return field ? `${field}: ${first.msg}` : first.msg;
}

class ApiError extends Error {
  constructor(message, kind, detail) {
    super(message);
    this.kind = kind;
    this.detail = detail;
  }
}
