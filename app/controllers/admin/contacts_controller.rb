class Admin::ContactsController < ApplicationController
  def index
    @contacts = Contact.all.order(created_at: :desc)
  end
end

