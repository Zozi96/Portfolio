# 🖥️ Terminal Feature

An interactive terminal interface embedded in the portfolio website.

## Access

### Keyboard Shortcut
- **macOS**: `⌘ + K`
- **Windows/Linux**: `Ctrl + K`

### Click
- Click the Terminal icon (⌘) in the navbar

## Available Commands

```bash
help              # Show all available commands
about             # About Zozimo Fernández
contact           # Get contact information
skills            # List technical skills
skills --json     # Export skills as JSON format
experience        # Show work experience
projects          # List client projects
social            # Show social links
clear             # Clear terminal screen
exit              # Close terminal (or press ESC)
```

## Features

- ✅ **Keyboard shortcuts**: `⌘K` / `Ctrl+K` to toggle
- ✅ **ESC to close**: Press ESC key to exit
- ✅ **Command history**: Scroll to see previous commands
- ✅ **Auto-scroll**: Terminal automatically scrolls to latest output
- ✅ **Theme aware**: Matches portfolio dark theme
- ✅ **Multi-language**: Displays content in selected language (EN/ES)
- ✅ **JSON export**: Export skills data in JSON format

## Examples

### Get contact information
```bash
$ contact
Contact Information:
  Email:    zozi.fer96@gmail.com
  GitHub:   https://github.com/Zozi96
  LinkedIn: https://linkedin.com/in/zozi
```

### Export skills as JSON
```bash
$ skills --json
{
  "languages": ["Python", "C#", "TypeScript", "JavaScript", "SQL"],
  "frameworks": ["Django", "FastAPI", "Litestar", "Flask", "ASP.NET Core", "Blazor"],
  "databases": ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "PostGIS"],
  "cloud": ["AWS (Glue, EC2, RDS)", "Docker", "Git", "Windows Server"]
}
```

## Technical Details

- **Component**: `src/components/ui/Terminal.tsx`
- **Styling**: Tailwind CSS with custom terminal theme
- **State management**: React hooks (useState, useEffect)
- **Accessibility**: ARIA labels, keyboard navigation, ESC to close

## Design

- **Background**: zinc-950 (dark terminal background)
- **Text colors**:
  - Commands: emerald-400
  - Output: zinc-300
  - Errors: red-400
- **Border**: zinc-800
- **Monospace font**: System mono font stack
