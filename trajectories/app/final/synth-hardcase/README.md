# Trajectory: synth-hardcase

| Run | Value |
|---|---|
| Contract | synth-hardcase — MASTER SERVICES AGREEMENT |
| Config | final |
| Parties | Northwind Analytics, Inc. (our party) ↔ Brightline Cloud Services Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 3m 6.6s (186,637 ms) |
| Calls | 111 LLM · 123 tool · 0 retries |
| Tokens | 49,649 input · 43,638 output · 544,802 cache read · 93,559 cache write |
| Cost | $2.196340 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 428 | 91 | 123 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 495](trajectory.jsonl#L495) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 139](trajectory.jsonl#L139)–[seq 504](trajectory.jsonl#L504) |
| assembler | 21 | 0 | 0 | — | [seq 166](trajectory.jsonl#L166)–[seq 512](trajectory.jsonl#L512) |
| memo | 4 | 1 | 0 | — | [seq 508](trajectory.jsonl#L508)–[seq 511](trajectory.jsonl#L511) |
| human | 0 | 0 | 0 | 0 decision(s) | — |
| apply | 0 | 0 | 0 | not applied | — |

## LOL-CAP — Limitation of liability — cap, mutuality and carve-outs

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 6](trajectory.jsonl#L6)

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

- [seq 13](trajectory.jsonl#L13) **drafter → read_section**

```json
{"sectionId":"sec-21"}
```

- [seq 14](trajectory.jsonl#L14) **read_section result**

```json
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0088","text":"21. LIMITATION OF LIABILITY"},{"id":"p0089","text":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the clai…
```

- [seq 15](trajectory.jsonl#L15) **drafter → read_section**

```json
{"sectionId":"sec-20"}
```

- [seq 16](trajectory.jsonl#L16) **read_section result**

```json
{"sectionRef":"§ 20 INDEMNIFICATION","paragraphs":[{"id":"p0082","text":"20. INDEMNIFICATION"},{"id":"p0083","text":"20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegati…
```

- [seq 49](trajectory.jsonl#L49) **drafter → get_definition**

```json
{"term":"Fees"}
```

- [seq 50](trajectory.jsonl#L50) **get_definition result**

```json
{"found":true,"term":"Fees","paragraphId":"p0007","text":"1.5 “Fees” means the Implementation Fee."}
```

- [seq 51](trajectory.jsonl#L51) **drafter → search**

```json
{"query":"Order Form","limit":15}
```

- [seq 52](trajectory.jsonl#L52) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1 DEFINITIONS","snippet":"…and accessibility. Applicable Law does not include a private standard unless an Order Form expressly adopts it."},{"paragraphId":"p0006","sectionRef":"§ 1 DEFINITIONS","snippet":"…cification, design, workflow, training material, and other work product that an Order Form identifies as being created specifically for Customer. Delive…
```

- [seq 97](trajectory.jsonl#L97) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0007","p0008","p0009"]}
```

- [seq 98](trajectory.jsonl#L98) **read_paragraphs result**

```json
[{"id":"p0007","sectionRef":"§ 1 DEFINITIONS","text":"1.5 “Fees” means the Implementation Fee."},{"id":"p0008","sectionRef":"§ 1 DEFINITIONS","text":"1.6 “Implementation Fee” means the one-time implementation charge of USD 12,000 stated in the first Order Form."},{"id":"p0009","sectionRef":"§ 1 DEFINITIONS","text":"1.7 “Order Form” means a written ordering document signed by authorized representa…
```

- [seq 99](trajectory.jsonl#L99) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"Cap basis defined as narrow Implementation Fee under first Order Form; carve-outs already present"}
```

- [seq 126](trajectory.jsonl#L126) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-lol-2","source":"Northstar Hosting Agreement (Jun 2025)","clauseAfter":"Except for Excluded Claims, each party's liability is limited to the greater of twelve months' fees and USD 1,000,000.","comment":"[Playbook] We added a meaningful mutual cap and preserved uncapped treatment for excluded claims.","level":"preferred"},{"id":"seed-lol-1","source":"Acme Cloud MSA (Mar …
```

- [seq 149](trajectory.jsonl#L149) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Fix illusory cap basis: greater of all fees paid or payable in prior 12 months and USD 1,000,000","comment":"[Playbook] The cap is currently measured by \"Fees\", defined as the one-time USD 12,000 Implementation Fee under the first Order Form, so it is effectively a fixed USD 12,000 cap. We have aligned it to our position: the greater of all amounts paid or payable under the Agreement in the twelve months preceding the claim and USD 1,000,000, with indemnification and confidentiality/data-protection breaches remaining outside the cap as Excluded Claims.","precedentId":"seed-lol-2","ops":[{"kind":"replace","paragraphId":"p0089","oldText":"the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim","newText":"the greater of (a) all amounts paid or payable by Customer under this Agreement and all Order Forms in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000"}]}
```

- [seq 150](trajectory.jsonl#L150) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0089","segments":[{"type":"equal","text":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the "},{"type":"delete","text":"Fees "},{"type":"insert","text":"greater of (a) all amounts "},{"type":"equal","text":"paid or payable by Customer under "},{"type":"delete…
```

- [seq 173](trajectory.jsonl#L173) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0089","p0007","p0008"],"quote":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim.","rationale":"The cap is mutual, indirect damages are mutually excluded, and § 21.3 contains the full preferred set of Excluded Claims (confidentiality, data protection/security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement) plus confirmation that Customer's payment obligation is not \"damages\". However, the cap basis is illusory: \"Fees\" is defined (§ 1.5/1.6) as the Implementation Fee only — a one-time USD 12,000 charge under the first Order Form — so the cap is effectively a fixed USD 12,000 rather than twelve months' fees, and it excludes all later Order Forms. That is far below the fallback of 12 months' fees and sits in walk-away territory (Vendor cap below 6 months' fees). Redline restores the preferred basis: greater of all amounts paid or payable in the prior twelve months and USD 1,000,000, leaving carve-outs intact.","confidence":0.9,"proposal":{"level":"preferred","summary":"Fix illusory cap basis: greater of all fees paid or payable in prior 12 months and USD 1,000,000","comment":"[Playbook] The cap is currently measured by \"Fees\", defined as the one-time USD 12,000 Implementation Fee under the first Order Form, so it is effectively a fixed USD 12,000 cap. We have aligned it to our position: the greater of all amounts paid or payable under the Agreement in the twelve months preceding the claim and USD 1,000,000, with indemnification and confidentiality/data-protection breaches remaining outside the cap as Excluded Claims.","precedentId":"seed-lol-2","ops":[{"kind":"replace","paragraphId":"p0089","oldText":"the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim","newText":"the greater of (a) all amounts paid or payable by Customer under this Agreement and all Order Forms in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000"}]}}
```

- [seq 174](trajectory.jsonl#L174) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 173](trajectory.jsonl#L173)
- Finding: `f-lol-cap-88c38577` · **deviation** · confidence 0.90
- Location: § 21 LIMITATION OF LIABILITY
- Quote: “21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim.”
- Rationale: The cap is mutual, indirect damages are mutually excluded, and § 21.3 contains the full preferred set of Excluded Claims (confidentiality, data protection/security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement) plus confirmation that Customer's payment obligation is not "damages". However, the cap basis is illusory: "Fees" is defined (§ 1.5/1.6) as the Implementation Fee only — a one-time USD 12,000 charge under the first Order Form — so the cap is effectively a fixed USD 12,000 rather than twelve months' fees, and it excludes all later Order Forms. That is far below the fallback of 12 months' fees and sits in walk-away territory (Vendor cap below 6 months' fees). Redline restores the preferred basis: greater of all amounts paid or payable in the prior twelve months and USD 1,000,000, leaving carve-outs intact.
- Proposal: **preferred** — Fix illusory cap basis: greater of all fees paid or payable in prior 12 months and USD 1,000,000
- Comment: [Playbook] The cap is currently measured by "Fees", defined as the one-time USD 12,000 Implementation Fee under the first Order Form, so it is effectively a fixed USD 12,000 cap. We have aligned it to our position: the greater of all amounts paid or payable under the Agreement in the twelve months preceding the claim and USD 1,000,000, with indemnification and confidentiality/data-protection breaches remaining outside the cap as Excluded Claims.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "the greater of (a) all amounts paid or payable by Customer under this Agreement and all Order Forms in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000",
    "oldText": "the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim",
    "paragraphId": "p0089"
  }
]
```

### Verifier and repair feedback

- [seq 233](trajectory.jsonl#L233) **Verdict: pass** — Deviation is correctly classified: the cap is measured by "Fees", which § 1.5/1.6 define as the one-time USD 12,000 Implementation Fee under the first Order Form only, so the cap is an illusory fixed amount far below the fallback of 12 months' fees and within walk-away territory (Vendor cap below 6 months' fees). This is exactly the illusory-definition scenario the detection guidance flags. Redline is actionable and directionally correct: it replaces only the cap-basis sentence with the preferred greater-of formulation (all amounts paid or payable under the Agreement and all Order Forms in the preceding twelve months, or USD 1,000,000), deliberately bypassing the narrow "Fees" definition and the "first Order Form" limitation. Minimal-edit discipline respected: the mutual-cap sentence, the mutual exclusion of indirect damages and the § 21.3 Excluded Claims set (including the payment-obligation carve-out) are left untouched, so no over-editing of already-compliant elements; the 0.436 changed-character ratio reflects a necessary single-sentence basis replacement. Comment is accurate, correctly attributes the problem to the definition of "Fees", states the playbook position, and confirms indemnification and confidentiality/data-protection breaches remain outside the cap; tone and prefix conform. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimal edit p0089","ok":true,"detail":"changed-character ratio=0.436 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## INDEMN — Indemnification by Vendor

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 7](trajectory.jsonl#L7)

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

- [seq 25](trajectory.jsonl#L25) **drafter → read_section**

```json
{"sectionId":"sec-20"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 20 INDEMNIFICATION","paragraphs":[{"id":"p0082","text":"20. INDEMNIFICATION"},{"id":"p0083","text":"20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegati…
```

- [seq 27](trajectory.jsonl#L27) **drafter → list_sections**

```json
{}
```

- [seq 28](trajectory.jsonl#L28) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 75](trajectory.jsonl#L75) **drafter → read_section**

```json
{"sectionId":"sec-21"}
```

- [seq 76](trajectory.jsonl#L76) **read_section result**

```json
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0088","text":"21. LIMITATION OF LIABILITY"},{"id":"p0089","text":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the clai…
```

- [seq 113](trajectory.jsonl#L113) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0083","p0084","p0085","p0086","p0087","p0091"],"quote":"20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.","rationale":"Section 20 meets the preferred position. Vendor defends and indemnifies Customer and its Affiliates for third-party IP infringement/misappropriation claims regarding the Services or Deliverables (20.1) and for Vendor's breach of Applicable Law, bodily injury/property damage, unauthorised access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud (20.2). Standard procedure is present and balanced (20.4: prompt notice, cooperation at the indemnifying Party's expense, control of defence, prejudice-limited notice failure, consent required for adverse settlements), and 20.5 adds the usual IP remedies (procure, modify/replace without materially reducing functionality, or terminate with a straight-line three-year refund) in addition to, not in lieu of, defence. Customer's indemnity in 20.3 is appropriately narrow — unmodified Customer-supplied material used strictly as authorised and Customer's violation of Applicable Law — with carve-outs for Vendor Technology, modifications, combinations and instructions. Vendor's indemnity is also not squeezed by the liability cap: indemnification obligations are \"Excluded Claims\" under 21.3 and so sit outside the 21.1 cap, better than the fallback's 3× super-cap. (The narrow \"first Order Form\" cap base in 21.1 is a limitation-of-liability issue addressed under that rule, not here.)","confidence":0.93}
```

- [seq 114](trajectory.jsonl#L114) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 113](trajectory.jsonl#L113)
- Finding: `f-indemn-61c801db` · **compliant** · confidence 0.93
- Location: § 20 INDEMNIFICATION
- Quote: “20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.”
- Rationale: Section 20 meets the preferred position. Vendor defends and indemnifies Customer and its Affiliates for third-party IP infringement/misappropriation claims regarding the Services or Deliverables (20.1) and for Vendor's breach of Applicable Law, bodily injury/property damage, unauthorised access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud (20.2). Standard procedure is present and balanced (20.4: prompt notice, cooperation at the indemnifying Party's expense, control of defence, prejudice-limited notice failure, consent required for adverse settlements), and 20.5 adds the usual IP remedies (procure, modify/replace without materially reducing functionality, or terminate with a straight-line three-year refund) in addition to, not in lieu of, defence. Customer's indemnity in 20.3 is appropriately narrow — unmodified Customer-supplied material used strictly as authorised and Customer's violation of Applicable Law — with carve-outs for Vendor Technology, modifications, combinations and instructions. Vendor's indemnity is also not squeezed by the liability cap: indemnification obligations are "Excluded Claims" under 21.3 and so sit outside the 21.1 cap, better than the fallback's 3× super-cap. (The narrow "first Order Form" cap base in 21.1 is a limitation-of-liability issue addressed under that rule, not here.)

### Verifier and repair feedback

- [seq 165](trajectory.jsonl#L165) **Verdict: pass** — Claimed status is compliant, and the cited text supports it: 20.1 gives a full Vendor defend/indemnify obligation for third-party IP infringement/misappropriation claims covering Customer, its Affiliates and their personnel, and 20.2 adds Vendor's breach of Applicable Law, bodily injury/property damage, unauthorised access to or disclosure of Customer Data caused by Vendor, and gross negligence/wilful misconduct/fraud — matching the preferred position. Customer's reciprocal indemnity (20.3) is appropriately narrow (unmodified Customer-supplied material used strictly as authorised; Customer's violation of Applicable Law) with carve-outs for Vendor Technology, modifications, combinations and instructions, so no one-sided exposure to narrow. Standard indemnity procedure is present and balanced (20.4 notice/cooperation/control with prejudice-limited notice failure and consent for adverse settlements), and 20.5 supplies the usual IP remedies in addition to, not in lieu of, defence. Vendor's indemnity is not squeezed by the liability cap because indemnification obligations are Excluded Claims under 21.3, which is better than the fallback 3x super-cap; the narrow cap base is correctly deferred to the limitation-of-liability rule rather than double-flagged here. No redline or counterparty comment was proposed, which is the expected output for a compliant finding, and the deterministic check (vendor IP indemnity present) corroborates the classification. Checks: {"name":"vendor indemnity for IP infringement present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## NONCOMPETE — Non-compete restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 8](trajectory.jsonl#L8)

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

- [seq 31](trajectory.jsonl#L31) **drafter → list_sections**

```json
{}
```

- [seq 32](trajectory.jsonl#L32) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"competing"}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[]
```

- [seq 61](trajectory.jsonl#L61) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 62](trajectory.jsonl#L62) **read_section result**

```json
{"sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","paragraphs":[{"id":"p0050","text":"12. CUSTOMER RESPONSIBILITIES"},{"id":"p0051","text":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges t…
```

- [seq 63](trajectory.jsonl#L63) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 64](trajectory.jsonl#L64) **read_section result**

```json
{"sectionRef":"§ 2 AGREEMENT STRUCTURE AND SCOPE","paragraphs":[{"id":"p0012","text":"2. AGREEMENT STRUCTURE AND SCOPE"},{"id":"p0013","text":"2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its…
```

- [seq 65](trajectory.jsonl#L65) **drafter → search**

```json
{"query":"shall not","limit":30}
```

- [seq 66](trajectory.jsonl#L66) **search result**

```json
[{"paragraphId":"p0019","sectionRef":"§ 4 ORDER FORMS AND AFFILIATE ORDERS","snippet":"…tes require a written change order signed by authorized representatives. Vendor shall not charge for work outside scope that Customer did not approve in a signed change …"},{"paragraphId":"p0028","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"…pute. Vendor shall continue the Services while a payment …
```

- [seq 107](trajectory.jsonl#L107) **drafter → search**

```json
{"query":"exclusiv","limit":20}
```

- [seq 108](trajectory.jsonl#L108) **search result**

```json
[{"paragraphId":"p0051","sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","snippet":"…siness in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment."},{"paragraphId":"p0054","sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","snippet":"…stomer, its Affiliates, and contractors acting on their behalf a …
```

- [seq 109](trajectory.jsonl#L109) **drafter → search**

```json
{"query":"field of use territory","limit":20}
```

- [seq 110](trajectory.jsonl#L110) **search result**

```json
[]
```

- [seq 135](trajectory.jsonl#L135) **drafter → search**

```json
{"query":"compet","limit":20}
```

- [seq 136](trajectory.jsonl#L136) **search result**

```json
[{"paragraphId":"p0051","sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","snippet":"…ld or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment."},{"paragraphId":"p0052","sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","snippet":"12.4 Vendor shall not develop or market a service that competes directly with Custo…
```

- [seq 157](trajectory.jsonl#L157) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0051","p0052"],"quote":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"The Agreement contains no non-compete, exclusivity or field-of-use restriction binding us. Section 12.3 affirmatively confirms we are free to develop, acquire, license, sell or use any product or service, engage any supplier and operate in any field or territory, and that no exclusivity, non-compete, MFC, minimum-volume or no-hire commitment has been made. Section 2.1 similarly disclaims any minimum purchase commitment. The only competition-related restraints run against Brightline (§ 12.4 barring Vendor from developing a service competing with our analytics products during the term, and § 24 restricting assignment to a competitor), which benefit us and are not flagged. This meets the preferred position; no redline needed.","confidence":0.94}
```

- [seq 158](trajectory.jsonl#L158) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 161](trajectory.jsonl#L161)
- Finding: `f-noncompete-b3bea166` · **compliant** · confidence 0.94
- Location: § 12 CUSTOMER RESPONSIBILITIES
- Quote: “12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: The Agreement contains no non-compete, exclusivity or field-of-use restriction binding us. Section 12.3 affirmatively confirms we are free to develop, acquire, license, sell or use any product or service, engage any supplier and operate in any field or territory, and that no exclusivity, non-compete, MFC, minimum-volume or no-hire commitment has been made. Section 2.1 similarly disclaims any minimum purchase commitment. The only competition-related restraints run against Brightline (§ 12.4 barring Vendor from developing a service competing with our analytics products during the term, and § 24 restricting assignment to a competitor), which benefit us and are not flagged. This meets the preferred position; no redline needed.

### Verifier and repair feedback

- [seq 205](trajectory.jsonl#L205) **Verdict: pass** — Claimed status is compliant and the cited text supports it: §12.3 expressly negates any exclusivity, non-compete, MFC, minimum-volume or no-hire commitment by Customer and preserves freedom to develop, acquire, license, sell, use any product/service and operate in any field or territory — this meets the preferred position (no restriction on Customer). §12.4 restricts only Vendor from developing a competing service, which per the detection guidance is acceptable and benefits our side; correctly not flagged. No redline or comment proposed, which is appropriate for a compliant finding; deterministic check confirms no open-ended compete restriction binds Customer. Rationale accurately cites the relevant provisions and notes the related §2.1/§24 provisions without double-flagging. Checks: {"name":"no open-ended compete restriction on Customer remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## EXCLUSIVITY — Exclusivity obligations binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 9](trajectory.jsonl#L9)

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

- [seq 19](trajectory.jsonl#L19) **drafter → search**

```json
{"query":"exclusive","limit":30}
```

- [seq 20](trajectory.jsonl#L20) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","snippet":"…stomer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and do…"},{"paragraphId":"p0080","sectionRef":"§ 19 WARRANTIES","snippet":"… the affected item and receive a refund of Fees paid for it. This remedy is no…
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"sole","limit":30}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[{"paragraphId":"p0059","sectionRef":"§ 14 INTELLECTUAL PROPERTY AND DELIVERABLES","snippet":"… No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer."},{"paragraphId":"p0124","sectionRef":"§ 30 GENERAL","snippet":"…relationship, franchise, or agency. Neither Party may bind the other. Vendor is sole…
```

- [seq 57](trajectory.jsonl#L57) **drafter → search**

```json
{"query":"requirements from","limit":20}
```

- [seq 58](trajectory.jsonl#L58) **search result**

```json
[]
```

- [seq 87](trajectory.jsonl#L87) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 88](trajectory.jsonl#L88) **read_section result**

```json
{"sectionRef":"§ 2 AGREEMENT STRUCTURE AND SCOPE","paragraphs":[{"id":"p0012","text":"2. AGREEMENT STRUCTURE AND SCOPE"},{"id":"p0013","text":"2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its…
```

- [seq 89](trajectory.jsonl#L89) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 90](trajectory.jsonl#L90) **read_section result**

```json
{"sectionRef":"§ 4 ORDER FORMS AND AFFILIATE ORDERS","paragraphs":[{"id":"p0018","text":"4. ORDER FORMS AND AFFILIATE ORDERS"},{"id":"p0019","text":"4.1 An Order Form becomes binding when signed by both Parties. Changes in scope, assumptions, quantities, Fees, dependencies, or dates require a written change order signed by authorized representatives. Vendor shall not charge for work outside scope…
```

- [seq 91](trajectory.jsonl#L91) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 92](trajectory.jsonl#L92) **read_section result**

```json
{"sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","paragraphs":[{"id":"p0050","text":"12. CUSTOMER RESPONSIBILITIES"},{"id":"p0051","text":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges t…
```

- [seq 93](trajectory.jsonl#L93) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 94](trajectory.jsonl#L94) **read_section result**

```json
{"sectionRef":"§ 7 FEES, INVOICING, AND TAXES","paragraphs":[{"id":"p0025","text":"7. FEES, INVOICING, AND TAXES"},{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the…
```

- [seq 123](trajectory.jsonl#L123) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0051","p0013","p0052"],"quote":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"The Agreement imposes no exclusivity or sole-supplier obligation on Customer, which is the preferred position. Clause 12.3 affirmatively confirms Customer is free to engage any supplier and has made no exclusivity, non-compete or minimum-volume commitment, and clause 2.1 confirms no minimum quantity or purchase commitment applies and that declining further Order Forms is not a breach. The only exclusivity-flavoured restraint runs against Vendor (12.4, non-compete with Customer's analytics products), which benefits us and is not flagged. Searches for \"exclusive\"/\"sole\" language returned only unrelated uses (non-exclusive licence, exclusive jurisdiction, exclusive remedy).","confidence":0.93}
```

- [seq 124](trajectory.jsonl#L124) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 161](trajectory.jsonl#L161)
- Finding: `f-exclusivity-7a675b83` · **compliant** · confidence 0.93
- Location: § 12 CUSTOMER RESPONSIBILITIES
- Quote: “12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: The Agreement imposes no exclusivity or sole-supplier obligation on Customer, which is the preferred position. Clause 12.3 affirmatively confirms Customer is free to engage any supplier and has made no exclusivity, non-compete or minimum-volume commitment, and clause 2.1 confirms no minimum quantity or purchase commitment applies and that declining further Order Forms is not a breach. The only exclusivity-flavoured restraint runs against Vendor (12.4, non-compete with Customer's analytics products), which benefits us and is not flagged. Searches for "exclusive"/"sole" language returned only unrelated uses (non-exclusive licence, exclusive jurisdiction, exclusive remedy).

### Verifier and repair feedback

- [seq 169](trajectory.jsonl#L169) **Verdict: pass** — Claimed status is compliant and the cited text supports it: clause 12.3 expressly disclaims any exclusivity, non-compete, MFC or minimum-volume commitment by Customer, and clause 2.1 confirms no minimum quantity or purchase commitment and that declining further Order Forms is not a breach — this meets the preferred position (no exclusivity binding Customer). The only exclusivity-flavoured restraint (12.4) runs against Vendor and benefits Customer, correctly noted as not a deviation per the detection guidance. No redline or counterparty comment was proposed, which is the expected output for a compliant finding; the rendered redline is identical to the original paragraphs and the deterministic check confirms no sole-supplier/requirements obligation remains. Checks: {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MFN — Most-favoured-nation obligations burdening Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 10](trajectory.jsonl#L10)

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

- [seq 37](trajectory.jsonl#L37) **drafter → search**

```json
{"query":"most favoured"}
```

- [seq 38](trajectory.jsonl#L38) **search result**

```json
[]
```

- [seq 39](trajectory.jsonl#L39) **drafter → search**

```json
{"query":"no less favourable"}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[{"paragraphId":"p0031","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"7.6 Vendor warrants that Fees charged to Customer will be no less favourable than fees offered to any similarly situated customer for comparable volumes and…"}]
```

- [seq 69](trajectory.jsonl#L69) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 70](trajectory.jsonl#L70) **read_section result**

```json
{"sectionRef":"§ 7 FEES, INVOICING, AND TAXES","paragraphs":[{"id":"p0025","text":"7. FEES, INVOICING, AND TAXES"},{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the…
```

- [seq 71](trajectory.jsonl#L71) **drafter → search**

```json
{"query":"most favored|best terms|best pricing|match any|no less favorable|MFN","regex":true}
```

- [seq 72](trajectory.jsonl#L72) **search result**

```json
[]
```

- [seq 101](trajectory.jsonl#L101) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 102](trajectory.jsonl#L102) **search result**

```json
[{"paragraphId":"p0031","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"7.6 Vendor warrants that Fees charged to Customer will be no less favourable than fees offered to any similarly situated customer for comparable volumes and…"}]
```

- [seq 103](trajectory.jsonl#L103) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 104](trajectory.jsonl#L104) **search result**

```json
[]
```

- [seq 129](trajectory.jsonl#L129) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 130](trajectory.jsonl#L130) **read_section result**

```json
{"sectionRef":"§ 4 ORDER FORMS AND AFFILIATE ORDERS","paragraphs":[{"id":"p0018","text":"4. ORDER FORMS AND AFFILIATE ORDERS"},{"id":"p0019","text":"4.1 An Order Form becomes binding when signed by both Parties. Changes in scope, assumptions, quantities, Fees, dependencies, or dates require a written change order signed by authorized representatives. Vendor shall not charge for work outside scope…
```

- [seq 131](trajectory.jsonl#L131) **drafter → read_section**

```json
{"sectionId":"sec-30"}
```

- [seq 132](trajectory.jsonl#L132) **read_section result**

```json
{"sectionRef":"§ 30 GENERAL","paragraphs":[{"id":"p0123","text":"30. GENERAL"},{"id":"p0124","text":"30.1 The Parties are independent contractors. Nothing creates a partnership, joint venture, fiduciary relationship, franchise, or agency. Neither Party may bind the other. Vendor is solely responsible for compensation, direction, and taxes of its personnel."},{"id":"p0125","text":"30.2 Neither Par…
```

- [seq 153](trajectory.jsonl#L153) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0031"],"quote":"7.6 Vendor warrants that Fees charged to Customer will be no less favourable than fees offered to any similarly situated customer for comparable volumes and terms.","rationale":"The only most-favoured-nation language in the Agreement is Clause 7.6, which runs in our favour: Vendor warrants that Fees charged to us will be no less favourable than those offered to similarly situated customers for comparable volumes and terms. Searches for \"most favoured/favored\", \"no less favourable/favorable\", \"best pricing\", \"best terms\" and \"match\" returned no other hits, and the candidate sections (§ 4 Order Forms, § 7 Fees, § 30 General) contain no obligation on Customer to extend best terms to Vendor or to match third-party offers. This meets the preferred position (no MFN obligation on Customer; a Vendor-granted MFN is welcome), so no redline is proposed. Separately noted for information only: Clause 7.7's late-payment liquidated damages is a burdensome payment term, but it is not an MFN issue and is addressed under the relevant payment/remedies rule.","confidence":0.93}
```

- [seq 154](trajectory.jsonl#L154) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 153](trajectory.jsonl#L153)
- Finding: `f-mfn-c912a106` · **compliant** · confidence 0.93
- Location: § 7 FEES, INVOICING, AND TAXES
- Quote: “7.6 Vendor warrants that Fees charged to Customer will be no less favourable than fees offered to any similarly situated customer for comparable volumes and terms.”
- Rationale: The only most-favoured-nation language in the Agreement is Clause 7.6, which runs in our favour: Vendor warrants that Fees charged to us will be no less favourable than those offered to similarly situated customers for comparable volumes and terms. Searches for "most favoured/favored", "no less favourable/favorable", "best pricing", "best terms" and "match" returned no other hits, and the candidate sections (§ 4 Order Forms, § 7 Fees, § 30 General) contain no obligation on Customer to extend best terms to Vendor or to match third-party offers. This meets the preferred position (no MFN obligation on Customer; a Vendor-granted MFN is welcome), so no redline is proposed. Separately noted for information only: Clause 7.7's late-payment liquidated damages is a burdensome payment term, but it is not an MFN issue and is addressed under the relevant payment/remedies rule.

### Verifier and repair feedback

- [seq 197](trajectory.jsonl#L197) **Verdict: pass** — The cited Clause 7.6 is a Vendor-granted MFN running in Customer's favour (Fees to Customer no less favourable than those offered to similarly situated customers), which matches the rule's preferred position and the detection guidance's explicit instruction to mark such clauses compliant. No redline or comment was proposed, which is the correct treatment for a compliant finding; the rendered paragraph is unchanged from the original and no deterministic checks flagged. The rationale documents a reasonable search for MFN-style triggers ('most favoured', 'no less favourable', 'best pricing', 'match') across the plausible sections (Order Forms, Fees, General) and found no obligation burdening Customer, supporting the no-deviation conclusion. The aside about Clause 7.7 late-payment liquidated damages is correctly scoped as informational and deferred to the payment/remedies rule, avoiding double-flagging the same commercial term. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## NOSOLICIT — Non-solicitation of employees binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 11](trajectory.jsonl#L11)

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

- [seq 43](trajectory.jsonl#L43) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 44](trajectory.jsonl#L44) **search result**

```json
[]
```

- [seq 45](trajectory.jsonl#L45) **drafter → list_sections**

```json
{}
```

- [seq 46](trajectory.jsonl#L46) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"hire"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[{"paragraphId":"p0051","sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","snippet":"…made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment."}]
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"induce"}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[]
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"employ"}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1 DEFINITIONS","snippet":"…ment, including laws concerning privacy, information security, export controls, employment, anti-bribery, and accessibility. Applicable Law does not include a private…"},{"paragraphId":"p0074","sectionRef":"§ 18 INSURANCE","snippet":"…currence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liabil…
```

- [seq 117](trajectory.jsonl#L117) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 118](trajectory.jsonl#L118) **read_section result**

```json
{"sectionRef":"§ 12 CUSTOMER RESPONSIBILITIES","paragraphs":[{"id":"p0050","text":"12. CUSTOMER RESPONSIBILITIES"},{"id":"p0051","text":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges t…
```

- [seq 119](trajectory.jsonl#L119) **drafter → read_section**

```json
{"sectionId":"sec-30"}
```

- [seq 120](trajectory.jsonl#L120) **read_section result**

```json
{"sectionRef":"§ 30 GENERAL","paragraphs":[{"id":"p0123","text":"30. GENERAL"},{"id":"p0124","text":"30.1 The Parties are independent contractors. Nothing creates a partnership, joint venture, fiduciary relationship, franchise, or agency. Neither Party may bind the other. Vendor is solely responsible for compensation, direction, and taxes of its personnel."},{"id":"p0125","text":"30.2 Neither Par…
```

- [seq 141](trajectory.jsonl#L141) **drafter → read_section**

```json
{"sectionId":"sec-16"}
```

- [seq 142](trajectory.jsonl#L142) **read_section result**

```json
{"sectionRef":"§ 16 CONFIDENTIALITY","paragraphs":[{"id":"p0066","text":"16. CONFIDENTIALITY"},{"id":"p0067","text":"16.1 “Confidential Information” means non-public information disclosed by or for a Party that is marked confidential or that a reasonable recipient would understand to be confidential given its nature and the circumstances. Customer Data, security information, product plans, pricin…
```

- [seq 143](trajectory.jsonl#L143) **drafter → search**

```json
{"query":"personnel"}
```

- [seq 144](trajectory.jsonl#L144) **search result**

```json
[{"paragraphId":"p0006","sectionRef":"§ 1 DEFINITIONS","snippet":"…e ideas, methods, skills, and know-how retained in the unaided memory of Vendor personnel."},{"paragraphId":"p0017","sectionRef":"§ 3 SERVICES AND PERFORMANCE","snippet":"…ns, and Applicable Law. Vendor is responsible for the acts and omissions of its personnel, Affiliates, and subcontractors as though they were Vendor's own."},{"…
```

- [seq 161](trajectory.jsonl#L161) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0051"],"quote":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"The Agreement contains no non-solicitation, no-hire, or anti-inducement covenant binding Customer. Searches for \"solicit\", \"induce\", \"employ or engage\", and \"hire\" return no restrictive covenant on personnel; the General section (§30), Confidentiality (§16), and Customer Responsibilities (§12) are all clear. Indeed, §12.3 goes further in our favour by expressly recording that Customer has made no no-hire commitment and remains free to hire any person responding to general recruitment. This meets the preferred position (\"No non-solicit on Customer\"), so no redline is warranted. The only personnel-adjacent restriction (§12.4) binds Vendor, not us, and therefore benefits our party.","confidence":0.92}
```

- [seq 162](trajectory.jsonl#L162) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 161](trajectory.jsonl#L161)
- Finding: `f-nosolicit-5aa1db36` · **compliant** · confidence 0.92
- Location: § 12 CUSTOMER RESPONSIBILITIES
- Quote: “12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: The Agreement contains no non-solicitation, no-hire, or anti-inducement covenant binding Customer. Searches for "solicit", "induce", "employ or engage", and "hire" return no restrictive covenant on personnel; the General section (§30), Confidentiality (§16), and Customer Responsibilities (§12) are all clear. Indeed, §12.3 goes further in our favour by expressly recording that Customer has made no no-hire commitment and remains free to hire any person responding to general recruitment. This meets the preferred position ("No non-solicit on Customer"), so no redline is warranted. The only personnel-adjacent restriction (§12.4) binds Vendor, not us, and therefore benefits our party.

### Verifier and repair feedback

- [seq 201](trajectory.jsonl#L201) **Verdict: pass** — Claimed status is compliant and the cited §12.3 affirmatively supports it: it records that Customer has made no no-hire commitment and preserves Customer's freedom to hire any person responding to general recruitment, matching the preferred position ('No non-solicit on Customer'). No redline or counterparty comment was proposed, which is the expected output for a compliant finding; the rendered paragraph is unchanged from the original. The deterministic checks (duration ≤ 12 months, general-solicitation carve-out) are inapplicable here because no non-solicit covenant binds Customer at all — their failure is an artefact of the heuristic, not evidence of a defect. The only personnel-adjacent restriction noted (§12.4) binds Vendor and benefits our party, so per playbook guidance it is correctly not flagged. Checks: {"name":"non-solicit duration ≤ 12 months","ok":false,"detail":"number not found"}; {"name":"general-solicitation carve-out present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 167](trajectory.jsonl#L167)

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

- [seq 183](trajectory.jsonl#L183) **drafter → list_sections**

```json
{}
```

- [seq 184](trajectory.jsonl#L184) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 185](trajectory.jsonl#L185) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 186](trajectory.jsonl#L186) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0037","text":"9. TERMINATION"},{"id":"p0038","text":"9.1 Either Party may terminate this Agreement or an affected Order Form for the other Party's material breach if the breach remains uncured thirty days after written notice describing it in reasonable detail. If a breach cannot reasonably be cured within thirty days, the cure period extends …
```

- [seq 209](trajectory.jsonl#L209) **drafter → read_section**

```json
{"sectionId":"sec-29"}
```

- [seq 210](trajectory.jsonl#L210) **read_section result**

```json
{"sectionRef":"§ 29 NOTICES","paragraphs":[{"id":"p0118","text":"29. NOTICES"},{"id":"p0119","text":"29.1 Legal notices under this Agreement must be in writing and delivered by nationally recognized overnight courier or certified mail, return receipt requested, to the address in the preamble and by email to the legal-notice address stated in the applicable Order Form. Operational notices may be d…
```

- [seq 211](trajectory.jsonl#L211) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 212](trajectory.jsonl#L212) **read_section result**

```json
{"sectionRef":"§ 8 TERM AND RENEWAL","paragraphs":[{"id":"p0033","text":"8. TERM AND RENEWAL"},{"id":"p0034","text":"8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Or…
```

- [seq 213](trajectory.jsonl#L213) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 214](trajectory.jsonl#L214) **read_section result**

```json
{"sectionRef":"§ 10 EFFECT OF EXPIRY OR TERMINATION","paragraphs":[{"id":"p0043","text":"10. EFFECT OF EXPIRY OR TERMINATION"},{"id":"p0044","text":"10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independent…
```

- [seq 243](trajectory.jsonl#L243) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 244](trajectory.jsonl#L244) **search result**

```json
[]
```

- [seq 245](trajectory.jsonl#L245) **drafter → search**

```json
{"query":"terminate for convenience"}
```

- [seq 246](trajectory.jsonl#L246) **search result**

```json
[]
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"without cause"}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[{"paragraphId":"p0041","sectionRef":"§ 9 TERMINATION","snippet":"9.4 Customer may terminate this Agreement or any Order Form without cause by delivering the written notice specified in Section 29.4. Customer owes only …"}]
```

- [seq 279](trajectory.jsonl#L279) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 280](trajectory.jsonl#L280) **read_section result**

```json
{"sectionRef":"§ 7 FEES, INVOICING, AND TAXES","paragraphs":[{"id":"p0025","text":"7. FEES, INVOICING, AND TAXES"},{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the…
```

- [seq 305](trajectory.jsonl#L305) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 306](trajectory.jsonl#L306) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0046","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"},{"id":"p0047","text":"11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export sup…
```

- [seq 327](trajectory.jsonl#L327) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0041","p0122","p0045"],"quote":"9.4 Customer may terminate this Agreement or any Order Form without cause by delivering the written notice specified in Section 29.4. Customer owes only accrued Fees, and Vendor shall refund prepaid Fees for the period after termination.","rationale":"Section 9.4 gives us an unrestricted convenience right over the Agreement or any Order Form, and Section 29.4 fixes that notice period at thirty days — matching the preferred 30-day standard. There is no early-termination fee or penalty: we owe only accrued Fees, and Vendor must refund prepaid Fees for the post-termination period (reinforced by Section 10.2). Vendor has no convenience right: its termination rights in Sections 9.1–9.2 are limited to uncured material breach and insolvency, and Section 8.2 gives only Customer the non-renewal right, so Vendor cannot walk away during the three-year term (Section 8.1). Sections 10 and 11 impose no wind-down or exit charges beyond transition assistance at Order Form rates at our request. The clause sits at the preferred position; no redline needed.","confidence":0.93}
```

- [seq 328](trajectory.jsonl#L328) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 327](trajectory.jsonl#L327)
- Finding: `f-t4c-c5ff7f32` · **compliant** · confidence 0.93
- Location: § 9 TERMINATION
- Quote: “9.4 Customer may terminate this Agreement or any Order Form without cause by delivering the written notice specified in Section 29.4. Customer owes only accrued Fees, and Vendor shall refund prepaid Fees for the period after termination.”
- Rationale: Section 9.4 gives us an unrestricted convenience right over the Agreement or any Order Form, and Section 29.4 fixes that notice period at thirty days — matching the preferred 30-day standard. There is no early-termination fee or penalty: we owe only accrued Fees, and Vendor must refund prepaid Fees for the post-termination period (reinforced by Section 10.2). Vendor has no convenience right: its termination rights in Sections 9.1–9.2 are limited to uncured material breach and insolvency, and Section 8.2 gives only Customer the non-renewal right, so Vendor cannot walk away during the three-year term (Section 8.1). Sections 10 and 11 impose no wind-down or exit charges beyond transition assistance at Order Form rates at our request. The clause sits at the preferred position; no redline needed.

### Verifier and repair feedback

- [seq 369](trajectory.jsonl#L369) **Verdict: pass** — Claimed status is compliant and the cited text supports it: Section 9.4 grants Customer an unrestricted without-cause termination right over the Agreement or any Order Form, Section 29.4 fixes the notice at thirty days, and Sections 9.4/10.2 require refund of prepaid Fees for the post-termination period with no early-termination fee — this matches the preferred position (30 days' notice plus pro-rata refund). No Vendor convenience right appears in the cited provisions, consistent with the preferred requirement that Vendor cannot walk away mid-term; the rationale's references to Sections 8.1–8.2 and 9.1–9.2 are supporting context and do not contradict the cited paragraphs. Correctly no redline and no counterparty comment for a compliant finding; the rendered text is identical to the original paragraphs and the deterministic check ('Customer convenience termination present') passes. Rationale is accurate and appropriately scoped, noting the absence of penalties/exit charges rather than manufacturing a deviation; retaining this as internal compliance evidence is the right treatment. Checks: {"name":"Customer convenience termination present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 171](trajectory.jsonl#L171)

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

- [seq 189](trajectory.jsonl#L189) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 190](trajectory.jsonl#L190) **read_section result**

```json
{"sectionRef":"§ 8 TERM AND RENEWAL","paragraphs":[{"id":"p0033","text":"8. TERM AND RENEWAL"},{"id":"p0034","text":"8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Or…
```

- [seq 191](trajectory.jsonl#L191) **drafter → list_sections**

```json
{}
```

- [seq 192](trajectory.jsonl#L192) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 217](trajectory.jsonl#L217) **drafter → search**

```json
{"query":"increase","limit":10}
```

- [seq 218](trajectory.jsonl#L218) **search result**

```json
[{"paragraphId":"p0036","sectionRef":"§ 8 TERM AND RENEWAL","snippet":"8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer…"},{"paragraphId":"p0036","sectionRef":"§ 8 TERM AND RENEWAL","snippet":"8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urb…
```

- [seq 267](trajectory.jsonl#L267) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0035","p0036"],"quote":"8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand.","rationale":"Section 8.2 provides automatic twelve-month (not multi-year) renewals with a Customer opt-out on only thirty days' written notice, plus a Vendor reminder sixty days before renewal (and an extension of the opt-out deadline if the reminder is missed). Section 8.3 caps renewal uplift at the lesser of CPI and three percent with ninety days' notice and no increase on prepaid periods. This meets the preferred position on renewal term, notice window, reminder, and price cap; no redline needed.","confidence":0.95}
```

- [seq 268](trajectory.jsonl#L268) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 267](trajectory.jsonl#L267)
- Finding: `f-renewal-e72b2dd7` · **compliant** · confidence 0.95
- Location: § 8 TERM AND RENEWAL
- Quote: “8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand.”
- Rationale: Section 8.2 provides automatic twelve-month (not multi-year) renewals with a Customer opt-out on only thirty days' written notice, plus a Vendor reminder sixty days before renewal (and an extension of the opt-out deadline if the reminder is missed). Section 8.3 caps renewal uplift at the lesser of CPI and three percent with ninety days' notice and no increase on prepaid periods. This meets the preferred position on renewal term, notice window, reminder, and price cap; no redline needed.

### Verifier and repair feedback

- [seq 311](trajectory.jsonl#L311) **Verdict: pass** — The cited clauses meet the preferred position: 12-month (not multi-year) automatic renewals, 30-day Customer opt-out window, a 60-day Vendor reminder with deadline extension if missed, and uplift capped at the lesser of CPI and 3% with no increase on prepaid periods. Compliant status is correctly claimed — no redline or comment is expected or provided, and the rendered text is unchanged from the original. Deterministic check confirms the notice window (30 days) is within the ≤30-day preferred threshold. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 199](trajectory.jsonl#L199)

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

- [seq 221](trajectory.jsonl#L221) **drafter → read_section**

```json
{"sectionId":"sec-28"}
```

- [seq 222](trajectory.jsonl#L222) **read_section result**

```json
{"sectionRef":"§ 28 GOVERNING LAW AND DISPUTE RESOLUTION","paragraphs":[{"id":"p0114","text":"28. GOVERNING LAW AND DISPUTE RESOLUTION"},{"id":"p0115","text":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not ap…
```

- [seq 223](trajectory.jsonl#L223) **drafter → list_sections**

```json
{}
```

- [seq 224](trajectory.jsonl#L224) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 261](trajectory.jsonl#L261) **drafter → read_section**

```json
{"sectionId":"sec-30"}
```

- [seq 262](trajectory.jsonl#L262) **read_section result**

```json
{"sectionRef":"§ 30 GENERAL","paragraphs":[{"id":"p0123","text":"30. GENERAL"},{"id":"p0124","text":"30.1 The Parties are independent contractors. Nothing creates a partnership, joint venture, fiduciary relationship, franchise, or agency. Neither Party may bind the other. Vendor is solely responsible for compensation, direction, and taxes of its personnel."},{"id":"p0125","text":"30.2 Neither Par…
```

- [seq 263](trajectory.jsonl#L263) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 264](trajectory.jsonl#L264) **search result**

```json
[]
```

- [seq 301](trajectory.jsonl#L301) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0115","p0116"],"quote":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. ... 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum.","rationale":"Section 28 selects New York law and grants exclusive jurisdiction to the state and federal courts in New York County, which is exactly our preferred position. A document-wide search returns no arbitration provision, so there is no foreign-seated arbitration despite Vendor being a UK entity. The carve-out permitting temporary injunctive relief elsewhere and the pre-filing executive escalation in 28.3 are mutual, do not displace the New York forum, and expressly do not delay urgent relief or limitations-preserving filings.","confidence":0.95}
```

- [seq 302](trajectory.jsonl#L302) **submit_finding result**

```json
{"ok":false,"errors":["quote is not a verbatim substring of a cited paragraph"]}
```

- [seq 323](trajectory.jsonl#L323) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0115","p0116"],"quote":"28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum.","rationale":"Section 28.1 applies \"the laws of the State of New York\" and 28.2 grants exclusive jurisdiction to the state and federal courts in New York County — exactly our preferred position. A document-wide search returns no arbitration provision, so there is no foreign-seated arbitration despite Vendor being a UK entity. The carve-out for temporary injunctive relief elsewhere and the pre-filing executive escalation in 28.3 are mutual, do not displace the New York forum, and expressly do not delay urgent relief or limitations-preserving filings.","confidence":0.95}
```

- [seq 324](trajectory.jsonl#L324) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 323](trajectory.jsonl#L323)
- Finding: `f-govlaw-3cdfeb1c` · **compliant** · confidence 0.95
- Location: § 28 GOVERNING LAW AND DISPUTE RESOLUTION
- Quote: “28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum.”
- Rationale: Section 28.1 applies "the laws of the State of New York" and 28.2 grants exclusive jurisdiction to the state and federal courts in New York County — exactly our preferred position. A document-wide search returns no arbitration provision, so there is no foreign-seated arbitration despite Vendor being a UK entity. The carve-out for temporary injunctive relief elsewhere and the pre-filing executive escalation in 28.3 are mutual, do not displace the New York forum, and expressly do not delay urgent relief or limitations-preserving filings.

### Verifier and repair feedback

- [seq 373](trajectory.jsonl#L373) **Verdict: pass** — The cited clause matches the preferred position exactly: New York law (28.1) plus exclusive jurisdiction of state and federal courts in New York County (28.2), with no arbitration seat. Compliant status is consistent with no redline and no counterparty comment; the rendered redline is identical to the original paragraphs. Rationale correctly notes the mutual temporary-injunctive-relief carve-out and escalation do not displace the New York forum, and the deterministic check confirms the jurisdiction is within the accepted set. Checks: {"name":"governing law within the accepted set","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 203](trajectory.jsonl#L203)

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

- [seq 227](trajectory.jsonl#L227) **drafter → read_section**

```json
{"sectionId":"sec-24"}
```

- [seq 228](trajectory.jsonl#L228) **read_section result**

```json
{"sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","paragraphs":[{"id":"p0098","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"id":"p0099","text":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Cus…
```

- [seq 229](trajectory.jsonl#L229) **drafter → read_section**

```json
{"sectionId":"sec-30"}
```

- [seq 230](trajectory.jsonl#L230) **read_section result**

```json
{"sectionRef":"§ 30 GENERAL","paragraphs":[{"id":"p0123","text":"30. GENERAL"},{"id":"p0124","text":"30.1 The Parties are independent contractors. Nothing creates a partnership, joint venture, fiduciary relationship, franchise, or agency. Neither Party may bind the other. Vendor is solely responsible for compensation, direction, and taxes of its personnel."},{"id":"p0125","text":"30.2 Neither Par…
```

- [seq 255](trajectory.jsonl#L255) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 256](trajectory.jsonl#L256) **search result**

```json
[{"paragraphId":"p0098","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0100","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"…may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for a…"},{"p…
```

- [seq 257](trajectory.jsonl#L257) **drafter → search**

```json
{"query":"assign"}
```

- [seq 258](trajectory.jsonl#L258) **search result**

```json
[{"paragraphId":"p0039","sectionRef":"§ 9 TERMINATION","snippet":"…e immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proce…"},{"paragraphId":"p0056","sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","snippet":"… transfer its licence rights to an Affiliate or successor in connection with an a…
```

- [seq 283](trajectory.jsonl#L283) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0099","p0100","p0101","p0102"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets our preferred position on every material term: we may assign without Vendor consent to an Affiliate or to a successor by merger, reorganization, acquisition or substantially-all-assets sale (24.1, notice only); the Vendor may not assign, delegate material performance, or transfer by change of control without our consent (not unreasonably withheld) and never to a direct competitor of ours (24.2); other assignments are subject to a mutual reasonable-consent standard (24.3); and 24.4 expressly denies the Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control. Section 13.x and 30.5 are consistent (licence rights transfer to a permitted successor; successors may enforce). No residual change-of-control or anti-assignment boilerplate elsewhere cuts against us, so no redline is warranted.","confidence":0.95}
```

- [seq 284](trajectory.jsonl#L284) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 283](trajectory.jsonl#L283)
- Finding: `f-assign-17e5e4cd` · **compliant** · confidence 0.95
- Location: § 24 ASSIGNMENT AND CHANGE OF CONTROL
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets our preferred position on every material term: we may assign without Vendor consent to an Affiliate or to a successor by merger, reorganization, acquisition or substantially-all-assets sale (24.1, notice only); the Vendor may not assign, delegate material performance, or transfer by change of control without our consent (not unreasonably withheld) and never to a direct competitor of ours (24.2); other assignments are subject to a mutual reasonable-consent standard (24.3); and 24.4 expressly denies the Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control. Section 13.x and 30.5 are consistent (licence rights transfer to a permitted successor; successors may enforce). No residual change-of-control or anti-assignment boilerplate elsewhere cuts against us, so no redline is warranted.

### Verifier and repair feedback

- [seq 341](trajectory.jsonl#L341) **Verdict: pass** — Claimed status is compliant and the cited text supports it: 24.1 gives Customer an unconditional affiliate/successor (merger, reorganization, acquisition, substantially-all-assets) assignment right on notice only, matching the preferred position. 24.2 restricts Vendor assignment, delegation of material performance and change-of-control transfers to Customer's consent (not unreasonably withheld) with a competitor bar, and 24.3 supplies a mutual reasonable-consent standard for other assignments. 24.4 expressly negates any Vendor termination, suspension, repricing, Fee-acceleration or service-reduction right on Customer's change of control, so walk-away territory is avoided. No redline or comment was proposed, which is correct for a compliant finding; the deterministic check confirming the successor/affiliate carve-out is consistent. The 'without Customer's consent' qualifier on the competitor bar in 24.2 is a minor sub-element short of an absolute prohibition and is properly noted rather than flagged. Checks: {"name":"successor/affiliate carve-out for Customer present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 207](trajectory.jsonl#L207)

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

- [seq 237](trajectory.jsonl#L237) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 238](trajectory.jsonl#L238) **read_section result**

```json
{"sectionRef":"§ 14 INTELLECTUAL PROPERTY AND DELIVERABLES","paragraphs":[{"id":"p0058","text":"14. INTELLECTUAL PROPERTY AND DELIVERABLES"},{"id":"p0059","text":"14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vend…
```

- [seq 239](trajectory.jsonl#L239) **drafter → read_section**

```json
{"sectionId":"sec-15"}
```

- [seq 240](trajectory.jsonl#L240) **read_section result**

```json
{"sectionRef":"§ 15 CUSTOMER DATA AND PRIVACY","paragraphs":[{"id":"p0063","text":"15. CUSTOMER DATA AND PRIVACY"},{"id":"p0064","text":"15.1 Vendor shall process Customer Data only on Customer's documented instructions, to provide the Services, and as permitted by this Agreement. Vendor shall not sell Customer Data, use it for advertising, combine it with another customer's identifiable data, or…
```

- [seq 271](trajectory.jsonl#L271) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 272](trajectory.jsonl#L272) **read_section result**

```json
{"sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","paragraphs":[{"id":"p0053","text":"13. ACCESS RIGHTS AND LICENCE"},{"id":"p0054","text":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal bu…
```

- [seq 273](trajectory.jsonl#L273) **drafter → get_definition**

```json
{"term":"Deliverable"}
```

- [seq 274](trajectory.jsonl#L274) **get_definition result**

```json
{"found":true,"term":"Deliverable","paragraphId":"p0006","text":"1.4 “Deliverable” means each report, configuration, integration, specification, design, workflow, training material, and other work product that an Order Form identifies as being created specifically for Customer. Deliverables exclude Vendor Technology and generally applicable ideas, methods, skills, and know-how retained in the una…
```

- [seq 293](trajectory.jsonl#L293) **drafter → get_definition**

```json
{"term":"Customer Data"}
```

- [seq 294](trajectory.jsonl#L294) **get_definition result**

```json
{"found":true,"term":"Customer Data","paragraphId":"p0005","text":"1.3 “Customer Data” means all data, records, files, content, personal information, and other materials submitted to, stored in, transmitted through, or otherwise made available to the Services by or for Customer or its Authorized Users, together with output specifically derived from that material. Customer Data excludes anonymized…
```

- [seq 295](trajectory.jsonl#L295) **drafter → get_definition**

```json
{"term":"Vendor Technology"}
```

- [seq 296](trajectory.jsonl#L296) **get_definition result**

```json
{"found":true,"term":"Vendor Technology","paragraphId":"p0011","text":"1.9 “Vendor Technology” means Vendor's pre-existing software, tools, models, templates, documentation, routines, connectors, and other technology, and modifications of them that are not Deliverables and do not embody Customer Confidential Information. Vendor Technology does not include Customer Data or intellectual property ow…
```

- [seq 297](trajectory.jsonl#L297) **drafter → search**

```json
{"query":"aggregated"}
```

- [seq 298](trajectory.jsonl#L298) **search result**

```json
[]
```

- [seq 315](trajectory.jsonl#L315) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0059","p0060","p0061","p0062","p0055"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.","rationale":"The ownership provisions meet our preferred position. Section 14.1 confirms Customer retains all Customer Data, Customer-provided material and independently developed IP, with only a limited processing right to Vendor (no assignment of our IP or data). Section 14.2 gives Customer ownership of each Deliverable with an express present assignment from Vendor plus personnel assignments and further-assurance cooperation. Section 14.3 leaves Vendor with its pre-existing Vendor Technology only (definition 1.9 expressly excludes Customer Data and pre-existing Customer IP) and routes embedded Vendor Technology to the Section 13.2 licence, which is perpetual, irrevocable, worldwide, royalty-free and fully paid, and includes modification, derivative works and contractor support for Customer's business. Section 14.4 rules out joint ownership absent a separate signed instrument and keeps feedback voluntary with Customer retaining unrestricted use of its own feedback. Section 15.1 further bars sale, advertising use, commingling and model training on Customer Data without our consent. Minor note only: the \"improve the Services\" purpose in 14.1 and the telemetry carve-out in the Customer Data definition are narrow and adequately fenced by 15.1, so no redline is warranted.","confidence":0.9}
```

- [seq 316](trajectory.jsonl#L316) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 315](trajectory.jsonl#L315)
- Finding: `f-ip-da8eabd9` · **compliant** · confidence 0.90
- Location: § 14 INTELLECTUAL PROPERTY AND DELIVERABLES
- Quote: “14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.”
- Rationale: The ownership provisions meet our preferred position. Section 14.1 confirms Customer retains all Customer Data, Customer-provided material and independently developed IP, with only a limited processing right to Vendor (no assignment of our IP or data). Section 14.2 gives Customer ownership of each Deliverable with an express present assignment from Vendor plus personnel assignments and further-assurance cooperation. Section 14.3 leaves Vendor with its pre-existing Vendor Technology only (definition 1.9 expressly excludes Customer Data and pre-existing Customer IP) and routes embedded Vendor Technology to the Section 13.2 licence, which is perpetual, irrevocable, worldwide, royalty-free and fully paid, and includes modification, derivative works and contractor support for Customer's business. Section 14.4 rules out joint ownership absent a separate signed instrument and keeps feedback voluntary with Customer retaining unrestricted use of its own feedback. Section 15.1 further bars sale, advertising use, commingling and model training on Customer Data without our consent. Minor note only: the "improve the Services" purpose in 14.1 and the telemetry carve-out in the Customer Data definition are narrow and adequately fenced by 15.1, so no redline is warranted.

### Verifier and repair feedback

- [seq 359](trajectory.jsonl#L359) **Verdict: pass** — Claimed status is 'compliant' and the cited paragraphs support it: Section 14.2 gives Customer ownership of each Deliverable with a present assignment from Vendor plus personnel assignments and further assurances; Section 14.3 limits Vendor to pre-existing Vendor Technology and routes embedded Vendor Technology to the Section 13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence including modification and derivative works. Section 14.1 confirms Customer retains Customer Data, Customer-provided material and independently developed IP with only a limited processing right to Vendor — no assignment of Customer IP or data, consistent with the deterministic check. Section 14.4 expressly negates joint ownership absent a separate signed instrument, and feedback is voluntary with Customer retaining unrestricted use, so no walk-away trigger exists. No redline or counterparty comment was proposed, which is the expected output for a compliant finding; the rationale correctly notes the narrow 'improve the Services' purpose, telemetry carve-out and the absence of an express sublicence right as minor sub-elements not warranting a redline. Checks: {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 235](trajectory.jsonl#L235)

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

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","paragraphs":[{"id":"p0053","text":"13. ACCESS RIGHTS AND LICENCE"},{"id":"p0054","text":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal bu…
```

- [seq 251](trajectory.jsonl#L251) **drafter → list_sections**

```json
{}
```

- [seq 252](trajectory.jsonl#L252) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 287](trajectory.jsonl#L287) **drafter → read_section**

```json
{"sectionId":"sec-24"}
```

- [seq 288](trajectory.jsonl#L288) **read_section result**

```json
{"sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","paragraphs":[{"id":"p0098","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"id":"p0099","text":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Cus…
```

- [seq 319](trajectory.jsonl#L319) **drafter → search**

```json
{"query":"suspend"}
```

- [seq 320](trajectory.jsonl#L320) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","snippet":"…nnection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the …"},{"paragraphId":"p0102","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24.4 Customer's change of control does not give Vendor a ri…
```

- [seq 337](trajectory.jsonl#L337) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0054","p0055","p0056","p0099"],"quote":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.","rationale":"Section 13 meets the preferred position without qualification: the subscription grant expressly extends to Customer's Affiliates and contractors acting on their behalf (13.1, no written-notice condition needed), paid-up/embedded software is licensed on a perpetual, irrevocable, royalty-free basis to Customer and its Affiliates with contractor support rights (13.2), and Vendor may not revoke or suspend a licence except for material uncured payment or use breach after notice and a cure opportunity (13.3). Licence rights are transferable to an Affiliate or successor under the permitted-assignment right in Section 24.1, which covers M&A and asset sales without Vendor consent, and Section 24.4 bars Vendor from using a change of control to terminate or suspend. No \"revocable\" or narrow \"internal use only\" limitation and no walk-away features are present, so no redline is warranted.","confidence":0.93}
```

- [seq 338](trajectory.jsonl#L338) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 337](trajectory.jsonl#L337)
- Finding: `f-license-11edd5db` · **compliant** · confidence 0.93
- Location: § 13 ACCESS RIGHTS AND LICENCE
- Quote: “13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.”
- Rationale: Section 13 meets the preferred position without qualification: the subscription grant expressly extends to Customer's Affiliates and contractors acting on their behalf (13.1, no written-notice condition needed), paid-up/embedded software is licensed on a perpetual, irrevocable, royalty-free basis to Customer and its Affiliates with contractor support rights (13.2), and Vendor may not revoke or suspend a licence except for material uncured payment or use breach after notice and a cure opportunity (13.3). Licence rights are transferable to an Affiliate or successor under the permitted-assignment right in Section 24.1, which covers M&A and asset sales without Vendor consent, and Section 24.4 bars Vendor from using a change of control to terminate or suspend. No "revocable" or narrow "internal use only" limitation and no walk-away features are present, so no redline is warranted.

### Verifier and repair feedback

- [seq 405](trajectory.jsonl#L405) **Verdict: pass** — The cited grant clauses meet the preferred position: 13.1 extends the subscription licence to Customer's Affiliates and contractors acting on their behalf without a notice condition; 13.2 grants a perpetual, irrevocable, royalty-free, fully paid licence for paid-up/embedded software to Customer and its Affiliates with contractor support rights. 13.3 permits no at-will revocation — suspension/revocation is limited to material uncured payment or use breach after notice and a cure opportunity — and licence rights are transferable to an Affiliate or successor via the Section 24.1 permitted-assignment right covering M&A and asset sales without Vendor consent. No walk-away features (revocable at Vendor's discretion, affiliates/contractors excluded, 'internal use only' with no path) appear; deterministic checks for affiliate coverage and absence of at-will revocation both pass. Consistent with a compliant finding, no redline or comment was proposed, which is correct here; the only inaccuracy is a passing reference to Section 24.4 not included in the cited paragraphs, which does not affect the classification. Checks: {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 313](trajectory.jsonl#L313)

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

- [seq 331](trajectory.jsonl#L331) **drafter → read_section**

```json
{"sectionId":"sec-22"}
```

- [seq 332](trajectory.jsonl#L332) **read_section result**

```json
{"sectionRef":"§ 22 AUDIT RIGHTS","paragraphs":[{"id":"p0093","text":"22. AUDIT RIGHTS"},{"id":"p0094","text":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site …
```

- [seq 333](trajectory.jsonl#L333) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 334](trajectory.jsonl#L334) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0097","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 351](trajectory.jsonl#L351) **drafter → search**

```json
{"query":"audit","limit":20}
```

- [seq 352](trajectory.jsonl#L352) **search result**

```json
[{"paragraphId":"p0093","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0094","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-m…"},{"paragraphId":"p0094","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"…business hours, and in a manner that does not unreasonably disrupt Custo…
```

- [seq 353](trajectory.jsonl#L353) **drafter → search**

```json
{"query":"inspect","limit":20}
```

- [seq 354](trajectory.jsonl#L354) **search result**

```json
[]
```

- [seq 377](trajectory.jsonl#L377) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0094","p0095","p0096"],"quote":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","rationale":"Section 22 meets the preferred position in full: audits are limited to once per twelve-month period, require thirty days' prior written notice, occur during normal business hours, are conducted off-site where practicable by an independent auditor bound by confidentiality (§ 22.1), and Vendor bears the cost unless underpayment exceeds five percent (§ 22.2). Section 22.2 also expressly prohibits direct access to Customer systems, Customer Data unrelated to usage, privileged material and third-party confidential information, so the walk-away risk of unannounced audits or remote system access does not arise. Section 22.3 adds customer-favourable protections (findings are our Confidential Information, copy of the report, closure of the audited issue). No redline required; § 23 contains no separate records/assurance obligation to flag.","confidence":0.95}
```

- [seq 378](trajectory.jsonl#L378) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 377](trajectory.jsonl#L377)
- Finding: `f-audit-16b7312a` · **compliant** · confidence 0.95
- Location: § 22 AUDIT RIGHTS
- Quote: “22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.”
- Rationale: Section 22 meets the preferred position in full: audits are limited to once per twelve-month period, require thirty days' prior written notice, occur during normal business hours, are conducted off-site where practicable by an independent auditor bound by confidentiality (§ 22.1), and Vendor bears the cost unless underpayment exceeds five percent (§ 22.2). Section 22.2 also expressly prohibits direct access to Customer systems, Customer Data unrelated to usage, privileged material and third-party confidential information, so the walk-away risk of unannounced audits or remote system access does not arise. Section 22.3 adds customer-favourable protections (findings are our Confidential Information, copy of the report, closure of the audited issue). No redline required; § 23 contains no separate records/assurance obligation to flag.

### Verifier and repair feedback

- [seq 435](trajectory.jsonl#L435) **Verdict: pass** — Cited § 22.1–22.3 satisfies every preferred element: once per 12 months, 30 days' prior written notice, business hours, off-site where practicable, independent auditor bound by confidentiality, Vendor cost unless underpayment exceeds 5%, and an express bar on direct access to Customer systems/data. No walk-away trigger (no unlimited/unannounced audits, no remote system access), and § 22.3 adds customer-favourable protections, so no redline or comment is appropriate. Redline is unchanged from the original text and no comment is attached, which is the correct output for a compliant finding; deterministic check on audit frequency passes and rationale accurately reflects the clause. Checks: {"name":"audit frequency limited","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 343](trajectory.jsonl#L343)

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

- [seq 363](trajectory.jsonl#L363) **drafter → list_sections**

```json
{}
```

- [seq 364](trajectory.jsonl#L364) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 365](trajectory.jsonl#L365) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 366](trajectory.jsonl#L366) **search result**

```json
[{"paragraphId":"p0032","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"…oice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for…"}]
```

- [seq 381](trajectory.jsonl#L381) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 382](trajectory.jsonl#L382) **read_section result**

```json
{"sectionRef":"§ 7 FEES, INVOICING, AND TAXES","paragraphs":[{"id":"p0025","text":"7. FEES, INVOICING, AND TAXES"},{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the…
```

- [seq 383](trajectory.jsonl#L383) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 384](trajectory.jsonl#L384) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0037","text":"9. TERMINATION"},{"id":"p0038","text":"9.1 Either Party may terminate this Agreement or an affected Order Form for the other Party's material breach if the breach remains uncured thirty days after written notice describing it in reasonable detail. If a breach cannot reasonably be cured within thirty days, the cure period extends …
```

- [seq 411](trajectory.jsonl#L411) **drafter → lookup_precedent**

```json
{"ruleId":"LD","context":"Customer-payable liquidated damages for late payment at 15% of annual Fees per week; delete and replace with modest interest"}
```

- [seq 437](trajectory.jsonl#L437) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-ld","source":"Willow Managed Services Order (May 2025)","clauseAfter":"Customer's sole early-termination fee shall not exceed three months' fees.","comment":"[Playbook] We replaced the remaining-term penalty with the accepted three-month cap.","level":"fallback"}]}
```

- [seq 438](trajectory.jsonl#L438) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 439](trajectory.jsonl#L439) **read_section result**

```json
{"sectionRef":"§ 10 EFFECT OF EXPIRY OR TERMINATION","paragraphs":[{"id":"p0043","text":"10. EFFECT OF EXPIRY OR TERMINATION"},{"id":"p0044","text":"10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independent…
```

- [seq 462](trajectory.jsonl#L462) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Replace Customer-payable liquidated damages for late payment with modest late-payment interest on undisputed sums","comment":"[Playbook] We cannot accept liquidated damages payable by us, and 15% of annual Fees per week of delay is a penalty far exceeding any credible loss. We have replaced it with standard interest on undisputed overdue amounts, preserving the dispute protections in Section 7.3.","ops":[{"kind":"replace","paragraphId":"p0032","oldText":"7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.","newText":"7.7 If a proper, undisputed invoice remains unpaid after its due date, Vendor's sole remedy is simple interest on the overdue amount at one percent per month (or the lower maximum rate permitted by Applicable Law) from the due date until payment. Customer is not liable for any liquidated damages, penalty, or similar charge in respect of late payment, and amounts withheld under Section 7.3 do not accrue interest unless ultimately found due."}]}
```

- [seq 463](trajectory.jsonl#L463) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0032","segments":[{"type":"equal","text":"7.7 If "},{"type":"delete","text":"any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid"},{"type":"insert","text":"a proper, undisputed…
```

- [seq 477](trajectory.jsonl#L477) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0032"],"quote":"7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.","rationale":"Section 7.7 imposes liquidated damages payable by us (the Customer) for late payment at fifteen percent of annual Fees per week of delay — compounding to more than the annual contract value within seven weeks and triggered by a minor administrative breach. That is walk-away territory under this rule and fails the fallback (which contemplates only a capped early-termination fee, not an open-ended late-payment penalty). No early-termination fee or other Customer-payable liquidated amount appears elsewhere: Sections 9.4 and 10.2 require only accrued Fees plus refunds of prepayments, which is favourable to us. We propose the preferred position — no liquidated damages or penalties payable by us — substituting standard interest on undisputed overdue amounts and preserving the good-faith withholding right in Section 7.3.","confidence":0.93,"proposal":{"level":"preferred","summary":"Replace Customer-payable liquidated damages for late payment with modest late-payment interest on undisputed sums","comment":"[Playbook] We cannot accept liquidated damages payable by us, and 15% of annual Fees per week of delay is a penalty far exceeding any credible loss. We have replaced it with standard interest on undisputed overdue amounts, preserving the dispute protections in Section 7.3.","ops":[{"kind":"replace","paragraphId":"p0032","oldText":"7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.","newText":"7.7 If a proper, undisputed invoice remains unpaid after its due date, Vendor's sole remedy is simple interest on the overdue amount at one percent per month (or the lower maximum rate permitted by Applicable Law) from the due date until payment. Customer is not liable for any liquidated damages, penalty, or similar charge in respect of late payment, and amounts withheld under Section 7.3 do not accrue interest unless ultimately found due."}]}}
```

- [seq 478](trajectory.jsonl#L478) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 477](trajectory.jsonl#L477)
- Finding: `f-ld-7a202273` · **deviation** · confidence 0.93
- Location: § 7 FEES, INVOICING, AND TAXES
- Quote: “7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.”
- Rationale: Section 7.7 imposes liquidated damages payable by us (the Customer) for late payment at fifteen percent of annual Fees per week of delay — compounding to more than the annual contract value within seven weeks and triggered by a minor administrative breach. That is walk-away territory under this rule and fails the fallback (which contemplates only a capped early-termination fee, not an open-ended late-payment penalty). No early-termination fee or other Customer-payable liquidated amount appears elsewhere: Sections 9.4 and 10.2 require only accrued Fees plus refunds of prepayments, which is favourable to us. We propose the preferred position — no liquidated damages or penalties payable by us — substituting standard interest on undisputed overdue amounts and preserving the good-faith withholding right in Section 7.3.
- Proposal: **preferred** — Replace Customer-payable liquidated damages for late payment with modest late-payment interest on undisputed sums
- Comment: [Playbook] We cannot accept liquidated damages payable by us, and 15% of annual Fees per week of delay is a penalty far exceeding any credible loss. We have replaced it with standard interest on undisputed overdue amounts, preserving the dispute protections in Section 7.3.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "7.7 If a proper, undisputed invoice remains unpaid after its due date, Vendor's sole remedy is simple interest on the overdue amount at one percent per month (or the lower maximum rate permitted by Applicable Law) from the due date until payment. Customer is not liable for any liquidated damages, penalty, or similar charge in respect of late payment, and amounts withheld under Section 7.3 do not accrue interest unless ultimately found due.",
    "oldText": "7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.",
    "paragraphId": "p0032"
  }
]
```

### Verifier and repair feedback

- [seq 501](trajectory.jsonl#L501) **Verdict: pass** — The cited clause (Section 7.7) requires Customer to pay 'liquidated damages' of 15% of annual Fees per week of late payment — a Customer-payable liquidated amount triggered by a minor administrative breach that quickly exceeds the contract value, squarely within the rule's walk-away band and failing the fallback (which allows only a capped early-termination fee). Deviation status is correct. The redline implements the preferred position by deleting the Customer-payable liquidated damages and expressly stating no penalty or similar charge applies, substituting ordinary simple interest on undisputed overdue amounts — an actionable, directionally correct edit that does not create a new Customer liability. The failed 'minimal edit' check is explained by the fact that the rule requires replacing the entire LD sentence; a bare deletion would leave no late-payment mechanic, so a substitution of standard interest is a proportionate rewrite rather than scope creep. The added cross-reference preserving the Section 7.3 withholding right is a minor, party-favourable clarification. The comment is accurate, concise, correctly attributes the 15%/week figure, cites the playbook position, and explains the substitution without lecturing. Checks: {"name":"operation 1 applies","ok":true}; {"name":"minimal edit p0032","ok":false,"detail":"changed-character ratio=0.856 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 361](trajectory.jsonl#L361)

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

- [seq 393](trajectory.jsonl#L393) **drafter → read_section**

```json
{"sectionId":"sec-19"}
```

- [seq 394](trajectory.jsonl#L394) **read_section result**

```json
{"sectionRef":"§ 19 WARRANTIES","paragraphs":[{"id":"p0076","text":"19. WARRANTIES"},{"id":"p0077","text":"19.1 Vendor warrants that Services will be performed in a professional and workmanlike manner by qualified personnel, in accordance with industry standards, this Agreement, and each Order Form. Vendor further warrants that Services and Deliverables will materially conform to their documentat…
```

- [seq 395](trajectory.jsonl#L395) **drafter → list_sections**

```json
{}
```

- [seq 396](trajectory.jsonl#L396) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 413](trajectory.jsonl#L413) **drafter → search**

```json
{"query":"AS IS"}
```

- [seq 414](trajectory.jsonl#L414) **search result**

```json
[]
```

- [seq 415](trajectory.jsonl#L415) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 416](trajectory.jsonl#L416) **read_section result**

```json
{"sectionRef":"§ 6 ACCEPTANCE","paragraphs":[{"id":"p0022","text":"6. ACCEPTANCE"},{"id":"p0023","text":"6.1 Customer will have fifteen business days after delivery of a Deliverable to test it against the acceptance criteria in the applicable Order Form. Customer may accept it in writing or reject it by describing material nonconformities. Payment, productive use needed for testing, or silence do…
```

- [seq 442](trajectory.jsonl#L442) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0077","p0078","p0079","p0080","p0081"],"quote":"19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","rationale":"Section 19 meets the preferred position on every material term: Services are warranted to be performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after delivery or acceptance, whichever is later, and Hosted Services conform throughout the subscription term (19.2) — equal to or better than the preferred 12-month software / 90-day services benchmark; no malicious code and compliance with Applicable Law are covered (19.3); and the remedy is re-performance, repair or replacement with termination plus refund of Fees paid as an escalation, expressly non-exclusive for fraud, IP, confidentiality, privacy, security and indemnified claims (19.4). The disclaimer in 19.5 is mutual and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty; there is no \"AS IS\" language anywhere in the document. Section 6.2 supplies additional acceptance-stage correction and refund mechanics. No redline needed.","confidence":0.93}
```

- [seq 443](trajectory.jsonl#L443) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 442](trajectory.jsonl#L442)
- Finding: `f-warranty-b4e14a53` · **compliant** · confidence 0.93
- Location: § 19 WARRANTIES
- Quote: “19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.”
- Rationale: Section 19 meets the preferred position on every material term: Services are warranted to be performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after delivery or acceptance, whichever is later, and Hosted Services conform throughout the subscription term (19.2) — equal to or better than the preferred 12-month software / 90-day services benchmark; no malicious code and compliance with Applicable Law are covered (19.3); and the remedy is re-performance, repair or replacement with termination plus refund of Fees paid as an escalation, expressly non-exclusive for fraud, IP, confidentiality, privacy, security and indemnified claims (19.4). The disclaimer in 19.5 is mutual and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty; there is no "AS IS" language anywhere in the document. Section 6.2 supplies additional acceptance-stage correction and refund mechanics. No redline needed.

### Verifier and repair feedback

- [seq 481](trajectory.jsonl#L481) **Verdict: pass** — Section 19 supports the compliant classification: 19.1 gives the professional/workmanlike services warranty, 19.2 gives a ninety-day (plus full subscription term for Hosted Services) conformance-to-documentation warranty, 19.3 covers malicious code and compliance with Applicable Law, and 19.4 supplies re-performance/repair/replacement escalating to termination and refund of Fees paid — meeting the preferred position on all material terms. The disclaimer in 19.5 is limited to implied warranties and expressly states no disclaimer limits an express warranty, service level, indemnity or remedy, so it does not swallow the express warranty; no 'AS IS' walk-away language is present. No redline and no counterparty comment is the correct output for a compliant finding, and the rationale accurately cites the clause text and the acceptance-stage mechanics in 6.2. The failed deterministic check is a false negative from phrasing: the period is spelled out as 'For ninety days after delivery or acceptance, whichever is later,' which satisfies the ≥90-day benchmark. Checks: {"name":"warranty period ≥ 90 days or expressed in months/years","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 371](trajectory.jsonl#L371)

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

- [seq 387](trajectory.jsonl#L387) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 388](trajectory.jsonl#L388) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0073","text":"18. INSURANCE"},{"id":"p0074","text":"18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professio…
```

- [seq 389](trajectory.jsonl#L389) **drafter → list_sections**

```json
{}
```

- [seq 390](trajectory.jsonl#L390) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 425](trajectory.jsonl#L425) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0074","p0075"],"quote":"18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18 is a dedicated vendor insurance clause that matches the preferred position in full: CGL at USD 1M per occurrence / USD 2M aggregate, professional E&O at USD 2M, cyber and privacy liability at USD 5M (Vendor hosts and processes Customer Data), workers' compensation as required by law (plus employer's liability of USD 1M), maintained at Vendor's expense throughout the term and for one year afterward. Clause 18.2 adds certificates of insurance on request, reputable insurers, primary coverage where customary, notice of cancellation, and confirmation that insurance does not limit Vendor's liabilities. No redline needed.","confidence":0.95}
```

- [seq 426](trajectory.jsonl#L426) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 425](trajectory.jsonl#L425)
- Finding: `f-insurance-3a510995` · **compliant** · confidence 0.95
- Location: § 18 INSURANCE
- Quote: “18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18 is a dedicated vendor insurance clause that matches the preferred position in full: CGL at USD 1M per occurrence / USD 2M aggregate, professional E&O at USD 2M, cyber and privacy liability at USD 5M (Vendor hosts and processes Customer Data), workers' compensation as required by law (plus employer's liability of USD 1M), maintained at Vendor's expense throughout the term and for one year afterward. Clause 18.2 adds certificates of insurance on request, reputable insurers, primary coverage where customary, notice of cancellation, and confirmation that insurance does not limit Vendor's liabilities. No redline needed.

### Verifier and repair feedback

- [seq 470](trajectory.jsonl#L470) **Verdict: pass** — Section 18.1-18.2 matches the preferred position in full: CGL USD 1M/2M, E&O USD 2M, cyber/privacy USD 5M, workers' compensation as required by law, at Vendor's expense for the term plus one year, with certificates on request. Compliant status correctly carries no redline and no counterparty comment; deterministic check confirms an insurance obligation is present. Rationale accurately cites the clause text and identifies the extra protections (reputable insurers, primary coverage, cancellation notice, insurance does not limit liability) without over-flagging. Checks: {"name":"insurance obligation present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 375](trajectory.jsonl#L375)

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

- [seq 399](trajectory.jsonl#L399) **drafter → list_sections**

```json
{}
```

- [seq 400](trajectory.jsonl#L400) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":10},{"id":"sec-2","number":"2","heading":"AGREEMENT STRUCTURE AND SCOPE","level":1,"paragraphCount":4},{"id":"sec-3","number":"3","heading":"SERVICES AND PERFORMANCE","level":1,"paragraphCount":2},{"id":"sec-4","number":"4","heading":…
```

- [seq 401](trajectory.jsonl#L401) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 402](trajectory.jsonl#L402) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2 AGREEMENT STRUCTURE AND SCOPE","snippet":"…s under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordere…"},{"paragraphId":"p0026","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"…ge-based unit price. Vendor may not impose a platform, support…
```

- [seq 419](trajectory.jsonl#L419) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0013","p0026","p0051"]}
```

- [seq 420](trajectory.jsonl#L420) **read_paragraphs result**

```json
[{"id":"p0013","sectionRef":"§ 2 AGREEMENT STRUCTURE AND SCOPE","text":"2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.…
```

- [seq 421](trajectory.jsonl#L421) **drafter → search**

```json
{"query":"shortfall|take-or-pay|committed|commit to purchase|volume|cap on usage","regex":true}
```

- [seq 422](trajectory.jsonl#L422) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2 AGREEMENT STRUCTURE AND SCOPE","snippet":"…Order Form, and its decision not to enter another Order Form is not a breach or shortfall."},{"paragraphId":"p0031","sectionRef":"§ 7 FEES, INVOICING, AND TAXES","snippet":"… favourable than fees offered to any similarly situated customer for comparable volumes and terms."},{"paragraphId":"p0051","sectionRef":"§ …
```

- [seq 446](trajectory.jsonl#L446) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 447](trajectory.jsonl#L447) **read_section result**

```json
{"sectionRef":"§ 7 FEES, INVOICING, AND TAXES","paragraphs":[{"id":"p0025","text":"7. FEES, INVOICING, AND TAXES"},{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the…
```

- [seq 448](trajectory.jsonl#L448) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 449](trajectory.jsonl#L449) **read_section result**

```json
{"sectionRef":"§ 4 ORDER FORMS AND AFFILIATE ORDERS","paragraphs":[{"id":"p0018","text":"4. ORDER FORMS AND AFFILIATE ORDERS"},{"id":"p0019","text":"4.1 An Order Form becomes binding when signed by both Parties. Changes in scope, assumptions, quantities, Fees, dependencies, or dates require a written change order signed by authorized representatives. Vendor shall not charge for work outside scope…
```

- [seq 466](trajectory.jsonl#L466) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 467](trajectory.jsonl#L467) **read_section result**

```json
{"sectionRef":"§ 8 TERM AND RENEWAL","paragraphs":[{"id":"p0033","text":"8. TERM AND RENEWAL"},{"id":"p0034","text":"8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Or…
```

- [seq 484](trajectory.jsonl#L484) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0013","p0026","p0051"],"quote":"No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","rationale":"The Agreement meets the preferred position outright: there is no minimum purchase commitment or take-or-pay exposure on Customer. Clause 2.1 (p0013) states that no minimum quantity or purchase commitment applies, that Customer pays only for Services ordered under a mutually executed Order Form, and that a decision not to place another Order Form is neither a breach nor a shortfall. Clause 7.1 (p0026) reinforces this by barring Vendor from imposing any platform, support, administration or minimum-use charge not identified in the Order Form, and clause 12.3 (p0051) records that Customer has given no exclusivity, most-favoured-customer, or minimum-volume commitment. Sections 4 and 8 contain no committed spend, non-reducible seat count, or volume floor; Order Forms bind only when signed by both Parties (p0019) and renew only subject to Customer's thirty-day non-renewal right (p0035), so no multi-year lock-in arises. The only \"shortfall\" references (p0095, p0096) sit in the audit provisions and operate as a usage true-up for undisputed underpayment rather than a take-or-pay penalty, which is consistent with the playbook's preference for true-ups over penalties. The fee-related MFN in 7.6 and the reciprocal audit mechanics run in our favour or are neutral, so nothing here is flagged. Separately noted for awareness only, and not under this rule: clause 7.7 (p0032) imposes a fifteen-percent-per-week liquidated damages charge on Customer for late payment, which is a late-payment/interest issue properly addressed under the payment-terms rule rather than double-flagged as a volume commitment.","confidence":0.93}
```

- [seq 485](trajectory.jsonl#L485) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 484](trajectory.jsonl#L484)
- Finding: `f-mincommit-89673506` · **compliant** · confidence 0.93
- Location: § 2 AGREEMENT STRUCTURE AND SCOPE
- Quote: “No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.”
- Rationale: The Agreement meets the preferred position outright: there is no minimum purchase commitment or take-or-pay exposure on Customer. Clause 2.1 (p0013) states that no minimum quantity or purchase commitment applies, that Customer pays only for Services ordered under a mutually executed Order Form, and that a decision not to place another Order Form is neither a breach nor a shortfall. Clause 7.1 (p0026) reinforces this by barring Vendor from imposing any platform, support, administration or minimum-use charge not identified in the Order Form, and clause 12.3 (p0051) records that Customer has given no exclusivity, most-favoured-customer, or minimum-volume commitment. Sections 4 and 8 contain no committed spend, non-reducible seat count, or volume floor; Order Forms bind only when signed by both Parties (p0019) and renew only subject to Customer's thirty-day non-renewal right (p0035), so no multi-year lock-in arises. The only "shortfall" references (p0095, p0096) sit in the audit provisions and operate as a usage true-up for undisputed underpayment rather than a take-or-pay penalty, which is consistent with the playbook's preference for true-ups over penalties. The fee-related MFN in 7.6 and the reciprocal audit mechanics run in our favour or are neutral, so nothing here is flagged. Separately noted for awareness only, and not under this rule: clause 7.7 (p0032) imposes a fifteen-percent-per-week liquidated damages charge on Customer for late payment, which is a late-payment/interest issue properly addressed under the payment-terms rule rather than double-flagged as a volume commitment.

### Verifier and repair feedback

- [seq 498](trajectory.jsonl#L498) **Verdict: pass** — Claimed status is compliant and the cited text squarely supports it: clause 2.1 states 'No minimum quantity or purchase commitment applies' and that declining to place a further Order Form is 'not a breach or shortfall', which meets the preferred position (fees for ordered services only). Corroborating clauses are correctly read: 7.1 bars any unidentified minimum-use charge and 12.3 confirms no minimum-volume or exclusivity commitment, so no take-or-pay or volume floor exists anywhere in the cited material. No redline and no comment were produced, which is the expected output for a compliant finding; the rendered paragraphs are unchanged from the originals and no deterministic checks failed. The 'shortfall' references in the audit provisions are appropriately characterised as an underpayment true-up rather than a take-or-pay penalty, consistent with the rule's preference for true-ups. The late-payment liquidated damages point is expressly flagged as awareness-only and deferred to the payment-terms rule, correctly avoiding double-flagging under this rule. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 407](trajectory.jsonl#L407)

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

- [seq 429](trajectory.jsonl#L429) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 430](trajectory.jsonl#L430) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0046","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"},{"id":"p0047","text":"11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export sup…
```

- [seq 431](trajectory.jsonl#L431) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 432](trajectory.jsonl#L432) **read_section result**

```json
{"sectionRef":"§ 10 EFFECT OF EXPIRY OR TERMINATION","paragraphs":[{"id":"p0043","text":"10. EFFECT OF EXPIRY OR TERMINATION"},{"id":"p0044","text":"10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independent…
```

- [seq 454](trajectory.jsonl#L454) **drafter → search**

```json
{"query":"delete Customer Data"}
```

- [seq 455](trajectory.jsonl#L455) **search result**

```json
[]
```

- [seq 456](trajectory.jsonl#L456) **drafter → read_section**

```json
{"sectionId":"sec-15"}
```

- [seq 457](trajectory.jsonl#L457) **read_section result**

```json
{"sectionRef":"§ 15 CUSTOMER DATA AND PRIVACY","paragraphs":[{"id":"p0063","text":"15. CUSTOMER DATA AND PRIVACY"},{"id":"p0064","text":"15.1 Vendor shall process Customer Data only on Customer's documented instructions, to provide the Services, and as permitted by this Agreement. Vendor shall not sell Customer Data, use it for advertising, combine it with another customer's identifiable data, or…
```

- [seq 473](trajectory.jsonl#L473) **drafter → search**

```json
{"query":"suspend"}
```

- [seq 474](trajectory.jsonl#L474) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","snippet":"…nnection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the …"},{"paragraphId":"p0102","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24.4 Customer's change of control does not give Vendor a ri…
```

- [seq 488](trajectory.jsonl#L488) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047","p0048","p0049"],"quote":"11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.","rationale":"Section 11 is a dedicated transition and data-return clause that meets the preferred position: six months of transition assistance on expiry or termination for any reason at the rates in the expiring Order Form (rate-capped, better for us than \"then-current rates\"); return of all Customer Data within thirty days of request in a complete, documented, machine-readable format with metadata, and no withholding for fee disputes; and secure deletion with written officer certification after we confirm successful return, subject only to a legally required copy that stays protected and use-restricted. Section 10.1 preserves our Customer Data rights and does not condition assistance on payment, and Sections 13 and 15 contain no early-deletion or data-hostage right. Nothing to redline.","confidence":0.94}
```

- [seq 489](trajectory.jsonl#L489) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 488](trajectory.jsonl#L488)
- Finding: `f-transition-fea7b1c2` · **compliant** · confidence 0.94
- Location: § 11 TRANSITION ASSISTANCE AND DATA RETURN
- Quote: “11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.”
- Rationale: Section 11 is a dedicated transition and data-return clause that meets the preferred position: six months of transition assistance on expiry or termination for any reason at the rates in the expiring Order Form (rate-capped, better for us than "then-current rates"); return of all Customer Data within thirty days of request in a complete, documented, machine-readable format with metadata, and no withholding for fee disputes; and secure deletion with written officer certification after we confirm successful return, subject only to a legally required copy that stays protected and use-restricted. Section 10.1 preserves our Customer Data rights and does not condition assistance on payment, and Sections 13 and 15 contain no early-deletion or data-hostage right. Nothing to redline.

### Verifier and repair feedback

- [seq 504](trajectory.jsonl#L504) **Verdict: pass** — Sections 11.1-11.3 supply all three preferred elements: up to six months of transition assistance on expiry or termination for any reason, return of all Customer Data within thirty days in a commonly used, documented, machine-readable format, and secure deletion with written officer certification thereafter. Terms are equal to or better than the playbook preferred position (rates fixed to the expiring Order Form rather than then-current rates; no withholding for fee disputes; retained legal-copy carve-out remains protected and use-restricted), so no redline is warranted. Consistent with a compliant claim: no redline text changes and no counterparty comment were proposed, and the deterministic check confirms a data-return/transition clause is present. No walk-away trigger (no immediate deletion on termination, no denial of data return) appears in the cited or adjacent sections. Checks: {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 509](trajectory.jsonl#L509) memo LLM request
- [seq 510](trajectory.jsonl#L510) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement

**Prepared by:** In-house counsel (Customer side) 
**Subject:** Playbook review of the Master Services Agreement 
**Status:** 19 findings reviewed and verified; 2 deviations, 17 compliant

---

## 1. Executive summary

The Agreement is, on the whole, strongly favourable to us. The core protections we care about most are at or above our preferred position: Vendor's indemnity is broad and sits outside the liability cap as an Excluded Claim (§ 20, § 21.3); we own Deliverables and retain all Customer Data with a perpetual licence to embedded Vendor Technology (§§ 13–15); the licence grant extends to Affiliates and contractors; assignment, change of control, termination for convenience, renewal, audit, transition assistance, warranties, insurance and New York governing law all match our playbook. Notably, the Agreement contains no exclusivity, non-compete, non-solicit, MFN or minimum-volume obligation on us, and several provisions (§ 7.6 MFN in our favour, § 12.4 Vendor non-compete) run affirmatively in our direction.

Two issues require change before signature, and both fall into walk-away territory under the playbook:

1. **Illusory liability cap (§ 21).** The cap is mutual and the Excluded Claims list is complete, but "Fees" is defined (§ 1.5/1.6) as the one-time USD 12,000 Implementation Fee under the first Order Form only. The cap is therefore a fixed USD 12,000 that ignores all later Order Forms — far below our 12-month fallback and below the six-month walk-away floor.
2. **Customer-payable liquidated damages (§ 7.7).** Late payment triggers liquidated damages of 15% of annual Fees per week of delay, exceeding annual contract value within roughly seven weeks for what is an administrative breach. Our playbook permits no liquidated damages or penalties payable by us; the fallback contemplates only a capped early-termination fee.

Neither issue is difficult to fix and neither is commercially central to the Vendor, so we expect both to be resolvable.

---

## 2. Findings

| # | Severity | Rule | Status | Section |
|---|---|---|---|---|
| 1 | Critical | LOL-CAP — Limitation of liability: cap, mutuality and carve-outs | **Deviation** | § 21 Limitation of Liability |
| 2 | High | LD — Liquidated damages and penalties payable by Customer | **Deviation** | § 7 Fees, Invoicing, and Taxes (§ 7.7) |
| 3 | Critical | INDEMN — Indemnification by Vendor | Compliant | § 20 Indemnification |
| 4 | Critical | IP — Ownership of deliverables and Customer Data | Compliant | § 14 Intellectual Property and Deliverables |
| 5 | High | ASSIGN — Assignment and change of control | Compliant | § 24 Assignment and Change of Control |
| 6 | High | EXCLUSIVITY — Exclusivity obligations binding Customer | Compliant | § 12 Customer Responsibilities |
| 7 | High | LICENSE — Licence grant scope | Compliant | § 13 Access Rights and Licence |
| 8 | High | NONCOMPETE — Non-compete restrictions on Customer | Compliant | § 12 Customer Responsibilities |
| 9 | High | T4C — Termination for convenience | Compliant | § 9 Termination |
| 10 | Medium | AUDIT — Audit rights against Customer | Compliant | § 22 Audit Rights |
| 11 | Medium | GOVLAW — Governing law and venue | Compliant | § 28 Governing Law and Dispute Resolution |
| 12 | Medium | MFN — Most-favoured-nation obligations burdening Customer | Compliant | § 7 Fees, Invoicing, and Taxes (§ 7.6) |
| 13 | Medium | MINCOMMIT — Minimum purchase commitments and volume restrictions | Compliant | § 2 Agreement Structure and Scope |
| 14 | Medium | NOSOLICIT — Non-solicitation of employees binding Customer | Compliant | § 12 Customer Responsibilities |
| 15 | Medium | RENEWAL — Auto-renewal and non-renewal notice window | Compliant | § 8 Term and Renewal |
| 16 | Medium | TRANSITION — Post-termination transition assistance and data return | Compliant | § 11 Transition Assistance and Data Return |
| 17 | Medium | WARRANTY — Performance warranty and duration | Compliant | § 19 Warranties |
| 18 | Low | INSURANCE — Vendor insurance | Compliant | § 18 Insurance |

### Deviation detail and proposed redlines

**§ 21 — Limitation of liability (critical).** The cap is mutual, indirect damages are mutually excluded, and § 21.3 carries the full preferred set of Excluded Claims (confidentiality, data protection/security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement), together with confirmation that our payment obligation is not "damages". The defect is the cap basis only. *Proposed redline:* cap set at the greater of all Fees paid or payable in the prior twelve months and USD 1,000,000, with the § 21.3 carve-outs left untouched.

**§ 7.7 — Liquidated damages for late payment (high).** No early-termination fee or other Customer-payable liquidated amount appears elsewhere; §§ 9.4 and 10.2 require only accrued Fees plus refund of prepayments, which favours us. *Proposed redline:* delete the liquidated damages mechanic and substitute modest late-payment interest on undisputed overdue amounts, preserving our good-faith withholding right in § 7.3.

### Noted for awareness only (not flagged)

- § 21.1's narrow "first Order Form" cap base is treated under LOL-CAP, not double-flagged under INDEMN.
- The "improve the Services" purpose in § 14.1 and the telemetry carve-out in the Customer Data definition are adequately fenced by § 15.1 (no sale, advertising use, commingling or model training without our consent).
- § 7.7 is a payment-terms issue and is deliberately not double-flagged under MFN or MINCOMMIT.

---

## 3. Walk-away items

Both deviations sit in walk-away territory and should be treated as conditions to signature:

1. **§ 21 cap basis.** A Vendor cap below six months' fees is a walk-away under the playbook. The effective USD 12,000 cap, which also excludes every Order Form after the first, must be replaced with a genuine twelve-month (or USD 1,000,000) basis.
2. **§ 7.7 liquidated damages.** An open-ended late-payment penalty payable by us at 15% of annual Fees per week is a walk-away. Our fallback permits only a capped early-termination fee, not this mechanic.

---

## 4. Next steps

1. Issue the redlined MSA to the Vendor with the two changes above and short `[Playbook]` rationales — we are correcting an illusory cap basis and removing a penalty our playbook does not permit, with interest on undisputed sums offered as the substitute.
2. Confirm with the business the expected twelve-month spend across all Order Forms so we can validate the USD 1,000,000 floor in the revised § 21 cap.
3. If the Vendor resists the cap basis, our fallback is twelve months' Fees paid or payable across all Order Forms; we should not concede below that, and we should not trade away any § 21.3 Excluded Claim to get it.
4. Flag both items to the deal sponsor now as conditions to signature, given their walk-away status.
5. No other changes are required; the remaining seventeen findings are compliant and should be left as drafted.
```

## Apply and validation

No apply or output-validation event was recorded.
