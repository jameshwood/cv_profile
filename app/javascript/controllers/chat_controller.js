import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output", "form"]

  connect() {
    this.messages = [];  // Store conversation history
    this.appendMessage("system", "Welcome to the James Wood Console! Ask me about James's education, experience, interests, or projects. If I don't know the answer, I'll suggest reaching out directly.");
  }

  async submit(event) {
    event.preventDefault();

    const prompt = this.inputTarget.value.trim();
    if (!prompt) return;

    // Append user's message
    this.appendMessage("user", prompt);
    this.inputTarget.value = "";  // Clear input

    // Send request to Rails API endpoint
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt, persona: "james_wood" })
    });

    const result = await response.json();
    this.appendMessage("gpt", result.text);
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
    this.outputTarget.scrollTop = this.outputTarget.scrollHeight;  // Scroll to the bottom
  }
}
