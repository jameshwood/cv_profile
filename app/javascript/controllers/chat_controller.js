import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output", "form", "select"]

  connect() {
    this.messages = []  // Store conversation history
  }

  async submit(event) {
    event.preventDefault()

    const gptType = this.selectTarget.value  // Type of GPT (e.g., GPT-4, custom)
    const prompt = this.inputTarget.value.trim()

    if (!prompt) return

    // Append user message
    this.appendMessage("user", prompt)
    this.inputTarget.value = ""

    // Send request to Rails API endpoint
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt, gpt_type: gptType })
    })

    const result = await response.json()
    this.appendMessage("gpt", result.text)
  }

  appendMessage(sender, content) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender === "user" ? "user" : "gpt"}`
    messageDiv.innerText = content
    this.outputTarget.appendChild(messageDiv)
    this.outputTarget.scrollTop = this.outputTarget.scrollHeight
  }
}
