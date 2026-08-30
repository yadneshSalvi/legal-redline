# Trajectory: cuad-bnc-mortgage-hosting

| Run | Value |
|---|---|
| Contract | cuad-bnc-mortgage-hosting — EXHIBIT 10.4 |
| Config | final |
| Parties | Mortgage Logic.com, Inc. (our party) ↔ TrueLink, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 4m 24.4s (264,433 ms) |
| Calls | 140 LLM · 163 tool · 0 retries |
| Tokens | 48,357 input · 76,989 output · 887,055 cache read · 151,449 cache write |
| Cost | $3.556594 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 566 | 120 | 163 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 639](trajectory.jsonl#L639) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 155](trajectory.jsonl#L155)–[seq 642](trajectory.jsonl#L642) |
| assembler | 21 | 0 | 0 | — | [seq 172](trajectory.jsonl#L172)–[seq 650](trajectory.jsonl#L650) |
| memo | 4 | 1 | 0 | — | [seq 646](trajectory.jsonl#L646)–[seq 649](trajectory.jsonl#L649) |
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

- [seq 13](trajectory.jsonl#L13) **drafter → list_sections**

```json
{}
```

- [seq 14](trajectory.jsonl#L14) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 15](trajectory.jsonl#L15) **drafter → search**

```json
{"query":"liability","limit":30}
```

- [seq 16](trajectory.jsonl#L16) **search result**

```json
[{"paragraphId":"p0041","sectionRef":"§ 2 LICENSE.","snippet":"…, or logo of any third party. TrueLink will not be responsible for, or have any liability in connection with, the operation of the Web Site with respect to online commer…"},{"paragraphId":"p0042","sectionRef":"§ 2 LICENSE.","snippet":"… the Interface. TrueLink makes no representation or warranty, and shall have no liability for the t…
```

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"consequential","limit":10}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[]
```

- [seq 85](trajectory.jsonl#L85) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 86](trajectory.jsonl#L86) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 121](trajectory.jsonl#L121) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"One-sided vendor-only cap limited to certain sections; customer uncapped; no carve-out sentence"}
```

- [seq 140](trajectory.jsonl#L140) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-lol-1","source":"Acme Cloud MSA (Mar 2025)","clauseAfter":"Except for Excluded Claims, each party's aggregate liability shall not exceed fees paid or payable in the prior twelve months.","comment":"[Playbook] We made the cap mutual and aligned it to twelve months' fees, with standard carve-outs.","level":"fallback"},{"id":"seed-lol-2","source":"Northstar Hosting Agreeme…
```

- [seq 161](trajectory.jsonl#L161) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-lol-2","summary":"Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees and USD 1,000,000, and add standard uncapped carve-outs.","comment":"[Playbook] The current cap protects only TrueLink and only for Sections 3, 4, 7 and 11, leaving Client's liability entirely uncapped; our position is a mutual cap at the greater of twelve months' fees and USD 1,000,000. We have kept indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement outside the cap, and confirmed Client's payment obligations are not limited by it.","ops":[{"kind":"replace","paragraphId":"p0077","oldText":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE 12 MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) USD 1,000,000. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS UNDER SECTION 12, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER SECTION 5 SHALL NOT BE SUBJECT TO THIS LIMITATION."}]}
```

- [seq 162](trajectory.jsonl#L162) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0077","segments":[{"type":"insert","text":"EXCEPT FOR EXCLUDED CLAIMS, "},{"type":"equal","text":"IN NO EVENT SHALL "},{"type":"delete","text":"TRUELINK'S "},{"type":"insert","text":"EITHER PARTY'S TOTAL AGGREGATE "},{"type":"equal","text":"LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO "},{"type":"delete","text":"SECTION 3, 4, 7 AND 11 TH…
```

- [seq 181](trajectory.jsonl#L181) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0077","p0071","p0072"],"quote":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","rationale":"The only cap in the Agreement (p0077, inside the indemnity section) is one-sided: it limits TrueLink's liability to 12 months' hosting and support compensation, while Client's liability — including the very broad indemnity at Sections 12a(i)–(iv) — is entirely uncapped. That is expressly walk-away territory under LOL-CAP (\"Customer's liability uncapped while Vendor's is capped\") and fails the fallback, which requires a mutual cap. There is also no exclusion of indirect/consequential damages anywhere in the document and no carve-out set beyond TrueLink's own gross negligence/wilful misconduct. Our redline makes the cap mutual and agreement-wide at the greater of 12 months' fees and USD 1,000,000, and adds the standard Excluded Claims carve-out (confidentiality/data security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement) plus confirmation that Client's payment obligations are not limited by the cap. Note the fee basis rests on Exhibits A and B, which are still blank; the 12-month compensation measure remains meaningful once those charges are populated.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-lol-2","summary":"Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees and USD 1,000,000, and add standard uncapped carve-outs.","comment":"[Playbook] The current cap protects only TrueLink and only for Sections 3, 4, 7 and 11, leaving Client's liability entirely uncapped; our position is a mutual cap at the greater of twelve months' fees and USD 1,000,000. We have kept indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement outside the cap, and confirmed Client's payment obligations are not limited by it.","ops":[{"kind":"replace","paragraphId":"p0077","oldText":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE 12 MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) USD 1,000,000. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS UNDER SECTION 12, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER SECTION 5 SHALL NOT BE SUBJECT TO THIS LIMITATION."}]}}
```

- [seq 182](trajectory.jsonl#L182) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 181](trajectory.jsonl#L181)
- Finding: `f-lol-cap-6a63cb36` · **deviation** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.”
- Rationale: The only cap in the Agreement (p0077, inside the indemnity section) is one-sided: it limits TrueLink's liability to 12 months' hosting and support compensation, while Client's liability — including the very broad indemnity at Sections 12a(i)–(iv) — is entirely uncapped. That is expressly walk-away territory under LOL-CAP ("Customer's liability uncapped while Vendor's is capped") and fails the fallback, which requires a mutual cap. There is also no exclusion of indirect/consequential damages anywhere in the document and no carve-out set beyond TrueLink's own gross negligence/wilful misconduct. Our redline makes the cap mutual and agreement-wide at the greater of 12 months' fees and USD 1,000,000, and adds the standard Excluded Claims carve-out (confidentiality/data security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement) plus confirmation that Client's payment obligations are not limited by the cap. Note the fee basis rests on Exhibits A and B, which are still blank; the 12-month compensation measure remains meaningful once those charges are populated.
- Proposal: **preferred** — Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees and USD 1,000,000, and add standard uncapped carve-outs.
- Comment: [Playbook] The current cap protects only TrueLink and only for Sections 3, 4, 7 and 11, leaving Client's liability entirely uncapped; our position is a mutual cap at the greater of twelve months' fees and USD 1,000,000. We have kept indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement outside the cap, and confirmed Client's payment obligations are not limited by it.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE 12 MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) USD 1,000,000. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS UNDER SECTION 12, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER SECTION 5 SHALL NOT BE SUBJECT TO THIS LIMITATION.",
    "oldText": "IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.",
    "paragraphId": "p0077"
  }
]
```

### Verifier and repair feedback

- [seq 235](trajectory.jsonl#L235) **Verdict: pass** — Classification is correct: the sole cap (p0077) protects only TrueLink, is limited to Sections 3, 4, 7 and 11, and leaves Client's liability — including the very broad one-way indemnity at Section 12a(i)–(iv) — entirely uncapped, which is expressly walk-away territory under LOL-CAP and fails the mutual-cap fallback. Redline reaches the playbook position: mutual, agreement-wide aggregate cap at the greater of 12 months' hosting/support compensation and USD 1,000,000, with the standard Excluded Claims set (confidentiality/data security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement) and confirmation that Client's payment obligations are outside the cap. The failed minimal-edit heuristic (0.795 changed-character ratio) is acceptable here: converting a one-sided, section-limited Vendor-only cap into a mutual agreement-wide cap with carve-outs necessarily requires rewriting the sentence, and the drafter preserved the original fee basis (hosting and support compensation) and the all-caps formatting rather than replacing the section. Comment is accurate, appropriately concise, cites the playbook position and explains that indemnities/confidentiality sit outside the cap; it does not misstate the existing text. Minor, non-fatal gaps noted only: no mutual exclusion of indirect/consequential damages was added (a preferred-position sub-element the rationale acknowledges), and the cross-references to Sections 5 and 12 should be confirmed against the fee and indemnity sections. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimal edit p0077","ok":false,"detail":"changed-character ratio=0.795 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 19](trajectory.jsonl#L19) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 20](trajectory.jsonl#L20) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 59](trajectory.jsonl#L59) **drafter → search**

```json
{"query":"infring"}
```

- [seq 60](trajectory.jsonl#L60) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 2 LICENSE.","snippet":"software or services do not infringe upon any of TrueLink's Intellectual Property. Nothing in the foregoing sentenc…"},{"paragraphId":"p0041","sectionRef":"§ 2 LICENSE.","snippet":"… to TrueLink in order to establish that no domain name proposed by Client shall infringe upon the trademark, service mark, name, or logo of any third part…
```

- [seq 61](trajectory.jsonl#L61) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 62](trajectory.jsonl#L62) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 101](trajectory.jsonl#L101) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"Vendor indemnity lacks IP infringement prong; hosting/license agreement"}
```

- [seq 122](trajectory.jsonl#L122) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-indemn-2","source":"Vertex Data Processing Addendum (Jul 2025)","clauseAfter":"Vendor shall indemnify Customer for third-party claims arising from Vendor-caused data breaches, legal violations, gross negligence or wilful misconduct.","comment":"[Playbook] We added protection for third-party claims caused by Vendor's data handling and misconduct.","level":"preferred"},{"…
```

- [seq 147](trajectory.jsonl#L147) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0075","oldText":"claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder.","newText":"claim arising out of (i) any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder; (ii) any allegation that the Interface, the Hosting Services, the Support Services or any other materials or deliverables provided by TrueLink infringe or misappropriate any patent, copyright, trademark, trade secret or other intellectual property right; (iii) TrueLink's breach of any applicable law, rule or regulation; (iv) any unauthorized access to or disclosure of Client Content or other Client data caused by TrueLink; or (v) TrueLink's gross negligence or willful misconduct."}],"comment":"[Playbook] We expanded TrueLink's indemnity to cover third-party IP infringement claims relating to the Interface and Services, plus TrueLink's breach of law, Client-data breaches it causes, and its gross negligence or willful misconduct, since as drafted only Client gives a broad indemnity and TrueLink stands behind nothing on IP. Our playbook requires a vendor IP indemnity; we can discuss customary exclusions (Client modifications, combinations and specifications) and procure/modify/replace/refund remedies.","level":"preferred","summary":"Add IP infringement, breach of law, data breach and misconduct prongs to TrueLink's indemnity in Section 12(b).","precedentId":"seed-indemn-1"}
```

- [seq 148](trajectory.jsonl#L148) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0075","segments":[{"type":"equal","text":"claim arising out of "},{"type":"insert","text":"(i) "},{"type":"equal","text":"any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder"},{"type":"insert","text":"; (ii) any allegation that the Interface, the Hosting Service…
```

- [seq 175](trajectory.jsonl#L175) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0071","p0072","p0073","p0075"],"quote":"b. TrueLink shall indemnify and hold Client harmless, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to any","rationale":"Section 12 is materially one-sided: Client gives a very broad indemnity (breach, System/Credit Repository defaults, Web Site and Client Content, and product/service injury claims), while TrueLink's indemnity in 12(b)/p0075 is limited to claims arising from its own breach of the Agreement or failure to perform. There is no vendor IP indemnity anywhere in the document — no non-infringement warranty either (the only infringement references, p0024, p0041 and p0055, run against Client) — so the clause fails even the fallback position, which requires a Vendor IP indemnity. We therefore added IP infringement, breach of law, Vendor-caused data breach and gross negligence/wilful misconduct prongs to TrueLink's existing indemnity, which is the smallest edit reaching the preferred position. We have not disturbed the Section 12 liability cap (which by its terms covers Sections 3, 4, 7 and 11 only), and customary IP exclusions/remedies remain available as a fallback trade.","confidence":0.88,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0075","oldText":"claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder.","newText":"claim arising out of (i) any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder; (ii) any allegation that the Interface, the Hosting Services, the Support Services or any other materials or deliverables provided by TrueLink infringe or misappropriate any patent, copyright, trademark, trade secret or other intellectual property right; (iii) TrueLink's breach of any applicable law, rule or regulation; (iv) any unauthorized access to or disclosure of Client Content or other Client data caused by TrueLink; or (v) TrueLink's gross negligence or willful misconduct."}],"comment":"[Playbook] We expanded TrueLink's indemnity to cover third-party IP infringement claims relating to the Interface and Services, plus TrueLink's breach of law, Client-data breaches it causes, and its gross negligence or willful misconduct, since as drafted only Client gives a broad indemnity and TrueLink stands behind nothing on IP. Our playbook requires a vendor IP indemnity; we can discuss customary exclusions (Client modifications, combinations and specifications) and procure/modify/replace/refund remedies.","level":"preferred","summary":"Add IP infringement, breach of law, data breach and misconduct prongs to TrueLink's indemnity in Section 12(b).","precedentId":"seed-indemn-1"}}
```

- [seq 176](trajectory.jsonl#L176) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 175](trajectory.jsonl#L175)
- Finding: `f-indemn-f419dd9f` · **deviation** · confidence 0.88
- Location: § 12 INDEMNITY.
- Quote: “b. TrueLink shall indemnify and hold Client harmless, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to any”
- Rationale: Section 12 is materially one-sided: Client gives a very broad indemnity (breach, System/Credit Repository defaults, Web Site and Client Content, and product/service injury claims), while TrueLink's indemnity in 12(b)/p0075 is limited to claims arising from its own breach of the Agreement or failure to perform. There is no vendor IP indemnity anywhere in the document — no non-infringement warranty either (the only infringement references, p0024, p0041 and p0055, run against Client) — so the clause fails even the fallback position, which requires a Vendor IP indemnity. We therefore added IP infringement, breach of law, Vendor-caused data breach and gross negligence/wilful misconduct prongs to TrueLink's existing indemnity, which is the smallest edit reaching the preferred position. We have not disturbed the Section 12 liability cap (which by its terms covers Sections 3, 4, 7 and 11 only), and customary IP exclusions/remedies remain available as a fallback trade.
- Proposal: **preferred** — Add IP infringement, breach of law, data breach and misconduct prongs to TrueLink's indemnity in Section 12(b).
- Comment: [Playbook] We expanded TrueLink's indemnity to cover third-party IP infringement claims relating to the Interface and Services, plus TrueLink's breach of law, Client-data breaches it causes, and its gross negligence or willful misconduct, since as drafted only Client gives a broad indemnity and TrueLink stands behind nothing on IP. Our playbook requires a vendor IP indemnity; we can discuss customary exclusions (Client modifications, combinations and specifications) and procure/modify/replace/refund remedies.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "claim arising out of (i) any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder; (ii) any allegation that the Interface, the Hosting Services, the Support Services or any other materials or deliverables provided by TrueLink infringe or misappropriate any patent, copyright, trademark, trade secret or other intellectual property right; (iii) TrueLink's breach of any applicable law, rule or regulation; (iv) any unauthorized access to or disclosure of Client Content or other Client data caused by TrueLink; or (v) TrueLink's gross negligence or willful misconduct.",
    "oldText": "claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder.",
    "paragraphId": "p0075"
  }
]
```

### Verifier and repair feedback

- [seq 219](trajectory.jsonl#L219) **Verdict: pass** — Classification is correct: TrueLink's indemnity in p0073/p0075 covers only its own breach/non-performance, with no IP infringement prong anywhere in the agreement, so the clause fails even the fallback position (which requires a Vendor IP indemnity). This is a genuine deviation, not an acceptable fallback. The redline is valid and directionally right: it preserves the original breach/non-performance prong and appends IP infringement, breach of law, Vendor-caused data breach, and gross negligence/wilful misconduct prongs to the existing vendor indemnity — the smallest edit that reaches the playbook position, and it uses terms present in the document (Interface, Client Content) with a catch-all for deliverables. The failed regex check ('vendor indemnity for IP infringement present') is a phrasing artifact — the inserted text expressly covers allegations that the Interface/Services 'infringe or misappropriate any patent, copyright, trademark, trade secret or other intellectual property right'. The 0.756 changed-character ratio is expected when adding four new indemnity prongs to a single short clause and does not indicate over-editing. Comment is accurate, concise, on-tone, cites the playbook position, and offers the customary exclusions/remedies fallback as a trade. Noted but not fatal: the drafter did not narrow Client's broad indemnity in p0071–p0072 and did not add an express 'defend' obligation or a 3x super-cap. The fallback position does not condition compliance on narrowing the Customer indemnity, and these are sub-elements short of preferred wording appropriately handled in the rationale rather than blocking the fix to the core deficiency. Checks: {"name":"operation 1 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":false}; {"name":"minimal edit p0075","ok":false,"detail":"changed-character ratio=0.756 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"compet","limit":30}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…dit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."},{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…term, provision, covenant, or condition of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable, the…
```

- [seq 65](trajectory.jsonl#L65) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 66](trajectory.jsonl#L66) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"Non-Competition Agreement","limit":20}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"… Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."}]
```

- [seq 95](trajectory.jsonl#L95) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 96](trajectory.jsonl#L96) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 97](trajectory.jsonl#L97) **drafter → get_definition**

```json
{"term":"Non-Competition Agreement"}
```

- [seq 98](trajectory.jsonl#L98) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 125](trajectory.jsonl#L125) **drafter → search**

```json
{"query":"shall not","limit":30}
```

- [seq 126](trajectory.jsonl#L126) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"Client shall not engage in the practice commonly known as \"spamming\" pursuant to the rights gran…"},{"paragraphId":"p0052","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"b. Notification. Client shall not represent that loan underwriting decisions related to loans originated by using…"},{"parag…
```

- [seq 127](trajectory.jsonl#L127) **drafter → search**

```json
{"query":"exclusiv","limit":20}
```

- [seq 128](trajectory.jsonl#L128) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 2 LICENSE.","snippet":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the ori…"},{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…Data during the term of this Agreement. Client hereby grants to TrueLink the nonexclusive worldwide right …
```

- [seq 157](trajectory.jsonl#L157) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0022","p0024","p0054"],"quote":"Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder, so long as such","rationale":"The Agreement contains no non-compete, exclusivity or competitive-restraint covenant binding Client. Section 8 (Covenants and Warranties of Client) is limited to legal compliance, non-misrepresentation of underwriting decisions, access controls, content warranties and anti-spam; Sections 7, 10 and 12 likewise impose no business restraint. Section 2(a) affirmatively preserves our freedom to acquire, develop or license competing software and services, subject only to non-infringement of TrueLink's IP and our confidentiality obligations — which benefits us. The \"ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables\" wording in 2(a) is a scope-of-licence field-of-use limit on how the Interface may be used, not a restriction on the businesses we may operate or the products we may buy or build, so it does not engage this rule. The cross-reference in Section 8(d) to a separate Non-Competition Agreement operates as a limitation on TrueLink's rights to use Credit Data (again in our favour); that separate agreement is not part of this document and should be diligenced separately, but nothing here restrains Client. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is required.","confidence":0.88}
```

- [seq 158](trajectory.jsonl#L158) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 157](trajectory.jsonl#L157)
- Finding: `f-noncompete-81a93eb2` · **compliant** · confidence 0.88
- Location: § 2 LICENSE.
- Quote: “Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder, so long as such”
- Rationale: The Agreement contains no non-compete, exclusivity or competitive-restraint covenant binding Client. Section 8 (Covenants and Warranties of Client) is limited to legal compliance, non-misrepresentation of underwriting decisions, access controls, content warranties and anti-spam; Sections 7, 10 and 12 likewise impose no business restraint. Section 2(a) affirmatively preserves our freedom to acquire, develop or license competing software and services, subject only to non-infringement of TrueLink's IP and our confidentiality obligations — which benefits us. The "ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables" wording in 2(a) is a scope-of-licence field-of-use limit on how the Interface may be used, not a restriction on the businesses we may operate or the products we may buy or build, so it does not engage this rule. The cross-reference in Section 8(d) to a separate Non-Competition Agreement operates as a limitation on TrueLink's rights to use Credit Data (again in our favour); that separate agreement is not part of this document and should be diligenced separately, but nothing here restrains Client. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is required.

### Verifier and repair feedback

- [seq 199](trajectory.jsonl#L199) **Verdict: pass** — Claimed status is compliant and the cited text supports it: Section 2(a) affirmatively preserves Client's freedom to acquire, develop or license competing software/services, with the only limits being non-infringement of TrueLink IP and existing confidentiality obligations — both neutral/favourable to us. The 'ordinary course of its business of origination, underwriting, processing and funding of consumer finance receivables' language is correctly characterised as a scope-of-licence limit on use of the Interface, not a restraint on the businesses Client may operate or the products it may buy or build, so the NONCOMPETE rule is not engaged. Section 8(d)'s cross-reference to a separate Non-Competition Agreement constrains TrueLink's use of Credit Data (in our favour); the rationale appropriately flags it for separate diligence without treating it as an in-document restraint on Client. Consistent with a compliant finding, no redline or counterparty comment was proposed, and the paragraphs are rendered unchanged; the deterministic check (no open-ended compete restriction on Customer) also passes. Checks: {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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

- [seq 25](trajectory.jsonl#L25) **drafter → search**

```json
{"query":"exclusive","limit":30}
```

- [seq 26](trajectory.jsonl#L26) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 2 LICENSE.","snippet":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the orig…"},{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…Data during the term of this Agreement. Client hereby grants to TrueLink the nonexclusive worldwide right…
```

- [seq 27](trajectory.jsonl#L27) **drafter → list_sections**

```json
{}
```

- [seq 28](trajectory.jsonl#L28) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 53](trajectory.jsonl#L53) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 54](trajectory.jsonl#L54) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"sole","limit":30}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…ion and make any upgrades specified by TrueLink to so comply, all at TrueLink's sole cost and expense, to the extent such upgrades were not previously requested by …"},{"paragraphId":"p0094","sectionRef":"§ 12 INDEMNITY.","snippet":"…etween the parties that cannot be settled by mutual agreement shall be reso…
```

- [seq 89](trajectory.jsonl#L89) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 90](trajectory.jsonl#L90) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 91](trajectory.jsonl#L91) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 92](trajectory.jsonl#L92) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 115](trajectory.jsonl#L115) **drafter → search**

```json
{"query":"Non-Competition","limit":20}
```

- [seq 116](trajectory.jsonl#L116) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"… Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."}]
```

- [seq 117](trajectory.jsonl#L117) **drafter → search**

```json
{"query":"shall order","limit":20}
```

- [seq 118](trajectory.jsonl#L118) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 2 LICENSE.","snippet":"…ueLink and Client dated of even date herewith. Subject to the foregoing, Client shall order TrueLink a credit report on each borrower for which an underwriting approval is…"}]
```

- [seq 143](trajectory.jsonl#L143) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0022","p0024","p0042"]}
```

- [seq 144](trajectory.jsonl#L144) **read_paragraphs result**

```json
[{"id":"p0022","sectionRef":"§ 2 LICENSE.","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acqu…
```

- [seq 165](trajectory.jsonl#L165) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0022","p0024","p0042"],"quote":"Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder","rationale":"The Agreement imposes no exclusivity or sole-supplier obligation on Client, which is the preferred position. Section 2(a) grants only a non-exclusive licence and expressly confirms Client is not obligated to use the Interface and remains free to acquire, develop or licence competing software and services (subject only to TrueLink's IP and confidentiality rights). Section 8 contains no covenant restricting Client's sourcing (the only exclusivity-type language there — the licence of Credit Data to TrueLink — is expressly \"nonexclusive\"), and Section 5/6 do not tie pricing to exclusive volume; Section 6 in fact benefits us with a most-favoured-rate undertaking. The one narrow tie is Section 3(i) (p0042), requiring Client to order the credit report from TrueLink for each borrower underwritten through a System using the Interface; this is a use-contingent requirement limited to a single defined product category (credit reports pulled via the Interface), does not restrict Client's procurement generally, and given Client's express freedom not to use the Interface at all it sits within the fallback rather than constituting exclusive dealing. Noted for information only, not redlined. The referenced Non-Competition Agreement is a separate instrument and is invoked here only to limit TrueLink's use of Credit Data.","confidence":0.85}
```

- [seq 166](trajectory.jsonl#L166) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 165](trajectory.jsonl#L165)
- Finding: `f-exclusivity-ae2e8726` · **compliant** · confidence 0.85
- Location: § 2 LICENSE.
- Quote: “Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder”
- Rationale: The Agreement imposes no exclusivity or sole-supplier obligation on Client, which is the preferred position. Section 2(a) grants only a non-exclusive licence and expressly confirms Client is not obligated to use the Interface and remains free to acquire, develop or licence competing software and services (subject only to TrueLink's IP and confidentiality rights). Section 8 contains no covenant restricting Client's sourcing (the only exclusivity-type language there — the licence of Credit Data to TrueLink — is expressly "nonexclusive"), and Section 5/6 do not tie pricing to exclusive volume; Section 6 in fact benefits us with a most-favoured-rate undertaking. The one narrow tie is Section 3(i) (p0042), requiring Client to order the credit report from TrueLink for each borrower underwritten through a System using the Interface; this is a use-contingent requirement limited to a single defined product category (credit reports pulled via the Interface), does not restrict Client's procurement generally, and given Client's express freedom not to use the Interface at all it sits within the fallback rather than constituting exclusive dealing. Noted for information only, not redlined. The referenced Non-Competition Agreement is a separate instrument and is invoked here only to limit TrueLink's use of Credit Data.

### Verifier and repair feedback

- [seq 205](trajectory.jsonl#L205) **Verdict: pass** — Claimed status is compliant, and the cited text supports it: Section 2(a) grants only a non-exclusive licence and expressly confirms Client is not obligated to use the Interface and remains free to acquire, develop or licence competing software/services — the preferred position (no exclusivity or sole-supplier obligation on Customer). The only sourcing tie (Section 3(i), p0042) requires a TrueLink credit report solely for borrowers underwritten through a System using the Interface; it is use-contingent, confined to a single narrow product category, and does not restrict Client's general procurement, so it sits at or above the fallback rather than being exclusive dealing for the full term. Consistent with a compliant finding, no redline was proposed (rendered text is identical to the original) and no counterparty comment was generated; the deterministic check confirming no requirements/sole-supplier obligation on Customer passes. Rationale correctly notes the sub-element (the Section 3(i) tie and the separate Non-Competition Agreement) for information only rather than flagging it, which matches the playbook's classification semantics; retaining this as internal evidence rather than a negotiation issue is appropriate. Checks: {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}.

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

- [seq 43](trajectory.jsonl#L43) **drafter → search**

```json
{"query":"most favored"}
```

- [seq 44](trajectory.jsonl#L44) **search result**

```json
[]
```

- [seq 45](trajectory.jsonl#L45) **drafter → search**

```json
{"query":"no less favorable"}
```

- [seq 46](trajectory.jsonl#L46) **search result**

```json
[]
```

- [seq 77](trajectory.jsonl#L77) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 78](trajectory.jsonl#L78) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[]
```

- [seq 109](trajectory.jsonl#L109) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 110](trajectory.jsonl#L110) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 111](trajectory.jsonl#L111) **drafter → search**

```json
{"query":"any other party"}
```

- [seq 112](trajectory.jsonl#L112) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"… rates charged for Hosting Services will not exceed that charged by TrueLink to any other party."}]
```

- [seq 135](trajectory.jsonl#L135) **drafter → search**

```json
{"query":"best price"}
```

- [seq 136](trajectory.jsonl#L136) **search result**

```json
[]
```

- [seq 137](trajectory.jsonl#L137) **drafter → search**

```json
{"query":"will not exceed"}
```

- [seq 138](trajectory.jsonl#L138) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…ear from the date of this Agreement and that rates charged for Hosting Services will not exceed that charged by TrueLink to any other party."}]
```

- [seq 151](trajectory.jsonl#L151) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047"],"quote":"TrueLink agrees that the costs for any Hosting Services will not increase for a period of one year from the date of this Agreement and that rates charged for Hosting Services will not exceed that charged by TrueLink to any other party.","rationale":"The only most-favoured-nation language in the Agreement runs in our favour: § 6 (p0047) obliges TrueLink to keep Hosting Services rates at or below those charged to any other party (plus a one-year price freeze). Nothing in the COMPENSATION section (§ 5, p0044–p0047) or the Client covenants (§ 8, p0050–p0058) requires Client to extend TrueLink terms no less favourable than those given to third parties or to match third-party offers, and searches for MFN-style wording (\"most favored\", \"no less favorable\", \"best price\", \"any other party\") surface no Client-side obligation. This meets the preferred position — no MFN burdening Customer — so per the detection guidance we do not redline the Vendor-granted MFN.","confidence":0.9}
```

- [seq 152](trajectory.jsonl#L152) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 151](trajectory.jsonl#L151)
- Finding: `f-mfn-ead09424` · **compliant** · confidence 0.90
- Location: § 5 COMPENSATION.
- Quote: “TrueLink agrees that the costs for any Hosting Services will not increase for a period of one year from the date of this Agreement and that rates charged for Hosting Services will not exceed that charged by TrueLink to any other party.”
- Rationale: The only most-favoured-nation language in the Agreement runs in our favour: § 6 (p0047) obliges TrueLink to keep Hosting Services rates at or below those charged to any other party (plus a one-year price freeze). Nothing in the COMPENSATION section (§ 5, p0044–p0047) or the Client covenants (§ 8, p0050–p0058) requires Client to extend TrueLink terms no less favourable than those given to third parties or to match third-party offers, and searches for MFN-style wording ("most favored", "no less favorable", "best price", "any other party") surface no Client-side obligation. This meets the preferred position — no MFN burdening Customer — so per the detection guidance we do not redline the Vendor-granted MFN.

### Verifier and repair feedback

- [seq 187](trajectory.jsonl#L187) **Verdict: pass** — The cited § 6 MFN runs in the Customer's favour (TrueLink may not charge Client more than any other party, plus a one-year price freeze), which is exactly the preferred position under rule MFN. No Client-side obligation to extend or match third-party terms is identified, so there is no deviation to raise. Consistent with a compliant finding, the redline is unchanged and no comment was added; the rationale accurately cites the paragraph and explains why the Vendor-granted MFN is left intact. Checks: .

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

- [seq 37](trajectory.jsonl#L37) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 38](trajectory.jsonl#L38) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"paragraphId":"p0049","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"…s, forums, e-mail mailings lists or other similar groups or lists; or sending unsolicited mass e-mailings to more than twenty-five (25) e-mail users, if such unsolicit…"},{"paragraphId":"p0049"…
```

- [seq 39](trajectory.jsonl#L39) **drafter → list_sections**

```json
{}
```

- [seq 40](trajectory.jsonl#L40) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 71](trajectory.jsonl#L71) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 72](trajectory.jsonl#L72) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"employ|hire|induce|personnel|employee","regex":true}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[{"paragraphId":"p0053","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…nt Proprietary Information to restrict access to the Interface to its officers, employees, and agents as may be approved by Client."},{"paragraphId":"p0071","sectionRef":"§ 12 INDEMNITY.","snippet":"… Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licenso…
```

- [seq 103](trajectory.jsonl#L103) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 104](trajectory.jsonl#L104) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 105](trajectory.jsonl#L105) **drafter → search**

```json
{"query":"Non-Competition Agreement"}
```

- [seq 106](trajectory.jsonl#L106) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"… Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."}]
```

- [seq 131](trajectory.jsonl#L131) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0050","p0061"],"quote":"8. COVENANTS AND WARRANTIES OF CLIENT","rationale":"The Agreement contains no non-solicitation, no-hire or anti-raiding covenant binding the Client. Searches for \"solicit\", \"employ\", \"hire\", \"induce\", \"personnel\" and \"employee\" return only unrelated provisions: the sole \"unsolicited\" hits are the Section 7 commercial e-mail/spam restrictions (p0048-p0049), and the \"employee\" hits are the Section 8(c) access-restriction covenant (p0053) and the Section 12 indemnity beneficiary lists (p0071-p0073). The Client covenants in Section 8 (compliance with laws, notification, limitation on access, credit data license, content representations, spamming) and the Section 10 confidentiality provisions contain no restriction on hiring or soliciting TrueLink personnel, and the only cross-referenced side agreement (the Non-Competition Agreement, cited at p0054) is invoked solely as a limit on the use of Credit Data. This matches the playbook preferred position of no non-solicit on the Customer, so no redline is warranted. Nothing to flag — the absence of a restrictive covenant here benefits our party.","confidence":0.9}
```

- [seq 132](trajectory.jsonl#L132) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 131](trajectory.jsonl#L131)
- Finding: `f-nosolicit-d0cbdf6a` · **compliant** · confidence 0.90
- Location: § 8 COVENANTS AND WARRANTIES OF CLIENT
- Quote: “8. COVENANTS AND WARRANTIES OF CLIENT”
- Rationale: The Agreement contains no non-solicitation, no-hire or anti-raiding covenant binding the Client. Searches for "solicit", "employ", "hire", "induce", "personnel" and "employee" return only unrelated provisions: the sole "unsolicited" hits are the Section 7 commercial e-mail/spam restrictions (p0048-p0049), and the "employee" hits are the Section 8(c) access-restriction covenant (p0053) and the Section 12 indemnity beneficiary lists (p0071-p0073). The Client covenants in Section 8 (compliance with laws, notification, limitation on access, credit data license, content representations, spamming) and the Section 10 confidentiality provisions contain no restriction on hiring or soliciting TrueLink personnel, and the only cross-referenced side agreement (the Non-Competition Agreement, cited at p0054) is invoked solely as a limit on the use of Credit Data. This matches the playbook preferred position of no non-solicit on the Customer, so no redline is warranted. Nothing to flag — the absence of a restrictive covenant here benefits our party.

### Verifier and repair feedback

- [seq 171](trajectory.jsonl#L171) **Verdict: pass** — Claimed status is compliant and the playbook's preferred position for this rule is literally 'No non-solicit on Customer', so the documented absence of any non-solicit, no-hire or anti-raiding covenant binding the Client satisfies the preferred position. The rationale is specific and verifiable: it identifies where solicit/employ/hire/induce hits actually occur (Section 7 anti-spam 'unsolicited' language, Section 8(c) access restriction, Section 12 indemnity beneficiary lists) and confirms the cross-referenced Non-Competition Agreement is invoked only to limit Credit Data use, none of which create a hiring or solicitation restraint. No redline and no counterparty comment were generated, which is the correct output for a compliant finding; the rendered redline is identical to the original headings. The failed deterministic checks (duration ≤ 12 months, general-solicitation carve-out) are non-probative here because there is no non-solicit clause to measure — the regexes necessarily return 'number not found' when the covenant is absent. Correctly avoids flagging an absence that benefits our party; retained as internal evidence rather than a negotiation issue. Checks: {"name":"non-solicit duration ≤ 12 months","ok":false,"detail":"number not found"}; {"name":"general-solicitation carve-out present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 173](trajectory.jsonl#L173)

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

- [seq 191](trajectory.jsonl#L191) **drafter → list_sections**

```json
{}
```

- [seq 192](trajectory.jsonl#L192) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 193](trajectory.jsonl#L193) **drafter → search**

```json
{"query":"terminate","limit":50}
```

- [seq 194](trajectory.jsonl#L194) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whic……
```

- [seq 215](trajectory.jsonl#L215) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 216](trajectory.jsonl#L216) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 245](trajectory.jsonl#L245) **drafter → search**

```json
{"query":"Section 4","limit":20}
```

- [seq 246](trajectory.jsonl#L246) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…on supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (other than the minimum monthly fee…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…e entitled to contest any charge (other than the minimum monthly fees listed in Section 4…
```

- [seq 247](trajectory.jsonl#L247) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 248](trajectory.jsonl#L248) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 275](trajectory.jsonl#L275) **drafter → search**

```json
{"query":"suspend","limit":20}
```

- [seq 276](trajectory.jsonl#L276) **search result**

```json
[]
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"TrueLink may","limit":20}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[]
```

- [seq 307](trajectory.jsonl#L307) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0028"]}
```

- [seq 308](trajectory.jsonl#L308) **read_paragraphs result**

```json
[{"id":"p0028","sectionRef":"§ 2 LICENSE.","text":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."}]
```

- [seq 329](trajectory.jsonl#L329) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0079","p0078","p0045"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"Contrary to the planner's expectation, termination provisions do exist — they are mis-numbered and sit inside the block headed § 12 INDEMNITY (§ 13 Term at p0078, § 14 Termination at p0079).\n\nClient convenience right (preferred position met): § 14 lets Client terminate simply by delivering \"a written notice of its election to terminate this Agreement,\" with no cause requirement, no notice-period minimum and no early-termination fee or penalty anywhere in the Agreement. Services (and the fee obligation) run only to the last day of the month following the month of notice, i.e. an effective wind-down of roughly 30–60 days. This is at or better than the preferred position of 30 days' notice without penalty.\n\nVendor mid-term walk-away (preferred position met): TrueLink has no termination-for-convenience right. § 13 fixes a 1-year term with automatic one-year renewals, and TrueLink's only exit is a reciprocal notice of intent not to renew at the end of a term. The two mid-term triggers in § 13 (Client-caused breach of a System/Credit Repository Agreement, or breach of §§ 8a–8c) are for-cause, not convenience, and they terminate only §§ 2 and 3 rather than the Agreement.\n\nSub-elements short of the model language, noted rather than flagged: (i) there is no express pro-rata refund of prepaid fees — commercially immaterial here because § 5a bills Hosting and Support Services monthly by invoice payable within 15 days, so Client does not prepay; and (ii) TrueLink's end-of-term non-renewal notice is 30 days rather than the fallback's 90 days. The latter is a symmetric non-renewal right in a 12-month (not multi-year) term that Client enjoys on identical terms, so it is not a mid-term vendor walk-away and we would not spend leverage on it; if the term is ever extended to multiple years we should revisit lengthening TrueLink's non-renewal notice to 90 days.\n\nOne drafting point worth correcting on a housekeeping pass (not a T4C deviation): § 2c (p0028) and § 13 both cross-reference \"Section 12\" for termination, but the termination mechanic is actually § 14 — § 12 is the indemnity clause.","confidence":0.82}
```

- [seq 330](trajectory.jsonl#L330) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 549](trajectory.jsonl#L549)
- Finding: `f-t4c-9718b410` · **compliant** · confidence 0.82
- Location: § 12 INDEMNITY.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: Contrary to the planner's expectation, termination provisions do exist — they are mis-numbered and sit inside the block headed § 12 INDEMNITY (§ 13 Term at p0078, § 14 Termination at p0079).

Client convenience right (preferred position met): § 14 lets Client terminate simply by delivering "a written notice of its election to terminate this Agreement," with no cause requirement, no notice-period minimum and no early-termination fee or penalty anywhere in the Agreement. Services (and the fee obligation) run only to the last day of the month following the month of notice, i.e. an effective wind-down of roughly 30–60 days. This is at or better than the preferred position of 30 days' notice without penalty.

Vendor mid-term walk-away (preferred position met): TrueLink has no termination-for-convenience right. § 13 fixes a 1-year term with automatic one-year renewals, and TrueLink's only exit is a reciprocal notice of intent not to renew at the end of a term. The two mid-term triggers in § 13 (Client-caused breach of a System/Credit Repository Agreement, or breach of §§ 8a–8c) are for-cause, not convenience, and they terminate only §§ 2 and 3 rather than the Agreement.

Sub-elements short of the model language, noted rather than flagged: (i) there is no express pro-rata refund of prepaid fees — commercially immaterial here because § 5a bills Hosting and Support Services monthly by invoice payable within 15 days, so Client does not prepay; and (ii) TrueLink's end-of-term non-renewal notice is 30 days rather than the fallback's 90 days. The latter is a symmetric non-renewal right in a 12-month (not multi-year) term that Client enjoys on identical terms, so it is not a mid-term vendor walk-away and we would not spend leverage on it; if the term is ever extended to multiple years we should revisit lengthening TrueLink's non-renewal notice to 90 days.

One drafting point worth correcting on a housekeeping pass (not a T4C deviation): § 2c (p0028) and § 13 both cross-reference "Section 12" for termination, but the termination mechanic is actually § 14 — § 12 is the indemnity clause.

### Verifier and repair feedback

- [seq 381](trajectory.jsonl#L381) **Verdict: pass** — Claimed status is compliant, and the finding correctly proposes no redline and no counterparty comment — the rendered redline is identical to the originals, consistent with a retained-evidence (non-negotiated) finding. The cited text supports compliance: § 14 gives Client an at-will right to terminate on written notice (no cause, no minimum notice, no early-termination fee), with services and fees running only to the end of the following month (~30–60 days), which meets or beats the preferred 30-day convenience right without penalty. Vendor side also meets the preferred position: § 13 fixes a 1-year auto-renewing term and TrueLink's only exit is a symmetric end-of-term non-renewal notice; the two mid-term triggers are for-cause (and partial, affecting only §§ 2–3), so there is no Vendor mid-term convenience walk-away. Sub-elements short of the model language are correctly noted rather than flagged: no express pro-rata refund (immaterial because § 5a bills monthly in arrears, so Client does not prepay) and TrueLink's 30-day non-renewal notice versus the fallback's 90 days — a symmetric right in a 12-month (not multi-year) term that equally benefits Client, so it is not a mid-term vendor convenience right. The failed deterministic check ('Customer convenience termination present') is a phrasing artefact: § 14 never uses the words 'for convenience' but grants an unqualified election to terminate, so the substance is present. The drafting note on the mis-numbered cross-references to 'Section 12' (actual termination mechanic is § 14) is accurately flagged as housekeeping rather than a T4C deviation. Checks: {"name":"Customer convenience termination present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 189](trajectory.jsonl#L189)

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

- [seq 209](trajectory.jsonl#L209) **drafter → list_sections**

```json
{}
```

- [seq 210](trajectory.jsonl#L210) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 211](trajectory.jsonl#L211) **drafter → search**

```json
{"query":"renew","limit":30}
```

- [seq 212](trajectory.jsonl#L212) **search result**

```json
[{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…b) any violations or breach by Client of Sections 8a - 8c. This Agreement shall renew automatically thereafter for successive one year periods until terminated pursu…"},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"… either Client or TrueLink deliver to the other written notice of intent not to renew no later th…
```

- [seq 251](trajectory.jsonl#L251) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0076","p0077","p0078","p0079","p0080"]}
```

- [seq 252](trajectory.jsonl#L252) **read_paragraphs result**

```json
[{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY OR FOR ANY MATTER RELATING TO THE ACCURACY OR COMPLETENESS, OR TIMING OF TRANSMISSION OF ANY DATA SUBMITTED THROUGH THE INTERFACE OR TO OR FROM THE WEB SIT…
```

- [seq 253](trajectory.jsonl#L253) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 254](trajectory.jsonl#L254) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 281](trajectory.jsonl#L281) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0078","p0047"],"quote":"This Agreement shall renew automatically thereafter for successive one year periods until terminated pursuant to Section 12 herein or unless either Client or TrueLink deliver to the other written notice of intent not to renew no later than thirty (30) days prior to the end of said year.","rationale":"Section 13 (p0078) sets a 1-year initial term with automatic renewal for successive one-year (not multi-year) periods, and either party — including us — may prevent renewal on written notice given only 30 days before the end of the term. That is a 12-month renewal term with a 30-day non-renewal window, which meets the preferred position and is well inside both the fallback (≤60 days) and walk-away (>90 days / multi-year) thresholds. Section 14 (p0079) additionally lets Client exit on notice effective the last day of the following month, further easing exit in our favour. Two preferred sub-elements are absent but are minor and not redlined: there is no Vendor obligation to send a renewal reminder 60 days out, and no express cap on renewal price increases — Section 6 (p0047) only freezes Hosting Services costs for the first year and adds a most-favoured-rate commitment, so uplift on later renewals is uncapped. We would raise the reminder and a CPI/3% uplift cap as drafting asks if the agreement is reopened, but neither failure is material under this rule.","confidence":0.86}
```

- [seq 282](trajectory.jsonl#L282) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 281](trajectory.jsonl#L281)
- Finding: `f-renewal-4d0df6e1` · **compliant** · confidence 0.86
- Location: § 12 INDEMNITY.
- Quote: “This Agreement shall renew automatically thereafter for successive one year periods until terminated pursuant to Section 12 herein or unless either Client or TrueLink deliver to the other written notice of intent not to renew no later than thirty (30) days prior to the end of said year.”
- Rationale: Section 13 (p0078) sets a 1-year initial term with automatic renewal for successive one-year (not multi-year) periods, and either party — including us — may prevent renewal on written notice given only 30 days before the end of the term. That is a 12-month renewal term with a 30-day non-renewal window, which meets the preferred position and is well inside both the fallback (≤60 days) and walk-away (>90 days / multi-year) thresholds. Section 14 (p0079) additionally lets Client exit on notice effective the last day of the following month, further easing exit in our favour. Two preferred sub-elements are absent but are minor and not redlined: there is no Vendor obligation to send a renewal reminder 60 days out, and no express cap on renewal price increases — Section 6 (p0047) only freezes Hosting Services costs for the first year and adds a most-favoured-rate commitment, so uplift on later renewals is uncapped. We would raise the reminder and a CPI/3% uplift cap as drafting asks if the agreement is reopened, but neither failure is material under this rule.

### Verifier and repair feedback

- [seq 333](trajectory.jsonl#L333) **Verdict: pass** — Cited Section 13 (p0078) is accurately characterized: automatic renewal for successive one-year (not multi-year) periods with either party able to block renewal on 30 days' written notice, which satisfies the preferred position on renewal term length and opt-out window and is far inside the walk-away thresholds. The two absent preferred sub-elements (60-day vendor reminder; CPI/3% uplift cap) are correctly noted in the rationale rather than redlined, consistent with the playbook's treatment of minor sub-elements; the Section 6 (p0047) one-year price freeze and most-favoured-rate commitment are described accurately. No redline or comment is proposed, which is the expected output for a compliant finding; the rendered text is unchanged from the original paragraphs. The failed deterministic check ('number not found') is a parsing artifact — the clause plainly states 'thirty (30) days prior to the end of said year', which is within the ≤60-day requirement — so it does not undermine the substance. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":false,"detail":"number not found"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 201](trajectory.jsonl#L201)

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

- [seq 223](trajectory.jsonl#L223) **drafter → list_sections**

```json
{}
```

- [seq 224](trajectory.jsonl#L224) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 225](trajectory.jsonl#L225) **drafter → search**

```json
{"query":"governed by the laws"}
```

- [seq 226](trajectory.jsonl#L226) **search result**

```json
[]
```

- [seq 257](trajectory.jsonl#L257) **drafter → search**

```json
{"query":"jurisdiction"}
```

- [seq 258](trajectory.jsonl#L258) **search result**

```json
[{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…ision, covenant, or condition of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable, the rest of the Agreement shall remain in full …"},{"paragraphId":"p0094","sectionRef":"§ 12 INDEMNITY.","snippet":"…cated within San Luis Obispo County, California, and each party consents to the jurisdicti…
```

- [seq 259](trajectory.jsonl#L259) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 260](trajectory.jsonl#L260) **search result**

```json
[]
```

- [seq 285](trajectory.jsonl#L285) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0090","p0091","p0092","p0093","p0094","p0095"]}
```

- [seq 286](trajectory.jsonl#L286) **read_paragraphs result**

```json
[{"id":"p0090","sectionRef":"§ 12 INDEMNITY.","text":"24. VALIDITY OF AGREEMENT. If any term, provision, covenant, or condition of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable, the rest of the Agreement shall remain in full force and effect and shall in no way be affected or invalidated. The provisions of Sections 1 and 5 through 30 this Agreement wil…
```

- [seq 311](trajectory.jsonl#L311) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0093","p0094"],"quote":"26. APPLICABLE LAW. This Agreement shall be governed, construed and interpreted in accordance with the laws of the State of California (without respect to principles of conflicts of law).","rationale":"Sections 26 (Applicable Law) and 27 (Venue) select California law with exclusive venue in the state or federal courts located in San Luis Obispo County, California. This sits at the playbook fallback (Delaware or California law and courts) rather than the preferred New York position, and the forum is a court forum — there is no arbitration provision anywhere in the Agreement, so walk-away territory (foreign venue or arbitration seated abroad) is not implicated. The only sub-preferred features are the choice of California over New York and the narrowing of venue to the Vendor's local county rather than a major commercial venue; these are noted but not material enough to redline given the fallback is met.","confidence":0.9}
```

- [seq 312](trajectory.jsonl#L312) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 311](trajectory.jsonl#L311)
- Finding: `f-govlaw-f65d9023` · **compliant** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “26. APPLICABLE LAW. This Agreement shall be governed, construed and interpreted in accordance with the laws of the State of California (without respect to principles of conflicts of law).”
- Rationale: Sections 26 (Applicable Law) and 27 (Venue) select California law with exclusive venue in the state or federal courts located in San Luis Obispo County, California. This sits at the playbook fallback (Delaware or California law and courts) rather than the preferred New York position, and the forum is a court forum — there is no arbitration provision anywhere in the Agreement, so walk-away territory (foreign venue or arbitration seated abroad) is not implicated. The only sub-preferred features are the choice of California over New York and the narrowing of venue to the Vendor's local county rather than a major commercial venue; these are noted but not material enough to redline given the fallback is met.

### Verifier and repair feedback

- [seq 359](trajectory.jsonl#L359) **Verdict: pass** — The cited clauses (Sections 26–27) select California law with exclusive venue in California state or federal courts, which squarely meets the playbook fallback (Delaware or California law and courts) and is therefore correctly classified as compliant. No arbitration provision exists, so the walk-away scenario (foreign venue or arbitration seated abroad) is not triggered; the rationale states this accurately. Consistent with the claimed compliant status, no redline or counterparty comment was proposed and the original text is left unchanged — appropriate, since upgrading an acceptable fallback to the preferred New York position would be over-flagging. Sub-preferred features (California over New York; venue narrowed to the Vendor's local county) are properly noted in the rationale rather than raised as a deviation. Deterministic check confirms the governing law falls within the accepted set. Checks: {"name":"governing law within the accepted set","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 207](trajectory.jsonl#L207)

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

- [seq 229](trajectory.jsonl#L229) **drafter → list_sections**

```json
{}
```

- [seq 230](trajectory.jsonl#L230) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 231](trajectory.jsonl#L231) **drafter → search**

```json
{"query":"assign","limit":30}
```

- [seq 232](trajectory.jsonl#L232) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under…"},{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written ap…"},{"paragraphId":"p0080","sectionRef":…
```

- [seq 263](trajectory.jsonl#L263) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0078","p0079","p0080","p0081","p0082"]}
```

- [seq 264](trajectory.jsonl#L264) **read_paragraphs result**

```json
[{"id":"p0078","sectionRef":"§ 12 INDEMNITY.","text":"13. TERM OF AGREEMENT. This Agreement will take effect on the Effective Date and remain in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers which constitutes a breach of or default by TrueLink under any System Agreement or Credit Repo…
```

- [seq 265](trajectory.jsonl#L265) **drafter → search**

```json
{"query":"change of control","limit":20}
```

- [seq 266](trajectory.jsonl#L266) **search result**

```json
[]
```

- [seq 295](trajectory.jsonl#L295) **drafter → lookup_precedent**

```json
{"ruleId":"ASSIGN","context":"Mutual assignment restriction with affiliate carve-out but no successor/M&A carve-out and absolute consent standard"}
```

- [seq 320](trajectory.jsonl#L320) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-assign","source":"Keystone ERP Licence (Apr 2025)","clauseAfter":"Customer may assign this Agreement without consent to an affiliate or successor in a merger, acquisition or sale of substantially all assets.","comment":"[Playbook] We added customary affiliate and transaction successor rights.","level":"preferred"}]}
```

- [seq 345](trajectory.jsonl#L345) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0080","oldText":"without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"without the prior written approval of the other party, which approval shall not be unreasonably withheld or delayed, except no such approval shall be required for an assignment to a financially responsible affiliate or, in the case of Client, to a successor in a merger, acquisition, reorganization or sale of substantially all of its assets."}],"comment":"[Playbook] We added the customary successor carve-out so Client can assign in a merger, acquisition or sale of substantially all assets, and made consent subject to a reasonableness standard. Our playbook does not accept an absolute veto over Client's corporate transactions; the affiliate carve-out and mutuality are otherwise unchanged.","level":"preferred","summary":"Add successor/M&A assignment carve-out for Client and a not-unreasonably-withheld consent standard.","precedentId":"seed-assign"}
```

- [seq 346](trajectory.jsonl#L346) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0080","segments":[{"type":"equal","text":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, "},{"type":"insert","text":"which approval shall not be unreasonably withheld or delayed, "},{"type":"equal","text":"except no such approval sha…
```

- [seq 365](trajectory.jsonl#L365) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0080"],"quote":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","rationale":"Section 15 is the only assignment provision and there is no change-of-control language anywhere in the Agreement, so TrueLink has no exit or re-pricing right on our change of control (that limb is satisfied). However, the clause fails the fallback on two material terms: (i) it gives Client no carve-out for assignment to a successor in a merger, acquisition or sale of substantially all assets — only a \"financially responsible affiliate\" — so a corporate transaction would require TrueLink's approval; and (ii) approval is at TrueLink's absolute discretion, with no \"not unreasonably withheld\" standard, which the fallback requires. A prohibition on Client assignment with no M&A carve-out is walk-away territory under the rule. Our redline makes the minimal edit to reach the preferred position: it adds the successor carve-out for Client and a reasonableness standard on consent, leaving the mutual structure and affiliate carve-out intact. We did not press the further preferred sub-elements (an express bar on TrueLink assigning to a Client competitor) given the existing mutual bargain; that is noted rather than flagged.","confidence":0.86,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0080","oldText":"without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"without the prior written approval of the other party, which approval shall not be unreasonably withheld or delayed, except no such approval shall be required for an assignment to a financially responsible affiliate or, in the case of Client, to a successor in a merger, acquisition, reorganization or sale of substantially all of its assets."}],"comment":"[Playbook] We added the customary successor carve-out so Client can assign in a merger, acquisition or sale of substantially all assets, and made consent subject to a reasonableness standard. Our playbook does not accept an absolute veto over Client's corporate transactions; the affiliate carve-out and mutuality are otherwise unchanged.","level":"preferred","precedentId":"seed-assign","summary":"Add successor/M&A assignment carve-out for Client and a not-unreasonably-withheld consent standard."}}
```

- [seq 366](trajectory.jsonl#L366) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 365](trajectory.jsonl#L365)
- Finding: `f-assign-0ba91216` · **deviation** · confidence 0.86
- Location: § 12 INDEMNITY.
- Quote: “15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.”
- Rationale: Section 15 is the only assignment provision and there is no change-of-control language anywhere in the Agreement, so TrueLink has no exit or re-pricing right on our change of control (that limb is satisfied). However, the clause fails the fallback on two material terms: (i) it gives Client no carve-out for assignment to a successor in a merger, acquisition or sale of substantially all assets — only a "financially responsible affiliate" — so a corporate transaction would require TrueLink's approval; and (ii) approval is at TrueLink's absolute discretion, with no "not unreasonably withheld" standard, which the fallback requires. A prohibition on Client assignment with no M&A carve-out is walk-away territory under the rule. Our redline makes the minimal edit to reach the preferred position: it adds the successor carve-out for Client and a reasonableness standard on consent, leaving the mutual structure and affiliate carve-out intact. We did not press the further preferred sub-elements (an express bar on TrueLink assigning to a Client competitor) given the existing mutual bargain; that is noted rather than flagged.
- Proposal: **preferred** — Add successor/M&A assignment carve-out for Client and a not-unreasonably-withheld consent standard.
- Comment: [Playbook] We added the customary successor carve-out so Client can assign in a merger, acquisition or sale of substantially all assets, and made consent subject to a reasonableness standard. Our playbook does not accept an absolute veto over Client's corporate transactions; the affiliate carve-out and mutuality are otherwise unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "without the prior written approval of the other party, which approval shall not be unreasonably withheld or delayed, except no such approval shall be required for an assignment to a financially responsible affiliate or, in the case of Client, to a successor in a merger, acquisition, reorganization or sale of substantially all of its assets.",
    "oldText": "without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.",
    "paragraphId": "p0080"
  }
]
```

### Verifier and repair feedback

- [seq 419](trajectory.jsonl#L419) **Verdict: pass** — Classification is correct: Section 15 requires the other party's approval with only a 'financially responsible affiliate' carve-out and no reasonableness standard, so it fails the ASSIGN fallback (mutual right to assign to successors; consent not unreasonably withheld) on two material terms — no M&A/successor carve-out for Client and an absolute consent veto. The redline is targeted and minimal: it inserts 'which approval shall not be unreasonably withheld or delayed' and a Client-side successor carve-out (merger, acquisition, reorganization, sale of substantially all assets) while preserving the existing mutual structure and affiliate carve-out; the 0.55 changed-character ratio reflects necessary insertions, not a rewrite. The reasonableness standard applied mutually is consistent with the preferred position (Vendor may not assign without Customer's consent, not unreasonably withheld) and does not disadvantage us. Comment is accurate, correctly scoped, and states what changed and why with the playbook basis; the rationale properly notes the un-pressed preferred sub-element (bar on assignment to a Client competitor) as a note rather than a separate flag, and correctly confirms no change-of-control trigger exists in the document. Severity 'high' is appropriate; although the rationale invokes walk-away language, the absence of any Vendor change-of-control termination or re-pricing right keeps this short of critical. Checks: {"name":"operation 1 applies","ok":true}; {"name":"successor/affiliate carve-out for Customer present","ok":true}; {"name":"minimal edit p0080","ok":true,"detail":"changed-character ratio=0.550 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 221](trajectory.jsonl#L221)

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

- [seq 239](trajectory.jsonl#L239) **drafter → list_sections**

```json
{}
```

- [seq 240](trajectory.jsonl#L240) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 242](trajectory.jsonl#L242) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 289](trajectory.jsonl#L289) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 290](trajectory.jsonl#L290) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0009","text":"1. DEFINITIONS."},{"id":"p0010","text":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to sites on the World Wide Web."},{"id":"p0011","text":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics, video, a…
```

- [seq 291](trajectory.jsonl#L291) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 292](trajectory.jsonl#L292) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 315](trajectory.jsonl#L315) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 316](trajectory.jsonl#L316) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 317](trajectory.jsonl#L317) **drafter → search**

```json
{"query":"own","limit":30}
```

- [seq 318](trajectory.jsonl#L318) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"… on, or are provided to TrueLink by or on behalf of Client for uploading to or downloading from, the Web Site."},{"paragraphId":"p0029","sectionRef":"§ 2 LICENSE.","snippet":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains …"},{"paragraphId":"p0029","sectionRef":"§ 2 LICENSE.","snippet":"…wit…
```

- [seq 339](trajectory.jsonl#L339) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0074","p0075","p0076","p0077","p0078","p0079","p0080"]}
```

- [seq 340](trajectory.jsonl#L340) **read_paragraphs result**

```json
[{"id":"p0074","sectionRef":"§ 12 INDEMNITY.","text":"-7- 8"},{"id":"p0075","sectionRef":"§ 12 INDEMNITY.","text":"claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder."},{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS AN…
```

- [seq 341](trajectory.jsonl#L341) **drafter → search**

```json
{"query":"Client Content","limit":20}
```

- [seq 342](trajectory.jsonl#L342) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks…"},{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics…"},{"paragraphId":"p0019","sectionRef…
```

- [seq 363](trajectory.jsonl#L363) **drafter → lookup_precedent**

```json
{"ruleId":"IP","context":"Hosting and interface licence; no clause confirming Client owns Client Content, Client IP or borrower data; no assignment/licence-back of Support Services deliverables"}
```

- [seq 378](trajectory.jsonl#L378) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-ip","source":"Copper Design Services SOW (Nov 2025)","clauseAfter":"Customer owns the Deliverables and Customer Data; Vendor retains pre-existing materials and grants Customer a perpetual, irrevocable licence to embedded materials.","comment":"[Playbook] We aligned ownership with the work and data we fund while preserving Vendor's background IP.","level":"preferred"}]}
```

- [seq 397](trajectory.jsonl#L397) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0029","oldText":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.","newText":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface. Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data of Client and of its borrowers, loan applicants, customers and brokers (including Credit Data), and nothing in this Agreement operates as an assignment or transfer to TrueLink of any of the foregoing or creates any joint ownership therein, other than the license granted under Section 8(d). TrueLink hereby assigns to Client all right, title and interest in any deliverables and work product created specifically for Client in the course of the Support Services, excluding TrueLink's Intellectual Property existing prior to or developed independently of such Support Services, in which TrueLink hereby grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense such TrueLink Intellectual Property to the extent embedded in such deliverables for the purposes of Client's business."}],"comment":"[Playbook] We have added a sentence confirming that Client keeps ownership of its content, intellectual property and borrower/customer data, and that Support Services deliverables are assigned to Client with a licence back to any embedded TrueLink IP; our playbook requires that we own what we pay for and what we put in, with no assignment or joint ownership of our data. TrueLink's ownership of the Interface is untouched, and the existing Credit Data licence in Section 8(d) is expressly preserved.","level":"preferred","summary":"Add Client data/IP retention and Support Services deliverable assignment with licence-back to §2(d) Ownership.","precedentId":"seed-ip"}
```

- [seq 398](trajectory.jsonl#L398) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0029","segments":[{"type":"equal","text":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface."},{"type":"insert","text":" Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data of Client and …
```

- [seq 435](trajectory.jsonl#L435) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0029","p0017","p0054"],"quote":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.","rationale":"The only ownership provision (§2(d)) is one-directional: it confirms TrueLink's rights in the Interface but nowhere states that Client retains ownership of Client Content, Client's Intellectual Property or its borrower/customer data. The TrueLink Intellectual Property definition (p0017) sweeps in \"improvements... materials... data, know-how... programs, subroutines, tools\" associated with the Interface, so Support Services work product created and paid for by Client could vest in TrueLink with no assignment and no licence back — failing both the preferred and the fallback position (which requires at minimum a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables). Confidentiality treatment of Client's IP and \"all results of the Hosting and Support Services\" as Client Proprietary Information (p0065) is a non-disclosure protection, not an ownership allocation, and the retained ownership of domains/Client Content on termination (p0078) is limited to the discontinuation scenario. Redline adds the Customer Data/IP retention sentence, an assignment of Support Services deliverables with a licence-back for embedded TrueLink IP, and a no-joint-ownership statement, leaving TrueLink's Interface ownership intact. Noted but not separately flagged: the broad §8(d) licence to \"license, resell, exploit\" Credit Data is a negotiated carve-out limited to aged raw third-party credit data not combined with Client Proprietary Information and is subject to the Non-Competition Agreement, so we preserve it expressly rather than reopen it.","confidence":0.78,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0029","oldText":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.","newText":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface. Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data of Client and of its borrowers, loan applicants, customers and brokers (including Credit Data), and nothing in this Agreement operates as an assignment or transfer to TrueLink of any of the foregoing or creates any joint ownership therein, other than the license granted under Section 8(d). TrueLink hereby assigns to Client all right, title and interest in any deliverables and work product created specifically for Client in the course of the Support Services, excluding TrueLink's Intellectual Property existing prior to or developed independently of such Support Services, in which TrueLink hereby grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense such TrueLink Intellectual Property to the extent embedded in such deliverables for the purposes of Client's business."}],"comment":"[Playbook] We have added a sentence confirming that Client keeps ownership of its content, intellectual property and borrower/customer data, and that Support Services deliverables are assigned to Client with a licence back to any embedded TrueLink IP; our playbook requires that we own what we pay for and what we put in, with no assignment or joint ownership of our data. TrueLink's ownership of the Interface is untouched, and the existing Credit Data licence in Section 8(d) is expressly preserved.","level":"preferred","precedentId":"seed-ip","summary":"Add Client data/IP retention and Support Services deliverable assignment with licence-back to §2(d) Ownership."}}
```

- [seq 436](trajectory.jsonl#L436) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 435](trajectory.jsonl#L435)
- Finding: `f-ip-8dd131ea` · **deviation** · confidence 0.78
- Location: § 2 LICENSE.
- Quote: “d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.”
- Rationale: The only ownership provision (§2(d)) is one-directional: it confirms TrueLink's rights in the Interface but nowhere states that Client retains ownership of Client Content, Client's Intellectual Property or its borrower/customer data. The TrueLink Intellectual Property definition (p0017) sweeps in "improvements... materials... data, know-how... programs, subroutines, tools" associated with the Interface, so Support Services work product created and paid for by Client could vest in TrueLink with no assignment and no licence back — failing both the preferred and the fallback position (which requires at minimum a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables). Confidentiality treatment of Client's IP and "all results of the Hosting and Support Services" as Client Proprietary Information (p0065) is a non-disclosure protection, not an ownership allocation, and the retained ownership of domains/Client Content on termination (p0078) is limited to the discontinuation scenario. Redline adds the Customer Data/IP retention sentence, an assignment of Support Services deliverables with a licence-back for embedded TrueLink IP, and a no-joint-ownership statement, leaving TrueLink's Interface ownership intact. Noted but not separately flagged: the broad §8(d) licence to "license, resell, exploit" Credit Data is a negotiated carve-out limited to aged raw third-party credit data not combined with Client Proprietary Information and is subject to the Non-Competition Agreement, so we preserve it expressly rather than reopen it.
- Proposal: **preferred** — Add Client data/IP retention and Support Services deliverable assignment with licence-back to §2(d) Ownership.
- Comment: [Playbook] We have added a sentence confirming that Client keeps ownership of its content, intellectual property and borrower/customer data, and that Support Services deliverables are assigned to Client with a licence back to any embedded TrueLink IP; our playbook requires that we own what we pay for and what we put in, with no assignment or joint ownership of our data. TrueLink's ownership of the Interface is untouched, and the existing Credit Data licence in Section 8(d) is expressly preserved.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface. Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data of Client and of its borrowers, loan applicants, customers and brokers (including Credit Data), and nothing in this Agreement operates as an assignment or transfer to TrueLink of any of the foregoing or creates any joint ownership therein, other than the license granted under Section 8(d). TrueLink hereby assigns to Client all right, title and interest in any deliverables and work product created specifically for Client in the course of the Support Services, excluding TrueLink's Intellectual Property existing prior to or developed independently of such Support Services, in which TrueLink hereby grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense such TrueLink Intellectual Property to the extent embedded in such deliverables for the purposes of Client's business.",
    "oldText": "d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.",
    "paragraphId": "p0029"
  }
]
```

### Verifier and repair feedback

- [seq 491](trajectory.jsonl#L491) **Verdict: pass** — Deviation classification is sound: the only ownership provision (p0029) unilaterally confirms TrueLink's rights in the Interface and the document contains no Customer Data/IP retention statement and no assignment or perpetual licence-back for Support Services deliverables, so the clause fails the fallback (which requires at minimum a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables), not merely the preferred position. The redline is directionally correct and targeted: it leaves TrueLink's Interface ownership intact, adds Client retention of Client Content/IP/borrower data, a no-assignment/no-joint-ownership statement, and an assignment of Support Services work product with a carve-out plus embedded-IP licence back — exactly the operations in the redline guidance. Interaction with the existing broad Credit Data licence (p0054) is handled correctly by expressly preserving it rather than reopening it, avoiding an internally inconsistent edit and double-flagging of a negotiated carve-out. The failed 'minimal edit' check is advisory only here: the changed-character ratio reflects added sentences on top of the retained original text, which is the smallest edit that reaches the playbook position for a clause that is silent on Customer Data and deliverables. Comment is accurate, in the required voice and prefix, states what changed, cites the playbook position, and correctly notes that TrueLink's Interface ownership and Section 8(d) are untouched; the only nit is reliance on the inferred 'Section 8(d)' cross-reference, which should be confirmed against final numbering. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"minimal edit p0029","ok":false,"detail":"changed-character ratio=0.868 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 237](trajectory.jsonl#L237)

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

- [seq 269](trajectory.jsonl#L269) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 270](trajectory.jsonl#L270) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 271](trajectory.jsonl#L271) **drafter → list_sections**

```json
{}
```

- [seq 272](trajectory.jsonl#L272) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 297](trajectory.jsonl#L297) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 298](trajectory.jsonl#L298) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0009","text":"1. DEFINITIONS."},{"id":"p0010","text":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to sites on the World Wide Web."},{"id":"p0011","text":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics, video, a…
```

- [seq 299](trajectory.jsonl#L299) **drafter → search**

```json
{"query":"Affiliate"}
```

- [seq 300](trajectory.jsonl#L300) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"…any borrower or loan applicant of Client or BNC Mortgage, Inc., or any of their affiliates, or any of their customers or brokers, provided that such data (i) consists on…"},{"paragraphId":"p0071","sectionRef":"§ 12 INDEMNITY.","snippet":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, …
```

- [seq 301](trajectory.jsonl#L301) **drafter → search**

```json
{"query":"successors and assigns"}
```

- [seq 302](trajectory.jsonl#L302) **search result**

```json
[]
```

- [seq 323](trajectory.jsonl#L323) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0078","p0079","p0080","p0081"]}
```

- [seq 324](trajectory.jsonl#L324) **read_paragraphs result**

```json
[{"id":"p0078","sectionRef":"§ 12 INDEMNITY.","text":"13. TERM OF AGREEMENT. This Agreement will take effect on the Effective Date and remain in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers which constitutes a breach of or default by TrueLink under any System Agreement or Credit Repo…
```

- [seq 325](trajectory.jsonl#L325) **drafter → search**

```json
{"query":"assign"}
```

- [seq 326](trajectory.jsonl#L326) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under…"},{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written ap…"},{"paragraphId":"p0080","sectionRef":…
```

- [seq 349](trajectory.jsonl#L349) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Grant clause lacks affiliate/contractor coverage; assignment requires consent, no successor carve-out"}
```

- [seq 368](trajectory.jsonl#L368) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-license","source":"Lighthouse Application Licence (Jan 2025)","clauseAfter":"Licensor grants Customer and its affiliates and contractors a non-transferable licence, transferable to a successor in a merger or acquisition.","comment":"[Playbook] We extended operational use to affiliates and contractors and protected transaction continuity.","level":"fallback"}]}
```

- [seq 393](trajectory.jsonl#L393) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend the licence grant to Client affiliates and contractors and permit transfer to a successor in an M&A transaction.","comment":"[Playbook] We extended the licence to our affiliates and to contractors acting on our behalf, since our origination and underwriting operations are run through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause so a merger or asset sale does not interrupt the licence. If preferred, we can accept affiliate coverage on written notice to TrueLink.","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}
```

- [seq 394](trajectory.jsonl#L394) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0022","segments":[{"type":"equal","text":"a. Grant. TrueLink hereby grants to Client"},{"type":"delete","text":" "},{"type":"insert","text":", its affiliates and its contractors acting on Client's behalf, "},{"type":"equal","text":"a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwritin…
```

- [seq 423](trajectory.jsonl#L423) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0022","p0080"],"quote":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.","rationale":"The § 2(a) grant runs to Client alone: neither affiliates nor contractors acting on Client's behalf are named, and nothing in §§ 1-2 provides a mechanism to add them (the Exhibit A amendment right in § 2(b)(ii) covers sites, not entities). The fallback position (affiliates covered, at minimum on written notice) is therefore not met, so this is a material deviation rather than a minor wording gap. Transfer is also constrained: § 15 requires the other party's consent with a carve-out only for assignment to a financially responsible affiliate, with no successor/M&A carve-out, so the fallback's successor-transfer element also fails. The licence is not revocable at TrueLink's discretion (it runs until termination under § 12, with automatic termination of §§ 2-3 in § 13 tied to defined uncured breaches), so this is not walk-away territory; the licence is subscription-style rather than perpetual, which is consistent with the bargain and is not flagged. Redline extends the grant to affiliates and contractors and adds a successor-transfer carve-out.","confidence":0.82,"proposal":{"level":"preferred","summary":"Extend the licence grant to Client affiliates and contractors and permit transfer to a successor in an M&A transaction.","comment":"[Playbook] We extended the licence to our affiliates and to contractors acting on our behalf, since our origination and underwriting operations are run through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause so a merger or asset sale does not interrupt the licence. If preferred, we can accept affiliate coverage on written notice to TrueLink.","precedentId":"seed-license","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}}
```

- [seq 424](trajectory.jsonl#L424) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 457](trajectory.jsonl#L457) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-license","summary":"Extend the licence grant to Client affiliates and contractors and permit transfer to a successor in an M&A transaction.","comment":"[Playbook] We extended the licence to our affiliates and to contractors acting on our behalf, since our origination and underwriting operations are run through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause so a merger or asset sale does not interrupt the licence. If preferred, we can accept affiliate coverage on written notice to TrueLink.","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}
```

- [seq 458](trajectory.jsonl#L458) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0022","segments":[{"type":"equal","text":"a. Grant. TrueLink hereby grants to Client"},{"type":"delete","text":" "},{"type":"insert","text":", its affiliates and its contractors acting on Client's behalf, "},{"type":"equal","text":"a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwritin…
```

- [seq 487](trajectory.jsonl#L487) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0022","p0080"],"quote":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.","rationale":"The § 2(a) grant runs to Client alone: neither affiliates nor contractors acting on Client's behalf are named, and nothing in §§ 1-2 provides a mechanism to add them (the Exhibit A amendment right in § 2(b)(ii) covers sites, not entities). The fallback position (affiliates covered, at minimum on written notice) is therefore not met, so this is a material deviation rather than a minor wording gap. Transfer is also constrained: § 15 requires the other party's consent with a carve-out only for assignment to a financially responsible affiliate, and no successor/M&A carve-out, so the fallback's successor-transfer element also fails. The licence is not revocable at TrueLink's discretion (it runs until termination under § 12, with automatic termination of §§ 2-3 in § 13 tied to defined uncured breaches), so this is not walk-away territory; the licence being subscription-style rather than perpetual is consistent with the bargain and is not flagged. The redline extends the grant to affiliates and contractors and adds a mutual successor-transfer carve-out.","confidence":0.82,"proposal":{"level":"preferred","precedentId":"seed-license","summary":"Extend the licence grant to Client affiliates and contractors and permit transfer to a successor in an M&A transaction.","comment":"[Playbook] We extended the licence to our affiliates and to contractors acting on our behalf, since our origination and underwriting operations are run through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause so a merger or asset sale does not interrupt the licence. If preferred, we can accept affiliate coverage on written notice to TrueLink.","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}}
```

- [seq 488](trajectory.jsonl#L488) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 487](trajectory.jsonl#L487)
- Finding: `f-license-cc9e26c9` · **deviation** · confidence 0.82
- Location: § 2 LICENSE.
- Quote: “a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.”
- Rationale: The § 2(a) grant runs to Client alone: neither affiliates nor contractors acting on Client's behalf are named, and nothing in §§ 1-2 provides a mechanism to add them (the Exhibit A amendment right in § 2(b)(ii) covers sites, not entities). The fallback position (affiliates covered, at minimum on written notice) is therefore not met, so this is a material deviation rather than a minor wording gap. Transfer is also constrained: § 15 requires the other party's consent with a carve-out only for assignment to a financially responsible affiliate, and no successor/M&A carve-out, so the fallback's successor-transfer element also fails. The licence is not revocable at TrueLink's discretion (it runs until termination under § 12, with automatic termination of §§ 2-3 in § 13 tied to defined uncured breaches), so this is not walk-away territory; the licence being subscription-style rather than perpetual is consistent with the bargain and is not flagged. The redline extends the grant to affiliates and contractors and adds a mutual successor-transfer carve-out.
- Proposal: **preferred** — Extend the licence grant to Client affiliates and contractors and permit transfer to a successor in an M&A transaction.
- Comment: [Playbook] We extended the licence to our affiliates and to contractors acting on our behalf, since our origination and underwriting operations are run through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause so a merger or asset sale does not interrupt the licence. If preferred, we can accept affiliate coverage on written notice to TrueLink.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface",
    "oldText": "TrueLink hereby grants to Client a non-exclusive license to use the Interface",
    "paragraphId": "p0022"
  },
  {
    "kind": "replace",
    "newText": "except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets.",
    "oldText": "except no such approval shall be required for an assignment to a financially responsible affiliate.",
    "paragraphId": "p0080"
  }
]
```

### Verifier and repair feedback

- [seq 543](trajectory.jsonl#L543) **Verdict: pass** — Classification is correct: the § 2(a) grant names only Client, with no affiliate/contractor coverage and no notice mechanism to add them, and § 15 permits assignment only to a financially responsible affiliate with no successor/M&A carve-out — so the clause fails both material elements of the fallback (affiliates on notice; successor transfer), not merely the preferred wording. Rationale correctly declines walk-away treatment (no at-will revocation; termination tied to uncured breach) and correctly treats the subscription rather than perpetual term as a non-flagged sub-element. Redline is actionable and reaches the playbook position with a targeted edit: inserts 'its affiliates and its contractors acting on Client's behalf' into the grant and appends a successor/merger/asset-sale carve-out to § 15; the elevated changed-character ratios reflect necessary insertions rather than gratuitous rewriting. Comment is accurate, concise, in first person plural, cites the business reason and offers the written-notice fallback, consistent with the required tone and prefix. Minor, non-blocking: adding affiliates/contractors leaves 'in the ordinary course of its business' slightly ambiguous as to whose business, and the § 15 carve-out is drafted mutually (also benefiting TrueLink) — both acceptable as an opening position. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}; {"name":"minimal edit p0022","ok":true,"detail":"changed-character ratio=0.450 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}; {"name":"minimal edit p0080","ok":true,"detail":"changed-character ratio=0.591 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 335](trajectory.jsonl#L335)

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

- [seq 353](trajectory.jsonl#L353) **drafter → list_sections**

```json
{}
```

- [seq 354](trajectory.jsonl#L354) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 355](trajectory.jsonl#L355) **drafter → search**

```json
{"query":"audit"}
```

- [seq 356](trajectory.jsonl#L356) **search result**

```json
[]
```

- [seq 371](trajectory.jsonl#L371) **drafter → search**

```json
{"query":"inspect"}
```

- [seq 372](trajectory.jsonl#L372) **search result**

```json
[]
```

- [seq 373](trajectory.jsonl#L373) **drafter → search**

```json
{"query":"records"}
```

- [seq 374](trajectory.jsonl#L374) **search result**

```json
[]
```

- [seq 375](trajectory.jsonl#L375) **drafter → search**

```json
{"query":"verif"}
```

- [seq 376](trajectory.jsonl#L376) **search result**

```json
[]
```

- [seq 401](trajectory.jsonl#L401) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 402](trajectory.jsonl#L402) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 403](trajectory.jsonl#L403) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 404](trajectory.jsonl#L404) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 427](trajectory.jsonl#L427) **drafter → search**

```json
{"query":"monitor"}
```

- [seq 428](trajectory.jsonl#L428) **search result**

```json
[]
```

- [seq 429](trajectory.jsonl#L429) **drafter → search**

```json
{"query":"books"}
```

- [seq 430](trajectory.jsonl#L430) **search result**

```json
[]
```

- [seq 431](trajectory.jsonl#L431) **drafter → search**

```json
{"query":"reasonable access"}
```

- [seq 432](trajectory.jsonl#L432) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…nd all related software to meet the foregoing requirements. Client will provide reasonable access to TrueLink make any repairs necessary to comply with this section and make any…"}]
```

- [seq 461](trajectory.jsonl#L461) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 462](trajectory.jsonl#L462) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 483](trajectory.jsonl#L483) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0047","p0037","p0058"]}
```

- [seq 484](trajectory.jsonl#L484) **read_paragraphs result**

```json
[{"id":"p0047","sectionRef":"§ 5 COMPENSATION.","text":"6. DOCUMENTATION AND DISPUTES. Client will be provided upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (other than the minimum monthly fees listed in Section 4), provided that Client timely pays all contested amounts. TrueLink a…
```

- [seq 511](trajectory.jsonl#L511) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047","p0037","p0058"],"quote":"6. DOCUMENTATION AND DISPUTES. Client will be provided upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (other than the minimum monthly fees listed in Section 4), provided that Client timely pays all contested amounts.","rationale":"The Agreement grants TrueLink no audit, inspection, verification or records-examination right over Client's usage, records or systems. Searches for \"audit\", \"inspect\", \"records\", \"verif\", \"books\" and \"monitor\" return nothing, and the two candidate locations contain no such right: § 5/6 (p0045, p0047) is a one-way transparency provision under which Client receives documentation supporting charges and may contest them, and § 8 Covenants of Client (p0051-p0058) imposes only compliance, access-restriction and content warranties. § 8(f) (p0058) permits TrueLink to implement technical mechanisms on its own Interface to prevent spamming, which is self-help over vendor infrastructure rather than an audit of or remote access to Client systems. Related provisions run in our favour: § 3(e) (p0037) gives Client real-time access to usage statistics and raw log files, and § 9 (p0060) requires only that Client provide reasonable access so TrueLink can perform Y2K repairs at TrueLink's sole cost. With no audit right binding the Customer, our position is better than the preferred one (no frequency, notice, cost or system-access limits are needed because there is nothing to limit), and this is not treated as a \"missing\" clause since the rule is protective and inserting audit machinery would create an obligation against us. Worth noting for context only, and not a deviation: because there is no express audit clause, if TrueLink later requests usage verification there are no contractual guardrails, so we should resist any vendor attempt to add audit rights without the preferred limits (once per 12 months, 30 days' notice, independent auditor under confidentiality, vendor cost unless underpayment exceeds 5%, no direct system access).","confidence":0.88}
```

- [seq 512](trajectory.jsonl#L512) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 511](trajectory.jsonl#L511)
- Finding: `f-audit-3a3962f8` · **compliant** · confidence 0.88
- Location: § 5 COMPENSATION.
- Quote: “6. DOCUMENTATION AND DISPUTES. Client will be provided upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (other than the minimum monthly fees listed in Section 4), provided that Client timely pays all contested amounts.”
- Rationale: The Agreement grants TrueLink no audit, inspection, verification or records-examination right over Client's usage, records or systems. Searches for "audit", "inspect", "records", "verif", "books" and "monitor" return nothing, and the two candidate locations contain no such right: § 5/6 (p0045, p0047) is a one-way transparency provision under which Client receives documentation supporting charges and may contest them, and § 8 Covenants of Client (p0051-p0058) imposes only compliance, access-restriction and content warranties. § 8(f) (p0058) permits TrueLink to implement technical mechanisms on its own Interface to prevent spamming, which is self-help over vendor infrastructure rather than an audit of or remote access to Client systems. Related provisions run in our favour: § 3(e) (p0037) gives Client real-time access to usage statistics and raw log files, and § 9 (p0060) requires only that Client provide reasonable access so TrueLink can perform Y2K repairs at TrueLink's sole cost. With no audit right binding the Customer, our position is better than the preferred one (no frequency, notice, cost or system-access limits are needed because there is nothing to limit), and this is not treated as a "missing" clause since the rule is protective and inserting audit machinery would create an obligation against us. Worth noting for context only, and not a deviation: because there is no express audit clause, if TrueLink later requests usage verification there are no contractual guardrails, so we should resist any vendor attempt to add audit rights without the preferred limits (once per 12 months, 30 days' notice, independent auditor under confidentiality, vendor cost unless underpayment exceeds 5%, no direct system access).

### Verifier and repair feedback

- [seq 565](trajectory.jsonl#L565) **Verdict: pass** — Claimed status is 'compliant' and the cited paragraphs contain no audit, inspection, verification or records-examination right binding the Customer; §6 is a one-way transparency provision in our favour and §3(e) gives Client access to its own usage data. Absence of any Vendor audit right leaves us better off than the preferred position, so treating it as compliant (rather than 'missing') is correct for this protective rule — inserting audit machinery would create an obligation against us and would be over-flagging. No redline and no counterparty comment were produced, which is the expected output for a compliant finding; the original and rendered paragraphs are identical. The failed deterministic check ('audit frequency limited') is explained by the total absence of an audit clause rather than by a defective clause, so it does not undermine the verdict. §8(f) is correctly characterised as vendor self-help on its own Interface, not remote access to or audit of Client systems, so it does not trigger the walk-away condition. Checks: {"name":"audit frequency limited","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 361](trajectory.jsonl#L361)

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

- [seq 385](trajectory.jsonl#L385) **drafter → list_sections**

```json
{}
```

- [seq 386](trajectory.jsonl#L386) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 387](trajectory.jsonl#L387) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 388](trajectory.jsonl#L388) **search result**

```json
[]
```

- [seq 413](trajectory.jsonl#L413) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 414](trajectory.jsonl#L414) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 415](trajectory.jsonl#L415) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 416](trajectory.jsonl#L416) **read_section result**

```json
{"sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","paragraphs":[{"id":"p0048","text":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"id":"p0049","text":"Client shall not engage in the practice commonly known as \"spamming\" pursuant to the rights granted hereunder. This includes but is not limited to, the following: posting an article or advertisement to more than ten (10) news groups, forums, e-mail mai…
```

- [seq 445](trajectory.jsonl#L445) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 446](trajectory.jsonl#L446) **search result**

```json
[]
```

- [seq 447](trajectory.jsonl#L447) **drafter → search**

```json
{"query":"termination"}
```

- [seq 448](trajectory.jsonl#L448) **search result**

```json
[{"paragraphId":"p0079","sectionRef":"§ 12 INDEMNITY.","snippet":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested H…"},{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…ns of Sections 1 and 5 through 30 this Agreement will survive the expiration or termination of this Agreement."}]
```

- [seq 473](trajectory.jsonl#L473) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0079","p0080","p0081","p0090"]}
```

- [seq 474](trajectory.jsonl#L474) **read_paragraphs result**

```json
[{"id":"p0079","sectionRef":"§ 12 INDEMNITY.","text":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement."},{"id":"p0080","sectionRef":"§ 12 INDEMNITY.","text":"15. A…
```

- [seq 475](trajectory.jsonl#L475) **drafter → search**

```json
{"query":"interest late"}
```

- [seq 476](trajectory.jsonl#L476) **search result**

```json
[]
```

- [seq 501](trajectory.jsonl#L501) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 502](trajectory.jsonl#L502) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…d upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (o…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…listed in Section 4) and will be entitled to contest any charge (other than the minimum mon…
```

- [seq 503](trajectory.jsonl#L503) **drafter → search**

```json
{"query":"TERM"}
```

- [seq 504](trajectory.jsonl#L504) **search result**

```json
[{"paragraphId":"p0007","sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","snippet":"… customers access to the Interface and various Support Services, subject to the terms and conditions of this Agreement."},{"paragraphId":"p0010","sectionRef":"§ 1 DEFINITIONS.","snippet":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to …"},{"paragraph…
```

- [seq 527](trajectory.jsonl#L527) **drafter → search**

```json
{"query":"shall pay"}
```

- [seq 528](trajectory.jsonl#L528) **search result**

```json
[]
```

- [seq 529](trajectory.jsonl#L529) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0078"]}
```

- [seq 530](trajectory.jsonl#L530) **read_paragraphs result**

```json
[{"id":"p0078","sectionRef":"§ 12 INDEMNITY.","text":"13. TERM OF AGREEMENT. This Agreement will take effect on the Effective Date and remain in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers which constitutes a breach of or default by TrueLink under any System Agreement or Credit Repo…
```

- [seq 549](trajectory.jsonl#L549) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0045","p0078","p0079"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"No liquidated damages, penalty, stipulated sum or early-termination fee is payable by Client anywhere in the Agreement, which meets the preferred position. Searches for \"liquidated damages\", \"penalty\", \"shall pay\", late-payment interest and termination charges return nothing payable by Client. The termination and term provisions (§§13-14) require only notice, with service continuing to month-end and no exit payment or minimum-remaining-value obligation. The planner-flagged hooks are clean: §7 (spamming) prohibits the conduct but imposes no per-message or fixed charge on Client, and §5 contains only a monthly minimum service charge ($____ per month for Hosting and Support Services) that is ongoing pricing for services actually received rather than a damages or termination amount — noted, not a deviation under this rule. Nothing here approaches walk-away territory.","confidence":0.86}
```

- [seq 550](trajectory.jsonl#L550) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 549](trajectory.jsonl#L549)
- Finding: `f-ld-1b0f658e` · **compliant** · confidence 0.86
- Location: § 5 COMPENSATION.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: No liquidated damages, penalty, stipulated sum or early-termination fee is payable by Client anywhere in the Agreement, which meets the preferred position. Searches for "liquidated damages", "penalty", "shall pay", late-payment interest and termination charges return nothing payable by Client. The termination and term provisions (§§13-14) require only notice, with service continuing to month-end and no exit payment or minimum-remaining-value obligation. The planner-flagged hooks are clean: §7 (spamming) prohibits the conduct but imposes no per-message or fixed charge on Client, and §5 contains only a monthly minimum service charge ($____ per month for Hosting and Support Services) that is ongoing pricing for services actually received rather than a damages or termination amount — noted, not a deviation under this rule. Nothing here approaches walk-away territory.

### Verifier and repair feedback

- [seq 596](trajectory.jsonl#L596) **Verdict: pass** — Claimed status is compliant with no redline and no comment, which is the expected output for a compliant finding; the cited paragraphs are left untouched. The cited text supports compliance: §5(a) imposes only ongoing monthly minimum service charges for services actually delivered, and §§13-14 require only notice with service continuing to month-end — no liquidated damages, penalty, early-termination fee, or minimum-remaining-value payment by Client. The monthly minimum ($__ per month) is correctly characterized as pricing for services received rather than a Customer-payable liquidated amount, and is noted in the rationale rather than over-flagged as a deviation. Rule is directional and only triggers when Customer pays; nothing in the cited provisions creates such an obligation, so the preferred position is met. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 383](trajectory.jsonl#L383)

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

- [seq 407](trajectory.jsonl#L407) **drafter → list_sections**

```json
{}
```

- [seq 408](trajectory.jsonl#L408) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 409](trajectory.jsonl#L409) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 410](trajectory.jsonl#L410) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 439](trajectory.jsonl#L439) **drafter → search**

```json
{"query":"warrant","limit":30}
```

- [seq 440](trajectory.jsonl#L440) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 2 LICENSE.","snippet":"…ested through a System using the Interface. TrueLink makes no representation or warranty, and shall have no liability for the truth or completeness of any data so tran…"},{"paragraphId":"p0050","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"paragraphId":"p0055","sectionRef":…
```

- [seq 441](trajectory.jsonl#L441) **drafter → search**

```json
{"query":"AS IS","limit":20}
```

- [seq 442](trajectory.jsonl#L442) **search result**

```json
[]
```

- [seq 467](trajectory.jsonl#L467) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0042","p0074","p0075","p0076","p0077","p0078"]}
```

- [seq 468](trajectory.jsonl#L468) **read_paragraphs result**

```json
[{"id":"p0042","sectionRef":"§ 2 LICENSE.","text":"i. Credit Bureau Information. TrueLink shall transmit such credit data to Client through the Interface as may be permitted under the Credit Repository Agreements and applicable law, each as in affect from time to tome, and in accordance with the certain Credit Bureau Agreement between TrueLink and Client dated of even date herewith. Subject to th…
```

- [seq 469](trajectory.jsonl#L469) **drafter → search**

```json
{"query":"professional and workmanlike"}
```

- [seq 470](trajectory.jsonl#L470) **search result**

```json
[]
```

- [seq 495](trajectory.jsonl#L495) **drafter → search**

```json
{"query":"conform"}
```

- [seq 496](trajectory.jsonl#L496) **search result**

```json
[]
```

- [seq 497](trajectory.jsonl#L497) **drafter → search**

```json
{"query":"Support Services","limit":20}
```

- [seq 498](trajectory.jsonl#L498) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","snippet":"…ce substantially similar to those specifically enumerated herein (collectively \"Support Services\"); and"},{"paragraphId":"p0006","sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","snippet":"…tion and data to and receiving information and data from the Interface and such Support Services as Clie…
```

- [seq 523](trajectory.jsonl#L523) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0069","p0070","p0043"]}
```

- [seq 524](trajectory.jsonl#L524) **read_paragraphs result**

```json
[{"id":"p0069","sectionRef":"§ 10 CONFIDENTIALITY.","text":"11. STANDARD OF CARE. TrueLink shall perform the Hosting and Support Services and any other agreed-upon services for Client with the same degree of care, skill and prudence customarily exercised by it for its own operations."},{"id":"p0070","sectionRef":"§ 12 INDEMNITY.","text":"12. INDEMNITY."},{"id":"p0043","sectionRef":"§ 2 LICENSE.",…
```

- [seq 547](trajectory.jsonl#L547) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"Vendor performance warranty insert into TrueLink warranties section; hosting/licensing agreement; only Y2K warranty exists plus weak self-referential standard of care"}
```

- [seq 562](trajectory.jsonl#L562) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-warranty","source":"Evergreen Implementation SOW (Jun 2025)","clauseAfter":"Vendor warrants for ninety days that the Services will be professional and workmanlike, with re-performance, repair, replacement or refund as the remedy.","comment":"[Playbook] We added a meaningful performance warranty and remedy for non-conforming work.","level":"fallback"}]}
```

- [seq 592](trajectory.jsonl#L592) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add a TrueLink performance/conformance warranty with a repair, re-perform or refund remedy to Section 9.","comment":"[Playbook] Section 9 only gives us a Year 2000 warranty and Section 11 measures TrueLink against its own internal practices, so we have no conformance warranty or remedy if the Interface or the Services fail. We have added our standard performance warranty (12 months for the software, 90 days for services, compliance with laws, no malicious code) with repair, re-performance or refund as the remedy; we can discuss a 90-day/30-day fallback if the longer periods are an issue.","precedentId":"seed-warranty","ops":[{"kind":"insert_after","paragraphId":"p0060","text":"In addition, TrueLink represents and warrants that: (a) the Hosting Services, Support Services and any other agreed-upon services will be performed in a professional and workmanlike manner consistent with applicable industry standards; (b) for a period of twelve (12) months following the Effective Date, the Interface and all related software will conform in all material respects to its documentation and specifications, and for a period of ninety (90) days following performance, the Hosting Services and Support Services will conform in all material respects to their descriptions in this Agreement and the Exhibits hereto; (c) TrueLink will comply in all material respects with all laws applicable to its performance under this Agreement; and (d) the Interface and all related software will be free of viruses, worms, Trojan horses and other malicious code. Client's remedy for breach of the foregoing warranties is, at TrueLink's option, re-performance, repair or replacement of the non-conforming software or services, or a refund of the fees paid for the non-conforming software or services."}]}
```

- [seq 593](trajectory.jsonl#L593) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0060","segments":[{"type":"equal","text":"(ii) will operate before, on and after January 1, 2000, in the processing of dates, including without limitation calculating, comparing, indexing and sequencing; and (iii) will successfully transition from December 31, 1999, to January 1, 2000, without human intervention. At Client's request, TrueLink wi…
```

- [seq 611](trajectory.jsonl#L611) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0059","p0060","p0069","p0076"],"quote":"9. TRUELINK WARRANTIES. TrueLink represents and warrants that the Interface and all related software (i) is designed to be used before, on and after January l, 2000;","rationale":"The only TrueLink warranty in the Agreement (Section 9) is a Year 2000 date-processing warranty; there is no warranty that the Interface or related software conforms to its documentation, no professional/workmanlike services warranty, no compliance-with-laws or malicious-code warranty from TrueLink, and no repair, re-performance or refund remedy. Section 11 (p0069) only requires TrueLink to use \"the same degree of care, skill and prudence customarily exercised by it for its own operations\" — a self-referential standard with no fixed period and no remedy, which does not reach even the fallback (90 days software / 30 days services with repair, replace or refund). By contrast, Section 8 imposes compliance-with-laws and malicious-code warranties on Client only. The disclaimer at p0076 is prefaced \"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT,\" so it does not swallow an express warranty and needs no carve-out edit; the gap is the absence of the warranty itself. Redline inserts the preferred performance warranty and remedy into Section 9, with the fallback periods offered in the comment.","confidence":0.82,"proposal":{"level":"preferred","summary":"Add a TrueLink performance/conformance warranty with a repair, re-perform or refund remedy to Section 9.","comment":"[Playbook] Section 9 only gives us a Year 2000 warranty and Section 11 measures TrueLink against its own internal practices, so we have no conformance warranty or remedy if the Interface or the Services fail. We have added our standard performance warranty (12 months for the software, 90 days for services, compliance with laws, no malicious code) with repair, re-performance or refund as the remedy; we can discuss a 90-day/30-day fallback if the longer periods are an issue.","precedentId":"seed-warranty","ops":[{"kind":"insert_after","paragraphId":"p0060","text":"In addition, TrueLink represents and warrants that: (a) the Hosting Services, Support Services and any other agreed-upon services will be performed in a professional and workmanlike manner consistent with applicable industry standards; (b) for a period of twelve (12) months following the Effective Date, the Interface and all related software will conform in all material respects to its documentation and specifications, and for a period of ninety (90) days following performance, the Hosting Services and Support Services will conform in all material respects to their descriptions in this Agreement and the Exhibits hereto; (c) TrueLink will comply in all material respects with all laws applicable to its performance under this Agreement; and (d) the Interface and all related software will be free of viruses, worms, Trojan horses and other malicious code. Client's remedy for breach of the foregoing warranties is, at TrueLink's option, re-performance, repair or replacement of the non-conforming software or services, or a refund of the fees paid for the non-conforming software or services."}]}}
```

- [seq 612](trajectory.jsonl#L612) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 611](trajectory.jsonl#L611)
- Finding: `f-warranty-52381814` · **deviation** · confidence 0.82
- Location: § 8 COVENANTS AND WARRANTIES OF CLIENT
- Quote: “9. TRUELINK WARRANTIES. TrueLink represents and warrants that the Interface and all related software (i) is designed to be used before, on and after January l, 2000;”
- Rationale: The only TrueLink warranty in the Agreement (Section 9) is a Year 2000 date-processing warranty; there is no warranty that the Interface or related software conforms to its documentation, no professional/workmanlike services warranty, no compliance-with-laws or malicious-code warranty from TrueLink, and no repair, re-performance or refund remedy. Section 11 (p0069) only requires TrueLink to use "the same degree of care, skill and prudence customarily exercised by it for its own operations" — a self-referential standard with no fixed period and no remedy, which does not reach even the fallback (90 days software / 30 days services with repair, replace or refund). By contrast, Section 8 imposes compliance-with-laws and malicious-code warranties on Client only. The disclaimer at p0076 is prefaced "EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT," so it does not swallow an express warranty and needs no carve-out edit; the gap is the absence of the warranty itself. Redline inserts the preferred performance warranty and remedy into Section 9, with the fallback periods offered in the comment.
- Proposal: **preferred** — Add a TrueLink performance/conformance warranty with a repair, re-perform or refund remedy to Section 9.
- Comment: [Playbook] Section 9 only gives us a Year 2000 warranty and Section 11 measures TrueLink against its own internal practices, so we have no conformance warranty or remedy if the Interface or the Services fail. We have added our standard performance warranty (12 months for the software, 90 days for services, compliance with laws, no malicious code) with repair, re-performance or refund as the remedy; we can discuss a 90-day/30-day fallback if the longer periods are an issue.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "paragraphId": "p0060",
    "text": "In addition, TrueLink represents and warrants that: (a) the Hosting Services, Support Services and any other agreed-upon services will be performed in a professional and workmanlike manner consistent with applicable industry standards; (b) for a period of twelve (12) months following the Effective Date, the Interface and all related software will conform in all material respects to its documentation and specifications, and for a period of ninety (90) days following performance, the Hosting Services and Support Services will conform in all material respects to their descriptions in this Agreement and the Exhibits hereto; (c) TrueLink will comply in all material respects with all laws applicable to its performance under this Agreement; and (d) the Interface and all related software will be free of viruses, worms, Trojan horses and other malicious code. Client's remedy for breach of the foregoing warranties is, at TrueLink's option, re-performance, repair or replacement of the non-conforming software or services, or a refund of the fees paid for the non-conforming software or services."
  }
]
```

### Verifier and repair feedback

- [seq 629](trajectory.jsonl#L629) **Verdict: pass** — Deviation classification is correct: the only TrueLink warranty (Section 9) is a Y2K date-processing warranty, and Section 11's 'same degree of care ... customarily exercised by it for its own operations' is a self-referential standard with no conformance warranty, no warranty period and no repair/re-performance/refund remedy, so the clause set fails even the fallback (90 days software / 30 days services with remedies). Redline is actionable and reaches the playbook preferred position with a targeted insert into Section 9: workmanlike services warranty, conformance warranty (12 months software / 90 days services), compliance with laws, no malicious code, and a repair/re-perform/refund remedy at Vendor's option; no unnecessary rewriting of surrounding text. The analysis correctly identifies that the p0076 disclaimer is prefaced 'EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT' and therefore does not swallow the express warranty, so no carve-out edit was needed — no over-editing. Comment is accurate, concise, first-person plural, cites the playbook position and offers the 90-day/30-day fallback; deterministic checks pass. Minor (rationale-level, not disqualifying): the 12-month software conformance period runs from the Effective Date rather than delivery/acceptance, which is slightly less favorable to us than the model language and could be re-anchored to delivery. Checks: {"name":"operation 1 applies","ok":true}; {"name":"warranty period ≥ 90 days or expressed in months/years","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 421](trajectory.jsonl#L421)

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

- [seq 451](trajectory.jsonl#L451) **drafter → list_sections**

```json
{}
```

- [seq 452](trajectory.jsonl#L452) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 453](trajectory.jsonl#L453) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 454](trajectory.jsonl#L454) **search result**

```json
[]
```

- [seq 479](trajectory.jsonl#L479) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 480](trajectory.jsonl#L480) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 507](trajectory.jsonl#L507) **drafter → get_definition**

```json
{"term":"Client Content"}
```

- [seq 508](trajectory.jsonl#L508) **get_definition result**

```json
{"found":false,"nearest":["Client"]}
```

- [seq 509](trajectory.jsonl#L509) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"Hosting and licensing agreement; vendor hosts client web site and processes consumer mortgage/credit data. No insurance clause present; inserting into miscellaneous section."}
```

- [seq 532](trajectory.jsonl#L532) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-insurance","source":"Redwood Facilities Services MSA (Jul 2025)","clauseAfter":"Vendor shall maintain commercial general liability, professional liability and cyber liability insurance and provide certificates on request.","comment":"[Playbook] We added standard coverage appropriate for a vendor accessing our data and premises.","level":"preferred"}]}
```

- [seq 553](trajectory.jsonl#L553) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert new Section 31 requiring TrueLink to carry commercial general liability, professional liability (E&O) and cyber liability insurance, with certificates on request.","precedentId":"seed-insurance","comment":"[Playbook] The Agreement has no insurance provision, so we added standard coverages appropriate for a vendor that hosts our web site and processes consumer credit data, together with certificates on request. If USD 5,000,000 cyber cover is not currently in place, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0097","numbering":"31","text":"31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber liability insurance of not less than USD 5,000,000 covering Client Content and any other data of Client or its customers processed, hosted or transmitted by TrueLink; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."}]}
```

- [seq 554](trajectory.jsonl#L554) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0097","segments":[{"type":"equal","text":"30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink. However, to be excused from delay or failure to perform, TrueLink must a…
```

- [seq 582](trajectory.jsonl#L582) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0097"],"quote":"30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink.","rationale":"A full-text search for \"insurance\" returns no hits, and a read of the general/miscellaneous provisions (Sections 13-30, p0078-p0097) confirms there is no insurance covenant anywhere in the Agreement. TrueLink is a hosting vendor that operates Client's web site and processes consumer mortgage and credit-repository data, so the absence of any coverage requirement is walk-away territory under the rule (no insurance for a vendor processing personal data). Inserted a new Section 31 immediately after the final miscellaneous provision (Force Majeure) at the preferred position: CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, statutory workers' compensation, and certificates on request; the fallback (E&O USD 1M / cyber USD 2M) is offered in the comment. Note that the survival clause at p0090 refers to \"Sections 1 and 5 through 30\" and would ideally be conformed to include the new section, but that is a minor drafting point rather than a separate deviation.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-insurance","summary":"Insert new Section 31 requiring TrueLink to carry commercial general liability, professional liability (E&O) and cyber liability insurance, with certificates on request.","comment":"[Playbook] The Agreement has no insurance provision, so we added standard coverages appropriate for a vendor that hosts our web site and processes consumer credit data, together with certificates on request. If USD 5,000,000 cyber cover is not currently in place, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0097","numbering":"31","text":"31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber liability insurance of not less than USD 5,000,000 covering Client Content and any other data of Client or its customers processed, hosted or transmitted by TrueLink; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."}]}}
```

- [seq 583](trajectory.jsonl#L583) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 582](trajectory.jsonl#L582)
- Finding: `f-insurance-1c661cbc` · **missing** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink.”
- Rationale: A full-text search for "insurance" returns no hits, and a read of the general/miscellaneous provisions (Sections 13-30, p0078-p0097) confirms there is no insurance covenant anywhere in the Agreement. TrueLink is a hosting vendor that operates Client's web site and processes consumer mortgage and credit-repository data, so the absence of any coverage requirement is walk-away territory under the rule (no insurance for a vendor processing personal data). Inserted a new Section 31 immediately after the final miscellaneous provision (Force Majeure) at the preferred position: CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, statutory workers' compensation, and certificates on request; the fallback (E&O USD 1M / cyber USD 2M) is offered in the comment. Note that the survival clause at p0090 refers to "Sections 1 and 5 through 30" and would ideally be conformed to include the new section, but that is a minor drafting point rather than a separate deviation.
- Proposal: **preferred** — Insert new Section 31 requiring TrueLink to carry commercial general liability, professional liability (E&O) and cyber liability insurance, with certificates on request.
- Comment: [Playbook] The Agreement has no insurance provision, so we added standard coverages appropriate for a vendor that hosts our web site and processes consumer credit data, together with certificates on request. If USD 5,000,000 cyber cover is not currently in place, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "31",
    "paragraphId": "p0097",
    "text": "31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber liability insurance of not less than USD 5,000,000 covering Client Content and any other data of Client or its customers processed, hosted or transmitted by TrueLink; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."
  }
]
```

### Verifier and repair feedback

- [seq 615](trajectory.jsonl#L615) **Verdict: pass** — Rule kind is 'missing' and the finding is supported: no insurance covenant exists in the agreement, and TrueLink is a hosting vendor processing consumer credit/mortgage data, squarely within the rule's scope (walk-away if uninsured). Inserted Section 31 tracks the model language closely (CGL 1M/2M, E&O 2M, cyber 5M tied to Client data, statutory workers' comp, certificates on request) and is placed in the miscellaneous section as the redline guidance directs; no existing text is altered, so the edit is minimal. Comment is accurate, concise, in the required voice with the [Playbook] prefix, and offers the fallback (E&O 1M / cyber 2M) as a negotiation position. Deterministic checks pass; the noted survival-clause cross-reference ('Sections 1 and 5 through 30') is a minor conforming point already disclosed in the rationale and does not undermine the insert's enforceability. Checks: {"name":"operation 1 applies","ok":true}; {"name":"insurance obligation present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 493](trajectory.jsonl#L493)

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

- [seq 517](trajectory.jsonl#L517) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 518](trajectory.jsonl#L518) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 519](trajectory.jsonl#L519) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 520](trajectory.jsonl#L520) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…d upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (o…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…listed in Section 4) and will be entitled to contest any charge (other than the minimum mon…
```

- [seq 537](trajectory.jsonl#L537) **drafter → list_sections**

```json
{}
```

- [seq 538](trajectory.jsonl#L538) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 539](trajectory.jsonl#L539) **drafter → search**

```json
{"query":"terminate","limit":20}
```

- [seq 540](trajectory.jsonl#L540) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whic……
```

- [seq 557](trajectory.jsonl#L557) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0077","p0078","p0079","p0080","p0081"]}
```

- [seq 558](trajectory.jsonl#L558) **read_paragraphs result**

```json
[{"id":"p0077","sectionRef":"§ 12 INDEMNITY.","text":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD."},{"id":"p0078…
```

- [seq 559](trajectory.jsonl#L559) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 560](trajectory.jsonl#L560) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 576](trajectory.jsonl#L576) **drafter → search**

```json
{"query":"per month","limit":20}
```

- [seq 577](trajectory.jsonl#L577) **search result**

```json
[{"paragraphId":"p0045","sectionRef":"§ 5 COMPENSATION.","snippet":"…ges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any oth…"},{"paragraphId":"p0045","sectionRef":"§ 5 COMPENSATION.","snippet":"…d hereto, (but not less than $____ per month for the Hosting Services and $____ per m…
```

- [seq 578](trajectory.jsonl#L578) **drafter → search**

```json
{"query":"volume","limit":20}
```

- [seq 579](trajectory.jsonl#L579) **search result**

```json
[]
```

- [seq 599](trajectory.jsonl#L599) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0045","p0078","p0079"],"quote":"Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services).","rationale":"Section 5a imposes a monthly minimum fee for Hosting and Support Services, so the agreement is not at our preferred position of pure usage/ordered-services pricing. However, the commitment is confined to the current 12-month term (Section 13: one-year initial term, auto-renewing annually, terminable on 30 days' notice of non-renewal), and Section 14 gives Client a standalone right to terminate at any time, with services (and therefore fees) ending on the last day of the month following notice. There is no multi-year take-or-pay lock-in, no shortfall or penalty mechanic, and no volume cap on Client's usage. This sits at the playbook fallback and is acceptable, so no redline. Two points to note commercially rather than as deviations: the minimum dollar amounts are left blank and should be filled in (or deleted) at signature, and Section 6's carve-out barring Client from contesting or obtaining backup for the \"minimum monthly fees\" cross-references \"Section 4\" while the minimums actually appear in Section 5 — worth correcting for clarity.","confidence":0.8}
```

- [seq 600](trajectory.jsonl#L600) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 599](trajectory.jsonl#L599)
- Finding: `f-mincommit-d668eb14` · **compliant** · confidence 0.80
- Location: § 5 COMPENSATION.
- Quote: “Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits "A" and "B" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services).”
- Rationale: Section 5a imposes a monthly minimum fee for Hosting and Support Services, so the agreement is not at our preferred position of pure usage/ordered-services pricing. However, the commitment is confined to the current 12-month term (Section 13: one-year initial term, auto-renewing annually, terminable on 30 days' notice of non-renewal), and Section 14 gives Client a standalone right to terminate at any time, with services (and therefore fees) ending on the last day of the month following notice. There is no multi-year take-or-pay lock-in, no shortfall or penalty mechanic, and no volume cap on Client's usage. This sits at the playbook fallback and is acceptable, so no redline. Two points to note commercially rather than as deviations: the minimum dollar amounts are left blank and should be filled in (or deleted) at signature, and Section 6's carve-out barring Client from contesting or obtaining backup for the "minimum monthly fees" cross-references "Section 4" while the minimums actually appear in Section 5 — worth correcting for clarity.

### Verifier and repair feedback

- [seq 626](trajectory.jsonl#L626) **Verdict: pass** — Claimed status is compliant with no redline and no comment, which is the expected output for a clause that meets the fallback; nothing is proposed to the counterparty, so there is no over-flagging risk. The cited text supports the classification: Section 5a's minimum monthly fee is bounded by Section 13's one-year term with 30-day non-renewal notice, and Section 14 gives Client an at-will termination right ending fees at the end of the month following notice — i.e., commitment confined to the current 12-month term and exitable, with no shortfall/penalty mechanic and no volume cap on Client usage. The rationale correctly states this sits at the fallback rather than the preferred (pure usage/ordered-services pricing) and appropriately treats the blank dollar amounts and the Section 4/Section 5 cross-reference mismatch as drafting notes rather than deviations, consistent with the playbook's treatment of minor sub-elements. No deterministic check failures; the redline is byte-identical to the originals, as expected for a compliant finding. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 545](trajectory.jsonl#L545)

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

- [seq 568](trajectory.jsonl#L568) **drafter → list_sections**

```json
{}
```

- [seq 569](trajectory.jsonl#L569) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 570](trajectory.jsonl#L570) **drafter → search**

```json
{"query":"termination","limit":25}
```

- [seq 571](trajectory.jsonl#L571) **search result**

```json
[{"paragraphId":"p0079","sectionRef":"§ 12 INDEMNITY.","snippet":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested H…"},{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…ns of Sections 1 and 5 through 30 this Agreement will survive the expiration or termination of this Agreement."}]
```

- [seq 586](trajectory.jsonl#L586) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0076","p0077","p0078","p0079","p0080","p0081","p0082","p0083","p0084","p0085","p0086","p0087","p0088","p0089","p0090","p0091"]}
```

- [seq 587](trajectory.jsonl#L587) **read_paragraphs result**

```json
[{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY OR FOR ANY MATTER RELATING TO THE ACCURACY OR COMPLETENESS, OR TIMING OF TRANSMISSION OF ANY DATA SUBMITTED THROUGH THE INTERFACE OR TO OR FROM THE WEB SIT…
```

- [seq 588](trajectory.jsonl#L588) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 589](trajectory.jsonl#L589) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 605](trajectory.jsonl#L605) **drafter → search**

```json
{"query":"Client Content","limit":20}
```

- [seq 606](trajectory.jsonl#L606) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks…"},{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics…"},{"paragraphId":"p0019","sectionRef…
```

- [seq 607](trajectory.jsonl#L607) **drafter → search**

```json
{"query":"return|deliver|destroy|delete|export|transition|migrat","regex":true,"limit":30}
```

- [seq 608](trajectory.jsonl#L608) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…on calculating, comparing, indexing and sequencing; and (iii) will successfully transition from December 31, 1999, to January 1, 2000, without human intervention. At Clie…"},{"paragraphId":"p0064","sectionRef":"§ 10 CONFIDENTIALITY.","snippet":"… otherwise identified in writing as confidential at or prior to…
```

- [seq 620](trajectory.jsonl#L620) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Hosting agreement; insert transition assistance and Client data return in termination section"}
```

- [seq 623](trajectory.jsonl#L623) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-transition","source":"Silverline Data Platform MSA (Dec 2025)","clauseAfter":"Vendor will return Customer Data in a machine-readable format within thirty days, provide transition assistance for up to six months and then certify deletion.","comment":"[Playbook] We added an orderly data return and transition period before deletion.","level":"preferred"}]}
```

- [seq 632](trajectory.jsonl#L632) **drafter → propose_redline**

```json
{"ops":[{"kind":"insert_after","paragraphId":"p0079","numbering":"14a.","text":"TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance, including reasonable migration support for the Web Site and Hosting Services, for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days of Client's request, return to Client all Client Content and other Client data in TrueLink's possession or control in a commonly used, machine-readable format; and (c) thereafter delete such Client Content and Client data from its systems and certify such deletion to Client in writing."}],"comment":"[Playbook] We added an orderly exit provision: TrueLink returns our Client Content and data in a machine-readable format within 30 days, provides up to six months of transition assistance at its then-current rates, and certifies deletion afterwards. As TrueLink hosts our site and holds our borrower and loan data, the current termination terms leave us responsible for re-hosting with no right to get our data back; we can discuss a 90-day assistance period if six months is not workable.","level":"preferred","precedentId":"seed-transition","summary":"Insert post-termination transition assistance, data return within 30 days, and certified deletion into Section 14 (Termination)."}
```

- [seq 633](trajectory.jsonl#L633) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0079","segments":[{"type":"equal","text":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement."}]}]}
```

- [seq 636](trajectory.jsonl#L636) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0078","p0079"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"The Agreement has no post-termination transition assistance or data-return obligation. Section 13 only makes Client responsible for arranging a new name server within 30 days and a new hosting environment within 60 days (and confirms Client's ownership of domains and Client Content), and Section 14 merely runs services to month-end after notice. Section 10 (Confidentiality) contains no return or destruction mechanic at all. Nothing obliges TrueLink, which hosts the Web Site and holds Client borrower and loan data, to return that data in usable form, assist migration, or certify deletion — below even the fallback (90 days' assistance plus export within 30 days). We propose inserting the preferred language (6 months' assistance at then-current rates, 30-day machine-readable return, certified deletion thereafter) as a new Section 14a, with a 90-day assistance period available as a fallback.","confidence":0.85,"proposal":{"ops":[{"kind":"insert_after","paragraphId":"p0079","numbering":"14a.","text":"TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance, including reasonable migration support for the Web Site and Hosting Services, for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days of Client's request, return to Client all Client Content and other Client data in TrueLink's possession or control in a commonly used, machine-readable format; and (c) thereafter delete such Client Content and Client data from its systems and certify such deletion to Client in writing."}],"comment":"[Playbook] We added an orderly exit provision: TrueLink returns our Client Content and data in a machine-readable format within 30 days, provides up to six months of transition assistance at its then-current rates, and certifies deletion afterwards. As TrueLink hosts our site and holds our borrower and loan data, the current termination terms leave us responsible for re-hosting with no right to get our data back; we can discuss a 90-day assistance period if six months is not workable.","level":"preferred","precedentId":"seed-transition","summary":"Insert post-termination transition assistance, data return within 30 days, and certified deletion into Section 14 (Termination)."}}
```

- [seq 637](trajectory.jsonl#L637) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 636](trajectory.jsonl#L636)
- Finding: `f-transition-2aa5a23a` · **missing** · confidence 0.85
- Location: § 12 INDEMNITY.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: The Agreement has no post-termination transition assistance or data-return obligation. Section 13 only makes Client responsible for arranging a new name server within 30 days and a new hosting environment within 60 days (and confirms Client's ownership of domains and Client Content), and Section 14 merely runs services to month-end after notice. Section 10 (Confidentiality) contains no return or destruction mechanic at all. Nothing obliges TrueLink, which hosts the Web Site and holds Client borrower and loan data, to return that data in usable form, assist migration, or certify deletion — below even the fallback (90 days' assistance plus export within 30 days). We propose inserting the preferred language (6 months' assistance at then-current rates, 30-day machine-readable return, certified deletion thereafter) as a new Section 14a, with a 90-day assistance period available as a fallback.
- Proposal: **preferred** — Insert post-termination transition assistance, data return within 30 days, and certified deletion into Section 14 (Termination).
- Comment: [Playbook] We added an orderly exit provision: TrueLink returns our Client Content and data in a machine-readable format within 30 days, provides up to six months of transition assistance at its then-current rates, and certifies deletion afterwards. As TrueLink hosts our site and holds our borrower and loan data, the current termination terms leave us responsible for re-hosting with no right to get our data back; we can discuss a 90-day assistance period if six months is not workable.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "14a.",
    "paragraphId": "p0079",
    "text": "TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance, including reasonable migration support for the Web Site and Hosting Services, for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days of Client's request, return to Client all Client Content and other Client data in TrueLink's possession or control in a commonly used, machine-readable format; and (c) thereafter delete such Client Content and Client data from its systems and certify such deletion to Client in writing."
  }
]
```

### Verifier and repair feedback

- [seq 642](trajectory.jsonl#L642) **Verdict: pass** — The agreement genuinely lacks any post-termination transition or data-return mechanic: Section 13 only shifts re-hosting/name-server burdens onto Client and confirms domain/Content ownership, and Section 14 merely extends service to month-end, so 'missing' is the correct classification for a hosting agreement where TrueLink holds Client borrower and loan data. The inserted paragraph tracks the playbook model language closely and is adapted to the contract's defined terms (TrueLink, Client, Client Content, Hosting Services, Web Site), covering all three elements: up to six months' assistance at then-current rates, 30-day machine-readable return, and certified deletion thereafter. The edit is additive only — no existing operative text is altered — which is the minimal intervention needed to reach the preferred position. The comment is accurate, concise, in first person plural, cites the playbook position and offers the 90-day fallback without lecturing. Minor, non-disqualifying points: the inserted heading carries no section number (the rationale calls it 'Section 14a'), and clause (b) is keyed to 'within thirty (30) days of Client's request' rather than of termination — both are cosmetic/negotiable and do not drop the insert below the fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 647](trajectory.jsonl#L647) memo LLM request
- [seq 648](trajectory.jsonl#L648) memo LLM response (replay)

```markdown
# Issues Memo — EXHIBIT 10.4 (TrueLink Hosting, Interface Licence and Support Agreement)

**To:** Deal team
**From:** In-house counsel (Customer side)
**Re:** Playbook review of EXHIBIT 10.4 — verified findings, redline positions and negotiation priorities

---

## Executive summary

We have completed a playbook review of the Agreement. Of the 18 verified findings, **6 are deviations**, **2 are missing clauses**, and **10 are compliant** (several materially in our favour).

The commercial risk in this Agreement is concentrated in the ri[REDACTED] architecture, and it is skewed against us:

- **Liability is asymmetric in a walk-away way.** The only cap in the Agreement sits inside the indemnity section, limits TrueLink to 12 months' hosting and support compensation, and leaves Client — including under a very broad indemnity — entirely uncapped. There is no consequential damages exclusion anywhere in the document.
- **There is no vendor IP indemnity and no non-infringement warranty.** The only infringement references run against Client. TrueLink's indemnity is limited to claims arising from its own breach or failure to perform.
- **Ownership is one-directional.** §2(d) confirms TrueLink's rights in the Interface but nowhere confirms that Client retains ownership of Client Content, Client IP or borrower/customer data; the broad TrueLink Intellectual Property definition could capture Support Services work product that Client paid for.
- **We have effectively no vendor performance warranty.** The only TrueLink warranty is a Year 2000 warranty; §11 offers only a self-referential standard of care with no period and no remedy.
- **We cannot get our data back on exit, and the vendor carries no insurance obligation.** Neither transition assistance/data return nor insurance appears anywhere in the Agreement, notwithstanding that TrueLink hosts our web site and processes consumer mortgage and credit-repository data.

On the positive side, the Agreement contains **no exclusivity, non-compete, non-solicit, MFN or audit obligation binding Client**, **no liquidated damages or early-termination fee**, a **Client termination-for-convenience right**, a clean **12-month term with a 30-day non-renewal window**, and a **most-favoured-rate undertaking from TrueLink in §6**. We do not propose to reopen any of these.

We also note two housekeeping points that are not deviations: the termination provisions are mis-numbered and sit inside the block headed "§ 12 INDEMNITY" (§13 Term, §14 Termination), with §2c and §13 cross-referencing "Section 12" for termination; and §6's minimum-fee carve-out cross-references "Section 4" when the minimums appear in §5. Exhibits A and B remain blank and the monthly minimum dollar amounts must be populated or deleted at signature.

---

## Findings table

| Severity | Rule | Status | Section | Summary |
|---|---|---|---|---|
| Critical | LOL-CAP — Limitation of liability | Deviation | § 12 INDEMNITY. | Cap runs one way only (TrueLink limited to 12 months' compensation; Client uncapped). No consequential damages exclusion. Walk-away territory. |
| Critical | INDEMN — Indemnification by Vendor | Deviation | § 12 INDEMNITY. | Materially one-sided; no vendor IP indemnity and no non-infringement warranty anywhere. Fails the fallback. |
| Critical | IP — Ownership of deliverables and Customer Data | Deviation | § 2 LICENSE. | No retention of Client Content/IP/borrower data; Support Services work product may vest in TrueLink with no assignment or licence back. |
| High | ASSIGN — Assignment and change of control | Deviation | § 12 INDEMNITY. | No successor/M&A carve-out for Client and consent is at TrueLink's absolute discretion. No change-of-control right for TrueLink (that limb is fine). |
| High | LICENSE — Licence grant scope | Deviation | § 2 LICENSE. | Grant runs to Client alone — no affiliates or contractors, and no mechanism to add them; transfer also constrained. |
| High | EXCLUSIVITY — Exclusivity binding Customer | Compliant | § 2 LICENSE. | Non-exclusive licence; Client expressly free to acquire, develop or licence competing products. §3(i) credit-report tie is a narrow use-contingent term at the fallback. |
| High | LD — Liquidated damages/penalties | Compliant | § 5 COMPENSATION. | No liquidated damages, penalty or early-termination fee payable by Client. |
| High | NONCOMPETE — Non-compete on Customer | Compliant | § 2 LICENSE. | No competitive restraint on Client; §2(a) affirmatively preserves our freedom to build or buy competing services. |
| High | T4C — Termination for convenience | Compliant | § 12 INDEMNITY. | Client may terminate on notice with no cause and no fee (services to month-end following notice); TrueLink has no convenience right. |
| Medium | WARRANTY — Performance warranty | Deviation | § 8 COVENANTS AND WARRANTIES OF CLIENT | Only TrueLink warranty is Year 2000; no conformance, services, compliance or malicious-code warranty and no remedy. Fails the fallback. |
| Medium | TRANSITION — Transition assistance and data return | Missing | § 12 INDEMNITY. | No obligation on TrueLink to return data in usable form, assist migration or certify deletion. Below the fallback. |
| Medium | AUDIT — Audit rights against Customer | Compliant | § 5 COMPENSATION. | No audit, inspection or records right over Client. Better than preferred; §3(e) gives us usage statistics and raw logs. |
| Medium | GOVLAW — Governing law and venue | Compliant | § 12 INDEMNITY. | California law, exclusive venue San Luis Obispo County. Sits at the fallback; no arbitration provision. |
| Medium | MFN — MFN burdening Customer | Compliant | § 5 COMPENSATION. | No Client-side MFN. §6 MFN runs in our favour, plus a one-year price freeze. |
| Medium | MINCOMMIT — Minimum commitments | Compliant | § 5 COMPENSATION. | Monthly minimum confined to a 12-month auto-renewing term with a standalone Client exit right; no take-or-pay or shortfall mechanic. Sits at the fallback. |
| Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant | § 8 COVENANTS AND WARRANTIES OF CLIENT | No non-solicit, no-hire or anti-raiding covenant on Client. |
| Medium | RENEWAL — Auto-renewal and notice window | Compliant | § 12 INDEMNITY. | One-year renewals with a 30-day non-renewal window either way. Meets preferred; no reminder obligation and no uplift cap (minor). |
| Low | INSURANCE — Vendor insurance | Missing | § 12 INDEMNITY. | No insurance covenant anywhere; vendor hosts our site and processes consumer credit data. Walk-away territory under the rule. |

---

## Walk-away items

These three items are identified in the verified findings as walk-away territory under the playbook and should be treated as conditions to signature:

1. **Uncapped Client liability against a capped vendor (LOL-CAP, § 12).** The playbook expressly identifies "Customer's liability uncapped while Vendor's is capped" as walk-away. We require a mutual, agreement-wide cap at the greater of 12 months' fees and USD 1,000,000, the standard Excluded Claims carve-outs (confidentiality/data security, indemnification, gross negligence, wilful misconduct, fraud, IP infringement), and confirmation that Client's payment obligations sit outside the cap.
2. **Prohibition on Client assignment with no M&A carve-out (ASSIGN, § 15).** A corporate transaction would currently require TrueLink's consent at its absolute discretion. We require a successor carve-out and a "not unreasonably withheld" standard.
3. **No insurance for a vendor processing personal data (INSURANCE).** A full-text search returns no hits for "insurance." We require CGL USD 1M/2M, E&O USD 2M, cyber USD 5M and statutory workers' compensation, with certificates on request; fallback E&O USD 1M / cyber USD 2M.

We would also treat the **absence of any vendor IP indemnity** (INDEMN) as effectively non-negotiable given the finding that the clause fails even the fallback and the only infringement references run against us.

---

## Next steps

1. **Issue the redline** covering the six deviations and two missing clauses, with the proposals as verified:
   - § 12(b): add IP infringement, breach of law, Vendor-caused data breach and gross negligence/wilful misconduct prongs to TrueLink's indemnity (smallest edit reaching the preferred position; the existing §12 cap language covering §§3, 4, 7 and 11 is left undisturbed).
   - § 2(d): add Client data/IP retention, assignment of Support Services deliverables with a licence-back for embedded TrueLink IP, and a no-joint-ownership statement, preserving TrueLink's Interface ownership and the negotiated §8(d) Credit Data carve-out.
   - § 12 cap: make the cap mutual and agreement-wide at the greater of 12 months' fees and USD 1,000,000, with the standard uncapped carve-outs.
   - § 15: add the successor/M&A carve-out for Client and a reasonableness standard on consent.
   - § 2(a): extend the grant to Client affiliates and contractors and add a mutual successor-transfer carve-out.
   - § 9: add a TrueLink performance/conformance warranty with a repair, re-perform or refund remedy (fallback of 90 days software / 30 days services offered in the comment).
   - New § 14a: post-termination transition assistance (6 months at then-current rates), machine-readable data return within 30 days and certified deletion thereafter (90-day assistance available as a fallback).
   - New § 31: vendor insurance covenant, with the survival clause at §"1 and 5 through 30" conformed.
2. **Fallback authority.** Confirm negotiating authority to settle at: customary IP exclusions and remedies on the vendor IP indemnity; the 90-day transition assistance period; and E&O USD 1M / cyber USD 2M on insurance.
3. **Commercial completion.** Populate or delete Exhibits A and B and the blank monthly minimum service charge in § 5a before execution; the 12-month compensation cap measure only becomes meaningful once those charges are populated.
4. **Housekeeping pass.** Correct the § 2c and § 13 cross-references to "Section 12" (termination is § 14), and the § 6 cross-reference to "Section 4" (minimums are in § 5), and renumber the mis-headed § 12 block if the counterparty will accept it.
5. **Separate diligence.** Obtain and review the referenced **Non-Competition Agreement** — it is not part of this document and is invoked here only to limit TrueLink's use of Credit Data.
6. **Do not reopen.** No redline on exclusivity, non-compete, non-solicit, MFN, audit, liquidated damages, termination for convenience, renewal or governing law. On AUDIT specifically, we should resist any vendor attempt to introduce audit rights; if raised, only on the preferred limits (once per 12 months, 30 days' notice, independent auditor under confidentiality, vendor cost unless underpayment exceeds 5%, no direct system access).
7. **Flag for a future term extension.** If the term is ever extended beyond 12 months, revisit lengthening TrueLink's non-renewal notice to 90 days and adding a renewal reminder and a CPI/3% uplift cap.
```

## Apply and validation

No apply or output-validation event was recorded.
