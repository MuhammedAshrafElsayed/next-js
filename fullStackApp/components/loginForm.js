import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useSwr from 'swr';
import axios from 'axios';
import {doLogin} from '../actions/login';
import {connect, useDispatch} from 'react-redux'

const fetch= (url, body) => {
  return axios(url, )
}
const LoginForm =  () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ validated, setValidated ] = useState(false);
	const dispatch = useDispatch();
console.log('alexa','dispatch', dispatch);

	const handleChanges = (event) => {

		switch (event.target.type) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			default:
				break;
		}
	};
	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		console.log('alexa', 'submit', form.checkValidity());
    event.preventDefault();
    event.stopPropagation();
		if (form.checkValidity() === false) {
			setValidated(false);
		} else {
			setValidated(true);
	  // useSwr('api/login', post);
	  dispatch(doLogin({email,password}));
    //  const result = await axios.post( "/api/login", {email,password} );
    //  result.status == 201 ? console.log('alexa','login success', result.data): console.log('alexa','login failed', result) 
     
		}
	};
	console.log('alexa', 'email', email);

	return (
		<Form validated={validated} onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" value={email} onChange={handleChanges} required placeholder="Enter email" />
				<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" value={password} onChange={handleChanges} required placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="formBasicCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};
export default LoginForm;
