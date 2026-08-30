# Trajectory: cuad-americas-shopping-mall-hosting

| Run | Value |
|---|---|
| Contract | cuad-americas-shopping-mall-hosting — EXHIBIT 10.2 |
| Config | b1-prompt |
| Parties | The Deerskin Companies, Inc. (our party) ↔ Hanover Direct, Inc. (HDI) |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2m 57.6s (177,589 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 13,729 input · 15,971 output · 0 cache read · 1,194 cache write |
| Cost | $0.475382 |

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
- Finding: `f-lol-cap-63dc8969` · **missing** · confidence 0.93
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “(a) Each Party represents and warrants to the other Party that (1) it is a corporation organized, validly existing and in goodstanding under the laws of the state of its incorporation;”
- Rationale: The Agreement contains no limitation of liability, no cap and no exclusion of consequential damages, leaving us exposed to unlimited liability in a revenue-share hosting deal. We propose the standard mutual cap (greater of 12 months' fees or USD 1M) with the usual uncapped Excluded Claims.
- Proposal: **preferred** — The Agreement contains no limitation of liability, no cap and no exclusion of consequential damages, leaving us exposed to unlimited liability in a revenue-share hosting deal. We propose the standard mutual cap (greater of 12 months' fees or USD 1M) with the usual uncapped Excluded Claims.
- Comment: [Playbook] We add a mutual liability cap and consequential damages exclusion, since the Agreement is currently silent and both parties are exposed without limit. Confidentiality, indemnity, gross negligence/willful misconduct and IP infringement sit outside the cap.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "the execution of this Agreement will not conflict in any way with any pre-existing agreements or understandings of the Party with any person or entity. Limitation of Liability. Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the amounts paid or payable by the Company to HDI under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000, and neither Party shall be liable for indirect, incidental or consequential damages. \"Excluded Claims\" means a Party's breach of its confidentiality or data protection obligations, its indemnification obligations, its gross negligence, willful misconduct or fraud, and its infringement of the other Party's intellectual property rights; the Company's payment obligations shall not be treated as damages for purposes of this cap.",
    "oldText": "the execution of this Agreement will not conflict in any way with any pre-existing agreements or understandings of the Party with any person or entity.",
    "paragraphId": "p0057"
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
- Finding: `f-indemn-8b3df8fa` · **missing** · confidence 0.92
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “HDI acknowledges that the Company is currently a party to a web-hosting agreement with Globix Corporation (the "Globix Agreement")”
- Rationale: There is no indemnity anywhere in the Agreement. HDI builds, hosts and operates a consumer-facing site under our brand, so we need at minimum an IP infringement, breach-of-law and data-breach indemnity from HDI.
- Proposal: **preferred** — There is no indemnity anywhere in the Agreement. HDI builds, hosts and operates a consumer-facing site under our brand, so we need at minimum an IP infringement, breach-of-law and data-breach indemnity from HDI.
- Comment: [Playbook] We add HDI's indemnity for third-party IP claims, breach of law, data breach and willful misconduct; this is our standard position for a vendor that develops and hosts a customer-facing site.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "provided, that the Globix Agreement is terminated on or prior to the Effective Date. (c) HDI shall defend, indemnify and hold harmless the Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Site or any materials, software or technology provided by HDI infringes or misappropriates any intellectual property right; (ii) HDI's breach of applicable law; (iii) any unauthorized access to or disclosure of Content or customer or user data caused by HDI; or (iv) HDI's gross negligence or willful misconduct.",
    "oldText": "provided, that the Globix Agreement is terminated on or prior to the Effective Date",
    "paragraphId": "p0058"
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
- Finding: `f-noncompete-cfe7f647` · **deviation** · confidence 0.82
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “the Company shall not participate in any project similar to the Site on the Internet with respect to Deerskin Products or products substantially similar to Deerskin Products (including, without limitation, the products of Wilson's House of Leather, Excelled and companies similar to Wilson's House of Leather and Excelled)”
- Rationale: Section 6.1 restricts our online business in "products substantially similar to Deerskin Products" — an undefined field-of-use restriction that could sweep in much of our leather and apparel business — for an indefinitely auto-renewing term, with no carve-out for internal development or acquisitions and no exit if HDI underperforms. We narrow it to Deerskin Products with the usual carve-outs (the closeout carve-out in 6.2 is helpful but insufficient).
- Proposal: **preferred** — Section 6.1 restricts our online business in "products substantially similar to Deerskin Products" — an undefined field-of-use restriction that could sweep in much of our leather and apparel business — for an indefinitely auto-renewing term, with no carve-out for internal development or acquisitions and no exit if HDI underperforms. We narrow it to Deerskin Products with the usual carve-outs (the closeout carve-out in 6.2 is helpful but insufficient).
- Comment: [Playbook] We cannot restrict our business in undefined "substantially similar" products. We have narrowed the restriction to Deerskin Products, added carve-outs for internal development and acquisitions, and an exit if HDI underperforms.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "the Company shall not participate in any project similar to the Site on the Internet with respect to Deerskin Products, provided that this restriction shall not apply to the Company's internal development activities or to any business or products hereafter acquired by the Company, and shall cease automatically if HDI fails to perform its obligations under Section 1.6 or Section 1.8, and",
    "oldText": "the Company shall not participate in any project similar to the Site on the Internet with respect to Deerskin Products or products substantially similar to Deerskin Products (including, without limitation, the products of Wilson's House of Leather, Excelled and companies similar to Wilson's House of Leather and Excelled) and",
    "paragraphId": "p0037"
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
- Finding: `f-exclusivity-8f9068e5` · **needs_review** · confidence 0.70
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “HDI shall have the exclusive right to use of the "Deerskin" brand for a self-contained web site for the offering of Deerskin Products directly to the consumer on the Internet”
- Rationale: The exclusive-dealing element sits in the same sentence as the non-compete and is addressed by our redline at 6.1 (scope narrowed plus automatic termination of the restriction on HDI's failure to perform), so we do not redline it twice. HDI's reciprocal restriction in 6.3 runs in our favour and should be kept.

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
- Finding: `f-mfn-49604c2d` · **compliant** · confidence 0.88
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “HDI agrees that it shall promote the Site and Deerskin Products no less favorably than it promotes HDI's”
- Rationale: The only "no less favorably" obligation runs in our favour (HDI's promotion commitment). No MFN burdens the Company.

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
- Finding: `f-nosolicit-4d31d911` · **compliant** · confidence 0.85
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “10. General Provisions.”
- Rationale: No non-solicitation or no-hire restriction binds the Company, which matches our preferred position.

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
- Finding: `f-t4c-ec7782e2` · **compliant** · confidence 0.75
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “unless terminated by either Party hereto upon ninety (90) days written notice to the other”
- Rationale: Either party may exit on 90 days' notice, which sits at our fallback (60–90 days), and Section 1.6 gives us an additional penalty-free exit if the Site is late. The termination payment attaching to our exit is addressed separately under the liquidated damages rule, and our renewal redline shortens our own notice to 30 days while leaving HDI at 90.

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
- Finding: `f-renewal-04a745d4` · **deviation** · confidence 0.80
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “This Agreement shall be automatically renewed for an additional one year period on each anniversary of the Effective Date, unless terminated by either Party hereto upon ninety (90) days written notice to the other.”
- Rationale: The non-renewal window is 90 days, beyond our fallback of 60 days. Renewal length (12 months) is fine; we shorten our notice to 30 days while leaving HDI's at 90 so we are not exposed to a short-notice exit by the vendor.
- Proposal: **preferred** — The non-renewal window is 90 days, beyond our fallback of 60 days. Renewal length (12 months) is fine; we shorten our notice to 30 days while leaving HDI's at 90 so we are not exposed to a short-notice exit by the vendor.
- Comment: [Playbook] Our position is a non-renewal/termination window of no more than 30 days for us (60 days at fallback); we have left HDI's notice period at 90 days so we retain continuity of service.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "unless terminated by the Company upon thirty (30) days written notice to HDI or by HDI upon ninety (90) days written notice to the Company",
    "oldText": "unless terminated by either Party hereto upon ninety (90) days written notice to the other",
    "paragraphId": "p0024"
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
- Finding: `f-govlaw-b87dbda4` · **compliant** · confidence 0.90
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “This Agreement shall be governed and construed and enforced in accordance with the laws of the State of New York”
- Rationale: New York law is our preferred governing law. The clause is silent on venue; we would normally add exclusive jurisdiction of the state and federal courts in New York County, but this is not worth a redline on its own.

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
- Finding: `f-assign-fd1a46fe` · **compliant** · confidence 0.78
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “This Agreement shall be binding upon, and shall inure to the benefit of and be enforceable by, the parties hereto and their respective legal representatives, successors and assigns”
- Rationale: There is no consent requirement or prohibition on assignment binding the Company and no vendor termination or re-pricing right on our change of control. We would prefer a consent right over HDI's assignment (and no assignment to our competitors), but the clause as drafted does not restrict us.

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
- Finding: `f-ip-4222aa1d` · **missing** · confidence 0.85
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “The Company shall have exclusive artistic and editorial control over the Site, including, without limitation, the implementation of the Content on the Site and the design and look and feel of the Site.”
- Rationale: The Agreement allocates editorial control but never allocates ownership of the Site, the pages HDI develops for us, or the customer and user data collected through the Site. Since HDI builds and hosts everything at its cost, silence risks HDI asserting ownership of what we pay for and of our data; we add an express ownership and licence-back sentence.
- Proposal: **preferred** — The Agreement allocates editorial control but never allocates ownership of the Site, the pages HDI develops for us, or the customer and user data collected through the Site. Since HDI builds and hosts everything at its cost, silence risks HDI asserting ownership of what we pay for and of our data; we add an express ownership and licence-back sentence.
- Comment: [Playbook] We own the deliverables we contract for and our customer data; HDI keeps its platform and tools with a licence back to us for anything embedded in the Site.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "No portion of the Site shall be made available on the Internet without the consent of the Company. As between the Parties, the Company owns all right, title and interest in and to the Content, the Site (including its design, look and feel and all pages and materials developed by HDI for the Company hereunder) and all customer and user data collected through the Site, and HDI hereby assigns such rights to the Company; HDI retains ownership of its pre-existing and generally applicable hosting platform, tools and know-how and grants the Company a perpetual, irrevocable, worldwide, royalty-free licence to use any such HDI materials as embedded in the Site.",
    "oldText": "No portion of the Site shall be made available on the Internet without the consent of the Company.",
    "paragraphId": "p0032"
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
- Finding: `f-license-b164fe4a` · **needs_review** · confidence 0.60
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “the right to use, a computer system on which the Site will be stored and operated, with a direct Internet connection of shared but greater than T-1 bandwidth”
- Rationale: The access right granted to us in Section 1.4 does not name our affiliates or contractors acting on our behalf and has no stated duration or revocation standard. This is incidental to a hosting arrangement rather than a software licence, but if affiliates or third-party agencies will access the admin tools we should add "and its Affiliates and contractors acting on its behalf".

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
- Finding: `f-audit-6b2cca01` · **deviation** · confidence 0.80
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “HDI's General Manager (as hereinafter defined), may upon no less than thirty (30) days prior written notice to the Company, have the right to inspect the records of the Company's General Manager reasonably related to the calculation of such payments during the Company's normal business hours.”
- Rationale: Notice (30 days), business hours and HDI-borne cost are all acceptable, but there is no limit on frequency, so inspections could be repeated at will. We add a once-per-12-months cap with a minimal edit.
- Proposal: **preferred** — Notice (30 days), business hours and HDI-borne cost are all acceptable, but there is no limit on frequency, so inspections could be repeated at will. We add a once-per-12-months cap with a minimal edit.
- Comment: [Playbook] Audits of our records should be no more than once per 12 months on 30 days' notice. The remaining terms (business hours, HDI's cost) already meet our position.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "may, no more than once in any twelve (12) month period and upon no less than thirty (30) days prior written notice to the Company, have the right to inspect",
    "oldText": "may upon no less than thirty (30) days prior written notice to the Company, have the right to inspect",
    "paragraphId": "p0022"
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
- Finding: `f-ld-b633ead1` · **deviation** · confidence 0.88
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “the Company shall pay to HDI a termination payment, (the "Termination Payment") the amount of which shall be an amount equal to the aggregate Net Sales for the twelve (12) months preceding the Termination Date less $800,000, the balance of which shall be divided by two.”
- Rationale: The Termination Payment is a one-way, uncapped penalty on us measured against gross Net Sales (not fees), so it can far exceed the value of the services and greatly exceed our 3-months'-fees fallback. HDI owes nothing on its own termination. We cap it at three months' fees as the sole remedy.
- Proposal: **preferred** — The Termination Payment is a one-way, uncapped penalty on us measured against gross Net Sales (not fees), so it can far exceed the value of the services and greatly exceed our 3-months'-fees fallback. HDI owes nothing on its own termination. We cap it at three months' fees as the sole remedy.
- Comment: [Playbook] We do not pay liquidated damages; where an early-termination fee is unavoidable we cap it at three months' fees. Measuring the payment against gross Net Sales rather than fees is not something we can accept.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "the Company shall pay to HDI a termination payment (the \"Termination Payment\") in an amount equal to the aggregate payments made by the Company to HDI under Section 3.1 in respect of the three (3) calendar months preceding the Termination Date, which shall be HDI's sole and exclusive remedy in respect of such termination.",
    "oldText": "the Company shall pay to HDI a termination payment, (the \"Termination Payment\") the amount of which shall be an amount equal to the aggregate Net Sales for the twelve (12) months preceding the Termination Date less $800,000, the balance of which shall be divided by two.",
    "paragraphId": "p0026"
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
- Finding: `f-warranty-ff69ee0c` · **deviation** · confidence 0.85
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “(a) Each Party represents and warrants to the other Party that (1) it is a corporation organized, validly existing and in goodstanding under the laws of the state of its incorporation;”
- Rationale: Section 9 contains only corporate authority representations — there is no performance or conformance warranty for the development, hosting and maintenance services and no remedy. We insert the standard workmanlike-performance and 90-day conformance warranty.
- Proposal: **preferred** — Section 9 contains only corporate authority representations — there is no performance or conformance warranty for the development, hosting and maintenance services and no remedy. We insert the standard workmanlike-performance and 90-day conformance warranty.
- Comment: [Playbook] The warranty section covers only corporate authority. We add a workmanlike-performance warranty and a 90-day conformance warranty with a repair/re-perform/refund remedy.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "9. Warranties. HDI warrants that (i) the design, development, hosting, maintenance and management services will be performed in a professional and workmanlike manner consistent with industry standards; (ii) for ninety (90) days following the Effective Date the Site will conform in all material respects to the specifications approved by the Company; and (iii) the Site will contain no malicious code. The Company's remedy for breach of this warranty is, at HDI's option, re-performance or correction of the non-conforming services or, failing that, a refund of amounts paid in respect of them.",
    "oldText": "9. Warranties.",
    "paragraphId": "p0055"
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
- Finding: `f-insurance-8a77683d` · **missing** · confidence 0.75
- Location: § 5.4 Each of HDI and the Company shall appoint a
- Quote: “10.1 Notices.”
- Rationale: There is no insurance clause, yet HDI hosts the Site and handles customer order and user data. We add a short E&O and cyber insurance requirement at our fallback levels.
- Proposal: **preferred** — There is no insurance clause, yet HDI hosts the Site and handles customer order and user data. We add a short E&O and cyber insurance requirement at our fallback levels.
- Comment: [Playbook] Vendors that host our site and process customer data carry E&O and cyber cover. Inserted at fallback limits; section numbering to be conformed.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "10.1 Insurance. HDI shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 1,000,000; and cyber liability insurance of not less than USD 2,000,000. HDI shall provide certificates of insurance on request.\n\n10.2 Notices.",
    "oldText": "10.1 Notices.",
    "paragraphId": "p0060"
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
- Finding: `f-mincommit-4854f18c` · **compliant** · confidence 0.85
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “The Company shall pay HDI thirty percent (3016) of the Net Sales in excess of Eleven Thousand Dollars ($11,000) per calendar month.”
- Rationale: Fees are a pure revenue share with a monthly threshold in our favour; there is no minimum purchase or take-or-pay commitment. (Note the apparent typo "3016" should read "30%".)

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
- Finding: `f-transition-1c6f4092` · **missing** · confidence 0.87
- Location: § 1.4 HDI shall provide the Company with access to, and
- Quote: “The Termination Payment, if any, shall be payable by the Company in eight (8) equal payments to be made quarterly, commencing thirty (30) days after the termination date.”
- Rationale: Nothing requires HDI to return our Content, customer and user data or to assist with migration on termination, even though HDI holds everything on its own servers. We add a transition assistance and data return paragraph in Section 4.
- Proposal: **preferred** — Nothing requires HDI to return our Content, customer and user data or to assist with migration on termination, even though HDI holds everything on its own servers. We add a transition assistance and data return paragraph in Section 4.
- Comment: [Playbook] On exit we need our data back and reasonable migration help. Inserted our standard transition and data-return language.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "The Termination Payment, if any, shall be payable by the Company in eight (8) equal payments to be made quarterly, commencing thirty (30) days after the termination date. Upon expiry or termination of this Agreement for any reason, HDI shall (i) at the Company's request, provide reasonable transition assistance for up to six (6) months at HDI's then-current rates; (ii) within thirty (30) days, return all Content and all customer and user data relating to the Site in a commonly used, machine-readable format; and (iii) thereafter delete such data from its systems and certify such deletion in writing.",
    "oldText": "The Termination Payment, if any, shall be payable by the Company in eight (8) equal payments to be made quarterly, commencing thirty (30) days after the termination date.",
    "paragraphId": "p0029"
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
# Issues memo: EXHIBIT 10.2

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | missing | § 5.4 Each of HDI and the Company shall appoint a |
| critical | Ownership of deliverables and Customer Data | missing | § 1.4 HDI shall provide the Company with access to, and |
| critical | Limitation of liability — cap, mutuality and carve-outs | missing | § 5.4 Each of HDI and the Company shall appoint a |
| high | Assignment and change of control | compliant | § 5.4 Each of HDI and the Company shall appoint a |
| high | Exclusivity obligations binding Customer | needs_review | § 5.4 Each of HDI and the Company shall appoint a |
| high | Liquidated damages and penalties payable by Customer | deviation | § 1.4 HDI shall provide the Company with access to, and |
| high | Licence grant scope | needs_review | § 1.4 HDI shall provide the Company with access to, and |
| high | Non-compete restrictions on Customer | deviation | § 5.4 Each of HDI and the Company shall appoint a |
| high | Termination for convenience | compliant | § 1.4 HDI shall provide the Company with access to, and |
| medium | Audit rights against Customer | deviation | § 1.4 HDI shall provide the Company with access to, and |
| medium | Governing law and venue | compliant | § 5.4 Each of HDI and the Company shall appoint a |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § 1.4 HDI shall provide the Company with access to, and |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § 1.4 HDI shall provide the Company with access to, and |
| medium | Non-solicitation of employees binding Customer | compliant | § 5.4 Each of HDI and the Company shall appoint a |
| medium | Auto-renewal and non-renewal notice window | deviation | § 1.4 HDI shall provide the Company with access to, and |
| medium | Post-termination transition assistance and data return | missing | § 1.4 HDI shall provide the Company with access to, and |
| medium | Performance warranty and duration | deviation | § 5.4 Each of HDI and the Company shall appoint a |
| low | Vendor insurance | missing | § 5.4 Each of HDI and the Company shall appoint a |

## Walk-away items

- Indemnification by Vendor (§ 5.4 Each of HDI and the Company shall appoint a): There is no indemnity anywhere in the Agreement. HDI builds, hosts and operates a consumer-facing site under our brand, so we need at minimum an IP infringement, breach-of-law and data-breach indemnity from HDI.
- Ownership of deliverables and Customer Data (§ 1.4 HDI shall provide the Company with access to, and): The Agreement allocates editorial control but never allocates ownership of the Site, the pages HDI develops for us, or the customer and user data collected through the Site. Since HDI builds and hosts everything at its cost, silence risks HDI asserting ownership of what we pay for and of our data; we add an express ownership and licence-back sentence.
- Limitation of liability — cap, mutuality and carve-outs (§ 5.4 Each of HDI and the Company shall appoint a): The Agreement contains no limitation of liability, no cap and no exclusion of consequential damages, leaving us exposed to unlimited liability in a revenue-share hosting deal. We propose the standard mutual cap (greater of 12 months' fees or USD 1M) with the usual uncapped Excluded Claims.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
