# Testing the AI-Powered Hallucination Detection System

## Quick Start

### 1. Browser Console Testing

Open your browser's Developer Tools (F12) and run:

```javascript
// Check if judge report exists in latest message
const lastMsg = state.conversation[state.conversation.length - 1];
console.log('Judge Report:', lastMsg.hallucination_judge_report);
```

**Expected Output** (if model provides judge report):
```json
{
  "confidence_score": 85,
  "hallucination_risk": "LOW",
  "grounded_claims": 3,
  "inferred_claims": 1,
  "unverified_claims": 0,
  "key_hallucinations": "None detected",
  "reasoning": "..."
}
```

---

## Test Cases

### Test 1: API-Based High Confidence Response

**Setup**: Have Gemini API key configured

**Steps**:
1. Open prototype in browser
2. Send: `"What is a REST API? Provide a technical definition with code examples."`
3. Look for green badge after response

**Expected Results**:
- Badge appears: 🟢 **Highly Verified** (≥80%)
- Message: "X% grounded in documentation"
- Judge report visible in console with `confidence_score: 90+`

**Why**: Technical definitions with code examples are well-documented content

---

### Test 2: API-Based Mixed Confidence Response

**Setup**: Have Gemini API key configured

**Steps**:
1. Send: `"Compare Python and JavaScript for machine learning. When would you choose each?"`
2. Look for badge color
3. Check console for judge details

**Expected Results**:
- Badge appears: 🟡 **Partially AI-Generated** (40-79%)
- Judge report shows:
  - `grounded_claims: 2-3`
  - `inferred_claims: 2-3`
  - `unverified_claims: 0-1`
  - `hallucination_risk: MEDIUM`

**Why**: Comparison requires inference beyond documentation

---

### Test 3: API-Based Low Confidence Response

**Setup**: Have Gemini API key configured

**Steps**:
1. Send: `"What's your personal opinion on the best programming language?"`
2. Watch for badge
3. Check console

**Expected Results**:
- Badge appears: 🔴 **Low Verification** (<40%)
- Judge report shows:
  - `grounded_claims: 0-1`
  - `inferred_claims: 0-1`
  - `unverified_claims: 2+`
  - `hallucination_risk: HIGH`
  - `key_hallucinations: "None detected"` (but high unverified count)

**Why**: Opinion questions have limited factual grounding

---

### Test 4: Simulator Fallback

**Setup**: No Gemini API key (simulator mode)

**Steps**:
1. Disable API key or use simulator mode
2. Send any prompt
3. Observe badge appearance
4. Check console: `console.log('Judge Report:', lastMsg.hallucination_judge_report);`

**Expected Results**:
- Badge still appears ✅
- Judge report is `undefined` (not provided by simulator)
- System uses fallback `calculateValidationScore()`
- Badge may show different color than model would

**Why**: Fallback ensures functionality even without API/model

---

### Test 5: Mobile Responsiveness

**Setup**: Open in mobile or use DevTools mobile mode

**Steps**:
1. Send a prompt and get response
2. Resize browser to <768px width
3. Observe badge rendering

**Expected Results**:
- Badge stacks vertically on mobile ✅
- Icon on left
- Label + subtitle in middle
- Score badge in bottom-right corner
- No layout overflow ✅
- Text remains readable ✅

**Why**: Badges must work on all devices

---

### Test 6: Interaction Tests

**Setup**: Any mode with working response

**Steps A - Hover Effect**:
1. Load response
2. Hover over badge
3. Observe effect

**Expected**: Subtle lift + enhanced shadow

**Steps B - Lens Toggle**:
1. Load response with badge
2. Toggle Reasoning Lens on/off
3. Badge should remain visible

**Expected**: Badge doesn't disappear, only segments toggle

**Steps C - Message Copy**:
1. Select badge + main response
2. Copy to clipboard
3. Paste elsewhere

**Expected**: Text copies correctly, formatting preserved

---

## Console Monitoring

### Monitor Judge Report Extraction

Add this to your browser console:

