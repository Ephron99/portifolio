/**
 * ─── PROJECTS CONFIG ─────────────────────────────────────────────────────────
 * Add / edit / remove projects here — the gallery, filters, search and detail
 * modal all read from this file. No component edits required.
 *
 * Fields:
 *  id            unique slug
 *  title, summary one-line card description
 *  category      must match one of projectCategories[].name
 *  technologies  tags used for filtering + search
 *  image         optional; falls back to a generated tech illustration
 *  status        honest maturity label ("Completed", "Deployed", "Research — in progress"…)
 *  implemented   what is actually built and verified  (shown under "Implemented")
 *  planned       research objectives / planned work   (shown separately)
 *  details       { problem, role, architecture, features[], challenges[], links{} }
 *  links         { source, demo } — omit or set null if not available yet
 */

export const projectCategories = [
  { id: 'all', name: 'All' },
  { id: 'java-backend', name: 'Java Backend' },
  { id: 'web', name: 'Web Development' },
  { id: 'iot', name: 'IoT & Embedded' },
  { id: 'research', name: 'Academic Research' },
];

export const projects = [
  {
    id: 'e-visitors',
    title: 'E-Visitors System (EVS)',
    summary:
      'Visitor and gate management: registration, attendance, appointments, document capture and reporting.',
    category: 'Java Backend',
    technologies: ['Java', 'MySQL', 'Java Web Technologies', 'OCR'],
    image: '/images/projects/evisitors.jpg',
    status: 'Completed',
    implemented: [
      'Java desktop and web application for visitor and gate management',
      'Visitor registration and check-in/check-out with attendance tracking',
      'Appointment scheduling linked to host records',
      'Document data capture including OCR-assisted entry',
      'Reporting on visitor activity backed by a MySQL database',
    ],
    planned: [
      'Additional report export formats are possible future extensions',
    ],
    details: {
      problem:
        'Organizations running manual gate books struggle to track who is on-site, manage appointments and produce visitor reports quickly and reliably.',
      role:
        'I developed the system at SANTECH Ltd: database design, backend and desktop/web application features, OCR-assisted document capture, and reporting.',
      architecture:
        'A Java application layer (desktop and web) communicates with a MySQL database through a structured data-access tier. Visitor, appointment and attendance records are captured at the gate, and OCR tooling extracts data from identity documents to reduce manual entry.',
      features: [
        'Visitor registration with photo and document capture',
        'Attendance and in/out logs with time stamps',
        'Appointment management for hosts',
        'Searchable visitor records',
        'Configurable reports for gate activity',
      ],
      challenges: [
        {
          challenge: 'Slow, error-prone manual entry of identity documents at busy gates.',
          solution: 'Integrated OCR-assisted data capture with operator review to keep records accurate.',
        },
        {
          challenge: 'Keeping desktop and web views consistent over the same data.',
          solution: 'Centralized business rules and a shared MySQL schema so both clients read and write one source of truth.',
        },
      ],
      links: {
        source: null, // add your GitHub URL when the repo is public
        demo: null,
      },
    },
  },
  {
    id: 'voltage-drop',
    title: 'Voltage-Drop',
    summary:
      'Full-stack application: React frontend, Node.js/Express API, MySQL — deployed to the cloud.',
    category: 'Web Development',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'GitHub', 'Cloud Deployment'],
    image: '/images/projects/voltage-drop.jpg',
    status: 'Deployed',
    implemented: [
      'React single-page frontend consuming REST endpoints',
      'Node.js + Express API with MySQL persistence',
      'Cloud deployment and GitHub-based workflow',
      'API integration between frontend, backend and database',
    ],
    planned: [],
    details: {
      problem:
        'A practical full-stack product needed a clean separation between UI and API while remaining simple to deploy and iterate on.',
      role:
        'I built the application end to end: React frontend, Express REST API, MySQL schema, and deployment.',
      architecture:
        'The React frontend is served as static assets and talks to a Node.js/Express API over HTTPS. Express routes validate input and query a MySQL database. The repository is hosted on GitHub and the app is deployed to a cloud host.',
      features: [
        'Component-based React UI',
        'REST API with Express route handlers',
        'MySQL data layer with foreign-key relations',
        'Environment-based configuration for dev vs. production',
        'Cloud deployment with GitHub version control',
      ],
      challenges: [
        {
          challenge: 'CORS and environment differences between local development and the deployed API.',
          solution: 'Environment-driven base URLs plus explicit CORS configuration on the Express server.',
        },
        {
          challenge: 'Keeping database schema changes in sync with API code.',
          solution: 'Versioned SQL scripts kept alongside the repository so each deployment applies known migrations.',
        },
      ],
      links: {
        source: null, // add GitHub URL when available
        demo: null,   // add live URL when available
      },
    },
  },
  {
    id: 'smart-irrigation',
    title: 'IoT Smart Monitoring & Irrigation',
    summary:
      'ESP8266 prototype monitoring temperature, humidity, soil and light — with Blynk alerts and automatic pump control.',
    category: 'IoT & Embedded',
    technologies: ['ESP8266 / NodeMCU', 'DHT11', 'Soil Moisture Sensor', 'LDR', 'Blynk', 'Embedded C'],
    image: '/images/projects/smart-irrigation.jpg',
    status: 'Prototype',
    implemented: [
      'ESP8266/NodeMCU firmware reading DHT11, soil moisture and LDR sensors',
      'Live dashboard and alerts through the Blynk platform',
      'Automated relay-driven pump control based on soil moisture thresholds',
    ],
    planned: [
      'This was a proof-of-concept prototype; scaling to multiple zones and adding solar power are future work and are not implemented.',
    ],
    details: {
      problem:
        'Manual watering is inefficient and easily forgotten. A low-cost monitoring node could watch field conditions and run the pump only when the soil actually needs water.',
      role: 'I designed the hardware layout, wrote the embedded firmware and configured the Blynk dashboard and notifications.',
      architecture:
        'An ESP8266/NodeMCU reads a DHT11 (temperature/humidity), a resistive soil moisture sensor and an LDR, publishes values to Blynk over Wi-Fi, and drives a relay for the water pump when soil moisture falls below a configured threshold. Blynk handles visualization and push alerts.',
      features: [
        'Continuous environmental monitoring (temperature, humidity, light, soil moisture)',
        'Threshold-based automatic pump control with manual override',
        'Remote dashboard and mobile alerts via Blynk',
        'Low-cost, easily replicable hardware stack',
      ],
      challenges: [
        {
          challenge: 'Unstable readings from a resistive soil moisture sensor.',
          solution: 'Averaging multiple samples per publish and calibrating dry/wet thresholds in firmware.',
        },
        {
          challenge: 'Wi-Fi drops on the NodeMCU during long runs.',
          solution: 'Reconnection logic and a safe pump-off default whenever connectivity is lost.',
        },
      ],
      links: { source: null, demo: null },
    },
  },
  {
    id: 'tinyml-bee-swarm',
    title: 'TinyML-Based Acoustic Monitoring for Early Honeybee Swarm Detection',
    summary:
      'MSc research at ACEIoT: low-power acoustic monitoring and lightweight ML on edge devices to detect honeybee swarming.',
    category: 'Academic Research',
    technologies: ['TinyML', 'Acoustic Data Processing', 'Lightweight CNNs', 'Embedded Systems', 'Microcontrollers', 'IoT'],
    image: '/images/projects/tinyml-bees.jpg',
    status: 'Research — in progress',
    // Honesty rule: nothing here claims verified accuracy or completed deployment.
    implemented: [
      'Research design and literature review on honeybee acoustic signatures',
      'Exploration of audio acquisition pipelines suitable for low-power microcontrollers',
      'Study of lightweight CNN architectures for on-device (edge) inference',
    ],
    planned: [
      'Field data collection of hive audio',
      'Model training, quantization and deployment on target edge hardware',
      'Evaluation of detection accuracy, latency and power consumption — no performance results are reported yet',
    ],
    details: {
      problem:
        'Honeybee swarming causes significant colony and yield loss for beekeepers. Continuous human monitoring is impractical; the research question is whether low-power edge devices can detect swarm-related acoustic changes early enough to act.',
      role:
        'I am conducting this work as my MSc research project in the African Center of Excellence in Internet of Things (ACEIoT), University of Rwanda.',
      architecture:
        'The proposed system chains a microphone front-end on a low-power microcontroller, short-window audio feature extraction (e.g. spectrogram-style features), an inference-efficient model such as a lightweight CNN quantized for edge execution, and an alert path over IoT connectivity to the beekeeper.',
      features: [
        'Passive acoustic monitoring of hive state — non-invasive to colonies',
        'On-device inference to avoid streaming raw audio (power and bandwidth savings)',
        'Design targeted at battery/solar-powered deployment in apiaries',
      ],
      challenges: [
        {
          challenge: 'Balancing model expressiveness with the memory and power budget of small MCUs.',
          solution: 'Evaluating lightweight CNN designs and quantization strategies typical of TinyML workflows.',
        },
        {
          challenge: 'Acoustic variability between hives, times of day and ambient environment.',
          solution: 'Treating it as an open research question to be addressed through data collection strategy in the next phase.',
        },
      ],
      links: { source: null, demo: null },
    },
  },
  {
    id: 'fog-mqtt',
    title: 'IoT Fog Computing with MQTT',
    summary:
      'Raspberry Pi fog nodes with Mosquitto MQTT — preprocessing IoT data close to the devices.',
    category: 'IoT & Embedded',
    technologies: ['Raspberry Pi', 'Python', 'Mosquitto MQTT', 'Edge/Fog Computing'],
    image: '/images/projects/fog-mqtt.jpg',
    status: 'Prototype / Exploration',
    implemented: [
      'Mosquitto MQTT broker running on a Raspberry Pi as a fog node',
      'Python publishers/subscribers simulating IoT device traffic',
      'Local preprocessing and forwarding of messages at the fog layer',
    ],
    planned: [
      'Integration with physical sensor fleets and cloud upstream sync is future work.',
    ],
    details: {
      problem:
        'Sending every raw IoT message to the cloud wastes bandwidth and adds latency. A fog layer close to devices can filter, aggregate and act before forwarding.',
      role: 'I set up the testbed, wrote the Python MQTT clients and the fog-side processing logic.',
      architecture:
        'Device-side Python clients publish telemetry over MQTT to a Mosquitto broker hosted on a Raspberry Pi. The fog node subscribes, applies filtering/aggregation logic, and keeps a local view of the system — demonstrating the edge → fog → cloud pattern.',
      features: [
        'Topic design for device telemetry and commands',
        'QoS experimentation for unreliable networks',
        'Fog-side windowed aggregation demonstration',
        'Lightweight dashboards from broker data',
      ],
      challenges: [
        {
          challenge: 'Resource contention on the Pi when broker and processing shared one process budget.',
          solution: 'Separating broker duties from application logic and benchmarking throughput per layer.',
        },
      ],
      links: { source: null, demo: null },
    },
  },
];
