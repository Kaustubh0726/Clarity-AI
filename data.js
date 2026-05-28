// ═══════════════════════════════════════════════════════
// CLARITY PROTOTYPE — Demo Conversation Data
// Three scenarios: Research, Code Generation, Writing
// Each includes: segments with confidence types, 
// clarity cards, and contextual evaluation nudges
// ═══════════════════════════════════════════════════════

const CONFIDENCE_TYPES = {
  grounded: { label: "Well-Grounded", icon: "✓", color: "#34D399", desc: "Supported by cited sources or highly established knowledge" },
  inferred: { label: "Inferred", icon: "◐", color: "#FBBF24", desc: "Reasonable conclusion involving assumptions or extrapolation" },
  uncertain: { label: "Uncertain", icon: "?", color: "#F87171", desc: "Limited data, conflicting information, or speculative reasoning" },
  subjective: { label: "Subjective", icon: "◑", color: "#A78BFA", desc: "Depends on context, values, or perspective" }
};

const conversations = {

  // ─── SCENARIO 1: RESEARCH & ANALYSIS ───────────────
  research: {
    title: "Research Analysis",
    subtitle: "AI & Critical Thinking in Knowledge Work",
    icon: "🔬",
    messages: [
      {
        role: "user",
        content: "Analyze the evidence on whether AI tools improve or reduce critical thinking skills in knowledge workers. I need this for a strategy presentation to our leadership team."
      },
      {
        role: "assistant",
        segments: [
          {
            id: "r1",
            type: "grounded",
            content: `<p><strong>The empirical picture is nuanced but increasingly data-rich.</strong> A 2025 longitudinal study from MIT's Initiative on the Digital Economy, tracking 1,200 knowledge workers over 14 months, found that regular AI tool users completed analytical tasks 37% faster while showing a 12% decline in independent problem-solving scores when assessed without AI assistance. Similarly, Microsoft Research's Work Trends Index (2025) reported that 68% of professionals felt AI made them "more productive" but only 29% felt it made them "better thinkers."</p>`,
            annotation: {
              reasoning: "These statistics come from published institutional studies with documented methodologies. The MIT study used controlled assessments; the Microsoft data is from a large-sample survey.",
              evidence: "MIT Initiative on the Digital Economy (2025); Microsoft Work Trends Index 2025",
              counterpoint: "The MIT study has been critiqued for selection bias — participants were self-selected AI adopters, which may skew results."
            }
          },
          {
            id: "r2",
            type: "inferred",
            content: `<p><strong>This pattern mirrors what cognitive scientists call 'cognitive offloading.'</strong> When reliable external tools handle structured reasoning, humans naturally reduce investment in those cognitive processes — similar to how GPS navigation measurably reduced spatial reasoning in frequent users (Dahmani &amp; Bherer, 2023). AI's polished, well-structured outputs diminish the perceived need for users to organize their own thinking.</p><p>However, the GPS analogy has meaningful limits: unlike turn-by-turn navigation, effective AI use requires sophisticated prompt construction, output evaluation, and iterative refinement — skills that may exercise different but equally valuable cognitive muscles.</p>`,
            annotation: {
              reasoning: "The cognitive offloading framework is well-established. The GPS analogy is research-supported. However, applying this framework to AI tools involves extrapolation — the mechanisms may differ.",
              evidence: "Cognitive offloading literature (Risko & Gilbert, 2016); GPS-spatial reasoning (Dahmani & Bherer, 2023)",
              counterpoint: "Some researchers argue AI interaction is categorically different from GPS use because it requires active engagement with language and reasoning."
            }
          },
          {
            id: "r3",
            type: "uncertain",
            content: `<p><strong>The long-term cognitive effects remain genuinely uncertain.</strong> Most longitudinal studies span less than 18 months, and results are contradictory. A 2025 <em>Nature Human Behaviour</em> meta-analysis found "no statistically significant evidence of permanent cognitive decline" in AI users, but the authors cautioned that follow-up periods were too short. Meanwhile, a smaller but methodologically rigorous UCL study found preliminary evidence of reduced "cognitive flexibility" — the ability to switch between thinking frameworks — in heavy AI users.</p>`,
            annotation: {
              reasoning: "I'm flagging genuine scientific uncertainty. The evidence points in multiple directions, and time horizons are insufficient for confident conclusions.",
              evidence: "Nature Human Behaviour meta-analysis (2025); UCL cognitive flexibility study (2025)",
              counterpoint: "Both optimistic and pessimistic interpretations can be supported. The honest answer is: we don't know yet."
            }
          },
          {
            id: "r4",
            type: "subjective",
            content: `<p><strong>For your leadership presentation, the framing matters significantly.</strong> Whether you position AI tools as "cognitive enhancers that free humans for higher-order thinking" or "cognitive crutches that risk deskilling" depends on your organization's strategic posture and risk tolerance. Both framings can be credibly supported by current evidence. The question is less about what the data says and more about what narrative serves your AI adoption strategy.</p>`,
            annotation: {
              reasoning: "This is explicitly a judgment call, not a factual claim. The 'right' framing depends on organizational context, values, and goals — factors I don't have full visibility into.",
              evidence: "N/A — this is a strategic recommendation, not an empirical claim",
              counterpoint: "You might argue a presentation should aim for objectivity. That's valid — but board-level presentations always involve framing choices."
            }
          },
          {
            id: "r5",
            type: "grounded",
            content: `<p><strong>One finding bridges both perspectives:</strong> McKinsey's 2025 organizational study found that teams using AI tools <em>with structured evaluation practices</em> (review checkpoints, critical assessment protocols) maintained critical thinking scores within 3% of baseline while capturing 89% of speed benefits. Teams without guardrails saw the full 12% decline. This suggests the variable is less about AI tools themselves and more about <em>how organizations implement them</em>.</p>`,
            annotation: {
              reasoning: "This finding is from a well-documented McKinsey study with clear methodology (randomized control trial across 47 organizations).",
              evidence: "McKinsey Global Institute, 'AI-Augmented Productivity' (2025), n=47 orgs, 3,200 workers",
              counterpoint: "The study focused on consulting and financial services — results may not generalize to creative industries or engineering."
            }
          }
        ],
        clarityCard: {
          completeness: {
            rating: "Partial",
            icon: "◐",
            detail: "Covers academic research and organizational implications. Missing: industry-specific breakdowns, individual variation factors (expertise, age, cognitive style), measurement methodology debates, and non-Western research."
          },
          reasoning: {
            rating: "Strong",
            icon: "✓",
            detail: "Opening and closing sections grounded in published research. Middle sections appropriately flag uncertainty and subjectivity. GPS analogy is reasonable but acknowledged as imperfect."
          },
          assumptions: [
            "Your leadership team prefers data-driven, research-backed arguments",
            "'Critical thinking' is measured consistently across cited studies (it may not be)",
            "Your organization is considering broad AI deployment, not just pilots",
            "The audience is familiar with AI capabilities but not the specific research"
          ],
          risks: [
            "The MIT study's 12% decline figure may overstate the effect due to self-selection bias",
            "McKinsey's positive findings may reflect organizational culture, not the evaluation practices themselves",
            "Mixing uncertain long-term effects with short-term gains may create analysis paralysis for your leadership"
          ],
          alternatives: [
            "Use your organization's internal AI pilot data — boards find internal benchmarks more credible",
            "Frame as risk management: 'How do we capture AI benefits while protecting analytical capabilities?'",
            "Include a live demo of AI-assisted vs. unassisted analysis to make the impact tangible"
          ],
          verification: [
            "Check the MIT study's methodology for sample selection criteria",
            "Cross-reference McKinsey findings with your organization's AI pilot data",
            "Verify the Nature meta-analysis includes post-June 2024 studies (earlier ones used weaker models)",
            "Ask HR/L&D if baseline critical thinking assessment data exists for comparison"
          ]
        },
        nudges: [
          {
            id: "n-r1",
            afterSegment: "r3",
            content: "This analysis frames AI's impact as primarily cognitive. Your leadership team may also care about social impacts — how AI tools affect team collaboration, mentorship quality, and institutional knowledge transfer. Consider whether those dimensions belong in your presentation.",
            type: "perspective"
          }
        ]
      }
    ]
  },

  // ─── SCENARIO 2: CODE GENERATION ───────────────────
  code: {
    title: "Code Generation",
    subtitle: "Secure Auth Middleware in Python",
    icon: "💻",
    messages: [
      {
        role: "user",
        content: "Write a secure authentication middleware for Python with JWT access tokens and refresh token rotation. Include proper error handling."
      },
      {
        role: "assistant",
        segments: [
          {
            id: "c1",
            type: "grounded",
            content: `<p>Here's a JWT authentication middleware with refresh token rotation. I'll use <code>PyJWT</code> for token operations and implement a standard access + refresh token pattern in Python.</p>`,
            annotation: {
              reasoning: "Standard JWT middleware pattern well-documented in OWASP and Flask/Django security best practices.",
              evidence: "OWASP JWT Cheat Sheet; Flask-JWT-Extended documentation; RFC 7519",
              counterpoint: "The JWT approach itself is debated — some security experts prefer opaque tokens with server-side sessions for better revocation control."
            }
          },
          {
            id: "c2",
            type: "grounded",
            targetLanguage: "python",
            sourceLanguage: "python",
            sourceCode: `import jwt
import uuid
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

ACCESS_SECRET = "your-access-secret-key"
REFRESH_SECRET = "your-refresh-secret-key"
ACCESS_EXPIRY = timedelta(minutes=15)
REFRESH_EXPIRY = timedelta(days=7)

def generate_tokens(user_id, roles=None):
  if roles is None:
    roles = []
  
  access_token = jwt.encode(
    {
      "sub": user_id,
      "roles": roles,
      "type": "access",
      "exp": datetime.utcnow() + ACCESS_EXPIRY,
      "iat": datetime.utcnow()
    },
    ACCESS_SECRET,
    algorithm="HS256"
  )
  
  refresh_token = jwt.encode(
    {
      "sub": user_id,
      "type": "refresh",
      "jti": str(uuid.uuid4()),
      "exp": datetime.utcnow() + REFRESH_EXPIRY,
      "iat": datetime.utcnow()
    },
    REFRESH_SECRET,
    algorithm="HS256"
  )
  
  return {"access_token": access_token, "refresh_token": refresh_token}`,
            content: `<pre><code class="language-python">import jwt
import uuid
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

ACCESS_SECRET = "your-access-secret-key"
REFRESH_SECRET = "your-refresh-secret-key"
ACCESS_EXPIRY = timedelta(minutes=15)
REFRESH_EXPIRY = timedelta(days=7)

def generate_tokens(user_id, roles=None):
  if roles is None:
    roles = []
  
  access_token = jwt.encode(
    {
      "sub": user_id,
      "roles": roles,
      "type": "access",
      "exp": datetime.utcnow() + ACCESS_EXPIRY,
      "iat": datetime.utcnow()
    },
    ACCESS_SECRET,
    algorithm="HS256"
  )
  
  refresh_token = jwt.encode(
    {
      "sub": user_id,
      "type": "refresh",
      "jti": str(uuid.uuid4()),
      "exp": datetime.utcnow() + REFRESH_EXPIRY,
      "iat": datetime.utcnow()
    },
    REFRESH_SECRET,
    algorithm="HS256"
  )
  
  return {"access_token": access_token, "refresh_token": refresh_token}</code></pre>`,
            annotation: {
              reasoning: "Standard token generation using well-established patterns. Environment variables for secrets, short-lived access tokens, and separate signing keys follow security best practices.",
              evidence: "OWASP Authentication Cheat Sheet; JWT RFC 7519",
              counterpoint: "HS256 is a symmetric algorithm — if you need token verification by third-party services, consider RS256 (asymmetric)."
            }
          },
          {
            id: "c3",
            type: "inferred",
            targetLanguage: "python",
            sourceLanguage: "python",
            sourceCode: `# In-memory store — replace with Redis/Database in production
refresh_token_store = {}

def store_refresh_token(user_id, token_id):
  if user_id not in refresh_token_store:
    refresh_token_store[user_id] = set()
  refresh_token_store[user_id].add(token_id)

def revoke_refresh_token(user_id, token_id):
  if user_id in refresh_token_store:
    refresh_token_store[user_id].discard(token_id)

def is_refresh_token_valid(user_id, token_id):
  return user_id in refresh_token_store and token_id in refresh_token_store[user_id]

def rotate_tokens(old_refresh_token):
  try:
    decoded = jwt.decode(old_refresh_token, REFRESH_SECRET, algorithms=["HS256"])
    
    if not is_refresh_token_valid(decoded["sub"], decoded["jti"]):
      # Possible token reuse attack — revoke ALL user tokens
      refresh_token_store.pop(decoded["sub"], None)
      raise Exception("REFRESH_TOKEN_REUSE_DETECTED")
    
    revoke_refresh_token(decoded["sub"], decoded["jti"])
    new_tokens = generate_tokens(decoded["sub"])
    new_decoded = jwt.decode(new_tokens["refresh_token"], REFRESH_SECRET, algorithms=["HS256"])
    store_refresh_token(decoded["sub"], new_decoded["jti"])
    
    return new_tokens
  except jwt.ExpiredSignatureError:
    raise Exception("REFRESH_TOKEN_EXPIRED")`,
            content: `<pre><code class="language-python"># In-memory store — replace with Redis/Database in production
refresh_token_store = {}

def store_refresh_token(user_id, token_id):
  if user_id not in refresh_token_store:
    refresh_token_store[user_id] = set()
  refresh_token_store[user_id].add(token_id)

def revoke_refresh_token(user_id, token_id):
  if user_id in refresh_token_store:
    refresh_token_store[user_id].discard(token_id)

def is_refresh_token_valid(user_id, token_id):
  return user_id in refresh_token_store and token_id in refresh_token_store[user_id]

def rotate_tokens(old_refresh_token):
  try:
    decoded = jwt.decode(old_refresh_token, REFRESH_SECRET, algorithms=["HS256"])
    
    if not is_refresh_token_valid(decoded["sub"], decoded["jti"]):
      # Possible token reuse attack — revoke ALL user tokens
      refresh_token_store.pop(decoded["sub"], None)
      raise Exception("REFRESH_TOKEN_REUSE_DETECTED")
    
    revoke_refresh_token(decoded["sub"], decoded["jti"])
    new_tokens = generate_tokens(decoded["sub"])
    new_decoded = jwt.decode(new_tokens["refresh_token"], REFRESH_SECRET, algorithms=["HS256"])
    store_refresh_token(decoded["sub"], new_decoded["jti"])
    
    return new_tokens
  except jwt.ExpiredSignatureError:
    raise Exception("REFRESH_TOKEN_EXPIRED")</code></pre>`,
            annotation: {
              reasoning: "Refresh token rotation is a recommended security pattern, but this in-memory implementation is a practical compromise. The token reuse detection logic follows OWASP guidance but may have edge cases in concurrent request scenarios.",
              evidence: "OWASP Token Rotation guidelines; Auth0 refresh token rotation documentation",
              counterpoint: "In a distributed deployment (multiple server instances), this in-memory store will cause authentication failures. Redis or a database is required for production."
            }
          },
          {
            id: "c4",
            type: "grounded",
            targetLanguage: "python",
            sourceLanguage: "python",
            sourceCode: `from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def authenticate(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
      return jsonify({
        "error": "MISSING_TOKEN",
        "message": "Authorization header with Bearer token required"
      }), 401
    
    token = auth_header.split(" ")[1]
    
    try:
      decoded = jwt.decode(token, ACCESS_SECRET, algorithms=["HS256"])
      if decoded.get("type") != "access":
        return jsonify({"error": "INVALID_TOKEN_TYPE"}), 401
      
      request.user = {"id": decoded["sub"], "roles": decoded.get("roles", [])}
      return f(*args, **kwargs)
      
    except jwt.ExpiredSignatureError:
      return jsonify({
        "error": "TOKEN_EXPIRED",
        "message": "Access token expired. Use refresh token."
      }), 401
    except jwt.InvalidTokenError:
      return jsonify({"error": "INVALID_TOKEN"}), 401
  
  return decorated_function

@app.route("/protected", methods=["GET"])
@authenticate
def protected_route():
  return jsonify({"message": f"Hello, {request.user['id']}"}), 200

@app.route("/refresh", methods=["POST"])
def refresh():
  try:
    data = request.get_json()
    refresh_token = data.get("refresh_token")
    if not refresh_token:
      return jsonify({"error": "MISSING_REFRESH_TOKEN"}), 400
    
    new_tokens = rotate_tokens(refresh_token)
    return jsonify(new_tokens), 200
  except Exception as e:
    return jsonify({"error": str(e)}), 401`,
            content: `<pre><code class="language-python">from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def authenticate(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
      return jsonify({
        "error": "MISSING_TOKEN",
        "message": "Authorization header with Bearer token required"
      }), 401
    
    token = auth_header.split(" ")[1]
    
    try:
      decoded = jwt.decode(token, ACCESS_SECRET, algorithms=["HS256"])
      if decoded.get("type") != "access":
        return jsonify({"error": "INVALID_TOKEN_TYPE"}), 401
      
      request.user = {"id": decoded["sub"], "roles": decoded.get("roles", [])}
      return f(*args, **kwargs)
      
    except jwt.ExpiredSignatureError:
      return jsonify({
        "error": "TOKEN_EXPIRED",
        "message": "Access token expired. Use refresh token."
      }), 401
    except jwt.InvalidTokenError:
      return jsonify({"error": "INVALID_TOKEN"}), 401
  
  return decorated_function

@app.route("/protected", methods=["GET"])
@authenticate
def protected_route():
  return jsonify({"message": f"Hello, {request.user['id']}"}), 200

@app.route("/refresh", methods=["POST"])
def refresh():
  try:
    data = request.get_json()
    refresh_token = data.get("refresh_token")
    if not refresh_token:
      return jsonify({"error": "MISSING_REFRESH_TOKEN"}), 400
    
    new_tokens = rotate_tokens(refresh_token)
    return jsonify(new_tokens), 200
  except Exception as e:
    return jsonify({"error": str(e)}), 401</code></pre>`,
            annotation: {
              reasoning: "The middleware itself follows well-established Express.js patterns. Error handling covers the main failure modes. Bearer token extraction follows RFC 6750.",
              evidence: "Express.js middleware documentation; RFC 6750 Bearer Token Usage",
              counterpoint: "Error messages reveal token type information — in high-security contexts, you might want more generic error responses to prevent token type enumeration."
            }
          },
          {
            id: "c5",
            type: "uncertain",
            content: `<p><strong>Security considerations to review before deploying:</strong></p>
<ul>
<li>This implementation does <strong>not</strong> include rate limiting on the refresh endpoint — an attacker with a stolen refresh token could rapidly rotate and issue new tokens</li>
<li>There is <strong>no CSRF protection</strong> — if tokens are stored in cookies rather than Authorization headers, you'll need CSRF tokens</li>
<li>The <code>REFRESH_TOKEN_REUSE_DETECTED</code> path revokes all user tokens, which is secure but may cause UX issues if the detection is a false positive from network retries</li>
<li>Consider adding <code>aud</code> (audience) and <code>iss</code> (issuer) claims for multi-service architectures</li>
</ul>`,
            annotation: {
              reasoning: "These are known security gaps that I'm explicitly flagging. The severity depends on your threat model and deployment context, which I don't have full visibility into.",
              evidence: "OWASP API Security Top 10; Common JWT vulnerabilities documented in security literature",
              counterpoint: "You might decide some of these are acceptable risks for an MVP or internal tool. The decision depends on your security requirements."
            }
          }
        ],
        clarityCard: {
          completeness: {
            rating: "Core Complete",
            icon: "◐",
            detail: "Token generation, middleware, and refresh rotation are implemented. Missing: rate limiting, CSRF protection, logging/audit trail, database integration for token storage, input sanitization, and test suite."
          },
          reasoning: {
            rating: "Strong for patterns, Mixed for production-readiness",
            icon: "◐",
            detail: "JWT patterns follow established standards. However, the in-memory token store and missing security hardening mean this is a starting point, not production-ready code."
          },
          assumptions: [
            "Express.js 4+ and Node.js 18+ environment",
            "jsonwebtoken package is installed",
            "Single-server deployment (in-memory store won't work across instances)",
            "Secrets are stored in environment variables, not hardcoded",
            "You have a separate user authentication (login) endpoint"
          ],
          risks: [
            "In-memory token store is lost on server restart — all users logged out",
            "No protection against JWT theft via XSS if tokens are stored in localStorage",
            "Concurrent refresh requests may trigger false positive reuse detection",
            "Missing input validation on token payloads could allow injection"
          ],
          alternatives: [
            "Use Passport.js for a more battle-tested, ecosystem-supported solution",
            "Use Redis for distributed token storage if you need horizontal scaling",
            "Consider OAuth 2.0 with an identity provider (Auth0, Clerk) instead of custom auth",
            "For highest security, use opaque tokens with server-side sessions instead of JWTs"
          ],
          verification: [
            "Test with: expired tokens, malformed JWTs, reused refresh tokens",
            "Test concurrent refresh requests — does reuse detection trigger correctly?",
            "Try missing Authorization header, wrong Bearer prefix, empty token string",
            "Run a security scan (e.g., npm audit, Snyk) on the dependency chain"
          ]
        },
        nudges: [
          {
            id: "n-c1",
            afterSegment: "c3",
            content: "This code uses an in-memory token store (Map), which works for development but will fail in production with multiple server instances. Before deploying, decide: Redis for fast distributed storage, or PostgreSQL for durability with slightly higher latency?",
            type: "technical"
          }
        ]
      }
    ]
  },

  // ─── SCENARIO 3: PROFESSIONAL WRITING ──────────────
  writing: {
    title: "Professional Writing",
    subtitle: "Q2 Product Launch Executive Summary",
    icon: "✍️",
    messages: [
      {
        role: "user",
        content: "Draft an executive summary for our Q2 product launch. We launched a new analytics dashboard for mid-market SaaS companies. Key metrics: 15K signups in first month, NPS of 72, 23% free-trial-to-paid conversion, and $1.2M in new ARR. We're presenting to the board next week."
      },
      {
        role: "assistant",
        segments: [
          {
            id: "w1",
            type: "grounded",
            content: `<h3>Executive Summary: Q2 Analytics Dashboard Launch</h3>
<p>In Q2, we successfully launched our analytics dashboard targeting mid-market SaaS companies (50–500 employees). The product achieved <strong>15,000 signups in the first 30 days</strong>, with an NPS of <strong>72</strong> and a <strong>23% conversion rate</strong> from free trial to paid plans, generating <strong>$1.2M in new ARR</strong> within the quarter.</p>`,
            annotation: {
              reasoning: "This paragraph directly reports the metrics you provided. No interpretation or extrapolation — these are your stated facts.",
              evidence: "User-provided data: 15K signups, NPS 72, 23% conversion, $1.2M ARR",
              counterpoint: "I'm presenting your numbers at face value. If any of these metrics have caveats (e.g., ARR includes annual prepayments), the summary may overstate the position."
            }
          },
          {
            id: "w2",
            type: "inferred",
            content: `<p><strong>Market Positioning.</strong> These results position us favorably against mid-market analytics benchmarks. The 23% trial-to-paid conversion exceeds the SaaS industry median of 15–17% (OpenView 2025 Benchmarks), suggesting strong product-market fit in this segment. Our NPS of 72 places us in the "excellent" range, typically associated with category leaders in B2B SaaS.</p>`,
            annotation: {
              reasoning: "I'm contextualizing your metrics against industry benchmarks to add analytical value. The comparison is valid but involves assumptions: that your product category aligns with OpenView's benchmark sample, and that mid-market dynamics are comparable.",
              evidence: "OpenView 2025 SaaS Benchmarks; Bain NPS classification framework",
              counterpoint: "Mid-market analytics is a specific niche — general SaaS benchmarks may not fully apply. Your board may prefer direct competitor comparisons."
            }
          },
          {
            id: "w3",
            type: "grounded",
            content: `<p><strong>Key Results.</strong></p>
<table style="width:100%;border-collapse:collapse;margin:12px 0">
<tr style="border-bottom:1px solid #333"><td style="padding:8px"><strong>Metric</strong></td><td style="padding:8px"><strong>Result</strong></td><td style="padding:8px"><strong>Benchmark</strong></td></tr>
<tr style="border-bottom:1px solid #222"><td style="padding:8px">First-month signups</td><td style="padding:8px">15,000</td><td style="padding:8px">—</td></tr>
<tr style="border-bottom:1px solid #222"><td style="padding:8px">Net Promoter Score</td><td style="padding:8px">72</td><td style="padding:8px">&gt;50 = excellent</td></tr>
<tr style="border-bottom:1px solid #222"><td style="padding:8px">Trial → Paid conversion</td><td style="padding:8px">23%</td><td style="padding:8px">15–17% median</td></tr>
<tr><td style="padding:8px">New ARR</td><td style="padding:8px">$1.2M</td><td style="padding:8px">—</td></tr>
</table>`,
            annotation: {
              reasoning: "Tabular presentation of your provided data with added benchmark context where available.",
              evidence: "User-provided metrics; OpenView SaaS benchmarks for conversion rate; Bain NPS framework",
              counterpoint: "The benchmark column has gaps (no benchmarks for signups or ARR) — your board may question whether the missing comparisons are favorable or unfavorable."
            }
          },
          {
            id: "w4",
            type: "inferred",
            content: `<p><strong>What Drove These Results.</strong> The strong early traction likely reflects three factors: (1) pent-up demand in the mid-market for analytics tooling that doesn't require a dedicated data team, (2) our freemium model reducing adoption friction, and (3) the timing — mid-market companies are actively investing in data capabilities as enterprise tools become cost-prohibitive. The high NPS suggests we're delivering on the core value proposition of "analytics without a data engineer."</p>`,
            annotation: {
              reasoning: "This is my analysis of why your metrics look strong. I'm inferring causation from the data you provided combined with general market knowledge. I don't have access to your internal channel attribution, user research, or competitive dynamics.",
              evidence: "General mid-market SaaS trends; PLG adoption patterns; user-provided metrics",
              counterpoint: "These three factors are plausible but speculative. Your team likely has better insight into the actual drivers — internal data would strengthen or replace this section."
            }
          },
          {
            id: "w5",
            type: "uncertain",
            content: `<p><strong>Forward Outlook.</strong> If current conversion rates hold and signup growth sustains at 60% of the launch month pace, we project $4.8M in new ARR by year-end, bringing the analytics dashboard to potential profitability by Q2 of next year. However, post-launch signup decay typically follows a logarithmic curve — month-two signups often drop 40–60% without sustained marketing investment.</p>`,
            annotation: {
              reasoning: "This projection uses linear extrapolation with a stated decay assumption. It's meant to frame the opportunity but should be treated as a rough estimate, not a forecast. I don't know your marketing budget, competitive response timeline, or product roadmap.",
              evidence: "General SaaS growth modeling; post-launch decay patterns from First Round Capital research",
              counterpoint: "Linear extrapolation from one month of data is inherently unreliable. Your board may challenge this — consider presenting a range (conservative/base/optimistic) instead."
            }
          },
          {
            id: "w6",
            type: "subjective",
            content: `<p><strong>Strategic Recommendation.</strong> I recommend positioning this launch as validation of the mid-market analytics opportunity and requesting board approval for expanded investment in (1) sales capacity to accelerate enterprise conversions, (2) product depth to increase retention, and (3) a customer advisory board to guide the roadmap. The key message: "We've found product-market fit — now we need to invest to capture the market window before competitors respond."</p>`,
            annotation: {
              reasoning: "This is a strategic recommendation based on the data, but it reflects one perspective. An equally valid approach would be to recommend cautious expansion pending more data, or to focus investment on retention over acquisition.",
              evidence: "N/A — strategic judgment, not empirical claim",
              counterpoint: "Your board may prefer a more conservative framing: 'promising early results that warrant continued investment' rather than 'confirmed product-market fit.' One month of data may be too early for the latter claim."
            }
          }
        ],
        clarityCard: {
          completeness: {
            rating: "Partial",
            icon: "◐",
            detail: "Covers launch results, market context, and strategic recommendation. Missing: customer acquisition cost (CAC), churn data, cohort retention, competitive landscape, team/resourcing context, and channel-level performance breakdown."
          },
          reasoning: {
            rating: "Mixed",
            icon: "◐",
            detail: "Data-reported sections are strong. Market comparisons are reasonable but generic. The forward projection is speculative and should be presented as a scenario, not a forecast. Strategic recommendation is opinionated."
          },
          assumptions: [
            "The 15K signups are unique, verified accounts (not including duplicates or bots)",
            "NPS was measured from a representative sample of users (sample size not specified)",
            "$1.2M ARR represents contracted recurring revenue, not one-time or usage-based billing",
            "The 23% conversion rate is from completed free trials, not from all signups",
            "No significant cannibalization of existing products occurred"
          ],
          risks: [
            "The $4.8M year-end projection is based on one month of data — month-two signup decay could significantly reduce this",
            "NPS of 72 is excellent, but if measured from a small sample of early adopters, it may not represent the broader market",
            "Claiming 'product-market fit' after 30 days may undermine credibility with data-savvy board members",
            "Missing competitive context — board will likely ask 'how does this compare to [competitor]?'"
          ],
          alternatives: [
            "Lead with the narrative 'promising early signal' rather than 'confirmed PMF' to set appropriate expectations",
            "Include a conservative scenario ($2.4M) alongside the base case ($4.8M) to demonstrate analytical rigor",
            "Add 2-3 customer quotes or case studies to make the NPS score tangible",
            "Include a 'what we need to learn in Q3' section to demonstrate strategic maturity"
          ],
          verification: [
            "Confirm ARR calculation methodology matches board's definition (monthly * 12? Contracted annual? etc.)",
            "Verify NPS sample size and methodology — was it in-app survey? Email? What was the response rate?",
            "Cross-check conversion rate definition: does 23% count trial starts or trial completions as the denominator?",
            "Ask Finance to validate the $4.8M projection with their own revenue model"
          ]
        },
        nudges: [
          {
            id: "n-w1",
            afterSegment: "w5",
            content: "This projection extrapolates linearly from one month of data. Your board will likely stress-test this. Consider presenting three scenarios (conservative: $2.4M / base: $4.8M / optimistic: $7.2M) with stated assumptions for each — this demonstrates analytical maturity and preempts the 'where's the downside case?' question.",
            type: "evaluation"
          }
        ]
      }
    ]
  }
};

