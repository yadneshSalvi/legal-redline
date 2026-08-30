# Trajectory: cuad-bnc-mortgage-hosting

| Run | Value |
|---|---|
| Contract | cuad-bnc-mortgage-hosting — EXHIBIT 10.4 |
| Config | b1-prompt |
| Parties | Mortgage Logic.com, Inc. (our party) ↔ TrueLink, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2m 17.8s (137,781 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 18,076 input · 13,007 output · 0 cache read · 1,194 cache write |
| Cost | $0.423017 |

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
- Finding: `f-lol-cap-657fe724` · **deviation** · confidence 0.92
- Location: § 12 INDEMNITY.
- Quote: “IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.”
- Rationale: The cap is one-way: TrueLink is capped at 12 months' fees while our liability (including under the broad Client indemnity in Section 12(a)) is unlimited. That is walk-away territory under our playbook; we need a mutual cap with the standard carve-outs sitting outside it.
- Proposal: **preferred** — The cap is one-way: TrueLink is capped at 12 months' fees while our liability (including under the broad Client indemnity in Section 12(a)) is unlimited. That is walk-away territory under our playbook; we need a mutual cap with the standard carve-outs sitting outside it.
- Comment: [Playbook] We have made the cap mutual and applied it to the whole Agreement rather than only Sections 3, 4, 7 and 11; as drafted our exposure is uncapped while TrueLink's is limited. Indemnities, confidentiality/data breaches and wilful misconduct sit outside the cap for both parties.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL COMPENSATION PAID OR PAYABLE FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTH PERIOD; PROVIDED THAT THIS LIMITATION SHALL NOT APPLY TO EITHER PARTY'S INDEMNIFICATION OBLIGATIONS, BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, OR INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS, NOR TO CLIENT'S OBLIGATION TO PAY FEES DUE.",
    "oldText": "IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.",
    "paragraphId": "p0077"
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
- Finding: `f-indemn-546b725d` · **deviation** · confidence 0.80
- Location: § 12 INDEMNITY.
- Quote: “claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder.”
- Rationale: TrueLink's indemnity is tied solely to its own breach and does not cover third-party claims that the Interface or Services infringe IP rights, TrueLink-caused data breach, or breach of law — the core protections we need from a hosting/licensing vendor. (Client's indemnity in 12(a) is by contrast very broad.)
- Proposal: **preferred** — TrueLink's indemnity is tied solely to its own breach and does not cover third-party claims that the Interface or Services infringe IP rights, TrueLink-caused data breach, or breach of law — the core protections we need from a hosting/licensing vendor. (Client's indemnity in 12(a) is by contrast very broad.)
- Comment: [Playbook] We require a vendor IP-infringement indemnity plus cover for TrueLink-caused data incidents, breach of law and wilful misconduct. Usual exclusions (Client modifications, combinations, Client specifications) and procure/modify/replace/refund remedies are acceptable as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(i) any claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder; (ii) any allegation that the Interface, the Hosting Services or the Support Services infringe or misappropriate any intellectual property right of a third party; (iii) TrueLink's breach of applicable law; (iv) any unauthorized access to or disclosure of Client Content, Client Proprietary Information or borrower or loan data caused by TrueLink; or (v) TrueLink's gross negligence or willful misconduct.",
    "oldText": "claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder.",
    "paragraphId": "p0075"
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
- Finding: `f-noncompete-6528db39` · **needs_review** · confidence 0.60
- Location: § 2 LICENSE.
- Quote: “subject to the limitations set forth in and in accordance with the Non-Competition Agreement”
- Rationale: This Agreement itself imposes no non-compete on us — Section 2(a) expressly confirms we may develop or buy similar software elsewhere. However, a separate "Non-Competition Agreement" is referenced and not provided; we should review it before signing to confirm it does not restrict our business.

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
- Finding: `f-exclusivity-4aa97f1f` · **deviation** · confidence 0.70
- Location: § 2 LICENSE.
- Quote: “Subject to the foregoing, Client shall order TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface.”
- Rationale: This is a de facto requirements/exclusivity obligation: every underwriting request through the Interface must be accompanied by a credit report bought from TrueLink, for the full term and with no performance-based exit. We keep the freedom to source credit reports elsewhere.
- Proposal: **preferred** — This is a de facto requirements/exclusivity obligation: every underwriting request through the Interface must be accompanied by a credit report bought from TrueLink, for the full term and with no performance-based exit. We keep the freedom to source credit reports elsewhere.
- Comment: [Playbook] We cannot commit to source all credit reports from one supplier. If TrueLink needs volume protection we can discuss a defined 12-month category commitment that ends automatically if service levels are missed.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Subject to the foregoing, Client may order from TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface. Nothing in this Agreement obligates Client to procure credit reports or related services exclusively from TrueLink.",
    "oldText": "Subject to the foregoing, Client shall order TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface.",
    "paragraphId": "p0042"
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
- Finding: `f-mfn-e2d0a8d8` · **compliant** · confidence 0.90
- Location: § 5 COMPENSATION.
- Quote: “rates charged for Hosting Services will not exceed that charged by TrueLink to any other party”
- Rationale: The MFN runs in our favour (TrueLink's rates cannot exceed those given to any other customer) and there is no obligation on us to extend better terms to TrueLink. No change sought.

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
- Finding: `f-nosolicit-82d3c33e` · **compliant** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “The provisions of Sections 1 and 5 through 30 this Agreement will survive the expiration or termination of this Agreement.”
- Rationale: No non-solicitation or no-hire restriction binds us anywhere in the Agreement, which matches our preferred position.

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
- Finding: `f-t4c-8c77ace7` · **compliant** · confidence 0.75
- Location: § 12 INDEMNITY.
- Quote: “TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: We may terminate at will on roughly 30–60 days' effective notice with no early-termination fee, and TrueLink has no convenience right. Fees are billed monthly in arrears, so the absence of a prepaid-fee refund clause is immaterial.

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
- Finding: `f-renewal-9ab9de5a` · **compliant** · confidence 0.80
- Location: § 12 INDEMNITY.
- Quote: “This Agreement shall renew automatically thereafter for successive one year periods until terminated pursuant to Section 12 herein or unless either Client or TrueLink deliver to the other written notice of intent not to renew no later than thirty (30) days prior to the end of said year.”
- Rationale: Automatic 12-month renewals with a 30-day non-renewal window meet our preferred position. There is no renewal price-uplift cap beyond the first-year freeze in Section 6 — worth adding at CPI/3% if the drafting is reopened, but not a blocker. (Note the cross-reference to "Section 12" should read Section 14.)

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
- Finding: `f-govlaw-c1bb754d` · **compliant** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “resolved solely and exclusively in the state or federal courts located within San Luis Obispo County, California”
- Rationale: California law with exclusive California court venue sits at our accepted fallback (no arbitration). Venue in the vendor's home county is inconvenient; we would prefer a neutral California venue, but this is not a redline point.

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
- Finding: `f-assign-0a8a7267` · **deviation** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.”
- Rationale: There is no carve-out allowing us to assign to a successor in a merger, acquisition or sale of substantially all assets, and consent is not qualified by a reasonableness standard. That fails our fallback (successor assignment on notice; consent not unreasonably withheld).
- Proposal: **preferred** — There is no carve-out allowing us to assign to a successor in a merger, acquisition or sale of substantially all assets, and consent is not qualified by a reasonableness standard. That fails our fallback (successor assignment on notice; consent not unreasonably withheld).
- Comment: [Playbook] We must be able to move this contract with our corporate structure; we have added the successor/M&A carve-out (mutual) and a reasonableness standard on consent.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, such approval not to be unreasonably withheld, conditioned or delayed, except that no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assets of the assigning party, upon written notice to the other party. No change of control of Client shall give TrueLink any right to terminate, suspend or re-price this Agreement.",
    "oldText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.",
    "paragraphId": "p0080"
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
- Finding: `f-ip-ad69f7ea` · **deviation** · confidence 0.72
- Location: § 8 COVENANTS AND WARRANTIES OF CLIENT
- Quote: “Client hereby grants to TrueLink the nonexclusive worldwide right and license to use, distribute, disseminate, license, resell, exploit, upload, display, copy and store Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement.”
- Rationale: We grant TrueLink an unlimited-duration worldwide right to resell and commercially exploit borrower Credit Data, with the only limits sitting in a separate Non-Competition Agreement not before us. Even though framed as a licence rather than an assignment, this is a transfer of value in our data (and carries consumer-privacy risk) and should be limited to providing the Services. The Agreement also does not state who owns customisation work product from the Support Services.
- Proposal: **preferred** — We grant TrueLink an unlimited-duration worldwide right to resell and commercially exploit borrower Credit Data, with the only limits sitting in a separate Non-Competition Agreement not before us. Even though framed as a licence rather than an assignment, this is a transfer of value in our data (and carries consumer-privacy risk) and should be limited to providing the Services. The Agreement also does not state who owns customisation work product from the Support Services.
- Comment: [Playbook] We do not grant vendors resale rights over our data. Use is narrowed to delivering the Services (plus de-identified aggregate use), and we have added an express statement that we retain ownership of our content, data and Support Services work product.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Client hereby grants to TrueLink a nonexclusive, non-transferable license to use, copy, store and transmit Credit Data solely as necessary to provide the Hosting Services and Support Services to Client during the term of this Agreement, and, in de-identified and aggregated form that cannot be associated with Client, any borrower or any of Client's customers, for TrueLink's internal service-improvement purposes. As between the parties, Client retains all right, title and interest in and to Client Content, Client's Intellectual Property, Credit Data and all borrower and loan data, and all results and work product of the Support Services. TrueLink shall not distribute, disseminate, license, resell or otherwise exploit Credit Data.",
    "oldText": "Client hereby grants to TrueLink the nonexclusive worldwide right and license to use, distribute, disseminate, license, resell, exploit, upload, display, copy and store Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement.",
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
- Finding: `f-license-d5ce01f6` · **deviation** · confidence 0.65
- Location: § 2 LICENSE.
- Quote: “TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.”
- Rationale: The grant names only Client; affiliates and contractors acting on our behalf are not covered (and the recitals contemplate use by our correspondent brokers), and it is not transferable to a successor. Note also that Section 13 terminates the licence "promptly" on certain Client breaches without a cure opportunity.
- Proposal: **preferred** — The grant names only Client; affiliates and contractors acting on our behalf are not covered (and the recitals contemplate use by our correspondent brokers), and it is not transferable to a successor. Note also that Section 13 terminates the licence "promptly" on certain Client breaches without a cure opportunity.
- Comment: [Playbook] The licence must reach our affiliates and the contractors and brokers who actually use the Interface, and must survive a corporate transaction; we have also tied revocation to a notice-and-cure process.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "TrueLink hereby grants to Client, its affiliates and its contractors and correspondent brokers acting on its behalf a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. The license is transferable to a successor in connection with a merger, acquisition or sale of all or substantially all of Client's assets, and may be terminated by TrueLink only in accordance with Section 13 following written notice and a reasonable opportunity to cure.",
    "oldText": "TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.",
    "paragraphId": "p0022"
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
- Finding: `f-audit-387d9c8c` · **compliant** · confidence 0.85
- Location: § 5 COMPENSATION.
- Quote: “Client will be provided upon request with documentation supporting the amount charged”
- Rationale: There is no audit or inspection right against us; the only verification right runs in our favour (supporting documentation for charges). No change sought.

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
- Finding: `f-ld-91855224` · **compliant** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: No liquidated damages, penalties or early-termination fees are payable by us on termination.

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
- Finding: `f-warranty-f7646640` · **deviation** · confidence 0.85
- Location: § 8 COVENANTS AND WARRANTIES OF CLIENT
- Quote: “EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY”
- Rationale: The only express TrueLink warranty is Year 2000 compliance; there is no conformance-to-documentation or professional-services warranty and no remedy, while all implied warranties are disclaimed. That falls below our fallback (90 days software / 30 days services with repair, replace or refund). The Section 11 standard of care ("same degree of care... exercised by it for its own operations") is not an industry standard.
- Proposal: **preferred** — The only express TrueLink warranty is Year 2000 compliance; there is no conformance-to-documentation or professional-services warranty and no remedy, while all implied warranties are disclaimed. That falls below our fallback (90 days software / 30 days services with repair, replace or refund). The Section 11 standard of care ("same degree of care... exercised by it for its own operations") is not an industry standard.
- Comment: [Playbook] We need a performance warranty with a real remedy; a Y2K warranty alone leaves us with nothing behind the disclaimer. The disclaimer already carves out express warranties, so no change is needed there.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "9. TRUELINK WARRANTIES. TrueLink represents and warrants that (A) the Hosting Services and Support Services will be performed in a professional and workmanlike manner consistent with industry standards; (B) the Interface will conform in all material respects to its documentation, and Client's remedy for breach of this warranty is, at TrueLink's option, re-performance, repair or replacement, or a refund of the fees paid for the non-conforming services; (C) TrueLink will comply with applicable laws in its performance hereunder; and (D) the Interface will be free of viruses, worms, Trojan horses and other malicious code. TrueLink further represents and warrants that the Interface and all related software",
    "oldText": "9. TRUELINK WARRANTIES. TrueLink represents and warrants that the Interface and all related software",
    "paragraphId": "p0059"
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
- Finding: `f-insurance-6646381b` · **missing** · confidence 0.80
- Location: § 12 INDEMNITY.
- Quote: “30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement”
- Rationale: The Agreement contains no insurance covenant, although TrueLink hosts our Web Site and processes borrower credit data. We require at minimum E&O and cyber cover.
- Proposal: **preferred** — The Agreement contains no insurance covenant, although TrueLink hosts our Web Site and processes borrower credit data. We require at minimum E&O and cyber cover.
- Comment: [Playbook] Standard insurance package for a vendor that hosts our site and processes consumer credit data; our fallback is E&O USD 1M and cyber USD 2M. Please also conform the cross-reference in Section 24 to the new numbering.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "30. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and, because TrueLink processes Client data, cyber liability insurance of not less than USD 5,000,000. TrueLink shall provide certificates of insurance on request.\n\n31. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement",
    "oldText": "30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement",
    "paragraphId": "p0097"
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
- Finding: `f-mincommit-13781467` · **compliant** · confidence 0.70
- Location: § 5 COMPENSATION.
- Quote: “(but not less than $____ per month for the Hosting Services and $____ per month for Support Services)”
- Rationale: There is a monthly minimum, but the commitment is confined to a one-year term that we can exit at will under Section 14, which sits at our fallback. The dollar figures and the Exhibit A/B schedules are still blank and must be completed before signature.

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
- Finding: `f-transition-9ddd6a58` · **deviation** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “If Client decides to discontinue Hosting Service, Client is responsible for arranging for a new hosting environment within 60 days.”
- Rationale: Exit obligations run only against us (arranging a new name server/hosting environment); there is no obligation on TrueLink to return our data in a usable format, provide transition assistance, or certify deletion. For a hosting vendor holding borrower and loan data this is a gap we always close.
- Proposal: **preferred** — Exit obligations run only against us (arranging a new name server/hosting environment); there is no obligation on TrueLink to return our data in a usable format, provide transition assistance, or certify deletion. For a hosting vendor holding borrower and loan data this is a gap we always close.
- Comment: [Playbook] We need our data back and help migrating on exit. Our fallback is 90 days of assistance with export within 30 days if six months is too long.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement. Upon expiry or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days, return to Client all Client Content, Client Proprietary Information and borrower and loan data in a commonly used, machine-readable format; and (c) thereafter delete such data from its systems and certify such deletion in writing.",
    "oldText": "14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.",
    "paragraphId": "p0079"
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
# Issues memo: EXHIBIT 10.4

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | deviation | § 12 INDEMNITY. |
| critical | Ownership of deliverables and Customer Data | deviation | § 8 COVENANTS AND WARRANTIES OF CLIENT |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § 12 INDEMNITY. |
| high | Assignment and change of control | deviation | § 12 INDEMNITY. |
| high | Exclusivity obligations binding Customer | deviation | § 2 LICENSE. |
| high | Liquidated damages and penalties payable by Customer | compliant | § 12 INDEMNITY. |
| high | Licence grant scope | deviation | § 2 LICENSE. |
| high | Non-compete restrictions on Customer | needs_review | § 2 LICENSE. |
| high | Termination for convenience | compliant | § 12 INDEMNITY. |
| medium | Audit rights against Customer | compliant | § 5 COMPENSATION. |
| medium | Governing law and venue | compliant | § 12 INDEMNITY. |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § 5 COMPENSATION. |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § 5 COMPENSATION. |
| medium | Non-solicitation of employees binding Customer | compliant | § 12 INDEMNITY. |
| medium | Auto-renewal and non-renewal notice window | compliant | § 12 INDEMNITY. |
| medium | Post-termination transition assistance and data return | deviation | § 12 INDEMNITY. |
| medium | Performance warranty and duration | deviation | § 8 COVENANTS AND WARRANTIES OF CLIENT |
| low | Vendor insurance | missing | § 12 INDEMNITY. |

## Walk-away items

- Indemnification by Vendor (§ 12 INDEMNITY.): TrueLink's indemnity is tied solely to its own breach and does not cover third-party claims that the Interface or Services infringe IP rights, TrueLink-caused data breach, or breach of law — the core protections we need from a hosting/licensing vendor. (Client's indemnity in 12(a) is by contrast very broad.)
- Ownership of deliverables and Customer Data (§ 8 COVENANTS AND WARRANTIES OF CLIENT): We grant TrueLink an unlimited-duration worldwide right to resell and commercially exploit borrower Credit Data, with the only limits sitting in a separate Non-Competition Agreement not before us. Even though framed as a licence rather than an assignment, this is a transfer of value in our data (and carries consumer-privacy risk) and should be limited to providing the Services. The Agreement also does not state who owns customisation work product from the Support Services.
- Limitation of liability — cap, mutuality and carve-outs (§ 12 INDEMNITY.): The cap is one-way: TrueLink is capped at 12 months' fees while our liability (including under the broad Client indemnity in Section 12(a)) is unlimited. That is walk-away territory under our playbook; we need a mutual cap with the standard carve-outs sitting outside it.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
