class RepositoryController < ApplicationController
    def index
      @repos = Repository.all_for_user(current_user)
    end
end