// ─── DASHBOARD DATA ──────────────────────────────────
const dashboardData = {
  calibrationTimeline: [
    { week: "Week 1", score: 42, actions: 18 },
    { week: "Week 2", score: 46, actions: 24 },
    { week: "Week 3", score: 53, actions: 31 },
    { week: "Week 4", score: 49, actions: 28 },
    { week: "Week 5", score: 58, actions: 35 },
    { week: "Week 6", score: 64, actions: 42 },
    { week: "Week 7", score: 69, actions: 38 },
    { week: "Week 8", score: 74, actions: 45 }
  ],
  evaluationPatterns: {
    accepted: { count: 142, percent: 41, label: "Accepted as-is" },
    revised: { count: 121, percent: 35, label: "Revised after review" },
    rejected: { count: 45, percent: 13, label: "Rejected / re-prompted" },
    flagged: { count: 38, percent: 11, label: "Flagged for uncertainty" }
  },
  domainCalibration: [
    { domain: "Research & Analysis", score: 78, sessions: 47, trend: "+12" },
    { domain: "Data Interpretation", score: 71, sessions: 34, trend: "+8" },
    { domain: "Code Generation", score: 65, sessions: 52, trend: "+15" },
    { domain: "Professional Writing", score: 58, sessions: 29, trend: "+5" }
  ],
  growthIndicators: [
    {
      label: "Uncertainties Caught",
      current: 72,
      previous: 45,
      unit: "%",
      description: "% of flagged uncertain claims you engaged with before acting"
    },
    {
      label: "Revision Quality",
      current: 68,
      previous: 52,
      unit: "%",
      description: "% of your revisions that improved the output quality"
    },
    {
      label: "Appropriate Trust",
      current: 81,
      previous: 63,
      unit: "%",
      description: "% of sessions where your trust level matched actual output quality"
    }
  ],
  insights: [
    {
      icon: "📈",
      text: "You've improved at identifying uncertain claims by <strong>60%</strong> over 8 weeks",
      type: "positive"
    },
    {
      icon: "⚠️",
      text: "You tend to accept code outputs without reviewing edge cases — try using the Reasoning Lens for code tasks",
      type: "warning"
    },
    {
      icon: "✓",
      text: "Your evaluation depth for research tasks is consistently strong — above 75th percentile",
      type: "positive"
    },
    {
      icon: "💡",
      text: "Writing tasks are your weakest evaluation area. Consider expanding Clarity Cards on writing responses before acting on them.",
      type: "suggestion"
    }
  ],
  weeklyComparison: {
    thisWeek: { sessions: 23, lensUsage: 67, cardExpansions: 45, nudgeEngagement: 78 },
    lastWeek: { sessions: 19, lensUsage: 54, cardExpansions: 38, nudgeEngagement: 62 }
  }
};
