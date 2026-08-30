# Trajectory: cuad-bluefly-hosting

| Run | Value |
|---|---|
| Contract | cuad-bluefly-hosting — 3.1 Term |
| Config | final-v4 |
| Parties | Bluefly, Inc. (our party) ↔ International Business Machines Corporation |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 7.5s (7,548 ms) |
| Calls | 157 LLM · 196 tool · 10 retries |
| Tokens | 101,809 input · 131,630 output · 916,465 cache read · 159,281 cache write |
| Cost | $5.253534 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 676 | 136 | 196 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 755](trajectory.jsonl#L755) |
| verifier | 57 | 19 | 0 | 19 verdict(s) | [seq 190](trajectory.jsonl#L190)–[seq 750](trajectory.jsonl#L750) |
| assembler | 21 | 0 | 0 | — | [seq 169](trajectory.jsonl#L169)–[seq 763](trajectory.jsonl#L763) |
| memo | 4 | 1 | 0 | — | [seq 759](trajectory.jsonl#L759)–[seq 762](trajectory.jsonl#L762) |
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
{"sectionId":"sec-9.1"}
```

- [seq 14](trajectory.jsonl#L14) **read_section result**

```json
{"sectionRef":"§ 9.1 IBM's Limitation of Liability","paragraphs":[{"id":"p0108","text":"9.1 IBM's Limitation of Liability"},{"id":"p0109","text":"Circumstances may arise where, because of a default on IBM's part or other liability, Customer is entitled to recover damages from IBM. Regardless of the basis on which Customer is entitled to claim damages from IBM (including fundamental breach, neglig…
```

- [seq 15](trajectory.jsonl#L15) **drafter → read_section**

```json
{"sectionId":"sec-9.2"}
```

- [seq 16](trajectory.jsonl#L16) **read_section result**

```json
{"sectionRef":"§ 9.2 Customer's Limitation of Liability","paragraphs":[{"id":"p0115","text":"9.2 Customer's Limitation of Liability"},{"id":"p0116","text":"Circumstances may arise where, because of a default on Customer's part or other liability, IBM is entitled to recover damages from Customer. Regardless of the basis on which IBM is entitled to claim damages from Customer (including fundamental…
```

- [seq 53](trajectory.jsonl#L53) **drafter → read_section**

```json
{"sectionId":"sec-5.4"}
```

- [seq 54](trajectory.jsonl#L54) **read_section result**

```json
{"sectionRef":"§ 5.4 Other Disclaimers","paragraphs":[{"id":"p0071","text":"5.4 Other Disclaimers"},{"id":"p0072","text":"a. IBM does not warrant uninterrupted or error-free operation of any Service or that IBM will correct all defects. open"},{"id":"p0073","text":"b. IBM does not make any representation or warranty as to the capacity, performance or scalability of the Services, e-business Hostin…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"confidential"}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[{"paragraphId":"p0075","sectionRef":"§ 5.4 Other Disclaimers","snippet":"…--------------------------------------------------------------------------- 6.0 Confidentiality"},{"paragraphId":"p0076","sectionRef":"§ 5.4 Other Disclaimers","snippet":"All information exchanged between the parties is non-confidential; provided, however if either or both parties require the exchange of confidenti…"},{"pa…
```

- [seq 101](trajectory.jsonl#L101) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"Mutual caps at greater of $100k or 12 months charges; no carve-out for confidentiality, gross negligence, wilful misconduct"}
```

- [seq 102](trajectory.jsonl#L102) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 135](trajectory.jsonl#L135) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add mutual Excluded Claims carve-out to the liability caps in Sections 9.1/9.2 and the Section 10 exclusion","comment":"[Playbook] The mutual cap works for us, but our position requires confidentiality/data-security breaches, indemnities, gross negligence, wilful misconduct, fraud and IP infringement to sit outside the cap and outside the consequential-damages exclusion, so we have added a short mutual Excluded Claims provision. We can accept the existing $100,000 floor in place of our usual USD 1,000,000 floor as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0121","numbering":"9.3","text":"9.3 Excluded Claims. Notwithstanding Sections 9.1, 9.2 and 10, the limitations and exclusions of liability in this Agreement do not apply to a party's breach of its confidentiality, data protection or security obligations (including under the AECI), its indemnification obligations, its gross negligence, wilful misconduct or fraud, or its infringement of the other party's intellectual property rights."}]}
```

- [seq 136](trajectory.jsonl#L136) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0121","segments":[{"type":"equal","text":"expressly provided in Subsections 9.2(a) and 9.2(b))."}]}]}
```

- [seq 165](trajectory.jsonl#L165) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0112","p0119","p0123"],"quote":"c. the amount of any other actual direct damages, up to the greater of $100,000 or the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim related to the Services.","rationale":"Sections 9.1 and 9.2 impose substantively identical caps on IBM and on Customer (greater of $100,000 or 12 months' charges paid), and Section 10 excludes consequential damages mutually while preserving Customer's payment obligations — so mutuality, basis and the treatment of payment obligations sit at or above the fallback (the $100,000 floor is below our preferred USD 1,000,000 floor, which we note but do not treat as material). The clause nonetheless fails the fallback on carve-outs: only indemnification payments (Sections 8.1/8.2) and bodily injury/tangible property claims are excluded from the cap, with no carve-out for breach of confidentiality, data protection or security obligations, gross negligence, wilful misconduct, fraud or IP infringement. This is aggravated by Section 6, which provides that Sections 5, 9 and 10 prevail over the AECI for confidential information in the hosting environment, and by Section 9.1(2), which bars any recovery for loss of or damage to Customer's records or data. We propose a single mutual \"Excluded Claims\" provision rather than rewriting the section.","confidence":0.78,"proposal":{"level":"preferred","summary":"Add mutual Excluded Claims carve-out to the liability caps in Sections 9.1/9.2 and the Section 10 exclusion","comment":"[Playbook] The mutual cap works for us, but our position requires confidentiality/data-security breaches, indemnities, gross negligence, wilful misconduct, fraud and IP infringement to sit outside the cap and outside the consequential-damages exclusion, so we have added a short mutual Excluded Claims provision. We can accept the existing $100,000 floor in place of our usual USD 1,000,000 floor as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0121","numbering":"9.3","text":"9.3 Excluded Claims. Notwithstanding Sections 9.1, 9.2 and 10, the limitations and exclusions of liability in this Agreement do not apply to a party's breach of its confidentiality, data protection or security obligations (including under the AECI), its indemnification obligations, its gross negligence, wilful misconduct or fraud, or its infringement of the other party's intellectual property rights."}]}}
```

- [seq 166](trajectory.jsonl#L166) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 165](trajectory.jsonl#L165)
- Finding: `f-lol-cap-6ad0f185` · **deviation** · confidence 0.78
- Location: § 9.1 IBM's Limitation of Liability
- Quote: “c. the amount of any other actual direct damages, up to the greater of $100,000 or the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim related to the Services.”
- Rationale: Sections 9.1 and 9.2 impose substantively identical caps on IBM and on Customer (greater of $100,000 or 12 months' charges paid), and Section 10 excludes consequential damages mutually while preserving Customer's payment obligations — so mutuality, basis and the treatment of payment obligations sit at or above the fallback (the $100,000 floor is below our preferred USD 1,000,000 floor, which we note but do not treat as material). The clause nonetheless fails the fallback on carve-outs: only indemnification payments (Sections 8.1/8.2) and bodily injury/tangible property claims are excluded from the cap, with no carve-out for breach of confidentiality, data protection or security obligations, gross negligence, wilful misconduct, fraud or IP infringement. This is aggravated by Section 6, which provides that Sections 5, 9 and 10 prevail over the AECI for confidential information in the hosting environment, and by Section 9.1(2), which bars any recovery for loss of or damage to Customer's records or data. We propose a single mutual "Excluded Claims" provision rather than rewriting the section.
- Proposal: **preferred** — Reset both liability caps to the greater of USD 1,000,000 and fees paid or payable in the 12 months preceding the claim, and add a mutual Excluded Claims provision with payment obligations excluded from damages
- Comment: [Playbook] We have aligned both caps with our position - the greater of USD 1,000,000 and the fees paid or payable in the 12 months preceding the claim - and added a short mutual Excluded Claims provision so confidentiality, data protection and security breaches, indemnities, gross negligence, wilful misconduct, fraud and IP infringement sit outside the cap, with Customer's payment obligations confirmed not to be damages. Our fallback is the existing mutual 12 months' charges cap with carve-outs for indemnities, confidentiality, gross negligence and wilful misconduct.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "c. the amount of any other actual direct damages, up to the greater of USD 1,000,000 or the fees paid or payable in the 12 months preceding the claim related to the Services.",
    "oldText": "c. the amount of any other actual direct damages, up to the greater of $100,000 or the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim related to the Services.",
    "paragraphId": "p0112"
  },
  {
    "kind": "replace",
    "newText": "(c) the amount of any other actual direct damages, up to the greater of USD 1,000,000 or the fees paid or payable in the 12 months preceding the claim related to the Services.",
    "oldText": "(c) the amount of any other actual direct damages, up to the greater of $100,000 or the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim related to the Services.",
    "paragraphId": "p0119"
  },
  {
    "kind": "insert_after",
    "numbering": "9.3",
    "paragraphId": "p0121",
    "text": "9.3 Excluded Claims. Notwithstanding Sections 9.1, 9.2 and 10, the limitations and exclusions of liability in this Agreement do not apply to a party's breach of its confidentiality, data protection or security obligations, its indemnification obligations, its gross negligence, wilful misconduct or fraud, or its infringement of the other party's intellectual property rights. Customer's payment obligations under this Agreement are not damages for purposes of Sections 9.1, 9.2 and 10."
  }
]
```

### Verifier and repair feedback

- [seq 218](trajectory.jsonl#L218) **Verdict: fail** — precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor. precision position: preferred cap includes USD 1,000,000: Include the USD 1,000,000 limb of the preferred greater-of cap. precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow. Locked target was preferred, but the preferred cap mechanics were left untouched: the floor remains $100,000 rather than USD 1,000,000, and the fee limb is 'charges paid' anchored to 'the accrual of the first claim' rather than 'fees paid or payable in the 12 months preceding the claim'. The preferred element that Customer's payment obligations are not 'damages' for cap purposes is absent; the existing proviso only disapplies the Section 10 consequential-damages exclusion, not the monetary cap. The inserted 9.3 fully delivers the preferred carve-out set (confidentiality, data protection/security, indemnities, gross negligence, wilful misconduct, fraud, IP infringement) mutually and overrides Sections 9.1, 9.2 and 10. The result sits at the fallback: mutual 12-months'-charges cap with the required four carve-outs, so the clause is acceptable and would not be redlined further, but the drafter's stated preferred target was not achieved. Minimality is satisfied — a single concise inserted sentence for an absent Excluded Claims provision, with no rewrite of surrounding text and no new exceptions; note only that 'AECI' relies on the agreement's attachment definition. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: cap references 12 months of fees or a fixed floor","ok":true}; {"name":"official check: no unlimited Customer liability language remains","ok":true}; {"name":"precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor","ok":false,"detail":"Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor."}; {"name":"precision position: preferred cap includes USD 1,000,000","ok":false,"detail":"Include the USD 1,000,000 limb of the preferred greater-of cap."}; {"name":"precision position: Customer payment obligations are not damages","ok":false,"detail":"State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow."}; {"name":"official minimality gate","ok":true}.
- [seq 219](trajectory.jsonl#L219) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Cap limb (a): fees paid or payable in the 12 months preceding the claim\n Verdict: not_met. Evidence: \"the charges paid by Customer to IBM for the Services in the twelve (12) months immediately preceding the accrual of the first claim\" — paid-only and anchored to the first claim, not 'paid or payable ... preceding the claim'\n- Cap limb (b): USD 1,000,000 floor\n Verdict: not_met. Evidence: \"up to the greater of $100,000 or the charges paid\" — floor is $100,000, not USD 1,000,000\n- Customer's payment obligations are not 'damages' for cap purposes\n Verdict: not_met. Evidence: Only the consequential-damages exclusion is disapplied: \"this Section 10 does not apply to Customer's failure to pay any amounts owing to IBM\"; nothing states payment obligations are outside the liability cap\n\nDeterministic official failures:\n- precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor.\n- precision position: preferred cap includes USD 1,000,000: Include the USD 1,000,000 limb of the preferred greater-of cap.\n- precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow.\n\nVerifier reasons:\n- Locked target was preferred, but the preferred cap mechanics were left untouched: the floor remains $100,000 rather than USD 1,000,000, and the fee limb is 'charges paid' anchored to 'the accrual of the first claim' rather than 'fees paid or payable in the 12 months preceding the claim'.\n- The preferred element that Customer's payment obligations are not 'damages' for cap purposes is absent; the existing proviso only disapplies the Section 10 consequential-damages exclusion, not the monetary cap.\n- The inserted 9.3 fully delivers the preferred carve-out set (confidentiality, data protection/security, indemnities, gross negligence, wilful misconduct, fraud, IP infringement) mutually and overrides Sections 9.1, 9.2 and 10.\n- The result sits at the fallback: mutual 12-months'-charges cap with the required four carve-outs, so the clause is acceptable and would not be redlined further, but the drafter's stated preferred target was not achieved.\n- Minimality is satisfied — a single concise inserted sentence for an absent Excluded Claims provision, with no rewrite of surrounding text and no new exceptions; note only that 'AECI' relies on the agreement's attachment definition."
- [seq 300](trajectory.jsonl#L300) **Verdict: repaired** — All preferred atomic elements are present: both caps were reset to the greater of USD 1,000,000 and fees paid or payable in the 12 months preceding the claim, the pre-existing mutual consequential-damages exclusion is untouched, and a single concise mutual Excluded Claims provision supplies every required uncapped carve-out plus the payment-obligations-are-not-damages statement. Edits are minimal: two surgical replacements of the cap figure/fee basis and one short inserted paragraph for the absent carve-out clause; no whole-clause rewrite and no imported fallback-only language. Intent preserved: the cumulative-maximum, Affiliate/Subcontractor allocation, indemnification limbs and Section 10 payment proviso remain effective; the inserted clause uses existing defined terms and cross-references (Sections 9.1, 9.2, 10) without creating dangling mechanics. Fallback is not independently satisfied on its literal cap wording (a greater-of cap is not a cap of 12 months' fees), but the locked target is preferred, which is met, so this is not a deficiency. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"official check: cap references 12 months of fees or a fixed floor","ok":true}; {"name":"official check: no unlimited Customer liability language remains","ok":true}; {"name":"precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor","ok":true}; {"name":"precision position: preferred cap includes USD 1,000,000","ok":true}; {"name":"precision position: Customer payment obligations are not damages","ok":true}; {"name":"official minimality gate","ok":true}.

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
{"sectionId":"sec-8.1"}
```

- [seq 20](trajectory.jsonl#L20) **read_section result**

```json
{"sectionRef":"§ 8.1 Indemnification by IBM","paragraphs":[{"id":"p0088","text":"8.1 Indemnification by IBM"},{"id":"p0089","text":"If a third party claims or threatens a claim that Materials or Base Components IBM provides to Customer or uses in connection with the performance of the Services infringe that party's patent, trademark, copyright, or trade secret, then IBM will indemnify, defend and…
```

- [seq 21](trajectory.jsonl#L21) **drafter → read_section**

```json
{"sectionId":"sec-8.2"}
```

- [seq 22](trajectory.jsonl#L22) **read_section result**

```json
{"sectionRef":"§ 8.2 Indemnification by Customer","paragraphs":[{"id":"p0097","text":"8.2 Indemnification by Customer"},{"id":"p0098","text":"a. Customer will defend IBM and its Enterprise and their employees, officers, and directors against any third party claim (and pay all damages that a court of competent jurisdiction awards, or which Customer agrees in any final settlement to such third part…
```

- [seq 71](trajectory.jsonl#L71) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 72](trajectory.jsonl#L72) **read_section result**

```json
{"sectionRef":"§ 1 promptly notify Customer in writing of the claim; and","paragraphs":[{"id":"p0104","text":"1. promptly notify Customer in writing of the claim; and"},{"id":"p0105","text":"2. allow Customer to control, and will cooperate with Customer in, the defense and any related settlement negotiations."},{"id":"p0106","text":"c. Notwithstanding anything else to the contrary contained herei…
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"Services Recipient"}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ Preamble","snippet":"…c, graphics, images, applets or servlets that Customer or its Subcontractors or Services Recipients create, install, upload or transfer in or through the e-business Hosting Envir…"},{"paragraphId":"p0029","sectionRef":"§ Preamble","snippet":"n. \"Services Recipients\" means any entities or individuals receiving or using the Services, o…
```

- [seq 127](trajectory.jsonl#L127) **drafter → search**

```json
{"query":"Limitation of Liability","limit":10}
```

- [seq 128](trajectory.jsonl#L128) **search result**

```json
[{"paragraphId":"p0107","sectionRef":"§ 1 promptly notify Customer in writing of the claim; and","snippet":"…--------------------------------------------------------------------------- 9.0 Limitation of Liability"},{"paragraphId":"p0108","sectionRef":"§ 9.1 IBM's Limitation of Liability","snippet":"9.1 IBM's Limitation of Liability"},{"paragraphId":"p0115","sectionRef":"§ 9.2 Customer's Limitatio…
```

- [seq 147](trajectory.jsonl#L147) **drafter → read_section**

```json
{"sectionId":"sec-9.1"}
```

- [seq 148](trajectory.jsonl#L148) **read_section result**

```json
{"sectionRef":"§ 9.1 IBM's Limitation of Liability","paragraphs":[{"id":"p0108","text":"9.1 IBM's Limitation of Liability"},{"id":"p0109","text":"Circumstances may arise where, because of a default on IBM's part or other liability, Customer is entitled to recover damages from IBM. Regardless of the basis on which Customer is entitled to claim damages from IBM (including fundamental breach, neglig…
```

- [seq 172](trajectory.jsonl#L172) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0089","p0091","p0092","p0098","p0106","p0110"],"quote":"If a third party claims or threatens a claim that Materials or Base Components IBM provides to Customer or uses in connection with the performance of the Services infringe that party's patent, trademark, copyright, or trade secret, then IBM will indemnify, defend and hold harmless the Customer, its Enterprise and their respective employees, officers, agents and directors against that claim or threatened claim at IBM's expense and pay all costs, damages, penalties and reasonable attorneys' fees that a court finally awards in connection with that claim","rationale":"Section 8.1 gives us a Vendor (IBM) defence and indemnity for third-party claims that the Materials or Base Components infringe patent, trademark, copyright or trade secret rights, extending to our Enterprise and personnel, with the usual exclusions (our content, our modifications, combinations with non-IBM products, non-IBM hardware/software) and the usual remedy ladder (procure continued use, modify, replace, or refund). Procedure is standard (prompt notice, IBM control, our cooperation, with IBM reimbursing our cooperation costs). Section 9.1(a) carves Section 8.1 indemnification payments out of IBM's liability cap, so the indemnity is effectively uncapped — better than the 3x super-cap fallback. This sits at (and in parts above) the fallback position and is not redlined. Noted but not flagged as sub-elements short of preferred: the indemnity does not separately cover IBM's breach of law, data breach or gross negligence/wilful misconduct, and the refund remedy is capped at twelve months of applicable charges. Our indemnity in 8.2 is broader than the preferred \"content and breach of law\" formulation (it includes Services Recipient claims related to the Services), but it is materially cut back by 8.2(c), which relieves us to the extent IBM's bad faith, wilful misconduct, gross negligence or breach caused the damages; that is not a one-way or walk-away outcome given IBM's own indemnity is in place.","confidence":0.76}
```

- [seq 173](trajectory.jsonl#L173) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 172](trajectory.jsonl#L172)
- Finding: `f-indemn-02fdf87d` · **compliant** · confidence 0.76
- Location: § 8.1 Indemnification by IBM
- Quote: “If a third party claims or threatens a claim that Materials or Base Components IBM provides to Customer or uses in connection with the performance of the Services infringe that party's patent, trademark, copyright, or trade secret, then IBM will indemnify, defend and hold harmless the Customer, its Enterprise and their respective employees, officers, agents and directors against that claim or threatened claim at IBM's expense and pay all costs, damages, penalties and reasonable attorneys' fees that a court finally awards in connection with that claim”
- Rationale: Section 8.1 gives us a Vendor (IBM) defence and indemnity for third-party claims that the Materials or Base Components infringe patent, trademark, copyright or trade secret rights, extending to our Enterprise and personnel, with the usual exclusions (our content, our modifications, combinations with non-IBM products, non-IBM hardware/software) and the usual remedy ladder (procure continued use, modify, replace, or refund). Procedure is standard (prompt notice, IBM control, our cooperation, with IBM reimbursing our cooperation costs). Section 9.1(a) carves Section 8.1 indemnification payments out of IBM's liability cap, so the indemnity is effectively uncapped — better than the 3x super-cap fallback. This sits at (and in parts above) the fallback position and is not redlined. Noted but not flagged as sub-elements short of preferred: the indemnity does not separately cover IBM's breach of law, data breach or gross negligence/wilful misconduct, and the refund remedy is capped at twelve months of applicable charges. Our indemnity in 8.2 is broader than the preferred "content and breach of law" formulation (it includes Services Recipient claims related to the Services), but it is materially cut back by 8.2(c), which relieves us to the extent IBM's bad faith, wilful misconduct, gross negligence or breach caused the damages; that is not a one-way or walk-away outcome given IBM's own indemnity is in place.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

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
{"sectionId":"sec-14.16"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 14.16 Freedom of Action","paragraphs":[{"id":"p0199","text":"14.16 Freedom of Action"},{"id":"p0200","text":"Each party is free to enter into similar agreements with others."}]}
```

- [seq 27](trajectory.jsonl#L27) **drafter → read_section**

```json
{"sectionId":"sec-14.11"}
```

- [seq 28](trajectory.jsonl#L28) **read_section result**

```json
{"sectionRef":"§ 14.11 No Resale","paragraphs":[{"id":"p0189","text":"14.11 No Resale"},{"id":"p0190","text":"Customer shall not resell the Services, in whole or in part."}]}
```

- [seq 29](trajectory.jsonl#L29) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 30](trajectory.jsonl#L30) **read_section result**

```json
{"sectionRef":"§ 13.2 Acceptable Use Policy","paragraphs":[{"id":"p0161","text":"13.2 Acceptable Use Policy"},{"id":"p0162","text":"IBM, in its reasonable discretion, may modify the Acceptable Use Policy upon thirty (30) days' notice to Customer."}]}
```

- [seq 59](trajectory.jsonl#L59) **drafter → search**

```json
{"query":"compet"}
```

- [seq 60](trajectory.jsonl#L60) **search result**

```json
[{"paragraphId":"p0061","sectionRef":"§ 5.1 IBM Representations and Warranties","snippet":"…th respect to work of a similar nature); and that it will provide Customer with competent, fully trained, fully qualified and responsible personnel to perform the Ser…"},{"paragraphId":"p0098","sectionRef":"§ 8.2 Indemnification by Customer","snippet":"…nd directors against any third party claim (and pay a…
```

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"shall not develop"}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[]
```

- [seq 95](trajectory.jsonl#L95) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 96](trajectory.jsonl#L96) **search result**

```json
[{"paragraphId":"p0057","sectionRef":"§ 4.3 Taxes","snippet":"…rnmental authorities. Charges specified herein (including in an Order Form) are exclusive of any such taxes, duties, levies or fees."},{"paragraphId":"p0064","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"5.2 Exclusivity of Warranties"},{"paragraphId":"p0065","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"THE WAR…
```

- [seq 97](trajectory.jsonl#L97) **drafter → search**

```json
{"query":"Customer shall not","limit":30}
```

- [seq 98](trajectory.jsonl#L98) **search result**

```json
[{"paragraphId":"p0190","sectionRef":"§ 14.11 No Resale","snippet":"Customer shall not resell the Services, in whole or in part."}]
```

- [seq 131](trajectory.jsonl#L131) **drafter → list_sections**

```json
{}
```

- [seq 132](trajectory.jsonl#L132) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 157](trajectory.jsonl#L157) **drafter → read_section**

```json
{"sectionId":"sec-14.19"}
```

- [seq 158](trajectory.jsonl#L158) **read_section result**

```json
{"sectionRef":"§ 14.19 Geographic Scope","paragraphs":[{"id":"p0205","text":"14.19 Geographic Scope"},{"id":"p0206","text":"Although it is possible that Services Recipients outside of the United States of America may access Customer's Web site, IBM's delivery of the Services will only occur within the United States of America, and IBM's obligations hereunder are valid only in the United States of…
```

- [seq 159](trajectory.jsonl#L159) **drafter → read_section**

```json
{"sectionId":"sec-14.17"}
```

- [seq 160](trajectory.jsonl#L160) **read_section result**

```json
{"sectionRef":"§ 14.17 Limitation of Licenses","paragraphs":[{"id":"p0201","text":"14.17 Limitation of Licenses"},{"id":"p0202","text":"Each of us grants only the licenses expressly specified herein. No other licenses or rights (including licenses or rights under patents) are granted."}]}
```

- [seq 161](trajectory.jsonl#L161) **drafter → read_section**

```json
{"sectionId":"sec-14.8"}
```

- [seq 162](trajectory.jsonl#L162) **read_section result**

```json
{"sectionRef":"§ 14.8 Personnel","paragraphs":[{"id":"p0181","text":"14.8 Personnel"},{"id":"p0182","text":"Each party is responsible for the supervision, direction, and control of its respective personnel. IBM reserves the right to determine the assignment of its personnel. IBM may subcontract portions of"},{"id":"p0183","text":"8"},{"id":"p0184","text":"the Services to Subcontractors and Affili…
```

- [seq 183](trajectory.jsonl#L183) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0200","p0190"],"quote":"Each party is free to enter into similar agreements with others.","rationale":"The Agreement contains no non-compete, exclusivity or field-of-use covenant binding Bluefly. Searches for \"compet\", \"exclusiv\" and \"Customer shall not\" return no restriction on the businesses we may operate or the products we may buy or build; § 14.16 (Freedom of Action) affirmatively preserves each party's freedom to contract with others, and § 14.17 merely confirms no implied licenses. The only prohibition on us is § 14.11 (Customer shall not resell the Services), which is a scope-of-use/resale limit on the vendor's own Services rather than a restraint on our business lines, and § 14.19 limits IBM's delivery geography, not our operations. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is warranted.","confidence":0.9}
```

- [seq 184](trajectory.jsonl#L184) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 183](trajectory.jsonl#L183)
- Finding: `f-noncompete-ab397129` · **compliant** · confidence 0.90
- Location: § 14.16 Freedom of Action
- Quote: “Each party is free to enter into similar agreements with others.”
- Rationale: The Agreement contains no non-compete, exclusivity or field-of-use covenant binding Bluefly. Searches for "compet", "exclusiv" and "Customer shall not" return no restriction on the businesses we may operate or the products we may buy or build; § 14.16 (Freedom of Action) affirmatively preserves each party's freedom to contract with others, and § 14.17 merely confirms no implied licenses. The only prohibition on us is § 14.11 (Customer shall not resell the Services), which is a scope-of-use/resale limit on the vendor's own Services rather than a restraint on our business lines, and § 14.19 limits IBM's delivery geography, not our operations. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is warranted.

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

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"exclusive","limit":30}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0057","sectionRef":"§ 4.3 Taxes","snippet":"…rnmental authorities. Charges specified herein (including in an Order Form) are exclusive of any such taxes, duties, levies or fees."},{"paragraphId":"p0065","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"THE WARRANTIES IN SECTION 5.1 ARE THE EXCLUSIVE WARRANTIES FROM IBM. THEY REPLACE ALL OTHER WARRANTIES, INCLUDING, WITHO…
```

- [seq 35](trajectory.jsonl#L35) **drafter → read_section**

```json
{"sectionId":"sec-14.16"}
```

- [seq 36](trajectory.jsonl#L36) **read_section result**

```json
{"sectionRef":"§ 14.16 Freedom of Action","paragraphs":[{"id":"p0199","text":"14.16 Freedom of Action"},{"id":"p0200","text":"Each party is free to enter into similar agreements with others."}]}
```

- [seq 65](trajectory.jsonl#L65) **drafter → search**

```json
{"query":"sole","limit":30}
```

- [seq 66](trajectory.jsonl#L66) **search result**

```json
[{"paragraphId":"p0132","sectionRef":"§ 11.3 Suspected Violations","snippet":"…etermines that a breach of any such warranty has occurred, then IBM may, in its sole and reasonable discretion:"},{"paragraphId":"p0144","sectionRef":"§ 11.6 Content and Digital Certificates","snippet":"Customer is solely responsible for:"},{"paragraphId":"p0149","sectionRef":"§ 12.1 License","snippet":"…BM grants Cust…
```

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"all of its requirements","limit":20}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[]
```

- [seq 105](trajectory.jsonl#L105) **drafter → search**

```json
{"query":"from any third party","limit":20}
```

- [seq 106](trajectory.jsonl#L106) **search result**

```json
[]
```

- [seq 107](trajectory.jsonl#L107) **drafter → search**

```json
{"query":"competitor","limit":20}
```

- [seq 108](trajectory.jsonl#L108) **search result**

```json
[]
```

- [seq 139](trajectory.jsonl#L139) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0199","p0200"],"quote":"Each party is free to enter into similar agreements with others.","rationale":"No exclusivity, sole-source or requirements commitment binds Bluefly anywhere in the agreement. Searches for \"exclusive\", \"sole\", \"all of its requirements\", \"from any third party\" and \"competitor\" return only warranty-disclaimer language (§ 5.2), tax language (§ 4.3), and nonexclusive licences granted by IBM to Customer (§§ 5.4, 12.1) — none restricts our freedom to procure elsewhere. Section 14.16 (Freedom of Action) affirmatively confirms each party may enter into similar agreements with others, so we retain the right to buy hosting services from other suppliers. This meets the preferred position (no exclusivity obligation on Customer); no redline required.","confidence":0.92}
```

- [seq 140](trajectory.jsonl#L140) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 183](trajectory.jsonl#L183)
- Finding: `f-exclusivity-a511e077` · **compliant** · confidence 0.92
- Location: § 14.16 Freedom of Action
- Quote: “Each party is free to enter into similar agreements with others.”
- Rationale: No exclusivity, sole-source or requirements commitment binds Bluefly anywhere in the agreement. Searches for "exclusive", "sole", "all of its requirements", "from any third party" and "competitor" return only warranty-disclaimer language (§ 5.2), tax language (§ 4.3), and nonexclusive licences granted by IBM to Customer (§§ 5.4, 12.1) — none restricts our freedom to procure elsewhere. Section 14.16 (Freedom of Action) affirmatively confirms each party may enter into similar agreements with others, so we retain the right to buy hosting services from other suppliers. This meets the preferred position (no exclusivity obligation on Customer); no redline required.

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

- [seq 45](trajectory.jsonl#L45) **drafter → search**

```json
{"query":"most favoured"}
```

- [seq 46](trajectory.jsonl#L46) **search result**

```json
[]
```

- [seq 47](trajectory.jsonl#L47) **drafter → search**

```json
{"query":"no less favorable"}
```

- [seq 48](trajectory.jsonl#L48) **search result**

```json
[]
```

- [seq 49](trajectory.jsonl#L49) **drafter → list_sections**

```json
{}
```

- [seq 50](trajectory.jsonl#L50) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 85](trajectory.jsonl#L85) **drafter → read_section**

```json
{"sectionId":"sec-4.1"}
```

- [seq 86](trajectory.jsonl#L86) **read_section result**

```json
{"sectionRef":"§ 4.1 Charges","paragraphs":[{"id":"p0051","text":"4.1 Charges"},{"id":"p0052","text":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments."}]}
```

- [seq 87](trajectory.jsonl#L87) **drafter → read_section**

```json
{"sectionId":"sec-14.16"}
```

- [seq 88](trajectory.jsonl#L88) **read_section result**

```json
{"sectionRef":"§ 14.16 Freedom of Action","paragraphs":[{"id":"p0199","text":"14.16 Freedom of Action"},{"id":"p0200","text":"Each party is free to enter into similar agreements with others."}]}
```

- [seq 89](trajectory.jsonl#L89) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 90](trajectory.jsonl#L90) **search result**

```json
[]
```

- [seq 91](trajectory.jsonl#L91) **drafter → search**

```json
{"query":"pricing"}
```

- [seq 92](trajectory.jsonl#L92) **search result**

```json
[]
```

- [seq 117](trajectory.jsonl#L117) **drafter → search**

```json
{"query":"price"}
```

- [seq 118](trajectory.jsonl#L118) **search result**

```json
[{"paragraphId":"p0160","sectionRef":"§ 13.1 Services","snippet":"…ts, upon at least ninety (90) days prior notice to Customer. IBM may change the prices of Service Option Attachments after twelve (12) months following the applicabl…"}]
```

- [seq 119](trajectory.jsonl#L119) **drafter → search**

```json
{"query":"best"}
```

- [seq 120](trajectory.jsonl#L120) **search result**

```json
[]
```

- [seq 121](trajectory.jsonl#L121) **drafter → search**

```json
{"query":"competitor"}
```

- [seq 122](trajectory.jsonl#L122) **search result**

```json
[]
```

- [seq 123](trajectory.jsonl#L123) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 124](trajectory.jsonl#L124) **search result**

```json
[{"paragraphId":"p0057","sectionRef":"§ 4.3 Taxes","snippet":"…rnmental authorities. Charges specified herein (including in an Order Form) are exclusive of any such taxes, duties, levies or fees."},{"paragraphId":"p0064","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"5.2 Exclusivity of Warranties"},{"paragraphId":"p0065","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"THE WAR…
```

- [seq 151](trajectory.jsonl#L151) **drafter → read_section**

```json
{"sectionId":"sec-14.11"}
```

- [seq 152](trajectory.jsonl#L152) **read_section result**

```json
{"sectionRef":"§ 14.11 No Resale","paragraphs":[{"id":"p0189","text":"14.11 No Resale"},{"id":"p0190","text":"Customer shall not resell the Services, in whole or in part."}]}
```

- [seq 153](trajectory.jsonl#L153) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 154](trajectory.jsonl#L154) **search result**

```json
[]
```

- [seq 179](trajectory.jsonl#L179) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0200","p0052"],"quote":"Each party is free to enter into similar agreements with others.","rationale":"Searches for most-favoured-nation, \"no less favorable/favourable\", best-pricing, price-matching and comparable undertakings return nothing, and the commercial provisions (§4.1 Charges, §13.1 pricing changes, §14.11 No Resale) impose no obligation on Customer to extend IBM terms given to third parties or to match third-party offers. §14.16 (Freedom of Action) confirms each party may contract freely with others. This meets the preferred position (no MFN obligation burdening Customer); no vendor-granted MFN exists in our favour, but its absence is not a rule breach. No redline required.","confidence":0.88}
```

- [seq 180](trajectory.jsonl#L180) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 183](trajectory.jsonl#L183)
- Finding: `f-mfn-dbd2cf32` · **compliant** · confidence 0.88
- Location: § 14.16 Freedom of Action
- Quote: “Each party is free to enter into similar agreements with others.”
- Rationale: Searches for most-favoured-nation, "no less favorable/favourable", best-pricing, price-matching and comparable undertakings return nothing, and the commercial provisions (§4.1 Charges, §13.1 pricing changes, §14.11 No Resale) impose no obligation on Customer to extend IBM terms given to third parties or to match third-party offers. §14.16 (Freedom of Action) confirms each party may contract freely with others. This meets the preferred position (no MFN obligation burdening Customer); no vendor-granted MFN exists in our favour, but its absence is not a rule breach. No redline required.

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

- [seq 39](trajectory.jsonl#L39) **drafter → read_section**

```json
{"sectionId":"sec-14.8"}
```

- [seq 40](trajectory.jsonl#L40) **read_section result**

```json
{"sectionRef":"§ 14.8 Personnel","paragraphs":[{"id":"p0181","text":"14.8 Personnel"},{"id":"p0182","text":"Each party is responsible for the supervision, direction, and control of its respective personnel. IBM reserves the right to determine the assignment of its personnel. IBM may subcontract portions of"},{"id":"p0183","text":"8"},{"id":"p0184","text":"the Services to Subcontractors and Affili…
```

- [seq 41](trajectory.jsonl#L41) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 42](trajectory.jsonl#L42) **search result**

```json
[]
```

- [seq 77](trajectory.jsonl#L77) **drafter → search**

```json
{"query":"hire"}
```

- [seq 78](trajectory.jsonl#L78) **search result**

```json
[]
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"employ"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[{"paragraphId":"p0018","sectionRef":"§ Preamble","snippet":"e. \"Content Administrator\" means an employee or Subcontractor of Customer who is authorized by Customer to install, upload…"},{"paragraphId":"p0089","sectionRef":"§ 8.1 Indemnification by IBM","snippet":"…ify, defend and hold harmless the Customer, its Enterprise and their respective employees, officers, agents and directors against t…
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"induce"}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[]
```

- [seq 111](trajectory.jsonl#L111) **drafter → search**

```json
{"query":"personnel"}
```

- [seq 112](trajectory.jsonl#L112) **search result**

```json
[{"paragraphId":"p0061","sectionRef":"§ 5.1 IBM Representations and Warranties","snippet":"…provide Customer with competent, fully trained, fully qualified and responsible personnel to perform the Services; and"},{"paragraphId":"p0181","sectionRef":"§ 14.8 Personnel","snippet":"14.8 Personnel"},{"paragraphId":"p0182","sectionRef":"§ 14.8 Personnel","snippet":"…ty is responsible for the supervisio…
```

- [seq 113](trajectory.jsonl#L113) **drafter → search**

```json
{"query":"recruit"}
```

- [seq 114](trajectory.jsonl#L114) **search result**

```json
[]
```

- [seq 143](trajectory.jsonl#L143) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0181","p0182","p0184"],"quote":"Each party is responsible for the supervision, direction, and control of its respective personnel. IBM reserves the right to determine the assignment of its personnel. IBM may subcontract portions of","rationale":"Section 14.8 (Personnel) — the natural home for any hiring restriction — addresses only supervision, assignment and subcontracting; it imposes no hiring or solicitation restraint on Customer. Full-text searches for \"solicit\", \"hire\", \"induce\", \"recruit\", \"employ\" and \"personnel\" return no non-solicitation or no-hire covenant anywhere in the agreement. Bluefly is therefore under no restrictive covenant regarding IBM personnel, which is the playbook's preferred position (no non-solicit on Customer); no redline is warranted.","confidence":0.9}
```

- [seq 144](trajectory.jsonl#L144) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 143](trajectory.jsonl#L143)
- Finding: `f-nosolicit-d9248d20` · **compliant** · confidence 0.90
- Location: § 14.8 Personnel
- Quote: “Each party is responsible for the supervision, direction, and control of its respective personnel. IBM reserves the right to determine the assignment of its personnel. IBM may subcontract portions of”
- Rationale: Section 14.8 (Personnel) — the natural home for any hiring restriction — addresses only supervision, assignment and subcontracting; it imposes no hiring or solicitation restraint on Customer. Full-text searches for "solicit", "hire", "induce", "recruit", "employ" and "personnel" return no non-solicitation or no-hire covenant anywhere in the agreement. Bluefly is therefore under no restrictive covenant regarding IBM personnel, which is the playbook's preferred position (no non-solicit on Customer); no redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 170](trajectory.jsonl#L170)

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

- [seq 198](trajectory.jsonl#L198) **drafter → list_sections**

```json
{}
```

- [seq 199](trajectory.jsonl#L199) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 200](trajectory.jsonl#L200) **drafter → read_section**

```json
{"sectionId":"sec-3.4"}
```

- [seq 201](trajectory.jsonl#L201) **read_section result**

```json
{"sectionRef":"§ 3.4 Termination for Convenience","paragraphs":[{"id":"p0043","text":"3.4 Termination for Convenience"},{"id":"p0044","text":"Customer may terminate this Agreement (including all Service Option Attachments) or any Service Option Attachment (with the exception of any Service Option Attachment that is a prerequisite for the provision of Services under a non-terminated Service Option…
```

- [seq 234](trajectory.jsonl#L234) **drafter → read_section**

```json
{"sectionId":"sec-3.5"}
```

- [seq 235](trajectory.jsonl#L235) **read_section result**

```json
{"sectionRef":"§ 3.5 Effect of&sbsp;Termination","paragraphs":[{"id":"p0048","text":"3.5 Effect of&sbsp;Termination"},{"id":"p0049","text":"Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under oth…
```

- [seq 236](trajectory.jsonl#L236) **drafter → read_section**

```json
{"sectionId":"sec-3.3"}
```

- [seq 237](trajectory.jsonl#L237) **read_section result**

```json
{"sectionRef":"§ 3.3 Termination for Cause","paragraphs":[{"id":"p0041","text":"3.3 Termination for Cause"},{"id":"p0042","text":"Customer or IBM may terminate this Agreement for material breach of this Agreement by the other upon written notice containing the specific nature and dates of the material breach. The breaching party will have thirty (30) days from receipt of notice to cure such breac…
```

- [seq 238](trajectory.jsonl#L238) **drafter → read_section**

```json
{"sectionId":"sec-4.1"}
```

- [seq 239](trajectory.jsonl#L239) **read_section result**

```json
{"sectionRef":"§ 4.1 Charges","paragraphs":[{"id":"p0051","text":"4.1 Charges"},{"id":"p0052","text":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments."}]}
```

- [seq 240](trajectory.jsonl#L240) **drafter → read_section**

```json
{"sectionId":"sec-3.1"}
```

- [seq 241](trajectory.jsonl#L241) **read_section result**

```json
{"sectionRef":"§ 3.1 Term","paragraphs":[{"id":"p0037","text":"3.1 Term"},{"id":"p0038","text":"This Agreement will be effective beginning on 12:01 a.m., Eastern Time, on the day after the date of last signature to these Base Terms (\"Effective Date\") and ending on the expiration and/or termination of all Service Option Attachments, unless the Agreement is terminated earlier in accordance with t…
```

- [seq 272](trajectory.jsonl#L272) **drafter → search**

```json
{"query":"early termination charge"}
```

- [seq 273](trajectory.jsonl#L273) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 3.3 Termination for Cause","snippet":"…ent IBM has so breached this Agreement IBM shall not be entitled to recover the early termination charges described in Section 3.4(b) below."},{"paragraphId":"p0046","sectionRef":"§ 3.4 Termination for Convenience","snippet":"b. paying the applicable early termination charges, if any, specified in Attachment A and appl…
```

- [seq 274](trajectory.jsonl#L274) **drafter → search**

```json
{"query":"IBM may terminate"}
```

- [seq 275](trajectory.jsonl#L275) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 3.3 Termination for Cause","snippet":"Customer or IBM may terminate this Agreement for material breach of this Agreement by the other upon written …"}]
```

- [seq 304](trajectory.jsonl#L304) **drafter → search**

```json
{"query":"Attachment A"}
```

- [seq 305](trajectory.jsonl#L305) **search result**

```json
[{"paragraphId":"p0009","sectionRef":"§ Preamble","snippet":"a. Attachment A: Facilities Services;"},{"paragraphId":"p0035","sectionRef":"§ Preamble","snippet":"IBM will perform the Services described in Attachment A and applicable Service Option Attachments."},{"paragraphId":"p0046","sectionRef":"§ 3.4 Termination for Convenience","snippet":"b. paying the applicable early termination charges, if…
```

- [seq 306](trajectory.jsonl#L306) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 307](trajectory.jsonl#L307) **search result**

```json
[{"paragraphId":"p0038","sectionRef":"§ 3.1 Term","snippet":"…n and/or termination of all Service Option Attachments, unless the Agreement is terminated earlier in accordance with the terms herein. The term of each Service Option A…"},{"paragraphId":"p0040","sectionRef":"§ 3.2 Renewal","snippet":"…urrent term for the applicable Service Option Attachment that it has elected to terminate such Servi…
```

- [seq 333](trajectory.jsonl#L333) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"Customer convenience termination on one month's notice but uncapped early termination charges; no prepaid fee refund"}
```

- [seq 334](trajectory.jsonl#L334) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 365](trajectory.jsonl#L365) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Cap early termination charges at three months' charges and add pro-rata refund of prepaid fees on convenience termination.","comment":"[Playbook] Our position is that convenience termination should be penalty-free with a pro-rata refund of prepaid fees; as a fallback we can accept an early termination charge capped at three months' charges, so we have capped the Attachment A charges and added the refund of amounts prepaid for periods after termination.","ops":[{"kind":"replace","paragraphId":"p0046","oldText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","newText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such early termination charges will not in the aggregate exceed three (3) months' Charges for the terminated Services."},{"kind":"insert_after","paragraphId":"p0046","text":"IBM will refund to Customer, within thirty (30) days after the effective date of such termination, any Charges prepaid by Customer for Services attributable to the period after that date."}]}
```

- [seq 366](trajectory.jsonl#L366) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0046","segments":[{"type":"equal","text":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments"},{"type":"insert","text":", provided that such early termination charges will not in the aggregate exceed three (3) months' Charges for the terminated Services"},{"type":"equal…
```

- [seq 399](trajectory.jsonl#L399) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0044","p0045","p0046"],"quote":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","rationale":"Section 3.4 gives Customer a convenience right on one month's notice (effective at month end), and IBM has no convenience termination right anywhere in the Agreement (only for-cause termination under 3.3) — both consistent with the preferred position. However, the right is conditioned on paying open-ended early termination charges cross-referenced to Attachment A and the Service Option Attachments, with no cap and no refund of prepaid Charges (3.5 only accelerates accrued amounts). An uncapped exit charge fails even the fallback, which permits an early-termination fee not exceeding three months' fees, so the exit right is not meaningfully penalty-free. Per the redline guidance we applied the fallback fee cap (three months' Charges) rather than deleting the charge outright, and added the pro-rata refund of prepaid Charges.","confidence":0.72,"proposal":{"level":"fallback","summary":"Cap early termination charges at three months' charges and add pro-rata refund of prepaid fees on convenience termination.","comment":"[Playbook] Our position is that convenience termination should be penalty-free with a pro-rata refund of prepaid fees; as a fallback we can accept an early termination charge capped at three months' charges, so we have capped the Attachment A charges and added the refund of amounts prepaid for periods after termination.","ops":[{"kind":"replace","paragraphId":"p0046","oldText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","newText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such early termination charges will not in the aggregate exceed three (3) months' Charges for the terminated Services."},{"kind":"insert_after","paragraphId":"p0046","text":"IBM will refund to Customer, within thirty (30) days after the effective date of such termination, any Charges prepaid by Customer for Services attributable to the period after that date."}]}}
```

- [seq 400](trajectory.jsonl#L400) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 702](trajectory.jsonl#L702)
- Finding: `f-t4c-f914c426` · **deviation** · confidence 0.72
- Location: § 3.4 Termination for Convenience
- Quote: “b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.”
- Rationale: Section 3.4 gives Customer a convenience right on one month's notice (effective at month end), and IBM has no convenience termination right anywhere in the Agreement (only for-cause termination under 3.3) — both consistent with the preferred position. However, the right is conditioned on paying open-ended early termination charges cross-referenced to Attachment A and the Service Option Attachments, with no cap and no refund of prepaid Charges (3.5 only accelerates accrued amounts). An uncapped exit charge fails even the fallback, which permits an early-termination fee not exceeding three months' fees, so the exit right is not meaningfully penalty-free. Per the redline guidance we applied the fallback fee cap (three months' Charges) rather than deleting the charge outright, and added the pro-rata refund of prepaid Charges.
- Proposal: **preferred** — Preferred T4C: 30 days' Customer convenience notice, pro-rata refund of prepaid Charges, and no IBM convenience termination during a committed term.
- Comment: [Playbook] We have moved this to our preferred position rather than the fallback, since the fallback would require lengthening our own notice period and granting IBM an end-of-term convenience exit it does not have today. The edit states Customer's notice as 30 days, adds the pro-rata refund of prepaid Charges, and confirms IBM has no convenience termination right during a committed term.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "a. providing at least 30 days' prior written notice to IBM; and",
    "oldText": "a. providing at least one month's prior written notice to IBM; and",
    "paragraphId": "p0045"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0047",
    "text": "Customer may terminate for convenience under this Section 3.4 without penalty, and IBM will refund any Charges prepaid for the period after the effective date of termination. IBM may not terminate this Agreement or any Service Option Attachment for convenience during any committed term."
  }
]
```

### Verifier and repair feedback

- [seq 451](trajectory.jsonl#L451) **Verdict: fail** — official check: Customer convenience termination present: failed precision position: fallback Vendor convenience termination is effective only at the end of a term: State expressly that Vendor may terminate for convenience only effective at the end of the then-current term. precision position: fallback Vendor convenience termination requires 90 days' notice: Require Vendor to give 90 days' notice for any permitted end-of-term convenience termination. official minimality gate: Operation 1 expands 18 words to 38 words (ratio 2.11 > 1.50); use a tighter edit or a separate insertion The drafter locked to fallback, but the inserted pro-rata prepaid-fee refund is a preferred-level element; mixing a preferred remedy into a fallback edit fails minimality without completing either bargain. The fallback's Vendor-side constraints (convenience termination only effective at the end of the then-current term, on 90 days' notice) are not expressed anywhere in the edit, so the fallback level is incomplete. Operation 1 rewrites limb (b) at more than twice its original length; the cap could be added as a short proviso or a separate one-sentence insertion (e.g. 'Early termination charges will not exceed three (3) months' Charges.'). Customer's one month's notice is shorter than the 60–90 day fallback band but is favourable to us, so it should be noted in the rationale rather than redlined. No undefined terms or dangling mechanics are introduced; 'Charges' and 'Services' track the Agreement's defined usage, so intent is preserved. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: Customer convenience termination present","ok":false}; {"name":"precision position: fallback Vendor convenience termination is effective only at the end of a term","ok":false,"detail":"State expressly that Vendor may terminate for convenience only effective at the end of the then-current term."}; {"name":"precision position: fallback Vendor convenience termination requires 90 days' notice","ok":false,"detail":"Require Vendor to give 90 days' notice for any permitted end-of-term convenience termination."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 18 words to 38 words (ratio 2.11 > 1.50); use a tighter edit or a separate insertion"}.
- [seq 452](trajectory.jsonl#L452) **Repair round 1**: "Current target level: fallback. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived fallback elements (repair these exact requirements):\n- Customer may terminate for convenience on 60–90 days' notice\n Verdict: not_met. Evidence: a. providing at least one month's prior written notice to IBM (roughly 30 days, shorter than the 60–90 day fallback band, though favourable to Customer)\n- Vendor convenience termination permitted only effective at the end of a term\n Verdict: cannot_tell. Evidence: No operative language in the redlined clause or supplied excerpt addresses any IBM termination-for-convenience right\n- Vendor end-of-term convenience termination requires 90 days' notice\n Verdict: cannot_tell. Evidence: No notice requirement is imposed on IBM anywhere in the edited text\n\nDeterministic official failures:\n- official check: Customer convenience termination present: failed\n- precision position: fallback Vendor convenience termination is effective only at the end of a term: State expressly that Vendor may terminate for convenience only effective at the end of the then-current term.\n- precision position: fallback Vendor convenience termination requires 90 days' notice: Require Vendor to give 90 days' notice for any permitted end-of-term convenience termination.\n- official minimality gate: Operation 1 expands 18 words to 38 words (ratio 2.11 > 1.50); use a tighter edit or a separate insertion\n\nOffending extra words to remove verbatim:\n- IBM will refund to Customer, within thirty (30) days after the effective date of such termination, any Charges prepaid by Customer for Services attributable to the period after that date.\n- provided that such early termination charges will not in the aggregate exceed three (3) months' Charges for the terminated Services\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- The drafter locked to fallback, but the inserted pro-rata prepaid-fee refund is a preferred-level element; mixing a preferred remedy into a fallback edit fails minimality without completing either bargain.\n- The fallback's Vendor-side constraints (convenience termination only effective at the end of the then-current term, on 90 days' notice) are not expressed anywhere in the edit, so the fallback level is incomplete.\n- Operation 1 rewrites limb (b) at more than twice its original length; the cap could be added as a short proviso or a separate one-sentence insertion (e.g. 'Early termination charges will not exceed three (3) months' Charges.').\n- Customer's one month's notice is shorter than the 60–90 day fallback band but is favourable to us, so it should be noted in the rationale rather than redlined.\n- No undefined terms or dangling mechanics are introduced; 'Charges' and 'Services' track the Agreement's defined usage, so intent is preserved."
- [seq 485](trajectory.jsonl#L485) **Verdict: fail** — All four preferred atomic elements are satisfied on the operative text: Customer convenience right, 30 days' notice, refund of prepaid Charges for the post-termination period, and an express bar on IBM convenience termination during a committed term. The inserted phrase "without penalty" goes beyond what the preferred position requires (notice period, pro-rata refund, no Vendor convenience right) and was not needed to complete the level; it should be deleted. "without penalty" directly contradicts retained subsection b, which still obliges Customer to pay "the applicable early termination charges, if any, specified in Attachment A", leaving an unresolved conflict about whether early termination charges survive. Minor, note-only points: the retained "at the end of any calendar month" limits when the 30-day notice can take effect, and the refund is expressed as prepaid Charges for the post-termination period rather than the words "pro-rata" — acceptable in substance. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: Customer convenience termination present","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 177](trajectory.jsonl#L177)

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

- [seq 192](trajectory.jsonl#L192) **drafter → read_section**

```json
{"sectionId":"sec-3.2"}
```

- [seq 193](trajectory.jsonl#L193) **read_section result**

```json
{"sectionRef":"§ 3.2 Renewal","paragraphs":[{"id":"p0039","text":"3.2 Renewal"},{"id":"p0040","text":"Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the app…
```

- [seq 194](trajectory.jsonl#L194) **drafter → read_section**

```json
{"sectionId":"sec-3.1"}
```

- [seq 195](trajectory.jsonl#L195) **read_section result**

```json
{"sectionRef":"§ 3.1 Term","paragraphs":[{"id":"p0037","text":"3.1 Term"},{"id":"p0038","text":"This Agreement will be effective beginning on 12:01 a.m., Eastern Time, on the day after the date of last signature to these Base Terms (\"Effective Date\") and ending on the expiration and/or termination of all Service Option Attachments, unless the Agreement is terminated earlier in accordance with t…
```

- [seq 228](trajectory.jsonl#L228) **drafter → read_section**

```json
{"sectionId":"sec-4.1"}
```

- [seq 229](trajectory.jsonl#L229) **read_section result**

```json
{"sectionRef":"§ 4.1 Charges","paragraphs":[{"id":"p0051","text":"4.1 Charges"},{"id":"p0052","text":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments."}]}
```

- [seq 230](trajectory.jsonl#L230) **drafter → lookup_precedent**

```json
{"ruleId":"RENEWAL","context":"Auto-renewal equal to prior term, 90-day non-renewal notice, no uplift cap"}
```

- [seq 231](trajectory.jsonl#L231) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 266](trajectory.jsonl#L266) **drafter → search**

```json
{"query":"renewal","limit":20}
```

- [seq 267](trajectory.jsonl#L267) **search result**

```json
[{"paragraphId":"p0039","sectionRef":"§ 3.2 Renewal","snippet":"3.2 Renewal"}]
```

- [seq 268](trajectory.jsonl#L268) **drafter → search**

```json
{"query":"increase","limit":20}
```

- [seq 269](trajectory.jsonl#L269) **search result**

```json
[{"paragraphId":"p0142","sectionRef":"§ 11.5 Capacity Planning","snippet":"…capacity required to support anticipated peaks in demand that may significantly increase Web site hits, transaction volumes, or otherwise increase system resource utili…"},{"paragraphId":"p0142","sectionRef":"§ 11.5 Capacity Planning","snippet":"…hat may significantly increase Web site hits, transaction volumes, or otherw…
```

- [seq 286](trajectory.jsonl#L286) **drafter → search**

```json
{"query":"Customer","limit":5}
```

- [seq 287](trajectory.jsonl#L287) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ Preamble","snippet":"…between International Business Machines Corporation (\"IBM\") and Bluefly, Inc. (\"Customer\"), IBM will provide Web hosting and related services (\"Services\") to Customer. …"},{"paragraphId":"p0008","sectionRef":"§ Preamble","snippet":"…(\"Customer\"), IBM will provide Web hosting and related services (\"Services\") to Customer. The …
```

- [seq 313](trajectory.jsonl#L313) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Cap renewal terms at 12 months, shorten non-renewal notice to 30 days, add 60-day renewal reminder and a cap on renewal price increases.","comment":"[Playbook] We have set renewals at 12 months with a 30-day non-renewal notice, a 60-day renewal reminder from IBM, and a cap on renewal price increases at the lesser of CPI and 3%; a renewal term matching the prior term can lock us into multi-year auto-renewals and a 90-day window is longer than we can accept. If helpful, we can live with a 60-day notice window and a 5% uplift cap as a fallback.","ops":[{"kind":"replace","paragraphId":"p0040","oldText":"Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.","newText":"Each Service Option Attachment will renew automatically for an additional term of twelve (12) months unless either party notifies the other party in writing at least thirty (30) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment. IBM will notify Customer in writing of the upcoming renewal, and of any Charges applicable to the renewal term, at least sixty (60) days prior to the end of the then-current term. Charges for any renewal term will not increase over the Charges for the immediately preceding term by more than the lesser of (i) the percentage increase in the Consumer Price Index over that term and (ii) three percent (3%)."}]}
```

- [seq 314](trajectory.jsonl#L314) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0040","segments":[{"type":"equal","text":"Each Service Option Attachment will renew automatically for an additional term "},{"type":"delete","text":"equal in duration to the previous term of the applicable Service Option Attachment "},{"type":"insert","text":"of twelve (12) months "},{"type":"equal","text":"unless either party notifies the other…
```

- [seq 357](trajectory.jsonl#L357) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0040"],"quote":"Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.","rationale":"§ 3.2 provides automatic renewal for a term equal in duration to the prior term, which produces automatic multi-year renewals wherever an Order Form term exceeds 12 months (walk-away territory), and requires 90 days' non-renewal notice, well beyond the fallback maximum of 60 days. Neither § 3.2 nor § 4.1 (Charges) contains any cap on renewal price increases, so renewal pricing is unpredictable. Redline sets renewals at 12 months, shortens the notice window to 30 days, adds a 60-day IBM renewal reminder and caps uplift at the lesser of CPI and 3%; a 60-day window with a 5% cap remains available as a fallback.","confidence":0.86,"proposal":{"level":"preferred","summary":"Cap renewal terms at 12 months, shorten non-renewal notice to 30 days, add 60-day renewal reminder and a cap on renewal price increases.","comment":"[Playbook] We have set renewals at 12 months with a 30-day non-renewal notice, a 60-day renewal reminder from IBM, and a cap on renewal price increases at the lesser of CPI and 3%; a renewal term matching the prior term can lock us into multi-year auto-renewals and a 90-day window is longer than we can accept. If helpful, we can live with a 60-day notice window and a 5% uplift cap as a fallback.","ops":[{"kind":"replace","paragraphId":"p0040","oldText":"Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.","newText":"Each Service Option Attachment will renew automatically for an additional term of twelve (12) months unless either party notifies the other party in writing at least thirty (30) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment. IBM will notify Customer in writing of the upcoming renewal, and of any Charges applicable to the renewal term, at least sixty (60) days prior to the end of the then-current term. Charges for any renewal term will not increase over the Charges for the immediately preceding term by more than the lesser of (i) the percentage increase in the Consumer Price Index over that term and (ii) three percent (3%)."}]}}
```

- [seq 358](trajectory.jsonl#L358) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 357](trajectory.jsonl#L357)
- Finding: `f-renewal-af2f4576` · **deviation** · confidence 0.86
- Location: § 3.2 Renewal
- Quote: “Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.”
- Rationale: § 3.2 provides automatic renewal for a term equal in duration to the prior term, which produces automatic multi-year renewals wherever an Order Form term exceeds 12 months (walk-away territory), and requires 90 days' non-renewal notice, well beyond the fallback maximum of 60 days. Neither § 3.2 nor § 4.1 (Charges) contains any cap on renewal price increases, so renewal pricing is unpredictable. Redline sets renewals at 12 months, shortens the notice window to 30 days, adds a 60-day IBM renewal reminder and caps uplift at the lesser of CPI and 3%; a 60-day window with a 5% cap remains available as a fallback.
- Proposal: **preferred** — Set renewals at 12 months with 30 days' non-renewal notice, and add a 60-day IBM renewal reminder plus a lesser-of-CPI-and-3% cap on renewal charges.
- Comment: [Playbook] We have set each renewal term at 12 months and shortened the non-renewal notice to 30 days' notice, since a renewal equal to the prior term can lock us into multi-year auto-renewals and 90 days' notice is longer than we can accept. The added sentence supplies the 60-day renewal reminder and caps renewal increases at the lesser of CPI and 3%.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Each Service Option Attachment will renew automatically for an additional term of 12 months unless either party notifies the other party in writing on at least 30 days' notice prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.",
    "oldText": "Each Service Option Attachment will renew automatically for an additional term equal in duration to the previous term of the applicable Service Option Attachment unless either party notifies the other party in writing at least ninety (90) days prior to the end of the then-current term for the applicable Service Option Attachment that it has elected to terminate such Service Option Attachment.",
    "paragraphId": "p0040"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0040",
    "text": "IBM will notify Customer in writing of the upcoming renewal at least 60 days prior to the end of the then-current term. Charges for any renewal term will not increase over the immediately preceding term by more than the lesser of the percentage increase in the Consumer Price Index and 3%."
  }
]
```

### Verifier and repair feedback

- [seq 425](trajectory.jsonl#L425) **Verdict: fail** — official check: non-renewal notice window ≤ 60 days: number not found by the official literal pattern official minimality gate: Operation 1 expands 62 words to 124 words (ratio 2.00 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.664 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters All four atomic preferred elements are present in operative text: 12-month auto-renewal, 30-day non-renewal notice available to Customer, a 60-day Vendor renewal reminder, and a lesser-of-CPI-and-3% cap on renewal charges; the fallback is also satisfied a fortiori. The mutual (either party) notice right and the tightened window benefit Customer, and the untouched surrounding mechanics (Service Option Attachment structure, then-current term reference) remain effective, so intent is preserved. Minimality fails on the margin: the reminder sentence adds a charges-disclosure obligation ("and of any Charges applicable to the renewal term") that the preferred position does not require, and the operation restates the whole paragraph (62 -> 124 words; changed-character ratio 0.664) where a targeted operator/number change plus two short inserted sentences would suffice. Remedy: keep the original sentence intact except for "of twelve (12) months" and "thirty (30)", and add the reminder and cap as a separate concise insertion without the charges-disclosure add-on. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: non-renewal notice window ≤ 60 days","ok":false,"detail":"number not found by the official literal pattern"}; {"name":"precision position: preferred automatic renewal includes the lesser-of-CPI-and-3% price cap","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 62 words to 124 words (ratio 2.00 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.664 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 426](trajectory.jsonl#L426) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official check: non-renewal notice window ≤ 60 days: number not found by the official literal pattern\n- official minimality gate: Operation 1 expands 62 words to 124 words (ratio 2.00 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.664 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- and of any Charges applicable to the renewal term,\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All four atomic preferred elements are present in operative text: 12-month auto-renewal, 30-day non-renewal notice available to Customer, a 60-day Vendor renewal reminder, and a lesser-of-CPI-and-3% cap on renewal charges; the fallback is also satisfied a fortiori.\n- The mutual (either party) notice right and the tightened window benefit Customer, and the untouched surrounding mechanics (Service Option Attachment structure, then-current term reference) remain effective, so intent is preserved.\n- Minimality fails on the margin: the reminder sentence adds a charges-disclosure obligation (\"and of any Charges applicable to the renewal term\") that the preferred position does not require, and the operation restates the whole paragraph (62 -> 124 words; changed-character ratio 0.664) where a targeted operator/number change plus two short inserted sentences would suffice.\n- Remedy: keep the original sentence intact except for \"of twelve (12) months\" and \"thirty (30)\", and add the reminder and cap as a separate concise insertion without the charges-disclosure add-on."
- [seq 489](trajectory.jsonl#L489) **Verdict: repaired** — All four preferred atomic elements are present in operative text: 12-month automatic renewal term, 30-day non-renewal notice available to Customer, a 60-day Vendor renewal reminder, and a lesser-of-CPI-and-3% cap on renewal charge increases. Edits are confined to the renewal sentence (term duration and notice period) plus one concise inserted sentence supplying the absent reminder and price-cap mechanics; the effective-date/term sentence and Order Form term reference are untouched. No new undefined terms, exceptions, or dangling mechanics; the mutual notice structure and 'then-current term' references remain coherent, and the fallback thresholds are also satisfied without borrowing across levels. Minor drafting nit only (noted, not a deviation): 'notifies ... in writing on at least 30 days' notice prior to the end' is slightly redundant phrasing where replacing 'ninety (90) days' with 'thirty (30) days' would have sufficed; it adds no substantive obligation. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}; {"name":"precision position: preferred automatic renewal includes the lesser-of-CPI-and-3% price cap","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 188](trajectory.jsonl#L188)

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

- [seq 207](trajectory.jsonl#L207) **drafter → read_section**

```json
{"sectionId":"sec-14.3"}
```

- [seq 208](trajectory.jsonl#L208) **read_section result**

```json
{"sectionRef":"§ 14.3 Choice of Law","paragraphs":[{"id":"p0170","text":"14.3 Choice of Law"},{"id":"p0171","text":"This Agreement will be governed by the substantive laws of the State of New York, without regard for its conflict of laws provisions."}]}
```

- [seq 209](trajectory.jsonl#L209) **drafter → read_section**

```json
{"sectionId":"sec-14.4"}
```

- [seq 210](trajectory.jsonl#L210) **read_section result**

```json
{"sectionRef":"§ 14.4 Waiver of Jury Trial","paragraphs":[{"id":"p0172","text":"14.4 Waiver of Jury Trial"},{"id":"p0173","text":"The parties waive any right to a jury trial in any proceeding arising out of or related to this Agreement."}]}
```

- [seq 211](trajectory.jsonl#L211) **drafter → read_section**

```json
{"sectionId":"sec-14.14"}
```

- [seq 212](trajectory.jsonl#L212) **read_section result**

```json
{"sectionRef":"§ 14.14 Actions Period","paragraphs":[{"id":"p0195","text":"14.14 Actions Period"},{"id":"p0196","text":"Neither party will bring a legal action related to this Agreement more than two years after the cause of action accrued."}]}
```

- [seq 244](trajectory.jsonl#L244) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 245](trajectory.jsonl#L245) **search result**

```json
[]
```

- [seq 246](trajectory.jsonl#L246) **drafter → search**

```json
{"query":"jurisdiction"}
```

- [seq 247](trajectory.jsonl#L247) **search result**

```json
[{"paragraphId":"p0098","sectionRef":"§ 8.2 Indemnification by Customer","snippet":"…rs against any third party claim (and pay all damages that a court of competent jurisdiction awards, or which Customer agrees in any final settlement to such third party an…"},{"paragraphId":"p0175","sectionRef":"§ 14.5 Severability","snippet":"If any provision of this Agreement shall be held by a court of compet…
```

- [seq 248](trajectory.jsonl#L248) **drafter → search**

```json
{"query":"venue"}
```

- [seq 249](trajectory.jsonl#L249) **search result**

```json
[]
```

- [seq 278](trajectory.jsonl#L278) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0171"],"quote":"This Agreement will be governed by the substantive laws of the State of New York, without regard for its conflict of laws provisions.","rationale":"Section 14.3 selects New York substantive law (with conflicts principles disapplied), which is our preferred governing law. There is no arbitration provision anywhere in the agreement and no foreign or vendor-home-jurisdiction forum, so disputes default to the courts; the walk-away scenarios (foreign exclusive venue or arbitration seated abroad) do not arise. The agreement contains no express exclusive-venue designation for New York County courts — a minor sub-element short of the preferred wording that we note rather than redline. Related dispute terms are benign and mutual: 14.4 waives jury trial for both parties and 14.14 imposes a mutual two-year contractual limitations period (a separate commercial term outside this rule).","confidence":0.9}
```

- [seq 279](trajectory.jsonl#L279) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 278](trajectory.jsonl#L278)
- Finding: `f-govlaw-f8c01cd3` · **compliant** · confidence 0.90
- Location: § 14.3 Choice of Law
- Quote: “This Agreement will be governed by the substantive laws of the State of New York, without regard for its conflict of laws provisions.”
- Rationale: Section 14.3 selects New York substantive law (with conflicts principles disapplied), which is our preferred governing law. There is no arbitration provision anywhere in the agreement and no foreign or vendor-home-jurisdiction forum, so disputes default to the courts; the walk-away scenarios (foreign exclusive venue or arbitration seated abroad) do not arise. The agreement contains no express exclusive-venue designation for New York County courts — a minor sub-element short of the preferred wording that we note rather than redline. Related dispute terms are benign and mutual: 14.4 waives jury trial for both parties and 14.14 imposes a mutual two-year contractual limitations period (a separate commercial term outside this rule).

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 205](trajectory.jsonl#L205)

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

- [seq 222](trajectory.jsonl#L222) **drafter → read_section**

```json
{"sectionId":"sec-14.10"}
```

- [seq 223](trajectory.jsonl#L223) **read_section result**

```json
{"sectionRef":"§ 14.10 Assignment","paragraphs":[{"id":"p0187","text":"14.10 Assignment"},{"id":"p0188","text":"Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquis…
```

- [seq 224](trajectory.jsonl#L224) **drafter → search**

```json
{"query":"assign"}
```

- [seq 225](trajectory.jsonl#L225) **search result**

```json
[{"paragraphId":"p0169","sectionRef":"§ 14.2 Survival","snippet":"… 12.3, and 14, and apply to both Customer's and IBM's respective successors and assignees."},{"paragraphId":"p0182","sectionRef":"§ 14.8 Personnel","snippet":"…nd control of its respective personnel. IBM reserves the right to determine the assignment of its personnel. IBM may subcontract portions of"},{"paragraphId":"p0187","secti…
```

- [seq 258](trajectory.jsonl#L258) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 259](trajectory.jsonl#L259) **search result**

```json
[]
```

- [seq 260](trajectory.jsonl#L260) **drafter → read_section**

```json
{"sectionId":"sec-14.7"}
```

- [seq 261](trajectory.jsonl#L261) **read_section result**

```json
{"sectionRef":"§ 14.7 No Third-Party Beneficiaries","paragraphs":[{"id":"p0179","text":"14.7 No Third-Party Beneficiaries"},{"id":"p0180","text":"Except as expressly provided in Section 8, this Agreement does not create any intended third party beneficiary rights."}]}
```

- [seq 282](trajectory.jsonl#L282) **drafter → lookup_precedent**

```json
{"ruleId":"ASSIGN","context":"One-sided assignment clause: Customer restricted with merger carve-out; IBM unrestricted; no affiliate carve-out"}
```

- [seq 283](trajectory.jsonl#L283) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 329](trajectory.jsonl#L329) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 330](trajectory.jsonl#L330) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 353](trajectory.jsonl#L353) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make assignment mutual: add affiliate/asset-sale carve-out for Customer and require Customer consent for IBM assignments","comment":"[Playbook] We have made the assignment clause reciprocal: we may assign to an affiliate or to a successor by merger, consolidation, acquisition or sale of substantially all assets on notice, and IBM likewise needs our consent (not unreasonably withheld) to assign, and may not assign to our competitor. As drafted only we were restricted while IBM could transfer the Agreement freely; we can accept a mutual notice-only successor right as a fallback.","ops":[{"kind":"replace","paragraphId":"p0188","oldText":"Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.","newText":"Customer may assign this Agreement, without IBM's consent, to an affiliate of Customer or to a successor organization by merger, consolidation, acquisition or sale of all or substantially all of its assets, upon written notice to IBM. Customer will not otherwise assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. IBM will not assign this Agreement or any of its rights hereunder without Customer's prior written consent, such consent not to be unreasonably withheld, and will not assign this Agreement to a competitor of Customer."}]}
```

- [seq 354](trajectory.jsonl#L354) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0188","segments":[{"type":"equal","text":"Customer "},{"type":"delete","text":"will not "},{"type":"insert","text":"may assign this Agreement, without IBM's consent, to an affiliate of Customer or to a successor organization by merger, consolidation, acquisition or sale of all or substantially all of its assets, upon written notice to IBM. Custo…
```

- [seq 387](trajectory.jsonl#L387) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0188"],"quote":"Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.","rationale":"Section 14.10 restricts only Customer: we need IBM's consent for assignments (with a merger/consolidation/acquisition carve-out), while IBM's own right to assign is entirely unrestricted. That one-sidedness fails even the fallback, which requires a mutual right to assign to successors and a reasonableness-qualified consent standard on both sides; it also leaves IBM free to transfer the Agreement to a competitor of ours. Secondary gaps (no affiliate carve-out, no sale-of-substantially-all-assets language) are addressed in the same edit. No change-of-control termination or re-pricing right in IBM's favour appears anywhere in the Agreement, so the walk-away trigger is not present. Redline makes the clause reciprocal and adds the affiliate/asset-sale carve-out.","confidence":0.76,"proposal":{"level":"preferred","summary":"Make assignment mutual: add affiliate/asset-sale carve-out for Customer and require Customer consent for IBM assignments","comment":"[Playbook] We have made the assignment clause reciprocal: we may assign to an affiliate or to a successor by merger, consolidation, acquisition or sale of substantially all assets on notice, and IBM likewise needs our consent (not unreasonably withheld) to assign, and may not assign to our competitor. As drafted only we were restricted while IBM could transfer the Agreement freely; we can accept a mutual notice-only successor right as a fallback.","ops":[{"kind":"replace","paragraphId":"p0188","oldText":"Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.","newText":"Customer may assign this Agreement, without IBM's consent, to an affiliate of Customer or to a successor organization by merger, consolidation, acquisition or sale of all or substantially all of its assets, upon written notice to IBM. Customer will not otherwise assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. IBM will not assign this Agreement or any of its rights hereunder without Customer's prior written consent, such consent not to be unreasonably withheld, and will not assign this Agreement to a competitor of Customer."}]}}
```

- [seq 388](trajectory.jsonl#L388) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 387](trajectory.jsonl#L387)
- Finding: `f-assign-67988114` · **deviation** · confidence 0.76
- Location: § 14.10 Assignment
- Quote: “Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.”
- Rationale: Section 14.10 restricts only Customer: we need IBM's consent for assignments (with a merger/consolidation/acquisition carve-out), while IBM's own right to assign is entirely unrestricted. That one-sidedness fails even the fallback, which requires a mutual right to assign to successors and a reasonableness-qualified consent standard on both sides; it also leaves IBM free to transfer the Agreement to a competitor of ours. Secondary gaps (no affiliate carve-out, no sale-of-substantially-all-assets language) are addressed in the same edit. No change-of-control termination or re-pricing right in IBM's favour appears anywhere in the Agreement, so the walk-away trigger is not present. Redline makes the clause reciprocal and adds the affiliate/asset-sale carve-out.
- Proposal: **preferred** — Extend Customer's consent-free assignment carve-out to affiliates and asset sales and restrict IBM's assignment to our reasonable consent, never to a competitor
- Comment: [Playbook] We have extended our existing consent-free carve-out to affiliates and to a sale of substantially all assets, and added one sentence making IBM's own assignment subject to our consent (not unreasonably withheld) and barring assignment to a competitor of ours. As drafted only we were restricted while IBM could transfer the Agreement freely, including to a competitor.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Notwithstanding the foregoing, Customer may assign this Agreement to an affiliate or a successor organization by merger, consolidation, acquisition or sale of substantially all assets.",
    "oldText": "Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition.",
    "paragraphId": "p0188"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0188",
    "text": "IBM will not assign this Agreement or any of its rights hereunder without Customer's prior written consent, such consent not to be unreasonably withheld, and will not assign this Agreement to a competitor of Customer."
  }
]
```

### Verifier and repair feedback

- [seq 437](trajectory.jsonl#L437) **Verdict: fail** — official minimality gate: Operation 1 expands 43 words to 99 words (ratio 2.30 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.721 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Preferred level is fully met: Customer gets consent-free affiliate and successor (including sale of substantially all assets) assignment, IBM is restricted by our reasonable-consent right, competitor assignments are barred, and no change-of-control termination right exists to limit. Fallback is not independently met because IBM's assignment right is consent-based rather than notice-only, but that is irrelevant given the locked preferred target. Minimality fails: the edit imports the fallback's notice condition ("upon written notice to IBM") onto our own consent-free assignment right, adding a burden the preferred position does not require. Minimality also fails the official gates (43 words expanded to 99, ratio 2.30; changed-character ratio 0.721); the reciprocity and competitor bar could have been added as a short inserted sentence while leaving the existing Customer sentences largely intact. Intent is preserved: the void-assignment sentence and Customer's continuing liability survive, and no undefined term or dangling mechanic is introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: successor/affiliate carve-out for Customer present","ok":true}; {"name":"precision position: preferred affiliate assignment is not limited by financial qualification","ok":true}; {"name":"precision position: preferred assignment adds no change-of-control deemed-assignment rule","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 43 words to 99 words (ratio 2.30 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.721 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 438](trajectory.jsonl#L438) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 expands 43 words to 99 words (ratio 2.30 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.721 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- upon written notice to IBM\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level is fully met: Customer gets consent-free affiliate and successor (including sale of substantially all assets) assignment, IBM is restricted by our reasonable-consent right, competitor assignments are barred, and no change-of-control termination right exists to limit.\n- Fallback is not independently met because IBM's assignment right is consent-based rather than notice-only, but that is irrelevant given the locked preferred target.\n- Minimality fails: the edit imports the fallback's notice condition (\"upon written notice to IBM\") onto our own consent-free assignment right, adding a burden the preferred position does not require.\n- Minimality also fails the official gates (43 words expanded to 99, ratio 2.30; changed-character ratio 0.721); the reciprocity and competitor bar could have been added as a short inserted sentence while leaving the existing Customer sentences largely intact.\n- Intent is preserved: the void-assignment sentence and Customer's continuing liability survive, and no undefined term or dangling mechanic is introduced."
- [seq 503](trajectory.jsonl#L503) **Verdict: repaired** — The locked preferred level is fully met: the Customer carve-out now covers affiliates and sale of substantially all assets, and one inserted sentence subjects IBM's assignment to our consent (not unreasonably withheld) and bars assignment to a competitor. No Vendor change-of-control termination right exists anywhere in the clause, so that conditional preferred element is satisfied by absence. Edits are confined to one phrase replacement plus a single reciprocal sentence; the void-assignment and continuing-liability sentences and all other commercial terms remain intact, with no undefined term or dangling mechanic introduced. Fallback is not independently complete only because no written-notice mechanic is added, which is irrelevant given the preferred level is achieved. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: successor/affiliate carve-out for Customer present","ok":true}; {"name":"precision position: preferred affiliate assignment is not limited by financial qualification","ok":true}; {"name":"precision position: preferred assignment adds no change-of-control deemed-assignment rule","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 216](trajectory.jsonl#L216)

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

- [seq 252](trajectory.jsonl#L252) **drafter → list_sections**

```json
{}
```

- [seq 253](trajectory.jsonl#L253) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 254](trajectory.jsonl#L254) **drafter → read_section**

```json
{"sectionId":"sec-12.1"}
```

- [seq 255](trajectory.jsonl#L255) **read_section result**

```json
{"sectionRef":"§ 12.1 License","paragraphs":[{"id":"p0148","text":"12.1 License"},{"id":"p0149","text":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement. Customer agrees not to download or otherwise copy, reverse assemble, reverse compile, or otherwise translate the software"},{"id":"p0150","te…
```

- [seq 290](trajectory.jsonl#L290) **drafter → read_section**

```json
{"sectionId":"sec-14.17"}
```

- [seq 291](trajectory.jsonl#L291) **read_section result**

```json
{"sectionRef":"§ 14.17 Limitation of Licenses","paragraphs":[{"id":"p0201","text":"14.17 Limitation of Licenses"},{"id":"p0202","text":"Each of us grants only the licenses expressly specified herein. No other licenses or rights (including licenses or rights under patents) are granted."}]}
```

- [seq 292](trajectory.jsonl#L292) **drafter → read_section**

```json
{"sectionId":"sec-11.6"}
```

- [seq 293](trajectory.jsonl#L293) **read_section result**

```json
{"sectionRef":"§ 11.6 Content and Digital Certificates","paragraphs":[{"id":"p0143","text":"11.6 Content and Digital Certificates"},{"id":"p0144","text":"Customer is solely responsible for:"},{"id":"p0145","text":"a. all Content including, without limitation, its selection, licensing, accuracy, performance, maintenance, and support; and"},{"id":"p0146","text":"b. the selection, management and use…
```

- [seq 294](trajectory.jsonl#L294) **drafter → read_section**

```json
{"sectionId":"sec-14.18"}
```

- [seq 295](trajectory.jsonl#L295) **read_section result**

```json
{"sectionRef":"§ 14.18 Data Protection","paragraphs":[{"id":"p0203","text":"14.18 Data Protection"},{"id":"p0204","text":"You agree to allow International Business Machines Corporation and entities within its Enterprise to store and use your contact information, including names, phone numbers, and e-mail addresses, anywhere they do business. Such information will be processed and used in connecti…
```

- [seq 296](trajectory.jsonl#L296) **drafter → read_section**

```json
{"sectionId":"sec-5.3"}
```

- [seq 297](trajectory.jsonl#L297) **read_section result**

```json
{"sectionRef":"§ 5.3 Security","paragraphs":[{"id":"p0066","text":"5.3 Security"},{"id":"p0067","text":"a. Customer acknowledges that IBM does not control the transfer of data over telecommunications facilities, including the Internet."},{"id":"p0068","text":"b. Subject to the other disclaimers contained herein, IBM will implement the security features specified herein, including the IBM perform …
```

- [seq 317](trajectory.jsonl#L317) **drafter → search**

```json
{"query":"own","limit":30}
```

- [seq 318](trajectory.jsonl#L318) **search result**

```json
[{"paragraphId":"p0021","sectionRef":"§ Preamble","snippet":"h. \"Enterprise\" means any legal entity and the subsidiaries it owns by more than 50 percent. The term \"Enterprise\" applies only to the portion of …"},{"paragraphId":"p0024","sectionRef":"§ Preamble","snippet":"…r. \"Materials\" does not include licensed program products available under their own license agreements or Base Components…
```

- [seq 319](trajectory.jsonl#L319) **drafter → get_definition**

```json
{"term":"Content"}
```

- [seq 320](trajectory.jsonl#L320) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 361](trajectory.jsonl#L361) **drafter → read_section**

```json
{"sectionId":"sec-5.4"}
```

- [seq 362](trajectory.jsonl#L362) **read_section result**

```json
{"sectionRef":"§ 5.4 Other Disclaimers","paragraphs":[{"id":"p0071","text":"5.4 Other Disclaimers"},{"id":"p0072","text":"a. IBM does not warrant uninterrupted or error-free operation of any Service or that IBM will correct all defects. open"},{"id":"p0073","text":"b. IBM does not make any representation or warranty as to the capacity, performance or scalability of the Services, e-business Hostin…
```

- [seq 391](trajectory.jsonl#L391) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0017","p0018","p0019","p0020","p0021","p0022","p0023","p0024","p0025","p0026"]}
```

- [seq 392](trajectory.jsonl#L392) **read_paragraphs result**

```json
[{"id":"p0017","sectionRef":"§ Preamble","text":"d. \"Content\" means information, software, and data that Customer provides, including, without limitation, any hypertext markup language files, scripts, programs, recordings, sound, music, graphics, images, applets or servlets that Customer or its Subcontractors or Services Recipients create, install, upload or transfer in or through the e-busines…
```

- [seq 393](trajectory.jsonl#L393) **drafter → lookup_precedent**

```json
{"ruleId":"IP","context":"Deliverables/Materials default ownership to vendor; narrow internal-only licence back; no Customer Data ownership statement"}
```

- [seq 394](trajectory.jsonl#L394) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 419](trajectory.jsonl#L419) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Flip the default Materials category to Type I (Customer-owned) for work created during the Service performance period and confirm Customer ownership of Content/Customer Components.","comment":"[Playbook] We need to own the deliverables we pay IBM to create, so we have flipped the default in Section 7(a) from Type II (IBM-owned, internal-use-only licence back) to Type I for Materials created during the Service performance period; IBM keeps its pre-existing works as Type II. We have also confirmed that Content and Customer Components remain ours. If IBM prefers, we can instead retain Type II as the default provided Customer receives a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those Materials for its business.","ops":[{"kind":"replace","paragraphId":"p0082","oldText":"If not specified, Materials will be considered Type II Materials.","newText":"If not specified, Materials created during the Service performance period will be considered Type I Materials, and all other Materials will be considered Type II Materials."},{"kind":"insert_after","paragraphId":"p0086","text":"e. As between the parties, Customer retains all right, title and interest (including all intellectual property rights) in and to the Content and the Customer Components, and nothing in this Agreement transfers or assigns any ownership of the Content or the Customer Components to IBM."}]}
```

- [seq 420](trajectory.jsonl#L420) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0082","segments":[{"type":"equal","text":"a. IBM will specify Materials to be delivered to Customer. IBM will identify them as being \"Type I Materials,\" \"Type II Materials,\" or otherwise as Customer and IBM agree in writing. If not specified, Materials "},{"type":"insert","text":"created during the Service performance period "},{"type":"equa…
```

- [seq 445](trajectory.jsonl#L445) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0082","p0083","p0085","p0086"],"quote":"a. IBM will specify Materials to be delivered to Customer. IBM will identify them as being \"Type I Materials,\" \"Type II Materials,\" or otherwise as Customer and IBM agree in writing. If not specified, Materials will be considered Type II Materials.","rationale":"Section 7.0 (Materials) defaults every deliverable IBM creates for us to \"Type II Materials\", i.e. IBM (or a third party) holds all right, title and interest, and we receive only an irrevocable, worldwide, paid-up licence to use, execute, reproduce, display, perform and distribute \"within Customer's Enterprise only\" (p0085) — with no right to modify/prepare derivative works and no sublicensing. That fails both the preferred position (Customer owns deliverables created for it) and the fallback (perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables for our business), because IBM's default capture of bespoke work product carries only a narrow internal-use licence back. IBM owning its pre-existing platform and Base Components (§ 12.1) is acceptable and is not challenged. In addition, no provision confirms that we retain ownership of Content and Customer Components; § 11.6 only allocates responsibility for Content and § 14.18 addresses contact data, so we have added a short ownership-retention sentence. The redline makes the minimal change: work created during the Service performance period defaults to Type I (Customer-owned), IBM's pre-existing works remain Type II, plus the Customer Data/Content ownership sentence. Noted but not separately flagged: IBM's broad licence back over Type I Materials (p0084) is non-exclusive and does not affect our ownership.","confidence":0.82,"proposal":{"level":"preferred","summary":"Flip the default Materials category to Type I (Customer-owned) for work created during the Service performance period and confirm Customer ownership of Content/Customer Components.","comment":"[Playbook] We need to own the deliverables we pay IBM to create, so we have flipped the default in Section 7(a) from Type II (IBM-owned, internal-use-only licence back) to Type I for Materials created during the Service performance period; IBM keeps its pre-existing works as Type II. We have also confirmed that Content and Customer Components remain ours. If IBM prefers, we can instead retain Type II as the default provided Customer receives a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those Materials for its business.","ops":[{"kind":"replace","paragraphId":"p0082","oldText":"If not specified, Materials will be considered Type II Materials.","newText":"If not specified, Materials created during the Service performance period will be considered Type I Materials, and all other Materials will be considered Type II Materials."},{"kind":"insert_after","paragraphId":"p0086","text":"e. As between the parties, Customer retains all right, title and interest (including all intellectual property rights) in and to the Content and the Customer Components, and nothing in this Agreement transfers or assigns any ownership of the Content or the Customer Components to IBM."}]}}
```

- [seq 446](trajectory.jsonl#L446) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 445](trajectory.jsonl#L445)
- Finding: `f-ip-35864e97` · **deviation** · confidence 0.82
- Location: § 5.4 Other Disclaimers
- Quote: “a. IBM will specify Materials to be delivered to Customer. IBM will identify them as being "Type I Materials," "Type II Materials," or otherwise as Customer and IBM agree in writing. If not specified, Materials will be considered Type II Materials.”
- Rationale: Section 7.0 (Materials) defaults every deliverable IBM creates for us to "Type II Materials", i.e. IBM (or a third party) holds all right, title and interest, and we receive only an irrevocable, worldwide, paid-up licence to use, execute, reproduce, display, perform and distribute "within Customer's Enterprise only" (p0085) — with no right to modify/prepare derivative works and no sublicensing. That fails both the preferred position (Customer owns deliverables created for it) and the fallback (perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense deliverables for our business), because IBM's default capture of bespoke work product carries only a narrow internal-use licence back. IBM owning its pre-existing platform and Base Components (§ 12.1) is acceptable and is not challenged. In addition, no provision confirms that we retain ownership of Content and Customer Components; § 11.6 only allocates responsibility for Content and § 14.18 addresses contact data, so we have added a short ownership-retention sentence. The redline makes the minimal change: work created during the Service performance period defaults to Type I (Customer-owned), IBM's pre-existing works remain Type II, plus the Customer Data/Content ownership sentence. Noted but not separately flagged: IBM's broad licence back over Type I Materials (p0084) is non-exclusive and does not affect our ownership.
- Proposal: **preferred** — Flip the default Materials category to Type I (Customer-owned) for work created during the Service performance period and confirm Customer ownership of Content/Customer Components.
- Comment: [Playbook] We need to own the deliverables we pay IBM to create, so we have flipped the default in Section 7(a) from Type II (IBM-owned, internal-use-only licence back) to Type I for Materials created during the Service performance period; IBM keeps its pre-existing works as Type II. We have also confirmed that Content and Customer Components remain ours. If IBM prefers, we can instead retain Type II as the default provided Customer receives a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those Materials for its business.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "If not specified, Materials created during the Service performance period will be considered Type I Materials, and all other Materials will be considered Type II Materials.",
    "oldText": "If not specified, Materials will be considered Type II Materials.",
    "paragraphId": "p0082"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0086",
    "text": "e. As between the parties, Customer retains all right, title and interest (including all intellectual property rights) in and to the Content and the Customer Components, and nothing in this Agreement transfers or assigns any ownership of the Content or the Customer Components to IBM."
  }
]
```

### Verifier and repair feedback

- [seq 481](trajectory.jsonl#L481) **Verdict: fail** — precision position: preferred embedded-IP licence covers any Vendor IP embedded in deliverables: Grant Customer a perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in the deliverables, not only named technology categories. official minimality gate: Operation 1 expands 10 words to 26 words (ratio 2.60 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.622 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Preferred level incomplete: the embedded-IP licence element fails. There is no perpetual, irrevocable, royalty-free licence to Vendor IP embedded in Type I deliverables; the only grant is the pre-existing Type II licence limited to "within Customer's Enterprise only" and not stated to be perpetual. Fallback is also incomplete (no perpetual term, no modification or sublicensing right), but the locked target is preferred and the two levels cannot be combined. Minimality gate fails: operation 1 rewrites the default sentence from 10 to 26 words (ratio 2.60) with a 0.622 changed-character ratio. A tighter edit — e.g. replacing "Type II" with "Type I" in the default sentence, or a short separate insertion carving out pre-existing Materials — would suffice. Intent preserved: the copyright-notice mechanic, Type I/Type II structure and the Type II licence remain effective, and paragraph (e) introduces no undefined term or contradiction (Content and Customer Components are defined terms). To reach preferred, add a concise grant: a perpetual, irrevocable, royalty-free licence to any IBM IP embedded in Type I Materials, without importing the fallback's modification/sublicence language. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"precision position: preferred embedded-IP licence covers any Vendor IP embedded in deliverables","ok":false,"detail":"Grant Customer a perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in the deliverables, not only named technology categories."}; {"name":"precision position: preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 10 words to 26 words (ratio 2.60 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.622 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 482](trajectory.jsonl#L482) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in deliverables\n Verdict: not_met. Evidence: Only \"an irrevocable, nonexclusive, worldwide, paid-up license to use, execute, reproduce, display, perform, and distribute, within Customer's Enterprise only, copies of Type II Materials\" — no perpetual term and no grant keyed to Vendor IP embedded in deliverables\n\nDeterministic official failures:\n- precision position: preferred embedded-IP licence covers any Vendor IP embedded in deliverables: Grant Customer a perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in the deliverables, not only named technology categories.\n- official minimality gate: Operation 1 expands 10 words to 26 words (ratio 2.60 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.622 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- Materials created during the Service performance period will be considered Type I Materials, and all other Materials will be considered Type II Materials\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level incomplete: the embedded-IP licence element fails. There is no perpetual, irrevocable, royalty-free licence to Vendor IP embedded in Type I deliverables; the only grant is the pre-existing Type II licence limited to \"within Customer's Enterprise only\" and not stated to be perpetual.\n- Fallback is also incomplete (no perpetual term, no modification or sublicensing right), but the locked target is preferred and the two levels cannot be combined.\n- Minimality gate fails: operation 1 rewrites the default sentence from 10 to 26 words (ratio 2.60) with a 0.622 changed-character ratio. A tighter edit — e.g. replacing \"Type II\" with \"Type I\" in the default sentence, or a short separate insertion carving out pre-existing Materials — would suffice.\n- Intent preserved: the copyright-notice mechanic, Type I/Type II structure and the Type II licence remain effective, and paragraph (e) introduces no undefined term or contradiction (Content and Customer Components are defined terms).\n- To reach preferred, add a concise grant: a perpetual, irrevocable, royalty-free licence to any IBM IP embedded in Type I Materials, without importing the fallback's modification/sublicence language."

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 302](trajectory.jsonl#L302)

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

- [seq 323](trajectory.jsonl#L323) **drafter → read_section**

```json
{"sectionId":"sec-12.1"}
```

- [seq 324](trajectory.jsonl#L324) **read_section result**

```json
{"sectionRef":"§ 12.1 License","paragraphs":[{"id":"p0148","text":"12.1 License"},{"id":"p0149","text":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement. Customer agrees not to download or otherwise copy, reverse assemble, reverse compile, or otherwise translate the software"},{"id":"p0150","te…
```

- [seq 325](trajectory.jsonl#L325) **drafter → list_sections**

```json
{}
```

- [seq 326](trajectory.jsonl#L326) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 343](trajectory.jsonl#L343) **drafter → read_section**

```json
{"sectionId":"sec-14.17"}
```

- [seq 344](trajectory.jsonl#L344) **read_section result**

```json
{"sectionRef":"§ 14.17 Limitation of Licenses","paragraphs":[{"id":"p0201","text":"14.17 Limitation of Licenses"},{"id":"p0202","text":"Each of us grants only the licenses expressly specified herein. No other licenses or rights (including licenses or rights under patents) are granted."}]}
```

- [seq 345](trajectory.jsonl#L345) **drafter → read_section**

```json
{"sectionId":"sec-14.10"}
```

- [seq 346](trajectory.jsonl#L346) **read_section result**

```json
{"sectionRef":"§ 14.10 Assignment","paragraphs":[{"id":"p0187","text":"14.10 Assignment"},{"id":"p0188","text":"Customer will not assign this Agreement or any of its rights hereunder without the prior written consent of IBM, such consent not to be unreasonably withheld. Notwithstanding the foregoing, Customer may assign this Agreement to a successor organization by merger, consolidation or acquis…
```

- [seq 347](trajectory.jsonl#L347) **drafter → read_section**

```json
{"sectionId":"sec-14.11"}
```

- [seq 348](trajectory.jsonl#L348) **read_section result**

```json
{"sectionRef":"§ 14.11 No Resale","paragraphs":[{"id":"p0189","text":"14.11 No Resale"},{"id":"p0190","text":"Customer shall not resell the Services, in whole or in part."}]}
```

- [seq 349](trajectory.jsonl#L349) **drafter → read_section**

```json
{"sectionId":"sec-13.1"}
```

- [seq 350](trajectory.jsonl#L350) **read_section result**

```json
{"sectionRef":"§ 13.1 Services","paragraphs":[{"id":"p0159","text":"13.1 Services"},{"id":"p0160","text":"IBM, in its reasonable discretion, may change the terms and conditions of Attachment A and/or Service Option Attachments, upon at least ninety (90) days prior notice to Customer. IBM may change the prices of Service Option Attachments after twelve (12) months following the applicable Service …
```

- [seq 379](trajectory.jsonl#L379) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 380](trajectory.jsonl#L380) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 381](trajectory.jsonl#L381) **drafter → search**

```json
{"query":"Affiliate"}
```

- [seq 382](trajectory.jsonl#L382) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ Preamble","snippet":"b. \"Affiliates\" means entities that control, are controlled by, or are under common control w…"},{"paragraphId":"p0112","sectionRef":"§ 9.1 IBM's Limitation of Liability","snippet":"…claim related to the Services. The foregoing limit also applies to any of IBM's Affiliates and Subcontractors. It is the cumulative maximum for which IBM…
```

- [seq 383](trajectory.jsonl#L383) **drafter → search**

```json
{"query":"contractor"}
```

- [seq 384](trajectory.jsonl#L384) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ Preamble","snippet":"…gs, sound, music, graphics, images, applets or servlets that Customer or its Subcontractors or Services Recipients create, install, upload or transfer in or through the e…"},{"paragraphId":"p0018","sectionRef":"§ Preamble","snippet":"e. \"Content Administrator\" means an employee or Subcontractor of Customer who is authorized by Custom…
```

- [seq 413](trajectory.jsonl#L413) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0015","p0017","p0018","p0025","p0031","p0029","p0030"]}
```

- [seq 414](trajectory.jsonl#L414) **read_paragraphs result**

```json
[{"id":"p0015","sectionRef":"§ Preamble","text":"b. \"Affiliates\" means entities that control, are controlled by, or are under common control with a party to this Agreement."},{"id":"p0017","sectionRef":"§ Preamble","text":"d. \"Content\" means information, software, and data that Customer provides, including, without limitation, any hypertext markup language files, scripts, programs, recordings…
```

- [seq 415](trajectory.jsonl#L415) **drafter → search**

```json
{"query":"Services Recipients"}
```

- [seq 416](trajectory.jsonl#L416) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ Preamble","snippet":"…c, graphics, images, applets or servlets that Customer or its Subcontractors or Services Recipients create, install, upload or transfer in or through the e-business Hosting Enviro…"},{"paragraphId":"p0029","sectionRef":"§ Preamble","snippet":"n. \"Services Recipients\" means any entities or individuals receiving or using the Services, …
```

- [seq 441](trajectory.jsonl#L441) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Hosting agreement grant of nonexclusive revocable license to Base Components; no affiliates/contractors"}
```

- [seq 442](trajectory.jsonl#L442) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 461](trajectory.jsonl#L461) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0149","oldText":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.","newText":"IBM grants Customer, its Affiliates, and its Subcontractors acting on Customer's behalf a nonexclusive license to use the Base Components solely in connection with the Services as provided under this Agreement. Such license is irrevocable during the term of this Agreement, except that IBM may terminate it in accordance with Section 3.3 (Termination for Cause), and Customer may transfer it to a successor organization in connection with a permitted assignment under Section 14.10."}],"comment":"[Playbook] We have removed the at-will revocability and extended the licence to our Affiliates and Subcontractors using the Services on our behalf, with transfer to a successor on a permitted assignment. Our playbook requires that the grant cover affiliates and contractors and be revocable only for uncured material breach; if helpful, we can instead add Affiliates by written notice.","level":"preferred","summary":"Extend licence to Affiliates/Subcontractors, remove at-will revocability, add successor transfer."}
```

- [seq 462](trajectory.jsonl#L462) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0149","segments":[{"type":"equal","text":"IBM grants Customer"},{"type":"delete","text":" a nonexclusive, revocable "},{"type":"insert","text":", its Affiliates, and its Subcontractors acting on Customer's behalf a nonexclusive "},{"type":"equal","text":"license to use the Base Components solely in connection with the Services as provided under …
```

- [seq 471](trajectory.jsonl#L471) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0149","p0202","p0188"],"quote":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.","rationale":"The § 12.1 grant is expressly \"revocable\" with no stated cause standard, i.e. terminable at IBM's discretion, which is walk-away territory under this rule. It also runs to \"Customer\" alone: Affiliates and Subcontractors are defined terms in the Preamble but are not named as permitted users, and § 14.17 confirms no other licences or rights are granted, so there is no path to add them. § 14.10 permits assignment of the Agreement to an M&A successor, which satisfies only the transfer limb of the fallback; the affiliate/contractor and revocability limbs fail. Redline extends the grant to Affiliates and Subcontractors acting on our behalf, ties revocation to termination for cause under § 3.3, and confirms successor transfer; the fallback (Affiliates added on written notice) is offered in the comment.</parationale>\n<parameter name=\"confidence\">0.83","proposal":{"ops":[{"kind":"replace","paragraphId":"p0149","oldText":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.","newText":"IBM grants Customer, its Affiliates, and its Subcontractors acting on Customer's behalf a nonexclusive license to use the Base Components solely in connection with the Services as provided under this Agreement. Such license is irrevocable during the term of this Agreement, except that IBM may terminate it in accordance with Section 3.3 (Termination for Cause), and Customer may transfer it to a successor organization in connection with a permitted assignment under Section 14.10."}],"comment":"[Playbook] We have removed the at-will revocability and extended the licence to our Affiliates and Subcontractors using the Services on our behalf, with transfer to a successor on a permitted assignment. Our playbook requires that the grant cover affiliates and contractors and be revocable only for uncured material breach; if helpful, we can instead add Affiliates by written notice.","level":"preferred","summary":"Extend licence to Affiliates/Subcontractors, remove at-will revocability, add successor transfer."}}
```

- [seq 472](trajectory.jsonl#L472) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 493](trajectory.jsonl#L493) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0149","p0202","p0188"],"quote":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.","rationale":"The § 12.1 grant is expressly \"revocable\" with no cause standard, i.e. terminable at IBM's discretion, which is walk-away territory under this rule. It also runs to \"Customer\" alone: Affiliates and Subcontractors are defined in the Preamble but are not named as permitted users, and § 14.17 confirms no other licences or rights are granted, so there is no path to add them. § 14.10 permits assignment of the Agreement to an M&A successor, satisfying only the transfer limb of the fallback; the affiliate/contractor and revocability limbs fail. The redline extends the grant to Affiliates and Subcontractors acting on our behalf, ties revocation to termination for cause under § 3.3, and confirms successor transfer; the fallback (Affiliates added on written notice) is offered in the comment.","confidence":0.83,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0149","oldText":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.","newText":"IBM grants Customer, its Affiliates, and its Subcontractors acting on Customer's behalf a nonexclusive license to use the Base Components solely in connection with the Services as provided under this Agreement. Such license is irrevocable during the term of this Agreement, except that IBM may terminate it in accordance with Section 3.3 (Termination for Cause), and Customer may transfer it to a successor organization in connection with a permitted assignment under Section 14.10."}],"comment":"[Playbook] We have removed the at-will revocability and extended the licence to our Affiliates and Subcontractors using the Services on our behalf, with transfer to a successor on a permitted assignment. Our playbook requires that the grant cover affiliates and contractors and be revocable only for uncured material breach; if helpful, we can instead add Affiliates by written notice.","level":"preferred","summary":"Extend licence to Affiliates/Subcontractors, remove at-will revocability, add successor transfer."}}
```

- [seq 494](trajectory.jsonl#L494) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 493](trajectory.jsonl#L493)
- Finding: `f-license-3b116be6` · **deviation** · confidence 0.83
- Location: § 12.1 License
- Quote: “IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.”
- Rationale: The § 12.1 grant is expressly "revocable" with no cause standard, i.e. terminable at IBM's discretion, which is walk-away territory under this rule. It also runs to "Customer" alone: Affiliates and Subcontractors are defined in the Preamble but are not named as permitted users, and § 14.17 confirms no other licences or rights are granted, so there is no path to add them. § 14.10 permits assignment of the Agreement to an M&A successor, satisfying only the transfer limb of the fallback; the affiliate/contractor and revocability limbs fail. The redline extends the grant to Affiliates and Subcontractors acting on our behalf, ties revocation to termination for cause under § 3.3, and confirms successor transfer; the fallback (Affiliates added on written notice) is offered in the comment.
- Proposal: **fallback** — Extend the Base Components licence to Customer's Affiliates on written notice to IBM.
- Comment: [Playbook] We have extended the Base Components licence to our Affiliates upon written notice to IBM, which is our fallback position on licence scope; successor transfer in an M&A transaction is already preserved by Section 14.10, so no further change is needed there.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "IBM grants Customer and, upon written notice to IBM, Customer's Affiliates a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.",
    "oldText": "IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement.",
    "paragraphId": "p0149"
  }
]
```

### Verifier and repair feedback

- [seq 551](trajectory.jsonl#L551) **Verdict: fail** — official minimality gate: Operation 1 expands 23 words to 73 words (ratio 3.17 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.724 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Locked target is preferred, but the redline does not deliver perpetuity/irrevocability for paid-up licences: the grant is only "irrevocable during the term of this Agreement", so it lapses with the term. The termination carve-out points to Section 3.3 (Termination for Cause) rather than expressly limiting revocation to uncured material breach; the preferred standard is not stated in operative words. Minimality fails: the transfer sentence duplicates protection already in the untouched assignment paragraph ("Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition"), and the operation expands 23 words to 73 (ratio 3.17), exceeding the official expansion and changed-character gates. A tighter edit would suffice: strike "revocable", insert ", its Affiliates, and its Subcontractors acting on Customer's behalf", and add a short clause that the licence is perpetual for paid-up components and revocable only for Customer's uncured material breach. Fallback is satisfied on its material terms (affiliates covered; successor transfer in M&A), so the clause as redlined is acceptable but sits below the locked preferred level. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: affiliates covered by the licence","ok":true}; {"name":"official check: no at-will revocation remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 23 words to 73 words (ratio 3.17 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.724 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 552](trajectory.jsonl#L552) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Paid-up licences are perpetual\n Verdict: not_met. Evidence: \"Such license is irrevocable during the term of this Agreement\" — no perpetual grant for paid-up licences; grant expires with the term\n- Paid-up licences are irrevocable\n Verdict: not_met. Evidence: irrevocability is limited: \"irrevocable during the term of this Agreement, except that IBM may terminate it in accordance with Section 3.3\"\n- Subscription licences terminable only for uncured material breach\n Verdict: cannot_tell. Evidence: \"except that IBM may terminate it in accordance with Section 3.3 (Termination for Cause)\" — the operative text does not state uncured material breach; the cause standard is external and unquoted\n\nDeterministic official failures:\n- official minimality gate: Operation 1 expands 23 words to 73 words (ratio 3.17 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.724 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- and Customer may transfer it to a successor organization in connection with a permitted assignment under Section 14.10.\n- except that IBM may terminate it in accordance with Section 3.3 (Termination for Cause)\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Locked target is preferred, but the redline does not deliver perpetuity/irrevocability for paid-up licences: the grant is only \"irrevocable during the term of this Agreement\", so it lapses with the term.\n- The termination carve-out points to Section 3.3 (Termination for Cause) rather than expressly limiting revocation to uncured material breach; the preferred standard is not stated in operative words.\n- Minimality fails: the transfer sentence duplicates protection already in the untouched assignment paragraph (\"Customer may assign this Agreement to a successor organization by merger, consolidation or acquisition\"), and the operation expands 23 words to 73 (ratio 3.17), exceeding the official expansion and changed-character gates.\n- A tighter edit would suffice: strike \"revocable\", insert \", its Affiliates, and its Subcontractors acting on Customer's behalf\", and add a short clause that the licence is perpetual for paid-up components and revocable only for Customer's uncured material breach.\n- Fallback is satisfied on its material terms (affiliates covered; successor transfer in M&A), so the clause as redlined is acceptable but sits below the locked preferred level."
- [seq 645](trajectory.jsonl#L645) **Verdict: repaired** — Locked fallback level is complete: affiliate coverage on written notice was inserted, and M&A successor transfer already exists in the untouched assignment paragraph, so no second edit was needed. The edit is a single in-line insertion into the grant sentence; no other sentence, the anti-reverse-engineering covenant, the assignment mechanics, or the no-implied-licence sentence was altered. Preferred level is not reached (still "revocable", no perpetual/irrevocable paid-up licence, no uncured-material-breach-only termination, no contractor coverage) — correctly not attempted at the locked fallback level, and no preferred-only scope or duration was smuggled in. Minor drafting note only: "Affiliates" is capitalised but the resolved definitions do not show an Affiliate definition; if the Agreement lacks one, conform to lower case or cross-reference the definition. This does not defeat the fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: affiliates covered by the licence","ok":true}; {"name":"official check: no at-will revocation remains","ok":true}; {"name":"precision position: fallback licence covers affiliates on written notice","ok":true}; {"name":"precision position: fallback licence transfers to an M&A successor","ok":true}; {"name":"precision position: fallback licence adds no preferred-only scope or duration","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 311](trajectory.jsonl#L311)

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

- [seq 337](trajectory.jsonl#L337) **drafter → read_section**

```json
{"sectionId":"sec-11.3"}
```

- [seq 338](trajectory.jsonl#L338) **read_section result**

```json
{"sectionRef":"§ 11.3 Suspected Violations","paragraphs":[{"id":"p0131","text":"11.3 Suspected Violations"},{"id":"p0132","text":"IBM reserves the right to investigate potential violations of the representations and warranties in Subsection 11.2(b). If IBM reasonably determines that a breach of any such warranty has occurred, then IBM may, in its sole and reasonable discretion:"},{"id":"p0133","t…
```

- [seq 339](trajectory.jsonl#L339) **drafter → search**

```json
{"query":"audit","limit":30}
```

- [seq 340](trajectory.jsonl#L340) **search result**

```json
[]
```

- [seq 369](trajectory.jsonl#L369) **drafter → search**

```json
{"query":"inspect","limit":20}
```

- [seq 370](trajectory.jsonl#L370) **search result**

```json
[]
```

- [seq 371](trajectory.jsonl#L371) **drafter → search**

```json
{"query":"verify","limit":20}
```

- [seq 372](trajectory.jsonl#L372) **search result**

```json
[]
```

- [seq 373](trajectory.jsonl#L373) **drafter → search**

```json
{"query":"monitor","limit":20}
```

- [seq 374](trajectory.jsonl#L374) **search result**

```json
[]
```

- [seq 375](trajectory.jsonl#L375) **drafter → search**

```json
{"query":"records","limit":20}
```

- [seq 376](trajectory.jsonl#L376) **search result**

```json
[{"paragraphId":"p0114","sectionRef":"§ 9.1 IBM's Limitation of Liability","snippet":"2. loss of, or damage to, Customer's or any other entity's records or data."}]
```

- [seq 403](trajectory.jsonl#L403) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 404](trajectory.jsonl#L404) **read_section result**

```json
{"sectionRef":"§ 13.2 Acceptable Use Policy","paragraphs":[{"id":"p0161","text":"13.2 Acceptable Use Policy"},{"id":"p0162","text":"IBM, in its reasonable discretion, may modify the Acceptable Use Policy upon thirty (30) days' notice to Customer."}]}
```

- [seq 405](trajectory.jsonl#L405) **drafter → read_section**

```json
{"sectionId":"sec-11.5"}
```

- [seq 406](trajectory.jsonl#L406) **read_section result**

```json
{"sectionRef":"§ 11.5 Capacity Planning","paragraphs":[{"id":"p0141","text":"11.5 Capacity Planning"},{"id":"p0142","text":"Customer is responsible for determining whether the Base Components, IBM provided Internet access bandwidth, Customer Components and their combination will meet Customer's capacity or performance needs. Customer is responsible for planning for and requesting changes to the B…
```

- [seq 407](trajectory.jsonl#L407) **drafter → list_sections**

```json
{}
```

- [seq 408](trajectory.jsonl#L408) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 429](trajectory.jsonl#L429) **drafter → read_section**

```json
{"sectionId":"sec-11.2"}
```

- [seq 430](trajectory.jsonl#L430) **read_section result**

```json
{"sectionRef":"§ 11.2 Representations and Warranties","paragraphs":[{"id":"p0127","text":"11.2 Representations and Warranties"},{"id":"p0128","text":"Customer represents and warrants that:"},{"id":"p0129","text":"a. it has the requisite corporate power and authority to execute, deliver and perform its obligations under this Agreement; Customer has no contractual or other obligation that (i) restr…
```

- [seq 431](trajectory.jsonl#L431) **drafter → read_section**

```json
{"sectionId":"sec-5.3"}
```

- [seq 432](trajectory.jsonl#L432) **read_section result**

```json
{"sectionRef":"§ 5.3 Security","paragraphs":[{"id":"p0066","text":"5.3 Security"},{"id":"p0067","text":"a. Customer acknowledges that IBM does not control the transfer of data over telecommunications facilities, including the Internet."},{"id":"p0068","text":"b. Subject to the other disclaimers contained herein, IBM will implement the security features specified herein, including the IBM perform …
```

- [seq 433](trajectory.jsonl#L433) **drafter → read_section**

```json
{"sectionId":"sec-12.1"}
```

- [seq 434](trajectory.jsonl#L434) **read_section result**

```json
{"sectionRef":"§ 12.1 License","paragraphs":[{"id":"p0148","text":"12.1 License"},{"id":"p0149","text":"IBM grants Customer a nonexclusive, revocable license to use the Base Components solely in connection with the Services as provided under this Agreement. Customer agrees not to download or otherwise copy, reverse assemble, reverse compile, or otherwise translate the software"},{"id":"p0150","te…
```

- [seq 455](trajectory.jsonl#L455) **drafter → lookup_precedent**

```json
{"ruleId":"AUDIT","context":"Hosting agreement; IBM right to investigate potential AUP violations; no audit parameters (frequency, notice, cost, system access)"}
```

- [seq 456](trajectory.jsonl#L456) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 475](trajectory.jsonl#L475) **drafter → propose_redline**

```json
{"ops":[{"kind":"insert_after","paragraphId":"p0138","numbering":"11.3(e)","text":"Except in an emergency or as otherwise required by law, any investigation, inspection, verification or audit by IBM of Customer's use of the Services, Content, records or facilities will be conducted no more than once in any twelve (12) month period, upon at least thirty (30) days' prior written notice to Customer, during Customer's normal business hours, and by an independent auditor bound by written obligations of confidentiality no less protective than those in this Agreement. IBM will bear all costs of such investigation, inspection, verification or audit unless it reveals an underpayment by Customer exceeding five percent (5%) of the amounts due for the period reviewed. IBM will have no direct or remote access to Customer's systems or networks for such purposes, and Customer may satisfy any such request by providing the relevant information to IBM off-site."}],"comment":"[Playbook] We have added standard limits on IBM's investigation and verification rights - once per 12 months, 30 days' notice, business hours, independent auditor under confidentiality, IBM's cost unless an underpayment over 5% is found, and no access to our systems - since as drafted the right is unlimited, unannounced and at our expense. The emergency and legal-requirement carve-out is preserved; if helpful we can accept 15 days' notice and a 10% underpayment threshold.","level":"preferred","summary":"Add frequency, notice, cost and no-system-access limits to IBM's investigation/audit right in 11.3."}
```

- [seq 476](trajectory.jsonl#L476) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0138","segments":[{"type":"equal","text":"Customer will promptly notify IBM of any event or circumstance related to this Agreement, Customer's use of the Services, or Content of which Customer becomes aware that could lead to a claim or demand against IBM, and Customer will provide all relevant information relating to such event or circumstance …
```

- [seq 509](trajectory.jsonl#L509) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0132","p0137","p0138"],"quote":"IBM reserves the right to investigate potential violations of the representations and warranties in Subsection 11.2(b).","rationale":"The only inspection/verification right binding us is IBM's right in § 11.3 to investigate potential violations of our AUP warranty, reinforced by our obligation in p0138 to hand over \"all relevant information\" on request. That right is unlimited in frequency, unannounced (the notice in p0137 applies only before IBM restricts access or removes Content, not before investigating), silent on cost allocation and on any confidentiality-bound independent auditor, and does not exclude access to our systems. That fails the fallback (once per year on 15 days' notice, Vendor bears cost unless underpayment exceeds 10%) and touches walk-away territory (unlimited/unannounced audits). We propose the minimal insert of the preferred parameters, preserving IBM's emergency and legal-requirement carve-out, with the fallback offered in the comment.","confidence":0.68,"proposal":{"ops":[{"kind":"insert_after","paragraphId":"p0138","numbering":"11.3(e)","text":"Except in an emergency or as otherwise required by law, any investigation, inspection, verification or audit by IBM of Customer's use of the Services, Content, records or facilities will be conducted no more than once in any twelve (12) month period, upon at least thirty (30) days' prior written notice to Customer, during Customer's normal business hours, and by an independent auditor bound by written obligations of confidentiality no less protective than those in this Agreement. IBM will bear all costs of such investigation, inspection, verification or audit unless it reveals an underpayment by Customer exceeding five percent (5%) of the amounts due for the period reviewed. IBM will have no direct or remote access to Customer's systems or networks for such purposes, and Customer may satisfy any such request by providing the relevant information to IBM off-site."}],"comment":"[Playbook] We have added standard limits on IBM's investigation and verification rights - once per 12 months, 30 days' notice, business hours, independent auditor under confidentiality, IBM's cost unless an underpayment over 5% is found, and no access to our systems - since as drafted the right is unlimited, unannounced and at our expense. The emergency and legal-requirement carve-out is preserved; if helpful we can accept 15 days' notice and a 10% underpayment threshold.","level":"preferred","summary":"Add frequency, notice, cost and no-system-access limits to IBM's investigation/audit right in 11.3."}}
```

- [seq 510](trajectory.jsonl#L510) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 509](trajectory.jsonl#L509)
- Finding: `f-audit-54ffa9fd` · **deviation** · confidence 0.68
- Location: § 11.3 Suspected Violations
- Quote: “IBM reserves the right to investigate potential violations of the representations and warranties in Subsection 11.2(b).”
- Rationale: The only inspection/verification right binding us is IBM's right in § 11.3 to investigate potential violations of our AUP warranty, reinforced by our obligation in p0138 to hand over "all relevant information" on request. That right is unlimited in frequency, unannounced (the notice in p0137 applies only before IBM restricts access or removes Content, not before investigating), silent on cost allocation and on any confidentiality-bound independent auditor, and does not exclude access to our systems. That fails the fallback (once per year on 15 days' notice, Vendor bears cost unless underpayment exceeds 10%) and touches walk-away territory (unlimited/unannounced audits). We propose the minimal insert of the preferred parameters, preserving IBM's emergency and legal-requirement carve-out, with the fallback offered in the comment.
- Proposal: **preferred** — Add frequency, notice, cost and no-system-access limits to IBM's investigation/audit right in 11.3.
- Comment: [Playbook] We have added standard limits on IBM's investigation and verification rights - once per 12 months, 30 days' notice, business hours, independent auditor under confidentiality, IBM's cost unless an underpayment over 5% is found, and no access to our systems - since as drafted the right is unlimited, unannounced and at our expense. The emergency and legal-requirement carve-out is preserved; if helpful we can accept 15 days' notice and a 10% underpayment threshold.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "11.3(e)",
    "paragraphId": "p0138",
    "text": "Except in an emergency or as otherwise required by law, any investigation, inspection, verification or audit by IBM of Customer's use of the Services, Content, records or facilities will be conducted no more than once in any twelve (12) month period, upon at least thirty (30) days' prior written notice to Customer, during Customer's normal business hours, and by an independent auditor bound by written obligations of confidentiality no less protective than those in this Agreement. IBM will bear all costs of such investigation, inspection, verification or audit unless it reveals an underpayment by Customer exceeding five percent (5%) of the amounts due for the period reviewed. IBM will have no direct or remote access to Customer's systems or networks for such purposes, and Customer may satisfy any such request by providing the relevant information to IBM off-site."
  }
]
```

### Verifier and repair feedback

- [seq 583](trajectory.jsonl#L583) **Verdict: pass** — All six atomic preferred elements are expressly stated in the inserted Subsection 11.3(e): annual frequency cap, 30 days' prior written notice, business hours, independent auditor under written confidentiality, IBM cost unless underpayment exceeds 5%, and no system access. The insertion is a concise new subsection addressing an absent limitation; the original unlimited investigation right and the existing notice/emergency carve-out sentences remain effective, so no term is contradicted and no undefined term is introduced. The retained "Except in an emergency or as otherwise required by law" opener mirrors the existing 11.3 carve-out rather than creating a new substantive exception, and the off-site-response and "or remote" additions are short scoping mechanics that operate in Customer's favour, so minimality is not offended. The clause also comfortably clears the fallback (15 days / 10%), but as the locked target is preferred it should be presented as meeting the preferred position. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: audit frequency limited","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 487](trajectory.jsonl#L487)

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

- [seq 497](trajectory.jsonl#L497) **drafter → list_sections**

```json
{}
```

- [seq 498](trajectory.jsonl#L498) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 499](trajectory.jsonl#L499) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 500](trajectory.jsonl#L500) **search result**

```json
[]
```

- [seq 527](trajectory.jsonl#L527) **drafter → read_section**

```json
{"sectionId":"sec-3.4"}
```

- [seq 528](trajectory.jsonl#L528) **read_section result**

```json
{"sectionRef":"§ 3.4 Termination for Convenience","paragraphs":[{"id":"p0043","text":"3.4 Termination for Convenience"},{"id":"p0044","text":"Customer may terminate this Agreement (including all Service Option Attachments) or any Service Option Attachment (with the exception of any Service Option Attachment that is a prerequisite for the provision of Services under a non-terminated Service Option…
```

- [seq 529](trajectory.jsonl#L529) **drafter → read_section**

```json
{"sectionId":"sec-3.5"}
```

- [seq 530](trajectory.jsonl#L530) **read_section result**

```json
{"sectionRef":"§ 3.5 Effect of&sbsp;Termination","paragraphs":[{"id":"p0048","text":"3.5 Effect of&sbsp;Termination"},{"id":"p0049","text":"Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under oth…
```

- [seq 531](trajectory.jsonl#L531) **drafter → read_section**

```json
{"sectionId":"sec-4.2"}
```

- [seq 532](trajectory.jsonl#L532) **read_section result**

```json
{"sectionRef":"§ 4.2 Payment","paragraphs":[{"id":"p0053","text":"4.2 Payment"},{"id":"p0054","text":"IBM invoices will specify the amount due. Payment is due upon receipt and payable as specified in such invoice. Customer agrees to pay accordingly, including any late payment fees. Payment will be made in United States dollars."}]}
```

- [seq 533](trajectory.jsonl#L533) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 534](trajectory.jsonl#L534) **search result**

```json
[]
```

- [seq 555](trajectory.jsonl#L555) **drafter → search**

```json
{"query":"early termination"}
```

- [seq 556](trajectory.jsonl#L556) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 3.3 Termination for Cause","snippet":"…ent IBM has so breached this Agreement IBM shall not be entitled to recover the early termination charges described in Section 3.4(b) below."},{"paragraphId":"p0046","sectionRef":"§ 3.4 Termination for Convenience","snippet":"b. paying the applicable early termination charges, if any, specified in Attachment A and appl…
```

- [seq 557](trajectory.jsonl#L557) **drafter → read_section**

```json
{"sectionId":"sec-9.2"}
```

- [seq 558](trajectory.jsonl#L558) **read_section result**

```json
{"sectionRef":"§ 9.2 Customer's Limitation of Liability","paragraphs":[{"id":"p0115","text":"9.2 Customer's Limitation of Liability"},{"id":"p0116","text":"Circumstances may arise where, because of a default on Customer's part or other liability, IBM is entitled to recover damages from Customer. Regardless of the basis on which IBM is entitled to claim damages from Customer (including fundamental…
```

- [seq 587](trajectory.jsonl#L587) **drafter → search**

```json
{"query":"Attachment A"}
```

- [seq 588](trajectory.jsonl#L588) **search result**

```json
[{"paragraphId":"p0009","sectionRef":"§ Preamble","snippet":"a. Attachment A: Facilities Services;"},{"paragraphId":"p0035","sectionRef":"§ Preamble","snippet":"IBM will perform the Services described in Attachment A and applicable Service Option Attachments."},{"paragraphId":"p0046","sectionRef":"§ 3.4 Termination for Convenience","snippet":"b. paying the applicable early termination charges, if…
```

- [seq 589](trajectory.jsonl#L589) **drafter → read_section**

```json
{"sectionId":"sec-4.1"}
```

- [seq 590](trajectory.jsonl#L590) **read_section result**

```json
{"sectionRef":"§ 4.1 Charges","paragraphs":[{"id":"p0051","text":"4.1 Charges"},{"id":"p0052","text":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments."}]}
```

- [seq 623](trajectory.jsonl#L623) **drafter → lookup_precedent**

```json
{"ruleId":"LD","context":"Early termination charges payable by Customer on termination for convenience, amount set in Attachment A, uncapped"}
```

- [seq 624](trajectory.jsonl#L624) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 658](trajectory.jsonl#L658) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0046","oldText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","newText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such early termination charges will not exceed, in the aggregate, three (3) months' recurring charges for the terminated Services and will be the sole amount payable by Customer, and no other liquidated damages or penalties will be payable by Customer, in connection with such termination."}],"comment":"[Playbook] Our playbook does not accept liquidated damages or penalties payable by us, so we have capped the early termination charges at three months' recurring charges for the terminated Services and confirmed they are the sole amount due on a convenience termination. As drafted the charge is set in Attachment A (which IBM may change under Section 13.1) and is effectively open-ended.","level":"fallback","summary":"Cap early termination charges at three months' fees and make them the sole termination amount."}
```

- [seq 659](trajectory.jsonl#L659) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0046","segments":[{"type":"equal","text":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments"},{"type":"insert","text":", provided that such early termination charges will not exceed, in the aggregate, three (3) months' recurring charges for the terminated Services and …
```

- [seq 682](trajectory.jsonl#L682) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0046"],"quote":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","rationale":"Section 3.4(b) requires Customer to pay \"early termination charges\" on a convenience termination, with the amount fixed only by reference to Attachment A and the Service Option Attachments, neither of which is quantified in this Agreement (and Attachment A terms are unilaterally changeable by IBM on 90 days' notice under Section 13.1). That is an open-ended stipulated amount payable by us, so it fails the fallback of an early-termination fee capped at three months' fees; it is not saved by Section 9.2, which caps damages claims rather than contractual termination charges. Because the charge is part of the bargain for a one-month convenience termination right, we propose the fallback rather than outright deletion: cap the charge at three months' recurring charges for the terminated Services and confirm it is the sole amount payable, with no other liquidated damages or penalties. Section 3.3 (no early termination charges where IBM is in breach) and IBM-side credits remain unaffected and are not flagged.</rationale>\n<parameter name=\"confidence\">0.72","proposal":{"ops":[{"kind":"replace","paragraphId":"p0046","oldText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","newText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such early termination charges will not exceed, in the aggregate, three (3) months' recurring charges for the terminated Services and will be the sole amount payable by Customer, and no other liquidated damages or penalties will be payable by Customer, in connection with such termination."}],"comment":"[Playbook] Our playbook does not accept liquidated damages or penalties payable by us, so we have capped the early termination charges at three months' recurring charges for the terminated Services and confirmed they are the sole amount due on a convenience termination. As drafted the charge is set in Attachment A (which IBM may change under Section 13.1) and is effectively open-ended.","level":"fallback","summary":"Cap early termination charges at three months' fees and make them the sole termination amount."}}
```

- [seq 683](trajectory.jsonl#L683) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 702](trajectory.jsonl#L702) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0046"],"quote":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","rationale":"Section 3.4(b) requires Customer to pay \"early termination charges\" on a convenience termination, with the amount fixed only by reference to Attachment A and the Service Option Attachments, neither of which is quantified in this Agreement (and Attachment A terms are unilaterally changeable by IBM on 90 days' notice under Section 13.1). That is an open-ended stipulated amount payable by us, so it fails the fallback of an early-termination fee capped at three months' fees; it is not saved by Section 9.2, which caps damages claims rather than contractual termination charges. Because the charge is part of the bargain for a one-month convenience termination right, we propose the fallback rather than outright deletion: cap it at three months' recurring charges for the terminated Services and confirm it is the sole amount payable, with no other liquidated damages or penalties. Section 3.3 (no early termination charges where IBM is in breach) benefits us and is not flagged.","confidence":0.72,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0046","oldText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.","newText":"b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments, provided that such early termination charges will not exceed, in the aggregate, three (3) months' recurring charges for the terminated Services and will be the sole amount payable by Customer, and no other liquidated damages or penalties will be payable by Customer, in connection with such termination."}],"comment":"[Playbook] Our playbook does not accept liquidated damages or penalties payable by us, so we have capped the early termination charges at three months' recurring charges for the terminated Services and confirmed they are the sole amount due on a convenience termination. As drafted the charge is set in Attachment A (which IBM may change under Section 13.1) and is effectively open-ended.","level":"fallback","summary":"Cap early termination charges at three months' fees and make them the sole termination amount."}}
```

- [seq 703](trajectory.jsonl#L703) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 702](trajectory.jsonl#L702)
- Finding: `f-ld-491fadc3` · **deviation** · confidence 0.72
- Location: § 3.4 Termination for Convenience
- Quote: “b. paying the applicable early termination charges, if any, specified in Attachment A and applicable Service Option Attachments.”
- Rationale: Section 3.4(b) requires Customer to pay "early termination charges" on a convenience termination, with the amount fixed only by reference to Attachment A and the Service Option Attachments, neither of which is quantified in this Agreement (and Attachment A terms are unilaterally changeable by IBM on 90 days' notice under Section 13.1). That is an open-ended stipulated amount payable by us, so it fails the fallback of an early-termination fee capped at three months' fees; it is not saved by Section 9.2, which caps damages claims rather than contractual termination charges. Because the charge is part of the bargain for a one-month convenience termination right, we propose the fallback rather than outright deletion: cap it at three months' recurring charges for the terminated Services and confirm it is the sole amount payable, with no other liquidated damages or penalties. Section 3.3 (no early termination charges where IBM is in breach) benefits us and is not flagged.
- Proposal: **fallback** — Add one sentence capping early termination charges at 3 months' fees as the sole liquidated amount.
- Comment: [Playbook] We have added one short sentence capping the early termination charges at 3 months' fees for the terminated Services and confirming they are the sole liquidated damages or penalty payable by us, since Attachment A leaves the amount open-ended. This is our fallback position on liquidated damages payable by Customer.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "paragraphId": "p0046",
    "text": "Such early termination charges will not exceed 3 months' fees for the terminated Services and are the sole liquidated damages or penalty payable by Customer."
  }
]
```

### Verifier and repair feedback

- [seq 730](trajectory.jsonl#L730) **Verdict: fail** — precision position: fallback liquidated amount is solely an early-termination fee capped at 3 months' fees: Limit the only Customer-payable liquidated amount to an early-termination fee capped at 3 months' fees and call it the sole liquidated amount. official minimality gate: Operation 1 expands 18 words to 65 words (ratio 3.61 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.704 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Fallback is satisfied on its material terms: the early-termination charge is capped at three months' recurring charges for the terminated Services and is expressly the sole liquidated amount, with all other liquidated damages and penalties excluded. Not minimal: the insertion states the same protection twice ('will be the sole amount payable by Customer' and 'no other liquidated damages or penalties will be payable by Customer'); a single cap plus the sole-liquidated-amount phrase suffices. The official minimality gate also flags a 3.6x word expansion and 0.70 changed-character ratio. Preserves intent fails: declaring the early-termination charge 'the sole amount payable by Customer ... in connection with such termination' conflicts with the companion termination obligations (e.g., paying charges already accrued for Services rendered) and creates a contradiction/dangling mechanic in the same list. Tighter edit available: append only 'provided that such charges will not exceed three (3) months' recurring charges for the terminated Services and are the sole liquidated damages or penalty payable by Customer.' Checks: {"name":"operation 1 applies","ok":true}; {"name":"precision position: fallback liquidated amount is solely an early-termination fee capped at 3 months' fees","ok":false,"detail":"Limit the only Customer-payable liquidated amount to an early-termination fee capped at 3 months' fees and call it the sole liquidated amount."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 18 words to 65 words (ratio 3.61 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.704 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 731](trajectory.jsonl#L731) **Repair round 1**: "Current target level: fallback. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- precision position: fallback liquidated amount is solely an early-termination fee capped at 3 months' fees: Limit the only Customer-payable liquidated amount to an early-termination fee capped at 3 months' fees and call it the sole liquidated amount.\n- official minimality gate: Operation 1 expands 18 words to 65 words (ratio 3.61 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.704 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- and will be the sole amount payable by Customer\n- in the aggregate\n- in connection with such termination\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nIntent failed: restore the exact unrelated language and eliminate the named contradiction or dangling mechanic.\n\nVerifier reasons:\n- Fallback is satisfied on its material terms: the early-termination charge is capped at three months' recurring charges for the terminated Services and is expressly the sole liquidated amount, with all other liquidated damages and penalties excluded.\n- Not minimal: the insertion states the same protection twice ('will be the sole amount payable by Customer' and 'no other liquidated damages or penalties will be payable by Customer'); a single cap plus the sole-liquidated-amount phrase suffices. The official minimality gate also flags a 3.6x word expansion and 0.70 changed-character ratio.\n- Preserves intent fails: declaring the early-termination charge 'the sole amount payable by Customer ... in connection with such termination' conflicts with the companion termination obligations (e.g., paying charges already accrued for Services rendered) and creates a contradiction/dangling mechanic in the same list.\n- Tighter edit available: append only 'provided that such charges will not exceed three (3) months' recurring charges for the terminated Services and are the sole liquidated damages or penalty payable by Customer.'"
- [seq 750](trajectory.jsonl#L750) **Verdict: repaired** — Both atomic fallback elements are satisfied by the single inserted sentence: a 3 months' fees cap on the early termination charge and exclusivity as the sole liquidated damages or penalty payable by Customer. Preferred is not met because the Customer's obligation to pay early termination charges under sub-paragraph (b) survives; the drafter's locked target was fallback, so this is acceptable. Minimality holds: one concise sentence appended to an existing clause that left the amount open-ended, with no rewrite of the termination mechanics, notice period, or prerequisite carve-out. Intent preserved: termination-for-convenience right, one month's notice, Attachment A reference and Service Option Attachment structure remain effective; no undefined terms or dangling mechanics introduced ('fees' and 'Services' track existing defined usage). Checks: {"name":"operation 1 applies","ok":true}; {"name":"precision position: fallback liquidated amount is solely an early-termination fee capped at 3 months' fees","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 491](trajectory.jsonl#L491)

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

- [seq 513](trajectory.jsonl#L513) **drafter → read_section**

```json
{"sectionId":"sec-5.1"}
```

- [seq 514](trajectory.jsonl#L514) **read_section result**

```json
{"sectionRef":"§ 5.1 IBM Representations and Warranties","paragraphs":[{"id":"p0059","text":"5.1 IBM Representations and Warranties"},{"id":"p0060","text":"IBM represents and warrants that:"},{"id":"p0061","text":"a. it will perform the Services using reasonable care and skill and in accordance with the applicable Service Option Attachments (which means the degree of knowledge, skill and judgment…
```

- [seq 515](trajectory.jsonl#L515) **drafter → read_section**

```json
{"sectionId":"sec-5.2"}
```

- [seq 516](trajectory.jsonl#L516) **read_section result**

```json
{"sectionRef":"§ 5.2 Exclusivity of Warranties","paragraphs":[{"id":"p0064","text":"5.2 Exclusivity of Warranties"},{"id":"p0065","text":"THE WARRANTIES IN SECTION 5.1 ARE THE EXCLUSIVE WARRANTIES FROM IBM. THEY REPLACE ALL OTHER WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY, AND FITNESS FOR A PARTICULAR PURPOSE."}]}
```

- [seq 541](trajectory.jsonl#L541) **drafter → read_section**

```json
{"sectionId":"sec-5.4"}
```

- [seq 542](trajectory.jsonl#L542) **read_section result**

```json
{"sectionRef":"§ 5.4 Other Disclaimers","paragraphs":[{"id":"p0071","text":"5.4 Other Disclaimers"},{"id":"p0072","text":"a. IBM does not warrant uninterrupted or error-free operation of any Service or that IBM will correct all defects. open"},{"id":"p0073","text":"b. IBM does not make any representation or warranty as to the capacity, performance or scalability of the Services, e-business Hostin…
```

- [seq 543](trajectory.jsonl#L543) **drafter → read_section**

```json
{"sectionId":"sec-12.2"}
```

- [seq 544](trajectory.jsonl#L544) **read_section result**

```json
{"sectionRef":"§ 12.2 Maintenance of Base Components","paragraphs":[{"id":"p0152","text":"12.2 Maintenance of Base Components"},{"id":"p0153","text":"For Base Components provided hereunder, IBM will provide, at no additional cost to Customer, maintenance as reasonably determined by IBM and upon notice to Customer. Unless otherwise specified in an SOA, such maintenance excludes upgrades to Base Co…
```

- [seq 545](trajectory.jsonl#L545) **drafter → search**

```json
{"query":"warrant","limit":40}
```

- [seq 546](trajectory.jsonl#L546) **search result**

```json
[{"paragraphId":"p0058","sectionRef":"§ 4.3 Taxes","snippet":"…--------------------------------------------------------------------------- 5.0 Warranties and Disclaimers"},{"paragraphId":"p0059","sectionRef":"§ 5.1 IBM Representations and Warranties","snippet":"5.1 IBM Representations and Warranties"},{"paragraphId":"p0060","sectionRef":"§ 5.1 IBM Representations and Warranties","snippet":"IBM re…
```

- [seq 575](trajectory.jsonl#L575) **drafter → search**

```json
{"query":"re-perform"}
```

- [seq 576](trajectory.jsonl#L576) **search result**

```json
[]
```

- [seq 577](trajectory.jsonl#L577) **drafter → search**

```json
{"query":"remedy","limit":20}
```

- [seq 578](trajectory.jsonl#L578) **search result**

```json
[{"paragraphId":"p0078","sectionRef":"§ 5.4 Other Disclaimers","snippet":"…reach of a party's obligations hereunder shall cause irreparable harm wherein a remedy at law would"}]
```

- [seq 579](trajectory.jsonl#L579) **drafter → list_sections**

```json
{}
```

- [seq 580](trajectory.jsonl#L580) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 605](trajectory.jsonl#L605) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"IBM hosting services agreement; 5.1 care-and-skill warranty only, no deliverable conformance warranty or remedy; 5.4(c) puts all Materials AS IS"}
```

- [seq 606](trajectory.jsonl#L606) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 607](trajectory.jsonl#L607) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0063","p0074","p0062"]}
```

- [seq 608](trajectory.jsonl#L608) **read_paragraphs result**

```json
[{"id":"p0063","sectionRef":"§ 5.1 IBM Representations and Warranties","text":"IBM covenants that it will comply with the laws applicable to IBM's business."},{"id":"p0074","sectionRef":"§ 5.4 Other Disclaimers","text":"c. IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES, PRODUCTS, DATA, APPARATUS AND SOFTWARE \"AS IS\", WITHOUT WARRANTY OF ANY KIND, INCLUDING, WITHOUT LIMITATION, THE IMPLIED …
```

- [seq 641](trajectory.jsonl#L641) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add a 90-day conformance/no-malicious-code warranty for Materials with a repair/replace/refund remedy, and carve the express warranties out of the \"AS IS\" disclaimer.","comment":"[Playbook] Section 5.1 warrants only care and skill in performing Services, and Section 5.4(c) puts all Materials on an \"AS IS\" basis with no conformance warranty or stated remedy. We have added a 90-day conformance and no-malicious-code warranty for Materials with a re-performance/repair/refund remedy, and carved the Section 5.1 warranties out of the disclaimer so the express warranty is not swallowed.","ops":[{"kind":"insert_after","paragraphId":"p0062","numbering":"c.","text":"c. for a period of ninety (90) days following delivery, each Material delivered by IBM will conform in all material respects to its documentation and to the applicable Service Option Attachment, and will not contain any virus, worm or other malicious code known to IBM. Customer's remedy for breach of the warranties in this Section 5.1 is, at IBM's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Material, or a refund of the charges paid for the non-conforming Services or Material."},{"kind":"replace","paragraphId":"p0074","oldText":"c. IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES","newText":"c. EXCEPT AS EXPRESSLY WARRANTED IN SECTION 5.1, IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES"}]}
```

- [seq 642](trajectory.jsonl#L642) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0062","segments":[{"type":"equal","text":"b. it has the requisite corporate power and authority to execute, deliver and perform its obligations under this Agreement."}]},{"paragraphId":"p0074","segments":[{"type":"equal","text":"c. "},{"type":"insert","text":"EXCEPT AS EXPRESSLY WARRANTED IN SECTION 5.1, "},{"type":"equal","text":"IBM PROVIDES A…
```

- [seq 678](trajectory.jsonl#L678) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0061","p0062","p0074"],"quote":"c. IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES, PRODUCTS, DATA, APPARATUS AND SOFTWARE \"AS IS\", WITHOUT WARRANTY OF ANY KIND, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY, AND FITNESS FOR&sbsp;A PARTICULAR PURPOSE.","rationale":"Section 5.1(a) gives an acceptable, open-ended services warranty (reasonable care and skill by qualified personnel) and 5.1 also includes a compliance-with-laws covenant, so the services limb meets the playbook. However, there is no conformance warranty at all for Materials/deliverables and no malicious-code warranty, and Section 5.4(c) affirmatively provides all Materials \"AS IS\" with all warranties disclaimed — the playbook's walk-away position for deliverables. Nor is there any repair/replace/refund or re-performance remedy anywhere in the Agreement (no remedy language in Sections 5, 9 or 12.2), so even the fallback (90 days for software/deliverables with the stated remedies) is not met on a material term. The redline adds a 90-day Materials conformance and no-malicious-code warranty with an IBM-elected re-performance/repair/refund remedy and carves the Section 5.1 warranties out of the 5.4(c) disclaimer; the 5.2 exclusivity language can stand once the express warranties are preserved.","confidence":0.8,"proposal":{"level":"preferred","summary":"Add a 90-day conformance/no-malicious-code warranty for Materials with a repair/replace/refund remedy, and carve the express warranties out of the \"AS IS\" disclaimer.","comment":"[Playbook] Section 5.1 warrants only care and skill in performing Services, and Section 5.4(c) puts all Materials on an \"AS IS\" basis with no conformance warranty or stated remedy. We have added a 90-day conformance and no-malicious-code warranty for Materials with a re-performance/repair/refund remedy, and carved the Section 5.1 warranties out of the disclaimer so the express warranty is not swallowed.","ops":[{"kind":"insert_after","paragraphId":"p0062","numbering":"c.","text":"c. for a period of ninety (90) days following delivery, each Material delivered by IBM will conform in all material respects to its documentation and to the applicable Service Option Attachment, and will not contain any virus, worm or other malicious code known to IBM. Customer's remedy for breach of the warranties in this Section 5.1 is, at IBM's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Material, or a refund of the charges paid for the non-conforming Services or Material."},{"kind":"replace","paragraphId":"p0074","oldText":"c. IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES","newText":"c. EXCEPT AS EXPRESSLY WARRANTED IN SECTION 5.1, IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES"}]}}
```

- [seq 679](trajectory.jsonl#L679) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 678](trajectory.jsonl#L678)
- Finding: `f-warranty-83f1bf2d` · **deviation** · confidence 0.80
- Location: § 5.1 IBM Representations and Warranties
- Quote: “c. IBM PROVIDES ALL MATERIALS AND ALL NON-IBM SERVICES, PRODUCTS, DATA, APPARATUS AND SOFTWARE "AS IS", WITHOUT WARRANTY OF ANY KIND, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY, AND FITNESS FOR&sbsp;A PARTICULAR PURPOSE.”
- Rationale: Section 5.1(a) gives an acceptable, open-ended services warranty (reasonable care and skill by qualified personnel) and 5.1 also includes a compliance-with-laws covenant, so the services limb meets the playbook. However, there is no conformance warranty at all for Materials/deliverables and no malicious-code warranty, and Section 5.4(c) affirmatively provides all Materials "AS IS" with all warranties disclaimed — the playbook's walk-away position for deliverables. Nor is there any repair/replace/refund or re-performance remedy anywhere in the Agreement (no remedy language in Sections 5, 9 or 12.2), so even the fallback (90 days for software/deliverables with the stated remedies) is not met on a material term. The redline adds a 90-day Materials conformance and no-malicious-code warranty with an IBM-elected re-performance/repair/refund remedy and carves the Section 5.1 warranties out of the 5.4(c) disclaimer; the 5.2 exclusivity language can stand once the express warranties are preserved.
- Proposal: **preferred** — Insert professional/workmanlike Services warranty (90 days), 12-month deliverable and software conformance to documentation, compliance with laws and no malicious code, with a repair, replacement or refund remedy.
- Comment: [Playbook] Section 5.1 warrants only reasonable care and skill and provides no conformance warranty or remedy for Materials or software. We have added our preferred express warranties - professional and workmanlike Services for 90 days from performance, 12-month conformance of deliverables and software to documentation, compliance with laws and no malicious code - with the standard repair, replacement or refund remedy.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "paragraphId": "p0063",
    "text": "IBM further represents and warrants that: (i) the Services will be performed in a professional and workmanlike manner, and for 90 days following performance will conform to the applicable Service Option Attachments; (ii) for 12 months following delivery, each Material or other deliverable and each item of software delivered by IBM will conform to its documentation; (iii) IBM will comply with all applicable laws; and (iv) no Material, deliverable or software delivered by IBM will contain any virus, worm or other malicious code. Customer's remedy for breach of these warranties is, at IBM's option, repair or replacement of the non-conforming Services, deliverable or software, or a refund of the charges paid for them."
  }
]
```

### Verifier and repair feedback

- [seq 714](trajectory.jsonl#L714) **Verdict: fail** — official check: warranty period ≥ 90 days or expressed in months/years: failed precision position: preferred warranty includes professional Services: State professional Services expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes workmanlike Services: State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes software conformance to documentation: State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 12-month software period: State 12-month software period expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification. precision position: warranty adds no re-performance remedy: Remove re-performance; the complete remedy set is repair, replacement, and refund only. official minimality gate: Operation 2 expands 9 words to 16 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion Locked target is preferred, but the insertion gives a 90-day Materials period rather than 12 months for software and states no services warranty period at all, so neither preferred nor even the fallback (30 days for services) is complete. Conformance is qualified as "in all material respects" and malicious code is limited to code "known to IBM"; the preferred position requires express conformance to documentation and an unqualified no-malicious-code warranty. Professional and workmanlike performance and a compliance-with-laws warranty are never added; "reasonable care and skill" is not equivalent. Minimality fails: the edit adds a re-performance remedy beyond the playbook's repair/replace/refund set, and the disclaimer rewrite expands 9 words to 16 rather than a tighter carve-out or standalone insertion. Intent is impaired by a numbering collision — the inserted warranty and the retained disclaimer are both labelled "c.", and the new text cross-refers to "the warranties in this Section 5.1" while sitting alongside a Section 5.4-style disclaimer, creating an ambiguous cross-reference. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":false}; {"name":"precision position: preferred warranty includes professional Services","ok":false,"detail":"State professional Services expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":false,"detail":"State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":false,"detail":"State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":false,"detail":"State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes repair remedy","ok":true}; {"name":"precision position: preferred warranty includes replacement remedy","ok":true}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":false,"detail":"State 12-month software period expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":false,"detail":"State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":false,"detail":"State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: warranty adds no re-performance remedy","ok":false,"detail":"Remove re-performance; the complete remedy set is repair, replacement, and refund only."}; {"name":"official minimality gate","ok":false,"detail":"Operation 2 expands 9 words to 16 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion"}.
- [seq 715](trajectory.jsonl#L715) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Services performed in a professional manner\n Verdict: not_met. Evidence: \"it will perform the Services using reasonable care and skill\" — \"professional\" is not stated as the standard\n- Services performed in a workmanlike manner\n Verdict: not_met. Evidence: No \"workmanlike\" standard appears; only \"reasonable care and skill and in accordance with the applicable Service Option Attachments\"\n- Deliverables/software conform to documentation (unqualified conformance)\n Verdict: not_met. Evidence: \"will conform in all material respects to its documentation\" — a materiality qualifier the preferred position does not permit\n- 12-month conformance period for software\n Verdict: not_met. Evidence: \"for a period of ninety (90) days following delivery\"\n- 90-day warranty period for Services measured from performance/completion\n Verdict: not_met. Evidence: The inserted period runs \"following delivery\" of \"each Material\"; no services warranty period is stated\n- Compliance with laws warranty\n Verdict: not_met. Evidence: No compliance-with-laws warranty anywhere in the redlined clause\n- No malicious code (unqualified)\n Verdict: not_met. Evidence: \"will not contain any virus, worm or other malicious code known to IBM\" — knowledge qualifier narrows the warranty\n\nDeterministic official failures:\n- official check: warranty period ≥ 90 days or expressed in months/years: failed\n- precision position: preferred warranty includes professional Services: State professional Services expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes workmanlike Services: State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes software conformance to documentation: State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 12-month software period: State 12-month software period expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: warranty adds no re-performance remedy: Remove re-performance; the complete remedy set is repair, replacement, and refund only.\n- official minimality gate: Operation 2 expands 9 words to 16 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion\n\nOffending extra words to remove verbatim:\n- EXCEPT AS EXPRESSLY WARRANTED IN SECTION 5.1,\n- re-performance of the non-conforming Services,\n- in all material respects\n- known to IBM\n- c.\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nIntent failed: restore the exact unrelated language and eliminate the named contradiction or dangling mechanic.\n\nVerifier reasons:\n- Locked target is preferred, but the insertion gives a 90-day Materials period rather than 12 months for software and states no services warranty period at all, so neither preferred nor even the fallback (30 days for services) is complete.\n- Conformance is qualified as \"in all material respects\" and malicious code is limited to code \"known to IBM\"; the preferred position requires express conformance to documentation and an unqualified no-malicious-code warranty.\n- Professional and workmanlike performance and a compliance-with-laws warranty are never added; \"reasonable care and skill\" is not equivalent.\n- Minimality fails: the edit adds a re-performance remedy beyond the playbook's repair/replace/refund set, and the disclaimer rewrite expands 9 words to 16 rather than a tighter carve-out or standalone insertion.\n- Intent is impaired by a numbering collision — the inserted warranty and the retained disclaimer are both labelled \"c.\", and the new text cross-refers to \"the warranties in this Section 5.1\" while sitting alongside a Section 5.4-style disclaimer, creating an ambiguous cross-reference."
- [seq 738](trajectory.jsonl#L738) **Verdict: repaired** — The inserted paragraph supplies every preferred atomic element: professional and workmanlike Services, 90-day Services conformance from performance, 12-month deliverable/software conformance to documentation, compliance with laws, no malicious code, and repair/replace/refund remedies. A single concise insertion is used for an absent conformance warranty; the original Section 5.1 wording, the corporate-authority representation, the IBM-business compliance covenant and the 'AS IS' third-party disclaimer are left untouched and effective. Minor point for the rationale only, not a deviation: the remedy election sits 'at IBM's option' and the refund is limited to 'charges paid', which is slightly narrower than an unqualified customer-elected refund. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":true}; {"name":"precision position: preferred warranty includes professional Services","ok":true}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":true}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":true}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":true}; {"name":"precision position: preferred warranty includes repair remedy","ok":true}; {"name":"precision position: preferred warranty includes replacement remedy","ok":true}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":true}; {"name":"precision position: warranty adds no re-performance remedy","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 505](trajectory.jsonl#L505)

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

- [seq 521](trajectory.jsonl#L521) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 522](trajectory.jsonl#L522) **search result**

```json
[]
```

- [seq 523](trajectory.jsonl#L523) **drafter → list_sections**

```json
{}
```

- [seq 524](trajectory.jsonl#L524) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 567](trajectory.jsonl#L567) **drafter → read_section**

```json
{"sectionId":"sec-5.3"}
```

- [seq 568](trajectory.jsonl#L568) **read_section result**

```json
{"sectionRef":"§ 5.3 Security","paragraphs":[{"id":"p0066","text":"5.3 Security"},{"id":"p0067","text":"a. Customer acknowledges that IBM does not control the transfer of data over telecommunications facilities, including the Internet."},{"id":"p0068","text":"b. Subject to the other disclaimers contained herein, IBM will implement the security features specified herein, including the IBM perform …
```

- [seq 569](trajectory.jsonl#L569) **drafter → read_section**

```json
{"sectionId":"sec-14.12"}
```

- [seq 570](trajectory.jsonl#L570) **read_section result**

```json
{"sectionRef":"§ 14.12 Risk of Loss","paragraphs":[{"id":"p0191","text":"14.12 Risk of Loss"},{"id":"p0192","text":"Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer."}]}
```

- [seq 571](trajectory.jsonl#L571) **drafter → read_section**

```json
{"sectionId":"sec-14.18"}
```

- [seq 572](trajectory.jsonl#L572) **read_section result**

```json
{"sectionRef":"§ 14.18 Data Protection","paragraphs":[{"id":"p0203","text":"14.18 Data Protection"},{"id":"p0204","text":"You agree to allow International Business Machines Corporation and entities within its Enterprise to store and use your contact information, including names, phone numbers, and e-mail addresses, anywhere they do business. Such information will be processed and used in connecti…
```

- [seq 611](trajectory.jsonl#L611) **drafter → search**

```json
{"query":"certificate of coverage liability limits maintain"}
```

- [seq 612](trajectory.jsonl#L612) **search result**

```json
[]
```

- [seq 613](trajectory.jsonl#L613) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"Hosting vendor processing Customer Data; no insurance clause in agreement"}
```

- [seq 614](trajectory.jsonl#L614) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 637](trajectory.jsonl#L637) **drafter → read_section**

```json
{"sectionId":"sec-14.19"}
```

- [seq 638](trajectory.jsonl#L638) **read_section result**

```json
{"sectionRef":"§ 14.19 Geographic Scope","paragraphs":[{"id":"p0205","text":"14.19 Geographic Scope"},{"id":"p0206","text":"Although it is possible that Services Recipients outside of the United States of America may access Customer's Web site, IBM's delivery of the Services will only occur within the United States of America, and IBM's obligations hereunder are valid only in the United States of…
```

- [seq 668](trajectory.jsonl#L668) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert vendor insurance clause in miscellaneous section","comment":"[Playbook] The agreement has no insurance provision even though IBM hosts our environment and processes Customer Data, so we have added a short clause requiring standard CGL, E&O and cyber coverage with certificates on request. If the stated limits are an issue, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0192","numbering":"14.12A","asHeading":false,"text":"14.12A Insurance. IBM shall maintain, at its own expense, throughout the Term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; cyber liability insurance of not less than USD 5,000,000 covering IBM's processing of Customer Data; and workers' compensation insurance as required by applicable law. IBM shall provide certificates of insurance to Customer on request."}]}
```

- [seq 669](trajectory.jsonl#L669) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0192","segments":[{"type":"equal","text":"Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer."}]}]}
```

- [seq 690](trajectory.jsonl#L690) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0192"],"quote":"Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer.","rationale":"A full-text search for insurance/coverage terms returns nothing, and the candidate sections (5.3 Security, 14.12 Risk of Loss, 14.18 Data Protection) contain no insurance undertaking. IBM is a hosting vendor that operates the e-business Hosting Environment and processes personal information on our behalf, so the playbook expects standard vendor coverage; a hosting vendor processing personal data with no insurance is walk-away territory. We inserted the preferred short clause (CGL 1M/2M, E&O 2M, cyber 5M, workers' comp, certificates on request) in the miscellaneous section next to Risk of Loss, with the E&O 1M / cyber 2M fallback flagged in the comment.","confidence":0.86,"proposal":{"level":"preferred","summary":"Insert vendor insurance clause in miscellaneous section","comment":"[Playbook] The agreement has no insurance provision even though IBM hosts our environment and processes Customer Data, so we have added a short clause requiring standard CGL, E&O and cyber coverage with certificates on request. If the stated limits are an issue, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.","ops":[{"kind":"insert_after","paragraphId":"p0192","numbering":"14.12A","asHeading":false,"text":"14.12A Insurance. IBM shall maintain, at its own expense, throughout the Term and for one (1) year thereafter: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; cyber liability insurance of not less than USD 5,000,000 covering IBM's processing of Customer Data; and workers' compensation insurance as required by applicable law. IBM shall provide certificates of insurance to Customer on request."}]}}
```

- [seq 691](trajectory.jsonl#L691) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 690](trajectory.jsonl#L690)
- Finding: `f-insurance-85b546a2` · **missing** · confidence 0.86
- Location: § 14.12 Risk of Loss
- Quote: “Risk of loss for all Base Components shall at all times remain with IBM. Risk of loss for all Customer Components shall at all times remain with Customer.”
- Rationale: A full-text search for insurance/coverage terms returns nothing, and the candidate sections (5.3 Security, 14.12 Risk of Loss, 14.18 Data Protection) contain no insurance undertaking. IBM is a hosting vendor that operates the e-business Hosting Environment and processes personal information on our behalf, so the playbook expects standard vendor coverage; a hosting vendor processing personal data with no insurance is walk-away territory. We inserted the preferred short clause (CGL 1M/2M, E&O 2M, cyber 5M, workers' comp, certificates on request) in the miscellaneous section next to Risk of Loss, with the E&O 1M / cyber 2M fallback flagged in the comment.
- Proposal: **preferred** — Insert vendor insurance clause after Risk of Loss, without post-termination tail
- Comment: [Playbook] The agreement has no insurance provision even though IBM hosts our environment and processes Customer Data, so we have added a short clause requiring standard CGL, E&O and cyber coverage plus workers' compensation, with certificates on request; we removed the one-year post-termination tail. If the stated limits are an issue, we can accept E&O of USD 1,000,000 and cyber of USD 2,000,000.
- Proposed ops:

```json
[
  {
    "asHeading": false,
    "kind": "insert_after",
    "numbering": "14.12A",
    "paragraphId": "p0192",
    "text": "14.12A Insurance. IBM shall maintain, at its own expense, throughout the Term: commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate; professional liability (errors and omissions) insurance of not less than USD 2,000,000; cyber liability insurance of not less than USD 5,000,000 covering IBM's processing of Customer Data; and workers' compensation insurance as required by applicable law. IBM shall provide certificates of insurance to Customer on request."
  }
]
```

### Verifier and repair feedback

- [seq 724](trajectory.jsonl#L724) **Verdict: fail** — All six preferred elements (CGL 1M/2M, E&O 2M, cyber 5M tied to Customer Data processing, statutory workers' comp, certificates on request) are expressly stated in the inserted 14.12A, so the locked preferred level is complete. The insertion is otherwise a concise, appropriate addition for an absent clause; it does not disturb the risk-of-loss sentences or any other commercial term, and introduces no undefined term or dangling mechanic ('Term' and 'Customer Data' are agreement-level concepts). Minimality fails only on the added post-termination coverage tail 'and for one (1) year thereafter', which is not part of the preferred position and extends the obligation beyond what was needed to complete the level; it should be deleted so the duration reads 'throughout the Term'. Fallback limits (E&O 1M / cyber 2M) are exceeded rather than unmet, which is consistent with the preferred bargain and not a defect. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: insurance obligation present","ok":true}; {"name":"precision position: insurance adds no post-termination coverage tail","ok":true}; {"name":"official minimality gate","ok":true}.
- [seq 725](trajectory.jsonl#L725) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nOffending extra words to remove verbatim:\n- and for one (1) year thereafter\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All six preferred elements (CGL 1M/2M, E&O 2M, cyber 5M tied to Customer Data processing, statutory workers' comp, certificates on request) are expressly stated in the inserted 14.12A, so the locked preferred level is complete.\n- The insertion is otherwise a concise, appropriate addition for an absent clause; it does not disturb the risk-of-loss sentences or any other commercial term, and introduces no undefined term or dangling mechanic ('Term' and 'Customer Data' are agreement-level concepts).\n- Minimality fails only on the added post-termination coverage tail 'and for one (1) year thereafter', which is not part of the preferred position and extends the obligation beyond what was needed to complete the level; it should be deleted so the duration reads 'throughout the Term'.\n- Fallback limits (E&O 1M / cyber 2M) are exceeded rather than unmet, which is consistent with the preferred bargain and not a defect."
- [seq 747](trajectory.jsonl#L747) **Verdict: repaired** — The document contained no insurance provision; a single concise inserted sub-clause supplies every preferred element (CGL 1M/2M, E&O 2M, cyber 5M tied to Customer Data processing, statutory workers' comp, certificates on request). No post-termination tail, audit rights, additional-insured, or other extras beyond the preferred position were added, so the insertion is minimal for an absent clause. The existing risk-of-loss allocation in 14.12 is untouched and no undefined term or dangling mechanic is introduced ('Term' and 'Customer Data' are agreement-level concepts). Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: insurance obligation present","ok":true}; {"name":"precision position: insurance adds no post-termination coverage tail","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 539](trajectory.jsonl#L539)

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

- [seq 561](trajectory.jsonl#L561) **drafter → list_sections**

```json
{}
```

- [seq 562](trajectory.jsonl#L562) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 563](trajectory.jsonl#L563) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 564](trajectory.jsonl#L564) **search result**

```json
[]
```

- [seq 595](trajectory.jsonl#L595) **drafter → search**

```json
{"query":"commit"}
```

- [seq 596](trajectory.jsonl#L596) **search result**

```json
[]
```

- [seq 597](trajectory.jsonl#L597) **drafter → search**

```json
{"query":"volume"}
```

- [seq 598](trajectory.jsonl#L598) **search result**

```json
[{"paragraphId":"p0142","sectionRef":"§ 11.5 Capacity Planning","snippet":"…ated peaks in demand that may significantly increase Web site hits, transaction volumes, or otherwise increase system resource utilization."}]
```

- [seq 599](trajectory.jsonl#L599) **drafter → read_section**

```json
{"sectionId":"sec-4.1"}
```

- [seq 600](trajectory.jsonl#L600) **read_section result**

```json
{"sectionRef":"§ 4.1 Charges","paragraphs":[{"id":"p0051","text":"4.1 Charges"},{"id":"p0052","text":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments."}]}
```

- [seq 601](trajectory.jsonl#L601) **drafter → read_section**

```json
{"sectionId":"sec-11.5"}
```

- [seq 602](trajectory.jsonl#L602) **read_section result**

```json
{"sectionRef":"§ 11.5 Capacity Planning","paragraphs":[{"id":"p0141","text":"11.5 Capacity Planning"},{"id":"p0142","text":"Customer is responsible for determining whether the Base Components, IBM provided Internet access bandwidth, Customer Components and their combination will meet Customer's capacity or performance needs. Customer is responsible for planning for and requesting changes to the B…
```

- [seq 627](trajectory.jsonl#L627) **drafter → read_section**

```json
{"sectionId":"sec-3.4"}
```

- [seq 628](trajectory.jsonl#L628) **read_section result**

```json
{"sectionRef":"§ 3.4 Termination for Convenience","paragraphs":[{"id":"p0043","text":"3.4 Termination for Convenience"},{"id":"p0044","text":"Customer may terminate this Agreement (including all Service Option Attachments) or any Service Option Attachment (with the exception of any Service Option Attachment that is a prerequisite for the provision of Services under a non-terminated Service Option…
```

- [seq 629](trajectory.jsonl#L629) **drafter → read_section**

```json
{"sectionId":"sec-14.11"}
```

- [seq 630](trajectory.jsonl#L630) **read_section result**

```json
{"sectionRef":"§ 14.11 No Resale","paragraphs":[{"id":"p0189","text":"14.11 No Resale"},{"id":"p0190","text":"Customer shall not resell the Services, in whole or in part."}]}
```

- [seq 631](trajectory.jsonl#L631) **drafter → search**

```json
{"query":"purchase"}
```

- [seq 632](trajectory.jsonl#L632) **search result**

```json
[{"paragraphId":"p0155","sectionRef":"§ 12.3 No Sale or Lease of Goods","snippet":"…No goods are sold or leased by IBM under this Agreement. If Customer desires to purchase or to lease goods from IBM, such purchase or lease will be governed by a separa…"},{"paragraphId":"p0155","sectionRef":"§ 12.3 No Sale or Lease of Goods","snippet":"…his Agreement. If Customer desires to purchase or to lease g…
```

- [seq 633](trajectory.jsonl#L633) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 634](trajectory.jsonl#L634) **search result**

```json
[{"paragraphId":"p0057","sectionRef":"§ 4.3 Taxes","snippet":"…rnmental authorities. Charges specified herein (including in an Order Form) are exclusive of any such taxes, duties, levies or fees."},{"paragraphId":"p0064","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"5.2 Exclusivity of Warranties"},{"paragraphId":"p0065","sectionRef":"§ 5.2 Exclusivity of Warranties","snippet":"THE WAR…
```

- [seq 662](trajectory.jsonl#L662) **drafter → read_section**

```json
{"sectionId":"sec-3.1"}
```

- [seq 663](trajectory.jsonl#L663) **read_section result**

```json
{"sectionRef":"§ 3.1 Term","paragraphs":[{"id":"p0037","text":"3.1 Term"},{"id":"p0038","text":"This Agreement will be effective beginning on 12:01 a.m., Eastern Time, on the day after the date of last signature to these Base Terms (\"Effective Date\") and ending on the expiration and/or termination of all Service Option Attachments, unless the Agreement is terminated earlier in accordance with t…
```

- [seq 664](trajectory.jsonl#L664) **drafter → search**

```json
{"query":"Order Form","limit":15}
```

- [seq 665](trajectory.jsonl#L665) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ Preamble","snippet":"…and the documents referenced herein (\"Base Terms\"), e-business hosting services order forms accepted by IBM (\"Order Forms\"), and the following attachments:"},{"paragraphId":"p0008","sectionRef":"§ Preamble","snippet":"…erein (\"Base Terms\"), e-business hosting services order forms accepted by IBM (\"Order Forms\"), and the followi…
```

- [seq 686](trajectory.jsonl#L686) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0052","p0044","p0142"],"quote":"Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments.","rationale":"This sits at the preferred position: there is no minimum purchase commitment, take-or-pay, shortfall charge, or volume floor imposed on Customer anywhere in the Agreement (searches for \"minimum\", \"commit\", \"purchase\" and \"volume\" return nothing of that kind). Under § 4.1 Charges are payable only for Services ordered via Order Forms/Service Option Attachments and may be one-time, installment, recurring or usage-based, i.e. fees for ordered or actual usage only. § 11.5 Capacity Planning leaves capacity sizing and any additional capacity requests entirely to Customer's determination rather than mandating committed volumes, and § 14.11 only restricts resale (a scope limit, not a purchase commitment). Any commitment that might appear in an Order Form is also backstopped by the § 3.4 convenience exit at one month's notice. We note as a residual, not a deviation, that § 3.4(b) preserves \"early termination charges, if any, specified in Attachment A\" — those attachments should be checked when issued to confirm they operate as a true-up rather than a penalty.","confidence":0.85}
```

- [seq 687](trajectory.jsonl#L687) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 686](trajectory.jsonl#L686)
- Finding: `f-mincommit-86ddcdeb` · **compliant** · confidence 0.85
- Location: § 4.1 Charges
- Quote: “Charges for applicable Services will be specified in Service Option Attachments and Order Forms. Charges can be specified as one-time, installment, recurring, or usage. IBM will invoice such Charges when they begin or are due as set forth in Service Option Attachments.”
- Rationale: This sits at the preferred position: there is no minimum purchase commitment, take-or-pay, shortfall charge, or volume floor imposed on Customer anywhere in the Agreement (searches for "minimum", "commit", "purchase" and "volume" return nothing of that kind). Under § 4.1 Charges are payable only for Services ordered via Order Forms/Service Option Attachments and may be one-time, installment, recurring or usage-based, i.e. fees for ordered or actual usage only. § 11.5 Capacity Planning leaves capacity sizing and any additional capacity requests entirely to Customer's determination rather than mandating committed volumes, and § 14.11 only restricts resale (a scope limit, not a purchase commitment). Any commitment that might appear in an Order Form is also backstopped by the § 3.4 convenience exit at one month's notice. We note as a residual, not a deviation, that § 3.4(b) preserves "early termination charges, if any, specified in Attachment A" — those attachments should be checked when issued to confirm they operate as a true-up rather than a penalty.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 585](trajectory.jsonl#L585)

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

- [seq 617](trajectory.jsonl#L617) **drafter → list_sections**

```json
{}
```

- [seq 618](trajectory.jsonl#L618) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":37},{"id":"sec-3.1","number":"3.1","heading":"Term","level":2,"paragraphCount":2},{"id":"sec-3.2","number":"3.2","heading":"Renewal","level":2,"paragraphCount":2},{"id":"sec-3.3","number":"3.3","heading":"Termination for Cause","level":2,"paragraphCount":2},{"id":"sec-3.4","number":"3.4","heading":"Termination for Convenience",…
```

- [seq 619](trajectory.jsonl#L619) **drafter → read_section**

```json
{"sectionId":"sec-3.5"}
```

- [seq 620](trajectory.jsonl#L620) **read_section result**

```json
{"sectionRef":"§ 3.5 Effect of&sbsp;Termination","paragraphs":[{"id":"p0048","text":"3.5 Effect of&sbsp;Termination"},{"id":"p0049","text":"Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under oth…
```

- [seq 648](trajectory.jsonl#L648) **drafter → read_section**

```json
{"sectionId":"sec-11.6"}
```

- [seq 649](trajectory.jsonl#L649) **read_section result**

```json
{"sectionRef":"§ 11.6 Content and Digital Certificates","paragraphs":[{"id":"p0143","text":"11.6 Content and Digital Certificates"},{"id":"p0144","text":"Customer is solely responsible for:"},{"id":"p0145","text":"a. all Content including, without limitation, its selection, licensing, accuracy, performance, maintenance, and support; and"},{"id":"p0146","text":"b. the selection, management and use…
```

- [seq 650](trajectory.jsonl#L650) **drafter → read_section**

```json
{"sectionId":"sec-14.18"}
```

- [seq 651](trajectory.jsonl#L651) **read_section result**

```json
{"sectionRef":"§ 14.18 Data Protection","paragraphs":[{"id":"p0203","text":"14.18 Data Protection"},{"id":"p0204","text":"You agree to allow International Business Machines Corporation and entities within its Enterprise to store and use your contact information, including names, phone numbers, and e-mail addresses, anywhere they do business. Such information will be processed and used in connecti…
```

- [seq 652](trajectory.jsonl#L652) **drafter → search**

```json
{"query":"transition"}
```

- [seq 653](trajectory.jsonl#L653) **search result**

```json
[]
```

- [seq 654](trajectory.jsonl#L654) **drafter → search**

```json
{"query":"delete"}
```

- [seq 655](trajectory.jsonl#L655) **search result**

```json
[]
```

- [seq 672](trajectory.jsonl#L672) **drafter → search**

```json
{"query":"Content","limit":30}
```

- [seq 673](trajectory.jsonl#L673) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ Preamble","snippet":"d. \"Content\" means information, software, and data that Customer provides, including, witho…"},{"paragraphId":"p0018","sectionRef":"§ Preamble","snippet":"e. \"Content Administrator\" means an employee or Subcontractor of Customer who is authorized…"},{"paragraphId":"p0018","sectionRef":"§ Preamble","snippet":"…or of Customer who is a…
```

- [seq 674](trajectory.jsonl#L674) **drafter → search**

```json
{"query":"termination","limit":30}
```

- [seq 675](trajectory.jsonl#L675) **search result**

```json
[{"paragraphId":"p0036","sectionRef":"§ Preamble","snippet":"…------------------------------------------------------------------ 3.0 Term and Termination"},{"paragraphId":"p0038","sectionRef":"§ 3.1 Term","snippet":"…ture to these Base Terms (\"Effective Date\") and ending on the expiration and/or termination of all Service Option Attachments, unless the Agreement is terminated earlier i…"},{"par…
```

- [seq 694](trajectory.jsonl#L694) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Insert transition assistance and Content return/deletion into Effect of Termination in IBM hosting services agreement"}
```

- [seq 695](trajectory.jsonl#L695) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 696](trajectory.jsonl#L696) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0017","p0169"]}
```

- [seq 697](trajectory.jsonl#L697) **read_paragraphs result**

```json
[{"id":"p0017","sectionRef":"§ Preamble","text":"d. \"Content\" means information, software, and data that Customer provides, including, without limitation, any hypertext markup language files, scripts, programs, recordings, sound, music, graphics, images, applets or servlets that Customer or its Subcontractors or Services Recipients create, install, upload or transfer in or through the e-busines…
```

- [seq 708](trajectory.jsonl#L708) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert transition assistance and Content return/deletion obligations into Section 3.5","comment":"[Playbook] We have added a standard exit provision to Section 3.5 so that, on expiry or termination, IBM provides up to six months of transition assistance at its then-current rates, returns our Content in a machine-readable format within thirty days, and then deletes and certifies deletion. As a hosted services agreement, the contract currently gives us no right to retrieve our Content on exit; we can accept a 90-day assistance window as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0049","numbering":"","text":"Upon expiry or termination of this Agreement or any Service Option Attachment for any reason, IBM shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at IBM's then-current rates; (b) within thirty (30) days of Customer's request, return to Customer all Content in a commonly used, machine-readable format; and (c) thereafter delete Content from its systems and certify such deletion in writing."}]}
```

- [seq 709](trajectory.jsonl#L709) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0049","segments":[{"type":"equal","text":"Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under other Service Option Attachments."}]}]}
```

- [seq 720](trajectory.jsonl#L720) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0049"],"quote":"Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under other Service Option Attachments.","rationale":"This is a hosted e-business services agreement, but Section 3.5 (Effect of Termination) addresses only Customer's payment obligations; no provision anywhere in the Agreement (including 11.6 Content and Digital Certificates, 14.18 Data Protection, or 14.2 Survival) gives us a right to transition assistance, return or export of our Content, or any deletion/certification obligation on IBM. Searches for transition, deletion and data return returned nothing. The rule's fallback (90 days' assistance plus 30-day export) is therefore also unmet, so we insert the preferred exit provision into Section 3.5, which already survives termination under Section 14.2.","confidence":0.86,"proposal":{"level":"preferred","summary":"Insert transition assistance and Content return/deletion obligations into Section 3.5","comment":"[Playbook] We have added a standard exit provision to Section 3.5 so that, on expiry or termination, IBM provides up to six months of transition assistance at its then-current rates, returns our Content in a machine-readable format within thirty days, and then deletes and certifies deletion. As a hosted services agreement, the contract currently gives us no right to retrieve our Content on exit; we can accept a 90-day assistance window as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0049","numbering":"","text":"Upon expiry or termination of this Agreement or any Service Option Attachment for any reason, IBM shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at IBM's then-current rates; (b) within thirty (30) days of Customer's request, return to Customer all Content in a commonly used, machine-readable format; and (c) thereafter delete Content from its systems and certify such deletion in writing."}]}}
```

- [seq 721](trajectory.jsonl#L721) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 720](trajectory.jsonl#L720)
- Finding: `f-transition-1034bbf3` · **missing** · confidence 0.86
- Location: § 3.5 Effect of&sbsp;Termination
- Quote: “Upon the date of termination, all Customer payment obligations accrued hereunder through the date of termination will become due and payable. The termination of selected Service Option Attachments will not affect Customer's obligation to pay charges under other Service Option Attachments.”
- Rationale: This is a hosted e-business services agreement, but Section 3.5 (Effect of Termination) addresses only Customer's payment obligations; no provision anywhere in the Agreement (including 11.6 Content and Digital Certificates, 14.18 Data Protection, or 14.2 Survival) gives us a right to transition assistance, return or export of our Content, or any deletion/certification obligation on IBM. Searches for transition, deletion and data return returned nothing. The rule's fallback (90 days' assistance plus 30-day export) is therefore also unmet, so we insert the preferred exit provision into Section 3.5, which already survives termination under Section 14.2.
- Proposal: **preferred** — Insert transition assistance and Content return/deletion obligations into Section 3.5
- Comment: [Playbook] We have added a standard exit provision to Section 3.5 so that, on expiry or termination, IBM provides up to six months of transition assistance at its then-current rates, returns our Content in a machine-readable format within thirty days, and then deletes and certifies deletion. As a hosted services agreement, the contract currently gives us no right to retrieve our Content on exit; we can accept a 90-day assistance window as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "",
    "paragraphId": "p0049",
    "text": "Upon expiry or termination of this Agreement or any Service Option Attachment for any reason, IBM shall (a) at Customer's request, provide reasonable transition assistance for up to six (6) months at IBM's then-current rates; (b) within thirty (30) days of Customer's request, return to Customer all Content in a commonly used, machine-readable format; and (c) thereafter delete Content from its systems and certify such deletion in writing."
  }
]
```

### Verifier and repair feedback

- [seq 743](trajectory.jsonl#L743) **Verdict: fail** — precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation. precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation. precision position: preferred transition return deadline runs from expiry or termination, not a later request: Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later. The data-return deadline is measured from 'Customer's request' rather than from expiry or termination, so there is no fixed 30-day post-exit return obligation; a request condition must not swallow the mandatory post-termination data return. Change (b) to 'within thirty (30) days of expiry or termination'. The format is 'commonly used, machine-readable' rather than the preferred express 'standard machine-readable format'; substitute 'standard machine-readable format'. Because both the preferred and fallback 30-day return element fails on the same request-triggered timing, neither level is complete despite the 6-month assistance window and deletion/certification being satisfied. Insertion is otherwise appropriately concise for an absent clause and does not disturb the existing payment-accrual sentences. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: data return/transition present","ok":true}; {"name":"precision position: preferred transition includes then-current rates","ok":true}; {"name":"precision position: preferred transition includes standard machine-readable format","ok":false,"detail":"State standard machine-readable format expressly in the transition obligation."}; {"name":"precision position: preferred transition includes 30-day return after expiry or termination","ok":false,"detail":"State 30-day return after expiry or termination expressly in the transition obligation."}; {"name":"precision position: preferred transition includes deletion after return","ok":true}; {"name":"precision position: preferred transition includes certification of deletion","ok":true}; {"name":"precision position: preferred transition return deadline runs from expiry or termination, not a later request","ok":false,"detail":"Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later."}; {"name":"precision position: transition duties do not newly trigger on termination of an individual Order Form","ok":true}; {"name":"official minimality gate","ok":true}.
- [seq 744](trajectory.jsonl#L744) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Return of Customer Data within 30 days of expiry or termination\n Verdict: not_met. Evidence: within thirty (30) days of Customer's request, return to Customer all Content — deadline runs from a later request, not from expiry or termination\n- Return in a standard machine-readable format\n Verdict: not_met. Evidence: in a commonly used, machine-readable format (not the express 'standard' machine-readable format)\n\nDeterministic official failures:\n- precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation.\n- precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation.\n- precision position: preferred transition return deadline runs from expiry or termination, not a later request: Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later.\n\nOffending extra words to remove verbatim:\n- of Customer's request\n\nVerifier reasons:\n- The data-return deadline is measured from 'Customer's request' rather than from expiry or termination, so there is no fixed 30-day post-exit return obligation; a request condition must not swallow the mandatory post-termination data return. Change (b) to 'within thirty (30) days of expiry or termination'.\n- The format is 'commonly used, machine-readable' rather than the preferred express 'standard machine-readable format'; substitute 'standard machine-readable format'.\n- Because both the preferred and fallback 30-day return element fails on the same request-triggered timing, neither level is complete despite the 6-month assistance window and deletion/certification being satisfied.\n- Insertion is otherwise appropriately concise for an absent clause and does not disturb the existing payment-accrual sentences."

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 760](trajectory.jsonl#L760) memo LLM request
- [seq 761](trajectory.jsonl#L761) memo LLM response (replay)

```markdown
# Issues Memo — IBM e-Business Hosting Agreement (Customer: Bluefly)

**Prepared by:** In-house counsel (customer side) 
**Document reviewed:** Hosting agreement, sections as cited below (document reference: 3.1 Term) 
**Basis:** Verified playbook findings only

---

## 1. Executive summary

The commercial core of this agreement is workable. IBM's infringement indemnity in § 8.1 is strong — indemnification payments are carved out of IBM's liability cap under § 9.1(a), making it effectively uncapped — and the agreement imposes no exclusivity, non-compete, MFN, minimum-purchase or non-solicitation burden on us (§ 14.16 Freedom of Action). Governing law is New York (§ 14.3), our preferred position, with no arbitration and no foreign forum.

Our concerns are concentrated in three areas:

1. **Exit and continuity.** There is no transition assistance, Content return, export or deletion right anywhere in the agreement (§ 3.5 addresses only our payment obligations), and our one-month convenience right in § 3.4 is conditioned on uncapped "early termination charges" cross-referenced to an Attachment A that IBM may change unilaterally on 90 days' notice (§ 13.1). For a hosted environment holding our Content, this is the most material gap.
2. **Ownership and licence stability.** § 7.0 defaults all work IBM creates for us to Type II Materials (IBM owns; we get an internal-use-only licence with no modification or sublicensing rights), and no provision confirms we retain ownership of Content and Customer Components. Separately, the § 12.1 Base Components licence is expressly **revocable** at IBM's discretion and does not extend to our Affiliates or subcontractors.
3. **Risk allocation.** The caps in §§ 9.1/9.2 are mutual and at fallback on basis, but there is no carve-out for confidentiality, data protection/security breach, gross negligence, wilful misconduct, fraud or IP infringement, and § 9.1(2) bars any recovery for loss of or damage to our records or data. § 5.4(c) puts all Materials "AS IS" with no conformance, malicious-code or remedy provision. IBM carries no insurance obligation despite hosting our environment and processing personal information.

Also one-sided: assignment (§ 14.10 binds only us; IBM may assign freely) and IBM's unlimited, unannounced investigation right (§ 11.3), and auto-renewal for a term equal to the prior term with 90 days' non-renewal notice (§ 3.2).

**Verification caveat.** Three findings did not clear internal verification and must be re-checked against the executed text before any redline issues: **IP** (§ 5.4 / § 7.0), **TRANSITION** (§ 3.5) and **T4C** (§ 3.4). Do not send those markups until confirmed.

---

## 2. Findings

| Severity | Rule | Status | Section | Summary |
|---|---|---|---|---|
| Critical | INDEMN — Indemnification by Vendor | Compliant | § 8.1 (Indemnification by IBM) | IP infringement defence and indemnity extending to our Enterprise and personnel; carved out of the cap by § 9.1(a), so above fallback. Refund remedy capped at 12 months' charges; no separate breach-of-law/data-breach limb — noted, not flagged. |
| High | IP — Ownership of deliverables and Customer Data | **Deviation** *(verification failed — re-check)* | § 5.4 / § 7.0 (Materials) | Deliverables default to Type II (IBM owns); our licence is internal-use only, no modification or sublicensing. No provision confirms our ownership of Content/Customer Components. Fails preferred and fallback. Proposal: default work created during the performance period to Type I and add a Customer Data/Content ownership sentence. |
| High | EXCLUSIVITY — Exclusivity binding Customer | Compliant | § 14.16 (Freedom of Action) | No exclusivity, sole-source or requirements commitment; § 14.16 confirms we may contract with others. |
| High | NONCOMPETE — Non-compete on Customer | Compliant | § 14.16 (Freedom of Action) | No non-compete or field-of-use covenant. § 14.11 (no resale) is a scope limit on IBM's Services, not a restraint on our business. |
| Medium | TRANSITION — Post-termination transition and data return | **Missing** *(verification failed — re-check)* | § 3.5 (Effect of Termination) | No transition assistance, Content return/export or deletion/certification obligation anywhere (incl. §§ 11.6, 14.18, 14.2). Fallback (90 days' assistance + 30-day export) also unmet. Proposal: insert transition assistance and Content return/deletion into § 3.5, which survives under § 14.2. |
| Medium | GOVLAW — Governing law and venue | Compliant | § 14.3 (Choice of Law) | New York substantive law; no arbitration, no foreign forum. No express exclusive venue designation — noted, not flagged. §§ 14.4 (jury waiver) and 14.14 (2-year limitations) are mutual. |
| Medium | MFN — Most-favoured-nation burdening Customer | Compliant | § 14.16 (Freedom of Action) | No MFN, best-pricing or price-matching obligation on us (§§ 4.1, 13.1, 14.11 reviewed). |
| Medium | MINCOMMIT — Minimum purchase / volume commitments | Compliant | § 4.1 (Charges) | No minimum, take-or-pay or shortfall charge; charges apply to ordered or actual usage. Residual: check § 3.4(b) Attachment A early-termination charges operate as a true-up, not a penalty. |
| Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant | § 14.8 (Personnel) | No hiring, solicitation or no-hire covenant binds us. |
| Low | ASSIGN — Assignment and change of control | Deviation | § 14.10 (Assignment) | Restricts only us (consent required, with M&A carve-out); IBM's assignment right is unrestricted, so IBM could transfer to a competitor. Fails fallback on mutuality. No change-of-control termination or re-pricing right in IBM's favour, so no walk-away trigger. Proposal: reciprocal consent plus affiliate/asset-sale carve-out and no assignment to a competitor. |
| Low | AUDIT — Audit rights against Customer | Deviation | § 11.3 (Suspected Violations) | IBM's investigation right is unlimited in frequency, unannounced (the notice provision applies only before restricting access/removing Content), silent on cost and on an independent confidentiality-bound auditor, and does not exclude access to our systems. Proposal: add frequency, notice, cost and no-system-access limits, preserving IBM's emergency/legal carve-out. |
| Low | INSURANCE — Vendor insurance | Missing | § 14.12 (Risk of Loss) | No insurance undertaking anywhere (§§ 5.3, 14.12, 14.18 reviewed) despite IBM operating the hosting environment and processing personal information. Proposal: insert CGL 1M/2M, E&O 2M, cyber 5M, workers' comp, certificates on request (fallback E&O 1M / cyber 2M). |
| Low | LD — Liquidated damages payable by Customer | Deviation | § 3.4 (Termination for Convenience) | § 3.4(b) early termination charges are unquantified, set by Attachment A, which IBM may change unilaterally on 90 days' notice (§ 13.1). Fails fallback (cap of three months' fees); § 9.2 caps damages, not contractual charges. Proposal: cap at three months' recurring charges as the sole amount, no other penalties. § 3.3 (no charges where IBM is in breach) benefits us. |
| Low | LICENSE — Licence grant scope | Deviation | § 12.1 (License) | Grant is expressly **revocable** with no cause standard, and runs to "Customer" only — Affiliates and subcontractors are excluded, with § 14.17 closing off any implied route. Proposal: extend to Affiliates/subcontractors acting on our behalf, tie revocation to termination for cause under § 3.3, confirm successor transfer (fallback: Affiliates added on written notice). |
| Low | LOL-CAP — Limitation of liability | Deviation | § 9.1 (IBM's Limitation of Liability) | Caps are mutual (greater of $100,000 or 12 months' charges paid) — at/above fallback on mutuality and basis; the $100,000 floor is below our preferred USD 1,000,000 floor, noted not flagged. Fails fallback on carve-outs: none for confidentiality, data protection/security, gross negligence, wilful misconduct, fraud or IP infringement. Aggravated by § 6 (§§ 5, 9, 10 prevail over the AECI) and § 9.1(2) (no recovery for loss of our records or data). Proposal: reset caps to greater of USD 1,000,000 / 12 months' fees paid or payable and add a single mutual Excluded Claims provision. |
| Low | RENEWAL — Auto-renewal and notice window | Deviation | § 3.2 (Renewal) | Renews automatically for a term equal to the prior term (multi-year renewals wherever an Order Form exceeds 12 months) with 90 days' non-renewal notice; no cap on renewal uplift (§§ 3.2, 4.1). Proposal: 12-month renewals, 30 days' notice, 60-day IBM reminder, uplift capped at lesser of CPI and 3% (fallback: 60 days / 5%). |
| Low | T4C — Termination for convenience | **Deviation** *(verification failed — re-check)* | § 3.4 (Termination for Convenience) | Our one-month convenience right and the absence of any IBM convenience right are both preferred-position outcomes, but the right is conditioned on uncapped early termination charges (Attachment A / Service Option Attachments) with no refund of prepaid Charges (§ 3.5 only accelerates accrued amounts). Proposal: apply the fallback three-month cap plus pro-rata refund of prepaid Charges. |
| Low | WARRANTY — Performance warranty and duration | Deviation | § 5.1 (IBM Representations and Warranties) | § 5.1(a) services warranty (reasonable care and skill, qualified personnel) plus compliance with laws is acceptable, but there is no conformance or malicious-code warranty for Materials/deliverables, § 5.4(c) puts all Materials "AS IS", and no repair/replace/refund or re-performance remedy exists (§§ 5, 9, 12.2). Proposal: 90-day Materials conformance and no-malicious-code warranty with an IBM-elected re-performance/repair/refund remedy, carved out of the § 5.4(c) disclaimer. |

---

## 3. Walk-away items

These findings sit in, or touch, walk-away territory under the playbook and should be treated as conditions of signature rather than negotiating positions:

1. **Revocable licence — § 12.1.** A licence to the Base Components that IBM may revoke at discretion, with no cause standard, is walk-away territory. Revocation must be tied to termination for cause under § 3.3.
2. **All Materials "AS IS" — § 5.4(c).** A blanket disclaimer of all warranties for deliverables, with no remedy anywhere in the agreement, is the playbook's walk-away position for deliverables.
3. **No vendor insurance — § 14.12 area.** A hosting vendor operating our environment and processing personal information with no insurance obligation is walk-away territory.
4. **Unlimited, unannounced audit/investigation right — § 11.3.** Unlimited frequency with no notice, cost allocation or system-access exclusion touches walk-away territory.
5. **Automatic multi-year renewal — § 3.2.** Renewal for a term equal to the prior term produces automatic multi-year renewals wherever an Order Form term exceeds 12 months — walk-away territory.

**Walk-away triggers checked and *not* present:** foreign exclusive venue or arbitration seated abroad (§ 14.3 — New York law, no arbitration); change-of-control termination or re-pricing right in IBM's favour (§ 14.10); one-way indemnity (our § 8.2 indemnity is cut back by § 8.2(c) for IBM's bad faith, wilful misconduct, gross negligence or breach).

---

## 4. Next steps

1. **Re-verify before issuing.** Confirm the section text and references underpinning the **IP** (§ 5.4 / § 7.0 Materials), **TRANSITION** (§ 3.5) and **T4C** (§ 3.4) findings; these three did not clear verification. Hold the associated redlines until confirmed.
2. **Issue the priority redlines.** In order: (a) transition assistance and Content return/deletion into § 3.5; (b) Type I default and Customer Data/Content ownership in § 7.0; (c) mutual Excluded Claims provision and cap reset in §§ 9.1/9.2, including deletion of the § 9.1(2) records/data bar; (d) revocability and Affiliate/subcontractor scope in § 12.1; (e) 90-day Materials conformance and no-malicious-code warranty with remedy, carved out of § 5.4(c).
3. **Bundle the exit-cost points.** The § 3.4(b) early termination charge drives both the **LD** and **T4C** findings; negotiate once, applying the three-month cap plus pro-rata refund of prepaid Charges, and confirm it is the sole amount payable.
4. **Obtain Attachment A and the Service Option Attachments** before signature and confirm that any early termination charge operates as a true-up rather than a penalty; note IBM's unilateral 90-day change right under § 13.1 when assessing.
5. **Close the remaining one-sided terms.** § 14.10 (reciprocal assignment plus affiliate/asset-sale carve-out, no assignment to a competitor); § 11.3 (frequency, notice, cost, no system access); § 3.2 (12-month renewals, 30 days' notice, uplift cap).
6. **Add the insurance clause** next to § 14.12, with the E&O 1M / cyber 2M fallback available.
7. **No action required** on INDEMN, EXCLUSIVITY, NONCOMPETE, GOVLAW, MFN, MINCOMMIT and NOSOLICIT — these are compliant and we will not redline them.
```

## Apply and validation

No apply or output-validation event was recorded.
