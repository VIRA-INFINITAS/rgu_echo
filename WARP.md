# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RGU Echo is a static mental health support website for Robert Gordon University students. It's a complete redesign of the existing Wix site (https://rguecho.wixsite.com/echo) using modern web technologies. The site is focused on providing mental health resources, peer support information, and crisis contact details.

**Key Purpose**: Provide accessible mental health support information for students with a focus on confidentiality, inclusivity, and crisis intervention.

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (no build process required)
- **CSS Framework**: Bootstrap 5.3.2 (via CDN)
- **Icons**: Bootstrap Icons 1.11.1 (via CDN)
- **Dependencies**: All loaded via CDN - no package manager or build tools

## Development Commands

### Running Locally

Since this is a static site with no build process, use any local server:

**Python:**
```powershell
python -m http.server 5500
```

**Node.js:**
```powershell
npx serve -l 5500
```

**Live Server (VS Code):**
Right-click `index.html` and select "Open with Live Server"

### Testing

No automated test suite exists. Manual testing in browser required.

**Test checklist:**
- Form validation on `contact.html`
- Navigation links across all pages
- Responsive design on mobile/tablet/desktop viewports
- Accessibility features (keyboard navigation, screen readers)

## Architecture

### Site Structure

Five-page static website with shared navigation and footer:

1. **index.html** - Hero section, quick help resources, service overview
2. **about.html** - Mission, values, what we do
3. **services.html** - Detailed service descriptions, how to access support
4. **contact.html** - Contact form, FAQs, emergency contacts
5. **resources.html** - Mental health apps, professional services, self-help guides

### Component Architecture

**Shared Components** (repeated across all pages):
- Navigation bar with active state indicators
- Footer with quick links and emergency contacts
- Page headers with gradient backgrounds

**Key Design Patterns:**
- **Color scheme**: Purple gradient (`#667eea` to `#764ba2`) as primary brand
- **Card-based layout**: Services and resources presented in Bootstrap cards with hover effects
- **Icon circles**: 60px circular backgrounds for feature icons
- **Responsive**: Mobile-first with Bootstrap grid system

### JavaScript Architecture (js/main.js)

The JavaScript is organized into initialization functions called on DOM load:

1. **initSmoothScroll()** - Smooth scrolling for anchor links
2. **initFormValidation()** - Bootstrap form validation for contact form
3. **initAnimations()** - Intersection Observer for fade-in effects
4. **initAccessibility()** - Skip links, keyboard navigation, ARIA labels
5. **checkForEmergencyKeywords()** - Shows crisis banner if URL contains emergency keywords

**Form Handling:**
- Contact form uses client-side validation only (no backend)
- Form submission is simulated with `console.log()` and success notification
- **Important**: Form data is NOT sent anywhere - this needs backend integration for production

### CSS Architecture (css/styles.css)

Custom styles organized by component:

- **CSS Variables**: `--primary-gradient`, `--transition-speed`
- **Animations**: `fadeInUp`, `pulse` for loading states
- **Utility Classes**: `.hover-lift`, `.text-gradient`, `.shadow-soft`
- **Accessibility**: Focus states, high contrast mode, reduced motion support
- **Responsive**: Media queries for mobile optimization and print styles

### Key Features

**Accessibility First:**
- Skip to content links
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support for users with vestibular disorders
- High contrast mode support

**Crisis Intervention:**
- Emergency contact information on every page (footer)
- Dedicated alert on contact form warning against using it for crises
- URL parameter detection for emergency keywords triggers crisis banner
- Quick access to Samaritans, Shout, and emergency services

## File Conventions

### Images
- Placeholder images from Unsplash via CDN
- Format: `https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop`
- When adding real images, save to `/images/` directory

### Styling
- Custom styles in `css/styles.css` only
- Bootstrap utilities used inline in HTML
- Gradient backgrounds defined inline on specific sections (hero, page headers)

### Naming Conventions
- **IDs**: camelCase (e.g., `contactForm`, `navbarNav`)
- **Classes**: kebab-case matching Bootstrap conventions (e.g., `page-header`, `icon-circle`)
- **Files**: kebab-case for HTML pages (e.g., `contact.html`)

## Important Implementation Details

### Form Handling
The contact form in `contact.html` includes:
- Bootstrap validation classes (`.needs-validation`, `.was-validated`)
- Required fields: name, email, subject, message
- Optional field: student ID
- **Currently**: Form logs to console and shows success message
- **TODO**: Needs backend API integration for actual form submission

### Navigation Active States
Active page is indicated by `.active` class on nav links. When creating new pages or editing navigation, manually update the active state on each page's nav element.

### Emergency Contacts
Emergency contact information appears in three places:
1. Footer (all pages)
2. Home page "Need Help Right Now?" section
3. Contact page crisis alert

**Keep these synchronized** when updating contact information.

### Color Theming
Primary gradient used throughout: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

Color variants:
- Primary: `#667eea` / `#764ba2` (purple gradient)
- Success: Bootstrap green
- Info: Bootstrap blue  
- Warning: Bootstrap yellow
- Danger: Bootstrap red

## Content Guidelines

### Sensitive Content Handling
This site deals with mental health and crisis situations:

1. **Always include crisis resources** when adding new pages
2. **Maintain confidentiality language** in all support-related content
3. **Use person-first language** ("students experiencing anxiety" not "anxious students")
4. **Include trigger warnings** if adding content about self-harm or suicide
5. **Link to professional services** - never position peer support as replacement for professional help

### Accessibility Requirements
When editing or adding content:
- Maintain heading hierarchy (h1 → h2 → h3, no skipping)
- Provide alt text for all images
- Ensure sufficient color contrast (WCAG AA minimum)
- Test keyboard navigation for new interactive elements
- Add ARIA labels to icon-only buttons

## Known Limitations

1. **No backend**: Form submissions not processed, would need backend integration
2. **No CMS**: All content is hardcoded in HTML files
3. **No analytics**: Console logging only, would need Google Analytics or alternative
4. **No build process**: No minification, bundling, or optimization
5. **CDN dependency**: Site requires internet connection for Bootstrap and icons

## Future Enhancement Considerations

When extending this codebase:
- Consider adding a backend API for form processing (Node.js, PHP, or Python)
- Implement proper analytics tracking
- Add a build process for production optimization (minification, image optimization)
- Consider a static site generator (e.g., 11ty, Hugo) if content becomes more dynamic
- Add automated accessibility testing (pa11y, axe-core)
