# BISCYNE AGENCY WEBSITE

A modern, mobile-first website for Biscyne Agency - a Kenyan recruitment agency that connects workers to verified employers in Dubai, Kuwait, and Saudi Arabia.

## 🌐 Features

- **Mobile-First Design**: Optimized for smartphone users with limited data
- **Sticky CTA Buttons**: Quick access to Call, WhatsApp, and Apply
- **Expandable Country Cards**: Job listings and requirements by destination
- **Accordion Job Descriptions**: Easy-to-browse job details
- **Simple Application Form**: Minimal typing required
- **SEO Optimized**: Ready for search engines
- **Fast Loading**: Lightweight CSS and JavaScript
- **Accessible**: WCAG compliant, keyboard navigable

## 📱 Mobile Optimization

- Thumb-friendly 48px+ touch targets
- Sticky bottom navigation bar
- Click-to-call and WhatsApp integration
- Lazy loading ready
- Reduced motion support

## 🎨 Design

- **Colors**: Deep blue (#1e3a5f), Gold (#d4a853), White
- **Typography**: Inter font family
- **Style**: Clean, professional, trustworthy
- **Animations**: Subtle fade-in and slide-up effects

## 📁 File Structure

```
├── index.html      # Main HTML file
├── styles.css      # Mobile-first CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. For development, use a local server (e.g., Live Server extension)
3. Test on mobile devices or browser dev tools

## 📞 Contact Integration

- **Phone**: +254 758 620 749 (click-to-call enabled)
- **WhatsApp**: Direct chat link with pre-filled message
- **Form submissions**: Stored in localStorage (integrate with backend)

## 🔧 Customization

### Update Contact Information
Edit the phone number in `index.html`:
- Search for `+254 758 620 749` and replace with new number
- Update WhatsApp links: `https://wa.me/254758620749`

### Add New Jobs or Countries
1. Copy an existing `.country-card` or `.accordion-item`
2. Update content and salary information
3. Add corresponding form options if needed

### Integrate Form Backend
Replace the localStorage logic in `script.js` with your API:
```javascript
// In initFormHandler function
fetch('your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

## 🌍 SEO Keywords

- Jobs in Dubai from Kenya
- Housemaid jobs Saudi Arabia Kenya
- Gulf jobs recruitment agency Kenya
- Kuwait jobs Kenya
- Middle East jobs from Kenya

## ⚡ Performance Tips

1. Compress images before adding
2. Use WebP format where possible
3. Enable GZIP compression on server
4. Consider adding a Service Worker for offline access

## 📄 License

© 2025 Biscyne Agency. All rights reserved.
