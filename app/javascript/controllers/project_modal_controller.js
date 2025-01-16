import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal", "modalContent"];

  connect() {
    console.log("Project Modal Controller connected!");
  }

show(event) {
  const projectId = event.currentTarget.dataset.modalId;

  fetch(`/projects/${projectId}/modal`, {
    headers: { "Accept": "text/html" },
  })
    .then(response => response.text())
    .then(html => {
      this.modalContentTarget.innerHTML = html;
      this.modalTarget.classList.remove("d-none");
    })
    .catch(error => console.error("Error loading modal content:", error));
}

close(event) {
  // Check if click is outside the modal content or triggered by close button
  if (event.target === this.modalTarget || event.target.classList.contains("close-btn")) {
    this.modalTarget.classList.add("d-none"); // Hide modal
  }
}
}
