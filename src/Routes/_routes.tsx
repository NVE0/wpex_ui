import { Navigate, RouteObject } from 'react-router-dom';
import defaultProps from '../Config/_defaultProps';

// The routes are defined in the config file, in src/Config/_defaultProps.tsx
// This function converts the routes from the config file to the format that react-router-dom expects
// So the routes are defined in one place, and can be used by both antd and react-router-dom

type ant_route = {
	path: string;
	name?: string;
	icon?: JSX.Element;
	component: JSX.Element;
	routes?: ant_route[];
};

type react_router_route = RouteObject;

function convertRoute(ant_route: ant_route): react_router_route {
	const react_router_route: react_router_route = {
		path: ant_route.path,
		element: ant_route.component,
	};

	if (ant_route.routes) {
		react_router_route.children = ant_route.routes.map(convertRoute);
	}

	return react_router_route;
}

// @ts-ignore
function load_routes_from_config(config): react_router_route[] {
	return config.route.routes.map(convertRoute);
}

let routes = load_routes_from_config(defaultProps);
routes.push({
	path: '/',
	element: <Navigate to="/welcome" />,
});

console.log(routes);

export default routes;
