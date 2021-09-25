import LoginForm from '../components/loginForm';
import {connect} from 'react-redux'
const Index = ({dispatch}) => {
    
	return (
		<LoginForm dispatch= {dispatch}/>
	);
};

// Index.getInitialProps = async ({ store }) => {
// 	return { dispatch: store.dispatch };
// };

// export default connect((state) => state)(Index);

export default Index;
