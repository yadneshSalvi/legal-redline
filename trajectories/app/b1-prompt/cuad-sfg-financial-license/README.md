# Trajectory: cuad-sfg-financial-license

| Run | Value |
|---|---|
| Contract | cuad-sfg-financial-license — ARTICLE I CERTAIN DEFINITIONS For the purposes of this Agreement: |
| Config | b1-prompt |
| Parties | 551 FX IB Associates, LLC (our party) ↔ SFG Financial Corp, a/k/a E-Path FX |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2m 15.6s (135,624 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 25,733 input · 13,200 output · 1,194 cache read · 0 cache write |
| Cost | $0.459262 |

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
- Finding: `f-lol-cap-32c86b1e` · **deviation** · confidence 0.95
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “(b) IN NO EVENT SHALL LICENSOR'S AGGREGATE CUMULATIVE TOTAL LIABILITY UNDER THIS AGREEMENT EXCEED ONE HALF OF THE AMOUNT PAID BY THE LICENSEE TO Licensor HEREUNDER.”
- Rationale: The cap is one-way (Licensor only), set at one half of amounts paid — far below the 6-month floor — and there are no carve-outs for confidentiality, indemnity or IP infringement; our liability is left unlimited (we also indemnify uncapped). This is walk-away territory under our playbook.
- Proposal: **preferred** — The cap is one-way (Licensor only), set at one half of amounts paid — far below the 6-month floor — and there are no carve-outs for confidentiality, indemnity or IP infringement; our liability is left unlimited (we also indemnify uncapped). This is walk-away territory under our playbook.
- Comment: [Playbook] We need a mutual cap at the greater of 12 months' fees and USD 1M; a one-way cap at half of fees paid is below our floor. Confidentiality, indemnity, gross negligence/wilful misconduct and IP infringement sit outside the cap.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(b) EXCEPT FOR EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF (I) THE FEES PAID OR PAYABLE BY LICENSEE UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (II) USD 1,000,000. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. LICENSEE'S OBLIGATION TO PAY FEES DUE IS NOT \"DAMAGES\" FOR PURPOSES OF THIS CAP.",
    "oldText": "(b) IN NO EVENT SHALL LICENSOR'S AGGREGATE CUMULATIVE TOTAL LIABILITY UNDER THIS AGREEMENT EXCEED ONE HALF OF THE AMOUNT PAID BY THE LICENSEE TO Licensor HEREUNDER.",
    "paragraphId": "p0130"
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
- Finding: `f-indemn-373c3751` · **deviation** · confidence 0.93
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “Licensee will be solely responsible for any commercial or legal liability that may arise as a result of Licensee's exercise of any of the license rights granted by Licensor to Licensee under this Agreement, and Licensee shall defend, indemnify, and hold Licensor harmless”
- Rationale: Indemnity runs one way only, and Article XIII expressly disclaims any Licensor liability for IP infringement claims arising from our use of the Platform. No Vendor IP indemnity at all is a walk-away; we need a Licensor defence obligation for infringement, breach of law, data incidents and wilful misconduct.
- Proposal: **preferred** — Indemnity runs one way only, and Article XIII expressly disclaims any Licensor liability for IP infringement claims arising from our use of the Platform. No Vendor IP indemnity at all is a walk-away; we need a Licensor defence obligation for infringement, breach of law, data incidents and wilful misconduct.
- Comment: [Playbook] We cannot take a licence with no supplier IP indemnity while also being told infringement claims are entirely our risk. Fallback is an IP indemnity with the usual exclusions (our modifications/combinations) and procure/modify/replace/refund remedies.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "ARTICLE XII INDEMNITY Licensor shall defend, indemnify and hold harmless Licensee and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Licensed Technology infringes or misappropriates any intellectual property right; (b) Licensor's breach of applicable law; (c) any unauthorised access to or disclosure of Licensee's data caused by Licensor; or (d) Licensor's gross negligence or wilful misconduct. Licensee will be responsible for any commercial or legal liability",
    "oldText": "ARTICLE XII INDEMNITY Licensee will be solely responsible for any commercial or legal liability",
    "paragraphId": "p0128"
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
- Finding: `f-noncompete-19729c1e` · **needs_review** · confidence 0.50
- Location: § I CERTAIN DEFINITIONS For the purposes of this Agreement:
- Quote: “The "Field of Use" shall not include any functions or applications not expressly described in the preceding sentence”
- Rationale: The Field of Use and the bar on creating Derivative Works are licence-scope limits rather than restraints on our wider business, so they are not automatically a non-compete deviation; we should confirm they do not fetter internal development of, or procurement of, other trading technology.

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
- Finding: `f-exclusivity-ec4a8838` · **compliant** · confidence 0.85
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “grants to Licensee a non-exclusive license”
- Rationale: The licence is non-exclusive and there is no sole-supplier or requirements obligation on us; we remain free to use other platforms.

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
- Finding: `f-mfn-fb74d2d7` · **needs_review** · confidence 0.55
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “the Licensor shall have the right (the "Right of First Refusal"), for a period (the "Exercise Period") expiring at 11:59 PM (Eastern Time) on the fifth (5th) business day after the giving of written notice by the Licensee that it has received a bonafide offer from a third party”
- Rationale: Not a pricing MFN, but it is a matching right burdening us: a licensor-side right of first refusal over the sale or merger of our company. This is a corporate-level restriction we would normally delete; flagging for business input.

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
- Finding: `f-nosolicit-d9a0a23e` · **deviation** · confidence 0.90
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “During the Term of this Agreement and during the three year period after the expiration or termination of this Agreement, the Licensee will not solicit any person employed by Licensor and/or its Affiliates to leave his or her employment with Licensor.”
- Rationale: Three years post-term exceeds our 24-month walk-away limit, the restriction covers all Licensor and affiliate personnel rather than those involved in the services, and it binds only us. The general-advertising carve-out is helpful but does not cure the duration or scope.
- Proposal: **preferred** — Three years post-term exceeds our 24-month walk-away limit, the restriction covers all Licensor and affiliate personnel rather than those involved in the services, and it binds only us. The general-advertising carve-out is helpful but does not cure the duration or scope.
- Comment: [Playbook] We accept only a mutual, 12-month non-solicit limited to personnel directly involved in the services; the existing advertising carve-out is retained.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "During the Term of this Agreement and for twelve (12) months thereafter, neither party will solicit any employee of the other party who was directly involved in the performance of this Agreement to leave his or her employment with that party.",
    "oldText": "During the Term of this Agreement and during the three year period after the expiration or termination of this Agreement, the Licensee will not solicit any person employed by Licensor and/or its Affiliates to leave his or her employment with Licensor.",
    "paragraphId": "p0125"
  }
]
```

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
- Finding: `f-t4c-f1e935a5` · **deviation** · confidence 0.85
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “Subject to termination pursuant to this Agreement, the Non Exclusive license granted by Licensor to Licensee shall be for an initial period of 36 months, commencing from the acceptance date, (the "Initial Period").”
- Rationale: A 36-month committed term with no Licensee right to terminate for convenience, while Licensor may terminate immediately upon any breach of any covenant with no cure period. Absence of a convenience right in a multi-year term is a deviation.
- Proposal: **preferred** — A 36-month committed term with no Licensee right to terminate for convenience, while Licensor may terminate immediately upon any breach of any covenant with no cure period. Absence of a convenience right in a multi-year term is a deviation.
- Comment: [Playbook] We need an exit on 30 days' notice in a 36-month term; fallback is 60–90 days' notice with an early-termination fee no greater than 3 months' fees.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Licensee may terminate this Agreement for convenience, in whole or in part, upon thirty (30) days' prior written notice to Licensor, in which case Licensor shall refund any prepaid fees for the period after the effective date of termination. II The Initial Period shall be extended by mutual written agreement of the parties within 45 days of the close of the Initial Period.",
    "oldText": "II The Initial Period shall be extended by mutual written of the parties within 45 days of the close of the Initial Period.",
    "paragraphId": "p0049"
  }
]
```

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
- Finding: `f-renewal-b8bf2ee0` · **deviation** · confidence 0.88
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “The Agreement may be renewed for an additional period of seven (7) years at the option of the Licensor.”
- Rationale: A unilateral seven-year renewal exercisable by the Vendor alone is worse than an automatic multi-year renewal and is walk-away; it also contradicts the following sentences requiring mutual written extension.
- Proposal: **preferred** — A unilateral seven-year renewal exercisable by the Vendor alone is worse than an automatic multi-year renewal and is walk-away; it also contradicts the following sentences requiring mutual written extension.
- Comment: [Playbook] Renewal must be mutual (or a 12-month auto-renewal we can exit on 30 days' notice); a seven-year renewal at the Vendor's sole option is not acceptable.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "The Agreement may be renewed for successive periods of twelve (12) months by mutual written agreement of the parties.",
    "oldText": "The Agreement may be renewed for an additional period of seven (7) years at the option of the Licensor.",
    "paragraphId": "p0049"
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
- Finding: `f-govlaw-c0a2a0d3` · **compliant** · confidence 0.95
- Location: § GENERAL PROVISIONS
- Quote: “shall be governed by the internal laws of the State of New York, U.S.A.”
- Rationale: New York law with exclusive jurisdiction of the state and federal courts in New York County — our preferred position; no arbitration.

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
- Finding: `f-assign-324f65de` · **deviation** · confidence 0.92
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “Upon the occurrence of any Change of Control (as defined below) this Agreement and all Licensee's rights and licenses hereunder shall automatically terminate unless, prior to the occurrence of such Change of Control, Licensor has consented to such Change of Control in a writing executed by an officer of Licensor”
- Rationale: Automatic termination of our licence on our change of control, plus a blanket bar on Licensee assignment with no affiliate or M&A carve-out (p0149) — both sit in walk-away territory and would impede any corporate transaction.
- Proposal: **preferred** — Automatic termination of our licence on our change of control, plus a blanket bar on Licensee assignment with no affiliate or M&A carve-out (p0149) — both sit in walk-away territory and would impede any corporate transaction.
- Comment: [Playbook] We cannot accept loss of the licence on our own change of control; we need the affiliate/successor carve-out in the assignment clause as well.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Licensee may assign this Agreement, in whole or in part, without Licensor's consent to an affiliate or to a successor in a merger, consolidation, acquisition or sale of all or substantially all of its assets, and no Change of Control (as defined below) of Licensee shall terminate this Agreement or give Licensor any right to terminate, suspend or re-price this Agreement.",
    "oldText": "Upon the occurrence of any Change of Control (as defined below) this Agreement and all Licensee's rights and licenses hereunder shall automatically terminate unless, prior to the occurrence of such Change of Control, Licensor has consented to such Change of Control in a writing executed by an officer of Licensor; provided that Licensor will not unreasonably withhold its consent to the consummation of a Change of Control.",
    "paragraphId": "p0134"
  }
]
```

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
- Finding: `f-ip-15f135d2` · **needs_review** · confidence 0.60
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “Licensee acknowledges that Licensor owns all right, title, and interest in and to the Licensed Technology and all Intellectual Property Rights therein.”
- Rationale: Licensor's ownership of its own Platform is acceptable, but the Agreement is silent on ownership of our trading, client and account data on the Platform, and ownership of the bespoke front-end customisation work under Article VII(b) is unaddressed (with derivative works barred). We should add a Licensee Data ownership sentence and confirm rights in paid-for customisations.

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
- Finding: `f-license-f8549fd1` · **deviation** · confidence 0.80
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “grants to Licensee a non-exclusive license to utilize Licensed Technology solely in the Field of Use and subject to the additional restrictions set forth below”
- Rationale: The licence excludes affiliates and contractors (access is limited to Licensee employees under p0045) with no path to add them, is non-transferable, and can be terminated immediately on any breach of any covenant with no cure period (p0049) — effectively revocable at the Licensor's discretion.
- Proposal: **preferred** — The licence excludes affiliates and contractors (access is limited to Licensee employees under p0045) with no path to add them, is non-transferable, and can be terminated immediately on any breach of any covenant with no cure period (p0049) — effectively revocable at the Licensor's discretion.
- Comment: [Playbook] The licence must reach our affiliates and contractors and may only be terminated for uncured material breach; fallback is affiliates covered on written notice plus successor transferability.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "grants to Licensee, its Affiliates and its contractors acting on Licensee's behalf a non-exclusive license to utilize Licensed Technology in the Field of Use, terminable by Licensor only for a material breach by Licensee that remains uncured thirty (30) days after written notice and transferable to a successor in a merger, acquisition or sale of all or substantially all of Licensee's assets, subject to the additional restrictions set forth below",
    "oldText": "grants to Licensee a non-exclusive license to utilize Licensed Technology solely in the Field of Use and subject to the additional restrictions set forth below",
    "paragraphId": "p0030"
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
- Finding: `f-audit-52dc2d8b` · **deviation** · confidence 0.75
- Location: § 50+ US$5.00
- Quote: “Any such audit shall be permitted by Licensee within 30 days of Licensee's receipt of a written request of Licensor.”
- Rationale: No limit on audit frequency and no advance-notice period (only a 30-day window to accommodate the request). Cost allocation and the independent-auditor requirement already meet our preferred position; we only need frequency, notice and a no-system-access statement.
- Proposal: **preferred** — No limit on audit frequency and no advance-notice period (only a 30-day window to accommodate the request). Cost allocation and the independent-auditor requirement already meet our preferred position; we only need frequency, notice and a no-system-access statement.
- Comment: [Playbook] Audits should be no more than annual on 30 days' notice and off-site; the existing cost-shifting at 5% is acceptable.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Any such audit shall take place no more than once in any twelve (12) month period, during normal business hours, upon not less than thirty (30) days' prior written notice to Licensee, shall be conducted by an auditor bound by confidentiality obligations, and shall not include access to Licensee's systems.",
    "oldText": "Any such audit shall be permitted by Licensee within 30 days of Licensee's receipt of a written request of Licensor.",
    "paragraphId": "p0073"
  }
]
```

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
- Finding: `f-ld-445d1f07` · **compliant** · confidence 0.75
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “NO DAMAGES FOR TERMINATION. NEITHER PARTY WILL BE LIABLE TO THE OTHER FOR DAMAGES OF ANY KIND”
- Rationale: No liquidated damages, penalty or minimum termination fee payable by us; the only post-termination payment obligation is for trades actually performed.

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
- Finding: `f-warranty-b98ebab4` · **deviation** · confidence 0.90
- Location: § WARRANTY DISCLAIMER
- Quote: “THE LICENSED TECHNOLOGY IS PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTY OF ANY KIND AND LICENSOR HEREBY”
- Rationale: Pure "AS IS" with all warranties (including non-infringement and conformance to documentation) disclaimed and no express performance warranty anywhere — this is the walk-away position for a hosted trading platform we pay per-trade fees to use.
- Proposal: **preferred** — Pure "AS IS" with all warranties (including non-infringement and conformance to documentation) disclaimed and no express performance warranty anywhere — this is the walk-away position for a hosted trading platform we pay per-trade fees to use.
- Comment: [Playbook] We need a minimum conformance-to-documentation and workmanlike-performance warranty with a real remedy, expressly carved out of the disclaimer.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "LICENSOR WARRANTS THAT (A) THE TECHNICAL SUPPORT SERVICES WILL BE PERFORMED IN A PROFESSIONAL AND WORKMANLIKE MANNER CONSISTENT WITH INDUSTRY STANDARDS; (B) THE LICENSED TECHNOLOGY WILL CONFORM IN ALL MATERIAL RESPECTS TO ITS DOCUMENTATION; AND (C) THE LICENSED TECHNOLOGY CONTAINS NO MALICIOUS CODE. LICENSEE'S REMEDY FOR BREACH OF THIS WARRANTY IS, AT LICENSOR'S OPTION, REPAIR, REPLACEMENT OR REFUND OF THE FEES PAID FOR THE NON-CONFORMING PERIOD. EXCEPT FOR THE FOREGOING EXPRESS WARRANTIES, THE LICENSED TECHNOLOGY IS PROVIDED ON AN \"AS IS\" BASIS AND LICENSOR HEREBY",
    "oldText": "THE LICENSED TECHNOLOGY IS PROVIDED ON AN \"AS IS\" BASIS WITHOUT WARRANTY OF ANY KIND AND LICENSOR HEREBY",
    "paragraphId": "p0110"
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
- Finding: `f-insurance-6fb619d0` · **missing** · confidence 0.80
- Location: § GENERAL PROVISIONS
- Quote: “GENERAL PROVISIONS”
- Rationale: No insurance provision anywhere, although Licensor hosts the Platform and the Hardware and processes our trading data. We expect at least E&O and cyber cover.
- Proposal: **preferred** — No insurance provision anywhere, although Licensor hosts the Platform and the Hardware and processes our trading data. We expect at least E&O and cyber cover.
- Comment: [Playbook] Standard insurance for a vendor hosting our trading platform and data; fallback is E&O USD 1M and cyber USD 2M.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(d) INSURANCE. Licensor shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and cyber liability insurance of not less than USD 5,000,000. Licensor shall provide certificates of insurance on request. (e) ATTORNEYS' FEES.",
    "oldText": "(d) ATTORNEYS' FEES.",
    "paragraphId": "p0150"
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
- Finding: `f-mincommit-93ccf895` · **compliant** · confidence 0.80
- Location: § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…
- Quote: “Licensee shall calculate the license fee payable to the Licensor for each month based on the Monthly Notional Volume bands for that pay period”
- Rationale: Fees are purely usage-based per notional volume, with a fixed USD 2,500/month support fee; no minimum volume commitment, take-or-pay or shortfall charge.

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
- Finding: `f-transition-abbbff3c` · **deviation** · confidence 0.85
- Location: § CONFIDENTIAL INFORMATION/NON SOLICITATION
- Quote: “Licensee shall, within five (5) days, ship to Licensor all Licensed Technology, API's Documentation with respect to the Licensed Technology and other Confidential Information in Licensee's possession or control”
- Rationale: Exit obligations run only against us; there is no transition assistance and no obligation to return our trade, client or account data held on the hosted Platform. Absence of data return in a hosted arrangement is the walk-away position.
- Proposal: **preferred** — Exit obligations run only against us; there is no transition assistance and no obligation to return our trade, client or account data held on the hosted Platform. Absence of data return in a hosted arrangement is the walk-away position.
- Comment: [Playbook] We need our data back in machine-readable form within 30 days and up to six months of transition assistance (fallback 90 days) on exit.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Upon expiry or termination for any reason, Licensor shall (a) at Licensee's request, provide reasonable transition assistance for up to six (6) months at Licensor's then-current rates; (b) within thirty (30) days, return to Licensee all Licensee data (including trade, client and account records) in a commonly used, machine-readable format; and (c) thereafter delete such data from its systems and certify such deletion in writing. All of the Licensor's rights under this Agreement shall survive termination of this Agreement.",
    "oldText": "All of the Licensor's rights under this Agreement shall survive termination of this Agreement.",
    "paragraphId": "p0138"
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
# Issues memo: ARTICLE I CERTAIN DEFINITIONS For the purposes of this Agreement:

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | deviation | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| critical | Ownership of deliverables and Customer Data | needs_review | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| high | Assignment and change of control | deviation | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| high | Exclusivity obligations binding Customer | compliant | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| high | Liquidated damages and penalties payable by Customer | compliant | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| high | Licence grant scope | deviation | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| high | Non-compete restrictions on Customer | needs_review | § I CERTAIN DEFINITIONS For the purposes of this Agreement: |
| high | Termination for convenience | deviation | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| medium | Audit rights against Customer | deviation | § 50+ US$5.00 |
| medium | Governing law and venue | compliant | § GENERAL PROVISIONS |
| medium | Most-favoured-nation obligations burdening Customer | needs_review | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| medium | Non-solicitation of employees binding Customer | deviation | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| medium | Auto-renewal and non-renewal notice window | deviation | § II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and… |
| medium | Post-termination transition assistance and data return | deviation | § CONFIDENTIAL INFORMATION/NON SOLICITATION |
| medium | Performance warranty and duration | deviation | § WARRANTY DISCLAIMER |
| low | Vendor insurance | missing | § GENERAL PROVISIONS |

## Walk-away items

- Indemnification by Vendor (§ CONFIDENTIAL INFORMATION/NON SOLICITATION): Indemnity runs one way only, and Article XIII expressly disclaims any Licensor liability for IP infringement claims arising from our use of the Platform. No Vendor IP indemnity at all is a walk-away; we need a Licensor defence obligation for infringement, breach of law, data incidents and wilful misconduct.
- Ownership of deliverables and Customer Data (§ II LICENSE GRANT AND RESTRICTIONS I. Licensee acknowledges and…): Licensor's ownership of its own Platform is acceptable, but the Agreement is silent on ownership of our trading, client and account data on the Platform, and ownership of the bespoke front-end customisation work under Article VII(b) is unaddressed (with derivative works barred). We should add a Licensee Data ownership sentence and confirm rights in paid-for customisations.
- Limitation of liability — cap, mutuality and carve-outs (§ CONFIDENTIAL INFORMATION/NON SOLICITATION): The cap is one-way (Licensor only), set at one half of amounts paid — far below the 6-month floor — and there are no carve-outs for confidentiality, indemnity or IP infringement; our liability is left unlimited (we also indemnify uncapped). This is walk-away territory under our playbook.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
