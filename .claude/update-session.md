# Session Update Instructions for Claude

*Use this template to update SESSION.md at the end of each development session.*

## Update Process
1. Copy the template section below
2. Replace placeholders with actual work completed
3. Add new section to SESSION.md above the template
4. Update "Last updated" timestamp

## Template for New Session Entry

```markdown
## Session YYYY-MM-DD (COMPLETED)

### 🔧 Work Completed
- [Feature/fix implemented]
- [Files modified with specific paths]
- [Database/service changes]

### 🐛 Issues Resolved
- **[Issue Name]**: [Brief description of problem and solution]
- **[Another Issue]**: [Root cause and fix applied]

### 📊 Application Status Changes
- **Services**: [Which services are now running/stopped]
- **Database**: [Any database changes or new data]
- **Features**: [New features available or bugs fixed]
- **Configuration**: [Environment or config changes]

### 🎯 Current Application State
- **Authentication**: [Login state and nav bar behavior]
- **Data Loading**: [Products, users, cart status]
- **Service Health**: [Which ports are active and working]
- **Known Issues**: [Any remaining issues or blockers]

---
```

## Quick Status Checks
```bash
# Service status
lsof -i :3000  # Frontend
lsof -i :8082  # Product Service
lsof -i :8083  # User Service

# Git status
git status --porcelain | wc -l  # Number of changed files

# Database status
mongo --eval "db.adminCommand('ismaster')" shopster_products_dev
```

## Common Session Types
- **Bug Fix Session**: Focus on issues resolved and root causes
- **Feature Development**: Emphasize new functionality and components added
- **Infrastructure**: Service setup, database changes, configuration updates
- **Testing/QA**: Visual testing, debugging, performance improvements

Remember: Keep session entries concise but informative for future context.