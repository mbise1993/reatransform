class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register]

  # POST /auth/register
  def register
    user = User.create(user_params)
    if user.save
      response = { 
        token: create_token(user),
        id: user.id,
        username: user.username
      }
      render json: response, status: :created
    else
      render json: user.errors, status: :bad
    end
  end

  # POST /auth/login
  def login
    result = authenticate params[:username], params[:password]
    if result.include? :user 
      response = {
        token: result[:token],
        id: result[:user].id,
        username: result[:user].username
      }
      
      render json: response
    else 
      render json: { error: result.error }, status: :unauthorized
    end
  end

  def test
    render json: { message: 'Passed auth tests' }
  end

  private

  def user_params
    params.permit(:username, :password)
  end

  def authenticate(username, password)
    user = User.find_by_username(username)
    if user
      if user.authenticate(password)
        return { user: user, token: create_token(user) }
      else
        return { error: 'Incorrect password' }
      end
    else
      return { error: 'Username not found' }
    end
  end

  def create_token(user)
    return JsonWebToken.encode(user_id: user.id)
  end
end
