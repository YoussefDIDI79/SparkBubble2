# SparkBubble - Digital Solutions Agency

## Overview

SparkBubble is a digital solutions agency website specializing in AI, machine learning, and full-stack development services. The project is a clean, minimal marketing website built with vanilla HTML, CSS, and JavaScript, featuring Apple-inspired design, responsive layout, and professional presentation. The site emphasizes simplicity and elegance in showcasing the agency's expertise in AI/ML integration, full-stack development, and digital transformation services.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Latest modifications with dates

**August 25, 2025:**
- Removed moon emoji (🌙) from hero title for cleaner Apple-style design
- Disabled all card hover animations and parallax effects for minimal aesthetic
- Redesigned team section to display 4 members in 2x2 grid layout
- Improved team card styling with subtle borders and larger avatars
- Removed complex mouse-following animations for cleaner interactions
- Updated color scheme for team avatars to match minimal design philosophy
- Added responsive grid that stacks to single column on mobile devices

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: Built entirely with vanilla HTML5, CSS3, and JavaScript for maximum compatibility and performance
- **Component-Based Structure**: Modular CSS and JavaScript organization with separate files for animations, main functionality, and styling
- **Responsive Design**: Mobile-first approach with fluid layouts and adaptive components
- **Animation System**: Custom animation controller using Intersection Observer API for performant scroll-triggered animations
- **Progressive Enhancement**: Core functionality works without JavaScript, with enhanced interactions layered on top

### CSS Architecture
- **CSS Custom Properties**: Comprehensive design system using CSS variables for colors, typography, spacing, and component styling
- **Modular Stylesheets**: Separated concerns with `main.css` for core styles and `animations.css` for motion design
- **Modern Layout**: Flexbox and CSS Grid for responsive layouts
- **Design Tokens**: Consistent spacing scale, color palette, and typography system

### JavaScript Architecture
- **Event-Driven**: DOM-ready initialization pattern with modular function organization
- **Animation Controller**: Advanced intersection observer-based animation system with performance optimization
- **Smooth Scrolling**: Native smooth scrolling with enhanced navigation behavior
- **Mobile Navigation**: Responsive hamburger menu with accessibility considerations

### Performance Optimizations
- **Loading Screen**: Custom loading animation to improve perceived performance
- **Lazy Animations**: Intersection Observer for triggering animations only when elements are visible
- **Debounced Scroll**: Optimized scroll event handling to prevent performance issues
- **Font Loading**: Preconnected Google Fonts with display swap for better loading experience

## External Dependencies

### Fonts
- **Google Fonts**: Inter font family with multiple weights (300-700) for consistent typography
- **Preconnect Optimization**: DNS prefetching for faster font loading

### Browser APIs
- **Intersection Observer API**: For scroll-triggered animations and visibility detection
- **Web Animation API**: Enhanced animation capabilities beyond CSS transitions
- **Scroll Behavior API**: Native smooth scrolling implementation

### Development Tools
- **Modern Browser Features**: CSS Custom Properties, Flexbox, Grid Layout
- **ES6+ JavaScript**: Modern JavaScript features for cleaner code organization
- **Responsive Design**: CSS Media Queries for multi-device compatibility

### Third-Party Integrations
- **Google Fonts CDN**: External font delivery
- **Form Handling**: Client-side contact form validation and interaction
- **Analytics Ready**: Structure prepared for analytics integration