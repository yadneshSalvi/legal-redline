# Trajectory: cuad-corio-hosting

| Run | Value |
|---|---|
| Contract | cuad-corio-hosting — 1 EXHIBIT 10.5 |
| Config | final |
| Parties | Corio Inc. (our party) ↔ Commerce One, Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 5m 0.3s (300,349 ms) |
| Calls | 140 LLM · 169 tool · 0 retries |
| Tokens | 53,390 input · 83,025 output · 1,002,689 cache read · 179,840 cache write |
| Cost | $3.967919 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 578 | 120 | 169 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 651](trajectory.jsonl#L651) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 163](trajectory.jsonl#L163)–[seq 654](trajectory.jsonl#L654) |
| assembler | 21 | 0 | 0 | — | [seq 200](trajectory.jsonl#L200)–[seq 662](trajectory.jsonl#L662) |
| memo | 4 | 1 | 0 | — | [seq 658](trajectory.jsonl#L658)–[seq 661](trajectory.jsonl#L661) |
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
{"sectionId":"sec-9"}
```

- [seq 14](trajectory.jsonl#L14) **read_section result**

```json
{"sectionRef":"§ 9 LIMITATION OF LIABILITY.","paragraphs":[{"id":"p0089","text":"9 LIMITATION OF LIABILITY."},{"id":"p0090","text":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE L…
```

- [seq 15](trajectory.jsonl#L15) **drafter → list_sections**

```json
{}
```

- [seq 16](trajectory.jsonl#L16) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 73](trajectory.jsonl#L73) **drafter → read_section**

```json
{"sectionId":"sec-8-2"}
```

- [seq 74](trajectory.jsonl#L74) **read_section result**

```json
{"sectionRef":"§ 8 INDEMNIFICATION.","paragraphs":[{"id":"p0085","text":"8 INDEMNIFICATION."},{"id":"p0086","text":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringe…
```

- [seq 75](trajectory.jsonl#L75) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 76](trajectory.jsonl#L76) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0093","text":"10 CONFIDENTIALITY."},{"id":"p0094","text":"Each party hereby agrees that it shall not use any Confidential Information received from the other party other than as expressly permitted under the terms of a non-disclosure agreement to be concurrently executed with this Agreement."}]}
```

- [seq 105](trajectory.jsonl#L105) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"Mutual 12-month fee cap narrowed to per-transaction amounts; only indemnification carved out"}
```

- [seq 134](trajectory.jsonl#L134) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-lol-2","source":"Northstar Hosting Agreement (Jun 2025)","clauseAfter":"Except for Excluded Claims, each party's liability is limited to the greater of twelve months' fees and USD 1,000,000.","comment":"[Playbook] We added a meaningful mutual cap and preserved uncapped treatment for excluded claims.","level":"preferred"},{"id":"seed-lol-1","source":"Acme Cloud MSA (Mar …
```

- [seq 135](trajectory.jsonl#L135) **drafter → get_definition**

```json
{"term":"Fees"}
```

- [seq 136](trajectory.jsonl#L136) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 171](trajectory.jsonl#L171) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make the mutual cap a true 12-months'-fees floor of US$1,000,000 and add standard uncapped carve-outs","comment":"[Playbook] We removed the \"transaction which the liability relates to\" narrowing so the mutual cap is the greater of twelve months' fees and US$1,000,000, which is our standard position. We also added the standard carve-outs so indemnification, confidentiality/security breaches, gross negligence, wilful misconduct, fraud and IP infringement sit outside the cap, and confirmed Corio's fee obligations are not capped damages.","ops":[{"kind":"replace","paragraphId":"p0090","oldText":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE GREATER OF (A) THE TOTAL AMOUNT PAID OR PAYABLE BY CORIO HEREUNDER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE EVENT GIVING RISE TO THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES AND (B) ONE MILLION U.S. DOLLARS (US$1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, ITS BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CORIO'S OBLIGATION TO PAY FEES DUE HEREUNDER SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS SECTION 9."}],"precedentId":"seed-lol-2"}
```

- [seq 172](trajectory.jsonl#L172) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0090","segments":[{"type":"equal","text":"EXCEPT FOR "},{"type":"delete","text":"LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT"},{"type":"insert","text":"EXCLUDED CLAIMS"},{"type":"equal","text":", IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE "},{"type":"delet…
```

- [seq 195](trajectory.jsonl#L195) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0090"],"quote":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.","rationale":"The cap in § 9 is mutual and the consequential-damages exclusion is mutual, which is good, but it fails the fallback on two material terms. First, the base is not 12 months' fees: it is only amounts \"actually paid by Corio ... for the transaction which the liability relates to\" in the prior 12 months, which slices the cap down to a single transaction's fees and can fall well below six months' fees (walk-away territory for a vendor cap). Second, the only carve-out is Section 8 (Commerce One's IP indemnity); there are no carve-outs for breach of confidentiality (§ 10 / the concurrent NDA), gross negligence, wilful misconduct or fraud, whereas the fallback requires carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct. Redline moves the clause to the preferred position: greater of 12 months' fees paid or payable and US$1,000,000, standard Excluded Claims outside the cap, and confirmation that Corio's fee obligations are not capped damages. Minor drafting notes not separately flagged: the duplicated consequential-damages sentence at p0092 appears to be a conversion artifact and the consequential-damages carve-out still cross-refers only to Section 8.","confidence":0.82,"proposal":{"level":"preferred","precedentId":"seed-lol-2","summary":"Make the mutual cap a true 12-months'-fees floor of US$1,000,000 and add standard uncapped carve-outs","comment":"[Playbook] We removed the \"transaction which the liability relates to\" narrowing so the mutual cap is the greater of twelve months' fees and US$1,000,000, which is our standard position. We also added the standard carve-outs so indemnification, confidentiality/security breaches, gross negligence, wilful misconduct, fraud and IP infringement sit outside the cap, and confirmed Corio's fee obligations are not capped damages.","ops":[{"kind":"replace","paragraphId":"p0090","oldText":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.","newText":"EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE GREATER OF (A) THE TOTAL AMOUNT PAID OR PAYABLE BY CORIO HEREUNDER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE EVENT GIVING RISE TO THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES AND (B) ONE MILLION U.S. DOLLARS (US$1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, ITS BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CORIO'S OBLIGATION TO PAY FEES DUE HEREUNDER SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS SECTION 9."}]}}
```

- [seq 196](trajectory.jsonl#L196) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 195](trajectory.jsonl#L195)
- Finding: `f-lol-cap-90da358d` · **deviation** · confidence 0.82
- Location: § 9 LIMITATION OF LIABILITY.
- Quote: “EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.”
- Rationale: The cap in § 9 is mutual and the consequential-damages exclusion is mutual, which is good, but it fails the fallback on two material terms. First, the base is not 12 months' fees: it is only amounts "actually paid by Corio ... for the transaction which the liability relates to" in the prior 12 months, which slices the cap down to a single transaction's fees and can fall well below six months' fees (walk-away territory for a vendor cap). Second, the only carve-out is Section 8 (Commerce One's IP indemnity); there are no carve-outs for breach of confidentiality (§ 10 / the concurrent NDA), gross negligence, wilful misconduct or fraud, whereas the fallback requires carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct. Redline moves the clause to the preferred position: greater of 12 months' fees paid or payable and US$1,000,000, standard Excluded Claims outside the cap, and confirmation that Corio's fee obligations are not capped damages. Minor drafting notes not separately flagged: the duplicated consequential-damages sentence at p0092 appears to be a conversion artifact and the consequential-damages carve-out still cross-refers only to Section 8.
- Proposal: **preferred** — Make the mutual cap a true 12-months'-fees floor of US$1,000,000 and add standard uncapped carve-outs
- Comment: [Playbook] We removed the "transaction which the liability relates to" narrowing so the mutual cap is the greater of twelve months' fees and US$1,000,000, which is our standard position. We also added the standard carve-outs so indemnification, confidentiality/security breaches, gross negligence, wilful misconduct, fraud and IP infringement sit outside the cap, and confirmed Corio's fee obligations are not capped damages.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "EXCEPT FOR EXCLUDED CLAIMS, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE GREATER OF (A) THE TOTAL AMOUNT PAID OR PAYABLE BY CORIO HEREUNDER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE EVENT GIVING RISE TO THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES AND (B) ONE MILLION U.S. DOLLARS (US$1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, ITS BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. CORIO'S OBLIGATION TO PAY FEES DUE HEREUNDER SHALL NOT BE TREATED AS DAMAGES SUBJECT TO THIS SECTION 9.",
    "oldText": "EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE LIABILITY RELATES TO DURING THE TWELVE (12) MONTHS IMMEDIATELY PRIOR TO THE FILING OF THE CAUSE OF ACTION TO WHICH THE LIABILITY RELATES.",
    "paragraphId": "p0090"
  }
]
```

### Verifier and repair feedback

- [seq 247](trajectory.jsonl#L247) **Verdict: pass** — Classification is correct: § 9 caps liability only at amounts 'actually paid by Corio ... for the transaction which the liability relates to', which is materially narrower than the fallback's 12 months' fees, and the sole carve-out is Section 8 (IP indemnity) — the fallback's required carve-outs for confidentiality, gross negligence and wilful misconduct are absent, so the clause fails the fallback on two material terms. Redline is valid and directionally right for the customer: it keeps the cap mutual, replaces the transaction-specific base with the greater of 12 months' fees paid or payable and US$1,000,000, adds a single 'Excluded Claims' sentence preserving the existing Section 8 carve-out, and clarifies that Corio's fee obligations are not capped damages — matching the model language and redline guidance. The failed minimal-edit heuristic (0.716) is justified here: the rule requires rewriting the cap basis and inserting a carve-out definition; the surrounding consequential-damages and allocation-of-risk sentences were left intact. Comment is accurate, concise, in first person plural with the required prefix, and correctly states the position and that indemnification/confidentiality sit outside the cap; the residual Section 8-only cross-reference in the consequential-damages sentence is properly noted as a minor drafting point rather than being over-edited. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimal edit p0090","ok":false,"detail":"changed-character ratio=0.716 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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

- [seq 19](trajectory.jsonl#L19) **drafter → list_sections**

```json
{}
```

- [seq 20](trajectory.jsonl#L20) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 21](trajectory.jsonl#L21) **drafter → search**

```json
{"query":"indemnif","limit":30}
```

- [seq 22](trajectory.jsonl#L22) **search result**

```json
[{"paragraphId":"p0085","sectionRef":"§ 8 INDEMNIFICATION.","snippet":"8 INDEMNIFICATION."},{"paragraphId":"p0086","sectionRef":"§ 8 INDEMNIFICATION.","snippet":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, li…"}]
```

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-8-2"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 8 INDEMNIFICATION.","paragraphs":[{"id":"p0085","text":"8 INDEMNIFICATION."},{"id":"p0086","text":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringe…
```

- [seq 51](trajectory.jsonl#L51) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 52](trajectory.jsonl#L52) **read_section result**

```json
{"sectionRef":"§ 9 LIMITATION OF LIABILITY.","paragraphs":[{"id":"p0089","text":"9 LIMITATION OF LIABILITY."},{"id":"p0090","text":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE L…
```

- [seq 87](trajectory.jsonl#L87) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 88](trajectory.jsonl#L88) **read_section result**

```json
{"sectionRef":"§ 6 TRADEMARKS.","paragraphs":[{"id":"p0070","text":"6 TRADEMARKS."},{"id":"p0071","text":"6.1 Right to Display. During the term of this Agreement, each party authorizes the other party to display and use the other's trademarks, trade names and logos (collectively, the TRADEMARKS) in connection with that party's sale, advertisement, service and promotion of the Corio Services or th…
```

- [seq 89](trajectory.jsonl#L89) **drafter → search**

```json
{"query":"hold harmless","limit":20}
```

- [seq 90](trajectory.jsonl#L90) **search result**

```json
[{"paragraphId":"p0086","sectionRef":"§ 8 INDEMNIFICATION.","snippet":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expens…"}]
```

- [seq 119](trajectory.jsonl#L119) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0086","p0087","p0088","p0090"],"quote":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringes any patent, copyright, trademark or trade right secret of a third party","rationale":"Section 8.1 gives us (and our Customers) a full defend-and-indemnify from Commerce One for third-party claims that the Software infringes patent, copyright, trademark or trade secret rights, with standard procedure (prompt notice, tender of control to the vendor at its expense, cooperation at its expense, right to join with our own counsel) and the standard remedy ladder of procure / modify or replace / terminate and refund a pro-rated portion of fees. Exclusions in 8.2 are the usual narrow ones (use outside the Documentation; third-party modification where the infringement would not otherwise have occurred) and do not include combination or Corio-specification carve-outs. Critically, Section 9 carves liability \"ARISING UNDER SECTION 8\" out of both the 12-month fee cap and the consequential-damages exclusion, so the vendor indemnity is uncapped — better than the fallback's 3x annual fees super-cap. There is no reciprocal Corio indemnity anywhere (Section 6 trademark provisions impose approval/compliance obligations but no hold-harmless), so no one-way or over-broad customer indemnity to narrow. The clause therefore sits at or above the fallback and is not redlined. Noted only for the file, not as deviations: the indemnity does not extend to Commerce One's breach of applicable law, unauthorised access to or disclosure of Corio data, or its gross negligence/wilful misconduct, and it is limited to the Software rather than covering affiliates expressly — points we could raise if the section is reopened for other reasons.","confidence":0.86}
```

- [seq 120](trajectory.jsonl#L120) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 119](trajectory.jsonl#L119)
- Finding: `f-indemn-cc763401` · **compliant** · confidence 0.86
- Location: § 8 INDEMNIFICATION.
- Quote: “8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringes any patent, copyright, trademark or trade right secret of a third party”
- Rationale: Section 8.1 gives us (and our Customers) a full defend-and-indemnify from Commerce One for third-party claims that the Software infringes patent, copyright, trademark or trade secret rights, with standard procedure (prompt notice, tender of control to the vendor at its expense, cooperation at its expense, right to join with our own counsel) and the standard remedy ladder of procure / modify or replace / terminate and refund a pro-rated portion of fees. Exclusions in 8.2 are the usual narrow ones (use outside the Documentation; third-party modification where the infringement would not otherwise have occurred) and do not include combination or Corio-specification carve-outs. Critically, Section 9 carves liability "ARISING UNDER SECTION 8" out of both the 12-month fee cap and the consequential-damages exclusion, so the vendor indemnity is uncapped — better than the fallback's 3x annual fees super-cap. There is no reciprocal Corio indemnity anywhere (Section 6 trademark provisions impose approval/compliance obligations but no hold-harmless), so no one-way or over-broad customer indemnity to narrow. The clause therefore sits at or above the fallback and is not redlined. Noted only for the file, not as deviations: the indemnity does not extend to Commerce One's breach of applicable law, unauthorised access to or disclosure of Corio data, or its gross negligence/wilful misconduct, and it is limited to the Software rather than covering affiliates expressly — points we could raise if the section is reopened for other reasons.

### Verifier and repair feedback

- [seq 199](trajectory.jsonl#L199) **Verdict: pass** — Claimed status is compliant and the cited text supports it: Section 8.1 is a full Vendor (Commerce One) defend-indemnify-hold-harmless for third-party claims that the Software infringes patent, copyright, trademark or trade secret rights, with standard notice/control/cooperation procedure and the procure/modify-replace/terminate-and-refund remedy ladder. Exclusions in 8.2 are narrow (use outside Documentation; third-party modification but-for causation) and do not undercut the fallback; Section 9 expressly carves Section 8 liability out of both the 12-month fee cap and the consequential-damages exclusion, so the indemnity is uncapped — better than the fallback's 3x super-cap. No reciprocal or one-way Customer indemnity exists to narrow, so nothing to redline; the deterministic check confirming a Vendor IP indemnity is consistent. Consistent with the compliant treatment, no redline text was changed and no counterparty comment was emitted; the shortfalls versus preferred (no breach-of-law, data-breach, or gross negligence/wilful misconduct prongs; no express affiliate coverage) are correctly noted in the rationale as file notes rather than flagged as deviations. Checks: {"name":"vendor indemnity for IP infringement present","ok":true}.

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

- [seq 37](trajectory.jsonl#L37) **drafter → list_sections**

```json
{}
```

- [seq 38](trajectory.jsonl#L38) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 39](trajectory.jsonl#L39) **drafter → search**

```json
{"query":"shall not","limit":30}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…Site.net Service except as explicitly permitted under this Agreement, and Corio shall not, nor will it permit any third party to, modify, adapt, translate, prepare deriv…"},{"paragraphId":"p0045","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…d maintaining the revenue sharing provisions contained herein, and Commerce O…
```

- [seq 67](trajectory.jsonl#L67) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 68](trajectory.jsonl#L68) **read_section result**

```json
{"sectionRef":"§ 3 2. GRANT OF RIGHTS.","paragraphs":[{"id":"p0029","text":"3 2. GRANT OF RIGHTS."},{"id":"p0030","text":"2.1 Hosting Software License. Subject to the terms and conditions of this Agreement, Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the…
```

- [seq 69](trajectory.jsonl#L69) **drafter → read_section**

```json
{"sectionId":"sec-p0197"}
```

- [seq 70](trajectory.jsonl#L70) **read_section result**

```json
{"sectionRef":"§ SALES AND MARKETING COOPERATION","paragraphs":[{"id":"p0197","text":"SALES AND MARKETING COOPERATION"},{"id":"p0198","text":"The parties agree to the following non-binding sales and marketing cooperation efforts:"},{"id":"p0199","text":"1. RELATIONSHIP MANAGERS. The parties' Relationship Managers would attempt to meet at mutually agreeable times no less than every quarter to revi…
```

- [seq 107](trajectory.jsonl#L107) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 108](trajectory.jsonl#L108) **read_section result**

```json
{"sectionRef":"§ 13 SHARED RESOURCES.","paragraphs":[{"id":"p0107","text":"13 SHARED RESOURCES."},{"id":"p0108","text":"13.1 Operations. To the extent not provided for within the Statement of Work covered by the Implementation Fee, Commerce One shall provide Corio with access to Commerce One operations personnel as reasonably requested by Corio, subject to payment by Corio of Commerce One's stand…
```

- [seq 109](trajectory.jsonl#L109) **drafter → search**

```json
{"query":"compet","limit":30}
```

- [seq 110](trajectory.jsonl#L110) **search result**

```json
[{"paragraphId":"p0121","sectionRef":"§ 14 MISCELLANEOUS.","snippet":"…thout such consent, except in the case where such transaction involves a direct competitor of the other party where consent of the other party will be required. Subje…"},{"paragraphId":"p0127","sectionRef":"§ 14 MISCELLANEOUS.","snippet":"14.6 Severability. If any provision of this Agreement is held by a court of competent jur…
```

- [seq 139](trajectory.jsonl#L139) **drafter → search**

```json
{"query":"MARKET SEGMENT","limit":20}
```

- [seq 140](trajectory.jsonl#L140) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 1 DEFINITIONS.","snippet":"1.3 \"CORIO MARKET SEGMENT\" means those customers with annual sales revenues of less than $1,000,000,000. …"},{"paragraphId":"p0019","sectionRef":"§ 1 DEFINITIONS.","snippet":"…blicense from Corio to use the Software or MarketSite.net Service, in the Corio Market Segment."}]
```

- [seq 141](trajectory.jsonl#L141) **drafter → search**

```json
{"query":"exclusiv","limit":25}
```

- [seq 142](trajectory.jsonl#L142) **search result**

```json
[{"paragraphId":"p0030","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…ommerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), r…"},{"paragraphId":"p0033","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…o the terms and conditions of this Agreement, Commerce One grants to Corio a n…
```

- [seq 165](trajectory.jsonl#L165) **drafter → read_section**

```json
{"sectionId":"sec-1-2"}
```

- [seq 166](trajectory.jsonl#L166) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0008","text":"1. DEFINITIONS."},{"id":"p0009","text":"The following terms shall have the following meanings:"},{"id":"p0010","text":"1.1 \"SOFTWARE USER\" means a named user of the Corio Services worldwide to whom a user identification number and password has been assigned, which permits that user to access and use the Software on a designate…
```

- [seq 167](trajectory.jsonl#L167) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 168](trajectory.jsonl#L168) **read_section result**

```json
{"sectionRef":"§ 14 MISCELLANEOUS.","paragraphs":[{"id":"p0120","text":"14 MISCELLANEOUS."},{"id":"p0121","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in…
```

- [seq 189](trajectory.jsonl#L189) **drafter → search**

```json
{"query":"competitive|competitor|competing|other vendors|third party software|similar products","regex":true,"limit":20}
```

- [seq 190](trajectory.jsonl#L190) **search result**

```json
[{"paragraphId":"p0032","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… tools and utilities, subject to any restrictions placed on the Commerce One by third party software providers, to modify and manage the Software. Except as specifically authorized…"},{"paragraphId":"p0033","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… tools and utilities, subject to any restrictions placed on the Co…
```

- [seq 191](trajectory.jsonl#L191) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 192](trajectory.jsonl#L192) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 213](trajectory.jsonl#L213) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0117","p0042","p0013","p0024"],"quote":"13.6 Independent Development: Covenant not to Sue. Nothing in this Agreement will be construed to prohibit either parties' right to independently develop the Developments contemplated above.","rationale":"No non-compete or field-of-use restraint binds Corio's own business. The Grant of Rights (§§2.1–2.10) and §2.7 Restrictions only limit how Corio may use, copy and sublicense Commerce One's Software; the \"Corio Market Segment\" (§1.3) and \"Territory\" (§1.24) definitions likewise scope the licence grant rather than restrict what businesses Corio may operate or what products it may buy or build. §13.6 expressly preserves each party's right to develop independently, and §14.8 confirms Corio solely directs and may subcontract the Corio Services. The only competitor reference (§14.1) is a mutual assignment consent right, not a covenant not to compete, and the sales and marketing cooperation in Exhibit D is expressly \"non-binding\". This meets the preferred position (no non-compete on Customer), so no redline is warranted.","confidence":0.86}
```

- [seq 214](trajectory.jsonl#L214) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 213](trajectory.jsonl#L213)
- Finding: `f-noncompete-c871eb07` · **compliant** · confidence 0.86
- Location: § 13 SHARED RESOURCES.
- Quote: “13.6 Independent Development: Covenant not to Sue. Nothing in this Agreement will be construed to prohibit either parties' right to independently develop the Developments contemplated above.”
- Rationale: No non-compete or field-of-use restraint binds Corio's own business. The Grant of Rights (§§2.1–2.10) and §2.7 Restrictions only limit how Corio may use, copy and sublicense Commerce One's Software; the "Corio Market Segment" (§1.3) and "Territory" (§1.24) definitions likewise scope the licence grant rather than restrict what businesses Corio may operate or what products it may buy or build. §13.6 expressly preserves each party's right to develop independently, and §14.8 confirms Corio solely directs and may subcontract the Corio Services. The only competitor reference (§14.1) is a mutual assignment consent right, not a covenant not to compete, and the sales and marketing cooperation in Exhibit D is expressly "non-binding". This meets the preferred position (no non-compete on Customer), so no redline is warranted.

### Verifier and repair feedback

- [seq 275](trajectory.jsonl#L275) **Verdict: pass** — Claimed status is compliant and the redline is byte-identical to the original with no comment, which is the expected output for a compliant finding. The cited text supports the conclusion: §2.7 is a standard license-use restriction (no copying, reverse engineering) and §13.6 affirmatively preserves each party's independent development rights — neither restrains what businesses Corio may operate or what products it may buy or build. The 'Corio Market Segment' (§1.3) and 'Territory' (§1.11) definitions delimit the scope of the license grant rather than impose a covenant not to compete or a prohibition on Corio's other activities; the rationale expressly reasons through this borderline point, and the deterministic check confirms no open-ended compete restriction on Customer. Rationale accurately notes the only competitor reference (§14.1) is an assignment-consent right and that Exhibit D marketing cooperation is non-binding, so no actionable deviation exists under NONCOMPETE. Checks: {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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
{"query":"exclusive","limit":40}
```

- [seq 26](trajectory.jsonl#L26) **search result**

```json
[{"paragraphId":"p0030","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…ommerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), ri…"},{"paragraphId":"p0033","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…o the terms and conditions of this Agreement, Commerce One grants to Corio a …
```

- [seq 27](trajectory.jsonl#L27) **drafter → list_sections**

```json
{}
```

- [seq 28](trajectory.jsonl#L28) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 55](trajectory.jsonl#L55) **drafter → read_section**

```json
{"sectionId":"sec-p0197"}
```

- [seq 56](trajectory.jsonl#L56) **read_section result**

```json
{"sectionRef":"§ SALES AND MARKETING COOPERATION","paragraphs":[{"id":"p0197","text":"SALES AND MARKETING COOPERATION"},{"id":"p0198","text":"The parties agree to the following non-binding sales and marketing cooperation efforts:"},{"id":"p0199","text":"1. RELATIONSHIP MANAGERS. The parties' Relationship Managers would attempt to meet at mutually agreeable times no less than every quarter to revi…
```

- [seq 57](trajectory.jsonl#L57) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 58](trajectory.jsonl#L58) **read_section result**

```json
{"sectionRef":"§ 3 2. GRANT OF RIGHTS.","paragraphs":[{"id":"p0029","text":"3 2. GRANT OF RIGHTS."},{"id":"p0030","text":"2.1 Hosting Software License. Subject to the terms and conditions of this Agreement, Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the…
```

- [seq 93](trajectory.jsonl#L93) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 94](trajectory.jsonl#L94) **read_section result**

```json
{"sectionRef":"§ 13 SHARED RESOURCES.","paragraphs":[{"id":"p0107","text":"13 SHARED RESOURCES."},{"id":"p0108","text":"13.1 Operations. To the extent not provided for within the Statement of Work covered by the Implementation Fee, Commerce One shall provide Corio with access to Commerce One operations personnel as reasonably requested by Corio, subject to payment by Corio of Commerce One's stand…
```

- [seq 95](trajectory.jsonl#L95) **drafter → search**

```json
{"query":"compet","limit":30}
```

- [seq 96](trajectory.jsonl#L96) **search result**

```json
[{"paragraphId":"p0121","sectionRef":"§ 14 MISCELLANEOUS.","snippet":"…thout such consent, except in the case where such transaction involves a direct competitor of the other party where consent of the other party will be required. Subje…"},{"paragraphId":"p0127","sectionRef":"§ 14 MISCELLANEOUS.","snippet":"14.6 Severability. If any provision of this Agreement is held by a court of competent jur…
```

- [seq 123](trajectory.jsonl#L123) **drafter → search**

```json
{"query":"shall not","limit":40}
```

- [seq 124](trajectory.jsonl#L124) **search result**

```json
[{"paragraphId":"p0042","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…Site.net Service except as explicitly permitted under this Agreement, and Corio shall not, nor will it permit any third party to, modify, adapt, translate, prepare deriv…"},{"paragraphId":"p0045","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…d maintaining the revenue sharing provisions contained herein, and Commerce O…
```

- [seq 125](trajectory.jsonl#L125) **drafter → search**

```json
{"query":"sole supplier OR only OR exclusively","regex":true,"limit":30}
```

- [seq 126](trajectory.jsonl#L126) **search result**

```json
[]
```

- [seq 151](trajectory.jsonl#L151) **drafter → read_section**

```json
{"sectionId":"sec-p0003"}
```

- [seq 152](trajectory.jsonl#L152) **read_section result**

```json
{"sectionRef":"§ BACKGROUND","paragraphs":[{"id":"p0003","text":"BACKGROUND"},{"id":"p0004","text":"A. Commerce One is the owner of certain proprietary software products (the \"SOFTWARE\" as further defined below); and"},{"id":"p0005","text":"B. Corio wishes to obtain a license to use and host the Software on the terms and conditions set forth herein in connection with the hosting services that C…
```

- [seq 153](trajectory.jsonl#L153) **drafter → search**

```json
{"query":"third party","limit":30}
```

- [seq 154](trajectory.jsonl#L154) **search result**

```json
[{"paragraphId":"p0032","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… tools and utilities, subject to any restrictions placed on the Commerce One by third party software providers, to modify and manage the Software. Except as specifically a…"},{"paragraphId":"p0033","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… tools and utilities, subject to any restrictions placed on the Commerce On…
```

- [seq 181](trajectory.jsonl#L181) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0030","p0035","p0198","p0042"],"quote":"Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the Territory","rationale":"No exclusivity or sole-supplier obligation is imposed on Corio anywhere in the Agreement, so it meets the preferred position. The grants of rights in Section 2 (Sections 2.1-2.4, 2.9) are all expressly \"nonexclusive\" licences to Corio and contain no covenant requiring Corio to source hosting, procurement or e-commerce software solely from Commerce One or to refrain from offering competing ASP solutions; Section 2.7's restrictions are ordinary licence-scope limits, and Section 13.6 expressly preserves each party's independent development rights. The Exhibit D sales and marketing cooperation provisions are prefaced as \"non-binding\" and only call for joint marketing and cross-selling efforts, not exclusive dealing. The only exclusivity-flavoured terms (Section 2.4's bar on Commerce One contacting Corio Customers about non-ASP licence sales and its referral obligation) run in our favour and are not flagged.","confidence":0.88}
```

- [seq 182](trajectory.jsonl#L182) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 181](trajectory.jsonl#L181)
- Finding: `f-exclusivity-e46e96dc` · **compliant** · confidence 0.88
- Location: § 2. GRANT OF RIGHTS.
- Quote: “Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the Territory”
- Rationale: No exclusivity or sole-supplier obligation is imposed on Corio anywhere in the Agreement, so it meets the preferred position. The grants of rights in Section 2 (Sections 2.1-2.4, 2.9) are all expressly "nonexclusive" licences to Corio and contain no covenant requiring Corio to source hosting, procurement or e-commerce software solely from Commerce One or to refrain from offering competing ASP solutions; Section 2.7's restrictions are ordinary licence-scope limits, and Section 13.6 expressly preserves each party's independent development rights. The Exhibit D sales and marketing cooperation provisions are prefaced as "non-binding" and only call for joint marketing and cross-selling efforts, not exclusive dealing. The only exclusivity-flavoured terms (Section 2.4's bar on Commerce One contacting Corio Customers about non-ASP licence sales and its referral obligation) run in our favour and are not flagged.

### Verifier and repair feedback

- [seq 231](trajectory.jsonl#L231) **Verdict: pass** — Claimed status is compliant, and consistent with that no redline or comment was proposed — the rendered paragraphs are identical to the originals. The cited text supports the preferred position: all grants to Corio (the customer-side party here) are expressly 'nonexclusive', and Section 2.7 is an ordinary licence-scope restriction rather than an exclusive-dealing covenant. No requirements or sole-supplier obligation binds Corio. Exhibit D marketing cooperation is expressly 'non-binding' joint marketing, not exclusive dealing; Section 2.4's bar on Commerce One contacting Corio Customers runs in our favour and is correctly not flagged per the detection guidance. Deterministic check confirms no sole-supplier/requirements obligation on Customer remains; rationale is accurate and appropriately retained as internal evidence rather than a negotiation issue. Checks: {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}.

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

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[]
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[]
```

- [seq 83](trajectory.jsonl#L83) **drafter → list_sections**

```json
{}
```

- [seq 84](trajectory.jsonl#L84) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 113](trajectory.jsonl#L113) **drafter → read_section**

```json
{"sectionId":"sec-p0148"}
```

- [seq 114](trajectory.jsonl#L114) **read_section result**

```json
{"sectionRef":"§ PRICING","paragraphs":[{"id":"p0148","text":"PRICING"},{"id":"p0149","text":"SOFTWARE: BuySite Hosted Edition version 6.0"},{"id":"p0150","text":"MarketSite.net Service access"},{"id":"p0151","text":"SOFTWARE USERS: BuySite Hosted Edition: Unlimited"},{"id":"p0152","text":"LICENSE FEES: BuySite Hosted Edition: [*]"},{"id":"p0153","text":"MARKETSITE.NET SERVICE FEES: MarketSite.ne…
```

- [seq 115](trajectory.jsonl#L115) **drafter → read_section**

```json
{"sectionId":"sec-p0155"}
```

- [seq 116](trajectory.jsonl#L116) **read_section result**

```json
{"sectionRef":"§ REVENUE SHARING FEES:","paragraphs":[{"id":"p0155","text":"REVENUE SHARING FEES:"},{"id":"p0156","text":"1. MarketSite Transaction Revenue: Commerce One to pay Corio [*] of all transaction fees from Corio Customer transactions on MarketSite."},{"id":"p0157","text":"2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenu…
```

- [seq 145](trajectory.jsonl#L145) **drafter → search**

```json
{"query":"most favored nation pricing best price lowest"}
```

- [seq 146](trajectory.jsonl#L146) **search result**

```json
[]
```

- [seq 147](trajectory.jsonl#L147) **drafter → search**

```json
{"query":"any other","limit":30}
```

- [seq 148](trajectory.jsonl#L148) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 4 FEES.","snippet":"4.3 Taxes. All fees are exclusive of any sales taxes, use taxes and any other taxes and charges of any kind imposed by any federal, state or local government…"},{"paragraphId":"p0078","sectionRef":"§ 8 7 WARRANTIES AND DISCLAIMER.","snippet":"…d MarketSite.net Service is free of any willfully introduced computer virus, or any other simil…
```

- [seq 175](trajectory.jsonl#L175) **drafter → search**

```json
{"query":"comparable terms other customers licensees"}
```

- [seq 176](trajectory.jsonl#L176) **search result**

```json
[]
```

- [seq 177](trajectory.jsonl#L177) **drafter → read_section**

```json
{"sectionId":"sec-p0197"}
```

- [seq 178](trajectory.jsonl#L178) **read_section result**

```json
{"sectionRef":"§ SALES AND MARKETING COOPERATION","paragraphs":[{"id":"p0197","text":"SALES AND MARKETING COOPERATION"},{"id":"p0198","text":"The parties agree to the following non-binding sales and marketing cooperation efforts:"},{"id":"p0199","text":"1. RELATIONSHIP MANAGERS. The parties' Relationship Managers would attempt to meet at mutually agreeable times no less than every quarter to revi…
```

- [seq 203](trajectory.jsonl#L203) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 204](trajectory.jsonl#L204) **read_section result**

```json
{"sectionRef":"§ 4 FEES.","paragraphs":[{"id":"p0053","text":"4 FEES."},{"id":"p0054","text":"4.1 License Fees. In consideration for the licenses granted to Corio pursuant to Section 2 of this Agreement, Corio shall pay the license fees specified in EXHIBIT B hereto. Payment terms of such license fees shall be as set forth in EXHIBIT B hereto."},{"id":"p0055","text":"4.2 Software Support and Main…
```

- [seq 205](trajectory.jsonl#L205) **drafter → read_section**

```json
{"sectionId":"sec-17"}
```

- [seq 206](trajectory.jsonl#L206) **read_section result**

```json
{"sectionRef":"§ 17 PAYMENT TERMS","paragraphs":[{"id":"p0164","text":"17 PAYMENT TERMS"},{"id":"p0165","text":"License Fees: Due upon Software Acceptance."},{"id":"p0166","text":"Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter. Revenue Sharing Fees: Quarterly payments shall be due to receiving party, net 30 days after quarter close."},{"id":…
```

- [seq 225](trajectory.jsonl#L225) **drafter → search**

```json
{"query":"terms and conditions offered to"}
```

- [seq 226](trajectory.jsonl#L226) **search result**

```json
[]
```

- [seq 227](trajectory.jsonl#L227) **drafter → search**

```json
{"query":"(most\\s+fav|best\\s+(price|pricing|terms)|less\\s+fav|preferential)","regex":true}
```

- [seq 228](trajectory.jsonl#L228) **search result**

```json
[]
```

- [seq 251](trajectory.jsonl#L251) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0148","p0152","p0155","p0157"],"quote":"LICENSE FEES: BuySite Hosted Edition: [*]","rationale":"The pricing and revenue-sharing exhibits (Exhibit B, §§ PRICING, REVENUE SHARING FEES, PAYMENT TERMS), the Fees section (§ 4) and the sales/marketing exhibit (Exhibit D) set fixed license, MarketSite.net access, maintenance, implementation and revenue-share amounts with no benchmarking against third-party terms. Targeted literal and regex searches for \"most favored/favoured\", \"no less favorable\", \"best price/pricing/terms\", \"preferential\", \"comparable terms/other customers\" and \"terms and conditions offered to\" returned no hits anywhere in the agreement. There is therefore no MFN or best-terms obligation running against Corio (our party, the licensee paying the fees), and equally no MFN in Commerce One's favour to preserve. This matches the preferred position — no MFN obligation on the Customer — so no redline is warranted.","confidence":0.86}
```

- [seq 252](trajectory.jsonl#L252) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 251](trajectory.jsonl#L251)
- Finding: `f-mfn-319ce1be` · **compliant** · confidence 0.86
- Location: § PRICING
- Quote: “LICENSE FEES: BuySite Hosted Edition: [*]”
- Rationale: The pricing and revenue-sharing exhibits (Exhibit B, §§ PRICING, REVENUE SHARING FEES, PAYMENT TERMS), the Fees section (§ 4) and the sales/marketing exhibit (Exhibit D) set fixed license, MarketSite.net access, maintenance, implementation and revenue-share amounts with no benchmarking against third-party terms. Targeted literal and regex searches for "most favored/favoured", "no less favorable", "best price/pricing/terms", "preferential", "comparable terms/other customers" and "terms and conditions offered to" returned no hits anywhere in the agreement. There is therefore no MFN or best-terms obligation running against Corio (our party, the licensee paying the fees), and equally no MFN in Commerce One's favour to preserve. This matches the preferred position — no MFN obligation on the Customer — so no redline is warranted.

### Verifier and repair feedback

- [seq 305](trajectory.jsonl#L305) **Verdict: pass** — Compliant finding: the cited pricing/revenue-share paragraphs set fixed, redacted fee and revenue-share amounts with no benchmarking or matching obligation against third-party terms, so nothing obliges Corio (the licensee/customer) to extend best terms to Commerce One. Party roles are correctly identified — Corio pays the fees and is our party; Commerce One is the vendor — and the rule only bites where the Customer must give the Vendor no-less-favourable terms. Consistent with a compliant status, no redline was rendered (redline text is identical to the original) and no counterparty comment was proposed, which is the expected output for an internal evidence finding. Deterministic checks are empty and the negative-search rationale (no hits for 'most favored', 'no less favorable', 'best pricing', 'preferential', etc.) is a reasonable basis for the preferred-position classification; there is also no Vendor-granted MFN to preserve. Checks: .

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

- [seq 31](trajectory.jsonl#L31) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 32](trajectory.jsonl#L32) **search result**

```json
[]
```

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"employ"}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0022","sectionRef":"§ 1 DEFINITIONS.","snippet":"1.9 \"RELATIONSHIP MANAGERS\" means the appointed employee of each party, as set forth on EXHIBIT A attached hereto and made a part here…"},{"paragraphId":"p0116","sectionRef":"§ 13 SHARED RESOURCES.","snippet":"…s to Corio. Further, Commerce One represents and warrants that all Commerce One employees, agents, contractors or consu…
```

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"hire"}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[]
```

- [seq 63](trajectory.jsonl#L63) **drafter → search**

```json
{"query":"induce"}
```

- [seq 64](trajectory.jsonl#L64) **search result**

```json
[]
```

- [seq 99](trajectory.jsonl#L99) **drafter → search**

```json
{"query":"recruit"}
```

- [seq 100](trajectory.jsonl#L100) **search result**

```json
[]
```

- [seq 101](trajectory.jsonl#L101) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 102](trajectory.jsonl#L102) **read_section result**

```json
{"sectionRef":"§ 13 SHARED RESOURCES.","paragraphs":[{"id":"p0107","text":"13 SHARED RESOURCES."},{"id":"p0108","text":"13.1 Operations. To the extent not provided for within the Statement of Work covered by the Implementation Fee, Commerce One shall provide Corio with access to Commerce One operations personnel as reasonably requested by Corio, subject to payment by Corio of Commerce One's stand…
```

- [seq 129](trajectory.jsonl#L129) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 130](trajectory.jsonl#L130) **read_section result**

```json
{"sectionRef":"§ 14 MISCELLANEOUS.","paragraphs":[{"id":"p0120","text":"14 MISCELLANEOUS."},{"id":"p0121","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in…
```

- [seq 131](trajectory.jsonl#L131) **drafter → search**

```json
{"query":"not, directly or indirectly"}
```

- [seq 132](trajectory.jsonl#L132) **search result**

```json
[]
```

- [seq 157](trajectory.jsonl#L157) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0203"]}
```

- [seq 158](trajectory.jsonl#L158) **read_paragraphs result**

```json
[{"id":"p0203","sectionRef":"§ SALES AND MARKETING COOPERATION","text":"5. PERSONNEL. Each party agrees to assign one (1) existing sales or marketing employee primarily dedicated to assist in the sales and marketing promotional activity set forth in this Exhibit D."}]
```

- [seq 159](trajectory.jsonl#L159) **drafter → search**

```json
{"query":"personnel of the other party"}
```

- [seq 160](trajectory.jsonl#L160) **search result**

```json
[]
```

- [seq 185](trajectory.jsonl#L185) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0203","p0126"],"quote":"5. PERSONNEL. Each party agrees to assign one (1) existing sales or marketing employee primarily dedicated to assist in the sales and marketing promotional activity set forth in this Exhibit D.","rationale":"Searches for \"solicit\", \"hire\", \"induce\", \"recruit\" and \"employ\" return no restrictive covenant anywhere in the agreement. The only personnel-related provisions are Section 13 (Shared Resources — Commerce One personnel access and Employee NDA/Invention Agreement warranties), Section 14.5 (Independent Contractors) and Exhibit D Section 5 (each party dedicates a sales/marketing employee); none restricts Corio from soliciting, hiring or employing Commerce One personnel. This satisfies the preferred position (no non-solicit binding the Customer), so no redline is warranted. Nothing to note as a fallback compromise.","confidence":0.9}
```

- [seq 186](trajectory.jsonl#L186) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 185](trajectory.jsonl#L185)
- Finding: `f-nosolicit-3be0005a` · **compliant** · confidence 0.90
- Location: § SALES AND MARKETING COOPERATION
- Quote: “5. PERSONNEL. Each party agrees to assign one (1) existing sales or marketing employee primarily dedicated to assist in the sales and marketing promotional activity set forth in this Exhibit D.”
- Rationale: Searches for "solicit", "hire", "induce", "recruit" and "employ" return no restrictive covenant anywhere in the agreement. The only personnel-related provisions are Section 13 (Shared Resources — Commerce One personnel access and Employee NDA/Invention Agreement warranties), Section 14.5 (Independent Contractors) and Exhibit D Section 5 (each party dedicates a sales/marketing employee); none restricts Corio from soliciting, hiring or employing Commerce One personnel. This satisfies the preferred position (no non-solicit binding the Customer), so no redline is warranted. Nothing to note as a fallback compromise.

### Verifier and repair feedback

- [seq 235](trajectory.jsonl#L235) **Verdict: pass** — The playbook's preferred position is 'No non-solicit on Customer,' so the absence of any solicitation/no-hire covenant satisfies the preferred position; classifying as compliant is correct. Cited paragraphs (Exhibit D §5 personnel dedication and §14.5 independent contractors) contain no restrictive covenant, supporting the rationale that no non-solicit binds the Customer. Consistent with a compliant finding, no redline or counterparty comment was proposed and the original text is left unchanged. The failed deterministic checks (duration, general-solicitation carve-out) are expected artifacts of there being no non-solicit clause to measure, not evidence of a defect. Checks: {"name":"non-solicit duration ≤ 12 months","ok":false,"detail":"number not found"}; {"name":"general-solicitation carve-out present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 201](trajectory.jsonl#L201)

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

- [seq 219](trajectory.jsonl#L219) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 220](trajectory.jsonl#L220) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 221](trajectory.jsonl#L221) **drafter → list_sections**

```json
{}
```

- [seq 222](trajectory.jsonl#L222) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 242](trajectory.jsonl#L242) **read_section result**

```json
{"sectionRef":"§ 4 FEES.","paragraphs":[{"id":"p0053","text":"4 FEES."},{"id":"p0054","text":"4.1 License Fees. In consideration for the licenses granted to Corio pursuant to Section 2 of this Agreement, Corio shall pay the license fees specified in EXHIBIT B hereto. Payment terms of such license fees shall be as set forth in EXHIBIT B hereto."},{"id":"p0055","text":"4.2 Software Support and Main…
```

- [seq 243](trajectory.jsonl#L243) **drafter → read_section**

```json
{"sectionId":"sec-17"}
```

- [seq 244](trajectory.jsonl#L244) **read_section result**

```json
{"sectionRef":"§ 17 PAYMENT TERMS","paragraphs":[{"id":"p0164","text":"17 PAYMENT TERMS"},{"id":"p0165","text":"License Fees: Due upon Software Acceptance."},{"id":"p0166","text":"Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter. Revenue Sharing Fees: Quarterly payments shall be due to receiving party, net 30 days after quarter close."},{"id":…
```

- [seq 267](trajectory.jsonl#L267) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"Five-year license and hosting agreement; no customer convenience termination right; need 30-day convenience exit with pro-rata refund of prepaid fees"}
```

- [seq 286](trajectory.jsonl#L286) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-t4c","source":"Pioneer Services MSA (Mar 2025)","clauseAfter":"Customer may terminate an Order for convenience on thirty days' notice and will receive a pro-rata refund of prepaid fees.","comment":"[Playbook] We added a practical convenience exit and refund for unused prepaid services.","level":"preferred"}]}
```

- [seq 313](trajectory.jsonl#L313) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-t4c","summary":"Add Corio convenience termination right on 30 days' notice with pro-rata refund of prepaid fees","comment":"[Playbook] The five-year term gives us no way out except for breach, so we have added a convenience exit on thirty (30) days' notice with a pro-rata refund of prepaid license, maintenance and access fees, consistent with our playbook position. If you need a longer runway, we can move to sixty (60) days' notice.","ops":[{"kind":"insert_after","paragraphId":"p0098","numbering":"11.4","text":"Termination for Convenience. Corio may terminate this Agreement, in whole or in part, for convenience upon thirty (30) days' prior written notice to Commerce One, without penalty, early termination fee or other charge. In such event, Commerce One shall refund to Corio, within thirty (30) days after the effective date of termination, any prepaid fees (including any prepaid license, Software Maintenance and Support and MarketSite.net access fees) allocable to the period after the effective date of termination."}]}
```

- [seq 314](trajectory.jsonl#L314) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0098","segments":[{"type":"equal","text":"11.3 Effect of Termination. The following Sections shall survive the termination or expiration of this Agreement for any reason: 4.2, 5.3, 7, 8, 9, 10, 12 and 14. Corio's right to allow its then-existing Customers and their Software Users to use and access the Software in accordance with Section 2 of thi…
```

- [seq 339](trajectory.jsonl#L339) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0096","p0097"],"quote":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement.","rationale":"Section 11 gives a five-year initial term with automatic one-year renewals, and the only exit rights are for uncured material breach or insolvency (11.2) plus non-renewal at the end of a term (11.1). Corio therefore has no termination-for-convenience right during a multi-year committed term, which the playbook treats as walk-away territory and fails the fallback (60–90 days' notice with a capped fee). Commerce One likewise has no mid-term convenience right, so no cut-back of the Vendor side is needed. Because annual maintenance/support and MarketSite.net access fees are paid in advance (Exhibit B payment terms), we added a 30 days' notice convenience right with a pro-rata refund of prepaid fees as new Section 11.4, matching the preferred position, and offered 60 days' notice as a fallback in the comment.","confidence":0.85,"proposal":{"level":"preferred","precedentId":"seed-t4c","summary":"Add Corio convenience termination right on 30 days' notice with pro-rata refund of prepaid fees","comment":"[Playbook] The five-year term gives us no way out except for breach, so we have added a convenience exit on thirty (30) days' notice with a pro-rata refund of prepaid license, maintenance and access fees, consistent with our playbook position. If you need a longer runway, we can move to sixty (60) days' notice.","ops":[{"kind":"insert_after","paragraphId":"p0098","numbering":"11.4","text":"Termination for Convenience. Corio may terminate this Agreement, in whole or in part, for convenience upon thirty (30) days' prior written notice to Commerce One, without penalty, early termination fee or other charge. In such event, Commerce One shall refund to Corio, within thirty (30) days after the effective date of termination, any prepaid fees (including any prepaid license, Software Maintenance and Support and MarketSite.net access fees) allocable to the period after the effective date of termination."}]}}
```

- [seq 340](trajectory.jsonl#L340) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 339](trajectory.jsonl#L339)
- Finding: `f-t4c-e8e1264b` · **deviation** · confidence 0.85
- Location: § 11 TERM AND TERMINATION.
- Quote: “11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement.”
- Rationale: Section 11 gives a five-year initial term with automatic one-year renewals, and the only exit rights are for uncured material breach or insolvency (11.2) plus non-renewal at the end of a term (11.1). Corio therefore has no termination-for-convenience right during a multi-year committed term, which the playbook treats as walk-away territory and fails the fallback (60–90 days' notice with a capped fee). Commerce One likewise has no mid-term convenience right, so no cut-back of the Vendor side is needed. Because annual maintenance/support and MarketSite.net access fees are paid in advance (Exhibit B payment terms), we added a 30 days' notice convenience right with a pro-rata refund of prepaid fees as new Section 11.4, matching the preferred position, and offered 60 days' notice as a fallback in the comment.
- Proposal: **preferred** — Add Corio convenience termination right on 30 days' notice with pro-rata refund of prepaid fees
- Comment: [Playbook] The five-year term gives us no way out except for breach, so we have added a convenience exit on thirty (30) days' notice with a pro-rata refund of prepaid license, maintenance and access fees, consistent with our playbook position. If you need a longer runway, we can move to sixty (60) days' notice.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "11.4",
    "paragraphId": "p0098",
    "text": "Termination for Convenience. Corio may terminate this Agreement, in whole or in part, for convenience upon thirty (30) days' prior written notice to Commerce One, without penalty, early termination fee or other charge. In such event, Commerce One shall refund to Corio, within thirty (30) days after the effective date of termination, any prepaid fees (including any prepaid license, Software Maintenance and Support and MarketSite.net access fees) allocable to the period after the effective date of termination."
  }
]
```

### Verifier and repair feedback

- [seq 389](trajectory.jsonl#L389) **Verdict: pass** — Classification is correct: Section 11.1 imposes a five-year committed term and Section 11.2 provides exits only for uncured material breach or insolvency, so Corio (the Customer/licensee) has no convenience exit during a multi-year term — expressly walk-away territory under T4C and failing the 60–90 day/capped-fee fallback. The redline is directionally right and actionable for our side: it grants Corio a 30 days' notice convenience right, in whole or in part, without penalty or early-termination fee, with a pro-rata refund of prepaid license, maintenance and MarketSite.net fees, tracking the model language. No cut-back of a Vendor convenience right is needed because Commerce One likewise has none mid-term; the finding correctly notes this rather than over-editing. The failed deterministic check ('Customer convenience termination present') is a phrasing artifact — the inserted paragraph plainly states 'Corio may terminate this Agreement, in whole or in part, for convenience upon thirty (30) days' prior written notice' — so it does not undermine the substance. Comment is accurate, concise, in our voice, cites the playbook position and offers the 60-day fallback. Minor, non-disqualifying drafting nits: the new provision is appended to the p0098 'Effect of Termination' paragraph and the rendered text omits the '11.4' section number referenced in the rationale; renumbering/relocating the insert would tidy this up. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 233](trajectory.jsonl#L233)

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

- [seq 255](trajectory.jsonl#L255) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 256](trajectory.jsonl#L256) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 257](trajectory.jsonl#L257) **drafter → search**

```json
{"query":"automatically renew"}
```

- [seq 258](trajectory.jsonl#L258) **search result**

```json
[{"paragraphId":"p0096","sectionRef":"§ 11 TERM AND TERMINATION.","snippet":"…ffect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other part…"}]
```

- [seq 281](trajectory.jsonl#L281) **drafter → read_section**

```json
{"sectionId":"sec-16"}
```

- [seq 282](trajectory.jsonl#L282) **read_section result**

```json
{"sectionRef":"§ 16 EXHIBIT B","paragraphs":[{"id":"p0147","text":"16 EXHIBIT B"}]}
```

- [seq 283](trajectory.jsonl#L283) **drafter → search**

```json
{"query":"increase"}
```

- [seq 284](trajectory.jsonl#L284) **search result**

```json
[]
```

- [seq 309](trajectory.jsonl#L309) **drafter → read_section**

```json
{"sectionId":"sec-p0148"}
```

- [seq 310](trajectory.jsonl#L310) **read_section result**

```json
{"sectionRef":"§ PRICING","paragraphs":[{"id":"p0148","text":"PRICING"},{"id":"p0149","text":"SOFTWARE: BuySite Hosted Edition version 6.0"},{"id":"p0150","text":"MarketSite.net Service access"},{"id":"p0151","text":"SOFTWARE USERS: BuySite Hosted Edition: Unlimited"},{"id":"p0152","text":"LICENSE FEES: BuySite Hosted Edition: [*]"},{"id":"p0153","text":"MARKETSITE.NET SERVICE FEES: MarketSite.ne…
```

- [seq 335](trajectory.jsonl#L335) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0096"],"quote":"Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement.","rationale":"Section 11.1 provides automatic renewal for successive one (1) year terms, and either party — including us — may prevent renewal on thirty (30) days' written notice. That matches the preferred position on the material terms: 12-month renewal periods and a customer opt-out at 30 days, well inside the fallback 60-day ceiling and far from the walk-away triggers (notice window >90 days or automatic multi-year renewals; the five-year period here is the negotiated initial term, not an auto-renewal term). Two preferred sub-elements are absent and noted only: there is no Commerce One reminder 60 days before renewal, and no express cap on renewal price increases (the pricing exhibit at Exhibit B is redacted and contains no uplift mechanic). Consistent with the playbook, these minor gaps are not redlined; we can raise the reminder and an uplift cap as drafting asks if the pricing figures are unblanked.","confidence":0.88}
```

- [seq 336](trajectory.jsonl#L336) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 335](trajectory.jsonl#L335)
- Finding: `f-renewal-2a9cfa71` · **compliant** · confidence 0.88
- Location: § 11 TERM AND TERMINATION.
- Quote: “Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party provides the other party with written notification at least thirty (30) days prior to the expiration of the initial five (5) year term or any one (1) year renewal thereof of its intention to terminate this Agreement.”
- Rationale: Section 11.1 provides automatic renewal for successive one (1) year terms, and either party — including us — may prevent renewal on thirty (30) days' written notice. That matches the preferred position on the material terms: 12-month renewal periods and a customer opt-out at 30 days, well inside the fallback 60-day ceiling and far from the walk-away triggers (notice window >90 days or automatic multi-year renewals; the five-year period here is the negotiated initial term, not an auto-renewal term). Two preferred sub-elements are absent and noted only: there is no Commerce One reminder 60 days before renewal, and no express cap on renewal price increases (the pricing exhibit at Exhibit B is redacted and contains no uplift mechanic). Consistent with the playbook, these minor gaps are not redlined; we can raise the reminder and an uplift cap as drafting asks if the pricing figures are unblanked.

### Verifier and repair feedback

- [seq 385](trajectory.jsonl#L385) **Verdict: pass** — The cited Section 11.1 provides automatic renewal for successive one (1) year periods with a mutual right to prevent renewal on thirty (30) days' written notice, which meets the preferred position's material terms (12-month renewal term, customer opt-out at 30 days) and is well inside the fallback 60-day ceiling. No walk-away trigger is present: the five (5) year period is the negotiated initial term rather than an automatic multi-year renewal, and the notice window is far below 90 days. The rationale correctly treats the absent vendor 60-day reminder and the absent CPI/3% uplift cap as minor preferred sub-elements noted but not redlined, consistent with the playbook's classification semantics. Consistent with a compliant finding, no redline or counterparty comment was proposed; the rendered text is unchanged from the original paragraph. The failed deterministic check ('number not found') is a regex artifact — the clause plainly states 'at least thirty (30) days prior' — so it does not undercut the substantive conclusion. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":false,"detail":"number not found"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 237](trajectory.jsonl#L237)

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

- [seq 261](trajectory.jsonl#L261) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 262](trajectory.jsonl#L262) **read_section result**

```json
{"sectionRef":"§ 14 MISCELLANEOUS.","paragraphs":[{"id":"p0120","text":"14 MISCELLANEOUS."},{"id":"p0121","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in…
```

- [seq 263](trajectory.jsonl#L263) **drafter → search**

```json
{"query":"governing law"}
```

- [seq 264](trajectory.jsonl#L264) **search result**

```json
[]
```

- [seq 289](trajectory.jsonl#L289) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0123"],"quote":"14.3 Choice of Law; Arbitration; Venue. This Agreement shall be governed by the laws of the State of California, USA, excluding conflict of laws provisions and excluding the 1980 United Nations Convention on Contracts for the International Sale of Goods. Any disputes arising out of this Agreement shall be resolved by binding arbitration in accordance with the then-current commercial arbitration rules of the American Arbitration Association (\"RULES\"). The arbitration shall be conducted by one (1) arbitrator appointed in accordance with the Rules in San Francisco County, California.","rationale":"Section 14.3 is the only governing law/venue provision in the Agreement. The governing law is California, which sits squarely within the playbook's fallback position (Delaware or California law and courts), and the dispute forum is domestic: AAA commercial arbitration seated in San Francisco County, California, with judgment enforceable in the San Francisco courts. There is no foreign seat, no foreign exclusive venue and no vendor home-jurisdiction law outside the accepted list, so the walk-away trigger (vendor home jurisdiction outside the accepted list, or mandatory arbitration seated abroad) is not engaged. The only shortfall against the preferred position is that disputes go to arbitration rather than directly to the New York (or California) courts, and that the law is California rather than New York; those are sub-elements of the preferred wording rather than material failures of the fallback, and the fee-allocation mechanic is symmetric between the parties (loser pays AAA fees, each side bears its own presentation costs), so it does not disadvantage us. Accordingly this clause is compliant at the fallback and we do not redline it.","confidence":0.79}
```

- [seq 290](trajectory.jsonl#L290) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 289](trajectory.jsonl#L289)
- Finding: `f-govlaw-016810da` · **compliant** · confidence 0.79
- Location: § 14 MISCELLANEOUS.
- Quote: “14.3 Choice of Law; Arbitration; Venue. This Agreement shall be governed by the laws of the State of California, USA, excluding conflict of laws provisions and excluding the 1980 United Nations Convention on Contracts for the International Sale of Goods. Any disputes arising out of this Agreement shall be resolved by binding arbitration in accordance with the then-current commercial arbitration rules of the American Arbitration Association ("RULES"). The arbitration shall be conducted by one (1) arbitrator appointed in accordance with the Rules in San Francisco County, California.”
- Rationale: Section 14.3 is the only governing law/venue provision in the Agreement. The governing law is California, which sits squarely within the playbook's fallback position (Delaware or California law and courts), and the dispute forum is domestic: AAA commercial arbitration seated in San Francisco County, California, with judgment enforceable in the San Francisco courts. There is no foreign seat, no foreign exclusive venue and no vendor home-jurisdiction law outside the accepted list, so the walk-away trigger (vendor home jurisdiction outside the accepted list, or mandatory arbitration seated abroad) is not engaged. The only shortfall against the preferred position is that disputes go to arbitration rather than directly to the New York (or California) courts, and that the law is California rather than New York; those are sub-elements of the preferred wording rather than material failures of the fallback, and the fee-allocation mechanic is symmetric between the parties (loser pays AAA fees, each side bears its own presentation costs), so it does not disadvantage us. Accordingly this clause is compliant at the fallback and we do not redline it.

### Verifier and repair feedback

- [seq 349](trajectory.jsonl#L349) **Verdict: pass** — The cited Section 14.3 is the operative governing-law/venue provision and the finding quotes it accurately; California law is expressly within the playbook's fallback set (Delaware or California law and courts). The walk-away trigger is not engaged: there is no vendor home-jurisdiction law outside the accepted list and no arbitration seated abroad — the AAA seat is San Francisco County, California, with enforcement in the San Francisco courts, i.e. a domestic forum, consistent with the rule summary's concern about 'foreign arbitration'. The shortfalls against the preferred position (California rather than New York law; arbitration rather than direct recourse to courts) are correctly treated as sub-elements noted in the rationale rather than material fallback failures, and the fee-allocation mechanic is symmetric, so it does not disadvantage us. Consistent with a compliant claim, no redline or counterparty comment was produced — the rendered text is identical to the original and the deterministic jurisdiction check passes, so the finding is properly retained as internal evidence rather than raised as a negotiation issue. Checks: {"name":"governing law within the accepted set","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 249](trajectory.jsonl#L249)

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

- [seq 269](trajectory.jsonl#L269) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 270](trajectory.jsonl#L270) **read_section result**

```json
{"sectionRef":"§ 14 MISCELLANEOUS.","paragraphs":[{"id":"p0120","text":"14 MISCELLANEOUS."},{"id":"p0121","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in…
```

- [seq 271](trajectory.jsonl#L271) **drafter → search**

```json
{"query":"assign","limit":30}
```

- [seq 272](trajectory.jsonl#L272) **search result**

```json
[{"paragraphId":"p0010","sectionRef":"§ 1 DEFINITIONS.","snippet":"…o Services worldwide to whom a user identification number and password has been assigned, which permits that user to access and use the Software on a designated Corio…"},{"paragraphId":"p0010","sectionRef":"§ 1 DEFINITIONS.","snippet":"…he identification number and password used by a Software User is reusable and reassignable and…
```

- [seq 299](trajectory.jsonl#L299) **drafter → search**

```json
{"query":"change of control","limit":15}
```

- [seq 300](trajectory.jsonl#L300) **search result**

```json
[]
```

- [seq 301](trajectory.jsonl#L301) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 302](trajectory.jsonl#L302) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 325](trajectory.jsonl#L325) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0121"],"quote":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in connection with the merger or acquisition of such party or the sale of all or substantially all of its assets related to this Agreement without such consent, except in the case where such transaction involves a direct competitor of the other party where consent of the other party will be required.","rationale":"Section 14.1 is symmetrical and carries the material M&A carve-out: Corio (as well as Commerce One) may assign without consent in a merger, acquisition or sale of all or substantially all assets. There is no change-of-control trigger anywhere in the Agreement — a search for \"change of control\" returns nothing, and the §11.2 termination triggers are limited to uncured material breach and insolvency/assignment for benefit of creditors — so Commerce One has no right to terminate or re-price on our change of control. That places the clause at the playbook fallback (mutual right to assign to successors, consent required for other assignments) and well clear of walk-away territory, so we do not redline it. Two sub-elements fall short of the preferred position and are noted only: (i) there is no express right for Corio to assign to an affiliate without consent, and (ii) the consent standard for other assignments is not qualified as \"not to be unreasonably withheld,\" and no written-notice mechanic is specified. The \"direct competitor\" exception is mutual and also protects us against Commerce One assigning to a Corio competitor, so it is not adverse on balance.","confidence":0.78}
```

- [seq 326](trajectory.jsonl#L326) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 325](trajectory.jsonl#L325)
- Finding: `f-assign-50c3f58d` · **compliant** · confidence 0.78
- Location: § 14 MISCELLANEOUS.
- Quote: “14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in connection with the merger or acquisition of such party or the sale of all or substantially all of its assets related to this Agreement without such consent, except in the case where such transaction involves a direct competitor of the other party where consent of the other party will be required.”
- Rationale: Section 14.1 is symmetrical and carries the material M&A carve-out: Corio (as well as Commerce One) may assign without consent in a merger, acquisition or sale of all or substantially all assets. There is no change-of-control trigger anywhere in the Agreement — a search for "change of control" returns nothing, and the §11.2 termination triggers are limited to uncured material breach and insolvency/assignment for benefit of creditors — so Commerce One has no right to terminate or re-price on our change of control. That places the clause at the playbook fallback (mutual right to assign to successors, consent required for other assignments) and well clear of walk-away territory, so we do not redline it. Two sub-elements fall short of the preferred position and are noted only: (i) there is no express right for Corio to assign to an affiliate without consent, and (ii) the consent standard for other assignments is not qualified as "not to be unreasonably withheld," and no written-notice mechanic is specified. The "direct competitor" exception is mutual and also protects us against Commerce One assigning to a Corio competitor, so it is not adverse on balance.

### Verifier and repair feedback

- [seq 373](trajectory.jsonl#L373) **Verdict: pass** — Claimed status is compliant and consistent with the artifacts: the redline is identical to the original paragraph and no comment is raised, which is the expected output for a compliant finding. Section 14.1 meets the fallback on its material terms — a mutual right to assign in a merger, acquisition or sale of substantially all assets without consent, with consent required for other assignments — and the deterministic check confirms the successor/M&A carve-out for Customer is present. No walk-away trigger exists: there is no blanket prohibition on Customer assignment (the M&A carve-out is express) and no Vendor termination or re-pricing right on Customer's change of control; the rationale correctly notes §11.2 triggers are limited to uncured material breach and insolvency. The two shortfalls versus the preferred position (no express affiliate carve-out, consent not qualified as 'not to be unreasonably withheld', no notice mechanic) are correctly recorded in the rationale rather than redlined, per the playbook's treatment of minor sub-elements. The mutual 'direct competitor' consent exception is accurately characterized as symmetrical and not adverse on balance, so it does not convert the clause into a deviation. Checks: {"name":"successor/affiliate carve-out for Customer present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 277](trajectory.jsonl#L277)

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

- [seq 293](trajectory.jsonl#L293) **drafter → list_sections**

```json
{}
```

- [seq 294](trajectory.jsonl#L294) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 295](trajectory.jsonl#L295) **drafter → search**

```json
{"query":"Developments","limit":30}
```

- [seq 296](trajectory.jsonl#L296) **search result**

```json
[{"paragraphId":"p0115","sectionRef":"§ 13 SHARED RESOURCES.","snippet":"… enable the Software to operated within the Corio Servers' hosted environment (\"DEVELOPMENTS\"), shall be owned by Corio, unless such Developments are supported on an ongoin…"},{"paragraphId":"p0115","sectionRef":"§ 13 SHARED RESOURCES.","snippet":"…vers' hosted environment (\"DEVELOPMENTS\"), shall be owned by Corio, unle…
```

- [seq 317](trajectory.jsonl#L317) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 318](trajectory.jsonl#L318) **read_section result**

```json
{"sectionRef":"§ 13 SHARED RESOURCES.","paragraphs":[{"id":"p0107","text":"13 SHARED RESOURCES."},{"id":"p0108","text":"13.1 Operations. To the extent not provided for within the Statement of Work covered by the Implementation Fee, Commerce One shall provide Corio with access to Commerce One operations personnel as reasonably requested by Corio, subject to payment by Corio of Commerce One's stand…
```

- [seq 319](trajectory.jsonl#L319) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 320](trajectory.jsonl#L320) **read_section result**

```json
{"sectionRef":"§ 3 2. GRANT OF RIGHTS.","paragraphs":[{"id":"p0029","text":"3 2. GRANT OF RIGHTS."},{"id":"p0030","text":"2.1 Hosting Software License. Subject to the terms and conditions of this Agreement, Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the…
```

- [seq 343](trajectory.jsonl#L343) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 344](trajectory.jsonl#L344) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0093","text":"10 CONFIDENTIALITY."},{"id":"p0094","text":"Each party hereby agrees that it shall not use any Confidential Information received from the other party other than as expressly permitted under the terms of a non-disclosure agreement to be concurrently executed with this Agreement."}]}
```

- [seq 345](trajectory.jsonl#L345) **drafter → search**

```json
{"query":"data","limit":20}
```

- [seq 346](trajectory.jsonl#L346) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"…the Software and MarketSite Service and basic infrastructure support (hardware, database and operating system) for the Software and MarketSite Service. Net revenue …"},{"paragraphId":"p0020","sectionRef":"§ 1 DEFINITIONS.","snippet":"…the Software which are for demonstration purposes only and which contain sample data and transac…
```

- [seq 365](trajectory.jsonl#L365) **drafter → lookup_precedent**

```json
{"ruleId":"IP","context":"Developments created solely by Corio owned by Corio except where supported by vendor"}
```

- [seq 382](trajectory.jsonl#L382) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-ip","source":"Copper Design Services SOW (Nov 2025)","clauseAfter":"Customer owns the Deliverables and Customer Data; Vendor retains pre-existing materials and grants Customer a perpetual, irrevocable licence to embedded materials.","comment":"[Playbook] We aligned ownership with the work and data we fund while preserving Vendor's background IP.","level":"preferred"}]}
```

- [seq 407](trajectory.jsonl#L407) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Remove the carve-out that gives Commerce One ownership of Developments created solely by Corio where Commerce One supports them.","comment":"[Playbook] We own the Developments our personnel create, so we have deleted the carve-out transferring ownership to Commerce One wherever it provides ongoing support; Commerce One's pre-existing materials and the Software remain its property. If ongoing support is the concern, we can instead grant Commerce One a licence to use those Developments for support purposes.","precedentId":"seed-ip","ops":[{"kind":"replace","paragraphId":"p0115","oldText":"shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including","newText":"shall be owned by Corio."},{"kind":"replace","paragraphId":"p0116","oldText":"intellectual property rights in the Developments. To the extent","newText":"To the extent"}]}
```

- [seq 408](trajectory.jsonl#L408) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0115","segments":[{"type":"equal","text":"13.5 Ownership. Subject to Commerce One's pre-existing ownership of any materials or technology provided to Corio, the results of all such development efforts set forth in this Section 13, including all intellectual property rights in any software interface coding or programs created solely by Corio duri…
```

- [seq 435](trajectory.jsonl#L435) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0115","p0116"],"quote":"shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including","rationale":"Section 13.5 starts in the right place — Developments (software interface coding/programs created solely by Corio) are owned by us and Commerce One assigns any claim of ownership (p0116) — and Commerce One's retention of the Software under 2.8 is acceptable. However, the carve-out in p0115 flips ownership of IP created solely by our personnel to Commerce One whenever Commerce One supports it on an ongoing basis, with no licence back to us for those Developments. That is an assignment of Customer-created IP to the Vendor, which is walk-away territory under this rule and fails the fallback (no perpetual, irrevocable, royalty-free licence back). The minimal fix deletes the carve-out so Developments are owned by Corio, subject to Commerce One's pre-existing ownership; if support is the driver we can offer Commerce One a support-purposes licence instead. Noted but not separately flagged: the agreement has no express Customer Data ownership sentence (data is covered only by the confidentiality/NDA regime at Section 10), and ownership of enhancements to the Software itself is left to future negotiation rather than allocated to us.","confidence":0.82,"proposal":{"level":"preferred","summary":"Remove the carve-out that gives Commerce One ownership of Developments created solely by Corio where Commerce One supports them.","comment":"[Playbook] We own the Developments our personnel create, so we have deleted the carve-out transferring ownership to Commerce One wherever it provides ongoing support; Commerce One's pre-existing materials and the Software remain its property. If ongoing support is the concern, we can instead grant Commerce One a licence to use those Developments for support purposes.","precedentId":"seed-ip","ops":[{"kind":"replace","paragraphId":"p0115","oldText":"shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including","newText":"shall be owned by Corio."},{"kind":"replace","paragraphId":"p0116","oldText":"intellectual property rights in the Developments. To the extent","newText":"To the extent"}]}}
```

- [seq 436](trajectory.jsonl#L436) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 435](trajectory.jsonl#L435)
- Finding: `f-ip-598bd48e` · **deviation** · confidence 0.82
- Location: § 13 SHARED RESOURCES.
- Quote: “shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including”
- Rationale: Section 13.5 starts in the right place — Developments (software interface coding/programs created solely by Corio) are owned by us and Commerce One assigns any claim of ownership (p0116) — and Commerce One's retention of the Software under 2.8 is acceptable. However, the carve-out in p0115 flips ownership of IP created solely by our personnel to Commerce One whenever Commerce One supports it on an ongoing basis, with no licence back to us for those Developments. That is an assignment of Customer-created IP to the Vendor, which is walk-away territory under this rule and fails the fallback (no perpetual, irrevocable, royalty-free licence back). The minimal fix deletes the carve-out so Developments are owned by Corio, subject to Commerce One's pre-existing ownership; if support is the driver we can offer Commerce One a support-purposes licence instead. Noted but not separately flagged: the agreement has no express Customer Data ownership sentence (data is covered only by the confidentiality/NDA regime at Section 10), and ownership of enhancements to the Software itself is left to future negotiation rather than allocated to us.
- Proposal: **preferred** — Remove the carve-out that gives Commerce One ownership of Developments created solely by Corio where Commerce One supports them.
- Comment: [Playbook] We own the Developments our personnel create, so we have deleted the carve-out transferring ownership to Commerce One wherever it provides ongoing support; Commerce One's pre-existing materials and the Software remain its property. If ongoing support is the concern, we can instead grant Commerce One a licence to use those Developments for support purposes.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "shall be owned by Corio.",
    "oldText": "shall be owned by Corio, unless such Developments are supported on an ongoing basis by Commerce One in which case Commerce One will retain all ownership rights, including",
    "paragraphId": "p0115"
  },
  {
    "kind": "replace",
    "newText": "To the extent",
    "oldText": "intellectual property rights in the Developments. To the extent",
    "paragraphId": "p0116"
  }
]
```

### Verifier and repair feedback

- [seq 495](trajectory.jsonl#L495) **Verdict: pass** — Classification is correct: the carve-out in p0115 transfers ownership of Developments created solely by Corio (our party, the licensee/customer) to Commerce One whenever it provides ongoing support, with no licence back — an assignment of Customer-created IP to the Vendor, which fails the fallback (no perpetual, irrevocable, royalty-free licence back) and sits in walk-away territory, so a deviation finding with a redline is warranted rather than over-flagging. Redline is substantively minimal and correctly targeted: the only change across p0115/p0116 is deletion of the trailing carve-out ('unless such Developments are supported on an ongoing basis by Commerce One ... intellectual property rights in the Developments.'), leaving 'shall be owned by Corio.' and preserving Commerce One's pre-existing ownership, the assignment sentence, the NDA/invention covenants and the future-negotiation sentence. The failed 'minimal edit' checks are artifacts of the deletion spanning the paragraph boundary / full-text replacement, not evidence of an over-broad rewrite. Direction of the edit is right for our side (ownership retained by us, no Customer IP assigned to Vendor) and no assignment-to-Vendor language remains, consistent with the deterministic check. Comment is accurate, concise, in first person plural with the [Playbook] prefix, explains what was deleted and why, and offers a sensible fallback (a support-purposes licence to Commerce One) without lecturing. Sub-elements short of the preferred position (no express Customer Data ownership sentence; enhancements to the Software left to future negotiation) are appropriately noted in the rationale rather than redlined, which matches the playbook's treatment of minor gaps; severity 'critical' as claimed is appropriate given the IP-assignment issue. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"minimal edit p0115","ok":false,"detail":"changed-character ratio=0.871 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}; {"name":"minimal edit p0116","ok":false,"detail":"changed-character ratio=0.794 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 307](trajectory.jsonl#L307)

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

- [seq 329](trajectory.jsonl#L329) **drafter → list_sections**

```json
{}
```

- [seq 330](trajectory.jsonl#L330) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 331](trajectory.jsonl#L331) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 332](trajectory.jsonl#L332) **read_section result**

```json
{"sectionRef":"§ 3 2. GRANT OF RIGHTS.","paragraphs":[{"id":"p0029","text":"3 2. GRANT OF RIGHTS."},{"id":"p0030","text":"2.1 Hosting Software License. Subject to the terms and conditions of this Agreement, Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the…
```

- [seq 355](trajectory.jsonl#L355) **drafter → search**

```json
{"query":"14.1"}
```

- [seq 356](trajectory.jsonl#L356) **search result**

```json
[{"paragraphId":"p0030","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…d irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the Territory to (i) reproduce the Sof…"},{"paragraphId":"p0033","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"…nts to Corio a nonexclusive, nontransferable (except in accordance with Section 14…
```

- [seq 357](trajectory.jsonl#L357) **drafter → read_section**

```json
{"sectionId":"sec-1-2"}
```

- [seq 358](trajectory.jsonl#L358) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0008","text":"1. DEFINITIONS."},{"id":"p0009","text":"The following terms shall have the following meanings:"},{"id":"p0010","text":"1.1 \"SOFTWARE USER\" means a named user of the Corio Services worldwide to whom a user identification number and password has been assigned, which permits that user to access and use the Software on a designate…
```

- [seq 377](trajectory.jsonl#L377) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0121"]}
```

- [seq 378](trajectory.jsonl#L378) **read_paragraphs result**

```json
[{"id":"p0121","sectionRef":"§ 14 MISCELLANEOUS.","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in connection with the merger or acquisition of such party…
```

- [seq 379](trajectory.jsonl#L379) **drafter → search**

```json
{"query":"Affiliate"}
```

- [seq 380](trajectory.jsonl#L380) **search result**

```json
[]
```

- [seq 405](trajectory.jsonl#L405) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Hosting/internal use licence grant; affiliates and contractors not named; perpetual irrevocable; M&A assignment permitted"}
```

- [seq 432](trajectory.jsonl#L432) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-license","source":"Lighthouse Application Licence (Jan 2025)","clauseAfter":"Licensor grants Customer and its affiliates and contractors a non-transferable licence, transferable to a successor in a merger or acquisition.","comment":"[Playbook] We extended operational use to affiliates and contractors and protected transaction continuity.","level":"fallback"}]}
```

- [seq 465](trajectory.jsonl#L465) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0033","oldText":"Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory","newText":"Commerce One grants to Corio, its affiliates and its contractors acting on Corio's behalf a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual and irrevocable right and license in the Territory"},{"kind":"replace","paragraphId":"p0033","oldText":"for (i) Corio's internal business operations","newText":"for (i) the internal business operations of Corio and its affiliates"}],"comment":"[Playbook] We extended the internal use licence to Corio's affiliates and to contractors acting on Corio's behalf, and confirmed it is irrevocable, consistent with our playbook position that licence scope follow our operating group. If preferred, we can accept affiliate coverage on written notice to Commerce One.","level":"preferred","summary":"Extend the internal use licence in Section 2.2 to Corio affiliates and contractors and make it irrevocable.","precedentId":"seed-license"}
```

- [seq 466](trajectory.jsonl#L466) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0033","segments":[{"type":"equal","text":"2.2 Internal Use License. Subject to the terms and conditions of this Agreement, Commerce One grants to Corio"},{"type":"delete","text":" "},{"type":"insert","text":", its affiliates and its contractors acting on Corio's behalf "},{"type":"equal","text":"a nonexclusive, nontransferable (except in accorda…
```

- [seq 491](trajectory.jsonl#L491) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0030","p0033","p0121"],"quote":"2.2 Internal Use License. Subject to the terms and conditions of this Agreement, Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory to reproduce, install and use additional copies of the Software and Software tools and utilities, subject to any restrictions placed on the Commerce One by third party software providers, in machine executable object code for (i) Corio's internal business operations and (ii) production, testing, development, upgrade, reporting and training.","rationale":"The grants in Section 2 are strong on two of the three material terms: the hosting licence is expressly \"perpetual and irrevocable\" and the internal use and demonstration licences are royalty-free, fully paid up and (for 2.2) perpetual, so the licence is not revocable at Commerce One's discretion; and Section 14.1 permits assignment to a successor in a merger, acquisition or sale of substantially all assets without consent (subject only to a direct-competitor carve-out), meeting the successor-transfer element. The gap is affiliate/contractor coverage: no grant names Corio's affiliates, the term \"Affiliate\" appears nowhere in the agreement, and the internal use licence is limited to \"Corio's internal business operations\", with no written-notice or other mechanism to add affiliates. That fails the fallback requirement that affiliates be covered on written notice, so we propose the minimal edit extending Section 2.2 to Corio's affiliates and contractors acting on its behalf (contractor hosting is already partly covered by the \"owned or operated by or for Corio\" definition of Corio Servers) and confirming irrevocability. We have not treated the \"nontransferable\" label as a separate issue given the Section 14.1 carve-out.","confidence":0.78,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0033","oldText":"Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory","newText":"Commerce One grants to Corio, its affiliates and its contractors acting on Corio's behalf a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual and irrevocable right and license in the Territory"},{"kind":"replace","paragraphId":"p0033","oldText":"for (i) Corio's internal business operations","newText":"for (i) the internal business operations of Corio and its affiliates"}],"comment":"[Playbook] We extended the internal use licence to Corio's affiliates and to contractors acting on Corio's behalf, and confirmed it is irrevocable, consistent with our playbook position that licence scope follow our operating group. If preferred, we can accept affiliate coverage on written notice to Commerce One.","level":"preferred","summary":"Extend the internal use licence in Section 2.2 to Corio affiliates and contractors and make it irrevocable.","precedentId":"seed-license"}}
```

- [seq 492](trajectory.jsonl#L492) **submit_finding result**

```json
{"ok":false,"errors":["quote exceeds 600 characters"]}
```

- [seq 513](trajectory.jsonl#L513) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0030","p0033","p0121"],"quote":"Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory to reproduce, install and use additional copies of the Software and Software tools and utilities, subject to any restrictions placed on the Commerce One by third party software providers, in machine executable object code for (i) Corio's internal business operations and (ii) production, testing, development, upgrade, reporting and training.","rationale":"The Section 2 grants are strong on two of the three material terms: the hosting licence is expressly \"perpetual and irrevocable\" and the internal use licence is royalty-free, fully paid up and perpetual, so the licence is not revocable at Commerce One's discretion; and Section 14.1 permits assignment to a successor in a merger, acquisition or sale of substantially all assets without consent (subject only to a direct-competitor carve-out), meeting the successor-transfer element. The gap is affiliate/contractor coverage: no grant names Corio's affiliates, the word \"Affiliate\" appears nowhere in the agreement, and the internal use licence is confined to \"Corio's internal business operations\", with no written-notice or other path to add affiliates. That fails the fallback requirement that affiliates be covered on written notice, so we propose the minimal edit extending Section 2.2 to Corio's affiliates and contractors acting on its behalf (contractor hosting is already partly covered by the \"owned or operated by or for Corio\" definition of Corio Servers) and confirming irrevocability. We have not treated the \"nontransferable\" label as a separate issue given the Section 14.1 carve-out.","confidence":0.78,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0033","oldText":"Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory","newText":"Commerce One grants to Corio, its affiliates and its contractors acting on Corio's behalf a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual and irrevocable right and license in the Territory"},{"kind":"replace","paragraphId":"p0033","oldText":"for (i) Corio's internal business operations","newText":"for (i) the internal business operations of Corio and its affiliates"}],"comment":"[Playbook] We extended the internal use licence to Corio's affiliates and to contractors acting on Corio's behalf, and confirmed it is irrevocable, consistent with our playbook position that licence scope follow our operating group. If preferred, we can accept affiliate coverage on written notice to Commerce One.","level":"preferred","summary":"Extend the internal use licence in Section 2.2 to Corio affiliates and contractors and make it irrevocable.","precedentId":"seed-license"}}
```

- [seq 514](trajectory.jsonl#L514) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 513](trajectory.jsonl#L513)
- Finding: `f-license-1f89e0ac` · **deviation** · confidence 0.78
- Location: § 2. GRANT OF RIGHTS.
- Quote: “Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory to reproduce, install and use additional copies of the Software and Software tools and utilities, subject to any restrictions placed on the Commerce One by third party software providers, in machine executable object code for (i) Corio's internal business operations and (ii) production, testing, development, upgrade, reporting and training.”
- Rationale: The Section 2 grants are strong on two of the three material terms: the hosting licence is expressly "perpetual and irrevocable" and the internal use licence is royalty-free, fully paid up and perpetual, so the licence is not revocable at Commerce One's discretion; and Section 14.1 permits assignment to a successor in a merger, acquisition or sale of substantially all assets without consent (subject only to a direct-competitor carve-out), meeting the successor-transfer element. The gap is affiliate/contractor coverage: no grant names Corio's affiliates, the word "Affiliate" appears nowhere in the agreement, and the internal use licence is confined to "Corio's internal business operations", with no written-notice or other path to add affiliates. That fails the fallback requirement that affiliates be covered on written notice, so we propose the minimal edit extending Section 2.2 to Corio's affiliates and contractors acting on its behalf (contractor hosting is already partly covered by the "owned or operated by or for Corio" definition of Corio Servers) and confirming irrevocability. We have not treated the "nontransferable" label as a separate issue given the Section 14.1 carve-out.
- Proposal: **preferred** — Extend the internal use licence in Section 2.2 to Corio affiliates and contractors and make it irrevocable.
- Comment: [Playbook] We extended the internal use licence to Corio's affiliates and to contractors acting on Corio's behalf, and confirmed it is irrevocable, consistent with our playbook position that licence scope follow our operating group. If preferred, we can accept affiliate coverage on written notice to Commerce One.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Commerce One grants to Corio, its affiliates and its contractors acting on Corio's behalf a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual and irrevocable right and license in the Territory",
    "oldText": "Commerce One grants to Corio a nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), royalty-free, fully paid up, perpetual right and license in the Territory",
    "paragraphId": "p0033"
  },
  {
    "kind": "replace",
    "newText": "for (i) the internal business operations of Corio and its affiliates",
    "oldText": "for (i) Corio's internal business operations",
    "paragraphId": "p0033"
  }
]
```

### Verifier and repair feedback

- [seq 561](trajectory.jsonl#L561) **Verdict: pass** — Deviation classification is sound: the fallback requires affiliate coverage (at minimum on written notice), and no grant in Section 2 names Corio's affiliates — 'Affiliate' appears nowhere in the agreement and Section 2.2 is confined to 'Corio's internal business operations', so the clause fails a material fallback term and edges toward the walk-away scenario (affiliates excluded with no path to add them). The rationale correctly credits the elements that are already met (2.1 is 'perpetual and irrevocable'; 2.2 is royalty-free, fully paid up and perpetual; Section 14.1 permits assignment to a successor in a merger/acquisition/asset sale), so this is not an upgrade of an already-compliant clause but a targeted fix of the one failing element. The redline is directionally correct and reasonably minimal: it extends only Section 2.2 to 'its affiliates and its contractors acting on Corio's behalf' and conforms clause (i) accordingly, leaving 2.1 untouched because the 'Corio Servers' definition ('owned or operated by or for Corio') already accommodates third-party/contractor hosting. The inserted text reads grammatically and does not introduce an undefined capitalised 'Affiliate' term. The added 'and irrevocable' in 2.2 is a small conforming addition consistent with the preferred position for paid-up licences (2.1 already says irrevocable) and is bundled into the same edit rather than raised as a separate flag, which is acceptable. Comment is accurate, concise, in the required voice, explains the change and the playbook basis, and offers the written-notice fallback; the 'nontransferable' label is correctly not double-flagged given the Section 14.1 successor carve-out. Deterministic checks all pass; the changed-character ratios (0.284/0.559) reflect the necessary in-line insertions in a single sentence and do not indicate an over-broad rewrite. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}; {"name":"minimal edit p0033","ok":true,"detail":"changed-character ratio=0.284 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}; {"name":"minimal edit p0033","ok":true,"detail":"changed-character ratio=0.559 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 351](trajectory.jsonl#L351)

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

- [seq 367](trajectory.jsonl#L367) **drafter → list_sections**

```json
{}
```

- [seq 368](trajectory.jsonl#L368) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 369](trajectory.jsonl#L369) **drafter → search**

```json
{"query":"audit","limit":30}
```

- [seq 370](trajectory.jsonl#L370) **search result**

```json
[{"paragraphId":"p0059","sectionRef":"§ 4 FEES.","snippet":"4.4 Audit Rights. Corio shall keep true and accurate books of accounts and records for de…"},{"paragraphId":"p0059","sectionRef":"§ 4 FEES.","snippet":"…ion reveals an underpayment of more than five percent (5%) for the period under audit, Corio shall reimburse Commerce One for the reasonable cost of the examination."}]
```

- [seq 393](trajectory.jsonl#L393) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 394](trajectory.jsonl#L394) **read_section result**

```json
{"sectionRef":"§ 4 FEES.","paragraphs":[{"id":"p0053","text":"4 FEES."},{"id":"p0054","text":"4.1 License Fees. In consideration for the licenses granted to Corio pursuant to Section 2 of this Agreement, Corio shall pay the license fees specified in EXHIBIT B hereto. Payment terms of such license fees shall be as set forth in EXHIBIT B hereto."},{"id":"p0055","text":"4.2 Software Support and Main…
```

- [seq 395](trajectory.jsonl#L395) **drafter → read_section**

```json
{"sectionId":"sec-17"}
```

- [seq 396](trajectory.jsonl#L396) **read_section result**

```json
{"sectionRef":"§ 17 PAYMENT TERMS","paragraphs":[{"id":"p0164","text":"17 PAYMENT TERMS"},{"id":"p0165","text":"License Fees: Due upon Software Acceptance."},{"id":"p0166","text":"Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter. Revenue Sharing Fees: Quarterly payments shall be due to receiving party, net 30 days after quarter close."},{"id":…
```

- [seq 423](trajectory.jsonl#L423) **drafter → read_section**

```json
{"sectionId":"sec-10"}
```

- [seq 424](trajectory.jsonl#L424) **read_section result**

```json
{"sectionRef":"§ 10 CONFIDENTIALITY.","paragraphs":[{"id":"p0093","text":"10 CONFIDENTIALITY."},{"id":"p0094","text":"Each party hereby agrees that it shall not use any Confidential Information received from the other party other than as expressly permitted under the terms of a non-disclosure agreement to be concurrently executed with this Agreement."}]}
```

- [seq 451](trajectory.jsonl#L451) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0059"],"quote":"Such inspections may be made no more than once each calendar year, at reasonable times and upon reasonable notice. Commerce One shall bear all costs and expenses of such inspection. If any such inspection discloses a shortfall or an overpayment, the appropriate party shall promptly pay the amount of such shortfall or refund such overpayment. In addition, if any such inspection reveals an underpayment of more than five percent (5%) for the period under audit, Corio shall reimburse Commerce One for the reasonable cost of the examination.","rationale":"Section 4.4 is the only audit right binding us (Corio). It meets or exceeds the preferred position on every material term: frequency is capped at once each calendar year; the audit is limited to an off-site review of books and records maintained for fee-verification purposes, with no right of access to Corio systems or premises-level inspection; it must be conducted by an independent certified public accountant who is reasonably acceptable to us (a stronger control than the preferred \"independent auditor\"); it must occur at reasonable times; Commerce One bears all costs unless an underpayment exceeding 5% is found; and the true-up runs both ways, so a discovered overpayment must be refunded to us. The only sub-element short of the preferred wording is that notice is \"reasonable notice\" rather than a fixed 30 (or fallback 15) days, and auditor confidentiality is handled generally through Section 10 and the concurrent non-disclosure agreement rather than expressly in the audit clause. Those are minor drafting points, not material failures of the fallback, so no redline is warranted; we would only raise the fixed notice period if the clause is reopened for other reasons.","confidence":0.86}
```

- [seq 452](trajectory.jsonl#L452) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 451](trajectory.jsonl#L451)
- Finding: `f-audit-646c5e2b` · **compliant** · confidence 0.86
- Location: § 4 FEES.
- Quote: “Such inspections may be made no more than once each calendar year, at reasonable times and upon reasonable notice. Commerce One shall bear all costs and expenses of such inspection. If any such inspection discloses a shortfall or an overpayment, the appropriate party shall promptly pay the amount of such shortfall or refund such overpayment. In addition, if any such inspection reveals an underpayment of more than five percent (5%) for the period under audit, Corio shall reimburse Commerce One for the reasonable cost of the examination.”
- Rationale: Section 4.4 is the only audit right binding us (Corio). It meets or exceeds the preferred position on every material term: frequency is capped at once each calendar year; the audit is limited to an off-site review of books and records maintained for fee-verification purposes, with no right of access to Corio systems or premises-level inspection; it must be conducted by an independent certified public accountant who is reasonably acceptable to us (a stronger control than the preferred "independent auditor"); it must occur at reasonable times; Commerce One bears all costs unless an underpayment exceeding 5% is found; and the true-up runs both ways, so a discovered overpayment must be refunded to us. The only sub-element short of the preferred wording is that notice is "reasonable notice" rather than a fixed 30 (or fallback 15) days, and auditor confidentiality is handled generally through Section 10 and the concurrent non-disclosure agreement rather than expressly in the audit clause. Those are minor drafting points, not material failures of the fallback, so no redline is warranted; we would only raise the fixed notice period if the clause is reopened for other reasons.

### Verifier and repair feedback

- [seq 503](trajectory.jsonl#L503) **Verdict: pass** — The cited Section 4.4 is the audit right binding our party (Corio, the licensee) and satisfies the playbook's material terms: frequency capped at once each calendar year, inspection limited to books and records (no access to Customer systems or premises), performed by an independent CPA reasonably acceptable to us, at reasonable times, with Commerce One bearing all costs unless an underpayment exceeding 5% is found — at or above the preferred position. Correctly classified as compliant rather than a deviation; the only shortfalls ("reasonable notice" instead of a fixed 30/15-day period, and auditor confidentiality handled via the general confidentiality section/NDA rather than expressly in the clause) are minor sub-elements properly noted in the rationale rather than redlined. No redline or counterparty comment was proposed, which is the expected output for a compliant finding; the rendered paragraph is unchanged from the original and the deterministic check on audit frequency passes. Rationale is accurate to the quoted text (two-way true-up, 5% threshold, off-site records review) and no other audit/inspection right against us is implicated, so there is no double-flagging or missed walk-away trigger. Checks: {"name":"audit frequency limited","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 375](trajectory.jsonl#L375)

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

- [seq 399](trajectory.jsonl#L399) **drafter → list_sections**

```json
{}
```

- [seq 400](trajectory.jsonl#L400) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 401](trajectory.jsonl#L401) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 402](trajectory.jsonl#L402) **search result**

```json
[]
```

- [seq 427](trajectory.jsonl#L427) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 428](trajectory.jsonl#L428) **read_section result**

```json
{"sectionRef":"§ 4 FEES.","paragraphs":[{"id":"p0053","text":"4 FEES."},{"id":"p0054","text":"4.1 License Fees. In consideration for the licenses granted to Corio pursuant to Section 2 of this Agreement, Corio shall pay the license fees specified in EXHIBIT B hereto. Payment terms of such license fees shall be as set forth in EXHIBIT B hereto."},{"id":"p0055","text":"4.2 Software Support and Main…
```

- [seq 429](trajectory.jsonl#L429) **drafter → read_section**

```json
{"sectionId":"sec-17"}
```

- [seq 430](trajectory.jsonl#L430) **read_section result**

```json
{"sectionRef":"§ 17 PAYMENT TERMS","paragraphs":[{"id":"p0164","text":"17 PAYMENT TERMS"},{"id":"p0165","text":"License Fees: Due upon Software Acceptance."},{"id":"p0166","text":"Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter. Revenue Sharing Fees: Quarterly payments shall be due to receiving party, net 30 days after quarter close."},{"id":…
```

- [seq 455](trajectory.jsonl#L455) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 456](trajectory.jsonl#L456) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 457](trajectory.jsonl#L457) **drafter → search**

```json
{"query":"penalt"}
```

- [seq 458](trajectory.jsonl#L458) **search result**

```json
[]
```

- [seq 459](trajectory.jsonl#L459) **drafter → search**

```json
{"query":"interest"}
```

- [seq 460](trajectory.jsonl#L460) **search result**

```json
[{"paragraphId":"p0043","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"2.8 Ownership. Commerce One hereby retains all of its right, title, and interest in and to the Software, including all copyrights, patents, trade secret rights,…"},{"paragraphId":"p0076","sectionRef":"§ 8 7 WARRANTIES AND DISCLAIMER.","snippet":"…any way interfere or conflict with, or that does or would present a conflict o…
```

- [seq 461](trajectory.jsonl#L461) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 462](trajectory.jsonl#L462) **search result**

```json
[{"paragraphId":"p0040","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… and MarketSite.net Service only under terms and conditions which include, at a minimum, those set forth on EXHIBIT E (\"END USER LICENSE AGREEMENT\") and made a part he…"},{"paragraphId":"p0052","sectionRef":"§ 3 DELIVERY OF SOFTWARE.","snippet":"…ll use all commercially reasonable efforts to promptly provide Corio with, …
```

- [seq 485](trajectory.jsonl#L485) **drafter → read_section**

```json
{"sectionId":"sec-p0148"}
```

- [seq 486](trajectory.jsonl#L486) **read_section result**

```json
{"sectionRef":"§ PRICING","paragraphs":[{"id":"p0148","text":"PRICING"},{"id":"p0149","text":"SOFTWARE: BuySite Hosted Edition version 6.0"},{"id":"p0150","text":"MarketSite.net Service access"},{"id":"p0151","text":"SOFTWARE USERS: BuySite Hosted Edition: Unlimited"},{"id":"p0152","text":"LICENSE FEES: BuySite Hosted Edition: [*]"},{"id":"p0153","text":"MARKETSITE.NET SERVICE FEES: MarketSite.ne…
```

- [seq 487](trajectory.jsonl#L487) **drafter → read_section**

```json
{"sectionId":"sec-p0155"}
```

- [seq 488](trajectory.jsonl#L488) **read_section result**

```json
{"sectionRef":"§ REVENUE SHARING FEES:","paragraphs":[{"id":"p0155","text":"REVENUE SHARING FEES:"},{"id":"p0156","text":"1. MarketSite Transaction Revenue: Commerce One to pay Corio [*] of all transaction fees from Corio Customer transactions on MarketSite."},{"id":"p0157","text":"2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenu…
```

- [seq 507](trajectory.jsonl#L507) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 508](trajectory.jsonl#L508) **read_section result**

```json
{"sectionRef":"§ 9 LIMITATION OF LIABILITY.","paragraphs":[{"id":"p0089","text":"9 LIMITATION OF LIABILITY."},{"id":"p0090","text":"EXCEPT FOR LIABILITY ARISING UNDER SECTION 8 OF THIS AGREEMENT, IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF THIS AGREEMENT OR THE USE OR PERFORMANCE OF THE SOFTWARE EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY CORIO HEREUNDER FOR THE TRANSACTION WHICH THE L…
```

- [seq 509](trajectory.jsonl#L509) **drafter → search**

```json
{"query":"refund"}
```

- [seq 510](trajectory.jsonl#L510) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"…tomers for the Software and MarketSite Service, less taxes, freight, insurance, refunds or credits and other non-product items."},{"paragraphId":"p0050","sectionRef":"§ 3 DELIVERY OF SOFTWARE.","snippet":"…to (i) repeat the Acceptance Test or (ii) terminate the Agreement and receive a refund of any fees paid to Commerce One as of…
```

- [seq 527](trajectory.jsonl#L527) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0097","p0098","p0165","p0161"],"quote":"If either party materially breaches any term or condition of this Agreement and fails to cure such breach within-thirty (30) days after receiving written notice of the breach, the nonbreaching party may terminate this Agreement on written notice at any time following the end of such-thirty (30) day period.","rationale":"The agreement contains no liquidated damages, penalty, minimum-fee-on-termination or early-termination charge payable by Corio (the customer/licensee). Searches for \"liquidated damages\", \"penalt\", \"interest\" and \"minimum\" return no such mechanic; the Fees section (4.1-4.4) and Exhibit B payment terms impose only accrued license, maintenance, MarketSite access, implementation and revenue-share amounts, and Section 11 permits termination for uncured material breach or insolvency without any pre-agreed damages sum. Section 11.3 only preserves ordinary payment obligations for Customers Corio continues to serve, which is a survival of accrued fees rather than a liquidated amount. The revenue-share and support commitments in Exhibits B and C run in Corio's favour, and Corio's remedies for non-acceptance or warranty breach (refund of prepaid fees under 3.x, 7 and 8) benefit us, so they are not flagged. This meets the preferred position (no liquidated damages or penalties payable by Customer); no redline is required.","confidence":0.87}
```

- [seq 528](trajectory.jsonl#L528) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 527](trajectory.jsonl#L527)
- Finding: `f-ld-1e7d83ae` · **compliant** · confidence 0.87
- Location: § 11 TERM AND TERMINATION.
- Quote: “If either party materially breaches any term or condition of this Agreement and fails to cure such breach within-thirty (30) days after receiving written notice of the breach, the nonbreaching party may terminate this Agreement on written notice at any time following the end of such-thirty (30) day period.”
- Rationale: The agreement contains no liquidated damages, penalty, minimum-fee-on-termination or early-termination charge payable by Corio (the customer/licensee). Searches for "liquidated damages", "penalt", "interest" and "minimum" return no such mechanic; the Fees section (4.1-4.4) and Exhibit B payment terms impose only accrued license, maintenance, MarketSite access, implementation and revenue-share amounts, and Section 11 permits termination for uncured material breach or insolvency without any pre-agreed damages sum. Section 11.3 only preserves ordinary payment obligations for Customers Corio continues to serve, which is a survival of accrued fees rather than a liquidated amount. The revenue-share and support commitments in Exhibits B and C run in Corio's favour, and Corio's remedies for non-acceptance or warranty breach (refund of prepaid fees under 3.x, 7 and 8) benefit us, so they are not flagged. This meets the preferred position (no liquidated damages or penalties payable by Customer); no redline is required.

### Verifier and repair feedback

- [seq 584](trajectory.jsonl#L584) **Verdict: pass** — Claimed status is 'compliant' and no redline or comment was proposed, which is the expected output for a compliant finding — the rendered redline is identical to the original paragraphs. The cited text supports the conclusion: Section 11.2 provides only for termination on uncured material breach or insolvency with no pre-agreed damages sum, and 11.3 merely preserves accrued/ongoing payment obligations for Corio's then-existing Customers (a survival of fees, not a liquidated amount). Exhibit B items cited (License Fees due on Acceptance; Implementation Fees on time-and-materials with a cap) are ordinary consideration, not penalties or minimum-fee-on-termination mechanics. Correctly identifies Corio as our party (licensee/customer) and correctly declines to flag Vendor-side or Corio-favourable remedies (refunds, support commitments, revenue share) per the rule's detection guidance. No deterministic check failures; rationale accurately notes the clause meets the preferred position rather than the fallback. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 387](trajectory.jsonl#L387)

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

- [seq 411](trajectory.jsonl#L411) **drafter → list_sections**

```json
{}
```

- [seq 412](trajectory.jsonl#L412) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 413](trajectory.jsonl#L413) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 414](trajectory.jsonl#L414) **read_section result**

```json
{"sectionRef":"§ 8 7 WARRANTIES AND DISCLAIMER.","paragraphs":[{"id":"p0075","text":"8 7 WARRANTIES AND DISCLAIMER."},{"id":"p0076","text":"7.1 No Conflict. Each party represents and warrants to the other party that it is under no current obligation or restriction, nor will it knowingly assume any such obligation or restriction that does or would in any way interfere or conflict with, or that doe…
```

- [seq 439](trajectory.jsonl#L439) **drafter → search**

```json
{"query":"EXPRESS OR IMPLIED"}
```

- [seq 440](trajectory.jsonl#L440) **search result**

```json
[]
```

- [seq 441](trajectory.jsonl#L441) **drafter → search**

```json
{"query":"Delivery Date"}
```

- [seq 442](trajectory.jsonl#L442) **search result**

```json
[]
```

- [seq 471](trajectory.jsonl#L471) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0082","p0083","p0084","p0085","p0086"]}
```

- [seq 472](trajectory.jsonl#L472) **read_paragraphs result**

```json
[{"id":"p0082","sectionRef":"§ 8 7 WARRANTIES AND DISCLAIMER.","text":"7.4 Product Warranty - Year 2000 Compliance. Commerce One warrants that the Software and MarketSite.net Service, when used in accordance with its associated documentation, is in all material respects capable upon installation of accurately processing, providing and/or receiving date data from, into and between the twentieth an…
```

- [seq 473](trajectory.jsonl#L473) **drafter → read_section**

```json
{"sectionId":"sec-3-2"}
```

- [seq 474](trajectory.jsonl#L474) **read_section result**

```json
{"sectionRef":"§ 3 DELIVERY OF SOFTWARE.","paragraphs":[{"id":"p0046","text":"3. DELIVERY OF SOFTWARE."},{"id":"p0047","text":"3.1 Delivery and Acceptance. Commerce One shall issue to Corio, via electronic means of delivery, as soon as practicable, one (1) machine-readable copy of the Software, along with one (1) copy of the on-line Documentation. Commerce One will provide Corio with one written …
```

- [seq 499](trajectory.jsonl#L499) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"Software/hosted service performance warranty, 60 days from Effective Date with drop-dead date; extend duration"}
```

- [seq 522](trajectory.jsonl#L522) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-warranty","source":"Evergreen Implementation SOW (Jun 2025)","clauseAfter":"Vendor warrants for ninety days that the Services will be professional and workmanlike, with re-performance, repair, replacement or refund as the remedy.","comment":"[Playbook] We added a meaningful performance warranty and remedy for non-conforming work.","level":"fallback"}]}
```

- [seq 545](trajectory.jsonl#L545) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend Software/MarketSite.net warranty period to twelve (12) months from acceptance and remove the December 31, 1999 drop-dead cut-off.","comment":"[Playbook] We extended the product warranty to twelve (12) months running from our acceptance of the Software and removed the fixed December 31, 1999 cut-off, since a 60-day period measured from the Effective Date can expire before or shortly after delivery. Our playbook position is 12 months for software; we can accept ninety (90) days from acceptance as a fallback.","precedentId":"seed-warranty","ops":[{"kind":"replace","paragraphId":"p0078","oldText":"for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the \"Warranty Period\")","newText":"for a period of twelve (12) months from Corio's acceptance of the Software pursuant to Section 3.1 (the \"Warranty Period\")"}]}
```

- [seq 546](trajectory.jsonl#L546) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0078","segments":[{"type":"equal","text":"7.3 Product Warranty. Commerce One warrants that the Software and MarketSite.net Service will perform in substantial accordance with the Documentation, and the media on which the Software is distributed will be free from defects in materials and workmanship under normal use, for a period of "},{"type":"d…
```

- [seq 564](trajectory.jsonl#L564) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0078","p0079"],"quote":"Commerce One warrants that the Software and MarketSite.net Service will perform in substantial accordance with the Documentation, and the media on which the Software is distributed will be free from defects in materials and workmanship under normal use, for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the \"Warranty Period\").","rationale":"Section 7.3 does contain a real express conformance warranty (performance in substantial accordance with the Documentation, plus a no-malicious-code warranty) and a genuine remedy ladder — correction, replacement free of charge, and termination with refund of all prepaid fees — and the disclaimer in Section 7 only strips implied warranties, so it does not swallow the express warranty. The material term that fails is duration: 60 days measured from the Effective Date, hard-capped at December 31, 1999. That is below the fallback of 90 days for software, and because it runs from the Effective Date (not delivery or acceptance, which under Section 3.1 can run to December 31, 1999) the warranty could expire at or before acceptance, leaving effectively no coverage. We therefore propose the preferred 12-month period measured from acceptance and deletion of the fixed cut-off date, noting 90 days from acceptance as an acceptable fallback.","confidence":0.82,"proposal":{"level":"preferred","summary":"Extend Software/MarketSite.net warranty period to twelve (12) months from acceptance and remove the December 31, 1999 drop-dead cut-off.","comment":"[Playbook] We extended the product warranty to twelve (12) months running from our acceptance of the Software and removed the fixed December 31, 1999 cut-off, since a 60-day period measured from the Effective Date can expire before or shortly after delivery. Our playbook position is 12 months for software; we can accept ninety (90) days from acceptance as a fallback.","precedentId":"seed-warranty","ops":[{"kind":"replace","paragraphId":"p0078","oldText":"for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the \"Warranty Period\")","newText":"for a period of twelve (12) months from Corio's acceptance of the Software pursuant to Section 3.1 (the \"Warranty Period\")"}]}}
```

- [seq 565](trajectory.jsonl#L565) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 564](trajectory.jsonl#L564)
- Finding: `f-warranty-78977b85` · **deviation** · confidence 0.82
- Location: § 7 WARRANTIES AND DISCLAIMER.
- Quote: “Commerce One warrants that the Software and MarketSite.net Service will perform in substantial accordance with the Documentation, and the media on which the Software is distributed will be free from defects in materials and workmanship under normal use, for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the "Warranty Period").”
- Rationale: Section 7.3 does contain a real express conformance warranty (performance in substantial accordance with the Documentation, plus a no-malicious-code warranty) and a genuine remedy ladder — correction, replacement free of charge, and termination with refund of all prepaid fees — and the disclaimer in Section 7 only strips implied warranties, so it does not swallow the express warranty. The material term that fails is duration: 60 days measured from the Effective Date, hard-capped at December 31, 1999. That is below the fallback of 90 days for software, and because it runs from the Effective Date (not delivery or acceptance, which under Section 3.1 can run to December 31, 1999) the warranty could expire at or before acceptance, leaving effectively no coverage. We therefore propose the preferred 12-month period measured from acceptance and deletion of the fixed cut-off date, noting 90 days from acceptance as an acceptable fallback.
- Proposal: **preferred** — Extend Software/MarketSite.net warranty period to twelve (12) months from acceptance and remove the December 31, 1999 drop-dead cut-off.
- Comment: [Playbook] We extended the product warranty to twelve (12) months running from our acceptance of the Software and removed the fixed December 31, 1999 cut-off, since a 60-day period measured from the Effective Date can expire before or shortly after delivery. Our playbook position is 12 months for software; we can accept ninety (90) days from acceptance as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "for a period of twelve (12) months from Corio's acceptance of the Software pursuant to Section 3.1 (the \"Warranty Period\")",
    "oldText": "for a period of sixty (60) days from the Effective Date, but in no event not later than December 31, 1999 (the \"Warranty Period\")",
    "paragraphId": "p0078"
  }
]
```

### Verifier and repair feedback

- [seq 603](trajectory.jsonl#L603) **Verdict: pass** — Deviation classification is correct: the express warranty runs only sixty (60) days from the Effective Date with a hard December 31, 1999 cut-off, which is below the fallback of 90 days for software and, because it runs from the Effective Date rather than delivery/acceptance, can expire at or before acceptance — a material failure of the fallback, not a mere sub-element gap. Rationale accurately acknowledges the parts that already comply (substantial-conformance warranty, no-malicious-code warranty, correction/replacement/refund remedy ladder, disclaimer limited to implied warranties), so it does not over-claim or double-flag. Redline is targeted and directionally right: it substitutes 'twelve (12) months from Corio's acceptance of the Software pursuant to Section 3.1' for the 60-day/Effective-Date period and deletes the fixed cut-off, leaving the second (malicious code) sentence, the remedy paragraph and the 'Warranty Period' definition intact and still operative. The failed minimal-edit heuristic is not substantive here — the only substantive replacement is the duration/trigger language the rule requires be rewritten; the balance of the paragraph is preserved verbatim. Comment is accurate, in tone, states what changed and why (period could expire before or shortly after delivery), cites the 12-month playbook position and offers the 90-days-from-acceptance fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"warranty period ≥ 90 days or expressed in months/years","ok":true}; {"name":"minimal edit p0078","ok":false,"detail":"changed-character ratio=0.767 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 391](trajectory.jsonl#L391)

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

- [seq 417](trajectory.jsonl#L417) **drafter → list_sections**

```json
{}
```

- [seq 418](trajectory.jsonl#L418) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 419](trajectory.jsonl#L419) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 420](trajectory.jsonl#L420) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"…io from Customers for the Software and MarketSite Service, less taxes, freight, insurance, refunds or credits and other non-product items."}]
```

- [seq 445](trajectory.jsonl#L445) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 446](trajectory.jsonl#L446) **read_section result**

```json
{"sectionRef":"§ 14 MISCELLANEOUS.","paragraphs":[{"id":"p0120","text":"14 MISCELLANEOUS."},{"id":"p0121","text":"14.1 Assignment. Neither party may assign this Agreement or any rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party. Notwithstanding the foregoing, either party shall have the right to assign this Agreement in…
```

- [seq 447](trajectory.jsonl#L447) **drafter → read_section**

```json
{"sectionId":"sec-8-2"}
```

- [seq 448](trajectory.jsonl#L448) **read_section result**

```json
{"sectionRef":"§ 8 INDEMNIFICATION.","paragraphs":[{"id":"p0085","text":"8 INDEMNIFICATION."},{"id":"p0086","text":"8.1 By Commerce One. Commerce One shall indemnify, defend and hold harmless Corio and its Customers from any and all damages, liabilities, costs and expenses (including reasonable attorneys' fees) incurred by Corio or its Customers arising out of any claim that the Software infringe…
```

- [seq 477](trajectory.jsonl#L477) **drafter → search**

```json
{"query":"premises"}
```

- [seq 478](trajectory.jsonl#L478) **search result**

```json
[]
```

- [seq 479](trajectory.jsonl#L479) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 480](trajectory.jsonl#L480) **read_section result**

```json
{"sectionRef":"§ 5 INSTALLATION SUPPORT, MAINTENANCE AND TRAINING.","paragraphs":[{"id":"p0060","text":"5 INSTALLATION SUPPORT, MAINTENANCE AND TRAINING."},{"id":"p0061","text":"5.1 Installation. Commerce One shall provide Corio with access to one (1) full-time operations consultant for one (1) week at no charge to Corio as part of the installation project as described in the Corio Statement of W…
```

- [seq 501](trajectory.jsonl#L501) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"License and hosting agreement; vendor provides consultants, professional services and hosted MarketSite service"}
```

- [seq 524](trajectory.jsonl#L524) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-insurance","source":"Redwood Facilities Services MSA (Jul 2025)","clauseAfter":"Vendor shall maintain commercial general liability, professional liability and cyber liability insurance and provide certificates on request.","comment":"[Playbook] We added standard coverage appropriate for a vendor accessing our data and premises.","level":"preferred"}]}
```

- [seq 549](trajectory.jsonl#L549) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-insurance","summary":"Insert a new Section 14.10 requiring Commerce One to maintain commercial general liability, professional liability and cyber liability insurance and to provide certificates on request; renumber Complete Understanding.","comment":"[Playbook] We added a standard insurance provision, as the Agreement currently has none even though Commerce One's consultants and professional services personnel support our hosted environment and its MarketSite.net Service handles our and our Customers' data. Our playbook position is CGL of USD 1M/2M, E&O of USD 2M and, where Customer Data is processed, cyber cover of USD 5M, with certificates on request; we can discuss E&O of USD 1M and cyber of USD 2M if the higher limits are a problem.","ops":[{"kind":"insert_after","paragraphId":"p0132","numbering":"14.10","text":"14.10 Insurance. Commerce One shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than One Million Dollars ($1,000,000) per occurrence and Two Million Dollars ($2,000,000) in the aggregate; (b) professional liability (errors and omissions) insurance of not less than Two Million Dollars ($2,000,000); (c) where Commerce One processes Corio or Customer data, cyber and privacy liability insurance of not less than Five Million Dollars ($5,000,000); and (d) workers' compensation insurance as required by applicable law. Commerce One shall provide Corio with certificates of insurance evidencing such coverage upon Corio's request."},{"kind":"replace","paragraphId":"p0133","oldText":"14.10 Complete Understanding.","newText":"14.11 Complete Understanding."}]}
```

- [seq 550](trajectory.jsonl#L550) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0132","segments":[{"type":"equal","text":"14.9 Bankruptcy. The parties hereto agree that Corio, as a licensee of Commerce One's intellectual property, shall be afforded all of the protections afforded to a licensee under Section 365(n) of the United States Bankruptcy Code, as amended from time to time (the \"CODE\") so that the Trustee or Debtor…
```

- [seq 574](trajectory.jsonl#L574) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0132","p0133"],"quote":"14.9 Bankruptcy. The parties hereto agree that Corio, as a licensee of Commerce One's intellectual property, shall be afforded all of the protections afforded to a licensee under Section 365(n) of the United States Bankruptcy Code","rationale":"The Agreement contains no insurance provision. A search for \"insurance\" returns only the revenue definition in Section 1 (p0012, deducting \"taxes, freight, insurance, refunds or credits\" from net revenue), and neither the Miscellaneous section (14.1–14.10) nor the Indemnification section (8.1–8.2) imposes any coverage obligation on Commerce One. Commerce One is the vendor here: it supplies an operations consultant and professional services personnel for our installation and implementations (5.1, 5.2, 5.6), provides support and training (5.3, 5.5), and its MarketSite.net Service handles Corio and Customer data. That falls squarely within the rule's scope, and the absence of any coverage for a vendor of hosted services touching our data is walk-away territory rather than merely short of the fallback. Redline inserts a new Section 14.10 at the preferred limits (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M where Customer Data is processed, statutory workers' compensation, certificates on request) and renumbers Complete Understanding to 14.11; the fallback of E&O USD 1M / cyber USD 2M is offered in the comment if the limits are resisted.</parationale>\n<parameter name=\"confidence\">0.9","proposal":{"level":"preferred","precedentId":"seed-insurance","summary":"Insert a new Section 14.10 requiring Commerce One to maintain commercial general liability, professional liability and cyber liability insurance and to provide certificates on request; renumber Complete Understanding.","comment":"[Playbook] We added a standard insurance provision, as the Agreement currently has none even though Commerce One's consultants and professional services personnel support our hosted environment and its MarketSite.net Service handles our and our Customers' data. Our playbook position is CGL of USD 1M/2M, E&O of USD 2M and, where Customer Data is processed, cyber cover of USD 5M, with certificates on request; we can discuss E&O of USD 1M and cyber of USD 2M if the higher limits are a problem.","ops":[{"kind":"insert_after","paragraphId":"p0132","numbering":"14.10","text":"14.10 Insurance. Commerce One shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than One Million Dollars ($1,000,000) per occurrence and Two Million Dollars ($2,000,000) in the aggregate; (b) professional liability (errors and omissions) insurance of not less than Two Million Dollars ($2,000,000); (c) where Commerce One processes Corio or Customer data, cyber and privacy liability insurance of not less than Five Million Dollars ($5,000,000); and (d) workers' compensation insurance as required by applicable law. Commerce One shall provide Corio with certificates of insurance evidencing such coverage upon Corio's request."},{"kind":"replace","paragraphId":"p0133","oldText":"14.10 Complete Understanding.","newText":"14.11 Complete Understanding."}]}}
```

- [seq 575](trajectory.jsonl#L575) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 595](trajectory.jsonl#L595) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0132","p0133"],"quote":"14.9 Bankruptcy. The parties hereto agree that Corio, as a licensee of Commerce One's intellectual property, shall be afforded all of the protections afforded to a licensee under Section 365(n) of the United States Bankruptcy Code","rationale":"The Agreement contains no insurance provision. A search for \"insurance\" returns only the net-revenue definition in Section 1 (p0012, deducting \"taxes, freight, insurance, refunds or credits\"), and neither the Miscellaneous section (14.1-14.10) nor the Indemnification section (8.1-8.2) imposes any coverage obligation on Commerce One. Commerce One is the vendor: it supplies an operations consultant and professional services personnel for our installation and implementations (5.1, 5.2, 5.6), provides support and training (5.3, 5.5), and its MarketSite.net Service handles Corio and Customer data. That is squarely within the rule's scope, and no insurance at all for a vendor of hosted services touching our data is walk-away territory rather than merely short of the fallback. The redline inserts a new Section 14.10 at the preferred limits (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M where Customer Data is processed, statutory workers' compensation, certificates on request) and renumbers Complete Understanding to 14.11; the fallback of E&O USD 1M / cyber USD 2M is offered in the comment if the limits are resisted.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-insurance","summary":"Insert a new Section 14.10 requiring Commerce One to maintain commercial general liability, professional liability and cyber liability insurance and to provide certificates on request; renumber Complete Understanding.","comment":"[Playbook] We added a standard insurance provision, as the Agreement currently has none even though Commerce One's consultants and professional services personnel support our hosted environment and its MarketSite.net Service handles our and our Customers' data. Our playbook position is CGL of USD 1M/2M, E&O of USD 2M and, where Customer Data is processed, cyber cover of USD 5M, with certificates on request; we can discuss E&O of USD 1M and cyber of USD 2M if the higher limits are a problem.","ops":[{"kind":"insert_after","paragraphId":"p0132","numbering":"14.10","text":"14.10 Insurance. Commerce One shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than One Million Dollars ($1,000,000) per occurrence and Two Million Dollars ($2,000,000) in the aggregate; (b) professional liability (errors and omissions) insurance of not less than Two Million Dollars ($2,000,000); (c) where Commerce One processes Corio or Customer data, cyber and privacy liability insurance of not less than Five Million Dollars ($5,000,000); and (d) workers' compensation insurance as required by applicable law. Commerce One shall provide Corio with certificates of insurance evidencing such coverage upon Corio's request."},{"kind":"replace","paragraphId":"p0133","oldText":"14.10 Complete Understanding.","newText":"14.11 Complete Understanding."}]}}
```

- [seq 596](trajectory.jsonl#L596) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 595](trajectory.jsonl#L595)
- Finding: `f-insurance-baabeeda` · **missing** · confidence 0.90
- Location: § 14 MISCELLANEOUS.
- Quote: “14.9 Bankruptcy. The parties hereto agree that Corio, as a licensee of Commerce One's intellectual property, shall be afforded all of the protections afforded to a licensee under Section 365(n) of the United States Bankruptcy Code”
- Rationale: The Agreement contains no insurance provision. A search for "insurance" returns only the net-revenue definition in Section 1 (p0012, deducting "taxes, freight, insurance, refunds or credits"), and neither the Miscellaneous section (14.1-14.10) nor the Indemnification section (8.1-8.2) imposes any coverage obligation on Commerce One. Commerce One is the vendor: it supplies an operations consultant and professional services personnel for our installation and implementations (5.1, 5.2, 5.6), provides support and training (5.3, 5.5), and its MarketSite.net Service handles Corio and Customer data. That is squarely within the rule's scope, and no insurance at all for a vendor of hosted services touching our data is walk-away territory rather than merely short of the fallback. The redline inserts a new Section 14.10 at the preferred limits (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M where Customer Data is processed, statutory workers' compensation, certificates on request) and renumbers Complete Understanding to 14.11; the fallback of E&O USD 1M / cyber USD 2M is offered in the comment if the limits are resisted.
- Proposal: **preferred** — Insert a new Section 14.10 requiring Commerce One to maintain commercial general liability, professional liability and cyber liability insurance and to provide certificates on request; renumber Complete Understanding.
- Comment: [Playbook] We added a standard insurance provision, as the Agreement currently has none even though Commerce One's consultants and professional services personnel support our hosted environment and its MarketSite.net Service handles our and our Customers' data. Our playbook position is CGL of USD 1M/2M, E&O of USD 2M and, where Customer Data is processed, cyber cover of USD 5M, with certificates on request; we can discuss E&O of USD 1M and cyber of USD 2M if the higher limits are a problem.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "14.10",
    "paragraphId": "p0132",
    "text": "14.10 Insurance. Commerce One shall maintain, at its own expense, throughout the term of this Agreement and for one (1) year thereafter: (a) commercial general liability insurance of not less than One Million Dollars ($1,000,000) per occurrence and Two Million Dollars ($2,000,000) in the aggregate; (b) professional liability (errors and omissions) insurance of not less than Two Million Dollars ($2,000,000); (c) where Commerce One processes Corio or Customer data, cyber and privacy liability insurance of not less than Five Million Dollars ($5,000,000); and (d) workers' compensation insurance as required by applicable law. Commerce One shall provide Corio with certificates of insurance evidencing such coverage upon Corio's request."
  },
  {
    "kind": "replace",
    "newText": "14.11 Complete Understanding.",
    "oldText": "14.10 Complete Understanding.",
    "paragraphId": "p0133"
  }
]
```

### Verifier and repair feedback

- [seq 624](trajectory.jsonl#L624) **Verdict: pass** — The rule is a 'missing'-kind insurance rule and the cited miscellaneous paragraphs (14.9–14.10) contain no coverage obligation; the rationale confirms the only 'insurance' hit elsewhere is the net-revenue definition, so no usable clause exists and the 'missing' classification is correct. Direction is correct for our side: we represent Corio (the licensee/customer) and the inserted obligation runs against Commerce One, the software/hosting vendor whose consultants and MarketSite.net Service touch Corio and Customer data; nothing in the edit burdens our party. The redline is a clean, minimal insertion of a new Section 14.10 tracking the model language (CGL USD 1M/2M, E&O USD 2M, cyber USD 5M where data is processed, statutory workers' comp, certificates on request) with a correct renumber of Complete Understanding to 14.11 and no other text disturbed (changed-character ratio 0.069 on p0133 is purely the renumber). The comment is accurate, concise, in the required voice, states what changed and why, cites the preferred limits and offers the E&O USD 1M / cyber USD 2M fallback, and does not overstate the record. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"insurance obligation present","ok":true}; {"name":"minimal edit p0133","ok":true,"detail":"changed-character ratio=0.069 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 497](trajectory.jsonl#L497)

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

- [seq 517](trajectory.jsonl#L517) **drafter → list_sections**

```json
{}
```

- [seq 518](trajectory.jsonl#L518) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 519](trajectory.jsonl#L519) **drafter → search**

```json
{"query":"minimum","limit":30}
```

- [seq 520](trajectory.jsonl#L520) **search result**

```json
[{"paragraphId":"p0040","sectionRef":"§ 3 2. GRANT OF RIGHTS.","snippet":"… and MarketSite.net Service only under terms and conditions which include, at a minimum, those set forth on EXHIBIT E (\"END USER LICENSE AGREEMENT\") and made a part he…"},{"paragraphId":"p0052","sectionRef":"§ 3 DELIVERY OF SOFTWARE.","snippet":"…ll use all commercially reasonable efforts to promptly provide Corio with, …
```

- [seq 539](trajectory.jsonl#L539) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 540](trajectory.jsonl#L540) **read_section result**

```json
{"sectionRef":"§ 4 FEES.","paragraphs":[{"id":"p0053","text":"4 FEES."},{"id":"p0054","text":"4.1 License Fees. In consideration for the licenses granted to Corio pursuant to Section 2 of this Agreement, Corio shall pay the license fees specified in EXHIBIT B hereto. Payment terms of such license fees shall be as set forth in EXHIBIT B hereto."},{"id":"p0055","text":"4.2 Software Support and Main…
```

- [seq 541](trajectory.jsonl#L541) **drafter → read_section**

```json
{"sectionId":"sec-p0148"}
```

- [seq 542](trajectory.jsonl#L542) **read_section result**

```json
{"sectionRef":"§ PRICING","paragraphs":[{"id":"p0148","text":"PRICING"},{"id":"p0149","text":"SOFTWARE: BuySite Hosted Edition version 6.0"},{"id":"p0150","text":"MarketSite.net Service access"},{"id":"p0151","text":"SOFTWARE USERS: BuySite Hosted Edition: Unlimited"},{"id":"p0152","text":"LICENSE FEES: BuySite Hosted Edition: [*]"},{"id":"p0153","text":"MARKETSITE.NET SERVICE FEES: MarketSite.ne…
```

- [seq 568](trajectory.jsonl#L568) **drafter → read_section**

```json
{"sectionId":"sec-p0155"}
```

- [seq 569](trajectory.jsonl#L569) **read_section result**

```json
{"sectionRef":"§ REVENUE SHARING FEES:","paragraphs":[{"id":"p0155","text":"REVENUE SHARING FEES:"},{"id":"p0156","text":"1. MarketSite Transaction Revenue: Commerce One to pay Corio [*] of all transaction fees from Corio Customer transactions on MarketSite."},{"id":"p0157","text":"2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenu…
```

- [seq 570](trajectory.jsonl#L570) **drafter → read_section**

```json
{"sectionId":"sec-17"}
```

- [seq 571](trajectory.jsonl#L571) **read_section result**

```json
{"sectionRef":"§ 17 PAYMENT TERMS","paragraphs":[{"id":"p0164","text":"17 PAYMENT TERMS"},{"id":"p0165","text":"License Fees: Due upon Software Acceptance."},{"id":"p0166","text":"Maintenance and Support Fees: Net 30 of Software acceptance anniversary date, and each year thereafter. Revenue Sharing Fees: Quarterly payments shall be due to receiving party, net 30 days after quarter close."},{"id":…
```

- [seq 589](trajectory.jsonl#L589) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 590](trajectory.jsonl#L590) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 591](trajectory.jsonl#L591) **drafter → search**

```json
{"query":"shortfall OR take or pay OR commit to purchase OR guaranteed","limit":20}
```

- [seq 592](trajectory.jsonl#L592) **search result**

```json
[]
```

- [seq 606](trajectory.jsonl#L606) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 607](trajectory.jsonl#L607) **read_section result**

```json
{"sectionRef":"§ 3 2. GRANT OF RIGHTS.","paragraphs":[{"id":"p0029","text":"3 2. GRANT OF RIGHTS."},{"id":"p0030","text":"2.1 Hosting Software License. Subject to the terms and conditions of this Agreement, Commerce One hereby grants to Corio a fee-bearing, perpetual and irrevocable, nonexclusive, nontransferable (except in accordance with Section 14.1 of this Agreement), right and license in the…
```

- [seq 618](trajectory.jsonl#L618) **drafter → read_section**

```json
{"sectionId":"sec-p0197"}
```

- [seq 619](trajectory.jsonl#L619) **read_section result**

```json
{"sectionRef":"§ SALES AND MARKETING COOPERATION","paragraphs":[{"id":"p0197","text":"SALES AND MARKETING COOPERATION"},{"id":"p0198","text":"The parties agree to the following non-binding sales and marketing cooperation efforts:"},{"id":"p0199","text":"1. RELATIONSHIP MANAGERS. The parties' Relationship Managers would attempt to meet at mutually agreeable times no less than every quarter to revi…
```

- [seq 620](trajectory.jsonl#L620) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 621](trajectory.jsonl#L621) **read_section result**

```json
{"sectionRef":"§ 13 SHARED RESOURCES.","paragraphs":[{"id":"p0107","text":"13 SHARED RESOURCES."},{"id":"p0108","text":"13.1 Operations. To the extent not provided for within the Statement of Work covered by the Implementation Fee, Commerce One shall provide Corio with access to Commerce One operations personnel as reasonably requested by Corio, subject to payment by Corio of Commerce One's stand…
```

- [seq 627](trajectory.jsonl#L627) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0151","p0157","p0158","p0055","p0161"]}
```

- [seq 628](trajectory.jsonl#L628) **read_paragraphs result**

```json
[{"id":"p0151","sectionRef":"§ PRICING","text":"SOFTWARE USERS: BuySite Hosted Edition: Unlimited"},{"id":"p0157","sectionRef":"§ REVENUE SHARING FEES:","text":"2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenue from Corio Customers for use of Commerce One Software or MarketSite.net Service Access subject to the following limitati…
```

- [seq 635](trajectory.jsonl#L635) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0151","p0157","p0158","p0161","p0055"],"quote":"2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenue from Corio Customers for use of Commerce One Software or MarketSite.net Service Access subject to the following limitations.","rationale":"The agreement meets the preferred position: there is no minimum purchase commitment, take-or-pay, shortfall penalty or volume cap imposed on us (Corio). Our variable fees are pure usage/revenue-based — the Application Management Revenue share is a percentage of revenue actually invoiced to Corio Customers (p0157), excluding professional service and network access fees (p0159) and accruing only once a Customer goes live (p0160). Implementation fees are time-and-materials against an agreed Statement of Work with a stated cap (p0161), i.e. ordered services only. Seat volume is uncapped rather than committed (\"SOFTWARE USERS: BuySite Hosted Edition: Unlimited\", p0151), with unlimited Customer sublicensing (p0032) and unlimited MarketSite.net access (p0041). Maintenance and support is expressly elective in economic effect — it continues only \"provided that Corio continues to pay the annual Maintenance and Support fees\" (p0055, echoed in the survival language at p0098), so we can stop paying rather than being locked in.\n\nTwo minor sub-elements noted but not flagged: (i) the five-year initial term (p0096) carries annual MarketSite.net access and maintenance fees with no termination-for-convenience right, but these are fees for a service actually made available on an unlimited-access basis rather than a committed minimum volume or take-or-pay, so the walk-away trigger is not met; and (ii) the \"minimum limitation of 40 Authorized Software Users per Customer\" in p0158 is a threshold on a fee waiver that benefits us (the 3000 royalty-free user licenses), not a purchase obligation. Exhibit D's initial-customer and marketing items are expressly \"non-binding\" (p0198) and framed as commercially reasonable efforts (p0205), so they create no volume commitment either. No redline required.","confidence":0.85}
```

- [seq 636](trajectory.jsonl#L636) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 635](trajectory.jsonl#L635)
- Finding: `f-mincommit-b2289421` · **compliant** · confidence 0.85
- Location: § PRICING
- Quote: “2. Corio Customer Application Management Revenue: Corio to pay Commerce One [*] of all Application Management Revenue from Corio Customers for use of Commerce One Software or MarketSite.net Service Access subject to the following limitations.”
- Rationale: The agreement meets the preferred position: there is no minimum purchase commitment, take-or-pay, shortfall penalty or volume cap imposed on us (Corio). Our variable fees are pure usage/revenue-based — the Application Management Revenue share is a percentage of revenue actually invoiced to Corio Customers (p0157), excluding professional service and network access fees (p0159) and accruing only once a Customer goes live (p0160). Implementation fees are time-and-materials against an agreed Statement of Work with a stated cap (p0161), i.e. ordered services only. Seat volume is uncapped rather than committed ("SOFTWARE USERS: BuySite Hosted Edition: Unlimited", p0151), with unlimited Customer sublicensing (p0032) and unlimited MarketSite.net access (p0041). Maintenance and support is expressly elective in economic effect — it continues only "provided that Corio continues to pay the annual Maintenance and Support fees" (p0055, echoed in the survival language at p0098), so we can stop paying rather than being locked in.

Two minor sub-elements noted but not flagged: (i) the five-year initial term (p0096) carries annual MarketSite.net access and maintenance fees with no termination-for-convenience right, but these are fees for a service actually made available on an unlimited-access basis rather than a committed minimum volume or take-or-pay, so the walk-away trigger is not met; and (ii) the "minimum limitation of 40 Authorized Software Users per Customer" in p0158 is a threshold on a fee waiver that benefits us (the 3000 royalty-free user licenses), not a purchase obligation. Exhibit D's initial-customer and marketing items are expressly "non-binding" (p0198) and framed as commercially reasonable efforts (p0205), so they create no volume commitment either. No redline required.

### Verifier and repair feedback

- [seq 649](trajectory.jsonl#L649) **Verdict: pass** — Claimed status is compliant with no redline and no comment, which is the expected output shape for a compliant finding; nothing is raised as a negotiation issue. The cited paragraphs support the compliance call: variable fees are a percentage of Application Management Revenue actually received from Customers (p0157), implementation is time-and-materials against an agreed SOW with a cap (p0161), and seat volume is 'Unlimited' rather than a committed minimum (p0151) — i.e. fees for usage/ordered services only, the preferred position. The only 'minimum' language in scope (p0158, 40 Authorized Software Users per Customer) is correctly read as a qualifying threshold on a royalty-free-license fee waiver that benefits our side, not a purchase obligation, so it is properly not flagged. Annual maintenance/access fees over the five-year term are correctly characterised as fees conditioned on continued payment (p0055) rather than take-or-pay or shortfall exposure; noting this in the rationale rather than flagging it matches the playbook's treatment of minor sub-elements. No deterministic check failures and no unnecessary edits; the finding is properly retained as internal evidence. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 505](trajectory.jsonl#L505)

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

- [seq 531](trajectory.jsonl#L531) **drafter → list_sections**

```json
{}
```

- [seq 532](trajectory.jsonl#L532) **list_sections result**

```json
[{"id":"sec-1","number":"1","heading":"EXHIBIT 10.5","level":1,"paragraphCount":1},{"id":"sec-p0001","heading":"CORIO INC. LICENSE AND HOSTING AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0003","heading":"BACKGROUND","level":1,"paragraphCount":5},{"id":"sec-1-2","number":"1","heading":"DEFINITIONS.","level":1,"paragraphCount":21},{"id":"sec-3","number":"3","heading":"2. GRANT OF RIGHTS.",…
```

- [seq 533](trajectory.jsonl#L533) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 534](trajectory.jsonl#L534) **read_section result**

```json
{"sectionRef":"§ 11 TERM AND TERMINATION.","paragraphs":[{"id":"p0095","text":"11 TERM AND TERMINATION."},{"id":"p0096","text":"11.1 Term. The term of this Agreement shall commence on the Effective Date and shall continue in full force and effect for an initial period of five (5) years. Thereafter, this Agreement shall automatically renew for subsequent one (1) year periods unless either party pr…
```

- [seq 555](trajectory.jsonl#L555) **drafter → read_section**

```json
{"sectionId":"sec-12"}
```

- [seq 556](trajectory.jsonl#L556) **read_section result**

```json
{"sectionRef":"§ 12 SOURCE CODE ESCROW.","paragraphs":[{"id":"p0099","text":"12 SOURCE CODE ESCROW."},{"id":"p0100","text":"12.1 Escrow Account. Within sixty (60) days of the Effective Date, Commerce One agrees to execute an escrow agreement by and among Corio, Commerce One and a mutually acceptable escrow agent (the \"ESCROW AGENT\"). The Escrow Agent shall require Commerce One to place in an"},…
```

- [seq 557](trajectory.jsonl#L557) **drafter → search**

```json
{"query":"transition assistance migration data"}
```

- [seq 558](trajectory.jsonl#L558) **search result**

```json
[]
```

- [seq 578](trajectory.jsonl#L578) **drafter → search**

```json
{"query":"Customer Data"}
```

- [seq 579](trajectory.jsonl#L579) **search result**

```json
[]
```

- [seq 580](trajectory.jsonl#L580) **drafter → search**

```json
{"query":"data","limit":20}
```

- [seq 581](trajectory.jsonl#L581) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 1 DEFINITIONS.","snippet":"…the Software and MarketSite Service and basic infrastructure support (hardware, database and operating system) for the Software and MarketSite Service. Net revenue …"},{"paragraphId":"p0020","sectionRef":"§ 1 DEFINITIONS.","snippet":"…the Software which are for demonstration purposes only and which contain sample data and transac…
```

- [seq 599](trajectory.jsonl#L599) **drafter → read_section**

```json
{"sectionId":"sec-1-2"}
```

- [seq 600](trajectory.jsonl#L600) **read_section result**

```json
{"sectionRef":"§ 1 DEFINITIONS.","paragraphs":[{"id":"p0008","text":"1. DEFINITIONS."},{"id":"p0009","text":"The following terms shall have the following meanings:"},{"id":"p0010","text":"1.1 \"SOFTWARE USER\" means a named user of the Corio Services worldwide to whom a user identification number and password has been assigned, which permits that user to access and use the Software on a designate…
```

- [seq 612](trajectory.jsonl#L612) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"License and hosting agreement; ASP (Corio) licenses Commerce One software and MarketSite.net Service; need data return/export and migration assistance on termination"}
```

- [seq 613](trajectory.jsonl#L613) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-transition","source":"Silverline Data Platform MSA (Dec 2025)","clauseAfter":"Vendor will return Customer Data in a machine-readable format within thirty days, provide transition assistance for up to six months and then certify deletion.","comment":"[Playbook] We added an orderly data return and transition period before deletion.","level":"preferred"}]}
```

- [seq 614](trajectory.jsonl#L614) **drafter → read_section**

```json
{"sectionId":"sec-3-2"}
```

- [seq 615](trajectory.jsonl#L615) **read_section result**

```json
{"sectionRef":"§ 3 DELIVERY OF SOFTWARE.","paragraphs":[{"id":"p0046","text":"3. DELIVERY OF SOFTWARE."},{"id":"p0047","text":"3.1 Delivery and Acceptance. Commerce One shall issue to Corio, via electronic means of delivery, as soon as practicable, one (1) machine-readable copy of the Software, along with one (1) copy of the on-line Documentation. Commerce One will provide Corio with one written …
```

- [seq 631](trajectory.jsonl#L631) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert transition assistance, data return and deletion certification obligations in Section 11.","comment":"[Playbook] Section 11.3 preserves continuity of support for our existing Customers but says nothing about getting our and our Customers' data back from Commerce One (including data held in the MarketSite.net Service). We have added our standard exit provision: up to six months of transition assistance at then-current rates, return of data within 30 days in a machine-readable format, and certified deletion thereafter. We can live with 90 days of assistance if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0098","numbering":"11.4","text":"11.4 Transition Assistance and Data Return. Upon expiration or termination of this Agreement for any reason, Commerce One shall (i) at Corio's request, provide reasonable transition assistance to Corio and its Customers for a period of up to six (6) months at Commerce One's then-current rates; (ii) within thirty (30) days of Corio's request, return or export to Corio all data of Corio, its Customers and Software Users then in Commerce One's possession or control, including any such data residing in or generated by the MarketSite.net Service, in a commonly used, machine-readable format; and (iii) thereafter delete such data from its systems and certify such deletion to Corio in writing. This Section 11.4 shall survive any termination or expiration of this Agreement."}]}
```

- [seq 632](trajectory.jsonl#L632) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0098","segments":[{"type":"equal","text":"11.3 Effect of Termination. The following Sections shall survive the termination or expiration of this Agreement for any reason: 4.2, 5.3, 7, 8, 9, 10, 12 and 14. Corio's right to allow its then-existing Customers and their Software Users to use and access the Software in accordance with Section 2 of thi…
```

- [seq 639](trajectory.jsonl#L639) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0098"],"quote":"Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party provided, however, Corio may retain any Confidential Information necessary for Corio to continue supporting it's then-existing Customers.","rationale":"Section 11.3 handles the continuity limb of the rule well in our favour (our right to keep serving existing Customers survives, and Commerce One's support and maintenance obligation survives indefinitely so long as we keep paying), and Section 12's source code escrow further protects continuity. However, no provision anywhere requires Commerce One to return or export our and our Customers' data (including data held in or generated by the MarketSite.net Service) in a machine-readable format, or to delete and certify deletion thereafter; Section 11.3 only addresses Confidential Information on a \"return or destroy\" basis at the holder's election, with no format or timing. The data-export limb is a material term of the fallback (data export within 30 days), so the clause fails the fallback and we have inserted a new Section 11.4 reflecting the preferred position (six months' assistance at then-current rates, 30-day machine-readable return, certified deletion), noting we can accept 90 days of assistance.","confidence":0.72,"proposal":{"level":"preferred","summary":"Insert transition assistance, data return and deletion certification obligations in Section 11.","comment":"[Playbook] Section 11.3 preserves continuity of support for our existing Customers but says nothing about getting our and our Customers' data back from Commerce One (including data held in the MarketSite.net Service). We have added our standard exit provision: up to six months of transition assistance at then-current rates, return of data within 30 days in a machine-readable format, and certified deletion thereafter. We can live with 90 days of assistance if that is easier.","precedentId":"seed-transition","ops":[{"kind":"insert_after","paragraphId":"p0098","numbering":"11.4","text":"11.4 Transition Assistance and Data Return. Upon expiration or termination of this Agreement for any reason, Commerce One shall (i) at Corio's request, provide reasonable transition assistance to Corio and its Customers for a period of up to six (6) months at Commerce One's then-current rates; (ii) within thirty (30) days of Corio's request, return or export to Corio all data of Corio, its Customers and Software Users then in Commerce One's possession or control, including any such data residing in or generated by the MarketSite.net Service, in a commonly used, machine-readable format; and (iii) thereafter delete such data from its systems and certify such deletion to Corio in writing. This Section 11.4 shall survive any termination or expiration of this Agreement."}]}}
```

- [seq 640](trajectory.jsonl#L640) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 645](trajectory.jsonl#L645) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0098"],"quote":"Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party provided, however, Corio may retain any Confidential Information necessary for Corio to continue supporting it's then-existing Customers.","rationale":"Section 11.3 handles the continuity limb of the rule well in our favour (our right to keep serving existing Customers survives, and Commerce One's support and maintenance obligation survives indefinitely so long as we keep paying), and Section 12's source code escrow further protects continuity. However, no provision anywhere requires Commerce One to return or export our and our Customers' data (including data held in or generated by the MarketSite.net Service) in a machine-readable format, or to delete and certify deletion thereafter; Section 11.3 only addresses Confidential Information on a \"return or destroy\" basis at the holder's election, with no format or timing. The data-export limb is a material term of the fallback (data export within 30 days), so the clause fails the fallback and we have inserted a new Section 11.4 reflecting the preferred position (six months' assistance at then-current rates, 30-day machine-readable return, certified deletion), noting we can accept 90 days of assistance.","confidence":0.72,"proposal":{"level":"preferred","summary":"Insert transition assistance, data return and deletion certification obligations in Section 11.","comment":"[Playbook] Section 11.3 preserves continuity of support for our existing Customers but says nothing about getting our and our Customers' data back from Commerce One (including data held in the MarketSite.net Service). We have added our standard exit provision: up to six months of transition assistance at then-current rates, return of data within 30 days in a machine-readable format, and certified deletion thereafter. We can live with 90 days of assistance if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0098","numbering":"11.4","text":"11.4 Transition Assistance and Data Return. Upon expiration or termination of this Agreement for any reason, Commerce One shall (i) at Corio's request, provide reasonable transition assistance to Corio and its Customers for a period of up to six (6) months at Commerce One's then-current rates; (ii) within thirty (30) days of Corio's request, return or export to Corio all data of Corio, its Customers and Software Users then in Commerce One's possession or control, including any such data residing in or generated by the MarketSite.net Service, in a commonly used, machine-readable format; and (iii) thereafter delete such data from its systems and certify such deletion to Corio in writing. This Section 11.4 shall survive any termination or expiration of this Agreement."}]}}
```

- [seq 646](trajectory.jsonl#L646) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 645](trajectory.jsonl#L645)
- Finding: `f-transition-2027cb4d` · **deviation** · confidence 0.72
- Location: § 11 TERM AND TERMINATION.
- Quote: “Upon termination or expiration of this Agreement, each party shall otherwise return or destroy any Confidential Information of the other party provided, however, Corio may retain any Confidential Information necessary for Corio to continue supporting it's then-existing Customers.”
- Rationale: Section 11.3 handles the continuity limb of the rule well in our favour (our right to keep serving existing Customers survives, and Commerce One's support and maintenance obligation survives indefinitely so long as we keep paying), and Section 12's source code escrow further protects continuity. However, no provision anywhere requires Commerce One to return or export our and our Customers' data (including data held in or generated by the MarketSite.net Service) in a machine-readable format, or to delete and certify deletion thereafter; Section 11.3 only addresses Confidential Information on a "return or destroy" basis at the holder's election, with no format or timing. The data-export limb is a material term of the fallback (data export within 30 days), so the clause fails the fallback and we have inserted a new Section 11.4 reflecting the preferred position (six months' assistance at then-current rates, 30-day machine-readable return, certified deletion), noting we can accept 90 days of assistance.
- Proposal: **preferred** — Insert transition assistance, data return and deletion certification obligations in Section 11.
- Comment: [Playbook] Section 11.3 preserves continuity of support for our existing Customers but says nothing about getting our and our Customers' data back from Commerce One (including data held in the MarketSite.net Service). We have added our standard exit provision: up to six months of transition assistance at then-current rates, return of data within 30 days in a machine-readable format, and certified deletion thereafter. We can live with 90 days of assistance if that is easier.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "11.4",
    "paragraphId": "p0098",
    "text": "11.4 Transition Assistance and Data Return. Upon expiration or termination of this Agreement for any reason, Commerce One shall (i) at Corio's request, provide reasonable transition assistance to Corio and its Customers for a period of up to six (6) months at Commerce One's then-current rates; (ii) within thirty (30) days of Corio's request, return or export to Corio all data of Corio, its Customers and Software Users then in Commerce One's possession or control, including any such data residing in or generated by the MarketSite.net Service, in a commonly used, machine-readable format; and (iii) thereafter delete such data from its systems and certify such deletion to Corio in writing. This Section 11.4 shall survive any termination or expiration of this Agreement."
  }
]
```

### Verifier and repair feedback

- [seq 654](trajectory.jsonl#L654) **Verdict: pass** — Directionally correct: the insert imposes exit obligations on Commerce One (Vendor) in favour of Corio (the Customer we represent); it adds rights and does not cut back the existing survival of support/maintenance in Section 11.3. Deviation classification is defensible: Section 11.3 only requires 'return or destroy' of Confidential Information at the holder's election, with no data export/return obligation, no machine-readable format and no timing, so the clause fails the fallback's material term (data export within 30 days) even though the surviving support obligation covers continuity. Redline is a clean additive insertion of a new Section 11.4 tracking the model language (six months' assistance at then-current rates, 30-day machine-readable return, certified deletion, plus survival), with no rewriting of the original paragraph — smallest edit that reaches the playbook position. Comment is accurate, concise, in first person plural, cites the playbook position and offers the 90-day fallback; deterministic checks confirm the data-return/transition language is present. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 659](trajectory.jsonl#L659) memo LLM request
- [seq 660](trajectory.jsonl#L660) memo LLM response (replay)

```markdown
# Issues Memo — EXHIBIT 10.5 (Corio / Commerce One)

**Prepared by:** In-house counsel (Customer side — Corio)  
**Subject:** Playbook review of the licence, hosting and services agreement  
**Status:** 18 rules reviewed; all findings verified

---

## Executive summary

On balance this is a favourable paper for us. Eleven of the eighteen rules reviewed are compliant, several materially above the playbook fallback. In particular, Commerce One's IP infringement indemnity (§ 8) is uncapped because § 9 carves Section 8 liability out of both the fee cap and the consequential-damages exclusion; assignment (§ 14.1) is symmetrical with an M&A carve-out and there is no change-of-control trigger anywhere in the agreement; and there are no exclusivity, non-compete, MFN, minimum-commitment, non-solicit or liquidated-damages obligations binding us. The audit right in § 4.4 and the 30-day non-renewal opt-out in § 11.1 also meet or exceed our preferred positions.

Seven items require attention, four of which sit in walk-away territory. The most serious is the ownership carve-out in § 13.5, which assigns to Commerce One the IP created solely by our personnel wherever Commerce One supports it on an ongoing basis, with no licence back. The liability cap in § 9 is drafted per-transaction rather than on 12 months' fees and can fall below six months' fees, and its only carve-out is the Section 8 indemnity — no confidentiality, gross negligence, wilful misconduct or fraud. We also have no termination-for-convenience right during a five-year committed term with auto-renewal, no vendor insurance obligation of any kind despite Commerce One handling our and our Customers' data, no data return or export mechanic on exit, and a warranty period of only 60 days from the Effective Date hard-capped at 31 December 1999 — a period that can expire at or before acceptance under § 3.1. Two lower-priority asks round out the package: extending the internal use licence to our affiliates and contractors, and confirming irrevocability.

---

## Findings

| Severity | Rule | Status | Section |
|---|---|---|---|
| Critical | INDEMN — Indemnification by Vendor | Compliant (above fallback; uncapped) | § 8 INDEMNIFICATION. |
| Critical | IP — Ownership of deliverables and Customer Data | **Deviation** | § 13 SHARED RESOURCES. |
| Critical | LOL-CAP — Limitation of liability: cap, mutuality, carve-outs | **Deviation** | § 9 LIMITATION OF LIABILITY. |
| High | ASSIGN — Assignment and change of control | Compliant (at fallback) | § 14 MISCELLANEOUS. |
| High | EXCLUSIVITY — Exclusivity binding Customer | Compliant (preferred) | § 3 2. GRANT OF RIGHTS. |
| High | LD — Liquidated damages / penalties payable by Customer | Compliant (preferred) | § 11 TERM AND TERMINATION. |
| High | LICENSE — Licence grant scope | **Deviation** | § 3 2. GRANT OF RIGHTS. |
| High | NONCOMPETE — Non-compete on Customer | Compliant (preferred) | § 13 SHARED RESOURCES. |
| High | T4C — Termination for convenience | **Deviation** | § 11 TERM AND TERMINATION. |
| Medium | AUDIT — Audit rights against Customer | Compliant (at/above preferred) | § 4 FEES. |
| Medium | GOVLAW — Governing law and venue | Compliant (at fallback) | § 14 MISCELLANEOUS. |
| Medium | MFN — Most-favoured-nation obligations | Compliant (preferred) | PRICING |
| Medium | MINCOMMIT — Minimum commitments / volume restrictions | Compliant (preferred) | PRICING |
| Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant (preferred) | SALES AND MARKETING COOPERATION |
| Medium | RENEWAL — Auto-renewal and non-renewal notice | Compliant (preferred on material terms) | § 11 TERM AND TERMINATION. |
| Medium | TRANSITION — Transition assistance and data return | **Deviation** | § 11 TERM AND TERMINATION. |
| Medium | WARRANTY — Performance warranty and duration | **Deviation** | § 8 7 WARRANTIES AND DISCLAIMER. |
| Low | INSURANCE — Vendor insurance | **Missing** | § 14 MISCELLANEOUS. |

### Deviation detail and proposed redlines

1. **IP ownership — § 13 SHARED RESOURCES.** § 13.5 correctly gives us ownership of Developments and an assignment from Commerce One, but the carve-out flips ownership of IP created solely by our personnel to Commerce One wherever Commerce One supports it on an ongoing basis, with no licence back. Our playbook treats assignment of Customer-created IP to the Vendor as walk-away. *Proposal:* remove the carve-out so Developments are owned by Corio, subject to Commerce One's pre-existing ownership; if ongoing support is the driver, we can offer Commerce One a support-purposes licence instead. Noted for the file (not flagged): there is no express Customer Data ownership sentence, and ownership of Software enhancements is left to future negotiation.

2. **Liability cap — § 9 LIMITATION OF LIABILITY.** The cap and the consequential-damages exclusion are mutual, but the cap base is only amounts actually paid for the single transaction to which the liability relates in the prior 12 months, which can fall well below six months' fees, and the sole carve-out is Section 8. *Proposal:* mutual cap at the greater of 12 months' fees paid or payable and US$1,000,000, standard Excluded Claims (indemnification, confidentiality, gross negligence, wilful misconduct, fraud) outside the cap, and confirmation that our fee obligations are not capped damages. The duplicated consequential-damages sentence appears to be a conversion artifact.

3. **Licence scope — § 3 2. GRANT OF RIGHTS.** The hosting licence is perpetual and irrevocable and the internal use licence is royalty-free and fully paid up, and § 14.1 covers successor transfer. The gap is affiliate and contractor coverage — "Affiliate" appears nowhere and § 2.2 is confined to "Corio's internal business operations". *Proposal:* extend § 2.2 to Corio affiliates and contractors acting on our behalf and confirm irrevocability.

4. **Termination for convenience — § 11 TERM AND TERMINATION.** Five-year initial term with one-year auto-renewals; the only exits are uncured material breach, insolvency and non-renewal. As maintenance/support and MarketSite.net access fees are paid in advance, *proposal:* new § 11.4 giving us 30 days' convenience notice with pro-rata refund of prepaid fees; 60 days offered as fallback.

5. **Transition and data return — § 11 TERM AND TERMINATION.** § 11.3 protects continuity well (our right to keep serving existing Customers survives; Commerce One's support obligation survives while we pay), and § 12 escrow adds protection. Nothing, however, requires return or export of our and our Customers' data in machine-readable form, or deletion and certification. *Proposal:* new § 11.4 with six months' assistance at then-current rates, 30-day machine-readable return and certified deletion; 90 days of assistance acceptable.

6. **Warranty duration — § 8 7 WARRANTIES AND DISCLAIMER.** § 7.3 contains a genuine conformance and no-malicious-code warranty with a correct remedy ladder, and the disclaimer only strips implied warranties. The failure is duration: 60 days from the Effective Date, capped at 31 December 1999, which can expire at or before acceptance under § 3.1. *Proposal:* 12 months from acceptance and deletion of the fixed cut-off; 90 days from acceptance acceptable.

7. **Vendor insurance — § 14 MISCELLANEOUS. (missing).** No insurance provision exists; "insurance" appears only in the net-revenue definition. Commerce One supplies consultants and implementation personnel and its MarketSite.net Service handles our and our Customers' data. *Proposal:* new § 14.10 requiring CGL US$1M/2M, E&O US$2M, cyber US$5M where Customer Data is processed, statutory workers' compensation and certificates on request, renumbering Complete Understanding to 14.11; fallback of E&O US$1M / cyber US$2M available.

---

## Walk-away items

The following four points are identified in the findings as walk-away territory and should be treated as conditions of signature:

1. **§ 13 SHARED RESOURCES.** — assignment to Commerce One of IP created solely by our personnel, with no licence back (IP rule).
2. **§ 9 LIMITATION OF LIABILITY.** — per-transaction cap that can fall below six months' fees, with no confidentiality, gross negligence or wilful misconduct carve-outs (LOL-CAP rule).
3. **§ 11 TERM AND TERMINATION.** — no termination-for-convenience right during a multi-year committed term (T4C rule).
4. **§ 14 MISCELLANEOUS.** — no insurance obligation at all for a vendor of hosted services touching our data (INSURANCE rule).

---

## Next steps

1. Issue the redline covering the seven deviation/missing items above, leading with the four walk-away points; the eleven compliant rules are not redlined, including those sitting at the fallback (assignment, governing law).
2. Confirm the negotiating sequence internally: § 13.5 ownership carve-out and the § 9 cap are non-negotiable; § 2.2 affiliate/contractor extension, the § 11 convenience and transition provisions and the § 7.3 warranty period carry pre-approved fallbacks we can concede in exchange.
3. Ask the business for the redacted Exhibit B pricing figures. If they are unblanked, add our two noted drafting asks under RENEWAL — a 60-day renewal reminder and a cap on renewal price uplifts.
4. Confirm with risk/insurance the acceptability of the fallback limits (E&O US$1M / cyber US$2M) before we table § 14.10.
5. Hold in reserve, for use only if § 8 is reopened for other reasons, the noted indemnity gaps (breach of applicable law, unauthorised access to or disclosure of our data, gross negligence/wilful misconduct, express affiliate coverage), and, if § 4.4 is reopened, a fixed 30-day audit notice period.
6. Flag for the deal team that the § 9 duplicated consequential-damages sentence should be cleaned up in the execution version.
```

## Apply and validation

No apply or output-validation event was recorded.
