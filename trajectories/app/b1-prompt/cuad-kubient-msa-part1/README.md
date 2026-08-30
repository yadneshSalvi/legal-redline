# Trajectory: cuad-kubient-msa-part1

| Run | Value |
|---|---|
| Contract | cuad-kubient-msa-part1 — Exhibit 10.14 MASTER SERVICES AGREEMENT This Master Services Agreement (the "Agreement"), dated as of the 5th day of Feb |
| Config | b1-prompt |
| Parties | The Associated Press (our party) ↔ Kubient Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 48.0s (107,991 ms) |
| Calls | 1 LLM · 0 tool · 0 retries |
| Tokens | 16,373 input · 9,779 output · 1,194 cache read · 0 cache write |
| Cost | $0.326937 |

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
- Finding: `f-lol-cap-9d3bbc66` · **deviation** · confidence 0.72
- Location: § Preamble
- Quote: “NEITHER PARTY SHALL BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, PUNITIVE, SPECIAL OR OTHER SIMILAR DAMAGES”
- Rationale: The agreement contains a mutual exclusion of indirect damages with carve-outs for indemnification and confidentiality, but no aggregate liability cap at all, so our own direct exposure is unlimited. Our position is a mutual cap; because Customer pays no fees under a revenue-share model, a fees-based cap would be illusory, so we propose a fixed mutual figure with indemnity/confidentiality/wilful misconduct outside it.
- Proposal: **preferred** — The agreement contains a mutual exclusion of indirect damages with carve-outs for indemnification and confidentiality, but no aggregate liability cap at all, so our own direct exposure is unlimited. Our position is a mutual cap; because Customer pays no fees under a revenue-share model, a fees-based cap would be illusory, so we propose a fixed mutual figure with indemnity/confidentiality/wilful misconduct outside it.
- Comment: [Playbook] We added a mutual liability cap; the agreement currently leaves both parties uncapped, which leaves our direct exposure open-ended. Indemnification, confidentiality/security breach, IP infringement and wilful misconduct sit outside the cap, consistent with the existing carve-outs in this section.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "EVEN IF THE OTHER PARTY WAS OR SHOULD HAVE BEEN AWARE OR WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the amounts paid or payable between the Parties under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000. \"Excluded Claims\" means a Party's breach of its confidentiality, data protection or security obligations, its indemnification obligations, its gross negligence, wilful misconduct or fraud, and its infringement of the other Party's intellectual property rights.",
    "oldText": "EVEN IF THE OTHER PARTY WAS OR SHOULD HAVE BEEN AWARE OR WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    "paragraphId": "p0027"
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
- Finding: `f-indemn-db9e4df3` · **compliant** · confidence 0.85
- Location: § Preamble
- Quote: “Kubient agrees to indemnify, defend, and hold harmless Customer and its officers, directors, managers, members, agents, and employees from all third-party allegations, claims, actions, losses, expenses, damages, costs”
- Rationale: Kubient gives a broad defence and indemnity covering the Services, the Auction Platform and breach of its warranties (including the non-infringement warranty at 9(b)(i)), with standard notice/control/cooperation procedures. Meets our preferred position; no redline.

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
- Finding: `f-noncompete-c552d162` · **compliant** · confidence 0.92
- Location: § Preamble
- Quote: “This Agreement will not restrict Customer offering Inventory via other agents or otherwise selling Inventory to any third parties.”
- Rationale: No non-compete or field-of-use restriction binds Customer; the agreement expressly preserves our freedom to work with other agents.

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
- Finding: `f-exclusivity-f8066e47` · **compliant** · confidence 0.95
- Location: § Preamble
- Quote: “Nothing herein is intended nor shall be construed as creating an exclusive arrangement between Customer and Kubient.”
- Rationale: Express non-exclusivity in our favour; no sole-supplier or requirements obligation on Customer.

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
- Finding: `f-mfn-4434bacc` · **compliant** · confidence 0.88
- Location: § —
- Quote: —
- Rationale: No most-favoured-nation or price-matching obligation is imposed on Customer anywhere in the agreement.

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
- Finding: `f-nosolicit-d592a42b` · **compliant** · confidence 0.90
- Location: § —
- Quote: —
- Rationale: No non-solicitation or no-hire restriction binds Customer.

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
- Finding: `f-t4c-1ec04d78` · **compliant** · confidence 0.70
- Location: § Preamble
- Quote: “Either Party may terminate this Agreement for any reason following the Initial Term upon ninety (90) days written notice to the other Party.”
- Rationale: Sits at the fallback: Customer has a rolling convenience right on 90 days' notice after a 12-month committed term, and Kubient's convenience right is also at 90 days (not below the walk-away threshold). We address the length of the notice window under RENEWAL rather than duplicating it here.

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
- Finding: `f-renewal-42b932dd` · **deviation** · confidence 0.60
- Location: § Preamble
- Quote: “This Agreement will automatically renew for additional 1-year terms unless earlier terminated pursuant to this Agreement's express provisions”
- Rationale: Automatic 12-month renewals are acceptable, but the only exit requires 90 days' notice, exceeding our fallback window of 60 days. Mitigating factor: the exit is rolling rather than a fixed pre-renewal window, so if 90 days is held we can live with it; our ask is 30 days for Customer.
- Proposal: **preferred** — Automatic 12-month renewals are acceptable, but the only exit requires 90 days' notice, exceeding our fallback window of 60 days. Mitigating factor: the exit is rolling rather than a fixed pre-renewal window, so if 90 days is held we can live with it; our ask is 30 days for Customer.
- Comment: [Playbook] We shortened Customer's exit notice to 30 days (our fallback is 60) on renewing terms; 90 days is longer than we accept for opting out of an auto-renewal. Kubient's 90-day notice is unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer may terminate this Agreement for any reason following the Initial Term upon thirty (30) days written notice to Kubient, and Kubient may terminate this Agreement for any reason effective at the end of the then-current Term upon ninety (90) days written notice to Customer.",
    "oldText": "Either Party may terminate this Agreement for any reason following the Initial Term upon ninety (90) days written notice to the other Party.",
    "paragraphId": "p0016"
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
- Finding: `f-govlaw-003a838b` · **needs_review** · confidence 0.75
- Location: § Preamble
- Quote: “This Agreement is governed in all respects by the laws of the State of Delaware without giving effect to its conflict of laws principles. Each Party hereby irrevocably submits for all disputes to the exclusive jurisdiction and venue of the state and federal courts located in New York, New York.”
- Rationale: Delaware law with New York courts sits within our accepted list, but Section 8 also mandates AAA arbitration of "any controversy or claim", which contradicts the exclusive court venue in 14(a). We should confirm which forum governs (our preference is courts) and delete the redundant provision; separately note the one-year limitation period in Section 8 shortens the time in which we can bring claims.

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
- Finding: `f-assign-aaa6571e` · **compliant** · confidence 0.82
- Location: § Preamble
- Quote: “either Party may assign this Agreement without approval or consent to any affiliate or purchaser of all or substantially all of said Party's assets related to the subject matter of this Agreement or to any successor by way of merger, stock sale, consolidation or similar transaction”
- Rationale: Mutual assignment with an affiliate/M&A carve-out and a not-unreasonably-withheld consent standard; no Vendor termination or re-pricing right on Customer change of control. Meets our fallback (we note Kubient could assign to one of our competitors, a point we can raise if the relationship warrants it).

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
- Finding: `f-ip-15df5840` · **needs_review** · confidence 0.60
- Location: § Preamble
- Quote: “the collection, maintenance, management and storage of visitor information (data), to the extent collected, directed by, maintained or stored by Kubient, as well as the performance of the Auction Platform, is and shall be in a secure manner using best practices of security technology”
- Rationale: Nothing assigns our IP or data to Kubient (and we retain the Content and Properties), so there is no walk-away issue. However, the agreement is silent on ownership of visitor/Request data collected by Kubient on our behalf and on ownership of any "deliverables" referenced in the warranties; we should add a sentence confirming Customer retains all rights in Customer Data and receives ownership of, or a perpetual licence to, any deliverables.

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
- Finding: `f-license-64baea80` · **deviation** · confidence 0.80
- Location: § Preamble
- Quote: “Kubient hereby grants to Customer a limited, royalty-free, non-exclusive, non-transferable, non-assignable, without right of sublicense, revocable license to access, participate in and use to the full extent the Auction Platform as hosted by Kubient”
- Rationale: The licence is revocable at Kubient's discretion, which is walk-away territory, and it excludes our affiliates and contractors with no path to add them (reinforced by the third-party access bar in Section 6(a)). We ask for an irrevocable licence terminable only with the Agreement, extended to affiliates and contractors and transferable to a successor. Note also the cross-reference error at 4(c)(ii), which revokes "the license granted under section 3" rather than Section 2.
- Proposal: **preferred** — The licence is revocable at Kubient's discretion, which is walk-away territory, and it excludes our affiliates and contractors with no path to add them (reinforced by the third-party access bar in Section 6(a)). We ask for an irrevocable licence terminable only with the Agreement, extended to affiliates and contractors and transferable to a successor. Note also the cross-reference error at 4(c)(ii), which revokes "the license granted under section 3" rather than Section 2.
- Comment: [Playbook] We cannot accept a licence revocable at Kubient's discretion, and the grant must reach our affiliates and the contractors who operate our properties. Termination of the licence should track termination of the Agreement.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "a limited, royalty-free, non-exclusive license, extending to Customer's affiliates and to contractors acting on Customer's behalf and transferable to a successor in a merger, acquisition or sale of substantially all assets, to access, participate in and use to the full extent the Auction Platform as hosted by Kubient, which license shall be irrevocable except upon termination of this Agreement in accordance with Section 4",
    "oldText": "a limited, royalty-free, non-exclusive, non-transferable, non-assignable, without right of sublicense, revocable license to access, participate in and use to the full extent the Auction Platform as hosted by Kubient",
    "paragraphId": "p0002"
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
- Finding: `f-audit-ceae561a` · **compliant** · confidence 0.85
- Location: § —
- Quote: —
- Rationale: No audit, inspection or verification right is asserted against Customer, and there is no Vendor access to our systems.

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
- Finding: `f-ld-31ff64c6` · **compliant** · confidence 0.78
- Location: § Preamble
- Quote: “Kubient shall be entitled to all fees generated during the termination period regardless of which Party terminates the Agreement,”
- Rationale: No liquidated damages, penalty or minimum fee is payable by Customer; the quoted provision simply preserves the revenue share on business actually generated during the notice period.

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
- Finding: `f-warranty-ff423bea` · **compliant** · confidence 0.72
- Location: § Preamble
- Quote: “the Service will perform in all material respects to industry standards”
- Rationale: Kubient gives express performance, security, no-malicious-code, compliance-with-law and non-infringement warranties running for the whole Term (better than our 90-day preference), and the Section 13 disclaimer expressly preserves them. We note there is no stated repair/re-perform/refund remedy, which we can add if the section is opened.

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
- Finding: `f-insurance-9ac50a27` · **deviation** · confidence 0.80
- Location: § Preamble
- Quote: “The Agreement completely and exclusively states the agreement of the Parties regarding its subject matter.”
- Rationale: There is no insurance clause, and Kubient hosts the Auction Platform and collects visitor data on our behalf — an uninsured data-processing vendor is our walk-away position. We propose the standard general liability, E&O and cyber limits (fallback: E&O USD 1M / cyber USD 2M).
- Proposal: **preferred** — There is no insurance clause, and Kubient hosts the Auction Platform and collects visitor data on our behalf — an uninsured data-processing vendor is our walk-away position. We propose the standard general liability, E&O and cyber limits (fallback: E&O USD 1M / cyber USD 2M).
- Comment: [Playbook] We added our standard insurance requirement; Kubient hosts the platform and handles visitor data, so E&O and cyber cover are required. We can fall back to E&O USD 1M and cyber USD 2M.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "This Agreement supersedes, and its terms govern, all prior proposals, agreements, or other communications between the parties, oral or written, regarding its subject matter. Kubient shall maintain, at its own expense, throughout the Term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; and, where Kubient collects, processes or stores data on Customer's behalf, cyber liability insurance of not less than USD 5,000,000. Kubient shall provide certificates of insurance on request.",
    "oldText": "This Agreement supersedes, and its terms govern, all prior proposals, agreements, or other communications between the parties, oral or written, regarding its subject matter.",
    "paragraphId": "p0072"
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
- Finding: `f-mincommit-98ebcb86` · **compliant** · confidence 0.88
- Location: § Preamble
- Quote: “The Parties agree to share any revenue generated as a result of this Agreement, or Customer's use of the Services or the Auction Platform, as set forth and detailed in each applicable Exhibit.”
- Rationale: Pure revenue share with no minimum purchase, take-or-pay or shortfall obligation on Customer.

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
- Finding: `f-transition-03761cd9` · **deviation** · confidence 0.80
- Location: § Preamble
- Quote: “(iv) and each Party will return or destroy any of the other Party's Confidential Information then in its possession.”
- Rationale: The termination provisions cover only cessation of Services and return/destruction of Confidential Information; there is no transition assistance and no obligation to return our data (including visitor/Request data) in a usable format before deletion. We propose the standard exit paragraph (fallback: 90 days of assistance and export within 30 days).
- Proposal: **preferred** — The termination provisions cover only cessation of Services and return/destruction of Confidential Information; there is no transition assistance and no obligation to return our data (including visitor/Request data) in a usable format before deletion. We propose the standard exit paragraph (fallback: 90 days of assistance and export within 30 days).
- Comment: [Playbook] We added exit assistance and data return; as drafted the Services simply stop and our data is destroyed with no export. We can accept 90 days of assistance as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(iv) each Party will return or destroy any of the other Party's Confidential Information then in its possession; and (v) Kubient shall, at Customer's request, provide reasonable transition assistance for up to six (6) months at Kubient's then-current rates, return to Customer within thirty (30) days all Customer data (including Content, Request and visitor data) in a commonly used, machine-readable format, and thereafter delete such data from its systems and certify such deletion in writing.",
    "oldText": "(iv) and each Party will return or destroy any of the other Party's Confidential Information then in its possession.",
    "paragraphId": "p0022"
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
# Issues memo: Exhibit 10.14 MASTER SERVICES AGREEMENT This Master Services Agreement (the "Agreement"), dated as of the 5th day of Feb

