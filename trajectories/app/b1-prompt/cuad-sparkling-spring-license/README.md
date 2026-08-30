# Trajectory: cuad-sparkling-spring-license

| Run | Value |
|---|---|
| Contract | cuad-sparkling-spring-license — SOFTWARE LICENSE AND MAINTENANCE AGREEMENT |
| Config | b1-prompt |
| Parties | Sparkling Spring Water Group Limited (our party) ↔ Garman Routing Systems, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 44.9s (104,934 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 16,340 input · 9,229 output · 1,194 cache read · 0 cache write |
| Cost | $0.313022 |

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
- Finding: `f-lol-cap-28ee64b4` · **needs_review** · confidence 0.60
- Location: § 15 LIMITATION OF GARMAN'S LIABILITY
- Quote: “The exclusive remedy of either party in a claim against the other under this Agreement shall be the recovery of its direct damages. In no event shall either party be liable to the other for the recovery of any special, indirect or consequential damages”
- Rationale: The clause is mutual, excludes consequential damages on both sides and carves out Sections 13 (IP indemnity) and 14 (confidentiality), which matches the playbook's carve-out expectations. There is, however, no monetary cap at all, so our own direct-damages exposure is unlimited as well as Garman's. Because the asymmetry the playbook guards against (Customer uncapped / Vendor capped) is absent and unlimited Vendor liability favours us, we would not redline unilaterally, but flag for a commercial decision on whether to propose a mutual 12-month-fees / USD 1M cap.

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
- Finding: `f-indemn-8a37ec3b` · **compliant** · confidence 0.72
- Location: § PAGE 6
- Quote: “Garman agrees to indemnify Sparkling and hold it harmless from any and all losses, damages and expenses including without limitation, court costs, arbitration fees, penalties, fines, amounts paid in settlement of claims and reasonable legal fees”
- Rationale: Garman gives an IP ownership/non-infringement warranty backed by an indemnity, with the usual procure/modify/replace remedies, which sits at the playbook fallback. Two points to note rather than redline: the ten-calendar-day claim-notice period is tight and ideally should be "prompt notice, and only to the extent prejudiced", and there is no indemnity for Garman's breach of law or wilful misconduct.

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
- Finding: `f-noncompete-eecf0e6b` · **compliant** · confidence 0.80
- Location: § 3 RESTRICTIONS ON USE
- Quote: “not use the Work to act as a service bureau in whole or in part, for any other Person, except for any affiliate of Sparkling operating at the Authorized Locations”
- Rationale: No non-compete or field-of-use restriction on our business. Section 3 contains only ordinary licence-scope restrictions on use of the Software, which the playbook does not treat as a restrictive covenant.

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
- Finding: `f-exclusivity-2b922356` · **compliant** · confidence 0.85
- Location: § 2 GRANT OF LICENSE
- Quote: “a non-transferable and non-exclusive licence to use”
- Rationale: No exclusivity or sole-supplier obligation is imposed on us; we remain free to license competing software from other suppliers.

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
- Finding: `f-mfn-4ef3624b` · **compliant** · confidence 0.80
- Location: § 11 FEES
- Quote: “Sparkling shall pay the fees as set out in the Fee Schedule in accordance with the terms of this Agreement and the Fee Schedule.”
- Rationale: No most-favoured-nation obligation burdening us appears anywhere in the agreement.

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
- Finding: `f-nosolicit-3c1cc0f3` · **deviation** · confidence 0.82
- Location: § 19 NON-SOLICITATION OF EMPLOYEES
- Quote: “both parties agree not to hire or allow its respective affiliates to hire any employee of the other party”
- Rationale: This is a no-hire (not a non-solicit) covering all of Garman's employees and binding our affiliates, with no carve-out for general advertising or unsolicited approaches. No-hire provisions are walk-away territory under our playbook; we narrow it to a mutual solicitation restriction limited to personnel involved in the services, with the standard carve-outs.
- Proposal: **preferred** — This is a no-hire (not a non-solicit) covering all of Garman's employees and binding our affiliates, with no carve-out for general advertising or unsolicited approaches. No-hire provisions are walk-away territory under our playbook; we narrow it to a mutual solicitation restriction limited to personnel involved in the services, with the standard carve-outs.
- Comment: [Playbook] We can accept a mutual, narrow non-solicit but not a no-hire: we have converted this to a solicitation restriction limited to personnel involved in the services, with the standard general-advertising and unsolicited-approach carve-outs.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "During the term of this Agreement and for a period of one year thereafter, both parties agree not to solicit for employment any employee of the other party who was directly involved in the provision or receipt of services under this Agreement, provided that neither general advertisements or recruitment campaigns not specifically targeted at such employees, nor the hiring of any person who responds to such advertisements or who approaches a party on an unsolicited basis, shall constitute a breach of this Section.",
    "oldText": "During the term of this Agreement and for a period of one year thereafter, both parties agree not to hire or allow its respective affiliates to hire any employee of the other party, or any person who was an employee of the other party during the previous six months and who was directly involved in the provision of services under this Agreement.",
    "paragraphId": "p0133"
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
- Finding: `f-t4c-8ad130ae` · **compliant** · confidence 0.75
- Location: § 17 TERM AND TERMINATION
- Quote: “Sparkling may terminate this Agreement at any time upon ninety (90) calendar days written notice to Garman.”
- Rationale: We have an unrestricted convenience right on 90 days' notice with no early-termination fee, and Garman has no convenience right — this sits at the playbook fallback (preferred is 30 days plus an express pro-rata refund of prepaid fees, which is absent). Not worth a redline given the perpetual, fee-driven structure.

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
- Finding: `f-renewal-31d84075` · **compliant** · confidence 0.60
- Location: § 10 MAINTENANCE AND SUPPORT
- Quote: “For a renewable one-year term commencing upon the Maintenance Commencement Date, subject to payment of maintenance fees in accordance with the Fee Schedule”
- Rationale: The licence is perpetual and maintenance runs in renewable one-year terms with no automatic renewal, no non-renewal notice window and no stated uplift mechanic. Nothing to redline; we should confirm the Fee Schedule does not contain an uncapped maintenance uplift.

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
- Finding: `f-govlaw-ca860460` · **needs_review** · confidence 0.65
- Location: § PAGE 10
- Quote: “This Agreement shall be governed by the laws of Nova Scotia and the laws of Canada applicable in Nova Scotia. All disputes under this Agreement shall be subject to the non-exclusive jurisdiction of the courts of Nova Scotia.”
- Rationale: Nova Scotia is outside our accepted list (NY, DE, CA, England and Wales), but it is our own home jurisdiction — not Garman's (Saskatchewan) — and the venue is non-exclusive, so the clause does not create the foreign-forum risk the playbook targets. We would leave it unless the business prefers New York.

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
- Finding: `f-assign-7f6e0807` · **deviation** · confidence 0.85
- Location: § PAGE 10
- Quote: “Neither party may assign this Agreement or any rights and obligations under this Agreement to any third party without the written consent of the other party.”
- Rationale: This is a blanket consent requirement with no affiliate or M&A carve-out and no reasonableness standard, which is walk-away territory: it would let Garman block or re-price on a sale of our business. We add the successor/affiliate carve-out and a reasonableness standard, keeping the clause mutual.
- Proposal: **preferred** — This is a blanket consent requirement with no affiliate or M&A carve-out and no reasonableness standard, which is walk-away territory: it would let Garman block or re-price on a sale of our business. We add the successor/affiliate carve-out and a reasonableness standard, keeping the clause mutual.
- Comment: [Playbook] We cannot accept a consent right over our own corporate transactions; we have added the standard affiliate/successor carve-out and a reasonableness standard, applied mutually. Section 3(c) should be read subject to this provision.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(d) Neither party may assign this Agreement or any rights and obligations under this Agreement to any third party without the written consent of the other party, such consent not to be unreasonably withheld, conditioned or delayed; provided that either party may assign this Agreement, upon written notice to the other party and without consent, to an affiliate or to a successor in connection with a merger, amalgamation, acquisition or sale of all or substantially all of its assets.",
    "oldText": "(d) Neither party may assign this Agreement or any rights and obligations under this Agreement to any third party without the written consent of the other party.",
    "paragraphId": "p0142"
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
- Finding: `f-ip-d1e7a696` · **compliant** · confidence 0.62
- Location: § 13 INTELLECTUAL PROPERTY INDEMNITY
- Quote: “Garman is the owner of all intellectual property rights in the Work (including any Improvements or Modifications thereto)... No title to the intellectual property in the Work is transferred to Sparkling by this Agreement.”
- Rationale: Garman retaining ownership of its own software is acceptable, and we receive a licence plus on-site source code and a perpetual fallback licence on default. Worth noting (not redlining) that Modifications built to our Schedule "D" specifications also vest in Garman, and that the agreement says nothing about ownership of our data — neither is a walk-away because no Customer IP or data is assigned to Garman.

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
- Finding: `f-license-293583c2` · **deviation** · confidence 0.70
- Location: § 2 GRANT OF LICENSE
- Quote: “Garman hereby grants to Sparkling, for the use of Sparkling and affiliated companies of Sparkling operating at Authorized Locations, a non-transferable and non-exclusive licence to use”
- Rationale: Affiliates are covered, but the licence is expressly non-transferable with no path to a successor in an M&A transaction and does not extend to contractors acting on our behalf (e.g. outsourced IT operating the AS400s). That fails the playbook fallback, which requires successor transferability.
- Proposal: **preferred** — Affiliates are covered, but the licence is expressly non-transferable with no path to a successor in an M&A transaction and does not extend to contractors acting on our behalf (e.g. outsourced IT operating the AS400s). That fails the playbook fallback, which requires successor transferability.
- Comment: [Playbook] Our licences must reach contractors operating the systems for us and must follow the business in an M&A transaction; we have made those two minimal edits and left the scope otherwise unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Garman hereby grants to Sparkling, for the use of Sparkling, affiliated companies of Sparkling and contractors acting on their behalf operating at Authorized Locations, a non-exclusive licence, transferable to a successor in connection with a merger, amalgamation, acquisition or sale of all or substantially all of Sparkling's assets, to use:",
    "oldText": "Garman hereby grants to Sparkling, for the use of Sparkling and affiliated companies of Sparkling operating at Authorized Locations, a non-transferable and non-exclusive licence to use:",
    "paragraphId": "p0028"
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
- Finding: `f-audit-e4c65374` · **compliant** · confidence 0.75
- Location: § PAGE 8
- Quote: “Sparkling may itself or by retaining independent experts, examine and test the materials for compliance with the obligations of Garman hereunder”
- Rationale: The agreement contains no audit, inspection or licence-verification right exercisable by Garman against us; the only examination right runs in our favour. This is the preferred position.

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
- Finding: `f-ld-1e984972` · **compliant** · confidence 0.80
- Location: § 17 TERM AND TERMINATION
- Quote: “Sparkling may terminate this Agreement at any time upon ninety (90) calendar days written notice to Garman.”
- Rationale: No liquidated damages, penalties or early-termination charges are payable by us; termination for convenience carries no fee.

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
- Finding: `f-warranty-f1983ffd` · **compliant** · confidence 0.70
- Location: § 12 SPECIFICATIONS AND WARRANTY
- Quote: “For the acceptance period and for a period of one year from the Maintenance Commencement Date, and thereafter for as long as the Software is covered by Maintenance Services and is used by Sparkling in accordance with this Agreement, Garman warrants that the Software shall perform in conformance with the Specifications in all material respects.”
- Rationale: A one-year (and, while maintained, evergreen) conformance warranty with a repair remedy exceeds the preferred 12-month software warranty, and there is no "AS IS" disclaimer anywhere. We note only that the remedy stops at best-efforts repair with no refund backstop and that there is no express no-malicious-code or compliance-with-laws warranty.

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
- Finding: `f-insurance-590172e4` · **missing** · confidence 0.70
- Location: § 20 GENERAL MATTERS
- Quote: “20. GENERAL MATTERS”
- Rationale: The agreement contains no insurance obligation, although Garman installs software on our systems, converts our data and attends our Authorized Locations. We insert a short general liability and E&O provision in the General Matters section (cyber cover omitted as Garman does not host our data).
- Proposal: **preferred** — The agreement contains no insurance obligation, although Garman installs software on our systems, converts our data and attends our Authorized Locations. We insert a short general liability and E&O provision in the General Matters section (cyber cover omitted as Garman does not host our data).
- Comment: [Playbook] Vendors working on our systems and premises carry standard cover; we have inserted our baseline CGL and E&O limits (fallback: E&O USD 1M). Subsequent lettering to be renumbered.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(i) Garman shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter, commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate, and professional liability (errors and omissions) insurance of not less than USD 2,000,000, and shall provide certificates of insurance to Sparkling on request.\n\n(j) All paragraph headings contained in this Agreement are for convenience only and shall not affect the interpretation of this Agreement.",
    "oldText": "(i) All paragraph headings contained in this Agreement are for convenience only and shall not affect the interpretation of this Agreement.",
    "paragraphId": "p0147"
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
- Finding: `f-mincommit-2a172b66` · **compliant** · confidence 0.55
- Location: § 11 FEES
- Quote: “Sparkling shall pay the fees as set out in the Fee Schedule in accordance with the terms of this Agreement and the Fee Schedule.”
- Rationale: No minimum purchase, take-or-pay or shortfall obligation appears in the body of the agreement. We should confirm Schedule "A" (not provided) contains no minimum maintenance commitment.

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
- Finding: `f-transition-c35714d5` · **needs_review** · confidence 0.55
- Location: § 17 TERM AND TERMINATION
- Quote: “Sparkling shall cease using the Software at the end of the ninety (90) day notice period, and shall certify to Garman within thirty (30) calendar days of termination that Sparkling has destroyed or has returned to Garman all Software, Documentation and Codes.”
- Rationale: There is no transition-assistance or data-return obligation on Garman. The risk is materially mitigated because this is an on-premises AS400 deployment (our data stays with us) and Section 16 gives us on-site source code plus a perpetual licence if we terminate for Garman's default. We would nonetheless ask for a short exit-assistance right (up to 6 months at then-current rates, including data extraction support) if the negotiation allows.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

No memo LLM call was made; this configuration used the deterministic memo renderer.

```markdown
# Issues memo: SOFTWARE LICENSE AND MAINTENANCE AGREEMENT

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | compliant | § PAGE 6 |
| critical | Ownership of deliverables and Customer Data | compliant | § 13 INTELLECTUAL PROPERTY INDEMNITY |
| critical | Limitation of liability — cap, mutuality and carve-outs | needs_review | § 15 LIMITATION OF GARMAN'S LIABILITY |
| high | Assignment and change of control | deviation | § PAGE 10 |
| high | Exclusivity obligations binding Customer | compliant | § 2 GRANT OF LICENSE |
| high | Liquidated damages and penalties payable by Customer | compliant | § 17 TERM AND TERMINATION |
| high | Licence grant scope | deviation | § 2 GRANT OF LICENSE |
| high | Non-compete restrictions on Customer | compliant | § 3 RESTRICTIONS ON USE |
| high | Termination for convenience | compliant | § 17 TERM AND TERMINATION |
| medium | Audit rights against Customer | compliant | § PAGE 8 |
| medium | Governing law and venue | needs_review | § PAGE 10 |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § 11 FEES |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § 11 FEES |
| medium | Non-solicitation of employees binding Customer | deviation | § 19 NON-SOLICITATION OF EMPLOYEES |
| medium | Auto-renewal and non-renewal notice window | compliant | § 10 MAINTENANCE AND SUPPORT |
| medium | Post-termination transition assistance and data return | needs_review | § 17 TERM AND TERMINATION |
| medium | Performance warranty and duration | compliant | § 12 SPECIFICATIONS AND WARRANTY |
| low | Vendor insurance | missing | § 20 GENERAL MATTERS |

## Walk-away items

- Limitation of liability — cap, mutuality and carve-outs (§ 15 LIMITATION OF GARMAN'S LIABILITY): The clause is mutual, excludes consequential damages on both sides and carves out Sections 13 (IP indemnity) and 14 (confidentiality), which matches the playbook's carve-out expectations. There is, however, no monetary cap at all, so our own direct-damages exposure is unlimited as well as Garman's. Because the asymmetry the playbook guards against (Customer uncapped / Vendor capped) is absent and unlimited Vendor liability favours us, we would not redline unilaterally, but flag for a commercial decision on whether to propose a mutual 12-month-fees / USD 1M cap.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
