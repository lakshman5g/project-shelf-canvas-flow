
import React from 'react';

interface ThemePreviewProps {
  theme: {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      baseSize: string;
      scale: string;
    };
    layout: {
      contentWidth: string;
      spacing: string;
      borderRadius: string;
      headerStyle: string;
    };
  };
  device: 'desktop' | 'tablet' | 'mobile';
}

export const ThemePreview = ({ theme, device }: ThemePreviewProps) => {
  // Apply different widths based on device
  const containerClasses = {
    desktop: 'w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[375px]'
  };

  // Apply different layout based on contentWidth
  const contentClasses = {
    narrow: 'max-w-3xl',
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-full px-4'
  };

  // Apply spacing based on theme
  const spacingClasses = {
    compact: 'space-y-2',
    comfortable: 'space-y-4',
    spacious: 'space-y-8'
  };

  // Apply border radius based on theme
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    default: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  };

  // Header styles
  const headerClasses = {
    default: 'flex justify-between items-center',
    centered: 'flex flex-col items-center text-center',
    minimal: 'flex justify-between items-center border-b border-border pb-2',
    overlay: 'flex justify-between items-center bg-black/10 backdrop-blur-md px-4'
  };

  return (
    <div 
      className={`${containerClasses[device]} h-[600px] overflow-y-auto`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.bodyFont,
        fontSize: theme.typography.baseSize
      }}
    >
      {/* Header */}
      <header 
        className={`w-full px-4 py-4 ${headerClasses[theme.layout.headerStyle as keyof typeof headerClasses]}`}
      >
        <div>
          <h1 style={{ fontFamily: theme.typography.headingFont }} className="text-xl font-bold">
            Portfolio Title
          </h1>
        </div>
        <nav className="hidden sm:block">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-opacity-80">Home</a></li>
            <li><a href="#" className="hover:text-opacity-80">Work</a></li>
            <li><a href="#" className="hover:text-opacity-80">About</a></li>
            <li><a href="#" className="hover:text-opacity-80">Contact</a></li>
          </ul>
        </nav>
        <button className="sm:hidden">Menu</button>
      </header>

      {/* Main content */}
      <main className={`mx-auto px-4 py-8 ${contentClasses[theme.layout.contentWidth as keyof typeof contentClasses]}`}>
        <div className={spacingClasses[theme.layout.spacing as keyof typeof spacingClasses]}>
          {/* Hero section */}
          <section className="text-center py-8">
            <h2 style={{ fontFamily: theme.typography.headingFont }} className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to My Portfolio
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-6">
              I create meaningful digital experiences that connect with people.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className={`px-6 py-2 ${radiusClasses[theme.layout.borderRadius as keyof typeof radiusClasses]}`}
                style={{ backgroundColor: theme.colors.primary, color: '#fff' }}
              >
                View Projects
              </button>
              <button
                className={`px-6 py-2 border ${radiusClasses[theme.layout.borderRadius as keyof typeof radiusClasses]}`}
                style={{ borderColor: theme.colors.secondary, color: theme.colors.secondary }}
              >
                Contact Me
              </button>
            </div>
          </section>

          {/* Projects section */}
          <section>
            <h3 style={{ fontFamily: theme.typography.headingFont }} className="text-2xl font-bold mb-6">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className={`overflow-hidden ${radiusClasses[theme.layout.borderRadius as keyof typeof radiusClasses]} border`}
                >
                  <div className="bg-muted/30 h-40 w-full"></div>
                  <div className="p-4">
                    <h4 style={{ fontFamily: theme.typography.headingFont }} className="font-medium">Project Title</h4>
                    <p className="text-sm mt-1">Brief description of the project and the main highlights.</p>
                    <a 
                      href="#" 
                      className="mt-2 inline-block text-sm"
                      style={{ color: theme.colors.accent }}
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About section */}
          <section className={`${spacingClasses[theme.layout.spacing as keyof typeof spacingClasses]}`}>
            <h3 style={{ fontFamily: theme.typography.headingFont }} className="text-2xl font-bold">
              About Me
            </h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className={`bg-muted/30 h-60 w-full ${radiusClasses[theme.layout.borderRadius as keyof typeof radiusClasses]}`}></div>
              </div>
              <div className="md:w-2/3">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
                  Sed cursus ante dapibus diam. Sed nisi.
                </p>
                <p>
                  Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
                  Praesent mauris. Fusce nec tellus sed augue semper porta.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Design', 'Development', 'Strategy', 'UI/UX'].map((skill) => (
                    <span 
                      key={skill}
                      className={`px-3 py-1 text-sm ${radiusClasses[theme.layout.borderRadius as keyof typeof radiusClasses]}`}
                      style={{ backgroundColor: theme.colors.secondary, color: '#fff' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/10 py-8 px-4 mt-8">
        <div className={`mx-auto ${contentClasses[theme.layout.contentWidth as keyof typeof contentClasses]}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2023 Portfolio. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm hover:underline">Twitter</a>
              <a href="#" className="text-sm hover:underline">LinkedIn</a>
              <a href="#" className="text-sm hover:underline">GitHub</a>
              <a href="#" className="text-sm hover:underline">Dribbble</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
