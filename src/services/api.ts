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

export async function createDriverApi(payload: any): Promise<ApiResponse<{ message: string; id: number }>> {
  return request<{ message: string; id: number }>('/api/drivers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getRidersApi(): Promise<ApiResponse<Passenger[]>> {

  return request<Passenger[]>('/api/riders');
}

// ─── Passenger Endpoints ───────────────────────────────────────────────────

export interface Passenger {
  id: number;
  phone: string;
  name: string;
  email: string;
  imageUrl: string | null;
  dob: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  cityId: number | null;
  isRegistered: boolean;
  createdAt: string;
}

export interface PassengerLoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: Passenger;
    isRegistered: boolean;
  };
  timestamp: string;
}

export interface PassengerProfileResponse {
  status: string;
  message: string;
  data: {
    user: Passenger;
  };
  timestamp: string;
}

export interface PassengerService {
  id: number;
  name: string;
  icon_url: string | null;
}

export interface RideOption {
  id: number;
  ridePreference: string;
  ridePreferenceKey: string;
  description: string;
  price: number;
}

export interface CalculateRidePriceRequest {
  pickup: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dropoff: {
    latitude: number;
    longitude: number;
    address: string;
  };
  passengerServiceId: number;
  couponCode?: string;
}

export interface CalculateRidePriceResponse {
  status: string;
  message: string;
  data: {
    passengerService: PassengerService;
    distance: number;
    estimatedDuration: number;
    pickup: CalculateRidePriceRequest['pickup'];
    dropoff: CalculateRidePriceRequest['dropoff'];
    options: RideOption[];
    coupon?: {
      id: number;
      code: string;
      discountAmount: number;
    };
  };
  timestamp: string;
}

export interface City {
  id: number;
  name: string;
  status: string;
}

/**
 * POST /api/passenger/login
 */
