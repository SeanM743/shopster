# Shopster Brand Context

This document defines the brand identity, visual design system, and user experience guidelines for the Shopster ecommerce platform.

## Brand Identity

### **Company Overview**
- **Brand Name**: Shopster
- **Tagline**: "Shop Smarter, Live Better"
- **Mission**: Provide a seamless, accessible ecommerce experience that connects customers with quality products
- **Values**: Trust, Quality, Convenience, Innovation

### **Brand Personality**
- **Professional**: Clean, reliable, trustworthy
- **Modern**: Contemporary design with cutting-edge technology
- **Approachable**: User-friendly and accessible to all customers
- **Premium**: Quality-focused without being exclusive

## Logo & Brand Mark

### **Logo Design**
- **Style**: Similar to Amazon Prime logo aesthetic
- **Elements**: 
  - Text-based logo with "Shopster" in custom typography
  - Arrow or delivery-inspired element (suggesting speed and reliability)
  - Clean, minimal design suitable for digital and print
- **Variations**:
  - Primary logo (full color)
  - Monochrome version (black/white)
  - Icon-only mark (for favicons, app icons)
  - Horizontal and stacked layouts

### **Logo Usage Guidelines**
- **Minimum Size**: 24px height for digital, 0.5 inch for print
- **Clear Space**: Minimum padding equal to the height of the "S" in Shopster
- **Backgrounds**: Ensure sufficient contrast on all background colors
- **Prohibited Uses**: No stretching, rotating, or altering colors

## Color Palette

### **Primary Color Scheme - Neutral Focus**

#### **Primary Colors**
```css
/* Primary Brand Colors */
:root {
  --color-primary-50: #f8fafc;   /* Lightest - backgrounds */
  --color-primary-100: #f1f5f9;  /* Light backgrounds */
  --color-primary-200: #e2e8f0;  /* Borders, dividers */
  --color-primary-300: #cbd5e1;  /* Disabled states */
  --color-primary-400: #94a3b8;  /* Placeholders */
  --color-primary-500: #64748b;  /* Primary brand color */
  --color-primary-600: #475569;  /* Hover states */
  --color-primary-700: #334155;  /* Active states */
  --color-primary-800: #1e293b;  /* Dark text */
  --color-primary-900: #0f172a;  /* Darkest - headings */
}
```

#### **Accent Colors**
```css
/* Accent Colors for CTAs and Highlights */
:root {
  --color-accent-50: #eff6ff;    /* Light blue backgrounds */
  --color-accent-100: #dbeafe;   /* Light backgrounds */
  --color-accent-200: #bfdbfe;   /* Borders */
  --color-accent-300: #93c5fd;   /* Disabled accent */
  --color-accent-400: #60a5fa;   /* Light accent */
  --color-accent-500: #3b82f6;   /* Primary accent (blue) */
  --color-accent-600: #2563eb;   /* Hover accent */
  --color-accent-700: #1d4ed8;   /* Active accent */
  --color-accent-800: #1e40af;   /* Dark accent */
  --color-accent-900: #1e3a8a;   /* Darkest accent */
}
```

#### **Semantic Colors**
```css
/* Status and Feedback Colors */
:root {
  /* Success - Green */
  --color-success-50: #f0fdf4;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  --color-success-700: #15803d;

  /* Warning - Amber */
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;

  /* Error - Red */
  --color-error-50: #fef2f2;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;

  /* Info - Cyan */
  --color-info-50: #ecfeff;
  --color-info-500: #06b6d4;
  --color-info-600: #0891b2;
  --color-info-700: #0e7490;
}
```

### **Color Usage Guidelines**

#### **Primary Applications**
- **Headers & Navigation**: `--color-primary-800` for text, `--color-primary-50` for backgrounds
- **Body Text**: `--color-primary-700` for primary text, `--color-primary-500` for secondary text
- **Borders & Dividers**: `--color-primary-200` for subtle divisions
- **Backgrounds**: `--color-primary-50` for sections, white for content areas

#### **Accent Applications**
- **Call-to-Action Buttons**: `--color-accent-500` background, white text
- **Links**: `--color-accent-600` with `--color-accent-700` hover
- **Form Focus States**: `--color-accent-500` borders
- **Progress Indicators**: `--color-accent-500` active states

#### **Semantic Applications**
- **Success Messages**: Add to cart confirmations, successful purchases
- **Warning Messages**: Low stock alerts, shipping delays
- **Error Messages**: Form validation errors, payment failures
- **Info Messages**: Shipping information, product updates

## Typography System

### **Font Families**
```css
:root {
  /* Primary font for UI and body text */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  /* For headings and brand elements */
  --font-family-heading: 'Inter', system-ui, sans-serif;
  
  /* For code and technical content */
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
}
```

