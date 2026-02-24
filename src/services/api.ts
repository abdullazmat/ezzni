// API Service for Ezzni Admin Dashboard
// Base URL from environment variable

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Helper ─────────────────────────────────────────────────────────────────

interface ApiResponse<T = Record<string, unknown>> {
  ok: boolean;
  status: number;
  data: T;
}

async function request<T = Record<string, unknown>>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only set application/json if body is not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Try to parse JSON; fallback to empty object
  let data: T;
  try {
    data = await response.json();
  } catch {
    data = {} as T;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

// ─── Auth Endpoints ─────────────────────────────────────────────────────────

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    status?: string;
    [key: string]: unknown;
  };
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

export interface LogoutResponse {
  message?: string;
}

// Admin User Profile Types
export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  status: 'Available' | 'Inactive';
  avatar: string | null;
  role: string;
  language?: 'EN' | 'AR' | 'FR';
}

export interface EmploymentDetails {
  department: string | null;
  manager: string | null;
  jobTitle: string | null;
  location: string | null;
  timezone: string | null;
  phone: string | null;
  onboardingDate: string | null;
}

export interface LoginHistoryItem {
  id: number;
  login_time: string;
  logout_time: string | null;
  ip_address: string | null;
}

export interface DashboardMetrics {
  trips: { value: number; trend: number | string };
  drivers: { value: number; trend: number | string };
  earnings: { value: number; trend: number | string };
  bonus: { value: number; trend: number | string };
}

export interface RegionPerformance {
  name: string;
  trips: number;
  drivers: number;
  trend: string;
}

export interface TripPerformance {
  name: string;
  value: number;
  count: number;
}

export interface RevenueDataItem {
  time: string;
  val1: number;
  val2: number;
  val3: number;
  val4: number;
  val5: number;
}

export interface TopDriver {
  id: number;
  name: string;
  idNumber: string;
  location: string;
  trips: number;
  rating: number;
  vehicle: string;
}

export interface TopRider {
  id: number;
  name: string;
  idNumber: string;
  location: string;
  trips: number;
  rating: number;
}

// ─── API Functions ──────────────────────────────────────────────────────────

/**
 * POST /api/admin/auth/login
 */
export async function loginApi(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  return request<LoginResponse>('/api/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/admin/auth/forgot-password
 */
export async function forgotPasswordApi(payload: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
  return request<ForgotPasswordResponse>('/api/admin/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/admin/auth/reset-password
 */
export async function resetPasswordApi(payload: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> {
  return request<ResetPasswordResponse>('/api/admin/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/admin/auth/change-password
 */
export async function changePasswordApi(payload: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
  return request<ChangePasswordResponse>('/api/admin/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/admin/auth/logout
 */
export async function logoutApi(): Promise<ApiResponse<LogoutResponse>> {
  return request<LogoutResponse>('/api/admin/auth/logout', {
    method: 'POST',
  });
}

// ─── Admin User Endpoints ────────────────────────────────────────────────────

/**
 * GET /api/admin/user/profile
 */
export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Available' | 'Inactive';
  avatar: string | null;
  last_login: string | null;
  last_logout: string | null;
}

export async function getAdminProfileApi(): Promise<ApiResponse<AdminProfile>> {
  return request<AdminProfile>('/api/admin/user/profile', {
    method: 'GET',
  });
}

/**
 * PUT /api/admin/user/profile
 * Expects FormData (name, email, role, avatar)
 */
export async function updateAdminProfileApi(formData: FormData): Promise<ApiResponse<{ message: string }>> {
  return request<{ message: string }>('/api/admin/user/profile', {
    method: 'PUT',
    body: formData,
  });
}

/**
 * PUT /api/admin/user/status
 */
export async function updateAdminStatusApi(status: 'Available' | 'Inactive'): Promise<ApiResponse<{ message: string }>> {
  return request<{ message: string }>('/api/admin/user/status', {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

/**
 * PUT /api/admin/user/language
 */
export async function updateAdminLanguageApi(language: 'EN' | 'AR' | 'FR'): Promise<ApiResponse<{ message: string }>> {
  return request<{ message: string }>('/api/admin/user/language', {
    method: 'PUT',
    body: JSON.stringify({ language }),
  });
}

/**
 * GET /api/admin/user/login-history
 */
export async function getLoginHistoryApi(): Promise<ApiResponse<LoginHistoryItem[]>> {
  return request<LoginHistoryItem[]>('/api/admin/user/login-history', {
    method: 'GET',
  });
}

/**
 * GET /api/admin/user/employment-details
 */
export async function getEmploymentDetailsApi(): Promise<ApiResponse<EmploymentDetails>> {
  return request<EmploymentDetails>('/api/admin/user/employment-details', {
    method: 'GET',
  });
}

/**
 * PUT /api/admin/user/employment-details
 */
export async function updateEmploymentDetailsApi(payload: EmploymentDetails): Promise<ApiResponse<{ message: string }>> {
  return request<{ message: string }>('/api/admin/user/employment-details', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function getPrivacyPolicyApi(): Promise<ApiResponse<{ content: string }>> {
  return request<{ content: string }>('/api/admin/settings/privacy-policy');
}

export async function getTermsOfServiceApi(): Promise<ApiResponse<{ content: string }>> {
  return request<{ content: string }>('/api/admin/settings/terms-of-service');
}

export async function getTeamMembersApi(): Promise<ApiResponse<TeamMember[]>> {
  return request<TeamMember[]>('/api/admin/team/members');
}

// ─── Dashboard Endpoints ───────────────────────────────────────────────────

export async function getDashboardMetricsApi(params?: { region?: string }): Promise<ApiResponse<DashboardMetrics>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return request<DashboardMetrics>(`/api/admin/dashboard/metrics${query}`);
}

export async function getRegionsPerformanceApi(): Promise<ApiResponse<RegionPerformance[]>> {
  return request<RegionPerformance[]>('/api/admin/dashboard/regions-performance');
}

export async function getTripsPerformanceApi(params?: { period?: string; metric?: string }): Promise<ApiResponse<TripPerformance[]>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return request<TripPerformance[]>(`/api/admin/dashboard/trips-performance${query}`);
}

export async function getRevenueDataApi(params?: { region?: string; period?: string; metric?: string }): Promise<ApiResponse<RevenueDataItem[]>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return request<RevenueDataItem[]>(`/api/admin/dashboard/revenue-data${query}`);
}

export async function getTopDriversApi(params?: { region?: string }): Promise<ApiResponse<TopDriver[]>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return request<TopDriver[]>(`/api/admin/dashboard/top-drivers${query}`);
}

export async function getTopRidersApi(params?: { region?: string }): Promise<ApiResponse<TopRider[]>> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return request<TopRider[]>(`/api/admin/dashboard/top-riders${query}`);
}
