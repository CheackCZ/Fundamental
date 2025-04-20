import React from "react";
import { Card } from "../ui/card";

import "./VideoCard.css";

interface VideoCardProps {
    video: string;
    width?: number;
    height?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
    video,
    width = 265,
    height = 120
}) => {
    return (
        <Card
            className="video-card"
            style={{ width, height }}
        >
            <div className="video-container">
                <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>
        </Card>
    );
};

export default VideoCard;