class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      # Send email after saving to database
      ContactMailer.with(contact: @contact).send_reminder.deliver_now
      redirect_to root_path, notice: 'Your message has been sent successfully!'
    else
      redirect_to root_path, alert: 'An error occurred while saving your message.'
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end
