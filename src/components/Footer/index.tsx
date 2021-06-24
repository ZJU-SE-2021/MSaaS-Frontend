import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="Made️ by 2021 ZJU-SE Group with ❤"
    links={[
      {
        key: 'MSaaS',
        title: 'MSaaS',
        href: 'https://msaas.app.ncj.wiki',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ZJU-SE-2021/',
        blankTarget: true,
      },
      {
        key: 'Web Client',
        title: 'Web Client',
        href: 'https://msaas.app.ncj.wiki/webapp',
        blankTarget: true,
      },
    ]}
  />
);
