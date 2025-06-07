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
  TRACING: "/tracing",
  GOALS: "/goals",
  RECENT_GOAL: "/goals/recent",
  DRIVE: "/drive",

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
  getGoalById: (id) => `/goals/${id}`,
  deleteGoal: (id) => `/goals/${id}`,

  // ProductController endpoints
  getProductById: (id) => `/products/${id}`,
  updateProduct: (id) => `/products/${id}`,
  deleteProduct: (id) => `/products/${id}`,

  // ReportController endpoints
  generateExcelReport: () => `/report/generate-excel`,

  // SubJobController endpoints
  getSubJobById: (id) => `/sub-jobs/${id}`,
  listSubJobsByJob: (fkService) => `/sub-jobs/job?fkService=${fkService}`,
  updateSubJob: (id) => `/sub-jobs/${id}`,
  updateSubJobStatus: (id) => `/sub-jobs/${id}/status`,
  deleteSubJob: (id) => `/sub-jobs/${id}`,

  // TaskController endpoints
  getTaskById: (id) => `/tasks/${id}`,
  updateTask: (id) => `/tasks/${id}`,
  deleteTask: (id) => `/tasks/${id}`,
};
