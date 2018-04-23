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

  def commits(name)
    remote_repos(name).commits.list.body
  end

  private

  def remote_repos(name = '')
    github = GithubService.new.client
    # sorting not working in the Gem
    github.repos(user: @user.github_name, repo: name, sort: 'pushed', direction: 'desc')
  end
end
