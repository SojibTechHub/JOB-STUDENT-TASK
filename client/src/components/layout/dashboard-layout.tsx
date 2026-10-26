"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Menu,
  X,
  LucideIcon,
  ChevronRight,
  BookOpen,
  Briefcase,
  User,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { cn, getInitials } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  exact?: boolean;
}

interface DashboardLayoutProps {
  navItems: NavItem[];
  children: React.ReactNode;
  headerTitle?: string;
}

export function DashboardLayout({ navItems, children, headerTitle }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header Bar - sticky top-0, z-30 */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Logo showText={true} />

          {/* Role badge */}
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            Student
          </span>

          {/* Breadcrumb indicator */}
          {headerTitle && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground pl-2 border-l border-border/60">
              <span className="text-muted-foreground/60">/</span>
              <span className="font-medium text-foreground">{headerTitle}</span>
            </div>
          )}
        </div>

        {/* Quick Links & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 mr-1">
            <Button asChild variant="ghost" size="sm" className="text-xs h-8">
              <Link href="/courses">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                Courses
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-xs h-8">
              <Link href="/jobs">
                <Briefcase className="h-3.5 w-3.5 mr-1" />
                Jobs
              </Link>
            </Button>
          </div>

          <ThemeToggle />

          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full p-1 text-left transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="User account menu"
              >
                <Avatar className="h-8 w-8 ring-1 ring-border">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user?.name || ""} />
                  ) : (
                    <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden md:block max-w-[120px] truncate text-xs font-medium">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-sm font-semibold truncate">{user?.name || "Student"}</p>
                <p className="text-xs font-normal text-muted-foreground truncate">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user?._id && (
                <DropdownMenuItem asChild>
                  <Link href={`/u/${user._id}`}>
                    <User className="h-4 w-4 mr-2" />
                    Public Portfolio
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/70 bg-card/40">
          <nav className="flex-1 space-y-1 overflow-y-auto p-4 sticky top-16 h-[calc(100vh-4rem)]" aria-label="Dashboard navigation">
            <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Student Workspace
            </p>
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-110", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay & Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card border-r border-border shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between border-b p-4">
                <Logo showText={true} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Mobile dashboard navigation">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t p-3 bg-card/60">
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="h-8 w-8">
                    {user?.avatar ? <AvatarImage src={user.avatar} alt={user?.name || ""} /> : <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
