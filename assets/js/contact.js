/**
 * BlixToys contact enquiry integration
 * Endpoint restored from the previous website's existing Cloudflare Worker.
 * The form markup/layout is unchanged.
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#project-enquiry-form");
  if (!form) return;

  const messageElement = document.querySelector("#form-message");
  const submitButton = form.querySelector('button[type="submit"]');
  const apiUrl = (form.dataset.workerUrl || "").trim();

  if (!messageElement || !submitButton) {
    console.error("Contact form is missing its status or submit element.");
    return;
  }

  const originalButtonHTML = submitButton.innerHTML;

  function showMessage(message, type = "") {
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`.trim();
    messageElement.setAttribute("role", "status");
    messageElement.setAttribute("aria-live", "polite");
  }

  function setLoading(loading) {
    submitButton.disabled = loading;
    form.setAttribute("aria-busy", loading ? "true" : "false");
    submitButton.innerHTML = loading
      ? "<span>Submitting enquiry...</span>"
      : originalButtonHTML;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitButton.disabled || !form.reportValidity()) return;

    showMessage("");

    if (!apiUrl) {
      showMessage(
        "The enquiry service is not configured. Please contact admin@blixtoys.com.",
        "error"
      );
      return;
    }

    const formData = new FormData(form);
    const consentField = form.elements.namedItem("consent");

    // Keep the payload field names expected by the existing Worker / Google Sheet.
    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      quantity: String(formData.get("quantity") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      consent: Boolean(consentField && consentField.checked),
      website: String(formData.get("website") || "").trim(),
      sourcePage: window.location.href
    };

    // Spam honeypot: silently stop automated submissions.
    if (payload.website) return;

    if (!payload.name || !payload.email || !payload.message) {
      showMessage("Please complete all required fields.", "error");
      return;
    }
    if (!payload.consent) {
      showMessage("Please agree to be contacted about this enquiry.", "error");
      return;
    }

    setLoading(true);
    showMessage("Submitting your project enquiry...", "loading");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("The enquiry server returned an unreadable response.");
      }

      if (!response.ok || result.success === false) {
        const statusMessages = {
          400: "Please check your enquiry details and try again.",
          403: "The enquiry request was not authorized.",
          413: "Your enquiry is too large.",
          415: "The server rejected the request format.",
          429: "Too many submissions. Please try again later.",
          502: "We couldn't save your enquiry. Please try again later."
        };
        throw new Error(
          result.error || statusMessages[response.status] ||
          `The enquiry server returned HTTP ${response.status}.`
        );
      }

      form.reset();
      showMessage(
        "Thank you! Your enquiry has been submitted successfully. Our team will get in touch with you.",
        "success"
      );
    } catch (error) {
      console.error("Contact form submission failed:", error);
      const isLikelyCors = error instanceof TypeError;
      showMessage(
        isLikelyCors
          ? "The enquiry service could not be reached. Please check the Cloudflare Worker CORS allow-origin setting for this website and ensure OPTIONS requests are supported."
          : (error.message || "Unable to submit your enquiry. Please try again later."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  });
});
