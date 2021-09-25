import { useSelector } from 'react-redux';

const Home = () => {
	const user = useSelector(({userInfo}) => {console.log('alexa','selector', );
	 return userInfo})
	return <div>{user.userName}</div>;
};

export default Home;
