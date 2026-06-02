# Confidence Badge Visual Reference

## Badge Examples

### 1. HIGH CONFIDENCE Badge (≥80%)
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ✓  Highly Verified              80%                    │
│     80% grounded in documentation                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
   Green Border (#34D399)
   Green Background (rgba(52, 211, 153, 0.1))
```

**When displayed**: Response contains well-grounded segments  
**Example response**: "Express.js provides middleware support and routing capabilities for building REST APIs."  
**User action**: Can trust and copy with confidence  

---

### 2. MEDIUM CONFIDENCE Badge (40-79%)
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ◐  Partially AI-Generated       62%                    │
│     62% grounded in documentation                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
   Amber Border (#FBBF24)
   Amber Background (rgba(251, 191, 36, 0.1))
```

**When displayed**: Response mixes grounded and inferred content  
**Example response**: "JWT might improve API security. Authentication could benefit from token-based approaches."  
**User action**: Should verify key claims before using  

---

### 3. LOW CONFIDENCE Badge (<40%)
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  ⚠  Low Verification              15%                   │
│     15% grounded — Please verify with official support  │
│                                                          │
└─────────────────────────────────────────────────────────┘
   Red Border (#F87171)
   Red Background (rgba(248, 113, 113, 0.1))
```

**When displayed**: Response contains mainly uncertain/subjective claims  
**Example response**: "Python is definitely the best programming language for everything."  
**User action**: Strongly recommend verification with official documentation  

---

## Badge Anatomy

```
┌─────────────────────────────────────────────────┐
│ [ICON]  [LABEL]               [SCORE BADGE]   │
│         [SUBTITLE]                              │
└─────────────────────────────────────────────────┘

ICON          Content color-coded (✓, ◐, ⚠)
LABEL         Main text: "Highly Verified", "Partially AI-Generated", "Low Verification"
SUBTITLE      Detail text: "X% grounded in documentation" or with warning
SCORE BADGE   Percentage box in right corner (colored background, white text)
```

---

## Placement in Response

### Full Message Structure:
```
┌─ Assistant Message
│  ├─ Avatar (◈)
│  └─ Message Content
│     ├─ Main Response Text
│     │  "Express.js is a popular web framework..."
│     │
│     └─ Clarity Evaluation Section
│        ├─ ✓/◐/⚠ CONFIDENCE BADGE (NEW)
│        │  ├─ Icon + Label + Score
│        │  └─ Subtitle
│        │
│        ├─ Reasoning Lens Segments
│        │  ├─ [✓ Grounded] Well-grounded claim...
│        │  ├─ [◐ Inferred] Inferred from context...
│        │  └─ [⚠ Uncertain] This might not be accurate...
│        │
│        ├─ References
│        │  └─ [🔗 Documentation links...]
│        │
│        └─ Clarity Card
│           └─ [Completeness, Reasoning Quality, etc.]
```

---

## Interactive Behavior

### Hover Effects:
- Subtle lift (transform: translateY(-1px))
- Enhanced shadow (0 4px 16px rgba...)
- Smooth transition (0.3s ease-out)

### Entrance Animation:
- Fade-in + slide-up on render
- Duration: 0.4s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Mobile View (<768px):
```
Horizontal (Desktop):
┌───────────────────────────────────────┐
│ ✓  Highly Verified      80%          │
│    80% grounded...                    │
└───────────────────────────────────────┘

Vertical (Mobile):
┌───────────────────────────────────────┐
│ ✓                                     │
│ Highly Verified                       │
│ 80% grounded in documentation         │
│                              80%      │
└───────────────────────────────────────┘
```

---

## Color Palette

### High Confidence
- **Primary**: #34D399 (Emerald Green)
- **Background**: rgba(52, 211, 153, 0.1)
- **Icon**: ✓ (Checkmark)
- **Text**: "Highly Verified"

### Medium Confidence
- **Primary**: #FBBF24 (Amber/Gold)
- **Background**: rgba(251, 191, 36, 0.1)
- **Icon**: ◐ (Half-circle)
- **Text**: "Partially AI-Generated"

### Low Confidence
- **Primary**: #F87171 (Red)
- **Background**: rgba(248, 113, 113, 0.1)
- **Icon**: ⚠ (Warning)
- **Text**: "Low Verification"

---

## CSS Classes Reference

### Container
- `.confidence-badge` - Base styles (flex, padding, border, animation)
- `.confidence-badge-high` - Green styling (≥80%)
- `.confidence-badge-medium` - Amber styling (40-79%)
- `.confidence-badge-low` - Red styling (<40%)

### Child Elements
- `.badge-icon` - Icon container (1.2rem font-size)
- `.badge-content` - Label + subtitle wrapper (flex: 1)
- `.badge-label` - Main text (0.85rem, font-weight: 600)
- `.badge-subtitle` - Detail text (0.75rem, muted color)
- `.badge-score` - Percentage box (0.9rem, bold, padded)

---

## Accessibility

- **ARIA**: `role="status"` for dynamic updates
- **Labels**: Full `aria-label` context on badge
- **Contrast**: WCAG AA compliant (7:1 ratio)
- **Color + Text**: Not relying on color alone
- **Keyboard**: All interactive elements accessible

---

## Integration with Existing Features

### Works With:
✅ Reasoning Lens (toggle on/off doesn't affect badge)
✅ Clarity Card (badge + card both visible)
✅ Segments (badge validates segment content)
✅ Nudges (badge appears before nudges)
✅ Custom Chat (calculated per response)
✅ Demo Scenarios (pre-calculated for examples)

### Doesn't Interfere With:
✅ Message rendering
✅ Code block language switching
✅ Copy functionality
✅ Mobile responsiveness
✅ Dark mode theme

---

## Example Responses & Scores

### Response 1: Code Request
**User**: "Give me a simple Express.js middleware"  
**Response**: "Express middleware is a function that processes requests. Here's a basic example:"  
**Segments**: 2 grounded, 0 inferred  
**Score**: 100% → **GREEN BADGE**

---

### Response 2: Research Question
**User**: "How does machine learning improve accuracy?"  
**Response**: "ML can improve accuracy through training. Some models might achieve 95% accuracy depending on data quality."  
**Segments**: 1 grounded, 1 inferred, 1 uncertain  
**Score**: 50% → **AMBER BADGE**

---

### Response 3: Opinion Question
**User**: "Is Python the best language?"  
**Response**: "Python is definitely the best because it's popular and everyone likes it."  
**Segments**: 0 grounded, 0 inferred, 1 subjective  
**Score**: 0% → **RED BADGE**

---

## Styling Details

### Border & Background
```css
border: 1.5px solid {color};
background-color: rgba({r}, {g}, {b}, 0.1);
border-radius: var(--radius-lg); /* 8px */
```

### Typography
```css
Font: Inter (inherited from page)
Label: 0.85rem, 600 weight
Subtitle: 0.75rem, muted color
Score: 0.9rem, 700 weight, white on colored background
```

### Spacing
```css
Padding: 12px 16px (desktop), 10px 12px (mobile)
Gap between elements: 12px
Margin: 16px 0 (top/bottom)
```

### Animation
```css
@keyframes badgeFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

Duration: 0.4s
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## FAQ

**Q: Why is my high-confidence response showing amber badge?**  
A: The validation algorithm considers word matching with segments. Even if the response is good, if segments don't explicitly match the wording, it scores lower. This encourages using the Clarity Card for nuance.

**Q: Can the score change?**  
A: No, it's calculated once when the response is rendered and fixed for that message.

**Q: What if there are no segments?**  
A: The judge falls back to language heuristics (certainty vs. uncertainty words). Badge will still appear but may be less accurate.

**Q: Does toggling Reasoning Lens affect the badge?**  
A: No, the badge stays visible. The Lens toggle only affects which segments are displayed.

**Q: Can I customize the thresholds?**  
A: Yes, edit `getConfidenceBadge(score)` function in app.js:
```javascript
// Change these values:
if (score >= 80) → if (score >= YOUR_HIGH_THRESHOLD)
else if (score >= 40) → else if (score >= YOUR_MEDIUM_THRESHOLD)
```

---

## Browser Support

✅ **Chrome/Edge**: Full support (60+)  
✅ **Firefox**: Full support (55+)  
✅ **Safari**: Full support (12+)  
✅ **Mobile Safari**: Full support (12+)  
✅ **Chrome Mobile**: Full support (60+)  

---

**Last Updated**: June 2, 2026  
**Component Status**: ✅ Production Ready
