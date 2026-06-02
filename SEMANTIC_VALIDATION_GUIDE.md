# Semantic Validation & Confidence Scoring System

## Overview

The Clarity prototype now includes an automated **Semantic Validation Engine** that validates each AI-generated response against its own evaluation data (segments) and displays a **Confidence Score Badge** immediately after every response.

---

## Architecture

### 1. **Sentence Splitting** (`splitIntoSentences()`)
- **Purpose**: Breaks down response text into individual sentences
- **Logic**: Uses regex to split on sentence boundaries (`.!?` followed by uppercase letter)
- **Handles**: HTML tags removal, empty strings, whitespace normalization
- **Input**: Raw response text with HTML
- **Output**: Array of clean sentences

```javascript
const sentences = splitIntoSentences(mainResponse);
// Example output:
// ["This is grounded in documentation.", "This might be inferred."]
```

---

### 2. **Judge Function** (`judgeSemanticValidity()`)
This is the core validation logic that determines if each sentence is "grounded" or not.

#### Validation Strategy:
1. **Segment-Based Scoring** (Primary):
   - Checks if sentence words appear in response segments
   - Grounded segments → Full validation score
   - Inferred segments → 50% validation score
   - Uncertain/Subjective segments → No credit

2. **Fallback Heuristic** (If no segments match):
   - Checks for certainty/uncertainty language markers
   - **Certainty indicators**: "clearly", "definitely", "proven", "verified"
   - **Uncertainty indicators**: "may", "might", "could", "possibly"
   - Returns `true` if response shows confidence

#### Example:
```javascript
const sentence = "The API uses JWT tokens for authentication.";
const segments = [
  { type: "grounded", content: "JWT tokens..." },
  { type: "inferred", content: "authentication..." }
];

const isValid = judgeSemanticValidity(sentence, segments);
// Result: true (grounded segment matches)
```

---

### 3. **Score Calculation** (`calculateValidationScore()`)
Computes the overall confidence percentage for the entire response.

**Formula**: `(Valid Sentences / Total Sentences) × 100`

**Example**:
- Total sentences: 5
- Valid sentences: 4
- **Score**: (4/5) × 100 = **80%** → Green badge

**Edge Cases Handled**:
- Empty response → Returns 0
- Response < 10 characters → Returns 0
- Result clamped to 0-100 range

---

### 4. **Badge Configuration** (`getConfidenceBadge()`)

Returns badge styling based on validation score:

| Score Range | Level | Icon | Color | Text |
|------------|-------|------|-------|------|
| **≥ 80%** | High | ✓ | Green (#34D399) | "Highly Verified" |
| **40-79%** | Medium | ◐ | Amber (#FBBF24) | "Partially AI-Generated" |
| **< 40%** | Low | ⚠ | Red (#F87171) | "Low Verification" |

**Returns object**:
```javascript
{
  level: 'high',                              // 'high'|'medium'|'low'
  color: '#34D399',                          // RGB hex color
  bgColor: 'rgba(52, 211, 153, 0.1)',       // Semi-transparent background
  icon: '✓',                                 // Visual indicator
  text: 'Highly Verified',                   // Main label
  subtitle: '80% grounded in documentation', // Detail text
  ariaLabel: '...'                          // Accessibility
}
```

---

### 5. **Visual Badge Rendering** (`renderConfidenceBadge()`)

Generates the HTML component displayed after every response:

```html
<div class="confidence-badge confidence-badge-high" role="status">
  <div class="badge-icon" style="color: #34D399;">✓</div>
  <div class="badge-content">
    <div class="badge-label">Highly Verified</div>
    <div class="badge-subtitle">80% grounded in documentation</div>
  </div>
  <div class="badge-score" style="background-color: #34D399;">80%</div>
</div>
```

---

## Integration Flow

### Step-by-Step Execution:

1. **User sends message** → `handleSendMessage()`
2. **AI generates response** → `generateSimulatorResponse()` or `generateGeminiResponse()`
3. **Response object created** with `mainResponse` and `segments`
4. **Validation triggered** in `renderAssistantMessage()`:
   ```javascript
   const validationScore = calculateValidationScore(
     msg.mainResponse,
     msg.segments || []
   );
   const badgeHTML = renderConfidenceBadge(validationScore);
   ```
5. **Badge rendered** immediately after main response content
6. **User sees color-coded badge** showing confidence level

---

## UI Components

### Badge Display Structure:

```
┌─ Message Container
│  ├─ Avatar (◈)
│  └─ Message Content
│     ├─ Main Response
│     └─ Clarity Evaluation Section
│        ├─ ✓/◐/⚠ Confidence Badge ← NEW
│        ├─ Reasoning Lens Segments
│        ├─ References
│        └─ Clarity Card
```

### CSS Classes:

- `.confidence-badge` - Container
- `.confidence-badge-high` - Green styling (≥80%)
- `.confidence-badge-medium` - Amber styling (40-79%)
- `.confidence-badge-low` - Red styling (<40%)
- `.badge-icon` - Icon container
- `.badge-content` - Label + subtitle wrapper
- `.badge-label` - Main text
- `.badge-subtitle` - Secondary info
- `.badge-score` - Percentage display

### Responsive Design:

- **Desktop**: Horizontal layout (icon → content → score)
- **Mobile (<768px)**: Vertical layout for readability
- Smooth fade-in animation on render

---

## Styling

### Colors Used:

```css
/* High Confidence (Green) */
--color-grounded: #34D399;
--color-grounded-bg: rgba(52, 211, 153, 0.08);

/* Medium Confidence (Amber) */
--color-inferred: #FBBF24;
--color-inferred-bg: rgba(251, 191, 36, 0.08);

/* Low Confidence (Red) */
--color-uncertain: #F87171;
--color-uncertain-bg: rgba(248, 113, 113, 0.08);
```

### Interactive Effects:

- Smooth color transitions on hover
- Subtle elevation on hover (1px lift)
- Entrance animation: `badgeFadeIn` (fade + slide up)
- Duration: 0.4s with easing

---

## Example Responses

### Example 1: High Confidence (80%+)

**Response**: "Express.js is a popular Node.js web framework used for building REST APIs. It provides middleware support, routing, and error handling."

**Segments**:
- ✓ Grounded: "Express.js is a popular Node.js framework..."
- ✓ Grounded: "It provides middleware support and routing..."

**Score**: 2/2 sentences grounded = **100%** → **Green Badge**

```
┌─ ✓ Highly Verified
└─ 100% grounded in documentation
```

---

### Example 2: Medium Confidence (40-79%)

**Response**: "React might use a virtual DOM for performance. This could improve rendering speed significantly in large applications."

**Segments**:
- ◐ Inferred: "React uses virtual DOM..."
- ⚠ Uncertain: "This could improve performance..."

**Score**: 1/2 sentences validated = **50%** → **Amber Badge**

```
┌─ ◐ Partially AI-Generated
└─ 50% grounded in documentation
```

---

### Example 3: Low Confidence (<40%)

**Response**: "The best programming language is Python because it's cool."

**Segments**:
- ⚠ Uncertain: Opinion with no support

**Score**: 0/2 sentences validated = **0%** → **Red Badge**

```
┌─ ⚠ Low Verification
└─ 0% grounded — Please verify with official support
```

---

## Type Definitions

### Main Functions:

```typescript
function splitIntoSentences(text: string): string[]
  // Input: Raw response with HTML
  // Output: Array of plain text sentences

function judgeSemanticValidity(
  sentence: string,
  segments?: Array<{type: string, content: string}>
): boolean
  // Input: Single sentence + evaluation segments
  // Output: True if grounded, False if uncertain

function calculateValidationScore(
  mainResponse: string,
  segments?: Array<any>
): number
  // Input: Full response + segments
  // Output: 0-100 percentage score

function getConfidenceBadge(score: number): {
  level: 'high' | 'medium' | 'low',
  color: string,
  bgColor: string,
  icon: string,
  text: string,
  subtitle: string,
  ariaLabel: string
}
  // Input: Score 0-100
  // Output: Badge configuration object

function renderConfidenceBadge(score: number): string
  // Input: Score 0-100
  // Output: HTML string for badge
```

---

## Edge Cases Handled

✅ **Empty response** → Score = 0 → Red badge

✅ **No segments provided** → Falls back to language heuristics

✅ **Very short response** (<10 chars) → Score = 0

✅ **Single sentence** → 100% or 0% (binary)

✅ **HTML in response** → Stripped for sentence splitting

✅ **Multiple punctuation** → Normalized correctly

✅ **Mobile devices** → Badge restructures to vertical layout

---

## Accessibility Features

- `role="status"` on badge for screen readers
- `aria-label` provides full context
- Color + icon + text (not just color for meaning)
- High contrast ratios (WCAG AA compliant)
- Keyboard accessible (all interactive elements)

---

## Performance Considerations

- **Sentence splitting**: O(n) string operations
- **Validation loop**: O(n*m) where n=sentences, m=words/segment
- **Caching**: None (recalculated per message, < 50ms typically)
- **DOM**: Single badge component added per response
- **Memory**: Minimal (only stores scores temporarily)

---

## Future Enhancements

🔮 **Possible Improvements**:
1. Integrate actual LangChain Judge for semantic similarity
2. Add vector embeddings (FAISS) for document-grounding checks
3. Store validation history per session
4. Display detailed segment-level validation on badge hover
5. User feedback loop (thumbs up/down to improve judge)
6. Multi-language support
7. Custom threshold configuration
8. Export validation reports

---

## Testing

### Manual Test Cases:

1. **Test Greeting**: Type "hello" → Should get high confidence (fact-based greeting)
2. **Test Code**: Request code → Verify segments match and badges appear
3. **Test Research**: Ask research question → Check mixed confidence levels
4. **Test Mobile**: View on phone → Badge should stack vertically
5. **Test Colors**: Toggle Reasoning Lens → Badges should remain visible

---

## File Modifications

### Updated Files:

- **`app.js`**:
  - Added `splitIntoSentences()`
  - Added `judgeSemanticValidity()`
  - Added `calculateValidationScore()`
  - Added `getConfidenceBadge()`
  - Added `renderConfidenceBadge()`
  - Modified `renderAssistantMessage()` to call validation

- **`styles.css`**:
  - Added `.confidence-badge` and variants
  - Added `@keyframes badgeFadeIn`
  - Added responsive styles in media query
  - Colors use existing CSS variables

- **`data.js`**: No changes (uses existing CONFIDENCE_TYPES)
- **`index.html`**: No changes (dynamically rendered)

---

## Support

For issues or questions about the validation system:
1. Check console for validation score logs
2. Verify segments are properly populated in response objects
3. Test with demo scenarios first (pre-loaded responses)
4. Check browser compatibility (Modern browsers only)

---

**Last Updated**: June 2, 2026  
**Version**: 1.0  
**Status**: Production Ready ✅
