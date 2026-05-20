1. Problem Statement

Defines:

+ what is wrong
+ what limitation exists
+ what engineering/business pain currently exists

This section establishes the reason the RFC exists at all.

Target Audience Wants Answered

> “What exact problem are we solving?”

Should Include:
+ current system behavior
+ observable issues
+ constraints
+ measurable pain
+ scope boundaries

Good Characteristics
+ objective
+ evidence-based
+ not solution-biased

Example

> The admin frontend currently performs 14 REST requests during dashboard initialization, causing a median startup latency of 2.8 seconds on high-latency networks.

2. Motivation

Explains:

+ why solving the problem matters
+ why now
+ business/technical urgency

This creates organizational alignment.

Target Audience Wants Answered

> “Why should engineers and stakeholders care?”

Should Include
+ business impact
+ developer productivity impact
+ scalability concerns
+ user experience impact
+ operational burden

Example

> Reducing startup requests improves perceived responsiveness for enterprise users operating over VPN connections and reduces backend load by approximately 35%.

3. Proposed Solution

Describes the actual implementation approach.

This is the core engineering section.

Target Audience Wants Answered

> “What exactly are we building/changing?”

Should Include
+ architecture
+ data flow
+ APIs
+ schemas
+ infrastructure changes
+ implementation details
+ diagrams (if needed)

Good Characteristics
+ technically precise
+ implementation-realistic
+ testable

Example

> Introduce a GraphQL gateway aggregating user, permissions, notifications, and dashboard settings
into a single request.

4. Alternatives Considered

Shows that the proposal was evaluated against other viable options.

This demonstrates engineering rigor.

Target Audience Wants Answered

> “Why this solution instead of another one?”

Should Include
+ rejected approaches
+ pros/cons of alternatives
+ rationale for rejection

Example

```
Alternative: HTTP batching

Rejected because:
- still requires frontend orchestration
- insufficient type safety
- does not solve schema evolution concerns
```

5. Tradeoffs

Explicitly acknowledges costs and downsides.

Senior engineering expects honesty about compromises.

Target Audience Wants Answered

> “What do we lose by choosing this approach?”

Should Include
+ complexity increases
+ operational costs
+ maintenance burden
+ latency tradeoffs
+ developer learning curve
+ vendor lock-in

Example
> GraphQL increases backend schema maintenance complexity and introduces additional caching challenges.

6. Migration Plan

Explains how to transition from old → new safely.

Critical in production systems.

Target Audience Wants Answered

> “How do we roll this out without breaking things?”

Should Include
+ rollout phases
+ backward compatibility
+ feature flags
+ deployment sequence
+ rollback plan
+ data migrations

Example

```
Phase 1:
Introduce GraphQL gateway alongside REST.

Phase 2:
Migrate dashboard consumers incrementally.

Phase 3:
Deprecate legacy REST aggregation endpoints.
```

7. Security / Performance Impact

Forces explicit analysis of:
+ security implications
+ scalability implications
+ operational risks

Staff+ engineering heavily values this section.

Target Audience Wants Answered

> “What risks are introduced technically?”

Security Considerations
+ authentication
+ authorization
+ data exposure
+ privilege escalation
+ injection risks
+ audit logging
+ Performance Considerations
+ CPU usage
+ memory usage
+ query amplification
+ caching
+ bandwidth
+ latency

Example

```
GraphQL introspection will be disabled in production
to reduce schema exposure risks.

Request-level caching is expected to reduce aggregate
backend load by 22%.
```

8. Open Questions

Documents unresolved decisions.

An RFC does not need all answers finalized.

Target Audience Wants Answered

> “What still requires discussion or validation?”

Should Include
+ unresolved technical questions
+ pending stakeholder decisions
+ research tasks
+ unknown operational constraints

Example
- Should subscriptions use WebSockets or SSE?
- Do mobile clients require REST fallback support?
- Should persisted queries be mandatory?

_____________________________________

Overall RFC Philosophy

An RFC is fundamentally designed to answer:

| Question | RFC Section |
| -------- | ----------- |
| What’s wrong? |	Problem Statement |
| Why care? |	Motivation |
| What are we doing? | Proposed Solution |
| Why this approach? | Alternatives Considered |
| What are the downsides? | Tradeoffs |
| How do we safely deploy it?	| Migration Plan |
| What risks exist? | Security / Performance Impact |
| What remains undecided? |	Open Questions |

Staff-Level Expectation

At senior/staff/principal level, RFCs are less about coding and more about:

+ systems thinking
+ organizational alignment
+ risk management
+ scalability
+ long-term maintainability
+ operational predictability

That’s why strong RFCs are considered a core senior engineering skill.