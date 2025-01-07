import { Controller } from "@hotwired/stimulus";

// Controls the tab switching and sidebar interactions
export default class extends Controller {
  static targets = ["dropdown"];

  connect() {
    console.log("Tabs controller connected!");
    this.activeDropdowns = new Set();
  }

  showTab(event) {
    event.preventDefault();
    event.stopPropagation();

    const tabId = event.currentTarget.dataset.tabId;

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active-tab");
    });

    // Highlight the selected link
    event.currentTarget.classList.add("active-tab");

      // Hide all content sections
      document.querySelectorAll("[data-tab-target]").forEach((tab) => {
        tab.classList.add("d-none");
      });

      // Show the active tab content
      document.querySelector(`[data-tab-target="${tabId}"]`).classList.remove("d-none");

    const parentDropdown = event.currentTarget.closest("ul[data-tab-target='dropdown']");
    if (parentDropdown) {
      console.log("Parent dropdown for", tabId, "is:", parentDropdown);
      parentDropdown.classList.remove("d-none"); // Keep the dropdown open
    }


  }

  toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.currentTarget.nextElementSibling;

    // Toggle dropdown visibility
    dropdown.classList.toggle("d-none");

    if (!dropdown.classList.contains("d-none")) {
      // Add to activeDropdowns set
      this.activeDropdowns.add(dropdown);
    } else {
      // Remove from activeDropdowns if closed
      this.activeDropdowns.delete(dropdown);
    }
  }

  async sendGPTRequest(event) {
    event.preventDefault();
    const textarea = this.element.querySelector("textarea");
    const userInput = textarea.value;

    const response = await fetch("/gpt_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });
    const result = await response.json();
    alert(`GPT Response: ${result.message}`);
  }
}
