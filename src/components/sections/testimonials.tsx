"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { MessageSquare } from "lucide-react";
import styles from "./testimonials.module.css";

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "ANANYA ROY",
    role: "CEO, TechVantage - 2025 Winner",
    quote: "Winning the Global Award was a major turning point for TechVantage. The recognition not only validated our team's years of hard work but also boosted investor confidence and helped us establish credibility in international markets. The event itself was exceptionally organized and full of inspiring leaders.",
    image: "/assets/profile_female_1.png",
  },
  {
    id: 2,
    name: "NEHA SHARMA",
    role: "Founder, GreenSphere - 2025 Winner",
    quote: "Being recognized for our sustainability initiatives was an incredible honor. The networking opportunities with other visionary business leaders have been invaluable. A truly top-tier program that genuinely empowers innovators. A masterpiece of an awards platform.",
    image: "/assets/profile_female_1.png", // Reusing profile_female_1 flipped for Neha Sharma
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ initialTestimonials }) => {
  const displayTestimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials;

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.grid}>
          {displayTestimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card variant="bordered" className={styles.testCard} animateHover>
                <div className={styles.headerRow}>
                  <div className={styles.profileWrapper}>
                    <Image
                      src={test.image}
                      alt={test.name}
                      width={80}
                      height={80}
                      className={test.id === 2 ? styles.flippedImage : styles.profileImage}
                    />
                  </div>
                  <div className={styles.meta}>
                    <h3 className={styles.name}>{test.name}</h3>
                    <span className={styles.role}>{test.role}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <MessageSquare className={styles.quoteIcon} size={28} />
                  </div>
                </div>
                <p className={styles.quoteText}>“{test.quote}”</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