## Executive summary

18 playbook findings were produced for human review.

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| critical | Indemnification by Vendor | compliant | § Preamble |
| critical | Ownership of deliverables and Customer Data | needs_review | § Preamble |
| critical | Limitation of liability — cap, mutuality and carve-outs | deviation | § Preamble |
| high | Assignment and change of control | compliant | § Preamble |
| high | Exclusivity obligations binding Customer | compliant | § Preamble |
| high | Liquidated damages and penalties payable by Customer | compliant | § Preamble |
| high | Licence grant scope | deviation | § Preamble |
| high | Non-compete restrictions on Customer | compliant | § Preamble |
| high | Termination for convenience | compliant | § Preamble |
| medium | Audit rights against Customer | compliant | § — |
| medium | Governing law and venue | needs_review | § Preamble |
| medium | Most-favoured-nation obligations burdening Customer | compliant | § — |
| medium | Minimum purchase commitments and volume restrictions on Customer | compliant | § Preamble |
| medium | Non-solicitation of employees binding Customer | compliant | § — |
| medium | Auto-renewal and non-renewal notice window | deviation | § Preamble |
| medium | Post-termination transition assistance and data return | deviation | § Preamble |
| medium | Performance warranty and duration | compliant | § Preamble |
| low | Vendor insurance | deviation | § Preamble |

## Walk-away items

- Ownership of deliverables and Customer Data (§ Preamble): Nothing assigns our IP or data to Kubient (and we retain the Content and Properties), so there is no walk-away issue. However, the agreement is silent on ownership of visitor/Request data collected by Kubient on our behalf and on ownership of any "deliverables" referenced in the warranties; we should add a sentence confirming Customer retains all rights in Customer Data and receives ownership of, or a perpetual licence to, any deliverables.
- Limitation of liability — cap, mutuality and carve-outs (§ Preamble): The agreement contains a mutual exclusion of indirect damages with carve-outs for indemnification and confidentiality, but no aggregate liability cap at all, so our own direct exposure is unlimited. Our position is a mutual cap; because Customer pays no fees under a revenue-share model, a fees-based cap would be illusory, so we propose a fixed mutual figure with indemnity/confidentiality/wilful misconduct outside it.

## Next steps

Accept, edit, or reject each actionable finding before applying tracked changes.
```

## Apply and validation

No apply or output-validation event was recorded.
