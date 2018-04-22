class GithubService
  attr_reader :client

  def initialize(oauth_token = '')
    @client = Github.new(client_id: ENV['GITHUB_CLIENT_ID'],
                         client_secret: ENV['GITHUB_CLIENT_SECRET'],
                         oauth_token: oauth_token)
  end
end
