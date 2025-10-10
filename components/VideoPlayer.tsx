import React from 'react';
import type { VideoResource } from '../types';
import YouTubeEmbed from './YouTubeEmbed';

interface VideoPlayerProps {
  video: VideoResource;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  // Conditionally render YouTube embed if the type is 'youtube'
  if (video.type === 'youtube') {
    return <YouTubeEmbed embedId={video.source} />;
  }

  // Otherwise, render a standard HTML5 video player for direct links
  return (
    <div className="relative overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <video
        className="absolute top-0 left-0 w-full h-full bg-black"
        src={video.source}
        controls
        title={video.title || 'Embedded video'}
      />
    </div>
  );
};

export default VideoPlayer;
