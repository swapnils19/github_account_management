class Repository
  attr_reader :errors

  def initialize(user)
    @user = user
    @errors = []
  end

  def list
    remote_repos.list
  end

  def detail(name)
    remote_repos(name).get.body
  end

  def commits(name)
    remote_repos(name).commits.list.body
  rescue Github::Error::GithubError => _e
    errors.push(I18n.t('repositories.errors.no_commits'))
  end

  private

  def remote_repos(name = '')
    github = GithubService.new.client
    # sorting not working in the Gem
    github.repos(user: @user.github_name, repo: name, sort: 'pushed', direction: 'desc')
  end
end
