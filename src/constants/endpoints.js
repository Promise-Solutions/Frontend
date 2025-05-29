export const ENDPOINTS = {
  CLIENTS: "/clients",
  EMPLOYEES: "/employees",
  JOBS: "/jobs",
  SUBJOBS: "/sub-jobs",
  COMMANDS: "/commands",
  PRODUCTS: "/products",
  COMMAND_PRODUCTS: "/command-products",
  DASHBOARD_GENERAL_STATS: "/dashboard/general-stats",
  REPORTS: "/reports",
  TASKS: "/tasks",
  DASHBOARD_BAR_FINANCES: `/dashboard/bar-finances`,
  EXPENSES: "/expenses",

  getClientById: (id) => `/clients/${id}`,
  getEmployeeById: (id) => `/employees/${id}`,
  getJobById: (id) => `/jobs/${id}`,
  getSubJobById: (id) => `/sub-jobs/${id}`,
  getSubJobByJob: (jobId) => `/sub-jobs/job?fkService=${jobId}`,
  getJobsByClient: (clientId) => `/jobs/client?fkClient=${clientId}`,
  getCommandById: (id) => `/commands/${id}`,
  getProductById: (id) => `/products/${id}`,
  getDashboardClientStats: (idClient) => `/dashboard/client-stats/${idClient}`,
  getCommandProductsByCommand: (commandId) =>
    `/command-products?fkComanda=${commandId}`,
  getCommandProductsByProduct: (productId) => `/command-products/${productId}`,
  getCommandByStatus: (status) => `/commands?status=${status}`,
  getTaskById: (taskId) => `/tasks/${taskId}`,
  getExpenseById: (expenseId) => `/expenses/${expenseId}`,

  // DashboardController endpoints
  getDashboardFrequencys: () => `/dashboard/frequencys`,
  getDashboardActives: () => `/dashboard/actives`,
  getDashboardCategoryBalances: () => `/dashboard/category-balances`,
  getDashboardBarBalances: () => `/dashboard/bar-balances`,
  getDashboardBalances: () => `/dashboard/balances`,
  getDashboardRecentTime: () => `/dashboard/recent-time`,

  // DriveController endpoints
  driveUpload: () => `/drive`,
  driveList: () => `/drive`,
  driveDelete: (fileId) => `/drive/${fileId}`,
  driveDownload: (fileId) => `/drive/download/${fileId}`,

  // EmployeeController endpoints
  employeeLogin: () => `/employees/login`,

  // GoalController endpoints
  createGoal: () => `/goals`,
  getGoalById: (id) => `/goals/${id}`,
  listGoals: () => `/goals`,
  getMostRecentGoal: () => `/goals/recent`,
  updateGoal: () => `/goals`,
  deleteGoal: (id) => `/goals/${id}`,
};
