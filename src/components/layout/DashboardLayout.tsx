
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Home, Folder, Settings, BarChart2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Folder, label: 'Projects', href: '/dashboard/projects' },
    { icon: BarChart2, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className={cn(
          sidebarCollapsed ? "w-16" : "w-64",
          "border-r transition-all duration-300 ease-in-out"
        )}>
          <div className="p-4 flex items-center justify-between">
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center",
                sidebarCollapsed ? "justify-center" : "justify-start space-x-2"
              )}
            >
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                P
              </div>
              {!sidebarCollapsed && <span className="font-semibold">ProjectShelf</span>}
            </Link>
            <SidebarTrigger onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="ml-2">
              <Menu size={18} />
            </SidebarTrigger>
          </div>

          <SidebarContent>
            <SidebarGroup>
              {!sidebarCollapsed && <SidebarGroupLabel>Menu</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.href}
                          className={cn(
                            "flex items-center py-2 px-3 rounded-md transition-all",
                            isActive(item.href) 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-foreground hover:bg-accent/50",
                            sidebarCollapsed ? "justify-center" : "justify-start"
                          )}
                        >
                          <item.icon className={cn("h-5 w-5", sidebarCollapsed ? "" : "mr-2")} />
                          {!sidebarCollapsed && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <div className="mt-auto p-4 border-t">
            <div className={cn(
              "flex items-center",
              sidebarCollapsed ? "justify-center" : "justify-between"
            )}>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user?.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.title || 'Creator'}</p>
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.displayName} />
                      <AvatarFallback>{user?.displayName ? getInitials(user.displayName) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to={`/${user?.username}`}>View Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <Menu size={18} />
              </SidebarTrigger>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
