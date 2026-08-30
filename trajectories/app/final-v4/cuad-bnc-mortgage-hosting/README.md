# Trajectory: cuad-bnc-mortgage-hosting

| Run | Value |
|---|---|
| Contract | cuad-bnc-mortgage-hosting — EXHIBIT 10.4 |
| Config | final-v4 |
| Parties | Mortgage Logic.com, Inc. (our party) ↔ TrueLink, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 7.6s (7,609 ms) |
| Calls | 151 LLM · 173 tool · 8 retries |
| Tokens | 108,782 input · 119,763 output · 975,221 cache read · 189,940 cache write |
| Cost | $5.212720 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 623 | 134 | 173 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 687](trajectory.jsonl#L687) |
| verifier | 45 | 15 | 0 | 15 verdict(s) | [seq 180](trajectory.jsonl#L180)–[seq 690](trajectory.jsonl#L690) |
| assembler | 21 | 0 | 0 | — | [seq 177](trajectory.jsonl#L177)–[seq 698](trajectory.jsonl#L698) |
| memo | 4 | 1 | 0 | — | [seq 694](trajectory.jsonl#L694)–[seq 697](trajectory.jsonl#L697) |
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

- [seq 15](trajectory.jsonl#L15) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 16](trajectory.jsonl#L16) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"liability"}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[{"paragraphId":"p0041","sectionRef":"§ 2 LICENSE.","snippet":"…, or logo of any third party. TrueLink will not be responsible for, or have any liability in connection with, the operation of the Web Site with respect to online commer…"},{"paragraphId":"p0042","sectionRef":"§ 2 LICENSE.","snippet":"… the Interface. TrueLink makes no representation or warranty, and shall have no liability for the t…
```

- [seq 69](trajectory.jsonl#L69) **drafter → search**

```json
{"query":"consequential"}
```

- [seq 70](trajectory.jsonl#L70) **search result**

```json
[]
```

- [seq 101](trajectory.jsonl#L101) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 102](trajectory.jsonl#L102) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 103](trajectory.jsonl#L103) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"One-sided vendor-only cap limited to certain sections; customer uncapped; no carve-outs beyond GN/WM"}
```

- [seq 104](trajectory.jsonl#L104) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 129](trajectory.jsonl#L129) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees or USD 1,000,000, and add standard uncapped carve-outs.","comment":"[Playbook] We have made the cap mutual and applied it to the whole Agreement — as drafted only TrueLink's liability is capped (and only for Sections 3, 4, 7 and 11), leaving Client exposed without limit, which we cannot accept. Our position is a mutual cap at the greater of 12 months' fees or USD 1,000,000, with indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement sitting outside the cap and Client's payment obligations unaffected.","ops":[{"kind":"replace","paragraphId":"p0077","oldText":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD AND (B) USD 1,000,000, AND NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER THIS AGREEMENT SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS LIMITATION."}]}
```

- [seq 130](trajectory.jsonl#L130) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0077","segments":[{"type":"insert","text":"EXCEPT FOR EXCLUDED CLAIMS, "},{"type":"equal","text":"IN NO EVENT SHALL "},{"type":"delete","text":"TRUELINK'S LIABILITY FOR ANY MATTER "},{"type":"insert","text":"EITHER PARTY'S TOTAL AGGREGATE LIABILITY "},{"type":"equal","text":"ARISING UNDER OR RELATED TO "},{"type":"delete","text":"SECTION 3, 4, 7…
```

- [seq 155](trajectory.jsonl#L155) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0077"],"quote":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","rationale":"The only liability limitation in the Agreement (p0077, buried at the end of the Indemnity section) is one-sided: it caps TrueLink's liability at 12 months' hosting and support compensation, while Client's liability — including its broad indemnity under Section 12a — remains entirely uncapped. That is expressly walk-away territory under this rule (\"Customer's liability uncapped while Vendor's is capped\"), so it fails the fallback, which requires a mutual 12-month cap. The clause is also narrower than it appears in one respect (it only covers matters under Sections 3, 4, 7 and 11) and carves out only TrueLink's gross negligence and wilful misconduct; there is no mutual exclusion of indirect/consequential damages anywhere in the document (search for \"consequential\" returns nothing) and no carve-outs for confidentiality, data/security or indemnification. The redline makes the cap mutual and agreement-wide, sets the basis at the greater of 12 months' fees paid or payable and USD 1,000,000, adds the mutual consequential-damages exclusion and the standard uncapped Excluded Claims, and confirms Client's payment obligations are not \"damages\" for cap purposes.","confidence":0.9,"proposal":{"level":"preferred","summary":"Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees or USD 1,000,000, and add standard uncapped carve-outs.","comment":"[Playbook] We have made the cap mutual and applied it to the whole Agreement — as drafted only TrueLink's liability is capped (and only for Sections 3, 4, 7 and 11), leaving Client exposed without limit, which we cannot accept. Our position is a mutual cap at the greater of 12 months' fees or USD 1,000,000, with indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement sitting outside the cap and Client's payment obligations unaffected.","ops":[{"kind":"replace","paragraphId":"p0077","oldText":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD AND (B) USD 1,000,000, AND NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER THIS AGREEMENT SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS LIMITATION."}]}}
```

- [seq 156](trajectory.jsonl#L156) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 155](trajectory.jsonl#L155)
- Finding: `f-lol-cap-657fe724` · **deviation** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.”
- Rationale: The only liability limitation in the Agreement (p0077, buried at the end of the Indemnity section) is one-sided: it caps TrueLink's liability at 12 months' hosting and support compensation, while Client's liability — including its broad indemnity under Section 12a — remains entirely uncapped. That is expressly walk-away territory under this rule ("Customer's liability uncapped while Vendor's is capped"), so it fails the fallback, which requires a mutual 12-month cap. The clause is also narrower than it appears in one respect (it only covers matters under Sections 3, 4, 7 and 11) and carves out only TrueLink's gross negligence and wilful misconduct; there is no mutual exclusion of indirect/consequential damages anywhere in the document (search for "consequential" returns nothing) and no carve-outs for confidentiality, data/security or indemnification. The redline makes the cap mutual and agreement-wide, sets the basis at the greater of 12 months' fees paid or payable and USD 1,000,000, adds the mutual consequential-damages exclusion and the standard uncapped Excluded Claims, and confirms Client's payment obligations are not "damages" for cap purposes.
- Proposal: **preferred** — Make the liability cap mutual and agreement-wide, set it at the greater of 12 months' fees or USD 1,000,000, and add standard uncapped carve-outs.
- Comment: [Playbook] We have made the cap mutual and applied it to the whole Agreement — as drafted only TrueLink's liability is capped (and only for Sections 3, 4, 7 and 11), leaving Client exposed without limit, which we cannot accept. Our position is a mutual cap at the greater of 12 months' fees or USD 1,000,000, with indemnification, confidentiality/data security, gross negligence, wilful misconduct, fraud and IP infringement sitting outside the cap and Client's payment obligations unaffected.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S TOTAL AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THIS AGREEMENT EXCEED THE GREATER OF (A) THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD AND (B) USD 1,000,000, AND NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES. \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CLIENT'S OBLIGATION TO PAY AMOUNTS DUE UNDER THIS AGREEMENT SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS LIMITATION.",
    "oldText": "IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD.",
    "paragraphId": "p0077"
  }
]
```

### Verifier and repair feedback

- [seq 208](trajectory.jsonl#L208) **Verdict: fail** — precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor. precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow. official minimality gate: Operation 1 expands 53 words to 115 words (ratio 2.17 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.838 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters The locked preferred level fails on the fee limb: the cap is measured by 'THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD', which is an event/period anchor limited to hosting and support compensation rather than 'fees paid or payable in the 12 months preceding the claim'. Fix by replacing the limb (a) wording with 'the fees paid or payable in the 12 months preceding the claim' so the measurement period is anchored to the claim and covers all fees. All preferred carve-outs (confidentiality, data protection, security, indemnification, gross negligence, wilful misconduct, fraud, other party's IP infringement), the mutual consequential-damages exclusion, the USD 1,000,000 floor and the payment-obligations carve-out are expressly present; the payment-obligation sentence does state that Client's obligation to pay amounts due is not damages, so the deterministic flag on that point appears to misfire. Fallback is not independently satisfied as literally drafted because the cap is a greater-of with the preferred-only USD 1,000,000 floor rather than a cap of 12 months' fees; the carve-out set does satisfy the fallback list. Minimality fails: the operation rewrites the whole clause (53 to 115 words, 0.838 changed-character ratio). Mutuality and scope could be achieved by narrower edits ('EITHER PARTY'S LIABILITY', deleting 'SECTION 3, 4, 7 AND 11') with the carve-out definition and payment-obligation sentence added as a separate concise insertion. Extra words beyond what the position requires: 'TOTAL AGGREGATE' and the added 'INCIDENTAL' damages category. Unrelated terms are untouched, 'EXCLUDED CLAIMS' is defined in-line, and no dangling mechanic or contradiction is introduced, so intent is preserved. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: cap references 12 months of fees or a fixed floor","ok":true}; {"name":"official check: no unlimited Customer liability language remains","ok":true}; {"name":"precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor","ok":false,"detail":"Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor."}; {"name":"precision position: preferred cap includes USD 1,000,000","ok":true}; {"name":"precision position: Customer payment obligations are not damages","ok":false,"detail":"State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 53 words to 115 words (ratio 2.17 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.838 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 209](trajectory.jsonl#L209) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Cap limb (a): fees paid or payable in the 12 months preceding the claim\n Verdict: not_met. Evidence: PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD — anchored to an unspecified 'immediately preceding' period, not to the claim, and narrowed to hosting and support compensation\n\nDeterministic official failures:\n- precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor.\n- precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow.\n- official minimality gate: Operation 1 expands 53 words to 115 words (ratio 2.17 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.838 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- TOTAL AGGREGATE\n- INCIDENTAL\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- The locked preferred level fails on the fee limb: the cap is measured by 'THE TOTAL COMPENSATION PAID OR PAYABLE BY CLIENT FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD', which is an event/period anchor limited to hosting and support compensation rather than 'fees paid or payable in the 12 months preceding the claim'.\n- Fix by replacing the limb (a) wording with 'the fees paid or payable in the 12 months preceding the claim' so the measurement period is anchored to the claim and covers all fees.\n- All preferred carve-outs (confidentiality, data protection, security, indemnification, gross negligence, wilful misconduct, fraud, other party's IP infringement), the mutual consequential-damages exclusion, the USD 1,000,000 floor and the payment-obligations carve-out are expressly present; the payment-obligation sentence does state that Client's obligation to pay amounts due is not damages, so the deterministic flag on that point appears to misfire.\n- Fallback is not independently satisfied as literally drafted because the cap is a greater-of with the preferred-only USD 1,000,000 floor rather than a cap of 12 months' fees; the carve-out set does satisfy the fallback list.\n- Minimality fails: the operation rewrites the whole clause (53 to 115 words, 0.838 changed-character ratio). Mutuality and scope could be achieved by narrower edits ('EITHER PARTY'S LIABILITY', deleting 'SECTION 3, 4, 7 AND 11') with the carve-out definition and payment-obligation sentence added as a separate concise insertion.\n- Extra words beyond what the position requires: 'TOTAL AGGREGATE' and the added 'INCIDENTAL' damages category.\n- Unrelated terms are untouched, 'EXCLUDED CLAIMS' is defined in-line, and no dangling mechanic or contradiction is introduced, so intent is preserved."

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
{"sectionId":"sec-12"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 27](trajectory.jsonl#L27) **drafter → list_sections**

```json
{}
```

- [seq 28](trajectory.jsonl#L28) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 49](trajectory.jsonl#L49) **drafter → search**

```json
{"query":"infring"}
```

- [seq 50](trajectory.jsonl#L50) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 2 LICENSE.","snippet":"software or services do not infringe upon any of TrueLink's Intellectual Property. Nothing in the foregoing sentenc…"},{"paragraphId":"p0041","sectionRef":"§ 2 LICENSE.","snippet":"… to TrueLink in order to establish that no domain name proposed by Client shall infringe upon the trademark, service mark, name, or logo of any third part…
```

- [seq 51](trajectory.jsonl#L51) **drafter → search**

```json
{"query":"intellectual property"}
```

- [seq 52](trajectory.jsonl#L52) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"c. Client's Intellectual Property. The term \"Client Intellectual Property\" means, client's designs, customer list…"},{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"c. Client's Intellectual Property. The term \"Client Intellectual Property\" means, client's designs, customer lists, formulas, procedures, methods…
```

- [seq 89](trajectory.jsonl#L89) **drafter → search**

```json
{"query":"TrueLink warrants"}
```

- [seq 90](trajectory.jsonl#L90) **search result**

```json
[]
```

- [seq 91](trajectory.jsonl#L91) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"Hosting/licensing agreement; vendor indemnity limited to breach of agreement; no IP infringement indemnity"}
```

- [seq 92](trajectory.jsonl#L92) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 125](trajectory.jsonl#L125) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add TrueLink indemnity for third-party IP infringement claims and related misconduct","comment":"[Playbook] TrueLink's indemnity currently covers only its own breach of this Agreement, leaving us exposed on third-party claims that the Interface, Hosting Services or Support Services infringe IP rights. We have added the standard vendor indemnity (IP infringement, breach of law, data breach and gross negligence/wilful misconduct) with usual notice and cooperation procedure; if preferred, we can accept an IP-only indemnity with customary exclusions for Client modifications, combinations and specifications.","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"c.","text":"c. In addition, TrueLink shall defend, indemnify and hold harmless Client and its affiliates, directors, officers, employees and agents from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Interface, the Hosting Services, the Support Services or any deliverable provided by TrueLink infringes or misappropriates any copyright, trade secret, trademark, patent or other intellectual property right; (ii) TrueLink's violation of any applicable law, rule or regulation; (iii) any unauthorized access to or disclosure of Client Content or Client Confidential Information caused by TrueLink; or (iv) TrueLink's gross negligence or willful misconduct. The indemnified party shall give the indemnifying party prompt written notice of the claim, tender sole control of the defense and settlement (provided that no settlement imposing liability or admission on the indemnified party shall be made without its consent), and provide reasonable cooperation at the indemnifying party's expense."}]}
```

- [seq 126](trajectory.jsonl#L126) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0075","segments":[{"type":"equal","text":"claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder."}]}]}
```

- [seq 169](trajectory.jsonl#L169) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0073","p0075","p0071"],"quote":"b. TrueLink shall indemnify and hold Client harmless, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to any","rationale":"Section 12(b) is TrueLink's only indemnity and it is confined to claims \"arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations\" (p0075). There is no indemnity anywhere in the Agreement for third-party claims that the Interface, Hosting Services or Support Services infringe intellectual property rights — the only infringement language is Client-side (p0055 Client Content warranty, p0024, p0041). This fails even the fallback, which requires a Vendor IP indemnity (with usual exclusions and remedies), and the imbalance is compounded by the broad Client indemnity in 12(a) covering Client's breach, the Web Site/Client Content and product/service injury claims. We therefore add a TrueLink indemnity covering IP infringement, breach of law, data breach caused by TrueLink and gross negligence/wilful misconduct, with standard notice/control/cooperation procedure; the Client-side indemnity is left untouched as the smallest edit reaching the preferred position.</parationale>\n<parameter name=\"confidence\">0.88","proposal":{"level":"preferred","summary":"Add TrueLink indemnity for third-party IP infringement claims and related misconduct","comment":"[Playbook] TrueLink's indemnity currently covers only its own breach of this Agreement, leaving us exposed on third-party claims that the Interface, Hosting Services or Support Services infringe IP rights. We have added the standard vendor indemnity (IP infringement, breach of law, data breach and gross negligence/wilful misconduct) with usual notice and cooperation procedure; if preferred, we can accept an IP-only indemnity with customary exclusions for Client modifications, combinations and specifications.","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"c.","text":"c. In addition, TrueLink shall defend, indemnify and hold harmless Client and its affiliates, directors, officers, employees and agents from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Interface, the Hosting Services, the Support Services or any deliverable provided by TrueLink infringes or misappropriates any copyright, trade secret, trademark, patent or other intellectual property right; (ii) TrueLink's violation of any applicable law, rule or regulation; (iii) any unauthorized access to or disclosure of Client Content or Client Confidential Information caused by TrueLink; or (iv) TrueLink's gross negligence or willful misconduct. The indemnified party shall give the indemnifying party prompt written notice of the claim, tender sole control of the defense and settlement (provided that no settlement imposing liability or admission on the indemnified party shall be made without its consent), and provide reasonable cooperation at the indemnifying party's expense."}]}}
```

- [seq 170](trajectory.jsonl#L170) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 189](trajectory.jsonl#L189) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0073","p0075","p0071"],"quote":"b. TrueLink shall indemnify and hold Client harmless, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to any","rationale":"Section 12(b) is TrueLink's only indemnity and it is confined to claims \"arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations\" (p0075). There is no indemnity anywhere in the Agreement for third-party claims that the Interface, Hosting Services or Support Services infringe intellectual property rights — the only infringement language runs against Client (p0055 Client Content warranty, p0024, p0041). That fails even the fallback, which requires a Vendor IP indemnity with usual exclusions and remedies, and the imbalance is compounded by the broad Client indemnity in 12(a) covering Client's breach, the Web Site/Client Content and product/service injury claims. We add a TrueLink indemnity covering IP infringement, breach of law, data breach caused by TrueLink and gross negligence/wilful misconduct, with standard notice/control/cooperation procedure; the Client-side indemnity is left untouched as the smallest edit reaching the preferred position.","confidence":0.88,"proposal":{"level":"preferred","summary":"Add TrueLink indemnity for third-party IP infringement claims and related misconduct","comment":"[Playbook] TrueLink's indemnity currently covers only its own breach of this Agreement, leaving us exposed on third-party claims that the Interface, Hosting Services or Support Services infringe IP rights. We have added the standard vendor indemnity (IP infringement, breach of law, data breach and gross negligence/wilful misconduct) with usual notice and cooperation procedure; if preferred, we can accept an IP-only indemnity with customary exclusions for Client modifications, combinations and specifications.","ops":[{"kind":"insert_after","paragraphId":"p0075","numbering":"c.","text":"c. In addition, TrueLink shall defend, indemnify and hold harmless Client and its affiliates, directors, officers, employees and agents from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Interface, the Hosting Services, the Support Services or any deliverable provided by TrueLink infringes or misappropriates any copyright, trade secret, trademark, patent or other intellectual property right; (ii) TrueLink's violation of any applicable law, rule or regulation; (iii) any unauthorized access to or disclosure of Client Content or Client Confidential Information caused by TrueLink; or (iv) TrueLink's gross negligence or willful misconduct. The indemnified party shall give the indemnifying party prompt written notice of the claim, tender sole control of the defense and settlement (provided that no settlement imposing liability or admission on the indemnified party shall be made without its consent), and provide reasonable cooperation at the indemnifying party's expense."}]}}
```

- [seq 190](trajectory.jsonl#L190) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 189](trajectory.jsonl#L189)
- Finding: `f-indemn-55f24b52` · **deviation** · confidence 0.88
- Location: § 12 INDEMNITY.
- Quote: “b. TrueLink shall indemnify and hold Client harmless, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to any”
- Rationale: Section 12(b) is TrueLink's only indemnity and it is confined to claims "arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations" (p0075). There is no indemnity anywhere in the Agreement for third-party claims that the Interface, Hosting Services or Support Services infringe intellectual property rights — the only infringement language runs against Client (p0055 Client Content warranty, p0024, p0041). That fails even the fallback, which requires a Vendor IP indemnity with usual exclusions and remedies, and the imbalance is compounded by the broad Client indemnity in 12(a) covering Client's breach, the Web Site/Client Content and product/service injury claims. We add a TrueLink indemnity covering IP infringement, breach of law, data breach caused by TrueLink and gross negligence/wilful misconduct, with standard notice/control/cooperation procedure; the Client-side indemnity is left untouched as the smallest edit reaching the preferred position.
- Proposal: **fallback** — Insert TrueLink IP infringement indemnity with standard exclusions, remedies and 3x annual fees super-cap
- Comment: [Playbook] TrueLink's indemnity in 12(b) covers only its own breach, leaving us carrying third-party IP infringement claims on the Interface and Hosting and Support Services. We have added the fallback vendor IP indemnity with the usual Client modification, combination and specification exclusions, procure/modify/replace/refund remedies and a 3x annual fees super-cap, leaving Client's clause 12(a) untouched as the smaller edit.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "c.",
    "paragraphId": "p0075",
    "text": "c. TrueLink shall indemnify Client against any third-party claim that the Interface, the Hosting Services or the Support Services infringe or misappropriate any intellectual property right, except to the extent the claim arises from modifications made by Client, combination of the foregoing by Client with items not supplied by TrueLink, or Client's specifications. If such a claim is made, TrueLink shall procure for Client the right to continue use of the affected item, modify it so that it is non-infringing, or replace it with a non-infringing equivalent, and if none of the foregoing is available, refund the fees paid for the affected item. TrueLink's total liability under this Section 12(c) shall not exceed 3x the annual fees paid by Client under this Agreement."
  }
]
```

### Verifier and repair feedback

- [seq 243](trajectory.jsonl#L243) **Verdict: fail** — precision position: preferred indemnity adds no hold-harmless language: Remove hold-harmless language; it is outside the preferred prose and fails strict minimality. precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates: Remove indemnitees beyond Customer and affiliates; it is outside the preferred prose and fails strict minimality. precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation: Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality. Preferred level is incomplete: the pre-existing broad Client indemnity in clause a. was left untouched, so the required limitation of Customer's indemnity to Customer-provided content and Customer's breach of law is absent. Fallback level is also not satisfied on its own terms (no modification/combination/specification exclusions, no procure-modify-replace-refund remedies, no 3x annual fees super-cap); the exclusions appear only in the non-operative margin comment. Minimality fails: the insertion adds hold-harmless language, indemnitees beyond Customer and affiliates (directors, officers, employees, agents), and settlement-consent mechanics beyond the notice/control/cooperation procedure called for by the preferred prose. Intent is otherwise preserved: the redline is an additive clause c. that leaves all other paragraphs operative, though it relies on terms (Interface, Support Services, Client Content, Client Confidential Information) that must be defined elsewhere in the Agreement. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: vendor indemnity for IP infringement present","ok":true}; {"name":"precision position: preferred indemnity adds no hold-harmless language","ok":false,"detail":"Remove hold-harmless language; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates","ok":false,"detail":"Remove indemnitees beyond Customer and affiliates; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no a Customer defence duty","ok":true}; {"name":"precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation","ok":false,"detail":"Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no fallback infringement remedies","ok":true}; {"name":"official minimality gate","ok":true}.
- [seq 244](trajectory.jsonl#L244) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Customer's indemnity limited to Customer-provided content and Customer's breach of law\n Verdict: not_met. Evidence: Clause a. left intact: \"Client shall indemnify and hold TrueLink ... harmless from and against all claims, actions, expenses, losses, and liabilities ... arising from or relating to the following:\" — no limitation to Client content and Client breach of law was inserted\n\nDeterministic official failures:\n- precision position: preferred indemnity adds no hold-harmless language: Remove hold-harmless language; it is outside the preferred prose and fails strict minimality.\n- precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates: Remove indemnitees beyond Customer and affiliates; it is outside the preferred prose and fails strict minimality.\n- precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation: Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality.\n\nOffending extra words to remove verbatim:\n- hold harmless\n- directors, officers, employees and agents\n- provided that no settlement imposing liability or admission on the indemnified party shall be made without its consent\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level is incomplete: the pre-existing broad Client indemnity in clause a. was left untouched, so the required limitation of Customer's indemnity to Customer-provided content and Customer's breach of law is absent.\n- Fallback level is also not satisfied on its own terms (no modification/combination/specification exclusions, no procure-modify-replace-refund remedies, no 3x annual fees super-cap); the exclusions appear only in the non-operative margin comment.\n- Minimality fails: the insertion adds hold-harmless language, indemnitees beyond Customer and affiliates (directors, officers, employees, agents), and settlement-consent mechanics beyond the notice/control/cooperation procedure called for by the preferred prose.\n- Intent is otherwise preserved: the redline is an additive clause c. that leaves all other paragraphs operative, though it relies on terms (Interface, Support Services, Client Content, Client Confidential Information) that must be defined elsewhere in the Agreement."
- [seq 302](trajectory.jsonl#L302) **Verdict: repaired** — The inserted 12(c) completes every atomic element of the fallback: a Vendor IP infringement indemnity, the three usual exclusions (Client modifications, combinations, specifications), all four remedies (procure, modify, replace, refund) and a 3x annual fees super-cap. The preferred level is not reached: no express defence obligation or affiliate coverage, no breach-of-law, Vendor data breach or gross negligence/wilful misconduct heads, no notice/control/cooperation procedure, and Client's broad 12(a) indemnity is not narrowed to Client content and Client's breach of law. The cap is expressed as applying only to Section 12(c) rather than all Vendor indemnities, which is no worse for Customer than the fallback super-cap and therefore is not a shortfall against the locked level. Minimality holds: a single concise new subsection was added for an absent clause, with 12(a) and 12(b) untouched and no boilerplate or new exceptions beyond the standard fallback exclusions. Intent is preserved: no undefined terms are introduced (Interface, Hosting Services, Support Services are agreement terms) and no existing mechanic is left dangling. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: vendor indemnity for IP infringement present","ok":true}; {"name":"official minimality gate","ok":true}.

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

- [seq 19](trajectory.jsonl#L19) **drafter → list_sections**

```json
{}
```

- [seq 20](trajectory.jsonl#L20) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 21](trajectory.jsonl#L21) **drafter → search**

```json
{"query":"compet"}
```

- [seq 22](trajectory.jsonl#L22) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…dit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."},{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…term, provision, covenant, or condition of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable, the…
```

- [seq 55](trajectory.jsonl#L55) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 56](trajectory.jsonl#L56) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 57](trajectory.jsonl#L57) **drafter → search**

```json
{"query":"Non-Competition Agreement"}
```

- [seq 58](trajectory.jsonl#L58) **search result**

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

- [seq 139](trajectory.jsonl#L139) **drafter → search**

```json
{"query":"Client shall not"}
```

- [seq 140](trajectory.jsonl#L140) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"Client shall not engage in the practice commonly known as \"spamming\" pursuant to the rights gran…"},{"paragraphId":"p0052","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"b. Notification. Client shall not represent that loan underwriting decisions related to loans originated by using…"}]
```

- [seq 141](trajectory.jsonl#L141) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 142](trajectory.jsonl#L142) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 2 LICENSE.","snippet":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the ori…"},{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…Data during the term of this Agreement. Client hereby grants to TrueLink the nonexclusive worldwide right …
```

- [seq 165](trajectory.jsonl#L165) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0022","p0024","p0054"],"quote":"Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder, so long as such","rationale":"The Agreement imposes no non-compete or field-of-use restraint on Client. Section 2(a) grants a non-exclusive licence and expressly confirms Client is free to acquire, develop, license or otherwise use competing software and services (subject only to TrueLink's IP and Client's confidentiality obligations under Section 10), which is better than the preferred position. Client's only covenants (Section 8: legal compliance, no misrepresentation of underwriting decisions, access limitation, content warranties) and the Section 7 anti-spam covenant are conduct restrictions, not restraints on the businesses we may operate or the products we may buy or build. The single reference to a \"Non-Competition Agreement\" (Section 8(d), p0054) operates as a limitation on TrueLink's licence to use Credit Data and therefore benefits us; its terms sit in a separate document and are noted only for diligence, not flagged here.","confidence":0.88}
```

- [seq 166](trajectory.jsonl#L166) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 165](trajectory.jsonl#L165)
- Finding: `f-noncompete-81a93eb2` · **compliant** · confidence 0.88
- Location: § 2 LICENSE.
- Quote: “Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder, so long as such”
- Rationale: The Agreement imposes no non-compete or field-of-use restraint on Client. Section 2(a) grants a non-exclusive licence and expressly confirms Client is free to acquire, develop, license or otherwise use competing software and services (subject only to TrueLink's IP and Client's confidentiality obligations under Section 10), which is better than the preferred position. Client's only covenants (Section 8: legal compliance, no misrepresentation of underwriting decisions, access limitation, content warranties) and the Section 7 anti-spam covenant are conduct restrictions, not restraints on the businesses we may operate or the products we may buy or build. The single reference to a "Non-Competition Agreement" (Section 8(d), p0054) operates as a limitation on TrueLink's licence to use Credit Data and therefore benefits us; its terms sit in a separate document and are noted only for diligence, not flagged here.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

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
{"query":"exclusive","limit":30}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 2 LICENSE.","snippet":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the orig…"},{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…Data during the term of this Agreement. Client hereby grants to TrueLink the nonexclusive worldwide right…
```

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"sole","limit":30}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…ion and make any upgrades specified by TrueLink to so comply, all at TrueLink's sole cost and expense, to the extent such upgrades were not previously requested by …"},{"paragraphId":"p0094","sectionRef":"§ 12 INDEMNITY.","snippet":"…etween the parties that cannot be settled by mutual agreement shall be reso…
```

- [seq 63](trajectory.jsonl#L63) **drafter → search**

```json
{"query":"requirements","limit":30}
```

- [seq 64](trajectory.jsonl#L64) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…dequate testing of the Interface and all related software to meet the foregoing requirements. Client will provide reasonable access to TrueLink make any repairs necessary t…"}]
```

- [seq 107](trajectory.jsonl#L107) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 108](trajectory.jsonl#L108) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 109](trajectory.jsonl#L109) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 110](trajectory.jsonl#L110) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 133](trajectory.jsonl#L133) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 134](trajectory.jsonl#L134) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 135](trajectory.jsonl#L135) **drafter → search**

```json
{"query":"Non-Competition","limit":20}
```

- [seq 136](trajectory.jsonl#L136) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"… Credit Data subject to the limitations set forth in and in accordance with the Non-Competition Agreement."}]
```

- [seq 159](trajectory.jsonl#L159) **drafter → read_section**

```json
{"sectionId":"sec-p0002"}
```

- [seq 160](trajectory.jsonl#L160) **read_section result**

```json
{"sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","paragraphs":[{"id":"p0002","text":"LICENSING AND WEB SITE HOSTING AGREEMENT"},{"id":"p0003","text":"This Agreement is entered into on February 26, 1999, (the \"Effective Date\") by and between Mortgage Logic.com, Inc. (\"Client\"), with an address at Two Venture Plaza, 2 Venture, Irvine, California 92618 and TrueLink, Inc. (\"TrueLink\")…
```

- [seq 161](trajectory.jsonl#L161) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 162](trajectory.jsonl#L162) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0009","text":"1. DEFINITIONS."},{"id":"p0010","text":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to sites on the World Wide Web."},{"id":"p0011","text":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics, video, a…
```

- [seq 185](trajectory.jsonl#L185) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0022","p0042"],"quote":"Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder","rationale":"The Agreement imposes no exclusivity or sole-supplier obligation on us. The licence grant in Section 2(a) is expressly non-exclusive and affirmatively confirms that we are \"not obligated to utilize the License\" and remain free to acquire, develop or license competing software and services (subject only to not infringing TrueLink's IP and to our confidentiality obligations) — this meets the preferred position and is language that benefits us. The only exclusivity-flavoured references run in our favour or are neutral: Section 8(d) grants TrueLink a nonexclusive licence to Credit Data, and Section 12's \"solely and exclusively\" wording is a forum-selection provision, not a dealing restriction. Section 3(i) requires that \"Client shall order TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface,\" but that is a narrow, self-triggered operational term applying only to transactions we voluntarily route through TrueLink's Interface; combined with Section 2(a) it leaves our procurement freedom intact and is not a requirements or sole-source covenant. Noted for awareness only, not flagged as a deviation.</parationale>\n<parameter name=\"confidence\">0.85"}
```

- [seq 186](trajectory.jsonl#L186) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 220](trajectory.jsonl#L220) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0022","p0042"],"quote":"Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder","rationale":"The Agreement imposes no exclusivity or sole-supplier obligation on us, so it meets the preferred position. Section 2(a) grants a non-exclusive licence and affirmatively confirms we are \"not obligated to utilize the License\" and are free to acquire, develop or license competing software and services (subject only to not infringing TrueLink's IP and to our confidentiality obligations) — language that benefits us. The other \"exclusive\" references are neutral or in our favour: Section 8(d) is a nonexclusive licence to TrueLink of Credit Data, and Section 12's \"solely and exclusively\" wording is forum selection, not a dealing restriction. Section 3(i) (\"Client shall order TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface\") is a narrow, self-triggered operational term applying only to transactions we voluntarily route through the Interface; read with Section 2(a) it leaves our procurement freedom intact and is not a requirements or sole-source covenant. Noted for awareness only, not flagged.","confidence":0.85}
```

- [seq 221](trajectory.jsonl#L221) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 220](trajectory.jsonl#L220)
- Finding: `f-exclusivity-2488a3cd` · **compliant** · confidence 0.85
- Location: § 2 LICENSE.
- Quote: “Notwithstanding the foregoing, Client is not obligated to utilize the License and is free to acquire, develop, license or otherwise utilize any other hardware, software system, design, formula, procedure or trade secret to provide software and services similar to the ones provided by TrueLink hereunder”
- Rationale: The Agreement imposes no exclusivity or sole-supplier obligation on us, so it meets the preferred position. Section 2(a) grants a non-exclusive licence and affirmatively confirms we are "not obligated to utilize the License" and are free to acquire, develop or license competing software and services (subject only to not infringing TrueLink's IP and to our confidentiality obligations) — language that benefits us. The other "exclusive" references are neutral or in our favour: Section 8(d) is a nonexclusive licence to TrueLink of Credit Data, and Section 12's "solely and exclusively" wording is forum selection, not a dealing restriction. Section 3(i) ("Client shall order TrueLink a credit report on each borrower for which an underwriting approval is requested through a System using the Interface") is a narrow, self-triggered operational term applying only to transactions we voluntarily route through the Interface; read with Section 2(a) it leaves our procurement freedom intact and is not a requirements or sole-source covenant. Noted for awareness only, not flagged.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

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
{"sectionId":"sec-5"}
```

- [seq 38](trajectory.jsonl#L38) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 39](trajectory.jsonl#L39) **drafter → search**

```json
{"query":"no less favorable"}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[]
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"most favored"}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[]
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"any other party"}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"… rates charged for Hosting Services will not exceed that charged by TrueLink to any other party."}]
```

- [seq 85](trajectory.jsonl#L85) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 86](trajectory.jsonl#L86) **search result**

```json
[]
```

- [seq 119](trajectory.jsonl#L119) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 120](trajectory.jsonl#L120) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 2 LICENSE.","snippet":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the ori…"},{"paragraphId":"p0054","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…Data during the term of this Agreement. Client hereby grants to TrueLink the nonexclusive worldwide right …
```

- [seq 121](trajectory.jsonl#L121) **drafter → search**

```json
{"query":"match"}
```

- [seq 122](trajectory.jsonl#L122) **search result**

```json
[]
```

- [seq 145](trajectory.jsonl#L145) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047"],"quote":"TrueLink agrees that the costs for any Hosting Services will not increase for a period of one year from the date of this Agreement and that rates charged for Hosting Services will not exceed that charged by TrueLink to any other party.","rationale":"The only most-favoured-nation language in the Agreement runs in our favour: TrueLink commits that Hosting Services rates will not exceed those charged to any other party (and will not increase for one year). Searches for MFN-style triggers (\"most favored\", \"no less favorable\", \"any other party\", \"match\", exclusivity) return no provision requiring the Client to extend TrueLink its best terms or to match third-party offers. This meets the preferred position of no MFN obligation on Customer, so no redline is proposed.","confidence":0.9}
```

- [seq 146](trajectory.jsonl#L146) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 145](trajectory.jsonl#L145)
- Finding: `f-mfn-ead09424` · **compliant** · confidence 0.90
- Location: § 5 COMPENSATION.
- Quote: “TrueLink agrees that the costs for any Hosting Services will not increase for a period of one year from the date of this Agreement and that rates charged for Hosting Services will not exceed that charged by TrueLink to any other party.”
- Rationale: The only most-favoured-nation language in the Agreement runs in our favour: TrueLink commits that Hosting Services rates will not exceed those charged to any other party (and will not increase for one year). Searches for MFN-style triggers ("most favored", "no less favorable", "any other party", "match", exclusivity) return no provision requiring the Client to extend TrueLink its best terms or to match third-party offers. This meets the preferred position of no MFN obligation on Customer, so no redline is proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

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
[{"paragraphId":"p0048","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"paragraphId":"p0049","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"…s, forums, e-mail mailings lists or other similar groups or lists; or sending unsolicited mass e-mailings to more than twenty-five (25) e-mail users, if such unsolicit…"},{"paragraphId":"p0049"…
```

- [seq 45](trajectory.jsonl#L45) **drafter → search**

```json
{"query":"employ"}
```

- [seq 46](trajectory.jsonl#L46) **search result**

```json
[{"paragraphId":"p0053","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…nt Proprietary Information to restrict access to the Interface to its officers, employees, and agents as may be approved by Client."},{"paragraphId":"p0071","sectionRef":"§ 12 INDEMNITY.","snippet":"… Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licenso…
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"hire"}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[]
```

- [seq 75](trajectory.jsonl#L75) **drafter → search**

```json
{"query":"induce"}
```

- [seq 76](trajectory.jsonl#L76) **search result**

```json
[]
```

- [seq 77](trajectory.jsonl#L77) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 78](trajectory.jsonl#L78) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 113](trajectory.jsonl#L113) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 114](trajectory.jsonl#L114) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 115](trajectory.jsonl#L115) **drafter → list_sections**

```json
{}
```

- [seq 116](trajectory.jsonl#L116) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 149](trajectory.jsonl#L149) **drafter → search**

```json
{"query":"personnel"}
```

- [seq 150](trajectory.jsonl#L150) **search result**

```json
[]
```

- [seq 151](trajectory.jsonl#L151) **drafter → search**

```json
{"query":"(recruit|solicit|no-hire|employ or engage|staff)","regex":true}
```

- [seq 152](trajectory.jsonl#L152) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"paragraphId":"p0049","sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","snippet":"…s, forums, e-mail mailings lists or other similar groups or lists; or sending unsolicited mass e-mailings to more than twenty-five (25) e-mail users, if such unsolicit…"},{"paragraphId":"p0049"…
```

- [seq 173](trajectory.jsonl#L173) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0048","p0050","p0061"],"quote":"7. UNSOLICITED COMMERCIAL E-MAIL.","rationale":"The Agreement contains no non-solicitation, no-hire or anti-poaching covenant binding the Client. Searches for \"solicit\", \"employ\", \"hire\", \"induce\", \"recruit\" and \"personnel\" return only the anti-spam section (§ 7 Unsolicited Commercial E-Mail) and routine references to employees in the access-restriction (§ 8(c)) and indemnity (§ 12) provisions; the Client covenants section (§ 8) and confidentiality section (§ 10) — the usual homes for such covenants — contain none. This matches our preferred position of no non-solicit binding the Customer, so no redline is warranted. Noting only that § 8(d) cross-refers to a separate Non-Competition Agreement, which is outside this document and should be reviewed separately for any personnel restrictions.","confidence":0.9}
```

- [seq 174](trajectory.jsonl#L174) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 173](trajectory.jsonl#L173)
- Finding: `f-nosolicit-3da2e3ca` · **compliant** · confidence 0.90
- Location: § 7 UNSOLICITED COMMERCIAL E-MAIL.
- Quote: “7. UNSOLICITED COMMERCIAL E-MAIL.”
- Rationale: The Agreement contains no non-solicitation, no-hire or anti-poaching covenant binding the Client. Searches for "solicit", "employ", "hire", "induce", "recruit" and "personnel" return only the anti-spam section (§ 7 Unsolicited Commercial E-Mail) and routine references to employees in the access-restriction (§ 8(c)) and indemnity (§ 12) provisions; the Client covenants section (§ 8) and confidentiality section (§ 10) — the usual homes for such covenants — contain none. This matches our preferred position of no non-solicit binding the Customer, so no redline is warranted. Noting only that § 8(d) cross-refers to a separate Non-Competition Agreement, which is outside this document and should be reviewed separately for any personnel restrictions.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 178](trajectory.jsonl#L178)

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

- [seq 196](trajectory.jsonl#L196) **drafter → list_sections**

```json
{}
```

- [seq 197](trajectory.jsonl#L197) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 198](trajectory.jsonl#L198) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 199](trajectory.jsonl#L199) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whic……
```

- [seq 224](trajectory.jsonl#L224) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 225](trajectory.jsonl#L225) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 247](trajectory.jsonl#L247) **drafter → search**

```json
{"query":"Section 4","limit":20}
```

- [seq 248](trajectory.jsonl#L248) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…on supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (other than the minimum monthly fee…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…e entitled to contest any charge (other than the minimum monthly fees listed in Section 4…
```

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 271](trajectory.jsonl#L271) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 272](trajectory.jsonl#L272) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 296](trajectory.jsonl#L296) **drafter → search**

```json
{"query":"suspend","limit":10}
```

- [seq 297](trajectory.jsonl#L297) **search result**

```json
[]
```

- [seq 298](trajectory.jsonl#L298) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 299](trajectory.jsonl#L299) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 321](trajectory.jsonl#L321) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0079","p0078"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"Section 14 gives Client (and only Client) a unilateral right to terminate at will on written notice, with services running to the last day of the month following the notice month — an effective notice period of roughly 30 to 60 days, with no early-termination fee, penalty or other exit charge. That meets, and on the fee point exceeds, our preferred position (30 days' notice without penalty). TrueLink has no mid-term termination-for-convenience right: Section 13 sets a one-year term auto-renewing for successive one-year periods, and the only TrueLink exit is the mutual 30-day notice of intent not to renew at the end of a year (plus for-cause termination of Sections 2 and 3 on Client breach), so the walk-away scenario (Vendor convenience termination mid-term) does not arise. Two minor points noted but not redlined: (i) there is no express pro-rata refund of prepaid fees, which is immaterial here because Section 5(a) bills Hosting and Support Services monthly in arrears against invoices payable within 15 days, so no material prepayment accrues; and (ii) the end-of-term non-renewal notice is 30 days rather than the 90 days contemplated for a Vendor end-of-term exit, but that right is symmetric, applies only at expiry of a one-year term, and equally preserves our own flexibility, so it benefits us as much as TrueLink.","confidence":0.76}
```

- [seq 322](trajectory.jsonl#L322) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 571](trajectory.jsonl#L571)
- Finding: `f-t4c-4c8b19a0` · **compliant** · confidence 0.76
- Location: § 12 INDEMNITY.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: Section 14 gives Client (and only Client) a unilateral right to terminate at will on written notice, with services running to the last day of the month following the notice month — an effective notice period of roughly 30 to 60 days, with no early-termination fee, penalty or other exit charge. That meets, and on the fee point exceeds, our preferred position (30 days' notice without penalty). TrueLink has no mid-term termination-for-convenience right: Section 13 sets a one-year term auto-renewing for successive one-year periods, and the only TrueLink exit is the mutual 30-day notice of intent not to renew at the end of a year (plus for-cause termination of Sections 2 and 3 on Client breach), so the walk-away scenario (Vendor convenience termination mid-term) does not arise. Two minor points noted but not redlined: (i) there is no express pro-rata refund of prepaid fees, which is immaterial here because Section 5(a) bills Hosting and Support Services monthly in arrears against invoices payable within 15 days, so no material prepayment accrues; and (ii) the end-of-term non-renewal notice is 30 days rather than the 90 days contemplated for a Vendor end-of-term exit, but that right is symmetric, applies only at expiry of a one-year term, and equally preserves our own flexibility, so it benefits us as much as TrueLink.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 183](trajectory.jsonl#L183)

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

- [seq 202](trajectory.jsonl#L202) **drafter → list_sections**

```json
{}
```

- [seq 203](trajectory.jsonl#L203) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 204](trajectory.jsonl#L204) **drafter → search**

```json
{"query":"renew"}
```

- [seq 205](trajectory.jsonl#L205) **search result**

```json
[{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…b) any violations or breach by Client of Sections 8a - 8c. This Agreement shall renew automatically thereafter for successive one year periods until terminated pursu…"},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"… either Client or TrueLink deliver to the other written notice of intent not to renew no later th…
```

- [seq 228](trajectory.jsonl#L228) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0076","p0077","p0078","p0079","p0080"]}
```

- [seq 229](trajectory.jsonl#L229) **read_paragraphs result**

```json
[{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY OR FOR ANY MATTER RELATING TO THE ACCURACY OR COMPLETENESS, OR TIMING OF TRANSMISSION OF ANY DATA SUBMITTED THROUGH THE INTERFACE OR TO OR FROM THE WEB SIT…
```

- [seq 230](trajectory.jsonl#L230) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 231](trajectory.jsonl#L231) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 253](trajectory.jsonl#L253) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0078","p0047"],"quote":"This Agreement shall renew automatically thereafter for successive one year periods until terminated pursuant to Section 12 herein or unless either Client or TrueLink deliver to the other written notice of intent not to renew no later than thirty (30) days prior to the end of said year.","rationale":"Section 13 (p0078) provides automatic renewal for successive one-year (not multi-year) terms, with either party able to prevent renewal on thirty (30) days' written notice. Both material parameters sit at the preferred position: 12-month renewal term and a 30-day (≤30) non-renewal notice window exercisable by us, well inside the fallback (≤60 days) and far from walk-away territory (>90 days or multi-year auto-renewal). Two preferred sub-elements are absent and are noted rather than flagged: there is no Vendor reminder 60 days before renewal, and no express cap on renewal price increases (lesser of CPI and 3%). Section 6 (p0047) partially mitigates the latter by freezing Hosting Services costs for the first year and imposing a most-favoured-rate commitment on TrueLink. No redline proposed.","confidence":0.86}
```

- [seq 254](trajectory.jsonl#L254) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 253](trajectory.jsonl#L253)
- Finding: `f-renewal-4d0df6e1` · **compliant** · confidence 0.86
- Location: § 12 INDEMNITY.
- Quote: “This Agreement shall renew automatically thereafter for successive one year periods until terminated pursuant to Section 12 herein or unless either Client or TrueLink deliver to the other written notice of intent not to renew no later than thirty (30) days prior to the end of said year.”
- Rationale: Section 13 (p0078) provides automatic renewal for successive one-year (not multi-year) terms, with either party able to prevent renewal on thirty (30) days' written notice. Both material parameters sit at the preferred position: 12-month renewal term and a 30-day (≤30) non-renewal notice window exercisable by us, well inside the fallback (≤60 days) and far from walk-away territory (>90 days or multi-year auto-renewal). Two preferred sub-elements are absent and are noted rather than flagged: there is no Vendor reminder 60 days before renewal, and no express cap on renewal price increases (lesser of CPI and 3%). Section 6 (p0047) partially mitigates the latter by freezing Hosting Services costs for the first year and imposing a most-favoured-rate commitment on TrueLink. No redline proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 194](trajectory.jsonl#L194)

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

- [seq 214](trajectory.jsonl#L214) **drafter → search**

```json
{"query":"governing law"}
```

- [seq 215](trajectory.jsonl#L215) **search result**

```json
[]
```

- [seq 216](trajectory.jsonl#L216) **drafter → search**

```json
{"query":"jurisdiction"}
```

- [seq 217](trajectory.jsonl#L217) **search result**

```json
[{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…ision, covenant, or condition of this Agreement is held by a court of competent jurisdiction to be invalid or unenforceable, the rest of the Agreement shall remain in full …"},{"paragraphId":"p0094","sectionRef":"§ 12 INDEMNITY.","snippet":"…cated within San Luis Obispo County, California, and each party consents to the jurisdicti…
```

- [seq 234](trajectory.jsonl#L234) **drafter → read_section**

```json
{"sectionId":"§ 12 INDEMNITY."}
```

- [seq 235](trajectory.jsonl#L235) **read_section result**

```json
{"ok":false,"error":"Unknown section: § 12 INDEMNITY."}
```

- [seq 261](trajectory.jsonl#L261) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0088","p0089","p0090","p0091","p0092","p0093","p0094","p0095","p0096"]}
```

- [seq 262](trajectory.jsonl#L262) **read_paragraphs result**

```json
[{"id":"p0088","sectionRef":"§ 12 INDEMNITY.","text":"22. CAPTIONS. The captions in this Agreement are included for convenience of reference only and will not be construed to define or limit any of the provisions contained herein."},{"id":"p0089","sectionRef":"§ 12 INDEMNITY.","text":"23. JOINT DRAFTING AND NEUTRAL CONSTRUCTION. This Agreement is a negotiated document and shall be deemed to have …
```

- [seq 280](trajectory.jsonl#L280) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0093","p0094"],"quote":"26. APPLICABLE LAW. This Agreement shall be governed, construed and interpreted in accordance with the laws of the State of California (without respect to principles of conflicts of law).","rationale":"Sections 26 and 27 select California law with exclusive venue in the state or federal courts of San Luis Obispo County, California. That sits at the playbook fallback (Delaware or California law and courts) rather than the preferred New York position, but it is an accepted jurisdiction resolved in courts — there is no arbitration, and no foreign seat or venue outside the accepted list. The county-level venue (Vendor's home county rather than a neutral California forum) is a minor sub-element noted here rather than a deviation. No redline proposed.","confidence":0.9}
```

- [seq 281](trajectory.jsonl#L281) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 280](trajectory.jsonl#L280)
- Finding: `f-govlaw-f65d9023` · **compliant** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “26. APPLICABLE LAW. This Agreement shall be governed, construed and interpreted in accordance with the laws of the State of California (without respect to principles of conflicts of law).”
- Rationale: Sections 26 and 27 select California law with exclusive venue in the state or federal courts of San Luis Obispo County, California. That sits at the playbook fallback (Delaware or California law and courts) rather than the preferred New York position, but it is an accepted jurisdiction resolved in courts — there is no arbitration, and no foreign seat or venue outside the accepted list. The county-level venue (Vendor's home county rather than a neutral California forum) is a minor sub-element noted here rather than a deviation. No redline proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 241](trajectory.jsonl#L241)

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

- [seq 265](trajectory.jsonl#L265) **drafter → list_sections**

```json
{}
```

- [seq 266](trajectory.jsonl#L266) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 267](trajectory.jsonl#L267) **drafter → search**

```json
{"query":"assign"}
```

- [seq 268](trajectory.jsonl#L268) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under…"},{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written ap…"},{"paragraphId":"p0080","sectionRef":…
```

- [seq 290](trajectory.jsonl#L290) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0078","p0079","p0080","p0081","p0082"]}
```

- [seq 291](trajectory.jsonl#L291) **read_paragraphs result**

```json
[{"id":"p0078","sectionRef":"§ 12 INDEMNITY.","text":"13. TERM OF AGREEMENT. This Agreement will take effect on the Effective Date and remain in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers which constitutes a breach of or default by TrueLink under any System Agreement or Credit Repo…
```

- [seq 292](trajectory.jsonl#L292) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 293](trajectory.jsonl#L293) **search result**

```json
[]
```

- [seq 315](trajectory.jsonl#L315) **drafter → lookup_precedent**

```json
{"ruleId":"ASSIGN","context":"Mutual consent-based assignment clause with affiliate carve-out; no successor/M&A carve-out, no reasonableness standard, no change-of-control language"}
```

- [seq 316](trajectory.jsonl#L316) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 317](trajectory.jsonl#L317) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 318](trajectory.jsonl#L318) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 345](trajectory.jsonl#L345) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add successor/M&A carve-out for Client assignments, a reasonableness standard on consent to TrueLink assignments, no assignment to a Client competitor, and confirm a Client change of control is not an assignment.","comment":"[Playbook] We need to be able to assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without consent, and to confirm that a change of control on our side is not an assignment and gives TrueLink no exit or re-pricing right. We have kept TrueLink's assignments subject to our consent, not to be unreasonably withheld, and excluded assignment to our competitors; if helpful, we can accept a mutual notice-based successor right with consent not unreasonably withheld for all other assignments.","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"Client may assign or transfer this Agreement, and its rights and obligations hereunder, without the prior approval of TrueLink, to a financially responsible affiliate or to a successor in interest by way of merger, acquisition, reorganization or sale of all or substantially all of its assets or of the business to which this Agreement relates. TrueLink shall not assign or transfer any of its rights or obligations under this Agreement without the prior written approval of Client, which approval shall not be unreasonably withheld, and in no event to a competitor of Client. A change of control of Client shall not constitute an assignment or transfer under this Agreement and shall not give TrueLink any right to terminate, re-price or modify this Agreement."}]}
```

- [seq 346](trajectory.jsonl#L346) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0080","segments":[{"type":"equal","text":"15. ASSIGNMENT OR TRANSFER. "},{"type":"delete","text":"Neither party shall "},{"type":"insert","text":"Client may assign or transfer this Agreement, and its rights and obligations hereunder, without the prior approval of TrueLink, to a financially responsible affiliate or to a successor in interest by w…
```

- [seq 384](trajectory.jsonl#L384) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0080"],"quote":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","rationale":"Section 15 is the only assignment provision in the Agreement. It bars assignment by either party absent the other's prior written approval, with a carve-out only for assignment to a financially responsible affiliate. It therefore fails the fallback on two material terms: there is no successor/M&A carve-out permitting Client to assign to a purchaser in a merger, acquisition or sale of substantially all assets, and the consent standard is unqualified (no \"not to be unreasonably withheld\"), so TrueLink could block a corporate transaction at will. The clause does at least avoid walk-away territory — there is no Vendor termination or re-pricing right triggered by a Client change of control anywhere in the document (no \"change of control\" language appears), and Section 13/14 termination rights are not CoC-linked. The redline adds the affiliate/successor carve-out for Client, applies a reasonableness standard and a competitor bar to TrueLink assignments, and confirms a Client change of control is not an assignment, reaching the preferred position with the smallest workable edit.","confidence":0.86,"proposal":{"level":"preferred","summary":"Add successor/M&A carve-out for Client assignments, a reasonableness standard on consent to TrueLink assignments, no assignment to a Client competitor, and confirm a Client change of control is not an assignment.","comment":"[Playbook] We need to be able to assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without consent, and to confirm that a change of control on our side is not an assignment and gives TrueLink no exit or re-pricing right. We have kept TrueLink's assignments subject to our consent, not to be unreasonably withheld, and excluded assignment to our competitors; if helpful, we can accept a mutual notice-based successor right with consent not unreasonably withheld for all other assignments.","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"Client may assign or transfer this Agreement, and its rights and obligations hereunder, without the prior approval of TrueLink, to a financially responsible affiliate or to a successor in interest by way of merger, acquisition, reorganization or sale of all or substantially all of its assets or of the business to which this Agreement relates. TrueLink shall not assign or transfer any of its rights or obligations under this Agreement without the prior written approval of Client, which approval shall not be unreasonably withheld, and in no event to a competitor of Client. A change of control of Client shall not constitute an assignment or transfer under this Agreement and shall not give TrueLink any right to terminate, re-price or modify this Agreement."}]}}
```

- [seq 385](trajectory.jsonl#L385) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 384](trajectory.jsonl#L384)
- Finding: `f-assign-0ba91216` · **deviation** · confidence 0.86
- Location: § 12 INDEMNITY.
- Quote: “15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.”
- Rationale: Section 15 is the only assignment provision in the Agreement. It bars assignment by either party absent the other's prior written approval, with a carve-out only for assignment to a financially responsible affiliate. It therefore fails the fallback on two material terms: there is no successor/M&A carve-out permitting Client to assign to a purchaser in a merger, acquisition or sale of substantially all assets, and the consent standard is unqualified (no "not to be unreasonably withheld"), so TrueLink could block a corporate transaction at will. The clause does at least avoid walk-away territory — there is no Vendor termination or re-pricing right triggered by a Client change of control anywhere in the document (no "change of control" language appears), and Section 13/14 termination rights are not CoC-linked. The redline adds the affiliate/successor carve-out for Client, applies a reasonableness standard and a competitor bar to TrueLink assignments, and confirms a Client change of control is not an assignment, reaching the preferred position with the smallest workable edit.
- Proposal: **preferred** — Widen the existing consent-free carve-out to Client affiliate and M&A successor assignments, and add reasonableness on our consent to TrueLink assignments, a competitor bar, and no TrueLink termination right on a Client change of control.
- Comment: [Playbook] We have kept Section 15 intact and only widened the existing carve-out so Client may assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without approval, and added that our approval of a TrueLink assignment will not be unreasonably withheld, that TrueLink may not assign to our competitor, and that a change of control of Client gives TrueLink no termination right. This is our standard assignment position; if helpful we can discuss a mutual notice-based successor right instead.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for Client's assignment to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets.",
    "oldText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.",
    "paragraphId": "p0080"
  },
  {
    "asHeading": false,
    "kind": "insert_after",
    "paragraphId": "p0080",
    "text": "Client's approval of an assignment or transfer by TrueLink shall not be unreasonably withheld, and TrueLink shall not assign or transfer this Agreement to a competitor of Client. TrueLink shall have no right to terminate this Agreement as a result of a change of control of Client."
  }
]
```

### Verifier and repair feedback

- [seq 452](trajectory.jsonl#L452) **Verdict: fail** — precision position: preferred affiliate assignment is not limited by financial qualification: Remove financial-responsibility, creditworthiness, solvency, or approval qualifications from Customer's consent-free affiliate assignment right. precision position: preferred assignment adds no change-of-control deemed-assignment rule: Delete the new deemed-assignment rule. State only that Vendor has no termination right on Customer's change of control. official minimality gate: Operation 1 expands 37 words to 123 words (ratio 3.32 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.813 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Preferred is incomplete on one atomic element: the consent-free affiliate assignment is still limited to a "financially responsible affiliate", so Customer's affiliate right is qualified rather than unconditional as the position requires. Fallback is not met either (and cannot be mixed in): Vendor has no reciprocal notice-based successor assignment right and no written-notice mechanic exists. Minimality fails: the edit rewrites the whole clause (37 words to 123), adds a new deemed-assignment rule and extra protections ("re-price or modify", "reorganization", "or of the business to which this Agreement relates") beyond the single needed statement that Vendor has no termination right on Customer's change of control. Intent is preserved: no undefined terms, contradictions or dangling mechanics, and the surrounding commercial terms are untouched; the loss of Vendor's affiliate carve-out favours our side. Fix: keep the original sentence structure and delete "financially responsible" from Customer's affiliate carve-out, and reduce the change-of-control sentence to a bare no-termination-right statement. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: successor/affiliate carve-out for Customer present","ok":true}; {"name":"precision position: preferred affiliate assignment is not limited by financial qualification","ok":false,"detail":"Remove financial-responsibility, creditworthiness, solvency, or approval qualifications from Customer's consent-free affiliate assignment right."}; {"name":"precision position: preferred assignment adds no change-of-control deemed-assignment rule","ok":false,"detail":"Delete the new deemed-assignment rule. State only that Vendor has no termination right on Customer's change of control."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 37 words to 123 words (ratio 3.32 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.813 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 453](trajectory.jsonl#L453) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Customer may assign without Vendor consent to an affiliate (unqualified)\n Verdict: not_met. Evidence: \"without the prior approval of TrueLink, to a financially responsible affiliate\" — the affiliate right remains qualified by a financial-responsibility test\n\nDeterministic official failures:\n- precision position: preferred affiliate assignment is not limited by financial qualification: Remove financial-responsibility, creditworthiness, solvency, or approval qualifications from Customer's consent-free affiliate assignment right.\n- precision position: preferred assignment adds no change-of-control deemed-assignment rule: Delete the new deemed-assignment rule. State only that Vendor has no termination right on Customer's change of control.\n- official minimality gate: Operation 1 expands 37 words to 123 words (ratio 3.32 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.813 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- financially responsible\n- reorganization\n- or of the business to which this Agreement relates\n- A change of control of Client shall not constitute an assignment or transfer under this Agreement\n- re-price or modify\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred is incomplete on one atomic element: the consent-free affiliate assignment is still limited to a \"financially responsible affiliate\", so Customer's affiliate right is qualified rather than unconditional as the position requires.\n- Fallback is not met either (and cannot be mixed in): Vendor has no reciprocal notice-based successor assignment right and no written-notice mechanic exists.\n- Minimality fails: the edit rewrites the whole clause (37 words to 123), adds a new deemed-assignment rule and extra protections (\"re-price or modify\", \"reorganization\", \"or of the business to which this Agreement relates\") beyond the single needed statement that Vendor has no termination right on Customer's change of control.\n- Intent is preserved: no undefined terms, contradictions or dangling mechanics, and the surrounding commercial terms are untouched; the loss of Vendor's affiliate carve-out favours our side.\n- Fix: keep the original sentence structure and delete \"financially responsible\" from Customer's affiliate carve-out, and reduce the change-of-control sentence to a bare no-termination-right statement."
- [seq 528](trajectory.jsonl#L528) **Verdict: repaired** — All six atomic preferred elements are expressly present: Customer affiliate and successor assignment free of consent, Vendor assignment gated on Customer consent, reasonableness standard on that consent, competitor prohibition, and no Vendor termination right on Customer change of control. Edits are surgical: the existing carve-out sentence was narrowed to Client and widened to successors, plus one concise sentence for the three otherwise absent protections; no unrelated term or sentence was disturbed. Fallback is separately not met (no mutual notice-based successor right), which is immaterial since the locked target level (preferred) is satisfied. No undefined terms or dangling mechanics introduced; 'competitor of Client' and 'change of control' are used in their ordinary sense consistent with the rest of the agreement. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: successor/affiliate carve-out for Customer present","ok":true}; {"name":"precision position: preferred affiliate assignment is not limited by financial qualification","ok":true}; {"name":"precision position: preferred assignment adds no change-of-control deemed-assignment rule","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 259](trajectory.jsonl#L259)

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

- [seq 284](trajectory.jsonl#L284) **drafter → list_sections**

```json
{}
```

- [seq 285](trajectory.jsonl#L285) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 286](trajectory.jsonl#L286) **drafter → search**

```json
{"query":"own","limit":40}
```

- [seq 287](trajectory.jsonl#L287) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"… on, or are provided to TrueLink by or on behalf of Client for uploading to or downloading from, the Web Site."},{"paragraphId":"p0029","sectionRef":"§ 2 LICENSE.","snippet":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains …"},{"paragraphId":"p0029","sectionRef":"§ 2 LICENSE.","snippet":"…wit…
```

- [seq 325](trajectory.jsonl#L325) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 326](trajectory.jsonl#L326) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0009","text":"1. DEFINITIONS."},{"id":"p0010","text":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to sites on the World Wide Web."},{"id":"p0011","text":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics, video, a…
```

- [seq 327](trajectory.jsonl#L327) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 328](trajectory.jsonl#L328) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 355](trajectory.jsonl#L355) **drafter → search**

```json
{"query":"Client Intellectual Property","limit":30}
```

- [seq 356](trajectory.jsonl#L356) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"c. Client's Intellectual Property. The term \"Client Intellectual Property\" means, client's designs, customer lists, formulas, procedures, methods, appara…"}]
```

- [seq 357](trajectory.jsonl#L357) **drafter → search**

```json
{"query":"Client Content","limit":30}
```

- [seq 358](trajectory.jsonl#L358) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks…"},{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics…"},{"paragraphId":"p0019","sectionRef…
```

- [seq 388](trajectory.jsonl#L388) **drafter → search**

```json
{"query":"Credit Data","limit":30}
```

- [seq 389](trajectory.jsonl#L389) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"d. Credit Data. The term \"Credit Data\" means data of any borrower or loan applicant of Client …"},{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"d. Credit Data. The term \"Credit Data\" means data of any borrower or loan applicant of Client or BNC Mortgage, Inc., …"},{"paragraphId":"p0015","sectionRef":"§ 1 DE…
```

- [seq 390](trajectory.jsonl#L390) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 391](trajectory.jsonl#L391) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 416](trajectory.jsonl#L416) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 417](trajectory.jsonl#L417) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 446](trajectory.jsonl#L446) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0076","p0077","p0078","p0079","p0080"]}
```

- [seq 447](trajectory.jsonl#L447) **read_paragraphs result**

```json
[{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY OR FOR ANY MATTER RELATING TO THE ACCURACY OR COMPLETENESS, OR TIMING OF TRANSMISSION OF ANY DATA SUBMITTED THROUGH THE INTERFACE OR TO OR FROM THE WEB SIT…
```

- [seq 448](trajectory.jsonl#L448) **drafter → search**

```json
{"query":"work product deliverable results of the Support Services","limit":20}
```

- [seq 449](trajectory.jsonl#L449) **search result**

```json
[]
```

- [seq 478](trajectory.jsonl#L478) **drafter → lookup_precedent**

```json
{"ruleId":"IP","context":"Hosting/licence agreement; vendor retains Interface IP; no clause vesting Client ownership of Support Services work product or reserving Client rights in Client Content and borrower data"}
```

- [seq 479](trajectory.jsonl#L479) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 502](trajectory.jsonl#L502) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add a Client-ownership provision: Client retains its Content, IP and borrower data; TrueLink assigns work product from the Support Services with a licence back to any embedded TrueLink IP; no joint ownership.","comment":"[Playbook] Section 2(d) only confirms TrueLink's ownership of the Interface, and nothing else in the Agreement vests Client with ownership of the work product it pays for under the Support Services or reserves Client's rights in its Content, IP and borrower/loan data. We have added a reciprocal ownership provision (with a licence back for any TrueLink IP embedded in deliverables) so that we own what we pay for and what we put in; TrueLink's ownership of the Interface and its existing Credit Data licence in Section 8(d) are unaffected.","ops":[{"kind":"insert_after","paragraphId":"p0029","numbering":"e","text":"e. Client Ownership. As between the parties, Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data provided by or on behalf of Client or its customers, brokers or borrowers, and nothing in this Agreement operates as an assignment or transfer of any such rights to TrueLink, other than the limited license expressly granted in Section 8(d). All results of the Support Services and any other materials prepared by TrueLink specifically for Client under this Agreement shall be the sole property of Client, and TrueLink hereby assigns to Client all right, title and interest therein. To the extent any TrueLink Intellectual Property is embedded in such results or materials, TrueLink grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the same as part of such results or materials in the conduct of Client's business. No jointly owned intellectual property is created under this Agreement."}]}
```

- [seq 503](trajectory.jsonl#L503) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0029","segments":[{"type":"equal","text":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface."}]}]}
```

- [seq 520](trajectory.jsonl#L520) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0029","p0054","p0065","p0078"],"quote":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.","rationale":"The only ownership provision (§2(d)) runs one way: TrueLink retains all ownership in the Interface, which is acceptable, but nothing vests Client with ownership of the work product it pays for under the §4 Support Services, and there is no assignment or licence-back of any TrueLink IP embedded in such results. Client-side protection is limited to confidentiality treatment (§10(b)/(c) deem Client's Intellectual Property and \"all results of the Hosting and Support Services\" Client Proprietary Information) and a narrow post-termination statement that Client \"shall retain full ownership of all domains associated with Client and Client Content\" — neither is an ownership/assignment provision for deliverables or for borrower and loan data. Meanwhile §8(d) grants TrueLink a worldwide right to \"use, distribute, disseminate, license, resell, exploit\" Credit Data with no reciprocal reservation of Client's ownership; that licence is bounded by the Credit Data definition and the Non-Competition Agreement, so we leave the bargain intact but state expressly that no other rights in Client data are transferred. As drafted the clause fails even the fallback (no perpetual, irrevocable, royalty-free right to use deliverables), so we have inserted a Client-ownership paragraph with a licence-back and a no-joint-ownership sentence.</parationale>\n<parameter name=\"confidence\">0.72","proposal":{"level":"preferred","summary":"Add a Client-ownership provision: Client retains its Content, IP and borrower data; TrueLink assigns work product from the Support Services with a licence back to any embedded TrueLink IP; no joint ownership.","comment":"[Playbook] Section 2(d) only confirms TrueLink's ownership of the Interface, and nothing else in the Agreement vests Client with ownership of the work product it pays for under the Support Services or reserves Client's rights in its Content, IP and borrower/loan data. We have added a reciprocal ownership provision (with a licence back for any TrueLink IP embedded in deliverables) so that we own what we pay for and what we put in; TrueLink's ownership of the Interface and its existing Credit Data licence in Section 8(d) are unaffected.","ops":[{"kind":"insert_after","paragraphId":"p0029","numbering":"e","text":"e. Client Ownership. As between the parties, Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data provided by or on behalf of Client or its customers, brokers or borrowers, and nothing in this Agreement operates as an assignment or transfer of any such rights to TrueLink, other than the limited license expressly granted in Section 8(d). All results of the Support Services and any other materials prepared by TrueLink specifically for Client under this Agreement shall be the sole property of Client, and TrueLink hereby assigns to Client all right, title and interest therein. To the extent any TrueLink Intellectual Property is embedded in such results or materials, TrueLink grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the same as part of such results or materials in the conduct of Client's business. No jointly owned intellectual property is created under this Agreement."}]}}
```

- [seq 521](trajectory.jsonl#L521) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 541](trajectory.jsonl#L541) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0029","p0054","p0065","p0078"],"quote":"d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.","rationale":"The only ownership provision (§2(d)) runs one way: TrueLink retains all ownership in the Interface, which is acceptable, but nothing vests Client with ownership of the work product it pays for under the §4 Support Services, and there is no assignment or licence-back of any TrueLink IP embedded in such results. Client-side protection is limited to confidentiality treatment (§10(b)/(c) deem Client's Intellectual Property and \"all results of the Hosting and Support Services\" Client Proprietary Information) and a narrow post-termination statement that Client \"shall retain full ownership of all domains associated with Client and Client Content\" — neither is an ownership/assignment provision for deliverables or for borrower and loan data. Meanwhile §8(d) grants TrueLink a worldwide right to use, distribute, license, resell and exploit Credit Data with no reciprocal reservation of Client's ownership; that licence is bounded by the narrow Credit Data definition and the Non-Competition Agreement, so we leave that bargain intact but state expressly that no other rights in Client data are transferred. As drafted the regime fails even the fallback (no perpetual, irrevocable, royalty-free right to use deliverables), so we insert a Client-ownership paragraph with a licence-back and a no-joint-ownership sentence.","confidence":0.72,"proposal":{"level":"preferred","summary":"Add a Client-ownership provision: Client retains its Content, IP and borrower data; TrueLink assigns work product from the Support Services with a licence back to any embedded TrueLink IP; no joint ownership.","comment":"[Playbook] Section 2(d) only confirms TrueLink's ownership of the Interface, and nothing else in the Agreement vests Client with ownership of the work product it pays for under the Support Services or reserves Client's rights in its Content, IP and borrower/loan data. We have added a reciprocal ownership provision (with a licence back for any TrueLink IP embedded in deliverables) so that we own what we pay for and what we put in; TrueLink's ownership of the Interface and its existing Credit Data licence in Section 8(d) are unaffected.","ops":[{"kind":"insert_after","paragraphId":"p0029","numbering":"e","text":"e. Client Ownership. As between the parties, Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data provided by or on behalf of Client or its customers, brokers or borrowers, and nothing in this Agreement operates as an assignment or transfer of any such rights to TrueLink, other than the limited license expressly granted in Section 8(d). All results of the Support Services and any other materials prepared by TrueLink specifically for Client under this Agreement shall be the sole property of Client, and TrueLink hereby assigns to Client all right, title and interest therein. To the extent any TrueLink Intellectual Property is embedded in such results or materials, TrueLink grants Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the same as part of such results or materials in the conduct of Client's business. No jointly owned intellectual property is created under this Agreement."}]}}
```

- [seq 542](trajectory.jsonl#L542) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 541](trajectory.jsonl#L541)
- Finding: `f-ip-63500346` · **deviation** · confidence 0.72
- Location: § 2 LICENSE.
- Quote: “d. Ownership. Notwithstanding the license granted under section 2.1, TrueLink retains all of its ownership and license rights in the Interface.”
- Rationale: The only ownership provision (§2(d)) runs one way: TrueLink retains all ownership in the Interface, which is acceptable, but nothing vests Client with ownership of the work product it pays for under the §4 Support Services, and there is no assignment or licence-back of any TrueLink IP embedded in such results. Client-side protection is limited to confidentiality treatment (§10(b)/(c) deem Client's Intellectual Property and "all results of the Hosting and Support Services" Client Proprietary Information) and a narrow post-termination statement that Client "shall retain full ownership of all domains associated with Client and Client Content" — neither is an ownership/assignment provision for deliverables or for borrower and loan data. Meanwhile §8(d) grants TrueLink a worldwide right to use, distribute, license, resell and exploit Credit Data with no reciprocal reservation of Client's ownership; that licence is bounded by the narrow Credit Data definition and the Non-Competition Agreement, so we leave that bargain intact but state expressly that no other rights in Client data are transferred. As drafted the regime fails even the fallback (no perpetual, irrevocable, royalty-free right to use deliverables), so we insert a Client-ownership paragraph with a licence-back and a no-joint-ownership sentence.
- Proposal: **preferred** — Insert a Client-ownership paragraph: Client owns and TrueLink assigns the results/materials prepared for Client, Client retains its Content, IP and borrower data, a perpetual, irrevocable, royalty-free licence covers embedded TrueLink IP, and no joint ownership arises.
- Comment: [Playbook] Section 2(d) confirms only TrueLink's ownership of the Interface, so we add a reciprocal paragraph vesting Client with the results and materials TrueLink prepares for it, reserving Client's Content, IP and borrower/loan data, and licensing back any embedded TrueLink IP on a perpetual, irrevocable, royalty-free basis. The embedded-IP licence is now limited to those three attributes, and TrueLink's Interface rights and its Section 8(d) Credit Data licence are unaffected.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "e",
    "paragraphId": "p0029",
    "text": "e. Client Ownership. As between the parties, Client retains all right, title and interest in and to the Client Content, Client's Intellectual Property and all data provided by or on behalf of Client or its customers, brokers or borrowers, and nothing in this Agreement operates as an assignment or transfer of any such rights to TrueLink, other than the limited license expressly granted in Section 8(d). All results of the Support Services and any other materials prepared by TrueLink specifically for Client under this Agreement shall be the sole property of Client, and TrueLink hereby assigns to Client all right, title and interest therein. To the extent any TrueLink Intellectual Property is embedded in such results or materials, TrueLink grants Client a perpetual, irrevocable, royalty-free license to such TrueLink Intellectual Property as part of such results or materials. No jointly owned intellectual property is created under this Agreement."
  }
]
```

### Verifier and repair feedback

- [seq 609](trajectory.jsonl#L609) **Verdict: fail** — precision position: preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights: Remove worldwide, modification, and sublicensing rights from a preferred proposal; they belong only to fallback. All preferred atomic elements are satisfied: express Client ownership of results/materials with an assignment, retained Client rights in Client Content, IP and borrower/loan data, an embedded-TrueLink-IP licence that is perpetual, irrevocable and royalty-free, no-joint-ownership language, and Section 2(d)'s reservation of TrueLink's Interface rights left untouched. Minimality fails: the embedded-IP licence imports fallback-only rights ('worldwide' scope plus 'use, modify and sublicense'), which exceed the perpetual, irrevocable, royalty-free licence the locked preferred level requires and mix levels. Fallback is not independently satisfied (no generic tools/know-how ownership statement and no standalone deliverables licence), but that is immaterial because the drafter's locked target is preferred. Intent is preserved: the Credit Data licence in Section 8(d) is expressly carved out, the confidentiality carve-outs and Section 13 term/renewal mechanics are unchanged, and no undefined term or dangling mechanic is introduced (the insertion is numbered 'e' after the existing Ownership paragraph). Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"precision position: preferred embedded-IP licence covers any Vendor IP embedded in deliverables","ok":true}; {"name":"precision position: preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights","ok":false,"detail":"Remove worldwide, modification, and sublicensing rights from a preferred proposal; they belong only to fallback."}; {"name":"official minimality gate","ok":true}.
- [seq 610](trajectory.jsonl#L610) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- precision position: preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights: Remove worldwide, modification, and sublicensing rights from a preferred proposal; they belong only to fallback.\n\nOffending extra words to remove verbatim:\n- worldwide\n- use, modify and sublicense\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All preferred atomic elements are satisfied: express Client ownership of results/materials with an assignment, retained Client rights in Client Content, IP and borrower/loan data, an embedded-TrueLink-IP licence that is perpetual, irrevocable and royalty-free, no-joint-ownership language, and Section 2(d)'s reservation of TrueLink's Interface rights left untouched.\n- Minimality fails: the embedded-IP licence imports fallback-only rights ('worldwide' scope plus 'use, modify and sublicense'), which exceed the perpetual, irrevocable, royalty-free licence the locked preferred level requires and mix levels.\n- Fallback is not independently satisfied (no generic tools/know-how ownership statement and no standalone deliverables licence), but that is immaterial because the drafter's locked target is preferred.\n- Intent is preserved: the Credit Data licence in Section 8(d) is expressly carved out, the confidentiality carve-outs and Section 13 term/renewal mechanics are unchanged, and no undefined term or dangling mechanic is introduced (the insertion is numbered 'e' after the existing Ownership paragraph)."
- [seq 649](trajectory.jsonl#L649) **Verdict: repaired** — The inserted paragraph completes every atomic element of the preferred position: Customer ownership of results/materials with an express present assignment, retention of Client Content, IP and borrower/loan data, an embedded-Vendor-IP licence on the three required attributes, and an express no-joint-ownership statement. Fallback is not satisfied (no generic tools/know-how ownership, no worldwide/modify/sublicense deliverables licence), which is correct and expected since the locked target is preferred and the levels must not be mixed. Minimality holds: the document had no Customer-side ownership provision, so a concise inserted paragraph is the least intrusive fix; it adds no fallback-only worldwide, modification or sublicensing rights and no broad new exceptions. Intent is preserved: TrueLink's Interface rights under Section 2(d) and its Section 8(d) Credit Data licence are expressly carved out and remain effective, and no undefined term or dangling mechanic is introduced (Client Content, Client's Intellectual Property and Support Services are existing terms). Note only for the rationale, not a deviation: the new paragraph is numbered "e" while a later existing paragraph remains labelled "d", a pre-existing numbering artefact in the source text. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"precision position: preferred embedded-IP licence covers any Vendor IP embedded in deliverables","ok":true}; {"name":"precision position: preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 278](trajectory.jsonl#L278)

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

- [seq 306](trajectory.jsonl#L306) **drafter → list_sections**

```json
{}
```

- [seq 307](trajectory.jsonl#L307) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 308](trajectory.jsonl#L308) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 309](trajectory.jsonl#L309) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 337](trajectory.jsonl#L337) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 338](trajectory.jsonl#L338) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0009","text":"1. DEFINITIONS."},{"id":"p0010","text":"a. Browser. The term \"Browser\" refers to a program used to provide interactive, graphical access to sites on the World Wide Web."},{"id":"p0011","text":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics, video, a…
```

- [seq 339](trajectory.jsonl#L339) **drafter → search**

```json
{"query":"assign"}
```

- [seq 340](trajectory.jsonl#L340) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under…"},{"paragraphId":"p0080","sectionRef":"§ 12 INDEMNITY.","snippet":"15. ASSIGNMENT OR TRANSFER. Neither party shall assign or transfer any of its rights under this Agreement without the prior written ap…"},{"paragraphId":"p0080","sectionRef":…
```

- [seq 341](trajectory.jsonl#L341) **drafter → search**

```json
{"query":"Affiliate"}
```

- [seq 342](trajectory.jsonl#L342) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"…any borrower or loan applicant of Client or BNC Mortgage, Inc., or any of their affiliates, or any of their customers or brokers, provided that such data (i) consists on…"},{"paragraphId":"p0071","sectionRef":"§ 12 INDEMNITY.","snippet":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, …
```

- [seq 372](trajectory.jsonl#L372) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0076","p0077","p0078","p0079","p0080","p0081","p0082"]}
```

- [seq 373](trajectory.jsonl#L373) **read_paragraphs result**

```json
[{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE AND IMPLIED WARRANTIES OF MERCHANTABILITY OR FOR ANY MATTER RELATING TO THE ACCURACY OR COMPLETENESS, OR TIMING OF TRANSMISSION OF ANY DATA SUBMITTED THROUGH THE INTERFACE OR TO OR FROM THE WEB SIT…
```

- [seq 374](trajectory.jsonl#L374) **drafter → search**

```json
{"query":"terminate","limit":20}
```

- [seq 375](trajectory.jsonl#L375) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whic……
```

- [seq 406](trajectory.jsonl#L406) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Hosting/interface licence grant; add affiliates and contractors; successor transfer"}
```

- [seq 407](trajectory.jsonl#L407) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 436](trajectory.jsonl#L436) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend licence to Client affiliates and contractors and permit transfer to a successor.","comment":"[Playbook] We have extended the licence to cover our affiliates and contractors acting on our behalf, since our origination operations are run partly through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause. If preferred, we can accept affiliate coverage on written notice to TrueLink instead.","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in interest in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}
```

- [seq 437](trajectory.jsonl#L437) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0022","segments":[{"type":"equal","text":"a. Grant. TrueLink hereby grants to Client"},{"type":"delete","text":" "},{"type":"insert","text":", its affiliates and its contractors acting on Client's behalf, "},{"type":"equal","text":"a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwritin…
```

- [seq 468](trajectory.jsonl#L468) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0022","p0025","p0080"],"quote":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.","rationale":"The grant in § 2(a) runs to Client alone; neither Client affiliates nor contractors acting on Client's behalf are licensed, and the scope provisions in § 2(b) only permit added sites (Exhibit A) on notice, not added entities, so there is no path to extend use to affiliates or outsourced processors. The transfer position also falls short: § 15 requires the other party's consent for any assignment, with a carve-out only for a financially responsible affiliate and none for a successor in an M&A transaction. The clause therefore fails both limbs of the fallback (affiliates covered on written notice; transferable to a successor). The licence is not expressed as revocable at Vendor's discretion and ends only on termination of the Agreement, so it is not walk-away territory. Minimal redline adds affiliate/contractor coverage to the grant and a successor-transfer carve-out (mutual) to § 15.","confidence":0.82,"proposal":{"level":"preferred","summary":"Extend licence to Client affiliates and contractors and permit transfer to a successor.","comment":"[Playbook] We have extended the licence to cover our affiliates and contractors acting on our behalf, since our origination operations are run partly through affiliated entities and outsourced processors, and added a successor-transfer carve-out to the assignment clause. If preferred, we can accept affiliate coverage on written notice to TrueLink instead.","ops":[{"kind":"replace","paragraphId":"p0022","oldText":"TrueLink hereby grants to Client a non-exclusive license to use the Interface","newText":"TrueLink hereby grants to Client, its affiliates and its contractors acting on Client's behalf, a non-exclusive license to use the Interface"},{"kind":"replace","paragraphId":"p0080","oldText":"except no such approval shall be required for an assignment to a financially responsible affiliate.","newText":"except no such approval shall be required for an assignment to a financially responsible affiliate or to a successor in interest in connection with a merger, acquisition, reorganization or sale of all or substantially all of the assigning party's assets."}]}}
```

- [seq 469](trajectory.jsonl#L469) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 468](trajectory.jsonl#L468)
- Finding: `f-license-3bb56241` · **deviation** · confidence 0.82
- Location: § 2 LICENSE.
- Quote: “a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement.”
- Rationale: The grant in § 2(a) runs to Client alone; neither Client affiliates nor contractors acting on Client's behalf are licensed, and the scope provisions in § 2(b) only permit added sites (Exhibit A) on notice, not added entities, so there is no path to extend use to affiliates or outsourced processors. The transfer position also falls short: § 15 requires the other party's consent for any assignment, with a carve-out only for a financially responsible affiliate and none for a successor in an M&A transaction. The clause therefore fails both limbs of the fallback (affiliates covered on written notice; transferable to a successor). The licence is not expressed as revocable at Vendor's discretion and ends only on termination of the Agreement, so it is not walk-away territory. Minimal redline adds affiliate/contractor coverage to the grant and a successor-transfer carve-out (mutual) to § 15.
- Proposal: **fallback** — Cover Client affiliates on written notice and allow Client transfer to an M&A successor.
- Comment: [Playbook] We have extended the licence to our affiliates on written notice to TrueLink and added a consent-free carve-out for our assignment to a successor in a merger or acquisition, which is our fallback licence-scope position. Both edits are drafted as short insertions into the existing sentences and leave the rest of Sections 2(a) and 15 unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "TrueLink hereby grants to Client and, on written notice to TrueLink, its affiliates a non-exclusive license to use the Interface in the ordinary course of its business",
    "oldText": "TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business",
    "paragraphId": "p0022"
  },
  {
    "kind": "replace",
    "newText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate or for Client's assignment to a successor in a merger or acquisition.",
    "oldText": "Neither party shall assign or transfer any of its rights under this Agreement without the prior written approval of the other party, except no such approval shall be required for an assignment to a financially responsible affiliate.",
    "paragraphId": "p0080"
  }
]
```

### Verifier and repair feedback

- [seq 516](trajectory.jsonl#L516) **Verdict: fail** — official minimality gate: Operation 1 expands 12 words to 21 words (ratio 1.75 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 2 expands 15 words to 40 words (ratio 2.67 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 2 changed-character ratio 0.610 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Locked target was preferred, but the redline delivers only affiliate/contractor scope and successor transfer; the perpetual and irrevocable character of paid-up licences and the 'terminable only for uncured material breach' limit on subscription licences are entirely absent from the operative text. Fallback is satisfied on its material terms: affiliates are covered (unconditionally, which is broader than 'on written notice') and assignment to an M&A successor is permitted without consent. Minimality fails: operation 2 rewrites the whole carve-out and adds 'reorganization or sale of all or substantially all of the assigning party's assets', going beyond the M&A successor concept when a short phrase such as 'or to a successor in a merger or acquisition' would suffice; the official minimality gates also failed on expansion and changed-character ratio. Intent is preserved: the non-obligation/competitive-freedom sentence, business-purpose scope and mutual consent requirement in section 15 remain effective, and no undefined term or dangling mechanic is introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: affiliates covered by the licence","ok":true}; {"name":"official check: no at-will revocation remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 12 words to 21 words (ratio 1.75 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 2 expands 15 words to 40 words (ratio 2.67 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 2 changed-character ratio 0.610 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 517](trajectory.jsonl#L517) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Paid-up licences are perpetual\n Verdict: not_met. Evidence: Grant remains a bare 'non-exclusive license to use the Interface'; no perpetuity language added\n- Paid-up licences are irrevocable\n Verdict: not_met. Evidence: No 'irrevocable' wording appears anywhere in the redline\n- Subscription licences terminable only for uncured material breach\n Verdict: not_met. Evidence: No termination limitation inserted in section 2(a) or elsewhere\n\nDeterministic official failures:\n- official minimality gate: Operation 1 expands 12 words to 21 words (ratio 1.75 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 2 expands 15 words to 40 words (ratio 2.67 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 2 changed-character ratio 0.610 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- reorganization or sale of all or substantially all of the assigning party's assets\n- a successor in interest in connection with\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Locked target was preferred, but the redline delivers only affiliate/contractor scope and successor transfer; the perpetual and irrevocable character of paid-up licences and the 'terminable only for uncured material breach' limit on subscription licences are entirely absent from the operative text.\n- Fallback is satisfied on its material terms: affiliates are covered (unconditionally, which is broader than 'on written notice') and assignment to an M&A successor is permitted without consent.\n- Minimality fails: operation 2 rewrites the whole carve-out and adds 'reorganization or sale of all or substantially all of the assigning party's assets', going beyond the M&A successor concept when a short phrase such as 'or to a successor in a merger or acquisition' would suffice; the official minimality gates also failed on expansion and changed-character ratio.\n- Intent is preserved: the non-obligation/competitive-freedom sentence, business-purpose scope and mutual consent requirement in section 15 remain effective, and no undefined term or dangling mechanic is introduced."
- [seq 567](trajectory.jsonl#L567) **Verdict: repaired** — Both fallback atomic elements are satisfied: affiliate coverage conditioned on written notice inside the Section 2(a) grant, and a consent-free carve-out in Section 15 for Client's assignment to an M&A successor. Preferred level remains incomplete (no contractors, no perpetual/irrevocable paid-up licence, no uncured-material-breach-only termination), consistent with the locked fallback target. Edits are two short in-sentence insertions; no preferred-only scope or duration language was imported, no new exception or undefined term introduced, and the remainder of Sections 2 and 15 (including the mutual assignment restriction and affiliate carve-out) stays effective. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: affiliates covered by the licence","ok":true}; {"name":"official check: no at-will revocation remains","ok":true}; {"name":"precision position: fallback licence covers affiliates on written notice","ok":true}; {"name":"precision position: fallback licence transfers to an M&A successor","ok":true}; {"name":"precision position: fallback licence adds no preferred-only scope or duration","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 304](trajectory.jsonl#L304)

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

- [seq 331](trajectory.jsonl#L331) **drafter → list_sections**

```json
{}
```

- [seq 332](trajectory.jsonl#L332) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 333](trajectory.jsonl#L333) **drafter → search**

```json
{"query":"audit"}
```

- [seq 334](trajectory.jsonl#L334) **search result**

```json
[]
```

- [seq 364](trajectory.jsonl#L364) **drafter → search**

```json
{"query":"inspect"}
```

- [seq 365](trajectory.jsonl#L365) **search result**

```json
[]
```

- [seq 366](trajectory.jsonl#L366) **drafter → search**

```json
{"query":"records"}
```

- [seq 367](trajectory.jsonl#L367) **search result**

```json
[]
```

- [seq 368](trajectory.jsonl#L368) **drafter → search**

```json
{"query":"verif"}
```

- [seq 369](trajectory.jsonl#L369) **search result**

```json
[]
```

- [seq 394](trajectory.jsonl#L394) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 395](trajectory.jsonl#L395) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 396](trajectory.jsonl#L396) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 397](trajectory.jsonl#L397) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 422](trajectory.jsonl#L422) **drafter → search**

```json
{"query":"monitor"}
```

- [seq 423](trajectory.jsonl#L423) **search result**

```json
[]
```

- [seq 424](trajectory.jsonl#L424) **drafter → search**

```json
{"query":"books"}
```

- [seq 425](trajectory.jsonl#L425) **search result**

```json
[]
```

- [seq 426](trajectory.jsonl#L426) **drafter → search**

```json
{"query":"compliance with the terms"}
```

- [seq 427](trajectory.jsonl#L427) **search result**

```json
[]
```

- [seq 456](trajectory.jsonl#L456) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 457](trajectory.jsonl#L457) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 458](trajectory.jsonl#L458) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 459](trajectory.jsonl#L459) **read_section result**

```json
{"sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","paragraphs":[{"id":"p0048","text":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"id":"p0049","text":"Client shall not engage in the practice commonly known as \"spamming\" pursuant to the rights granted hereunder. This includes but is not limited to, the following: posting an article or advertisement to more than ten (10) news groups, forums, e-mail mai…
```

- [seq 484](trajectory.jsonl#L484) **drafter → search**

```json
{"query":"access","limit":30}
```

- [seq 485](trajectory.jsonl#L485) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","snippet":"…licensing interface software (the \"Interface\") to third parties; (ii) providing access to credit bureau information to third parties through the Interface; and (iii) …"},{"paragraphId":"p0005","sectionRef":"§ LICENSING AND WEB SITE HOSTING AGREEMENT","snippet":"WHEREAS, TrueLink is licensed (or will be…
```

- [seq 486](trajectory.jsonl#L486) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 487](trajectory.jsonl#L487) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 508](trajectory.jsonl#L508) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047","p0058"],"quote":"6. DOCUMENTATION AND DISPUTES. Client will be provided upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge","rationale":"The Agreement contains no audit, inspection, records-examination or usage-verification right running against the Client. Searches for \"audit\", \"inspect\", \"records\", \"verif\", \"books\" and \"monitor\" return nothing, and the sections where such a right would sit are clean: § 5–6 (Compensation/Documentation and Disputes) gives the verification right to us (TrueLink must support its charges on request and we may contest them), and § 8 (Covenants and Warranties of Client) imposes only compliance, access-restriction and content warranties with no examination right. The only TrueLink self-help right, § 8(f), is limited to implementing technical mechanisms on its own systems to prevent spamming, not access to or inspection of Client systems or records. No obligation on us to submit to audits therefore exists, and nothing sits in walk-away territory (no unlimited, unannounced or remote-access audit). Since the absence of any audit right is more favourable to us than the preferred position, there is nothing to limit and we should not introduce an audit right by redlining. Noted for the record: because there is no audit clause, the usual protective parameters (12-month frequency, 30 days' notice, independent auditor under confidentiality, Vendor-borne cost, no system access) are simply not needed; if TrueLink later proposes fee or usage verification, we would insert those limits then.","confidence":0.83}
```

- [seq 509](trajectory.jsonl#L509) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 508](trajectory.jsonl#L508)
- Finding: `f-audit-5fd2088e` · **compliant** · confidence 0.83
- Location: § 5 COMPENSATION.
- Quote: “6. DOCUMENTATION AND DISPUTES. Client will be provided upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge”
- Rationale: The Agreement contains no audit, inspection, records-examination or usage-verification right running against the Client. Searches for "audit", "inspect", "records", "verif", "books" and "monitor" return nothing, and the sections where such a right would sit are clean: § 5–6 (Compensation/Documentation and Disputes) gives the verification right to us (TrueLink must support its charges on request and we may contest them), and § 8 (Covenants and Warranties of Client) imposes only compliance, access-restriction and content warranties with no examination right. The only TrueLink self-help right, § 8(f), is limited to implementing technical mechanisms on its own systems to prevent spamming, not access to or inspection of Client systems or records. No obligation on us to submit to audits therefore exists, and nothing sits in walk-away territory (no unlimited, unannounced or remote-access audit). Since the absence of any audit right is more favourable to us than the preferred position, there is nothing to limit and we should not introduce an audit right by redlining. Noted for the record: because there is no audit clause, the usual protective parameters (12-month frequency, 30 days' notice, independent auditor under confidentiality, Vendor-borne cost, no system access) are simply not needed; if TrueLink later proposes fee or usage verification, we would insert those limits then.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 313](trajectory.jsonl#L313)

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

- [seq 349](trajectory.jsonl#L349) **drafter → list_sections**

```json
{}
```

- [seq 350](trajectory.jsonl#L350) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 351](trajectory.jsonl#L351) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 352](trajectory.jsonl#L352) **search result**

```json
[]
```

- [seq 378](trajectory.jsonl#L378) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 379](trajectory.jsonl#L379) **read_section result**

```json
{"sectionRef":"§ 7 UNSOLICITED COMMERCIAL E-MAIL.","paragraphs":[{"id":"p0048","text":"7. UNSOLICITED COMMERCIAL E-MAIL."},{"id":"p0049","text":"Client shall not engage in the practice commonly known as \"spamming\" pursuant to the rights granted hereunder. This includes but is not limited to, the following: posting an article or advertisement to more than ten (10) news groups, forums, e-mail mai…
```

- [seq 380](trajectory.jsonl#L380) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 381](trajectory.jsonl#L381) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 410](trajectory.jsonl#L410) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 411](trajectory.jsonl#L411) **search result**

```json
[]
```

- [seq 412](trajectory.jsonl#L412) **drafter → search**

```json
{"query":"terminat"}
```

- [seq 413](trajectory.jsonl#L413) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whi…"…
```

- [seq 440](trajectory.jsonl#L440) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0078","p0079","p0080","p0081"]}
```

- [seq 441](trajectory.jsonl#L441) **read_paragraphs result**

```json
[{"id":"p0078","sectionRef":"§ 12 INDEMNITY.","text":"13. TERM OF AGREEMENT. This Agreement will take effect on the Effective Date and remain in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers which constitutes a breach of or default by TrueLink under any System Agreement or Credit Repo…
```

- [seq 442](trajectory.jsonl#L442) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 443](trajectory.jsonl#L443) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…d upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (o…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…listed in Section 4) and will be entitled to contest any charge (other than the minimum mon…
```

- [seq 472](trajectory.jsonl#L472) **drafter → search**

```json
{"query":"damages"}
```

- [seq 473](trajectory.jsonl#L473) **search result**

```json
[]
```

- [seq 474](trajectory.jsonl#L474) **drafter → search**

```json
{"query":"per incident"}
```

- [seq 475](trajectory.jsonl#L475) **search result**

```json
[]
```

- [seq 496](trajectory.jsonl#L496) **drafter → search**

```json
{"query":"shall pay"}
```

- [seq 497](trajectory.jsonl#L497) **search result**

```json
[]
```

- [seq 498](trajectory.jsonl#L498) **drafter → search**

```json
{"query":"fee","limit":30}
```

- [seq 499](trajectory.jsonl#L499) **search result**

```json
[{"paragraphId":"p0045","sectionRef":"§ 5 COMPENSATION.","snippet":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule o…"},{"paragraphId":"p0045","sectionRef":"§ 5 COMPENSATION.","snippet":"… For any other services agreed to between the parties, Client will pay TrueLink fees which will be determined by the parties and will vary dependi…
```

- [seq 524](trajectory.jsonl#L524) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 525](trajectory.jsonl#L525) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 551](trajectory.jsonl#L551) **drafter → search**

```json
{"query":"late"}
```

- [seq 552](trajectory.jsonl#L552) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"…t is submitted, transmitted or in any way sent through the Interface and is the later of (I) the later of 31 days old from that date of receipt thereof by TrueLink …"},{"paragraphId":"p0015","sectionRef":"§ 1 DEFINITIONS.","snippet":"…ransmitted or in any way sent through the Interface and is the later of (I) the later of 31 days…
```

- [seq 553](trajectory.jsonl#L553) **drafter → search**

```json
{"query":"interest"}
```

- [seq 554](trajectory.jsonl#L554) **search result**

```json
[]
```

- [seq 571](trajectory.jsonl#L571) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0045","p0047","p0079"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"The Agreement contains no liquidated damages, penalty, or stipulated-sum provision payable by Client. Searches for \"liquidated damages\", \"penalty\", \"damages\", \"shall pay\", \"minimum\", \"late\" and \"interest\" return nothing of that character. Compensation (§5) is limited to fees for services actually requested plus stated monthly minimums during the term, with a documentation/dispute right in Client's favour, and §6 caps Hosting Services price increases for the first year and benchmarks rates to TrueLink's best customer pricing. The termination provision (§14) imposes no exit fee: Client simply gives written notice and services (and therefore fees) run to the last day of the following month — an ordinary wind-down of roughly one month's fees, comfortably inside the fallback's 3-month cap even if characterised as an exit cost. The spam covenant in §7 and §8f is a conduct restriction enforced through TrueLink's technical and equitable remedies, not a per-incident stipulated penalty. This meets the preferred position (no liquidated damages or penalties payable by Customer), so no redline is warranted.","confidence":0.86}
```

- [seq 572](trajectory.jsonl#L572) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 571](trajectory.jsonl#L571)
- Finding: `f-ld-a6e8577d` · **compliant** · confidence 0.86
- Location: § 5 COMPENSATION.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: The Agreement contains no liquidated damages, penalty, or stipulated-sum provision payable by Client. Searches for "liquidated damages", "penalty", "damages", "shall pay", "minimum", "late" and "interest" return nothing of that character. Compensation (§5) is limited to fees for services actually requested plus stated monthly minimums during the term, with a documentation/dispute right in Client's favour, and §6 caps Hosting Services price increases for the first year and benchmarks rates to TrueLink's best customer pricing. The termination provision (§14) imposes no exit fee: Client simply gives written notice and services (and therefore fees) run to the last day of the following month — an ordinary wind-down of roughly one month's fees, comfortably inside the fallback's 3-month cap even if characterised as an exit cost. The spam covenant in §7 and §8f is a conduct restriction enforced through TrueLink's technical and equitable remedies, not a per-incident stipulated penalty. This meets the preferred position (no liquidated damages or penalties payable by Customer), so no redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 362](trajectory.jsonl#L362)

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

- [seq 400](trajectory.jsonl#L400) **drafter → list_sections**

```json
{}
```

- [seq 401](trajectory.jsonl#L401) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 402](trajectory.jsonl#L402) **drafter → search**

```json
{"query":"warrant","limit":30}
```

- [seq 403](trajectory.jsonl#L403) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 2 LICENSE.","snippet":"…ested through a System using the Interface. TrueLink makes no representation or warranty, and shall have no liability for the truth or completeness of any data so tran…"},{"paragraphId":"p0050","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"paragraphId":"p0055","sectionRef":…
```

- [seq 430](trajectory.jsonl#L430) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0057","p0058","p0059","p0060","p0075","p0076","p0077"]}
```

- [seq 431](trajectory.jsonl#L431) **read_paragraphs result**

```json
[{"id":"p0057","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","text":"-5- 6"},{"id":"p0058","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","text":"f. Spamming. TrueLink reserves the right at any time to implement technical mechanisms to prevent Client engaging in illegal or obscene activity or in \"spamming,\" TrueLink reserves all legal and equitable rights in enforcing this policy…
```

- [seq 432](trajectory.jsonl#L432) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 433](trajectory.jsonl#L433) **read_section result**

```json
{"sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","paragraphs":[{"id":"p0050","text":"8. COVENANTS AND WARRANTIES OF CLIENT"},{"id":"p0051","text":"a. Compliance with Laws. Client will comply in all material respects with applicable state and federal consumer credit reporting, privacy and similar laws in connection with its use of the Interface."},{"id":"p0052","text":"b. Notification. Clien…
```

- [seq 462](trajectory.jsonl#L462) **drafter → search**

```json
{"query":"workmanlike professional manner conform","limit":20}
```

- [seq 463](trajectory.jsonl#L463) **search result**

```json
[]
```

- [seq 464](trajectory.jsonl#L464) **drafter → search**

```json
{"query":"Hosting Services","limit":25}
```

- [seq 465](trajectory.jsonl#L465) **search result**

```json
[{"paragraphId":"p0030","sectionRef":"§ 2 LICENSE.","snippet":"3. HOSTING SERVICES. TrueLink will provide the following services to Client (the \"Hosting Services\"…"},{"paragraphId":"p0030","sectionRef":"§ 2 LICENSE.","snippet":"… HOSTING SERVICES. TrueLink will provide the following services to Client (the \"Hosting Services\"):"},{"paragraphId":"p0045","sectionRef":"§ 5 COMPENSATION.","snippet…
```

- [seq 490](trajectory.jsonl#L490) **drafter → read_section**

```json
{"sectionId":"sec-2"}
```

- [seq 491](trajectory.jsonl#L491) **read_section result**

```json
{"sectionRef":"§ 2 LICENSE.","paragraphs":[{"id":"p0021","text":"2. LICENSE."},{"id":"p0022","text":"a. Grant. TrueLink hereby grants to Client a non-exclusive license to use the Interface in the ordinary course of its business of the origination, underwriting, processing and funding of consumer finance receivables in accordance with this Agreement. Notwithstanding the foregoing, Client is not ob…
```

- [seq 512](trajectory.jsonl#L512) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"Hosting/licensing agreement; only a Y2K warranty from vendor; need performance and conformance warranty with remedy"}
```

- [seq 513](trajectory.jsonl#L513) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 535](trajectory.jsonl#L535) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add a TrueLink performance/conformance warranty with a repair, replace, re-perform or refund remedy.","comment":"[Playbook] Section 9 gives us only a Y2K warranty, so TrueLink stands behind neither the Interface nor the Hosting and Support Services. We have added our standard performance warranty (professional and workmanlike services, conformance to documentation, no malicious code, compliance with laws) with a repair/re-performance/refund remedy; we can accept ninety (90) days for the Interface and thirty (30) days for the Services if the longer periods are an issue.","ops":[{"kind":"insert_after","paragraphId":"p0060","text":"TrueLink further represents and warrants that: (a) the Hosting Services and Support Services will be performed in a professional and workmanlike manner consistent with industry standards; (b) for a period of twelve (12) months following delivery, the Interface and all related software will conform in all material respects to its documentation and specifications; (c) the Interface and all related software will be free of viruses, worms, Trojan horses and other malicious code; and (d) TrueLink will comply in all material respects with all laws applicable to its performance under this Agreement. Client's sole remedy for breach of the foregoing warranties is, at TrueLink's option, re-performance, repair or replacement, or a refund of the fees paid for the non-conforming Interface, software or services."}]}
```

- [seq 536](trajectory.jsonl#L536) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0060","segments":[{"type":"equal","text":"(ii) will operate before, on and after January 1, 2000, in the processing of dates, including without limitation calculating, comparing, indexing and sequencing; and (iii) will successfully transition from December 31, 1999, to January 1, 2000, without human intervention. At Client's request, TrueLink wi…
```

- [seq 563](trajectory.jsonl#L563) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0059","p0060","p0076"],"quote":"9. TRUELINK WARRANTIES. TrueLink represents and warrants that the Interface and all related software (i) is designed to be used before, on and after January l, 2000;","rationale":"The only vendor warranty in the Agreement (Section 9) is a Y2K date-handling warranty. There is no warranty that the Hosting Services or Support Services will be performed in a professional and workmanlike manner, no conformance-to-documentation warranty for the Interface, no malicious-code or compliance-with-laws warranty, and no repair/re-performance/refund remedy. The hosting obligations in Section 3 are only \"reasonable commercial efforts\" commitments, not warranties with a remedy. This falls short of even the fallback (90 days software / 30 days services with remedies), so per the detection guidance the absent express warranty is a deviation and we insert the standard warranty and remedy after p0060. The general disclaimer in p0076 is acceptable as drafted because it is qualified by \"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT,\" so it does not swallow the inserted express warranty and needs no edit.","confidence":0.82,"proposal":{"level":"preferred","summary":"Add a TrueLink performance/conformance warranty with a repair, replace, re-perform or refund remedy.","comment":"[Playbook] Section 9 gives us only a Y2K warranty, so TrueLink stands behind neither the Interface nor the Hosting and Support Services. We have added our standard performance warranty (professional and workmanlike services, conformance to documentation, no malicious code, compliance with laws) with a repair/re-performance/refund remedy; we can accept ninety (90) days for the Interface and thirty (30) days for the Services if the longer periods are an issue.","ops":[{"kind":"insert_after","paragraphId":"p0060","text":"TrueLink further represents and warrants that: (a) the Hosting Services and Support Services will be performed in a professional and workmanlike manner consistent with industry standards; (b) for a period of twelve (12) months following delivery, the Interface and all related software will conform in all material respects to its documentation and specifications; (c) the Interface and all related software will be free of viruses, worms, Trojan horses and other malicious code; and (d) TrueLink will comply in all material respects with all laws applicable to its performance under this Agreement. Client's sole remedy for breach of the foregoing warranties is, at TrueLink's option, re-performance, repair or replacement, or a refund of the fees paid for the non-conforming Interface, software or services."}]}}
```

- [seq 564](trajectory.jsonl#L564) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 563](trajectory.jsonl#L563)
- Finding: `f-warranty-addbb3a2` · **deviation** · confidence 0.82
- Location: § 8 COVENANTS AND WARRANTIES OF CLIENT
- Quote: “9. TRUELINK WARRANTIES. TrueLink represents and warrants that the Interface and all related software (i) is designed to be used before, on and after January l, 2000;”
- Rationale: The only vendor warranty in the Agreement (Section 9) is a Y2K date-handling warranty. There is no warranty that the Hosting Services or Support Services will be performed in a professional and workmanlike manner, no conformance-to-documentation warranty for the Interface, no malicious-code or compliance-with-laws warranty, and no repair/re-performance/refund remedy. The hosting obligations in Section 3 are only "reasonable commercial efforts" commitments, not warranties with a remedy. This falls short of even the fallback (90 days software / 30 days services with remedies), so per the detection guidance the absent express warranty is a deviation and we insert the standard warranty and remedy after p0060. The general disclaimer in p0076 is acceptable as drafted because it is qualified by "EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT," so it does not swallow the inserted express warranty and needs no edit.
- Proposal: **preferred** — Insert a TrueLink performance and conformance warranty with repair, replacement and refund remedies.
- Comment: [Playbook] Section 9 gives us only a Y2K warranty, so we have inserted our standard performance warranty: the Services performed in a professional and workmanlike manner, conformance to documentation for 12 months (software and deliverables) and 90 days (Services), no malicious code and compliance with laws, with a repair, replacement or refund remedy. If the periods are an issue we can discuss our fallback of 90 days for software and 30 days for Services with the same remedies.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "paragraphId": "p0060",
    "text": "TrueLink further represents and warrants that: (a) the Services, including the Hosting Services and Support Services, will be performed in a professional and workmanlike manner; (b) for a period of 12 months following delivery, the Interface, all related software and all deliverables will conform to their documentation; (c) for a period of 90 days following performance, the Services will conform to their documentation; (d) the Interface and all related software will be free of malicious code; and (e) TrueLink will comply with all laws applicable to its performance under this Agreement. Client's remedy for breach of the foregoing warranties is repair, replacement, or a refund of the fees paid for the non-conforming Interface, software, deliverable or Services."
  }
]
```

### Verifier and repair feedback

- [seq 613](trajectory.jsonl#L613) **Verdict: fail** — precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification. precision position: warranty adds no re-performance remedy: Remove re-performance; the complete remedy set is repair, replacement, and refund only. Preferred level incomplete: the insertion supplies no services warranty duration at all (no 90 days from performance/completion), so the Services conformance leg and its period are absent. Conformance is diluted to 'in all material respects', whereas the preferred (and fallback) position requires conformance to documentation without a materiality qualifier. Fallback is also not satisfied: it needs 90 days for software and 30 days for services; the draft uses the preferred-only 12-month software figure and states no services period. Non-minimal additions beyond what the level requires: 'consistent with industry standards', 'and specifications', the added 're-performance' remedy, and the vendor-elective 'at TrueLink's option' (the required remedy set is repair, replacement, refund). Fix: add '(b) for a period of ninety (90) days following performance, the Hosting Services and Support Services will conform to their documentation', delete 'in all material respects', 'consistent with industry standards', 're-performance' and 'at TrueLink's option'. Unrelated Y2K warranty, access/repair mechanic and disclaimer paragraph remain intact; no undefined terms or dangling mechanics introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":true}; {"name":"precision position: preferred warranty includes professional Services","ok":true}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":true}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":false,"detail":"State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":true}; {"name":"precision position: preferred warranty includes repair remedy","ok":true}; {"name":"precision position: preferred warranty includes replacement remedy","ok":true}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":false,"detail":"State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":false,"detail":"State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: warranty adds no re-performance remedy","ok":false,"detail":"Remove re-performance; the complete remedy set is repair, replacement, and refund only."}; {"name":"official minimality gate","ok":true}.
- [seq 614](trajectory.jsonl#L614) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Deliverables/software conform to documentation (unqualified conformance)\n Verdict: not_met. Evidence: will conform in all material respects to its documentation and specifications\n- 90-day services warranty period measured from performance/completion\n Verdict: not_met. Evidence: no services period stated; only 'for a period of twelve (12) months following delivery' applies to the Interface and software\n\nDeterministic official failures:\n- precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: warranty adds no re-performance remedy: Remove re-performance; the complete remedy set is repair, replacement, and refund only.\n\nOffending extra words to remove verbatim:\n- consistent with industry standards\n- in all material respects\n- re-performance\n- at TrueLink's option\n- and specifications\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level incomplete: the insertion supplies no services warranty duration at all (no 90 days from performance/completion), so the Services conformance leg and its period are absent.\n- Conformance is diluted to 'in all material respects', whereas the preferred (and fallback) position requires conformance to documentation without a materiality qualifier.\n- Fallback is also not satisfied: it needs 90 days for software and 30 days for services; the draft uses the preferred-only 12-month software figure and states no services period.\n- Non-minimal additions beyond what the level requires: 'consistent with industry standards', 'and specifications', the added 're-performance' remedy, and the vendor-elective 'at TrueLink's option' (the required remedy set is repair, replacement, refund).\n- Fix: add '(b) for a period of ninety (90) days following performance, the Hosting Services and Support Services will conform to their documentation', delete 'in all material respects', 'consistent with industry standards', 're-performance' and 'at TrueLink's option'.\n- Unrelated Y2K warranty, access/repair mechanic and disclaimer paragraph remain intact; no undefined terms or dangling mechanics introduced."
- [seq 662](trajectory.jsonl#L662) **Verdict: repaired** — The inserted paragraph supplies every preferred atomic element: professional and workmanlike Services, documentation conformance for software/deliverables (12 months) and Services (90 days), malicious code, compliance with laws, and the repair/replace/refund remedy trio. Fallback periods (90 days software / 30 days Services) are not present, which is expected since the locked target is preferred; the levels are not mixed. Insertion is a concise addition to a clause that previously contained only a Y2K warranty; the Y2K warranty and the disclaimer sentence remain untouched and effective, and no undefined terms or contradictions are introduced (Services, Hosting Services, Support Services are defined/used in the agreement). Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":true}; {"name":"precision position: preferred warranty includes professional Services","ok":true}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":true}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":true}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":true}; {"name":"precision position: preferred warranty includes repair remedy","ok":true}; {"name":"precision position: preferred warranty includes replacement remedy","ok":true}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":true}; {"name":"precision position: warranty adds no re-performance remedy","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 530](trajectory.jsonl#L530)

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

- [seq 545](trajectory.jsonl#L545) **drafter → list_sections**

```json
{}
```

- [seq 546](trajectory.jsonl#L546) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 547](trajectory.jsonl#L547) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 548](trajectory.jsonl#L548) **search result**

```json
[]
```

- [seq 581](trajectory.jsonl#L581) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 582](trajectory.jsonl#L582) **read_section result**

```json
{"sectionRef":"§ 12 INDEMNITY.","paragraphs":[{"id":"p0070","text":"12. INDEMNITY."},{"id":"p0071","text":"a. Client shall indemnify and hold TrueLink, its affiliates, directors, officers, employees, agents and licensors harmless from and against all claims, actions, expenses, losses, and liabilities, including reasonable attorneys' fees, arising from or relating to the following:"},{"id":"p0072"…
```

- [seq 583](trajectory.jsonl#L583) **drafter → search**

```json
{"query":"Customer Data"}
```

- [seq 584](trajectory.jsonl#L584) **search result**

```json
[]
```

- [seq 603](trajectory.jsonl#L603) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"Hosting vendor handling client website content and consumer credit data; insert insurance clause in miscellaneous section"}
```

- [seq 604](trajectory.jsonl#L604) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 605](trajectory.jsonl#L605) **drafter → get_definition**

```json
{"term":"Client Content"}
```

- [seq 606](trajectory.jsonl#L606) **get_definition result**

```json
{"found":false,"nearest":["Client"]}
```

- [seq 623](trajectory.jsonl#L623) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert a new Section 31 requiring TrueLink to carry CGL, professional/E&O and cyber liability insurance and to provide certificates on request.","comment":"[Playbook] The Agreement has no insurance provision even though TrueLink hosts our Web Site and transmits Client Content and consumer credit data, so we have added a standard insurance section (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, workers' compensation, certificates on request). If those limits are an issue we can work from E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0097","numbering":"31.","text":"31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber and privacy liability insurance of not less than USD 5,000,000 covering TrueLink's hosting of the Web Site and its handling of Client Content and other Client data; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."}]}
```

- [seq 624](trajectory.jsonl#L624) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0097","segments":[{"type":"equal","text":"30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink. However, to be excused from delay or failure to perform, TrueLink must a…
```

- [seq 645](trajectory.jsonl#L645) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0097"],"quote":"30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink.","rationale":"A full-text search for \"insurance\" returns no results and the outline contains no insurance heading; the miscellaneous provisions (Sections 13-30, ending at Force Majeure in p0097) contain no coverage requirement. TrueLink is a hosting vendor that hosts Client's Web Site, holds Client Content and transmits data through the Interface under Credit Repository Agreements, so it processes Client data — the rule's walk-away case (no insurance for a vendor processing personal data). Neither the preferred nor the fallback position (E&O USD 1M / cyber USD 2M) is met anywhere in the document. Proposed a new Section 31 after p0097 at the preferred position (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, workers' compensation, certificates on request), with the fallback limits offered in the comment.","confidence":0.9,"proposal":{"level":"preferred","summary":"Insert a new Section 31 requiring TrueLink to carry CGL, professional/E&O and cyber liability insurance and to provide certificates on request.","comment":"[Playbook] The Agreement has no insurance provision even though TrueLink hosts our Web Site and transmits Client Content and consumer credit data, so we have added a standard insurance section (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, workers' compensation, certificates on request). If those limits are an issue we can work from E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0097","numbering":"31.","text":"31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber and privacy liability insurance of not less than USD 5,000,000 covering TrueLink's hosting of the Web Site and its handling of Client Content and other Client data; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."}]}}
```

- [seq 646](trajectory.jsonl#L646) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 645](trajectory.jsonl#L645)
- Finding: `f-insurance-1c661cbc` · **missing** · confidence 0.90
- Location: § 12 INDEMNITY.
- Quote: “30. FORCE MAJEURE. TrueLink will be excused from delays in performing or from failing to perform its obligations under this Agreement to the extent the delays or failures result from causes beyond the reasonable control or TrueLink.”
- Rationale: A full-text search for "insurance" returns no results and the outline contains no insurance heading; the miscellaneous provisions (Sections 13-30, ending at Force Majeure in p0097) contain no coverage requirement. TrueLink is a hosting vendor that hosts Client's Web Site, holds Client Content and transmits data through the Interface under Credit Repository Agreements, so it processes Client data — the rule's walk-away case (no insurance for a vendor processing personal data). Neither the preferred nor the fallback position (E&O USD 1M / cyber USD 2M) is met anywhere in the document. Proposed a new Section 31 after p0097 at the preferred position (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, workers' compensation, certificates on request), with the fallback limits offered in the comment.
- Proposal: **preferred** — Insert a new Section 31 requiring TrueLink to maintain CGL, E&O, cyber and workers' compensation insurance and to provide certificates on request.
- Comment: [Playbook] The Agreement has no insurance provision even though TrueLink hosts our site and handles Client Content and consumer credit data, so we have added a short insurance section at our playbook position (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M, workers' compensation, certificates on request) and dropped the one-year post-term tail. If the limits are an issue we can work from E&O of USD 1,000,000 and cyber of USD 2,000,000.
- Proposed ops:

```json
[
  {
    "asHeading": false,
    "kind": "insert_after",
    "numbering": "31.",
    "paragraphId": "p0097",
    "text": "31. INSURANCE. TrueLink shall maintain, at its own expense, throughout the term of this Agreement: (a) commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; (b) professional liability (errors and omissions) insurance of not less than USD 2,000,000; (c) cyber and privacy liability insurance of not less than USD 5,000,000 covering TrueLink's handling of Client Content and other Client data; and (d) workers' compensation insurance as required by applicable law. TrueLink shall provide Client with certificates of insurance evidencing such coverage upon request."
  }
]
```

### Verifier and repair feedback

- [seq 669](trajectory.jsonl#L669) **Verdict: fail** — All six preferred elements (CGL 1M/2M, E&O 2M, cyber 5M tied to handling of Client Content/data, workers' compensation, certificates on request) are expressly stated in the inserted section, so the locked preferred level is complete. The insertion is a concise new section for an absent clause, which is appropriate; the Force Majeure paragraph is untouched and no undefined terms are introduced (Client, TrueLink, Web Site, Client Content are existing defined terms). Minimality slips only on the added post-termination coverage tail 'and for one (1) year thereafter', which the preferred position does not require and which extends the Vendor's obligation beyond what was needed to complete the level. Recommend deleting the one-year tail (or accepting it as a negotiable ask) to keep the insertion strictly at the playbook position. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: insurance obligation present","ok":true}; {"name":"precision position: insurance adds no post-termination coverage tail","ok":true}; {"name":"official minimality gate","ok":true}.
- [seq 670](trajectory.jsonl#L670) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nOffending extra words to remove verbatim:\n- and for one (1) year thereafter\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All six preferred elements (CGL 1M/2M, E&O 2M, cyber 5M tied to handling of Client Content/data, workers' compensation, certificates on request) are expressly stated in the inserted section, so the locked preferred level is complete.\n- The insertion is a concise new section for an absent clause, which is appropriate; the Force Majeure paragraph is untouched and no undefined terms are introduced (Client, TrueLink, Web Site, Client Content are existing defined terms).\n- Minimality slips only on the added post-termination coverage tail 'and for one (1) year thereafter', which the preferred position does not require and which extends the Vendor's obligation beyond what was needed to complete the level.\n- Recommend deleting the one-year tail (or accepting it as a negotiable ask) to keep the insertion strictly at the playbook position."
- [seq 681](trajectory.jsonl#L681) **Verdict: repaired** — Inserted clause is a concise insertion for an absent insurance provision and matches every preferred element: CGL 1M/2M, E&O 2M, cyber 5M tied to Client Content, workers' comp per law, certificates on request. No post-term tail or other extraneous obligations added; the untouched force majeure clause is unchanged and no undefined terms are introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: insurance obligation present","ok":true}; {"name":"precision position: insurance adds no post-termination coverage tail","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 533](trajectory.jsonl#L533)

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

- [seq 557](trajectory.jsonl#L557) **drafter → list_sections**

```json
{}
```

- [seq 558](trajectory.jsonl#L558) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 559](trajectory.jsonl#L559) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 560](trajectory.jsonl#L560) **read_section result**

```json
{"sectionRef":"§ 5 COMPENSATION.","paragraphs":[{"id":"p0044","text":"5. COMPENSATION."},{"id":"p0045","text":"a. Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \"A\" and \"B\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services). For any…
```

- [seq 575](trajectory.jsonl#L575) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 576](trajectory.jsonl#L576) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ 2 LICENSE.","snippet":"c. Term. The license shall last until this Agreement is terminated in accordance with section 12."},{"paragraphId":"p0078","sectionRef":"§ 12 INDEMNITY.","snippet":"…n in effect for a period of 1 year; provided, that Sections 2 and 3 level shall terminate promptly upon (a) any action or omission by Client or any of its customers whic……
```

- [seq 577](trajectory.jsonl#L577) **drafter → search**

```json
{"query":"minimum","limit":20}
```

- [seq 578](trajectory.jsonl#L578) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…d upon request with documentation supporting the amount charged (other than the minimum monthly fees listed in Section 4) and will be entitled to contest any charge (o…"},{"paragraphId":"p0047","sectionRef":"§ 5 COMPENSATION.","snippet":"…listed in Section 4) and will be entitled to contest any charge (other than the minimum mon…
```

- [seq 599](trajectory.jsonl#L599) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0077","p0078","p0079","p0080","p0081"]}
```

- [seq 600](trajectory.jsonl#L600) **read_paragraphs result**

```json
[{"id":"p0077","sectionRef":"§ 12 INDEMNITY.","text":"IN NO EVENT SHALL TRUELINK'S LIABILITY FOR ANY MATTER ARISING UNDER OR RELATED TO SECTION 3, 4, 7 AND 11 THIS AGREEMENT (OTHER THAN DUE TO A BREACH RESULTING FROM TRUELINK'S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT) EXCEED THE TOTAL COMPENSATION PAID FOR HOSTING AND SUPPORT SERVICES OVER THE IMMEDIATELY PRECEDING 12 MONTHS PERIOD."},{"id":"p0078…
```

- [seq 627](trajectory.jsonl#L627) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0045","p0047","p0078","p0079"],"quote":"Client will pay TrueLink's fees for requested Hosting Services and Support Services pursuant to the schedule of charges set forth on Exhibits \\\"A\\\" and \\\"B\\\" attached hereto, (but not less than $____ per month for the Hosting Services and $____ per month for Support Services).","rationale":"Section 5a does impose a minimum monthly fee for Hosting and Support Services, so the arrangement is not at the preferred \"usage/ordered services only\" position. It does, however, sit squarely at the fallback: the term is a single 12-month period (Section 13), and Section 14 gives Client an unconditional termination right effective the last day of the month following notice, with a further right not to renew on 30 days' notice — so the commitment never extends beyond the current 12-month term and is exitable on short notice. There is no shortfall payment, liquidated damages or take-or-pay penalty; Client simply pays the monthly minimum for months in which the service is live. No volume caps on Client usage appear anywhere. Two points to note commercially rather than redline: the minimum amounts are left blank ($____) and should be filled in at a level at or below expected usage, and Section 6 excludes the minimum monthly fees from Client's audit/dispute rights (a documentation point addressed under the invoicing rule, not here).","confidence":0.8}
```

- [seq 628](trajectory.jsonl#L628) **submit_finding result**

```json
{"ok":false,"errors":["quote is not a verbatim substring of a cited paragraph"]}
```

- [seq 641](trajectory.jsonl#L641) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0045","p0047","p0078","p0079"],"quote":"(but not less than $____ per month for the Hosting Services and $____ per month for Support Services)","rationale":"Section 5a does impose a minimum monthly fee for Hosting and Support Services, so the arrangement is not at the preferred \"usage/ordered services only\" position. It sits at the fallback, however: the term is a single 12-month period (Section 13), and Section 14 gives Client an unconditional right to terminate effective the last day of the month following notice, with a further right not to renew on 30 days' notice — so the commitment never extends beyond the current 12-month term and is exitable on short notice. There is no shortfall payment, liquidated damages or take-or-pay mechanic; Client simply pays the monthly minimum while service is live, and no volume caps are imposed on Client usage. Two points to note commercially rather than redline: the minimum amounts are left blank ($____) and should be set at or below expected usage, and Section 6 excludes the minimum monthly fees from Client's supporting-documentation and dispute rights (an invoicing/audit point handled under that rule).","confidence":0.8}
```

- [seq 642](trajectory.jsonl#L642) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 641](trajectory.jsonl#L641)
- Finding: `f-mincommit-43c18cdc` · **compliant** · confidence 0.80
- Location: § 5 COMPENSATION.
- Quote: “(but not less than $____ per month for the Hosting Services and $____ per month for Support Services)”
- Rationale: Section 5a does impose a minimum monthly fee for Hosting and Support Services, so the arrangement is not at the preferred "usage/ordered services only" position. It sits at the fallback, however: the term is a single 12-month period (Section 13), and Section 14 gives Client an unconditional right to terminate effective the last day of the month following notice, with a further right not to renew on 30 days' notice — so the commitment never extends beyond the current 12-month term and is exitable on short notice. There is no shortfall payment, liquidated damages or take-or-pay mechanic; Client simply pays the monthly minimum while service is live, and no volume caps are imposed on Client usage. Two points to note commercially rather than redline: the minimum amounts are left blank ($____) and should be set at or below expected usage, and Section 6 excludes the minimum monthly fees from Client's supporting-documentation and dispute rights (an invoicing/audit point handled under that rule).

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 569](trajectory.jsonl#L569)

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

- [seq 591](trajectory.jsonl#L591) **drafter → list_sections**

```json
{}
```

- [seq 592](trajectory.jsonl#L592) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"EXHIBIT 10.4","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"LICENSING AND WEB SITE HOSTING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-1","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":12},{"id":"sec-2","number":"2","heading":"LICENSE.","level":1,"paragraphC…
```

- [seq 593](trajectory.jsonl#L593) **drafter → search**

```json
{"query":"termination","limit":30}
```

- [seq 594](trajectory.jsonl#L594) **search result**

```json
[{"paragraphId":"p0079","sectionRef":"§ 12 INDEMNITY.","snippet":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested H…"},{"paragraphId":"p0090","sectionRef":"§ 12 INDEMNITY.","snippet":"…ns of Sections 1 and 5 through 30 this Agreement will survive the expiration or termination of this Agreement."}]
```

- [seq 617](trajectory.jsonl#L617) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0075","p0076","p0077","p0078","p0079","p0080","p0081","p0082","p0083","p0084","p0085","p0086","p0087","p0088","p0089","p0090","p0091"]}
```

- [seq 618](trajectory.jsonl#L618) **read_paragraphs result**

```json
[{"id":"p0075","sectionRef":"§ 12 INDEMNITY.","text":"claim arising out of any breach by TrueLink of this Agreement or any failure by TrueLink in the performance of any of its obligations or agreements hereunder."},{"id":"p0076","sectionRef":"§ 12 INDEMNITY.","text":"EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, TRUELINK DISCLAIMS ANY AND ALL EXPENSES WARRANTIES, WARRANTIES OF FITNESS FOR A PA…
```

- [seq 619](trajectory.jsonl#L619) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 620](trajectory.jsonl#L620) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0061","text":"10. CONFIDENTIALITY."},{"id":"p0062","text":"a. Client acknowledges its responsibility to preserve the confidentiality of certain technology, information, and documentation embedded in the Interface and agrees to respect the confidential nature of the Interface. Notwithstanding anything to the contrary contained in this Agr…
```

- [seq 635](trajectory.jsonl#L635) **drafter → search**

```json
{"query":"Client Content","limit":20}
```

- [seq 636](trajectory.jsonl#L636) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks…"},{"paragraphId":"p0011","sectionRef":"§ 1 DEFINITIONS.","snippet":"b. Client Content. The term \"Client Content\" means all text, words, names, likenesses, trademarks, logos, artwork, graphics…"},{"paragraphId":"p0019","sectionRef…
```

- [seq 637](trajectory.jsonl#L637) **drafter → search**

```json
{"query":"return|destroy|delete|export|migrat|transition","regex":true,"limit":30}
```

- [seq 638](trajectory.jsonl#L638) **search result**

```json
[{"paragraphId":"p0060","sectionRef":"§ 8 COVENANTS AND WARRANTIES OF CLIENT","snippet":"…on calculating, comparing, indexing and sequencing; and (iii) will successfully transition from December 31, 1999, to January 1, 2000, without human intervention. At Clie…"},{"paragraphId":"p0086","sectionRef":"§ 12 INDEMNITY.","snippet":"…, or (iii) three (3) days after placement in first-class mail, postag…
```

- [seq 654](trajectory.jsonl#L654) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Hosting agreement, no exit/data return clause; insert after Section 14 TERMINATION"}
```

- [seq 655](trajectory.jsonl#L655) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 665](trajectory.jsonl#L665) **drafter → propose_redline**

```json
{"ops":[{"kind":"insert_after","paragraphId":"p0079","numbering":"14a.","text":"TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance, including assistance migrating the Web Site and Client Content to Client or its designee, for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days of Client's request, return to Client all Client Content and other Client data in TrueLink's possession or control in a commonly used, machine-readable format; and (c) thereafter delete such Client Content and data from its systems and certify such deletion to Client in writing."}],"comment":"[Playbook] We have added a transition-assistance and data-return provision, as the Agreement currently requires Client to arrange replacement hosting but gives us no right to our own data or migration help on exit. Our position is up to six months of assistance at your then-current rates, return of Client data in a machine-readable format within thirty days, and certified deletion thereafter; we can work with 90 days of assistance if that is easier operationally.","level":"preferred","summary":"Insert post-termination transition assistance, data return within 30 days, and certified deletion into Section 14 (Termination)."}
```

- [seq 666](trajectory.jsonl#L666) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0079","segments":[{"type":"equal","text":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement."}]}]}
```

- [seq 673](trajectory.jsonl#L673) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0078","p0079"],"quote":"14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.","rationale":"The Agreement contains no exit or data-return provision. Section 14 (p0079) addresses only the wind-down of services, and Section 13 (p0078) places the burden entirely on Client to arrange a new name server within 30 days and a new hosting environment within 60 days, while confirming only ownership of domains and Client Content — it imposes no obligation on TrueLink to return Client Content or borrower/loan data in a usable format, to assist with migration, or to delete data and certify deletion. Section 10 (Confidentiality) likewise has no return-or-destroy mechanic. This falls short of even the fallback (90 days of transition assistance plus export within 30 days) and risks walk-away territory, since on exit we would have no contractual right to our own hosted data. Proposed insertion of a transition-assistance, data-return and certified-deletion paragraph at the preferred position (6 months at then-current rates, return within 30 days, deletion certified thereafter).","confidence":0.86,"proposal":{"ops":[{"kind":"insert_after","paragraphId":"p0079","numbering":"14a.","text":"TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance, including assistance migrating the Web Site and Client Content to Client or its designee, for up to six (6) months at TrueLink's then-current rates; (b) within thirty (30) days of Client's request, return to Client all Client Content and other Client data in TrueLink's possession or control in a commonly used, machine-readable format; and (c) thereafter delete such Client Content and data from its systems and certify such deletion to Client in writing."}],"comment":"[Playbook] We have added a transition-assistance and data-return provision, as the Agreement currently requires Client to arrange replacement hosting but gives us no right to our own data or migration help on exit. Our position is up to six months of assistance at your then-current rates, return of Client data in a machine-readable format within thirty days, and certified deletion thereafter; we can work with 90 days of assistance if that is easier operationally.","level":"preferred","summary":"Insert post-termination transition assistance, data return within 30 days, and certified deletion into Section 14 (Termination)."}}
```

- [seq 674](trajectory.jsonl#L674) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 673](trajectory.jsonl#L673)
- Finding: `f-transition-2aa5a23a` · **missing** · confidence 0.86
- Location: § 12 INDEMNITY.
- Quote: “14. TERMINATION. Subject to Section 4 hereof, TrueLink will continue to provide the requested Hosting Services and Support Services until the last day of the month following the month in which Client provides TrueLink with a written notice of its election to terminate this Agreement.”
- Rationale: The Agreement contains no exit or data-return provision. Section 14 (p0079) addresses only the wind-down of services, and Section 13 (p0078) places the burden entirely on Client to arrange a new name server within 30 days and a new hosting environment within 60 days, while confirming only ownership of domains and Client Content — it imposes no obligation on TrueLink to return Client Content or borrower/loan data in a usable format, to assist with migration, or to delete data and certify deletion. Section 10 (Confidentiality) likewise has no return-or-destroy mechanic. This falls short of even the fallback (90 days of transition assistance plus export within 30 days) and risks walk-away territory, since on exit we would have no contractual right to our own hosted data. Proposed insertion of a transition-assistance, data-return and certified-deletion paragraph at the preferred position (6 months at then-current rates, return within 30 days, deletion certified thereafter).
- Proposal: **preferred** — Insert post-termination transition assistance (up to 6 months at then-current rates), return of Client data in a standard machine-readable format within 30 days of expiry or termination, and certified deletion thereafter.
- Comment: [Playbook] We have added a transition-assistance and data-return clause, as the Agreement gives us no right to our own hosted data or migration help on exit. The 30-day return deadline now runs from expiration or termination (not from a later request) and the data comes back in a standard machine-readable format, with deletion certified thereafter.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "14a.",
    "paragraphId": "p0079",
    "text": "TRANSITION ASSISTANCE AND RETURN OF CLIENT DATA. Upon expiration or termination of this Agreement for any reason, TrueLink shall (a) at Client's request, provide reasonable transition assistance for up to 6 months at TrueLink's then-current rates; (b) within 30 days of such expiration or termination, return to Client all Client Content and other Client data in a standard machine-readable format; and (c) thereafter delete such Client Content and data from its systems and certify such deletion to Client in writing."
  }
]
```

### Verifier and repair feedback

- [seq 684](trajectory.jsonl#L684) **Verdict: fail** — precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation. precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation. precision position: preferred transition return deadline runs from expiry or termination, not a later request: Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later. The 30-day data-return deadline runs from 'Client's request' rather than from expiration or termination, so a request condition swallows the mandatory post-termination return; the preferred position requires return within 30 days of expiry or termination. Because the return clock is request-triggered rather than termination-triggered, the fallback's 'data export within 30 days' is also not squarely met. Fix is narrow: change '(b) within thirty (30) days of Client's request' to '(b) within thirty (30) days of such expiration or termination'. All other preferred elements are present: up to six months' assistance at then-current rates, machine-readable ('commonly used, machine-readable') format, deletion thereafter, and written certification of deletion. The insertion is a concise new clause for an absent obligation and leaves the term, non-renewal, ownership and termination mechanics untouched. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: data return/transition present","ok":true}; {"name":"precision position: preferred transition includes then-current rates","ok":true}; {"name":"precision position: preferred transition includes standard machine-readable format","ok":false,"detail":"State standard machine-readable format expressly in the transition obligation."}; {"name":"precision position: preferred transition includes 30-day return after expiry or termination","ok":false,"detail":"State 30-day return after expiry or termination expressly in the transition obligation."}; {"name":"precision position: preferred transition includes deletion after return","ok":true}; {"name":"precision position: preferred transition includes certification of deletion","ok":true}; {"name":"precision position: preferred transition return deadline runs from expiry or termination, not a later request","ok":false,"detail":"Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later."}; {"name":"precision position: transition duties do not newly trigger on termination of an individual Order Form","ok":true}; {"name":"official minimality gate","ok":true}.
- [seq 685](trajectory.jsonl#L685) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Return of Customer Data within 30 days of expiry or termination\n Verdict: not_met. Evidence: within thirty (30) days of Client's request, return to Client all Client Content and other Client data\n\nDeterministic official failures:\n- precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation.\n- precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation.\n- precision position: preferred transition return deadline runs from expiry or termination, not a later request: Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later.\n\nVerifier reasons:\n- The 30-day data-return deadline runs from 'Client's request' rather than from expiration or termination, so a request condition swallows the mandatory post-termination return; the preferred position requires return within 30 days of expiry or termination.\n- Because the return clock is request-triggered rather than termination-triggered, the fallback's 'data export within 30 days' is also not squarely met.\n- Fix is narrow: change '(b) within thirty (30) days of Client's request' to '(b) within thirty (30) days of such expiration or termination'.\n- All other preferred elements are present: up to six months' assistance at then-current rates, machine-readable ('commonly used, machine-readable') format, deletion thereafter, and written certification of deletion.\n- The insertion is a concise new clause for an absent obligation and leaves the term, non-renewal, ownership and termination mechanics untouched."
- [seq 690](trajectory.jsonl#L690) **Verdict: repaired** — All preferred atomic elements are express: 6-month transition window at then-current rates, 30-day return in standard machine-readable format measured from expiration or termination, then deletion with written certification. The "at Client's request" condition attaches only to transition assistance; the data-return, deletion and certification duties remain mandatory, so the request condition does not swallow the return obligation. Inserted as a single new section after the termination provisions where no transition or data-return clause existed; nothing in Sections 13-14 is altered, and no undefined term is introduced (Client Content, Client and TrueLink are all existing defined/named terms). Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: data return/transition present","ok":true}; {"name":"precision position: preferred transition includes then-current rates","ok":true}; {"name":"precision position: preferred transition includes standard machine-readable format","ok":true}; {"name":"precision position: preferred transition includes 30-day return after expiry or termination","ok":true}; {"name":"precision position: preferred transition includes deletion after return","ok":true}; {"name":"precision position: preferred transition includes certification of deletion","ok":true}; {"name":"precision position: preferred transition return deadline runs from expiry or termination, not a later request","ok":true}; {"name":"precision position: transition duties do not newly trigger on termination of an individual Order Form","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 695](trajectory.jsonl#L695) memo LLM request
- [seq 696](trajectory.jsonl#L696) memo LLM response (replay)

```markdown
# Issues Memo — EXHIBIT 10.4 (TrueLink Hosting, Support and Interface Agreement)

**To:** Deal team  
**From:** In-house counsel  
**Re:** Playbook review of EXHIBIT 10.4 — verified findings only  
**Position:** We are the Client (Customer).

---

## Executive summary

We reviewed the Agreement against 18 playbook rules. Ten clauses meet the preferred position or sit acceptably at the fallback and need no redline; six are deviations; two obligations the playbook expects are missing entirely.

The commercial architecture is, on balance, favourable to us on the points that most often cause trouble: there is no exclusivity, no non-compete, no MFN or non-solicit binding us, no liquidated damages or exit fee, and no audit right running against us. Section 2(a) affirmatively preserves our freedom to buy, build or license competing software. Termination and renewal are good — we hold a unilateral at-will termination right (§14) with no penalty, and auto-renewal is annual on a 30-day non-renewal notice. Governing law (California, San Luis Obispo County) sits at the fallback and is accepted.

The problems are concentrated in risk allocation. The single most serious issue is the one-sided liability limitation: TrueLink's exposure is capped at 12 months' hosting and support fees while our liability, including our broad indemnity, is entirely uncapped — expressly walk-away territory under our playbook. Compounding this, TrueLink gives no IP infringement indemnity, no performance or conformance warranty (the only warranty is a Y2K date-handling clause), no insurance covenant at all despite hosting our Web Site and processing borrower data, and no obligation to return our data or assist on exit. Ownership of Support Services work product and of borrower/loan data is never vested in us. Assignment and licence scope are narrower than the fallback (no M&A successor carve-out, no affiliate or contractor coverage).

Note for drafting: the automated redline for the liability cap did **not** verify and requires manual drafting; the assignment, warranty, indemnity, insurance, IP, licence and transition redlines verified after repair.

---

## Findings

| Severity | Rule | Status | Section | Summary |
|---|---|---|---|---|
| Medium | LOL-CAP — Limitation of liability | **Deviation** | § 12 INDEMNITY. | TrueLink capped at 12 months' hosting/support fees; our liability, including our § 12(a) indemnity, uncapped. No mutual consequential-damages exclusion and no Excluded Claims carve-outs. Fails the fallback. *Redline did not verify — draft manually.* |
| Medium | WARRANTY — Performance warranty | **Deviation** | § 8 COVENANTS AND WARRANTIES OF CLIENT | Only vendor warranty is the § 9 Y2K warranty. No professional-and-workmanlike, conformance, malicious-code or compliance warranty and no repair/re-perform/refund remedy; § 3 is "reasonable commercial efforts" only. The § 76 disclaimer is acceptable as qualified by "EXCEPT AS EXPRESSLY SET FORTH." |
| Low | INDEMN — Vendor indemnification | **Deviation** | § 12 INDEMNITY. | § 12(b) covers only TrueLink's own breach or performance failure. No IP infringement indemnity anywhere; infringement language runs only against us. Fails the fallback; imbalance compounded by the broad § 12(a) Client indemnity. |
| Low | IP — Ownership of deliverables and data | **Deviation** | § 2 LICENSE. | § 2(d) vests the Interface in TrueLink (acceptable), but nothing vests us with ownership of § 4 Support Services work product, and no ownership/assignment provision covers borrower and loan data. Confidentiality treatment under § 10 is not ownership. § 8(d) Credit Data licence left intact. |
| Low | LICENSE — Licence grant scope | **Deviation** | § 2 LICENSE. | Grant in § 2(a) runs to Client alone — no affiliates or contractors; § 2(b) permits added sites, not added entities. § 15 has no successor carve-out. Fails both limbs of the fallback. Not walk-away (licence not revocable at will). |
| Low | ASSIGN — Assignment and change of control | **Deviation** | § 12 INDEMNITY. | § 15 bars assignment absent consent, with a carve-out only for a financially responsible affiliate. No M&A successor carve-out and no reasonableness standard, so TrueLink could block a corporate transaction. No CoC-triggered termination or re-pricing anywhere. |
| Low | INSURANCE — Vendor insurance | **Missing** | § 12 INDEMNITY. | No insurance provision in the document. TrueLink hosts our Web Site, holds Client Content and transmits data under Credit Repository Agreements. Neither preferred nor fallback limits met. |
| Low | TRANSITION — Exit assistance and data return | **Missing** | § 12 INDEMNITY. | No data-return, migration-assistance or deletion obligation. § 13 places the burden on us (new name server in 30 days, new hosting in 60 days); § 10 has no return-or-destroy mechanic. |
| High | EXCLUSIVITY | Compliant | § 2 LICENSE. | No exclusivity or sole-supplier obligation; § 2(a) expressly confirms we may acquire, develop or license competing products. § 3(i) is a narrow self-triggered operational term, not a requirements covenant. |
| High | LD — Liquidated damages / penalties | Compliant | § 5 COMPENSATION. | No liquidated damages, penalty or stipulated sum payable by us. § 14 imposes no exit fee (roughly one month's wind-down, inside the 3-month fallback). |
| High | NONCOMPETE | Compliant | § 2 LICENSE. | No non-compete or field-of-use restraint; § 2(a) better than preferred. § 8(d) Non-Competition Agreement reference limits TrueLink's Credit Data use and benefits us — diligence item only. |
| High | T4C — Termination for convenience | Compliant | § 12 INDEMNITY. | § 14 gives us a unilateral at-will termination right with no penalty; TrueLink has no mid-term convenience right. Minor: no express pro-rata refund (immaterial — monthly billing in arrears) and 30-day rather than 90-day non-renewal notice (symmetric). |
| Medium | AUDIT | Compliant | § 5 COMPENSATION. | No audit, inspection or usage-verification right against us; verification rights under §§ 5–6 run in our favour. Better than preferred — we should not introduce an audit right. |
| Medium | GOVLAW | Compliant | § 12 INDEMNITY. | §§ 26–27 select California law and exclusive venue in San Luis Obispo County — at the fallback. No arbitration or foreign seat. County-level venue noted, not a deviation. |
| Medium | MFN | Compliant | § 5 COMPENSATION. | The only MFN language runs in our favour (Hosting rates not to exceed those charged any other party; no increase for one year). |
| Medium | MINCOMMIT | Compliant | § 5 COMPENSATION. | § 5(a) monthly minimums sit at the fallback: single 12-month term, exitable on short notice, no shortfall or take-or-pay, no volume caps. Commercial notes: minimum amounts are blank ($____) and § 6 excludes minimums from our documentation/dispute rights. |
| Medium | NOSOLICIT | Compliant | § 7 UNSOLICITED COMMERCIAL E-MAIL. | No non-solicit, no-hire or anti-poaching covenant binding us. Separate Non-Competition Agreement to be reviewed for personnel restrictions. |
| Medium | RENEWAL | Compliant | § 12 INDEMNITY. | § 13 auto-renews for successive one-year terms on 30 days' notice — both parameters at preferred. No renewal reminder and no price-increase cap, partially mitigated by the § 6 first-year freeze and most-favoured-rate commitment. |

---

## Walk-away items

1. **Uncapped Client liability against a capped Vendor (§ 12 INDEMNITY.)** — Our liability, including the broad § 12(a) indemnity, is unlimited while TrueLink's is capped at 12 months' hosting and support compensation. This is expressly walk-away territory. We require a mutual, agreement-wide cap (fallback: mutual 12-month cap) before signature.
2. **No insurance from a vendor processing our data (§ 12 INDEMNITY.)** — TrueLink hosts our Web Site, holds Client Content and transmits borrower data, with no coverage requirement anywhere in the document. This is the rule's identified walk-away case.
3. **No contractual right to our own hosted data on exit (§ 12 INDEMNITY.)** — With no return, export or deletion obligation, on termination we would have no contractual route to our own data. Flagged as risking walk-away territory.

---

## Next steps

1. **Draft the liability cap manually.** The automated redline failed verification. Make the cap mutual and agreement-wide, set at the greater of 12 months' fees paid or payable and USD 1,000,000, add a mutual consequential-damages exclusion and standard uncapped Excluded Claims, and confirm our payment obligations are not "damages" for cap purposes. Fallback: a mutual 12-month cap.
2. **Issue the verified redlines** for warranty (performance and conformance warranty with repair/replace/refund remedies, after § 60), Vendor IP infringement indemnity with standard exclusions, remedies and a 3x annual fees super-cap, insurance (new § 31 after § 97 — CGL, E&O, cyber and workers' compensation, certificates on request; fallback E&O USD 1M / cyber USD 2M offered in comment), and post-termination transition assistance with data return within 30 days and certified deletion.
3. **Issue the ownership, licence and assignment edits** — a Client-ownership paragraph with licence-back for embedded TrueLink IP and a no-joint-ownership sentence; affiliate and contractor coverage in the § 2(a) grant; and a mutual M&A successor carve-out plus reasonableness and competitor bar in § 15.
4. **Close the commercial blanks.** Set the § 5(a) monthly minimums at or below expected usage before execution, and consider whether the § 6 exclusion of minimums from our documentation and dispute rights is acceptable.
5. **Obtain and review the separate Non-Competition Agreement** cross-referenced at § 8(d) for any restrictions on our personnel or business lines.
6. **Do not introduce** an audit right, MFN or exclusivity concept in our markup — the current silence on each is better for us than the playbook preferred position.
```

## Apply and validation

No apply or output-validation event was recorded.
