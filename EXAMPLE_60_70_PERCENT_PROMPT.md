# Example Prompt with 60-70% Confidence Score

## Scenario: When to Use Different Database Approaches

### User Prompt
```
"I'm building a real-time chat application. Should I use PostgreSQL with WebSockets 
or a NoSQL database like MongoDB? What are the trade-offs and when would you recommend each?"
```

---

## Why This Results in 60-70% Confidence

This question triggers **mixed confidence** because:

1. **Grounded Claims** (40%):
   - PostgreSQL/MongoDB features are documented
   - WebSocket basics are well-known
   - ACID transactions are proven concepts

2. **Inferred Claims** (40%):
   - Performance comparisons aren't absolute
   - "Best for real-time" depends on scale
   - "Trade-offs" require architectural reasoning
   - Scalability patterns aren't always documented

3. **Unverified Claims** (20%):
   - Real-time performance benchmarks vary
   - "Best practice" depends on team expertise
   - No universal right answer

---

## Expected Model Response & Judge Report

### Model's Answer
```
For a real-time chat application, here are the key trade-offs:

PostgreSQL with WebSockets:
✓ ACID transactions ensure message integrity
✓ Complex queries and relationships work well
✓ Proven at scale for messaging apps
✗ Requires careful indexing for real-time performance
✗ Horizontal scaling is more complex

MongoDB:
✓ Flexible schema for evolving chat data
✓ Horizontal scaling built-in
✓ Document structure maps to chat messages
✗ No ACID transactions (important for consistency)
✗ Requires application-level validation

Recommendation:
- PostgreSQL if: Data consistency is critical, complex relationships 
  between users/messages, or your team is PostgreSQL-experienced
- MongoDB if: Your data schema is evolving, you need horizontal 
  scaling from the start, or you can handle eventual consistency

For most production chat apps, PostgreSQL + Redis for caching 
is the proven approach. But MongoDB works if you optimize for it.
```

### Judge Report
```json
{
  "confidence_score": 68,
  "hallucination_risk": "MEDIUM",
  "grounded_claims": 3,
  "inferred_claims": 3,
  "unverified_claims": 1,
  "key_hallucinations": "None detected",
  "reasoning": "Response combines documented database features (grounded) 
    with architectural recommendations (inferred). Trade-offs are accurate 
    but relative to specific use cases. No hallucinations, but architectural 
    advice requires verification against actual requirements."
}
```

### Badge Display
```
┌─────────────────────────────────────────┐
│ ◐  Partially AI-Generated      68%       │
│    68% grounded in documentation         │
└─────────────────────────────────────────┘
```

---

## Why 68% (Not Higher, Not Lower)

### Why Not 80%+
- ❌ Not entirely from documentation (needs architectural reasoning)
- ❌ Performance claims aren't absolute (depends on implementation)
- ❌ "Best approach" is contextual (team skills, scale, budget matter)

### Why Not <40%
- ✅ Core facts are documented (ACID, horizontal scaling, etc.)
- ✅ No hallucinations detected
- ✅ Reasoning is sound, just not provable
- ✅ User can verify with documentation

### Why 68% is Right
- ✓ Mix of proven facts + reasonable inference
- ✓ Transparent about trade-offs
- ✓ Honest about architectural subjectivity
- ✓ Grounded in real experience patterns

---

## Judge Reasoning Breakdown

### Grounded Claims (3)
1. **PostgreSQL ACID transactions** - Well-documented in official docs
2. **MongoDB horizontal scaling** - Built-in feature, documented
3. **WebSocket real-time capability** - Proven technology standard

### Inferred Claims (3)
1. **"PostgreSQL requires careful indexing"** - True in practice, not explicitly stated in docs as absolute rule
2. **"MongoDB schema flexibility for chat"** - Reasonable, but not a documented recommendation
3. **"PostgreSQL + Redis is proven"** - Widely used, but not an official recommendation

### Unverified Claims (1)
1. **"Most production chat apps use PostgreSQL + Redis"** - Common wisdom, not researched

---

## How to Get This Score Range

### Prompts That Typically Score 60-70%

