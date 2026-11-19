window.PORTFOLIO_DATA = {
  profile: {
    name: "Ghulam Mustafa",
    shortName: "Mustafa",
    company: "Mustafa Code Sol Ltd",
    location: "Bahawalnagar, Pakistan",
    tagline: "I build automations and add-ons on the tools and websites solo business owners already use, so the manual work stops.",
    roles: [
      "Automation Builder for Solo Business Owners",
      "Add-on & Extension Developer",
      "API Reverse-Engineering Specialist",
      "Discord & Telegram Bot Builder",
      "FastAPI Backend Developer"
    ],
    email: "ghulammustafapy@gmail.com",
    resumeNote: "Private repository (client work) - walkthrough on request"
  },
  stats: [
    { value: 200, suffix: "+", decimals: 0, label: "Projects Delivered", sub: "On Fiverr & Upwork" },
    { value: 4.9, suffix: "", decimals: 1, label: "Star Rating", sub: "Consistently rated" },
    { value: 1, suffix: "", decimals: 0, label: "Upwork Top Rated", sub: "Verified excellence" },
    { value: 5, suffix: "+", decimals: 0, label: "Years Experience", sub: "Freelancing & engineering" }
  ],
  pillars: [
    { title: "Built on your tools", text: "Whatever website or software your business runs on (CRM, marketplace, listing, booking or practice platform), I build the automation on top of it, so you never have to switch tools." },
    { title: "Add-ons the tool never had", text: "When a platform is missing the feature you need, I build it: bots, browser extensions and small desktop apps that plug straight into it." },
    { title: "Simple enough to run alone", text: "A chat command in Discord or Telegram, or a one-click app. No technical setup, and nobody to babysit it." },
    { title: "Built to keep running", text: "Reverse-engineered APIs instead of fragile scraping, hosted and monitored, with documentation so it still makes sense months later." }
  ],
  projects: [
    {
      slug: "estate-scout-pro",
      title: "Estate Scout Pro",
      category: "Mobile",
      summary: "Flutter lead-scouting mobile app featuring gamified dashboards and secure backend integration.",
      tech: ["Flutter", "Provider", "Google Maps", "FastAPI", "PostgreSQL", "AWS S3"],
      problem: "Real-time property lead tracking lacked engaging mobile workflows and secure remote storage.",
      built: "Developed a Flutter frontend with gamified XP, property pins, and biometric login, backed by FastAPI, PostgreSQL, and AWS S3.",
      outcome: "Provided the client with a secure, engaging mobile experience for field agents to track and manage leads.",
      image: "img/projects/estate-scout-pro.jpg",
      year: "2025",
      links: []
    },
    {
      slug: "property-lead-scrapers",
      title: "Multi-Source Property-Lead Scrapers",
      category: "Automation",
      summary: "Five unattended scrapers running on hourly schedules with automated spreadsheet logging and alerts.",
      tech: ["Python", "Selenium", "Google Sheets API", "WhatsApp"],
      problem: "Manual lead collection across multiple real-estate portals was time-consuming and prone to gaps.",
      built: "Engineered five automated scrapers for Zillow, Auction.com, Propwire, Foreclosure.com, and Xome with crash-resilient batch saves.",
      outcome: "Automated the collection pipeline, delivering continuous updates directly to Google Sheets and instant WhatsApp notifications.",
      image: "img/projects/property-lead-scrapers.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "crm-zillow-sync-bot",
      title: "CRM-to-Zillow Status Sync Bot",
      category: "Bots",
      summary: "Discord bot that bridges a real-estate CRM and Zillow through intuitive slash commands.",
      tech: ["Python", "discord.py", "API reverse-engineering"],
      problem: "Real-estate teams faced repetitive, multi-step manual updates when syncing listing statuses.",
      built: "Created a Discord bot utilizing reverse-engineered APIs and slash commands to synchronize listing statuses directly.",
      outcome: "Streamlined operational workflows, eliminating manual data entry bottlenecks for team members.",
      image: "img/projects/crm-zillow-sync-bot.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "ticket-pricing-pipeline",
      title: "3-Platform Ticket Pricing Pipeline",
      category: "Ticketing",
      summary: "Automated pricing pipeline with distributed locking and multi-platform synchronization.",
      tech: ["Python", "Redis", "Auth0", "Gmail API", "GitHub Actions"],
      problem: "Cross-platform ticket pricing and listing creation involved manual calculations and risk of duplicate listings.",
      built: "Built an automated pipeline using Redis distributed locks and Auth0/Gmail integrations to pull, compute, and list tickets safely.",
      outcome: "Eliminated duplicate listings across machines and automated secure multi-factor authentication handling.",
      image: "img/projects/ticket-pricing-pipeline.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "live-price-batch-lister",
      title: "Live-Price Scraper and Batch Lister",
      category: "Ticketing",
      summary: "Desktop GUI application bypassing bot protection to fetch live prices and batch-create listings.",
      tech: ["Python", "DrissionPage", "desktop GUI"],
      problem: "Strict bot protections blocked standard scrapers from fetching real-time market ticket pricing.",
      built: "Developed a desktop GUI leveraging DrissionPage to execute authenticated browser fetch calls past defenses.",
      outcome: "Enabled seamless batch listing creation using accurate, real-time market data.",
      image: "img/projects/live-price-batch-lister.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "skybox-repricing-tui",
      title: "Skybox Re-Pricing TUI",
      category: "Ticketing",
      summary: "Terminal user interface for safe, configurable ticket re-pricing with live competitor depth.",
      tech: ["Python", "httpx", "Textual", "SQLite"],
      problem: "Managing ticket markups and competitor pricing depth required a lightweight, fast, and safe interface.",
      built: "Engineered a Textual TUI with SQLite persistence, dry-run defaults, a --live flag, and session refresh capabilities.",
      outcome: "Provided operators with a robust, terminal-based control panel for precise pricing adjustments.",
      image: "img/projects/skybox-repricing-tui.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "stubrelay-tui",
      title: "StubRelay",
      category: "Ticketing",
      summary: "Single-user terminal application for automated marketplace browsing, compliance checks, and listing.",
      tech: ["Python", "Textual", "httpx", "Chrome DevTools Protocol", "pytest"],
      problem: "Manual marketplace monitoring, price calculation, and legal compliance checks slowed down listing velocity.",
      built: "Created a comprehensive terminal app featuring fast HTTP scraping with Chrome DevTools fallback, fuzzy matching, and kill-switches.",
      outcome: "Automated end-to-end ticket posting while ensuring strict legal compliance and safe review checkpoints.",
      image: "img/projects/stubrelay-tui.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "simplepractice-ehr-api",
      title: "SimplePractice EHR API",
      category: "Healthcare",
      summary: "Production-grade FastAPI integration featuring robust caching, rate limiting, and CI testing.",
      tech: ["FastAPI", "Redis", "pytest", "GitHub Actions"],
      problem: "Integrating practice-management platforms required secure, high-performance API wrappers with strict reliability.",
      built: "Developed a production FastAPI backend complete with a 25-test GitHub Actions suite, Redis caching, and IP rotation.",
      outcome: "Delivered a stable, secure EHR integration capable of handling high request volumes reliably.",
      image: "img/projects/simplepractice-ehr-api.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "ehr-mcp-server",
      title: "Mental-Health EHR API with MCP",
      category: "Healthcare",
      summary: "FastAPI wrapper with AWS SigV4 security exposed as an MCP tool server for AI agents.",
      tech: ["FastAPI", "fastapi-mcp", "AWS SigV4"],
      problem: "AI agents needed secure, authenticated programmatic access to mental-health EHR endpoints.",
      built: "Wrapped the FastAPI backend with AWS SigV4 signed requests and exposed it as an MCP tool server.",
      outcome: "Enabled secure integration for AI agents to interact directly with healthcare data services.",
      image: "img/projects/ehr-mcp-server.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "school-information-system",
      title: "School Information System Platform",
      category: "Education",
      summary: "Large-scale backend wrapping a legacy government student system for regional schools.",
      tech: ["FastAPI", "Celery", "PostgreSQL", "React"],
      problem: "Legacy government student systems suffered from offline bottlenecks and task-queue contention across multiple schools.",
      built: "Built a robust FastAPI/Celery/PostgreSQL backend supporting offline-first capture, cross-school dashboards, and concurrency fixes.",
      outcome: "Stabilized operations across approximately 100 schools in Punjab with reliable offline synchronization.",
      image: "img/projects/school-information-system.jpg",
      year: "2024",
      links: [ { label: "Live demo", url: "https://punjabsis.com/" } ]
    },
    {
      slug: "raabtax-chat",
      title: "RaabtaX Real-Time Chat",
      category: "Mobile",
      summary: "Real-time mobile messaging application built with Flet, featuring OTP authentication and pub/sub.",
      tech: ["Python", "Flet", "PostgreSQL", "Redis"],
      problem: "Users needed a lightweight, responsive real-time chat application with secure OTP onboarding.",
      built: "Implemented a cross-platform chat app using Python Flet, PostgreSQL, and Redis pub/sub messaging.",
      outcome: "Delivered a snappy real-time messaging solution with seamless session management.",
      image: "img/projects/raabtax-chat.jpg",
      year: "2024",
      links: [
        { label: "Source", url: "https://github.com/Mustafahubs/RaabtaX" }
      ]
    },
    {
      slug: "retail-pos-accounting",
      title: "Retail POS and Accounting System",
      category: "Web",
      summary: "Modern web-based POS and double-entry accounting system replacing a legacy .NET solution.",
      tech: ["React 18", "Vite", "Fastify", "TypeScript", "PostgreSQL"],
      problem: "Legacy .NET point-of-sale software lacked modern accounting rigor, inventory batch tracking, and test invariants.",
      built: "Rebuilt the platform as a React and Fastify application featuring double-entry accounting, FEFO batches, and automated invariant tests.",
      outcome: "Provided retail clients with a reliable, audit-ready POS system and precise inventory control.",
      image: "img/projects/retail-pos-accounting.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "asset-distribution-server",
      title: "Asset Distribution Server",
      category: "DevOps",
      summary: "Self-hosted versioned file server offering secure checksum-verified links and automated updates.",
      tech: ["FastAPI", "GitHub Actions", "PowerShell"],
      problem: "Securely distributing versioned software builds with checksum verification required a custom self-hosted solution.",
      built: "Created a FastAPI distribution server with semver latest redirects, SHA-256 validation, and enumeration-safe token links.",
      outcome: "Automated secure software delivery and self-updating client builds via GitHub Actions.",
      image: "img/projects/asset-distribution-server.jpg",
      year: "2024",
      links: []
    },
    {
      slug: "thekedaar-app",
      title: "Thekedaar",
      category: "Mobile",
      summary: "Offline-first construction management mobile app tailored for contractors in Pakistan.",
      tech: ["Flutter", "Supabase", "GitHub Actions"],
      problem: "Pakistani construction contractors lacked digital tools to track daily labor attendance, advances, and weekly settlements offline.",
      built: "Developed an offline-first Flutter app with Supabase backend, WhatsApp OTP login, PDF bill generation, and automated workflows.",
      outcome: "Empowered local contractors to manage payroll and project finances efficiently without constant internet connectivity.",
      image: "img/projects/thekedaar-app.jpg",
      year: "2024",
      links: [
        { label: "Live landing page", url: "https://mustafahubs.github.io/thekedaar-app/" }
      ]
    },
    {
      slug: "belvino-fans",
      title: "Belvino Fans",
      category: "Web",
      summary: "Showpiece animated product landing page for a fictional premium fan brand.",
      tech: ["React 18", "Vite", "Tailwind"],
      problem: "Needed a high-performance, visually engaging product showcase demonstrating advanced front-end animation capabilities.",
      built: "Built a React landing page featuring a spinning-fan hero with speed controls, catalog filtering, room-size calculator, and SEO optimization.",
      outcome: "Created an immersive portfolio showpiece highlighting modern UI/UX design execution.",
      image: "img/projects/belvino-fans.jpg",
      year: "2024",
      links: [
        { label: "Live demo", url: "https://belvino.fastapi.us" }
      ]
    }
  ],
  categories: [
    "All",
    "Automation",
    "Bots",
    "Ticketing",
    "Healthcare",
    "Mobile",
    "Web",
    "DevOps",
    "Education"
  ],
  skills: [
    {
      group: "Languages",
      items: ["Python primary", "JavaScript/TypeScript", "Dart", "SQL", "Bash/PowerShell", "HTML/CSS"]
    },
    {
      group: "Backend",
      items: ["FastAPI", "Django", "Celery+Redis", "SQLAlchemy/Alembic", "Pydantic", "pytest"]
    },
    {
      group: "Frontend",
      items: ["React/Next.js", "Vue 3", "Flutter", "Flet", "Tailwind"]
    },
    {
      group: "Automation and Scraping",
      items: ["DrissionPage", "Selenium", "network-traffic interception", "OCR/Tesseract", "CAPTCHA handling", "proxy rotation"]
    },
    {
      group: "Data",
      items: ["PostgreSQL", "MySQL", "SQLite", "Redis", "pandas"]
    },
    {
      group: "Cloud and DevOps",
      items: ["Docker", "Hetzner", "AWS S3", "Cloudflare Tunnel", "nginx", "GitHub Actions", "Tailscale", "Raspberry Pi 5 self-hosting"]
    },
    {
      group: "Integrations",
      items: ["Stripe", "Google Sheets/Gmail API", "Discord", "Telegram", "WhatsApp", "Auth0", "GraphQL"]
    },
    {
      group: "AI and MCP",
      items: ["MCP tool servers", "Ollama local LLMs", "LangChain/CrewAI", "Claude Code"]
    }
  ],
  marquees: [
    ["Python", "FastAPI", "Automation", "Scraping", "PostgreSQL", "Redis", "Docker", "Tailwind"],
    ["APIs", "Reverse-Engineering", "Bots", "Discord", "Telegram", "Flutter", "Celery", "CI/CD"],
    ["React", "TypeScript", "Selenium", "Supabase", "AWS", "Linux", "AsyncIO", "Architecture"]
  ],
  timeline: [
    {
      role: "Founder and Lead Engineer",
      org: "Mustafa Code Sol Ltd",
      period: "Feb 2025-present",
      points: [
        "Incorporated UK company providing high-performance backend and automation engineering.",
        "Delivering bespoke API integration and scalable cloud solutions for international clients."
      ]
    },
    {
      role: "Data Analyst and Web Scraping",
      org: "Fiverr",
      period: "Oct 2021-present",
      points: [
        "Delivered 200+ projects with a 4.9 star rating, achieving Level 2 status within 6 months.",
        "Specialized in complex data extraction, automation pipelines, and browser interception."
      ]
    },
    {
      role: "Python Browser Automation Developer",
      org: "Upwork",
      period: "Aug 2021-present",
      points: [
        "Maintained Upwork Top Rated status building robust scraping and automation workflows.",
        "Solved intricate anti-bot challenges using advanced proxy rotation and traffic analysis."
      ]
    },
    {
      role: "Web Automation Developer",
      org: "PolarGrowth",
      period: "Jul 2022-Mar 2023",
      points: [
        "Architected mailing-automation bots across platforms including Apollo.io, Quickmail, Zoho, and Instantly.ai.",
        "Streamlined outbound lead generation pipelines for enterprise growth campaigns."
      ]
    },
    {
      role: "Programming Instructor",
      org: "Independent",
      period: "2021-present",
      points: [
        "Mentored aspiring developers for 4+ years in Python, backend development, and automation.",
        "Taught fundamental computer science concepts and practical software engineering workflows."
      ]
    }
  ],
  services: [
    { num: "", title: "Automations on the tools you already use", desc: "Tell me which website or software your business runs on. I automate the repetitive clicks, exports and data entry on it." },
    { num: "", title: "Add-ons for your platforms", desc: "Missing a feature? I build bots, browser extensions and small apps that plug straight into the tools you use." },
    { num: "", title: "Discord & Telegram bots", desc: "Run your workflow from a chat command. A simple control panel for owners who don't want another dashboard." },
    { num: "", title: "Sync between your tools", desc: "Move data between the sites and systems you use (listings, orders, contacts, bookings) automatically and without duplicates." },
    { num: "", title: "Industry platforms I've built on", desc: "Real estate, event ticketing, healthcare practice management and e-commerce marketplaces." },
    { num: "", title: "Backends, hosting & upkeep", desc: "FastAPI and Django services, servers, deployment and monitoring, so the automation keeps running." },
    { num: "", title: "Handover & teaching", desc: "Clear documentation and Python mentoring, so you or your team can understand and change what I built." }
  ],
  links: [
    { label: "Email", url: "mailto:ghulammustafapy@gmail.com", type: "email" },
    { label: "Fiverr", url: "https://www.fiverr.com/mustafahubs", type: "fiverr", static: true },
    { label: "GitHub", url: "https://github.com/Mustafahubs", type: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/ghulam-mustafa-dev", type: "linkedin" },
    { label: "dev.to", url: "https://dev.to/mustafacode", type: "devto" },
    { label: "Twitter", url: "https://twitter.com/selfdev__", type: "twitter" },
    { label: "Telegram", url: "https://t.me/self_mustafa", type: "telegram" },
    { label: "WhatsApp", url: "https://wa.me/447426767993", type: "whatsapp" }
  ],
  privateNote: "Private repository (client work) - walkthrough on request"
};