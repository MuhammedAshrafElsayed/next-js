import Link from 'next/link';
export default () => (
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<Link href="/">
				<a class="nav-link active">
					Login
				</a>
			</Link>
		</li>
		<li class="nav-item">
			<Link href="/home">
				<a class="nav-link">Home</a>
			</Link>
		</li>
		<li class="nav-item">
			<Link href="/">
				<a class="nav-link" >
					Link
				</a>
			</Link>
		</li>
		<li class="nav-item">
			<Link href="/">
				<a class="nav-link disabled" tabindex="-1" aria-disabled="true">
					Disabled
				</a>
			</Link>
		</li>
	</ul>
);
