class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[login register]

  # POST /register
  def register
    @user = User.create(user_params)
    if @user.save
      response = { message: 'User created successfully' }
      render json: response, status: :created
    else
      render json: @user.errors, status: :bad
    end
  end

  # POST /login
  def login
    authenticate params[:email], params[:password]
  end

  def test
    render json: { message: 'Passed auth tests' }
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)
    if command.success?
      render json: {
        access_token: command.result,
        message: 'Login successful'
      }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end