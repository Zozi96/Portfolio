interface ProjectMetric {
  label: string;
  value: string;
  live?: "pypi_version" | "github_stars";
}

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  metrics: ProjectMetric[];
  stack: string[];
  liveStats?: {
    pypi?: string;
    github?: string;
  };
}

interface FocusArea {
  title: string;
  description: string;
}

interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface TechStackCategory {
  name: string;
  items: string[];
}

export interface Content {
  [key: string]: unknown;
  seo: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    focus: string;
    projects: string;
    personal: string;
    stack: string;
    experience: string;
    contact: string;
    menu: string;
  };
  hero: {
    badge: string;
    eyebrow: string;
    name: string;
    title: string;
    subtitle: string;
    availability: string;
    location: string;
    cta1: string;
    cta2: string;
    cta3: string;
    stats: {
      years: string;
      projects: string;
      industries: string;
    };
    commandLabel: string;
    terminalHint: string;
  };
  sectionLabels: {
    focus: string;
    projects: string;
    personalProjects: string;
    techStack: string;
    experience: string;
    contact: string;
  };
  focus: {
    title: string;
    intro: string;
    areas: FocusArea[];
  };
  projects: {
    title: string;
    intro: string;
    items: ProjectItem[];
  };
  personalProjects: {
    title: string;
    intro: string;
    items: ProjectItem[];
  };
  techStack: {
    title: string;
    intro: string;
    categories: TechStackCategory[];
  };
  experience: {
    title: string;
    intro: string;
    roles: ExperienceRole[];
  };
  contact: {
    title: string;
    intro: string;
    sideTitle: string;
    sideDescription: string;
    sideAvailability: string;
    sideEmailLabel: string;
    sideLocationLabel: string;
    nameLabel: string;
    emailLabel: string;
    typeLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendButton: string;
    sending: string;
    success: string;
    error: string;
    selectPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    types: {
      project: string;
      job: string;
      consultancy: string;
      other: string;
    };
  };
  footer: {
    contact: string;
    description: string;
    navigation: string;
    signature: string;
    email: string;
    github: string;
    linkedin: string;
    portfolio: string;
    rights: string;
  };
}

interface LocalizedContent {
  en: Content;
  es: Content;
}

