export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: './vis',
    name: 'visualization',
    icon: 'areaChart',
    access: 'canAdmin',
    component: './Visualization/visualization',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Admin',
      },
      {
        path: '/admin/user-table-page',
        name: 'user-table',
        component: './UserTable/userTable',
      },
      {
        path: '/admin/appointment-table-page',
        name: 'appointment-table',
        component: './AppointmentTable/appointmentTable',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
