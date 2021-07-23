import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Pages from './pages';

const Routes = () => {
	const [currentComponent, setCurrentComponent] = useState(
		// localStorage.getItem('token') && localStorage.getItem('token').length > 9
		//   ? 'home'
		//   : 'login'
		'home'
	);
	const [id, setId] = useState(0);

	const theComponent = () => {
		switch (currentComponent) {
			case 'home':
				return <Pages.Home changeMainComponent={setCurrentComponent} />;
			case 'login':
				return <Pages.Login changeMainComponent={setCurrentComponent} />;

			case 'signup':
				return <Pages.SignUp changeMainComponent={setCurrentComponent} />;
		}
	};
	return <>{theComponent()}</>;
	return (
		<>
			{localStorage.getItem('token') &&
			localStorage.getItem('token').length > 9 ? (
				<Switch>
					<Route path="/" exact component={Pages.Home} />
					<Route path="/login" exact component={Pages.Login} />

					<Redirect to="/" />
				</Switch>
			) : (
				<Switch>
					<Route path="/signup" exact component={Pages.SignUp} />
					<Route path="/login" exact component={Pages.Login} />
					<Redirect to="/login" />
				</Switch>
			)}
		</>
	);
};

export default Routes;
