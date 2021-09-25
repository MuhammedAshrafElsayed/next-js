import axios from 'axios';
export default async ({ email, password }) => {
	return await axios.post('/api/login', { email, password });
	result.status == 201
		? console.log('alexa', 'login success', result.data)
		: console.log('alexa', 'login failed', result);
};
