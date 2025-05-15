// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add current year to footer copyright
  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace("2024", currentYear);
  }
});

function updateDateTime() {
  const now = new Date();
  const pstOptions = {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const pstDateTime = now.toLocaleString("en-US", pstOptions);
  document.getElementById(
    "currentDateTime"
  ).textContent = `As of ${pstDateTime} (PST)`;
}

// Update immediately when the page loads
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);
