# Visual Testing & Frontend QA Workflow

This document defines the mandatory visual testing workflow for all frontend changes to ensure design compliance, functionality, and user experience quality.

## Overview

Every visual change to the frontend must follow a systematic 7-step workflow to maintain consistency, quality, and compliance with design standards. This process integrates automated testing tools with manual validation to catch issues before deployment.

## 7-Step Visual Testing Process

### **1. Change Identification**
**Purpose**: Document and scope the changes being made

**Steps**:
- [ ] **Document Changes**: Create detailed description of visual elements being modified
- [ ] **Component Mapping**: Map changes to specific React components and pages affected
- [ ] **Design Reference**: Reference design mockups, Figma files, or style guides
- [ ] **Impact Assessment**: Identify potential side effects on related components
- [ ] **Scope Definition**: Define testing boundaries and focus areas

**Documentation Template**:
```markdown
## Change Summary
- **Component**: ProductCard, CheckoutForm
- **Pages Affected**: /products, /checkout
- **Change Type**: New feature, bug fix, style update
- **Design Reference**: Link to Figma/mockup
- **Expected Impact**: Describe visual and functional changes
```

### **2. Automated Navigation & Testing**
**Purpose**: Use Playwright MCP for consistent, automated testing

**Tools**: Playwright MCP for browser automation

**Testing Procedure**:
- [ ] **Start Application**: Ensure frontend is running (`npm start`)
- [ ] **Navigate to Pages**: Use Playwright MCP to navigate to affected pages
- [ ] **Viewport Testing**: Test across all required screen sizes
- [ ] **State Testing**: Test different component states (loading, error, success)
- [ ] **Interaction Testing**: Test user interactions and form submissions

**Playwright Commands**:
```
Use playwright mcp to:
- Navigate to http://localhost:3000/products
- Set viewport to 375x667 for mobile testing
- Set viewport to 1920x1080 for desktop testing
- Wait for page load and component hydration
- Take screenshot and save to /.claude/frontend_screenshot_testing/
```

**Viewport Requirements**:
| Viewport | Width | Height | Priority | Use Case |
|----------|-------|--------|----------|----------|
| Mobile   | 375px | 667px  | HIGH     | iPhone SE |
| Tablet   | 768px | 1024px | MEDIUM   | iPad |
| Desktop  | 1920px| 1080px | HIGH     | Standard desktop |
| Large    | 2560px| 1440px | LOW      | Large monitors |

### **3. Design Compliance Verification**
**Purpose**: Ensure adherence to design system and visual standards

**Validation Checklist**:
- [ ] **Design System**: Verify shadcn/ui component usage and customization
- [ ] **Color Palette**: Confirm colors match design system specifications
- [ ] **Typography**: Validate font families, sizes, weights, line heights
- [ ] **Spacing**: Check margins, padding, and spacing consistency
- [ ] **Component Variants**: Ensure proper variant usage (primary, secondary, etc.)
- [ ] **Visual Hierarchy**: Confirm proper information hierarchy and emphasis

**Reference Files**:
- [Technology Stack](technology-stack.md) for component library standards
- [Development Standards](development-standards.md) for design conventions
- Design system documentation (external)

### **4. Feature Implementation Validation**
**Purpose**: Verify functional behavior matches specifications

**Functional Testing**:
- [ ] **Interactive Elements**: Test all buttons, links, form controls work correctly
- [ ] **State Management**: Verify component state changes respond to user actions
- [ ] **API Integration**: Validate data fetching, form submissions, error handling
- [ ] **Navigation**: Confirm routing and page transitions work properly
- [ ] **Form Validation**: Test input validation and error message display
- [ ] **Loading States**: Verify loading spinners, skeleton screens, placeholders

**Testing Scenarios**:
```typescript
// Example test scenarios for ProductCard component
1. Default state with product data
2. Loading state while fetching data
3. Error state when API fails
4. Hover state for interactive feedback
5. Out-of-stock state display
6. Add-to-cart functionality
7. Responsive behavior across viewports
```

### **5. Acceptance Criteria Verification**
**Purpose**: Validate implementation against defined requirements

**Validation Steps**:
- [ ] **Context References**: Check component acceptance criteria from context files
- [ ] **User Stories**: Validate implementation against defined user stories
- [ ] **Business Logic**: Ensure business rules are properly implemented
- [ ] **Edge Cases**: Test boundary conditions and error scenarios
- [ ] **Accessibility Requirements**: Verify a11y compliance requirements met

**Acceptance Criteria Template**:
```markdown
## Component Acceptance Criteria
### Functional Requirements
- [ ] Component renders without errors
- [ ] Props interface implemented correctly  
- [ ] Event handlers function as expected
- [ ] State management working properly

### Visual Requirements
- [ ] Design matches approved mockups
- [ ] Colors match design system
- [ ] Typography follows style guide
- [ ] Responsive behavior correct

### Accessibility Requirements  
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Focus indicators visible
```

