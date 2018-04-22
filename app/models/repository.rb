class Repository
  def initialize(user)
    @user = user
  end

  def list
    remote_repos.list
  end

  def detail(name)
    remote_repos(name).get.body
  end

  private

  def remote_repos(name = '')
    github = GithubService.new.client
    github.repos(user: @user.github_name, repo: name)
  end
end
