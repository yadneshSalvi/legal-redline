# Trajectory: synth-13

| Run | Value |
|---|---|
| Contract | synth-13 — MASTER SERVICES AGREEMENT |
| Config | final |
| Parties | Meridian Fieldworks, Inc. (our party) ↔ Copperleaf Technology Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 3m 22.2s (202,157 ms) |
| Calls | 111 LLM · 124 tool · 0 retries |
| Tokens | 63,550 input · 52,701 output · 613,310 cache read · 129,362 cache write |
| Cost | $2.750443 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 430 | 91 | 124 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 503](trajectory.jsonl#L503) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 115](trajectory.jsonl#L115)–[seq 506](trajectory.jsonl#L506) |
| assembler | 21 | 0 | 0 | — | [seq 136](trajectory.jsonl#L136)–[seq 514](trajectory.jsonl#L514) |
| memo | 4 | 1 | 0 | — | [seq 510](trajectory.jsonl#L510)–[seq 513](trajectory.jsonl#L513) |
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

- [seq 19](trajectory.jsonl#L19) **drafter → read_section**

```json
{"sectionId":"sec-21"}
```

- [seq 20](trajectory.jsonl#L20) **read_section result**

```json
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0081","text":"21. LIMITATION OF LIABILITY"}]}
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 51](trajectory.jsonl#L51) **drafter → read_section**

```json
{"sectionId":"sec-21.1"}
```

- [seq 52](trajectory.jsonl#L52) **read_section result**

```json
{"sectionRef":"§ 21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","paragraphs":[{"id":"p0082","text":"21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception."}]}
```

- [seq 53](trajectory.jsonl#L53) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"One-month fee cap, mutual, \"without exception\" overrides Excluded Claims"}
```

- [seq 80](trajectory.jsonl#L80) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-lol-1","source":"Acme Cloud MSA (Mar 2025)","clauseAfter":"Except for Excluded Claims, each party's aggregate liability shall not exceed fees paid or payable in the prior twelve months.","comment":"[Playbook] We made the cap mutual and aligned it to twelve months' fees, with standard carve-outs.","level":"fallback"},{"id":"seed-lol-2","source":"Northstar Hosting Agreeme…
```

- [seq 103](trajectory.jsonl#L103) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0082","oldText":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","newText":"Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve months immediately preceding the event giving rise to the claim and (b) USD 1,000,000. Excluded Claims are not subject to any cap under this Section."}],"comment":"[Playbook] We moved the cap to our standard position — the greater of twelve months' Fees and USD 1,000,000, applied mutually — because a one-month fee cap is far below any level that is meaningful against the committed spend. We also removed \"without exception\" so that indemnification, confidentiality, data-protection and security breaches, gross negligence, wilful misconduct, fraud and IP infringement remain uncapped as Excluded Claims under Section 21.3.","level":"preferred","precedentId":"seed-lol-2","summary":"Replace one-month \"without exception\" cap with mutual cap of greater of 12 months' Fees or USD 1,000,000, excluding Excluded Claims."}
```

- [seq 104](trajectory.jsonl#L104) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0082","segments":[{"type":"equal","text":"21.1 "},{"type":"delete","text":"Each Party's aggregate liability "},{"type":"insert","text":"Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement "},{"type":"equal","text":"shall not exceed "},{"type":"delete","text":"Fees actually paid in the o…
```

- [seq 123](trajectory.jsonl#L123) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0082"],"quote":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","rationale":"Section 21.1 is mutual, but the cap basis is one month of Fees \"actually paid\" — well below the fallback floor of 12 months' fees and below even the walk-away threshold of six months' fees, and illusory against Customer's USD 2,000,000 annual take-or-pay commitment. Worse, \"without exception\" places indemnities, confidentiality, data-protection/security, gross negligence, wilful misconduct, fraud and IP infringement inside that cap, contradicting the Excluded Claims construct in Section 21.3 (indemnities inside the cap with no super-cap is expressly walk-away). Sections 21.2–21.4 otherwise track the preferred position (mutual damages exclusion, full carve-out list, Customer's payment obligation not treated as damages), so the minimal fix is to the cap sentence only: greater of 12 months' Fees paid or payable and USD 1,000,000, expressly subject to Excluded Claims.","confidence":0.95,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0082","oldText":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","newText":"Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve months immediately preceding the event giving rise to the claim and (b) USD 1,000,000. Excluded Claims are not subject to any cap under this Section."}],"comment":"[Playbook] We moved the cap to our standard position — the greater of twelve months' Fees and USD 1,000,000, applied mutually — because a one-month fee cap is far below any level that is meaningful against the committed spend. We also removed \"without exception\" so that indemnification, confidentiality, data-protection and security breaches, gross negligence, wilful misconduct, fraud and IP infringement remain uncapped as Excluded Claims under Section 21.3.","level":"preferred","precedentId":"seed-lol-2","summary":"Replace one-month \"without exception\" cap with mutual cap of greater of 12 months' Fees or USD 1,000,000, excluding Excluded Claims."}}
```

- [seq 124](trajectory.jsonl#L124) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 123](trajectory.jsonl#L123)
- Finding: `f-lol-cap-cb7a2001` · **deviation** · confidence 0.95
- Location: § 21.1 Each Party's aggregate liability shall not exceed Fees actu…
- Quote: “Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.”
- Rationale: Section 21.1 is mutual, but the cap basis is one month of Fees "actually paid" — well below the fallback floor of 12 months' fees and below even the walk-away threshold of six months' fees, and illusory against Customer's USD 2,000,000 annual take-or-pay commitment. Worse, "without exception" places indemnities, confidentiality, data-protection/security, gross negligence, wilful misconduct, fraud and IP infringement inside that cap, contradicting the Excluded Claims construct in Section 21.3 (indemnities inside the cap with no super-cap is expressly walk-away). Sections 21.2–21.4 otherwise track the preferred position (mutual damages exclusion, full carve-out list, Customer's payment obligation not treated as damages), so the minimal fix is to the cap sentence only: greater of 12 months' Fees paid or payable and USD 1,000,000, expressly subject to Excluded Claims.
- Proposal: **preferred** — Replace one-month "without exception" cap with mutual cap of greater of 12 months' Fees or USD 1,000,000, excluding Excluded Claims.
- Comment: [Playbook] We moved the cap to our standard position — the greater of twelve months' Fees and USD 1,000,000, applied mutually — because a one-month fee cap is far below any level that is meaningful against the committed spend. We also removed "without exception" so that indemnification, confidentiality, data-protection and security breaches, gross negligence, wilful misconduct, fraud and IP infringement remain uncapped as Excluded Claims under Section 21.3.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve months immediately preceding the event giving rise to the claim and (b) USD 1,000,000. Excluded Claims are not subject to any cap under this Section.",
    "oldText": "Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.",
    "paragraphId": "p0082"
  }
]
```

### Verifier and repair feedback

- [seq 171](trajectory.jsonl#L171) **Verdict: pass** — Correctly classified as a deviation: a one-month 'Fees actually paid' cap is far below the fallback floor of 12 months' fees (and below the 6-month walk-away line), and 'without exception' pulls indemnities, confidentiality/data-protection and gross negligence/wilful misconduct inside the cap — expressly walk-away territory. Redline reaches the preferred position with a targeted single-sentence replacement: mutual cap at the greater of 12 months' Fees paid or payable and USD 1,000,000, and removal of 'without exception' in favour of the Excluded Claims carve-out already defined in Section 21.3, so no duplicate carve-out list is introduced. Definition check supports the finding: 'Fees' captures recurring subscription, professional services and usage fees (not an illusory set-up charge), so a 12-month basis is meaningful against the committed spend. Failed 'minimal edit' heuristic (ratio 0.737) is acceptable here — the cap basis, mutual application and carve-out treatment all had to change, and the edit is confined to p0082 without rewriting Sections 21.2–21.4. Comment is accurate, concise, in first person plural, states the playbook position and correctly notes that indemnities/confidentiality sit outside the cap; it does not misdescribe the surrounding sections. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimal edit p0082","ok":false,"detail":"changed-character ratio=0.737 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 13](trajectory.jsonl#L13) **drafter → read_section**

```json
{"sectionId":"sec-20"}
```

- [seq 14](trajectory.jsonl#L14) **read_section result**

```json
{"sectionRef":"§ 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","paragraphs":[{"id":"p0080","text":"20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services."}]}
```

- [seq 15](trajectory.jsonl#L15) **drafter → list_sections**

```json
{}
```

- [seq 16](trajectory.jsonl#L16) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 55](trajectory.jsonl#L55) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"No Vendor indemnity; Section 20 has only broad Customer indemnity for every claim relating to use of Services; Section 9.3 cross-references non-existent Section 20.5 IP remedies"}
```

- [seq 86](trajectory.jsonl#L86) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-indemn-1","source":"Brightline SaaS Terms (Feb 2025)","clauseAfter":"Vendor shall defend and indemnify Customer against third-party claims that the Services infringe intellectual property rights.","comment":"[Playbook] We require the service provider to stand behind third-party IP claims arising from its services.","level":"preferred"},{"id":"seed-indemn-2","source":"Ve…
```

- [seq 111](trajectory.jsonl#L111) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Vendor IP/misconduct indemnity, indemnity procedure and IP remedies (new 20.2–20.5); narrow Customer's indemnity to Customer-provided content and Customer's breach of law.","comment":"[Playbook] Section 20 currently contains only a Customer indemnity for \"every claim\" relating to use of the Services, with no Vendor indemnity at all, and Section 9.3 already refers to IP remedies in a Section 20.5 that does not exist. We have added the Vendor defence and indemnity for third-party IP infringement, breach of law, Vendor-caused data breaches and wilful misconduct, together with standard procedure and IP remedies, and narrowed our indemnity to Customer-provided content and our own breach of law, consistent with our playbook position.","precedentId":"seed-indemn-1","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","newText":"Customer shall defend, indemnify, and hold harmless Vendor from third-party claims to the extent arising out of (a) content or materials Customer provides to Vendor for use in the Services, or (b) Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.2","text":"20.2 Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to, use, or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.3","text":"20.3 The indemnified Party shall give the indemnifying Party prompt written notice of the claim (delay excusing the indemnifying Party only to the extent it is prejudiced), permit the indemnifying Party to control the defence with counsel of its choice, and provide reasonable cooperation at the indemnifying Party's expense. The indemnified Party may participate with its own counsel at its own cost. No settlement that imposes a non-monetary obligation, admission of liability, or unreimbursed payment on the indemnified Party may be made without its prior written consent."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.4","text":"20.4 Vendor's indemnity under Section 20.2(a) does not apply to the extent a claim arises from Customer's modification of the Services or Deliverables other than as authorized by Vendor, combination of the Services or Deliverables with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.5","text":"20.5 If an infringement claim is made or Vendor reasonably believes one is likely, Vendor shall, at its expense, procure the right for Customer to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item. If neither remedy is reasonably available, either Party may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees allocable to the terminated portion together with Fees paid for Deliverables Customer can no longer use."}]}
```

- [seq 112](trajectory.jsonl#L112) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0080","segments":[{"type":"equal","text":"20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from "},{"type":"delete","text":"every claim relating in any way to Customer's use of the Services"},{"type":"insert","text":"third-party claims to the extent arising out of (a) content or materials Customer provides to V…
```

- [seq 139](trajectory.jsonl#L139) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0080"],"quote":"20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","rationale":"Section 20 is the only indemnity provision and runs one way: Customer indemnifies Vendor for \"every claim\" relating to Customer's use of the Services. There is no Vendor indemnity anywhere in the Agreement — no IP infringement indemnity, no indemnity for Vendor's breach of law, Vendor-caused data breach, or gross negligence/wilful misconduct, and no indemnity procedure or IP remedies (Section 9.3 already cross-refers to remedies in a \"Section 20.5\" that does not exist, and Section 21.3 assumes indemnification obligations exist on both sides). This falls below the fallback and into walk-away territory (no Vendor IP indemnity at all, coupled with a one-way Customer indemnity for the Vendor's own services). The redline inserts the preferred Vendor indemnity with standard notice/control/cooperation procedure, customary exclusions and procure/modify/replace/refund remedies (curing the broken 9.3 reference), and narrows our indemnity to Customer-provided content and our breach of Applicable Law.","confidence":0.93,"proposal":{"level":"preferred","precedentId":"seed-indemn-1","summary":"Add Vendor IP/misconduct indemnity, indemnity procedure and IP remedies (new 20.2–20.5); narrow Customer's indemnity to Customer-provided content and Customer's breach of law.","comment":"[Playbook] Section 20 currently contains only a Customer indemnity for \"every claim\" relating to use of the Services, with no Vendor indemnity at all, and Section 9.3 already refers to IP remedies in a Section 20.5 that does not exist. We have added the Vendor defence and indemnity for third-party IP infringement, breach of law, Vendor-caused data breaches and wilful misconduct, together with standard procedure and IP remedies, and narrowed our indemnity to Customer-provided content and our own breach of law, consistent with our playbook position.","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","newText":"Customer shall defend, indemnify, and hold harmless Vendor from third-party claims to the extent arising out of (a) content or materials Customer provides to Vendor for use in the Services, or (b) Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.2","text":"20.2 Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to, use, or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.3","text":"20.3 The indemnified Party shall give the indemnifying Party prompt written notice of the claim (delay excusing the indemnifying Party only to the extent it is prejudiced), permit the indemnifying Party to control the defence with counsel of its choice, and provide reasonable cooperation at the indemnifying Party's expense. The indemnified Party may participate with its own counsel at its own cost. No settlement that imposes a non-monetary obligation, admission of liability, or unreimbursed payment on the indemnified Party may be made without its prior written consent."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.4","text":"20.4 Vendor's indemnity under Section 20.2(a) does not apply to the extent a claim arises from Customer's modification of the Services or Deliverables other than as authorized by Vendor, combination of the Services or Deliverables with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.5","text":"20.5 If an infringement claim is made or Vendor reasonably believes one is likely, Vendor shall, at its expense, procure the right for Customer to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item. If neither remedy is reasonably available, either Party may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees allocable to the terminated portion together with Fees paid for Deliverables Customer can no longer use."}]}}
```

- [seq 140](trajectory.jsonl#L140) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 139](trajectory.jsonl#L139)
- Finding: `f-indemn-26d6537f` · **missing** · confidence 0.93
- Location: § 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and…
- Quote: “20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.”
- Rationale: Section 20 is the only indemnity provision and runs one way: Customer indemnifies Vendor for "every claim" relating to Customer's use of the Services. There is no Vendor indemnity anywhere in the Agreement — no IP infringement indemnity, no indemnity for Vendor's breach of law, Vendor-caused data breach, or gross negligence/wilful misconduct, and no indemnity procedure or IP remedies (Section 9.3 already cross-refers to remedies in a "Section 20.5" that does not exist, and Section 21.3 assumes indemnification obligations exist on both sides). This falls below the fallback and into walk-away territory (no Vendor IP indemnity at all, coupled with a one-way Customer indemnity for the Vendor's own services). The redline inserts the preferred Vendor indemnity with standard notice/control/cooperation procedure, customary exclusions and procure/modify/replace/refund remedies (curing the broken 9.3 reference), and narrows our indemnity to Customer-provided content and our breach of Applicable Law.
- Proposal: **preferred** — Add Vendor IP/misconduct indemnity, indemnity procedure and IP remedies (new 20.2–20.5); narrow Customer's indemnity to Customer-provided content and Customer's breach of law.
- Comment: [Playbook] Section 20 currently contains only a Customer indemnity for "every claim" relating to use of the Services, with no Vendor indemnity at all, and Section 9.3 already refers to IP remedies in a Section 20.5 that does not exist. We have added the Vendor defence and indemnity for third-party IP infringement, breach of law, Vendor-caused data breaches and wilful misconduct, together with standard procedure and IP remedies, and narrowed our indemnity to Customer-provided content and our own breach of law, consistent with our playbook position.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer shall defend, indemnify, and hold harmless Vendor from third-party claims to the extent arising out of (a) content or materials Customer provides to Vendor for use in the Services, or (b) Customer's breach of Applicable Law.",
    "oldText": "Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.",
    "paragraphId": "p0080"
  },
  {
    "kind": "insert_after",
    "numbering": "20.2",
    "paragraphId": "p0080",
    "text": "20.2 Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to, use, or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."
  },
  {
    "kind": "insert_after",
    "numbering": "20.3",
    "paragraphId": "p0080",
    "text": "20.3 The indemnified Party shall give the indemnifying Party prompt written notice of the claim (delay excusing the indemnifying Party only to the extent it is prejudiced), permit the indemnifying Party to control the defence with counsel of its choice, and provide reasonable cooperation at the indemnifying Party's expense. The indemnified Party may participate with its own counsel at its own cost. No settlement that imposes a non-monetary obligation, admission of liability, or unreimbursed payment on the indemnified Party may be made without its prior written consent."
  },
  {
    "kind": "insert_after",
    "numbering": "20.4",
    "paragraphId": "p0080",
    "text": "20.4 Vendor's indemnity under Section 20.2(a) does not apply to the extent a claim arises from Customer's modification of the Services or Deliverables other than as authorized by Vendor, combination of the Services or Deliverables with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."
  },
  {
    "kind": "insert_after",
    "numbering": "20.5",
    "paragraphId": "p0080",
    "text": "20.5 If an infringement claim is made or Vendor reasonably believes one is likely, Vendor shall, at its expense, procure the right for Customer to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item. If neither remedy is reasonably available, either Party may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees allocable to the terminated portion together with Fees paid for Deliverables Customer can no longer use."
  }
]
```

### Verifier and repair feedback

- [seq 181](trajectory.jsonl#L181) **Verdict: pass** — The cited Section 20.1 is a one-way Customer indemnity for 'every claim' relating to Customer's use of the Services, with no Vendor IP or misconduct indemnity anywhere — squarely walk-away territory under the rule, so the 'missing' classification is correct and actionable. The redline reaches the preferred position: Vendor defence/indemnity for third-party IP infringement, breach of law, Vendor-caused Customer Data incidents and gross negligence/wilful misconduct; standard notice/control/cooperation procedure; customary exclusions (modification, combination, Customer specifications); and procure/modify/replace/refund remedies. Customer's indemnity is properly narrowed to Customer-provided content and Customer's breach of Applicable Law. Directionally correct for the customer and does not concede anything; the high changed-character ratio on p0080 is justified because the rule requires inserting an entire Vendor indemnity and narrowing the existing one-way clause. Comment is accurate, concise, in first person plural, uses the [Playbook] prefix, and correctly notes the dangling Section 9.3 cross-reference to a non-existent Section 20.5, which the inserted numbering resolves. Minor observations only, not disqualifying: the insertion adds 'Vendor Technology' and 'Affiliates' terms whose definitions are not shown in the supplied excerpt, and no super-cap discussion is needed since the preferred position is achieved. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"operation 5 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":true}; {"name":"minimal edit p0080","ok":true,"detail":"changed-character ratio=0.579 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 25](trajectory.jsonl#L25) **drafter → read_section**

```json
{"sectionId":"sec-12.4"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.","paragraphs":[{"id":"p0050","text":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in …
```

- [seq 27](trajectory.jsonl#L27) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 28](trajectory.jsonl#L28) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 57](trajectory.jsonl#L57) **drafter → lookup_precedent**

```json
{"ruleId":"NONCOMPETE","context":"24-month post-term worldwide non-compete on Customer; conflicts with Sec 12.3 no-commitment clause"}
```

- [seq 82](trajectory.jsonl#L82) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-noncompete","source":"Nimbus Platform MSA (Jan 2025)","clauseAfter":"","comment":"[Playbook] We cannot restrict our business or internal development activities.","level":"preferred"}]}
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"compet","limit":20}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 107](trajectory.jsonl#L107) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete the 24-month worldwide non-compete imposed on Customer in § 12.4","comment":"[Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, in which Vendor acknowledges we have made no non-compete commitment. If some protection is genuinely needed, we could consider a restriction limited to a single named competing product, during the term only and no more than 12 months, with carve-outs for internal development and acquisitions.","precedentId":"seed-noncompete","ops":[{"kind":"delete_paragraph","paragraphId":"p0050"}]}
```

- [seq 108](trajectory.jsonl#L108) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0050","segments":[{"type":"delete","text":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory."}]}]}
```

- [seq 127](trajectory.jsonl#L127) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0050","p0049"],"quote":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.","rationale":"§ 12.4 binds us (the Customer) with a post-term non-compete of twenty-four months, of undefined scope (\"any product or service that competes with Vendor\") and unlimited territory, and it also bars acquisitions. That is walk-away territory under the rule and fails the fallback on every material term (named product, term-only, 12-month cap, internal development and acquisition carve-outs). It also directly contradicts § 12.3, in which Vendor acknowledges that Customer has made no exclusivity or non-compete commitment. Redline deletes § 12.4 to reach the preferred position, with the narrowed fallback offered in the comment.","confidence":0.95,"proposal":{"level":"preferred","summary":"Delete the 24-month worldwide non-compete imposed on Customer in § 12.4","comment":"[Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, in which Vendor acknowledges we have made no non-compete commitment. If some protection is genuinely needed, we could consider a restriction limited to a single named competing product, during the term only and no more than 12 months, with carve-outs for internal development and acquisitions.","precedentId":"seed-noncompete","ops":[{"kind":"delete_paragraph","paragraphId":"p0050"}]}}
```

- [seq 128](trajectory.jsonl#L128) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 127](trajectory.jsonl#L127)
- Finding: `f-noncompete-768576ee` · **deviation** · confidence 0.95
- Location: § 12.4 During the term and for twenty-four months thereafter, Cust…
- Quote: “12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.”
- Rationale: § 12.4 binds us (the Customer) with a post-term non-compete of twenty-four months, of undefined scope ("any product or service that competes with Vendor") and unlimited territory, and it also bars acquisitions. That is walk-away territory under the rule and fails the fallback on every material term (named product, term-only, 12-month cap, internal development and acquisition carve-outs). It also directly contradicts § 12.3, in which Vendor acknowledges that Customer has made no exclusivity or non-compete commitment. Redline deletes § 12.4 to reach the preferred position, with the narrowed fallback offered in the comment.
- Proposal: **preferred** — Delete the 24-month worldwide non-compete imposed on Customer in § 12.4
- Comment: [Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, in which Vendor acknowledges we have made no non-compete commitment. If some protection is genuinely needed, we could consider a restriction limited to a single named competing product, during the term only and no more than 12 months, with carve-outs for internal development and acquisitions.
- Proposed ops:

```json
[
  {
    "kind": "delete_paragraph",
    "paragraphId": "p0050"
  }
]
```

### Verifier and repair feedback

- [seq 165](trajectory.jsonl#L165) **Verdict: pass** — § 12.4 binds Customer with a post-term non-compete of 24 months, undefined scope ('any product or service that competes with Vendor'), unlimited territory, and no acquisition or internal-development carve-out — squarely walk-away territory and failing the fallback on every material term. Deleting § 12.4 is the minimal edit that reaches the preferred position (no restriction on Customer); no narrowing edit could salvage a clause this broad without rewriting it wholesale, and the comment properly offers the narrowed fallback. Deletion creates no gap or inconsistency: § 12.3 already affirms Customer is unrestricted and that no non-compete commitment was made, so removing § 12.4 resolves an internal contradiction rather than introducing one. Comment is accurate, concise, in first person plural, cites the playbook position and the § 12.3 conflict, and does not overstate; deterministic checks confirm no open-ended compete restriction on Customer remains. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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

- [seq 31](trajectory.jsonl#L31) **drafter → read_section**

```json
{"sectionId":"sec-2.2"}
```

- [seq 32](trajectory.jsonl#L32) **read_section result**

```json
{"sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","paragraphs":[{"id":"p0013","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}
```

- [seq 33](trajectory.jsonl#L33) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 34](trajectory.jsonl#L34) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 59](trajectory.jsonl#L59) **drafter → search**

```json
{"query":"exclusiv","limit":20}
```

- [seq 60](trajectory.jsonl#L60) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","snippet":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."},{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using a…
```

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"requirements from","limit":10}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[]
```

- [seq 89](trajectory.jsonl#L89) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Vendor named sole and exclusive provider of hosted analytics for full term; conflicts with Section 12.3 no-exclusivity acknowledgement"}
```

- [seq 100](trajectory.jsonl#L100) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-exclusive","source":"Atlas Procurement Agreement (Apr 2025)","clauseAfter":"Supplier will be a non-exclusive provider of hosting services.","comment":"[Playbook] We retained flexibility to source services from other suppliers.","level":"preferred"}]}
```

- [seq 131](trajectory.jsonl#L131) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0013","oldText":"Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"Vendor will be a non-exclusive provider of hosted analytics services to Customer, and Customer may procure equivalent services from any third party."}],"comment":"[Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor's appointment non-exclusive. This also removes the conflict with Section 12.3, in which Vendor acknowledges that we have given no exclusivity commitment.","level":"preferred","summary":"Make Vendor a non-exclusive provider of hosted analytics services","precedentId":"seed-exclusive"}
```

- [seq 132](trajectory.jsonl#L132) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0013","segments":[{"type":"equal","text":"2.2 Vendor will be "},{"type":"delete","text":"Customer's sole and "},{"type":"insert","text":"a non-"},{"type":"equal","text":"exclusive provider of hosted analytics services "},{"type":"delete","text":"throughout the term"},{"type":"insert","text":"to Customer, and Customer may procure equivalent servi…
```

- [seq 147](trajectory.jsonl#L147) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0013","p0049"],"quote":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","rationale":"Section 2.2 imposes full-term sole-supplier exclusivity on us for hosted analytics, with no product-category narrowing, no 12-month limit and no performance-based exit — this is walk-away territory under the rule and fails the fallback. It also directly contradicts Section 12.3, where Vendor acknowledges that Customer has made no exclusivity commitment. We propose making the appointment non-exclusive (preferred position) and preserving Section 12.3 unchanged.","confidence":0.93,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0013","oldText":"Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"Vendor will be a non-exclusive provider of hosted analytics services to Customer, and Customer may procure equivalent services from any third party."}],"comment":"[Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor's appointment non-exclusive. This also removes the conflict with Section 12.3, in which Vendor acknowledges that we have given no exclusivity commitment.","level":"preferred","summary":"Make Vendor a non-exclusive provider of hosted analytics services","precedentId":"seed-exclusive"}}
```

- [seq 148](trajectory.jsonl#L148) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 147](trajectory.jsonl#L147)
- Finding: `f-exclusivity-75577550` · **deviation** · confidence 0.93
- Location: § 2.2 Vendor will be Customer's sole and exclusive provider of ho…
- Quote: “2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.”
- Rationale: Section 2.2 imposes full-term sole-supplier exclusivity on us for hosted analytics, with no product-category narrowing, no 12-month limit and no performance-based exit — this is walk-away territory under the rule and fails the fallback. It also directly contradicts Section 12.3, where Vendor acknowledges that Customer has made no exclusivity commitment. We propose making the appointment non-exclusive (preferred position) and preserving Section 12.3 unchanged.
- Proposal: **preferred** — Make Vendor a non-exclusive provider of hosted analytics services
- Comment: [Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor's appointment non-exclusive. This also removes the conflict with Section 12.3, in which Vendor acknowledges that we have given no exclusivity commitment.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Vendor will be a non-exclusive provider of hosted analytics services to Customer, and Customer may procure equivalent services from any third party.",
    "oldText": "Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.",
    "paragraphId": "p0013"
  }
]
```

### Verifier and repair feedback

- [seq 197](trajectory.jsonl#L197) **Verdict: pass** — Section 2.2 imposes a sole-and-exclusive supplier obligation on Customer for the full term with no product-category narrowing, no 12-month limit and no performance-based exit — this fails the fallback and sits in the rule's walk-away zone, so 'deviation' is the correct status. The redline implements the preferred position with a targeted rewrite of the single offending sentence (non-exclusive appointment plus express right to procure from third parties); no exclusivity benefiting Customer is disturbed and Section 12.3 is left intact, consistent with the redline guidance. The failed 'minimal edit' check (0.615 changed-character ratio) is advisory only and justified here: reversing an exclusivity grant necessarily requires rewriting the operative sentence. The comment is accurate, concise, in first person plural with the required prefix, and correctly notes the conflict with Section 12.3 without lecturing. Severity 'high' is appropriate for a full-term sole-supplier lock-in on our procurement freedom. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"minimal edit p0013","ok":false,"detail":"changed-character ratio=0.615 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 37](trajectory.jsonl#L37) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 38](trajectory.jsonl#L38) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 39](trajectory.jsonl#L39) **drafter → search**

```json
{"query":"most favoured|most favored|no less favorable|no less favourable|benchmark","regex":true}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[]
```

- [seq 65](trajectory.jsonl#L65) **drafter → search**

```json
{"query":"favour"}
```

- [seq 66](trajectory.jsonl#L66) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[]
```

- [seq 95](trajectory.jsonl#L95) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 96](trajectory.jsonl#L96) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 97](trajectory.jsonl#L97) **drafter → read_section**

```json
{"sectionId":"sec-8.3"}
```

- [seq 98](trajectory.jsonl#L98) **read_section result**

```json
{"sectionRef":"§ 8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urban Consumers during the preceding twelve months and three percent. Vendor must give at least ninety days' written notice of an increase. No increase applies to prepaid periods.","paragraphs":[{"id":"p0034","text":"8.3 On renewal, Vendor may in…
```

- [seq 117](trajectory.jsonl#L117) **drafter → search**

```json
{"query":"third party offer"}
```

- [seq 118](trajectory.jsonl#L118) **search result**

```json
[]
```

- [seq 119](trajectory.jsonl#L119) **drafter → search**

```json
{"query":"terms no less"}
```

- [seq 120](trajectory.jsonl#L120) **search result**

```json
[]
```

- [seq 143](trajectory.jsonl#L143) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0049","p0026","p0034"],"quote":"Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"The agreement imposes no MFN or most-favoured-customer obligation on Customer. § 12.3 expressly confirms Customer has made no most-favoured-customer commitment and is free to engage any supplier, and the pricing provisions (§ 7.1 fixed Fees; § 8.3 capped renewal uplift) create no duty to benchmark or match third-party terms. Searches for MFN/\"no less favourable\"/third-party-offer language returned nothing else. This meets the preferred position (no MFN burden on Customer), so no redline is proposed.","confidence":0.92}
```

- [seq 144](trajectory.jsonl#L144) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 143](trajectory.jsonl#L143)
- Finding: `f-mfn-161552fc` · **compliant** · confidence 0.92
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: The agreement imposes no MFN or most-favoured-customer obligation on Customer. § 12.3 expressly confirms Customer has made no most-favoured-customer commitment and is free to engage any supplier, and the pricing provisions (§ 7.1 fixed Fees; § 8.3 capped renewal uplift) create no duty to benchmark or match third-party terms. Searches for MFN/"no less favourable"/third-party-offer language returned nothing else. This meets the preferred position (no MFN burden on Customer), so no redline is proposed.

### Verifier and repair feedback

- [seq 185](trajectory.jsonl#L185) **Verdict: pass** — Claimed status is compliant and the cited text supports it: § 12.3 expressly records that Customer has made no most-favoured-customer commitment, and §§ 7.1/8.3 impose no benchmarking or match-third-party-offer duty on Customer. No redline or comment was proposed, which is the correct treatment for a compliant finding; the rendered paragraphs are unchanged from the originals. Rationale is accurate as to the preferred position (no MFN burden on Customer) and correctly notes that any Vendor-granted MFN would be welcome rather than flagged. Checks: .

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

- [seq 43](trajectory.jsonl#L43) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 44](trajectory.jsonl#L44) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 45](trajectory.jsonl#L45) **drafter → read_section**

```json
{"sectionId":"sec-30.1"}
```

- [seq 46](trajectory.jsonl#L46) **read_section result**

```json
{"sectionRef":"§ 30.1 The Parties are independent contractors. Nothing creates a partnership, joint venture, fiduciary relationship, franchise, or agency. Neither Party may bind the other. Vendor is solely responsible for compensation, direction, and taxes of its personnel.","paragraphs":[{"id":"p0116","text":"30.1 The Parties are independent contractors. Nothing creates a partnership, joint vent…
```

- [seq 47](trajectory.jsonl#L47) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 48](trajectory.jsonl#L48) **search result**

```json
[]
```

- [seq 71](trajectory.jsonl#L71) **drafter → search**

```json
{"query":"hire"}
```

- [seq 72](trajectory.jsonl#L72) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"induce"}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[]
```

- [seq 75](trajectory.jsonl#L75) **drafter → search**

```json
{"query":"employ"}
```

- [seq 76](trajectory.jsonl#L76) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1.2 “Applicable Law” means every statute, regulation, binding regulatory requirement, court order, and governmental rule applicable to a Party's performance under this Agreement, including laws concerning privacy, information security, export controls, employment, anti-bribery, and accessibility. Applicable Law does not include a private standard unless an …
```

- [seq 77](trajectory.jsonl#L77) **drafter → search**

```json
{"query":"recruit"}
```

- [seq 78](trajectory.jsonl#L78) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 91](trajectory.jsonl#L91) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0049"],"quote":"Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"Searches for \"solicit\", \"hire\", \"induce\", \"employ\" and \"recruit\" return no personnel-restriction binding Meridian; § 30.1 is a standard independent-contractor clause with no hiring restriction. § 12.3 goes further and expressly records that Customer has given no no-hire commitment and remains free to hire anyone responding to general recruitment. This matches the preferred position (no non-solicit on Customer), so no redline is warranted — the clause operates in our favour.","confidence":0.9}
```

- [seq 92](trajectory.jsonl#L92) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 91](trajectory.jsonl#L91)
- Finding: `f-nosolicit-9ac0f612` · **compliant** · confidence 0.90
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: Searches for "solicit", "hire", "induce", "employ" and "recruit" return no personnel-restriction binding Meridian; § 30.1 is a standard independent-contractor clause with no hiring restriction. § 12.3 goes further and expressly records that Customer has given no no-hire commitment and remains free to hire anyone responding to general recruitment. This matches the preferred position (no non-solicit on Customer), so no redline is warranted — the clause operates in our favour.

### Verifier and repair feedback

- [seq 135](trajectory.jsonl#L135) **Verdict: pass** — Claimed status is compliant and the cited text supports it: § 12.3 affirmatively records that Customer has made no no-hire (or non-compete/exclusivity) commitment and is free to hire anyone responding to general recruitment, which matches the preferred position of no non-solicit binding Customer. No redline or counterparty comment was proposed, which is correct for a compliant finding; the rendered redline is identical to the original paragraph. The failed deterministic checks (duration ≤ 12 months, general-solicitation carve-out) are artefacts of the presence heuristics — they presuppose an existing non-solicit obligation, and none binds Customer, so they do not undercut the classification. The clause operates in our favour, so flagging it as a deviation would be over-flagging; retaining it as internal compliance evidence is appropriate. Checks: {"name":"non-solicit duration ≤ 12 months","ok":false,"detail":"number not found"}; {"name":"general-solicitation carve-out present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 137](trajectory.jsonl#L137)

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

- [seq 155](trajectory.jsonl#L155) **drafter → read_section**

```json
{"sectionId":"sec-9.4"}
```

- [seq 156](trajectory.jsonl#L156) **read_section result**

```json
{"sectionRef":"§ 9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-terminatio…
```

- [seq 157](trajectory.jsonl#L157) **drafter → read_section**

```json
{"sectionId":"sec-9.1"}
```

- [seq 158](trajectory.jsonl#L158) **read_section result**

```json
{"sectionRef":"§ 9.1 Either Party may terminate this Agreement or an affected Order Form for the other Party's material breach if the breach remains uncured thirty days after written notice describing it in reasonable detail. If a breach cannot reasonably be cured within thirty days, the cure period extends up to sixty additional days while the breaching Party diligently pursues cure.","paragraph…
```

- [seq 175](trajectory.jsonl#L175) **drafter → read_section**

```json
{"sectionId":"sec-9.5"}
```

- [seq 176](trajectory.jsonl#L176) **read_section result**

```json
{"sectionRef":"§ 9.5 Termination of one Order Form does not terminate another Order Form unless Customer states that the affected Services are operationally inseparable. A termination right is in addition to, and does not exclude, any other remedy available under this Agreement or Applicable Law.","paragraphs":[{"id":"p0040","text":"9.5 Termination of one Order Form does not terminate another Ord…
```

- [seq 177](trajectory.jsonl#L177) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 178](trajectory.jsonl#L178) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 207](trajectory.jsonl#L207) **drafter → search**

```json
{"query":"terminate","limit":20}
```

- [seq 208](trajectory.jsonl#L208) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 6.2 If Customer rejects a Deliverable, Vendor shall promptly correct the nonconformities at no additional charge and resubmit it for a new acceptance period. After two unsuccessful correction cycles, Customer may terminate the affected Order Form and receive a refund of Fees paid for the rejected Deliverable and dependent Services Customer cannot reasonably…
```

- [seq 231](trajectory.jsonl#L231) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0039"],"quote":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-termination right during a committed term.","rationale":"Section 9.4 matches the preferred position exactly: we may terminate the Agreement or any Order Form for convenience (in whole or in part) on thirty days' written notice, with a pro-rata refund of prepaid Fees and no early-termination fee, and Copperleaf is expressly denied any convenience-termination right during a committed term. No other provision grants the Vendor a convenience right (§§ 9.1–9.3 are breach/insolvency/cause based, and § 24.4 blocks change-of-control termination). Section 2.1's three-year take-or-pay commitment \"without reduction or termination rights\" is in tension with the economics of § 9.4, but that is a minimum-commitment issue to be raised under MINCOMMIT rather than double-flagged here. Clause is favourable to us; no redline.","confidence":0.9}
```

- [seq 232](trajectory.jsonl#L232) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 231](trajectory.jsonl#L231)
- Finding: `f-t4c-572bf3ca` · **compliant** · confidence 0.90
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-termination right during a committed term.”
- Rationale: Section 9.4 matches the preferred position exactly: we may terminate the Agreement or any Order Form for convenience (in whole or in part) on thirty days' written notice, with a pro-rata refund of prepaid Fees and no early-termination fee, and Copperleaf is expressly denied any convenience-termination right during a committed term. No other provision grants the Vendor a convenience right (§§ 9.1–9.3 are breach/insolvency/cause based, and § 24.4 blocks change-of-control termination). Section 2.1's three-year take-or-pay commitment "without reduction or termination rights" is in tension with the economics of § 9.4, but that is a minimum-commitment issue to be raised under MINCOMMIT rather than double-flagged here. Clause is favourable to us; no redline.

### Verifier and repair feedback

- [seq 287](trajectory.jsonl#L287) **Verdict: pass** — Section 9.4 as cited grants Customer a convenience-termination right on thirty days' written notice for the Agreement or any Order Form, with a pro-rata refund of prepaid Fees and no early-termination fee, and expressly denies Vendor any convenience right during a committed term — this matches the T4C preferred position on every material term. The finding is claimed as compliant and correctly carries no redline and no counterparty comment; the rendered paragraph is unchanged from the original, so there is no over-flagging or invalid edit. The rationale appropriately checks the rest of the document (breach/insolvency terminations in 9.1–9.3, change-of-control block in 24.4) and confirms no Vendor convenience right exists elsewhere. The §2.1 take-or-pay 'without reduction or termination rights' tension is correctly noted as economic context and routed to the minimum-commitment rule rather than double-flagged here, consistent with the no-duplicate-flag instruction. Deterministic check ('Customer convenience termination present') corroborates the compliant classification. Checks: {"name":"Customer convenience termination present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 167](trajectory.jsonl#L167)

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

- [seq 201](trajectory.jsonl#L201) **drafter → read_section**

```json
{"sectionId":"sec-8.2"}
```

- [seq 202](trajectory.jsonl#L202) **read_section result**

```json
{"sectionRef":"§ 8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is…
```

- [seq 203](trajectory.jsonl#L203) **drafter → read_section**

```json
{"sectionId":"sec-8.3"}
```

- [seq 204](trajectory.jsonl#L204) **read_section result**

```json
{"sectionRef":"§ 8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urban Consumers during the preceding twelve months and three percent. Vendor must give at least ninety days' written notice of an increase. No increase applies to prepaid periods.","paragraphs":[{"id":"p0034","text":"8.3 On renewal, Vendor may in…
```

- [seq 245](trajectory.jsonl#L245) **drafter → read_section**

```json
{"sectionId":"sec-8.1"}
```

- [seq 246](trajectory.jsonl#L246) **read_section result**

```json
{"sectionRef":"§ 8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Order Form expires or is terminated.","paragraphs":[{"id":"p0032","text":"8.1 This Agreement begins on…
```

- [seq 273](trajectory.jsonl#L273) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0033","p0034","p0032"],"quote":"8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.","rationale":"Renewal terms sit at the preferred position. § 8.2 provides automatic twelve-month (not multi-year) renewals that Customer alone may exit on thirty days' written notice — within the preferred ≤30-day window — plus a Vendor reminder sixty days before renewal, with the opt-out deadline extended if the reminder is missed (a customer-favourable addition). § 8.3 caps renewal uplifts at the lesser of CPI and three percent, matching the preferred cap, requires ninety days' notice of any increase, and exempts prepaid periods. § 8.1's fixed three-year initial term is a negotiated initial commitment, not an automatic multi-year renewal, so it does not engage the walk-away trigger. No redline needed.","confidence":0.95}
```

- [seq 274](trajectory.jsonl#L274) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 273](trajectory.jsonl#L273)
- Finding: `f-renewal-ec76cb15` · **compliant** · confidence 0.95
- Location: § 8.2 Each Order Form has the initial term stated in it and there…
- Quote: “8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.”
- Rationale: Renewal terms sit at the preferred position. § 8.2 provides automatic twelve-month (not multi-year) renewals that Customer alone may exit on thirty days' written notice — within the preferred ≤30-day window — plus a Vendor reminder sixty days before renewal, with the opt-out deadline extended if the reminder is missed (a customer-favourable addition). § 8.3 caps renewal uplifts at the lesser of CPI and three percent, matching the preferred cap, requires ninety days' notice of any increase, and exempts prepaid periods. § 8.1's fixed three-year initial term is a negotiated initial commitment, not an automatic multi-year renewal, so it does not engage the walk-away trigger. No redline needed.

### Verifier and repair feedback

- [seq 319](trajectory.jsonl#L319) **Verdict: pass** — Cited § 8.2 matches the preferred position: successive twelve-month (not multi-year) automatic renewals, Customer opt-out on 30 days' notice (≤30), and a Vendor reminder 60 days before renewal, with a customer-favourable extension if the reminder is missed. § 8.3 caps renewal uplift at the lesser of CPI and 3%, exactly the preferred cap, with 90 days' notice and no increase on prepaid periods. Rationale correctly reasons that § 8.1's three-year initial term is a negotiated initial commitment, not an automatic multi-year renewal, so the walk-away trigger is not engaged. Consistent with a compliant finding, no redline or comment is proposed and the rendered text is unchanged; the deterministic notice-window check confirms 30 days. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 173](trajectory.jsonl#L173)

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

- [seq 189](trajectory.jsonl#L189) **drafter → read_section**

```json
{"sectionId":"sec-28.1"}
```

- [seq 190](trajectory.jsonl#L190) **read_section result**

```json
{"sectionRef":"§ 28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.","paragraphs":[{"id":"p0108","text":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New Yo…
```

- [seq 191](trajectory.jsonl#L191) **drafter → read_section**

```json
{"sectionId":"sec-28.2"}
```

- [seq 192](trajectory.jsonl#L192) **read_section result**

```json
{"sectionRef":"§ 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum. Nothing prevents a Party from seeking temporary injunctive relief in another court with jurisdiction to protect confidential information or intellectual proper…
```

- [seq 193](trajectory.jsonl#L193) **drafter → read_section**

```json
{"sectionId":"sec-28.3"}
```

- [seq 194](trajectory.jsonl#L194) **read_section result**

```json
{"sectionRef":"§ 28.3 Before filing an ordinary commercial claim, a Party shall give notice and permit executives with settlement authority to meet in good faith within fifteen business days. This process does not delay urgent relief or a filing needed to preserve a limitations period. Discussions are compromise negotiations to the extent allowed by law.","paragraphs":[{"id":"p0110","text":"28.3 …
```

- [seq 235](trajectory.jsonl#L235) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 236](trajectory.jsonl#L236) **search result**

```json
[]
```

- [seq 261](trajectory.jsonl#L261) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0108","p0109"],"quote":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.","rationale":"Section 28.1 applies New York law and Section 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, which is exactly our preferred position. There is no arbitration provision anywhere in the agreement (search for \"arbitration\" returns nothing), so no foreign seat concern. The mutual pre-filing executive escalation in 28.3 (fifteen business days, with carve-outs for urgent relief and limitations periods) and the mutual injunctive-relief carve-out in 28.2 are balanced, apply to both parties, and do not displace the accepted forum; noted only, not a deviation.","confidence":0.95}
```

- [seq 262](trajectory.jsonl#L262) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 261](trajectory.jsonl#L261)
- Finding: `f-govlaw-dae1813e` · **compliant** · confidence 0.95
- Location: § 28.1 This Agreement and each dispute arising from it are governe…
- Quote: “28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.”
- Rationale: Section 28.1 applies New York law and Section 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, which is exactly our preferred position. There is no arbitration provision anywhere in the agreement (search for "arbitration" returns nothing), so no foreign seat concern. The mutual pre-filing executive escalation in 28.3 (fifteen business days, with carve-outs for urgent relief and limitations periods) and the mutual injunctive-relief carve-out in 28.2 are balanced, apply to both parties, and do not displace the accepted forum; noted only, not a deviation.

### Verifier and repair feedback

- [seq 307](trajectory.jsonl#L307) **Verdict: pass** — Cited Sections 28.1 and 28.2 apply New York law and grant exclusive jurisdiction to the state and federal courts in New York County, matching the GOVLAW preferred position exactly. No arbitration provision is present, so there is no foreign-seat walk-away concern; deterministic check confirms the jurisdiction is within the accepted set. Consistent with a compliant finding, no redline was rendered and no counterparty comment was added; the injunctive-relief carve-out and mutual escalation are correctly noted as balanced sub-elements rather than deviations. Checks: {"name":"governing law within the accepted set","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 183](trajectory.jsonl#L183)

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

- [seq 211](trajectory.jsonl#L211) **drafter → read_section**

```json
{"sectionId":"sec-24.1"}
```

- [seq 212](trajectory.jsonl#L212) **read_section result**

```json
{"sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Customer shall give prompt written notice, and the assignee shall assume the applicable obligations.","paragraphs":[{"id":"p0092","text":…
```

- [seq 213](trajectory.jsonl#L213) **drafter → read_section**

```json
{"sectionId":"sec-24.2"}
```

- [seq 214](trajectory.jsonl#L214) **read_section result**

```json
{"sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and financial standing. Vendor may never assign to a direct Customer competitor without Customer's consent.","paragraphs":[{"id":"p0093","text":"24.2 Vendor …
```

- [seq 215](trajectory.jsonl#L215) **drafter → read_section**

```json
{"sectionId":"sec-24.3"}
```

- [seq 216](trajectory.jsonl#L216) **read_section result**

```json
{"sectionRef":"§ 24.3 For other assignments, neither Party may assign without the other's prior written consent, not to be unreasonably withheld, conditioned, or delayed. A permitted assignment does not relieve accrued obligations. An attempted assignment contrary to this Section is void to the extent permitted by law.","paragraphs":[{"id":"p0094","text":"24.3 For other assignments, neither Party…
```

- [seq 217](trajectory.jsonl#L217) **drafter → read_section**

```json
{"sectionId":"sec-24.4"}
```

- [seq 218](trajectory.jsonl#L218) **read_section result**

```json
{"sectionRef":"§ 24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service. Vendor shall cooperate with reasonable administrative changes needed to reflect a permitted successor.","paragraphs":[{"id":"p0095","text":"24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees,…
```

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0054","text":"13.3 Customer may transfer its l…
```

- [seq 251](trajectory.jsonl#L251) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 252](trajectory.jsonl#L252) **search result**

```json
[{"paragraphId":"p0091","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0093","sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and fina…
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"assign","limit":20}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[{"paragraphId":"p0037","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 295](trajectory.jsonl#L295) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0092","p0093","p0094","p0095"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets the preferred position in full. § 24.1 gives us an unconditional affiliate/successor (merger, reorganization, acquisition, sale of substantially all assets) assignment right without Vendor consent, subject only to prompt notice; § 13.3 carries the same carve-out through to licence rights. § 24.2 binds Vendor to our prior written consent (reasonableness qualified) for assignment, delegation of material performance or transfer by change of control, and bars assignment to a direct competitor. § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on our change of control, and requires cooperation with successor administrative changes. § 24.3 is only a residual gate for \"other assignments\" outside the 24.1 carve-out, is mutual, and is qualified by a not-unreasonably-withheld/conditioned/delayed standard, so it does not cut back our M&A rights. No conflicting change-of-control trigger exists elsewhere (§ 9.2 insolvency termination expressly excludes a lawful reorganization that does not impair performance). No redline needed.","confidence":0.95}
```

- [seq 296](trajectory.jsonl#L296) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 295](trajectory.jsonl#L295)
- Finding: `f-assign-77a5f935` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets the preferred position in full. § 24.1 gives us an unconditional affiliate/successor (merger, reorganization, acquisition, sale of substantially all assets) assignment right without Vendor consent, subject only to prompt notice; § 13.3 carries the same carve-out through to licence rights. § 24.2 binds Vendor to our prior written consent (reasonableness qualified) for assignment, delegation of material performance or transfer by change of control, and bars assignment to a direct competitor. § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on our change of control, and requires cooperation with successor administrative changes. § 24.3 is only a residual gate for "other assignments" outside the 24.1 carve-out, is mutual, and is qualified by a not-unreasonably-withheld/conditioned/delayed standard, so it does not cut back our M&A rights. No conflicting change-of-control trigger exists elsewhere (§ 9.2 insolvency termination expressly excludes a lawful reorganization that does not impair performance). No redline needed.

### Verifier and repair feedback

- [seq 355](trajectory.jsonl#L355) **Verdict: pass** — Cited § 24.1–24.4 matches the preferred position: unconditional Customer affiliate/successor assignment right with notice, Vendor assignment (including via change of control) gated on our reasonable consent with a competitor bar, and express denial of any Vendor termination/reprice right on our change of control. No redline or comment was proposed, which is correct for a compliant classification; the rendered text is byte-identical to the original paragraphs. Deterministic check confirms the successor/affiliate carve-out is present; rationale accurately notes § 24.3 is only a residual mutual gate and that § 9.2 contains no conflicting change-of-control trigger. Checks: {"name":"successor/affiliate carve-out for Customer present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 187](trajectory.jsonl#L187)

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

- [seq 221](trajectory.jsonl#L221) **drafter → read_section**

```json
{"sectionId":"sec-14.1"}
```

- [seq 222](trajectory.jsonl#L222) **read_section result**

```json
{"sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer.","paragraphs":[{"i…
```

- [seq 223](trajectory.jsonl#L223) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 224](trajectory.jsonl#L224) **read_section result**

```json
{"sectionRef":"§ 14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","paragraphs":[…
```

- [seq 225](trajectory.jsonl#L225) **drafter → read_section**

```json
{"sectionId":"sec-14.3"}
```

- [seq 226](trajectory.jsonl#L226) **read_section result**

```json
{"sectionRef":"§ 14.3 Vendor retains Vendor Technology. To the extent Vendor Technology is incorporated in or required to use a Deliverable, the perpetual licence in Section 13.2 applies. Vendor shall identify material Vendor Technology in a Deliverable before delivery and may not incorporate third-party material that materially restricts Customer's intended use without written approval.","paragr…
```

- [seq 227](trajectory.jsonl#L227) **drafter → read_section**

```json
{"sectionId":"sec-14.4"}
```

- [seq 228](trajectory.jsonl#L228) **read_section result**

```json
{"sectionRef":"§ 14.4 No jointly owned intellectual property is created unless the Parties sign a separate instrument identifying it and their exploitation rights. Feedback is voluntary; Vendor may use generalized suggestions without identifying Customer or disclosing Customer Confidential Information, and Customer retains the unrestricted right to use its own feedback.","paragraphs":[{"id":"p006…
```

- [seq 255](trajectory.jsonl#L255) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 256](trajectory.jsonl#L256) **read_section result**

```json
{"sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for Customer's business.","…
```

- [seq 257](trajectory.jsonl#L257) **drafter → read_section**

```json
{"sectionId":"sec-15.1"}
```

- [seq 258](trajectory.jsonl#L258) **read_section result**

```json
{"sectionRef":"§ 15.1 Vendor shall process Customer Data only on Customer's documented instructions, to provide the Services, and as permitted by this Agreement. Vendor shall not sell Customer Data, use it for advertising, combine it with another customer's identifiable data, or train a generally available model on it without Customer's express written consent.","paragraphs":[{"id":"p0062","text"…
```

- [seq 281](trajectory.jsonl#L281) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0057","p0058","p0059","p0060","p0053"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.","rationale":"The IP package meets our preferred position. §14.1 confirms Customer owns all Customer Data, Customer Confidential Information and independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by §15.1's no-sale/no-advertising/no-model-training limits). §14.2 vests ownership of Deliverables in Customer with an express Vendor assignment, including personnel assignments and further-assurance. §14.3 leaves Vendor with only its pre-existing Vendor Technology and routes any embedded Vendor Technology to the §13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, modify and create derivative works for Customer's business. §14.4 excludes joint ownership absent a signed instrument and keeps feedback rights unrestricted for us. The only sub-preferred details are the \"subject to payment of the applicable Fees\" condition on Deliverable ownership and the absence of an express sublicensing word in §13.2 (contractor support is permitted) — noted, not material enough to redline.</parationale>\n<parameter name=\"confidence\">0.9"}
```

- [seq 282](trajectory.jsonl#L282) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 299](trajectory.jsonl#L299) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0057","p0058","p0059","p0060","p0053"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.","rationale":"The IP package meets our preferred position. §14.1 confirms Customer owns all Customer Data, Customer Confidential Information and independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by §15.1's no-sale/no-advertising/no-model-training limits). §14.2 vests ownership of Deliverables in Customer with an express Vendor assignment, personnel assignments and further assurance. §14.3 leaves Vendor only its pre-existing Vendor Technology and routes embedded Vendor Technology into the §13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, modify and create derivative works for Customer's business. §14.4 excludes joint ownership absent a signed instrument and preserves our unrestricted feedback rights. Only minor sub-preferred details: the \"subject to payment of the applicable Fees\" condition on Deliverable ownership and no express sublicence word in §13.2 (contractor support is allowed) — noted, not flagged.","confidence":0.9}
```

- [seq 300](trajectory.jsonl#L300) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 299](trajectory.jsonl#L299)
- Finding: `f-ip-95ec5438` · **compliant** · confidence 0.90
- Location: § 14.1 As between the Parties, Customer owns all Customer Data, Cu…
- Quote: “14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.”
- Rationale: The IP package meets our preferred position. §14.1 confirms Customer owns all Customer Data, Customer Confidential Information and independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by §15.1's no-sale/no-advertising/no-model-training limits). §14.2 vests ownership of Deliverables in Customer with an express Vendor assignment, personnel assignments and further assurance. §14.3 leaves Vendor only its pre-existing Vendor Technology and routes embedded Vendor Technology into the §13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, modify and create derivative works for Customer's business. §14.4 excludes joint ownership absent a signed instrument and preserves our unrestricted feedback rights. Only minor sub-preferred details: the "subject to payment of the applicable Fees" condition on Deliverable ownership and no express sublicence word in §13.2 (contractor support is allowed) — noted, not flagged.

### Verifier and repair feedback

- [seq 359](trajectory.jsonl#L359) **Verdict: pass** — Claimed status is compliant and the cited clauses support it: §14.1 vests Customer Data/Customer IP ownership in Customer with only a limited processing right to Vendor, §14.2 gives Customer ownership of Deliverables with an express Vendor assignment plus personnel assignments and further assurance, §14.3 limits Vendor to its pre-existing Vendor Technology and channels embedded Vendor Technology into the §13.2 perpetual, irrevocable, worldwide, royalty-free licence to use/modify/create derivative works, and §14.4 bars joint ownership absent a signed instrument while preserving Customer's feedback rights — this meets the preferred position. No redline or counterparty comment was proposed, which is the correct output for a compliant finding, and the rendered text is unchanged from the original paragraphs. The deterministic check (no residual assignment of Customer Data/IP to Vendor) passes, consistent with the rationale. Sub-preferred details (payment condition on Deliverable ownership; no express 'sublicense' word, though contractor support is permitted) are correctly noted in the rationale rather than escalated to a deviation, per the playbook's classification semantics. Checks: {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 199](trajectory.jsonl#L199)

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

- [seq 239](trajectory.jsonl#L239) **drafter → read_section**

```json
{"sectionId":"sec-13.1"}
```

- [seq 240](trajectory.jsonl#L240) **read_section result**

```json
{"sectionRef":"§ 13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","paragraphs":[{"id":"p0052","text":"13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors."}]}
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 242](trajectory.jsonl#L242) **read_section result**

```json
{"sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for Customer's business.","…
```

- [seq 267](trajectory.jsonl#L267) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 268](trajectory.jsonl#L268) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0054","text":"13.3 Customer may transfer its l…
```

- [seq 269](trajectory.jsonl#L269) **drafter → read_section**

```json
{"sectionId":"sec-13.4"}
```

- [seq 270](trajectory.jsonl#L270) **read_section result**

```json
{"sectionRef":"§ 13.4 Customer shall not knowingly reverse engineer hosted source code except to the extent a restriction is prohibited by Applicable Law, interfere with the Services, bypass documented security controls, or use the Services to violate Applicable Law. These restrictions do not limit testing authorized by the security exhibit or use of Customer Data and output.","paragraphs":[{"id"…
```

- [seq 291](trajectory.jsonl#L291) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Services licence grant excluding Affiliates and contractors, revocable at Vendor's discretion"}
```

- [seq 302](trajectory.jsonl#L302) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-license","source":"Lighthouse Application Licence (Jan 2025)","clauseAfter":"Licensor grants Customer and its affiliates and contractors a non-transferable licence, transferable to a successor in a merger or acquisition.","comment":"[Playbook] We extended operational use to affiliates and contractors and protected transaction continuity.","level":"fallback"}]}
```

- [seq 303](trajectory.jsonl#L303) **drafter → search**

```json
{"query":"licence to use the Services"}
```

- [seq 304](trajectory.jsonl#L304) **search result**

```json
[]
```

- [seq 333](trajectory.jsonl#L333) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend the Services licence in 13.1 to Affiliates and contractors and remove revocation at Vendor's discretion","comment":"[Playbook] We extended the Services licence to our Affiliates and to contractors acting on our behalf, since our playbook requires operational use by those parties and Section 13.1 currently excludes them with no path to add them. We also aligned revocation with the notice-and-cure limits already agreed in Section 13.3 rather than Vendor's sole discretion.","ops":[{"kind":"replace","paragraphId":"p0052","oldText":"Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","newText":"Customer, its Affiliates and contractors acting on Customer's behalf a non-transferable licence, revocable only as provided in Section 13.3, to use the Services."}],"precedentId":"seed-license"}
```

- [seq 334](trajectory.jsonl#L334) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0052","segments":[{"type":"equal","text":"13.1 Vendor grants Customer"},{"type":"delete","text":" alone "},{"type":"insert","text":", its Affiliates and contractors acting on Customer's behalf "},{"type":"equal","text":"a non-transferable licence, revocable "},{"type":"delete","text":"at Vendor's sole discretion"},{"type":"insert","text":"only a…
```

- [seq 369](trajectory.jsonl#L369) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0052"],"quote":"13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","rationale":"Section 13.1, the grant for the Services, licenses Customer alone and expressly excludes Affiliates and contractors with no mechanism to add them, and states the licence is revocable at Vendor's sole discretion — walk-away territory under this rule. Section 13.2's perpetual, irrevocable grant covering Affiliates and contractors is limited to paid-up software/Vendor Technology and embedded Deliverables, so it does not cure the Services grant, and Section 13.3 (transfer to Affiliate/successor plus revocation only for material uncured breach after notice and cure) addresses transferability and revocation but not Affiliate/contractor use. The fallback (affiliates covered, at least on written notice) is therefore not met. Minimal edit extends 13.1 to Affiliates and contractors acting on our behalf and ties revocation to the notice-and-cure standard already agreed in 13.3; successor transfer is already covered by 13.3 so no further change is needed.","confidence":0.85,"proposal":{"level":"preferred","summary":"Extend the Services licence in 13.1 to Affiliates and contractors and remove revocation at Vendor's discretion","comment":"[Playbook] We extended the Services licence to our Affiliates and to contractors acting on our behalf, since our playbook requires operational use by those parties and Section 13.1 currently excludes them with no path to add them. We also aligned revocation with the notice-and-cure limits already agreed in Section 13.3 rather than Vendor's sole discretion.","precedentId":"seed-license","ops":[{"kind":"replace","paragraphId":"p0052","oldText":"Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","newText":"Customer, its Affiliates and contractors acting on Customer's behalf a non-transferable licence, revocable only as provided in Section 13.3, to use the Services."}]}}
```

- [seq 370](trajectory.jsonl#L370) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 369](trajectory.jsonl#L369)
- Finding: `f-license-6b57f2c0` · **deviation** · confidence 0.85
- Location: § 13.1 Vendor grants Customer alone a non-transferable licence, re…
- Quote: “13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.”
- Rationale: Section 13.1, the grant for the Services, licenses Customer alone and expressly excludes Affiliates and contractors with no mechanism to add them, and states the licence is revocable at Vendor's sole discretion — walk-away territory under this rule. Section 13.2's perpetual, irrevocable grant covering Affiliates and contractors is limited to paid-up software/Vendor Technology and embedded Deliverables, so it does not cure the Services grant, and Section 13.3 (transfer to Affiliate/successor plus revocation only for material uncured breach after notice and cure) addresses transferability and revocation but not Affiliate/contractor use. The fallback (affiliates covered, at least on written notice) is therefore not met. Minimal edit extends 13.1 to Affiliates and contractors acting on our behalf and ties revocation to the notice-and-cure standard already agreed in 13.3; successor transfer is already covered by 13.3 so no further change is needed.
- Proposal: **preferred** — Extend the Services licence in 13.1 to Affiliates and contractors and remove revocation at Vendor's discretion
- Comment: [Playbook] We extended the Services licence to our Affiliates and to contractors acting on our behalf, since our playbook requires operational use by those parties and Section 13.1 currently excludes them with no path to add them. We also aligned revocation with the notice-and-cure limits already agreed in Section 13.3 rather than Vendor's sole discretion.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer, its Affiliates and contractors acting on Customer's behalf a non-transferable licence, revocable only as provided in Section 13.3, to use the Services.",
    "oldText": "Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.",
    "paragraphId": "p0052"
  }
]
```

### Verifier and repair feedback

- [seq 433](trajectory.jsonl#L433) **Verdict: pass** — Deviation classification is correct: Section 13.1 grants the Services licence to 'Customer alone', expressly excludes Affiliates and contractors with no mechanism to add them, and makes the licence revocable at Vendor's sole discretion — this fails the fallback (affiliates covered at least on written notice) and sits in the rule's walk-away territory, so the other grant clauses (13.2 limited to paid-up software/Vendor Technology; 13.3 covering transfer and revocation standard) do not cure the Services grant. Redline is valid and actionable: it inserts 'its Affiliates and contractors acting on Customer's behalf', removes the at-will revocation by cross-referencing the notice-and-cure standard already agreed in Section 13.3, and deletes the now-contradictory 'without Affiliates or contractors' carve-out; the resulting sentence is grammatical and self-consistent. Edit is appropriately restrained: 'non-transferable' is left intact because successor/Affiliate transfer is already handled in 13.3, so no duplicative change is proposed. The failed minimal-edit check (0.776 changed-character ratio) is an artifact of a very short clause whose exclusionary language had to be removed to reach the playbook position. Comment is accurate, concise, in first person plural with the required prefix, cites the playbook position and the internal cross-reference, and does not overstate the change. Checks: {"name":"operation 1 applies","ok":true}; {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}; {"name":"minimal edit p0052","ok":false,"detail":"changed-character ratio=0.776 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 289](trajectory.jsonl#L289)

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

- [seq 311](trajectory.jsonl#L311) **drafter → read_section**

```json
{"sectionId":"sec-22.1"}
```

- [seq 312](trajectory.jsonl#L312) **read_section result**

```json
{"sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","paragraphs":[{"id":"p0…
```

- [seq 313](trajectory.jsonl#L313) **drafter → read_section**

```json
{"sectionId":"sec-22.2"}
```

- [seq 314](trajectory.jsonl#L314) **read_section result**

```json
{"sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidential information.","parag…
```

- [seq 315](trajectory.jsonl#L315) **drafter → read_section**

```json
{"sectionId":"sec-22.3"}
```

- [seq 316](trajectory.jsonl#L316) **read_section result**

```json
{"sectionRef":"§ 22.3 Audit findings are Customer Confidential Information and may be used only to enforce this Agreement. Vendor shall provide a copy of the final report. Payment of a shortfall resolves the audited quantity issue absent fraud or demonstrable error.","paragraphs":[{"id":"p0089","text":"22.3 Audit findings are Customer Confidential Information and may be used only to enforce this …
```

- [seq 337](trajectory.jsonl#L337) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 338](trajectory.jsonl#L338) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0090","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 339](trajectory.jsonl#L339) **drafter → search**

```json
{"query":"audit","limit":25}
```

- [seq 340](trajectory.jsonl#L340) **search result**

```json
[{"paragraphId":"p0086","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0087","sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be cond…
```

- [seq 373](trajectory.jsonl#L373) **drafter → search**

```json
{"query":"verif|inspect|monitor|metering|telemetry|remote access|records","regex":true,"limit":25}
```

- [seq 374](trajectory.jsonl#L374) **search result**

```json
[{"paragraphId":"p0005","sectionRef":"§ 1.3 “Customer Data” means all data, records, files, content, personal information, and other materials submitted to, stored in, transmitted through, or otherwise made available to the Services by or for Customer or its Authorized Users, together with output specifically derived from that material. Customer Data excludes anonymized operational telemetry that…
```

- [seq 395](trajectory.jsonl#L395) **drafter → list_sections**

```json
{}
```

- [seq 396](trajectory.jsonl#L396) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 429](trajectory.jsonl#L429) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0087","p0088","p0089"],"quote":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","rationale":"Section 22 is the only provision granting audit/verification rights against us; Section 23 (\"Records and Customer Assurance\") is a bare heading with no substantive text, and a document-wide search found no other inspection, monitoring, metering or telemetry-based verification right binding Customer. Section 22 meets the preferred position on every material term: frequency limited to once in any twelve-month period, at least thirty days' prior written notice, normal business hours, off-site where practicable, an independent auditor bound by confidentiality, Vendor bearing audit costs unless underpayment exceeds five percent (better than the fallback's 10% threshold), and an express bar on Vendor or its auditor accessing Customer systems directly, unrelated Customer Data, privileged material, or another supplier's confidential information — so the walk-away risks (unlimited/unannounced audits or remote system access) are excluded. Section 22.3 adds further customer-favourable protections (findings are our Confidential Information, use restricted to enforcement, copy of the final report, and payment of a shortfall resolving the audited quantity issue). No redline needed.","confidence":0.93}
```

- [seq 430](trajectory.jsonl#L430) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 429](trajectory.jsonl#L429)
- Finding: `f-audit-a71ed49f` · **compliant** · confidence 0.93
- Location: § 22.1 Vendor may audit Customer's compliance with licence quantit…
- Quote: “22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.”
- Rationale: Section 22 is the only provision granting audit/verification rights against us; Section 23 ("Records and Customer Assurance") is a bare heading with no substantive text, and a document-wide search found no other inspection, monitoring, metering or telemetry-based verification right binding Customer. Section 22 meets the preferred position on every material term: frequency limited to once in any twelve-month period, at least thirty days' prior written notice, normal business hours, off-site where practicable, an independent auditor bound by confidentiality, Vendor bearing audit costs unless underpayment exceeds five percent (better than the fallback's 10% threshold), and an express bar on Vendor or its auditor accessing Customer systems directly, unrelated Customer Data, privileged material, or another supplier's confidential information — so the walk-away risks (unlimited/unannounced audits or remote system access) are excluded. Section 22.3 adds further customer-favourable protections (findings are our Confidential Information, use restricted to enforcement, copy of the final report, and payment of a shortfall resolving the audited quantity issue). No redline needed.

### Verifier and repair feedback

- [seq 462](trajectory.jsonl#L462) **Verdict: pass** — Section 22 matches the preferred position on every material term: once per 12 months, 30 days' prior written notice, normal business hours, off-site where practicable, independent auditor bound by confidentiality, Vendor bears cost unless underpayment exceeds 5%, and an express bar on direct access to Customer systems. Walk-away triggers (unlimited/unannounced audits, remote system access) are expressly excluded; Section 22.3 adds further customer-favourable protections. Compliant status is correctly claimed: no redline and no comment were produced, and the rendered redline is identical to the original paragraphs, as expected for a compliant finding. Deterministic check (audit frequency limited) is satisfied, corroborating the rationale. Checks: {"name":"audit frequency limited","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 309](trajectory.jsonl#L309)

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

- [seq 327](trajectory.jsonl#L327) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 328](trajectory.jsonl#L328) **search result**

```json
[]
```

- [seq 329](trajectory.jsonl#L329) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 330](trajectory.jsonl#L330) **search result**

```json
[{"paragraphId":"p0106","sectionRef":"§ 27.3 If a force-majeure event materially prevents an affected Service for more than fifteen consecutive days, Customer may procure substitute services and suspend affected Fees. After thirty consecutive days, Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.","snippet":"…thirty co…
```

- [seq 363](trajectory.jsonl#L363) **drafter → search**

```json
{"query":"early termination"}
```

- [seq 364](trajectory.jsonl#L364) **search result**

```json
[]
```

- [seq 365](trajectory.jsonl#L365) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 366](trajectory.jsonl#L366) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 399](trajectory.jsonl#L399) **drafter → read_section**

```json
{"sectionId":"sec-7.2"}
```

- [seq 400](trajectory.jsonl#L400) **read_section result**

```json
{"sectionRef":"§ 7.2 Vendor shall invoice no more frequently than monthly in arrears, except that an Order Form may state annual subscription Fees are invoiced in advance. Each invoice must identify the Order Form, period, Services, quantities, applicable credits, and a valid purchase-order number if Customer supplied one. Proper undisputed invoices are due forty-five days after receipt.","paragr…
```

- [seq 401](trajectory.jsonl#L401) **drafter → read_section**

```json
{"sectionId":"sec-7.3"}
```

- [seq 402](trajectory.jsonl#L402) **read_section result**

```json
{"sectionRef":"§ 7.3 Customer may withhold a genuinely disputed amount by notifying Vendor before its due date and explaining the basis. The Parties will work promptly and in good faith to resolve the dispute. Vendor shall continue the Services while a payment dispute is pending and shall not charge interest on an amount ultimately found not due.","paragraphs":[{"id":"p0028","text":"7.3 Customer …
```

- [seq 403](trajectory.jsonl#L403) **drafter → read_section**

```json
{"sectionId":"sec-9.4"}
```

- [seq 404](trajectory.jsonl#L404) **read_section result**

```json
{"sectionRef":"§ 9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-terminatio…
```

- [seq 423](trajectory.jsonl#L423) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 424](trajectory.jsonl#L424) **search result**

```json
[]
```

- [seq 425](trajectory.jsonl#L425) **drafter → search**

```json
{"query":"remaining|remainder of the term|accelerat|shortfall|minimum fee","regex":true}
```

- [seq 426](trajectory.jsonl#L426) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 11.3 After Customer confirms successful return, Vendor shall securely delete remaining Customer Data from active systems and, as backups cycle, from backups, except for a copy required by Applicable Law. An authorized officer shall certify deletion in writing. Any retained copy remains protected and may not be used for another purpose.","snippet":"11.3 Afte…
```

- [seq 439](trajectory.jsonl#L439) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0039","p0106","p0028","p0012"],"quote":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date.","rationale":"No liquidated damages, penalty, or minimum-fee-on-termination payable by Customer appears anywhere: searches for \"liquidated damages\", \"termination fee\", \"early termination\", acceleration and shortfall language return nothing directed at Customer. Termination for convenience under § 9.4 requires Customer to pay only for conforming Services delivered through the termination date with a refund of prepaid Fees, and both § 9.4 and § 27.3 confirm termination is \"without penalty\"; § 7.3 further bars interest on amounts found not due. The only Customer-payable amounts found (§ 22.2 audit shortfall and costs following a >5% underpayment) are compensatory true-ups, not liquidated damages. This meets the preferred position of no Customer-payable liquidated damages. The take-or-pay commitment in § 2.1 is the nearest economic analogue but is a minimum-volume obligation addressed under the MINCOMMIT rule, so we do not double-flag it here.","confidence":0.86}
```

- [seq 440](trajectory.jsonl#L440) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 439](trajectory.jsonl#L439)
- Finding: `f-ld-290aa1b5` · **compliant** · confidence 0.86
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date.”
- Rationale: No liquidated damages, penalty, or minimum-fee-on-termination payable by Customer appears anywhere: searches for "liquidated damages", "termination fee", "early termination", acceleration and shortfall language return nothing directed at Customer. Termination for convenience under § 9.4 requires Customer to pay only for conforming Services delivered through the termination date with a refund of prepaid Fees, and both § 9.4 and § 27.3 confirm termination is "without penalty"; § 7.3 further bars interest on amounts found not due. The only Customer-payable amounts found (§ 22.2 audit shortfall and costs following a >5% underpayment) are compensatory true-ups, not liquidated damages. This meets the preferred position of no Customer-payable liquidated damages. The take-or-pay commitment in § 2.1 is the nearest economic analogue but is a minimum-volume obligation addressed under the MINCOMMIT rule, so we do not double-flag it here.

### Verifier and repair feedback

- [seq 484](trajectory.jsonl#L484) **Verdict: pass** — Status is 'compliant' and, as expected for a compliant finding, no redline or counterparty comment was produced — the rendered paragraphs are identical to the originals. The cited text supports the preferred position: § 9.4 limits Customer's exposure on convenience termination to Fees for conforming Services delivered plus a refund of prepaid Fees; § 27.3 confirms force-majeure termination is 'without penalty'; § 7.3 bars interest on amounts found not due. No liquidated damages, penalty, or minimum-fee-on-termination payable by Customer appears in the cited material. The take-or-pay commitment in § 2.1 is correctly identified as the nearest economic analogue but is a minimum-volume obligation properly handled under the dedicated minimum-commitment rule; the playbook's no-double-flag instruction supports not raising it again here, and the rationale flags it transparently rather than hiding it. Rationale accurately notes that the audit shortfall/true-up amounts are compensatory rather than liquidated damages, so they do not trigger the rule (which applies only when Customer pays an LD or penalty). Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 321](trajectory.jsonl#L321)

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

- [seq 343](trajectory.jsonl#L343) **drafter → read_section**

```json
{"sectionId":"sec-19.1"}
```

- [seq 344](trajectory.jsonl#L344) **read_section result**

```json
{"sectionRef":"§ 19.1 Vendor warrants that Services will be performed in a professional and workmanlike manner by qualified personnel, in accordance with industry standards, this Agreement, and each Order Form. Vendor further warrants that Services and Deliverables will materially conform to their documentation and agreed specifications.","paragraphs":[{"id":"p0075","text":"19.1 Vendor warrants t…
```

- [seq 345](trajectory.jsonl#L345) **drafter → read_section**

```json
{"sectionId":"sec-19.2"}
```

- [seq 346](trajectory.jsonl#L346) **read_section result**

```json
{"sectionRef":"§ 19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","paragraphs":[{"id":"p0076","text":"19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation."}]}
```

- [seq 347](trajectory.jsonl#L347) **drafter → read_section**

```json
{"sectionId":"sec-19.3"}
```

- [seq 348](trajectory.jsonl#L348) **read_section result**

```json
{"sectionRef":"§ 19.3 Vendor warrants the Services and Deliverables will not contain malicious code intentionally introduced by Vendor, and that Vendor will comply with Applicable Law. Vendor will not materially diminish functionality during a term or use open-source software in a way that requires disclosure or licensing of Customer source code.","paragraphs":[{"id":"p0077","text":"19.3 Vendor w…
```

- [seq 349](trajectory.jsonl#L349) **drafter → read_section**

```json
{"sectionId":"sec-19.4"}
```

- [seq 350](trajectory.jsonl#L350) **read_section result**

```json
{"sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","pa…
```

- [seq 351](trajectory.jsonl#L351) **drafter → read_section**

```json
{"sectionId":"sec-19.5"}
```

- [seq 352](trajectory.jsonl#L352) **read_section result**

```json
{"sectionRef":"§ 19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here.","paragraphs":[{"id":"p0079","text":"19.5 Except for the express warranties in this Agreement, neither Part…
```

- [seq 377](trajectory.jsonl#L377) **drafter → read_section**

```json
{"sectionId":"sec-6.1"}
```

- [seq 378](trajectory.jsonl#L378) **read_section result**

```json
{"sectionRef":"§ 6.1 Customer will have fifteen business days after delivery of a Deliverable to test it against the acceptance criteria in the applicable Order Form. Customer may accept it in writing or reject it by describing material nonconformities. Payment, productive use needed for testing, or silence does not constitute acceptance.","paragraphs":[{"id":"p0023","text":"6.1 Customer will hav…
```

- [seq 379](trajectory.jsonl#L379) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"15-day deliverable conformance warranty; extend to 90 days"}
```

- [seq 392](trajectory.jsonl#L392) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-warranty","source":"Evergreen Implementation SOW (Jun 2025)","clauseAfter":"Vendor warrants for ninety days that the Services will be professional and workmanlike, with re-performance, repair, replacement or refund as the remedy.","comment":"[Playbook] We added a meaningful performance warranty and remedy for non-conforming work.","level":"fallback"}]}
```

- [seq 419](trajectory.jsonl#L419) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend the Deliverable conformance warranty from 15 days to 90 days after acceptance and delete the cut-off of Vendor's correction/refund obligation.","comment":"[Playbook] We extended the Deliverable conformance warranty to ninety days running from acceptance and removed the language cutting off Vendor's correction and refund obligation, since a fifteen-day period expires before the fifteen-business-day acceptance window in Section 6.1 even closes. Our playbook position is 12 months for software and 90 days for deliverables/services with repair, replacement or refund; we can discuss a shorter period if it still runs from acceptance and preserves the Section 19.4 remedy.","precedentId":"seed-warranty","ops":[{"kind":"replace","paragraphId":"p0076","oldText":"For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","newText":"For ninety days after acceptance, each Deliverable will materially conform to its documentation and the specifications in the applicable Order Form, and Vendor will correct any nonconformity reported during that period in accordance with Section 19.4."}]}
```

- [seq 420](trajectory.jsonl#L420) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0076","segments":[{"type":"equal","text":"19.2 For "},{"type":"delete","text":"fifteen days after delivery"},{"type":"insert","text":"ninety days after acceptance"},{"type":"equal","text":", each Deliverable will materially conform to its documentation"},{"type":"delete","text":"; after that date Vendor has no correction or refund obligation."},…
```

- [seq 443](trajectory.jsonl#L443) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0076"],"quote":"19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","rationale":"Sections 19.1, 19.3 and the 19.4 remedy (re-performance, repair, replacement, then refund) and the 19.5 disclaimer carve-out are all sound and do not swallow the express warranties. The material failure is Section 19.2: a fifteen-day conformance period running from delivery, with an express statement that Vendor has no correction or refund obligation thereafter, falls below even the fallback of 90 days for software / 30 days for services. It is also shorter than the fifteen-business-day acceptance testing window in Section 6.1, so the warranty can lapse before Customer has finished testing, and the cut-off risks neutralising the Section 19.4 remedy for the general conformance warranty in 19.1. Redline extends the period to ninety days from acceptance and deletes the cut-off, preserving the existing 19.4 remedy.","confidence":0.86,"proposal":{"level":"preferred","summary":"Extend the Deliverable conformance warranty from 15 days to 90 days after acceptance and delete the cut-off of Vendor's correction/refund obligation.","comment":"[Playbook] We extended the Deliverable conformance warranty to ninety days running from acceptance and removed the language cutting off Vendor's correction and refund obligation, since a fifteen-day period expires before the fifteen-business-day acceptance window in Section 6.1 even closes. Our playbook position is 12 months for software and 90 days for deliverables/services with repair, replacement or refund; we can discuss a shorter period if it still runs from acceptance and preserves the Section 19.4 remedy.","precedentId":"seed-warranty","ops":[{"kind":"replace","paragraphId":"p0076","oldText":"For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","newText":"For ninety days after acceptance, each Deliverable will materially conform to its documentation and the specifications in the applicable Order Form, and Vendor will correct any nonconformity reported during that period in accordance with Section 19.4."}]}}
```

- [seq 444](trajectory.jsonl#L444) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 443](trajectory.jsonl#L443)
- Finding: `f-warranty-06b7d53f` · **deviation** · confidence 0.86
- Location: § 19.2 For fifteen days after delivery, each Deliverable will mate…
- Quote: “19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.”
- Rationale: Sections 19.1, 19.3 and the 19.4 remedy (re-performance, repair, replacement, then refund) and the 19.5 disclaimer carve-out are all sound and do not swallow the express warranties. The material failure is Section 19.2: a fifteen-day conformance period running from delivery, with an express statement that Vendor has no correction or refund obligation thereafter, falls below even the fallback of 90 days for software / 30 days for services. It is also shorter than the fifteen-business-day acceptance testing window in Section 6.1, so the warranty can lapse before Customer has finished testing, and the cut-off risks neutralising the Section 19.4 remedy for the general conformance warranty in 19.1. Redline extends the period to ninety days from acceptance and deletes the cut-off, preserving the existing 19.4 remedy.
- Proposal: **preferred** — Extend the Deliverable conformance warranty from 15 days to 90 days after acceptance and delete the cut-off of Vendor's correction/refund obligation.
- Comment: [Playbook] We extended the Deliverable conformance warranty to ninety days running from acceptance and removed the language cutting off Vendor's correction and refund obligation, since a fifteen-day period expires before the fifteen-business-day acceptance window in Section 6.1 even closes. Our playbook position is 12 months for software and 90 days for deliverables/services with repair, replacement or refund; we can discuss a shorter period if it still runs from acceptance and preserves the Section 19.4 remedy.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "For ninety days after acceptance, each Deliverable will materially conform to its documentation and the specifications in the applicable Order Form, and Vendor will correct any nonconformity reported during that period in accordance with Section 19.4.",
    "oldText": "For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.",
    "paragraphId": "p0076"
  }
]
```

### Verifier and repair feedback

- [seq 481](trajectory.jsonl#L481) **Verdict: pass** — Deviation classification is correct: a fifteen-day conformance window falls below even the fallback (90 days software / 30 days services), and the express 'no correction or refund obligation thereafter' language undercuts the Section 19.4 remedy, so this is a material failure of the fallback rather than a mere shortfall from preferred wording. The redline reaches the playbook position: period extended to ninety days, the cut-off sentence deleted, and the existing Section 19.4 remedy (re-performance, repair, replacement, refund) expressly preserved by cross-reference rather than duplicated — a proportionate rewrite of a single short clause. The failed deterministic period check is a phrasing artifact ('ninety days' spelled out rather than '90 days'); the 0.602 changed-character ratio is justified because the clause had to be rewritten to remove the obligation cut-off, and the rest of Section 19 (19.1, 19.3, 19.4, 19.5 carve-out) was correctly left untouched. Comment is accurate, concise, in our voice, cites the playbook position and offers a workable fallback (shorter period if it runs from acceptance and preserves the 19.4 remedy); the Section 6.1 acceptance-window point is a legitimate supporting argument. Minor note for the drafter: adding conformance to 'the specifications in the applicable Order Form' goes slightly beyond the rule's documentation-conformance scope and beyond the minimum edit needed; it is a small, defensible improvement but could be dropped if the counterparty pushes back, and shifting the trigger from delivery to acceptance should be flagged as a negotiable point. Checks: {"name":"operation 1 applies","ok":true}; {"name":"warranty period ≥ 90 days or expressed in months/years","ok":false}; {"name":"minimal edit p0076","ok":false,"detail":"changed-character ratio=0.602 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 357](trajectory.jsonl#L357)

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

- [seq 381](trajectory.jsonl#L381) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 382](trajectory.jsonl#L382) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0071","text":"18. INSURANCE"}]}
```

- [seq 383](trajectory.jsonl#L383) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 384](trajectory.jsonl#L384) **search result**

```json
[{"paragraphId":"p0071","sectionRef":"§ 18 INSURANCE","snippet":"18. INSURANCE"},{"paragraphId":"p0072","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000…
```

- [seq 409](trajectory.jsonl#L409) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0072","p0073"],"quote":"Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18.1 obliges Vendor (Copperleaf) to carry CGL at USD 1M per occurrence / USD 2M aggregate, E&O at USD 2M, cyber/privacy at USD 5M and workers' compensation as required by law, for the term plus one year — matching the preferred position in full (and exceeding the fallback). Section 18.2 adds certificates of insurance on request, reputable insurers, notice of cancellation, and confirms insurance does not limit Vendor's liabilities. No redline needed; all obligations run against the counterparty.","confidence":0.95}
```

- [seq 410](trajectory.jsonl#L410) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 409](trajectory.jsonl#L409)
- Finding: `f-insurance-41b18954` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18.1 obliges Vendor (Copperleaf) to carry CGL at USD 1M per occurrence / USD 2M aggregate, E&O at USD 2M, cyber/privacy at USD 5M and workers' compensation as required by law, for the term plus one year — matching the preferred position in full (and exceeding the fallback). Section 18.2 adds certificates of insurance on request, reputable insurers, notice of cancellation, and confirms insurance does not limit Vendor's liabilities. No redline needed; all obligations run against the counterparty.

### Verifier and repair feedback

- [seq 451](trajectory.jsonl#L451) **Verdict: pass** — Section 18.1 matches the preferred position in full: CGL USD 1M/2M, E&O USD 2M, cyber/privacy USD 5M, workers' compensation as required by law, for the term plus one year. Section 18.2 supplies certificates of insurance on request, satisfying the remaining preferred element; all obligations run against Vendor, so no redline is warranted. Compliant status is correctly claimed with no redline and no counterparty comment; deterministic check confirms an insurance obligation is present. Checks: {"name":"insurance obligation present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 361](trajectory.jsonl#L361)

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

- [seq 387](trajectory.jsonl#L387) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 388](trajectory.jsonl#L388) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 389](trajectory.jsonl#L389) **drafter → read_section**

```json
{"sectionId":"sec-9.4"}
```

- [seq 390](trajectory.jsonl#L390) **read_section result**

```json
{"sectionRef":"§ 9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-terminatio…
```

- [seq 413](trajectory.jsonl#L413) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 414](trajectory.jsonl#L414) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 415](trajectory.jsonl#L415) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 416](trajectory.jsonl#L416) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 447](trajectory.jsonl#L447) **drafter → lookup_precedent**

```json
{"ruleId":"MINCOMMIT","context":"Three-year USD 2M take-or-pay commitment with no reduction or termination rights; document elsewhere disclaims minimum-volume commitments"}
```

- [seq 459](trajectory.jsonl#L459) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-mincommit","source":"Bluewater Hosting Order (Aug 2025)","clauseAfter":"Customer will pay only for Services used or ordered during the applicable term.","comment":"[Playbook] We removed the take-or-pay shortfall obligation.","level":"preferred"}]}
```

- [seq 477](trajectory.jsonl#L477) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-mincommit","summary":"Remove three-year take-or-pay minimum and pay only for Services ordered or used","comment":"[Playbook] We removed the three-year USD 2,000,000 take-or-pay commitment: our playbook does not accept minimum purchase commitments, and a multi-year commitment with no reduction or termination right also conflicts with the no-minimum-volume acknowledgement in § 12.3 and the convenience right in § 9.4. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice and settled by true-up rather than penalty.","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"Customer has no minimum purchase commitment. Customer will pay only for Services used or ordered during the applicable term."}]}
```

- [seq 478](trajectory.jsonl#L478) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0012","segments":[{"type":"equal","text":"2.1 Customer "},{"type":"delete","text":"commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights"},{"type":"insert","text":"has no minimum purchase commitment. Customer will pay only for Services used or ordere…
```

- [seq 487](trajectory.jsonl#L487) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0012"],"quote":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","rationale":"Section 2.1 imposes a multi-year (three-year) USD 2,000,000 per annum take-or-pay commitment on us expressly \"without reduction or termination rights\" — squarely the rule's walk-away position and well short of the fallback (single 12-month term, reducible on 30 days' notice, true-up rather than penalty). It also conflicts with § 12.3 (Vendor acknowledges Customer has made no minimum-volume commitment), § 7.1 (no undisclosed minimum-use charge) and § 9.4 (Customer's 30-day convenience termination with refund of prepaid Fees), so the surrounding bargain is a no-minimum deal and the preferred position is proportionate. Redline replaces the take-or-pay with pay-for-what-is-used-or-ordered language, with the 12-month/true-up fallback offered in the comment.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-mincommit","summary":"Remove three-year take-or-pay minimum and pay only for Services ordered or used","comment":"[Playbook] We removed the three-year USD 2,000,000 take-or-pay commitment: our playbook does not accept minimum purchase commitments, and a multi-year commitment with no reduction or termination right also conflicts with the no-minimum-volume acknowledgement in § 12.3 and the convenience right in § 9.4. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice and settled by true-up rather than penalty.","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"Customer has no minimum purchase commitment. Customer will pay only for Services used or ordered during the applicable term."}]}}
```

- [seq 488](trajectory.jsonl#L488) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 487](trajectory.jsonl#L487)
- Finding: `f-mincommit-953097f3` · **deviation** · confidence 0.90
- Location: § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv…
- Quote: “2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: Section 2.1 imposes a multi-year (three-year) USD 2,000,000 per annum take-or-pay commitment on us expressly "without reduction or termination rights" — squarely the rule's walk-away position and well short of the fallback (single 12-month term, reducible on 30 days' notice, true-up rather than penalty). It also conflicts with § 12.3 (Vendor acknowledges Customer has made no minimum-volume commitment), § 7.1 (no undisclosed minimum-use charge) and § 9.4 (Customer's 30-day convenience termination with refund of prepaid Fees), so the surrounding bargain is a no-minimum deal and the preferred position is proportionate. Redline replaces the take-or-pay with pay-for-what-is-used-or-ordered language, with the 12-month/true-up fallback offered in the comment.
- Proposal: **preferred** — Remove three-year take-or-pay minimum and pay only for Services ordered or used
- Comment: [Playbook] We removed the three-year USD 2,000,000 take-or-pay commitment: our playbook does not accept minimum purchase commitments, and a multi-year commitment with no reduction or termination right also conflicts with the no-minimum-volume acknowledgement in § 12.3 and the convenience right in § 9.4. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice and settled by true-up rather than penalty.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer has no minimum purchase commitment. Customer will pay only for Services used or ordered during the applicable term.",
    "oldText": "Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.",
    "paragraphId": "p0012"
  }
]
```

### Verifier and repair feedback

- [seq 501](trajectory.jsonl#L501) **Verdict: pass** — Classification is correct: § 2.1 is a three-year, USD 2,000,000/year take-or-pay with no reduction or termination right, which is expressly the rule's walk-away position and fails the fallback (12-month term, 30-day reduction right, true-up rather than penalty), so a deviation finding with a redline is warranted. The redline is directionally right and actionable: it removes the take-or-pay and substitutes pay-for-usage-or-ordered-Services language, matching the preferred position, and the redline guidance expressly permits deletion as well as narrowing. The advisory minimal-edit failure (0.975 changed-character ratio) is acceptable here because the offending obligation is the entire substance of the paragraph; there is no smaller edit that removes a walk-away take-or-pay commitment. Comment is accurate, concise and in the required voice, states what changed and why, and offers the 12-month/30-day/true-up fallback as a negotiation position. Cross-references to §§ 9.4 and 12.3 are supporting context only and do not carry the finding; recommend a quick sanity check that those section numbers are quoted correctly before sending. Checks: {"name":"operation 1 applies","ok":true}; {"name":"minimal edit p0012","ok":false,"detail":"changed-character ratio=0.975 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 435](trajectory.jsonl#L435)

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

- [seq 454](trajectory.jsonl#L454) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 455](trajectory.jsonl#L455) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0044","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"}]}
```

- [seq 456](trajectory.jsonl#L456) **drafter → list_sections**

```json
{}
```

- [seq 457](trajectory.jsonl#L457) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 467](trajectory.jsonl#L467) **drafter → read_section**

```json
{"sectionId":"sec-11.1"}
```

- [seq 468](trajectory.jsonl#L468) **read_section result**

```json
{"sectionRef":"§ 11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","paragraphs":[{"id":"p0045","text":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support."}]}
```

- [seq 469](trajectory.jsonl#L469) **drafter → read_section**

```json
{"sectionId":"sec-11.2"}
```

- [seq 470](trajectory.jsonl#L470) **read_section result**

```json
{"sectionRef":"§ 11.2 Within thirty days after Customer's request, Vendor shall return all Customer Data in a complete, commonly used, documented, machine-readable format, with relationships and metadata reasonably necessary for use. Vendor shall not withhold Customer Data because of a fee dispute.","paragraphs":[{"id":"p0046","text":"11.2 Within thirty days after Customer's request, Vendor shall…
```

- [seq 471](trajectory.jsonl#L471) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Sec 11.1 requires immediate cessation of assistance and deletion of Customer Data with no export"}
```

- [seq 474](trajectory.jsonl#L474) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-transition","source":"Silverline Data Platform MSA (Dec 2025)","clauseAfter":"Vendor will return Customer Data in a machine-readable format within thirty days, provide transition assistance for up to six months and then certify deletion.","comment":"[Playbook] We added an orderly data return and transition period before deletion.","level":"preferred"}]}
```

- [seq 491](trajectory.jsonl#L491) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Replace immediate-deletion/no-assistance clause in 11.1 with up to six months of transition assistance at then-current rates, aligned with the data return and deletion mechanics in 11.2-11.3.","comment":"[Playbook] We replaced the immediate cessation of assistance and deletion of Customer Data with up to six months of transition assistance at Vendor's then-current rates, which our playbook requires and which is also needed for the export and certified-deletion mechanics in Sections 11.2 and 11.3 and the transition period referenced in Section 10.1 to work. If six months is difficult, we can accept ninety days.","precedentId":"seed-transition","ops":[{"kind":"replace","paragraphId":"p0045","oldText":"Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","newText":"Upon expiry or termination of this Agreement or an Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance, including export and migration support, for up to six months after the effective date of expiry or termination at Vendor's then-current rates. Vendor shall not delete Customer Data except in accordance with Sections 11.2 and 11.3."}]}
```

- [seq 492](trajectory.jsonl#L492) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0045","segments":[{"type":"equal","text":"11.1 "},{"type":"delete","text":"Immediately on termination Vendor shall discontinue all assistance and permanently "},{"type":"insert","text":"Upon expiry or termination of this Agreement or an Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance, incl…
```

- [seq 497](trajectory.jsonl#L497) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0045"],"quote":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","rationale":"Section 11.1 is walk-away territory: it requires immediate cessation of all assistance and permanent deletion of Customer Data with no export or migration support, so there is no transition assistance period at all (not even the 90-day fallback). It also contradicts Sections 11.2 (30-day return in a machine-readable format) and 11.3 (deletion only after confirmed return, with officer certification), and the \"agreed transition period\" contemplated by Section 10.1. Sections 11.2-11.3 already satisfy the preferred data-return and certified-deletion elements, so the minimal fix is to replace 11.1 with up to six months of transition assistance at Vendor's then-current rates and subordinate deletion to 11.2-11.3.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-transition","summary":"Replace immediate-deletion/no-assistance clause in 11.1 with up to six months of transition assistance at then-current rates, aligned with the data return and deletion mechanics in 11.2-11.3.","comment":"[Playbook] We replaced the immediate cessation of assistance and deletion of Customer Data with up to six months of transition assistance at Vendor's then-current rates, which our playbook requires and which is also needed for the export and certified-deletion mechanics in Sections 11.2 and 11.3 and the transition period referenced in Section 10.1 to work. If six months is difficult, we can accept ninety days.","ops":[{"kind":"replace","paragraphId":"p0045","oldText":"Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","newText":"Upon expiry or termination of this Agreement or an Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance, including export and migration support, for up to six months after the effective date of expiry or termination at Vendor's then-current rates. Vendor shall not delete Customer Data except in accordance with Sections 11.2 and 11.3."}]}}
```

- [seq 498](trajectory.jsonl#L498) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 497](trajectory.jsonl#L497)
- Finding: `f-transition-9e65ae1c` · **deviation** · confidence 0.90
- Location: § 11.1 Immediately on termination Vendor shall discontinue all ass…
- Quote: “11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.”
- Rationale: Section 11.1 is walk-away territory: it requires immediate cessation of all assistance and permanent deletion of Customer Data with no export or migration support, so there is no transition assistance period at all (not even the 90-day fallback). It also contradicts Sections 11.2 (30-day return in a machine-readable format) and 11.3 (deletion only after confirmed return, with officer certification), and the "agreed transition period" contemplated by Section 10.1. Sections 11.2-11.3 already satisfy the preferred data-return and certified-deletion elements, so the minimal fix is to replace 11.1 with up to six months of transition assistance at Vendor's then-current rates and subordinate deletion to 11.2-11.3.
- Proposal: **preferred** — Replace immediate-deletion/no-assistance clause in 11.1 with up to six months of transition assistance at then-current rates, aligned with the data return and deletion mechanics in 11.2-11.3.
- Comment: [Playbook] We replaced the immediate cessation of assistance and deletion of Customer Data with up to six months of transition assistance at Vendor's then-current rates, which our playbook requires and which is also needed for the export and certified-deletion mechanics in Sections 11.2 and 11.3 and the transition period referenced in Section 10.1 to work. If six months is difficult, we can accept ninety days.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Upon expiry or termination of this Agreement or an Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance, including export and migration support, for up to six months after the effective date of expiry or termination at Vendor's then-current rates. Vendor shall not delete Customer Data except in accordance with Sections 11.2 and 11.3.",
    "oldText": "Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.",
    "paragraphId": "p0045"
  }
]
```

### Verifier and repair feedback

- [seq 506](trajectory.jsonl#L506) **Verdict: pass** — Section 11.1 as drafted (immediate cessation of all assistance plus permanent deletion with no export or migration support) sits squarely in the rule's walk-away territory, so a deviation finding is correct and is not merely upgrading an acceptable fallback. The replacement text reaches the preferred position on the element that was missing (up to six months of transition assistance at Vendor's then-current rates) and sensibly subordinates deletion to the existing Sections 11.2-11.3, which already deliver the 30-day machine-readable return and certified deletion — avoiding duplicative or conflicting language. The high changed-character ratio is justified: the original sentence is entirely contrary to the playbook position and cannot be fixed by an insertion, so a whole-clause replacement is the smallest edit that reaches the position. Comment is accurate, concise, in first person plural, cites the playbook position, explains the internal contradiction with Sections 10.1/11.2/11.3, and offers the 90-day fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}; {"name":"minimal edit p0045","ok":false,"detail":"changed-character ratio=0.860 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 511](trajectory.jsonl#L511) memo LLM request
- [seq 512](trajectory.jsonl#L512) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement

**To:** Deal team 
**From:** In-house counsel (Customer side) 
**Re:** Playbook review of the Master Services Agreement — verified findings

---

## 1. Executive summary

We reviewed the Agreement against the playbook and verified 19 findings. Twelve clauses are compliant, several of them meaningfully favourable to us (IP ownership, assignment and change of control, audit, renewal, governing law, insurance, and the express confirmation in § 12.3 that we have given no exclusivity, non-compete, MFN, minimum-volume or no-hire commitment).

Seven items are deviations and, in our view, must be fixed before signature. Two are critical: there is **no Vendor indemnity anywhere in the Agreement** (§ 20 runs one way against us for "every claim"), and the liability cap in § 21.1 is **one month of Fees "actually paid", without exception**, against a USD 2,000,000 annual take-or-pay commitment. Five further deviations impose one-sided restrictions on us or strip our protections: full-term sole-supplier exclusivity (§ 2.2), a 24-month worldwide post-term non-compete (§ 12.4), a Services licence limited to Customer alone and revocable at Vendor's discretion (§ 13.1), a three-year take-or-pay with no reduction or termination rights (§ 2.1), immediate cessation of assistance and deletion of Customer Data on termination (§ 11.1), and a 15-day Deliverable warranty with an express cut-off of any correction or refund obligation (§ 19.2).

A notable feature of the draft is internal inconsistency: §§ 2.2, 12.4 and 2.1 contradict § 12.3; § 21.1's "without exception" contradicts the Excluded Claims construct in § 21.3; § 11.1 contradicts §§ 11.2–11.3 and § 10.1; and § 9.3 cross-refers to a "Section 20.5" that does not exist. Most of our redlines therefore align the drafting with terms the Vendor has already accepted elsewhere in the document.

---

## 2. Findings

| # | Severity | Rule | Status | Section | Note |
|---|---|---|---|---|---|
| 1 | Critical | INDEMN — Indemnification by Vendor | **Missing** | § 20.1 (and broken cross-reference at § 9.3) | No Vendor indemnity at all (no IP, breach of law, data breach, or gross negligence/wilful misconduct), coupled with a one-way Customer indemnity for "every claim" relating to our use of the Services. Walk-away. |
| 2 | Critical | LOL-CAP — Limitation of liability | **Deviation** | § 21.1 (cf. §§ 21.2–21.4) | Cap of one month's Fees "actually paid", "without exception", placing indemnities, confidentiality, data protection, gross negligence, wilful misconduct, fraud and IP inside the cap. Below the six-month walk-away threshold. |
| 3 | High | EXCLUSIVITY — Exclusivity binding Customer | **Deviation** | § 2.2 (cf. § 12.3) | Full-term sole and exclusive supplier obligation on us, with no category narrowing, 12-month limit or performance exit. Walk-away. |
| 4 | High | NONCOMPETE — Non-compete on Customer | **Deviation** | § 12.4 (cf. § 12.3) | 24-month post-term non-compete, undefined scope, unlimited territory, and bars acquisitions. Walk-away. |
| 5 | High | LICENSE — Licence grant scope | **Deviation** | § 13.1 (cf. §§ 13.2–13.3) | Services licence to Customer alone, expressly excluding Affiliates and contractors, and revocable at Vendor's sole discretion. Walk-away. |
| 6 | Medium | MINCOMMIT — Minimum purchase commitments | **Deviation** | § 2.1 (cf. §§ 7.1, 9.4, 12.3) | Three-year USD 2,000,000 p.a. take-or-pay "without reduction or termination rights". Walk-away. |
| 7 | Medium | TRANSITION — Transition assistance and data return | **Deviation** | § 11.1 (cf. §§ 10.1, 11.2–11.3) | Immediate discontinuation of all assistance and permanent deletion of Customer Data, with no export or migration support. Walk-away. |
| 8 | Medium | WARRANTY — Performance warranty and duration | **Deviation** | § 19.2 (cf. § 6.1, § 19.4) | 15-day conformance warranty from delivery with express cut-off of correction/refund obligations; shorter than the 15-business-day acceptance testing window. |
| 9 | Critical | IP — Ownership of deliverables and Customer Data | Compliant | §§ 14.1–14.4, 13.2, 15.1 | Meets preferred position. Minor sub-preferred points (payment condition on Deliverable ownership; no express "sublicence" wording) noted only. |
| 10 | High | ASSIGN — Assignment and change of control | Compliant | §§ 24.1–24.4, 13.3, 9.2 | Meets preferred position in full; § 24.4 blocks Vendor repricing or termination on our change of control. |
| 11 | High | LD — Liquidated damages payable by Customer | Compliant | § 9.4 (cf. §§ 7.3, 22.2, 27.3) | No Customer-payable liquidated damages or termination fee; audit shortfall is a compensatory true-up. |
| 12 | High | T4C — Termination for convenience | Compliant | § 9.4 | Preferred position: 30 days' notice, whole or partial, pro-rata refund, no Vendor convenience right during a committed term. |
| 13 | Medium | AUDIT — Audit rights against Customer | Compliant | §§ 22.1–22.3 | Meets preferred position; 5% underpayment cost-shift threshold is better than the fallback, and direct system access is barred. |
| 14 | Medium | GOVLAW — Governing law and venue | Compliant | §§ 28.1–28.3 | New York law, exclusive New York County courts, no arbitration clause. |
| 15 | Medium | MFN — Most-favoured-nation obligations | Compliant | § 12.3 (cf. §§ 7.1, 8.3) | No MFN or most-favoured-customer burden on us. |
| 16 | Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant | § 12.3 (cf. § 30.1) | No personnel restriction on us; § 12.3 expressly preserves our hiring freedom. |
| 17 | Medium | RENEWAL — Auto-renewal and notice window | Compliant | §§ 8.1–8.3 | 12-month renewals, 30-day opt-out, reminder mechanic, uplift capped at lesser of CPI and 3%. |
| 18 | Low | INSURANCE — Vendor insurance | Compliant | §§ 18.1–18.2 | Meets preferred position (CGL 1M/2M, E&O 2M, cyber 5M, term plus one year). |

---

## 3. Walk-away items

The following sit in walk-away territory under the playbook and should be treated as conditions to signature:

1. **§ 20 — no Vendor indemnity, one-way Customer indemnity.** We require the Vendor IP/misconduct indemnity, an indemnity procedure and procure/modify/replace/refund IP remedies (new §§ 20.2–20.5, which also cures the broken § 9.3 reference to "Section 20.5"), and narrowing of our indemnity to Customer-provided content and our breach of Applicable Law.
2. **§ 21.1 — one month's Fees, "without exception".** Replace with a mutual cap of the greater of 12 months' Fees paid or payable and USD 1,000,000, expressly subject to the Excluded Claims already set out in § 21.3. §§ 21.2–21.4 can stand.
3. **§ 2.2 — full-term sole-supplier exclusivity.** Make the appointment non-exclusive; § 12.3 stays as drafted.
4. **§ 12.4 — 24-month worldwide non-compete on us.** Delete.
5. **§ 13.1 — Services licence excluding Affiliates/contractors and revocable at Vendor's discretion.** Extend to Affiliates and contractors acting on our behalf and tie revocation to the notice-and-cure standard already agreed in § 13.3.
6. **§ 2.1 — three-year take-or-pay with no reduction or termination rights.** Replace with pay-for-what-is-ordered-or-used.
7. **§ 11.1 — immediate deletion, no transition support.** Replace with up to six months of transition assistance at Vendor's then-current rates, subordinated to the data return and certified deletion mechanics in §§ 11.2–11.3.

---

## 4. Next steps

1. **Issue the redline** covering the eight deviations, with playbook-based comments and the sensible fallbacks flagged in the covering note: a narrowed product/12-month exclusivity or non-compete; a 12-month reducible commitment with true-up in place of take-or-pay; 90 days' transition assistance; and a 90-day (software) / 30-day (services) warranty period.
2. **Escalate items 1 and 2 to the deal owner now.** The absence of any Vendor indemnity and a one-month liability cap are not economically survivable alongside the § 2.1 commitment, and should be raised as gating issues rather than left to a second exchange.
3. **Use the internal contradictions as leverage.** §§ 2.2, 12.4 and 2.1 conflict with § 12.3; § 21.1 conflicts with § 21.3; § 11.1 conflicts with §§ 10.1 and 11.2–11.3; § 9.3 cites a non-existent § 20.5. We should present most of our edits as conforming the draft to positions the Vendor has already accepted.
4. **Ask the Vendor to complete § 23 ("Records and Customer Assurance"),** currently a bare heading, and confirm that no further verification or inspection rights against us are intended — § 22 as drafted is acceptable and we do not want it reopened.
5. **Confirm the warranty/acceptance interlock** so the § 19.2 conformance period runs from acceptance under § 6.1, preserving the § 19.4 remedy.
6. **On close of negotiation,** re-verify that the amended § 21.1 cap, the new §§ 20.2–20.5 and the revised § 11.1 are internally consistent with §§ 9.3, 21.3 and 11.2–11.3 before execution.
```

## Apply and validation

No apply or output-validation event was recorded.
