import { RouteContext, RouteContextType } from '@ant-design/pro-components';

const Page = () => (
	<RouteContext.Consumer>
		{(value: RouteContextType) => {
			const { isMobile, hasHeader, hasSiderMenu, collapsed } = value;

			return JSON.stringify({
				isMobile,
				hasHeader,
				hasSiderMenu,
				collapsed,
			});
		}}
	</RouteContext.Consumer>
);

export default Page;
