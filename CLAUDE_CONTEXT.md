# Claude Context System - Entry Point

*This is the SINGLE FILE to reference for new Claude sessions. It orchestrates the entire context system for token efficiency.*

---

## 🎯 How to Use This System

**For New Claude Sessions:**
1. Read this file first (you're doing it now!)
2. Read the 3 core context files listed below
3. Check the session file for recent changes
4. Begin development work
5. **🚨 CRITICAL: Update SESSION.md at end of session with work completed**

**Total Token Load:** ~3,000 tokens (vs. 15,000+ with old system)

---

## 📁 Core Context Files (Read These)

### 1. **Primary Context** 
**File:** `.claude/context/MASTER.md`  
**Purpose:** Essential application overview, tech stack, architecture, current status  
**When to Read:** Always - first file after this one  
**Contains:** Live service status, tech stack, project structure, key patterns

### 2. **Recent Work Log**
**File:** `.claude/context/SESSION.md`  
**Purpose:** Running log of all development sessions and changes  
**When to Read:** Always - to understand recent changes and current state  
**Contains:** Bug fixes, features added, application state changes, issues resolved

### 3. **Quick Reference**  
**File:** `.claude/context/QUICK_REF.md`  
**Purpose:** Commands, endpoints, common fixes, and development shortcuts  
**When to Read:** When needing specific commands or troubleshooting  
**Contains:** Service startup commands, API endpoints, common issues, file paths

---

## 📋 Optional Reference Files (Read If Needed)

### 4. **Session Update Guide**
**File:** `.claude/update-session.md`  
**Purpose:** Instructions for updating SESSION.md after work completion  
**When to Read:** At end of session when documenting work  
**Contains:** Template and process for adding session entries

### 5. **Archived Details** 
**Directory:** `.claude/context/archive/`  
**Purpose:** Detailed documentation (patterns, standards, infrastructure)  
**When to Read:** Only when implementing complex features requiring deep architectural knowledge  
**Contains:** Full documentation that was consolidated into MASTER.md

---

## 🔄 Context Update Workflow

### During Development Session:
1. **Start:** Read MASTER.md + SESSION.md + QUICK_REF.md (~3k tokens)
2. **Work:** Complete development tasks
3. **🚨 MANDATORY END STEP:** Update SESSION.md with work completed

### Session Update Process:
1. Use template in `update-session.md`  
2. Add new session entry to top of `SESSION.md`
3. Include: work completed, issues resolved, status changes
4. Keep entries concise but informative

---

## 🎪 Context System Benefits

### Token Efficiency
- **Old System:** 10 files × 1,500 tokens = 15,000 tokens
- **New System:** 3 files × 1,000 tokens = 3,000 tokens  
- **Savings:** 80% reduction in context consumption

### Maintenance Benefits
- **Single Source:** All essential info in MASTER.md
- **Running History:** SESSION.md tracks all changes chronologically
- **Quick Access:** QUICK_REF.md for immediate needs
- **Focused Context:** Only read what you need for current task

### Developer Experience
- **Fast Onboarding:** 3 files to get full context
- **Easy Updates:** Simple session logging process
- **Comprehensive Archive:** Detailed docs available when needed
- **Consistent Format:** Standardized information structure

---

## 🛠 File Structure Summary

```
/home/seanmah/ecommerce/
├── CLAUDE_CONTEXT.md          ← This file (entry point)
├── .claude/
│   ├── update-session.md      ← Session update template
│   └── context/
│       ├── MASTER.md          ← Core application context
│       ├── SESSION.md         ← Running work log
│       ├── QUICK_REF.md       ← Commands & shortcuts
│       └── archive/           ← Detailed documentation
│           ├── overview.md
│           ├── technology-stack.md
│           ├── architecture-patterns.md
│           ├── development-standards.md
│           ├── infrastructure-spec.md
│           ├── brand-context.md
│           ├── visual-testing-workflow.md
│           └── session_2025-08-24.md
└── apps/                      ← Application source code
    ├── frontend/              ← React TypeScript
    ├── product-service/       ← Spring Boot + MongoDB
    ├── user-service/          ← Spring Boot + PostgreSQL
    ├── cart-service/          ← Spring Boot + Redis
    └── membership-service/    ← Spring Boot + PostgreSQL
```

---

## ⚡ Quick Start for New Sessions

```bash
# Tell Claude: "Read /home/seanmah/ecommerce/CLAUDE_CONTEXT.md and follow its instructions"

# Claude will then read:
# 1. .claude/context/MASTER.md       (application overview)
# 2. .claude/context/SESSION.md      (recent changes)  
# 3. .claude/context/QUICK_REF.md    (commands & shortcuts)

# Total: ~3,000 tokens vs 15,000+ with old system
```

---

## 🎯 Context System Rules

### For Claude Sessions:
1. **Always read MASTER.md first** - contains essential context
2. **Check SESSION.md** - understand recent changes and current state  
3. **Reference QUICK_REF.md** - for commands and quick solutions
4. **🚨 MUST UPDATE SESSION.md at end** - document work completed (this is critical!)
5. **Archive reference only** - read only when deep architectural knowledge needed

### For File Management:
- **MASTER.md:** Keep updated with major architecture changes
- **SESSION.md:** Add entry after each significant session
- **QUICK_REF.md:** Keep under 100 lines for quick scanning
- **Archive:** Don't modify, reference only

This system provides full context awareness while maintaining token efficiency for extended development sessions.

---

*Last updated: 2025-08-24 - Initial context system restructuring*