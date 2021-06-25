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
    path: '/doctor-area',
    name: 'doctorArea',
    icon: 'medicineBox',
    access: 'isDoctor',
    component: './DoctorPage/doctorPage',
  },
  {
    name: 'addMedicalRecord',
    path: '/doctor-area/addMedicalRecord',
    component: './DoctorPage/addMedicalRecord',
    hideInMenu: true,
  },
  {
    path: '/vis',
    name: 'visualization',
    icon: 'areaChart',
    routes: [
      {
        name: 'charts',
        path: 'charts',
        component: './Visualization/visualization',
      },
      {
        path: 'map',
        // TODO
      },
      {
        path: 'global',
        // TODO
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: 'sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Admin',
      },
      {
        path: 'user-table-page',
        name: 'user-table',
        component: './UserTable/userTable',
      },
      {
        path: 'appointment-table-page',
        name: 'appointment-table',
        component: './AppointmentTable/appointmentTable',
      },
      {
        path: 'hospital-table-page',
        name: 'hospital-table',
        component: './HospitalTable/hospitalTable',
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
