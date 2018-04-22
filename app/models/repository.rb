class Repository < ApplicationRecord
  class << self
    def all_for_user(user)
      github = GithubService.new.client
      github.repos(user: user.github_name).list
    end
  end
end
