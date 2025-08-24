# Ecommerce Platform Documentation Index

This directory contains all context, specifications, and agent definitions for the ecommerce platform project.

## 📁 Directory Structure

```
.claude/
├── README.md                           # This file - navigation index
├── QUICK_START.md                      # Quick navigation and usage guide
├── context/                           # Project context and specifications
│   ├── overview.md                    # High-level project overview
│   ├── technology-stack.md            # Frontend & backend technology choices
│   ├── architecture-patterns.md       # Design patterns and principles
│   ├── development-standards.md       # Coding standards and conventions
│   ├── infrastructure-spec.md         # Deployment and infrastructure
│   └── visual-testing-workflow.md     # Frontend testing procedures
├── specs/                            # Detailed service specifications
│   ├── frontend-specification.md     # Frontend layouts and components
│   └── [backend services...]
├── agents/                           # Specialized agent definitions
│   ├── senior-code-review-engineer.md
│   ├── frontend-visual-testing-agent.md
│   └── [future agents...]
└── frontend_screenshot_testing/      # Visual testing artifacts
    ├── components/
    ├── pages/
    ├── baselines/
    └── test-reports/
```

## 📋 Quick Navigation

### **Core Context Files**
- [**Project Overview**](context/overview.md) - Mission, architecture approach, and service boundaries
- [**Technology Stack**](context/technology-stack.md) - Frontend and backend technology choices
- [**Architecture Patterns**](context/architecture-patterns.md) - Design patterns, principles, and code organization
- [**Development Standards**](context/development-standards.md) - Coding standards, conventions, and quality gates
- [**Infrastructure Specification**](context/infrastructure-spec.md) - Deployment, databases, CI/CD, and scaling
- [**Visual Testing Workflow**](context/visual-testing-workflow.md) - Frontend testing procedures and requirements
- [**Brand Context**](context/brand-context.md) - Shopster brand identity, colors, typography, and design system

### **Service Specifications**
- [**Frontend Specification**](specs/frontend-specification.md) - Homepage and product detail page layouts, components, and UX requirements
- [**Backend Orchestration Specification**](specs/backend-orchestration-specification.md) - Spring MVC BFF layer, API endpoints, and data provider integration

### **Specialized Agents**
- [**Senior Code Review Engineer**](agents/senior-code-review-engineer.md) - Backend code review and architecture compliance
- [**Frontend Visual Testing Agent**](agents/frontend-visual-testing-agent.md) - UI/UX validation and visual regression testing

### **Testing & Quality**
- [**Visual Testing Guide**](frontend_screenshot_testing/README.md) - Screenshot testing procedures and organization

## 🎯 How to Use This Documentation

### **For Development Work**
1. **Start with Overview** - Understand project goals and architecture
2. **Review Technology Stack** - Confirm tool choices and versions  
3. **Check Development Standards** - Follow coding conventions and patterns
4. **Reference Infrastructure Spec** - Understand deployment and scaling requirements

### **For Code Reviews**
1. Use the **Senior Code Review Engineer** agent specification
2. Reference **Architecture Patterns** for compliance checking
3. Validate against **Development Standards**

### **For Frontend Changes**
1. Follow the **Visual Testing Workflow**
2. Use the **Frontend Visual Testing Agent** specification
3. Store evidence in **frontend_screenshot_testing/**

### **For Architecture Decisions**
1. Reference **Architecture Patterns** for established approaches
2. Check **Infrastructure Spec** for deployment implications
3. Consider impact across all service boundaries

## 🔄 File Maintenance

This documentation is designed to be:
- **Modular** - Each file has a single responsibility
- **Cross-Referenced** - Files link to related concepts
- **Maintainable** - Easy to update specific areas without affecting others
- **Searchable** - Clear structure for finding information quickly

When updating:
- Keep files focused on their primary concern
- Update cross-references when moving content
- Maintain consistent formatting and structure
- Test any workflow changes before documenting

## 📊 File Purpose Summary

| File | Purpose | Size | Usage Frequency |
|------|---------|------|-----------------|
| overview.md | Project mission and architecture | Medium | Onboarding |
| technology-stack.md | Tool and framework choices | Small | Reference |
| architecture-patterns.md | Design patterns and principles | Large | Daily development |
| development-standards.md | Coding standards and conventions | Medium | Code reviews |
| infrastructure-spec.md | Deployment and operations | Large | DevOps planning |
| visual-testing-workflow.md | Frontend testing procedures | Medium | UI development |

This organized structure ensures that information is easy to find, update, and maintain as the project evolves.