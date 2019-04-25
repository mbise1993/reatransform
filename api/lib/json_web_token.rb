class JsonWebToken
  def self.encode(payload, exp = 2.hours.from_now)
    # set token expiry time
    payload[:exp] = exp.to_i

    # encode user data with our secret key
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    # decode token to get payload
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    HashWithIndifferentAccess.new body

  rescue JWT::ExpiredSignature, JWT::VerificationError => e
    raise ExceptionHandler::ExpiredSignature, e.message
  rescue JWT::DecodeError, JWT::VerificationError => e
    raise ExceptionHandler::DecodeError, e.message
  end
end