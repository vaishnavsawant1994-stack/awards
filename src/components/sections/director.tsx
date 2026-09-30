"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./director.module.css";

interface DirectorMessage {
  name: string;
  role: string;
  kicker: string;
  quote: string;
  paragraph: string;
  image: string;
}

interface DirectorSectionProps {
  initialDirector?: DirectorMessage;
}

export const DirectorSection: React.FC<DirectorSectionProps> = ({ initialDirector }) => {
  const displayName = initialDirector?.name || "Chetan Ujade";
  const displayRole = initialDirector?.role || "Executive Director";
  const displayKicker = initialDirector?.kicker || "Message from leadership";
  const displayQuote = initialDirector?.quote || "The Global Awards is more than a ceremony; it is a vital platform designed to recognize and elevate business leadership and innovation. Every year, we are astonished by the depth, resilience, and brilliance of the nominations we receive. Our mission is to ensure that these incredible achievements find the global audience and recognition they so richly deserve.";
  const displayParagraph = initialDirector?.paragraph || "As we embark on 2026, we remain steadfast in our commitment to fostering a community of support, collaboration, and celebration. We believe that by honoring these exceptional organizations and individuals, we are not only recognizing their current achievements but also paving the way for future generations of business innovators to build their own legacies.";
  const displayImage = initialDirector?.image || "/assets/images/chetan.jpeg";

  return (
    <section id="director" className={styles.director}>
      <div className={`container ${styles.grid}`}>
        {/* Left: Profile Photo Card */}
        <motion.div 
          className={styles.imageCard}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={displayImage}
              alt={`${displayName} - ${displayRole}`}
              width={260}
              height={300}
              className={styles.directorImage}
            />
          </div>
          <div className={styles.meta}>
            <h4 className={styles.name}>{displayName}</h4>
            <p className={styles.title}>{displayRole}</p>
          </div>
        </motion.div>

        {/* Right: Message Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className={styles.kicker}>{displayKicker}</span>
          <h2 className={styles.sectionTitle}>{displayRole}</h2>
          <div className={styles.divider} />
          
          <p className={styles.quote}>
            “{displayQuote}”
          </p>
          <p className={styles.paragraph}>
            “{displayParagraph}”
          </p>
        </motion.div>
      </div>
    </section>
  );
};
