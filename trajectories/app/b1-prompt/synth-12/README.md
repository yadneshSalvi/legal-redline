# Trajectory: synth-12

| Run | Value |
|---|---|
| Contract | synth-12 — MASTER SERVICES AGREEMENT |
| Config | b1-prompt |
| Parties | Juniper Ridge Health, Inc. (our party) ↔ Cobalt Cloud Services LLC |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 15.4s (75,356 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 18,113 input · 7,197 output · 1,194 cache read · 0 cache write |
| Cost | $0.271087 |

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
- Finding: `f-lol-cap-a1fe08c1` · **compliant** · confidence 0.95
- Location: § 21.1 Except for Excluded Claims, each Party's total aggregate li…
- Quote: “Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.”
- Rationale: Mutual cap at the greater of 12 months' Fees paid or payable and USD 1,000,000, mutual consequential-damages exclusion, and the full set of uncapped Excluded Claims, with Customer's payment obligation expressly outside the cap. This meets our preferred position; no change needed.

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
- Finding: `f-indemn-b9c59530` · **missing** · confidence 0.90
- Location: § 9.3 Customer may terminate an Order Form immediately if Vendor…
- Quote: “infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5”
- Rationale: There is no indemnification section in the Agreement — Section 20 is referenced in Section 9.3 but does not exist, so Vendor owes us no defence or indemnity for third-party IP claims, data breach or breach of law. This is a walk-away position for us; we have inserted a standard Vendor indemnity.
- Proposal: **preferred** — There is no indemnification section in the Agreement — Section 20 is referenced in Section 9.3 but does not exist, so Vendor owes us no defence or indemnity for third-party IP claims, data breach or breach of law. This is a walk-away position for us; we have inserted a standard Vendor indemnity.
- Comment: [Playbook] The Agreement contains no indemnity at all (Section 9.3 cross-refers to a Section 20.5 that does not exist). We have added our standard Vendor indemnity covering IP infringement, breach of law, data breach and wilful misconduct; consistent with Section 21.3 these obligations sit outside the liability cap.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "21.4 Vendor shall defend, indemnify and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorised access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct. Customer shall give Vendor prompt notice of the claim, sole control of the defence (subject to Customer's right to participate with its own counsel), and reasonable cooperation at Vendor's expense. 21.5 The limitations allocate risk between sophisticated Parties and apply only to the maximum extent permitted by Applicable Law.",
    "oldText": "21.4 The limitations allocate risk between sophisticated Parties and apply only to the maximum extent permitted by Applicable Law.",
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
- Finding: `f-noncompete-00a4a55e` · **deviation** · confidence 0.95
- Location: § 12.4 During the term and for twenty-four months thereafter, Cust…
- Quote: “12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.”
- Rationale: A 24-month post-term, worldwide, undefined-scope non-compete on Customer is walk-away territory and directly contradicts Section 12.3, which records that Customer has made no non-compete commitment. We have deleted it.
- Proposal: **preferred** — A 24-month post-term, worldwide, undefined-scope non-compete on Customer is walk-away territory and directly contradicts Section 12.3, which records that Customer has made no non-compete commitment. We have deleted it.
- Comment: [Playbook] We cannot accept restrictions on the businesses we operate or the products we buy or build, and this clause conflicts with Section 12.3. Deleted; if some protection is genuinely needed we could consider a term-only restriction on a single named competing product with carve-outs for internal development and acquisitions.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "",
    "oldText": "12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.",
    "paragraphId": "p0046"
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
- Finding: `f-exclusivity-14802a7b` · **compliant** · confidence 0.85
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier”
- Rationale: No exclusivity or sole-supplier obligation binds Customer; Section 12.3 expressly preserves our freedom to engage other suppliers.

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
- Finding: `f-mfn-8543a675` · **deviation** · confidence 0.90
- Location: § 7.2 Before engaging another provider, Customer must disclose an…
- Quote: “7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.”
- Rationale: This is an open-ended MFN running against us — we would have to disclose competitor pricing and give Vendor a right to match. That is our walk-away position and it also contradicts Section 12.3. We have deleted it.
- Proposal: **preferred** — This is an open-ended MFN running against us — we would have to disclose competitor pricing and give Vendor a right to match. That is our walk-away position and it also contradicts Section 12.3. We have deleted it.
- Comment: [Playbook] We do not grant most-favoured-customer or match rights to suppliers, and disclosing third-party offers would breach our confidentiality obligations. Deleted; MFN pricing in our favour remains welcome.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "",
    "oldText": "7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.",
    "paragraphId": "p0026"
  }
]
```

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
- Finding: `f-nosolicit-30553066` · **deviation** · confidence 0.90
- Location: § 12.4 Customer shall not solicit, hire, or employ any Vendor empl…
- Quote: “12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.”
- Rationale: This is a one-way 24-month no-hire covering all Vendor employees with no general-advertising or unsolicited-approach carve-out — walk-away under our playbook and inconsistent with Section 12.3. Narrowed to our mutual fallback.
- Proposal: **preferred** — This is a one-way 24-month no-hire covering all Vendor employees with no general-advertising or unsolicited-approach carve-out — walk-away under our playbook and inconsistent with Section 12.3. Narrowed to our mutual fallback.
- Comment: [Playbook] We accept only a narrow, mutual, 12-month non-solicit limited to personnel involved in the Services, with a general-advertising carve-out, and no no-hire. Redrafted accordingly.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "12.4 During the term and for twelve months after the end of an individual's involvement in the Services, neither Party shall knowingly solicit for employment any employee of the other Party who was directly involved in performing or receiving the Services. This restriction does not apply to general advertisements or recruitment campaigns not targeted at the other Party's personnel, or to unsolicited approaches by an individual, and does not prohibit hiring any person who responds to them.",
    "oldText": "12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.",
    "paragraphId": "p0045"
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
- Finding: `f-t4c-af15ba7e` · **deviation** · confidence 0.85
- Location: § 8.1 This Agreement begins on the Effective Date and continues f…
- Quote: “8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms.”
- Rationale: Termination rights are limited to cause, insolvency and specific Vendor failures; there is no Customer right to terminate for convenience in a three-year term, which our playbook treats as a deviation. We have added a 30-day convenience right with a pro-rata refund.
- Proposal: **preferred** — Termination rights are limited to cause, insolvency and specific Vendor failures; there is no Customer right to terminate for convenience in a three-year term, which our playbook treats as a deviation. We have added a 30-day convenience right with a pro-rata refund.
- Comment: [Playbook] In a three-year term we need the ability to exit on notice without penalty. Our fallback is 60–90 days' notice with an early-termination fee of no more than three months' Fees.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination and no early-termination charge will apply. 9.5 Termination of one Order Form does not terminate another Order Form",
    "oldText": "9.5 Termination of one Order Form does not terminate another Order Form",
    "paragraphId": "p0039"
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
- Finding: `f-renewal-ba813674` · **compliant** · confidence 0.95
- Location: § 8.2 Each Order Form has the initial term stated in it and there…
- Quote: “renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand.”
- Rationale: Twelve-month renewals, a 30-day opt-out window, a 60-day Vendor reminder and uplift capped at the lesser of CPI and 3% match our preferred position.

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
- Finding: `f-govlaw-4a18e833` · **deviation** · confidence 0.95
- Location: § 28.1 This Agreement is governed exclusively by Singapore law, an…
- Quote: “28.1 This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.”
- Rationale: Singapore law with exclusive Singapore jurisdiction is outside our accepted list and is walk-away; it also contradicts Section 28.2, which vests exclusive jurisdiction in the New York courts. Aligned to New York.
- Proposal: **preferred** — Singapore law with exclusive Singapore jurisdiction is outside our accepted list and is walk-away; it also contradicts Section 28.2, which vests exclusive jurisdiction in the New York courts. Aligned to New York.
- Comment: [Playbook] We accept only New York, Delaware, California or England and Wales law. Changed to New York, which also removes the conflict with the exclusive New York venue in Section 28.2.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "28.1 This Agreement is governed exclusively by the laws of the State of New York, without regard to its conflict-of-laws rules.",
    "oldText": "28.1 This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.",
    "paragraphId": "p0103"
  }
]
```

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
- Finding: `f-assign-1a326528` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service.”
- Rationale: Customer may assign to Affiliates and successors without consent, Vendor may not assign without our consent or to a competitor, and there is no Vendor right triggered by our change of control. Preferred position met.

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
- Finding: `f-ip-eb514d65` · **deviation** · confidence 0.90
- Location: § 14.2 Vendor exclusively owns every Deliverable created for Custo…
- Quote: “14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.”
- Rationale: We would not own the Deliverables we pay to have created specifically for us, and the licence back is revocable, non-transferable and expires with the Order Form — below even our fallback. Customer Data ownership in 14.1 is fine; the Deliverables position is not.
- Proposal: **preferred** — We would not own the Deliverables we pay to have created specifically for us, and the licence back is revocable, non-transferable and expires with the Order Form — below even our fallback. Customer Data ownership in 14.1 is fine; the Deliverables position is not.
- Comment: [Playbook] We own the work product we pay for. Vendor retains its pre-existing Vendor Technology under Section 14.3; our fallback is Vendor ownership of generic tools coupled with a perpetual, irrevocable, sublicensable licence to us.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "14.2 Customer exclusively owns each Deliverable created for Customer, and Vendor hereby assigns to Customer all right, title and interest in and to the Deliverables. To the extent any Deliverable is not assignable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid, transferable and sublicensable licence to use, modify, reproduce and create derivative works from that Deliverable for any business purpose.",
    "oldText": "14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.",
    "paragraphId": "p0054"
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
- Finding: `f-license-1165b750` · **compliant** · confidence 0.85
- Location: § 13.1 Subject to payment of applicable Fees, Vendor grants Custom…
- Quote: “Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services”
- Rationale: The grant covers Affiliates and contractors, paid-up licences are perpetual and irrevocable, transfer to a successor is permitted and revocation is limited to uncured material breach. Preferred position met (the revocable Deliverable licence is addressed separately under the IP rule).

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
- Finding: `f-audit-8a2f14c3` · **compliant** · confidence 0.95
- Location: § 22.1 Vendor may audit Customer's compliance with licence quantit…
- Quote: “Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice”
- Rationale: Once per 12 months, 30 days' notice, off-site where practicable, independent auditor, Vendor cost unless underpayment exceeds 5%, and no direct system access — our preferred position.

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
- Finding: `f-ld-c55ae635` · **compliant** · confidence 0.80
- Location: § 27.3 If a force-majeure event materially prevents an affected Se…
- Quote: “Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.”
- Rationale: No liquidated damages or penalties are payable by Customer; refunds run in our favour. (The take-or-pay exposure in Section 2.1 is addressed under the minimum-commitment rule.)

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
- Finding: `f-warranty-540182c8` · **compliant** · confidence 0.90
- Location: § 19.1 Vendor warrants that Services will be performed in a profes…
- Quote: “For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.”
- Rationale: Professional-services warranty, 90-day Deliverable conformance plus term-long hosted conformance, malicious-code and compliance-with-law warranties, and a repair/replace/refund remedy, with the disclaimer expressly not swallowing the express warranties. Preferred position met.

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
- Finding: `f-insurance-c27d1706` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000”
- Rationale: Limits and certificate obligations match our preferred position, including USD 5M cyber cover for a vendor processing Customer Data.

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
- Finding: `f-mincommit-b4ab0b09` · **deviation** · confidence 0.95
- Location: § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv…
- Quote: “2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: A three-year, USD 6M take-or-pay with no reduction or termination right is our walk-away position and contradicts Section 12.3, which records that no minimum-volume commitment has been made. Narrowed to a single-year, reducible commitment.
- Proposal: **preferred** — A three-year, USD 6M take-or-pay with no reduction or termination right is our walk-away position and contradicts Section 12.3, which records that no minimum-volume commitment has been made. Narrowed to a single-year, reducible commitment.
- Comment: [Playbook] We do not take multi-year take-or-pay with no exit. Our fallback is a commitment limited to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a penalty.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.1 Any minimum purchase commitment applies only to the current twelve-month term, is limited to the amount expressly stated in an Order Form, and may be reduced by Customer on thirty days' written notice. Any shortfall is settled by a true-up at the Order Form unit rates and is not a penalty. Fees are otherwise payable only for Services actually ordered or used.",
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
- Finding: `f-transition-acc66e82` · **missing** · confidence 0.85
- Location: § 10.1 On expiry or termination, Customer's right to access termin…
- Quote: “10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period.”
- Rationale: Section 10 refers to an "agreed transition period" but imposes no transition-assistance obligation, no data return or export deadline and no deletion certification (Section 16.5 defers Customer Data to a Section 11 that does not exist). We have inserted the standard exit provision.
- Proposal: **preferred** — Section 10 refers to an "agreed transition period" but imposes no transition-assistance obligation, no data return or export deadline and no deletion certification (Section 16.5 defers Customer Data to a Section 11 that does not exist). We have inserted the standard exit provision.
- Comment: [Playbook] On exit we need our data back and help migrating. Inserted six months' transition assistance, a 30-day export in machine-readable format and certified deletion; our fallback is 90 days of assistance with the same export deadline.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "10.2 At Customer's request, Vendor shall provide reasonable transition assistance for up to six months after expiry or termination at Vendor's then-current rates, shall return all Customer Data in a commonly used, machine-readable format within thirty days of request, and shall thereafter delete Customer Data from its systems and certify such deletion in writing. Vendor shall deliver all completed and in-process Deliverables",
    "oldText": "10.2 Vendor shall deliver all completed and in-process Deliverables",
    "paragraphId": "p0042"
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
| critical | Indemnification by Vendor | missing | § 9.3 Customer may terminate an Order Form immediately if Vendor… |
| critical | Ownership of deliverables and Customer Data | deviation | § 14.2 Vendor exclusively owns every Deliverable created for Custo… |
| critical | Limitation of liability — cap, mutuality and carve-outs | compliant | § 21.1 Except for Excluded Claims, each Party's total aggregate li… |
| high | Assignment and change of control | compliant | § 24.1 Customer may assign this Agreement or an Order Form without… |
| high | Exclusivity obligations binding Customer | compliant | § 12.3 Nothing restricts Customer from developing, acquiring, lice… |
| high | Liquidated damages and penalties payable by Customer | compliant | § 27.3 If a force-majeure event materially prevents an affected Se… |
| high | Licence grant scope | compliant | § 13.1 Subject to payment of applicable Fees, Vendor grants Custom… |
| high | Non-compete restrictions on Customer | deviation | § 12.4 During the term and for twenty-four months thereafter, Cust… |
| high | Termination for convenience | deviation | § 8.1 This Agreement begins on the Effective Date and continues f… |
| medium | Audit rights against Customer | compliant | § 22.1 Vendor may audit Customer's compliance with licence quantit… |
| medium | Governing law and venue | deviation | § 28.1 This Agreement is governed exclusively by Singapore law, an… |
| medium | Most-favoured-nation obligations burdening Customer | deviation | § 7.2 Before engaging another provider, Customer must disclose an… |
| medium | Minimum purchase commitments and volume restrictions on Customer | deviation | § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv… |
| medium | Non-solicitation of employees binding Customer | deviation | § 12.4 Customer shall not solicit, hire, or employ any Vendor empl… |
| medium | Auto-renewal and non-renewal notice window | compliant | § 8.2 Each Order Form has the initial term stated in it and there… |
| medium | Post-termination transition assistance and data return | missing | § 10.1 On expiry or termination, Customer's right to access termin… |
| medium | Performance warranty and duration | compliant | § 19.1 Vendor warrants that Services will be performed in a profes… |
| low | Vendor insurance | compliant | § 18.1 Vendor shall maintain, at its own expense throughout the te… |

## Walk-away items

- Indemnification by Vendor (§ 9.3 Customer may terminate an Order Form immediately if Vendor…): There is no indemnification section in the Agreement — Section 20 is referenced in Section 9.3 but does not exist, so Vendor owes us no defence or indemnity for third-party IP claims, data breach or breach of law. This is a walk-away position for us; we have inserted a standard Vendor indemnity.
- Ownership of deliverables and Customer Data (§ 14.2 Vendor exclusively owns every Deliverable created for Custo…): We would not own the Deliverables we pay to have created specifically for us, and the licence back is revocable, non-transferable and expires with the Order Form — below even our fallback. Customer Data ownership in 14.1 is fine; the Deliverables position is not.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
