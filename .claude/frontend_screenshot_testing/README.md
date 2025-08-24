# Frontend Visual Testing Guide

This directory contains all visual testing artifacts, screenshots, and test reports for the ecommerce platform frontend.

## Directory Structure

```
frontend_screenshot_testing/
├── components/          # Component-level visual tests
│   ├── buttons/        # Button component screenshots
│   ├── forms/          # Form component screenshots
│   └── navigation/     # Navigation component screenshots
├── pages/              # Page-level visual tests
│   ├── home/           # Homepage screenshots
│   ├── product-list/   # Product listing page screenshots
│   └── checkout/       # Checkout flow screenshots
├── test-reports/       # Generated test reports
│   ├── accessibility-report.json
│   ├── lighthouse-report.html
│   └── visual-diff-report.html
├── baselines/          # Baseline screenshots for comparison
└── README.md           # This file
```

## Visual Testing Workflow

### 1. Pre-Development Setup
Before making visual changes, ensure:
- Frontend application is running (`npm start` in frontend directory)
- Playwright MCP is installed and configured
- Baseline screenshots exist for comparison

### 2. Testing Process
For any visual changes, follow this workflow:

```bash
# 1. Start frontend application
cd frontend && npm start

# 2. Use Claude with Playwright MCP to:
#    - Navigate to affected pages/components
#    - Take screenshots across viewports
#    - Run accessibility audits
#    - Check for console errors
#    - Validate functionality
```

### 3. Screenshot Naming Convention
`{component-name}_{viewport}_{timestamp}.png`

Examples:
- `primary-button_desktop_20240823_143022.png`
- `product-card_mobile_20240823_143045.png`
- `checkout-form_tablet_20240823_143108.png`

### 4. Viewport Testing
Test across these standard viewports:
- **Mobile**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1920x1080 (Full HD)
- **Large Desktop**: 2560x1440 (QHD)

### 5. Required Checks
- [ ] Visual consistency across viewports
- [ ] No layout shifts or broken UI elements
- [ ] Interactive elements function properly
- [ ] No JavaScript console errors
- [ ] Accessibility standards maintained
- [ ] Loading states and error states work
- [ ] API integration functioning correctly

## Quality Gates

### Before Merging Changes:
1. **Visual Tests Pass**: All screenshots match expected designs
2. **Accessibility Score**: Maintain 95+ accessibility score
3. **Performance**: Core Web Vitals within acceptable ranges
4. **Cross-Browser**: Tested on Chrome, Firefox, Safari
5. **Error-Free**: No console errors or network failures

### Acceptance Criteria Validation:
- Business logic implemented correctly
- User experience flows work as designed
- Component props and state management correct
- Integration with backend APIs successful

## Tools & Integration

### Playwright MCP Commands
```
Use playwright mcp to:
- Navigate to http://localhost:3000/page-path
- Take screenshot and save to /.claude/frontend_screenshot_testing/
- Run accessibility audit
- Check browser console for errors
- Test form submissions and interactions
```

### Visual Regression Testing
- Compare new screenshots against baselines
- Identify pixel differences and layout changes
- Generate visual diff reports

### Performance Testing
- Lighthouse audits for each major page
- Core Web Vitals monitoring
- Bundle size analysis

## Best Practices

### Screenshot Guidelines:
1. **Consistent Environment**: Always use same browser and settings
2. **Stable State**: Wait for loading states to complete
3. **Full Context**: Capture enough context to understand the component
4. **Multiple States**: Screenshot different component states (hover, active, disabled)

### Documentation:
- Link screenshots to specific issues or PRs
- Include test results in PR descriptions
- Maintain test reports for historical comparison
- Document any visual changes and rationale

### Error Handling:
- Screenshot error states and 404 pages
- Test form validation messages
- Verify loading spinners and skeleton states

This testing workflow ensures visual consistency, functionality, and user experience quality across the ecommerce platform.