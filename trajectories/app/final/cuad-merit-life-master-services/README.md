# Trajectory: cuad-merit-life-master-services

| Run | Value |
|---|---|
| Contract | cuad-merit-life-master-services — 1. PURPOSE OF ENGAGEMENT. |
| Config | final |
| Parties | Clear Capital (our party) ↔ RadialSpark, LLC |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 4m 33.8s (273,840 ms) |
| Calls | 142 LLM · 165 tool · 0 retries |
| Tokens | 54,155 input · 81,158 output · 834,458 cache read · 134,525 cache write |
| Cost | $3.557735 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 574 | 122 | 165 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 644](trajectory.jsonl#L644) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 165](trajectory.jsonl#L165)–[seq 650](trajectory.jsonl#L650) |
| assembler | 21 | 0 | 0 | — | [seq 186](trajectory.jsonl#L186)–[seq 658](trajectory.jsonl#L658) |
| memo | 4 | 1 | 0 | — | [seq 654](trajectory.jsonl#L654)–[seq 657](trajectory.jsonl#L657) |
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
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 15](trajectory.jsonl#L15) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 16](trajectory.jsonl#L16) **read_section result**

```json
{"sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","paragraphs":[{"id":"p0034","text":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR."},{"id":"p0035","text":"(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDE…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"indemnif"}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[{"paragraphId":"p0034","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR."}]
```

- [seq 57](trajectory.jsonl#L57) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 58](trajectory.jsonl#L58) **read_section result**

```json
{"sectionRef":"§ 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER.","paragraphs":[{"id":"p0023","text":"5. CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER."},{"id":"p0024","text":"(a) Contractor represents and warrants to Company that Contractor's performance of the Services called for by this Agreement, to its knowledge, does not and shall not violate any…
```

- [seq 95](trajectory.jsonl#L95) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"Services agreement; mutual cap at total fees paid, no carve-outs except a mis-referenced paragraph"}
```

- [seq 110](trajectory.jsonl#L110) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-lol-1","source":"Acme Cloud MSA (Mar 2025)","clauseAfter":"Except for Excluded Claims, each party's aggregate liability shall not exceed fees paid or payable in the prior twelve months.","comment":"[Playbook] We made the cap mutual and aligned it to twelve months' fees, with standard carve-outs.","level":"fallback"},{"id":"seed-lol-2","source":"Northstar Hosting Agreeme…
```

- [seq 141](trajectory.jsonl#L141) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-lol-2","summary":"Make the mutual cap the greater of 12 months' fees and USD 1,000,000 and add standard uncapped carve-outs.","comment":"[Playbook] We reset the cap to the greater of twelve months' fees and USD 1,000,000 and added the standard carve-outs, since the current clause caps liability at fees paid for the affected Services with no exception for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or IP infringement (the existing cross-reference to Paragraph 9 points to the independent-contractor clause). Indemnities and confidentiality breaches must sit outside the cap, and our payment obligations are not damages; we can accept a straight twelve-months'-fees cap as a fallback if the fixed floor is an issue.","ops":[{"kind":"replace","paragraphId":"p0035","oldText":"(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.","newText":"(a) EXCEPT WITH RESPECT TO EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF (A) THE FEES PAID OR PAYABLE TO CONTRACTOR UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) ONE MILLION U.S. DOLLARS (USD 1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. COMPANY'S OBLIGATION TO PAY FEES DUE UNDER THIS AGREEMENT SHALL NOT CONSTITUTE DAMAGES SUBJECT TO THIS LIMITATION."}]}
```

- [seq 142](trajectory.jsonl#L142) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0035","segments":[{"type":"equal","text":"(a) EXCEPT WITH RESPECT TO "},{"type":"delete","text":"CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRA…
```

- [seq 167](trajectory.jsonl#L167) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0035","p0036"],"quote":"(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.","rationale":"Section 7(a) does contain a nominally mutual cap and 7(b) has a mutual consequential-damages exclusion, but it fails the fallback on carve-outs: the only exception is \"CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9\", and Paragraph 9 is the Independent Contractor clause (there is no indemnification clause anywhere in the agreement), so there is effectively no carve-out for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or infringement of our IP. The fallback requires carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct. The cap basis is also weaker than either position — Contractor's exposure is limited to fees actually \"PAID... FOR THE PERFORMANCE OF SUCH SERVICES\" under the affected SOW (not aggregate twelve months' fees, and excluding amounts payable), which on a short or partly-invoiced SOW can fall below six months' fees, i.e. walk-away territory. We therefore proposed the preferred formulation (greater of twelve months' fees paid or payable and USD 1,000,000) with the standard Excluded Claims sentence, and confirmed our payment obligations are not damages. The cap on Company's liability is retained (it benefits us) and the redline is confined to 7(a); indemnity scope itself is left to INDEMN.","confidence":0.86,"proposal":{"level":"preferred","precedentId":"seed-lol-2","summary":"Make the mutual cap the greater of 12 months' fees and USD 1,000,000 and add standard uncapped carve-outs.","comment":"[Playbook] We reset the cap to the greater of twelve months' fees and USD 1,000,000 and added the standard carve-outs, since the current clause caps liability at fees paid for the affected Services with no exception for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or IP infringement (the existing cross-reference to Paragraph 9 points to the independent-contractor clause). Indemnities and confidentiality breaches must sit outside the cap, and our payment obligations are not damages; we can accept a straight twelve-months'-fees cap as a fallback if the fixed floor is an issue.","ops":[{"kind":"replace","paragraphId":"p0035","oldText":"(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.","newText":"(a) EXCEPT WITH RESPECT TO EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF (A) THE FEES PAID OR PAYABLE TO CONTRACTOR UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) ONE MILLION U.S. DOLLARS (USD 1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. COMPANY'S OBLIGATION TO PAY FEES DUE UNDER THIS AGREEMENT SHALL NOT CONSTITUTE DAMAGES SUBJECT TO THIS LIMITATION."}]}}
```

- [seq 168](trajectory.jsonl#L168) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 167](trajectory.jsonl#L167)
- Finding: `f-lol-cap-b17f1ded` · **deviation** · confidence 0.86
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.”
- Rationale: Section 7(a) does contain a nominally mutual cap and 7(b) has a mutual consequential-damages exclusion, but it fails the fallback on carve-outs: the only exception is "CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9", and Paragraph 9 is the Independent Contractor clause (there is no indemnification clause anywhere in the agreement), so there is effectively no carve-out for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or infringement of our IP. The fallback requires carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct. The cap basis is also weaker than either position — Contractor's exposure is limited to fees actually "PAID... FOR THE PERFORMANCE OF SUCH SERVICES" under the affected SOW (not aggregate twelve months' fees, and excluding amounts payable), which on a short or partly-invoiced SOW can fall below six months' fees, i.e. walk-away territory. We therefore proposed the preferred formulation (greater of twelve months' fees paid or payable and USD 1,000,000) with the standard Excluded Claims sentence, and confirmed our payment obligations are not damages. The cap on Company's liability is retained (it benefits us) and the redline is confined to 7(a); indemnity scope itself is left to INDEMN.
- Proposal: **preferred** — Make the mutual cap the greater of 12 months' fees and USD 1,000,000 and add standard uncapped carve-outs.
- Comment: [Playbook] We reset the cap to the greater of twelve months' fees and USD 1,000,000 and added the standard carve-outs, since the current clause caps liability at fees paid for the affected Services with no exception for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or IP infringement (the existing cross-reference to Paragraph 9 points to the independent-contractor clause). Indemnities and confidentiality breaches must sit outside the cap, and our payment obligations are not damages; we can accept a straight twelve-months'-fees cap as a fallback if the fixed floor is an issue.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "(a) EXCEPT WITH RESPECT TO EXCLUDED CLAIMS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE GREATER OF (A) THE FEES PAID OR PAYABLE TO CONTRACTOR UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (B) ONE MILLION U.S. DOLLARS (USD 1,000,000). \"EXCLUDED CLAIMS\" MEANS A PARTY'S BREACH OF ITS CONFIDENTIALITY, DATA PROTECTION OR SECURITY OBLIGATIONS, ITS INDEMNIFICATION OBLIGATIONS, ITS GROSS NEGLIGENCE, WILFUL MISCONDUCT OR FRAUD, AND ITS INFRINGEMENT OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS. COMPANY'S OBLIGATION TO PAY FEES DUE UNDER THIS AGREEMENT SHALL NOT CONSTITUTE DAMAGES SUBJECT TO THIS LIMITATION.",
    "oldText": "(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDER A STATEMENT OF WORK SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR FOR THE PERFORMANCE OF SUCH SERVICES. COMPANYS' MAXIMUM LIABILITY TO CONTRACTOR FOR ANY REASON ARISING OUT OF THIS AGREEMENT SHALL BE LIMITED TO THE AMOUNT OF FEES PAID TO CONTRACTOR.",
    "paragraphId": "p0035"
  }
]
```

### Verifier and repair feedback

- [seq 225](trajectory.jsonl#L225) **Verdict: pass** — Classification as a deviation is correct: the only exception in 7(a) is a cross-reference to Paragraph 9 (the independent-contractor provision, and no indemnity clause exists), so the clause lacks the fallback-required carve-outs for indemnification, confidentiality, gross negligence and wilful misconduct; the cap basis (fees actually paid for the affected SOW's Services) is also narrower than 12 months' aggregate fees, so it cannot be read as sitting at the fallback. Redline reaches the preferred position with the playbook's model language (greater of 12 months' fees paid or payable and USD 1,000,000, mutual, plus the Excluded Claims sentence and the payment-obligations carve-out), keeps both parties capped, and is confined to p0035 without touching the mutual consequential-damages exclusion in p0036. The failed 'minimal edit' heuristic (ratio 0.911) is expected here: the rule requires replacing the cap basis and inserting carve-outs, which cannot be done without rewriting the operative sentence; no extraneous scope was added. Comment is accurate, cites the position, explains the defective Paragraph 9 cross-reference, and offers the straight 12-months'-fees fallback; tone and prefix comply. Minor, non-disqualifying: the rationale's statement that 'the cap on Company's liability is retained' is loose — the redline replaces the Company-specific cap with the mutual cap plus USD 1,000,000 floor, which can raise our own ceiling; this is nonetheless exactly the playbook's preferred mutual formulation and the fallback is offered. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimal edit p0035","ok":false,"detail":"changed-character ratio=0.911 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 21](trajectory.jsonl#L21) **drafter → read_section**

```json
{"sectionId":"sec-7"}
```

- [seq 22](trajectory.jsonl#L22) **read_section result**

```json
{"sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","paragraphs":[{"id":"p0034","text":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR."},{"id":"p0035","text":"(a) EXCEPT WITH RESPECT TO CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9 HEREOF, CONTRACTOR'S MAXIMUM LIABILITY TO COMPANY ARISING FOR ANY REASON RELATING TO CONTRACTOR'S PERFORMANCE OF SERVICES UNDE…
```

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"indemnif","limit":30}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[{"paragraphId":"p0034","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR."}]
```

- [seq 63](trajectory.jsonl#L63) **drafter → search**

```json
{"query":"hold harmless","limit":20}
```

- [seq 64](trajectory.jsonl#L64) **search result**

```json
[]
```

- [seq 89](trajectory.jsonl#L89) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 90](trajectory.jsonl#L90) **read_section result**

```json
{"sectionRef":"§ 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER.","paragraphs":[{"id":"p0023","text":"5. CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER."},{"id":"p0024","text":"(a) Contractor represents and warrants to Company that Contractor's performance of the Services called for by this Agreement, to its knowledge, does not and shall not violate any…
```

- [seq 91](trajectory.jsonl#L91) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 92](trajectory.jsonl#L92) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 121](trajectory.jsonl#L121) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"Services agreement with no indemnity at all; section 7 heading references \"Indemnification of Contractor\" but body is only liability caps; vendor IP warranty exists in sec-5 without defence obligation."}
```

- [seq 134](trajectory.jsonl#L134) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-indemn-1","source":"Brightline SaaS Terms (Feb 2025)","clauseAfter":"Vendor shall defend and indemnify Customer against third-party claims that the Services infringe intellectual property rights.","comment":"[Playbook] We require the service provider to stand behind third-party IP claims arising from its services.","level":"preferred"},{"id":"seed-indemn-2","source":"Ve…
```

- [seq 157](trajectory.jsonl#L157) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert a Contractor (Vendor) indemnity covering third-party IP infringement, breach of law, Contractor-caused data breach and gross negligence/wilful misconduct, with standard claim procedure and carve-out from the § 7(a) cap.","comment":"[Playbook] Section 7 is titled \"Indemnification of Contractor\" but the Agreement contains no indemnity at all, and the Section 5(c) non-infringement warranty gives us no right to a defence if a third party sues us over the Works. We have added a Contractor indemnity for third-party IP claims, breach of law, Contractor-caused data incidents and gross negligence or wilful misconduct, with a standard notice-and-control procedure; if you prefer, we can narrow this to the IP indemnity with the usual modification/combination exclusions and a 3x annual fees super-cap.","precedentId":"seed-indemn-1","ops":[{"kind":"insert_after","paragraphId":"p0037","numbering":"(d)","text":"(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or the Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorized access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall provide Contractor with prompt written notice of the claim, sole control of the defense and settlement thereof (provided that Contractor shall not settle any claim in a manner that imposes any obligation or admission on Company without Company's prior written consent), and reasonable cooperation at Contractor's expense. Contractor's obligations under this Section 7(d) shall not be subject to the limitation of liability set forth in Section 7(a), and the waiver of attorneys' fees in Section 7(c) shall not apply to this Section 7(d)."}]}
```

- [seq 158](trajectory.jsonl#L158) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0037","segments":[{"type":"equal","text":"(c) IN ANY SUIT ARISING FROM THIS AGREEMENT EACH PARTY SHALL BE RESPONSIBLE FOR ITS OWN ATTORNEYS FEES. COMPANY AND CONTRACTOR HEREBY WAIVE ANY CLAIM TO AWARD OF ATTORNEYS FEES IN SUCH A SUIT."}]}]}
```

- [seq 181](trajectory.jsonl#L181) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0034","p0035","p0037","p0026"],"quote":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","rationale":"Section 7 is captioned \"Indemnification of Contractor,\" but the section body (p0035-p0037) contains only liability caps, a consequential-damages waiver and a mutual attorneys' fees waiver — there is no operative indemnity language. Document-wide searches for \"indemnif\" return only the § 7 heading itself, and \"hold harmless\" returns nothing; §§ 4 and 5 contain no defence obligation either. The closest protection is the § 5(c) non-infringement warranty (p0026), which is a bare representation: it gives us a damages claim for breach but no right to have RadialSpark defend or fund a third-party infringement suit against us, and any such warranty claim is capped at fees paid under § 7(a). That fails even the fallback (Vendor IP indemnity with usual exclusions and remedies) and sits in walk-away territory of \"no Vendor IP indemnity at all.\" Notably, § 7(a) carves \"Paragraph 9\" out of Contractor's cap, but Paragraph 9 is Independent Contractor status — a dangling cross-reference suggesting an indemnity clause was intended and dropped in drafting. I have inserted the preferred vendor indemnity as a new § 7(d) covering IP infringement, breach of law, Contractor-caused data incidents and gross negligence/wilful misconduct, with standard notice/control/cooperation and a carve-out from the § 7(a) cap and § 7(c) fees waiver so the defence obligation is not read as capped at fees paid. No Customer indemnity exists, so there is nothing to narrow on our side. The fallback (IP-only indemnity with modification/combination exclusions and a 3x annual fees super-cap) is offered in the comment as a landing zone.</parationale>\n<parameter name=\"confidence\">0.93","proposal":{"level":"preferred","precedentId":"seed-indemn-1","summary":"Insert a Contractor (Vendor) indemnity covering third-party IP infringement, breach of law, Contractor-caused data breach and gross negligence/wilful misconduct, with standard claim procedure and carve-out from the § 7(a) cap.","comment":"[Playbook] Section 7 is titled \"Indemnification of Contractor\" but the Agreement contains no indemnity at all, and the Section 5(c) non-infringement warranty gives us no right to a defence if a third party sues us over the Works. We have added a Contractor indemnity for third-party IP claims, breach of law, Contractor-caused data incidents and gross negligence or wilful misconduct, with a standard notice-and-control procedure; if you prefer, we can narrow this to the IP indemnity with the usual modification/combination exclusions and a 3x annual fees super-cap.","ops":[{"kind":"insert_after","paragraphId":"p0037","numbering":"(d)","text":"(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or the Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorized access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall provide Contractor with prompt written notice of the claim, sole control of the defense and settlement thereof (provided that Contractor shall not settle any claim in a manner that imposes any obligation or admission on Company without Company's prior written consent), and reasonable cooperation at Contractor's expense. Contractor's obligations under this Section 7(d) shall not be subject to the limitation of liability set forth in Section 7(a), and the waiver of attorneys' fees in Section 7(c) shall not apply to this Section 7(d)."}]}}
```

- [seq 182](trajectory.jsonl#L182) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 207](trajectory.jsonl#L207) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0034","p0035","p0037","p0026"],"quote":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","rationale":"Section 7 is captioned \"Indemnification of Contractor,\" but the section body (p0035-p0037) contains only liability caps, a consequential-damages waiver and a mutual attorneys' fees waiver - there is no operative indemnity language. Document-wide searches for \"indemnif\" return only the Section 7 heading itself, and \"hold harmless\" returns nothing; Sections 4 and 5 contain no defence obligation either. The closest protection is the Section 5(c) non-infringement warranty (p0026), which is a bare representation: it gives us a damages claim for breach but no right to have RadialSpark defend or fund a third-party infringement suit against us, and any such warranty claim is capped at fees paid under Section 7(a). That fails even the fallback (Vendor IP indemnity with usual exclusions and remedies) and sits in walk-away territory of \"no Vendor IP indemnity at all.\" Notably, Section 7(a) carves \"Paragraph 9\" out of Contractor's cap, but Paragraph 9 is Independent Contractor status - a dangling cross-reference suggesting an indemnity clause was intended and dropped in drafting. We inserted the preferred vendor indemnity as a new Section 7(d) covering IP infringement, breach of law, Contractor-caused data incidents and gross negligence/wilful misconduct, with standard notice/control/cooperation and a carve-out from the Section 7(a) cap and Section 7(c) fees waiver so the defence obligation is not read as capped at fees paid. No Customer indemnity exists, so there is nothing to narrow on our side. The fallback (IP-only indemnity with modification/combination exclusions and a 3x annual fees super-cap) is offered in the comment as a landing zone.","confidence":0.93,"proposal":{"level":"preferred","precedentId":"seed-indemn-1","summary":"Insert a Contractor (Vendor) indemnity covering third-party IP infringement, breach of law, Contractor-caused data breach and gross negligence/wilful misconduct, with standard claim procedure and carve-out from the Section 7(a) cap.","comment":"[Playbook] Section 7 is titled \"Indemnification of Contractor\" but the Agreement contains no indemnity at all, and the Section 5(c) non-infringement warranty gives us no right to a defence if a third party sues us over the Works. We have added a Contractor indemnity for third-party IP claims, breach of law, Contractor-caused data incidents and gross negligence or wilful misconduct, with a standard notice-and-control procedure; if you prefer, we can narrow this to the IP indemnity with the usual modification/combination exclusions and a 3x annual fees super-cap.","ops":[{"kind":"insert_after","paragraphId":"p0037","numbering":"(d)","text":"(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or the Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorized access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall provide Contractor with prompt written notice of the claim, sole control of the defense and settlement thereof (provided that Contractor shall not settle any claim in a manner that imposes any obligation or admission on Company without Company's prior written consent), and reasonable cooperation at Contractor's expense. Contractor's obligations under this Section 7(d) shall not be subject to the limitation of liability set forth in Section 7(a), and the waiver of attorneys' fees in Section 7(c) shall not apply to this Section 7(d)."}]}}
```

- [seq 208](trajectory.jsonl#L208) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 247](trajectory.jsonl#L247) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0034","p0035","p0037","p0026"],"quote":"7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","rationale":"Section 7 is captioned \"Indemnification of Contractor,\" but the section body (p0035-p0037) contains only liability caps, a consequential-damages waiver and a mutual attorneys' fees waiver - there is no operative indemnity language. Document-wide searches for \"indemnif\" return only the Section 7 heading itself, and \"hold harmless\" returns nothing; Sections 4 and 5 contain no defence obligation either. The closest protection is the Section 5(c) non-infringement warranty (p0026), which is a bare representation: it gives us a damages claim for breach but no right to have RadialSpark defend or fund a third-party infringement suit against us, and any such warranty claim is capped at fees paid under Section 7(a). That fails even the fallback (Vendor IP indemnity with usual exclusions and remedies) and sits in walk-away territory of \"no Vendor IP indemnity at all.\" Notably, Section 7(a) carves \"Paragraph 9\" out of Contractor's cap, but Paragraph 9 is Independent Contractor status - a dangling cross-reference suggesting an indemnity clause was intended and dropped in drafting. We inserted the preferred vendor indemnity as a new Section 7(d) covering IP infringement, breach of law, Contractor-caused data incidents and gross negligence/wilful misconduct, with standard notice/control/cooperation and a carve-out from the Section 7(a) cap and Section 7(c) fees waiver so the defence obligation is not read as capped at fees paid. No Customer indemnity exists, so there is nothing to narrow on our side. The fallback (IP-only indemnity with modification/combination exclusions and a 3x annual fees super-cap) is offered in the comment as a landing zone.","confidence":0.93,"proposal":{"level":"preferred","precedentId":"seed-indemn-1","summary":"Insert a Contractor (Vendor) indemnity covering third-party IP infringement, breach of law, Contractor-caused data breach and gross negligence/wilful misconduct, with standard claim procedure and carve-out from the § 7(a) cap.","comment":"[Playbook] Section 7 is titled \"Indemnification of Contractor\" but the Agreement contains no indemnity at all, and the Section 5(c) non-infringement warranty gives us no right to a defence if a third party sues us over the Works. We have added a Contractor indemnity for third-party IP claims, breach of law, Contractor-caused data incidents and gross negligence or wilful misconduct, with a standard notice-and-control procedure; if you prefer, we can narrow this to the IP indemnity with the usual modification/combination exclusions and a 3x annual fees super-cap.","ops":[{"kind":"insert_after","paragraphId":"p0037","numbering":"(d)","text":"(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or the Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorized access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall provide Contractor with prompt written notice of the claim, sole control of the defense and settlement thereof (provided that Contractor shall not settle any claim in a manner that imposes any obligation or admission on Company without Company's prior written consent), and reasonable cooperation at Contractor's expense. Contractor's obligations under this Section 7(d) shall not be subject to the limitation of liability set forth in Section 7(a), and the waiver of attorneys' fees in Section 7(c) shall not apply to this Section 7(d)."}]}}
```

- [seq 248](trajectory.jsonl#L248) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 247](trajectory.jsonl#L247)
- Finding: `f-indemn-c57e504b` · **missing** · confidence 0.93
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “7. LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.”
- Rationale: Section 7 is captioned "Indemnification of Contractor," but the section body (p0035-p0037) contains only liability caps, a consequential-damages waiver and a mutual attorneys' fees waiver - there is no operative indemnity language. Document-wide searches for "indemnif" return only the Section 7 heading itself, and "hold harmless" returns nothing; Sections 4 and 5 contain no defence obligation either. The closest protection is the Section 5(c) non-infringement warranty (p0026), which is a bare representation: it gives us a damages claim for breach but no right to have RadialSpark defend or fund a third-party infringement suit against us, and any such warranty claim is capped at fees paid under Section 7(a). That fails even the fallback (Vendor IP indemnity with usual exclusions and remedies) and sits in walk-away territory of "no Vendor IP indemnity at all." Notably, Section 7(a) carves "Paragraph 9" out of Contractor's cap, but Paragraph 9 is Independent Contractor status - a dangling cross-reference suggesting an indemnity clause was intended and dropped in drafting. We inserted the preferred vendor indemnity as a new Section 7(d) covering IP infringement, breach of law, Contractor-caused data incidents and gross negligence/wilful misconduct, with standard notice/control/cooperation and a carve-out from the Section 7(a) cap and Section 7(c) fees waiver so the defence obligation is not read as capped at fees paid. No Customer indemnity exists, so there is nothing to narrow on our side. The fallback (IP-only indemnity with modification/combination exclusions and a 3x annual fees super-cap) is offered in the comment as a landing zone.
- Proposal: **preferred** — Insert a Contractor (Vendor) indemnity covering third-party IP infringement, breach of law, Contractor-caused data breach and gross negligence/wilful misconduct, with standard claim procedure and carve-out from the § 7(a) cap.
- Comment: [Playbook] Section 7 is titled "Indemnification of Contractor" but the Agreement contains no indemnity at all, and the Section 5(c) non-infringement warranty gives us no right to a defence if a third party sues us over the Works. We have added a Contractor indemnity for third-party IP claims, breach of law, Contractor-caused data incidents and gross negligence or wilful misconduct, with a standard notice-and-control procedure; if you prefer, we can narrow this to the IP indemnity with the usual modification/combination exclusions and a 3x annual fees super-cap.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(d)",
    "paragraphId": "p0037",
    "text": "(d) Contractor shall defend, indemnify and hold harmless Company and its affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable attorneys' fees), to the extent arising out of (i) an allegation that the Services or the Works infringe or misappropriate any intellectual property right; (ii) Contractor's breach of applicable law; (iii) any unauthorized access to or disclosure of Company data or Confidential Information caused by Contractor; or (iv) Contractor's gross negligence or wilful misconduct. Company shall provide Contractor with prompt written notice of the claim, sole control of the defense and settlement thereof (provided that Contractor shall not settle any claim in a manner that imposes any obligation or admission on Company without Company's prior written consent), and reasonable cooperation at Contractor's expense. Contractor's obligations under this Section 7(d) shall not be subject to the limitation of liability set forth in Section 7(a), and the waiver of attorneys' fees in Section 7(c) shall not apply to this Section 7(d)."
  }
]
```

### Verifier and repair feedback

- [seq 301](trajectory.jsonl#L301) **Verdict: pass** — The document genuinely lacks any operative indemnity: Section 7 (p0034-p0037) contains only liability caps and an attorneys' fees waiver despite its 'Indemnification of Contractor' caption, and the only IP protection (p0026) is a bare non-infringement warranty with no defence obligation — this is walk-away territory ('no Vendor IP indemnity at all'), so 'missing' is correctly classified. The inserted Section 7(d) tracks the playbook's model language (IP infringement, breach of law, Contractor-caused data incidents, gross negligence/wilful misconduct) with standard notice/control/cooperation mechanics, and is placed as an addition after the limitation-of-liability paragraph exactly as the redline guidance directs. The carve-out from the Section 7(a) fees-paid cap and the Section 7(c) fees waiver is necessary rather than over-reaching — without it the defence obligation would be neutralised — and it does not duplicate a separate liability-cap flag because it is scoped only to the new indemnity. No Customer indemnity exists, so there is nothing to narrow on our side; the comment is accurate, concise, in the required voice, explains the change and offers the fallback (IP-only indemnity with modification/combination exclusions and 3x annual fees super-cap) as a landing zone. Deterministic checks confirm the operation applies and the vendor IP indemnity language is present; only trivial imprecision (paraphrased section caption, unverifiable Paragraph 9 aside) which does not affect the substance. Checks: {"name":"operation 1 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":true}.

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
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 39](trajectory.jsonl#L39) **drafter → search**

```json
{"query":"compete"}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…trator may be confirmed as a judgment or order in any state or federal court of competent jurisdiction, which includes within the federal judicial district of the resi…"}]
```

- [seq 77](trajectory.jsonl#L77) **drafter → search**

```json
{"query":"shall not","limit":30}
```

- [seq 78](trajectory.jsonl#L78) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"… Contractor shall continue work pursuant to the existing Statement of Work, and shall not be bound by any change requested by Company, until such change has been accepte…"},{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…Contractor's administrative communicat…
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"exclusive"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"… Services shall not be deemed to be Works and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said propert…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…matio…
```

- [seq 105](trajectory.jsonl#L105) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 106](trajectory.jsonl#L106) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 107](trajectory.jsonl#L107) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 108](trajectory.jsonl#L108) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 129](trajectory.jsonl#L129) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 130](trajectory.jsonl#L130) **search result**

```json
[{"paragraphId":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and f…"},{"paragraphId":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…, during the term of this Agreement and for one (1) year after its termination…
```

- [seq 131](trajectory.jsonl#L131) **drafter → search**

```json
{"query":"similar services"}
```

- [seq 132](trajectory.jsonl#L132) **search result**

```json
[]
```

- [seq 149](trajectory.jsonl#L149) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0047","p0020","p0021"]}
```

- [seq 150](trajectory.jsonl#L150) **read_paragraphs result**

```json
[{"id":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other part…
```

- [seq 171](trajectory.jsonl#L171) **drafter → search**

```json
{"query":"Company shall not","limit":20}
```

- [seq 172](trajectory.jsonl#L172) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…orks and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said property in any other manner other than in connectio…"}]
```

- [seq 173](trajectory.jsonl#L173) **drafter → search**

```json
{"query":"business of","limit":20}
```

- [seq 174](trajectory.jsonl#L174) **search result**

```json
[]
```

- [seq 189](trajectory.jsonl#L189) **drafter → search**

```json
{"query":"restrict","limit":20}
```

- [seq 190](trajectory.jsonl#L190) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…performance is rendered impossible by strike, acts of God, governmental acts or restrictions, failure of suppliers, or any other reason where failure to perform is beyo…"}]
```

- [seq 191](trajectory.jsonl#L191) **drafter → search**

```json
{"query":"develop","limit":20}
```

- [seq 192](trajectory.jsonl#L192) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"… this Agreement. During the term of this Agreement, Company and Contractor will develop and agree upon statements of work defining the Services and work product to be …"},{"paragraphId":"p0019","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"(b) Company acknowledges that Contractor …
```

- [seq 211](trajectory.jsonl#L211) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0047","p0020","p0019"],"quote":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's express written consent, which shall not be unreasonably withheld.","rationale":"The Agreement contains no non-compete, field-of-use, exclusivity or territory restriction binding Clear Capital. Searches for \"compete/competing\", \"exclusive\", \"Company shall not\", \"restrict\" and \"develop\", plus full review of the engagement scope (§1), termination/survival (§6) and the general provisions (§7), turned up only: (i) a mutual employee non-solicit (p0047) that binds both parties equally and is not a restraint on the businesses we may operate or the products we may buy or build; (ii) an IP-scope limit in p0020 barring resale or use of Contractor's pre-existing proprietary materials outside the software we receive, which is ordinary licence-scope drafting rather than a restrictive covenant; and (iii) p0019, which confirms Contractor may serve other clients and imposes nothing on us. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is warranted.","confidence":0.88}
```

- [seq 212](trajectory.jsonl#L212) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 211](trajectory.jsonl#L211)
- Finding: `f-noncompete-f094988b` · **compliant** · confidence 0.88
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's express written consent, which shall not be unreasonably withheld.”
- Rationale: The Agreement contains no non-compete, field-of-use, exclusivity or territory restriction binding Clear Capital. Searches for "compete/competing", "exclusive", "Company shall not", "restrict" and "develop", plus full review of the engagement scope (§1), termination/survival (§6) and the general provisions (§7), turned up only: (i) a mutual employee non-solicit (p0047) that binds both parties equally and is not a restraint on the businesses we may operate or the products we may buy or build; (ii) an IP-scope limit in p0020 barring resale or use of Contractor's pre-existing proprietary materials outside the software we receive, which is ordinary licence-scope drafting rather than a restrictive covenant; and (iii) p0019, which confirms Contractor may serve other clients and imposes nothing on us. This meets the preferred position (no non-compete or field-of-use restriction on Customer), so no redline is warranted.

### Verifier and repair feedback

- [seq 271](trajectory.jsonl#L271) **Verdict: pass** — Claimed status is compliant with no redline and no comment, which is the expected output shape; the rendered text is unchanged from the originals. Cited paragraphs support compliance: p0047 is a mutual employee non-solicit (not a restraint on the businesses we operate or products we buy/build), p0020 is ordinary licence-scope language limiting resale of Contractor's pre-existing proprietary materials, and p0019 confirms Contractor may serve other clients while imposing nothing on Company. No field-of-use, exclusivity, territory or competing-product restriction binding the Customer is present, so the preferred position ('no non-compete or field-of-use restriction on Customer') is met; the deterministic check also confirms no open-ended compete restriction remains. Minor caveat only: p0019's lead-in ('Company agrees that, notwithstanding anything to the contrary set forth herein:') introduces sub-clauses not quoted here, but nothing in the supplied record shows a restrictive covenant, so the compliant classification stands as internal evidence rather than a negotiation issue. Checks: {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 33](trajectory.jsonl#L33) **drafter → search**

```json
{"query":"exclusive"}
```

- [seq 34](trajectory.jsonl#L34) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"… Services shall not be deemed to be Works and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said propert…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…matio…
```

- [seq 67](trajectory.jsonl#L67) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 68](trajectory.jsonl#L68) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 69](trajectory.jsonl#L69) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 70](trajectory.jsonl#L70) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 99](trajectory.jsonl#L99) **drafter → search**

```json
{"query":"sole (supplier|provider|source)|all of its requirements|shall not (procure|purchase|engage|retain)|exclusivity|competing|third party (supplier|provider|vendor)","regex":true,"limit":30}
```

- [seq 100](trajectory.jsonl#L100) **search result**

```json
[]
```

- [seq 101](trajectory.jsonl#L101) **drafter → search**

```json
{"query":"exclusiv","limit":30}
```

- [seq 102](trajectory.jsonl#L102) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"… Services shall not be deemed to be Works and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said proper…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…mation…
```

- [seq 123](trajectory.jsonl#L123) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0020","p0021","p0051"]}
```

- [seq 124](trajectory.jsonl#L124) **read_paragraphs result**

```json
[{"id":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","text":"(i) as part of Contractor's provision of the Services hereunder, Contractor may utilize its own proprietary works of authorship, that have not been created specifically for Company, including without limitation software, methodologies, tools, specifications, drawings, sketches, models, samples, recor…
```

- [seq 125](trajectory.jsonl#L125) **drafter → search**

```json
{"query":"solicit|restrict|covenant|compete|other (vendors|contractors|consultants)|similar services","regex":true,"limit":30}
```

- [seq 126](trajectory.jsonl#L126) **search result**

```json
[{"paragraphId":"p0002","sectionRef":"§ Preamble","snippet":"…pany; NOW THEREFORE, in consideration of the foregoing premises, and the mutual covenants and agreements set forth herein, the parties hereto agree as follows:"},{"paragraphId":"p0027","sectionRef":"§ 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER.","snippet":"(d) Contractor covenants that it will not offer or pa…
```

- [seq 153](trajectory.jsonl#L153) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0004","p0013","p0021"],"quote":"Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement.","rationale":"The Agreement imposes no exclusivity or \"sole supplier\" obligation on Clear Capital, which meets the preferred position. The engagement is structured on a \"task by task basis\" through individually negotiated Statements of Work (p0004), and compensation is time-and-materials per SOW (p0013) with no minimum-volume commitment, requirements obligation, or fee/penalty triggered by our use of other suppliers. Targeted searches for \"sole/exclusive provider\", \"all of its requirements\", \"shall not procure/purchase/engage\", and competing-vendor restrictions returned nothing. The only \"exclusive\" references are unrelated: Contractor's retained IP ownership (p0020), a non-exclusive license granted to us (p0021, which benefits our party), and entire-agreement boilerplate (p0051). The mutual non-solicitation of employees at p0047 is a different category and is not exclusive dealing, so it is not flagged here. Clear Capital remains free to buy comparable services from other suppliers; no redline required.","confidence":0.9}
```

- [seq 154](trajectory.jsonl#L154) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 153](trajectory.jsonl#L153)
- Finding: `f-exclusivity-b580f872` · **compliant** · confidence 0.90
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the "Services"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement.”
- Rationale: The Agreement imposes no exclusivity or "sole supplier" obligation on Clear Capital, which meets the preferred position. The engagement is structured on a "task by task basis" through individually negotiated Statements of Work (p0004), and compensation is time-and-materials per SOW (p0013) with no minimum-volume commitment, requirements obligation, or fee/penalty triggered by our use of other suppliers. Targeted searches for "sole/exclusive provider", "all of its requirements", "shall not procure/purchase/engage", and competing-vendor restrictions returned nothing. The only "exclusive" references are unrelated: Contractor's retained IP ownership (p0020), a non-exclusive license granted to us (p0021, which benefits our party), and entire-agreement boilerplate (p0051). The mutual non-solicitation of employees at p0047 is a different category and is not exclusive dealing, so it is not flagged here. Clear Capital remains free to buy comparable services from other suppliers; no redline required.

### Verifier and repair feedback

- [seq 197](trajectory.jsonl#L197) **Verdict: pass** — Claimed status is compliant and, consistent with that, the redline is identical to the original paragraphs and no counterparty comment was raised — appropriate for an internal evidence finding. Cited text supports the preferred position: p0004 structures the engagement 'on a task by task basis' via individually agreed SOWs, and p0013 is time-and-materials per SOW with no minimum volume, requirements commitment, or penalty for using other suppliers. The only 'exclusive' hits are benign or beneficial to us — Contractor's retained IP and a non-exclusive license granted to Company (p0021) — matching the rule's guidance that exclusivity favoring Customer is not a deviation. Deterministic check ('no requirements/sole-supplier obligation on Customer remains') passes, corroborating the compliance call; the rationale correctly declines to double-flag the non-solicitation clause under this rule. Checks: {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}.

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

- [seq 25](trajectory.jsonl#L25) **drafter → list_sections**

```json
{}
```

- [seq 26](trajectory.jsonl#L26) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 27](trajectory.jsonl#L27) **drafter → search**

```json
{"query":"most favoured nation favorable terms no less favorable"}
```

- [seq 28](trajectory.jsonl#L28) **search result**

```json
[]
```

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 51](trajectory.jsonl#L51) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 52](trajectory.jsonl#L52) **search result**

```json
[]
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"best"}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[]
```

- [seq 85](trajectory.jsonl#L85) **drafter → search**

```json
{"query":"no less"}
```

- [seq 86](trajectory.jsonl#L86) **search result**

```json
[]
```

- [seq 115](trajectory.jsonl#L115) **drafter → search**

```json
{"query":"exclusiv"}
```

- [seq 116](trajectory.jsonl#L116) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"… Services shall not be deemed to be Works and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said proper…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…mation…
```

- [seq 117](trajectory.jsonl#L117) **drafter → search**

```json
{"query":"discount"}
```

- [seq 118](trajectory.jsonl#L118) **search result**

```json
[]
```

- [seq 145](trajectory.jsonl#L145) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0013","p0014"],"quote":"During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials.","rationale":"The compensation provisions (§ 3(a)-(c)) set fees purely by reference to each Statement of Work on a time-and-materials basis, with rate changes on 30 days' notice, and contain no most-favoured-nation mechanic. Searches across the document for MFN-style language (\"most favoured nation\", \"no less favorable\", \"best\", \"discount\", \"exclusiv\") return nothing that obliges Company/Clear Capital to extend to Contractor any terms given to third parties or to match third-party offers. This meets the preferred position (no MFN obligation on Customer), so no redline is warranted. Note for completeness: there is likewise no Vendor-granted MFN in our favour, which would have been welcome but is not required by this rule; the unilateral right for Contractor to change rates on 30 days' notice in § 3(b) is a pricing-change issue addressed under the price-increase rule, not here.","confidence":0.9}
```

- [seq 146](trajectory.jsonl#L146) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 145](trajectory.jsonl#L145)
- Finding: `f-mfn-817cbd14` · **compliant** · confidence 0.90
- Location: § 3 CONTRACTOR'S COMPENSATION.
- Quote: “During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials.”
- Rationale: The compensation provisions (§ 3(a)-(c)) set fees purely by reference to each Statement of Work on a time-and-materials basis, with rate changes on 30 days' notice, and contain no most-favoured-nation mechanic. Searches across the document for MFN-style language ("most favoured nation", "no less favorable", "best", "discount", "exclusiv") return nothing that obliges Company/Clear Capital to extend to Contractor any terms given to third parties or to match third-party offers. This meets the preferred position (no MFN obligation on Customer), so no redline is warranted. Note for completeness: there is likewise no Vendor-granted MFN in our favour, which would have been welcome but is not required by this rule; the unilateral right for Contractor to change rates on 30 days' notice in § 3(b) is a pricing-change issue addressed under the price-increase rule, not here.

### Verifier and repair feedback

- [seq 185](trajectory.jsonl#L185) **Verdict: pass** — Claimed status is compliant and the cited compensation provisions (§3(a)-(b)) contain no most-favoured-nation mechanic of any kind, so there is no obligation on Company/Clear Capital to extend Contractor terms given to third parties or to match third-party offers — this matches the rule's preferred position (no MFN burdening Customer). Consistent with a compliant finding, no redline and no counterparty comment were proposed; the rendered text is identical to the original and no deterministic checks failed. Rationale is accurate and appropriately scoped: it notes the absence of a Vendor-granted MFN as a non-required nicety and correctly defers the unilateral 30-day rate-change right in §3(b) to the price-increase rule, avoiding double-flagging the same commercial term. Checks: .

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
[{"paragraphId":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and f…"},{"paragraphId":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…, during the term of this Agreement and for one (1) year after its termination…
```

- [seq 45](trajectory.jsonl#L45) **drafter → list_sections**

```json
{}
```

- [seq 46](trajectory.jsonl#L46) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 73](trajectory.jsonl#L73) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0045","p0046","p0047","p0048","p0049"]}
```

- [seq 74](trajectory.jsonl#L74) **read_paragraphs result**

```json
[{"id":"p0045","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"12. INTEGRATION. This Agreement, including The Mutual Non-Disclosure Agreement and, any Statements of Work entered into pursuant hereto, constitutes the entire agreement of the parties hereto with respect to its subject matter and supersedes all prior and contemporaneous representations, proposals, …
```

- [seq 97](trajectory.jsonl#L97) **drafter → lookup_precedent**

```json
{"ruleId":"NOSOLICIT","context":"Mutual 1-year non-solicit limited to personnel with direct involvement in Services; no general-advertising or unsolicited-approach carve-out."}
```

- [seq 112](trajectory.jsonl#L112) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-nosolicit","source":"Harbor Consulting SOW (Aug 2025)","clauseAfter":"Neither party shall directly solicit personnel involved in the Services for twelve months; general advertising and unsolicited approaches are excluded.","comment":"[Playbook] We made this mutual, limited it to involved personnel and added customary carve-outs.","level":"fallback"}]}
```

- [seq 137](trajectory.jsonl#L137) **drafter → propose_redline**

```json
{"level":"fallback","precedentId":"seed-nosolicit","summary":"Add customary general-advertising and unsolicited-approach carve-outs to the mutual non-solicit.","comment":"[Playbook] We have added the customary carve-outs for general advertising and unsolicited approaches, since our playbook accepts a non-solicit only where hiring through public job postings or candidate-initiated contact is expressly permitted. The scope and one-year duration are otherwise acceptable to us.","ops":[{"kind":"replace","paragraphId":"p0047","oldText":"without such other party's express written consent, which shall not be unreasonably withheld.","newText":"without such other party's express written consent, which shall not be unreasonably withheld. Nothing in this Section shall restrict either party from (a) engaging in general advertising or other recruiting efforts not specifically targeted at the other party's personnel, or from hiring any person who responds to such efforts, or (b) hiring any person who approaches that party on his or her own initiative without solicitation."}]}
```

- [seq 138](trajectory.jsonl#L138) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0047","segments":[{"type":"equal","text":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's e…
```

- [seq 161](trajectory.jsonl#L161) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0047"],"quote":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's express written consent, which shall not be unreasonably withheld.","rationale":"Section 13 binds Clear Capital as well as RadialSpark. It already satisfies most of the fallback: it is mutual, limited to personnel with direct involvement in the Services, runs only one year post-termination, and is solicitation-based rather than a no-hire. However, it contains no carve-out for general advertising/non-targeted recruiting or for candidate-initiated, unsolicited approaches, which the rule treats as a required element of any acceptable non-solicit. Without it, Clear Capital risks breach merely by hiring a RadialSpark consultant who answers a public job posting. The redline adds the two customary carve-outs and leaves scope and duration untouched, landing the clause at the fallback. Measuring the one-year period from termination rather than from the end of the individual's involvement is a minor variance noted but not redlined.","confidence":0.82,"proposal":{"level":"fallback","precedentId":"seed-nosolicit","summary":"Add customary general-advertising and unsolicited-approach carve-outs to the mutual non-solicit.","comment":"[Playbook] We have added the customary carve-outs for general advertising and unsolicited approaches, since our playbook accepts a non-solicit only where hiring through public job postings or candidate-initiated contact is expressly permitted. The scope and one-year duration are otherwise acceptable to us.","ops":[{"kind":"replace","paragraphId":"p0047","oldText":"without such other party's express written consent, which shall not be unreasonably withheld.","newText":"without such other party's express written consent, which shall not be unreasonably withheld. Nothing in this Section shall restrict either party from (a) engaging in general advertising or other recruiting efforts not specifically targeted at the other party's personnel, or from hiring any person who responds to such efforts, or (b) hiring any person who approaches that party on his or her own initiative without solicitation."}]}}
```

- [seq 162](trajectory.jsonl#L162) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 161](trajectory.jsonl#L161)
- Finding: `f-nosolicit-32d65825` · **deviation** · confidence 0.82
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other party's express written consent, which shall not be unreasonably withheld.”
- Rationale: Section 13 binds Clear Capital as well as RadialSpark. It already satisfies most of the fallback: it is mutual, limited to personnel with direct involvement in the Services, runs only one year post-termination, and is solicitation-based rather than a no-hire. However, it contains no carve-out for general advertising/non-targeted recruiting or for candidate-initiated, unsolicited approaches, which the rule treats as a required element of any acceptable non-solicit. Without it, Clear Capital risks breach merely by hiring a RadialSpark consultant who answers a public job posting. The redline adds the two customary carve-outs and leaves scope and duration untouched, landing the clause at the fallback. Measuring the one-year period from termination rather than from the end of the individual's involvement is a minor variance noted but not redlined.
- Proposal: **fallback** — Add customary general-advertising and unsolicited-approach carve-outs to the mutual non-solicit.
- Comment: [Playbook] We have added the customary carve-outs for general advertising and unsolicited approaches, since our playbook accepts a non-solicit only where hiring through public job postings or candidate-initiated contact is expressly permitted. The scope and one-year duration are otherwise acceptable to us.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "without such other party's express written consent, which shall not be unreasonably withheld. Nothing in this Section shall restrict either party from (a) engaging in general advertising or other recruiting efforts not specifically targeted at the other party's personnel, or from hiring any person who responds to such efforts, or (b) hiring any person who approaches that party on his or her own initiative without solicitation.",
    "oldText": "without such other party's express written consent, which shall not be unreasonably withheld.",
    "paragraphId": "p0047"
  }
]
```

### Verifier and repair feedback

- [seq 215](trajectory.jsonl#L215) **Verdict: pass** — The rule's fallback expressly conditions acceptance of any non-solicit on carve-outs for general advertisements and unsolicited approaches; Section 13 contains neither, so the clause fails the fallback on a material term rather than a minor sub-element — deviation is the correct classification. The redline is purely additive: it appends the two customary carve-outs and leaves scope ('direct involvement with the Services'), the one-year duration, and the solicitation-based (non no-hire) construct untouched. This is the smallest edit that reaches the fallback. The high changed-character ratio (0.784) is an artifact of adding a new sentence to a short paragraph, not a rewrite; the 'duration ≤ 12 months' check failure is a phrasing artifact ('one (1) year' spelled out and retained unchanged). Comment is accurate, in-tone, cites the playbook position, and correctly acknowledges that scope and duration are acceptable; the rationale properly notes the measure-from-termination variance as a non-redlined minor point. Checks: {"name":"operation 1 applies","ok":true}; {"name":"non-solicit duration ≤ 12 months","ok":false,"detail":"number not found"}; {"name":"general-solicitation carve-out present","ok":true}; {"name":"minimal edit p0047","ok":false,"detail":"changed-character ratio=0.784 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 187](trajectory.jsonl#L187)

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

- [seq 201](trajectory.jsonl#L201) **drafter → list_sections**

```json
{}
```

- [seq 202](trajectory.jsonl#L202) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 203](trajectory.jsonl#L203) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 204](trajectory.jsonl#L204) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 229](trajectory.jsonl#L229) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 230](trajectory.jsonl#L230) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 231](trajectory.jsonl#L231) **drafter → search**

```json
{"query":"term of this Agreement"}
```

- [seq 232](trajectory.jsonl#L232) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…the terms and subject to the conditions set forth in this Agreement. During the term of this Agreement, Company and Contractor will develop and agree upon statements of work defining…"},{"paragraphId":"p0011","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"2. TERM. The term of this Agreement shall begin on the date…
```

- [seq 259](trajectory.jsonl#L259) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"Consulting services agreement, evergreen term, either party may terminate only when no SOW outstanding on 15 days notice; need Customer convenience right during SOWs"}
```

- [seq 280](trajectory.jsonl#L280) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-t4c","source":"Pioneer Services MSA (Mar 2025)","clauseAfter":"Customer may terminate an Order for convenience on thirty days' notice and will receive a pro-rata refund of prepaid fees.","comment":"[Playbook] We added a practical convenience exit and refund for unused prepaid services.","level":"preferred"}]}
```

- [seq 281](trajectory.jsonl#L281) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 282](trajectory.jsonl#L282) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 309](trajectory.jsonl#L309) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Company right to terminate the Agreement or any Statement of Work for convenience on 30 days' notice with refund of prepaid, unearned fees","comment":"[Playbook] Section 6(a) only permits convenience termination when no Statement of Work is outstanding, so on an evergreen term we would be locked into every engagement; we have added a Company right to terminate the Agreement or any Statement of Work on thirty (30) days' notice with a refund of prepaid, unearned fees, with Contractor paid for Services performed through termination. If 30 days is difficult we can move to 60 days' notice.","precedentId":"seed-t4c","ops":[{"kind":"insert_after","paragraphId":"p0033","numbering":"(c)","text":"(c) In addition, Company may terminate this Agreement or any Statement of Work for convenience, in whole or in part, upon thirty (30) days advance written notice to Contractor, without penalty or early-termination charge. Upon any such termination, Contractor will be paid all fees and expenses incurred or earned for Services properly performed through the effective date of termination, and Contractor shall refund to Company any prepaid fees for Services not performed as of that date."}]}
```

- [seq 310](trajectory.jsonl#L310) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0033","segments":[{"type":"equal","text":"(b) In addition, either party may terminate this Agreement or any outstanding Statement of Work, upon fifteen (15) days written notice to the other party, in the event such other party breaches a material term of this Agreement or any Statement of Work and such breach remains uncured at the end of such f…
```

- [seq 335](trajectory.jsonl#L335) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0032","p0011"],"quote":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other.","rationale":"The term is evergreen (§ 2: continues until terminated under § 6), and the only convenience right (§ 6(a)) is available solely \"at any time that there is no uncompleted Statement of Work outstanding.\" We therefore have no convenience exit from any active engagement, and § 6(b) is limited to material breach — this fails the fallback, which requires a Customer convenience right (30–90 days' notice) without penalty. The Vendor side is acceptable: Contractor likewise cannot walk away while a Statement of Work is outstanding, so the 15-day mutual right operates only between engagements and needs no change. Redline adds a new § 6(c) giving Company a 30 days' notice convenience right with Contractor paid for Services performed and a refund of prepaid, unearned fees; 60 days' notice is offered as a fallback.","confidence":0.82,"proposal":{"level":"preferred","summary":"Add Company right to terminate the Agreement or any Statement of Work for convenience on 30 days' notice with refund of prepaid, unearned fees","comment":"[Playbook] Section 6(a) only permits convenience termination when no Statement of Work is outstanding, so on an evergreen term we would be locked into every engagement; we have added a Company right to terminate the Agreement or any Statement of Work on thirty (30) days' notice with a refund of prepaid, unearned fees, with Contractor paid for Services performed through termination. If 30 days is difficult we can move to 60 days' notice.","precedentId":"seed-t4c","ops":[{"kind":"insert_after","paragraphId":"p0033","numbering":"(c)","text":"(c) In addition, Company may terminate this Agreement or any Statement of Work for convenience, in whole or in part, upon thirty (30) days advance written notice to Contractor, without penalty or early-termination charge. Upon any such termination, Contractor will be paid all fees and expenses incurred or earned for Services properly performed through the effective date of termination, and Contractor shall refund to Company any prepaid fees for Services not performed as of that date."}]}}
```

- [seq 336](trajectory.jsonl#L336) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 335](trajectory.jsonl#L335)
- Finding: `f-t4c-9f1dc6bd` · **deviation** · confidence 0.82
- Location: § 6 TERMINATION.
- Quote: “(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other.”
- Rationale: The term is evergreen (§ 2: continues until terminated under § 6), and the only convenience right (§ 6(a)) is available solely "at any time that there is no uncompleted Statement of Work outstanding." We therefore have no convenience exit from any active engagement, and § 6(b) is limited to material breach — this fails the fallback, which requires a Customer convenience right (30–90 days' notice) without penalty. The Vendor side is acceptable: Contractor likewise cannot walk away while a Statement of Work is outstanding, so the 15-day mutual right operates only between engagements and needs no change. Redline adds a new § 6(c) giving Company a 30 days' notice convenience right with Contractor paid for Services performed and a refund of prepaid, unearned fees; 60 days' notice is offered as a fallback.
- Proposal: **preferred** — Add Company right to terminate the Agreement or any Statement of Work for convenience on 30 days' notice with refund of prepaid, unearned fees
- Comment: [Playbook] Section 6(a) only permits convenience termination when no Statement of Work is outstanding, so on an evergreen term we would be locked into every engagement; we have added a Company right to terminate the Agreement or any Statement of Work on thirty (30) days' notice with a refund of prepaid, unearned fees, with Contractor paid for Services performed through termination. If 30 days is difficult we can move to 60 days' notice.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(c)",
    "paragraphId": "p0033",
    "text": "(c) In addition, Company may terminate this Agreement or any Statement of Work for convenience, in whole or in part, upon thirty (30) days advance written notice to Contractor, without penalty or early-termination charge. Upon any such termination, Contractor will be paid all fees and expenses incurred or earned for Services properly performed through the effective date of termination, and Contractor shall refund to Company any prepaid fees for Services not performed as of that date."
  }
]
```

### Verifier and repair feedback

- [seq 393](trajectory.jsonl#L393) **Verdict: pass** — Deviation classification is correct: the only convenience right (§ 6(a)) is available solely when no Statement of Work is outstanding, so on an evergreen term (§ 2) the Customer has no convenience exit from an active engagement — this fails the fallback, which requires a Customer convenience right on 30–90 days' notice without material penalty. The redline is additive and minimal: a new § 6(c) granting Company a 30-day convenience right over the Agreement or any SOW, with payment for Services performed and refund of prepaid, unearned fees, tracking the model language without disturbing the existing breach and mutual-termination provisions. Leaving the Vendor side untouched is defensible and consistent with the rule: Contractor's 15-day right under § 6(a) likewise operates only when no SOW is outstanding, so it is not a mid-term walk-away right; this is noted accurately in the rationale. The failed 'Customer convenience termination present' check is a phrasing artifact — the inserted text uses the contract's defined term 'Company' (a Customer alias) rather than 'Customer', and substantively delivers the required right, notice period and refund. Comment is accurate, concise, first-person plural, explains the gap and the change, and offers the 60-day fallback as the playbook contemplates. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 199](trajectory.jsonl#L199)

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

- [seq 219](trajectory.jsonl#L219) **drafter → list_sections**

```json
{}
```

- [seq 220](trajectory.jsonl#L220) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 221](trajectory.jsonl#L221) **drafter → search**

```json
{"query":"renew"}
```

- [seq 222](trajectory.jsonl#L222) **search result**

```json
[]
```

- [seq 235](trajectory.jsonl#L235) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 236](trajectory.jsonl#L236) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 237](trajectory.jsonl#L237) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 238](trajectory.jsonl#L238) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 261](trajectory.jsonl#L261) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 262](trajectory.jsonl#L262) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 285](trajectory.jsonl#L285) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0011","p0032","p0014"],"quote":"2. TERM. The term of this Agreement shall begin on the date hereof and shall continue until terminated by either party pursuant to Paragraph 6 hereof.","rationale":"There is no auto-renewal mechanic anywhere in the Agreement: §2 creates an evergreen term that runs only \"until terminated by either party pursuant to Paragraph 6,\" and §6(a) lets either party (including us) walk away for any or no reason on fifteen (15) days' notice whenever no Statement of Work is outstanding. Work and fees are engaged SOW-by-SOW, so any continuation of the engagement requires mutual written agreement — this meets and in fact exceeds the preferred position (no renewal term to opt out of, no notice window, and nothing longer than the 30-day preferred exit period; no multi-year auto-renewal walk-away risk). Noted but not flagged under this rule: §3(b) gives Contractor a unilateral right to \"change rates with 30 days notice to Company\" with no CPI/percentage cap. That is a pricing-predictability point rather than a renewal uplift, and its impact is limited because the 30-day rate-change notice exceeds our 15-day at-will termination right, so we can exit before any increase bites; it is better addressed under the fees/price-increase rule.","confidence":0.82}
```

- [seq 286](trajectory.jsonl#L286) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 285](trajectory.jsonl#L285)
- Finding: `f-renewal-458e5ee7` · **compliant** · confidence 0.82
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “2. TERM. The term of this Agreement shall begin on the date hereof and shall continue until terminated by either party pursuant to Paragraph 6 hereof.”
- Rationale: There is no auto-renewal mechanic anywhere in the Agreement: §2 creates an evergreen term that runs only "until terminated by either party pursuant to Paragraph 6," and §6(a) lets either party (including us) walk away for any or no reason on fifteen (15) days' notice whenever no Statement of Work is outstanding. Work and fees are engaged SOW-by-SOW, so any continuation of the engagement requires mutual written agreement — this meets and in fact exceeds the preferred position (no renewal term to opt out of, no notice window, and nothing longer than the 30-day preferred exit period; no multi-year auto-renewal walk-away risk). Noted but not flagged under this rule: §3(b) gives Contractor a unilateral right to "change rates with 30 days notice to Company" with no CPI/percentage cap. That is a pricing-predictability point rather than a renewal uplift, and its impact is limited because the 30-day rate-change notice exceeds our 15-day at-will termination right, so we can exit before any increase bites; it is better addressed under the fees/price-increase rule.

### Verifier and repair feedback

- [seq 339](trajectory.jsonl#L339) **Verdict: pass** — Claimed status is compliant and the redline is unchanged with no counterparty comment, which is exactly what a compliant finding should look like. The cited text supports compliance: §2 creates an evergreen term terminable only under §6, and §6(a) gives either party (including us) an at-will 15-day exit when no SOW is outstanding — there is no automatic renewal term, no non-renewal notice window, and no multi-year auto-renewal walk-away risk. Continuation is effectively SOW-by-SOW mutual agreement, matching the preferred position. Deterministic check (notice window = 15 days ≤ 60) corroborates the assessment. The uncapped unilateral rate-change right in §3(b) is correctly noted in the rationale rather than flagged here, avoiding double-counting a pricing term that belongs to the fees/price-increase rule; the rationale accurately explains why its impact is limited given the 15-day exit. Checks: {"name":"non-renewal notice window ≤ 60 days","ok":true,"detail":"value=15"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 217](trajectory.jsonl#L217)

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

- [seq 241](trajectory.jsonl#L241) **drafter → list_sections**

```json
{}
```

- [seq 242](trajectory.jsonl#L242) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 243](trajectory.jsonl#L243) **drafter → search**

```json
{"query":"governing law"}
```

- [seq 244](trajectory.jsonl#L244) **search result**

```json
[{"paragraphId":"p0043","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"11. SEVERABILITY; GOVERNING LAW. In the event that any term or provision of this Agreement shall be held to be …"}]
```

- [seq 265](trajectory.jsonl#L265) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0041","p0042","p0043","p0044","p0045"]}
```

- [seq 266](trajectory.jsonl#L266) **read_paragraphs result**

```json
[{"id":"p0041","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"9. INDEPENDENT CONTRACTOR. Contractor is performing the Services as an independent contractor and not as an employee of Company and none of Contractor's personnel shall be entitled to receive any compensation, benefits or other incidents of employment from Company. Subject to Section 3(c), Contracto…
```

- [seq 289](trajectory.jsonl#L289) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 290](trajectory.jsonl#L290) **search result**

```json
[{"paragraphId":"p0053","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"19. Arbitration. Except as otherwise specified below, all actions, disputes, claims and controv…"},{"paragraphId":"p0056","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…rties (collectively the \"Disputes\"), will be subject to and resolved by bind…
```

- [seq 291](trajectory.jsonl#L291) **drafter → search**

```json
{"query":"jurisdiction venue courts"}
```

- [seq 292](trajectory.jsonl#L292) **search result**

```json
[]
```

- [seq 315](trajectory.jsonl#L315) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0052","p0053","p0054","p0055","p0056","p0057","p0058"]}
```

- [seq 316](trajectory.jsonl#L316) **read_paragraphs result**

```json
[{"id":"p0052","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"18. Severability. If any provision of this Agreement is invalid, illegal, or unenforceable, the remainder of this Agreement will remain in full force and effect."},{"id":"p0053","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"19. Arbitration. Except as otherwise s…
```

- [seq 317](trajectory.jsonl#L317) **drafter → read_section**

```json
{"sectionId":"sec-preamble"}
```

- [seq 318](trajectory.jsonl#L318) **read_section result**

```json
{"sectionRef":"§ Preamble","paragraphs":[{"id":"p0000","text":"Exhibit 10(xiv)"},{"id":"p0001","text":"MASTER SERVICES AGREEMENT Between RadialSpark, LLC and Clear Capital Page 1 of 10"},{"id":"p0002","text":"THIS MASTER SERVICES AGREEMENT (\"Agreement\"), dated as of 09/24/2018 (the \"Effective Date\"), is between Clear Capital (the \"Company\") and RadialSpark, LLC (the \"Contractor\"). WHEREAS…
```

- [seq 349](trajectory.jsonl#L349) **drafter → lookup_precedent**

```json
{"ruleId":"GOVLAW","context":"Arizona governing law, no venue clause, mandatory domestic arbitration under USA&M rules"}
```

- [seq 362](trajectory.jsonl#L362) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-govlaw","source":"Orbit Analytics MSA (Oct 2025)","clauseAfter":"This Agreement is governed by New York law, with exclusive jurisdiction in the state and federal courts in New York County.","comment":"[Playbook] We moved governing law and venue to our accepted New York position.","level":"preferred"}]}
```

- [seq 389](trajectory.jsonl#L389) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-govlaw","summary":"Move governing law from Arizona to New York, add exclusive New York County venue, and replace mandatory arbitration with the same courts.","comment":"[Playbook] We moved governing law and venue to our accepted New York position and replaced mandatory arbitration with the exclusive jurisdiction of the New York County courts; Arizona law and administered arbitration are outside our accepted list. Delaware, California or England and Wales with London courts would also work if New York is difficult.","ops":[{"kind":"replace","paragraphId":"p0043","oldText":"This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.","newText":"This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to the conflict of laws provisions thereof, and each party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in New York County, New York."},{"kind":"replace","paragraphId":"p0056","oldText":"will be subject to and resolved by binding arbitration pursuant to the Arbitration Rules of U.S. Arbitration & Mediation, (www.usam.com). Any award or order rendered by the arbitrator may be confirmed as a judgment or order in any state or federal court of competent jurisdiction, which includes within the federal judicial district of the residence of the party against whom such award or order was entered.","newText":"will be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York, and each party irrevocably consents to venue in such courts."}]}
```

- [seq 390](trajectory.jsonl#L390) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0043","segments":[{"type":"equal","text":"11. SEVERABILITY; GOVERNING LAW. In the event that any term or provision of this Agreement shall be held to be invalid, void or unenforceable, then the remainder of this Agreement shall not be affected, impaired or invalidated, and each such term and provision of this Agreement shall be valid and enforce…
```

- [seq 413](trajectory.jsonl#L413) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0043","p0056"],"quote":"This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.","rationale":"Governing law is Arizona, which is outside the accepted list (New York, Delaware, California, England and Wales), so the clause fails both the preferred and the fallback position. There is no court venue provision; instead Section 19 sends all disputes to mandatory binding arbitration under U.S. Arbitration & Mediation rules, whereas the playbook requires courts as the dispute forum. The arbitration is administered domestically (no foreign seat) and Arizona is not the counterparty's foreign home forum, so this is a deviation rather than walk-away territory. Redline moves law and exclusive venue to New York County courts per the preferred position, with Delaware, California or England and Wales/London offered as fallback.","confidence":0.9,"proposal":{"level":"preferred","precedentId":"seed-govlaw","summary":"Move governing law from Arizona to New York, add exclusive New York County venue, and replace mandatory arbitration with the same courts.","comment":"[Playbook] We moved governing law and venue to our accepted New York position and replaced mandatory arbitration with the exclusive jurisdiction of the New York County courts; Arizona law and administered arbitration are outside our accepted list. Delaware, California or England and Wales with London courts would also work if New York is difficult.","ops":[{"kind":"replace","paragraphId":"p0043","oldText":"This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.","newText":"This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to the conflict of laws provisions thereof, and each party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in New York County, New York."},{"kind":"replace","paragraphId":"p0056","oldText":"will be subject to and resolved by binding arbitration pursuant to the Arbitration Rules of U.S. Arbitration & Mediation, (www.usam.com). Any award or order rendered by the arbitrator may be confirmed as a judgment or order in any state or federal court of competent jurisdiction, which includes within the federal judicial district of the residence of the party against whom such award or order was entered.","newText":"will be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York, and each party irrevocably consents to venue in such courts."}]}}
```

- [seq 414](trajectory.jsonl#L414) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 413](trajectory.jsonl#L413)
- Finding: `f-govlaw-29d875f8` · **deviation** · confidence 0.90
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.”
- Rationale: Governing law is Arizona, which is outside the accepted list (New York, Delaware, California, England and Wales), so the clause fails both the preferred and the fallback position. There is no court venue provision; instead Section 19 sends all disputes to mandatory binding arbitration under U.S. Arbitration & Mediation rules, whereas the playbook requires courts as the dispute forum. The arbitration is administered domestically (no foreign seat) and Arizona is not the counterparty's foreign home forum, so this is a deviation rather than walk-away territory. Redline moves law and exclusive venue to New York County courts per the preferred position, with Delaware, California or England and Wales/London offered as fallback.
- Proposal: **preferred** — Move governing law from Arizona to New York, add exclusive New York County venue, and replace mandatory arbitration with the same courts.
- Comment: [Playbook] We moved governing law and venue to our accepted New York position and replaced mandatory arbitration with the exclusive jurisdiction of the New York County courts; Arizona law and administered arbitration are outside our accepted list. Delaware, California or England and Wales with London courts would also work if New York is difficult.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to the conflict of laws provisions thereof, and each party irrevocably submits to the exclusive jurisdiction of the state and federal courts located in New York County, New York.",
    "oldText": "This Agreement shall be governed by and construed in accordance with the laws of the Arizona, without regard to the conflict of laws provisions thereof.",
    "paragraphId": "p0043"
  },
  {
    "kind": "replace",
    "newText": "will be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York, and each party irrevocably consents to venue in such courts.",
    "oldText": "will be subject to and resolved by binding arbitration pursuant to the Arbitration Rules of U.S. Arbitration & Mediation, (www.usam.com). Any award or order rendered by the arbitrator may be confirmed as a judgment or order in any state or federal court of competent jurisdiction, which includes within the federal judicial district of the residence of the party against whom such award or order was entered.",
    "paragraphId": "p0056"
  }
]
```

### Verifier and repair feedback

- [seq 477](trajectory.jsonl#L477) **Verdict: pass** — Classification is correct: Arizona governing law is outside the accepted set (NY/DE/CA/England & Wales), so the clause fails both the preferred and fallback positions, and the dispute forum is mandatory administered arbitration rather than the courts the playbook requires — a genuine deviation, not an acceptable fallback. Redline in p0043 makes the minimal substantive change (Arizona -> State of New York) and adds the exclusive New York County court venue, leaving severability and conflict-of-laws language intact. The larger rewrite of p0056 (changed-character ratio 0.868) is justified: the rule requires courts rather than arbitration, so the arbitration referral and the now-redundant award-confirmation sentence must be replaced; the resulting sentence still reads coherently from the '(b) ... (collectively the "Disputes")' fragment. Comment is accurate, concise, in the required voice and prefix, states what changed and why, and offers the Delaware/California/England-and-Wales fallback. No double-flagging or counterparty-benefit issue; medium severity is appropriate since the arbitration is domestically administered and Arizona is not a foreign home forum (not walk-away). Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"governing law within the accepted set","ok":true}; {"name":"minimal edit p0043","ok":true,"detail":"changed-character ratio=0.529 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}; {"name":"minimal edit p0056","ok":false,"detail":"changed-character ratio=0.868 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 227](trajectory.jsonl#L227)

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

- [seq 253](trajectory.jsonl#L253) **drafter → list_sections**

```json
{}
```

- [seq 254](trajectory.jsonl#L254) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 255](trajectory.jsonl#L255) **drafter → search**

```json
{"query":"assign"}
```

- [seq 256](trajectory.jsonl#L256) **search result**

```json
[{"paragraphId":"p0006","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…problem as soon as possible. If Company reasonably requests, Contractor shall reassign the individual who is the subject of Company's dissatisfaction and replace that…"},{"paragraphId":"p0009","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…h Contractor's personnel in connection with an engagement, Company's failu…
```

- [seq 275](trajectory.jsonl#L275) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0040","p0041","p0042","p0043","p0044"]}
```

- [seq 276](trajectory.jsonl#L276) **read_paragraphs result**

```json
[{"id":"p0040","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"Confidential Information. Contractor shall not use or disclose to any person, firm or entity any Confidential Information without Company's express, prior written permission; provided, however, that notwithstanding the foregoing, Contractor may disclose Confidential Information to the extent that it…
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[]
```

- [seq 305](trajectory.jsonl#L305) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 306](trajectory.jsonl#L306) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 307](trajectory.jsonl#L307) **drafter → lookup_precedent**

```json
{"ruleId":"ASSIGN","context":"Mutual nonassignability clause with consent not unreasonably withheld; need Customer affiliate/successor carve-out"}
```

- [seq 332](trajectory.jsonl#L332) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-assign","source":"Keystone ERP Licence (Apr 2025)","clauseAfter":"Customer may assign this Agreement without consent to an affiliate or successor in a merger, acquisition or sale of substantially all assets.","comment":"[Playbook] We added customary affiliate and transaction successor rights.","level":"preferred"}]}
```

- [seq 351](trajectory.jsonl#L351) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Company carve-out to assign to affiliates and M&A successors without consent","comment":"[Playbook] We added a customary carve-out allowing Company to assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without consent, so ordinary corporate reorganizations do not require Contractor's approval. Contractor's assignment rights remain subject to consent as drafted; if helpful, we can instead make the successor right mutual on written notice.","precedentId":"seed-assign","ops":[{"kind":"replace","paragraphId":"p0042","oldText":"without the other party's express, prior written consent, which will not be unreasonably withheld.","newText":"without the other party's express, prior written consent, which will not be unreasonably withheld; provided that Company may assign this Agreement without consent to an affiliate or to a successor in a merger, acquisition or sale of substantially all of its assets."}]}
```

- [seq 352](trajectory.jsonl#L352) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0042","segments":[{"type":"equal","text":"10. NONASSIGNABILITY. Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld"},{"type":"insert","text":"; provided that Company may assign this Agreement with…
```

- [seq 365](trajectory.jsonl#L365) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0042"],"quote":"10. NONASSIGNABILITY. Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld.","rationale":"The only assignment provision (§ 10) is mutual and applies a reasonable-consent standard, but it requires Contractor's consent for every transfer, including assignment to a Company affiliate or to a successor in a merger, acquisition or sale of substantially all assets. The fallback position requires a right to assign to successors (on notice, without consent), so the clause falls short of the fallback on a material term. Positively, there is no change-of-control trigger anywhere in the Agreement — § 6 termination rights are limited to convenience (no open SOW) and uncured material breach — so no Vendor exit or re-pricing right arises on our change of control. Minimal redline adds the affiliate/successor carve-out for Company; we did not add the \"no assignment to a Customer competitor\" restriction on Contractor, which is a preferred-position refinement only.","confidence":0.82,"proposal":{"level":"preferred","summary":"Add Company carve-out to assign to affiliates and M&A successors without consent","comment":"[Playbook] We added a customary carve-out allowing Company to assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without consent, so ordinary corporate reorganizations do not require Contractor's approval. Contractor's assignment rights remain subject to consent as drafted; if helpful, we can instead make the successor right mutual on written notice.","precedentId":"seed-assign","ops":[{"kind":"replace","paragraphId":"p0042","oldText":"without the other party's express, prior written consent, which will not be unreasonably withheld.","newText":"without the other party's express, prior written consent, which will not be unreasonably withheld; provided that Company may assign this Agreement without consent to an affiliate or to a successor in a merger, acquisition or sale of substantially all of its assets."}]}}
```

- [seq 366](trajectory.jsonl#L366) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 365](trajectory.jsonl#L365)
- Finding: `f-assign-47014adb` · **deviation** · confidence 0.82
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “10. NONASSIGNABILITY. Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld.”
- Rationale: The only assignment provision (§ 10) is mutual and applies a reasonable-consent standard, but it requires Contractor's consent for every transfer, including assignment to a Company affiliate or to a successor in a merger, acquisition or sale of substantially all assets. The fallback position requires a right to assign to successors (on notice, without consent), so the clause falls short of the fallback on a material term. Positively, there is no change-of-control trigger anywhere in the Agreement — § 6 termination rights are limited to convenience (no open SOW) and uncured material breach — so no Vendor exit or re-pricing right arises on our change of control. Minimal redline adds the affiliate/successor carve-out for Company; we did not add the "no assignment to a Customer competitor" restriction on Contractor, which is a preferred-position refinement only.
- Proposal: **preferred** — Add Company carve-out to assign to affiliates and M&A successors without consent
- Comment: [Playbook] We added a customary carve-out allowing Company to assign to an affiliate or to a successor in a merger, acquisition or sale of substantially all assets without consent, so ordinary corporate reorganizations do not require Contractor's approval. Contractor's assignment rights remain subject to consent as drafted; if helpful, we can instead make the successor right mutual on written notice.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "without the other party's express, prior written consent, which will not be unreasonably withheld; provided that Company may assign this Agreement without consent to an affiliate or to a successor in a merger, acquisition or sale of substantially all of its assets.",
    "oldText": "without the other party's express, prior written consent, which will not be unreasonably withheld.",
    "paragraphId": "p0042"
  }
]
```

### Verifier and repair feedback

- [seq 417](trajectory.jsonl#L417) **Verdict: pass** — Classification is correct: § 10 is mutual with a reasonable-consent standard, but it requires Contractor consent for every transfer, including to a Company affiliate or an M&A successor. The playbook fallback expressly requires a right to assign to successors on written notice, so the clause fails the fallback on a material term rather than merely falling short of preferred wording. The redline is valid and additive: it preserves the existing mutual consent sentence and appends a proviso giving Company an affiliate/successor carve-out, which is the edit the redline guidance calls for. The 0.630 changed-character ratio reflects the length of the appended proviso relative to a short clause, not a rewrite — no original language was altered or deleted. Rationale is accurate on the change-of-control leg: no CoC trigger exists (§ 6 termination limited to convenience with no open SOW and uncured material breach), so no deletion was needed, and omitting the 'no assignment to a Customer competitor' restriction is correctly characterized as a preferred-position refinement noted rather than flagged. Comment matches the redline, is concise, cites the playbook position, and offers the mutual notice-based fallback as an alternative; no double-flagging of the same term under another rule. Checks: {"name":"operation 1 applies","ok":true}; {"name":"successor/affiliate carve-out for Customer present","ok":true}; {"name":"minimal edit p0042","ok":false,"detail":"changed-character ratio=0.630 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 273](trajectory.jsonl#L273)

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

- [seq 295](trajectory.jsonl#L295) **drafter → list_sections**

```json
{}
```

- [seq 296](trajectory.jsonl#L296) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 297](trajectory.jsonl#L297) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 298](trajectory.jsonl#L298) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 321](trajectory.jsonl#L321) **drafter → search**

```json
{"query":"Company's Information"}
```

- [seq 322](trajectory.jsonl#L322) **search result**

```json
[]
```

- [seq 323](trajectory.jsonl#L323) **drafter → search**

```json
{"query":"data","limit":20}
```

- [seq 324](trajectory.jsonl#L324) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…s, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Co…"},{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…, trademar…
```

- [seq 343](trajectory.jsonl#L343) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0037","p0038","p0039","p0040"]}
```

- [seq 344](trajectory.jsonl#L344) **read_paragraphs result**

```json
[{"id":"p0037","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"(c) IN ANY SUIT ARISING FROM THIS AGREEMENT EACH PARTY SHALL BE RESPONSIBLE FOR ITS OWN ATTORNEYS FEES. COMPANY AND CONTRACTOR HEREBY WAIVE ANY CLAIM TO AWARD OF ATTORNEYS FEES IN SUCH A SUIT."},{"id":"p0038","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"8. CONF…
```

- [seq 345](trajectory.jsonl#L345) **drafter → get_definition**

```json
{"term":"Contractor's Information"}
```

- [seq 346](trajectory.jsonl#L346) **get_definition result**

```json
{"found":false,"nearest":["Contractor"]}
```

- [seq 381](trajectory.jsonl#L381) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 382](trajectory.jsonl#L382) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 383](trajectory.jsonl#L383) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0025"]}
```

- [seq 384](trajectory.jsonl#L384) **read_paragraphs result**

```json
[{"id":"p0025","sectionRef":"§ 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER.","text":"(b) Contractor represents and warrants to Company that Contractor has full authority and sufficient rights, except for rights respecting programs, data and materials provided by Company or identified by Contractor as furnished to Company by third-party vendors, to grant and convey the ri…
```

- [seq 409](trajectory.jsonl#L409) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0017","p0020","p0021","p0022"],"quote":"The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Contractor for Company as the work product required by a Statement of Work (collectively, the \"Works\"), are the property of Company to the extent that such Works were created by Contractor for Company over a time period for which Company has been invoiced and said invoice has been paid.","rationale":"Direction of ownership runs our way and the rule's material terms are met at or above the preferred position: § 4(a) vests all Works (deliverables/work product under each SOW) in Clear Capital as Company, with Contractor obliged to execute further documents to perfect those rights (p0018); § 4(b) confirms Contractor merely retains its own pre-existing proprietary tools, methodologies and know-how (a permitted vendor carve-out); and § 4(c) grants us a royalty-free, non-exclusive, perpetual, sublicensable licence to use, copy, modify, create derivative versions of and display any Contractor's Information embedded in the Works for our business operations — i.e. the licence-back the preferred position requires. There is no assignment of our IP or data to Contractor, no joint ownership, and § 5(b) expressly excepts programs, data and materials we provide from Contractor's conveyance, while § 8 treats our data as our Confidential Information usable only to perform the Services. Sub-elements short of the ideal drafting, noted but not flagged: ownership of Works is expressed as vesting for periods invoiced and paid (and § 4(d) ties unrestricted modification/re-engagement of third parties to payment in full or termination), the § 4(c) licence is not expressly stated to be irrevocable or worldwide, and there is no standalone \"Customer Data remains ours\" sentence. We would tidy these in negotiation if the document opens for other reasons, but none defeats the fallback, so no redline.","confidence":0.79}
```

- [seq 410](trajectory.jsonl#L410) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 409](trajectory.jsonl#L409)
- Finding: `f-ip-13d206f5` · **compliant** · confidence 0.79
- Location: § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.
- Quote: “The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Contractor for Company as the work product required by a Statement of Work (collectively, the "Works"), are the property of Company to the extent that such Works were created by Contractor for Company over a time period for which Company has been invoiced and said invoice has been paid.”
- Rationale: Direction of ownership runs our way and the rule's material terms are met at or above the preferred position: § 4(a) vests all Works (deliverables/work product under each SOW) in Clear Capital as Company, with Contractor obliged to execute further documents to perfect those rights (p0018); § 4(b) confirms Contractor merely retains its own pre-existing proprietary tools, methodologies and know-how (a permitted vendor carve-out); and § 4(c) grants us a royalty-free, non-exclusive, perpetual, sublicensable licence to use, copy, modify, create derivative versions of and display any Contractor's Information embedded in the Works for our business operations — i.e. the licence-back the preferred position requires. There is no assignment of our IP or data to Contractor, no joint ownership, and § 5(b) expressly excepts programs, data and materials we provide from Contractor's conveyance, while § 8 treats our data as our Confidential Information usable only to perform the Services. Sub-elements short of the ideal drafting, noted but not flagged: ownership of Works is expressed as vesting for periods invoiced and paid (and § 4(d) ties unrestricted modification/re-engagement of third parties to payment in full or termination), the § 4(c) licence is not expressly stated to be irrevocable or worldwide, and there is no standalone "Customer Data remains ours" sentence. We would tidy these in negotiation if the document opens for other reasons, but none defeats the fallback, so no redline.

### Verifier and repair feedback

- [seq 461](trajectory.jsonl#L461) **Verdict: pass** — Cited clauses support the compliant classification: p0017 vests all Works (SOW deliverables/work product) in Company, p0020 limits Contractor to its pre-existing proprietary tools/know-how (a permitted vendor carve-out), and p0021 grants a royalty-free, perpetual, sublicensable licence to use, copy, modify and create derivative versions of any Contractor Information embedded in the Works — i.e. the licence-back the preferred position requires. No assignment of Customer IP or data to Contractor and no joint ownership appears in the cited text; the deterministic check confirms no residual assignment language, so no walk-away trigger exists. Shortfalls are correctly noted in the rationale rather than flagged: ownership conditioned on invoiced-and-paid periods, licence not expressly stated to be irrevocable/worldwide, and no standalone Customer Data ownership sentence — these are sub-elements short of ideal drafting and do not defeat the fallback. Consistent with a compliant finding, no redline and no counterparty comment were proposed; the paragraphs are rendered unchanged, so there is no over-flagging or invalid edit to correct. Checks: {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 303](trajectory.jsonl#L303)

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

- [seq 327](trajectory.jsonl#L327) **drafter → list_sections**

```json
{}
```

- [seq 328](trajectory.jsonl#L328) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 329](trajectory.jsonl#L329) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 330](trajectory.jsonl#L330) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 355](trajectory.jsonl#L355) **drafter → search**

```json
{"query":"assign"}
```

- [seq 356](trajectory.jsonl#L356) **search result**

```json
[{"paragraphId":"p0006","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…problem as soon as possible. If Company reasonably requests, Contractor shall reassign the individual who is the subject of Company's dissatisfaction and replace that…"},{"paragraphId":"p0009","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…h Contractor's personnel in connection with an engagement, Company's failu…
```

- [seq 357](trajectory.jsonl#L357) **drafter → search**

```json
{"query":"license"}
```

- [seq 358](trajectory.jsonl#L358) **search result**

```json
[{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…s, Contractor hereby grants to Company a royalty-free, non- exclusive perpetual license (including the right to grant a sublicense) to use, copy, modify, create, deriv…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…yalty-f…
```

- [seq 359](trajectory.jsonl#L359) **drafter → get_definition**

```json
{"term":"Contractor's Information"}
```

- [seq 360](trajectory.jsonl#L360) **get_definition result**

```json
{"found":false,"nearest":["Contractor"]}
```

- [seq 377](trajectory.jsonl#L377) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0042","p0043"]}
```

- [seq 378](trajectory.jsonl#L378) **read_paragraphs result**

```json
[{"id":"p0042","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"10. NONASSIGNABILITY. Neither party shall assign, transfer, or subcontract this Agreement or any of its obligations hereunder without the other party's express, prior written consent, which will not be unreasonably withheld."},{"id":"p0043","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION…
```

- [seq 397](trajectory.jsonl#L397) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0021","p0042"],"quote":"(c) To the extent that Contractor incorporates any of Contractor's Information into the Works, Contractor hereby grants to Company a royalty-free, non- exclusive perpetual license (including the right to grant a sublicense) to use, copy, modify, create, derivative version, publicly perform and publicly display such Contractor's Information in connection with Company's business operations.","rationale":"The licence-back of Contractor's Information embedded in the Works (§ 4(c)) is royalty-free, non-exclusive and perpetual, with an unqualified right to grant sublicences and broad use/copy/modify/derivative rights \"in connection with Company's business operations\". Nothing makes the grant revocable at Contractor's discretion, and the sublicence right gives us an unrestricted path to extend the licence to our affiliates and to contractors acting on our behalf — better than the fallback, which only requires affiliates to be covered on written notice. The grant is also not labelled non-transferable. Two sub-elements fall short of the fully preferred wording and are noted rather than flagged: the grant is not expressly styled \"irrevocable\", and there is no express successor-transfer carve-out, since assignment of the Agreement under § 10 (p0042) requires the other party's consent, albeit consent \"which will not be unreasonably withheld\". Neither is a material failure of the fallback, so no redline is proposed.","confidence":0.76}
```

- [seq 398](trajectory.jsonl#L398) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 397](trajectory.jsonl#L397)
- Finding: `f-license-e046bc8c` · **compliant** · confidence 0.76
- Location: § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.
- Quote: “(c) To the extent that Contractor incorporates any of Contractor's Information into the Works, Contractor hereby grants to Company a royalty-free, non- exclusive perpetual license (including the right to grant a sublicense) to use, copy, modify, create, derivative version, publicly perform and publicly display such Contractor's Information in connection with Company's business operations.”
- Rationale: The licence-back of Contractor's Information embedded in the Works (§ 4(c)) is royalty-free, non-exclusive and perpetual, with an unqualified right to grant sublicences and broad use/copy/modify/derivative rights "in connection with Company's business operations". Nothing makes the grant revocable at Contractor's discretion, and the sublicence right gives us an unrestricted path to extend the licence to our affiliates and to contractors acting on our behalf — better than the fallback, which only requires affiliates to be covered on written notice. The grant is also not labelled non-transferable. Two sub-elements fall short of the fully preferred wording and are noted rather than flagged: the grant is not expressly styled "irrevocable", and there is no express successor-transfer carve-out, since assignment of the Agreement under § 10 (p0042) requires the other party's consent, albeit consent "which will not be unreasonably withheld". Neither is a material failure of the fallback, so no redline is proposed.

### Verifier and repair feedback

- [seq 451](trajectory.jsonl#L451) **Verdict: pass** — Claimed status is compliant and the finding correctly leaves the clause untouched with no comment, which is the expected output for a compliant classification. The cited grant (§ 4(c)) is royalty-free, non-exclusive, perpetual and carries an unqualified sublicence right, so it is not revocable at the Contractor's discretion and is not labelled non-transferable — it clears the walk-away threshold and meets the fallback on material terms. The failed 'affiliates covered by the licence' deterministic check is a phrasing gap, not a material failure: the unrestricted right to grant sublicences supplies the path to extend coverage to affiliates and contractors acting on our behalf, so the walk-away condition ('excluded with no path to add them') does not apply. The rationale accurately and transparently notes the two sub-preferred elements (no express 'irrevocable' label; no successor-transfer carve-out given the consent-based assignment clause at p0042) as observations rather than deviations, consistent with the playbook's classification semantics. No over-flagging: an acceptable fallback-level grant is retained as internal evidence rather than redlined. Checks: {"name":"affiliates covered by the licence","ok":false}; {"name":"no at-will revocation remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 341](trajectory.jsonl#L341)

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

- [seq 371](trajectory.jsonl#L371) **drafter → list_sections**

```json
{}
```

- [seq 372](trajectory.jsonl#L372) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 373](trajectory.jsonl#L373) **drafter → search**

```json
{"query":"audit"}
```

- [seq 374](trajectory.jsonl#L374) **search result**

```json
[]
```

- [seq 401](trajectory.jsonl#L401) **drafter → search**

```json
{"query":"records"}
```

- [seq 402](trajectory.jsonl#L402) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…are, methodologies, tools, specifications, drawings, sketches, models, samples, records and documentation, as well as copyrights, trademarks, servicemarks, ideas, conc…"},{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…ii) Con…
```

- [seq 403](trajectory.jsonl#L403) **drafter → search**

```json
{"query":"inspect"}
```

- [seq 404](trajectory.jsonl#L404) **search result**

```json
[]
```

- [seq 405](trajectory.jsonl#L405) **drafter → search**

```json
{"query":"verif"}
```

- [seq 406](trajectory.jsonl#L406) **search result**

```json
[]
```

- [seq 429](trajectory.jsonl#L429) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 430](trajectory.jsonl#L430) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 431](trajectory.jsonl#L431) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 432](trajectory.jsonl#L432) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 455](trajectory.jsonl#L455) **drafter → search**

```json
{"query":"premises"}
```

- [seq 456](trajectory.jsonl#L456) **search result**

```json
[{"paragraphId":"p0002","sectionRef":"§ Preamble","snippet":"…nsulting services for Company; NOW THEREFORE, in consideration of the foregoing premises, and the mutual covenants and agreements set forth herein, the parties hereto a…"}]
```

- [seq 457](trajectory.jsonl#L457) **drafter → search**

```json
{"query":"access"}
```

- [seq 458](trajectory.jsonl#L458) **search result**

```json
[{"paragraphId":"p0007","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…icable to those working in the facility, and (ii) Company's policies concerning access to and security of any Company computer system to which Contractor may have acc…"},{"paragraphId":"p0007","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…ess to and security of any Company computer system to which Contractor may…
```

- [seq 487](trajectory.jsonl#L487) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0014","p0007"],"quote":"Each invoice submitted by Contractor will provide supporting detail for the Services invoiced, including, to the extent applicable to a particular engagement, the dates of Services and hours worked at the applicable rate by Statement of Work.","rationale":"Searches for \"audit\", \"inspect\", \"verif\", \"records\", \"premises\" and \"access\" return no right for RadialSpark (Contractor) to audit, inspect or verify Clear Capital's records, usage or systems. Section 3 handles fee substantiation the other way round — the Contractor must supply supporting detail with its invoices — and the only system-access language (§1(a), p0007) requires the Contractor to comply with Company's computer-system security policies, i.e. it binds the counterparty, not us. With no audit right imposed on the Customer at all, the position is better than the preferred parameters (frequency, notice, cost, no system access), so there is nothing to limit and no redline is warranted; we would not volunteer an audit right in the Contractor's favour.","confidence":0.86}
```

- [seq 488](trajectory.jsonl#L488) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 487](trajectory.jsonl#L487)
- Finding: `f-audit-3b3f6dda` · **compliant** · confidence 0.86
- Location: § 3 CONTRACTOR'S COMPENSATION.
- Quote: “Each invoice submitted by Contractor will provide supporting detail for the Services invoiced, including, to the extent applicable to a particular engagement, the dates of Services and hours worked at the applicable rate by Statement of Work.”
- Rationale: Searches for "audit", "inspect", "verif", "records", "premises" and "access" return no right for RadialSpark (Contractor) to audit, inspect or verify Clear Capital's records, usage or systems. Section 3 handles fee substantiation the other way round — the Contractor must supply supporting detail with its invoices — and the only system-access language (§1(a), p0007) requires the Contractor to comply with Company's computer-system security policies, i.e. it binds the counterparty, not us. With no audit right imposed on the Customer at all, the position is better than the preferred parameters (frequency, notice, cost, no system access), so there is nothing to limit and no redline is warranted; we would not volunteer an audit right in the Contractor's favour.

### Verifier and repair feedback

- [seq 549](trajectory.jsonl#L549) **Verdict: pass** — Claimed status is compliant with no redline and no comment, which is the expected output shape; the rendered redline is identical to the original paragraphs, so no unwanted edit was introduced. The cited text supports the rationale: p0014 imposes invoice substantiation duties on the Contractor (not audit rights over Customer records), and p0007's only system-access language obliges Contractor personnel to follow Company security policies — it binds the counterparty, not us. Absence of any audit/inspection/verification right against the Customer is more protective than the AUDIT preferred parameters (frequency, notice, cost, no system access), so there is nothing to limit; proposing an audit right would introduce a counterparty benefit and is correctly avoided. The failed 'audit frequency limited' deterministic check is a false signal here — it can only match where an audit clause exists, and none does in this agreement. Checks: {"name":"audit frequency limited","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 395](trajectory.jsonl#L395)

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

- [seq 421](trajectory.jsonl#L421) **drafter → list_sections**

```json
{}
```

- [seq 422](trajectory.jsonl#L422) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 423](trajectory.jsonl#L423) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 424](trajectory.jsonl#L424) **search result**

```json
[]
```

- [seq 445](trajectory.jsonl#L445) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 446](trajectory.jsonl#L446) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 447](trajectory.jsonl#L447) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 448](trajectory.jsonl#L448) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 471](trajectory.jsonl#L471) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 472](trajectory.jsonl#L472) **search result**

```json
[]
```

- [seq 473](trajectory.jsonl#L473) **drafter → search**

```json
{"query":"interest"}
```

- [seq 474](trajectory.jsonl#L474) **search result**

```json
[{"paragraphId":"p0033","sectionRef":"§ 6 TERMINATION.","snippet":"…r shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress."},{"paragraphId":"p0044","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…tor shall provide to Company, and will assigns to Company, all right, title and interest to any Works i…
```

- [seq 509](trajectory.jsonl#L509) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 510](trajectory.jsonl#L510) **search result**

```json
[]
```

- [seq 511](trajectory.jsonl#L511) **drafter → search**

```json
{"query":"cancel"}
```

- [seq 512](trajectory.jsonl#L512) **search result**

```json
[]
```

- [seq 545](trajectory.jsonl#L545) **drafter → search**

```json
{"query":"Company shall pay"}
```

- [seq 546](trajectory.jsonl#L546) **search result**

```json
[]
```

- [seq 570](trajectory.jsonl#L570) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0032","p0033","p0013"],"quote":"Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination.","rationale":"The Agreement imposes no liquidated damages, penalties, kill fees or minimum/early-termination charges on Clear Capital. Termination for convenience (§ 6(a)) requires only fifteen days' notice with no exit payment, and termination for breach (§ 6(b)) limits our exposure to fees and expenses actually incurred or earned through the termination date. Compensation in § 3 is pure time-and-materials with no minimum commitment, and searches for \"liquidated damages\", \"penalty\", \"minimum\", \"cancel\" and late-payment interest return nothing. This meets the preferred position (no liquidated damages or penalties payable by Customer), so no redline is needed.","confidence":0.9}
```

- [seq 571](trajectory.jsonl#L571) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 570](trajectory.jsonl#L570)
- Finding: `f-ld-ec7809ee` · **compliant** · confidence 0.90
- Location: § 6 TERMINATION.
- Quote: “Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination.”
- Rationale: The Agreement imposes no liquidated damages, penalties, kill fees or minimum/early-termination charges on Clear Capital. Termination for convenience (§ 6(a)) requires only fifteen days' notice with no exit payment, and termination for breach (§ 6(b)) limits our exposure to fees and expenses actually incurred or earned through the termination date. Compensation in § 3 is pure time-and-materials with no minimum commitment, and searches for "liquidated damages", "penalty", "minimum", "cancel" and late-payment interest return nothing. This meets the preferred position (no liquidated damages or penalties payable by Customer), so no redline is needed.

### Verifier and repair feedback

- [seq 598](trajectory.jsonl#L598) **Verdict: pass** — Claimed status is compliant and the cited paragraphs support it: §6(a) allows termination for convenience on 15 days' notice with no exit payment, §6(b) limits Customer's exposure on breach termination to fees/expenses actually incurred or earned, and §3 compensation is pure time-and-materials with no minimum commitment. No liquidated damages, penalty, kill fee, or minimum/early-termination charge payable by the Customer appears in the cited text, so the preferred position (no Customer-payable LDs) is met. Consistent with a compliant finding, no redline and no counterparty comment were proposed; the redline is byte-identical to the original and no deterministic checks failed. Rationale is accurate and appropriately notes this is retained as internal evidence rather than a negotiation issue; no over-flagging. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 419](trajectory.jsonl#L419)

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

- [seq 437](trajectory.jsonl#L437) **drafter → read_section**

```json
{"sectionId":"sec-5"}
```

- [seq 438](trajectory.jsonl#L438) **read_section result**

```json
{"sectionRef":"§ 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER.","paragraphs":[{"id":"p0023","text":"5. CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER."},{"id":"p0024","text":"(a) Contractor represents and warrants to Company that Contractor's performance of the Services called for by this Agreement, to its knowledge, does not and shall not violate any…
```

- [seq 439](trajectory.jsonl#L439) **drafter → list_sections**

```json
{}
```

- [seq 440](trajectory.jsonl#L440) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 465](trajectory.jsonl#L465) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 466](trajectory.jsonl#L466) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 467](trajectory.jsonl#L467) **drafter → search**

```json
{"query":"workmanlike"}
```

- [seq 468](trajectory.jsonl#L468) **search result**

```json
[{"paragraphId":"p0005","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…de sufficient qualified personnel to perform the Services in a professional and workmanlike manner in accordance with industry standards. A Statement of Work may designate…"}]
```

- [seq 497](trajectory.jsonl#L497) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 498](trajectory.jsonl#L498) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 499](trajectory.jsonl#L499) **drafter → search**

```json
{"query":"conform"}
```

- [seq 500](trajectory.jsonl#L500) **search result**

```json
[]
```

- [seq 527](trajectory.jsonl#L527) **drafter → search**

```json
{"query":"accept"}
```

- [seq 528](trajectory.jsonl#L528) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…all not be bound by any change requested by Company, until such change has been accepted in writing by Contractor."},{"paragraphId":"p0016","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"paragraphId":"p0048","sectionRef…
```

- [seq 529](trajectory.jsonl#L529) **drafter → search**

```json
{"query":"refund"}
```

- [seq 530](trajectory.jsonl#L530) **search result**

```json
[]
```

- [seq 568](trajectory.jsonl#L568) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"Services/deliverables conformance warranty with 90-day period and re-performance/refund remedy; consulting agreement"}
```

- [seq 573](trajectory.jsonl#L573) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-warranty","source":"Evergreen Implementation SOW (Jun 2025)","clauseAfter":"Vendor warrants for ninety days that the Services will be professional and workmanlike, with re-performance, repair, replacement or refund as the remedy.","comment":"[Playbook] We added a meaningful performance warranty and remedy for non-conforming work.","level":"fallback"}]}
```

- [seq 594](trajectory.jsonl#L594) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-warranty","summary":"Add express performance/conformance warranty with 90-day period and re-performance, repair/replacement or refund remedy","comment":"[Playbook] Section 5 contains no express warranty that the Services or Works will conform to the Specifications and no remedy for non-conforming work, so we have added our standard 90-day conformance warranty with re-performance, repair/replacement or refund. We can accept a 30-day period for Services as a fallback if needed.","ops":[{"kind":"insert_after","paragraphId":"p0030","numbering":"(f)","text":"Contractor represents and warrants to Company that (i) the Services will be performed in a professional and workmanlike manner consistent with industry standards; (ii) for a period of ninety (90) days following delivery, each Work (including any software deliverable) will conform in all material respects to the applicable Specifications and documentation; and (iii) the Works will not contain any virus, malicious code or other disabling device. Company's remedy for breach of this warranty is, at Contractor's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Work, or a refund of the fees paid for the non-conforming Services or Work. The disclaimer in Paragraph 5(e) does not limit the express warranties set forth in this Paragraph 5."}]}
```

- [seq 595](trajectory.jsonl#L595) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0030","segments":[{"type":"equal","text":"(e) THE EXPRESS WARRANTIES IN THIS AGREEMENT SHALL BE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE."}]}]}
```

- [seq 615](trajectory.jsonl#L615) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0024","p0025","p0026","p0030","p0005"],"quote":"(e) THE EXPRESS WARRANTIES IN THIS AGREEMENT SHALL BE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE.","rationale":"Section 5's warranties are limited to legal compliance, authority/rights, non-infringement and anti-bribery; there is no express warranty that the Services or Works will conform to the Specifications, no warranty period (whether 12 months, 90 days or 30 days), and no repair/replace/re-perform/refund remedy. Section 1(b) requires performance in a professional and workmanlike manner in accordance with industry standards, which covers only one preferred element, and the Section 4 \"ACCEPTANCE\" heading has no operative acceptance or cure mechanic. Because the disclaimer in 5(e) also strips implied warranties (merchantability, fitness), Clear Capital is left with no conformance warranty at all — below the fallback (90 days software / 30 days services with remedies). We therefore insert a 90-day conformance warranty with a re-performance/repair/replacement/refund remedy, a no-malicious-code warranty, and an express confirmation that 5(e) does not cut back these express warranties.","proposal":{"level":"preferred","precedentId":"seed-warranty","summary":"Add express performance/conformance warranty with 90-day period and re-performance, repair/replacement or refund remedy","comment":"[Playbook] Section 5 contains no express warranty that the Services or Works will conform to the Specifications and no remedy for non-conforming work, so we have added our standard 90-day conformance warranty with re-performance, repair/replacement or refund. We can accept a 30-day period for Services as a fallback if needed.","ops":[{"kind":"insert_after","paragraphId":"p0030","numbering":"(f)","text":"Contractor represents and warrants to Company that (i) the Services will be performed in a professional and workmanlike manner consistent with industry standards; (ii) for a period of ninety (90) days following delivery, each Work (including any software deliverable) will conform in all material respects to the applicable Specifications and documentation; and (iii) the Works will not contain any virus, malicious code or other disabling device. Company's remedy for breach of this warranty is, at Contractor's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Work, or a refund of the fees paid for the non-conforming Services or Work. The disclaimer in Paragraph 5(e) does not limit the express warranties set forth in this Paragraph 5."}]}}
```

- [seq 616](trajectory.jsonl#L616) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 630](trajectory.jsonl#L630) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0024","p0025","p0026","p0030","p0005"],"quote":"(e) THE EXPRESS WARRANTIES IN THIS AGREEMENT SHALL BE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE.","rationale":"Section 5's warranties are limited to legal compliance, authority/rights, non-infringement and anti-bribery; there is no express warranty that the Services or Works will conform to the Specifications, no warranty period (whether 12 months, 90 days or 30 days), and no repair/replace/re-perform/refund remedy. Section 1(b) requires performance in a professional and workmanlike manner in accordance with industry standards, which covers only one preferred element, and the Section 4 \"ACCEPTANCE\" heading has no operative acceptance or cure mechanic. Because the disclaimer in 5(e) also strips implied warranties (merchantability, fitness), Clear Capital is left with no conformance warranty at all — below the fallback (90 days software / 30 days services with remedies). We therefore insert a 90-day conformance warranty with a re-performance/repair/replacement/refund remedy, a no-malicious-code warranty, and an express confirmation that 5(e) does not cut back these express warranties.","confidence":0.83,"proposal":{"level":"preferred","precedentId":"seed-warranty","summary":"Add express performance/conformance warranty with 90-day period and re-performance, repair/replacement or refund remedy","comment":"[Playbook] Section 5 contains no express warranty that the Services or Works will conform to the Specifications and no remedy for non-conforming work, so we have added our standard 90-day conformance warranty with re-performance, repair/replacement or refund. We can accept a 30-day period for Services as a fallback if needed.","ops":[{"kind":"insert_after","paragraphId":"p0030","numbering":"(f)","text":"Contractor represents and warrants to Company that (i) the Services will be performed in a professional and workmanlike manner consistent with industry standards; (ii) for a period of ninety (90) days following delivery, each Work (including any software deliverable) will conform in all material respects to the applicable Specifications and documentation; and (iii) the Works will not contain any virus, malicious code or other disabling device. Company's remedy for breach of this warranty is, at Contractor's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Work, or a refund of the fees paid for the non-conforming Services or Work. The disclaimer in Paragraph 5(e) does not limit the express warranties set forth in this Paragraph 5."}]}}
```

- [seq 631](trajectory.jsonl#L631) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 630](trajectory.jsonl#L630)
- Finding: `f-warranty-91273c50` · **deviation** · confidence 0.83
- Location: § 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DI…
- Quote: “(e) THE EXPRESS WARRANTIES IN THIS AGREEMENT SHALL BE IN LIEU OF ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE.”
- Rationale: Section 5's warranties are limited to legal compliance, authority/rights, non-infringement and anti-bribery; there is no express warranty that the Services or Works will conform to the Specifications, no warranty period (whether 12 months, 90 days or 30 days), and no repair/replace/re-perform/refund remedy. Section 1(b) requires performance in a professional and workmanlike manner in accordance with industry standards, which covers only one preferred element, and the Section 4 "ACCEPTANCE" heading has no operative acceptance or cure mechanic. Because the disclaimer in 5(e) also strips implied warranties (merchantability, fitness), Clear Capital is left with no conformance warranty at all — below the fallback (90 days software / 30 days services with remedies). We therefore insert a 90-day conformance warranty with a re-performance/repair/replacement/refund remedy, a no-malicious-code warranty, and an express confirmation that 5(e) does not cut back these express warranties.
- Proposal: **preferred** — Add express performance/conformance warranty with 90-day period and re-performance, repair/replacement or refund remedy
- Comment: [Playbook] Section 5 contains no express warranty that the Services or Works will conform to the Specifications and no remedy for non-conforming work, so we have added our standard 90-day conformance warranty with re-performance, repair/replacement or refund. We can accept a 30-day period for Services as a fallback if needed.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(f)",
    "paragraphId": "p0030",
    "text": "Contractor represents and warrants to Company that (i) the Services will be performed in a professional and workmanlike manner consistent with industry standards; (ii) for a period of ninety (90) days following delivery, each Work (including any software deliverable) will conform in all material respects to the applicable Specifications and documentation; and (iii) the Works will not contain any virus, malicious code or other disabling device. Company's remedy for breach of this warranty is, at Contractor's option, re-performance of the non-conforming Services, repair or replacement of the non-conforming Work, or a refund of the fees paid for the non-conforming Services or Work. The disclaimer in Paragraph 5(e) does not limit the express warranties set forth in this Paragraph 5."
  }
]
```

### Verifier and repair feedback

- [seq 647](trajectory.jsonl#L647) **Verdict: pass** — The cited warranty section (p0024–p0026) covers only legal compliance, authority/rights and non-infringement, with no conformance warranty, no warranty period and no repair/replace/re-perform/refund remedy; combined with the implied-warranty disclaimer in 5(e), the clause falls below even the fallback (90 days software / 30 days services with remedies), so 'deviation' is correctly classified. The redline is actionable and proportionate: it inserts a 90-day conformance warranty tied to the defined Specifications, the professional/workmanlike standard, a no-malicious-code warranty, the re-performance/repair/replacement/refund remedy, and an express carve-out so 5(e) does not swallow the new express warranties — matching the rule's redline guidance without disturbing existing counterparty-favorable text. The failed deterministic period check is a false negative: the inserted text expressly states 'for a period of ninety (90) days following delivery', which satisfies the fallback period; the placement immediately after 5(e) with a cross-reference disclaiming any cut-back is workable even though a slot inside the warranty list would be tidier. Comment is accurate, concise, in first person plural with the required prefix, states what changed and why, and offers the 30-day services fallback as the playbook contemplates. Checks: {"name":"operation 1 applies","ok":true}; {"name":"warranty period ≥ 90 days or expressed in months/years","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 453](trajectory.jsonl#L453)

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

- [seq 481](trajectory.jsonl#L481) **drafter → list_sections**

```json
{}
```

- [seq 482](trajectory.jsonl#L482) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 483](trajectory.jsonl#L483) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 484](trajectory.jsonl#L484) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"14. INSURANCE. Throughout the term of this Agreement, Contractor shall maintain workers compe…"},{"paragraphId":"p0048","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"…hout the term of this Agreement, Contractor shall maintain workers compensation …
```

- [seq 515](trajectory.jsonl#L515) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0047","p0048","p0049"]}
```

- [seq 516](trajectory.jsonl#L516) **read_paragraphs result**

```json
[{"id":"p0047","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"13. NON-SOLICITATION OF EMPLOYEES. Neither party shall, during the term of this Agreement and for one (1) year after its termination, solicit for hire as an employee, consultant or otherwise any of the other party's personnel who have had direct involvement with the Services, without such other part…
```

- [seq 539](trajectory.jsonl#L539) **drafter → search**

```json
{"query":"Customer Data personal data"}
```

- [seq 540](trajectory.jsonl#L540) **search result**

```json
[]
```

- [seq 541](trajectory.jsonl#L541) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 542](trajectory.jsonl#L542) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 564](trajectory.jsonl#L564) **drafter → search**

```json
{"query":"Confidential Information","limit":10}
```

- [seq 565](trajectory.jsonl#L565) **search result**

```json
[{"paragraphId":"p0038","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"8. CONFIDENTIAL INFORMATION. \"Confidential Information\" means all documents, software, reports, data, recor…"},{"paragraphId":"p0038","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","snippet":"8. CONFIDENTIAL INFORMATION. \"Confidential Information\" means a…
```

- [seq 582](trajectory.jsonl#L582) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"Consulting services agreement; existing insurance clause with workers comp, CGL $1M, E&O $1M; no cyber liability"}
```

- [seq 587](trajectory.jsonl#L587) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-insurance","source":"Redwood Facilities Services MSA (Jul 2025)","clauseAfter":"Vendor shall maintain commercial general liability, professional liability and cyber liability insurance and provide certificates on request.","comment":"[Playbook] We added standard coverage appropriate for a vendor accessing our data and premises.","level":"preferred"}]}
```

- [seq 588](trajectory.jsonl#L588) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0038"]}
```

- [seq 589](trajectory.jsonl#L589) **read_paragraphs result**

```json
[{"id":"p0038","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"8. CONFIDENTIAL INFORMATION. \"Confidential Information\" means all documents, software, reports, data, records, forms, conversations and other materials obtained by Contractor from Company in the course of performing any Services (including, but not limited to, Company records and information). Not…
```

- [seq 605](trajectory.jsonl#L605) **drafter → propose_redline**

```json
{"level":"fallback","precedentId":"seed-insurance","summary":"Add cyber/privacy liability insurance (USD 2M) to Contractor's insurance covenant","comment":"[Playbook] Contractor accesses our systems and Confidential Information, so we have added cyber/privacy liability cover at USD 2,000,000 alongside the existing coverages; our preferred position is USD 5,000,000 where Company data is processed, but we are content with USD 2,000,000 given the scope of the Services.","ops":[{"kind":"replace","paragraphId":"p0048","oldText":"coverage of at least one million dollars ($1,000,000), in connection with","newText":"coverage of at least one million dollars ($1,000,000), and cyber liability (including privacy and data breach) insurance with coverage of at least two million dollars ($2,000,000), in connection with"}]}
```

- [seq 606](trajectory.jsonl#L606) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0048","segments":[{"type":"equal","text":"14. INSURANCE. Throughout the term of this Agreement, Contractor shall maintain workers compensation insurance in the amount required by statute, comprehensive general liability insurance with coverage of at least one million dollars ($1,000,000) and professional errors and omissions insurance for bodily…
```

- [seq 619](trajectory.jsonl#L619) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0048"],"quote":"14. INSURANCE. Throughout the term of this Agreement, Contractor shall maintain workers compensation insurance in the amount required by statute, comprehensive general liability insurance with coverage of at least one million dollars ($1,000,000) and professional errors and omissions insurance for bodily injury, property damage or other losses with coverage of at least one million dollars ($1,000,000), in connection with the provision of Services by Contractor pursuant to the terms of this Agreement.","rationale":"An insurance covenant exists (Section 14): workers' compensation as required by statute, CGL of USD 1M, E&O of USD 1M, plus certificates and notice of material change on Company request. That satisfies the workers' comp, CGL and certificate elements and the fallback E&O level, but it contains no cyber/privacy cover at all, and the fallback requires cyber of at least USD 2M. Contractor's personnel work at Company facilities, access Company computer systems and handle Confidential Information including Company records and information, so cyber cover is material rather than a minor sub-element. Minimal fix: add cyber liability (privacy/data breach) at USD 2,000,000 into the existing list, i.e. the fallback level, since the existing bargain is set at USD 1M coverages and the preferred USD 5M cyber (and USD 2M E&O / USD 2M CGL aggregate) would be disproportionate for this consulting scope; the shortfall against those preferred limits is noted but not pressed.","confidence":0.72,"proposal":{"level":"fallback","precedentId":"seed-insurance","summary":"Add cyber/privacy liability insurance (USD 2M) to Contractor's insurance covenant","comment":"[Playbook] Contractor accesses our systems and Confidential Information, so we have added cyber/privacy liability cover at USD 2,000,000 alongside the existing coverages; our preferred position is USD 5,000,000 where Company data is processed, but we are content with USD 2,000,000 given the scope of the Services.","ops":[{"kind":"replace","paragraphId":"p0048","oldText":"coverage of at least one million dollars ($1,000,000), in connection with","newText":"coverage of at least one million dollars ($1,000,000), and cyber liability (including privacy and data breach) insurance with coverage of at least two million dollars ($2,000,000), in connection with"}]}}
```

- [seq 620](trajectory.jsonl#L620) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 619](trajectory.jsonl#L619)
- Finding: `f-insurance-982d8a99` · **deviation** · confidence 0.72
- Location: § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.
- Quote: “14. INSURANCE. Throughout the term of this Agreement, Contractor shall maintain workers compensation insurance in the amount required by statute, comprehensive general liability insurance with coverage of at least one million dollars ($1,000,000) and professional errors and omissions insurance for bodily injury, property damage or other losses with coverage of at least one million dollars ($1,000,000), in connection with the provision of Services by Contractor pursuant to the terms of this Agreement.”
- Rationale: An insurance covenant exists (Section 14): workers' compensation as required by statute, CGL of USD 1M, E&O of USD 1M, plus certificates and notice of material change on Company request. That satisfies the workers' comp, CGL and certificate elements and the fallback E&O level, but it contains no cyber/privacy cover at all, and the fallback requires cyber of at least USD 2M. Contractor's personnel work at Company facilities, access Company computer systems and handle Confidential Information including Company records and information, so cyber cover is material rather than a minor sub-element. Minimal fix: add cyber liability (privacy/data breach) at USD 2,000,000 into the existing list, i.e. the fallback level, since the existing bargain is set at USD 1M coverages and the preferred USD 5M cyber (and USD 2M E&O / USD 2M CGL aggregate) would be disproportionate for this consulting scope; the shortfall against those preferred limits is noted but not pressed.
- Proposal: **fallback** — Add cyber/privacy liability insurance (USD 2M) to Contractor's insurance covenant
- Comment: [Playbook] Contractor accesses our systems and Confidential Information, so we have added cyber/privacy liability cover at USD 2,000,000 alongside the existing coverages; our preferred position is USD 5,000,000 where Company data is processed, but we are content with USD 2,000,000 given the scope of the Services.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "coverage of at least one million dollars ($1,000,000), and cyber liability (including privacy and data breach) insurance with coverage of at least two million dollars ($2,000,000), in connection with",
    "oldText": "coverage of at least one million dollars ($1,000,000), in connection with",
    "paragraphId": "p0048"
  }
]
```

### Verifier and repair feedback

- [seq 642](trajectory.jsonl#L642) **Verdict: pass** — Classification is defensible: the existing Section 14 meets workers' comp, CGL, E&O 1M and certificate elements but contains no cyber/privacy cover, and the playbook fallback expressly requires cyber of at least USD 2M — so the clause fails the fallback on a material term rather than a minor sub-element. The redline is a targeted insertion of 'cyber liability (including privacy and data breach) insurance with coverage of at least two million dollars ($2,000,000)' into the existing coverage list, leaving all other clause mechanics intact; this is the smallest edit that reaches the fallback position. The advisory changed-character ratio (0.633) overstates the intervention — the rendered redline shows only an added phrase within the same sentence structure, so the minimal-edit concern is not substantiated. Comment is accurate, concise, in the required voice and prefix; it states what was added, cites the preferred USD 5M position and explains acceptance of the USD 2M fallback given the consulting scope, without lecturing. Directionally correct for the Customer: the edit adds protection without expanding our obligations, and the finding does not duplicate another rule's commercial term. Checks: {"name":"operation 1 applies","ok":true}; {"name":"insurance obligation present","ok":true}; {"name":"minimal edit p0048","ok":false,"detail":"changed-character ratio=0.633 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 463](trajectory.jsonl#L463)

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

- [seq 491](trajectory.jsonl#L491) **drafter → list_sections**

```json
{}
```

- [seq 492](trajectory.jsonl#L492) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 493](trajectory.jsonl#L493) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 494](trajectory.jsonl#L494) **search result**

```json
[]
```

- [seq 521](trajectory.jsonl#L521) **drafter → read_section**

```json
{"sectionId":"sec-3"}
```

- [seq 522](trajectory.jsonl#L522) **read_section result**

```json
{"sectionRef":"§ 3 CONTRACTOR'S COMPENSATION.","paragraphs":[{"id":"p0012","text":"3. CONTRACTOR'S COMPENSATION."},{"id":"p0013","text":"(a) During the term of this Agreement, Company agrees to compensate Contractor as set forth in each Statement of Work. Contractor will be compensated on a time and materials. In addition, Company shall reimburse Contractor its actual out-of-pocket expenses as re…
```

- [seq 523](trajectory.jsonl#L523) **drafter → read_section**

```json
{"sectionId":"sec-1"}
```

- [seq 524](trajectory.jsonl#L524) **read_section result**

```json
{"sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","paragraphs":[{"id":"p0003","text":"1. PURPOSE OF ENGAGEMENT."},{"id":"p0004","text":"(a) Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\"), and Contractor agrees to furnish the Services on the terms and subject to the conditions set forth in this Agreement. During the term of t…
```

- [seq 552](trajectory.jsonl#L552) **drafter → search**

```json
{"query":"commit"}
```

- [seq 553](trajectory.jsonl#L553) **search result**

```json
[]
```

- [seq 554](trajectory.jsonl#L554) **drafter → search**

```json
{"query":"exclusive|retainer|shortfall|take or pay|volume|guarantee","regex":true}
```

- [seq 555](trajectory.jsonl#L555) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"… Services shall not be deemed to be Works and are and shall remain the sole and exclusive property of Contractor and Company shall not resell or make use of said propert…"},{"paragraphId":"p0021","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…matio…
```

- [seq 576](trajectory.jsonl#L576) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 577](trajectory.jsonl#L577) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 601](trajectory.jsonl#L601) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0004","p0013"],"quote":"Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the \"Services\")","rationale":"The engagement is structured task-by-task under individual Statements of Work, and compensation under § 3(a) is on a time and materials basis for Services actually performed plus reimbursable expenses. A full-text search for \"minimum\", \"commit\", \"shortfall\", \"take or pay\", \"volume\", \"retainer\" and \"guarantee\" returns no purchase-commitment, minimum-hours or take-or-pay language, and no volume caps on Company's usage. This meets the preferred position (no minimum commitment; fees for ordered services only). Separately, § 6(a) permits Company to terminate for convenience on fifteen days' notice when no Statement of Work is outstanding, so no take-or-pay exposure arises even if a future SOW were added — though we would review any SOW that introduces committed hours or a retainer under this rule.","confidence":0.9}
```

- [seq 602](trajectory.jsonl#L602) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 601](trajectory.jsonl#L601)
- Finding: `f-mincommit-2d106da6` · **compliant** · confidence 0.90
- Location: § 1 PURPOSE OF ENGAGEMENT.
- Quote: “Company agrees to retain Contractor to perform the consulting services for Company, on a task by task basis (the "Services")”
- Rationale: The engagement is structured task-by-task under individual Statements of Work, and compensation under § 3(a) is on a time and materials basis for Services actually performed plus reimbursable expenses. A full-text search for "minimum", "commit", "shortfall", "take or pay", "volume", "retainer" and "guarantee" returns no purchase-commitment, minimum-hours or take-or-pay language, and no volume caps on Company's usage. This meets the preferred position (no minimum commitment; fees for ordered services only). Separately, § 6(a) permits Company to terminate for convenience on fifteen days' notice when no Statement of Work is outstanding, so no take-or-pay exposure arises even if a future SOW were added — though we would review any SOW that introduces committed hours or a retainer under this rule.

### Verifier and repair feedback

- [seq 627](trajectory.jsonl#L627) **Verdict: pass** — Claimed status is compliant and the cited text supports it: § 2(a) engages Contractor on a task-by-task basis under individual SOWs and § 3(a) provides time-and-materials compensation plus actual expenses, with no minimum, shortfall, take-or-pay or volume-cap language. No redline or counterparty comment was proposed, which is the correct output for a compliant finding; the rendered redline is identical to the original paragraphs and no deterministic checks failed. Rationale correctly maps the clause to the preferred position (fees for ordered services only) and flags the practical follow-up (review any future SOW introducing committed hours or a retainer) as a note rather than a deviation; the passing reference to § 6(a) termination for convenience is supporting context and does not affect the classification. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 479](trajectory.jsonl#L479)

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

- [seq 503](trajectory.jsonl#L503) **drafter → list_sections**

```json
{}
```

- [seq 504](trajectory.jsonl#L504) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":3},{"id":"sec-1","number":"1","heading":"PURPOSE OF ENGAGEMENT.","level":1,"paragraphCount":9},{"id":"sec-3","number":"3","heading":"CONTRACTOR'S COMPENSATION.","level":1,"paragraphCount":4},{"id":"sec-4","number":"4","heading":"OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","level":1,"paragraphCount":7},{"id":"sec-5"…
```

- [seq 505](trajectory.jsonl#L505) **drafter → read_section**

```json
{"sectionId":"sec-6"}
```

- [seq 506](trajectory.jsonl#L506) **read_section result**

```json
{"sectionRef":"§ 6 TERMINATION.","paragraphs":[{"id":"p0031","text":"6. TERMINATION."},{"id":"p0032","text":"(a) At any time that there is no uncompleted Statement of Work outstanding, either party may terminate this Agreement for any or no reason upon fifteen (15) days advance notice to the other."},{"id":"p0033","text":"(b) In addition, either party may terminate this Agreement or any outstandi…
```

- [seq 533](trajectory.jsonl#L533) **drafter → read_section**

```json
{"sectionId":"sec-4"}
```

- [seq 534](trajectory.jsonl#L534) **read_section result**

```json
{"sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","paragraphs":[{"id":"p0016","text":"4. OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE."},{"id":"p0017","text":"(a) The parties agree that all drawings, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Cont…
```

- [seq 535](trajectory.jsonl#L535) **drafter → search**

```json
{"query":"data","limit":30}
```

- [seq 536](trajectory.jsonl#L536) **search result**

```json
[{"paragraphId":"p0017","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…s, documents, designs, models, inventions, computer programs, computer systems, data, computer documentation and other tangible materials authored or prepared by Co…"},{"paragraphId":"p0020","sectionRef":"§ 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE.","snippet":"…, trademar…
```

- [seq 558](trajectory.jsonl#L558) **drafter → search**

```json
{"query":"return","limit":20}
```

- [seq 559](trajectory.jsonl#L559) **search result**

```json
[]
```

- [seq 560](trajectory.jsonl#L560) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0038","p0039","p0040","p0041"]}
```

- [seq 561](trajectory.jsonl#L561) **read_paragraphs result**

```json
[{"id":"p0038","sectionRef":"§ 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.","text":"8. CONFIDENTIAL INFORMATION. \"Confidential Information\" means all documents, software, reports, data, records, forms, conversations and other materials obtained by Contractor from Company in the course of performing any Services (including, but not limited to, Company records and information). Not…
```

- [seq 584](trajectory.jsonl#L584) **drafter → search**

```json
{"query":"transition|delet|export|wind-down|copies","regex":true,"limit":20}
```

- [seq 585](trajectory.jsonl#L585) **search result**

```json
[{"paragraphId":"p0007","sectionRef":"§ 1 PURPOSE OF ENGAGEMENT.","snippet":"…Contractor may have access; provided, that Company has provided Contractor with copies of such rules and policies or has advised Contractor of the existence of such r…"}]
```

- [seq 586](trajectory.jsonl#L586) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Services agreement, no transition or data return clause; inserting into termination section"}
```

- [seq 591](trajectory.jsonl#L591) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-transition","source":"Silverline Data Platform MSA (Dec 2025)","clauseAfter":"Vendor will return Customer Data in a machine-readable format within thirty days, provide transition assistance for up to six months and then certify deletion.","comment":"[Playbook] We added an orderly data return and transition period before deletion.","level":"preferred"}]}
```

- [seq 609](trajectory.jsonl#L609) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-transition","summary":"Insert transition assistance, data return and certified deletion obligations in Section 6 (Termination)","comment":"[Playbook] We added an orderly exit provision because the Agreement is silent on what happens to our data and work in progress at termination: Contractor gives us up to six months of transition assistance at its then-current rates, returns our data in a machine-readable format within thirty days, and then deletes and certifies deletion. We can accept a 90-day assistance period as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0033","numbering":"(c)","text":"(c) Upon expiry or termination of this Agreement or any Statement of Work for any reason, Contractor shall (i) at Company's request, provide reasonable transition assistance for up to six (6) months at Contractor's then-current rates; (ii) within thirty (30) days, return to Company all Works, Confidential Information and other data and materials of Company in Contractor's possession or control, in a commonly used, machine-readable format; and (iii) thereafter delete all such data and materials from its systems and certify such deletion to Company in writing."}]}
```

- [seq 610](trajectory.jsonl#L610) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0033","segments":[{"type":"equal","text":"(b) In addition, either party may terminate this Agreement or any outstanding Statement of Work, upon fifteen (15) days written notice to the other party, in the event such other party breaches a material term of this Agreement or any Statement of Work and such breach remains uncured at the end of such f…
```

- [seq 623](trajectory.jsonl#L623) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0032","p0033"],"quote":"(b) In addition, either party may terminate this Agreement or any outstanding Statement of Work, upon fifteen (15) days written notice to the other party, in the event such other party breaches a material term of this Agreement or any Statement of Work and such breach remains uncured at the end of such fifteen (15) day period. Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress.","rationale":"Section 6 (Termination) addresses only notice periods, payment of accrued fees and assignment of Works in progress; it contains no transition assistance, data return/export or deletion obligations. Section 4 covers ownership of Works but not their delivery or the return of Company data on exit, and the confidentiality provision (p0038–p0040) imposes only use/disclosure restrictions with no return-or-destroy mechanic. Searches for transition, export, deletion, return and copies found nothing relevant, so no usable clause exists anywhere in the Agreement. Recorded as missing and inserted the preferred position (six months' assistance at then-current rates, return within 30 days in machine-readable format, then certified deletion) as a new § 6(c); a 90-day assistance period is available as a fallback.","confidence":0.88,"proposal":{"level":"preferred","precedentId":"seed-transition","summary":"Insert transition assistance, data return and certified deletion obligations in Section 6 (Termination)","comment":"[Playbook] We added an orderly exit provision because the Agreement is silent on what happens to our data and work in progress at termination: Contractor gives us up to six months of transition assistance at its then-current rates, returns our data in a machine-readable format within thirty days, and then deletes and certifies deletion. We can accept a 90-day assistance period as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0033","numbering":"(c)","text":"(c) Upon expiry or termination of this Agreement or any Statement of Work for any reason, Contractor shall (i) at Company's request, provide reasonable transition assistance for up to six (6) months at Contractor's then-current rates; (ii) within thirty (30) days, return to Company all Works, Confidential Information and other data and materials of Company in Contractor's possession or control, in a commonly used, machine-readable format; and (iii) thereafter delete all such data and materials from its systems and certify such deletion to Company in writing."}]}}
```

- [seq 624](trajectory.jsonl#L624) **submit_finding result**

```json
{"ok":false,"errors":["quote exceeds 600 characters"]}
```

- [seq 638](trajectory.jsonl#L638) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0032","p0033"],"quote":"Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress.","rationale":"Section 6 (Termination) addresses only notice periods, payment of accrued fees and assignment of Works in progress; it contains no transition assistance, data return/export or deletion obligations. Section 4 covers ownership of Works but not their delivery or the return of Company data on exit, and the confidentiality provision (p0038-p0040) imposes only use/disclosure restrictions with no return-or-destroy mechanic. Searches for transition, export, deletion, return and copies found nothing relevant, so no usable clause exists anywhere in the Agreement. Recorded as missing and inserted the preferred position (six months' assistance at then-current rates, return within 30 days in machine-readable format, then certified deletion) as a new Section 6(c); a 90-day assistance period is available as a fallback.","confidence":0.88,"proposal":{"level":"preferred","precedentId":"seed-transition","summary":"Insert transition assistance, data return and certified deletion obligations in Section 6 (Termination)","comment":"[Playbook] We added an orderly exit provision because the Agreement is silent on what happens to our data and work in progress at termination: Contractor gives us up to six months of transition assistance at its then-current rates, returns our data in a machine-readable format within thirty days, and then deletes and certifies deletion. We can accept a 90-day assistance period as a fallback.","ops":[{"kind":"insert_after","paragraphId":"p0033","numbering":"(c)","text":"(c) Upon expiry or termination of this Agreement or any Statement of Work for any reason, Contractor shall (i) at Company's request, provide reasonable transition assistance for up to six (6) months at Contractor's then-current rates; (ii) within thirty (30) days, return to Company all Works, Confidential Information and other data and materials of Company in Contractor's possession or control, in a commonly used, machine-readable format; and (iii) thereafter delete all such data and materials from its systems and certify such deletion to Company in writing."}]}}
```

- [seq 639](trajectory.jsonl#L639) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 638](trajectory.jsonl#L638)
- Finding: `f-transition-da44b0df` · **missing** · confidence 0.88
- Location: § 6 TERMINATION.
- Quote: “Upon any such termination, Contractor will be paid all fees and expenses that have been incurred or earned in connection with the performance of the Services through the effective date of such termination. Contractor shall provide to Company, and hereby assigns to Company, all right, title and interest to any Works in progress.”
- Rationale: Section 6 (Termination) addresses only notice periods, payment of accrued fees and assignment of Works in progress; it contains no transition assistance, data return/export or deletion obligations. Section 4 covers ownership of Works but not their delivery or the return of Company data on exit, and the confidentiality provision (p0038-p0040) imposes only use/disclosure restrictions with no return-or-destroy mechanic. Searches for transition, export, deletion, return and copies found nothing relevant, so no usable clause exists anywhere in the Agreement. Recorded as missing and inserted the preferred position (six months' assistance at then-current rates, return within 30 days in machine-readable format, then certified deletion) as a new Section 6(c); a 90-day assistance period is available as a fallback.
- Proposal: **preferred** — Insert transition assistance, data return and certified deletion obligations in Section 6 (Termination)
- Comment: [Playbook] We added an orderly exit provision because the Agreement is silent on what happens to our data and work in progress at termination: Contractor gives us up to six months of transition assistance at its then-current rates, returns our data in a machine-readable format within thirty days, and then deletes and certifies deletion. We can accept a 90-day assistance period as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(c)",
    "paragraphId": "p0033",
    "text": "(c) Upon expiry or termination of this Agreement or any Statement of Work for any reason, Contractor shall (i) at Company's request, provide reasonable transition assistance for up to six (6) months at Contractor's then-current rates; (ii) within thirty (30) days, return to Company all Works, Confidential Information and other data and materials of Company in Contractor's possession or control, in a commonly used, machine-readable format; and (iii) thereafter delete all such data and materials from its systems and certify such deletion to Company in writing."
  }
]
```

### Verifier and repair feedback

- [seq 650](trajectory.jsonl#L650) **Verdict: pass** — The Agreement's termination section (p0032–p0033) addresses only notice, payment of accrued fees and assignment of Works in progress; no transition assistance, data return/export or deletion mechanic appears anywhere cited, so 'missing' is the correct classification and an insert is the right remedy under the rule's detection guidance for a services agreement. The inserted subsection (c) is actionable and tracks the model language at the preferred position (six months' assistance at then-current rates, return within 30 days in machine-readable format, then deletion with written certification), and it is properly localized as a new clause in the termination section using the document's own defined terms (Company, Contractor, Works, Confidential Information). The edit is additive only — no existing text is altered or weakened — so it is the smallest edit that reaches the playbook position; deterministic checks confirm the operation applies and the data-return/transition language is present. The comment is accurate, in the required voice and prefix, explains what changed and why in two sentences, and offers the 90-day fallback without lecturing. No double-flagging risk identified: the confidentiality provision imposes only use/disclosure restrictions with no return-or-destroy obligation, and the ownership section addresses title rather than delivery or exit. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 655](trajectory.jsonl#L655) memo LLM request
- [seq 656](trajectory.jsonl#L656) memo LLM response (replay)

```markdown
# Issues Memo — RadialSpark Consulting Services Agreement

**To:** Deal team 
**From:** In-house counsel (Customer side) 
**Re:** Playbook review — 19 rules assessed, 9 items requiring action

---

## 1. Executive summary

We have completed the playbook review of the Agreement. The commercial architecture is favourable to us: the engagement is task-by-task under individual Statements of Work on a time-and-materials basis, with no exclusivity, no minimum commitment, no MFN, no auto-renewal, no liquidated damages or exit fees, no non-compete, and no audit right running against us. Ownership of the Works vests in us with a broad licence-back of Contractor materials. Ten of nineteen rules are compliant and require no redline.

The risk is concentrated in the liability and remedies architecture. Section 7 is captioned "Indemnification of Contractor" but contains no operative indemnity language anywhere in the document, and the liability cap carves out only "Paragraph 9," which is the Independent Contractor clause — a dangling cross-reference indicating an indemnity was drafted and dropped. The result is that we have (i) no vendor IP or data-breach indemnity, (ii) a cap measured on fees actually *paid* under the affected SOW only, with no carve-outs for confidentiality, gross negligence, wilful misconduct or fraud, and (iii) no conformance warranty at all, since Section 5 warrants only legality, authority, non-infringement and anti-bribery while Section 5(e) disclaims implied warranties. Two of these sit in walk-away territory and must be resolved before signature.

Secondary items are more readily tradeable: we have no termination-for-convenience right while any SOW is open, Arizona law plus mandatory arbitration fall outside our accepted forums, there is no affiliate/successor assignment carve-out, the mutual non-solicit lacks general-advertising and unsolicited-approach carve-outs, no transition assistance or data-return mechanic exists, and the insurance covenant omits cyber cover despite Contractor personnel accessing our systems and facilities.

---

## 2. Findings

| # | Severity | Rule | Status | Section |
|---|---|---|---|---|
| 1 | Critical | INDEMN — Indemnification by Vendor | **Missing** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 2 | Critical | LOL-CAP — Limitation of liability: cap, mutuality, carve-outs | **Deviation** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 3 | Critical | IP — Ownership of deliverables and Customer Data | Compliant | § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE. |
| 4 | High | T4C — Termination for convenience | **Deviation** | § 6 TERMINATION. |
| 5 | High | EXCLUSIVITY — Exclusivity obligations binding Customer | Compliant | § 1 PURPOSE OF ENGAGEMENT. |
| 6 | High | LD — Liquidated damages and penalties payable by Customer | Compliant | § 6 TERMINATION. |
| 7 | High | LICENSE — Licence grant scope | Compliant | § 4 OWNERSHIP OF MATERIALS RELATED TO SERVICES; ACCEPTANCE. |
| 8 | High | NONCOMPETE — Non-compete restrictions on Customer | Compliant | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 9 | Medium | WARRANTY — Performance warranty and duration | **Deviation** | § 5 CONTRACTOR'S REPRESENTATIONS AND WARRANTIES AND WARRANTY DISCLAIMER. |
| 10 | Medium | GOVLAW — Governing law and venue | **Deviation** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 11 | Medium | TRANSITION — Post-termination transition assistance and data return | **Missing** | § 6 TERMINATION. |
| 12 | Medium | ASSIGN — Assignment and change of control | **Deviation** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 13 | Medium | NOSOLICIT — Non-solicitation of employees binding Customer | **Deviation** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |
| 14 | Medium | AUDIT — Audit rights against Customer | Compliant | § 3 CONTRACTOR'S COMPENSATION. |
| 15 | Medium | MFN — Most-favoured-nation obligations burdening Customer | Compliant | § 3 CONTRACTOR'S COMPENSATION. |
| 16 | Medium | MINCOMMIT — Minimum purchase commitments / volume restrictions | Compliant | § 1 PURPOSE OF ENGAGEMENT. |
| 17 | Medium | RENEWAL — Auto-renewal and non-renewal notice window | Compliant | § 1 PURPOSE OF ENGAGEMENT. |
| 18 | Low | INSURANCE — Vendor insurance | **Deviation** | § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR. |

**Summary:** 10 compliant · 7 deviations · 2 missing.

---

## 3. Walk-away items

Two findings sit in walk-away territory and are not tradeable in their current form.

**3.1 No Vendor indemnity of any kind (INDEMN — § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.)** 
There is no operative indemnity or hold-harmless language anywhere in the Agreement; document-wide searches return only the Section 7 heading. Our nearest protection is the Section 5(c) non-infringement warranty, which is a bare representation giving us a damages claim but no right to have Contractor defend or fund a third-party infringement suit — and any such claim is itself capped by Section 7(a). "No Vendor IP indemnity at all" is expressly walk-away under the playbook. We have inserted the preferred vendor indemnity as a new Section 7(d) covering third-party IP infringement, breach of law, Contractor-caused data incidents and gross negligence/wilful misconduct, with standard notice, control and cooperation mechanics and a carve-out from the Section 7(a) cap and the Section 7(c) fees waiver so the defence obligation is not read as capped at fees paid. No Customer indemnity exists, so there is nothing to narrow on our side. **Fallback offered:** IP-only indemnity with modification/combination exclusions and a 3x annual fees super-cap.

**3.2 Cap basis can fall below six months' fees, with no carve-outs (LOL-CAP — § 7 LIMITATIONS OF LIABILITY; INDEMNIFICATION OF CONTRACTOR.)** 
Section 7(a) is nominally mutual, but Contractor's exposure is limited to fees actually "PAID... FOR THE PERFORMANCE OF SUCH SERVICES" under the affected SOW — not aggregate twelve months' fees, and excluding amounts payable. On a short or partly-invoiced SOW that can fall below six months' fees, which is walk-away territory. Separately, the only exception is "CONTRACTOR'S OBLIGATIONS PURSUANT TO PARAGRAPH 9," and Paragraph 9 is the Independent Contractor clause, so there is effectively no carve-out for confidentiality, indemnification, gross negligence, wilful misconduct, fraud or infringement of our IP — a failure of the fallback, which requires carve-outs at least for indemnification, confidentiality, gross negligence and wilful misconduct. We have proposed the preferred formulation (greater of twelve months' fees paid or payable and USD 1,000,000) with the standard Excluded Claims sentence and confirmation that our payment obligations are not damages. The cap on Company's liability is retained because it benefits us, and the redline is confined to 7(a); indemnity scope is addressed under INDEMN.

---

## 4. Next steps

1. **Send the redline with the two critical items flagged as gating.** The INDEMN insertion (new § 7(d)) and the § 7(a) cap rework should be presented together, since the Paragraph 9 cross-reference shows the two clauses were drafted as a pair. We should ask Contractor to confirm whether an indemnity was dropped in drafting — that is the cleanest route to reinstating it.
2. **Press the exit and remedies package as the second tier.** Add a new § 6(c) giving Company a convenience right on 30 days' notice with payment for Services performed and refund of prepaid, unearned fees (60 days available as fallback); add the 90-day conformance warranty with re-performance, repair/replacement or refund remedy, a no-malicious-code warranty and express confirmation that § 5(e) does not cut back the express warranties; and insert transition assistance, data return in machine-readable format within 30 days and certified deletion as a new § 6(c) item (90-day assistance period available as fallback).
3. **Resolve forum.** Move governing law and exclusive venue to New York County courts and replace the Section 19 mandatory arbitration with the same courts. Delaware, California or England and Wales/London are acceptable fallbacks. Arizona is outside the accepted list and fails both positions.
4. **Clear the low-friction items in a single pass.** Affiliate and M&A successor assignment carve-out for Company; general-advertising and unsolicited-approach carve-outs to the mutual non-solicit (scope and duration left untouched); cyber/privacy liability insurance at USD 2,000,000 added to the existing Section 14 list at the fallback level. We are not pressing the preferred USD 5M cyber or USD 2M E&O/CGL limits given the consulting scope.
5. **Note the items we are consciously not redlining.** The § 3(b) unilateral rate-change right on 30 days' notice has no CPI or percentage cap, but its impact is limited because that notice period exceeds our 15-day at-will termination right; the § 4(c) licence-back is not expressly styled irrevocable or worldwide; and ownership of Works is expressed as vesting for periods invoiced and paid. We would tidy these if the document opens for other reasons, but none defeats the fallback.
6. **Flag for the business team going forward.** Any future SOW that introduces committed hours, a retainer or minimum volumes should be routed back to us for review under MINCOMMIT.
```

## Apply and validation

No apply or output-validation event was recorded.
