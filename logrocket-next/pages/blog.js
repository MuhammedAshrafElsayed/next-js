import Layout from '../components/Layout';
import PostLink from '../components/PostLink';
const Blog = () => (
	<div>
		<Layout>
			<h1>My Blog</h1>
			<ul>
				<PostLink id="hello-nextjs" />
				<PostLink id="learn-nextjs" />
				<PostLink id="deploy-nextjs" />
			</ul>
			<style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
		</Layout>
	</div>
);
export default Blog;
