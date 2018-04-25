class RepositoryController < ApplicationController
  before_action :set_repository

  def index
    @repos = @repository.list
  end

  def show
    @repo = @repository.detail(params[:name])
    @commits = @repository.commits(params[:name])
    @errors = @repository.errors
  end

  def d3_graph
    render 'd3_calendar'
  end

  private

  def set_repository
    @repository = Repository.new(current_user)
  end
end
