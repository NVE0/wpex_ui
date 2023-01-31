import { RouteContext, RouteContextType } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

const Page = () => (

  <RouteContext.Consumer>
    {(value: RouteContextType) => {
      const { isMobile, hasHeader, hasSiderMenu, collapsed } = value;
        // Retrieve content from "component" in defaultProps.tsx
        const c = defaultProps

      return JSON.stringify({ isMobile, hasHeader, hasSiderMenu, collapsed });
    }}
  </RouteContext.Consumer>
);

export default Page;
