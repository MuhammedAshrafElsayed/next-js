export const POST_LOGIN_STARTED = 'POST_LOGIN_STARTED'

export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'

export const doLogin = (userInput) => ({type: POST_LOGIN_STARTED, payload: userInput})