```javascript
// Function to check latest message
function checkJudge() {
  const lastMsg = state.conversation[state.conversation.length - 1];
  const score = extractJudgeConfidenceScore(lastMsg);
  const details = getJudgeReportDetails(lastMsg);
  
  console.log('=== JUDGE REPORT ===');
  console.log('Score:', score, score === null ? '(using fallback)' : '(from model)');
  console.log('Details:', details);
  console.log('Full Report:', lastMsg.hallucination_judge_report);
  console.log('==================');
}

// Run after each response
checkJudge();
```

**Output Example**:
```
=== JUDGE REPORT ===
Score: 85 (from model)
Details: {
  confidence: 85,
  risk: 'LOW',
  grounded: 3,
  inferred: 1,
  unverified: 0,
  hallucinations: 'None detected',
  reasoning: '...'
}
Full Report: {...}
==================
```

---

## Visual Inspection Checklist

### High Confidence Badge (Green)

```
┌────────────────────────────────────────┐
│ ✓  Highly Verified        85%          │
│    85% grounded in documentation        │
└────────────────────────────────────────┘
```

- [ ] Icon is ✓ (checkmark)
- [ ] Color is green (#34D399)
- [ ] Text says "Highly Verified"
- [ ] Score is ≥80%
- [ ] Subtitle shows "grounded in documentation"

### Medium Confidence Badge (Amber)

```
┌────────────────────────────────────────┐
│ ◐  Partially AI-Generated  62%          │
│    62% grounded in documentation        │
└────────────────────────────────────────┘
```

- [ ] Icon is ◐ (half-circle)
- [ ] Color is amber (#FBBF24)
- [ ] Text says "Partially AI-Generated"
- [ ] Score is 40-79%
- [ ] Subtitle shows "grounded in documentation"

### Low Confidence Badge (Red)

```
┌────────────────────────────────────────┐
│ ⚠  Low Verification      22%            │
│    22% grounded — Please verify with    │
│    official support                     │
└────────────────────────────────────────┘
```

- [ ] Icon is ⚠ (warning)
- [ ] Color is red (#F87171)
- [ ] Text says "Low Verification"
- [ ] Score is <40%
- [ ] Subtitle includes verification warning

---

## Bug Testing

### Bug Test 1: Judge Report Parsing Failure

**Setup**: Intentionally break judge report

```javascript
// Manually break it
state.conversation[0].hallucination_judge_report.confidence_score = "not-a-number";

// Re-render
renderAssistantMessage(state.conversation[0]);
```

**Expected Behavior**:
- No JavaScript errors in console ✅
- Badge still displays (using fallback) ✅
- Score reflects fallback calculation ✅

**Test Passes If**: No errors, badge displays with fallback score

---

### Bug Test 2: Missing Judge Report Entirely

**Setup**: Simulate simulator response (no judge report)

```javascript
// Create response without judge report
const msg = {
  mainResponse: "<p>Test response</p>",
  segments: [{
    id: "s1",
    type: "grounded",
    content: "<p>Test segment</p>"
  }]
};

renderAssistantMessage(msg);
```

**Expected Behavior**:
- No errors ✅
- Badge displays with fallback score ✅
- extractJudgeConfidenceScore() returns null ✅

**Test Passes If**: Fallback activates cleanly

---

### Bug Test 3: Out-of-Range Confidence Score

**Setup**: Model returns impossible score

```javascript
// Test 1: Score too high
state.conversation[0].hallucination_judge_report.confidence_score = 150;

// Test 2: Score negative
state.conversation[0].hallucination_judge_report.confidence_score = -50;

// Re-render each
renderAssistantMessage(state.conversation[0]);
```

**Expected Behavior**:
- Score 150 clamped to 100 ✅
- Score -50 clamped to 0 ✅
- Badge displays correctly with clamped value ✅

**Test Passes If**: Clamping works correctly

---

## Performance Testing

### Load Time Measurement

```javascript
// Measure judge report extraction time
const msg = state.conversation[0];
const start = performance.now();

const score = extractJudgeConfidenceScore(msg);
const details = getJudgeReportDetails(msg);

const end = performance.now();
console.log('Judge extraction time:', (end - start).toFixed(2), 'ms');
```

**Expected**: <1ms (essentially instant)

---

## Comparison: Model vs Fallback

Create a test comparing scores:

```javascript
// Get the same message
const msg = state.conversation[0];

// Get model's score
const modelScore = extractJudgeConfidenceScore(msg);

// Get fallback score
const fallbackScore = calculateValidationScore(msg.mainResponse, msg.segments || []);

console.log('Model Score:', modelScore);
console.log('Fallback Score:', fallbackScore);
console.log('Difference:', Math.abs(modelScore - fallbackScore));

// Judge report details
const details = getJudgeReportDetails(msg);
console.log('Judge Details:', details);
```

**Expected Pattern**:
- Model scores reflect actual analysis
- Fallback scores based on segment matching
- Difference shows how model's assessment differs from heuristics

---

## Regression Testing

After any changes, verify:

```javascript
// Test 1: Parser functions exist
console.assert(typeof extractJudgeConfidenceScore === 'function', 'extractJudgeConfidenceScore missing');
console.assert(typeof getJudgeReportDetails === 'function', 'getJudgeReportDetails missing');

// Test 2: Old functions still work
console.assert(typeof calculateValidationScore === 'function', 'calculateValidationScore missing');
console.assert(typeof renderConfidenceBadge === 'function', 'renderConfidenceBadge missing');

// Test 3: System prompt contains judge instructions
console.assert(GEMINI_SYSTEM_PROMPT.includes('hallucination_judge_report'), 'Judge instructions missing');

// Test 4: Sample message renders
const testMsg = {
  mainResponse: '<p>Test</p>',
  hallucination_judge_report: { confidence_score: 75 }
};
renderAssistantMessage(testMsg);
const badge = document.querySelector('.confidence-badge');
console.assert(badge !== null, 'Badge not rendered');

console.log('✅ All regression tests passed');
```

---

## Judge Report Quality Check

Verify that judge reports are realistic:

```javascript
// Check all messages in conversation
state.conversation.forEach((msg, idx) => {
  const report = getJudgeReportDetails(msg);
  if (report) {
    console.log(`Message ${idx}:`, {
      score: report.confidence,
      risk: report.risk,
      grounded: report.grounded,
      inferred: report.inferred,
      unverified: report.unverified,
      reasoning: report.reasoning
    });
  }
});
```

**Look For**:
- Scores vary (not all the same)
- Grounded count is reasonable (typically 1-5)
- Risk level matches score (HIGH if <40%, LOW if ≥80%)
- Reasoning explains the score
- No obvious hallucinations in self-assessment

---

## Success Criteria

✅ **All Tests Pass When**:

1. Judge report extracts without errors
2. Confidence score ranges 0-100
3. Badge displays correct color
4. Fallback works when judge report missing
5. Mobile view renders correctly
6. No JavaScript errors in console
7. Performance is <1ms
8. Lens toggle doesn't affect badge
9. Multiple responses show varied scores
10. Judge reasoning is realistic

---

## Troubleshooting

### Issue: Badge not showing

**Check**:
```javascript
const msg = state.conversation[state.conversation.length - 1];
console.log('Has mainResponse:', !!msg.mainResponse);
console.log('Judge report:', msg.hallucination_judge_report);
console.log('Judge score:', extractJudgeConfidenceScore(msg));
```

**Fix**: Ensure response includes mainResponse field

---

### Issue: Wrong color badge

**Check**:
```javascript
const score = extractJudgeConfidenceScore(msg);
console.log('Score:', score);
console.log('Expected color:', score >= 80 ? 'GREEN' : score >= 40 ? 'AMBER' : 'RED');
```

**Fix**: Verify score thresholds in `getConfidenceBadge()`

---

### Issue: Fallback not activating

**Check**:
```javascript
const modelScore = extractJudgeConfidenceScore(msg);
console.log('Model score:', modelScore);
console.log('Is null:', modelScore === null);
```

**Fix**: Check if judge report exists with `msg.hallucination_judge_report`

---

**Created**: June 2, 2026  
**For**: Clarity Prototype v2.1  
**Status**: ✅ Ready for Testing
