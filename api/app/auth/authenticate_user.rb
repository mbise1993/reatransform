class AuthenticateUser
  prepend SimpleCommand
  attr_accessor :username, :password

  # this is where parameters are taken when the command is called
  def initialize(username, password)
    @username = username
    @password = password
  end

  # this is where the result gets returned
  def call
    user = User.find_by_username(username)
    if user && user.authenticate(password)
      return { user: user, token: JsonWebToken.encode(user_id: user.id) }
    else
      errors.add :user_authentication, 'Invalid credentials'
      return nil
    end
  end
end