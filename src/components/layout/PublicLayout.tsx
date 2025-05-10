
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-semibold text-lg">ProjectShelf</span>
            </Link>
            
            <nav className="ml-10 hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={cn(
                    "text-sm animated-underline",
                    location.pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.displayName} />
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/${user.username}`}>My Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className={cn(
                      "text-base py-2 px-4 rounded-md",
                      location.pathname === link.href ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
                  P
                </div>
                <span className="font-semibold text-lg">ProjectShelf</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Showcase your creative work with beautiful, modular case studies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">Home</Link>
                <Link to="/explore" className="block text-sm text-muted-foreground hover:text-foreground">Explore</Link>
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground">About</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ProjectShelf. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
