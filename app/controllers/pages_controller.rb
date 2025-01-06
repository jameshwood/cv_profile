class PagesController < ApplicationController
  def home
    @movies = TmdbService.fetch_movies
  end
end
