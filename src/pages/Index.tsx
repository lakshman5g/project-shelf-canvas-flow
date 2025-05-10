
import { Link } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Showcase your creative work with beautiful portfolios
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              ProjectShelf helps you build stunning, modular case studies that highlight your best work and attract clients.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Create your portfolio</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">Explore portfolios</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 md:mt-24 relative">
            <div className="aspect-[16/9] overflow-hidden rounded-xl border shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
                alt="ProjectShelf Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 w-24 md:w-40 aspect-square rounded-lg md:rounded-xl bg-secondary/80 backdrop-blur-sm shadow-lg border border-white/10 animate-fade-in" style={{ animationDelay: '0.2s' }} />
            <div className="absolute -top-6 -right-6 md:-right-10 w-24 md:w-40 aspect-square rounded-lg md:rounded-xl bg-primary/80 backdrop-blur-sm shadow-lg border border-white/10 animate-fade-in" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to showcase your work</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Designed for creators, built for impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Beautiful Portfolios',
                description: 'Create stunning visual portfolios with modern, responsive designs that look great on any device.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                ),
              },
              {
                title: 'Modular Case Studies',
                description: 'Build comprehensive case studies with flexible modules to showcase every aspect of your projects.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                ),
              },
              {
                title: 'Insightful Analytics',
                description: 'Gain valuable insights about your portfolio visitors and optimize your presentation.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                ),
              },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-2">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Trusted by creators worldwide</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our users have to say about ProjectShelf
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ProjectShelf transformed how I present my design work. The case study format helps me tell the full story behind each project.",
                author: "Sarah Johnson",
                role: "UX Designer",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              {
                quote: "As a photographer, I needed a portfolio that could showcase my images beautifully. ProjectShelf delivers exactly what I needed.",
                author: "Michael Chen",
                role: "Photographer",
                avatar: "https://i.pravatar.cc/150?img=8",
              },
              {
                quote: "The analytics feature helped me understand which projects resonated most with potential clients, leading to more inquiries.",
                author: "Alex Rivera",
                role: "Freelance Developer",
                avatar: "https://i.pravatar.cc/150?img=5",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <svg className="h-8 w-8 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7.5 12h-.75A3.75 3.75 0 0 1 3 8.25v-.75a3.75 3.75 0 0 1 3.75-3.75h.75a3.75 3.75 0 0 1 3.75 3.75v.75A3.75 3.75 0 0 1 7.5 12Zm9 0h-.75a3.75 3.75 0 0 1-3.75-3.75v-.75A3.75 3.75 0 0 1 15.75 3.75h.75a3.75 3.75 0 0 1 3.75 3.75v.75A3.75 3.75 0 0 1 16.5 12Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7.5 12h-.75A3.75 3.75 0 0 0 3 15.75v.75a3.75 3.75 0 0 0 3.75 3.75h.75a3.75 3.75 0 0 0 3.75-3.75v-.75A3.75 3.75 0 0 0 7.5 12Zm9 0h-.75a3.75 3.75 0 0 0-3.75 3.75v.75a3.75 3.75 0 0 0 3.75 3.75h.75a3.75 3.75 0 0 0 3.75-3.75v-.75A3.75 3.75 0 0 0 16.5 12Z"
                      />
                    </svg>
                    <p className="text-lg">{testimonial.quote}</p>
                  </div>

                  <div className="flex items-center mt-6">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to showcase your work?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of creative professionals and build your portfolio today.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link to="/signup">Get started for free</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
