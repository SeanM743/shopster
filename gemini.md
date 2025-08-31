# Gemini Context System - Entry Point

*This is the SINGLE FILE to reference for new Gemini sessions. It orchestrates the entire context system for token efficiency.*

---

## 🎯 How to Use This System

**For New Gemini Sessions:**
1. Read this file first (you're doing it now!)
2. Read the 3 core context files listed below
3. Check the session file for recent changes
4. Begin development work
5. **🚨 CRITICAL: Update SESSION.md at end of session with work completed**

**Total Token Load:** ~3,000 tokens (optimized for efficiency)

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

### 6. **General Project Documentation**
**Directory:** `docs/`
**Purpose:** Comprehensive documentation on various aspects of the project.
**When to Read:** As needed for specific details on API, Database, Deployment, Infrastructure, Rate Limiting, and Security.
**Contains:**
- `docs/API.md`: Detailed API endpoints for all services.
- `docs/DATABASE.md`: Comprehensive database schemas and configurations.
- `docs/DEPLOYMENT.md`: Strategies for Docker Compose, Kubernetes, and Cloud platforms.
- `docs/INFRASTRUCTURE.md`: Service discovery, multi-host, load balancing, and MCP integration.
- `docs/RATE_LIMITING.md`: Implementation details for API rate limiting.
- `docs/SECURITY.md`: Authentication, encryption, and security best practices.

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

## 🎯 Context System Rules

### For Gemini Sessions:
1. **Always read MASTER.md first** - contains essential context
2. **Check SESSION.md** - understand recent changes and current state  
3. **Reference QUICK_REF.md** - for commands and quick solutions
4. **🚨 MUST UPDATE SESSION.md at end** - document work completed (this is critical!)
5. **Archive and Docs reference only** - read only when deep architectural knowledge or specific details are needed

### For File Management:
- **MASTER.md:** Keep updated with major architecture changes
- **SESSION.md:** Add entry after each significant session
- **QUICK_REF.md:** Keep under 100 lines for quick scanning
- **Archive:** Don't modify, reference only
- **Docs:** Don't modify, reference only (unless explicitly tasked to update)

This system provides full context awareness while maintaining token efficiency for extended development sessions.

---

*Last updated: 2025-08-31 - Initial Gemini context system creation*