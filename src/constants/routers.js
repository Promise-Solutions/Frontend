export const ROUTERS = {
  HOME: '/',
  HOME_ALIAS: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  USERS: '/users',
  JOBS: '/jobs',
  JOB_REGISTER: '/register/jobs',
  BAR: '/bar',
  BAR_STOCK: '/bar/stock',
  DASHBOARD: '/dashboard',
  REPORTS: '/reports',
  PROJECTS: '/projects',
  TASKS: '/tasks',
  EXPENSES: '/expenses',
  CALENDAR: '/calendar',

  USER_DETAIL: '/user/:userParam',
  JOB_DETAIL: '/job/:jobId',
  USER_JOB_REGISTER: '/user/:userParam/register/jobs',
  SUBJOB_REGISTER: '/jobs/:jobId/register/subjobs',
  COMMAND: '/command/:command',

  getUserDetail: (userParam) => `/user/${userParam}`,
  getJobDetail: (jobId) => `/job/${jobId}`,
  getUserJobRegister: (userParam) => `/user/${userParam}/register/jobs`,
  getSubJobRegister: (jobId) => `/jobs/${jobId}/register/subjobs`,
  getCommand: (command) => `/command/${command}`,
};