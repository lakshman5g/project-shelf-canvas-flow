
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Image, Play } from 'lucide-react';

interface ProjectGalleryProps {
  media: any[];
}

export function ProjectGallery({ media }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = media.filter(item => item.media_type === 'image');
  const videos = media.filter(item => item.media_type === 'video');
  const beforeAfter = media.filter(item => item.media_type === 'before_after');

  return (
    <div>
      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="masonry">Masonry</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <span className="flex items-center"><Image className="h-4 w-4 mr-1" /> {images.length}</span>
            <span className="flex items-center"><Play className="h-4 w-4 mr-1" /> {videos.length}</span>
          </div>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div 
                    className="cursor-pointer overflow-hidden rounded-md"
                    onClick={() => setSelectedImage(item.url)}
                  >
                    <AspectRatio ratio={1} className="bg-muted">
                      {item.media_type === 'video' ? (
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-80" />
                          {item.url && item.url.includes('youtube') && (
                            <img 
                              src={`https://img.youtube.com/vi/${getYouTubeID(item.url)}/hqdefault.jpg`}
                              alt={item.caption || "Video thumbnail"}
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.caption || item.alt_text || "Project image"}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      )}
                    </AspectRatio>
                    {item.caption && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">{item.caption}</p>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  {item.media_type === 'video' ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={getEmbedUrl(item.url)}
                        title={item.caption || "Video"}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.caption || item.alt_text || "Project image"}
                      className="object-contain max-h-[80vh] w-full"
                    />
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="masonry" className="mt-0">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {media.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      className="cursor-pointer overflow-hidden rounded-md"
                      onClick={() => setSelectedImage(item.url)}
                    >
                      {item.media_type === 'video' ? (
                        <div className="relative bg-black flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-80" />
                          {item.url && item.url.includes('youtube') && (
                            <img 
                              src={`https://img.youtube.com/vi/${getYouTubeID(item.url)}/hqdefault.jpg`}
                              alt={item.caption || "Video thumbnail"}
                              className="w-full opacity-50"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.caption || item.alt_text || "Project image"}
                          className="w-full transition-transform hover:scale-105"
                        />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0">
                    {item.media_type === 'video' ? (
                      <div className="aspect-video w-full">
                        <iframe
                          src={getEmbedUrl(item.url)}
                          title={item.caption || "Video"}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption || item.alt_text || "Project image"}
                        className="object-contain max-h-[80vh] w-full"
                      />
                    )}
                  </DialogContent>
                </Dialog>
                {item.caption && (
                  <p className="text-sm text-muted-foreground mt-1">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="slider" className="mt-0">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {media.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div 
                    className="cursor-pointer overflow-hidden rounded-md flex-shrink-0"
                    style={{ width: '300px' }}
                    onClick={() => setSelectedImage(item.url)}
                  >
                    <AspectRatio ratio={16/9} className="bg-muted">
                      {item.media_type === 'video' ? (
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-80" />
                          {item.url && item.url.includes('youtube') && (
                            <img 
                              src={`https://img.youtube.com/vi/${getYouTubeID(item.url)}/hqdefault.jpg`}
                              alt={item.caption || "Video thumbnail"}
                              className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.caption || item.alt_text || "Project image"}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      )}
                    </AspectRatio>
                    {item.caption && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">{item.caption}</p>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  {item.media_type === 'video' ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={getEmbedUrl(item.url)}
                        title={item.caption || "Video"}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.caption || item.alt_text || "Project image"}
                      className="object-contain max-h-[80vh] w-full"
                    />
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions
function getYouTubeID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getEmbedUrl(url: string): string {
  if (url.includes('youtube')) {
    const id = getYouTubeID(url);
    return `https://www.youtube.com/embed/${id}`;
  } else if (url.includes('vimeo')) {
    const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(vimeoRegex);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  }
  return url;
}
