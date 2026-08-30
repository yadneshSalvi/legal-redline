# Trajectory: synth-13

| Run | Value |
|---|---|
| Contract | synth-13 — MASTER SERVICES AGREEMENT |
| Config | b1-prompt |
| Parties | Meridian Fieldworks, Inc. (our party) ↔ Copperleaf Technology Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 10.7s (70,689 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 18,447 input · 6,938 output · 1,194 cache read · 0 cache write |
| Cost | $0.266282 |

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
- Finding: `f-lol-cap-99743d6a` · **deviation** · confidence 0.95
- Location: § 21.1 Each Party's aggregate liability shall not exceed Fees actu…
- Quote: “21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.”
- Rationale: A one-month fee cap is far below our walk-away floor of six months' fees, and "without exception" would override the Excluded Claims regime in 21.3 (confidentiality, data protection, indemnities, gross negligence, wilful misconduct, fraud, IP infringement). Our position is a mutual cap at the greater of 12 months' fees and USD 1,000,000, with indemnities and confidentiality outside the cap.
- Proposal: **preferred** — A one-month fee cap is far below our walk-away floor of six months' fees, and "without exception" would override the Excluded Claims regime in 21.3 (confidentiality, data protection, indemnities, gross negligence, wilful misconduct, fraud, IP infringement). Our position is a mutual cap at the greater of 12 months' fees and USD 1,000,000, with indemnities and confidentiality outside the cap.
- Comment: [Playbook] We have moved the cap to the greater of 12 months' Fees and USD 1,000,000 on a mutual basis; a one-month cap is below our minimum. We also removed "without exception" so that the Excluded Claims in 21.3 (indemnities, confidentiality, data protection and security, gross negligence, wilful misconduct, fraud and IP infringement) sit outside the cap, as 21.3 already contemplates.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve months immediately preceding the event giving rise to the claim and (b) USD 1,000,000.",
    "oldText": "21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.",
    "paragraphId": "p0082"
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
- Finding: `f-indemn-24c442f6` · **deviation** · confidence 0.95
- Location: § 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and…
- Quote: “20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.”
- Rationale: The Agreement contains only a broad one-way Customer indemnity and no Vendor IP-infringement indemnity, which is walk-away territory for us. Note also that Section 9.3 cross-refers to remedies "required by Section 20.5", which does not exist.
- Proposal: **preferred** — The Agreement contains only a broad one-way Customer indemnity and no Vendor IP-infringement indemnity, which is walk-away territory for us. Note also that Section 9.3 cross-refers to remedies "required by Section 20.5", which does not exist.
- Comment: [Playbook] We added the Vendor indemnity (IP infringement, breach of law, data breach and wilful misconduct) and narrowed Customer's indemnity to Customer content and Customer's breach of law; a one-way Customer indemnity is not acceptable. We also supplied the Section 20.5 remedies that Section 9.3 already cross-references.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "20. INDEMNIFICATION 20.1 Vendor shall defend, indemnify and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorised access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct. 20.2 Customer shall defend, indemnify and hold harmless Vendor against third-party claims to the extent arising out of Customer-provided content or Customer's breach of Applicable Law. 20.3 The indemnified party shall give prompt notice, allow the indemnifying party to control the defence, and provide reasonable cooperation at the indemnifying party's expense; no settlement imposing liability on the indemnified party may be made without its consent. 20.4 If the Services or a Deliverable are alleged to infringe, Vendor shall at its expense procure the right to continue use, modify or replace the item so it is non-infringing, or refund the Fees paid for it. 20.5 The remedies in Section 20.4 are the remedies referenced in Section 9.3.",
    "oldText": "20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.",
    "paragraphId": "p0080"
  }
]
```

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
- Finding: `f-noncompete-768576ee` · **deviation** · confidence 0.96
- Location: § 12.4 During the term and for twenty-four months thereafter, Cust…
- Quote: “12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.”
- Rationale: A 24-month post-term, undefined-scope, worldwide non-compete on Customer is walk-away territory and directly contradicts Section 12.3. We cannot restrict the businesses we operate or the products we build or buy.
- Proposal: **preferred** — A 24-month post-term, undefined-scope, worldwide non-compete on Customer is walk-away territory and directly contradicts Section 12.3. We cannot restrict the businesses we operate or the products we build or buy.
- Comment: [Playbook] We deleted the non-compete: we cannot accept restrictions on the products or services we develop, buy or sell, and this clause also contradicts Section 12.3. If Vendor needs protection we could consider a restriction limited to a single named product during the term only, with carve-outs for internal development and acquisitions.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "12.4 [Intentionally omitted.]",
    "oldText": "12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.",
    "paragraphId": "p0050"
  }
]
```

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
- Finding: `f-exclusivity-75577550` · **deviation** · confidence 0.94
- Location: § 2.2 Vendor will be Customer's sole and exclusive provider of ho…
- Quote: “2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.”
- Rationale: Full-term exclusive dealing with no performance-based exit is walk-away territory, and it contradicts Section 12.3, which confirms Customer has made no exclusivity commitment. We must retain freedom to use other suppliers.
- Proposal: **preferred** — Full-term exclusive dealing with no performance-based exit is walk-away territory, and it contradicts Section 12.3, which confirms Customer has made no exclusivity commitment. We must retain freedom to use other suppliers.
- Comment: [Playbook] We removed the sole-provider obligation; we do not grant exclusivity and this clause conflicts with Section 12.3. If some exclusivity is commercially essential, our fallback is a defined product category for 12 months, terminating automatically if Vendor misses service levels.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.2 Customer is free to procure services of any kind from any third party. Nothing in this Agreement grants Vendor exclusivity or requires Customer to source any minimum share of its requirements from Vendor.",
    "oldText": "2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.",
    "paragraphId": "p0013"
  }
]
```

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
- Finding: `f-mfn-e6e5a72a` · **compliant** · confidence 0.85
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: No most-favoured-nation obligation is imposed on Customer, which is our preferred position.

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
- Finding: `f-nosolicit-d2128ed3` · **compliant** · confidence 0.85
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: No non-solicitation or no-hire obligation binds Customer; Section 12.3 expressly preserves our hiring freedom. Preferred position met.

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
- Finding: `f-t4c-ef7a676d` · **compliant** · confidence 0.90
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor.”
- Rationale: Meets our preferred position: 30 days' notice, pro-rata refund of prepaid Fees, and no Vendor convenience right during a committed term. Note the take-or-pay in Section 2.1 undercuts this in practice and is flagged separately under MINCOMMIT.

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
- Finding: `f-renewal-9e59c74b` · **compliant** · confidence 0.95
- Location: § 8.2 Each Order Form has the initial term stated in it and there…
- Quote: “renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal”
- Rationale: Preferred position met: 12-month renewals, 30-day opt-out, 60-day Vendor reminder with deadline extension, and uplift capped at the lesser of CPI and 3%.

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
- Finding: `f-govlaw-5f959d2a` · **compliant** · confidence 0.97
- Location: § 28.1 This Agreement and each dispute arising from it are governe…
- Quote: “governed by the laws of the State of New York”
- Rationale: New York law with exclusive jurisdiction in New York County state and federal courts is our preferred position; no foreign arbitration.

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
- Finding: `f-assign-25ad2548` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service.”
- Rationale: Preferred position met: Customer may assign to Affiliates/successors without consent, Vendor assignment requires consent and is barred to competitors, and no Vendor rights arise on our change of control.

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
- Finding: `f-ip-bc7be66f` · **compliant** · confidence 0.94
- Location: § 14.1 As between the Parties, Customer owns all Customer Data, Cu…
- Quote: “Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables”
- Rationale: Preferred position met: Customer owns Customer Data and Deliverables, Vendor retains Vendor Technology with a perpetual licence back under Section 13.2, and no joint ownership is created.

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
- Finding: `f-license-8dd04f65` · **deviation** · confidence 0.93
- Location: § 13.1 Vendor grants Customer alone a non-transferable licence, re…
- Quote: “13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.”
- Rationale: A licence revocable at Vendor's discretion that excludes Affiliates and contractors is walk-away territory, and it is inconsistent with Sections 13.2 and 13.3, which contemplate Affiliate use and transfer to a successor. The licence must cover our Affiliates and contractors and be terminable only for uncured material breach.
- Proposal: **preferred** — A licence revocable at Vendor's discretion that excludes Affiliates and contractors is walk-away territory, and it is inconsistent with Sections 13.2 and 13.3, which contemplate Affiliate use and transfer to a successor. The licence must cover our Affiliates and contractors and be terminable only for uncured material breach.
- Comment: [Playbook] We extended the licence to our Affiliates and contractors and removed revocation at Vendor's discretion; suspension or termination should follow the uncured material breach process already in Section 13.3. This also aligns 13.1 with Sections 13.2 and 13.3.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "13.1 Vendor grants Customer, its Affiliates, and contractors acting on Customer's behalf a licence to access and use the Services during the applicable subscription term, transferable to a successor in connection with an assignment permitted by Section 24 and terminable only in accordance with Section 13.3.",
    "oldText": "13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.",
    "paragraphId": "p0052"
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
- Finding: `f-audit-e52f4410` · **compliant** · confidence 0.95
- Location: § 22.1 Vendor may audit Customer's compliance with licence quantit…
- Quote: “no more than once in any twelve-month period, on at least thirty days' prior written notice”
- Rationale: Preferred position met: annual frequency, 30 days' notice, independent auditor bound by confidentiality, off-site where practicable, Vendor bears cost unless underpayment exceeds 5%, and no direct system access.

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
- Finding: `f-ld-0d26ceaf` · **compliant** · confidence 0.80
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.”
- Rationale: No liquidated damages or penalties are payable by Customer; termination is without penalty. The take-or-pay shortfall exposure in Section 2.1 is addressed separately under MINCOMMIT rather than double-flagged here.

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
- Finding: `f-warranty-544c9b8a` · **deviation** · confidence 0.88
- Location: § 19.2 For fifteen days after delivery, each Deliverable will mate…
- Quote: “19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.”
- Rationale: A 15-day conformance period falls short of our 90-day fallback for software/deliverables, and the "no correction or refund obligation" tail would cut off the remedies in Section 19.4 and the ongoing conformance warranty in Section 19.1.
- Proposal: **preferred** — A 15-day conformance period falls short of our 90-day fallback for software/deliverables, and the "no correction or refund obligation" tail would cut off the remedies in Section 19.4 and the ongoing conformance warranty in Section 19.1.
- Comment: [Playbook] We extended the Deliverable conformance period to 90 days from acceptance, which is our fallback, and removed the clause cutting off correction and refund obligations so that it does not swallow Sections 19.1 and 19.4.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "19.2 For ninety days after acceptance, each Deliverable will materially conform in all material respects to its documentation and the agreed specifications. This period does not limit the warranties in Section 19.1 or the remedies in Section 19.4.",
    "oldText": "19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.",
    "paragraphId": "p0076"
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
- Finding: `f-insurance-1dc42e0d` · **compliant** · confidence 0.96
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate”
- Rationale: Preferred limits are met, including E&O of USD 2M and cyber/privacy of USD 5M, with certificates on request and no limitation of Vendor's liabilities.

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
- Finding: `f-mincommit-953097f3` · **deviation** · confidence 0.94
- Location: § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv…
- Quote: “2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: A three-year, USD 6,000,000 take-or-pay commitment with no reduction or termination right is walk-away territory and is inconsistent with Section 12.3 and with Customer's convenience-termination right in Section 9.4.
- Proposal: **preferred** — A three-year, USD 6,000,000 take-or-pay commitment with no reduction or termination right is walk-away territory and is inconsistent with Section 12.3 and with Customer's convenience-termination right in Section 9.4.
- Comment: [Playbook] We removed the multi-year take-or-pay. We can discuss a commitment limited to the current 12-month term that is reducible on 30 days' notice with a true-up, but not an irrevocable three-year minimum that also conflicts with Sections 9.4 and 12.3.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.1 Customer has no minimum purchase obligation except as expressly stated in a signed Order Form. Any such commitment applies only to the then-current twelve-month term, may be reduced by Customer on thirty days' written notice, and any shortfall is settled by a true-up at the applicable unit price rather than a penalty, and terminates on termination of the applicable Order Form.",
    "oldText": "2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.",
    "paragraphId": "p0012"
  }
]
```

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
- Finding: `f-transition-3e7ce3f7` · **deviation** · confidence 0.94
- Location: § 11.1 Immediately on termination Vendor shall discontinue all ass…
- Quote: “11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.”
- Rationale: Immediate deletion with no export or migration support is walk-away territory and directly contradicts Sections 11.2 and 11.3, which provide for return within 30 days and deletion only after confirmed return. We need transition assistance plus data return before deletion.
- Proposal: **preferred** — Immediate deletion with no export or migration support is walk-away territory and directly contradicts Sections 11.2 and 11.3, which provide for return within 30 days and deletion only after confirmed return. We need transition assistance plus data return before deletion.
- Comment: [Playbook] We replaced immediate cut-off and deletion with up to six months of transition assistance at Vendor's rates; the clause as drafted also conflicts with Sections 11.2 and 11.3. Our fallback is 90 days of assistance with export within 30 days.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "11.1 On expiry or termination of this Agreement or an Order Form for any reason, Vendor shall, at Customer's request, continue to provide the affected Services and reasonable transition and migration assistance for up to six months at Vendor's then-current rates. Vendor shall not delete Customer Data except in accordance with Section 11.3.",
    "oldText": "11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.",
    "paragraphId": "p0045"
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
# Issues memo: MASTER SERVICES AGREEMENT

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | deviation | § 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and… |
| critical | Ownership of deliverables and Customer Data | compliant | § 14.1 As between the Parties, Customer owns all Customer Data, Cu… |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § 21.1 Each Party's aggregate liability shall not exceed Fees actu… |
| high | Assignment and change of control | compliant | § 24.1 Customer may assign this Agreement or an Order Form without… |
| high | Exclusivity obligations binding Customer | deviation | § 2.2 Vendor will be Customer's sole and exclusive provider of ho… |
| high | Liquidated damages and penalties payable by Customer | compliant | § 9.4 Customer may terminate this Agreement or any Order Form for… |
| high | Licence grant scope | deviation | § 13.1 Vendor grants Customer alone a non-transferable licence, re… |
| high | Non-compete restrictions on Customer | deviation | § 12.4 During the term and for twenty-four months thereafter, Cust… |
| high | Termination for convenience | compliant | § 9.4 Customer may terminate this Agreement or any Order Form for… |
| medium | Audit rights against Customer | compliant | § 22.1 Vendor may audit Customer's compliance with licence quantit… |
| medium | Governing law and venue | compliant | § 28.1 This Agreement and each dispute arising from it are governe… |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § 12.3 Nothing restricts Customer from developing, acquiring, lice… |
| medium | Minimum purchase commitments and volume restrictions on Customer | deviation | § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv… |
| medium | Non-solicitation of employees binding Customer | compliant | § 12.3 Nothing restricts Customer from developing, acquiring, lice… |
| medium | Auto-renewal and non-renewal notice window | compliant | § 8.2 Each Order Form has the initial term stated in it and there… |
| medium | Post-termination transition assistance and data return | deviation | § 11.1 Immediately on termination Vendor shall discontinue all ass… |
| medium | Performance warranty and duration | deviation | § 19.2 For fifteen days after delivery, each Deliverable will mate… |
| low | Vendor insurance | compliant | § 18.1 Vendor shall maintain, at its own expense throughout the te… |

## Walk-away items

- Indemnification by Vendor (§ 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and…): The Agreement contains only a broad one-way Customer indemnity and no Vendor IP-infringement indemnity, which is walk-away territory for us. Note also that Section 9.3 cross-refers to remedies "required by Section 20.5", which does not exist.
- Limitation of liability — cap, mutuality and carve-outs (§ 21.1 Each Party's aggregate liability shall not exceed Fees actu…): A one-month fee cap is far below our walk-away floor of six months' fees, and "without exception" would override the Excluded Claims regime in 21.3 (confidentiality, data protection, indemnities, gross negligence, wilful misconduct, fraud, IP infringement). Our position is a mutual cap at the greater of 12 months' fees and USD 1,000,000, with indemnities and confidentiality outside the cap.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
