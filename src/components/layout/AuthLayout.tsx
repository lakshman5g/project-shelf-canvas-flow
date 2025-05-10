
import { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <header className="w-full p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-semibold text-lg">ProjectShelf</span>
        </Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </div>
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ProjectShelf. All rights reserved.</p>
      </footer>
    </div>
  );
};