export const content: LocalizedContent = {
  en: {
    seo: {
      title: "Zozimo Fernández | Senior Software Engineer",
      description:
        "Senior Software Engineer specializing in distributed systems, Python, .NET, cloud architecture, and product-minded delivery for international teams.",
      keywords:
        "Software Engineer, Full-Stack Developer, Python, Django, FastAPI, .NET, C#, AWS, Cloud Architecture, React, TypeScript",
      author: "Zozimo Fernández",
      ogTitle: "Zozimo Fernández, Senior Software Engineer",
      ogDescription:
        "I design resilient systems, data-heavy platforms, and cloud architecture that teams can actually scale.",
    },
    nav: {
      home: "Home",
      focus: "Focus",
      projects: "Projects",
      personal: "Labs",
      stack: "Stack",
      experience: "Experience",
      contact: "Contact",
      menu: "Menu",
    },
    hero: {
      badge: "Open for sharp engineering work",
      eyebrow: "Portfolio / Senior software engineering",
      name: "Zozimo Fernández",
      title: "I build backend systems that stay fast, clean, and scalable under pressure.",
      subtitle:
        "Senior Software Engineer focused on distributed systems, Python, .NET, data engineering, and cloud architecture. I ship production-grade systems with strong fundamentals, clean boundaries, and zero patience for brittle software.",
      availability: "Available for senior engineering, backend architecture, and high-leverage consulting.",
      location: "Based in Villahermosa, Mexico, collaborating with international teams.",
      cta1: "Explore selected work",
      cta2: "GitHub",
      cta3: "Download CV",
      stats: {
        years: "Years building",
        projects: "Shipped engagements",
        industries: "Industries",
      },
      commandLabel: "terminal shortcuts",
      terminalHint: "Press Ctrl/Cmd + K to open the terminal mode",
    },
    sectionLabels: {
      focus: "Where I create leverage",
      projects: "Selected client work",
      personalProjects: "Open source and personal bets",
      techStack: "Tools I trust in production",
      experience: "Career timeline",
      contact: "Start a conversation",
    },
    focus: {
      title: "Systems, data, and delivery with engineering taste.",
      intro:
        "I usually sit where architecture, execution, and performance all matter at the same time. The sweet spot is turning messy requirements into stable systems that teams can extend without fear.",
      areas: [
        {
          title: "Distributed Systems & Architecture",
          description:
            "Service boundaries, fault tolerance, long-term maintainability, and backend design that survives real traffic instead of just passing the demo.",
        },
        {
          title: "Data Engineering",
          description:
            "Batch and pipeline design with Python, PySpark, and AWS Glue for high-volume ingestion, transformation, and operational reporting.",
        },
        {
          title: "Cloud Delivery",
          description:
            "AWS infrastructure, Dockerized deployments, and pragmatic operational choices that improve reliability without turning the stack into theater.",
        },
      ],
    },
    projects: {
      title: "Selected client work",
      intro:
        "A few examples of the kind of systems I enjoy building: operationally heavy, business-critical, and meant to hold up after the first release.",
      items: [
        {
          title: "Advanta Health Platform",
          category: ".NET / Healthcare Platform",
          description:
            "Enterprise healthcare platform composed of multiple C# and ASP.NET services, with modern Blazor interfaces and Windows-based infrastructure backed by SQL Server.",
          metrics: [
            { label: "Microservices", value: "12+" },
            { label: "Core stack", value: ".NET/C#" },
            { label: "Infra", value: "Windows" },
          ],
          stack: [
            "C#",
            "ASP.NET Core",
            "Blazor",
            "SQL Server",
            "Windows Server",
          ],
        },
        {
          title: "Wag Hotels Backend",
          category: "Python / Platform Backend",
          description:
            "Scalable Django services for hospitality operations, paired with AWS infrastructure, MySQL data management, and Docker-based delivery across environments.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Data", value: "MySQL" },
            { label: "Cloud", value: "AWS" },
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"],
        },
        {
          title: "Bob Finance Data Pipeline",
          category: "Data Engineering / ETL",
          description:
            "High-volume ETL pipelines on AWS Glue using Python and PySpark to process parquet and CSV sources with optimized transforms and better operational throughput.",
          metrics: [
            { label: "Platform", value: "AWS Glue" },
            { label: "Engine", value: "PySpark" },
            { label: "Formats", value: "Parquet/CSV" },
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"],
        },
      ],
    },
    personalProjects: {
      title: "Open source and personal bets",
      intro:
        "I also like building small, sharp tools. Usually backend-first, security-conscious, and designed to be pleasant to use by other engineers.",
      items: [
        {
          title: "hash-forge",
          category: "Open Source Python Library",
          description:
            "A lightweight Python hashing toolkit with more than ten secure algorithms, async support, builder patterns, batch operations, and clean configuration ergonomics.",
          metrics: [
            { label: "Algorithms", value: "10+" },
            { label: "Version", value: "—", live: "pypi_version" },
            { label: "Stars", value: "—", live: "github_stars" },
          ],
          stack: ["Python", "asyncio", "bcrypt", "Argon2", "PBKDF2"],
          liveStats: { pypi: "hash-forge", github: "Zozi96/hash-forge" },
        },
      ],
    },
    techStack: {
      title: "Tools I trust in production",
      intro:
        "These are not random logo stickers. They are the tools I reach for when delivery quality, runtime behavior, and maintainability actually matter.",
      categories: [
        {
          name: "Languages",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
        },
        {
          name: "Frameworks",
          items: [
            "Django",
            "FastAPI",
            "Litestar",
            "Flask",
            "ASP.NET Core",
            "Blazor",
          ],
        },
        {
          name: "Databases",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"],
        },
        {
          name: "Cloud & DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"],
        },
      ],
    },
    experience: {
      title: "A track record across platform, product, and data work.",
      intro:
        "Most of my work sits behind products people depend on. That means architecture decisions need to be practical, measurable, and maintainable by the next engineer who touches them.",
      roles: [
        {
          title: "Senior Software Engineer",
          company: "ArkusNexus",
          period: "March 2023 – Present",
          description: [
            "Leading architecture and development of distributed services for Advanta Health with a strong focus on resilience and maintainability.",
            "Modernized legacy infrastructure for Wag Hotels, helping move the platform toward a more scalable cloud setup.",
            "Improved backend performance by refactoring expensive queries and tightening execution paths across core flows.",
            "Designed large-scale ingestion pipelines for Bob Finance with AWS Glue and PySpark across heterogeneous data sources.",
          ],
        },
        {
          title: "Python Developer",
          company: "Adinfi",
          period: "April 2022 - March 2023",
          description: [
            "Built the core backend for ADContent using Django REST Framework with strong API discipline and maintainable service structure.",
            "Designed a dedicated database architecture for invoice processing, separating concerns to preserve long-term scalability.",
            "Improved system responsiveness through indexing strategy and query tuning on high-traffic environments.",
            "Pushed Docker adoption to standardize local environments and deployment flows.",
          ],
        },
        {
          title: "Python Engineer (Tech Lead)",
          company: "mediQó",
          period: "December 2021 - May 2023",
          description: [
            "Led technical direction for a HealthTech product, balancing roadmap delivery with platform quality.",
            "Implemented geospatial capabilities with PostGIS for provider matching and location-aware experiences.",
            "Ran reviews and performance profiling to remove bottlenecks before they became product pain.",
            "Architected scalable REST APIs for growth and integrations.",
          ],
        },
        {
          title: "Python Developer",
          company: "XID - Digital Services",
          period: "June 2021 - December 2021",
          description: [
            "Worked on booking engine services for Palace Resorts using Flask and high-availability backend patterns.",
            "Refactored legacy code to improve maintainability and reduce operational friction.",
            "Collaborated on complex reservation APIs with cross-functional teams.",
            "Strengthened platform stability with better integration testing and safer error handling.",
          ],
        },
        {
          title: "Software Developer",
          company: "Binary Systems",
          period: "August 2020 - July 2021",
          description: [
            "Built a custom CRM for real-estate workflows using Django and PostgreSQL.",
            "Resolved production issues and delivered iterative features tied directly to operator workflows.",
            "Optimized ORM queries across more complex relational data paths.",
            "Delivered software under agile cycles without sacrificing engineering fundamentals.",
          ],
        },
      ],
    },
    contact: {
      title: "Let’s build something that can survive production.",
      intro:
        "If you need backend architecture, data-heavy systems, or a senior engineer who can move fast without leaving a mess behind, we should talk.",
      sideTitle: "What I can help with",
      sideDescription:
        "Senior backend work, architecture reviews, cloud delivery, technical leadership, and selective consulting for teams that care about quality.",
      sideAvailability: "Usually replying within 24 hours for serious inquiries.",
      sideEmailLabel: "Direct email",
      sideLocationLabel: "Location",
      nameLabel: "Full name",
      emailLabel: "Work or personal email",
      typeLabel: "Inquiry type",
      subjectLabel: "Subject",
      messageLabel: "Message",
      sendButton: "Send message",
      sending: "Sending...",
      success: "Message sent successfully.",
      error: "Could not send the message. Please try again.",
      selectPlaceholder: "Choose an inquiry type",
      subjectPlaceholder: "A quick headline helps",
      messagePlaceholder: "Tell me a bit about the context, constraints, and what you need solved.",
      types: {
        project: "Project proposal",
        job: "Full-time opportunity",
        consultancy: "Consulting / architecture review",
        other: "Other",
      },
    },
    footer: {
      contact: "Get in touch",
      description: "Backend architecture, cloud delivery, and software that keeps its shape under real-world load.",
      navigation: "Navigation",
      signature: "Built with engineering taste and production bias.",
      email: "zfernandez@zozbit.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      portfolio: "portfolio.zozbit.com",
      rights: "All rights reserved",
    },
  },
  es: {
    seo: {
      title: "Zozimo Fernández | Ingeniero de Software Senior",
      description:
        "Ingeniero de Software Senior especializado en sistemas distribuidos, Python, .NET, arquitectura cloud y ejecución con criterio de producto para equipos internacionales.",
      keywords:
        "Ingeniero de Software, Desarrollador Full-Stack, Python, Django, FastAPI, .NET, C#, AWS, Arquitectura en la Nube, React, TypeScript",
      author: "Zozimo Fernández",
      ogTitle: "Zozimo Fernández, Ingeniero de Software Senior",
      ogDescription:
        "Diseño sistemas resilientes, plataformas orientadas a datos y arquitectura cloud que de verdad escalan sin volverse frágiles.",
    },
    nav: {
      home: "Inicio",
      focus: "Enfoque",
      projects: "Proyectos",
      personal: "Labs",
      stack: "Stack",
      experience: "Experiencia",
      contact: "Contacto",
      menu: "Menú",
    },
    hero: {
      badge: "Disponible para trabajo técnico serio",
      eyebrow: "Portfolio / Ingeniería de software senior",
      name: "Zozimo Fernández",
      title: "Construyo sistemas backend que siguen siendo rápidos, limpios y escalables cuando el tráfico aprieta.",
      subtitle:
        "Ingeniero de Software Senior enfocado en sistemas distribuidos, Python, .NET, data engineering y arquitectura cloud. Entrego software de producción con fundamentos sólidos, límites claros y muy poca tolerancia al código frágil.",
      availability: "Disponible para ingeniería senior, arquitectura backend y consultoría de alto impacto.",
      location: "Desde Villahermosa, México, colaborando con equipos internacionales.",
      cta1: "Explorar trabajo seleccionado",
      cta2: "GitHub",
      cta3: "Descargar CV",
      stats: {
        years: "Años construyendo",
        projects: "Engagements entregados",
        industries: "Industrias",
      },
      commandLabel: "accesos por terminal",
      terminalHint: "Presiona Ctrl/Cmd + K para abrir el modo terminal",
    },
    sectionLabels: {
      focus: "Dónde genero más leverage",
      projects: "Trabajo para clientes",
      personalProjects: "Open source y apuestas personales",
      techStack: "Herramientas que sí confío en producción",
      experience: "Trayectoria",
      contact: "Abramos conversación",
    },
    focus: {
      title: "Sistemas, datos y delivery con criterio de ingeniería.",
      intro:
        "Normalmente trabajo donde arquitectura, ejecución y performance importan al mismo tiempo. Mi terreno favorito es convertir requisitos confusos en sistemas estables que el equipo puede extender sin miedo.",
      areas: [
        {
          title: "Sistemas Distribuidos y Arquitectura",
          description:
            "Límites de servicios, tolerancia a fallos, mantenibilidad a largo plazo y diseño backend que aguanta tráfico real en lugar de solo sobrevivir al demo.",
        },
        {
          title: "Ingeniería de Datos",
          description:
            "Diseño de pipelines y procesos batch con Python, PySpark y AWS Glue para ingesta, transformación y reporting sobre volúmenes altos de datos.",
        },
        {
          title: "Entrega en la Nube",
          description:
            "Infraestructura en AWS, despliegues con Docker y decisiones operativas pragmáticas que mejoran confiabilidad sin convertir el stack en teatro.",
        },
      ],
    },
    projects: {
      title: "Trabajo seleccionado con clientes",
      intro:
        "Una muestra del tipo de sistemas que disfruto construir: operacionalmente exigentes, críticos para negocio y pensados para sostenerse después del primer release.",
      items: [
        {
          title: "Plataforma Advanta Health",
          category: ".NET / Plataforma Healthcare",
          description:
            "Plataforma empresarial de salud compuesta por múltiples servicios en C# y ASP.NET, con interfaces modernas en Blazor e infraestructura Windows respaldada por SQL Server.",
          metrics: [
            { label: "Microservicios", value: "12+" },
            { label: "Stack base", value: ".NET/C#" },
            { label: "Infra", value: "Windows" },
          ],
          stack: [
            "C#",
            "ASP.NET Core",
            "Blazor",
            "SQL Server",
            "Windows Server",
          ],
        },
        {
          title: "Backend Wag Hotels",
          category: "Python / Backend de Plataforma",
          description:
            "Servicios escalables en Django para operación hotelera, acompañados de infraestructura AWS, manejo de datos en MySQL y delivery con Docker entre entornos.",
          metrics: [
            { label: "Framework", value: "Django" },
            { label: "Datos", value: "MySQL" },
            { label: "Cloud", value: "AWS" },
          ],
          stack: ["Python", "Django", "MySQL", "Docker", "AWS"],
        },
        {
          title: "Pipeline de Datos Bob Finance",
          category: "Data Engineering / ETL",
          description:
            "Pipelines ETL de alto volumen en AWS Glue usando Python y PySpark para procesar fuentes parquet y CSV con transforms optimizados y mejor throughput operativo.",
          metrics: [
            { label: "Plataforma", value: "AWS Glue" },
            { label: "Motor", value: "PySpark" },
            { label: "Formatos", value: "Parquet/CSV" },
          ],
          stack: ["Python", "PySpark", "AWS Glue", "Parquet", "ETL"],
        },
      ],
    },
    personalProjects: {
      title: "Open source y apuestas personales",
      intro:
        "También me gusta construir herramientas pequeñas y filosas. Casi siempre backend-first, con buen ojo para seguridad y diseñadas para que otras ingenieras quieran usarlas.",
      items: [
        {
          title: "hash-forge",
          category: "Librería Python Open Source",
          description:
            "Toolkit ligero de hashing en Python con más de diez algoritmos seguros, soporte async, patrón builder, operaciones batch y una ergonomía de configuración bien resuelta.",
          metrics: [
            { label: "Algoritmos", value: "10+" },
            { label: "Versión", value: "—", live: "pypi_version" },
            { label: "Estrellas", value: "—", live: "github_stars" },
          ],
          stack: ["Python", "asyncio", "bcrypt", "Argon2", "PBKDF2"],
          liveStats: { pypi: "hash-forge", github: "Zozi96/hash-forge" },
        },
      ],
    },
    techStack: {
      title: "Herramientas que sí confío en producción",
      intro:
        "No son stickers de logos puestos al azar. Son herramientas a las que recurro cuando la calidad de entrega, el comportamiento en runtime y la mantenibilidad importan de verdad.",
      categories: [
        {
          name: "Lenguajes",
          items: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
        },
        {
          name: "Frameworks",
          items: [
            "Django",
            "FastAPI",
            "Litestar",
            "Flask",
            "ASP.NET Core",
            "Blazor",
          ],
        },
        {
          name: "Bases de Datos",
          items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"],
        },
        {
          name: "Cloud y DevOps",
          items: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"],
        },
      ],
    },
    experience: {
      title: "Trayectoria entre plataforma, producto y datos.",
      intro:
        "La mayor parte de mi trabajo vive detrás de productos de los que la gente depende. Eso obliga a que las decisiones de arquitectura sean prácticas, medibles y mantenibles por la siguiente ingeniera que toque el sistema.",
      roles: [
        {
          title: "Ingeniero de Software Senior",
          company: "ArkusNexus",
          period: "Marzo 2023 – Presente",
          description: [
            "Liderando arquitectura y desarrollo de servicios distribuidos para Advanta Health, con foco en resiliencia y mantenibilidad.",
            "Modernicé infraestructura legacy para Wag Hotels, ayudando a mover la plataforma hacia una base cloud más escalable.",
            "Mejoré performance del backend refactorizando consultas costosas y afinando rutas críticas.",
            "Diseñé pipelines de ingesta a gran escala para Bob Finance con AWS Glue y PySpark sobre fuentes heterogéneas.",
          ],
        },
        {
          title: "Desarrollador Python",
          company: "Adinfi",
          period: "Abril 2022 - Marzo 2023",
          description: [
            "Construí el backend principal de ADContent con Django REST Framework, con disciplina de API y estructura mantenible.",
            "Diseñé una arquitectura de base de datos dedicada para procesamiento de facturas, separando responsabilidades para preservar escalabilidad.",
            "Mejoré respuesta general del sistema con estrategia de índices y query tuning en entornos de alto tráfico.",
            "Empujé la adopción de Docker para estandarizar entornos locales y flujos de despliegue.",
          ],
        },
        {
          title: "Ingeniero Python (Líder Técnico)",
          company: "mediQó",
          period: "Diciembre 2021 - Mayo 2023",
          description: [
            "Lideré dirección técnica para un producto HealthTech, equilibrando roadmap y calidad de plataforma.",
            "Implementé capacidades geoespaciales con PostGIS para matching de proveedores y experiencias basadas en ubicación.",
            "Ejecuté code reviews y perfilado de performance para eliminar cuellos de botella antes de que dolieran en producto.",
            "Arquitecté APIs REST escalables para crecimiento e integraciones.",
          ],
        },
        {
          title: "Desarrollador Python",
          company: "XID - Digital Services",
          period: "Junio 2021 - Diciembre 2021",
          description: [
            "Trabajé en servicios del booking engine para Palace Resorts usando Flask y patrones backend de alta disponibilidad.",
            "Refactoricé código legacy para mejorar mantenibilidad y reducir fricción operativa.",
            "Colaboré en APIs complejas de reservaciones con equipos multifuncionales.",
            "Fortalecí estabilidad con mejores pruebas de integración y manejo de errores más seguro.",
          ],
        },
        {
          title: "Desarrollador de Software",
          company: "Binary Systems",
          period: "Agosto 2020 - Julio 2021",
          description: [
            "Construí un CRM personalizado para flujos inmobiliarios usando Django y PostgreSQL.",
            "Resolví incidencias en producción y entregué mejoras iterativas atadas al trabajo real de operación.",
            "Optimicé consultas ORM sobre relaciones de datos más complejas.",
            "Entregué software bajo ciclos ágiles sin sacrificar fundamentos de ingeniería.",
          ],
        },
      ],
    },
    contact: {
      title: "Construyamos algo que sí sobreviva producción.",
      intro:
        "Si necesitas arquitectura backend, sistemas intensivos en datos o una ingeniera senior que sepa moverse rápido sin dejar un desastre detrás, hablemos.",
      sideTitle: "En qué puedo ayudar",
      sideDescription:
        "Trabajo backend senior, revisiones de arquitectura, entrega cloud, liderazgo técnico y consultoría selectiva para equipos que sí valoran la calidad.",
      sideAvailability: "Normalmente respondo en menos de 24 horas a consultas serias.",
      sideEmailLabel: "Email directo",
      sideLocationLabel: "Ubicación",
      nameLabel: "Nombre completo",
      emailLabel: "Email de trabajo o personal",
      typeLabel: "Tipo de consulta",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      sendButton: "Enviar mensaje",
      sending: "Enviando...",
      success: "Mensaje enviado correctamente.",
      error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      selectPlaceholder: "Elige un tipo de consulta",
      subjectPlaceholder: "Un encabezado corto ayuda bastante",
      messagePlaceholder: "Cuéntame un poco del contexto, restricciones y qué necesitas resolver.",
      types: {
        project: "Propuesta de proyecto",
        job: "Oportunidad full-time",
        consultancy: "Consultoría / revisión de arquitectura",
        other: "Otro",
      },
    },
    footer: {
      contact: "Contacto",
      description: "Arquitectura backend, entrega cloud y software que mantiene su forma bajo carga real.",
      navigation: "Navegación",
      signature: "Construido con criterio de ingeniería y sesgo a producción.",
      email: "zfernandez@zozbit.com",
      github: "github.com/Zozi96",
      linkedin: "linkedin.com/in/zozi",
      portfolio: "portfolio.zozbit.com",
      rights: "Todos los derechos reservados",
    },
  },
};