### **6. Evidence Capture**
**Purpose**: Document testing results with visual evidence

**Screenshot Requirements**:
- [ ] **Screenshot Storage**: Store in `/.claude/frontend_screenshot_testing/`
- [ ] **Naming Convention**: `{component-name}_{viewport}_{state}_{timestamp}.png`
- [ ] **Before/After Comparison**: Capture baseline vs. updated versions
- [ ] **Multiple States**: Screenshot different component states
- [ ] **Test Reports**: Generate comprehensive test documentation

**Storage Structure**:
```
/.claude/frontend_screenshot_testing/
├── components/
│   ├── buttons/
│   │   ├── primary-button_desktop_default_20240823.png
│   │   ├── primary-button_mobile_hover_20240823.png
│   │   └── primary-button_tablet_disabled_20240823.png
│   ├── forms/
│   │   ├── login-form_desktop_validation-error_20240823.png
│   │   └── checkout-form_mobile_success_20240823.png
│   └── cards/
├── pages/
│   ├── homepage/
│   ├── product-catalog/
│   └── checkout-flow/
├── baselines/
│   └── approved_screenshots/
└── test-reports/
    ├── visual-regression-report.html
    ├── accessibility-audit.json
    └── performance-metrics.json
```

**Documentation Generation**:
- Test execution summary with pass/fail status
- Screenshot evidence with before/after comparisons
- Accessibility audit results
- Performance metrics and Core Web Vitals
- Browser compatibility test results

### **7. Error Detection & Reporting**
**Purpose**: Identify and document any issues or regressions

**Error Detection Checklist**:
- [ ] **Console Errors**: Check browser console for JavaScript errors
- [ ] **Network Issues**: Validate API calls and network requests succeed
- [ ] **Accessibility Issues**: Run automated accessibility audits (axe-core)
- [ ] **Performance Metrics**: Monitor Lighthouse scores and Core Web Vitals
- [ ] **Cross-Browser Issues**: Test compatibility across different browsers
- [ ] **Responsive Issues**: Validate layout at different screen sizes

**Error Reporting Template**:
```markdown
## Issue Report
- **Issue Type**: Console Error, Network Failure, Accessibility, Performance
- **Severity**: HIGH, MEDIUM, LOW
- **Component**: Affected component name
- **Viewport**: Screen size where issue occurs
- **Browser**: Chrome, Firefox, Safari
- **Description**: Clear description of the issue
- **Screenshots**: Visual evidence of the problem
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected vs Actual**: What should happen vs what actually happens
```

## Quality Gates & Approval Criteria

### **Pre-Merge Requirements**
Before any frontend changes can be merged:

**Visual Testing**:
- [ ] All visual tests executed successfully
- [ ] Screenshots captured and stored properly
- [ ] Visual regression differences approved
- [ ] Component states tested comprehensively

**Technical Validation**:
- [ ] No JavaScript console errors
- [ ] No network request failures
- [ ] API integration working correctly
- [ ] Form submissions and validations functional

**Accessibility Compliance**:
- [ ] Accessibility score ≥ 95%
- [ ] WCAG 2.1 AA standards met
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility verified

**Performance Standards**:
- [ ] Lighthouse performance score ≥ 85
- [ ] Core Web Vitals within acceptable ranges:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

**Cross-Browser Compatibility**:
- [ ] Chrome (latest version) tested
- [ ] Firefox (latest version) tested  
- [ ] Safari (latest version) tested
- [ ] Mobile browsers tested (Chrome Mobile, Safari Mobile)

## Tools Integration

### **Playwright MCP**
- Automated browser testing and navigation
- Screenshot capture with consistent environment
- Cross-viewport testing automation
- JavaScript error detection

### **Accessibility Testing**
- axe-core integration for automated a11y auditing
- Color contrast ratio validation
- Keyboard navigation testing
- Screen reader compatibility checks

### **Performance Monitoring**
- Lighthouse CI for performance auditing
- Core Web Vitals tracking
- Bundle size analysis and monitoring
- Image optimization validation

### **Visual Regression**
- Screenshot comparison against approved baselines
- Pixel-perfect difference detection
- Layout shift identification
- Visual change approval workflow

## Workflow Integration

### **Development Process**
1. **Feature Development** → Visual Testing Workflow → **Code Review**
2. **Bug Fixes** → Visual Testing Workflow → **Regression Testing**  
3. **Design Updates** → Visual Testing Workflow → **Design Approval**

### **Team Collaboration**
- **Frontend Developers**: Execute testing workflow for all changes
- **Designers**: Review and approve visual changes
- **QA Team**: Validate comprehensive test coverage
- **Product Team**: Approve user experience changes

This workflow ensures that all frontend changes maintain the highest standards of quality, accessibility, and user experience while providing comprehensive documentation for future maintenance and debugging.