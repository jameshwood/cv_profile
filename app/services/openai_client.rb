require 'openai'

class OpenAIClient
  def initialize
    @client = OpenAI::Client.new(api_key: ENV['OPENAI_ACCESS_TOKEN'])
  end

  def generate_response(prompt)
    response = @client.chat(
      parameters: {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      }
    )
    response.dig("choices", 0, "message", "content")
  end
end
