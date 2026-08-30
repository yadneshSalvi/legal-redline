# Trajectory: synth-12

| Run | Value |
|---|---|
| Contract | synth-12 — MASTER SERVICES AGREEMENT |
| Config | final |
| Parties | Juniper Ridge Health, Inc. (our party) ↔ Cobalt Cloud Services LLC |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 4m 28.6s (268,638 ms) |
| Calls | 122 LLM · 142 tool · 0 retries |
| Tokens | 67,178 input · 67,775 output · 968,139 cache read · 197,689 cache write |
| Cost | $3.749891 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 488 | 102 | 142 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 561](trajectory.jsonl#L561) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 131](trajectory.jsonl#L131)–[seq 564](trajectory.jsonl#L564) |
| assembler | 21 | 0 | 0 | — | [seq 152](trajectory.jsonl#L152)–[seq 572](trajectory.jsonl#L572) |
| memo | 4 | 1 | 0 | — | [seq 568](trajectory.jsonl#L568)–[seq 571](trajectory.jsonl#L571) |
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
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0076","text":"21. LIMITATION OF LIABILITY"}]}
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 63](trajectory.jsonl#L63) **drafter → search**

```json
{"query":"liability","limit":30}
```

- [seq 64](trajectory.jsonl#L64) **search result**

```json
[{"paragraphId":"p0068","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber an…
```

- [seq 65](trajectory.jsonl#L65) **drafter → search**

```json
{"query":"aggregate liability"}
```

- [seq 66](trajectory.jsonl#L66) **search result**

```json
[{"paragraphId":"p0077","sectionRef":"§ 21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims."…
```

- [seq 77](trajectory.jsonl#L77) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0077","p0078","p0079","p0080"]}
```

- [seq 78](trajectory.jsonl#L78) **read_paragraphs result**

```json
[{"id":"p0077","sectionRef":"§ 21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","text":"…
```

- [seq 105](trajectory.jsonl#L105) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0077","p0078","p0079","p0080"],"quote":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","rationale":"Section 21 meets the preferred position in full. The cap is expressly mutual and set at the greater of Fees paid or payable in the twelve months preceding the event and USD 1,000,000 (§21.1); the \"Fees\" definition (§1.5) captures recurring subscription, professional services and usage fees, and with the USD 2,000,000 annual commitment in §2.1 the fees-based limb is a meaningful figure, not illusory. §21.2 is a mutual exclusion of indirect/consequential damages with a helpful carve-back confirming data restoration, replacement services, notification and incident-response costs are direct damages. §21.3 places all preferred carve-outs outside the cap (confidentiality, data-protection and security breaches, indemnification obligations, gross negligence, wilful misconduct, fraud, and infringement of the other Party's IP) with no super-cap, and confirms Customer's obligation to pay undisputed Fees is not \"damages\". §21.4 preserves liability that cannot lawfully be limited and severability of each cap. No competing or hidden cap language appears elsewhere in the document. No redline required.","confidence":0.93}
```

- [seq 106](trajectory.jsonl#L106) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 105](trajectory.jsonl#L105)
- Finding: `f-lol-cap-7df8de07` · **compliant** · confidence 0.93
- Location: § 21.1 Except for Excluded Claims, each Party's total aggregate li…
- Quote: “21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.”
- Rationale: Section 21 meets the preferred position in full. The cap is expressly mutual and set at the greater of Fees paid or payable in the twelve months preceding the event and USD 1,000,000 (§21.1); the "Fees" definition (§1.5) captures recurring subscription, professional services and usage fees, and with the USD 2,000,000 annual commitment in §2.1 the fees-based limb is a meaningful figure, not illusory. §21.2 is a mutual exclusion of indirect/consequential damages with a helpful carve-back confirming data restoration, replacement services, notification and incident-response costs are direct damages. §21.3 places all preferred carve-outs outside the cap (confidentiality, data-protection and security breaches, indemnification obligations, gross negligence, wilful misconduct, fraud, and infringement of the other Party's IP) with no super-cap, and confirms Customer's obligation to pay undisputed Fees is not "damages". §21.4 preserves liability that cannot lawfully be limited and severability of each cap. No competing or hidden cap language appears elsewhere in the document. No redline required.

### Verifier and repair feedback

- [seq 151](trajectory.jsonl#L151) **Verdict: pass** — The cited clause matches the playbook's preferred position on all material terms: mutual aggregate cap at the greater of Fees paid or payable in the preceding twelve months and USD 1,000,000 (§21.1), mutual exclusion of indirect/consequential damages (§21.2), and an 'Excluded Claims' definition that places confidentiality, data-protection/security, indemnification, gross negligence, wilful misconduct, fraud and infringement of the other Party's IP outside the cap with no super-cap (§21.3). The 'Fees' definition resolves to recurring subscription, professional services and usage fees payable under an Order Form, so the fees-based limb is not illusory; the USD 1,000,000 floor further protects Customer. §21.3 expressly confirms Customer's obligation to pay undisputed Fees is not 'damages', matching the preferred carve-out; §21.4 preserves non-limitable liability. Consistent with the compliant status, no redline or counterparty comment is proposed and the rendered text is unchanged from the original paragraphs; deterministic checks confirm a 12-month fees/fixed-floor cap and no unlimited Customer liability language. Rationale is accurate and appropriately retained as internal evidence rather than raised as a negotiation issue. Checks: {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}.

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

- [seq 31](trajectory.jsonl#L31) **drafter → list_sections**

```json
{}
```

- [seq 32](trajectory.jsonl#L32) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"indemnif","limit":50}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0074","sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or i…
```

- [seq 69](trajectory.jsonl#L69) **drafter → search**

```json
{"query":"hold harmless"}
```

- [seq 70](trajectory.jsonl#L70) **search result**

```json
[]
```

- [seq 71](trajectory.jsonl#L71) **drafter → search**

```json
{"query":"defend"}
```

- [seq 72](trajectory.jsonl#L72) **search result**

```json
[]
```

- [seq 73](trajectory.jsonl#L73) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"Missing vendor indemnity; insert new Section 20 after warranties, before limitation of liability"}
```

- [seq 92](trajectory.jsonl#L92) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-indemn-2","source":"Vertex Data Processing Addendum (Jul 2025)","clauseAfter":"Vendor shall indemnify Customer for third-party claims arising from Vendor-caused data breaches, legal violations, gross negligence or wilful misconduct.","comment":"[Playbook] We added protection for third-party claims caused by Vendor's data handling and misconduct.","level":"preferred"},{"…
```

- [seq 117](trajectory.jsonl#L117) **drafter → read_section**

```json
{"sectionId":"sec-19.5"}
```

- [seq 118](trajectory.jsonl#L118) **read_section result**

```json
{"sectionRef":"§ 19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here.","paragraphs":[{"id":"p0075","text":"19.5 Except for the express warranties in this Agreement, neither Part…
```

- [seq 137](trajectory.jsonl#L137) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert new Section 20 (Indemnification) with Vendor IP/misconduct indemnity, narrow Customer indemnity, procedure, exclusions and infringement remedies","comment":"[Playbook] The Agreement contains no indemnity article even though Sections 9.3, 21.3 and 30.5 assume one exists (9.3 cross-references \"the remedies required by Section 20.5\"), so we have added the standard Vendor indemnity for third-party IP claims, breach of law, Vendor-caused data incidents and wilful misconduct. We have kept Customer's reciprocal indemnity narrow and included the usual notice/control/cooperation procedure, customary exclusions and procure-modify-replace-refund remedies.","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"20","asHeading":true,"text":"INDEMNIFICATION"},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.1","text":"Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.2","text":"Customer shall defend and indemnify Vendor from and against any third-party claim, and resulting damages, costs, and expenses, to the extent arising out of content or materials Customer provides to Vendor or Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.3","text":"The indemnified Party shall give the indemnifying Party prompt written notice of a claim, provided that a delay relieves the indemnifying Party only to the extent it is materially prejudiced. The indemnifying Party shall control the defence with counsel reasonably acceptable to the indemnified Party, and the indemnified Party shall provide reasonable cooperation at the indemnifying Party's expense and may participate with its own counsel at its own expense. The indemnifying Party shall not settle a claim in a way that imposes liability, an admission of fault, or a non-monetary obligation on the indemnified Party without its prior written consent."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.4","text":"Vendor's obligations under Section 20.1(a) do not apply to the extent a claim arises from Customer's unauthorized modification of the Services or a Deliverable, combination of the Services or a Deliverable with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.5","text":"If a claim described in Section 20.1(a) is made or is reasonably likely, Vendor shall, at its expense, procure for Customer the right to continue using the affected item or modify or replace it with functionally equivalent non-infringing material. If neither remedy is commercially feasible, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees for the terminated period and Fees paid for the affected Deliverable."}]}
```

- [seq 138](trajectory.jsonl#L138) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0075","segments":[{"type":"equal","text":"19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here."}]}]}
```

- [seq 157](trajectory.jsonl#L157) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0075","p0079","p0115"],"quote":"“Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property.","rationale":"The Agreement has no indemnification article at all: the outline jumps from Section 19 (Warranties) to Section 21 (Limitation of Liability), and searches for \"indemnif\", \"hold harmless\" and \"defend\" return only clauses that presuppose an indemnity (Section 21.3 carving out \"indemnification obligations\" from the cap, Section 19.4 referring to \"indemnified claims\", Section 30.5 preserving \"vested indemnity rights\") plus Section 9.3's dangling cross-reference to \"the remedies required by Section 20.5\". With no Vendor IP indemnity anywhere, the document sits in walk-away territory under this rule, so we inserted a new Section 20 at the preferred position: Vendor defence/indemnity for third-party IP infringement, breach of Applicable Law, Vendor-caused Customer Data incidents and gross negligence/wilful misconduct, a narrow Customer indemnity limited to Customer-provided content and Customer's breach of law, standard notice/control/cooperation procedure, customary exclusions, and procure/modify/replace/refund remedies (which also repairs the Section 20.5 cross-reference). No super-cap is needed because Section 21.3 already treats indemnity obligations as Excluded Claims.","confidence":0.93,"proposal":{"level":"preferred","summary":"Insert new Section 20 (Indemnification) with Vendor IP/misconduct indemnity, narrow Customer indemnity, procedure, exclusions and infringement remedies","comment":"[Playbook] The Agreement contains no indemnity article even though Sections 9.3, 21.3 and 30.5 assume one exists (9.3 cross-references \"the remedies required by Section 20.5\"), so we have added the standard Vendor indemnity for third-party IP claims, breach of law, Vendor-caused data incidents and wilful misconduct. We have kept Customer's reciprocal indemnity narrow and included the usual notice/control/cooperation procedure, customary exclusions and procure-modify-replace-refund remedies.","precedentId":"seed-indemn-1","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"20","asHeading":true,"text":"INDEMNIFICATION"},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.1","text":"Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.2","text":"Customer shall defend and indemnify Vendor from and against any third-party claim, and resulting damages, costs, and expenses, to the extent arising out of content or materials Customer provides to Vendor or Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.3","text":"The indemnified Party shall give the indemnifying Party prompt written notice of a claim, provided that a delay relieves the indemnifying Party only to the extent it is materially prejudiced. The indemnifying Party shall control the defence with counsel reasonably acceptable to the indemnified Party, and the indemnified Party shall provide reasonable cooperation at the indemnifying Party's expense and may participate with its own counsel at its own expense. The indemnifying Party shall not settle a claim in a way that imposes liability, an admission of fault, or a non-monetary obligation on the indemnified Party without its prior written consent."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.4","text":"Vendor's obligations under Section 20.1(a) do not apply to the extent a claim arises from Customer's unauthorized modification of the Services or a Deliverable, combination of the Services or a Deliverable with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.5","text":"If a claim described in Section 20.1(a) is made or is reasonably likely, Vendor shall, at its expense, procure for Customer the right to continue using the affected item or modify or replace it with functionally equivalent non-infringing material. If neither remedy is commercially feasible, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees for the terminated period and Fees paid for the affected Deliverable."}]}}
```

- [seq 158](trajectory.jsonl#L158) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 187](trajectory.jsonl#L187) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0075","p0079","p0115"],"quote":"“Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property.","rationale":"The Agreement has no indemnification article at all: the outline jumps from Section 19 (Warranties) to Section 21 (Limitation of Liability), and searches for \"indemnif\", \"hold harmless\" and \"defend\" return only clauses that presuppose an indemnity (Section 21.3 carving out \"indemnification obligations\" from the cap, Section 19.4 referring to \"indemnified claims\", Section 30.5 preserving \"vested indemnity rights\") plus Section 9.3's dangling cross-reference to \"the remedies required by Section 20.5\". With no Vendor IP indemnity anywhere, the document sits in walk-away territory under this rule, so we inserted a new Section 20 at the preferred position: Vendor defence/indemnity for third-party IP infringement, breach of Applicable Law, Vendor-caused Customer Data incidents and gross negligence/wilful misconduct, a narrow Customer indemnity limited to Customer-provided content and Customer's breach of law, standard notice/control/cooperation procedure, customary exclusions, and procure/modify/replace/refund remedies (which also repairs the Section 20.5 cross-reference). No super-cap is needed because Section 21.3 already treats indemnity obligations as Excluded Claims.","confidence":0.93,"proposal":{"level":"preferred","summary":"Insert new Section 20 (Indemnification) with Vendor IP/misconduct indemnity, narrow Customer indemnity, procedure, exclusions and infringement remedies","comment":"[Playbook] The Agreement contains no indemnity article even though Sections 9.3, 21.3 and 30.5 assume one exists (9.3 cross-references \"the remedies required by Section 20.5\"), so we have added the standard Vendor indemnity for third-party IP claims, breach of law, Vendor-caused data incidents and wilful misconduct. We have kept Customer's reciprocal indemnity narrow and included the usual notice/control/cooperation procedure, customary exclusions and procure-modify-replace-refund remedies.","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"20","asHeading":true,"text":"INDEMNIFICATION"},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.1","text":"Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.2","text":"Customer shall defend and indemnify Vendor from and against any third-party claim, and resulting damages, costs, and expenses, to the extent arising out of content or materials Customer provides to Vendor or Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.3","text":"The indemnified Party shall give the indemnifying Party prompt written notice of a claim, provided that a delay relieves the indemnifying Party only to the extent it is materially prejudiced. The indemnifying Party shall control the defence with counsel reasonably acceptable to the indemnified Party, and the indemnified Party shall provide reasonable cooperation at the indemnifying Party's expense and may participate with its own counsel at its own expense. The indemnifying Party shall not settle a claim in a way that imposes liability, an admission of fault, or a non-monetary obligation on the indemnified Party without its prior written consent."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.4","text":"Vendor's obligations under Section 20.1(a) do not apply to the extent a claim arises from Customer's unauthorized modification of the Services or a Deliverable, combination of the Services or a Deliverable with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0075","numbering":"20.5","text":"If a claim described in Section 20.1(a) is made or is reasonably likely, Vendor shall, at its expense, procure for Customer the right to continue using the affected item or modify or replace it with functionally equivalent non-infringing material. If neither remedy is commercially feasible, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees for the terminated period and Fees paid for the affected Deliverable."}]}}
```

- [seq 188](trajectory.jsonl#L188) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 187](trajectory.jsonl#L187)
- Finding: `f-indemn-6da73272` · **missing** · confidence 0.93
- Location: § 19.5 Except for the express warranties in this Agreement, neithe…
- Quote: ““Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property.”
- Rationale: The Agreement has no indemnification article at all: the outline jumps from Section 19 (Warranties) to Section 21 (Limitation of Liability), and searches for "indemnif", "hold harmless" and "defend" return only clauses that presuppose an indemnity (Section 21.3 carving out "indemnification obligations" from the cap, Section 19.4 referring to "indemnified claims", Section 30.5 preserving "vested indemnity rights") plus Section 9.3's dangling cross-reference to "the remedies required by Section 20.5". With no Vendor IP indemnity anywhere, the document sits in walk-away territory under this rule, so we inserted a new Section 20 at the preferred position: Vendor defence/indemnity for third-party IP infringement, breach of Applicable Law, Vendor-caused Customer Data incidents and gross negligence/wilful misconduct, a narrow Customer indemnity limited to Customer-provided content and Customer's breach of law, standard notice/control/cooperation procedure, customary exclusions, and procure/modify/replace/refund remedies (which also repairs the Section 20.5 cross-reference). No super-cap is needed because Section 21.3 already treats indemnity obligations as Excluded Claims.
- Proposal: **preferred** — Insert new Section 20 (Indemnification) with Vendor IP/misconduct indemnity, narrow Customer indemnity, procedure, exclusions and infringement remedies
- Comment: [Playbook] The Agreement contains no indemnity article even though Sections 9.3, 21.3 and 30.5 assume one exists (9.3 cross-references "the remedies required by Section 20.5"), so we have added the standard Vendor indemnity for third-party IP claims, breach of law, Vendor-caused data incidents and wilful misconduct. We have kept Customer's reciprocal indemnity narrow and included the usual notice/control/cooperation procedure, customary exclusions and procure-modify-replace-refund remedies.
- Proposed ops:

```json
[
  {
    "asHeading": true,
    "kind": "insert_after",
    "numbering": "20",
    "paragraphId": "p0075",
    "text": "INDEMNIFICATION"
  },
  {
    "kind": "insert_after",
    "numbering": "20.1",
    "paragraphId": "p0075",
    "text": "Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services, Deliverables, or Vendor Technology infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."
  },
  {
    "kind": "insert_after",
    "numbering": "20.2",
    "paragraphId": "p0075",
    "text": "Customer shall defend and indemnify Vendor from and against any third-party claim, and resulting damages, costs, and expenses, to the extent arising out of content or materials Customer provides to Vendor or Customer's breach of Applicable Law."
  },
  {
    "kind": "insert_after",
    "numbering": "20.3",
    "paragraphId": "p0075",
    "text": "The indemnified Party shall give the indemnifying Party prompt written notice of a claim, provided that a delay relieves the indemnifying Party only to the extent it is materially prejudiced. The indemnifying Party shall control the defence with counsel reasonably acceptable to the indemnified Party, and the indemnified Party shall provide reasonable cooperation at the indemnifying Party's expense and may participate with its own counsel at its own expense. The indemnifying Party shall not settle a claim in a way that imposes liability, an admission of fault, or a non-monetary obligation on the indemnified Party without its prior written consent."
  },
  {
    "kind": "insert_after",
    "numbering": "20.4",
    "paragraphId": "p0075",
    "text": "Vendor's obligations under Section 20.1(a) do not apply to the extent a claim arises from Customer's unauthorized modification of the Services or a Deliverable, combination of the Services or a Deliverable with items not supplied or recommended by Vendor where the claim would not have arisen absent the combination, or Vendor's compliance with Customer's written specifications."
  },
  {
    "kind": "insert_after",
    "numbering": "20.5",
    "paragraphId": "p0075",
    "text": "If a claim described in Section 20.1(a) is made or is reasonably likely, Vendor shall, at its expense, procure for Customer the right to continue using the affected item or modify or replace it with functionally equivalent non-infringing material. If neither remedy is commercially feasible, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees for the terminated period and Fees paid for the affected Deliverable."
  }
]
```

### Verifier and repair feedback

- [seq 233](trajectory.jsonl#L233) **Verdict: pass** — The cited paragraphs and cross-references (21.3 carving out 'indemnification obligations', 30.5 preserving 'vested indemnity rights', and the dangling reference to 'Section 20.5') corroborate that the operative indemnity article is absent, which is walk-away territory under INDEMN, so a 'missing' classification with an inserted clause is correct. The inserted text is placed exactly where the redline guidance directs (immediately after the warranty section, in the gap between Sections 19 and 21) and tracks the model language: Vendor defence/indemnity for third-party IP infringement, breach of Applicable Law, Vendor-caused Customer Data incidents, and gross negligence/wilful misconduct. The proposal reaches the preferred position without over-reaching: Customer's reciprocal indemnity is narrowed to Customer-provided content and Customer's breach of law, and standard notice/control/cooperation, customary exclusions (modification, combination, Customer specifications) and procure/modify/replace/refund remedies are included. Omitting a super-cap is justified because Section 21.3 already treats indemnification obligations as Excluded Claims outside the liability cap, which is more favourable to us than the fallback. Comment is accurate, concise, in the required voice, correctly cites the internal cross-references that show the gap, and does not misstate the contract. Minor (non-blocking) drafting nits to fix on execution: the inserted paragraphs render without the 20.1–20.5 numbering that their internal cross-references ('Section 20.1(a)', and the Section 9.3 reference to 'Section 20.5') rely on, and 'Vendor Technology'/'Deliverables' should be confirmed as defined terms in the Agreement. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"operation 5 applies","ok":true}; {"name":"operation 6 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":true}.

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

- [seq 43](trajectory.jsonl#L43) **drafter → read_section**

```json
{"sectionId":"sec-12.4-2"}
```

- [seq 44](trajectory.jsonl#L44) **read_section result**

```json
{"sectionRef":"§ 12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.","paragraphs":[{"id":"p0046","text":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in …
```

- [seq 45](trajectory.jsonl#L45) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 46](trajectory.jsonl#L46) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 75](trajectory.jsonl#L75) **drafter → lookup_precedent**

```json
{"ruleId":"NONCOMPETE","context":"24-month post-term non-compete binding Customer, conflicts with express no-restriction clause"}
```

- [seq 86](trajectory.jsonl#L86) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-noncompete","source":"Nimbus Platform MSA (Jan 2025)","clauseAfter":"","comment":"[Playbook] We cannot restrict our business or internal development activities.","level":"preferred"}]}
```

- [seq 87](trajectory.jsonl#L87) **drafter → search**

```json
{"query":"compete"}
```

- [seq 88](trajectory.jsonl#L88) **search result**

```json
[{"paragraphId":"p0044","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 101](trajectory.jsonl#L101) **drafter → propose_redline**

```json
{"ops":[{"kind":"delete_paragraph","paragraphId":"p0046"}],"comment":"[Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, which confirms we have made no non-compete commitment. If you need protection for a specific product, we can discuss a narrow restriction limited to a named competing product during the term only, with carve-outs for internal development and acquisitions.","level":"preferred","summary":"Delete the 24-month, all-territory non-compete binding Customer in § 12.4.","precedentId":"seed-noncompete"}
```

- [seq 102](trajectory.jsonl#L102) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0046","segments":[{"type":"delete","text":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory."}]}]}
```

- [seq 127](trajectory.jsonl#L127) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0046","p0044"],"quote":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.","rationale":"§ 12.4 binds us (Customer) with a post-term non-compete of twenty-four months, covering any product or service that \"competes with Vendor\" in any territory. That is walk-away territory on two counts: a post-term restriction longer than 12 months, and undefined scope with no field, product or territory limits and no carve-out for internal development or acquisitions (indeed \"acquire\" is expressly prohibited). It therefore fails the fallback, which would permit only a named competing product, during the term, capped at 12 months, with internal-development and acquisition carve-outs. It also flatly contradicts § 12.3, in which Vendor acknowledges that Customer \"has made no exclusivity, non-compete... commitment.\" Preferred position is no restriction at all, so we delete § 12.4; § 12.3 already covers the point, and we offer the narrowed fallback in the comment if Vendor identifies a specific product needing protection.","confidence":0.95,"proposal":{"ops":[{"kind":"delete_paragraph","paragraphId":"p0046"}],"comment":"[Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, which confirms we have made no non-compete commitment. If you need protection for a specific product, we can discuss a narrow restriction limited to a named competing product during the term only, with carve-outs for internal development and acquisitions.","level":"preferred","precedentId":"seed-noncompete","summary":"Delete the 24-month, all-territory non-compete binding Customer in § 12.4."}}
```

- [seq 128](trajectory.jsonl#L128) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 127](trajectory.jsonl#L127)
- Finding: `f-noncompete-00a4a55e` · **deviation** · confidence 0.95
- Location: § 12.4 During the term and for twenty-four months thereafter, Cust…
- Quote: “12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.”
- Rationale: § 12.4 binds us (Customer) with a post-term non-compete of twenty-four months, covering any product or service that "competes with Vendor" in any territory. That is walk-away territory on two counts: a post-term restriction longer than 12 months, and undefined scope with no field, product or territory limits and no carve-out for internal development or acquisitions (indeed "acquire" is expressly prohibited). It therefore fails the fallback, which would permit only a named competing product, during the term, capped at 12 months, with internal-development and acquisition carve-outs. It also flatly contradicts § 12.3, in which Vendor acknowledges that Customer "has made no exclusivity, non-compete... commitment." Preferred position is no restriction at all, so we delete § 12.4; § 12.3 already covers the point, and we offer the narrowed fallback in the comment if Vendor identifies a specific product needing protection.
- Proposal: **preferred** — Delete the 24-month, all-territory non-compete binding Customer in § 12.4.
- Comment: [Playbook] We cannot accept any restriction on the businesses we operate or the products we develop, buy or sell, so we have deleted § 12.4; it also directly contradicts § 12.3, which confirms we have made no non-compete commitment. If you need protection for a specific product, we can discuss a narrow restriction limited to a named competing product during the term only, with carve-outs for internal development and acquisitions.
- Proposed ops:

```json
[
  {
    "kind": "delete_paragraph",
    "paragraphId": "p0046"
  }
]
```

### Verifier and repair feedback

- [seq 167](trajectory.jsonl#L167) **Verdict: pass** — § 12.4 binds Customer with a 24-month post-term non-compete of undefined scope ('competes with Vendor in any territory') and expressly bars acquisitions — squarely in the rule's walk-away band and failing the fallback on duration, scope and carve-outs, so 'deviation' is correctly classified. The redline deletes p0046 in full, which is the preferred position (no restriction on Customer) and the smallest edit that reaches it; § 12.3 already preserves Customer's freedom to operate, so no replacement language is needed. Comment is accurate, concise and in the required voice: it explains the deletion, cites the contradiction with § 12.3, and offers the narrowed fallback (named product, term only, development/acquisition carve-outs) without lecturing. Deterministic checks confirm the operation applies and no open-ended compete restriction on Customer remains after the edit. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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

- [seq 13](trajectory.jsonl#L13) **drafter → read_section**

```json
{"sectionId":"sec-7.2"}
```

- [seq 14](trajectory.jsonl#L14) **read_section result**

```json
{"sectionRef":"§ 7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","paragraphs":[{"id":"p0026","text":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives."}]}
```

- [seq 15](trajectory.jsonl#L15) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 16](trajectory.jsonl#L16) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 49](trajectory.jsonl#L49) **drafter → search**

```json
{"query":"exclusive","limit":20}
```

- [seq 50](trajectory.jsonl#L50) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ 13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer. Customer may permit Authorized Users to exer…
```

- [seq 51](trajectory.jsonl#L51) **drafter → search**

```json
{"query":"third party provider procure requirements","limit":20}
```

- [seq 52](trajectory.jsonl#L52) **search result**

```json
[]
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"7.1","limit":10}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[{"paragraphId":"p0025","sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","snippet":"7.1 Customer shall pay the Fees stated in each Order F…
```

- [seq 109](trajectory.jsonl#L109) **drafter → search**

```json
{"query":"7.2","limit":10}
```

- [seq 110](trajectory.jsonl#L110) **search result**

```json
[{"paragraphId":"p0026","sectionRef":"§ 7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","snippet":"7.2 Before engaging another provider, Customer must disclose and match for Vendor a…"},{"paragraphId":"p0027","sectionRef":"§ 7.2 Vendor shall invoice no more frequently than monthly in arrears, except that an Order…
```

- [seq 111](trajectory.jsonl#L111) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Customer must disclose and match any more favourable offer before engaging another provider"}
```

- [seq 124](trajectory.jsonl#L124) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-exclusive","source":"Atlas Procurement Agreement (Apr 2025)","clauseAfter":"Supplier will be a non-exclusive provider of hosting services.","comment":"[Playbook] We retained flexibility to source services from other suppliers.","level":"preferred"}]}
```

- [seq 141](trajectory.jsonl#L141) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-exclusive","summary":"Delete the disclose-and-match precondition on Customer engaging another provider","comment":"[Playbook] We have deleted the requirement to disclose and match third-party offers before engaging another provider, as it operates as a de facto exclusivity/right of first refusal on our sourcing for the full term with no performance-based exit. Our playbook position is that Vendor is a non-exclusive provider, consistent with Section 12.3.","ops":[{"kind":"delete_paragraph","paragraphId":"p0026"}]}
```

- [seq 142](trajectory.jsonl#L142) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0026","segments":[{"type":"delete","text":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives."}]}]}
```

- [seq 163](trajectory.jsonl#L163) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0026","p0044"],"quote":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","rationale":"Section 7.2 (the first of two clauses numbered 7.2) conditions Customer's engagement of any other provider on disclosing and matching for Vendor any more favourable offer it receives. That is a de facto right of first refusal and functions as an exclusivity restraint on our freedom to source: it is unlimited in product category, unlimited in duration (the full term), and has no automatic exit on Vendor's failure to meet service levels or delivery dates, so it fails the fallback and sits in walk-away territory. It also directly contradicts Section 12.3, in which Vendor acknowledges Customer has made no exclusivity or most-favoured-customer commitment. The only other \"exclusive\" references (§§ 13.1, 14.2, 19.4, 21.4, 28.1-28.2, 30.2) concern licence scope, remedies, and jurisdiction, not exclusive dealing. Smallest edit to reach the preferred position is deletion of p0026; the substantive payment-terms 7.2 (p0027) is unaffected. Flagged here as a restrictive covenant on sourcing rather than as an MFN pricing term.","confidence":0.86,"proposal":{"level":"preferred","precedentId":"seed-exclusive","summary":"Delete the disclose-and-match precondition on Customer engaging another provider","comment":"[Playbook] We have deleted the requirement to disclose and match third-party offers before engaging another provider, as it operates as a de facto exclusivity/right of first refusal on our sourcing for the full term with no performance-based exit. Our playbook position is that Vendor is a non-exclusive provider, consistent with Section 12.3.","ops":[{"kind":"delete_paragraph","paragraphId":"p0026"}]}}
```

- [seq 164](trajectory.jsonl#L164) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 163](trajectory.jsonl#L163)
- Finding: `f-exclusivity-f8a3982b` · **deviation** · confidence 0.86
- Location: § 7.2 Before engaging another provider, Customer must disclose an…
- Quote: “7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.”
- Rationale: Section 7.2 (the first of two clauses numbered 7.2) conditions Customer's engagement of any other provider on disclosing and matching for Vendor any more favourable offer it receives. That is a de facto right of first refusal and functions as an exclusivity restraint on our freedom to source: it is unlimited in product category, unlimited in duration (the full term), and has no automatic exit on Vendor's failure to meet service levels or delivery dates, so it fails the fallback and sits in walk-away territory. It also directly contradicts Section 12.3, in which Vendor acknowledges Customer has made no exclusivity or most-favoured-customer commitment. The only other "exclusive" references (§§ 13.1, 14.2, 19.4, 21.4, 28.1-28.2, 30.2) concern licence scope, remedies, and jurisdiction, not exclusive dealing. Smallest edit to reach the preferred position is deletion of p0026; the substantive payment-terms 7.2 (p0027) is unaffected. Flagged here as a restrictive covenant on sourcing rather than as an MFN pricing term.
- Proposal: **preferred** — Delete the disclose-and-match precondition on Customer engaging another provider
- Comment: [Playbook] We have deleted the requirement to disclose and match third-party offers before engaging another provider, as it operates as a de facto exclusivity/right of first refusal on our sourcing for the full term with no performance-based exit. Our playbook position is that Vendor is a non-exclusive provider, consistent with Section 12.3.
- Proposed ops:

```json
[
  {
    "kind": "delete_paragraph",
    "paragraphId": "p0026"
  }
]
```

### Verifier and repair feedback

- [seq 217](trajectory.jsonl#L217) **Verdict: pass** — The cited clause (p0026, first §7.2) imposes a disclose-and-match obligation before Customer may engage another provider, which operates as a right of first refusal / de facto restraint on our freedom to source; it is unlimited as to product category and duration and has no performance-based exit, so it fails the EXCLUSIVITY fallback and is correctly classified as a deviation rather than an acceptable fallback. Redline is the smallest edit that reaches the preferred position — full deletion of the offending sentence — and leaves the unrelated payment-terms §7.2 (p0027) untouched; deterministic checks confirm no residual sole-supplier/requirements obligation on Customer. Comment is accurate, correctly scoped and appropriately toned: it states what was removed, why it is an exclusivity restraint, and anchors on §12.3's express no-exclusivity acknowledgement. Double-flagging is adequately addressed: the rationale explains the clause is raised as a sourcing restraint rather than an MFN pricing term, and confirms the other 'exclusive' references (licence scope, remedies, jurisdiction) are not exclusive dealing. Note only: §12.3 already disclaims any exclusivity commitment, so the practical risk is contradiction/ambiguity rather than a clean exclusive-dealing covenant — deletion remains the right fix, but the effective severity is somewhat mitigated. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}.

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

- [seq 25](trajectory.jsonl#L25) **drafter → read_section**

```json
{"sectionId":"sec-7.2"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","paragraphs":[{"id":"p0026","text":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives."}]}
```

- [seq 27](trajectory.jsonl#L27) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 28](trajectory.jsonl#L28) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"most favourable"}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[]
```

- [seq 57](trajectory.jsonl#L57) **drafter → lookup_precedent**

```json
{"ruleId":"MFN","context":"Customer must disclose and match third-party offers for Vendor's benefit; delete obligation"}
```

- [seq 84](trajectory.jsonl#L84) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-mfn","source":"Cedar Marketplace Agreement (May 2025)","clauseAfter":"","comment":"[Playbook] We removed the open-ended obligation to match terms offered to third parties.","level":"preferred"}]}
```

- [seq 95](trajectory.jsonl#L95) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 96](trajectory.jsonl#L96) **search result**

```json
[{"paragraphId":"p0026","sectionRef":"§ 7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","snippet":"…engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives."}]
```

- [seq 97](trajectory.jsonl#L97) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0025","p0026","p0027"]}
```

- [seq 98](trajectory.jsonl#L98) **read_paragraphs result**

```json
[{"id":"p0025","sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","text":"7.1 Customer shall pay the Fees stated in each Order Form. Fees ar…
```

- [seq 121](trajectory.jsonl#L121) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete the MFN/right-to-match obligation imposed on Customer in § 7.2.","comment":"[Playbook] We deleted the requirement that we disclose and match third-party offers for Vendor's benefit: our playbook does not accept MFN obligations running against us, and this open-ended matching right also conflicts with § 12.3, where Vendor acknowledges we have given no most-favoured-customer commitment. MFN pricing in our favour remains welcome.","precedentId":"seed-mfn","ops":[{"kind":"delete_paragraph","paragraphId":"p0026"}]}
```

- [seq 122](trajectory.jsonl#L122) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0026","segments":[{"type":"delete","text":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives."}]}]}
```

- [seq 145](trajectory.jsonl#L145) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0026","p0044"],"quote":"7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.","rationale":"§ 7.2 imposes the MFN on us, not on Vendor: we must disclose and match for Vendor any more favourable commercial offer we receive, with no product limitation, no time limit and no comparability carve-outs. That is the rule's walk-away case (open-ended obligation to extend better third-party terms to Vendor) and falls well short of the fallback (defined product, 12 months, reasonable-comparison carve-outs). It also contradicts § 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. No Vendor-granted MFN exists in the document, so nothing beneficial to us is affected; the minimal fix is deletion of § 7.2, reaching the preferred position.","confidence":0.93,"proposal":{"ops":[{"kind":"delete_paragraph","paragraphId":"p0026"}],"comment":"[Playbook] We deleted the requirement that we disclose and match third-party offers for Vendor's benefit: our playbook does not accept MFN obligations running against us, and this open-ended matching right also conflicts with § 12.3, where Vendor acknowledges we have given no most-favoured-customer commitment. MFN pricing in our favour remains welcome.","level":"preferred","precedentId":"seed-mfn","summary":"Delete the MFN/right-to-match obligation imposed on Customer in § 7.2."}}
```

- [seq 146](trajectory.jsonl#L146) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 163](trajectory.jsonl#L163)
- Finding: `f-mfn-aa0c1dbb` · **deviation** · confidence 0.93
- Location: § 7.2 Before engaging another provider, Customer must disclose an…
- Quote: “7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.”
- Rationale: § 7.2 imposes the MFN on us, not on Vendor: we must disclose and match for Vendor any more favourable commercial offer we receive, with no product limitation, no time limit and no comparability carve-outs. That is the rule's walk-away case (open-ended obligation to extend better third-party terms to Vendor) and falls well short of the fallback (defined product, 12 months, reasonable-comparison carve-outs). It also contradicts § 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. No Vendor-granted MFN exists in the document, so nothing beneficial to us is affected; the minimal fix is deletion of § 7.2, reaching the preferred position.
- Proposal: **preferred** — Delete the MFN/right-to-match obligation imposed on Customer in § 7.2.
- Comment: [Playbook] We deleted the requirement that we disclose and match third-party offers for Vendor's benefit: our playbook does not accept MFN obligations running against us, and this open-ended matching right also conflicts with § 12.3, where Vendor acknowledges we have given no most-favoured-customer commitment. MFN pricing in our favour remains welcome.
- Proposed ops:

```json
[
  {
    "kind": "delete_paragraph",
    "paragraphId": "p0026"
  }
]
```

### Verifier and repair feedback

- [seq 181](trajectory.jsonl#L181) **Verdict: pass** — § 7.2 imposes an open-ended obligation on Customer to disclose and match any more favourable third-party offer for Vendor's benefit — squarely the rule's walk-away case and far short of the fallback (defined product, 12-month term, comparability carve-outs), so 'deviation' is correctly classified. No Vendor-granted MFN exists in the cited text, so full deletion of p0026 removes only the burden on us and is the minimal edit reaching the preferred position, consistent with the redline guidance ('delete the obligation on Customer; keep any Vendor-granted MFN'). The redline is valid and self-consistent: the paragraph is removed entirely with no dangling references, and § 12.3 independently confirms no most-favoured-customer commitment was intended, so deletion improves internal consistency. The comment is accurate, concise, in first person plural with the required [Playbook] prefix, states what changed and why, cites the playbook position, and notes MFN in our favour remains welcome; deterministic check passed. Checks: {"name":"operation 1 applies","ok":true}.

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

- [seq 37](trajectory.jsonl#L37) **drafter → read_section**

```json
{"sectionId":"sec-12.4"}
```

- [seq 38](trajectory.jsonl#L38) **read_section result**

```json
{"sectionRef":"§ 12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.","paragraphs":[{"id":"p0045","text":"12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies."}]}
```

- [seq 39](trajectory.jsonl#L39) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 40](trajectory.jsonl#L40) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 59](trajectory.jsonl#L59) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 60](trajectory.jsonl#L60) **search result**

```json
[{"paragraphId":"p0045","sectionRef":"§ 12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.","snippet":"12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months …"}]
```

- [seq 61](trajectory.jsonl#L61) **drafter → lookup_precedent**

```json
{"ruleId":"NOSOLICIT","context":"One-way 24-month no-hire on Customer covering all Vendor employees; conflicting no-commitment clause"}
```

- [seq 90](trajectory.jsonl#L90) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-nosolicit","source":"Harbor Consulting SOW (Aug 2025)","clauseAfter":"Neither party shall directly solicit personnel involved in the Services for twelve months; general advertising and unsolicited approaches are excluded.","comment":"[Playbook] We made this mutual, limited it to involved personnel and added customary carve-outs.","level":"fallback"}]}
```

- [seq 113](trajectory.jsonl#L113) **drafter → propose_redline**

```json
{"level":"fallback","precedentId":"seed-nosolicit","summary":"Narrow one-way 24-month no-hire to a mutual 12-month non-solicit of involved personnel with customary carve-outs","comment":"[Playbook] We cannot accept a one-way no-hire covering every Vendor employee for 24 months, particularly as § 12.3 confirms we have given no no-hire commitment; we have made the restriction mutual, limited it to personnel directly involved in the Services for 12 months, and added the customary general-advertising and unsolicited-approach carve-outs.","ops":[{"kind":"replace","paragraphId":"p0045","oldText":"12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.","newText":"12.4 Neither party shall directly solicit for employment any personnel of the other party who are directly involved in performing or receiving the Services, for twelve months following the end of that individual's involvement in the Services. This restriction does not apply to general advertisements or other recruitment efforts not specifically targeted at the other party's personnel, or to unsolicited approaches by an individual, and neither party is restricted from hiring or engaging any person who responds to such general recruitment or approaches the other party on an unsolicited basis."}]}
```

- [seq 114](trajectory.jsonl#L114) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0045","segments":[{"type":"equal","text":"12.4 "},{"type":"delete","text":"Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies"},{"type":"insert","text":"Neither party shall directly solicit for employment any personnel of the other party who …
```

- [seq 133](trajectory.jsonl#L133) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0045","p0044"],"quote":"12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.","rationale":"§ 12.4 binds only the Customer and is squarely in walk-away territory: it is a no-hire (not merely a non-solicit), runs 24 months post-term, covers any Vendor employee rather than only personnel involved in the Services, and expressly negates any general-advertising or unsolicited-approach carve-out (\"regardless of how the employee applies\"). It also conflicts with § 12.3, in which Vendor acknowledges that Customer has made no no-hire commitment. Per the redline guidance we narrowed it to the fallback with minimal edits: mutual, limited to personnel directly involved in the Services, 12 months from the end of that involvement, with general-advertisement and unsolicited-approach carve-outs and the no-hire deleted.","confidence":0.92,"proposal":{"level":"fallback","precedentId":"seed-nosolicit","summary":"Narrow one-way 24-month no-hire to a mutual 12-month non-solicit of involved personnel with customary carve-outs","comment":"[Playbook] We cannot accept a one-way no-hire covering every Vendor employee for 24 months, particularly as § 12.3 confirms we have given no no-hire commitment; we have made the restriction mutual, limited it to personnel directly involved in the Services for 12 months, and added the customary general-advertising and unsolicited-approach carve-outs.","ops":[{"kind":"replace","paragraphId":"p0045","oldText":"12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.","newText":"12.4 Neither party shall directly solicit for employment any personnel of the other party who are directly involved in performing or receiving the Services, for twelve months following the end of that individual's involvement in the Services. This restriction does not apply to general advertisements or other recruitment efforts not specifically targeted at the other party's personnel, or to unsolicited approaches by an individual, and neither party is restricted from hiring or engaging any person who responds to such general recruitment or approaches the other party on an unsolicited basis."}]}}
```

- [seq 134](trajectory.jsonl#L134) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 133](trajectory.jsonl#L133)
- Finding: `f-nosolicit-b5a8fdcb` · **deviation** · confidence 0.92
- Location: § 12.4 Customer shall not solicit, hire, or employ any Vendor empl…
- Quote: “12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.”
- Rationale: § 12.4 binds only the Customer and is squarely in walk-away territory: it is a no-hire (not merely a non-solicit), runs 24 months post-term, covers any Vendor employee rather than only personnel involved in the Services, and expressly negates any general-advertising or unsolicited-approach carve-out ("regardless of how the employee applies"). It also conflicts with § 12.3, in which Vendor acknowledges that Customer has made no no-hire commitment. Per the redline guidance we narrowed it to the fallback with minimal edits: mutual, limited to personnel directly involved in the Services, 12 months from the end of that involvement, with general-advertisement and unsolicited-approach carve-outs and the no-hire deleted.
- Proposal: **fallback** — Narrow one-way 24-month no-hire to a mutual 12-month non-solicit of involved personnel with customary carve-outs
- Comment: [Playbook] We cannot accept a one-way no-hire covering every Vendor employee for 24 months, particularly as § 12.3 confirms we have given no no-hire commitment; we have made the restriction mutual, limited it to personnel directly involved in the Services for 12 months, and added the customary general-advertising and unsolicited-approach carve-outs.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "12.4 Neither party shall directly solicit for employment any personnel of the other party who are directly involved in performing or receiving the Services, for twelve months following the end of that individual's involvement in the Services. This restriction does not apply to general advertisements or other recruitment efforts not specifically targeted at the other party's personnel, or to unsolicited approaches by an individual, and neither party is restricted from hiring or engaging any person who responds to such general recruitment or approaches the other party on an unsolicited basis.",
    "oldText": "12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.",
    "paragraphId": "p0045"
  }
]
```

### Verifier and repair feedback

- [seq 177](trajectory.jsonl#L177) **Verdict: pass** — Classification is correct: § 12.4 is a one-way no-hire ('solicit, hire, or employ') covering any Vendor employee for 24 months post-term and expressly negating a general-advertising/unsolicited-approach carve-out ('regardless of how the employee applies'), which fails the fallback on every material term and sits in walk-away territory. The redline reaches the fallback precisely: mutual, limited to personnel directly involved in performing or receiving the Services, 12 months from the end of that involvement, general-advertisement and unsolicited-approach carve-outs added, and the 'hire, or employ' no-hire language deleted. The failed minimal-edit heuristic (0.851 changed-character ratio) is acceptable here — the original clause was one-way, over-broad and anti-carve-out, so no smaller edit could reach the fallback; the rewrite adds nothing beyond what the rule requires. Comment is accurate, correctly scoped, uses the required prefix and tone, and the cross-reference to § 12.3 (Vendor's acknowledgement that Customer gave no no-hire commitment) is supported by the cited text. No double-flagging or counterparty-favourable over-reach: the drafted clause is mutual rather than one-sided in our favour, and the restriction does not exceed the playbook's accepted fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"non-solicit duration ≤ 12 months","ok":true,"detail":"value=12"}; {"name":"general-solicitation carve-out present","ok":true}; {"name":"minimal edit p0045","ok":false,"detail":"changed-character ratio=0.851 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 153](trajectory.jsonl#L153)

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

- [seq 171](trajectory.jsonl#L171) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 172](trajectory.jsonl#L172) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0035","text":"9. TERMINATION"}]}
```

- [seq 173](trajectory.jsonl#L173) **drafter → list_sections**

```json
{}
```

- [seq 174](trajectory.jsonl#L174) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 197](trajectory.jsonl#L197) **drafter → search**

```json
{"query":"convenience"}
```

- [seq 198](trajectory.jsonl#L198) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ 1.6 “Order Form” means a written ordering document signed by authorized representatives of both Parties that references this Agreement and describes the Services, Deliverables, subscription quantities, service levels, Fees, and term purchased by Customer. A purchase order is an administrative convenience only and does not amend an Order Form or this Agreeme…
```

- [seq 199](trajectory.jsonl#L199) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 200](trajectory.jsonl#L200) **search result**

```json
[{"paragraphId":"p0023","sectionRef":"§ 6.2 If Customer rejects a Deliverable, Vendor shall promptly correct the nonconformities at no additional charge and resubmit it for a new acceptance period. After two unsuccessful correction cycles, Customer may terminate the affected Order Form and receive a refund of Fees paid for the rejected Deliverable and dependent Services Customer cannot reasonably…
```

- [seq 225](trajectory.jsonl#L225) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"No customer termination for convenience in 3-year take-or-pay MSA"}
```

- [seq 258](trajectory.jsonl#L258) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-t4c","source":"Pioneer Services MSA (Mar 2025)","clauseAfter":"Customer may terminate an Order for convenience on thirty days' notice and will receive a pro-rata refund of prepaid fees.","comment":"[Playbook] We added a practical convenience exit and refund for unused prepaid services.","level":"preferred"}]}
```

- [seq 259](trajectory.jsonl#L259) **drafter → search**

```json
{"query":"take-or-pay basis, without reduction or termination rights"}
```

- [seq 260](trajectory.jsonl#L260) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","snippet":"…urchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]
```

- [seq 291](trajectory.jsonl#L291) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Customer termination for convenience on 30 days' notice with pro-rata refund; conform take-or-pay language","comment":"[Playbook] We added a customer right to terminate for convenience on thirty days' notice with a pro-rata refund of prepaid Fees, since the Agreement runs three years with no exit other than for cause. We also conformed Section 2.1 so the take-or-pay commitment does not override that right; if helpful we can discuss a longer notice period as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0038","numbering":"9.4","text":"Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, without penalty or early-termination fee, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination. Vendor has no right to terminate this Agreement or any Order Form for convenience during a term."},{"kind":"replace","paragraphId":"p0012","oldText":"on a take-or-pay basis, without reduction or termination rights.","newText":"on a take-or-pay basis, subject to Customer's reduction and termination rights under this Agreement, including Section 9.4."}],"precedentId":"seed-t4c"}
```

- [seq 292](trajectory.jsonl#L292) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0038","segments":[{"type":"equal","text":"9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.…
```

- [seq 307](trajectory.jsonl#L307) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0035","p0036","p0037","p0038","p0039","p0012","p0032"],"quote":"Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","rationale":"Section 9 provides only cause-based termination rights (material breach 9.1, insolvency 9.2, security/SLA/law/IP 9.3) and Section 9.5 scoping; the only other exits are event-driven (6.2 failed acceptance, 19.4 warranty, 27.3 force majeure). There is no Customer termination-for-convenience right anywhere, and Section 2.1 expressly denies reduction or termination rights across a three-year term (Section 8.1). Under the detection guidance, the absence of any Customer convenience right in a term longer than 12 months is a deviation (missing behaviour) and sits in walk-away territory. We inserted the preferred 30-day convenience right with a pro-rata refund of prepaid Fees, expressly denied Vendor a mid-term convenience right, and conformed Section 2.1 so the take-or-pay commitment does not negate the new right.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-t4c","summary":"Add Customer termination for convenience on 30 days' notice with pro-rata refund; conform take-or-pay language","comment":"[Playbook] We added a customer right to terminate for convenience on thirty days' notice with a pro-rata refund of prepaid Fees, since the Agreement runs three years with no exit other than for cause. We also conformed Section 2.1 so the take-or-pay commitment does not override that right; if helpful we can discuss a longer notice period as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0038","numbering":"9.4","text":"Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, without penalty or early-termination fee, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination. Vendor has no right to terminate this Agreement or any Order Form for convenience during a term."},{"kind":"replace","paragraphId":"p0012","oldText":"on a take-or-pay basis, without reduction or termination rights.","newText":"on a take-or-pay basis, subject to Customer's reduction and termination rights under this Agreement, including Section 9.4."}]}}
```

- [seq 308](trajectory.jsonl#L308) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 307](trajectory.jsonl#L307)
- Finding: `f-t4c-07c3acc0` · **missing** · confidence 0.90
- Location: § 9 TERMINATION
- Quote: “Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: Section 9 provides only cause-based termination rights (material breach 9.1, insolvency 9.2, security/SLA/law/IP 9.3) and Section 9.5 scoping; the only other exits are event-driven (6.2 failed acceptance, 19.4 warranty, 27.3 force majeure). There is no Customer termination-for-convenience right anywhere, and Section 2.1 expressly denies reduction or termination rights across a three-year term (Section 8.1). Under the detection guidance, the absence of any Customer convenience right in a term longer than 12 months is a deviation (missing behaviour) and sits in walk-away territory. We inserted the preferred 30-day convenience right with a pro-rata refund of prepaid Fees, expressly denied Vendor a mid-term convenience right, and conformed Section 2.1 so the take-or-pay commitment does not negate the new right.
- Proposal: **preferred** — Add Customer termination for convenience on 30 days' notice with pro-rata refund; conform take-or-pay language
- Comment: [Playbook] We added a customer right to terminate for convenience on thirty days' notice with a pro-rata refund of prepaid Fees, since the Agreement runs three years with no exit other than for cause. We also conformed Section 2.1 so the take-or-pay commitment does not override that right; if helpful we can discuss a longer notice period as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "9.4",
    "paragraphId": "p0038",
    "text": "Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, without penalty or early-termination fee, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination. Vendor has no right to terminate this Agreement or any Order Form for convenience during a term."
  },
  {
    "kind": "replace",
    "newText": "on a take-or-pay basis, subject to Customer's reduction and termination rights under this Agreement, including Section 9.4.",
    "oldText": "on a take-or-pay basis, without reduction or termination rights.",
    "paragraphId": "p0012"
  }
]
```

### Verifier and repair feedback

- [seq 355](trajectory.jsonl#L355) **Verdict: pass** — Status is correct: Section 9 grants only cause- and event-based exits (9.1 breach, 9.2 insolvency, 9.3 security/SLA/law/IP), so a three-year term (8.1) with no Customer convenience right sits in the rule's walk-away zone — properly classified as missing behaviour rather than an acceptable fallback. The inserted language tracks the model clause and reaches the preferred position (30 days' notice, refund of prepaid Fees for the post-termination period, no penalty) and also forecloses a Vendor mid-term convenience right, as the redline guidance directs. The conforming edit to Section 2.1 is necessary, not scope creep: the original 'without reduction or termination rights' would otherwise negate the new right, and the edit preserves the take-or-pay commitment itself (no double-flagging of the volume commitment). Comment is accurate, in the required voice and prefix, explains the change and the three-year no-exit rationale, and offers the longer-notice fallback. Minor, non-fatal: the inserted paragraph is unnumbered while amended Section 2.1 cross-refers to 'Section 9.4' — worth labelling the new clause 9.4 (the original numbering skips 9.4) to avoid a dangling reference. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"Customer convenience termination present","ok":true}; {"name":"minimal edit p0012","ok":true,"detail":"changed-character ratio=0.561 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 169](trajectory.jsonl#L169)

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

- [seq 191](trajectory.jsonl#L191) **drafter → read_section**

```json
{"sectionId":"sec-8.2"}
```

- [seq 192](trajectory.jsonl#L192) **read_section result**

```json
{"sectionRef":"§ 8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is…
```

- [seq 193](trajectory.jsonl#L193) **drafter → read_section**

```json
{"sectionId":"sec-8.3"}
```

- [seq 194](trajectory.jsonl#L194) **read_section result**

```json
{"sectionRef":"§ 8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urban Consumers during the preceding twelve months and three percent. Vendor must give at least ninety days' written notice of an increase. No increase applies to prepaid periods.","paragraphs":[{"id":"p0034","text":"8.3 On renewal, Vendor may in…
```

- [seq 221](trajectory.jsonl#L221) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0033","p0034"],"quote":"8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.","rationale":"§ 8.2 provides automatic renewal for successive twelve-month (not multi-year) terms that we may exit on only thirty days' written notice, plus a Vendor reminder at least sixty days before renewal and an extension of our opt-out deadline if the reminder is missed — all four elements of the preferred position. § 8.3 caps renewal uplift at the lesser of CPI and three percent, with ninety days' notice and no increase on prepaid periods, which is the preferred cap or better. The reminder mechanic and uplift cap run in our favour, so no redline is warranted.","confidence":0.95}
```

- [seq 222](trajectory.jsonl#L222) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 221](trajectory.jsonl#L221)
- Finding: `f-renewal-efa4e44f` · **compliant** · confidence 0.95
- Location: § 8.2 Each Order Form has the initial term stated in it and there…
- Quote: “8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.”
- Rationale: § 8.2 provides automatic renewal for successive twelve-month (not multi-year) terms that we may exit on only thirty days' written notice, plus a Vendor reminder at least sixty days before renewal and an extension of our opt-out deadline if the reminder is missed — all four elements of the preferred position. § 8.3 caps renewal uplift at the lesser of CPI and three percent, with ninety days' notice and no increase on prepaid periods, which is the preferred cap or better. The reminder mechanic and uplift cap run in our favour, so no redline is warranted.

### Verifier and repair feedback

- [seq 287](trajectory.jsonl#L287) **Verdict: pass** — Cited §8.2 matches the preferred position: 12-month (not multi-year) automatic renewals, 30-day Customer opt-out notice, and a Vendor reminder 60 days before renewal (plus a deadline extension if the reminder is missed, which favours us). §8.3 caps renewal uplift at the lesser of CPI and 3%, equal to the preferred cap, with 90 days' notice and no uplift on prepaid periods. Deterministic check confirms notice window of 30 days, within the preferred ≤30-day threshold. Compliant status is correctly claimed: no redline or comment was proposed, and none is warranted; rationale accurately describes the clause. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 179](trajectory.jsonl#L179)

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

- [seq 203](trajectory.jsonl#L203) **drafter → read_section**

```json
{"sectionId":"sec-28"}
```

- [seq 204](trajectory.jsonl#L204) **read_section result**

```json
{"sectionRef":"§ 28 GOVERNING LAW AND DISPUTE RESOLUTION","paragraphs":[{"id":"p0102","text":"28. GOVERNING LAW AND DISPUTE RESOLUTION"}]}
```

- [seq 205](trajectory.jsonl#L205) **drafter → list_sections**

```json
{}
```

- [seq 206](trajectory.jsonl#L206) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 227](trajectory.jsonl#L227) **drafter → read_section**

```json
{"sectionId":"sec-28.1"}
```

- [seq 228](trajectory.jsonl#L228) **read_section result**

```json
{"sectionRef":"§ 28.1 This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.","paragraphs":[{"id":"p0103","text":"28.1 This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction."}]}
```

- [seq 229](trajectory.jsonl#L229) **drafter → read_section**

```json
{"sectionId":"sec-28.2"}
```

- [seq 230](trajectory.jsonl#L230) **read_section result**

```json
{"sectionRef":"§ 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum. Nothing prevents a Party from seeking temporary injunctive relief in another court with jurisdiction to protect confidential information or intellectual proper…
```

- [seq 263](trajectory.jsonl#L263) **drafter → lookup_precedent**

```json
{"ruleId":"GOVLAW","context":"Singapore law and exclusive Singapore courts conflict with New York County venue clause"}
```

- [seq 294](trajectory.jsonl#L294) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-govlaw","source":"Orbit Analytics MSA (Oct 2025)","clauseAfter":"This Agreement is governed by New York law, with exclusive jurisdiction in the state and federal courts in New York County.","comment":"[Playbook] We moved governing law and venue to our accepted New York position.","level":"preferred"}]}
```

- [seq 319](trajectory.jsonl#L319) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Replace Singapore law/venue in 28.1 with New York law, consistent with the New York County venue in 28.2","comment":"[Playbook] We replaced Singapore law and exclusive Singapore jurisdiction with New York law, which is our standard position and removes the conflict with the New York County venue already agreed in Section 28.2. Delaware, California, or England and Wales law with the courts of London would also work for us.","precedentId":"seed-govlaw","ops":[{"kind":"replace","paragraphId":"p0103","oldText":"This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.","newText":"This Agreement is governed exclusively by the laws of the State of New York, and the state and federal courts located in New York County, New York have exclusive jurisdiction."}]}
```

- [seq 320](trajectory.jsonl#L320) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0103","segments":[{"type":"equal","text":"28.1 This Agreement is governed exclusively by "},{"type":"delete","text":"Singapore law, and the courts of Singapore "},{"type":"insert","text":"the laws of the State of New York, and the state and federal courts located in New York County, New York "},{"type":"equal","text":"have exclusive jurisdiction…
```

- [seq 339](trajectory.jsonl#L339) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0103","p0104"],"quote":"This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.","rationale":"Section 28.1 imposes Singapore governing law and exclusive Singapore jurisdiction — outside the accepted list (New York, Delaware, California, England and Wales) and effectively an exclusive foreign venue, which is walk-away territory. It also directly conflicts with Section 28.2, which gives exclusive jurisdiction to the state and federal courts in New York County. The minimal fix aligns 28.1 with the preferred New York law/New York County venue pairing, leaving 28.2 and the pre-suit escalation in 28.3 intact.","confidence":0.93,"proposal":{"level":"preferred","summary":"Replace Singapore law/venue in 28.1 with New York law, consistent with the New York County venue in 28.2","comment":"[Playbook] We replaced Singapore law and exclusive Singapore jurisdiction with New York law, which is our standard position and removes the conflict with the New York County venue already agreed in Section 28.2. Delaware, California, or England and Wales law with the courts of London would also work for us.","precedentId":"seed-govlaw","ops":[{"kind":"replace","paragraphId":"p0103","oldText":"This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.","newText":"This Agreement is governed exclusively by the laws of the State of New York, and the state and federal courts located in New York County, New York have exclusive jurisdiction."}]}}
```

- [seq 340](trajectory.jsonl#L340) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 339](trajectory.jsonl#L339)
- Finding: `f-govlaw-a859aa45` · **deviation** · confidence 0.93
- Location: § 28.1 This Agreement is governed exclusively by Singapore law, an…
- Quote: “This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.”
- Rationale: Section 28.1 imposes Singapore governing law and exclusive Singapore jurisdiction — outside the accepted list (New York, Delaware, California, England and Wales) and effectively an exclusive foreign venue, which is walk-away territory. It also directly conflicts with Section 28.2, which gives exclusive jurisdiction to the state and federal courts in New York County. The minimal fix aligns 28.1 with the preferred New York law/New York County venue pairing, leaving 28.2 and the pre-suit escalation in 28.3 intact.
- Proposal: **preferred** — Replace Singapore law/venue in 28.1 with New York law, consistent with the New York County venue in 28.2
- Comment: [Playbook] We replaced Singapore law and exclusive Singapore jurisdiction with New York law, which is our standard position and removes the conflict with the New York County venue already agreed in Section 28.2. Delaware, California, or England and Wales law with the courts of London would also work for us.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "This Agreement is governed exclusively by the laws of the State of New York, and the state and federal courts located in New York County, New York have exclusive jurisdiction.",
    "oldText": "This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.",
    "paragraphId": "p0103"
  }
]
```

### Verifier and repair feedback

- [seq 391](trajectory.jsonl#L391) **Verdict: pass** — Section 28.1 selects Singapore law with exclusive Singapore courts, which is outside the accepted set (NY/DE/CA/E&W) and is an exclusive foreign venue — correctly classified as a deviation (walk-away territory), not a fallback. The redline changes only the jurisdiction words and forum, substituting New York law and exclusive jurisdiction of the state and federal courts in New York County, which matches the preferred position exactly and preserves the sentence structure; the ~0.49 changed-character ratio is inherent to replacing a governing-law/venue sentence. The edit is actionable and also resolves the internal conflict with Section 28.2 (New York County exclusive jurisdiction), leaving 28.2 and the escalation provision untouched. The comment is accurate, concise, in first person plural with the [Playbook] prefix, states what changed and why, and offers the Delaware/California/England and Wales fallback without lecturing. Checks: {"name":"operation 1 applies","ok":true}; {"name":"governing law within the accepted set","ok":true}; {"name":"minimal edit p0103","ok":true,"detail":"changed-character ratio=0.491 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 209](trajectory.jsonl#L209) **drafter → read_section**

```json
{"sectionId":"sec-24"}
```

- [seq 210](trajectory.jsonl#L210) **read_section result**

```json
{"sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","paragraphs":[{"id":"p0086","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"}]}
```

- [seq 211](trajectory.jsonl#L211) **drafter → read_section**

```json
{"sectionId":"sec-24.1"}
```

- [seq 212](trajectory.jsonl#L212) **read_section result**

```json
{"sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Customer shall give prompt written notice, and the assignee shall assume the applicable obligations.","paragraphs":[{"id":"p0087","text":…
```

- [seq 237](trajectory.jsonl#L237) **drafter → read_section**

```json
{"sectionId":"sec-24.2"}
```

- [seq 238](trajectory.jsonl#L238) **read_section result**

```json
{"sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and financial standing. Vendor may never assign to a direct Customer competitor without Customer's consent.","paragraphs":[{"id":"p0088","text":"24.2 Vendor …
```

- [seq 239](trajectory.jsonl#L239) **drafter → read_section**

```json
{"sectionId":"sec-24.3"}
```

- [seq 240](trajectory.jsonl#L240) **read_section result**

```json
{"sectionRef":"§ 24.3 For other assignments, neither Party may assign without the other's prior written consent, not to be unreasonably withheld, conditioned, or delayed. A permitted assignment does not relieve accrued obligations. An attempted assignment contrary to this Section is void to the extent permitted by law.","paragraphs":[{"id":"p0089","text":"24.3 For other assignments, neither Party…
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_section**

```json
{"sectionId":"sec-24.4"}
```

- [seq 242](trajectory.jsonl#L242) **read_section result**

```json
{"sectionRef":"§ 24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service. Vendor shall cooperate with reasonable administrative changes needed to reflect a permitted successor.","paragraphs":[{"id":"p0090","text":"24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees,…
```

- [seq 243](trajectory.jsonl#L243) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 244](trajectory.jsonl#L244) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0050","text":"13.3 Customer may transfer its l…
```

- [seq 265](trajectory.jsonl#L265) **drafter → search**

```json
{"query":"change of control","limit":20}
```

- [seq 266](trajectory.jsonl#L266) **search result**

```json
[{"paragraphId":"p0086","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0088","sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and fina…
```

- [seq 267](trajectory.jsonl#L267) **drafter → search**

```json
{"query":"assign","limit":25}
```

- [seq 268](trajectory.jsonl#L268) **search result**

```json
[{"paragraphId":"p0037","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 297](trajectory.jsonl#L297) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0087","p0088","p0089","p0090"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets our preferred position in full: § 24.1 lets us assign to an Affiliate or M&A successor without Vendor consent (notice only); § 24.2 bars Vendor assignment, delegation of material performance, or transfer by change of control without our consent (reasonableness-qualified) and never to a direct competitor; § 24.3 applies a mutual not-unreasonably-withheld standard to other assignments; and § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control. Section 13.3 aligns licence transfers with permitted assignments. A document-wide search for \"change of control\" and \"assign\" found no hidden Vendor exit or re-pricing right; § 9.2 is a standard insolvency trigger and expressly excludes lawful reorganizations. No redline needed.","confidence":0.93}
```

- [seq 298](trajectory.jsonl#L298) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 297](trajectory.jsonl#L297)
- Finding: `f-assign-329c36c9` · **compliant** · confidence 0.93
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets our preferred position in full: § 24.1 lets us assign to an Affiliate or M&A successor without Vendor consent (notice only); § 24.2 bars Vendor assignment, delegation of material performance, or transfer by change of control without our consent (reasonableness-qualified) and never to a direct competitor; § 24.3 applies a mutual not-unreasonably-withheld standard to other assignments; and § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control. Section 13.3 aligns licence transfers with permitted assignments. A document-wide search for "change of control" and "assign" found no hidden Vendor exit or re-pricing right; § 9.2 is a standard insolvency trigger and expressly excludes lawful reorganizations. No redline needed.

### Verifier and repair feedback

- [seq 347](trajectory.jsonl#L347) **Verdict: pass** — Compliant classification is supported by the cited text: § 24.1 gives Customer an unrestricted affiliate/M&A successor carve-out subject only to notice, § 24.2 restricts Vendor assignment (including by change of control) with a reasonableness-qualified consent standard plus a competitor bar, § 24.3 applies a mutual not-unreasonably-withheld standard, and § 24.4 expressly negates any Vendor termination, suspension, repricing, acceleration or service-reduction right on Customer's change of control — i.e., the preferred position in full. No redline or counterparty comment is proposed, which is correct for a compliant finding; the rendered text is identical to the original paragraphs and the deterministic check confirms the successor/affiliate carve-out. Only immaterial nuance (§ 24.2 permits competitor assignment with Customer consent rather than an absolute bar) — properly a rationale note, not a deviation, and it does not fail the fallback. Checks: {"name":"successor/affiliate carve-out for Customer present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 219](trajectory.jsonl#L219)

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

- [seq 247](trajectory.jsonl#L247) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 248](trajectory.jsonl#L248) **read_section result**

```json
{"sectionRef":"§ 14 INTELLECTUAL PROPERTY AND DELIVERABLES","paragraphs":[{"id":"p0052","text":"14. INTELLECTUAL PROPERTY AND DELIVERABLES"}]}
```

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-14.1"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer.","paragraphs":[{"i…
```

- [seq 251](trajectory.jsonl#L251) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 252](trajectory.jsonl#L252) **read_section result**

```json
{"sectionRef":"§ 14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","paragraphs":[{"id":"p0054","text":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only duri…
```

- [seq 253](trajectory.jsonl#L253) **drafter → read_section**

```json
{"sectionId":"sec-14.3"}
```

- [seq 254](trajectory.jsonl#L254) **read_section result**

```json
{"sectionRef":"§ 14.3 Vendor retains Vendor Technology. To the extent Vendor Technology is incorporated in or required to use a Deliverable, the perpetual licence in Section 13.2 applies. Vendor shall identify material Vendor Technology in a Deliverable before delivery and may not incorporate third-party material that materially restricts Customer's intended use without written approval.","paragr…
```

- [seq 277](trajectory.jsonl#L277) **drafter → read_section**

```json
{"sectionId":"sec-14.4"}
```

- [seq 278](trajectory.jsonl#L278) **read_section result**

```json
{"sectionRef":"§ 14.4 No jointly owned intellectual property is created unless the Parties sign a separate instrument identifying it and their exploitation rights. Feedback is voluntary; Vendor may use generalized suggestions without identifying Customer or disclosing Customer Confidential Information, and Customer retains the unrestricted right to use its own feedback.","paragraphs":[{"id":"p005…
```

- [seq 279](trajectory.jsonl#L279) **drafter → get_definition**

```json
{"term":"Deliverable"}
```

- [seq 280](trajectory.jsonl#L280) **get_definition result**

```json
{"found":true,"term":"Deliverable","paragraphId":"p0006","text":"1.4 “Deliverable” means each report, configuration, integration, specification, design, workflow, training material, and other work product that an Order Form identifies as being created specifically for Customer. Deliverables exclude Vendor Technology and generally applicable ideas, methods, skills, and know-how retained in the una…
```

- [seq 281](trajectory.jsonl#L281) **drafter → search**

```json
{"query":"13.2"}
```

- [seq 282](trajectory.jsonl#L282) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for …
```

- [seq 283](trajectory.jsonl#L283) **drafter → read_section**

```json
{"sectionId":"sec-15.1"}
```

- [seq 284](trajectory.jsonl#L284) **read_section result**

```json
{"sectionRef":"§ 15.1 Vendor shall process Customer Data only on Customer's documented instructions, to provide the Services, and as permitted by this Agreement. Vendor shall not sell Customer Data, use it for advertising, combine it with another customer's identifiable data, or train a generally available model on it without Customer's express written consent.","paragraphs":[{"id":"p0058","text"…
```

- [seq 311](trajectory.jsonl#L311) **drafter → lookup_precedent**

```json
{"ruleId":"IP","context":"Vendor owns Deliverables with revocable term licence; reverse assignment to Customer"}
```

- [seq 326](trajectory.jsonl#L326) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-ip","source":"Copper Design Services SOW (Nov 2025)","clauseAfter":"Customer owns the Deliverables and Customer Data; Vendor retains pre-existing materials and grants Customer a perpetual, irrevocable licence to embedded materials.","comment":"[Playbook] We aligned ownership with the work and data we fund while preserving Vendor's background IP.","level":"preferred"}]}
```

- [seq 351](trajectory.jsonl#L351) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0054","oldText":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","newText":"14.2 Customer exclusively owns every Deliverable created for Customer, and Vendor hereby irrevocably assigns to Customer all right, title, and interest in and to each Deliverable upon its creation. Vendor retains its pre-existing intellectual property and Vendor Technology in accordance with Section 14.3."}],"comment":"[Playbook] We own the work product we commission, so we have reversed the assignment in 14.2 to Customer while leaving Vendor's pre-existing IP and Vendor Technology untouched under 14.3. A revocable, term-limited licence to Deliverables we pay for is not something we can accept; if Vendor must retain title, we would need a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense the Deliverables for our business.","level":"preferred","precedentId":"seed-ip","summary":"Reverse Deliverable ownership to Customer with Vendor assignment; Vendor keeps background IP under 14.3."}
```

- [seq 352](trajectory.jsonl#L352) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0054","segments":[{"type":"equal","text":"14.2 "},{"type":"delete","text":"Vendor"},{"type":"insert","text":"Customer"},{"type":"equal","text":" exclusively owns every Deliverable created for Customer"},{"type":"delete","text":". Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form te…
```

- [seq 377](trajectory.jsonl#L377) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0054"],"quote":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","rationale":"Customer Data and Customer pre-existing IP are properly protected (14.1, 15.1), no joint ownership is created (14.4), and Vendor Technology embedded in Deliverables carries the perpetual, irrevocable, royalty-free licence in 13.2. However, 14.2 gives Vendor exclusive ownership of every Deliverable — bespoke work product created and paid for by Customer under 1.4 — with only a revocable, non-transferable licence limited to the Order Form term. That fails both the preferred position (Customer ownership with Vendor assignment) and the fallback, which requires a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables; 13.2's perpetual licence reaches only Vendor Technology, not the Deliverables themselves. Redline reverses the assignment to Customer while expressly preserving Vendor's background IP and Vendor Technology under 14.3.","confidence":0.9,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0054","oldText":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","newText":"14.2 Customer exclusively owns every Deliverable created for Customer, and Vendor hereby irrevocably assigns to Customer all right, title, and interest in and to each Deliverable upon its creation. Vendor retains its pre-existing intellectual property and Vendor Technology in accordance with Section 14.3."}],"comment":"[Playbook] We own the work product we commission, so we have reversed the assignment in 14.2 to Customer while leaving Vendor's pre-existing IP and Vendor Technology untouched under 14.3. A revocable, term-limited licence to Deliverables we pay for is not something we can accept; if Vendor must retain title, we would need a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense the Deliverables for our business.","level":"preferred","precedentId":"seed-ip","summary":"Reverse Deliverable ownership to Customer with Vendor assignment; Vendor keeps background IP under 14.3."}}
```

- [seq 378](trajectory.jsonl#L378) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 377](trajectory.jsonl#L377)
- Finding: `f-ip-4c5e622c` · **deviation** · confidence 0.90
- Location: § 14.2 Vendor exclusively owns every Deliverable created for Custo…
- Quote: “14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.”
- Rationale: Customer Data and Customer pre-existing IP are properly protected (14.1, 15.1), no joint ownership is created (14.4), and Vendor Technology embedded in Deliverables carries the perpetual, irrevocable, royalty-free licence in 13.2. However, 14.2 gives Vendor exclusive ownership of every Deliverable — bespoke work product created and paid for by Customer under 1.4 — with only a revocable, non-transferable licence limited to the Order Form term. That fails both the preferred position (Customer ownership with Vendor assignment) and the fallback, which requires a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables; 13.2's perpetual licence reaches only Vendor Technology, not the Deliverables themselves. Redline reverses the assignment to Customer while expressly preserving Vendor's background IP and Vendor Technology under 14.3.
- Proposal: **preferred** — Reverse Deliverable ownership to Customer with Vendor assignment; Vendor keeps background IP under 14.3.
- Comment: [Playbook] We own the work product we commission, so we have reversed the assignment in 14.2 to Customer while leaving Vendor's pre-existing IP and Vendor Technology untouched under 14.3. A revocable, term-limited licence to Deliverables we pay for is not something we can accept; if Vendor must retain title, we would need a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense the Deliverables for our business.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "14.2 Customer exclusively owns every Deliverable created for Customer, and Vendor hereby irrevocably assigns to Customer all right, title, and interest in and to each Deliverable upon its creation. Vendor retains its pre-existing intellectual property and Vendor Technology in accordance with Section 14.3.",
    "oldText": "14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.",
    "paragraphId": "p0054"
  }
]
```

### Verifier and repair feedback

- [seq 433](trajectory.jsonl#L433) **Verdict: pass** — Deviation classification is correct: 14.2 vests exclusive ownership of bespoke Deliverables in Vendor and gives Customer only a revocable, non-transferable licence limited to the Order Form term, which fails both the preferred position (Customer ownership with Vendor assignment) and the fallback (perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense). Redline is actionable and directionally right: it reverses the assignment to Customer, adds a present assignment of right, title and interest on creation, and expressly preserves Vendor's pre-existing IP and Vendor Technology via the cross-reference to 14.3, so no Customer IP/Data is assigned to Vendor and no joint ownership is created. The advisory changed-character ratio (0.72) is justified here — reversing the direction of an ownership grant and removing the revocable term-limited licence cannot be done with a smaller edit; the surrounding sections (13.2 licence-back, 14.1/15.1 Customer Data and Customer IP, 14.4 no joint ownership) are correctly left alone. Comment is accurate, concise, in the required voice and prefix, states what changed and why, and offers the fallback (perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense) if Vendor must retain title. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"minimal edit p0054","ok":false,"detail":"changed-character ratio=0.722 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 271](trajectory.jsonl#L271) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 272](trajectory.jsonl#L272) **read_section result**

```json
{"sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","paragraphs":[{"id":"p0047","text":"13. ACCESS RIGHTS AND LICENCE"}]}
```

- [seq 273](trajectory.jsonl#L273) **drafter → list_sections**

```json
{}
```

- [seq 274](trajectory.jsonl#L274) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 301](trajectory.jsonl#L301) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 302](trajectory.jsonl#L302) **read_section result**

```json
{"sectionRef":"§ 14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","paragraphs":[{"id":"p0054","text":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only duri…
```

- [seq 303](trajectory.jsonl#L303) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 304](trajectory.jsonl#L304) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0050","text":"13.3 Customer may transfer its l…
```

- [seq 305](trajectory.jsonl#L305) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Deliverable licence revocable, non-transferable, term-limited; need perpetual irrevocable licence covering Affiliates and contractors, transferable to successor"}
```

- [seq 322](trajectory.jsonl#L322) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-license","source":"Lighthouse Application Licence (Jan 2025)","clauseAfter":"Licensor grants Customer and its affiliates and contractors a non-transferable licence, transferable to a successor in a merger or acquisition.","comment":"[Playbook] We extended operational use to affiliates and contractors and protected transaction continuity.","level":"fallback"}]}
```

- [seq 343](trajectory.jsonl#L343) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make the Deliverable licence perpetual and irrevocable, extend it to Affiliates and contractors, and allow successor transfer.","comment":"[Playbook] Deliverables are built and paid for specifically for us, so we cannot accept a licence Vendor can revoke at will that lapses with the Order Form term; our position is a perpetual, irrevocable licence covering our Affiliates and contractors and transferable to a successor. If Vendor prefers, we can instead align this sentence with the perpetual paid-up licence already granted in Section 13.2 and the no-revocation protection in Section 13.3.","ops":[{"kind":"replace","paragraphId":"p0054","oldText":"Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","newText":"Customer, its Affiliates, and contractors acting on their behalf receive a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, reproduce, display, modify, and create derivative works from each Deliverable for Customer's business purposes, transferable to an Affiliate or to a successor in a merger, acquisition, or sale of all or substantially all assets, and revocable only as permitted by Section 13.3."}]}
```

- [seq 344](trajectory.jsonl#L344) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0054","segments":[{"type":"equal","text":"14.2 Vendor exclusively owns every Deliverable created for Customer. Customer"},{"type":"delete","text":" receives a revocable, non-transferable "},{"type":"insert","text":", its Affiliates, and contractors acting on their behalf receive a perpetual, irrevocable, worldwide, royalty-free, fully paid "},{"…
```

- [seq 367](trajectory.jsonl#L367) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0054","p0048","p0049","p0050"],"quote":"Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","rationale":"The hosted-Services grant in Section 13.1 (Customer, Affiliates and contractors), the perpetual paid-up licence in Section 13.2, and the transfer/no-revocation protections in Section 13.3 all sit at or above the preferred position. The Deliverable licence in Section 14.2 is the outlier: it is expressly revocable, non-transferable, limited to Customer alone (no Affiliates or contractors), and expires with the Order Form term. That is walk-away territory (revocable at Vendor's discretion, affiliates and contractors excluded) and fails the fallback, which requires at least Affiliate coverage and successor transferability. The redline makes the smallest change to reach the preferred position by aligning Section 14.2 with the licence architecture already agreed in Sections 13.2 and 13.3; Vendor's underlying ownership of Deliverables is left untouched.","confidence":0.83,"proposal":{"level":"preferred","summary":"Make the Deliverable licence perpetual and irrevocable, extend it to Affiliates and contractors, and allow successor transfer.","comment":"[Playbook] Deliverables are built and paid for specifically for us, so we cannot accept a licence Vendor can revoke at will that lapses with the Order Form term; our position is a perpetual, irrevocable licence covering our Affiliates and contractors and transferable to a successor. If Vendor prefers, we can instead align this sentence with the perpetual paid-up licence already granted in Section 13.2 and the no-revocation protection in Section 13.3.","precedentId":"seed-license","ops":[{"kind":"replace","paragraphId":"p0054","oldText":"Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","newText":"Customer, its Affiliates, and contractors acting on their behalf receive a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, reproduce, display, modify, and create derivative works from each Deliverable for Customer's business purposes, transferable to an Affiliate or to a successor in a merger, acquisition, or sale of all or substantially all assets, and revocable only as permitted by Section 13.3."}]}}
```

- [seq 368](trajectory.jsonl#L368) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 395](trajectory.jsonl#L395) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0054","p0050"],"quote":"Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","rationale":"The hosted-Services grant in Section 13.1 (Customer, Affiliates and contractors), the perpetual paid-up licence in Section 13.2, and the transfer/no-revocation protections in Section 13.3 all sit at or above the preferred position. The Deliverable licence in Section 14.2 is the outlier: it is expressly revocable, non-transferable, limited to Customer alone (no Affiliates or contractors), and expires with the Order Form term. That is walk-away territory (revocable at Vendor's discretion, affiliates and contractors excluded) and fails the fallback, which requires at least Affiliate coverage and successor transferability. The redline makes the smallest change to reach the preferred position by aligning Section 14.2 with the licence architecture already agreed in Sections 13.2 and 13.3; Vendor's underlying ownership of Deliverables is left untouched.","confidence":0.83,"proposal":{"level":"preferred","summary":"Make the Deliverable licence perpetual and irrevocable, extend it to Affiliates and contractors, and allow successor transfer.","comment":"[Playbook] Deliverables are built and paid for specifically for us, so we cannot accept a licence Vendor can revoke at will that lapses with the Order Form term; our position is a perpetual, irrevocable licence covering our Affiliates and contractors and transferable to a successor. If Vendor prefers, we can instead align this sentence with the perpetual paid-up licence already granted in Section 13.2 and the no-revocation protection in Section 13.3.","ops":[{"kind":"replace","paragraphId":"p0054","oldText":"Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.","newText":"Customer, its Affiliates, and contractors acting on their behalf receive a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, reproduce, display, modify, and create derivative works from each Deliverable for Customer's business purposes, transferable to an Affiliate or to a successor in a merger, acquisition, or sale of all or substantially all assets, and revocable only as permitted by Section 13.3."}]}}
```

- [seq 396](trajectory.jsonl#L396) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 395](trajectory.jsonl#L395)
- Finding: `f-license-d447dcf1` · **deviation** · confidence 0.83
- Location: § 14.2 Vendor exclusively owns every Deliverable created for Custo…
- Quote: “Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.”
- Rationale: The hosted-Services grant in Section 13.1 (Customer, Affiliates and contractors), the perpetual paid-up licence in Section 13.2, and the transfer/no-revocation protections in Section 13.3 all sit at or above the preferred position. The Deliverable licence in Section 14.2 is the outlier: it is expressly revocable, non-transferable, limited to Customer alone (no Affiliates or contractors), and expires with the Order Form term. That is walk-away territory (revocable at Vendor's discretion, affiliates and contractors excluded) and fails the fallback, which requires at least Affiliate coverage and successor transferability. The redline makes the smallest change to reach the preferred position by aligning Section 14.2 with the licence architecture already agreed in Sections 13.2 and 13.3; Vendor's underlying ownership of Deliverables is left untouched.
- Proposal: **preferred** — Make the Deliverable licence perpetual and irrevocable, extend it to Affiliates and contractors, and allow successor transfer.
- Comment: [Playbook] Deliverables are built and paid for specifically for us, so we cannot accept a licence Vendor can revoke at will that lapses with the Order Form term; our position is a perpetual, irrevocable licence covering our Affiliates and contractors and transferable to a successor. If Vendor prefers, we can instead align this sentence with the perpetual paid-up licence already granted in Section 13.2 and the no-revocation protection in Section 13.3.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer, its Affiliates, and contractors acting on their behalf receive a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, reproduce, display, modify, and create derivative works from each Deliverable for Customer's business purposes, transferable to an Affiliate or to a successor in a merger, acquisition, or sale of all or substantially all assets, and revocable only as permitted by Section 13.3.",
    "oldText": "Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.",
    "paragraphId": "p0054"
  }
]
```

### Verifier and repair feedback

- [seq 461](trajectory.jsonl#L461) **Verdict: pass** — Deviation classification is correct: Section 14.2 grants only a revocable, non-transferable licence to Customer alone that lapses with the Order Form term — it fails the fallback (no Affiliate coverage, no successor transferability) and sits in walk-away territory (revocable at Vendor's discretion, Affiliates/contractors excluded). Sections 13.1–13.3 do not cure it because they address the hosted Services licence, not Deliverables. Redline is actionable and directionally right: it adds Affiliates and contractors acting on Customer's behalf, removes at-will revocability (tying revocation to the negotiated Section 13.3 standard), makes the paid-up Deliverable licence perpetual, and adds Affiliate/successor transferability — squarely the preferred position. Vendor's ownership of Deliverables is preserved, so the edit does not overreach on IP title. The 0.832 changed-character ratio is acceptable here: the original sentence's revocability and Order-Form-term limits cannot be fixed by insertion alone, so replacing the licence sentence is the minimum route to the playbook position. Comment is accurate, concise, in our voice, cites the playbook position and offers the sensible fallback of aligning with Sections 13.2/13.3. Minor points to tidy (not disqualifying): the added rights to "reproduce, display, modify, and create derivative works" go slightly beyond what the rule requires (scope of use is not a LICENSE parameter) and may draw resistance; and "perpetual, irrevocable ... revocable only as permitted by Section 13.3" is internally inconsistent — consider "perpetual and irrevocable except as permitted by Section 13.3." Checks: {"name":"operation 1 applies","ok":true}; {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}; {"name":"minimal edit p0054","ok":false,"detail":"changed-character ratio=0.832 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 313](trajectory.jsonl#L313) **drafter → read_section**

```json
{"sectionId":"sec-22"}
```

- [seq 314](trajectory.jsonl#L314) **read_section result**

```json
{"sectionRef":"§ 22 AUDIT RIGHTS","paragraphs":[{"id":"p0081","text":"22. AUDIT RIGHTS"}]}
```

- [seq 315](trajectory.jsonl#L315) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 316](trajectory.jsonl#L316) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0085","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 331](trajectory.jsonl#L331) **drafter → read_section**

```json
{"sectionId":"sec-22.1"}
```

- [seq 332](trajectory.jsonl#L332) **read_section result**

```json
{"sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","paragraphs":[{"id":"p0…
```

- [seq 333](trajectory.jsonl#L333) **drafter → read_section**

```json
{"sectionId":"sec-22.2"}
```

- [seq 334](trajectory.jsonl#L334) **read_section result**

```json
{"sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidential information.","parag…
```

- [seq 335](trajectory.jsonl#L335) **drafter → read_section**

```json
{"sectionId":"sec-22.3"}
```

- [seq 336](trajectory.jsonl#L336) **read_section result**

```json
{"sectionRef":"§ 22.3 Audit findings are Customer Confidential Information and may be used only to enforce this Agreement. Vendor shall provide a copy of the final report. Payment of a shortfall resolves the audited quantity issue absent fraud or demonstrable error.","paragraphs":[{"id":"p0084","text":"22.3 Audit findings are Customer Confidential Information and may be used only to enforce this …
```

- [seq 359](trajectory.jsonl#L359) **drafter → list_sections**

```json
{}
```

- [seq 360](trajectory.jsonl#L360) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 361](trajectory.jsonl#L361) **drafter → search**

```json
{"query":"inspect"}
```

- [seq 362](trajectory.jsonl#L362) **search result**

```json
[]
```

- [seq 387](trajectory.jsonl#L387) **drafter → search**

```json
{"query":"audit","limit":20}
```

- [seq 388](trajectory.jsonl#L388) **search result**

```json
[{"paragraphId":"p0081","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0082","sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be cond…
```

- [seq 415](trajectory.jsonl#L415) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0082","p0083","p0084"],"quote":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","rationale":"Section 22 is the only audit/verification right binding us (no inspection right appears elsewhere; § 23 has no operative text). It meets the preferred position on every material term: frequency limited to once in any twelve-month period, thirty days' prior written notice, normal business hours, off-site where practicable, by an independent auditor bound by confidentiality (§ 22.1); Vendor bears costs unless underpayment exceeds five percent, and Vendor and its auditor are barred from direct access to Customer systems, unrelated Customer Data, privileged material and third-party confidential information (§ 22.2). Section 22.3 additionally protects findings as our Confidential Information. No redline needed.","confidence":0.93}
```

- [seq 416](trajectory.jsonl#L416) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 415](trajectory.jsonl#L415)
- Finding: `f-audit-f190ec3e` · **compliant** · confidence 0.93
- Location: § 22.1 Vendor may audit Customer's compliance with licence quantit…
- Quote: “22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.”
- Rationale: Section 22 is the only audit/verification right binding us (no inspection right appears elsewhere; § 23 has no operative text). It meets the preferred position on every material term: frequency limited to once in any twelve-month period, thirty days' prior written notice, normal business hours, off-site where practicable, by an independent auditor bound by confidentiality (§ 22.1); Vendor bears costs unless underpayment exceeds five percent, and Vendor and its auditor are barred from direct access to Customer systems, unrelated Customer Data, privileged material and third-party confidential information (§ 22.2). Section 22.3 additionally protects findings as our Confidential Information. No redline needed.

### Verifier and repair feedback

- [seq 471](trajectory.jsonl#L471) **Verdict: pass** — The cited clause (§§ 22.1–22.3) meets every material term of the preferred position: once per 12 months, 30 days' prior written notice, normal business hours, off-site where practicable, independent auditor bound by confidentiality, Vendor bears cost unless underpayment exceeds 5%, and express prohibition on direct access to Customer systems. Compliant status is correctly claimed; no redline or comment was proposed, consistent with expectations for a compliant finding, and the rendered redline is identical to the original text. Rationale accurately reflects the paragraph text and the deterministic check (audit frequency limited) is satisfied. Checks: {"name":"audit frequency limited","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 349](trajectory.jsonl#L349)

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

- [seq 371](trajectory.jsonl#L371) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 372](trajectory.jsonl#L372) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 373](trajectory.jsonl#L373) **drafter → read_section**

```json
{"sectionId":"sec-1.5"}
```

- [seq 374](trajectory.jsonl#L374) **read_section result**

```json
{"sectionRef":"§ 1.5 “Fees” means the recurring subscription fees, professional services fees, usage fees, and other amounts payable by Customer under an Order Form for the Services during the applicable period. Fees do not include taxes, reimbursable expenses, service credits, interest, damages, or a one-time implementation charge unless an Order Form expressly states otherwise.","paragraphs":[{…
```

- [seq 399](trajectory.jsonl#L399) **drafter → read_section**

```json
{"sectionId":"sec-7.3"}
```

- [seq 400](trajectory.jsonl#L400) **read_section result**

```json
{"sectionRef":"§ 7.3 Customer may withhold a genuinely disputed amount by notifying Vendor before its due date and explaining the basis. The Parties will work promptly and in good faith to resolve the dispute. Vendor shall continue the Services while a payment dispute is pending and shall not charge interest on an amount ultimately found not due.","paragraphs":[{"id":"p0028","text":"7.3 Customer …
```

- [seq 401](trajectory.jsonl#L401) **drafter → read_section**

```json
{"sectionId":"sec-21.3"}
```

- [seq 402](trajectory.jsonl#L402) **read_section result**

```json
{"sectionRef":"§ 21.3 “Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property. Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Sec…
```

- [seq 403](trajectory.jsonl#L403) **drafter → search**

```json
{"query":"liquidated"}
```

- [seq 404](trajectory.jsonl#L404) **search result**

```json
[]
```

- [seq 405](trajectory.jsonl#L405) **drafter → search**

```json
{"query":"penalt"}
```

- [seq 406](trajectory.jsonl#L406) **search result**

```json
[{"paragraphId":"p0101","sectionRef":"§ 27.3 If a force-majeure event materially prevents an affected Service for more than fifteen consecutive days, Customer may procure substitute services and suspend affected Fees. After thirty consecutive days, Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.","snippet":"…thirty co…
```

- [seq 425](trajectory.jsonl#L425) **drafter → search**

```json
{"query":"termination","limit":30}
```

- [seq 426](trajectory.jsonl#L426) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","snippet":"…es in each of the next three years on a take-or-pay basis, without reduction or termination rights."},{"paragraphId":"p0035","sectionRef":"§ 9 TERMINATION","snippet":"9. TERMINATION…
```

- [seq 427](trajectory.jsonl#L427) **drafter → search**

```json
{"query":"remaining"}
```

- [seq 428](trajectory.jsonl#L428) **search result**

```json
[]
```

- [seq 455](trajectory.jsonl#L455) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 456](trajectory.jsonl#L456) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0035","text":"9. TERMINATION"}]}
```

- [seq 457](trajectory.jsonl#L457) **drafter → search**

```json
{"query":"Customer shall pay","limit":20}
```

- [seq 458](trajectory.jsonl#L458) **search result**

```json
[{"paragraphId":"p0025","sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","snippet":"7.1 Customer shall pay the Fees stated in each Order F…
```

- [seq 478](trajectory.jsonl#L478) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0036","p0037","p0038","p0039"]}
```

- [seq 479](trajectory.jsonl#L479) **read_paragraphs result**

```json
[{"id":"p0036","sectionRef":"§ 9.1 Either Party may terminate this Agreement or an affected Order Form for the other Party's material breach if the breach remains uncured thirty days after written notice describing it in reasonable detail. If a breach cannot reasonably be cured within thirty days, the cure period extends up to sixty additional days while the breaching Party diligently pursues cur…
```

- [seq 480](trajectory.jsonl#L480) **drafter → search**

```json
{"query":"shortfall|accelerat|true-up|make-whole|forfeit|non-refundable|sole remedy for|as compensation","regex":true,"limit":20}
```

- [seq 481](trajectory.jsonl#L481) **search result**

```json
[{"paragraphId":"p0083","sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidenti…
```

- [seq 504](trajectory.jsonl#L504) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0007","p0028","p0101"],"quote":"Fees do not include taxes, reimbursable expenses, service credits, interest, damages, or a one-time implementation charge unless an Order Form expressly states otherwise.","rationale":"The agreement contains no liquidated damages, penalty, or early-termination/minimum-fee-on-termination obligation payable by Customer, which matches the preferred position. Searches for \"liquidated\", \"penalt\", \"remaining\", acceleration and make-whole language returned nothing adverse: § 1.5 excludes service credits, interest and damages from Fees; § 7.3 bars interest on amounts ultimately found not due; § 9 (termination) imposes no exit charge on Customer; § 24.4 expressly denies Vendor any right to accelerate Fees; and § 27.3 lets Customer terminate for prolonged force majeure \"without penalty.\" The only Customer payment obligations found are undisputed Fees for conforming Services (§ 7.1, § 21.3) and audit costs plus the actual undisputed shortfall where an audit shows underpayment above five percent (§ 22.2) — both compensatory, not liquidated damages. The take-or-pay commitment in § 2.1 is economically penal in effect, but that commercial term is addressed under the minimum-commitment rule and is not double-flagged here. No redline required.","confidence":0.85}
```

- [seq 505](trajectory.jsonl#L505) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 504](trajectory.jsonl#L504)
- Finding: `f-ld-33763ad2` · **compliant** · confidence 0.85
- Location: § 1.5 “Fees” means the recurring subscription fees, professional…
- Quote: “Fees do not include taxes, reimbursable expenses, service credits, interest, damages, or a one-time implementation charge unless an Order Form expressly states otherwise.”
- Rationale: The agreement contains no liquidated damages, penalty, or early-termination/minimum-fee-on-termination obligation payable by Customer, which matches the preferred position. Searches for "liquidated", "penalt", "remaining", acceleration and make-whole language returned nothing adverse: § 1.5 excludes service credits, interest and damages from Fees; § 7.3 bars interest on amounts ultimately found not due; § 9 (termination) imposes no exit charge on Customer; § 24.4 expressly denies Vendor any right to accelerate Fees; and § 27.3 lets Customer terminate for prolonged force majeure "without penalty." The only Customer payment obligations found are undisputed Fees for conforming Services (§ 7.1, § 21.3) and audit costs plus the actual undisputed shortfall where an audit shows underpayment above five percent (§ 22.2) — both compensatory, not liquidated damages. The take-or-pay commitment in § 2.1 is economically penal in effect, but that commercial term is addressed under the minimum-commitment rule and is not double-flagged here. No redline required.

### Verifier and repair feedback

- [seq 536](trajectory.jsonl#L536) **Verdict: pass** — Compliant classification is supported: the cited paragraphs (§1.5 excluding damages/credits from Fees, §7.3 barring interest on amounts not due, §27.3 termination for prolonged force majeure 'without penalty') contain no Customer-payable liquidated damages, penalty, or minimum-fee-on-termination obligation, matching the preferred position. No redline or counterparty comment is proposed, which is correct for a compliant finding; the rendered redline is identical to the original text and no deterministic checks failed. The rationale documents an adequate negative search (liquidated/penalty/acceleration/make-whole) and correctly declines to double-flag the §2.1 take-or-pay commitment, which belongs to the minimum-commitment rule. Remaining Customer payment obligations identified (undisputed Fees, audit costs and actual shortfall on >5% underpayment) are compensatory rather than liquidated damages, so they do not undermine the compliant call. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 357](trajectory.jsonl#L357)

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

- [seq 381](trajectory.jsonl#L381) **drafter → read_section**

```json
{"sectionId":"sec-19"}
```

- [seq 382](trajectory.jsonl#L382) **read_section result**

```json
{"sectionRef":"§ 19 WARRANTIES","paragraphs":[{"id":"p0070","text":"19. WARRANTIES"}]}
```

- [seq 383](trajectory.jsonl#L383) **drafter → list_sections**

```json
{}
```

- [seq 384](trajectory.jsonl#L384) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 411](trajectory.jsonl#L411) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["sec-19.1","sec-19.2","sec-19.3","sec-19.4","sec-19.5"],"quote":"For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Section 19 meets the preferred position. Vendor warrants professional and workmanlike performance by qualified personnel to industry standards (19.1), material conformity of Deliverables to documentation and acceptance criteria for ninety days after the later of delivery or acceptance, with hosted Services conforming throughout the subscription term (19.2) — a period at least as protective as the preferred 12-month software / 90-day services benchmark. Section 19.3 adds no-malicious-code, Applicable Law compliance, no functionality diminution and open-source protection. Section 19.4 gives the full remedy ladder (re-perform, repair or replace, then terminate and refund Fees paid) and preserves non-exclusivity for fraud, IP, confidentiality, privacy, security and indemnified claims, reinforced by Sections 9.5 and 30.2. The disclaimer in 19.5 is mutual, limited to implied warranties, and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranties. No redline needed.","confidence":0.9}
```

- [seq 412](trajectory.jsonl#L412) **submit_finding result**

```json
{"ok":false,"errors":["Unknown paragraph: sec-19.1","Unknown paragraph: sec-19.2","Unknown paragraph: sec-19.3","Unknown paragraph: sec-19.4","Unknown paragraph: sec-19.5","quote is not a verbatim substring of a cited paragraph"]}
```

- [seq 437](trajectory.jsonl#L437) **drafter → read_section**

```json
{"sectionId":"sec-19.2"}
```

- [seq 438](trajectory.jsonl#L438) **read_section result**

```json
{"sectionRef":"§ 19.2 For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term. Vendor warrants it has authority to enter the Agreement and grant the rights stated here.","paragraphs":[{"id":"p0072","text":"19.2 For ninety days after deliver…
```

- [seq 439](trajectory.jsonl#L439) **drafter → read_section**

```json
{"sectionId":"sec-19.4"}
```

- [seq 440](trajectory.jsonl#L440) **read_section result**

```json
{"sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","pa…
```

- [seq 441](trajectory.jsonl#L441) **drafter → read_section**

```json
{"sectionId":"sec-19.1"}
```

- [seq 442](trajectory.jsonl#L442) **read_section result**

```json
{"sectionRef":"§ 19.1 Vendor warrants that Services will be performed in a professional and workmanlike manner by qualified personnel, in accordance with industry standards, this Agreement, and each Order Form. Vendor further warrants that Services and Deliverables will materially conform to their documentation and agreed specifications.","paragraphs":[{"id":"p0071","text":"19.1 Vendor warrants t…
```

- [seq 443](trajectory.jsonl#L443) **drafter → read_section**

```json
{"sectionId":"sec-19.3"}
```

- [seq 444](trajectory.jsonl#L444) **read_section result**

```json
{"sectionRef":"§ 19.3 Vendor warrants the Services and Deliverables will not contain malicious code intentionally introduced by Vendor, and that Vendor will comply with Applicable Law. Vendor will not materially diminish functionality during a term or use open-source software in a way that requires disclosure or licensing of Customer source code.","paragraphs":[{"id":"p0073","text":"19.3 Vendor w…
```

- [seq 445](trajectory.jsonl#L445) **drafter → read_section**

```json
{"sectionId":"sec-19.5"}
```

- [seq 446](trajectory.jsonl#L446) **read_section result**

```json
{"sectionRef":"§ 19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here.","paragraphs":[{"id":"p0075","text":"19.5 Except for the express warranties in this Agreement, neither Part…
```

- [seq 474](trajectory.jsonl#L474) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0071","p0072","p0073","p0074","p0075"],"quote":"For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Section 19 meets the preferred position. Vendor warrants professional and workmanlike performance by qualified personnel to industry standards, plus material conformity of Services and Deliverables to documentation and specifications (19.1); Deliverables are warranted for ninety days from the later of delivery or acceptance and hosted Services conform throughout the subscription term (19.2), which is at least as protective as the preferred 12-month software / 90-day services benchmark. Section 19.3 adds no-malicious-code, Applicable Law compliance, no functionality diminution and open-source protection. Section 19.4 provides the full remedy ladder — prompt re-performance, repair or replacement at no charge, then terminate-and-refund of Fees paid — and expressly preserves non-exclusivity for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is mutual, limited to implied warranties, and expressly does not limit any express warranty, service level, indemnity or stated remedy, so it does not swallow the express warranties. No redline required.","confidence":0.91}
```

- [seq 475](trajectory.jsonl#L475) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 474](trajectory.jsonl#L474)
- Finding: `f-warranty-540182c8` · **compliant** · confidence 0.91
- Location: § 19.1 Vendor warrants that Services will be performed in a profes…
- Quote: “For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.”
- Rationale: Section 19 meets the preferred position. Vendor warrants professional and workmanlike performance by qualified personnel to industry standards, plus material conformity of Services and Deliverables to documentation and specifications (19.1); Deliverables are warranted for ninety days from the later of delivery or acceptance and hosted Services conform throughout the subscription term (19.2), which is at least as protective as the preferred 12-month software / 90-day services benchmark. Section 19.3 adds no-malicious-code, Applicable Law compliance, no functionality diminution and open-source protection. Section 19.4 provides the full remedy ladder — prompt re-performance, repair or replacement at no charge, then terminate-and-refund of Fees paid — and expressly preserves non-exclusivity for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is mutual, limited to implied warranties, and expressly does not limit any express warranty, service level, indemnity or stated remedy, so it does not swallow the express warranties. No redline required.

### Verifier and repair feedback

- [seq 516](trajectory.jsonl#L516) **Verdict: pass** — Claimed status is 'compliant' and the cited text supports it: Section 19.1 gives professional/workmanlike performance plus material conformance to documentation and specifications; 19.2 gives a 90-day Deliverable warranty (later of delivery or acceptance) and hosted Services conformance for the whole subscription term, which meets or exceeds the preferred 12-month software / 90-day services benchmark. 19.3 covers no-malicious-code and Applicable Law compliance; 19.4 supplies the required remedy ladder (re-perform, repair or replace, then terminate and refund Fees paid) and preserves non-exclusivity, so the rule's remedy element is satisfied. 19.5's disclaimer is limited to implied warranties and expressly does not limit any express warranty or stated remedy, so it does not swallow the express warranty — no walk-away 'AS IS' risk. Consistent with a compliant finding, the redline is identical to the original paragraphs and no counterparty comment was proposed; nothing is over-flagged. The failed deterministic check is a false negative: the period is written out as 'ninety days' rather than numerically, so the regex missed a compliant 90-day term. Checks: {"name":"warranty period ≥ 90 days or expressed in months/years","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 393](trajectory.jsonl#L393)

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

- [seq 419](trajectory.jsonl#L419) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 420](trajectory.jsonl#L420) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0067","text":"18. INSURANCE"}]}
```

- [seq 421](trajectory.jsonl#L421) **drafter → read_section**

```json
{"sectionId":"sec-18.1"}
```

- [seq 422](trajectory.jsonl#L422) **read_section result**

```json
{"sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability ins…
```

- [seq 451](trajectory.jsonl#L451) **drafter → read_section**

```json
{"sectionId":"sec-18.2"}
```

- [seq 452](trajectory.jsonl#L452) **read_section result**

```json
{"sectionRef":"§ 18.2 Policies will be issued by reputable insurers and be primary to Customer's insurance where commercially customary. On request, Vendor shall provide certificates of insurance and evidence of relevant coverage. Vendor shall give advance notice of cancellation or material reduction to the extent available from its insurer. Insurance does not limit Vendor's liabilities.","paragr…
```

- [seq 484](trajectory.jsonl#L484) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0068","p0069"],"quote":"18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18 contains a full vendor insurance clause that meets our preferred position on every material term: CGL of USD 1M per occurrence / USD 2M aggregate, professional E&O of USD 2M, cyber and privacy liability of USD 5M (appropriate given Vendor processes Customer Data as a hosting provider), and workers' compensation as required by law, each maintained at Vendor's expense for the term plus one year. Section 18.2 adds certificates of insurance on request, insurer quality, notice of cancellation or material reduction, and confirms insurance does not limit Vendor's liabilities. Vendor is the bound party throughout, so the clause runs in our favour and no redline is warranted.","confidence":0.95}
```

- [seq 485](trajectory.jsonl#L485) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 484](trajectory.jsonl#L484)
- Finding: `f-insurance-d7ceefdc` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18 contains a full vendor insurance clause that meets our preferred position on every material term: CGL of USD 1M per occurrence / USD 2M aggregate, professional E&O of USD 2M, cyber and privacy liability of USD 5M (appropriate given Vendor processes Customer Data as a hosting provider), and workers' compensation as required by law, each maintained at Vendor's expense for the term plus one year. Section 18.2 adds certificates of insurance on request, insurer quality, notice of cancellation or material reduction, and confirms insurance does not limit Vendor's liabilities. Vendor is the bound party throughout, so the clause runs in our favour and no redline is warranted.

### Verifier and repair feedback

- [seq 521](trajectory.jsonl#L521) **Verdict: pass** — The cited Section 18.1 matches the preferred position on every material term: CGL USD 1M/2M, E&O USD 2M, cyber/privacy USD 5M, workers' compensation as required by law, at Vendor's expense for the term plus one year. Section 18.2 supplies certificates of insurance on request, satisfying the remaining preferred element. Vendor is the obligated party, so the clause benefits us; compliant status is correct and no redline or comment is expected. Deterministic check confirms an insurance obligation is present, and the redline is unchanged from the original text as appropriate for a compliant finding. Checks: {"name":"insurance obligation present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 435](trajectory.jsonl#L435)

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

- [seq 465](trajectory.jsonl#L465) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 466](trajectory.jsonl#L466) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 467](trajectory.jsonl#L467) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 468](trajectory.jsonl#L468) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 494](trajectory.jsonl#L494) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 495](trajectory.jsonl#L495) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0025","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 496](trajectory.jsonl#L496) **drafter → search**

```json
{"query":"minimum|shortfall|take-or-pay|commit","regex":true,"limit":30}
```

- [seq 497](trajectory.jsonl#L497) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","snippet":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years…"},{"paragraphId":"p0012","sectionRef":"§ 2.1 Customer commits to purchase at leas…
```

- [seq 514](trajectory.jsonl#L514) **drafter → lookup_precedent**

```json
{"ruleId":"MINCOMMIT","context":"Three-year USD 2,000,000/year take-or-pay with no reduction or termination right; narrow to 12-month commitment, reducible on 30 days notice, true-up not penalty"}
```

- [seq 529](trajectory.jsonl#L529) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-mincommit","source":"Bluewater Hosting Order (Aug 2025)","clauseAfter":"Customer will pay only for Services used or ordered during the applicable term.","comment":"[Playbook] We removed the take-or-pay shortfall obligation.","level":"preferred"}]}
```

- [seq 539](trajectory.jsonl#L539) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Narrow the three-year take-or-pay to a single 12-month commitment that is reducible on 30 days' notice with a true-up instead of a penalty.","comment":"[Playbook] We cannot accept a three-year take-or-pay with no reduction or termination right, and it contradicts § 12.3's acknowledgement that we have given no minimum-volume commitment. We have narrowed the commitment to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a shortfall penalty; alternatively we are happy to delete § 2.1 and pay for Services used or ordered.","precedentId":"seed-mincommit","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"2.1 Customer commits to purchase at least USD 2,000,000 of Services during the current twelve-month term only, and no commitment applies to any subsequent term unless the parties agree otherwise in writing. Customer may reduce or terminate the commitment on 30 days' written notice. If Services ordered in the applicable twelve-month term are less than the committed amount, Customer's sole obligation is to pay a true-up equal to the difference between the committed amount (as reduced) and the Fees for Services ordered, and no penalty, liquidated damages, or accelerated Fees apply."}]}
```

- [seq 540](trajectory.jsonl#L540) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0012","segments":[{"type":"equal","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services "},{"type":"delete","text":"in each of the next three years on a take-or-pay basis, without reduction or termination rights"},{"type":"insert","text":"during the current twelve-month term only, and no commitment applies to any subsequent…
```

- [seq 545](trajectory.jsonl#L545) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0012","p0044"],"quote":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","rationale":"§ 2.1 imposes a multi-year (three-year) USD 2,000,000 per year take-or-pay commitment on us expressly \"without reduction or termination rights\" — squarely the playbook's walk-away position and well short of the fallback (single 12-month commitment, reducible on 30 days' notice, true-up rather than penalty). It also directly contradicts § 12.3, in which Vendor acknowledges that Customer has made no minimum-volume commitment, and sits oddly with § 7.1's bar on undisclosed minimum-use charges. Because the deal is structured around committed spend, we narrowed to the fallback with a minimal edit (12-month term only, 30 days' notice reduction/termination, true-up with no penalty) rather than deleting the commitment outright, while offering deletion as the preferred alternative.","confidence":0.93,"proposal":{"level":"fallback","summary":"Narrow the three-year take-or-pay to a single 12-month commitment that is reducible on 30 days' notice with a true-up instead of a penalty.","comment":"[Playbook] We cannot accept a three-year take-or-pay with no reduction or termination right, and it contradicts § 12.3's acknowledgement that we have given no minimum-volume commitment. We have narrowed the commitment to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a shortfall penalty; alternatively we are happy to delete § 2.1 and pay for Services used or ordered.","precedentId":"seed-mincommit","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"2.1 Customer commits to purchase at least USD 2,000,000 of Services during the current twelve-month term only, and no commitment applies to any subsequent term unless the parties agree otherwise in writing. Customer may reduce or terminate the commitment on 30 days' written notice. If Services ordered in the applicable twelve-month term are less than the committed amount, Customer's sole obligation is to pay a true-up equal to the difference between the committed amount (as reduced) and the Fees for Services ordered, and no penalty, liquidated damages, or accelerated Fees apply."}]}}
```

- [seq 546](trajectory.jsonl#L546) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 545](trajectory.jsonl#L545)
- Finding: `f-mincommit-b4ab0b09` · **deviation** · confidence 0.93
- Location: § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv…
- Quote: “2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: § 2.1 imposes a multi-year (three-year) USD 2,000,000 per year take-or-pay commitment on us expressly "without reduction or termination rights" — squarely the playbook's walk-away position and well short of the fallback (single 12-month commitment, reducible on 30 days' notice, true-up rather than penalty). It also directly contradicts § 12.3, in which Vendor acknowledges that Customer has made no minimum-volume commitment, and sits oddly with § 7.1's bar on undisclosed minimum-use charges. Because the deal is structured around committed spend, we narrowed to the fallback with a minimal edit (12-month term only, 30 days' notice reduction/termination, true-up with no penalty) rather than deleting the commitment outright, while offering deletion as the preferred alternative.
- Proposal: **fallback** — Narrow the three-year take-or-pay to a single 12-month commitment that is reducible on 30 days' notice with a true-up instead of a penalty.
- Comment: [Playbook] We cannot accept a three-year take-or-pay with no reduction or termination right, and it contradicts § 12.3's acknowledgement that we have given no minimum-volume commitment. We have narrowed the commitment to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a shortfall penalty; alternatively we are happy to delete § 2.1 and pay for Services used or ordered.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.1 Customer commits to purchase at least USD 2,000,000 of Services during the current twelve-month term only, and no commitment applies to any subsequent term unless the parties agree otherwise in writing. Customer may reduce or terminate the commitment on 30 days' written notice. If Services ordered in the applicable twelve-month term are less than the committed amount, Customer's sole obligation is to pay a true-up equal to the difference between the committed amount (as reduced) and the Fees for Services ordered, and no penalty, liquidated damages, or accelerated Fees apply.",
    "oldText": "2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.",
    "paragraphId": "p0012"
  }
]
```

### Verifier and repair feedback

- [seq 559](trajectory.jsonl#L559) **Verdict: pass** — Classification is correct: § 2.1 imposes a three-year USD 2,000,000/year take-or-pay expressly 'without reduction or termination rights', which is the rule's stated walk-away position and fails the fallback on every material term (single 12-month commitment, 30-day reduction right, true-up not penalty). The redline lands precisely on the playbook fallback: commitment confined to the current twelve-month term, reducible/terminable on 30 days' written notice, and shortfall converted to a true-up with penalties, liquidated damages and accelerated fees expressly excluded. The high changed-character ratio (0.788) is justified here — the original sentence is a single take-or-pay covenant whose duration, reduction right and remedy all had to be replaced; narrowing rather than deleting is the least disruptive route given the deal's committed-spend structure, and deletion is offered as the preferred alternative. Comment is accurate, concise, first-person plural, correctly notes the conflict with § 12.3's no-minimum-volume acknowledgement, states what changed and why, and offers the fallback/alternative without lecturing. No double-flagging or party-direction error: the commitment runs against Customer (our party), and the edit does not disadvantage us. Checks: {"name":"operation 1 applies","ok":true}; {"name":"minimal edit p0012","ok":false,"detail":"changed-character ratio=0.788 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 463](trajectory.jsonl#L463)

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

- [seq 488](trajectory.jsonl#L488) **drafter → list_sections**

```json
{}
```

- [seq 489](trajectory.jsonl#L489) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 490](trajectory.jsonl#L490) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 491](trajectory.jsonl#L491) **read_section result**

```json
{"sectionRef":"§ 10 EFFECT OF EXPIRY OR TERMINATION","paragraphs":[{"id":"p0040","text":"10. EFFECT OF EXPIRY OR TERMINATION"}]}
```

- [seq 508](trajectory.jsonl#L508) **drafter → search**

```json
{"query":"transition"}
```

- [seq 509](trajectory.jsonl#L509) **search result**

```json
[{"paragraphId":"p0041","sectionRef":"§ 10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independently continue according to their terms.","snippet":"…stomer's right to access terminated subscription Services …
```

- [seq 510](trajectory.jsonl#L510) **drafter → search**

```json
{"query":"export"}
```

- [seq 511](trajectory.jsonl#L511) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1.2 “Applicable Law” means every statute, regulation, binding regulatory requirement, court order, and governmental rule applicable to a Party's performance under this Agreement, including laws concerning privacy, information security, export controls, employment, anti-bribery, and accessibility. Applicable Law does not include a private standard unless an …
```

- [seq 524](trajectory.jsonl#L524) **drafter → search**

```json
{"query":"delet","regex":true}
```

- [seq 525](trajectory.jsonl#L525) **search result**

```json
[]
```

- [seq 526](trajectory.jsonl#L526) **drafter → search**

```json
{"query":"return"}
```

- [seq 527](trajectory.jsonl#L527) **search result**

```json
[{"paragraphId":"p0063","sectionRef":"§ 16.5 On request or termination, the recipient shall return or destroy Confidential Information, subject to routine backups and legal retention. Duties for trade secrets continue while protected as trade secrets; duties for other Confidential Information continue for five years after disclosure. Customer Data remains governed by Sections 11 and 15.","snippet…
```

- [seq 532](trajectory.jsonl#L532) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0041","p0042"]}
```

- [seq 533](trajectory.jsonl#L533) **read_paragraphs result**

```json
[{"id":"p0041","sectionRef":"§ 10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independently continue according to their terms.","text":"10.1 On expiry or termination, Customer's right to access terminated su…
```

- [seq 534](trajectory.jsonl#L534) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Insert transition assistance and Customer Data return/deletion clause in termination effects section of hosted services MSA"}
```

- [seq 542](trajectory.jsonl#L542) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-transition","source":"Silverline Data Platform MSA (Dec 2025)","clauseAfter":"Vendor will return Customer Data in a machine-readable format within thirty days, provide transition assistance for up to six months and then certify deletion.","comment":"[Playbook] We added an orderly data return and transition period before deletion.","level":"preferred"}]}
```

- [seq 549](trajectory.jsonl#L549) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-transition","summary":"Insert new Section 10.3 requiring transition assistance, Customer Data return in machine-readable format within 30 days, and certified deletion thereafter.","comment":"[Playbook] We added an orderly exit clause: up to six months of transition assistance at Vendor's then-current rates, return of Customer Data in a machine-readable format within thirty days, and certified deletion thereafter, as the Agreement currently gives us no exit or data-return rights (Section 16.5 even cross-refers to a Section 11 that does not exist). We can accept ninety days of transition assistance if six months is problematic.","ops":[{"kind":"insert_after","paragraphId":"p0042","numbering":"10.3","text":"Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates; (b) within thirty (30) days of Customer's request, return or make available for download all Customer Data in a commonly used, machine-readable format; and (c) thereafter delete Customer Data from its systems, subject to routine backups and legal retention requirements, and certify such deletion in writing."}]}
```

- [seq 550](trajectory.jsonl#L550) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0042","segments":[{"type":"equal","text":"10.2 Vendor shall deliver all completed and in-process Deliverables for which Customer has paid or agrees to pay the applicable proportionate Fees. Vendor shall refund prepaid recurring Fees covering the period after termination, together with Fees paid for Services Customer cannot reasonably use because…
```

- [seq 555](trajectory.jsonl#L555) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0041","p0042","p0063"],"quote":"10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independently continue according to their terms.","rationale":"Section 10 (Effect of Expiry or Termination) contains no exit-assistance or data-return obligation. Section 10.1 merely presupposes \"any agreed transition period\" without obliging Vendor to provide one, and 10.2 covers only Deliverables and refunds. Searches for transition, export, return and deletion language return nothing else: Section 15 (Customer Data and Privacy) addresses processing limits only, and Section 16.5 excludes Customer Data from the return-or-destroy duty by referring it to \"Sections 11 and 15\" — but no Section 11 exists in the document. As a hosted-services agreement with no data return or export right, this fails the fallback (90 days' assistance plus export within 30 days), so we insert a new Section 10.3 at the preferred position: up to six months' transition assistance at then-current rates, return of Customer Data in a machine-readable format within 30 days, and certified deletion thereafter (with a carve-out for routine backups and legal retention, consistent with Section 16.5).","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-transition","summary":"Insert new Section 10.3 requiring transition assistance, Customer Data return in machine-readable format within 30 days, and certified deletion thereafter.","comment":"[Playbook] We added an orderly exit clause: up to six months of transition assistance at Vendor's then-current rates, return of Customer Data in a machine-readable format within thirty days, and certified deletion thereafter, as the Agreement currently gives us no exit or data-return rights (Section 16.5 even cross-refers to a Section 11 that does not exist). We can accept ninety days of transition assistance if six months is problematic.","ops":[{"kind":"insert_after","paragraphId":"p0042","numbering":"10.3","text":"Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates; (b) within thirty (30) days of Customer's request, return or make available for download all Customer Data in a commonly used, machine-readable format; and (c) thereafter delete Customer Data from its systems, subject to routine backups and legal retention requirements, and certify such deletion in writing."}]}}
```

- [seq 556](trajectory.jsonl#L556) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 555](trajectory.jsonl#L555)
- Finding: `f-transition-c3240419` · **missing** · confidence 0.90
- Location: § 10.1 On expiry or termination, Customer's right to access termin…
- Quote: “10.1 On expiry or termination, Customer's right to access terminated subscription Services ends after any agreed transition period. Rights in accepted Deliverables, paid-up licences, Customer Data, and materials Customer owned or licensed independently continue according to their terms.”
- Rationale: Section 10 (Effect of Expiry or Termination) contains no exit-assistance or data-return obligation. Section 10.1 merely presupposes "any agreed transition period" without obliging Vendor to provide one, and 10.2 covers only Deliverables and refunds. Searches for transition, export, return and deletion language return nothing else: Section 15 (Customer Data and Privacy) addresses processing limits only, and Section 16.5 excludes Customer Data from the return-or-destroy duty by referring it to "Sections 11 and 15" — but no Section 11 exists in the document. As a hosted-services agreement with no data return or export right, this fails the fallback (90 days' assistance plus export within 30 days), so we insert a new Section 10.3 at the preferred position: up to six months' transition assistance at then-current rates, return of Customer Data in a machine-readable format within 30 days, and certified deletion thereafter (with a carve-out for routine backups and legal retention, consistent with Section 16.5).
- Proposal: **preferred** — Insert new Section 10.3 requiring transition assistance, Customer Data return in machine-readable format within 30 days, and certified deletion thereafter.
- Comment: [Playbook] We added an orderly exit clause: up to six months of transition assistance at Vendor's then-current rates, return of Customer Data in a machine-readable format within thirty days, and certified deletion thereafter, as the Agreement currently gives us no exit or data-return rights (Section 16.5 even cross-refers to a Section 11 that does not exist). We can accept ninety days of transition assistance if six months is problematic.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "10.3",
    "paragraphId": "p0042",
    "text": "Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates; (b) within thirty (30) days of Customer's request, return or make available for download all Customer Data in a commonly used, machine-readable format; and (c) thereafter delete Customer Data from its systems, subject to routine backups and legal retention requirements, and certify such deletion in writing."
  }
]
```

### Verifier and repair feedback

- [seq 564](trajectory.jsonl#L564) **Verdict: pass** — The cited paragraphs confirm the gap: Section 10.1 only presupposes 'any agreed transition period' without obliging Vendor to provide one, 10.2 covers Deliverables and refunds only, and 16.5 expressly punts Customer Data to a non-existent Section 11 — so a hosted-services agreement with no data return/export right fails even the fallback (90 days' assistance plus 30-day export). The insert is placed in the termination section immediately after 10.2 and tracks the model language: up to six months' transition assistance at then-current rates, return in a commonly used machine-readable format within 30 days, and certified deletion thereafter, with a backups/legal-retention carve-out consistent with 16.5. Edit is additive only — no existing paragraph text is altered — which is the smallest edit that reaches the preferred position for a 'missing' finding. Comment is accurate, concise, first-person plural, cites the playbook position and offers the 90-day fallback; the noted Section 11 cross-reference defect is a genuine drafting gap. Minor, non-disqualifying: the inserted paragraph is unnumbered (rationale calls it Section 10.3) and conditions the 30-day return on Customer's request rather than running automatically from termination — both are drafting nits, not directional errors. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 569](trajectory.jsonl#L569) memo LLM request
- [seq 570](trajectory.jsonl#L570) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement

**To:** Deal team  
**From:** Legal (Customer-side review)  
**Re:** Playbook review of the Master Services Agreement — verified findings

---

## 1. Executive summary

We reviewed the Master Services Agreement against our playbook and verified 19 findings. Nine clauses meet our positions and require no redline: limitation of liability (§ 21), assignment and change of control (§ 24), liquidated damages (none imposed on us), audit rights (§ 22), auto-renewal (§ 8.2–8.3), performance warranty (§ 19), and Vendor insurance (§ 18). Several of these — the mutual cap with full carve-outs, the renewal reminder mechanic and uplift cap, and the Vendor insurance programme — run affirmatively in our favour.

The remaining ten findings are deviations or gaps, and the concentration of risk is unusual. Three items are missing entirely: there is no indemnification article anywhere in the Agreement (the outline jumps from § 19 to § 21, leaving orphaned cross-references in §§ 9.3, 19.4, 21.3 and 30.5), no Customer termination-for-convenience right across a three-year term, and no post-termination transition assistance or data-return obligation. Seven further clauses impose restraints on us that fail our fallback positions: Vendor ownership of Deliverables with a revocable, term-limited licence (§ 14.2), a 24-month all-territory non-compete and a 24-month no-hire (§ 12.4), a disclose-and-match/MFN obligation running against us (§ 7.2), a three-year USD 2,000,000 take-or-pay without reduction or termination rights (§ 2.1), and Singapore governing law and exclusive jurisdiction (§ 28.1).

We also note an internal drafting problem the Vendor should own: §§ 2.1, 7.2, 12.4 and 28.1 each contradict acknowledgements or provisions the Vendor itself has given (§ 12.3 confirms we made no exclusivity, MFN, minimum-volume or no-hire commitment; § 28.2 confers exclusive New York jurisdiction). There are also two clauses numbered 7.2, and § 16.5 cross-refers to a Section 11 that does not exist.

---

## 2. Findings

| Severity | Rule | Status | Section | Issue / Position |
|---|---|---|---|---|
| Critical | INDEMN — Indemnification by Vendor | Missing | No indemnity article (gap between § 19 and § 21; see § 19.5) | No Vendor IP or misconduct indemnity anywhere; §§ 9.3, 19.4, 21.3 and 30.5 presuppose one. Insert new § 20 (Vendor IP/law/data-incident/wilful-misconduct indemnity, narrow Customer indemnity, procedure, exclusions, procure-modify-replace-refund remedies). No super-cap needed as § 21.3 already excludes indemnities from the cap. |
| Critical | IP — Ownership of deliverables and Customer Data | Deviation | § 14.2 | Vendor owns every Deliverable, with only a revocable, non-transferable, term-limited licence to us; § 13.2's perpetual licence reaches only Vendor Technology. Fails preferred and fallback. Reverse assignment to Customer, preserving Vendor background IP under § 14.3. |
| Critical | LOL-CAP — Limitation of liability | Compliant | § 21.1 (with §§ 21.2–21.4) | Meets preferred position: mutual cap at greater of 12 months' Fees paid or payable and USD 1,000,000, mutual consequential-damages exclusion with direct-damages carve-back, and all preferred carve-outs uncapped. No redline. |
| High | ASSIGN — Assignment and change of control | Compliant | § 24.1 (with §§ 24.2–24.4, 13.3) | Meets preferred position: Customer Affiliate/M&A assignment on notice only; Vendor assignment and change-of-control transfer restricted; no Vendor repricing, acceleration or termination on our change of control. No redline. |
| High | LD — Liquidated damages / penalties on Customer | Compliant | § 1.5 (with §§ 7.3, 9, 24.4, 27.3) | No liquidated damages, penalty or exit charge payable by us. Take-or-pay economics addressed under MINCOMMIT and not double-flagged. No redline. |
| High | LICENSE — Licence grant scope | Deviation | § 14.2 | Deliverable licence is revocable, non-transferable, Customer-only and expires with the Order Form term — walk-away territory and short of fallback. Align § 14.2 with the licence architecture already agreed in §§ 13.2–13.3 (perpetual, irrevocable, Affiliates and contractors, successor transfer). |
| High | NONCOMPETE — Non-compete on Customer | Deviation | § 12.4 | 24-month post-term, all-territory, undefined-scope non-compete on us, expressly barring acquisitions; contradicts § 12.3. Preferred position is no restriction — delete; narrowed fallback offered if Vendor identifies a specific product. |
| High | T4C — Termination for convenience | Missing | § 9 (Termination) | Only cause-based and event-driven exits exist; § 2.1 denies reduction or termination across a three-year term (§ 8.1). Insert 30-day Customer convenience right with pro-rata refund of prepaid Fees, no reciprocal Vendor right, and conform § 2.1. |
| Medium | AUDIT — Audit rights against Customer | Compliant | § 22.1 (with §§ 22.2–22.3) | Meets preferred position: once per 12 months, 30 days' notice, business hours, off-site where practicable, independent auditor under confidentiality, Vendor-borne costs, no system access. No redline. |
| Medium | EXCLUSIVITY — Exclusivity binding Customer | Deviation | § 7.2 (first clause so numbered) | Disclose-and-match precondition on engaging another provider is a de facto right of first refusal: no category, duration or service-failure exit. Fails fallback and contradicts § 12.3. Delete; the substantive payment-terms § 7.2 is unaffected. |
| Medium | GOVLAW — Governing law and venue | Deviation | § 28.1 | Singapore law and exclusive Singapore jurisdiction is outside our accepted list and conflicts with the exclusive New York County venue in § 28.2. Replace with New York law, leaving §§ 28.2–28.3 intact. |
| Medium | MFN — Most-favoured-nation burdening Customer | Deviation | § 7.2 | Open-ended obligation on us to disclose and match better third-party offers, with no product limit, time limit or comparability carve-outs; contradicts § 12.3. No Vendor-granted MFN exists, so nothing beneficial is lost. Delete. |
| Medium | MINCOMMIT — Minimum purchase commitments | Deviation | § 2.1 | Three-year, USD 2,000,000 per year take-or-pay expressly "without reduction or termination rights"; contradicts § 12.3 and sits oddly with § 7.1. Narrow to a single 12-month commitment, reducible on 30 days' notice, with true-up and no penalty; deletion offered as the preferred alternative. |
| Medium | NOSOLICIT — Non-solicitation binding Customer | Deviation | § 12.4 | One-way 24-month post-term no-hire covering any Vendor employee, expressly negating general-advertising and unsolicited-approach carve-outs; contradicts § 12.3. Narrow to a mutual 12-month non-solicit of personnel directly involved in the Services with customary carve-outs. |
| Medium | RENEWAL — Auto-renewal and notice window | Compliant | § 8.2 (with § 8.3) | Meets preferred position: successive 12-month renewals, 30 days' opt-out, 60-day Vendor reminder with deadline extension if missed, and uplift capped at lesser of CPI and 3%. Runs in our favour — no redline. |
| Medium | TRANSITION — Transition assistance and data return | Missing | § 10.1 | No exit-assistance, export, return or deletion obligation; § 10.1 presupposes a transition period without creating one, and § 16.5 defers Customer Data to a non-existent Section 11. Insert new § 10.3: up to six months' assistance at then-current rates, data return in machine-readable format within 30 days, certified deletion thereafter. |
| Medium | WARRANTY — Performance warranty and duration | Compliant | § 19.1 (with §§ 19.2–19.5) | Meets preferred position: professional/workmanlike and conformity warranties, 90-day Deliverable and full-term hosted warranty, malicious code / law / open-source protections, full remedy ladder including terminate-and-refund, and a mutual disclaimer that does not swallow express warranties. No redline. |
| Low | INSURANCE — Vendor insurance | Compliant | § 18.1 (with § 18.2) | Meets preferred position on every material limit, including USD 5,000,000 cyber and privacy liability, term plus one year, certificates and cancellation notice. Runs in our favour — no redline. |

---

## 3. Walk-away items

The following findings sit in walk-away territory under the playbook and should be treated as conditions of signature rather than negotiating preferences:

1. **No Vendor indemnity (new § 20 required).** The complete absence of a Vendor IP-infringement indemnity is walk-away, and the Agreement's own cross-references assume one exists.
2. **§ 14.2 — Deliverable licence.** Revocable at Vendor's discretion, term-limited, and excluding Affiliates and contractors.
3. **§ 12.4 — Non-compete.** Post-term restriction beyond 12 months, undefined scope, no territory limit, and no internal-development or acquisition carve-out.
4. **§ 12.4 — No-hire.** 24-month post-term no-hire covering all Vendor employees with carve-outs expressly negated.
5. **No Customer termination for convenience.** Absence of any convenience right in a term longer than 12 months.
6. **§ 7.2 — Disclose-and-match / MFN.** Open-ended exclusivity and MFN obligations imposed on us.
7. **§ 2.1 — Take-or-pay.** Three-year commitment expressly without reduction or termination rights.
8. **§ 28.1 — Singapore law and exclusive Singapore jurisdiction.**

We would also treat the § 14.2 ownership position (IP rule) as effectively non-negotiable in its current form, since it fails both the preferred and fallback positions for work product we commission and pay for under § 1.4.

---

## 4. Next steps

1. **Issue the redline** covering the ten deviation and missing findings: new § 20 (Indemnification), new § 10.3 (Transition and data return), a new Customer convenience-termination right with a conforming edit to § 2.1, reversal of § 14.2 ownership and licence terms, deletion of § 12.4's non-compete, narrowing of § 12.4's no-hire, deletion of § 7.2 (first instance), narrowing of § 2.1's take-or-pay to the fallback, and substitution of New York law in § 28.1.
2. **Flag the internal inconsistencies to Vendor** as drafting defects it should resolve in its own interest: the § 12.3 acknowledgement contradicting §§ 2.1, 7.2 and 12.4; the § 28.1/§ 28.2 jurisdiction conflict; the duplicate clause numbering at 7.2; the orphaned § 20.5 cross-reference in § 9.3; and the reference in § 16.5 to a non-existent Section 11.
3. **Confirm the commercial mandate on § 2.1** before the first call. We have proposed the fallback (single 12-month commitment, reducible on 30 days' notice, true-up rather than penalty) rather than deletion, on the assumption that committed spend is central to the pricing. Please confirm whether deletion is the preferred ask.
4. **Hold the compliant clauses.** Sections 8, 18, 19, 21, 22 and 24 should be preserved as drafted; we will resist any Vendor attempt to reopen them in exchange for movement elsewhere, particularly the § 21.3 carve-outs, which the new indemnity article relies on.
5. **Escalate if Vendor refuses** on any walk-away item, and in particular on the indemnity and convenience-termination gaps, which cannot be cured by commercial concession.
```

## Apply and validation

No apply or output-validation event was recorded.
