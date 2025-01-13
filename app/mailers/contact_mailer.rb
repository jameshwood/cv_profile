class ContactMailer < ApplicationMailer
  default from: 'no-reply@example.com' # Your default sender email

  def send_reminder
    @contact = params[:contact]
    mail(
      to: ENV['GMAIL_USERNAME'],
      subject: "New Contact Form Submission",
      body: "New contact submission:\n\n" +
            "Name: #{@contact.name}\n" +
            "Email: #{@contact.email}\n" +
            "Message: #{@contact.message}\n"
    )
  end
end
