"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import styles from "./award-night.module.css";

interface NightOfGlitzData {
  videoUrl?: string;
  videoFileUrl?: string;
  thumbnailUrl?: string;
}

interface AwardNightSectionProps {
  initialData?: NightOfGlitzData;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  
  let videoId = "";
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
  } catch (e) {
    console.error("Failed to parse video URL", e);
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
};

export const AwardNightSection: React.FC<AwardNightSectionProps> = ({ initialData }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const displayThumbnail = initialData?.thumbnailUrl || "/assets/business_award_trophy.png";
  const hasVideo = initialData?.videoFileUrl || initialData?.videoUrl;

  return (
    <section id="award-night" className={styles.awardNight}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column - Video Preview */}
        <div className={styles.videoColumn}>
          <div className={styles.yellowSquare}></div>
          <div className={styles.videoCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={displayThumbnail}
                alt="Award Ceremony Trophy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.trophyImage}
                priority
              />
              <div className={styles.playOverlay}>
                <button
                  className={styles.playButton}
                  onClick={() => {
                    if (hasVideo) {
                      setIsVideoOpen(true);
                    }
                  }}
                  aria-label="Play Award Video"
                  style={{ cursor: hasVideo ? "pointer" : "default" }}
                >
                  <Play fill="#1A1A1A" stroke="#1A1A1A" size={28} className={styles.playIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Text & Stats */}
        <div className={styles.textContent}>
          <h3 className={styles.kicker}>The Night of Glitz</h3>
          <h2 className={styles.title}>Witness the Ceremony</h2>
          <p className={styles.paragraph}>
            The Global Awards ceremony is more than an event; it’s a showcase of human potential.
            Experience highlights where industry titans meet tomorrow’s disruptors.
          </p>
          <div className={styles.statsDivider}></div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2,500+</span>
              <span className={styles.statLabel}>Attendees</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>45+</span>
              <span className={styles.statLabel}>Regions</span>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className={styles.modal} onClick={() => setIsVideoOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>
              <X size={28} />
            </button>
            <div className={styles.iframeWrapper}>
              {initialData?.videoFileUrl ? (
                <video
                  src={initialData.videoFileUrl}
                  controls
                  autoPlay
                  width="100%"
                  height="100%"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(initialData?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1")}
                  title="Global Awards Ceremony Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
