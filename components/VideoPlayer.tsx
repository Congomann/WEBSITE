import React from 'react';
import type { VideoResource } from '../types';
import YouTubeEmbed from './YouTubeEmbed';
import TikTokEmbed from './TikTokEmbed';

interface VideoPlayerProps {
  video: VideoResource;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const renderPlayer = () => {
    switch (video.type) {
      case 'youtube':
        return <YouTubeEmbed embedId={video.source} />;
      case 'tiktok':
        return <TikTokEmbed embedId={video.source} />;
      case 'direct':
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
      default:
        return <p>Unsupported video type.</p>;
    }
  };

  return <>{renderPlayer()}</>;
};

export default VideoPlayer;
