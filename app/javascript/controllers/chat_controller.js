import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output", "form"]

  connect() {
    this.messages = [];  // Store conversation history
    this.appendMessage("system", "Welcome to the James Wood Console! Ask me about James's education, experience, interests, or projects. If I don't know the answer, I'll suggest reaching out directly.");
  }

  async submit(event) {
    event.preventDefault();

    const csrfToken = document.querySelector("[name='csrf-token']").content;  // Get CSRF token
    const prompt = this.inputTarget.value.trim();
    if (!prompt) return;

    // Append user's message to the chat console
    this.appendMessage("user", prompt);
    this.inputTarget.value = "";  // Clear the input field

    const typingIndicator = this.appendMessage("system", "James Wood is typing...");

    try {
      // Send POST request to /generate endpoint
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken  // CSRF token included here
        },
        body: JSON.stringify({ prompt: prompt })  // Send the prompt as JSON
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();  // Parse the JSON response
      this.appendMessage("gpt", result.text);  // Add GPT's response to the chat console

    } catch (error) {
      console.error("Error:", error);
      this.appendMessage("system", "Something went wrong. Please try again or contact support.");
    }
  }

  appendMessage(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    if (sender === "user") {
      messageDiv.innerHTML = `<span style="color: #00FF00;">User: </span>${content}`;
    } else if (sender === "gpt") {
      messageDiv.innerHTML = `<span style="color: #FFD700;">James Wood: </span>${content}`;
    } else {
      messageDiv.innerHTML = `<span style="color: #00BFFF;">System: </span>${content}`;
    }

    this.outputTarget.appendChild(messageDiv);
    this.outputTarget.scrollTop = this.outputTarget.scrollHeight;  // Scroll to the bottom of the chat
  }
}
