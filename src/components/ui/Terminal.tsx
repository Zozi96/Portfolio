import { useState, useEffect, useRef } from "react";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { usePdfWorker } from "../../hooks/usePdfWorker";
import type { Language } from "../../utils/cvGenerator";

interface TerminalLine {
  type: "command" | "output" | "error";
  content: string;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAVIGABLE_SECTIONS: Record<string, string> = {
  home: "home",
  projects: "projects",
  "personal projects": "personal-projects",
  "personal-projects": "personal-projects",
  techstack: "tech-stack",
  "tech-stack": "tech-stack",
  tech: "tech-stack",
  experience: "experience",
  contact: "contact",
};

function scrollToSection(sectionId: string): boolean {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Zozbit Terminal v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands" },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLanguage();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { generateAndDownload } = usePdfWorker();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(" ");
    const command = args[0];

    setHistory((prev) => [...prev, { type: "command", content: `$ ${cmd}` }]);

    switch (command) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: "Available commands:" },
          { type: "output", content: "  help              - Show this help message" },
          { type: "output", content: "  about             - About Zozimo Fernández" },
          { type: "output", content: "  contact           - Get contact information" },
          { type: "output", content: "  skills            - List technical skills" },
          { type: "output", content: "  skills --json     - Export skills as JSON" },
          { type: "output", content: "  experience        - Show work experience" },
          { type: "output", content: "  projects          - List client projects" },
          { type: "output", content: "  social            - Show social links" },
          { type: "output", content: "  whoami            - Print effective userid" },
          { type: "output", content: "  go to <section>   - Navigate to a section" },
          { type: "output", content: "  download cv       - Download CV as PDF" },
          { type: "output", content: "  theme <dark|light|toggle> - Change theme" },
          { type: "output", content: "  clear             - Clear terminal" },
          { type: "output", content: "  exit              - Close terminal" },
          { type: "output", content: "" },
        ]);
        break;

      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: t("hero.name") },
          { type: "output", content: t("hero.title") },
          { type: "output", content: "" },
          { type: "output", content: t("hero.subtitle") },
          { type: "output", content: "" },
        ]);
        break;

      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: "Contact Information:" },
          { type: "output", content: `  Email:    ${t("footer.email")}` },
          { type: "output", content: `  GitHub:   https://${t("footer.github")}` },
          { type: "output", content: `  LinkedIn: https://${t("footer.linkedin")}` },
          { type: "output", content: "" },
        ]);
        break;

      case "skills":
        if (args.includes("--json")) {
          const skillsData = {
            languages: ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
            frameworks: [
              "Django",
              "FastAPI",
              "Litestar",
              "Flask",
              "ASP.NET Core",
              "Blazor",
            ],
            databases: [
              "PostgreSQL",
              "MySQL",
              "SQL Server",
              "MongoDB",
              "PostGIS",
            ],
            cloud: ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"],
          };
          setHistory((prev) => [
            ...prev,
            { type: "output", content: "" },
            { type: "output", content: JSON.stringify(skillsData, null, 2) },
            { type: "output", content: "" },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "output", content: "" },
            { type: "output", content: "Technical Skills:" },
            { type: "output", content: "" },
            { type: "output", content: "Languages:" },
            { type: "output", content: "  Python, C#, TypeScript, JavaScript, SQL" },
            { type: "output", content: "" },
            { type: "output", content: "Frameworks:" },
            {
              type: "output",
              content: "  Django, FastAPI, Litestar, Flask, ASP.NET Core, Blazor",
            },
            { type: "output", content: "" },
            { type: "output", content: "Databases:" },
            {
              type: "output",
              content: "  PostgreSQL, MySQL, SQL Server, MongoDB, PostGIS",
            },
            { type: "output", content: "" },
            { type: "output", content: "Cloud & DevOps:" },
            {
              type: "output",
              content: "  AWS (Glue, EC2, RDS), Docker, Git, Windows Server",
            },
            { type: "output", content: "" },
            { type: "output", content: "Tip: Use 'skills --json' for JSON format" },
            { type: "output", content: "" },
          ]);
        }
        break;

      case "experience":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: "Professional Experience:" },
          { type: "output", content: "" },
          {
            type: "output",
            content: "[2023-Present] Senior Software Engineer @ ArkusNexus",
          },
          { type: "output", content: "  • Advanta Health (C#, ASP.NET, Blazor)" },
          { type: "output", content: "  • Bob Finance (Python, PySpark, AWS Glue)" },
          { type: "output", content: "  • Wag Hotels (Django, AWS)" },
          { type: "output", content: "" },
          {
            type: "output",
            content: "[2022-2023] Python Developer @ Adinfi",
          },
          { type: "output", content: "  • ADContent platform (Django REST)" },
          { type: "output", content: "" },
          {
            type: "output",
            content: "[2021-2023] Python Engineer (Tech Lead) @ mediQó",
          },
          { type: "output", content: "  • HealthTech platform" },
          { type: "output", content: "" },
        ]);
        break;

      case "projects":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: "Client Projects:" },
          { type: "output", content: "" },
          { type: "output", content: "1. Advanta Health Platform" },
          {
            type: "output",
            content: "   Tech: C#, ASP.NET Core, Blazor, SQL Server",
          },
          {
            type: "output",
            content: "   12+ microservices for healthcare management",
          },
          { type: "output", content: "" },
          { type: "output", content: "2. Wag Hotels Backend" },
          { type: "output", content: "   Tech: Django, MySQL, Docker, AWS" },
          { type: "output", content: "   Scalable pet hotel management system" },
          { type: "output", content: "" },
          { type: "output", content: "3. Bob Finance Data Pipeline" },
          { type: "output", content: "   Tech: Python, PySpark, AWS Glue" },
          { type: "output", content: "   ETL pipelines for large-scale data" },
          { type: "output", content: "" },
        ]);
        break;

      case "social":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "" },
          { type: "output", content: "Social Links:" },
          { type: "output", content: `  GitHub:   https://${t("footer.github")}` },
          { type: "output", content: `  LinkedIn: https://${t("footer.linkedin")}` },
          { type: "output", content: "" },
        ]);
        break;

      case "whoami":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "guest" },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
        onClose();
        break;

      case "go": {
        // "go to <section>" — rest of args joined after "to"
        const toIndex = args.indexOf("to");
        const target = toIndex !== -1 ? args.slice(toIndex + 1).join(" ") : args.slice(1).join(" ");
        const sectionId = NAVIGABLE_SECTIONS[target];
        if (!sectionId) {
          const available = Object.keys(NAVIGABLE_SECTIONS)
            .filter((k) => !k.includes("-"))
            .join(", ");
          setHistory((prev) => [
            ...prev,
            { type: "error", content: `Unknown section: "${target}". Available: ${available}` },
            { type: "output", content: "" },
          ]);
        } else {
          const found = scrollToSection(sectionId);
          setHistory((prev) => [
            ...prev,
            found
              ? { type: "output", content: `↓ Navigating to #${sectionId}…` }
              : { type: "error", content: `Section #${sectionId} not found in DOM.` },
            { type: "output", content: "" },
          ]);
          if (found) onClose();
        }
        break;
      }

      case "download": {
        const subCmd = args[1];
        if (subCmd !== "cv") {
          setHistory((prev) => [
            ...prev,
            { type: "error", content: `Unknown download target: "${subCmd}". Try 'download cv'.` },
            { type: "output", content: "" },
          ]);
          break;
        }
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "⏳ Generating CV in background…" },
        ]);
        generateAndDownload(locale as Language)
          .then(() => {
            setHistory((prev) => [
              ...prev,
              { type: "output", content: "✅ CV downloaded successfully." },
              { type: "output", content: "" },
            ]);
          })
          .catch((err: unknown) => {
            setHistory((prev) => [
              ...prev,
              { type: "error", content: `Failed to generate CV: ${String(err)}` },
              { type: "output", content: "" },
            ]);
          });
        break;
      }

      case "theme": {
        const mode = args[1];
        if (mode === "dark") {
          setTheme("dark");
          setHistory((prev) => [
            ...prev,
            { type: "output", content: "🌙 Theme set to dark." },
            { type: "output", content: "" },
          ]);
        } else if (mode === "light") {
          setTheme("light");
          setHistory((prev) => [
            ...prev,
            { type: "output", content: "☀️ Theme set to light." },
            { type: "output", content: "" },
          ]);
        } else if (mode === "toggle") {
          toggleTheme();
          setHistory((prev) => [
            ...prev,
            { type: "output", content: `🔄 Theme toggled to ${theme === "dark" ? "light" : "dark"}.` },
            { type: "output", content: "" },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "error", content: `Usage: theme <dark|light|toggle>` },
            { type: "output", content: "" },
          ]);
        }
        break;
      }

      case "":
        break;

      default:
        setHistory((prev) => [
          ...prev,
          {
            type: "error",
            content: `Command not found: ${command}. Type 'help' for available commands.`,
          },
          { type: "output", content: "" },
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setCommandHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInput(commandHistory[prevIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-3xl h-[600px] bg-zinc-950 rounded-xl shadow-2xl border border-zinc-800 flex flex-col overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-zinc-300">
              zozbit@portfolio:~
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "command"
                  ? "text-emerald-400 mb-1"
                  : line.type === "error"
                  ? "text-red-400 mb-1"
                  : "text-zinc-300 mb-0.5"
              }
            >
              {line.content}
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-zinc-300 font-mono text-sm outline-none placeholder-zinc-600"
              placeholder="Type a command... (try 'help')"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
