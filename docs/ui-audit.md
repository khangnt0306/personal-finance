# UI Audit – Personal Finance App

## Component Inventory (`src/components/ui`)
- **Form primitives**: Button, Input, Label, Textarea, Select, Tabs, Dialog, Card, Table, Progress, Badge.
- **Motion primitives**: Limited to MotionButton/Card wrappers with minimal shared animation tokens.
- **Gaps**:
  - No dedicated typography stack or page-level scaffolding (headers, toolbars).
  - Cards/tables share inconsistent padding/elevation and lack hover/tap feedback.
  - Loading/empty states implemented ad hoc across feature pages.

## Higher-level Features
- **Pages** (`src/features` & `src/pages`):
  - Layouts repeat similar hero headers and action bars without shared components.
  - Budgets/Transactions use tables & modals but rely on local state for skeletons/empty copy.
- **DashboardLayout**: Static header/sidebar, no motion or theme-aware surface layering.

## Motion & Feedback
- Framer Motion is only used inside `motion-button.tsx` and `motion-card.tsx`.
- No shared easing/duration tokens, so interactions feel inconsistent.

## Opportunities
1. Introduce a **design token layer** (colors, gradients, shadows, radii, durations) in Tailwind/CSS vars.
2. Build **shared composites** (PageHeader, StatGroup, DataToolbar, EmptyState) for reuse across pages.
3. Create a **motion toolkit** (staggered containers, coordinated hover/press states) powered by Framer Motion with reduced-motion fallbacks.
4. Refresh **DashboardLayout** to leverage the new primitives and add subtle transitions.

