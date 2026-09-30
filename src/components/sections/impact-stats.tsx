"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./impact-stats.module.css";

const stats = [
  { id: 1, value: 50, suffix: "+", label: "Regions Represented" },
  { id: 2, value: 1000, suffix: "+", label: "Submitted Nominations" },
  { id: 3, value: 150, suffix: "+", label: "Winners Honored" },
  { id: 4, value: 80, suffix: "+", label: "Jury Members" },
  { id: 5, value: 300, suffix: "+", label: "Strategic Partners" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prevValueRef = useRef(0);

  useEffect(() => {
    if (isInView) {
      const start = prevValueRef.current;
      const target = value;
      
      if (start === target) {
        setCount(target);
        return;
      }

      const duration = 1500; // Easing animation duration in ms
      const startTime = performance.now();
      let animationFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutQuad
        const easeProgress = progress * (2 - progress);
        
        const currentValue = Math.round(start + (target - start) * easeProgress);
        setCount(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          prevValueRef.current = target;
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [value, isInView]);

  return (
    <span ref={ref} className={styles.statValue}>
      {count}
      <span className={styles.statSuffix}>{suffix}</span>
    </span>
  );
};

export const ImpactStatsSection: React.FC = () => {
  return (
    <section className={styles.impactStats}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat) => (
            <div key={stat.id} className={styles.statItem}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
