import React from 'react'
import { img_url } from './configuration';

const ErrorPage = () => {
	sessionStorage.clear();
  return (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Connection Error</h2>
			<p>The connection to the server is temporarily unavailable.</p>
			<a href="/">home page</a>
		</div>
	</div>
  )
}

export default ErrorPage