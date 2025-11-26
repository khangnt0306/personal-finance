# Vietnamese Translation Inventory

This document lists the areas that still contain hard-coded English text and will need manual translation (no i18n framework). The list is grouped by feature/module so we can check them off as we translate.

## App Shell & Shared Layout
- `src/app/App.tsx`, `src/app/router/**/*`, route guards and labels.
- `src/layouts/DashboardLayout.tsx` (sidebar items, greetings, action buttons).
- Global pages in `src/pages` (`HomePage`, `NotFoundPage`, `UnauthorizedPage`).

## Core & Shared Components
- `src/components/molecules/**/*` (PageHeader, Stat tiles, Empty states, Data toolbar).
- `src/components/organisms/**/*` (timeline, hero banners).
- `src/components/ui/**/*` (any helper text/placeholder baked into inputs, dialog headings, toast, calendar).
- `src/lib/toast.ts`, `src/lib/utils.ts`.

## Features

### Auth (`src/features/auth`)
- ✅ Login/Register UI + AuthShell đã dịch.
- Cần rà lại: Forgot password, validation/toast trong `auth.service.ts`.

### Dashboard (`src/features/dashboard`)
- ✅ Overview cards, cashflow widget, spending chart.
- Chưa: activity widgets khác, quick actions (nếu có).

### Plans (`src/features/plans`)
- ✅ Plans list, form modal, detail page, daily transactions drawer, badges.
- Cần kiểm tra thêm: services/toast hệ thống và storybook (nếu dùng).

### Transactions & Budgets (`src/features/transactions`, `src/features/budgets`)
- ✅ Transactions page, list/item component, Budgets page + form/item.
- Cần dịch thêm: services/toast, components khác (nếu có) và storybook demos.

### Categories/Goals/Accounts/Reports/Settings/Notifications
- ✅ Goals pages + modals, Settings (profile/preferences/notifications + security), common reminder banner.
- Còn lại: Categories, Accounts, Reports, Notifications panel (nếu có), các dịch vụ/toast.

### UI Suite (`src/features/ui-suite/**/*`)
- Demo components showcasing text (use same translations for consistency).

## Core Utilities / Validation
- `src/core/validation/schemas.ts`, feature-specific schemas (budgets, auth, plans).
- `src/core/utils/format.ts` (any string constants).

## Stories (Optional)
- `src/stories/**/*` — translate only if storybook is part of deliverable; otherwise can remain English (confirm with stakeholder).

## Constants & Metadata
- `src/core/config/app.config.ts`
- Menu configuration (`src/app/router/routes/**/*`)

## Toast / Error Messaging
- All `showSuccess/showError` invocations across features.
- API error handling in services/slices.

> **Next step:** begin translating feature by feature (Auth → Dashboard → Plans → Shared components) ensuring consistent terminology (Plan = “Kế hoạch”, Budget = “Ngân sách”, Transaction = “Giao dịch”, etc.).

