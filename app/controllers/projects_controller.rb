class ProjectsController < ApplicationController
  def modal
    @project_id = params[:id]
    case @project_id
    when "streaming"
      render partial: "projects/streaming_assistant"
    when "solar"
      render partial: "projects/solar_farm"
    when "petbnb"
      render partial: "projects/petbnb"
    else
      head :not_found
    end
  end
end