### **Type Scale**
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px - Small labels, captions */
  --text-sm: 0.875rem;   /* 14px - Secondary text, form labels */
  --text-base: 1rem;     /* 16px - Body text, paragraphs */
  --text-lg: 1.125rem;   /* 18px - Larger body text */
  --text-xl: 1.25rem;    /* 20px - Small headings */
  --text-2xl: 1.5rem;    /* 24px - Section headings */
  --text-3xl: 1.875rem;  /* 30px - Page headings */
  --text-4xl: 2.25rem;   /* 36px - Hero headings */
  --text-5xl: 3rem;      /* 48px - Large hero text */

  /* Line Heights */
  --leading-tight: 1.25;  /* Headings */
  --leading-normal: 1.5;  /* Body text */
  --leading-relaxed: 1.625; /* Large text blocks */

  /* Font Weights */
  --font-normal: 400;     /* Body text */
  --font-medium: 500;     /* Emphasized text */
  --font-semibold: 600;   /* Subheadings */
  --font-bold: 700;       /* Headings */
  --font-extrabold: 800;  /* Hero text */
}
```

### **Typography Usage**
- **Hero Headlines**: `--text-4xl` or `--text-5xl`, `--font-extrabold`
- **Page Titles**: `--text-3xl`, `--font-bold`
- **Section Headings**: `--text-2xl`, `--font-semibold`
- **Product Names**: `--text-xl`, `--font-medium`
- **Body Text**: `--text-base`, `--font-normal`
- **Small Text**: `--text-sm`, `--font-normal`
- **Captions**: `--text-xs`, `--font-normal`

## Component Design System

### **Button Styles**
```css
/* Primary Button */
.btn-primary {
  background-color: var(--color-accent-500);
  color: white;
  border: 1px solid var(--color-accent-500);
  padding: 0.75rem 1.5rem;
  font-weight: var(--font-medium);
  border-radius: 0.5rem;
}

.btn-primary:hover {
  background-color: var(--color-accent-600);
  border-color: var(--color-accent-600);
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-700);
  border: 1px solid var(--color-primary-300);
  padding: 0.75rem 1.5rem;
  font-weight: var(--font-medium);
  border-radius: 0.5rem;
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-400);
}
```

### **Card Components**
```css
.card {
  background-color: white;
  border: 1px solid var(--color-primary-200);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border-color: var(--color-primary-300);
}
```

### **Form Elements**
```css
.form-input {
  background-color: white;
  border: 1px solid var(--color-primary-300);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: var(--text-base);
  color: var(--color-primary-800);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}
```

## Spacing & Layout

### **Spacing Scale**
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### **Grid System**
- **Container**: Max-width 1200px with responsive padding
- **Columns**: 12-column grid system
- **Gutters**: 24px between columns (--space-6)
- **Breakpoints**: 
  - Mobile: 640px
  - Tablet: 768px  
  - Desktop: 1024px
  - Large: 1280px

## User Experience Guidelines

### **Interaction Patterns**
- **Hover States**: Subtle elevation and color changes
- **Active States**: Slightly darker colors, inset shadows
- **Focus States**: Blue outline for accessibility
- **Loading States**: Skeleton screens and progress indicators
- **Empty States**: Helpful messaging with suggested actions

### **Animation Principles**
- **Duration**: 150-300ms for UI transitions
- **Easing**: `ease-out` for entrances, `ease-in` for exits
- **Reduced Motion**: Respect user preferences for reduced motion
- **Purpose**: Animations should guide attention and provide feedback

### **Accessibility Standards**
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible for keyboard navigation
- **Touch Targets**: Minimum 44px for interactive elements
- **Screen Readers**: Proper ARIA labels and semantic HTML

## Brand Voice & Messaging

### **Tone of Voice**
- **Friendly**: Approachable and warm, not overly casual
- **Helpful**: Informative and supportive
- **Clear**: Direct communication without jargon
- **Confident**: Knowledgeable and trustworthy

### **Content Guidelines**
- **Product Descriptions**: Focus on benefits and use cases
- **Error Messages**: Helpful and actionable, not blaming
- **Success Messages**: Celebratory but not overwhelming
- **Loading Text**: Reassuring and informative

### **Messaging Examples**
- **Welcome**: "Welcome to Shopster! Find what you love."
- **Loading**: "Finding the perfect products for you..."
- **Error**: "Something went wrong. Let's try that again."
- **Success**: "Added to cart! Ready to checkout?"
- **Empty Cart**: "Your cart is empty. Discover something amazing!"

This brand context ensures consistent visual identity and user experience across all touchpoints of the Shopster ecommerce platform. The neutral color scheme provides a clean, professional foundation that can accommodate various product categories while maintaining brand cohesion.