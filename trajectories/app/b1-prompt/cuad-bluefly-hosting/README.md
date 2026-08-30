# Trajectory: cuad-bluefly-hosting

| Run | Value |
|---|---|
| Contract | cuad-bluefly-hosting — 3.1 Term |
| Config | b1-prompt |
| Parties | Bluefly, Inc. (our party) ↔ International Business Machines Corporation |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2m 3.1s (123,062 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 19,818 input · 11,418 output · 0 cache read · 1,194 cache write |
| Cost | $0.392002 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 0 | 0 | 0 | — | — |
| drafters | 4 | 1 | 0 | 18 submitted finding(s) | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| verifier | 0 | 0 | 0 | 0 verdict(s) | — |
| assembler | 21 | 0 | 0 | — | [seq 6](trajectory.jsonl#L6)–[seq 28](trajectory.jsonl#L28) |
| memo | 2 | 0 | 0 | — | [seq 26](trajectory.jsonl#L26)–[seq 27](trajectory.jsonl#L27) |
| human | 0 | 0 | 0 | 0 decision(s) | — |
| apply | 0 | 0 | 0 | not applied | — |

## LOL-CAP — Limitation of liability — cap, mutuality and carve-outs

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: LOL-CAP
Title: Limitation of liability — cap, mutuality and carve-outs
Kind: parametric
Summary: Liability must be capped for both parties at a meaningful amount, with standard carve-outs.
Severity: critical
Category: liability
Position — preferred:
Mutual cap equal to the greater of (a) fees paid or payable in the 12 months preceding the claim and (b) USD 1,000,000; mutual exclusion of indirect/consequential damages; carve-outs (uncapped) for breach of confidentiality, data protection and security obligations, indemnification obligations, gross negligence, wilful misconduct, fraud, and infringement of the other party's IP; Customer's payment obligations are not "damages" for cap purposes.

Position — fallback:
Mutual cap of 12 months' fees; carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct.

Position — walk-away:
Customer's liability uncapped while Vendor's is capped; Vendor cap below 6 months' fees; indemnities inside the cap with no super-cap.

Detection guidance:
Find the limitation-of-liability, exclusion-of-damages and any "aggregate liability" language, including language hidden in warranty or indemnity sections. Determine: does a cap exist; what is the basis (fixed amount, months of fees, fees "paid" vs "paid or payable"); is it mutual or one-sided; which obligations are carved out. Resolve defined terms ("Fees", "Losses", "Claims") — a cap on "Fees" defined as a small set-up fee is illusory. A one-way cap that protects only the Vendor, or language stating the Customer's liability is unlimited, is a deviation.

Redline guidance:
Edit the existing sentence(s); do not rewrite the section. Change the basis to 12 months' fees, make the cap mutual, and add one carve-out sentence. If Customer is uncapped, add Customer to the cap. Comment: state the position and that indemnities/confidentiality sit outside the cap.

Model language:
Except for Excluded Claims, each party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the fees paid or payable by Customer under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000. "Excluded Claims" means a party's breach of its confidentiality, data protection or security obligations, its indemnification obligations, its gross negligence, wilful misconduct or fraud, and its infringement of the other party's intellectual property rights.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-lol-cap-9dedb687` · **deviation** · confidence 0.86
- Location: § 9.1 IBM's Limitation of Liability
- Quote: “the amount of any other actual direct damages, up to the greater of $100,000 or the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim related to the Services”
- Rationale: The cap itself is mutual and at 12 months' charges (with a $100,000 floor), which is acceptable, but the only carve-outs are indemnity payments and bodily injury/property damage. Our position requires carve-outs at least for confidentiality, data protection/security, gross negligence and wilful misconduct, and we cannot accept the blanket exclusion of liability for loss of or damage to our records or data in Section 9.1(c)(2) for a hosting vendor.
- Proposal: **preferred** — The cap itself is mutual and at 12 months' charges (with a $100,000 floor), which is acceptable, but the only carve-outs are indemnity payments and bodily injury/property damage. Our position requires carve-outs at least for confidentiality, data protection/security, gross negligence and wilful misconduct, and we cannot accept the blanket exclusion of liability for loss of or damage to our records or data in Section 9.1(c)(2) for a hosting vendor.
- Comment: [Playbook] We accept the mutual 12-month cap, but indemnities, confidentiality, data protection/security, gross negligence and wilful misconduct must sit outside it. Please also delete the exclusion of liability for loss of or damage to our records or data (9.1(c)(2)) — that is the core risk in a hosting arrangement.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "The foregoing limit also applies to any of IBM's Affiliates and Subcontractors. The foregoing limits and exclusions do not apply to a party's breach of its confidentiality obligations, its gross negligence, wilful misconduct or fraud, or to IBM's breach of its data protection or security obligations.",
    "oldText": "The foregoing limit also applies to any of IBM's Affiliates and Subcontractors.",
    "paragraphId": "p0112"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## INDEMN — Indemnification by Vendor

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: INDEMN
Title: Indemnification by Vendor
Kind: missing
Summary: Vendor must indemnify Customer for third-party IP claims and its own misconduct; Customer's indemnity stays narrow.
Severity: critical
Category: indemnity
Position — preferred:
Vendor defends and indemnifies Customer (and affiliates) against third-party claims alleging the services or deliverables infringe IP, arising from Vendor's breach of law, data breach caused by Vendor, or gross negligence/wilful misconduct; standard procedure (notice, control, cooperation); Customer's indemnity limited to Customer-provided content and Customer's breach of law.

Position — fallback:
Vendor IP indemnity with usual exclusions (Customer modifications, combinations, specifications) and remedies (procure, modify, replace, refund); Vendor indemnity subject to a super-cap of 3× annual fees.

Position — walk-away:
No Vendor IP indemnity at all, or a one-way Customer indemnity for Vendor's services.
Detection guidance:
Locate indemnification / hold harmless / defence language. Deviation if Vendor indemnity is absent, or only Customer indemnifies, or Vendor's indemnity excludes IP infringement. Presence of a narrow Customer indemnity alone does not satisfy this rule.

Redline guidance:
If absent, insert a Vendor indemnity paragraph after the limitation-of-liability or warranty section (or the last numbered section before "General"). If one-sided, add the Vendor obligation and narrow Customer's.

Model language:
Vendor shall defend, indemnify and hold harmless Customer and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of applicable law; (c) any unauthorised access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-indemn-a994223b` · **compliant** · confidence 0.70
- Location: § 8.1 Indemnification by IBM
- Quote: “then IBM will indemnify, defend and hold harmless the Customer, its Enterprise and their respective employees, officers, agents and directors against that claim or threatened claim at IBM's expense”
- Rationale: IBM gives an IP infringement defence and indemnity for Materials and Base Components with the usual exclusions (our content, modifications, combinations) and procure/modify/replace/credit remedies, and indemnity payments sit outside the liability cap. This sits at our fallback. Worth noting for negotiation (not redlined here): the indemnity does not extend to IBM's breach of law, data breach or wilful misconduct, and our indemnity in 8.2(a)(3) for any Services Recipient claim "related, directly or indirectly, to the Services" is broader than we would normally give, although 8.2(c) mitigates it.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## NONCOMPETE — Non-compete restrictions on Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: NONCOMPETE
Title: Non-compete restrictions on Customer
Kind: presence
Summary: We do not accept restrictions on the businesses we may operate or the products we may buy or build.
Severity: high
Category: restrictive-covenants
Position — preferred:
No non-compete or field-of-use restriction on Customer.
Position — fallback:
Restriction limited to a named competing product, during the term only, capped at 12 months, with a carve-out for internal development and acquisitions.

Position — walk-away:
Post-term non-compete longer than 12 months, or undefined scope ("any competing business").
Detection guidance:
Look for "shall not … develop/market/sell/engage in", "competing products", "compete with Vendor", field-of-use or territory restrictions binding Customer. Restrictions binding the Vendor are fine.

Redline guidance:
Delete the restriction on Customer; if the vendor relationship plausibly needs protection, narrow to the fallback. Comment: we cannot restrict our business; offer the narrowed fallback.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-noncompete-ab397129` · **compliant** · confidence 0.82
- Location: § 14.16 Freedom of Action
- Quote: “Each party is free to enter into similar agreements with others.”
- Rationale: No non-compete or field-of-use restriction binds us; Section 14.16 expressly preserves each party's freedom of action. The no-resale limitation in 14.11 is an ordinary scope restriction on the Services rather than a restraint on our business.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## EXCLUSIVITY — Exclusivity obligations binding Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: EXCLUSIVITY
Title: Exclusivity obligations binding Customer
Kind: presence
Summary: We keep the freedom to buy from other suppliers.
Severity: high
Category: restrictive-covenants
Position — preferred:
No exclusivity or "sole supplier" obligation on Customer.
Position — fallback:
Exclusivity limited to a defined product category and 12 months, ending automatically on Vendor's failure to meet service levels or delivery dates.

Position — walk-away:
Exclusive dealing for the full term with no performance-based exit.
Detection guidance:
Phrases like "exclusive", "sole and exclusive provider", "shall purchase all of its requirements from", "shall not procure … from any third party". Exclusivity granted to Customer (e.g. Vendor won't serve our competitors) is acceptable and not a deviation.

Redline guidance:
Delete or narrow to the fallback; keep any exclusivity that benefits Customer.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-exclusivity-d65818de` · **compliant** · confidence 0.90
- Location: § 14.16 Freedom of Action
- Quote: “Each party is free to enter into similar agreements with others.”
- Rationale: There is no exclusivity or sole-supplier obligation on us; we remain free to procure equivalent services elsewhere.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## MFN — Most-favoured-nation obligations burdening Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: MFN
Title: Most-favoured-nation obligations burdening Customer
Kind: direction
Summary: MFN in our favour is welcome; an MFN that obliges us to give the Vendor best terms is not.
Severity: medium
Category: commercial
Position — preferred:
No MFN obligation on Customer (MFN pricing in Customer's favour is welcome).
Position — fallback:
MFN limited to a defined product, for 12 months, with reasonable-comparison carve-outs.
Position — walk-away:
Open-ended obligation to extend to Vendor any better terms given to any third party.
Detection guidance:
Identify who benefits from the MFN. Flag only when Customer must offer Vendor terms no less favourable than those given to others, or must match third-party offers. If the Vendor grants Customer best pricing, mark compliant and do not redline.

Redline guidance:
Delete the obligation on Customer; keep any Vendor-granted MFN.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-mfn-8c026654` · **compliant** · confidence 0.85
- Location: § 4.1 Charges
- Quote: “Charges for applicable Services will be specified in Service Option Attachments and Order Forms.”
- Rationale: No most-favoured-nation obligation is imposed on us anywhere in the Base Terms.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## NOSOLICIT — Non-solicitation of employees binding Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: NOSOLICIT
Title: Non-solicitation of employees binding Customer
Kind: presence
Summary: We accept only narrow, time-limited non-solicits with a general-advertising carve-out.
Severity: medium
Category: restrictive-covenants
Position — preferred:
No non-solicit on Customer.
Position — fallback:
Mutual non-solicit limited to personnel directly involved in the services, 12 months from the end of their involvement, with carve-outs for general advertisements and unsolicited approaches; no "no-hire".

Position — walk-away:
No-hire provisions, or restrictions longer than 24 months or covering all Vendor personnel.
Detection guidance:
"shall not solicit", "employ or engage", "no-hire", "induce … to leave". Determine duration, scope (all employees vs those involved) and whether a general-solicitation carve-out exists.

Redline guidance:
Narrow to the fallback with minimal edits (duration, scope, carve-out sentence). Delete any no-hire.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-nosolicit-a50e8627` · **compliant** · confidence 0.88
- Location: § 14.8 Personnel
- Quote: “Each party is responsible for the supervision, direction, and control of its respective personnel.”
- Rationale: No non-solicitation or no-hire restriction binds us, which matches our preferred position.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: T4C
Title: Termination for convenience
Kind: parametric
Summary: We can leave on notice without penalty; the Vendor cannot walk away mid-term.
Severity: high
Category: term-termination
Position — preferred:
Customer may terminate for convenience on 30 days' written notice with a pro-rata refund of prepaid fees; Vendor has no termination-for-convenience right during a committed term.

Position — fallback:
Customer termination on 60–90 days' notice; early-termination fee not exceeding 3 months' fees; Vendor may terminate for convenience only at the end of a term on 90 days' notice.

Position — walk-away:
No Customer right to terminate for convenience in a multi-year term; Vendor termination for convenience on fewer than 90 days' notice.

Detection guidance:
Find termination provisions. Determine which party may terminate without cause, the notice period, and any early-termination fee. Absence of any Customer convenience right in a term longer than 12 months is a deviation (kind: missing behaviour); a Vendor convenience right on short notice is a deviation.

Redline guidance:
Add or edit a Customer convenience right (30 days), delete/limit Vendor's convenience right, replace penalties with the fallback fee cap.

Model language:
Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, in which case Vendor shall refund any prepaid fees for the period after the effective date of termination.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-t4c-a993319e` · **compliant** · confidence 0.80
- Location: § 3.4 Termination for Convenience
- Quote: “Customer may terminate this Agreement (including all Service Option Attachments) or any Service Option Attachment ... for convenience at the end of any calendar month by: a. providing at least one month's prior written notice to IBM”
- Rationale: We have a convenience right on one month's notice and IBM has no convenience right during the term, which meets our preferred position on notice. The uncapped early-termination charges referenced in 3.4(b) are addressed under the liquidated-damages rule rather than flagged twice here.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: RENEWAL
Title: Auto-renewal and non-renewal notice window
Kind: parametric
Summary: Renewals must be easy to exit and priced predictably.
Severity: medium
Category: term-termination
Position — preferred:
Renewal only by mutual written agreement; or automatic 12-month renewals that Customer may opt out of on 30 days' notice, with a Vendor reminder 60 days before renewal; price increases capped at the lesser of CPI and 3 %.

Position — fallback:
Automatic renewal with a non-renewal notice window of no more than 60 days; price increases ≤ 5 %.
Position — walk-away:
Non-renewal notice windows longer than 90 days, or automatic multi-year renewals.
Detection guidance:
"automatically renew", "unless either party gives notice … days prior", renewal term length, price uplift language. Compute the notice window in days and the renewal term length.

Redline guidance:
Shorten the notice window (≤ 30, fallback ≤ 60 days), set renewal term to 12 months, cap uplift.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-renewal-be8c0d9f` · **deviation** · confidence 0.85
- Location: § 3.2 Renewal
- Quote: “will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term”
- Rationale: A 90-day non-renewal window exceeds our fallback ceiling of 60 days, and renewal for a term "equal in duration to the previous term" can lock us into automatic multi-year renewals. We have shortened the window to 30 days and fixed renewals at 12 months.
- Proposal: **preferred** — A 90-day non-renewal window exceeds our fallback ceiling of 60 days, and renewal for a term "equal in duration to the previous term" can lock us into automatic multi-year renewals. We have shortened the window to 30 days and fixed renewals at 12 months.
- Comment: [Playbook] Our position is a non-renewal window of no more than 30 days (60 days at the outside) and renewals of no more than 12 months, so we are not auto-committed to a further multi-year term. We can accept 60 days if that helps.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Each Service Option Attachment will renew automatically for an additional term of twelve (12) months (or the previous term, if shorter) unless either party notifies the other party in writing at least thirty (30) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.",
    "oldText": "Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.",
    "paragraphId": "p0040"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: GOVLAW
Title: Governing law and venue
Kind: parametric
Summary: Accepted laws are New York, Delaware, California, or England and Wales; courts, not foreign arbitration.
Severity: medium
Category: governing-law
Position — preferred:
Laws of the State of New York; exclusive jurisdiction of the state and federal courts in New York County.
Position — fallback:
Delaware or California law and courts; or the laws of England and Wales with the courts of London.
Position — walk-away:
Vendor's home jurisdiction outside the accepted list with exclusive foreign venue, or mandatory arbitration seated abroad.
Detection guidance:
Find the governing-law clause; extract jurisdiction and dispute forum; note any arbitration seat.
Redline guidance:
Replace only the jurisdiction words and forum; keep the rest of the sentence intact.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-govlaw-f8c01cd3` · **compliant** · confidence 0.90
- Location: § 14.3 Choice of Law
- Quote: “This Agreement will be governed by the substantive laws of the State of New York, without regard for its conflict of laws provisions.”
- Rationale: New York law is our preferred position and there is no foreign arbitration. The agreement is silent on exclusive venue; we would normally add the state and federal courts in New York County, but this is a drafting point rather than a deviation.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: ASSIGN
Title: Assignment and change of control
Kind: parametric
Summary: We may assign to affiliates and successors; the Vendor may not exit on our change of control.
Severity: high
Category: assignment
Position — preferred:
Customer may assign without consent to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets; Vendor may not assign without Customer's consent (not to be unreasonably withheld) and never to a Customer competitor; no Vendor termination right on Customer's change of control.

Position — fallback:
Mutual right to assign to successors with written notice; consent for other assignments not unreasonably withheld.
Position — walk-away:
Blanket prohibition on Customer assignment with no M&A carve-out, or a Vendor right to terminate or re-price on Customer's change of control.

Detection guidance:
"may not assign", "change of control", "deemed an assignment", consent standards. Determine whether the restriction binds Customer symmetrically and whether change-of-control triggers any Vendor right.

Redline guidance:
Add the affiliate/successor carve-out for Customer; delete change-of-control termination rights against Customer.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-assign-db27bd9c` · **compliant** · confidence 0.75
- Location: § 14.10 Assignment
- Quote: “Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.”
- Rationale: We have an M&A/successor carve-out and consent for other assignments cannot be unreasonably withheld, and there is no vendor termination or re-pricing right on our change of control — this sits at the fallback. We would still prefer an express affiliate carve-out and a reciprocal consent requirement on IBM, which is unrestricted here.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: IP
Title: Ownership of deliverables and Customer Data
Kind: direction
Summary: We own what we pay for and everything we put in; no assignment of our IP or data to the Vendor.
Severity: critical
Category: ip-data
Position — preferred:
Customer owns deliverables and work product created for it (Vendor assigns); Vendor retains pre-existing IP and grants Customer a perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in deliverables; Customer retains all rights in Customer Data; no joint ownership.

Position — fallback:
Vendor owns generic tools and know-how; Customer receives a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables for its business.

Position — walk-away:
Assignment of Customer IP or Customer Data to Vendor; joint ownership without an unrestricted right to exploit.
Detection guidance:
Ownership/assignment language: who owns "Deliverables", "Work Product", "Customer Data", improvements, feedback. Flag when Customer assigns IP or data to Vendor, when Vendor owns deliverables with no licence back, or when joint ownership is created. Vendor keeping ownership of its platform is fine.

Redline guidance:
Reverse the direction of the assignment or add the licence-back; add a Customer Data ownership sentence; delete joint ownership.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-ip-add8ba6a` · **deviation** · confidence 0.72
- Location: § 5.4 Other Disclaimers
- Quote: “IBM grants Customer an irrevocable, nonexclusive, worldwide, paid-up license to use, execute, reproduce, display, perform, and distribute, within Customer's Enterprise only, copies of Type II Materials.”
- Rationale: Materials default to Type II (IBM-owned) if not otherwise specified, and the licence back to us omits any right to modify, prepare derivative works or sublicense and is confined to our US Enterprise — short of the perpetual, worldwide licence to use, modify and sublicense deliverables for our business that our fallback requires. There is also no statement that we retain rights in our Content/Customer Data.
- Proposal: **preferred** — Materials default to Type II (IBM-owned) if not otherwise specified, and the licence back to us omits any right to modify, prepare derivative works or sublicense and is confined to our US Enterprise — short of the perpetual, worldwide licence to use, modify and sublicense deliverables for our business that our fallback requires. There is also no statement that we retain rights in our Content/Customer Data.
- Comment: [Playbook] We must be able to use, modify and sublicense deliverables we have paid for, and our data ownership should be stated expressly. IBM keeps ownership of its pre-existing tools and platform, which we accept.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "IBM grants Customer a perpetual, irrevocable, nonexclusive, worldwide, paid-up license to use, execute, reproduce, display, perform, modify, prepare derivative works of, distribute and sublicense copies of Type II Materials for Customer's business purposes, including by Customer's Affiliates and contractors acting on Customer's behalf. As between the parties, Customer retains all right, title and interest in the Content and all other Customer data.",
    "oldText": "IBM grants Customer an irrevocable, nonexclusive, worldwide, paid-up license to use, execute, reproduce, display, perform, and distribute, within Customer's Enterprise only, copies of Type II Materials.",
    "paragraphId": "p0085"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: LICENSE
Title: Licence grant scope
Kind: parametric
Summary: The licence must cover our affiliates and contractors and must not be revocable at will.
Severity: high
Category: licence
Position — preferred:
Licence extends to Customer's affiliates and to contractors acting on Customer's behalf; paid-up licences are perpetual and irrevocable; subscription licences terminable only for uncured material breach; transferable to successors.

Position — fallback:
Affiliates covered on written notice; transferable to a successor in an M&A transaction.
Position — walk-away:
Licence revocable at Vendor's discretion; affiliates and contractors excluded with no path to add them.
Detection guidance:
Find the grant clause: "non-exclusive, non-transferable", "revocable", "solely for Customer's internal use", whether affiliates/contractors are named, term of the licence.

Redline guidance:
Insert "and its Affiliates and contractors acting on its behalf", delete "revocable", add successor transfer.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-license-10f35953` · **deviation** · confidence 0.83
- Location: § 12.1 License
- Quote: “IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.”
- Rationale: A licence revocable at IBM's discretion, with no coverage for our Affiliates or contractors and no path to add them, is walk-away territory under our playbook. The licence should be terminable only on termination of the Agreement and should extend to Affiliates and contractors acting for us.
- Proposal: **preferred** — A licence revocable at IBM's discretion, with no coverage for our Affiliates or contractors and no path to add them, is walk-away territory under our playbook. The licence should be terminable only on termination of the Agreement and should extend to Affiliates and contractors acting for us.
- Comment: [Playbook] We cannot rely on a licence that is revocable at will, and our Affiliates and contractors use the hosted environment. This edit keeps the scope limited to the Services.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "IBM grants Customer, its Affiliates and its contractors acting on Customer's behalf a nonexclusive license to use the Base Components solely in connection with the Services as provided under this Agreement, which license IBM may terminate only upon expiration or termination of this Agreement or the applicable Service Option Attachment.",
    "oldText": "IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.",
    "paragraphId": "p0149"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: AUDIT
Title: Audit rights against Customer
Kind: parametric
Summary: Audits of our usage must be rare, notified, off-site where possible and at the Vendor's cost.
Severity: medium
Category: audit
Position — preferred:
No more than once per 12 months, on 30 days' written notice, during business hours, by an independent auditor bound by confidentiality, at Vendor's cost unless underpayment exceeds 5 %; no direct access to Customer systems.

Position — fallback:
Once per year on 15 days' notice; Vendor bears cost unless underpayment exceeds 10 %.
Position — walk-away:
Unlimited or unannounced audits, or remote access to Customer systems.
Detection guidance:
Find audit/inspection/verification rights binding Customer; extract frequency, notice, cost allocation, system access.
Redline guidance:
Insert the frequency/notice/cost limits with minimal edits; delete system-access language.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-audit-8a9b4e30` · **compliant** · confidence 0.70
- Location: § 11.3 Suspected Violations
- Quote: “IBM reserves the right to investigate potential violations of the representations and warranties in Subsection 11.2(b).”
- Rationale: There is no usage or licence-verification audit right against us. The 11.3 investigation right is limited to Acceptable Use Policy compliance and carries a notification obligation, so no redline is proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: LD
Title: Liquidated damages and penalties payable by Customer
Kind: direction
Summary: Service credits to us are welcome; liquidated damages against us are not.
Severity: high
Category: commercial
Position — preferred:
No liquidated damages or penalties payable by Customer.
Position — fallback:
Early-termination fee capped at 3 months' fees as the sole liquidated amount.
Position — walk-away:
Liquidated damages exceeding the remaining contract value or triggered by minor breaches.
Detection guidance:
Identify liquidated damages, penalties, minimum fees on termination, "shall pay … as liquidated damages". Flag only when Customer pays. Service credits or LDs payable by Vendor to Customer are compliant.

Redline guidance:
Delete the Customer-payable LD; if an early-termination fee is unavoidable, cap it at 3 months' fees.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-ld-6511677b` · **deviation** · confidence 0.78
- Location: § 3.4 Termination for Convenience
- Quote: “paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments”
- Rationale: Early-termination charges payable by us are left entirely to the attachments with no ceiling. Our fallback allows an early-termination fee only if capped at three months' fees, so we have added that cap in the Base Terms (which govern over the attachments).
- Proposal: **preferred** — Early-termination charges payable by us are left entirely to the attachments with no ceiling. Our fallback allows an early-termination fee only if capped at three months' fees, so we have added that cap in the Base Terms (which govern over the attachments).
- Comment: [Playbook] We do not accept uncapped termination penalties; if an early-termination charge is unavoidable it must be capped at three months' fees.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such charges will not in the aggregate exceed three (3) months' recurring charges for the terminated Service Option Attachment and will be IBM's sole remedy for such termination.",
    "oldText": "b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.",
    "paragraphId": "p0046"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: WARRANTY
Title: Performance warranty and duration
Kind: parametric
Summary: The Vendor must stand behind its work for a meaningful period with a real remedy.
Severity: medium
Category: warranty
Position — preferred:
Services performed in a professional and workmanlike manner; deliverables/software conform to documentation for 12 months (software) or 90 days (services) with repair, replace or refund; compliance with laws; no malicious code.

Position — fallback:
90 days for software, 30 days for services; same remedies.
Position — walk-away:
"AS IS" with all warranties disclaimed and no conformance warranty at all.
Detection guidance:
Find warranty and disclaimer sections; extract the warranty period and remedy; note whether the disclaimer swallows the express warranty. A missing express warranty is a deviation (insert).

Redline guidance:
Extend the period, add the remedy sentence, carve the express warranty out of the disclaimer.
Model language:
Vendor warrants that (a) the Services will be performed in a professional and workmanlike manner consistent with industry standards; and (b) for a period of ninety (90) days following delivery, each Deliverable will conform in all material respects to its documentation. Customer's remedy for breach of this warranty is, at Vendor's option, re-performance, repair or replacement, or a refund of the fees paid for the non-conforming Services or Deliverable.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-warranty-a486a474` · **deviation** · confidence 0.80
- Location: § 5.1 IBM Representations and Warranties
- Quote: “IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES, PRODUCTS, DATA, APPARATUS AND SOFTWARE "AS IS", WITHOUT WARRANTY OF ANY KIND”
- Rationale: We have a reasonable care and skill warranty for the Services but no conformance warranty and no stated remedy, and the Materials we pay for are supplied "AS IS". That fails our fallback of a 90-day conformance warranty with repair/replace/refund; we have added the warranty, remedy and a carve-out from the disclaimers.
- Proposal: **preferred** — We have a reasonable care and skill warranty for the Services but no conformance warranty and no stated remedy, and the Materials we pay for are supplied "AS IS". That fails our fallback of a 90-day conformance warranty with repair/replace/refund; we have added the warranty, remedy and a carve-out from the disclaimers.
- Comment: [Playbook] We need a conformance warranty (90 days) with a real remedy, and the express warranties must survive the "AS IS" disclaimer for IBM-provided Materials.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "IBM covenants that it will comply with the laws applicable to IBM's business. IBM further warrants that, for a period of ninety (90) days following delivery, each item of Materials will conform in all material respects to its documentation and will be free of malicious code. Customer's remedy for breach of the warranties in this Section 5.1 is, at IBM's option, re-performance, repair or replacement or, if IBM does not cure within thirty (30) days, a refund of the charges paid for the non-conforming Services or Materials. The warranties in this Section 5.1 are not limited or disclaimed by Sections 5.2 or 5.4.",
    "oldText": "IBM covenants that it will comply with the laws applicable to IBM's business.",
    "paragraphId": "p0063"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: INSURANCE
Title: Vendor insurance
Kind: missing
Summary: Vendors that touch our data or premises carry standard insurance.
Severity: low
Category: insurance
Position — preferred:
Commercial general liability USD 1M per occurrence / 2M aggregate; professional (E&O) USD 2M; cyber/privacy USD 5M for vendors processing Customer Data; workers' compensation as required by law; certificates on request.

Position — fallback:
E&O USD 1M and cyber USD 2M.
Position — walk-away:
No insurance for a vendor that processes personal data or works on our premises.
Detection guidance:
Look for an insurance clause; if absent for a services/hosting vendor, deviation (insert).
Redline guidance:
Insert a short insurance paragraph in the general/miscellaneous section.
Model language:
Vendor shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and, where Vendor processes Customer Data, cyber liability insurance of not less than USD 5,000,000. Vendor shall provide certificates of insurance on request.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-insurance-9533fd98` · **missing** · confidence 0.80
- Location: § 14.12 Risk of Loss
- Quote: “Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer.”
- Rationale: There is no insurance clause, which we do not accept for a hosting vendor processing our data and content. We have inserted a short insurance paragraph in the General section; E&O USD 1M and cyber USD 2M is our fallback.
- Proposal: **preferred** — There is no insurance clause, which we do not accept for a hosting vendor processing our data and content. We have inserted a short insurance paragraph in the General section; E&O USD 1M and cyber USD 2M is our fallback.
- Comment: [Playbook] Vendors hosting our environment and data carry standard CGL, E&O and cyber cover; we can work down to E&O USD 1M and cyber USD 2M if needed.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer. IBM shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and, where IBM processes Customer data, cyber liability insurance of not less than USD 5,000,000. IBM shall provide certificates of insurance on request.",
    "oldText": "Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer.",
    "paragraphId": "p0192"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: MINCOMMIT
Title: Minimum purchase commitments and volume restrictions on Customer
Kind: presence
Summary: We do not take-or-pay without an exit.
Severity: medium
Category: commercial
Position — preferred:
No minimum commitment; fees are for usage or ordered services only.
Position — fallback:
Commitment limited to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a penalty.
Position — walk-away:
Multi-year take-or-pay commitments with no reduction or termination right.
Detection guidance:
"minimum", "commit to purchase", "take or pay", "shortfall", volume caps on Customer usage. Commitments the Vendor makes to us are fine.
Redline guidance:
Delete or narrow to the fallback with minimal edits; replace shortfall penalties with a true-up.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-mincommit-863e1877` · **compliant** · confidence 0.65
- Location: § 4.1 Charges
- Quote: “Charges can be specified as one-time, installment, recurring, or usage.”
- Rationale: The Base Terms impose no minimum purchase or take-or-pay commitment; charges follow the Services ordered. We should confirm the Order Forms and Service Option Attachments contain no shortfall or minimum-volume language.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[baseline system prompt](prompts.md#prompt-baseline) · [seq 3](trajectory.jsonl#L3)

```text
ID: TRANSITION
Title: Post-termination transition assistance and data return
Kind: missing
Summary: When it ends, we get our data back and help moving.
Severity: medium
Category: transition
Position — preferred:
On expiry or termination, Vendor provides transition assistance for up to 6 months at then-current rates, returns Customer Data in a standard machine-readable format within 30 days, and certifies deletion thereafter.

Position — fallback:
90 days of transition assistance; data export within 30 days.
Position — walk-away:
No data return, or immediate deletion of Customer Data on termination.
Detection guidance:
Look for transition, exit, data return/export, deletion timing. Absence in a services/hosting agreement is a deviation (insert).
Redline guidance:
Insert a transition-assistance and data-return paragraph in the termination section.
Model language:
Upon expiry or termination of this Agreement for any reason, Vendor shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates; (b) within thirty (30) days, return all Customer Data in a commonly used, machine-readable format; and (c) thereafter delete Customer Data from its systems and certify such deletion in writing.
```

### Tool trace

No rule-scoped tool events were recorded (single-prompt and deterministic stages do not call tools).

### Submitted finding

- Source: final run state
- Finding: `f-transition-8f886620` · **missing** · confidence 0.85
- Location: § 3.5 Effect of&sbsp;Termination
- Quote: “Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable.”
- Rationale: The termination provisions address only our payment obligations — there is no transition assistance, no return of our Content/data in a usable format and no deletion certification. For a hosting agreement this is a material gap; we have inserted the standard exit paragraph.
- Proposal: **preferred** — The termination provisions address only our payment obligations — there is no transition assistance, no return of our Content/data in a usable format and no deletion certification. For a hosting agreement this is a material gap; we have inserted the standard exit paragraph.
- Comment: [Playbook] On exit we need our data back and reasonable help migrating; 90 days of assistance is our fallback if six months is not workable.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. Upon expiration or termination of this Agreement or any Service Option Attachment for any reason, IBM shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at IBM's then-current rates; (b) within thirty (30) days, return all Content and other Customer data in a commonly used, machine-readable format; and (c) thereafter delete such Content and data from its systems and certify such deletion in writing.",
    "oldText": "Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable.",
    "paragraphId": "p0049"
  }
]
```

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

No memo LLM call was made; this configuration used the deterministic memo renderer.

```markdown
# Issues memo: 3.1 Term

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | compliant | § 8.1 Indemnification by IBM |
| critical | Ownership of deliverables and Customer Data | deviation | § 5.4 Other Disclaimers |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § 9.1 IBM's Limitation of Liability |
| high | Assignment and change of control | compliant | § 14.10 Assignment |
| high | Exclusivity obligations binding Customer | compliant | § 14.16 Freedom of Action |
| high | Liquidated damages and penalties payable by Customer | deviation | § 3.4 Termination for Convenience |
| high | Licence grant scope | deviation | § 12.1 License |
| high | Non-compete restrictions on Customer | compliant | § 14.16 Freedom of Action |
| high | Termination for convenience | compliant | § 3.4 Termination for Convenience |
| medium | Audit rights against Customer | compliant | § 11.3 Suspected Violations |
| medium | Governing law and venue | compliant | § 14.3 Choice of Law |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § 4.1 Charges |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § 4.1 Charges |
| medium | Non-solicitation of employees binding Customer | compliant | § 14.8 Personnel |
| medium | Auto-renewal and non-renewal notice window | deviation | § 3.2 Renewal |
| medium | Post-termination transition assistance and data return | missing | § 3.5 Effect of&sbsp;Termination |
| medium | Performance warranty and duration | deviation | § 5.1 IBM Representations and Warranties |
| low | Vendor insurance | missing | § 14.12 Risk of Loss |

## Walk-away items

- Ownership of deliverables and Customer Data (§ 5.4 Other Disclaimers): Materials default to Type II (IBM-owned) if not otherwise specified, and the licence back to us omits any right to modify, prepare derivative works or sublicense and is confined to our US Enterprise — short of the perpetual, worldwide licence to use, modify and sublicense deliverables for our business that our fallback requires. There is also no statement that we retain rights in our Content/Customer Data.
- Limitation of liability — cap, mutuality and carve-outs (§ 9.1 IBM's Limitation of Liability): The cap itself is mutual and at 12 months' charges (with a $100,000 floor), which is acceptable, but the only carve-outs are indemnity payments and bodily injury/property damage. Our position requires carve-outs at least for confidentiality, data protection/security, gross negligence and wilful misconduct, and we cannot accept the blanket exclusion of liability for loss of or damage to our records or data in Section 9.1(c)(2) for a hosting vendor.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
