# Trajectory: cuad-corio-hosting

| Run | Value |
|---|---|
| Contract | cuad-corio-hosting — 1 EXHIBIT 10.5 |
| Config | b1-prompt |
| Parties | Corio Inc. (our party) ↔ Commerce One, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2m 5.5s (125,462 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 26,906 input · 11,913 output · 1,194 cache read · 0 cache write |
| Cost | $0.432952 |

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
- Finding: `f-lol-cap-28e73001` · **deviation** · confidence 0.86
- Location: § 9 LIMITATION OF LIABILITY.
- Quote: “IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION”
- Rationale: The cap is mutual, but it is limited to amounts paid for the single "transaction which the liability relates to", which is materially less than 12 months' fees and can fall below our 6-month floor. The only carve-out is Section 8 (IP indemnity); confidentiality, gross negligence, wilful misconduct and fraud all sit inside the cap, so the clause fails our fallback.
- Proposal: **preferred** — The cap is mutual, but it is limited to amounts paid for the single "transaction which the liability relates to", which is materially less than 12 months' fees and can fall below our 6-month floor. The only carve-out is Section 8 (IP indemnity); confidentiality, gross negligence, wilful misconduct and fraud all sit inside the cap, so the clause fails our fallback.
- Comment: [Playbook] We have moved the cap to 12 months' fees paid or payable rather than the fees for a single transaction, and added the standard carve-outs so that indemnification, confidentiality, gross negligence, wilful misconduct and fraud sit outside the cap.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT PAID OR PAYABLE BY CORIO HEREUNDER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES. \"EXCLUDED CLAIMS\" MEANS A PARTY'S LIABILITY ARISING UNDER SECTION 8, ITS BREACH OF ITS CONFIDENTIALITY OBLIGATIONS UNDER SECTION 10, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CORIO'S OBLIGATION TO PAY FEES DUE UNDER THIS AGREEMENT IS NOT SUBJECT TO THIS LIMITATION.",
    "oldText": "EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.",
    "paragraphId": "p0090"
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
- Finding: `f-indemn-78c6ae53` · **compliant** · confidence 0.85
- Location: § 8 INDEMNIFICATION.
- Quote: “Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringes any patent, copyright, trademark or trade right secret of a third party”
- Rationale: Vendor gives a full IP defence and indemnity covering us and our Customers, with the usual exclusions (use outside documentation, third-party modification) and procure/modify/refund remedies, and it is carved out of the liability cap entirely. This meets the fallback; we note only that it does not extend to Vendor's breach of law, data incidents or wilful misconduct.

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
- Finding: `f-noncompete-554079c9` · **needs_review** · confidence 0.55
- Location: § 1 DEFINITIONS.
- Quote: “"CORIO MARKET SEGMENT" means those customers with annual sales revenues of less than $1,000,000,000.”
- Rationale: The licence is confined to the "Corio Market Segment" and to North America, which operates as a field-of-use/territory restriction on the customers we may serve with this product. It is framed as licence scope rather than a covenant, and Section 2.10 gives a path to worldwide expansion with consent not unreasonably withheld, so we flag it for commercial confirmation rather than redline.

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
- Finding: `f-exclusivity-dd213756` · **compliant** · confidence 0.90
- Location: § 2. GRANT OF RIGHTS.
- Quote: “nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement)”
- Rationale: No exclusivity or sole-supplier obligation binds us; the only directional restrictions (Vendor not contacting our Customers for non-ASP sales and referring them back to us) run in our favour.

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
- Finding: `f-mfn-374f5f32` · **compliant** · confidence 0.82
- Location: § PRICING
- Quote: “LICENSE FEES: BuySite Hosted Edition: [*]”
- Rationale: No most-favoured-nation or price-matching obligation is imposed on us anywhere in the Agreement or Exhibit B.

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
- Finding: `f-nosolicit-d4ea2d7e` · **compliant** · confidence 0.88
- Location: § 13 SHARED RESOURCES.
- Quote: “Commerce One covenants that during the term of this Agreement, it will continue to require all Commerce One employees, agents, contractors or consultants to sign an Employee NDA/Invention Agreement”
- Rationale: There is no non-solicitation or no-hire restriction binding us, which is our preferred position.

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
- Finding: `f-t4c-20cb64aa` · **deviation** · confidence 0.85
- Location: § 11 TERM AND TERMINATION.
- Quote: “The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years.”
- Rationale: We are locked into a five-year initial term with termination available only for uncured material breach or insolvency; there is no convenience right for us. Our playbook treats the absence of a customer convenience right in a term longer than 12 months as a deviation.
- Proposal: **preferred** — We are locked into a five-year initial term with termination available only for uncured material breach or insolvency; there is no convenience right for us. Our playbook treats the absence of a customer convenience right in a term longer than 12 months as a deviation.
- Comment: [Playbook] We cannot commit to a five-year term with no exit; we have added a convenience right on 30 days' notice with a pro-rata refund. We can live with 60-90 days' notice as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement. In addition, Corio may terminate this Agreement for convenience upon thirty (30) (or, at Commerce One's election, sixty (60)) days' prior written notice to Commerce One, in which case Commerce One shall refund any prepaid fees covering the period after the effective date of termination.",
    "oldText": "Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement.",
    "paragraphId": "p0096"
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
- Finding: `f-renewal-403f9add` · **compliant** · confidence 0.90
- Location: § 11 TERM AND TERMINATION.
- Quote: “this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration”
- Rationale: Renewal terms are 12 months with a 30-day non-renewal window, which meets our preferred position. We note only the absence of a renewal reminder and a cap on price uplift at renewal.

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
- Finding: `f-govlaw-af341397` · **compliant** · confidence 0.80
- Location: § 14 MISCELLANEOUS.
- Quote: “This Agreement shall be governed by the laws of the State of California, USA”
- Rationale: California law with AAA arbitration seated in San Francisco sits at our fallback: California is an accepted jurisdiction and the arbitration is domestic, not a foreign seat. We would prefer courts over mandatory arbitration but do not redline on that alone.

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
- Finding: `f-assign-cb5e66f7` · **compliant** · confidence 0.75
- Location: § 14 MISCELLANEOUS.
- Quote: “either party shall have the right to assign this Agreement in connection with the merger or acquisition of such party or the sale of all or substantially all of its assets related to this Agreement without such consent”
- Rationale: The assignment clause is mutual and carries an M&A/asset-sale carve-out, and there is no Vendor termination or re-pricing right on our change of control, so it sits at the fallback. We note the consent standard for other assignments is not expressed as "not to be unreasonably withheld" and that the competitor exception cuts both ways.

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
- Finding: `f-ip-598bd48e` · **deviation** · confidence 0.82
- Location: § 13 SHARED RESOURCES.
- Quote: “shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including”
- Rationale: Interface code created solely by us flips to Vendor ownership merely because Vendor supports it on an ongoing basis, with no licence back to us. That is an assignment of our IP to the Vendor and falls in walk-away territory; the deferred negotiation over ownership of enhancements developed solely by us compounds the exposure.
- Proposal: **preferred** — Interface code created solely by us flips to Vendor ownership merely because Vendor supports it on an ongoing basis, with no licence back to us. That is an assignment of our IP to the Vendor and falls in walk-away territory; the deferred negotiation over ownership of enhancements developed solely by us compounds the exposure.
- Comment: [Playbook] We own what we build; Vendor supporting our interface code should not transfer ownership of it. We have replaced the ownership flip with a support-purpose licence to Vendor.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "shall be owned by Corio. Where such Developments are supported on an ongoing basis by Commerce One, Commerce One shall have a non-exclusive, royalty-free licence to use such Developments solely to provide that support, but shall acquire no ownership rights, including",
    "oldText": "shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including",
    "paragraphId": "p0115"
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
- Finding: `f-license-5a34291d` · **compliant** · confidence 0.72
- Location: § 2. GRANT OF RIGHTS.
- Quote: “Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license”
- Rationale: The licence is perpetual and irrevocable, permits unlimited sublicensing to our Customers, and is transferable to a successor via Section 14.1; Section 14.8 preserves our right to subcontract delivery. Affiliates are not expressly named, which we would add if convenient, but the grant meets the fallback.

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
- Finding: `f-audit-f6d6f3c9` · **compliant** · confidence 0.88
- Location: § 4 FEES.
- Quote: “Such inspections may be made no more than once each calendar year, at reasonable times and upon reasonable notice. Commerce One shall bear all costs and expenses of such inspection.”
- Rationale: Audits are annual, by an independent CPA reasonably acceptable to us, at Vendor's cost unless underpayment exceeds 5%, with no access to our systems. This meets our preferred position; only the notice period is "reasonable" rather than a fixed 30 days.

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
- Finding: `f-ld-ac112a09` · **compliant** · confidence 0.85
- Location: § 11 TERM AND TERMINATION.
- Quote: “Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter.”
- Rationale: No liquidated damages, penalties or early-termination charges are payable by us under the Agreement or Exhibit B.

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
- Finding: `f-warranty-a55ed73e` · **deviation** · confidence 0.80
- Location: § 7 WARRANTIES AND DISCLAIMER.
- Quote: “for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the "Warranty Period")”
- Rationale: The warranty runs from the Effective Date and expires no later than 31 December 1999, which is effectively the acceptance date under Section 3.1 — so the conformance warranty lapses at or immediately after go-live and falls short of the 90-day fallback. The remedies (correct, replace, refund on termination) are acceptable.
- Proposal: **preferred** — The warranty runs from the Effective Date and expires no later than 31 December 1999, which is effectively the acceptance date under Section 3.1 — so the conformance warranty lapses at or immediately after go-live and falls short of the 90-day fallback. The remedies (correct, replace, refund on termination) are acceptable.
- Comment: [Playbook] A warranty that expires on the acceptance date gives us no protection; we have run the 90-day period from acceptance in line with our standard position.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "for a period of ninety (90) days from Corio's acceptance of the Software pursuant to Section 3.1 (the \"Warranty Period\")",
    "oldText": "for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the \"Warranty Period\")",
    "paragraphId": "p0078"
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
- Finding: `f-insurance-b5a84068` · **missing** · confidence 0.83
- Location: § 14 MISCELLANEOUS.
- Quote: “14 MISCELLANEOUS.”
- Rationale: The Agreement contains no insurance obligation, although Vendor hosts the MarketSite.net Service and places personnel alongside our teams. We ask for a standard short insurance paragraph in the miscellaneous section.
- Proposal: **preferred** — The Agreement contains no insurance obligation, although Vendor hosts the MarketSite.net Service and places personnel alongside our teams. We ask for a standard short insurance paragraph in the miscellaneous section.
- Comment: [Playbook] We require standard insurance from vendors that host services and process our data; we can accept E&O of USD 1M and cyber of USD 2M as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "as set forth in Section 365(n) of the Code.\n\n14.11 Insurance. Commerce One shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and, where Commerce One processes Corio or Customer data, cyber liability insurance of not less than USD 5,000,000. Commerce One shall provide certificates of insurance on request.",
    "oldText": "as set forth in Section 365(n) of the Code.",
    "paragraphId": "p0132"
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
- Finding: `f-mincommit-2aa9971e` · **compliant** · confidence 0.70
- Location: § REVENUE SHARING FEES:
- Quote: “No Application Management Revenue shall be due for any Corio Customer subscriptions utilizing the initial 3000 Software User licenses granted herein, subject to a minimum limitation of 40 Authorized Software Users per Customer”
- Rationale: There is no take-or-pay or shortfall commitment on us; the 40-user figure is a threshold within the revenue-share mechanic and the Exhibit D customer-order target is expressly non-binding. The recurring annual fees over the five-year term are addressed under our termination-for-convenience point.

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
- Finding: `f-transition-e5402995` · **missing** · confidence 0.72
- Location: § 11 TERM AND TERMINATION.
- Quote: “Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party”
- Rationale: Survival of the licence, support and the source-code escrow give us useful continuity, but there is no transition-assistance obligation and no obligation on Vendor to return our and our Customers' data from the MarketSite.net Service in a usable format. We ask for the standard exit paragraph.
- Proposal: **preferred** — Survival of the licence, support and the source-code escrow give us useful continuity, but there is no transition-assistance obligation and no obligation on Vendor to return our and our Customers' data from the MarketSite.net Service in a usable format. We ask for the standard exit paragraph.
- Comment: [Playbook] We need our data back and help moving on exit; we can accept 90 days of transition assistance as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party provided, however, Corio may retain any Confidential Information necessary for Corio to continue supporting it's then-existing Customers. In addition, upon expiration or termination for any reason, Commerce One shall (a) at Corio's request, provide reasonable transition assistance for up to six (6) months at Commerce One's then-current rates; (b) within thirty (30) days, return to Corio all Corio and Customer data in its possession in a commonly used, machine-readable format; and (c) thereafter delete such data from its systems and certify such deletion in writing.",
    "oldText": "Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party provided, however, Corio may retain any Confidential Information necessary for Corio to continue supporting it's then-existing Customers.",
    "paragraphId": "p0098"
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
# Issues memo: 1 EXHIBIT 10.5

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | compliant | § 8 INDEMNIFICATION. |
| critical | Ownership of deliverables and Customer Data | deviation | § 13 SHARED RESOURCES. |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § 9 LIMITATION OF LIABILITY. |
| high | Assignment and change of control | compliant | § 14 MISCELLANEOUS. |
| high | Exclusivity obligations binding Customer | compliant | § 2. GRANT OF RIGHTS. |
| high | Liquidated damages and penalties payable by Customer | compliant | § 11 TERM AND TERMINATION. |
| high | Licence grant scope | compliant | § 2. GRANT OF RIGHTS. |
| high | Non-compete restrictions on Customer | needs_review | § 1 DEFINITIONS. |
| high | Termination for convenience | deviation | § 11 TERM AND TERMINATION. |
| medium | Audit rights against Customer | compliant | § 4 FEES. |
| medium | Governing law and venue | compliant | § 14 MISCELLANEOUS. |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § PRICING |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § REVENUE SHARING FEES: |
| medium | Non-solicitation of employees binding Customer | compliant | § 13 SHARED RESOURCES. |
| medium | Auto-renewal and non-renewal notice window | compliant | § 11 TERM AND TERMINATION. |
| medium | Post-termination transition assistance and data return | missing | § 11 TERM AND TERMINATION. |
| medium | Performance warranty and duration | deviation | § 7 WARRANTIES AND DISCLAIMER. |
| low | Vendor insurance | missing | § 14 MISCELLANEOUS. |

## Walk-away items

- Ownership of deliverables and Customer Data (§ 13 SHARED RESOURCES.): Interface code created solely by us flips to Vendor ownership merely because Vendor supports it on an ongoing basis, with no licence back to us. That is an assignment of our IP to the Vendor and falls in walk-away territory; the deferred negotiation over ownership of enhancements developed solely by us compounds the exposure.
- Limitation of liability — cap, mutuality and carve-outs (§ 9 LIMITATION OF LIABILITY.): The cap is mutual, but it is limited to amounts paid for the single "transaction which the liability relates to", which is materially less than 12 months' fees and can fall below our 6-month floor. The only carve-out is Section 8 (IP indemnity); confidentiality, gross negligence, wilful misconduct and fraud all sit inside the cap, so the clause fails our fallback.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
