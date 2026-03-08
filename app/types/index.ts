// ─── Auth ───────────────────────────────────────────
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  role: 'owner' | 'admin'
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  password: string
  role?: 'owner' | 'admin'
}

export interface UpdateProfilePayload {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
}

// ─── Purchase Session ────────────────────────────────
export interface ProductItem {
  id: string
  session_id: string
  name: string
  quantity: number
  unit_price: number
  category: string
  notes?: string
  subtotal_amount: number
  created_at: string
  updated_at: string
}

export interface PurchaseSession {
  id: string
  user_id: string
  purchase_date: string
  supplier_name: string
  payment_method: string
  invoice_reference?: string
  notes?: string
  product_items: ProductItem[]
  total_amount: number
  created_at: string
  updated_at: string
}

export interface CreateProductItemPayload {
  name: string
  quantity: number
  unit_price: number
  category: string
  notes?: string
}

export interface CreatePurchaseSessionPayload {
  purchase_date: string
  supplier_name: string
  payment_method: string
  invoice_reference?: string
  notes?: string
  product_items: CreateProductItemPayload[]
}

// ─── Pagination ──────────────────────────────────────
export interface PaginationMeta {
  total: number
  limit: number
  offset: number
  has_more: boolean
}

export interface PaginatedSessions {
  sessions: PurchaseSession[]
  meta: PaginationMeta
}

// ─── Dashboard ───────────────────────────────────────
export interface CategorySpending {
  category: string
  total: number
}

export interface MonthlySpending {
  month: string
  total: number
}

export interface SupplierSpending {
  supplier_name: string
  total: number
}

export interface DashboardSummary {
  total_sessions: number
  total_products: number
  total_spend: number
  most_bought_category: string
  most_bought_product: string
  spending_by_category: CategorySpending[]
  spending_by_month: MonthlySpending[]
  spending_by_supplier: SupplierSpending[]
  recent_sessions: PurchaseSession[]
}

export interface PriceHistory {
  product: string
  latest_price: number
  previous_price: number
  change: number
}

export interface ReorderReminder {
  product_name: string
  category: string
  last_purchased: string
  days_since_last_purchase: number
}

// ─── Admin ───────────────────────────────────────────
export interface AdminStats {
  total_users: number
  total_sessions: number
  total_products: number
  active_users: number
  new_users_this_month: number
}

// ─── API Response ────────────────────────────────────
export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}