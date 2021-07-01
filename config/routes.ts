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
    access: 'isDoctor',
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
        name: 'map',
        path: 'map',
        component: './Visualization/MapView',
      },
      {
        name: 'global',
        path: 'global',
        component: './Visualization/Chart',
      },
    ],
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
        path: 'hospital-table-page',
        name: 'hospital-table',
        component: './HospitalTable/hospitalTable',
      },
      {
        name: 'department-table-page',
        path: 'hospital-table-page/department-table-page',
        access: 'canAdmin',
        component: './HospitalTable/departmentTable',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'accountSetting',
    path: 'accountSetting',
    component: './AccountSetting/accountSetting',
    icon: 'setting',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
