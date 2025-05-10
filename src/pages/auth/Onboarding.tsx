
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User } from '@/components/ui/avatar';

// Form validation schema
const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().optional(),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  avatar: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Onboarding = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      title: user?.title || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
      twitter: user?.socialLinks?.twitter || '',
      instagram: user?.socialLinks?.instagram || '',
      linkedin: user?.socialLinks?.linkedin || '',
      github: user?.socialLinks?.github || '',
      website: user?.socialLinks?.website || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      const { twitter, instagram, linkedin, github, website, ...rest } = data;

      await updateProfile({
        ...rest,
        socialLinks: {
          twitter,
          instagram,
          linkedin,
          github,
          website
        }
      });
      
      toast.success('Profile updated successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for avatar upload - in a real app, this would handle file uploads
  const handleAvatarUpload = () => {
    const avatarUrl = prompt('Enter avatar URL (for demo purposes):');
    if (avatarUrl) {
      form.setValue('avatar', avatarUrl);
    }
  };

  return (
    <AuthLayout
      title="Complete your profile"
      description="Tell others about yourself and make your portfolio stand out"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={form.watch('avatar')} />
                <AvatarFallback className="text-2xl">
                  {form.watch('displayName')?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                onClick={handleAvatarUpload}
              >
                <User className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    autoFocus
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. UX Designer, Developer, Photographer"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A short bio about yourself..."
                    className="resize-none"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Social media links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@username"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@username"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="LinkedIn URL or username"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GitHub username"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://yourwebsite.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Complete setup'}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Onboarding;
