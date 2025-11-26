import { useEffect, useMemo, useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@lib/utils"
import { Wallet, TrendingUp, PieChart, Settings, Home, List, Menu, X, LogOut } from "lucide-react"
import { Button } from "@components/ui/button"
import { MotionContainer } from "@components/ui/motion-primitives"
import { drawerTransition, overlayTransition } from "../styles/motion"  
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { logout } from "@store/slices/auth/auth.slice"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Plans", href: "/plans", icon: List },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Budgets", href: "/budgets", icon: TrendingUp },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

const SIDEBAR_WIDTH = 288

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

export const DashboardLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(event.matches)
      setIsSidebarOpen(event.matches)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const activeNav = useMemo(
    () =>
      navigation.find((item) =>
        item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href)
      ) ?? navigation[0],
    [location.pathname]
  )

  const sidebarPadding = isDesktop ? (isSidebarOpen ? SIDEBAR_WIDTH : 0) : 0

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div className="relative min-h-screen bg-background/60">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-80" />
      <AnimatePresence>
        {!isDesktop && isSidebarOpen ? (
          <motion.div
            className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleToggleSidebar}
            transition={overlayTransition}
          />
        ) : null}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -SIDEBAR_WIDTH }}
        transition={drawerTransition}
        className="sidebar-scroll fixed inset-y-0 left-0 z-40 flex w-[18rem] flex-col border-r border-border/50 bg-white/80 px-6 py-8 shadow-2xl backdrop-blur-2xl dark:bg-surface-elevated/80"
        style={{ width: SIDEBAR_WIDTH }}
        aria-hidden={!isSidebarOpen && !isDesktop}
      >
        <div className="flex items-center gap-3 ">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
            💰
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Personal finance
            </p>
            <p className="text-2xl font-semibold text-foreground">FinK</p>
          </div>
        </div>
        <Link to="/accounts" className="mt-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/60 p-3 shadow-soft hover:shadow-sky-200 transition-all duration-200 ">
          {user.avatar ? (
            <span className="relative inline-flex h-12 w-12 overflow-hidden rounded-2xl border border-white/30 bg-primary/10">
              <img src={user.avatar} alt={user.full_name} className="h-full w-full object-cover" />
            </span>
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-base font-semibold text-primary">
              {getInitials(user.full_name)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{user.full_name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </Link>
        <nav className="mt-10 flex flex-1 flex-col gap-2 justify-between">
          <div>
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  if (!isDesktop) {
                    setIsSidebarOpen(false)
                  }
                }}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:text-foreground"
                )}
              >
                <AnimatePresence>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-2xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  ) : null}
                </AnimatePresence>
                <Icon className="relative z-10 h-5 w-5" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
          </div>
          <div className="mt-10">
            <Button 
              variant="ghost" 
              className="w-full rounded-2xl border border-border/60 bg-white/70 shadow-soft"
              onClick={() => {
                dispatch(logout())
                navigate("/auth/login")
              }}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </motion.aside>

      <div
        className="relative z-10 flex min-h-screen flex-col transition-[padding] duration-300 ease-sail"
        style={{ paddingLeft: sidebarPadding }}
      >
        <header className="sticky top-0 z-20 border-b border-border/50 bg-white/70 px-4 py-4 backdrop-blur-xl dark:bg-surface-elevated/80 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl border border-border/60 bg-white/70 shadow-soft"
                onClick={handleToggleSidebar}
                aria-label="Toggle sidebar"
                aria-pressed={isSidebarOpen}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className=" pl-10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Currently viewing
                </p>
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{activeNav.name}</h2>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Notifications
              </Button>
              <Button variant="default" className="rounded-full">
                Quick action
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
          <MotionContainer className="mx-auto max-w-7xl space-y-8">
            <Outlet />
          </MotionContainer>
        </main>
      </div>
    </div>
  )
}