```
1. "Compare REST vs GraphQL for building APIs"
   → Mix of documented concepts + architectural tradeoffs

2. "What's the best way to handle authentication in single-page apps?"
   → Documented methods + best practices (subjective)

3. "Should I use microservices or monolithic architecture?"
   → Trade-offs are real, but context-dependent

4. "When would you use React Hooks vs Class Components?"
   → Features documented, recommendations inferred

5. "How do I optimize database queries for slow reports?"
   → Techniques documented, optimization is contextual

6. "What's the difference between Docker and Kubernetes?"
   → Definitions grounded, architectural recommendations inferred
```

### Key Characteristics of 60-70% Prompts

✅ Mix technical facts with design decisions  
✅ Require "it depends" reasoning  
✅ Compare multiple valid approaches  
✅ Ask for trade-offs, not just facts  
✅ Involve best practices (subjective)  
✅ No hallucinations, just uncertainty  

---

## Testing This Prompt

### In Browser Console

```javascript
// Send the database comparison prompt to the API
// Then check the judge report:

const msg = state.conversation[state.conversation.length - 1];
console.log('Judge Report:', msg.hallucination_judge_report);

// Expected:
// {
//   confidence_score: 68,
//   hallucination_risk: "MEDIUM",
//   grounded_claims: 3,
//   inferred_claims: 3,
//   unverified_claims: 1,
//   ...
// }
```

### Expected Badge
```
🟡 Partially AI-Generated 68%
```

---

## Variations for Different Scores

### To Get Higher (75-85%)
```
"What are the features of Express.js middleware?"
→ More documented, fewer inferences
→ Expected: 78-82%
```

### To Get Lower (50-60%)
```
"What programming language should I learn first?"
→ More opinion-based, less documented
→ Expected: 52-58%
```

### To Get Even Lower (30-40%)
```
"Is Python the best programming language?"
→ Mostly opinion, minimal documentation
→ Expected: 25-35%
```

---

## Judge Report Guidance

When the model sees this type of question, it should evaluate:

**What's grounded?**
- Feature comparisons (documented in official docs)
- Technology basics (proven concepts)
- Industry standards (widely agreed upon)

**What's inferred?**
- Performance optimization strategies
- "When to use" recommendations
- Best practice advice (depends on context)
- Trade-off analysis (relative to requirements)

**What's unverified?**
- Absolute performance numbers
- "Most teams use X" claims (anecdotal)
- Future trends
- Team-specific advice

---

## Real-World Example: Chat App Database Choice

### If User Has Specific Requirements
```
"PostgreSQL vs MongoDB for real-time chat:
- 10k concurrent users
- Must have message ordering
- Team knows PostgreSQL
- Need eventual consistency OK"

Expected Judge Report:
{
  confidence_score: 82,
  hallucination_risk: "LOW",
  grounded_claims: 4,
  inferred_claims: 1,
  unverified_claims: 0,
  reasoning: "With specific constraints defined, recommendation 
    becomes more grounded. Concurrency limits, consistency requirements, 
    and team skill level make this less speculative."
}
→ 🟢 Highly Verified 82%
```

### If User Asks Generic Version
```
"PostgreSQL vs MongoDB for real-time chat?"

Expected Judge Report:
{
  confidence_score: 68,
  hallucination_risk: "MEDIUM",
  grounded_claims: 3,
  inferred_claims: 3,
  unverified_claims: 1,
  reasoning: "Without specific constraints, recommendation requires 
    architectural assumptions. Features are documented, but 'best choice' 
    depends on requirements not provided."
}
→ 🟡 Partially AI-Generated 68%
```

---

## Summary

This prompt type naturally results in **60-70% confidence** because:

1. **Foundation is grounded** (documented facts about technologies)
2. **Reasoning is inferred** (architectural trade-offs)
3. **Conclusion is context-dependent** (depends on specific needs)
4. **No hallucinations** (just appropriate uncertainty)

Perfect for demonstrating the **amber badge** in action!

---

**Created**: June 2, 2026  
**Use Case**: Testing 60-70% confidence scoring  
**Expected Badge**: 🟡 Partially AI-Generated
