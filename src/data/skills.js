/**
 * ─── SKILLS CONFIG ───────────────────────────────────────────────────────────
 * Add, remove, or reorder categories and technologies here.
 * `level` (0–100) is only used for the proficiency bar — adjust or remove it
 * freely. Only list technologies you can genuinely demonstrate.
 */

import {
  Server,
  Layout,
  Database,
  Cpu,
  Wrench,
} from 'lucide-react';

export const skillCategories = [
  {
    id: 'backend',
    name: 'Backend Development',
    icon: Server,
    blurb: 'Business logic, REST APIs and services built to be maintainable.',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 82 },
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 76 },
      { name: 'PHP', level: 70 },
      { name: 'Laravel', level: 68 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: Layout,
    blurb: 'Responsive, accessible interfaces for web applications.',
    skills: [
      { name: 'HTML5', level: 88 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Responsive UI', level: 85 },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: Database,
    blurb: 'Relational data modeling and integration into applications.',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'SQL', level: 88 },
      { name: 'Database Design', level: 80 },
    ],
  },
  {
    id: 'iot',
    name: 'IoT & Embedded Systems',
    icon: Cpu,
    blurb: 'Sensing, connectivity and edge intelligence on real hardware.',
    skills: [
      { name: 'ESP8266 / NodeMCU', level: 82 },
      { name: 'ESP32', level: 78 },
      { name: 'Arduino', level: 85 },
      { name: 'Raspberry Pi', level: 75 },
      { name: 'Sensors', level: 82 },
      { name: 'MQTT', level: 76 },
      { name: 'Embedded Programming', level: 78 },
      { name: 'Edge Computing', level: 70 },
      { name: 'TinyML (research)', level: 65 },
    ],
  },
  {
    id: 'tools',
    name: 'Development Tools',
    icon: Wrench,
    blurb: 'Everyday tooling for version control, coding and database work.',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'NetBeans', level: 80 },
      { name: 'MySQL Workbench', level: 82 },
    ],
  },
];
