# Quick Start Guide - Ecommerce Platform Documentation

This guide helps you quickly navigate and use the reorganized documentation structure for effective development.

## 🚀 Getting Started

### **New Developer Onboarding**
1. **Start Here**: [Overview](context/overview.md) - Understand project goals and architecture
2. **Technology**: [Technology Stack](context/technology-stack.md) - Learn the tools and frameworks
3. **Patterns**: [Architecture Patterns](context/architecture-patterns.md) - Understand design patterns and code organization
4. **Standards**: [Development Standards](context/development-standards.md) - Follow coding conventions

### **Experienced Developer Quick Reference**
- **API Standards**: [Architecture Patterns](context/architecture-patterns.md#api-design-standards)
- **Code Conventions**: [Development Standards](context/development-standards.md#naming-conventions)  
- **Infrastructure**: [Infrastructure Spec](context/infrastructure-spec.md)
- **Visual Testing**: [Visual Testing Workflow](context/visual-testing-workflow.md)

## 📂 What Changed from the Reorganization

### **Before (Monolithic)**
```
.claude/
├── context/
│   ├── builder_context.md          (304 lines - everything mixed together)
│   └── architecture_spec.md        (456 lines - infrastructure + patterns)
├── agents/
└── frontend_screenshot_testing/
```

### **After (Modular)**
```
.claude/
├── README.md                       # Navigation index and overview
├── QUICK_START.md                  # This file - quick navigation guide
├── context/                        # Focused, single-purpose context files
│   ├── overview.md                 # Project mission and service boundaries
│   ├── technology-stack.md         # Technology choices and versions
│   ├── architecture-patterns.md    # Design patterns and code organization
│   ├── development-standards.md    # Coding standards and conventions  
│   ├── infrastructure-spec.md      # Infrastructure and deployment
│   └── visual-testing-workflow.md  # Frontend testing procedures
├── agents/                         # Enhanced agent specifications
│   ├── senior-code-review-engineer.md  (with better cross-references)
│   └── frontend-visual-testing-agent.md  (with context integration)
└── frontend_screenshot_testing/    # Visual testing artifacts
```

## 🎯 Common Use Cases

### **Backend Development**
```
1. Check service boundaries → overview.md
2. Confirm Java/Spring versions → technology-stack.md  
3. Review design patterns → architecture-patterns.md
4. Follow naming conventions → development-standards.md
5. Code review guidelines → agents/senior-code-review-engineer.md
```

### **Frontend Development**
```
1. Understand UI requirements → overview.md
2. Check React/TypeScript setup → technology-stack.md
3. Review component patterns → architecture-patterns.md
4. Follow naming conventions → development-standards.md
5. Visual testing process → visual-testing-workflow.md
6. Visual testing agent → agents/frontend-visual-testing-agent.md
```

### **DevOps/Infrastructure Work**
```
1. System architecture → overview.md + infrastructure-spec.md
2. Container configuration → infrastructure-spec.md
3. CI/CD pipeline → infrastructure-spec.md
4. Database setup → infrastructure-spec.md
5. Load balancer config → infrastructure-spec.md
```

### **Code Reviews**
```
1. Use the Senior Code Review Engineer agent → agents/senior-code-review-engineer.md
2. Check against development standards → development-standards.md
3. Verify architectural compliance → architecture-patterns.md
4. Validate security practices → development-standards.md#security-standards
```

### **Visual Changes/UI Work**
```
1. Follow visual testing workflow → visual-testing-workflow.md
2. Use frontend testing agent → agents/frontend-visual-testing-agent.md
3. Store screenshots → frontend_screenshot_testing/
4. Check component standards → development-standards.md
```

## 📖 File Purposes & When to Use Each

| File | Primary Purpose | When to Reference |
|------|----------------|-------------------|
| [overview.md](context/overview.md) | Project mission, service boundaries | Starting new work, understanding context |
| [technology-stack.md](context/technology-stack.md) | Specific technology versions and choices | Setting up environment, dependency updates |
| [architecture-patterns.md](context/architecture-patterns.md) | Design patterns, code organization | Daily development, architectural decisions |
| [development-standards.md](context/development-standards.md) | Coding standards, naming conventions | Code reviews, maintaining consistency |
| [infrastructure-spec.md](context/infrastructure-spec.md) | Deployment, containers, CI/CD | Infrastructure changes, deployment issues |
| [visual-testing-workflow.md](context/visual-testing-workflow.md) | Frontend testing process | Any UI/visual changes |

## 🔗 Cross-References & Navigation

Each file now includes proper cross-references:
- **Related Files**: Links to relevant context documents
- **See Also**: References to additional information
- **Agent Integration**: Connections to specialized agents

Example navigation patterns:
```
Technology Stack → Architecture Patterns → Development Standards
Overview → Infrastructure Spec (for deployment understanding)
Visual Testing Workflow → Frontend Testing Agent (for execution)
```

## 🛠️ Working with Agents

### **Code Review Process**
```
1. Read: agents/senior-code-review-engineer.md
2. Reference: development-standards.md + architecture-patterns.md  
3. Apply: Code review checklist and standards
4. Document: Use provided review comment templates
```

### **Visual Testing Process**
```
1. Read: visual-testing-workflow.md (7-step process)
2. Reference: agents/frontend-visual-testing-agent.md
3. Execute: Playwright MCP testing
4. Store: Screenshots in frontend_screenshot_testing/
```

## ⚡ Quick Commands

### **Find Information Fast**
```bash
# Search all context files for specific topics
grep -r "authentication" .claude/context/
grep -r "testing" .claude/context/
grep -r "docker" .claude/context/
```

### **Check File Relationships**
```bash
# See all cross-references in a file
grep -n "\[.*\](.*.md)" .claude/context/overview.md
```

### **Validate Documentation Structure**
```bash
# List all markdown files
find .claude -name "*.md" | sort
```

## 📋 Benefits of the New Structure

### **For Developers**
- ✅ **Faster Information Finding**: Single-purpose files with clear focus
- ✅ **Better Maintainability**: Update specific areas without affecting others  
- ✅ **Reduced Cognitive Load**: Smaller, focused documents
- ✅ **Clear Navigation**: Logical flow between related concepts

### **For Teams**
- ✅ **Parallel Updates**: Multiple people can update different areas simultaneously
- ✅ **Specialized Knowledge**: Experts can maintain their domain areas
- ✅ **Onboarding**: New team members follow structured learning path
- ✅ **Quality**: Focused files are easier to keep accurate and current

### **For Project Management**
- ✅ **Tracking Changes**: See exactly what areas are being updated
- ✅ **Review Process**: Review specific domain changes in isolation
- ✅ **Documentation Debt**: Identify outdated areas more easily
- ✅ **Standards Enforcement**: Clear, findable standards for each area

## 🔄 Migration Notes

### **Old File Backups**
The original monolithic files have been preserved as backups:
- `builder_context.md.backup` - Original builder context
- `architecture_spec.md.backup` - Original architecture spec

These can be removed after confirming the new structure meets all needs.

### **Agent Updates**
Both agents have been enhanced with:
- Better cross-references to context files
- Integration guidelines with other agents  
- Clear quality standards and thresholds

This reorganized structure provides a much more maintainable and navigable documentation system for the ecommerce platform development.