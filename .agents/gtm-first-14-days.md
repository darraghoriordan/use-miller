# Miller GTM: first 14 days

Start date: 2026-09-05

The objective of this fortnight is not traffic at any cost. It is to confirm the buying
trigger for Miller's Production Launch Sprint, complete the first paid design-partner sale,
and establish trustworthy funnel measurement.

## Fortnight outcomes

- Ten conversations with technical founders, engineering leads, or TypeScript consultancies.
- At least three qualified Launch Sprint opportunities.
- One paid $2,500 USD design-partner engagement.
- Every published price, renewal promise, support promise, and checkout mode agrees.
- All priority GA4 events verified in Realtime or DebugView after deployment.
- A documented baseline for qualified visits, activations, enquiries, checkouts, and purchases.

## Day-by-day plan

### Day 1: offer and billing integrity

- Review the repository changes that rename the paid offer to Production Launch Sprint.
- Run Terraform plans for local and production Stripe without applying them.
- Review the effect on the existing $1,649 annual Stripe price and any current subscribers.
- Have the updated licensing and service terms reviewed by qualified counsel before relying
  on them as legal documents.

### Day 2: deploy and verify measurement

- Deploy the frontend and confirm the Miller Start, Dev Shell, and Local Dev Tools pages at
  phone and desktop widths.
- In GA4 DebugView or Realtime, verify `local_dev_tools_download`,
  `local_dev_tools_begin_checkout`, `dev_shell_begin_checkout`,
  `miller_start_agent_click`, and `miller_launch_sprint_enquiry`.
- Configure `miller_launch_sprint_enquiry` as a key event and retire the obsolete consulting
  checkout key event.
- Record provider-confirmed purchases separately from checkout intent.

### Day 3: prepare the prospect list

- Identify 30 public, relevant prospects: small NestJS/TypeScript product teams, technical
  founders visibly using coding agents, and consultancies shipping repeated TypeScript apps.
- Do not contact package downloaders or scrape personal details. Use public professional
  context and personalize every message.
- Divide prospects by trigger: new application, AI-generated prototype, production launch,
  or platform modernization.

### Days 4–5: begin discovery

- Send ten personal invitations each day.
- Ask for a 20-minute research conversation, not a product pitch.
- Run the interview guide below and capture exact language, current workaround, urgency,
  budget owner, and next milestone.
- At the end, offer the Sprint only when the problem and timing are a fit.

### Days 6–7: synthesize and publish proof

- Group interview notes by buying trigger and objection.
- Update the Launch Sprint copy only if at least three conversations repeat the same language.
- Publish one practical asset: "Production checklist for an AI-built TypeScript app."
- Link the checklist to Miller Start and the Launch Sprint without gating the repository.

### Days 8–10: second outreach wave

- Send 20 more personalized invitations using the strongest verified problem language.
- Follow up once with non-responders after four business days; do not start an automated
  sequence yet.
- Invite qualified prospects to a working-session preview using their own non-sensitive
  architecture or a public repository.

### Days 11–12: run a public demonstration

- Demonstrate creating or inspecting a Miller project, running `mill report`, planning
  provider setup, and reaching a passing `mill doctor` result.
- Show the boundary between agent automation and human approval of credentials or external
  changes.
- Turn recurring questions into FAQ copy and short clips.

### Days 13–14: review the funnel

- Record qualified visits, product activations, enquiries, conversations, proposals, wins,
  revenue, refunds, and support time by product.
- Review recordings or notes from all conversations.
- Decide whether to keep the $2,500 beta price. Do not raise it until at least three paid
  engagements have delivered a clear result.
- Choose one message and one acquisition channel for the next 14-day cycle.

## Discovery interview guide

1. What are you building, and what must be true before you consider it production-ready?
2. Where is the application today: idea, prototype, beta, production, or modernization?
3. How are coding agents involved in the work?
4. Which parts of auth, billing, authorization, deployment, and operations feel uncertain?
5. What have you already tried, and where did it break down?
6. What happens if the application does not launch or stabilize on schedule?
7. Who owns the decision to bring in outside implementation help?
8. What would make a focused production sprint obviously worthwhile?

Do not introduce the offer until the interviewee has described the problem, consequence, and
timing in their own words.

## Outreach copy

### Research invitation

> Hi {{name}} — I maintain Miller, a NestJS/Next.js production foundation designed for teams
> building with coding agents. I am interviewing technical founders about the gap between an
> AI-built prototype and a system they are comfortable putting into production. Would you be
> open to a 20-minute research call? No preparation or product pitch required.

### Qualified follow-up

> Based on what you described about {{specific problem}}, a Miller Production Launch Sprint
> may fit. It includes an architecture and production-readiness review, up to eight hours of
> focused implementation work, written next steps, and seven days of follow-up. The current
> design-partner price is $2,500 USD. If useful, I can send a one-page scope before you decide.

## Weekly scorecard

| Metric | Week 1 | Week 2 |
| --- | ---: | ---: |
| Qualified product-page visits |  |  |
| Local Dev Tools downloads |  |  |
| Local Dev Tools checkout starts |  |  |
| Dev Shell checkout starts |  |  |
| Miller Start agent handoffs |  |  |
| Launch Sprint enquiries |  |  |
| Discovery conversations |  |  |
| Qualified opportunities |  |  |
| Paid engagements |  |  |
| Revenue |  |  |
| Refunds |  |  |
| Support hours |  |  |

Record the source and product for every meaningful conversion. At current traffic levels,
compare complete periods and qualitative evidence; do not run simultaneous A/B tests.