export async function passengerLoginApi(phone: string): Promise<ApiResponse<PassengerLoginResponse>> {
  return request<PassengerLoginResponse>('/api/passenger/login', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

/**
 * POST /api/passenger/complete-registration
 */
export async function completePassengerRegistrationApi(formData: FormData): Promise<ApiResponse<PassengerProfileResponse>> {
  return request<PassengerProfileResponse>('/api/passenger/complete-registration', {
    method: 'POST',
    body: formData,
  });
}

/**
 * GET /api/passenger/profile
 */
export async function getPassengerProfileApi(): Promise<ApiResponse<PassengerProfileResponse>> {
  return request<PassengerProfileResponse>('/api/passenger/profile', {
    method: 'GET',
  });
}

/**
 * PUT /api/passenger/profile
 */
export async function updatePassengerProfileApi(formData: FormData): Promise<ApiResponse<PassengerProfileResponse>> {
  return request<PassengerProfileResponse>('/api/passenger/profile', {
    method: 'PUT',
    body: formData,
  });
}

/**
 * GET /api/passenger/services
 */
export async function getPassengerServicesApi(): Promise<ApiResponse<{ status: string; data: PassengerService[] }>> {
  return request<{ status: string; data: PassengerService[] }>('/api/passenger/services', {
    method: 'GET',
  });
}

/**
 * POST /api/passenger/calculate-ride-price
 */
export async function calculateRidePriceApi(payload: CalculateRidePriceRequest): Promise<ApiResponse<CalculateRidePriceResponse>> {
  return request<CalculateRidePriceResponse>('/api/passenger/calculate-ride-price', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/coupons/seed
 */
export async function seedCouponApi(): Promise<ApiResponse<{ status: string; message: string; data: any }>> {
  return request<{ status: string; message: string; data: any }>('/api/coupons/seed', {
    method: 'POST',
  });
}

/**
 * GET /api/coupons/validate/:code
 */
export async function validateCouponApi(code: string, price: number): Promise<ApiResponse<{ status: string; message: string; data: any }>> {
  return request<{ status: string; message: string; data: any }>(`/api/coupons/validate/${code}?price=${price}`, {
    method: 'GET',
  });
}

/**
 * GET /api/cities
 */
export async function getCitiesApi(): Promise<ApiResponse<{ status: string; data: City[] }>> {
  return request<{ status: string; data: City[] }>('/api/cities', {
    method: 'GET',
  });
}

// ─── Driver Endpoints ──────────────────────────────────────────────────────

export interface DriverServiceType {
  id: number;
  name: string;
  displayName: string;
}

export interface DriverStatus {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isNationalIdCompleted?: boolean;
  isDriverLicenseCompleted?: boolean;
  isProfessionalCardCompleted?: boolean;
  isVehicleRegistrationCompleted?: boolean;
  isVehicleInsuranceCompleted?: boolean;
  isVehicleDetailsCompleted?: boolean;
  isVehiclePhotosCompleted?: boolean;
  isFaceVerificationCompleted?: boolean;
  isTaxiLicenseCompleted?: boolean;
  rejectionReason?: string;
}

export interface Driver {
  id: number;
  phone: string;
  name: string;
  email: string;
  imageUrl: string | null;
  dob: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  cityId: number | null;
  isRegistered: boolean;
  serviceType: DriverServiceType | null;
  createdAt: string;
  carRideStatus?: DriverStatus;
  motorcycleStatus?: DriverStatus;
  taxiStatus?: DriverStatus;
  rentalProfile?: any;
}

export interface DriverLoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: Driver;
    isRegistered: boolean;
  };
  timestamp: string;
}

export interface DriverProfileResponse {
  status: string;
  message: string;
  data: {
    user: Driver;
  };
  timestamp: string;
}

/**
 * POST /api/driver/login
 */
export async function driverLoginApi(phone: string): Promise<ApiResponse<DriverLoginResponse>> {
  return request<DriverLoginResponse>('/api/driver/login', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

/**
 * POST /api/driver/complete-registration
 */
export async function completeDriverRegistrationApi(formData: FormData): Promise<ApiResponse<DriverProfileResponse>> {
  return request<DriverProfileResponse>('/api/driver/complete-registration', {
    method: 'POST',
    body: formData,
  });
}

/**
 * GET /api/driver/profile
 */
export async function getDriverProfileApi(): Promise<ApiResponse<DriverProfileResponse>> {
  return request<DriverProfileResponse>('/api/driver/profile', {
    method: 'GET',
  });
}

/**
 * PUT /api/driver/profile
 */
export async function updateDriverProfileApi(formData: FormData): Promise<ApiResponse<DriverProfileResponse>> {
  return request<DriverProfileResponse>('/api/driver/profile', {
    method: 'PUT',
    body: formData,
  });
}

/**
 * GET /api/driver/services
 */
export async function getDriverServicesApi(): Promise<ApiResponse<{ status: string; data: DriverServiceType[] }>> {
  return request<{ status: string; data: DriverServiceType[] }>('/api/driver/services', {
    method: 'GET',
  });
}

/**
 * POST /api/driver/select-service
 */
export async function selectDriverServiceApi(serviceTypeId: number): Promise<ApiResponse<DriverProfileResponse>> {
  return request<DriverProfileResponse>('/api/driver/select-service', {
    method: 'POST',
    body: JSON.stringify({ serviceTypeId }),
  });
}

/**
 * GET /api/driver/preferences
 */
export async function getDriverPreferencesApi(): Promise<ApiResponse<{ status: string; data: any[] }>> {
  return request<{ status: string; data: any[] }>('/api/driver/preferences', {
    method: 'GET',
  });
}

/**
 * POST /api/driver/status/online
 */
export async function goOnlineApi(preferenceIds: number[]): Promise<ApiResponse<{ status: string; message: string }>> {
  return request<{ status: string; message: string }>('/api/driver/status/online', {
    method: 'POST',
    body: JSON.stringify({ preferenceIds }),
  });
}

/**
 * POST /api/driver/status/offline
 */
export async function goOfflineApi(): Promise<ApiResponse<{ status: string; message: string }>> {
  return request<{ status: string; message: string }>('/api/driver/status/offline', {
    method: 'POST',
  });
}

/**
 * POST /api/driver/rental/profile
 */
export async function createRentalProfileApi(formData: FormData): Promise<ApiResponse<{ status: string; message: string; data: any }>> {
  return request<{ status: string; message: string; data: any }>('/api/driver/rental/profile', {
    method: 'POST',
    body: formData,
  });
}

/**
 * GET /api/driver/rental/profile
 */
export async function getRentalProfileApi(): Promise<ApiResponse<{ status: string; message: string; data: any }>> {
  return request<{ status: string; message: string; data: any }>('/api/driver/rental/profile', {
    method: 'GET',
  });
}
/**
 * GET /api/driver/car-rides/status
 */
export async function getCarRidesStatusApi(): Promise<ApiResponse<{
  status: string;
  isNationalIdCompleted: boolean;
  isDriverLicenseCompleted: boolean;
  isProfessionalCardCompleted: boolean;
  isVehicleRegistrationCompleted: boolean;
  isVehicleInsuranceCompleted: boolean;
  isVehicleDetailsCompleted: boolean;
  isVehiclePhotosCompleted: boolean;
  isFaceVerificationCompleted: boolean;
}>> {
  return request<any>('/api/driver/car-rides/status', { method: 'GET' });
}

/**
 * POST /api/driver/car-rides/national-id
 */
export async function uploadNationalIdApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/national-id', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/driver-license
 */
export async function uploadDriverLicenseApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/driver-license', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/professional-card
 */
export async function uploadProfessionalCardApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/professional-card', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/vehicle-registration
 */
export async function uploadVehicleRegistrationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/vehicle-registration', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/insurance
 */
export async function uploadVehicleInsuranceApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/insurance', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/vehicle-details
 */
export async function updateVehicleDetailsApi(payload: any): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/vehicle-details', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/driver/car-rides/vehicle-photos
 */
export async function uploadVehiclePhotosApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/vehicle-photos', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/car-rides/face-verification
 */
export async function uploadFaceVerificationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/car-rides/face-verification', { method: 'POST', body: formData });
}

/**
 * GET /api/driver/motorcycle/status
 */
export async function getMotorcycleStatusApi(): Promise<ApiResponse<{
  status: string;
  isNationalIdCompleted: boolean;
  isDriverLicenseCompleted: boolean;
  isProfessionalCardCompleted: boolean;
  isVehicleRegistrationCompleted: boolean;
  isVehicleInsuranceCompleted: boolean;
  isVehicleDetailsCompleted: boolean;
  isVehiclePhotosCompleted: boolean;
  isFaceVerificationCompleted: boolean;
}>> {
  return request<any>('/api/driver/motorcycle/status', { method: 'GET' });
}

/**
 * POST /api/driver/motorcycle/national-id
 */
export async function uploadMotorcycleNationalIdApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/national-id', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/driver-license
 */
export async function uploadMotorcycleDriverLicenseApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/driver-license', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/professional-card
 */
export async function uploadMotorcycleProfessionalCardApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/professional-card', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/vehicle-registration
 */
export async function uploadMotorcycleVehicleRegistrationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/vehicle-registration', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/insurance
 */
export async function uploadMotorcycleVehicleInsuranceApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/insurance', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/vehicle-details
 */
export async function updateMotorcycleVehicleDetailsApi(payload: any): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/vehicle-details', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/driver/motorcycle/vehicle-photos
 */
export async function uploadMotorcycleVehiclePhotosApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/vehicle-photos', { method: 'POST', body: formData });
}

/**
 * POST /api/driver/motorcycle/face-verification
 */
export async function uploadMotorcycleFaceVerificationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/motorcycle/face-verification', { method: 'POST', body: formData });
}

// ─── Taxi Onboarding ───────────────────────────────────────────────────────

export async function getTaxiStatusApi(): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/status', { method: 'GET' });
}

export async function uploadTaxiNationalIdApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/national-id', { method: 'POST', body: formData });
}

export async function uploadTaxiDriverLicenseApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/driver-license', { method: 'POST', body: formData });
}

export async function uploadTaxiLicenseApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/taxi-license', { method: 'POST', body: formData });
}

export async function uploadTaxiProfessionalCardApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/professional-card', { method: 'POST', body: formData });
}

export async function uploadTaxiVehicleRegistrationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/vehicle-registration', { method: 'POST', body: formData });
}

export async function uploadTaxiVehicleInsuranceApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/insurance', { method: 'POST', body: formData });
}

export async function updateTaxiVehicleDetailsApi(payload: any): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/vehicle-details', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function uploadTaxiVehiclePhotosApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/vehicle-photos', { method: 'POST', body: formData });
}

export async function uploadTaxiFaceVerificationApi(formData: FormData): Promise<ApiResponse<any>> {
  return request<any>('/api/driver/taxi/face-verification', { method: 'POST', body: formData });
}

// ─── Reviews ───────────────────────────────────────────────────────────────

export interface ReviewPayload {
  rideRequestId: number;
  revieweeId: number;
  rating: number;
  comment?: string;
}

export interface ReviewItem {
  id: number;
  rideRequestId: number;
  reviewerId: number;
  reviewerType: 'PASSENGER' | 'DRIVER';
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface ReviewsListResponse {
  averageRating: number | null;
  totalReviews: number;
  reviews: ReviewItem[];
}

/** POST /api/reviews/driver — Passenger reviews a driver */
export async function reviewDriverApi(payload: ReviewPayload): Promise<ApiResponse<any>> {
  return request<any>('/api/reviews/driver', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** POST /api/reviews/passenger — Driver reviews a passenger */
export async function reviewPassengerApi(payload: ReviewPayload): Promise<ApiResponse<any>> {
  return request<any>('/api/reviews/passenger', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** GET /api/reviews/driver/:driverId */
export async function getDriverReviewsApi(driverId: number): Promise<ApiResponse<ReviewsListResponse>> {
  return request<ReviewsListResponse>(`/api/reviews/driver/${driverId}`);
}

/** GET /api/reviews/passenger/:passengerId */
export async function getPassengerReviewsApi(passengerId: number): Promise<ApiResponse<ReviewsListResponse>> {
  return request<ReviewsListResponse>(`/api/reviews/passenger/${passengerId}`);
}

/** GET /api/reviews/received/passenger */
export async function getReceivedPassengerReviewsApi(): Promise<ApiResponse<ReviewItem[]>> {
  return request<ReviewItem[]>('/api/reviews/received/passenger');
}

/** GET /api/reviews/given/passenger */
export async function getGivenPassengerReviewsApi(): Promise<ApiResponse<ReviewItem[]>> {
  return request<ReviewItem[]>('/api/reviews/given/passenger');
}

/** GET /api/reviews/received/driver */
export async function getReceivedDriverReviewsApi(): Promise<ApiResponse<ReviewItem[]>> {
  return request<ReviewItem[]>('/api/reviews/received/driver');
}

/** GET /api/reviews/given/driver */
export async function getGivenDriverReviewsApi(): Promise<ApiResponse<ReviewItem[]>> {
  return request<ReviewItem[]>('/api/reviews/given/driver');
}

