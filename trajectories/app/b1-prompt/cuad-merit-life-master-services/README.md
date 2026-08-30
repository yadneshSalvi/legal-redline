# Trajectory: cuad-merit-life-master-services

| Run | Value |
|---|---|
| Contract | cuad-merit-life-master-services — 1. PURPOSE OF ENGAGEMENT. |
| Config | b1-prompt |
| Parties | Clear Capital (our party) ↔ RadialSpark, LLC |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 59.5s (119,496 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 15,075 input · 11,365 output · 1,194 cache read · 0 cache write |
| Cost | $0.360097 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 0 | 0 | 0 | — | — |
| drafters | 4 | 1 | 0 | 17 submitted finding(s) | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| verifier | 0 | 0 | 0 | 0 verdict(s) | — |
| assembler | 20 | 0 | 0 | — | [seq 6](trajectory.jsonl#L6)–[seq 27](trajectory.jsonl#L27) |
| memo | 2 | 0 | 0 | — | [seq 25](trajectory.jsonl#L25)–[seq 26](trajectory.jsonl#L26) |
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
- Finding: `f-lol-cap-be5ccbaa` · **deviation** · confidence 0.90
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES.”
- Rationale: The cap is nominally mutual but Contractor's cap is limited to fees paid under the single Statement of Work at issue (potentially far less than 6 months' fees) and there are no carve-outs for confidentiality, indemnification, gross negligence, wilful misconduct or IP infringement (the only exception cross-refers to Paragraph 9, which is the Independent Contractor clause). That fails our fallback of a 12-month mutual cap with those carve-outs. The mutual exclusion of consequential damages in (b) is acceptable.
- Proposal: **preferred** — The cap is nominally mutual but Contractor's cap is limited to fees paid under the single Statement of Work at issue (potentially far less than 6 months' fees) and there are no carve-outs for confidentiality, indemnification, gross negligence, wilful misconduct or IP infringement (the only exception cross-refers to Paragraph 9, which is the Independent Contractor clause). That fails our fallback of a 12-month mutual cap with those carve-outs. The mutual exclusion of consequential damages in (b) is acceptable.
- Comment: [Playbook] We need a mutual cap measured on 12 months' fees across the Agreement rather than the fees under a single Statement of Work, and confidentiality, indemnity, gross negligence, wilful misconduct, fraud and IP infringement must sit outside the cap. The existing cross-reference to "Paragraph 9" points to the Independent Contractor clause and does not work.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(a) EXCEPT FOR EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID OR PAYABLE BY COMPANY UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. COMPANY'S OBLIGATION TO PAY FEES DUE UNDER THIS AGREEMENT SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS LIMITATION.",
    "oldText": "(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.",
    "paragraphId": "p0035"
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
- Finding: `f-indemn-402d8728` · **missing** · confidence 0.88
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.”
- Rationale: Section 7 is headed "Indemnification of Contractor" but contains no indemnity language at all, and there is no Contractor indemnity anywhere in the Agreement, including for third-party IP infringement (the non-infringement representation in 5(c) carries no defence obligation). That is our walk-away position; we need a Vendor defence and indemnity inserted.
- Proposal: **preferred** — Section 7 is headed "Indemnification of Contractor" but contains no indemnity language at all, and there is no Contractor indemnity anywhere in the Agreement, including for third-party IP infringement (the non-infringement representation in 5(c) carries no defence obligation). That is our walk-away position; we need a Vendor defence and indemnity inserted.
- Comment: [Playbook] Section 7 promises indemnification but contains none. We have added a standard Contractor indemnity (IP infringement, breach of law, data incidents, gross negligence/wilful misconduct) with the usual notice-and-control procedure, and carved indemnified claims out of the attorneys' fees waiver so the indemnity is not neutralised.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(c) EXCEPT WITH RESPECT TO A PARTY'S INDEMNIFICATION OBLIGATIONS, IN ANY SUIT ARISING FROM THIS AGREEMENT EACH PARTY SHALL BE RESPONSIBLE FOR ITS OWN ATTORNEYS FEES. COMPANY AND CONTRACTOR HEREBY WAIVE ANY CLAIM TO AWARD OF ATTORNEYS FEES IN SUCH A SUIT.\n\n(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorised access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall give Contractor prompt written notice of the claim and reasonable cooperation at Contractor's expense, and Contractor shall control the defence, provided that no settlement imposing any liability or obligation on Company shall be made without Company's prior written consent.",
    "oldText": "(c) IN ANY SUIT ARISING FROM THIS AGREEMENT EACH PARTY SHALL BE RESPONSIBLE FOR ITS OWN ATTORNEYS FEES. COMPANY AND CONTRACTOR HEREBY WAIVE ANY CLAIM TO AWARD OF ATTORNEYS FEES IN SUCH A SUIT.",
    "paragraphId": "p0037"
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
- Finding: `f-noncompete-58235289` · **compliant** · confidence 0.90
- Location: § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.
- Quote: “Company acknowledges that Contractor provides consulting and development services to other clients, and agrees that nothing in this Agreement shall be deemed or construed to prevent Contractor from delivering on such business.”
- Rationale: No non-compete or field-of-use restriction binds Company; the only related language preserves Contractor's freedom to serve other clients, which is acceptable.

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
- Finding: `f-exclusivity-cc4b6c63` · **compliant** · confidence 0.90
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the "Services")”
- Rationale: Engagement is task-by-task under Statements of Work with no exclusivity or sole-supplier obligation on Company.

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
- Finding: `f-mfn-4434bacc` · **compliant** · confidence 0.90
- Location: § —
- Quote: —
- Rationale: No most-favoured-nation or price-matching obligation is imposed on Company anywhere in the Agreement.

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
- Finding: `f-nosolicit-9548c840` · **compliant** · confidence 0.85
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's express written consent, which shall not be unreasonably withheld.”
- Rationale: Sits at our fallback: mutual, 12 months, limited to personnel directly involved in the Services, and no no-hire. We would normally add a carve-out for general advertisements and unsolicited approaches, but that is not worth a redline on its own.

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
- Finding: `f-t4c-e76b14be` · **deviation** · confidence 0.85
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other.”
- Rationale: Company has no convenience right while a Statement of Work is open (the term runs indefinitely until terminated), and Contractor may walk away on 15 days' notice, well under the 90 days our fallback allows. Both limbs fail the fallback.
- Proposal: **preferred** — Company has no convenience right while a Statement of Work is open (the term runs indefinitely until terminated), and Contractor may walk away on 15 days' notice, well under the 90 days our fallback allows. Both limbs fail the fallback.
- Comment: [Playbook] We need the ability to exit an in-flight Statement of Work on 30 days' notice with a refund of prepaid fees, and Contractor should not be able to leave on 15 days' notice; 90 days with no open Statement of Work is our fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(a) Company may terminate this Agreement or any Statement of Work for convenience, in whole or in part, upon thirty (30) days' advance written notice to Contractor, in which case Contractor shall refund any prepaid fees for the period after the effective date of termination. Contractor may terminate this Agreement for any or no reason upon ninety (90) days' advance written notice to Company, provided that no Statement of Work is then outstanding.",
    "oldText": "(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other.",
    "paragraphId": "p0032"
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
- Finding: `f-renewal-648ebd34` · **compliant** · confidence 0.80
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “The term of this Agreement shall begin on the date hereof and shall continue until terminated by either party pursuant to Paragraph 6 hereof.”
- Rationale: There is no automatic renewal or non-renewal notice window; the Agreement simply continues until terminated, so nothing to redline under this rule. Rate changes on 30 days' notice are addressed commercially rather than as a renewal uplift.

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
- Finding: `f-govlaw-29d875f8` · **deviation** · confidence 0.85
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.”
- Rationale: Arizona law is outside our accepted list (New York, Delaware, California, England and Wales), and disputes are pushed into mandatory binding arbitration under a private provider's rules rather than to courts. Domestic seat keeps this out of walk-away territory, but it fails both the preferred and fallback positions.
- Proposal: **preferred** — Arizona law is outside our accepted list (New York, Delaware, California, England and Wales), and disputes are pushed into mandatory binding arbitration under a private provider's rules rather than to courts. Domestic seat keeps this out of walk-away territory, but it fails both the preferred and fallback positions.
- Comment: [Playbook] Our accepted governing laws are New York (preferred), Delaware, California or England and Wales. We also prefer court jurisdiction over the mandatory arbitration in Section 19; if arbitration is important to you, we can discuss retaining it seated in New York.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to the conflict of laws provisions thereof, and each party submits to the exclusive jurisdiction of the state and federal courts located in New York County, New York.",
    "oldText": "This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.",
    "paragraphId": "p0043"
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
- Finding: `f-assign-d213e1d1` · **deviation** · confidence 0.85
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld.”
- Rationale: Consent is required for every transfer with no carve-out for assignment to an affiliate or to a successor in a merger or sale of substantially all assets, which falls short of our fallback. No change-of-control termination right exists, which is helpful.
- Proposal: **preferred** — Consent is required for every transfer with no carve-out for assignment to an affiliate or to a successor in a merger or sale of substantially all assets, which falls short of our fallback. No change-of-control termination right exists, which is helpful.
- Comment: [Playbook] We cannot require counterparty consent for internal reorganisations or an M&A transaction. We have made the successor/affiliate carve-out mutual so it works for both sides.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld; provided that either party may assign this Agreement, on written notice and without consent, to an affiliate or to a successor in connection with a merger, acquisition, reorganisation or sale of all or substantially all of its assets.",
    "oldText": "Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld.",
    "paragraphId": "p0042"
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
- Finding: `f-ip-ce1b8530` · **compliant** · confidence 0.75
- Location: § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.
- Quote: “Contractor hereby grants to Company a royalty-free, non- exclusive perpetual license (including the right to grant a sublicense) to use, copy, modify, create, derivative version, publicly perform and publicly display such Contractor's Information in connection with Company's business operations.”
- Rationale: Company owns the Works and receives a perpetual, royalty-free, sublicensable licence to embedded Contractor Information, with Contractor retaining only its pre-existing materials — at or above our fallback. We note (without redlining) that ownership is conditioned on the relevant invoice being paid and that there is no express Company Data ownership statement.

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
- Finding: `f-license-4a280550` · **compliant** · confidence 0.75
- Location: § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.
- Quote: “a royalty-free, non- exclusive perpetual license (including the right to grant a sublicense) to use, copy, modify, create, derivative version, publicly perform and publicly display such Contractor's Information in connection with Company's business operations”
- Rationale: The licence is perpetual, royalty-free, not revocable at Contractor's discretion, and the sublicensing right lets us extend use to affiliates and contractors; Section 4(d) also confirms our right to modify and engage others. Affiliates are not named expressly, which we note but would not redline on its own.

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
- Finding: `f-audit-ceae561a` · **compliant** · confidence 0.90
- Location: § —
- Quote: —
- Rationale: The Agreement contains no audit, inspection or verification right exercisable against Company.

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
- Finding: `f-ld-6515c115` · **compliant** · confidence 0.85
- Location: § 6 TERMINATION.
- Quote: “Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination.”
- Rationale: Termination triggers payment only for Services actually performed; there are no liquidated damages, penalties or minimum termination fees payable by Company.

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
- Finding: `f-warranty-cbadc931` · **deviation** · confidence 0.80
- Location: § 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DI…
- Quote: “THE EXPRESS WARRANTIES IN THIS AGREEMENT SHALL BE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE.”
- Rationale: The express warranties cover legal compliance, authority and non-infringement only. There is no warranty that the Services or Works will conform to the Specifications for any period and no repair/replace/refund remedy, so the disclaimer leaves us with no performance warranty — short of our 30/90-day fallback.
- Proposal: **preferred** — The express warranties cover legal compliance, authority and non-infringement only. There is no warranty that the Services or Works will conform to the Specifications for any period and no repair/replace/refund remedy, so the disclaimer leaves us with no performance warranty — short of our 30/90-day fallback.
- Comment: [Playbook] We need a conformance warranty with a real remedy; 90 days for deliverables and a workmanlike-performance warranty for Services is our fallback position. The disclaimer in 5(e) preserves express warranties, so this addition is all that is required.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(c) Contractor represents and warrants that the Works provided hereunder, including any Contractor Information and any third party products do not infringe any trade secret, trademark, copyright, patent or other proprietary right of any other third party.\n\n(c-1) Contractor warrants that (i) the Services will be performed in a professional and workmanlike manner consistent with industry standards; and (ii) for a period of ninety (90) days following delivery, each Work will conform in all material respects to the applicable Specifications and documentation. Company's remedy for breach of this warranty is, at Contractor's option, re-performance, repair or replacement, or a refund of the fees paid for the non-conforming Services or Work.",
    "oldText": "(c) Contractor represents and warrants that the Works provided hereunder, including any Contractor Information and any third party products do not infringe any trade secret, trademark, copyright, patent or other proprietary right of any other third party.",
    "paragraphId": "p0026"
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
- Finding: `f-insurance-7c3a57b8` · **deviation** · confidence 0.70
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “Contractor shall maintain workers compensation insurance in the amount required by statute, comprehensive general liability insurance with coverage of at least one million dollars ($1,000,000) and professional errors and omissions insurance for bodily injury, property damage or other losses with coverage of at least one million dollars ($1,000,000)”
- Rationale: Workers' comp, CGL and E&O at USD 1M are in place, but there is no cyber/privacy cover even though Contractor handles Company records, data and Confidential Information and may access Company systems. Our fallback requires cyber cover of at least USD 2M.
- Proposal: **preferred** — Workers' comp, CGL and E&O at USD 1M are in place, but there is no cyber/privacy cover even though Contractor handles Company records, data and Confidential Information and may access Company systems. Our fallback requires cyber cover of at least USD 2M.
- Comment: [Playbook] Vendors that handle our data carry cyber/privacy cover; USD 2M is our fallback minimum (we normally ask for USD 5M). The remaining coverages are acceptable as drafted.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "professional errors and omissions insurance for bodily injury, property damage or other losses with coverage of at least one million dollars ($1,000,000), and, where Contractor processes or has access to Company data or Confidential Information, cyber liability insurance with coverage of at least two million dollars ($2,000,000), in connection with the provision of Services by Contractor pursuant to the terms of this Agreement.",
    "oldText": "professional errors and omissions insurance for bodily injury, property damage or other losses with coverage of at least one million dollars ($1,000,000), in connection with the provision of Services by Contractor pursuant to the terms of this Agreement.",
    "paragraphId": "p0048"
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

No finding for this rule is present in the final run state.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No finding was available for a human decision.

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
- Finding: `f-transition-b009dc88` · **missing** · confidence 0.80
- Location: § 6 TERMINATION.
- Quote: “Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress.”
- Rationale: Termination deals with payment and assignment of works in progress but says nothing about return of Company data and materials, deletion, or transition assistance. For a development/consulting engagement we need an exit paragraph.
- Proposal: **preferred** — Termination deals with payment and assignment of works in progress but says nothing about return of Company data and materials, deletion, or transition assistance. For a development/consulting engagement we need an exit paragraph.
- Comment: [Playbook] We need our data and materials back in a usable format and reasonable help moving on exit; transition assistance is chargeable at your then-current rates, so this is cost-neutral for you.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress. In addition, upon expiry or termination of this Agreement or any Statement of Work for any reason, Contractor shall (i) at Company's request, provide reasonable transition assistance for up to six (6) months at Contractor's then-current rates; (ii) within thirty (30) days, return all Company data, Confidential Information and materials in a commonly used, machine-readable format; and (iii) thereafter delete such data and Confidential Information from its systems and certify such deletion in writing.",
    "oldText": "Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress.",
    "paragraphId": "p0033"
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
# Issues memo: 1. PURPOSE OF ENGAGEMENT.

## Executive summary

17 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | missing | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| critical | Ownership of deliverables and Customer Data | compliant | § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE. |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| high | Assignment and change of control | deviation | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| high | Exclusivity obligations binding Customer | compliant | § 1 PURPOSE OF ENGAGEMENT. |
| high | Liquidated damages and penalties payable by Customer | compliant | § 6 TERMINATION. |
| high | Licence grant scope | compliant | § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE. |
| high | Non-compete restrictions on Customer | compliant | § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE. |
| high | Termination for convenience | deviation | § 1 PURPOSE OF ENGAGEMENT. |
| medium | Audit rights against Customer | compliant | § — |
| medium | Governing law and venue | deviation | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § — |
| medium | Non-solicitation of employees binding Customer | compliant | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| medium | Auto-renewal and non-renewal notice window | compliant | § 1 PURPOSE OF ENGAGEMENT. |
| medium | Post-termination transition assistance and data return | missing | § 6 TERMINATION. |
| medium | Performance warranty and duration | deviation | § 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DI… |
| low | Vendor insurance | deviation | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |

## Walk-away items

- Indemnification by Vendor (§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.): Section 7 is headed "Indemnification of Contractor" but contains no indemnity language at all, and there is no Contractor indemnity anywhere in the Agreement, including for third-party IP infringement (the non-infringement representation in 5(c) carries no defence obligation). That is our walk-away position; we need a Vendor defence and indemnity inserted.
- Limitation of liability — cap, mutuality and carve-outs (§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.): The cap is nominally mutual but Contractor's cap is limited to fees paid under the single Statement of Work at issue (potentially far less than 6 months' fees) and there are no carve-outs for confidentiality, indemnification, gross negligence, wilful misconduct or IP infringement (the only exception cross-refers to Paragraph 9, which is the Independent Contractor clause). That fails our fallback of a 12-month mutual cap with those carve-outs. The mutual exclusion of consequential damages in (b) is acceptable.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
