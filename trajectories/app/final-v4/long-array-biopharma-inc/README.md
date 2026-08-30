# Trajectory: long-array-biopharma-inc

| Run | Value |
|---|---|
| Contract | long-array-biopharma-inc — CONFIDENTIAL |
| Config | final-v4 |
| Parties | Ono Pharmaceutical Co., Ltd. (our party) ↔ Array BioPharma Inc. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 55.8s (55,844 ms) |
| Calls | 241 LLM · 302 tool · 8 retries |
| Tokens | 93,121 input · 270,240 output · 4,374,868 cache read · 460,916 cache write |
| Cost | $12.289764 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 102 | 18 | 32 | — | [seq 2](trajectory.jsonl#L2)–[seq 103](trajectory.jsonl#L103) |
| drafters | 954 | 203 | 270 | 18 submitted finding(s) | [seq 104](trajectory.jsonl#L104)–[seq 1128](trajectory.jsonl#L1128) |
| verifier | 57 | 19 | 0 | 19 verdict(s) | [seq 340](trajectory.jsonl#L340)–[seq 1131](trajectory.jsonl#L1131) |
| assembler | 21 | 0 | 0 | — | [seq 317](trajectory.jsonl#L317)–[seq 1139](trajectory.jsonl#L1139) |
| memo | 4 | 1 | 0 | — | [seq 1135](trajectory.jsonl#L1135)–[seq 1138](trajectory.jsonl#L1138) |
| human | 0 | 0 | 0 | 0 decision(s) | — |
| apply | 0 | 0 | 0 | not applied | — |

## LOL-CAP — Limitation of liability — cap, mutuality and carve-outs

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 104](trajectory.jsonl#L104)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "The aggregate liability cap applies mutually to both parties.",
  "The cap is the greater of fees paid or payable in the 12 months preceding the claim and USD 1,000,000.",
  "The exclusion of indirect and consequential damages applies mutually to both parties.",
  "Breach of confidentiality obligations is uncapped.",
  "Breach of data protection and security obligations is uncapped.",
  "Indemnification obligations are uncapped.",
  "Gross negligence is uncapped.",
  "Wilful misconduct is uncapped.",
  "Fraud is uncapped.",
  "Infringement of the other party's intellectual property is uncapped.",
  "Customer payment obligations are excluded from damages subject to the cap."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The aggregate liability cap applies mutually to both parties.",
  "The cap is based on 12 months of fees.",
  "Indemnification obligations are uncapped.",
  "Breach of confidentiality obligations is uncapped.",
  "Gross negligence is uncapped.",
  "Wilful misconduct is uncapped."
]

Planner evidence and hints:
{"ruleId":"LOL-CAP","candidateSectionIds":["sec-p0715","sec-xvii"],"candidateParagraphIds":["p0727","p0751"],"likelyAbsent":false,"note":"Consequential damages waiver at p0727 (mutual, all-caps, carve-outs for Article 10 confidentiality, Sections 16.1/16.2 indemnities, gross negligence/willful misconduct). No monetary aggregate cap surfaced; worker to confirm by reading sec-p0715 in full. p0751 bars punitive damages in arbitration."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 111](trajectory.jsonl#L111) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0727","p0751"]}
```

- [seq 112](trajectory.jsonl#L112) **read_paragraphs result**

```json
[{"id":"p0727","sectionRef":"§ INDEMNIFICATION; RECALLS","text":"16.5 Disclaimer of Liability for Consequential Damages. UNLESS EXPRESSLY PROVIDED HEREUNDER, IN NO EVENT SHALL EITHER PARTY OR ANY OF ITS RESPECTIVE AFFILIATES AND THEIR RESPECTIVE OFFICERS, DIRECTORS AND EMPLOYEES BE LIABLE UNDER THIS AGREEMENT FOR SPECIAL, INDIRECT, PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES SUFFERED BY THE OTH…
```

- [seq 113](trajectory.jsonl#L113) **drafter → search**

```json
{"query":"aggregate liability exceed"}
```

- [seq 114](trajectory.jsonl#L114) **search result**

```json
[]
```

- [seq 147](trajectory.jsonl#L147) **drafter → search**

```json
{"query":"liability","limit":40}
```

- [seq 148](trajectory.jsonl#L148) **search result**

```json
[{"paragraphId":"p0508","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…spect to such Materials shall terminate and Ono shall assume all supply-related liability with respect to such Materials which it Manufactures or sources from Subcontrac…"},{"paragraphId":"p0642","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…nation of this Agreement for any reason shall not release e…
```

- [seq 149](trajectory.jsonl#L149) **drafter → read_section**

```json
{"sectionId":"sec-p0715","limit":20}
```

- [seq 150](trajectory.jsonl#L150) **read_section result**

```json
{"sectionRef":"§ INDEMNIFICATION; RECALLS","cursor":0,"totalParagraphs":13,"nextCursor":null,"paragraphs":[{"id":"p0715","text":"INDEMNIFICATION; RECALLS"},{"id":"p0716","text":"16.1 Indemnification of Array. Ono shall indemnify and hold harmless each of Array, its Affiliates and the directors, officers and employees of such entities and the successors and assigns of any of the foregoing (the \"A…
```

- [seq 207](trajectory.jsonl#L207) **drafter → search**

```json
{"query":"Article 10","limit":20}
```

- [seq 208](trajectory.jsonl#L208) **search result**

```json
[{"paragraphId":"p0535","sectionRef":"§ X CONFIDENTIALITY","snippet":"…ly protective of such Confidential Information and the disclosing Party as this Article 10, it being however understood that, notwithstanding any other provision of this …"},{"paragraphId":"p0553","sectionRef":"§ X CONFIDENTIALITY","snippet":"… Non-Disclosure Agreements. Upon execution of this Agreement, the terms of this Arti…
```

- [seq 209](trajectory.jsonl#L209) **drafter → search**

```json
{"query":"confidentiality obligations breach remedy","limit":20}
```

- [seq 210](trajectory.jsonl#L210) **search result**

```json
[]
```

- [seq 235](trajectory.jsonl#L235) **drafter → search**

```json
{"query":"indemnif","limit":30}
```

- [seq 236](trajectory.jsonl#L236) **search result**

```json
[{"paragraphId":"p0673","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…icles and Sections: Articles I (Definitions), XIV (Effect of Termination), XVI (Indemnification; Recalls) and XVII (Dispute Resolution), and Sections 2.7, 4.10, 4.11 (t…"},{"paragraphId":"p0715","sectionRef":"§ INDEMNIFICATION; RECALLS","snippet":"INDEMNIFICATION; RECALLS"},{"paragraphId":"p0716","sectionRef":"§ INDEMN…
```

- [seq 237](trajectory.jsonl#L237) **drafter → get_definition**

```json
{"term":"Fees"}
```

- [seq 238](trajectory.jsonl#L238) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 261](trajectory.jsonl#L261) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"Pharma collaboration/license; no monetary cap exists; Section 16.5 mutual consequential damages disclaimer with carve-outs for Article 10, 16.1/16.2 indemnities and gross negligence/willful misconduct"}
```

- [seq 262](trajectory.jsonl#L262) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 263](trajectory.jsonl#L263) **drafter → search**

```json
{"query":"16.6"}
```

- [seq 264](trajectory.jsonl#L264) **search result**

```json
[{"paragraphId":"p0728","sectionRef":"§ 16.6 Recalls. To the extent that:","snippet":"16.6 Recalls. To the extent that:"},{"paragraphId":"p0730","sectionRef":"§ 16.6 Recalls. To the extent that:","snippet":"…all recall or withdraw the Product in such country as set forth in this Section 16.6. As between the Parties, Ono shall control and coordinate all activities that O…"}]
```

- [seq 299](trajectory.jsonl#L299) **drafter → read_section**

```json
{"sectionId":"sec-p0728","limit":20}
```

- [seq 300](trajectory.jsonl#L300) **read_section result**

```json
{"ok":false,"error":"Unknown section: sec-p0728"}
```

- [seq 326](trajectory.jsonl#L326) **drafter → list_sections**

```json
{}
```

- [seq 327](trajectory.jsonl#L327) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 352](trajectory.jsonl#L352) **drafter → read_section**

```json
{"sectionId":"sec-16.6"}
```

- [seq 353](trajectory.jsonl#L353) **read_section result**

```json
{"sectionRef":"§ 16.6 Recalls. To the extent that:","cursor":0,"totalParagraphs":6,"nextCursor":null,"paragraphs":[{"id":"p0728","text":"16.6 Recalls. To the extent that:"},{"id":"p0729","text":"(i) any Regulatory Authority in the Ono Territory issues a directive or order that the Product be recalled or withdrawn in any country within the Ono Territory;"},{"id":"p0730","text":"(ii) a court of com…
```

- [seq 377](trajectory.jsonl#L377) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with indemnities, confidentiality and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but contains no aggregate liability cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, with indemnification, confidentiality and gross negligence/willful misconduct sitting outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under Sections 16.1 and 16.2, either Party's breach of Article 10 (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]}
```

- [seq 378](trajectory.jsonl#L378) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0733","segments":[{"type":"equal","text":"making all contact with relevant Regulatory Authorities; provided, however, that Ono shall not take any action with respect to any such recall without first consulting in good faith with Array and obtaining approval of the JDRC, to the extent practicable, and Ono shall consider in good faith any comments…
```

- [seq 403](trajectory.jsonl#L403) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0727","p0733"],"quote":"NOTWITHSTANDING THE FOREGOING, NOTHING IN THIS SECTION 16.5 IS INTENDED TO OR SHALL LIMIT OR RESTRICT THE AMOUNTS PAYABLE TO THIRD PARTIES UNDER THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10, SECTIONS 16.1 AND 16.2 ABOVE; PROVIDED, FURTHER, THAT THE FOREGOING LIMITATION OF LIABILITY SHALL NOT APPLY IN THE CASE OF GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.","rationale":"Section 16.5 is a mutual exclusion of special, indirect, punitive, incidental and consequential damages, with carve-outs for third-party indemnities under Article 10 and Sections 16.1/16.2 and for gross negligence/willful misconduct. However, those carve-outs operate only against the consequential-damages disclaimer; nowhere in the Agreement (Articles XVI, XVII or elsewhere) is there any monetary or fees-based aggregate cap on direct liability, so both Parties' direct exposure — including Ono's broad product-liability indemnity in Section 16.1 — is unlimited. That fails the fallback on a material term (no mutual cap based on 12 months of fees). We therefore add a single new Section 16.7 at the fallback level: a mutual aggregate cap of 12 months' amounts payable by Ono, with indemnification obligations, breach of Article 10 (Confidentiality) and gross negligence/willful misconduct expressly outside the cap. Section 16.5's mutual consequential-damages waiver is left untouched.","confidence":0.72,"proposal":{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with indemnities, confidentiality and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but contains no aggregate liability cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, with indemnification, confidentiality and gross negligence/willful misconduct sitting outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under Sections 16.1 and 16.2, either Party's breach of Article 10 (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The aggregate liability cap applies mutually to both parties.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The cap is based on 12 months of fees.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Indemnification obligations are uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Breach of confidentiality obligations is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Gross negligence is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Wilful misconduct is uncapped.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 404](trajectory.jsonl#L404) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 495](trajectory.jsonl#L495) **drafter → read_section**

```json
{"sectionId":"sec-x","limit":6}
```

- [seq 496](trajectory.jsonl#L496) **read_section result**

```json
{"sectionRef":"§ X CONFIDENTIALITY","cursor":0,"totalParagraphs":34,"nextCursor":6,"paragraphs":[{"id":"p0520","text":"ARTICLE X CONFIDENTIALITY"},{"id":"p0521","text":"51"},{"id":"p0522","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to Rule 24b-2 of the Se…
```

- [seq 497](trajectory.jsonl#L497) **drafter → search**

```json
{"query":"10.1 Confidential Information","limit":10}
```

- [seq 498](trajectory.jsonl#L498) **search result**

```json
[{"paragraphId":"p0523","sectionRef":"§ X CONFIDENTIALITY","snippet":"10.1 Confidential Information. Except as expressly provided in this Agreement, the Parties agree that the rec…"}]
```

- [seq 522](trajectory.jsonl#L522) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with indemnities, confidentiality obligations and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but sets no aggregate cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, keeping each Party's indemnification obligations, breach of its confidentiality obligations under Article X and gross negligence/willful misconduct outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under Sections 16.1 and 16.2, either Party's breach of its confidentiality obligations under Article X (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]}
```

- [seq 523](trajectory.jsonl#L523) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0733","segments":[{"type":"equal","text":"making all contact with relevant Regulatory Authorities; provided, however, that Ono shall not take any action with respect to any such recall without first consulting in good faith with Array and obtaining approval of the JDRC, to the extent practicable, and Ono shall consider in good faith any comments…
```

- [seq 538](trajectory.jsonl#L538) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0727","p0520","p0733"],"quote":"NOTWITHSTANDING THE FOREGOING, NOTHING IN THIS SECTION 16.5 IS INTENDED TO OR SHALL LIMIT OR RESTRICT THE AMOUNTS PAYABLE TO THIRD PARTIES UNDER THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10, SECTIONS 16.1 AND 16.2 ABOVE; PROVIDED, FURTHER, THAT THE FOREGOING LIMITATION OF LIABILITY SHALL NOT APPLY IN THE CASE OF GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.","rationale":"Section 16.5 is only a mutual waiver of special, indirect, punitive, incidental and consequential damages, with carve-outs operating against that waiver alone. No monetary or fee-based aggregate cap exists anywhere in the Agreement, so both Parties' direct exposure — including Ono's broad product-liability indemnity under Section 16.1 — is unlimited; that fails the fallback on a material term. We therefore add one new Section 16.7 at the fallback level: a mutual aggregate cap of 12 months' amounts payable by Ono, with indemnification obligations under Sections 16.1 and 16.2, breach of confidentiality obligations, and gross negligence/willful misconduct expressly outside the cap. Per the verifier's point, I confirmed the caption at p0520 (\"ARTICLE X CONFIDENTIALITY\", with 10.1 \"Confidential Information\"), so Article X is the confidentiality article; the carve-out is nevertheless now drafted functionally (\"breach of its confidentiality obligations under Article X (Confidentiality)\") so the element does not depend on the cross-reference. Section 16.5 is left untouched. Preferred wording is not met (no USD 1,000,000 greater-of floor, \"paid or payable\", data protection/security, fraud, other-party IP carve-outs, or payment-obligations exclusion); we are targeting the fallback.","confidence":0.76,"proposal":{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with indemnities, confidentiality obligations and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but sets no aggregate cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, keeping each Party's indemnification obligations, breach of its confidentiality obligations under Article X and gross negligence/willful misconduct outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under Sections 16.1 and 16.2, either Party's breach of its confidentiality obligations under Article X (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The aggregate liability cap applies mutually to both parties.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The cap is based on 12 months of fees.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Indemnification obligations are uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Breach of confidentiality obligations is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Gross negligence is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Wilful misconduct is uncapped.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 539](trajectory.jsonl#L539) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 614](trajectory.jsonl#L614) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with all indemnification obligations, confidentiality breaches and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but sets no aggregate cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, keeping each Party's indemnification obligations (including under Article 10 and Sections 16.1 and 16.2), breach of its confidentiality obligations and gross negligence/willful misconduct outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2), either Party's breach of its confidentiality obligations under Article 10 (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]}
```

- [seq 615](trajectory.jsonl#L615) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0733","segments":[{"type":"equal","text":"making all contact with relevant Regulatory Authorities; provided, however, that Ono shall not take any action with respect to any such recall without first consulting in good faith with Array and obtaining approval of the JDRC, to the extent practicable, and Ono shall consider in good faith any comments…
```

- [seq 632](trajectory.jsonl#L632) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0727","p0520","p0733"],"quote":"NOTWITHSTANDING THE FOREGOING, NOTHING IN THIS SECTION 16.5 IS INTENDED TO OR SHALL LIMIT OR RESTRICT THE AMOUNTS PAYABLE TO THIRD PARTIES UNDER THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10, SECTIONS 16.1 AND 16.2 ABOVE; PROVIDED, FURTHER, THAT THE FOREGOING LIMITATION OF LIABILITY SHALL NOT APPLY IN THE CASE OF GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.","rationale":"Section 16.5 is only a mutual waiver of special, indirect, punitive, incidental and consequential damages; its carve-outs operate against that waiver alone. No monetary or fee-based aggregate cap exists anywhere in the Agreement, leaving both Parties' direct exposure — including Ono's broad product-liability indemnity under Section 16.1 — unlimited, which fails the fallback on a material term. We add one new Section 16.7 at the fallback level: a mutual aggregate cap of 12 months' amounts payable by Ono, with each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2, matching the indemnity sources 16.5 itself identifies), breach of its confidentiality obligations, and gross negligence/willful misconduct expressly outside the cap. The caption at p0520 confirms Article X/10 is the confidentiality article. Section 16.5 and all other text are untouched. Preferred wording is not claimed (no USD 1,000,000 greater-of floor, \"paid or payable\" basis, data protection/security, fraud or other-party IP carve-outs, or payment-obligations exclusion).","confidence":0.78,"proposal":{"level":"fallback","summary":"Add a mutual aggregate liability cap of 12 months' amounts payable, with all indemnification obligations, confidentiality breaches and gross negligence/willful misconduct outside the cap.","comment":"[Playbook] The Agreement disclaims consequential damages but sets no aggregate cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, keeping each Party's indemnification obligations (including under Article 10 and Sections 16.1 and 16.2), breach of its confidentiality obligations and gross negligence/willful misconduct outside the cap; this is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0733","numbering":"16.7","text":"16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2), either Party's breach of its confidentiality obligations under Article 10 (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The aggregate liability cap applies mutually to both parties.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The cap is based on 12 months of fees.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Indemnification obligations are uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Breach of confidentiality obligations is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Gross negligence is uncapped.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Wilful misconduct is uncapped.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 633](trajectory.jsonl#L633) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 632](trajectory.jsonl#L632)
- Finding: `f-lol-cap-7a9bf7f8` · **deviation** · confidence 0.78
- Location: § INDEMNIFICATION; RECALLS
- Quote: “NOTWITHSTANDING THE FOREGOING, NOTHING IN THIS SECTION 16.5 IS INTENDED TO OR SHALL LIMIT OR RESTRICT THE AMOUNTS PAYABLE TO THIRD PARTIES UNDER THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10, SECTIONS 16.1 AND 16.2 ABOVE; PROVIDED, FURTHER, THAT THE FOREGOING LIMITATION OF LIABILITY SHALL NOT APPLY IN THE CASE OF GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.”
- Rationale: Section 16.5 is only a mutual waiver of special, indirect, punitive, incidental and consequential damages; its carve-outs operate against that waiver alone. No monetary or fee-based aggregate cap exists anywhere in the Agreement, leaving both Parties' direct exposure — including Ono's broad product-liability indemnity under Section 16.1 — unlimited, which fails the fallback on a material term. We add one new Section 16.7 at the fallback level: a mutual aggregate cap of 12 months' amounts payable by Ono, with each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2, matching the indemnity sources 16.5 itself identifies), breach of its confidentiality obligations, and gross negligence/willful misconduct expressly outside the cap. The caption at p0520 confirms Article X/10 is the confidentiality article. Section 16.5 and all other text are untouched. Preferred wording is not claimed (no USD 1,000,000 greater-of floor, "paid or payable" basis, data protection/security, fraud or other-party IP carve-outs, or payment-obligations exclusion).
- Proposal: **fallback** — Add a mutual aggregate liability cap of 12 months' amounts payable, with all indemnification obligations, confidentiality breaches and gross negligence/willful misconduct outside the cap.
- Comment: [Playbook] The Agreement disclaims consequential damages but sets no aggregate cap, so both Parties' direct liability is unlimited. We have added a mutual cap at 12 months' amounts payable by Ono as new Section 16.7, keeping each Party's indemnification obligations (including under Article 10 and Sections 16.1 and 16.2), breach of its confidentiality obligations and gross negligence/willful misconduct outside the cap; this is our fallback position.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "16.7",
    "paragraphId": "p0733",
    "text": "16.7 Limitation of Liability. Except with respect to each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2), either Party's breach of its confidentiality obligations under Article 10 (Confidentiality), and either Party's gross negligence or willful misconduct, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the fees and other amounts payable by Ono under this Agreement during the twelve (12) months immediately preceding the claim."
  }
]
```

### Verifier and repair feedback

- [seq 461](trajectory.jsonl#L461) **Verdict: fail** — Deviation classification is correct on the underlying document: 16.5 is only a mutual consequential-damages waiver; no aggregate monetary or fee-based cap exists, leaving direct liability unlimited for both Parties, which fails the fallback on a material term. Fallback is all but complete: 16.7 delivers a mutual cap, a 12-month fee basis, and express carve-outs for indemnification under 16.1/16.2 and for gross negligence/willful misconduct. Blocking defect: the confidentiality carve-out is expressed solely as "breach of Article 10 (Confidentiality)", but retained 16.5 speaks of "THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10", which indicates Article 10 may be an indemnity/IP article, not Confidentiality. Repair by confirming the Article caption and, safest, drafting the carve-out functionally: "either Party's breach of its confidentiality obligations (Article [X])" so the element does not depend on a possibly wrong cross-reference and does not contradict 16.5. Recommended secondary repair (not required at fallback): 16.5 carves indemnities under Article 10 as well as 16.1/16.2 out of the damages waiver, whereas 16.7 names only 16.1 and 16.2; align the two lists so Article 10 indemnities are indisputably outside the cap. Preferred level remains unmet (no USD 1,000,000 greater-of floor, "payable" rather than "paid or payable", no data protection/security, fraud or other-party IP carve-outs, and no statement that Ono's payment obligations are not damages subject to the cap) — acceptable if fallback is the chosen target, but the confidentiality reference must be fixed first. Minimality holds: a single concise new section is inserted, 16.5 is left untouched, and no survival tails, expense language or extra procedures are added; "fees and other amounts payable by Ono" is a reasonable adaptation because this pharma licence pays milestones and royalties rather than "fees". Intent is otherwise preserved: the recall/regulatory paragraph and the mutual consequential-damages waiver survive without contradiction, subject to confirming the Article 10 caption. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 462](trajectory.jsonl#L462) **Repair round 1**: "Unmet fallback elements (copy these exact strings into the repaired coverage):\n- Breach of confidentiality obligations is uncapped.\n Verdict: cannot_tell. Evidence: The carve-out is drafted by cross-reference only — \"breach of Article 10 (Confidentiality)\" — while retained 16.5 refers to indemnities \"PURSUANT TO ARTICLE 10\", so the Article 10 caption is in doubt; if Article 10 is not the confidentiality article the carve-out is a mislabelled cross-reference and the element fails.\n\nVerifier reasons:\n- Deviation classification is correct on the underlying document: 16.5 is only a mutual consequential-damages waiver; no aggregate monetary or fee-based cap exists, leaving direct liability unlimited for both Parties, which fails the fallback on a material term.\n- Fallback is all but complete: 16.7 delivers a mutual cap, a 12-month fee basis, and express carve-outs for indemnification under 16.1/16.2 and for gross negligence/willful misconduct.\n- Blocking defect: the confidentiality carve-out is expressed solely as \"breach of Article 10 (Confidentiality)\", but retained 16.5 speaks of \"THE INDEMNITIES PROVIDED PURSUANT TO ARTICLE 10\", which indicates Article 10 may be an indemnity/IP article, not Confidentiality. Repair by confirming the Article caption and, safest, drafting the carve-out functionally: \"either Party's breach of its confidentiality obligations (Article [X])\" so the element does not depend on a possibly wrong cross-reference and does not contradict 16.5.\n- Recommended secondary repair (not required at fallback): 16.5 carves indemnities under Article 10 as well as 16.1/16.2 out of the damages waiver, whereas 16.7 names only 16.1 and 16.2; align the two lists so Article 10 indemnities are indisputably outside the cap.\n- Preferred level remains unmet (no USD 1,000,000 greater-of floor, \"payable\" rather than \"paid or payable\", no data protection/security, fraud or other-party IP carve-outs, and no statement that Ono's payment obligations are not damages subject to the cap) — acceptable if fallback is the chosen target, but the confidentiality reference must be fixed first.\n- Minimality holds: a single concise new section is inserted, 16.5 is left untouched, and no survival tails, expense language or extra procedures are added; \"fees and other amounts payable by Ono\" is a reasonable adaptation because this pharma licence pays milestones and royalties rather than \"fees\".\n- Intent is otherwise preserved: the recall/regulatory paragraph and the mutual consequential-damages waiver survive without contradiction, subject to confirming the Article 10 caption."
- [seq 590](trajectory.jsonl#L590) **Verdict: fail** — Fallback is one element short: the indemnification carve-out in new 16.7 is drafted narrowly as "indemnification obligations under Sections 16.1 and 16.2", but retained 16.5 expressly identifies indemnities under Article 10 as well. Repair the operative text to read "each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2)" so no indemnity source remains inside the cap. Related consistency point: as drafted, 16.7 subjects Article 10 third-party indemnity payments to a 12-month cap even though 16.5 preserves those amounts from the consequential-damages waiver; the broadened carve-out above cures this tension as well. Preferred level is correctly not claimed: no greater-of USD 1,000,000 floor, no "paid or payable" basis, and no carve-outs for data protection/security, fraud or infringement of the other Party's IP, and no statement that Ono's payment obligations are outside the cap. Minimality holds: a single concise new Section 16.7 is inserted to fill a genuinely missing cap, 16.5 and all other language are left untouched, and no survival tail, expense language, procedure or extra damages category is added. Intent is preserved: 16.5's mutual consequential-damages waiver and its indemnity/gross-negligence provisos survive unchanged, the Article X cross-reference resolves to the confidentiality article, and no term is left dangling or undefined. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 591](trajectory.jsonl#L591) **Repair round 2**: "Unmet fallback elements (copy these exact strings into the repaired coverage):\n- Indemnification obligations are uncapped.\n Verdict: not_met. Evidence: The carve-out is limited to Sections 16.1 and 16.2; retained 16.5 shows the Agreement also contains indemnities \"PURSUANT TO ARTICLE 10\", which the new 16.7 leaves subject to the cap. Not all indemnification obligations are uncapped.\n\nVerifier reasons:\n- Fallback is one element short: the indemnification carve-out in new 16.7 is drafted narrowly as \"indemnification obligations under Sections 16.1 and 16.2\", but retained 16.5 expressly identifies indemnities under Article 10 as well. Repair the operative text to read \"each Party's indemnification obligations under this Agreement (including under Article 10 and Sections 16.1 and 16.2)\" so no indemnity source remains inside the cap.\n- Related consistency point: as drafted, 16.7 subjects Article 10 third-party indemnity payments to a 12-month cap even though 16.5 preserves those amounts from the consequential-damages waiver; the broadened carve-out above cures this tension as well.\n- Preferred level is correctly not claimed: no greater-of USD 1,000,000 floor, no \"paid or payable\" basis, and no carve-outs for data protection/security, fraud or infringement of the other Party's IP, and no statement that Ono's payment obligations are outside the cap.\n- Minimality holds: a single concise new Section 16.7 is inserted to fill a genuinely missing cap, 16.5 and all other language are left untouched, and no survival tail, expense language, procedure or extra damages category is added.\n- Intent is preserved: 16.5's mutual consequential-damages waiver and its indemnity/gross-negligence provisos survive unchanged, the Article X cross-reference resolves to the confidentiality article, and no term is left dangling or undefined."
- [seq 684](trajectory.jsonl#L684) **Verdict: repaired** — Fallback is complete: the inserted Section 16.7 delivers a mutual aggregate cap measured by 12 months of amounts payable by Ono, with indemnification, confidentiality breach, gross negligence and willful misconduct expressly outside the cap. The finding is correctly classified as a deviation, because the Agreement previously contained only the Section 16.5 consequential-damages waiver and no aggregate cap at all — a material fallback failure. Preferred is not complete. To reach it the drafter must add, in operative language: (i) a greater-of floor — "the greater of (a) fees paid or payable by Ono in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000"; (ii) carve-outs for breach of data protection and security obligations, fraud, and infringement of the other Party's intellectual property rights; and (iii) an express statement that Ono's payment obligations under this Agreement are not "damages" subject to the cap. Minimality holds: Section 16.5 and all surrounding text are untouched, nothing favourable is deleted, and the insertion is a single concise sentence for an otherwise missing clause. The parenthetical "(including under Article 10 and Sections 16.1 and 16.2)" is not an extra — it tracks the indemnity sources 16.5 itself names, avoiding a mismatch between the two provisions. Intent is preserved: no defined term is left undefined, no cross-reference dangles, and 16.7 does not contradict 16.5's proviso that the consequential-damages waiver does not apply to gross negligence or willful misconduct or limit third-party indemnity amounts. Watch item (not a defect on these facts): Section 16.7 cites Article 10 both as an indemnification source and as the confidentiality article, mirroring the Agreement's own drafting in 16.5. If Array reads Article 10 as confidentiality only, tighten to "indemnification obligations under this Agreement (including Sections 16.1 and 16.2 and any indemnity in Article 10)" to avoid an argument about scope. Basis note for negotiation: "fees and other amounts payable by Ono" is broader than the playbook's "fees paid or payable"; it is acceptable at the fallback (it raises the cap for both Parties) but should be aligned to "fees paid or payable" if the preferred greater-of formula is inserted. Checks: {"name":"operation 1 applies","ok":true}; {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INDEMN — Indemnification by Vendor

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 105](trajectory.jsonl#L105)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Vendor has an express duty to defend Customer and its affiliates.",
  "Vendor indemnifies Customer and its affiliates against third-party claims.",
  "Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.",
  "Vendor indemnity covers Vendor's breach of applicable law.",
  "Vendor indemnity covers a data breach caused by Vendor.",
  "Vendor indemnity covers Vendor's gross negligence and wilful misconduct.",
  "The indemnification procedure requires notice of a claim.",
  "The indemnification procedure allocates control of the defence.",
  "The indemnification procedure requires reasonable cooperation.",
  "Customer indemnity is limited to Customer-provided content and Customer's breach of law."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Vendor indemnifies Customer against third-party intellectual-property claims.",
  "The IP indemnity may exclude infringement caused by Customer modifications.",
  "The IP indemnity may exclude infringement caused by Customer combinations.",
  "The IP indemnity may exclude infringement caused by Customer specifications.",
  "Vendor must procure continued use, modify, or replace the infringing item.",
  "Vendor must refund applicable fees if procure, modify, or replace remedies are unavailable.",
  "Vendor's indemnity is subject to a super-cap of three times annual fees."
]

Planner evidence and hints:
{"ruleId":"INDEMN","candidateSectionIds":["sec-p0715","sec-16.6"],"candidateParagraphIds":["p0716","p0717","p0718","p0719","p0720","p0721","p0722","p0723","p0724","p0725","p0726"],"likelyAbsent":false,"note":"Mutual indemnities: 16.1 Ono indemnifies Array (p0716-p0718); 16.2 Array indemnifies Ono (p0719-p0721); procedure at p0722-p0725 (notice, defense control, settlement consent). Check whether Array's indemnity covers third-party IP infringement from the licensed compounds and whether our indemnity at 16.1 is too broad; review recall cost allocation in sec-16.6."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 129](trajectory.jsonl#L129) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0715","p0716","p0717","p0718","p0719","p0720","p0721","p0722","p0723","p0724","p0725","p0726"]}
```

- [seq 130](trajectory.jsonl#L130) **read_paragraphs result**

```json
[{"id":"p0715","sectionRef":"§ INDEMNIFICATION; RECALLS","text":"INDEMNIFICATION; RECALLS"},{"id":"p0716","sectionRef":"§ INDEMNIFICATION; RECALLS","text":"16.1 Indemnification of Array. Ono shall indemnify and hold harmless each of Array, its Affiliates and the directors, officers and employees of such entities and the successors and assigns of any of the foregoing (the \"Array Indemnitees\"), f…
```

- [seq 131](trajectory.jsonl#L131) **drafter → search**

```json
{"query":"indemnify hold harmless"}
```

- [seq 132](trajectory.jsonl#L132) **search result**

```json
[]
```

- [seq 175](trajectory.jsonl#L175) **drafter → search**

```json
{"query":"infringement of Third Party intellectual property rights"}
```

- [seq 176](trajectory.jsonl#L176) **search result**

```json
[]
```

- [seq 177](trajectory.jsonl#L177) **drafter → search**

```json
{"query":"indemnif","limit":50}
```

- [seq 178](trajectory.jsonl#L178) **search result**

```json
[{"paragraphId":"p0673","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…icles and Sections: Articles I (Definitions), XIV (Effect of Termination), XVI (Indemnification; Recalls) and XVII (Dispute Resolution), and Sections 2.7, 4.10, 4.11 (t…"},{"paragraphId":"p0715","sectionRef":"§ INDEMNIFICATION; RECALLS","snippet":"INDEMNIFICATION; RECALLS"},{"paragraphId":"p0716","sectionRef":"§ INDEMN…
```

- [seq 213](trajectory.jsonl#L213) **drafter → search**

```json
{"query":"infringe","limit":50}
```

- [seq 214](trajectory.jsonl#L214) **search result**

```json
[{"paragraphId":"p0019","sectionRef":"§ I DEFINITIONS","snippet":"(b) but for the license granted under this Agreement, would be infringed by the Development, Manufacturing, registration, packaging, or Commercializati…"},{"paragraphId":"p0080","sectionRef":"§ I DEFINITIONS","snippet":"… Array Patents that would, but for the license granted under this Agreement, be infringed by the sale or use of …
```

- [seq 215](trajectory.jsonl#L215) **drafter → search**

```json
{"query":"limitation of liability consequential damages"}
```

- [seq 216](trajectory.jsonl#L216) **search result**

```json
[]
```

- [seq 247](trajectory.jsonl#L247) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0586","p0587","p0588","p0589","p0590","p0591","p0592","p0709","p0710","p0711","p0712","p0713"]}
```

- [seq 248](trajectory.jsonl#L248) **read_paragraphs result**

```json
[{"id":"p0586","sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","text":"11.4 Third Party Infringement Claims."},{"id":"p0587","sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","text":"(a) If the production, sale or use of any Product in the Ono Territory pursuant to this Agreement results in a claim, suit or proceeding alleging patent infringement against Array and/or Ono (or their respectiv…
```

- [seq 249](trajectory.jsonl#L249) **drafter → search**

```json
{"query":"liability shall not exceed"}
```

- [seq 250](trajectory.jsonl#L250) **search result**

```json
[]
```

- [seq 279](trajectory.jsonl#L279) **drafter → get_definition**

```json
{"term":"Law"}
```

- [seq 280](trajectory.jsonl#L280) **get_definition result**

```json
{"found":true,"term":"Law","paragraphId":"p0086","text":"1.36 \"Law\" means any applicable national, supranational, federal, state, local or foreign law, statute, ordinance, principle of common law, or any rule, regulation, standard, judgment, order, writ, injunction, decree, arbitration award, agency requirement, license or permit of any Governmental"}
```

- [seq 281](trajectory.jsonl#L281) **drafter → search**

```json
{"query":"comply with all applicable laws"}
```

- [seq 282](trajectory.jsonl#L282) **search result**

```json
[{"paragraphId":"p0380","sectionRef":"§ V COMMERCIALIZATION AND PROMOTION","snippet":"…t Trademark and Encorafenib Product Trademark agreed upon by the JCC, and shall comply with all applicable Laws, rules and regulations. Ono shall keep Array reasonably informed with respect t…"}]
```

- [seq 311](trajectory.jsonl#L311) **drafter → get_definition**

```json
{"term":"Compound"}
```

- [seq 312](trajectory.jsonl#L312) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 313](trajectory.jsonl#L313) **drafter → get_definition**

```json
{"term":"Confidential Information"}
```

- [seq 314](trajectory.jsonl#L314) **get_definition result**

```json
{"found":false,"nearest":[]}
```

- [seq 334](trajectory.jsonl#L334) **drafter → search**

```json
{"query":"\"Product\" means"}
```

- [seq 335](trajectory.jsonl#L335) **search result**

```json
[{"paragraphId":"p0114","sectionRef":"§ I DEFINITIONS","snippet":"1.50 \"Product\" means shall mean any pharmaceutical product containing, as an active ingredient, one …"}]
```

- [seq 336](trajectory.jsonl#L336) **drafter → search**

```json
{"query":"Confidential Information means"}
```

- [seq 337](trajectory.jsonl#L337) **search result**

```json
[]
```

- [seq 360](trajectory.jsonl#L360) **drafter → search**

```json
{"query":"Confidential Information","limit":10}
```

- [seq 361](trajectory.jsonl#L361) **search result**

```json
[{"paragraphId":"p0000","sectionRef":"§ Preamble","snippet":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed sepa…"},{"paragraphId":"p0014","sectionRef":"§ I DEFINITIONS","snippet":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed sepa…"},{"paragraphId":"p0023","s…
```

- [seq 383](trajectory.jsonl#L383) **drafter → search**

```json
{"query":"confidentiality obligations disclose","limit":15}
```

- [seq 384](trajectory.jsonl#L384) **search result**

```json
[]
```

- [seq 407](trajectory.jsonl#L407) **drafter → list_sections**

```json
{}
```

- [seq 408](trajectory.jsonl#L408) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 431](trajectory.jsonl#L431) **drafter → read_section**

```json
{"sectionId":"\"sec-x\"","limit":4}
```

- [seq 432](trajectory.jsonl#L432) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-x\""}
```

- [seq 457](trajectory.jsonl#L457) **drafter → read_section**

```json
{"sectionId":"sec-x","limit":4}
```

- [seq 458](trajectory.jsonl#L458) **read_section result**

```json
{"sectionRef":"§ X CONFIDENTIALITY","cursor":0,"totalParagraphs":34,"nextCursor":4,"paragraphs":[{"id":"p0520","text":"ARTICLE X CONFIDENTIALITY"},{"id":"p0521","text":"51"},{"id":"p0522","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to Rule 24b-2 of the Se…
```

- [seq 485](trajectory.jsonl#L485) **drafter → search**

```json
{"query":"Section 16.1"}
```

- [seq 486](trajectory.jsonl#L486) **search result**

```json
[]
```

- [seq 487](trajectory.jsonl#L487) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0727"]}
```

- [seq 488](trajectory.jsonl#L488) **read_paragraphs result**

```json
[{"id":"p0727","sectionRef":"§ INDEMNIFICATION; RECALLS","text":"16.5 Disclaimer of Liability for Consequential Damages. UNLESS EXPRESSLY PROVIDED HEREUNDER, IN NO EVENT SHALL EITHER PARTY OR ANY OF ITS RESPECTIVE AFFILIATES AND THEIR RESPECTIVE OFFICERS, DIRECTORS AND EMPLOYEES BE LIABLE UNDER THIS AGREEMENT FOR SPECIAL, INDIRECT, PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES SUFFERED BY THE OTH…
```

- [seq 516](trajectory.jsonl#L516) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Array defense duty and IP/law/confidentiality/GN-WM indemnity heads; narrow Ono's indemnity","comment":"[Playbook] Array's indemnity currently omits Third Party intellectual property infringement, breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct, and contains no express duty to defend, so we have added them. We have also narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, per our indemnification position.","ops":[{"kind":"replace","paragraphId":"p0719","oldText":"Array shall indemnify and hold harmless","newText":"Array shall defend, indemnify and hold harmless"},{"kind":"replace","paragraphId":"p0721","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","newText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, (d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) any claim that any Product infringes or misappropriates the intellectual property rights of a Third Party, (f) Array's breach of applicable Law, (g) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (h) Array's gross negligence or willful misconduct, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee."},{"kind":"replace","paragraphId":"p0717","oldText":"(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;","newText":"(a) materials, data or content provided by Ono to Array under this Agreement; and"},{"kind":"replace","paragraphId":"p0718","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.","newText":"(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee."}]}
```

- [seq 517](trajectory.jsonl#L517) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0719","segments":[{"type":"equal","text":"16.2 Indemnification of Ono. Array shall "},{"type":"insert","text":"defend, "},{"type":"equal","text":"indemnify and hold harmless each of Ono, its Affiliates and Sublicensees and the directors, officers and employees of Ono, its Affiliates and Sublicensees and the successors and assigns of any of the f…
```

- [seq 542](trajectory.jsonl#L542) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0716","p0717","p0718","p0719","p0721","p0722","p0725"],"quote":"and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","rationale":"Article 16 contains mutual indemnities, but Array's indemnity at 16.2 is limited to Array's own commercialization in the Array Territory, Array-sponsored Clinical Studies and breach of Article 15 — it contains no Third Party intellectual-property infringement indemnity (Section 11.4 instead leaves each Subject Party to defend Infringement Actions \"at its own expense\"), no express duty to defend, and no cover for Array's breach of Law, unauthorized disclosure of our Confidential Information or Array's gross negligence/willful misconduct. Absence of any Vendor IP indemnity is walk-away territory under this rule, so the fallback is not met. Ono's indemnity at 16.1 is also materially broader than the narrow Customer indemnity the playbook permits. The procedure at 16.3 already supplies notice, control of the defense and full cooperation, so we have made only the additions needed at the preferred level and narrowed 16.1; we can discuss retaining a reciprocal product-liability allocation if Array grants the IP indemnity.","confidence":0.82,"proposal":{"level":"preferred","summary":"Add Array defense duty and IP/law/confidentiality/GN-WM indemnity heads; narrow Ono's indemnity","comment":"[Playbook] Array's indemnity currently omits Third Party intellectual property infringement, breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct, and contains no express duty to defend, so we have added them. We have also narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, per our indemnification position.","ops":[{"kind":"replace","paragraphId":"p0719","oldText":"Array shall indemnify and hold harmless","newText":"Array shall defend, indemnify and hold harmless"},{"kind":"replace","paragraphId":"p0721","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","newText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, (d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) any claim that any Product infringes or misappropriates the intellectual property rights of a Third Party, (f) Array's breach of applicable Law, (g) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (h) Array's gross negligence or willful misconduct, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee."},{"kind":"replace","paragraphId":"p0717","oldText":"(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;","newText":"(a) materials, data or content provided by Ono to Array under this Agreement; and"},{"kind":"replace","paragraphId":"p0718","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.","newText":"(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee."}]},"elementCoverage":{"level":"preferred","mappings":[{"element":"Vendor has an express duty to defend Customer and its affiliates.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor indemnifies Customer and its affiliates against third-party claims.","status":"already_met","quote":"Array shall indemnify and hold harmless each of Ono, its Affiliates and Sublicensees and the directors, officers and employees of Ono, its Affiliates and Sublicensees and the successors and assigns of any of the foregoing (the \"Ono Indemnitees\"), from and against any and all Liabilities from any Third Party Claims incurred by any Ono Indemnitee"},{"element":"Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Vendor indemnity covers Vendor's breach of applicable law.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Vendor indemnity covers a data breach caused by Vendor.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Vendor indemnity covers Vendor's gross negligence and wilful misconduct.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"The indemnification procedure requires notice of a claim.","status":"already_met","quote":"shall promptly notify the other Party (the \"Indemnitor\") in writing of any Third Party Claim, in respect of which the Indemnitee intends to claim such indemnification"},{"element":"The indemnification procedure allocates control of the defence.","status":"already_met","quote":"the Indemnitor shall have sole control of the defense and/or settlement thereof"},{"element":"The indemnification procedure requires reasonable cooperation.","status":"already_met","quote":"The Indemnitee under this Section 16.3 shall cooperate fully with the Indemnitor and its legal representatives in the investigation of any action with respect to a Third Party Claim covered by this indemnification."},{"element":"Customer indemnity is limited to Customer-provided content and Customer's breach of law.","status":"addressed_by_operation","operationIndexes":[3,4]}]}}
```

- [seq 543](trajectory.jsonl#L543) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 610](trajectory.jsonl#L610) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Array defence duty, express IP infringement indemnity and law/confidentiality/GN-WM heads; narrow Ono's indemnity","comment":"[Playbook] Array's indemnity omits any third party intellectual property infringement indemnity, so we have added an express one that overrides the \"own expense\" defence allocation in Section 11.4, together with a duty to defend and cover for Array's breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct. In exchange we have narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, deleting its product-liability and Article 15 prongs; we can restore the reciprocal product-liability and clinical-study allocation if Array accepts the IP indemnity.","ops":[{"kind":"replace","paragraphId":"p0719","oldText":"Array shall indemnify and hold harmless","newText":"Array shall defend, indemnify and hold harmless"},{"kind":"replace","paragraphId":"p0721","oldText":"and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent","newText":"(d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) Array's breach of applicable Law, (f) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (g) Array's gross negligence or willful misconduct, except to the extent"},{"kind":"insert_after","paragraphId":"p0721","numbering":"16.2A","text":"Notwithstanding Section 11.4, Array shall defend and indemnify the Ono Indemnitees against any Third Party Claim alleging that any Product, or any deliverable or service supplied by Array hereunder, infringes or misappropriates the intellectual property rights of a Third Party."},{"kind":"replace","paragraphId":"p0717","oldText":"(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;","newText":"(a) materials, data or content provided by Ono to Array under this Agreement; and"},{"kind":"replace","paragraphId":"p0718","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.","newText":"(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee."}]}
```

- [seq 611](trajectory.jsonl#L611) **propose_redline result** — **validation rejected**

```json
{"ok":false,"errors":["Operation 2 expands 20 words to 47 words (ratio 2.35 > 1.50); use a tighter edit or a separate insertion"],"rendered":[{"paragraphId":"p0719","segments":[{"type":"equal","text":"16.2 Indemnification of Ono. Array shall "},{"type":"insert","text":"defend, "},{"type":"equal","text":"indemnify and hold harmless each of Ono, its Affiliates and Sublicensees and the directors, of…
```

- [seq 636](trajectory.jsonl#L636) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Array defence duty, express IP infringement indemnity and law/confidentiality/GN-WM heads; narrow Ono's indemnity","comment":"[Playbook] Array's indemnity omits any third party intellectual property infringement indemnity, so we have added an express one that overrides the \"own expense\" defence allocation in Section 11.4, together with a duty to defend and cover for Array's breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct. In exchange we have narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, deleting its product-liability and Article 15 prongs; we can restore the reciprocal product-liability and clinical-study allocation if Array accepts the IP indemnity.","ops":[{"kind":"replace","paragraphId":"p0719","oldText":"Array shall indemnify and hold harmless","newText":"Array shall defend, indemnify and hold harmless"},{"kind":"replace","paragraphId":"p0721","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","newText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, (d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) Array's breach of applicable Law, (f) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (g) Array's gross negligence or willful misconduct, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee."},{"kind":"insert_after","paragraphId":"p0721","numbering":"16.2A","text":"Notwithstanding Section 11.4, Array shall defend and indemnify the Ono Indemnitees against any Third Party Claim alleging that any Product, or any deliverable or service supplied by Array hereunder, infringes or misappropriates the intellectual property rights of a Third Party."},{"kind":"replace","paragraphId":"p0717","oldText":"(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;","newText":"(a) materials, data or content provided by Ono to Array under this Agreement; and"},{"kind":"replace","paragraphId":"p0718","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.","newText":"(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee."}]}
```

- [seq 637](trajectory.jsonl#L637) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0719","segments":[{"type":"equal","text":"16.2 Indemnification of Ono. Array shall "},{"type":"insert","text":"defend, "},{"type":"equal","text":"indemnify and hold harmless each of Ono, its Affiliates and Sublicensees and the directors, officers and employees of Ono, its Affiliates and Sublicensees and the successors and assigns of any of the f…
```

- [seq 648](trajectory.jsonl#L648) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0716","p0717","p0718","p0719","p0721","p0722","p0725"],"quote":"and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","rationale":"Article 16 contains mutual indemnities, but Array's indemnity at 16.2 is limited to Array's own commercialization in the Array Territory, Array-sponsored Clinical Studies and breach of Article 15. There is no Vendor indemnity anywhere for Third Party intellectual property infringement — Section 11.4 instead leaves each Subject Party to defend Infringement Actions \"at its own expense\" — and no express duty to defend, no cover for Array's breach of Law, unauthorized disclosure of our Confidential Information or Array's gross negligence/willful misconduct. Absence of a Vendor IP indemnity is walk-away territory, so the fallback is not met. Ono's indemnity at 16.1 is also far broader than the narrow Customer indemnity the playbook permits. The procedure at 16.3 already supplies notice, sole control of the defence and full cooperation, so we add only the missing preferred heads: a stand-alone IP infringement indemnity at new 16.2A expressed to override Section 11.4, the defence duty and heads (e)-(g) in 16.2, and a narrowed 16.1. We can restore the reciprocal product-liability and clinical-study allocation if Array grants the IP indemnity.","confidence":0.85,"proposal":{"level":"preferred","summary":"Add Array defence duty, express IP infringement indemnity and law/confidentiality/GN-WM heads; narrow Ono's indemnity","comment":"[Playbook] Array's indemnity omits any third party intellectual property infringement indemnity, so we have added an express one that overrides the \"own expense\" defence allocation in Section 11.4, together with a duty to defend and cover for Array's breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct. In exchange we have narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, deleting its product-liability and Article 15 prongs; we can restore the reciprocal product-liability and clinical-study allocation if Array accepts the IP indemnity.","ops":[{"kind":"replace","paragraphId":"p0719","oldText":"Array shall indemnify and hold harmless","newText":"Array shall defend, indemnify and hold harmless"},{"kind":"replace","paragraphId":"p0721","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.","newText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, (d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) Array's breach of applicable Law, (f) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (g) Array's gross negligence or willful misconduct, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee."},{"kind":"insert_after","paragraphId":"p0721","numbering":"16.2A","text":"Notwithstanding Section 11.4, Array shall defend and indemnify the Ono Indemnitees against any Third Party Claim alleging that any Product, or any deliverable or service supplied by Array hereunder, infringes or misappropriates the intellectual property rights of a Third Party."},{"kind":"replace","paragraphId":"p0717","oldText":"(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;","newText":"(a) materials, data or content provided by Ono to Array under this Agreement; and"},{"kind":"replace","paragraphId":"p0718","oldText":"(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.","newText":"(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee."}]},"elementCoverage":{"level":"preferred","mappings":[{"element":"Vendor has an express duty to defend Customer and its affiliates.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor indemnifies Customer and its affiliates against third-party claims.","status":"already_met","quote":"Array shall indemnify and hold harmless each of Ono, its Affiliates and Sublicensees and the directors, officers and employees of Ono, its Affiliates and Sublicensees and the successors and assigns of any of the foregoing (the \"Ono Indemnitees\"), from and against any and all Liabilities from any Third Party Claims incurred by any Ono Indemnitee"},{"element":"Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.","status":"addressed_by_operation","operationIndexes":[3]},{"element":"Vendor indemnity covers Vendor's breach of applicable law.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Vendor indemnity covers a data breach caused by Vendor.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Vendor indemnity covers Vendor's gross negligence and wilful misconduct.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"The indemnification procedure requires notice of a claim.","status":"already_met","quote":"shall promptly notify the other Party (the \"Indemnitor\") in writing of any Third Party Claim, in respect of which the Indemnitee intends to claim such indemnification"},{"element":"The indemnification procedure allocates control of the defence.","status":"already_met","quote":"the Indemnitor shall have sole control of the defense and/or settlement thereof"},{"element":"The indemnification procedure requires reasonable cooperation.","status":"already_met","quote":"The Indemnitee under this Section 16.3 shall cooperate fully with the Indemnitor and its legal representatives in the investigation of any action with respect to a Third Party Claim covered by this indemnification."},{"element":"Customer indemnity is limited to Customer-provided content and Customer's breach of law.","status":"addressed_by_operation","operationIndexes":[4,5]}]}}
```

- [seq 649](trajectory.jsonl#L649) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 648](trajectory.jsonl#L648)
- Finding: `f-indemn-bf98d78f` · **deviation** · confidence 0.85
- Location: § INDEMNIFICATION; RECALLS
- Quote: “and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.”
- Rationale: Article 16 contains mutual indemnities, but Array's indemnity at 16.2 is limited to Array's own commercialization in the Array Territory, Array-sponsored Clinical Studies and breach of Article 15. There is no Vendor indemnity anywhere for Third Party intellectual property infringement — Section 11.4 instead leaves each Subject Party to defend Infringement Actions "at its own expense" — and no express duty to defend, no cover for Array's breach of Law, unauthorized disclosure of our Confidential Information or Array's gross negligence/willful misconduct. Absence of a Vendor IP indemnity is walk-away territory, so the fallback is not met. Ono's indemnity at 16.1 is also far broader than the narrow Customer indemnity the playbook permits. The procedure at 16.3 already supplies notice, sole control of the defence and full cooperation, so we add only the missing preferred heads: a stand-alone IP infringement indemnity at new 16.2A expressed to override Section 11.4, the defence duty and heads (e)-(g) in 16.2, and a narrowed 16.1. We can restore the reciprocal product-liability and clinical-study allocation if Array grants the IP indemnity.
- Proposal: **preferred** — Add Array defence duty, express IP infringement indemnity and law/confidentiality/GN-WM heads; narrow Ono's indemnity
- Comment: [Playbook] Array's indemnity omits any third party intellectual property infringement indemnity, so we have added an express one that overrides the "own expense" defence allocation in Section 11.4, together with a duty to defend and cover for Array's breach of Law, unauthorized disclosure of our Confidential Information and Array's gross negligence or willful misconduct. In exchange we have narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law, deleting its product-liability and Article 15 prongs; we can restore the reciprocal product-liability and clinical-study allocation if Array accepts the IP indemnity.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Array shall defend, indemnify and hold harmless",
    "oldText": "Array shall indemnify and hold harmless",
    "paragraphId": "p0719"
  },
  {
    "kind": "replace",
    "newText": "(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, (d) any breach of any representations, warranties or covenants by Array in Article 15 above, (e) Array's breach of applicable Law, (f) any unauthorized access to or disclosure of Ono's Confidential Information caused by Array, and (g) Array's gross negligence or willful misconduct, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.",
    "oldText": "(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Array anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Array, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Array in Article 15 above, except to the extent such Third Party Claims result from the gross negligence or willful misconduct of a Ono Indemnitee.",
    "paragraphId": "p0721"
  },
  {
    "kind": "insert_after",
    "numbering": "16.2A",
    "paragraphId": "p0721",
    "text": "Notwithstanding Section 11.4, Array shall defend and indemnify the Ono Indemnitees against any Third Party Claim alleging that any Product, or any deliverable or service supplied by Array hereunder, infringes or misappropriates the intellectual property rights of a Third Party."
  },
  {
    "kind": "replace",
    "newText": "(a) materials, data or content provided by Ono to Array under this Agreement; and",
    "oldText": "(a) the use, marketing, distribution, importation or sale of any Product by Ono, its Affiliates or Sublicensees in the Ono Territory, including any Products Liability Claim arising therefrom;",
    "paragraphId": "p0717"
  },
  {
    "kind": "replace",
    "newText": "(b) Ono's breach of applicable Law; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.",
    "oldText": "(b) injury or death of patients participating in any Clinical Studies conducted by or on behalf of Ono anywhere in the world, including any Products Liability Claim arising therefrom, (c) injury or death of patients participating in Clinical Studies conducted under any Joint Development Plan and sponsored by or on behalf of Ono, including any Products Liability Claim arising therefrom, and (d) any breach of any representations, warranties or covenants by Ono in Article 15 above; except to the extent such Third Party Claims result from the gross negligence or willful misconduct of an Array Indemnitee.",
    "paragraphId": "p0718"
  }
]
```

### Verifier and repair feedback

- [seq 586](trajectory.jsonl#L586) **Verdict: fail** — vendor indemnity for IP infringement present: failed Preferred level is complete on the operative text: 16.2 now carries an express defence duty, IP infringement (e), breach of Law (f), unauthorised access/disclosure of Ono Confidential Information (g) and gross negligence/wilful misconduct (h), while retained 16.3 already supplies notice, sole control of the defence and full cooperation, and 16.1 is narrowed to Ono-supplied materials plus Ono's breach of Law. The deterministic signal "vendor indemnity for IP infringement present = false" is not borne out in substance — new 16.2(e) is an express third-party IP infringement/misappropriation indemnity. The regex appears keyed to "Services or Deliverables" wording, which does not exist in this pharma licence; "Product" is the correct contract analogue. Fallback is not satisfied (no procure/modify/replace ladder, no refund backstop, no 3x super-cap), but that is immaterial because the preferred checklist is complete; the fallback need not be reached. Minimality holds: the additions to 16.2 are the four missing preferred coverage heads plus the single word "defend", and the deletions in 16.1 are exactly what the "Customer indemnity limited to Customer-provided content and Customer's breach of law" element requires. No survival tail, expense language, extra damages categories or boilerplate was added, and the favourable retained carve-outs and 16.3 procedure are untouched. Intent is preserved on the rendered text: the retained 16.2(a)-(d), the Products Liability Claim defined term, the Indemnitee/Indemnitor mechanics and the settlement-consent and notice-prejudice sentences all survive without contradiction, and no cross-reference is left dangling. Repair point to raise before sending, not a checklist failure: the rationale itself notes Section 11.4 leaves each Subject Party to defend Infringement Actions "at its own expense". If 11.4 covers defence of third-party infringement claims (as opposed to enforcement of the parties' own patents), add "Notwithstanding Section 11.4" at the head of 16.2(e) so the new IP indemnity is not read down by that retained sentence. Drafting nit for the comment, not the operative text: the margin note should also flag that Ono's product-liability and Article 15 indemnity prongs were deleted, since a counterparty reading only the comment ("narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law") may not appreciate that the reciprocal clinical-study allocation has gone; the rationale's offer to restore it if the IP indemnity is granted is the right trade. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 587](trajectory.jsonl#L587) **Repair round 1**: "Deterministic failures:\n- vendor indemnity for IP infringement present: failed\n\nVerifier reasons:\n- Preferred level is complete on the operative text: 16.2 now carries an express defence duty, IP infringement (e), breach of Law (f), unauthorised access/disclosure of Ono Confidential Information (g) and gross negligence/wilful misconduct (h), while retained 16.3 already supplies notice, sole control of the defence and full cooperation, and 16.1 is narrowed to Ono-supplied materials plus Ono's breach of Law.\n- The deterministic signal \"vendor indemnity for IP infringement present = false\" is not borne out in substance — new 16.2(e) is an express third-party IP infringement/misappropriation indemnity. The regex appears keyed to \"Services or Deliverables\" wording, which does not exist in this pharma licence; \"Product\" is the correct contract analogue.\n- Fallback is not satisfied (no procure/modify/replace ladder, no refund backstop, no 3x super-cap), but that is immaterial because the preferred checklist is complete; the fallback need not be reached.\n- Minimality holds: the additions to 16.2 are the four missing preferred coverage heads plus the single word \"defend\", and the deletions in 16.1 are exactly what the \"Customer indemnity limited to Customer-provided content and Customer's breach of law\" element requires. No survival tail, expense language, extra damages categories or boilerplate was added, and the favourable retained carve-outs and 16.3 procedure are untouched.\n- Intent is preserved on the rendered text: the retained 16.2(a)-(d), the Products Liability Claim defined term, the Indemnitee/Indemnitor mechanics and the settlement-consent and notice-prejudice sentences all survive without contradiction, and no cross-reference is left dangling.\n- Repair point to raise before sending, not a checklist failure: the rationale itself notes Section 11.4 leaves each Subject Party to defend Infringement Actions \"at its own expense\". If 11.4 covers defence of third-party infringement claims (as opposed to enforcement of the parties' own patents), add \"Notwithstanding Section 11.4\" at the head of 16.2(e) so the new IP indemnity is not read down by that retained sentence.\n- Drafting nit for the comment, not the operative text: the margin note should also flag that Ono's product-liability and Article 15 indemnity prongs were deleted, since a counterparty reading only the comment (\"narrowed Ono's indemnity to Ono-supplied materials and Ono's breach of Law\") may not appreciate that the reciprocal clinical-study allocation has gone; the rationale's offer to restore it if the IP indemnity is granted is the right trade."
- [seq 718](trajectory.jsonl#L718) **Verdict: repaired** — Position-complete at the preferred level: all ten preferred elements are met on the operative language (defence duty, indemnitee scope, new IP infringement head, breach of Law, unauthorised access/disclosure of Ono Confidential Information, gross negligence/wilful misconduct, plus the unamended 16.3 notice / sole control / full cooperation procedure and a narrowed 16.1). Fallback level is not complete (no procure-modify-replace remedy, no refund fallback, no 3x super-cap), but that is immaterial because the preferred checklist is fully satisfied; the two missing vendor-protective items would only narrow our recovery. Minimality holds: the edits touch only 16.1 (narrowing our indemnity, required by the tenth preferred element) and 16.2 (defence duty plus heads (e)-(g) and the IP sentence). Section 16.3 is left untouched and Array's existing product-liability/clinical-study/Article 15 prongs are retained. No survival tail, expense language, extra damages categories or boilerplate was added. The "Notwithstanding Section 11.4" opener is narrow and targeted rather than a blanket override; it is needed to stop the retained "at its own expense" Infringement Action allocation contradicting the new IP indemnity, so it preserves intent rather than creating a dangling conflict. Minor drafting point (not a failure): 16.2 now says "defend, indemnify and hold harmless" in the chapeau and the inserted sentence repeats "defend and indemnify". Consider folding the IP head into the (b)-(g) enumeration as a new clause (h) with the Section 11.4 carve-out attached, to avoid a duplicated defence formulation. Watch-item for the drafter: 16.2 continues to open at "(b)" because prong (a) sits in an uncited paragraph; confirm on the full text that the lettering still runs (a) through (g) after insertion, and that no other provision (e.g. insurance or Article 15 cross-references) points to the deleted 16.1(a)-(d) prongs. If Array resists, the natural trade is to restore the reciprocal product-liability and clinical-study allocation in 16.1 in exchange for keeping the IP indemnity, as the margin comment already offers. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"operation 5 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## NONCOMPETE — Non-compete restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 106](trajectory.jsonl#L106)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer has no non-compete or field-of-use restriction."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The restriction covers only a named competing product.",
  "The restriction applies during the term only.",
  "The restriction lasts no longer than 12 months.",
  "The restriction permits Customer's internal development.",
  "The restriction permits Customer acquisitions."
]

Planner evidence and hints:
{"ruleId":"NONCOMPETE","candidateSectionIds":["sec-viii","sec-i"],"candidateParagraphIds":["p0484","p0491","p0492","p0142"],"likelyAbsent":false,"note":"Article VIII Section 8.2 Exclusivity of Efforts (p0491) restricts Ono and its Affiliates from Commercializing a 'Competing Product' in the Ono Territory (p0492), with post-termination extension where Array terminates for Ono breach. Read for duration, scope, and acquisition/Change-in-Control carve-outs; appears mutual."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 117](trajectory.jsonl#L117) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0484","p0491","p0492","p0142"]}
```

- [seq 118](trajectory.jsonl#L118) **read_paragraphs result**

```json
[{"id":"p0484","sectionRef":"§ VIII CERTAIN COVENANTS","text":"ARTICLE VIII CERTAIN COVENANTS"},{"id":"p0491","sectionRef":"§ VIII CERTAIN COVENANTS","text":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:"},{"id":"p0492","sectionRef":"§ VIII CERTAIN COVENANTS","text":"(i) a product th…
```

- [seq 119](trajectory.jsonl#L119) **drafter → search**

```json
{"query":"Competing Product"}
```

- [seq 120](trajectory.jsonl#L120) **search result**

```json
[{"paragraphId":"p0142","sectionRef":"§ I DEFINITIONS","snippet":"…an 5.1(b) Materials 9.1(a) Committee 3.3 Medical Journal 10.4 Committee Dispute Competing Product 3.5(a) 8.2 NEMO Clinical Study [ * ] 4.1(c) 14.2(a)(ii)"},{"paragraphId":"p0492","sectionRef":"§ VIII CERTAIN COVENANTS","snippet":"…Commercialize in the Ono Territory any of the above described products (each a \"Competing Product\")…
```

- [seq 153](trajectory.jsonl#L153) **drafter → read_section**

```json
{"sectionId":"sec-viii","limit":40}
```

- [seq 154](trajectory.jsonl#L154) **read_section result**

```json
{"sectionRef":"§ VIII CERTAIN COVENANTS","cursor":0,"totalParagraphs":9,"nextCursor":null,"paragraphs":[{"id":"p0484","text":"ARTICLE VIII CERTAIN COVENANTS"},{"id":"p0485","text":"8.1 Diligence Obligations."},{"id":"p0486","text":"(a) General Diligence Obligations. Ono shall use Diligent Efforts (itself or through its Affiliates) to obtain in a prompt and expeditious manner Marketing Approvals a…
```

- [seq 155](trajectory.jsonl#L155) **drafter → search**

```json
{"query":"acquisition Change in Control acquiring party competing program"}
```

- [seq 156](trajectory.jsonl#L156) **search result**

```json
[]
```

- [seq 201](trajectory.jsonl#L201) **drafter → search**

```json
{"query":"Section 8.2"}
```

- [seq 202](trajectory.jsonl#L202) **search result**

```json
[{"paragraphId":"p0647","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…nsfer is reasonably possible. In the case of a termination by Array pursuant to Section 8.2, 13.3 or 13.4 or by Ono pursuant to Section 13.2, Ono shall be responsible for …"}]
```

- [seq 203](trajectory.jsonl#L203) **drafter → search**

```json
{"query":"shall not Develop or Commercialize outside"}
```

- [seq 204](trajectory.jsonl#L204) **search result**

```json
[]
```

- [seq 241](trajectory.jsonl#L241) **drafter → get_definition**

```json
{"term":"Term"}
```

- [seq 242](trajectory.jsonl#L242) **get_definition result**

```json
{"found":false,"nearest":["Initial Royalty Term","Secondary Royalty Term"]}
```

- [seq 243](trajectory.jsonl#L243) **drafter → search**

```json
{"query":"survive termination Article VIII"}
```

- [seq 244](trajectory.jsonl#L244) **search result**

```json
[]
```

- [seq 267](trajectory.jsonl#L267) **drafter → search**

```json
{"query":"Term of this Agreement"}
```

- [seq 268](trajectory.jsonl#L268) **search result**

```json
[{"paragraphId":"p0016","sectionRef":"§ I DEFINITIONS","snippet":"…ed by Array or its Controlled Affiliates as of the Effective Date or during the term of this Agreement, and needed by or reasonably useful to Ono in order for Ono to exercise its rig…"},{"paragraphId":"p0016","sectionRef":"§ I DEFINITIONS","snippet":"…h Development Manufacturing, and/or Commercialization of the Product during the …
```

- [seq 269](trajectory.jsonl#L269) **drafter → search**

```json
{"query":"survival Sections shall survive"}
```

- [seq 270](trajectory.jsonl#L270) **search result**

```json
[]
```

- [seq 303](trajectory.jsonl#L303) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Limit Ono's exclusivity covenant in Section 8.2 to the term of the Agreement, cap it at 12 months, and carve out internal development and acquisitions.","comment":"[Playbook] We cannot accept a post-termination non-compete of undefined length binding Ono and its Affiliates, so we have deleted the post-termination extension and confined Ono's Section 8.2 covenant to the term of the Agreement, capped at twelve (12) months, with carve-outs for our internal development and acquired products or programs. Array's side of the exclusivity is untouched; this reflects our fallback position on non-compete restrictions.","ops":[{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"Ono's and its Affiliates' obligations under this Section 8.2 shall apply only during the term of this Agreement and shall in no event extend beyond the twelve (12) month anniversary of the Effective Date, and shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."}]}
```

- [seq 304](trajectory.jsonl#L304) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0492","segments":[{"type":"equal","text":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib), or (ii) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Encorafenib), or grant the right to a licensee or distributor to Commercial…
```

- [seq 330](trajectory.jsonl#L330) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0491","p0492"],"quote":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \\\"at will\\\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","rationale":"Section 8.2 binds Ono and its Affiliates not to Commercialize a Competing Product in the Ono Territory. The product scope is acceptable at fallback because \"Competing Product\" is confined to two specified compound classes (excluding Binimetinib and Encorafenib), but the covenant fails fallback on duration and carve-outs: it extends past termination to an unspecified \"[ * ] anniversary of the date such termination takes effect\", the in-term period is likewise open-ended, and there is no carve-out for Ono's internal development or for products/programs acquired by Ono. An open-ended post-term non-compete is walk-away territory. We therefore narrowed Ono's covenant to the term, capped it at twelve months, and added internal-development and acquisition carve-outs; Array's reciprocal restriction (which benefits us) and Array's termination right under Section 8.2, cross-referenced in Section 14, are left intact.","confidence":0.8,"proposal":{"level":"fallback","summary":"Limit Ono's exclusivity covenant in Section 8.2 to the term of the Agreement, cap it at 12 months, and carve out internal development and acquisitions.","comment":"[Playbook] We cannot accept a post-termination non-compete of undefined length binding Ono and its Affiliates, so we have deleted the post-termination extension and confined Ono's Section 8.2 covenant to the term of the Agreement, capped at twelve (12) months, with carve-outs for our internal development and acquired products or programs. Array's side of the exclusivity is untouched; this reflects our fallback position on non-compete restrictions.","ops":[{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"Ono's and its Affiliates' obligations under this Section 8.2 shall apply only during the term of this Agreement and shall in no event extend beyond the twelve (12) month anniversary of the Effective Date, and shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The restriction covers only a named competing product.","status":"already_met","quote":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib), or (ii) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Encorafenib), or grant the right to a licensee or distributor to Commercialize in the Ono Territory any of the above described products (each a \"Competing Product\")."},{"element":"The restriction applies during the term only.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction lasts no longer than 12 months.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer's internal development.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer acquisitions.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 331](trajectory.jsonl#L331) **submit_finding result**

```json
{"ok":false,"errors":["quote is not a verbatim substring of a cited paragraph"]}
```

- [seq 356](trajectory.jsonl#L356) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0491","p0492"],"quote":"then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","rationale":"Section 8.2 binds Ono and its Affiliates not to Commercialize a Competing Product in the Ono Territory. The product scope is acceptable at fallback because Competing Product is confined to two specified compound classes (excluding Binimetinib and Encorafenib), but the covenant fails fallback on duration and carve-outs: it extends past termination to an unspecified anniversary of the termination date, the in-term period is likewise open-ended, and there is no carve-out for Ono's internal development or for products or programs acquired by Ono. An open-ended post-term non-compete is walk-away territory. We therefore narrowed Ono's covenant to the term, capped it at twelve months, and added internal-development and acquisition carve-outs; Array's reciprocal restriction (which benefits us) and Array's termination right under Section 8.2, cross-referenced in Article XIV, are left intact.","confidence":0.8,"proposal":{"level":"fallback","summary":"Limit Ono's exclusivity covenant in Section 8.2 to the term of the Agreement, cap it at 12 months, and carve out internal development and acquisitions.","comment":"[Playbook] We cannot accept a post-termination non-compete of undefined length binding Ono and its Affiliates, so we have deleted the post-termination extension and confined Ono's Section 8.2 covenant to the term of the Agreement, capped at twelve (12) months, with carve-outs for our internal development and acquired products or programs. Array's side of the exclusivity is untouched; this reflects our fallback position on non-compete restrictions.","ops":[{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"Ono's and its Affiliates' obligations under this Section 8.2 shall apply only during the term of this Agreement and shall in no event extend beyond the twelve (12) month anniversary of the Effective Date, and shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The restriction covers only a named competing product.","status":"already_met","quote":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib), or (ii) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Encorafenib), or grant the right to a licensee or distributor to Commercialize in the Ono Territory any of the above described products"},{"element":"The restriction applies during the term only.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction lasts no longer than 12 months.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer's internal development.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer acquisitions.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 357](trajectory.jsonl#L357) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 441](trajectory.jsonl#L441) **drafter → search**

```json
{"query":"inhibitor compound named product"}
```

- [seq 442](trajectory.jsonl#L442) **search result**

```json
[]
```

- [seq 443](trajectory.jsonl#L443) **drafter → search**

```json
{"query":"Binimetinib","limit":20}
```

- [seq 444](trajectory.jsonl#L444) **search result**

```json
[{"paragraphId":"p0016","sectionRef":"§ I DEFINITIONS","snippet":"…r related information generated in compliance with CDISC standards) relating to Binimetinib, Encorafinib, a Product and/or any Companion Diagnostic useful with respect to …"},{"paragraphId":"p0024","sectionRef":"§ I DEFINITIONS","snippet":"1.2 \"Binimetinib\" means the compound known as MEK162, the chemical structure of which is d…
```

- [seq 471](trajectory.jsonl#L471) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Narrow Ono's Section 8.2 covenant to named compounds (Binimetinib/Encorafenib), limit it to the term with a 12-month cap, and carve out internal development and acquisitions.","comment":"[Playbook] We cannot accept a class-wide, open-ended non-compete on Ono, so we have replaced the post-termination extension with language limiting Ono's Section 8.2 obligation (and Array's related remedies) to a product containing the named compounds Binimetinib or Encorafenib, confining it to the term with a twelve (12) month outer cap and carving out our internal development and acquired products or programs. Array's reciprocal restriction is untouched; this is our fallback position on non-compete restrictions.","ops":[{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"For purposes of Ono's obligations and Array's remedies under this Section 8.2, Competing Product means only a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient. Ono's and its Affiliates' obligations under this Section 8.2 shall apply only during the term of this Agreement and shall in no event extend beyond the twelve (12) month anniversary of the Effective Date, and shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."}]}
```

- [seq 472](trajectory.jsonl#L472) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0492","segments":[{"type":"equal","text":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib), or (ii) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Encorafenib), or grant the right to a licensee or distributor to Commercial…
```

- [seq 501](trajectory.jsonl#L501) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0491","p0492"],"quote":"then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","rationale":"Section 8.2 binds Ono and its Affiliates not to Commercialize a Competing Product in the Ono Territory, and fails the fallback on every prong except direction: (a) scope is class-based, catching any product whose active pharmaceutical ingredient falls within a redacted compound class, with Binimetinib and Encorafenib named only as exclusions; (b) the covenant extends past termination to an unspecified anniversary of the termination date and the in-term period is open-ended; and (c) there is no carve-out for Ono's internal development or for products or programs Ono acquires. An open-ended post-term non-compete of undefined scope is walk-away territory. Our single replacement narrows Ono's obligation (and Array's related remedies) to a product containing the named compounds Binimetinib or Encorafenib, limits it to the term with a twelve-month outer cap, and adds internal-development and acquisition carve-outs. Array's reciprocal class-wide restriction, the royalty-termination consequence and Array's Section 8.2 termination right (cross-referenced in Article XIV) are retained.","confidence":0.78,"proposal":{"level":"fallback","summary":"Narrow Ono's Section 8.2 covenant to named compounds (Binimetinib/Encorafenib), limit it to the term with a 12-month cap, and carve out internal development and acquisitions.","comment":"[Playbook] We cannot accept a class-wide, open-ended non-compete on Ono, so we have replaced the post-termination extension with language limiting Ono's Section 8.2 obligation (and Array's related remedies) to a product containing the named compounds Binimetinib or Encorafenib, confining it to the term with a twelve (12) month outer cap and carving out our internal development and acquired products or programs. Array's reciprocal restriction is untouched; this is our fallback position on non-compete restrictions.","ops":[{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"For purposes of Ono's obligations and Array's remedies under this Section 8.2, Competing Product means only a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient. Ono's and its Affiliates' obligations under this Section 8.2 shall apply only during the term of this Agreement and shall in no event extend beyond the twelve (12) month anniversary of the Effective Date, and shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The restriction covers only a named competing product.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction applies during the term only.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction lasts no longer than 12 months.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer's internal development.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The restriction permits Customer acquisitions.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 502](trajectory.jsonl#L502) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 568](trajectory.jsonl#L568) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0491"]}
```

- [seq 569](trajectory.jsonl#L569) **read_paragraphs result**

```json
[{"id":"p0491","sectionRef":"§ VIII CERTAIN COVENANTS","text":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:"}]
```

- [seq 582](trajectory.jsonl#L582) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Remove Ono from the class-based prohibition and substitute a named-compound covenant on Ono limited to the term with a 12-month cap and internal-development and acquisition carve-outs.","comment":"[Playbook] We cannot accept a class-wide, open-ended non-compete on Ono, so we have taken Ono out of the class-based prohibition in the opening sentence and substituted, in place of the post-termination extension, a covenant limited to a product containing the named compounds Binimetinib or Encorafenib, applying during the term only with a twelve (12) month outer cap and carve-outs for our internal development and acquired products or programs. Array's reciprocal restriction and its termination right are retained, with the trigger conformed to the narrowed covenant.","ops":[{"kind":"replace","paragraphId":"p0491","oldText":"neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize","newText":"neither Array nor its Controlled Affiliates shall Commercialize"},{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"During the term of this Agreement, and in no event beyond the twelve (12) month anniversary of the Effective Date, neither Ono nor its Affiliates shall Commercialize in the Ono Territory a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient. This Section 8.2 shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."},{"kind":"replace","paragraphId":"p0492","oldText":"If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement.","newText":"If Ono Commercializes a product in breach of this Section 8.2, Array may immediately terminate this Agreement."}]}
```

- [seq 583](trajectory.jsonl#L583) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0491","segments":[{"type":"equal","text":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither "},{"type":"delete","text":"Ono or its Affiliates, nor Array or "},{"type":"insert","text":"Array nor "},{"type":"equal","text":"its Controlled Affiliates"},{"type":"delete","text":","},{"type":"equal","text":" shall Commercialize in the Ono Territo…
```

- [seq 606](trajectory.jsonl#L606) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0491","p0492"],"quote":"then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","rationale":"Section 8.2 binds Ono and its Affiliates through the opening sentence of p0491 read with clauses (i) and (ii) of p0492, and fails the fallback on scope, duration and carve-outs: the prohibition reads on any product whose active pharmaceutical ingredient falls within a redacted compound class (Binimetinib and Encorafenib being named only as exclusions), the in-term trigger is an undefined redacted period, the covenant extends past termination to an unspecified anniversary of the termination date, and nothing permits Ono's internal development or acquired products or programs. An open-ended post-term non-compete of undetermined scope is walk-away territory. Our edits remove Ono from the class-based prohibition itself, substitute a covenant reading only on a product (other than a Product) containing the named compounds Binimetinib or Encorafenib, limited to the term with a twelve-month outer cap and with internal-development and acquisition carve-outs, and conform Array's termination trigger to that narrowed covenant. Array's reciprocal class-wide restriction, the royalty-termination consequence and the Article XIV cross-reference to Section 8.2 are preserved.","confidence":0.78,"proposal":{"level":"fallback","summary":"Remove Ono from the class-based prohibition and substitute a named-compound covenant on Ono limited to the term with a 12-month cap and internal-development and acquisition carve-outs.","comment":"[Playbook] We cannot accept a class-wide, open-ended non-compete on Ono, so we have taken Ono out of the class-based prohibition in the opening sentence and substituted, in place of the post-termination extension, a covenant limited to a product containing the named compounds Binimetinib or Encorafenib, applying during the term only with a twelve (12) month outer cap and carve-outs for our internal development and acquired products or programs. Array's reciprocal restriction and its termination right are retained, with the trigger conformed to the narrowed covenant.","ops":[{"kind":"replace","paragraphId":"p0491","oldText":"neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize","newText":"neither Array nor its Controlled Affiliates shall Commercialize"},{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.","newText":"During the term of this Agreement, and in no event beyond the twelve (12) month anniversary of the Effective Date, neither Ono nor its Affiliates shall Commercialize in the Ono Territory a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient. This Section 8.2 shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party."},{"kind":"replace","paragraphId":"p0492","oldText":"If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement.","newText":"If Ono Commercializes a product in breach of this Section 8.2, Array may immediately terminate this Agreement."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"The restriction covers only a named competing product.","status":"addressed_by_operation","operationIndexes":[1,2,3]},{"element":"The restriction applies during the term only.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"The restriction lasts no longer than 12 months.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"The restriction permits Customer's internal development.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"The restriction permits Customer acquisitions.","status":"addressed_by_operation","operationIndexes":[2]}]}}
```

- [seq 607](trajectory.jsonl#L607) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 606](trajectory.jsonl#L606)
- Finding: `f-noncompete-ab275276` · **deviation** · confidence 0.78
- Location: § VIII CERTAIN COVENANTS
- Quote: “then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.”
- Rationale: Section 8.2 binds Ono and its Affiliates through the opening sentence of p0491 read with clauses (i) and (ii) of p0492, and fails the fallback on scope, duration and carve-outs: the prohibition reads on any product whose active pharmaceutical ingredient falls within a redacted compound class (Binimetinib and Encorafenib being named only as exclusions), the in-term trigger is an undefined redacted period, the covenant extends past termination to an unspecified anniversary of the termination date, and nothing permits Ono's internal development or acquired products or programs. An open-ended post-term non-compete of undetermined scope is walk-away territory. Our edits remove Ono from the class-based prohibition itself, substitute a covenant reading only on a product (other than a Product) containing the named compounds Binimetinib or Encorafenib, limited to the term with a twelve-month outer cap and with internal-development and acquisition carve-outs, and conform Array's termination trigger to that narrowed covenant. Array's reciprocal class-wide restriction, the royalty-termination consequence and the Article XIV cross-reference to Section 8.2 are preserved.
- Proposal: **fallback** — Remove Ono from the class-based prohibition and substitute a named-compound covenant on Ono limited to the term with a 12-month cap and internal-development and acquisition carve-outs.
- Comment: [Playbook] We cannot accept a class-wide, open-ended non-compete on Ono, so we have taken Ono out of the class-based prohibition in the opening sentence and substituted, in place of the post-termination extension, a covenant limited to a product containing the named compounds Binimetinib or Encorafenib, applying during the term only with a twelve (12) month outer cap and carve-outs for our internal development and acquired products or programs. Array's reciprocal restriction and its termination right are retained, with the trigger conformed to the narrowed covenant.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "neither Array nor its Controlled Affiliates shall Commercialize",
    "oldText": "neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize",
    "paragraphId": "p0491"
  },
  {
    "kind": "replace",
    "newText": "During the term of this Agreement, and in no event beyond the twelve (12) month anniversary of the Effective Date, neither Ono nor its Affiliates shall Commercialize in the Ono Territory a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient. This Section 8.2 shall not restrict (i) Ono's or its Affiliates' internal research or Development activities or (ii) any product or program acquired by Ono or its Affiliates through any acquisition of or merger with a Third Party.",
    "oldText": "In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect.",
    "paragraphId": "p0492"
  },
  {
    "kind": "replace",
    "newText": "If Ono Commercializes a product in breach of this Section 8.2, Array may immediately terminate this Agreement.",
    "oldText": "If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement.",
    "paragraphId": "p0492"
  }
]
```

### Verifier and repair feedback

- [seq 417](trajectory.jsonl#L417) **Verdict: fail** — Preferred level not reached and not attempted: an operative non-compete on Customer survives in Section 8.2. Fallback level is incomplete on one element. The scope prong is class-based, not product-named: the covenant catches any product whose API is an agent within the redacted "[ * ]" class, with only Binimetinib and Encorafenib carved out. To repair, amend the chapeau/definition so Ono's obligation is limited to an expressly named competing product (or an expressly named single compound), e.g. "Ono's obligation under this Section 8.2 shall apply only to [named product]", rather than to an entire compound class whose definition is not ascertainable from the operative text. Duration, term-limitation and both carve-outs are properly rendered in operative language (not merely promised in the comment): term-only limitation, a twelve-month outer cap, internal research/Development carve-out, and an acquisition/merger carve-out. Minimality holds: the only deletion is the post-termination extension sentence, which is necessary to reach "during the term only"; Array's reciprocal restriction, the royalty-termination consequence sentence and Array's immediate termination right are all retained; no survival tails, expense language or unrelated procedure was added. Intent preserved: the retained chapeau "Prior to the [ * ]" continues to bind Array, the inserted sentence narrows only Ono's side without contradicting it, and no cross-reference (including Article XIV's reference to Section 8.2) is left dangling. Note the twelve-month cap is anchored to the Effective Date rather than to the start of the restricted period; if the Effective Date has already passed at signing this reduces the restriction to near zero, which Vendor may resist — anchoring to the Effective Date is acceptable under the checklist but expect pushback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no open-ended compete restriction on Customer remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 418](trajectory.jsonl#L418) **Repair round 1**: "Unmet fallback elements (copy these exact strings into the repaired coverage):\n- The restriction covers only a named competing product.\n Verdict: not_met. Evidence: \"Competing Product\" is defined by compound class, not by a named product: \"a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib)\" and the definitional tail \"'[ * ]' means a compound that [ * ]\". The covenant therefore reaches every product in an entire (and, on the face of the operative text, redacted/undetermined) mechanism class, not a single named competing product. Naming Binimetinib/Encorafenib only as exclusions does not name the restricted product.\n\nVerifier reasons:\n- Preferred level not reached and not attempted: an operative non-compete on Customer survives in Section 8.2.\n- Fallback level is incomplete on one element. The scope prong is class-based, not product-named: the covenant catches any product whose API is an agent within the redacted \"[ * ]\" class, with only Binimetinib and Encorafenib carved out. To repair, amend the chapeau/definition so Ono's obligation is limited to an expressly named competing product (or an expressly named single compound), e.g. \"Ono's obligation under this Section 8.2 shall apply only to [named product]\", rather than to an entire compound class whose definition is not ascertainable from the operative text.\n- Duration, term-limitation and both carve-outs are properly rendered in operative language (not merely promised in the comment): term-only limitation, a twelve-month outer cap, internal research/Development carve-out, and an acquisition/merger carve-out.\n- Minimality holds: the only deletion is the post-termination extension sentence, which is necessary to reach \"during the term only\"; Array's reciprocal restriction, the royalty-termination consequence sentence and Array's immediate termination right are all retained; no survival tails, expense language or unrelated procedure was added.\n- Intent preserved: the retained chapeau \"Prior to the [ * ]\" continues to bind Array, the inserted sentence narrows only Ono's side without contradicting it, and no cross-reference (including Article XIV's reference to Section 8.2) is left dangling. Note the twelve-month cap is anchored to the Effective Date rather than to the start of the restricted period; if the Effective Date has already passed at signing this reduces the restriction to near zero, which Vendor may resist — anchoring to the Effective Date is acceptable under the checklist but expect pushback."
- [seq 546](trajectory.jsonl#L546) **Verdict: fail** — Scope prong fails: the edit narrows only the defined term "Competing Product" for Ono's obligations, but the actual prohibition in the first sentence of Section 8.2 operates on its own class description ("an agent that is a [ * ]") and is left untouched, so Ono remains subject to a class-wide, redaction-defined field-of-use restriction. Internal contradiction: the retained opening sentence excludes Binimetinib- and Encorafenib-containing products from the restricted class ("other than Binimetinib" / "other than Encorafenib"), while the inserted definition says the restriction covers only products containing Binimetinib or Encorafenib. The two sentences cannot both be given effect, leaving the scope of Ono's covenant indeterminate. Repair in operative language: amend the opening sentence itself so that, as applied to Ono and its Affiliates, the prohibition reads on a product (other than a Product) containing Binimetinib or Encorafenib as an active pharmaceutical ingredient (or otherwise expressly disapply clauses (i) and (ii) to Ono), rather than redefining the label downstream; and delete or reconcile the "(other than Binimetinib)"/"(other than Encorafenib)" carve-outs so they do not contradict the narrowed Ono covenant. Also confirm the temporal anchor for Ono: the opening lead-in "Prior to the [ * ]" remains a redacted, undefined trigger; the new sentence overrides it for Ono, but the drafter should state expressly that the redacted period does not apply to Ono to avoid a competing anchor. Term and 12-month cap, internal development and acquisition carve-outs are all present and satisfactory; only the named-product scope prong (and the resulting inconsistency) blocks fallback completion. Minimality is satisfied: the change deletes only the post-termination extension and adds two sentences directed at the checklist elements; Array's reciprocal class-wide restriction, the royalty-termination consequence and Array's Section 8.2 termination right are retained. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no open-ended compete restriction on Customer remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 547](trajectory.jsonl#L547) **Repair round 2**: "Unmet fallback elements (copy these exact strings into the repaired coverage):\n- The restriction covers only a named competing product.\n Verdict: not_met. Evidence: The inserted sentence only redefines the label (\"For purposes of Ono's obligations and Array's remedies under this Section 8.2, Competing Product means only a product, other than a Product, that includes Binimetinib or Encorafenib as an active pharmaceutical ingredient\"), while the retained operative prohibition in the opening sentence continues to bar Ono from Commercializing the class-based products described in clauses (i) and (ii) (\"an agent that is a [ * ]\"). Worse, that retained language expressly carves the named compounds OUT of the class (\"other than Binimetinib\", \"other than Encorafenib\"), so the new definition contradicts, rather than narrows, the retained prohibition. The restriction on Ono is therefore still class-based (and internally inconsistent), not limited to a named competing product.\n\nIntent defect: restore unrelated commercial language and remove contradictions introduced by the redline.\n\nVerifier reasons:\n- Scope prong fails: the edit narrows only the defined term \"Competing Product\" for Ono's obligations, but the actual prohibition in the first sentence of Section 8.2 operates on its own class description (\"an agent that is a [ * ]\") and is left untouched, so Ono remains subject to a class-wide, redaction-defined field-of-use restriction.\n- Internal contradiction: the retained opening sentence excludes Binimetinib- and Encorafenib-containing products from the restricted class (\"other than Binimetinib\" / \"other than Encorafenib\"), while the inserted definition says the restriction covers only products containing Binimetinib or Encorafenib. The two sentences cannot both be given effect, leaving the scope of Ono's covenant indeterminate.\n- Repair in operative language: amend the opening sentence itself so that, as applied to Ono and its Affiliates, the prohibition reads on a product (other than a Product) containing Binimetinib or Encorafenib as an active pharmaceutical ingredient (or otherwise expressly disapply clauses (i) and (ii) to Ono), rather than redefining the label downstream; and delete or reconcile the \"(other than Binimetinib)\"/\"(other than Encorafenib)\" carve-outs so they do not contradict the narrowed Ono covenant.\n- Also confirm the temporal anchor for Ono: the opening lead-in \"Prior to the [ * ]\" remains a redacted, undefined trigger; the new sentence overrides it for Ono, but the drafter should state expressly that the redacted period does not apply to Ono to avoid a competing anchor.\n- Term and 12-month cap, internal development and acquisition carve-outs are all present and satisfactory; only the named-product scope prong (and the resulting inconsistency) blocks fallback completion.\n- Minimality is satisfied: the change deletes only the post-termination extension and adds two sentences directed at the checklist elements; Array's reciprocal class-wide restriction, the royalty-termination consequence and Array's Section 8.2 termination right are retained."
- [seq 658](trajectory.jsonl#L658) **Verdict: repaired** — Fallback level is position-complete: all five fallback elements appear in operative language (named compounds only, in-term only, hard 12-month cap, internal development carve-out, acquisition carve-out). Preferred is not met because a narrowed covenant still binds Customer "" that is the expected outcome for a fallback-targeted redline. Minimality holds. Removing Ono from the opening class-based prohibition is required for element 1; deleting the post-termination extension is required for elements 2 and 3; the cap and the two carve-outs are each required by a selected element. No survival tail, expense language, procedure or extra damages category was added. Conforming Array's termination trigger from "Commercializes a Competing Product in the Ono Territory during [ * ]" to "Commercializes a product in breach of this Section 8.2" is necessary rather than gratuitous: "Competing Product" now describes only Array's class-wide restriction, so the retained sentence would otherwise let Array terminate for conduct Ono is no longer prohibited from. The dropped "in the Ono Territory" and "during [ * ]" qualifiers are subsumed by the narrowed covenant, which is itself territory-, term- and 12-month-limited, so Array's right is not expanded in substance. Intent is preserved: Array's reciprocal class-wide restriction and the redacted trigger binding Array are untouched, the royalty-termination consequence for Array's own Competing Product commercialization survives with the "Competing Product" definition still operative in clauses (i)/(ii), and the definitional tail ([ * ] meanings and the avoidance-of-doubt sentence) is retained. No dangling cross-reference is created "" Section 8.2 continues to exist for the Article XIV reference, and the deleted Section 13.2/13.3 references were part of the removed post-term extension only. Drafting note only (not a defect): the cap is anchored to "the twelve (12) month anniversary of the Effective Date" rather than to the start of the covenant. That is acceptable because it can only shorten the restriction, but if the parties expect the covenant to bite from a later commercialization date, consider "twelve (12) months from the Effective Date" language being restated as the shorter of the term or twelve (12) months to avoid argument. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"no open-ended compete restriction on Customer remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## EXCLUSIVITY — Exclusivity obligations binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 107](trajectory.jsonl#L107)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer has no exclusivity or sole-supplier obligation."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Exclusivity is limited to a defined product category.",
  "Exclusivity lasts no longer than 12 months.",
  "Exclusivity ends automatically if Vendor fails to meet service levels.",
  "Exclusivity ends automatically if Vendor fails to meet delivery dates."
]

Planner evidence and hints:
{"ruleId":"EXCLUSIVITY","candidateSectionIds":["sec-viii","sec-ii","sec-ix"],"candidateParagraphIds":["p0491","p0492","p0174","p0162","p0163","p0164","p0166","p0495","p0508","p0509","p0510","p0516"],"likelyAbsent":false,"note":"Two threads: exclusivity-of-efforts covenant binding Ono (p0491-p0492, cross-referenced p0174), and supply exclusivity — Array supplying Ono's requirements for Materials (p0495, p0509, p0510) with tech-transfer/second-source path (p0508, p0516). Inbound exclusive licences (p0162, p0164) benefit us; do not flag."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 141](trajectory.jsonl#L141) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0491","p0492","p0174","p0162","p0163","p0164","p0166","p0495","p0508","p0509","p0510","p0516"]}
```

- [seq 142](trajectory.jsonl#L142) **read_paragraphs result**

```json
[{"id":"p0491","sectionRef":"§ VIII CERTAIN COVENANTS","text":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:"},{"id":"p0492","sectionRef":"§ VIII CERTAIN COVENANTS","text":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binim…
```

- [seq 143](trajectory.jsonl#L143) **drafter → search**

```json
{"query":"exclusive","limit":40}
```

- [seq 144](trajectory.jsonl#L144) **search result**

```json
[{"paragraphId":"p0009","sectionRef":"§ BACKGROUND","snippet":"D. Array is willing to grant to Ono, and Ono desires to obtain, certain exclusive rights and licenses with respect to the manufacture, registration and commercia…"},{"paragraphId":"p0119","sectionRef":"§ I DEFINITIONS","snippet":"1.53 \"Regulatory Exclusivity\" means any exclusive marketing rights or data exclusivity rights conferred …
```

- [seq 181](trajectory.jsonl#L181) **drafter → read_section**

```json
{"sectionId":"sec-viii","limit":25}
```

- [seq 182](trajectory.jsonl#L182) **read_section result**

```json
{"sectionRef":"§ VIII CERTAIN COVENANTS","cursor":0,"totalParagraphs":9,"nextCursor":null,"paragraphs":[{"id":"p0484","text":"ARTICLE VIII CERTAIN COVENANTS"},{"id":"p0485","text":"8.1 Diligence Obligations."},{"id":"p0486","text":"(a) General Diligence Obligations. Ono shall use Diligent Efforts (itself or through its Affiliates) to obtain in a prompt and expeditious manner Marketing Approvals a…
```

- [seq 183](trajectory.jsonl#L183) **drafter → search**

```json
{"query":"shall not Commercialize|sole supplier|requirements|shall purchase","regex":true,"limit":30}
```

- [seq 184](trajectory.jsonl#L184) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ I DEFINITIONS","snippet":"…y the Patents listed on Exhibit 1.5 or to the extent the same would satisfy the requirements of subsection (b) above."},{"paragraphId":"p0070","sectionRef":"§ I DEFINITIONS","snippet":"(vi) International Conference on Harmonisation of Technical Requirements for Registration of Pharmaceuticals for Human Use (\"ICH\"), Q7 Good Manuf…
```

- [seq 219](trajectory.jsonl#L219) **drafter → search**

```json
{"query":"Section 8.2","limit":20}
```

- [seq 220](trajectory.jsonl#L220) **search result**

```json
[{"paragraphId":"p0647","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…nsfer is reasonably possible. In the case of a termination by Array pursuant to Section 8.2, 13.3 or 13.4 or by Ono pursuant to Section 13.2, Ono shall be responsible for …"}]
```

- [seq 221](trajectory.jsonl#L221) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Bilateral non-compete/exclusivity of efforts covenant binding Customer (Ono) not to commercialize competing products; delete Customer-side obligation, keep Vendor-side"}
```

- [seq 222](trajectory.jsonl#L222) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 253](trajectory.jsonl#L253) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0647","p0173","p0174","p0175"]}
```

- [seq 254](trajectory.jsonl#L254) **read_paragraphs result**

```json
[{"id":"p0647","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"In addition, in the event Ono is conducting any on-going pre-clinical studies and/or formulation studies (e.g., stability studies) of the Product, Ono agrees to promptly transition to Array or its designee such pre-clinical studies and/or formulation studies to the extent such transfer is reasonably possible. In the case of a termi…
```

- [seq 285](trajectory.jsonl#L285) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete the exclusivity-of-efforts covenant insofar as it binds Ono (including the post-termination tail and Array's related termination right), retaining Array's non-compete for Ono's benefit.","comment":"[Playbook] We cannot accept an exclusivity/non-compete covenant binding Ono, so we have removed Ono and its Affiliates from Section 8.2, deleted the post-termination competing-product restriction on Ono and Array's related termination right, and conformed the cross-reference in Section 14.2(a)(i). Array's exclusivity undertaking, which benefits us, is preserved; if Array needs reciprocity we can discuss a narrow category-specific restriction capped at 12 months that lapses automatically on any Array supply failure.","ops":[{"kind":"replace","paragraphId":"p0491","oldText":"neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:","newText":"neither Array nor its Controlled Affiliates shall Commercialize in the Ono Territory:"},{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect. ","newText":""},{"kind":"replace","paragraphId":"p0492","oldText":"If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement. ","newText":""},{"kind":"replace","paragraphId":"p0647","oldText":"Section 8.2, 13.3 or 13.4","newText":"Section 13.3 or 13.4"}]}
```

- [seq 286](trajectory.jsonl#L286) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0491","segments":[{"type":"equal","text":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither "},{"type":"delete","text":"Ono or its Affiliates, nor Array or "},{"type":"insert","text":"Array nor "},{"type":"equal","text":"its Controlled Affiliates"},{"type":"delete","text":","},{"type":"equal","text":" shall Commercialize in the Ono Territo…
```

- [seq 307](trajectory.jsonl#L307) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0491","p0492","p0647"],"quote":"8.2 Exclusivity of Efforts. Prior to the [ * ], neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:","rationale":"Section 8.2 imposes an exclusive-dealing/non-compete covenant on Ono (and its Affiliates), barring us from Commercializing any Competing Product in the Ono Territory for an open-ended period, extended after termination to the [ * ] anniversary, and enforced by an immediate Array termination right. That fails the fallback: the duration is not capped at 12 months (and the post-termination tail runs longer), and the only automatic relief is Array's own commercialization of a Competing Product, not any failure by Array to meet service levels or delivery dates. The supply arrangements in Article IX are not exclusivity — Array must supply Ono's requirements (p0495, p0510), but Ono expressly retains the right to Manufacture or engage a Subcontractor and to take a technology transfer (p0508), and the inbound exclusive licences in Section 2.1 run in our favour. We therefore take the preferred position and strike the Ono-side covenant, the post-termination restriction and Array's related termination right, while preserving Array's reciprocal restriction, which benefits us; the cross-reference in Section 14.2(a)(i) is conformed so no dangling reference to a termination under Section 8.2 remains.","confidence":0.83,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer has no exclusivity or sole-supplier obligation.","status":"addressed_by_operation","operationIndexes":[1,2,3,4]}]},"proposal":{"level":"preferred","summary":"Delete the exclusivity-of-efforts covenant insofar as it binds Ono (including the post-termination tail and Array's related termination right), retaining Array's non-compete for Ono's benefit.","comment":"[Playbook] We cannot accept an exclusivity/non-compete covenant binding Ono, so we have removed Ono and its Affiliates from Section 8.2, deleted the post-termination competing-product restriction on Ono and Array's related termination right, and conformed the cross-reference in Section 14.2(a)(i). Array's exclusivity undertaking, which benefits us, is preserved; if Array needs reciprocity we can discuss a narrow category-specific restriction capped at 12 months that lapses automatically on any Array supply failure.","ops":[{"kind":"replace","paragraphId":"p0491","oldText":"neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:","newText":"neither Array nor its Controlled Affiliates shall Commercialize in the Ono Territory:"},{"kind":"replace","paragraphId":"p0492","oldText":"In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect. ","newText":""},{"kind":"replace","paragraphId":"p0492","oldText":"If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement. ","newText":""},{"kind":"replace","paragraphId":"p0647","oldText":"Section 8.2, 13.3 or 13.4","newText":"Section 13.3 or 13.4"}]}}
```

- [seq 308](trajectory.jsonl#L308) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 307](trajectory.jsonl#L307)
- Finding: `f-exclusivity-c13aee5b` · **deviation** · confidence 0.83
- Location: § VIII CERTAIN COVENANTS
- Quote: “8.2 Exclusivity of Efforts. Prior to the [ * ], neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:”
- Rationale: Section 8.2 imposes an exclusive-dealing/non-compete covenant on Ono (and its Affiliates), barring us from Commercializing any Competing Product in the Ono Territory for an open-ended period, extended after termination to the [ * ] anniversary, and enforced by an immediate Array termination right. That fails the fallback: the duration is not capped at 12 months (and the post-termination tail runs longer), and the only automatic relief is Array's own commercialization of a Competing Product, not any failure by Array to meet service levels or delivery dates. The supply arrangements in Article IX are not exclusivity — Array must supply Ono's requirements (p0495, p0510), but Ono expressly retains the right to Manufacture or engage a Subcontractor and to take a technology transfer (p0508), and the inbound exclusive licences in Section 2.1 run in our favour. We therefore take the preferred position and strike the Ono-side covenant, the post-termination restriction and Array's related termination right, while preserving Array's reciprocal restriction, which benefits us; the cross-reference in Section 14.2(a)(i) is conformed so no dangling reference to a termination under Section 8.2 remains.
- Proposal: **preferred** — Delete the exclusivity-of-efforts covenant insofar as it binds Ono (including the post-termination tail and Array's related termination right), retaining Array's non-compete for Ono's benefit.
- Comment: [Playbook] We cannot accept an exclusivity/non-compete covenant binding Ono, so we have removed Ono and its Affiliates from Section 8.2, deleted the post-termination competing-product restriction on Ono and Array's related termination right, and conformed the cross-reference in Section 14.2(a)(i). Array's exclusivity undertaking, which benefits us, is preserved; if Array needs reciprocity we can discuss a narrow category-specific restriction capped at 12 months that lapses automatically on any Array supply failure.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "neither Array nor its Controlled Affiliates shall Commercialize in the Ono Territory:",
    "oldText": "neither Ono or its Affiliates, nor Array or its Controlled Affiliates, shall Commercialize in the Ono Territory:",
    "paragraphId": "p0491"
  },
  {
    "kind": "replace",
    "newText": "",
    "oldText": "In addition, in the event that Array terminates this Agreement for Ono's breach pursuant to Section 13.3 during the [ * ], or Ono exercises its right to terminate this Agreement \"at will\" pursuant to Section 13.2 during the Initial Royalty Term, then neither Ono nor its Affiliates shall Commercialize a Competing Product or grant the right to a licensee or distributor to Commercialize a Competing Product in the Ono Territory prior to the [ * ] anniversary of the date such termination takes effect. ",
    "paragraphId": "p0492"
  },
  {
    "kind": "replace",
    "newText": "",
    "oldText": "If Ono Commercializes a Competing Product in the Ono Territory during [ * ], Array may immediately terminate this Agreement. ",
    "paragraphId": "p0492"
  },
  {
    "kind": "replace",
    "newText": "Section 13.3 or 13.4",
    "oldText": "Section 8.2, 13.3 or 13.4",
    "paragraphId": "p0647"
  }
]
```

### Verifier and repair feedback

- [seq 364](trajectory.jsonl#L364) **Verdict: pass** — Preferred level is complete: the operative text of Section 8.2 binds only Array and its Controlled Affiliates; every Ono-side restraint (in-term covenant, post-termination [ * ]-anniversary tail) and the Array termination right that enforced it are removed. Edits are confined to what removing the Customer-side covenant requires. Array's reciprocal restriction and the Customer-favourable royalty-termination sentence ("If during the [ * ], Array Commercializes a Competing Product ... Ono may continue to Commercialize the Product") are retained verbatim, as are the definitional sentences and the avoidance-of-doubt carve-out. Deleting "If Ono Commercializes a Competing Product ... Array may immediately terminate this Agreement" is necessary rather than extra: it is the enforcement mechanic for the struck covenant and would otherwise be a contingent right with no underlying obligation. Conforming Section 14.2(a)(i) from "pursuant to Section 8.2, 13.3 or 13.4" to "pursuant to Section 13.3 or 13.4" is the minimum edit needed to avoid a dangling cross-reference to a now-nonexistent Section 8.2 termination; the cost-allocation mechanics for Sections 13.2/13.3/13.4 and the wind-down cost split survive unchanged. Intent preserved: supply mechanics in Article IX, the Section 2.1 inbound licences, royalty-term mechanics and termination rights under Sections 13.2/13.3/13.4 are untouched, and no retained sentence contradicts the narrowed Section 8.2. No undefined term is created ("Competing Product" is still defined in the retained Array-side sentence). Drafting caution (not a defect found here): confirm no other provision outside the cited paragraphs cross-references a termination "pursuant to Section 8.2" or otherwise assumes an Ono non-compete; if one exists it must be conformed the same way. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MFN — Most-favoured-nation obligations burdening Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 108](trajectory.jsonl#L108)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer has no most-favoured-nation obligation benefiting Vendor."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The Customer MFN covers only a defined product.",
  "The Customer MFN lasts no longer than 12 months.",
  "The Customer MFN contains reasonable like-for-like comparison carve-outs."
]

Planner evidence and hints:
{"ruleId":"MFN","candidateSectionIds":[],"candidateParagraphIds":[],"likelyAbsent":true,"note":"No most-favoured-nation or 'no less favourable terms' language found. Nothing obliges Ono to extend best terms to Array; no redline expected."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 135](trajectory.jsonl#L135) **drafter → search**

```json
{"query":"most favoured nation no less favorable terms"}
```

- [seq 136](trajectory.jsonl#L136) **search result**

```json
[]
```

- [seq 137](trajectory.jsonl#L137) **drafter → search**

```json
{"query":"terms no less favorable than those offered to any third party"}
```

- [seq 138](trajectory.jsonl#L138) **search result**

```json
[]
```

- [seq 169](trajectory.jsonl#L169) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 170](trajectory.jsonl#L170) **search result**

```json
[{"paragraphId":"p0476","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","snippet":"…sh the other Party with appropriate documents to secure application of the most favorable rate of withholding tax under applicable Law (or exemption from such withholdin…"},{"paragraphId":"p0502","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…ontractor if such Subcontractor is unwilling to fulfi…
```

- [seq 171](trajectory.jsonl#L171) **drafter → search**

```json
{"query":"right to match offer third party"}
```

- [seq 172](trajectory.jsonl#L172) **search result**

```json
[]
```

- [seq 197](trajectory.jsonl#L197) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0500","p0501","p0502","p0503"]}
```

- [seq 198](trajectory.jsonl#L198) **read_paragraphs result**

```json
[{"id":"p0500","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","text":"9.3 Clinical Supply. The Parties shall establish as soon as practicable following the Effective Date procedures for the supply of Materials to Ono for use in performing Ono's Development activities under Development Plan and any Joint Development Plans that may subsequently be agreed to by the Parties, and the Parties sha…
```

- [seq 229](trajectory.jsonl#L229) **drafter → search**

```json
{"query":"no less favourable"}
```

- [seq 230](trajectory.jsonl#L230) **search result**

```json
[]
```

- [seq 231](trajectory.jsonl#L231) **drafter → search**

```json
{"query":"terms at least as favorable as granted to any Third Party licensee"}
```

- [seq 232](trajectory.jsonl#L232) **search result**

```json
[]
```

- [seq 273](trajectory.jsonl#L273) **drafter → search**

```json
{"query":"most favored"}
```

- [seq 274](trajectory.jsonl#L274) **search result**

```json
[]
```

- [seq 275](trajectory.jsonl#L275) **drafter → search**

```json
{"query":"right of first negotiation refusal"}
```

- [seq 276](trajectory.jsonl#L276) **search result**

```json
[]
```

- [seq 293](trajectory.jsonl#L293) **drafter → search**

```json
{"query":"better terms offered to a Third Party shall be extended"}
```

- [seq 294](trajectory.jsonl#L294) **search result**

```json
[]
```

- [seq 295](trajectory.jsonl#L295) **drafter → search**

```json
{"query":"comparable terms conditions third party agreement"}
```

- [seq 296](trajectory.jsonl#L296) **search result**

```json
[]
```

- [seq 320](trajectory.jsonl#L320) **drafter → search**

```json
{"query":"preferential pricing discount granted others"}
```

- [seq 321](trajectory.jsonl#L321) **search result**

```json
[]
```

- [seq 322](trajectory.jsonl#L322) **drafter → search**

```json
{"query":"Ono shall offer Array"}
```

- [seq 323](trajectory.jsonl#L323) **search result**

```json
[]
```

- [seq 348](trajectory.jsonl#L348) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0502"],"quote":"Array shall not require Ono to place orders directly with a Subcontractor if such Subcontractor is unwilling to fulfill such orders on terms as favorable to Ono as the terms such Subcontractors have extended to Array.","rationale":"Targeted searches for most-favoured-nation, \"no less/more favorable terms\", right-to-match, best-pricing and preferential-terms mechanics returned nothing that obliges Ono (Customer) to extend Array any terms it gives third parties. The single MFN-flavoured provision, Section 9.3(b), runs in Ono's favour: Array may not force Ono to order directly from a Subcontractor unless that Subcontractor will supply Ono on terms as favourable as those it gives Array. The only other \"favorable\" hits are a withholding-tax rate clause (§VII) and a benefit/risk safety clause (Term and Termination), neither of which is an MFN. This meets the preferred position (no Customer MFN obligation), so no redline is proposed.","confidence":0.9,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer has no most-favoured-nation obligation benefiting Vendor.","status":"already_met","quote":"Array shall not require Ono to place orders directly with a Subcontractor if such Subcontractor is unwilling to fulfill such orders on terms as favorable to Ono as the terms such Subcontractors have extended to Array."}]}}
```

- [seq 349](trajectory.jsonl#L349) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 348](trajectory.jsonl#L348)
- Finding: `f-mfn-6275b19d` · **compliant** · confidence 0.90
- Location: § IX PRODUCT MANUFACTURING AND SUPPLY
- Quote: “Array shall not require Ono to place orders directly with a Subcontractor if such Subcontractor is unwilling to fulfill such orders on terms as favorable to Ono as the terms such Subcontractors have extended to Array.”
- Rationale: Targeted searches for most-favoured-nation, "no less/more favorable terms", right-to-match, best-pricing and preferential-terms mechanics returned nothing that obliges Ono (Customer) to extend Array any terms it gives third parties. The single MFN-flavoured provision, Section 9.3(b), runs in Ono's favour: Array may not force Ono to order directly from a Subcontractor unless that Subcontractor will supply Ono on terms as favourable as those it gives Array. The only other "favorable" hits are a withholding-tax rate clause (§VII) and a benefit/risk safety clause (Term and Termination), neither of which is an MFN. This meets the preferred position (no Customer MFN obligation), so no redline is proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## NOSOLICIT — Non-solicitation of employees binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 109](trajectory.jsonl#L109)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer has no non-solicitation restriction."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The non-solicitation restriction is mutual.",
  "The restriction covers only personnel directly involved in the Services.",
  "The restriction lasts no longer than 12 months after the person's involvement ends.",
  "General advertisements are excluded from the restriction.",
  "Unsolicited approaches are excluded from the restriction.",
  "The restriction does not prohibit hiring."
]

Planner evidence and hints:
{"ruleId":"NOSOLICIT","candidateSectionIds":[],"candidateParagraphIds":[],"likelyAbsent":true,"note":"No employee non-solicitation or no-hire covenant located; searches returned only governance, FTE-cost and inventorship references. Absence is favourable to us."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 123](trajectory.jsonl#L123) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 124](trajectory.jsonl#L124) **search result**

```json
[]
```

- [seq 125](trajectory.jsonl#L125) **drafter → search**

```json
{"query":"employ or engage"}
```

- [seq 126](trajectory.jsonl#L126) **search result**

```json
[]
```

- [seq 159](trajectory.jsonl#L159) **drafter → search**

```json
{"query":"hire"}
```

- [seq 160](trajectory.jsonl#L160) **search result**

```json
[]
```

- [seq 161](trajectory.jsonl#L161) **drafter → search**

```json
{"query":"induce"}
```

- [seq 162](trajectory.jsonl#L162) **search result**

```json
[{"paragraphId":"p0102","sectionRef":"§ I DEFINITIONS","snippet":"…ed contributions actually made by the Selling Party for \"Contributions for Drug Induced Suffering\" and any sales-based contribution for \"Contribution for Measure for …"},{"paragraphId":"p0668","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…fficacy of the Product, which concealment or falsification (i) is undertaken to i…
```

- [seq 163](trajectory.jsonl#L163) **drafter → search**

```json
{"query":"employee"}
```

- [seq 164](trajectory.jsonl#L164) **search result**

```json
[{"paragraphId":"p0083","sectionRef":"§ I DEFINITIONS","snippet":"…he term of the Agreement that (a) are jointly created or reduced to practice by employees, consultants, or contractors of Array or its Affiliates and by employees, cons…"},{"paragraphId":"p0083","sectionRef":"§ I DEFINITIONS","snippet":"…ice by employees, consultants, or contractors of Array or its Affiliates and by employees, con…
```

- [seq 165](trajectory.jsonl#L165) **drafter → search**

```json
{"query":"personnel"}
```

- [seq 166](trajectory.jsonl#L166) **search result**

```json
[{"paragraphId":"p0234","sectionRef":"§ III GOVERNANCE","snippet":"…C to solve any specific issues from time to time. Each Party shall bear its own personnel and travel costs and expenses relating to Committee meetings. With the consent …"},{"paragraphId":"p0281","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…ts incurred by the Parties together with FTE-costs associated wit…
```

- [seq 187](trajectory.jsonl#L187) **drafter → search**

```json
{"query":"recruit"}
```

- [seq 188](trajectory.jsonl#L188) **search result**

```json
[]
```

- [seq 189](trajectory.jsonl#L189) **drafter → search**

```json
{"query":"shall not, directly or indirectly"}
```

- [seq 190](trajectory.jsonl#L190) **search result**

```json
[]
```

- [seq 191](trajectory.jsonl#L191) **drafter → search**

```json
{"query":"offer of employment"}
```

- [seq 192](trajectory.jsonl#L192) **search result**

```json
[]
```

- [seq 193](trajectory.jsonl#L193) **drafter → search**

```json
{"query":"Non-Solicitation"}
```

- [seq 194](trajectory.jsonl#L194) **search result**

```json
[]
```

- [seq 225](trajectory.jsonl#L225) **drafter → list_sections**

```json
{}
```

- [seq 226](trajectory.jsonl#L226) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 257](trajectory.jsonl#L257) **drafter → read_section**

```json
{"sectionId":"sec-viii"}
```

- [seq 258](trajectory.jsonl#L258) **read_section result**

```json
{"sectionRef":"§ VIII CERTAIN COVENANTS","cursor":0,"totalParagraphs":9,"nextCursor":null,"paragraphs":[{"id":"p0484","text":"ARTICLE VIII CERTAIN COVENANTS"},{"id":"p0485","text":"8.1 Diligence Obligations."},{"id":"p0486","text":"(a) General Diligence Obligations. Ono shall use Diligent Efforts (itself or through its Affiliates) to obtain in a prompt and expeditious manner Marketing Approvals a…
```

- [seq 289](trajectory.jsonl#L289) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0484","p0491"],"quote":"ARTICLE VIII CERTAIN COVENANTS","rationale":"Full-text searches for \"solicit\", \"non-solicitation\", \"recruit\", \"hire\", \"employ or engage\", \"induce\", \"offer of employment\" and reviews of the covenant-bearing provisions (Article VIII Certain Covenants, the Governance, Representations/Warranties/Covenants and General Provisions articles) return no employee non-solicitation or no-hire covenant anywhere in the Agreement. The only restrictive covenant on Ono is the Section 8.2 product exclusivity of efforts, which is a competing-product restriction and is assessed under the exclusivity rule, not here. Ono is therefore subject to no non-solicitation restriction, which meets the preferred position (and is favourable to us); no redline is proposed.","confidence":0.9}
```

- [seq 290](trajectory.jsonl#L290) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 289](trajectory.jsonl#L289)
- Finding: `f-nosolicit-fb8f9eaa` · **compliant** · confidence 0.90
- Location: § VIII CERTAIN COVENANTS
- Quote: “ARTICLE VIII CERTAIN COVENANTS”
- Rationale: Full-text searches for "solicit", "non-solicitation", "recruit", "hire", "employ or engage", "induce", "offer of employment" and reviews of the covenant-bearing provisions (Article VIII Certain Covenants, the Governance, Representations/Warranties/Covenants and General Provisions articles) return no employee non-solicitation or no-hire covenant anywhere in the Agreement. The only restrictive covenant on Ono is the Section 8.2 product exclusivity of efforts, which is a competing-product restriction and is assessed under the exclusivity rule, not here. Ono is therefore subject to no non-solicitation restriction, which meets the preferred position (and is favourable to us); no redline is proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 318](trajectory.jsonl#L318)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer may terminate the Agreement or an Order Form for convenience.",
  "Customer's convenience termination requires no more than 30 days' written notice.",
  "Vendor refunds prepaid fees pro rata after Customer's convenience termination.",
  "Vendor has no right to terminate for convenience during a committed term."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Customer may terminate for convenience on 60 to 90 days' notice.",
  "Any early-termination fee is capped at three months of fees.",
  "Vendor may terminate for convenience only at the end of a term.",
  "Vendor must give at least 90 days' notice of convenience termination."
]

Planner evidence and hints:
{"ruleId":"T4C","candidateSectionIds":["sec-p0626","sec-xiv"],"candidateParagraphIds":["p0627","p0628","p0629","p0630","p0633","p0647","p0652"],"likelyAbsent":false,"note":"Section 13.2 Termination by Ono without Cause (p0628) — convenience right but commencing on a redacted date tied to First Commercial Sale; check notice period and wind-down/cost consequences (p0647, p0652). Also 13.3 breach (p0629) and 13.4 bankruptcy (p0630, p0633); confirm Array has no reciprocal convenience exit."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 342](trajectory.jsonl#L342) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0626","p0627","p0628","p0629","p0630","p0633","p0647","p0652"]}
```

- [seq 343](trajectory.jsonl#L343) **read_paragraphs result**

```json
[{"id":"p0626","sectionRef":"§ TERM AND TERMINATION","text":"TERM AND TERMINATION"},{"id":"p0627","sectionRef":"§ TERM AND TERMINATION","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with …
```

- [seq 344](trajectory.jsonl#L344) **drafter → search**

```json
{"query":"terminate this Agreement without cause"}
```

- [seq 345](trajectory.jsonl#L345) **search result**

```json
[]
```

- [seq 368](trajectory.jsonl#L368) **drafter → search**

```json
{"query":"Array shall have the right to terminate"}
```

- [seq 369](trajectory.jsonl#L369) **search result**

```json
[]
```

- [seq 370](trajectory.jsonl#L370) **drafter → search**

```json
{"query":"Section 8.2 termination"}
```

- [seq 371](trajectory.jsonl#L371) **search result**

```json
[]
```

- [seq 393](trajectory.jsonl#L393) **drafter → search**

```json
{"query":"terminate","limit":50}
```

- [seq 394](trajectory.jsonl#L394) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ I DEFINITIONS","snippet":"…such country equals or exceeds [ * ], the Initial Royalty Term will immediately terminate with respect to such Product."},{"paragraphId":"p0322","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…strictions in this Section 4.5(b) shall not apply to PFM, and shall immediately terminate upon a Change in Control of…
```

- [seq 421](trajectory.jsonl#L421) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0492","p0635","p0636","p0631","p0632","p0634"]}
```

- [seq 422](trajectory.jsonl#L422) **read_paragraphs result**

```json
[{"id":"p0492","sectionRef":"§ VIII CERTAIN COVENANTS","text":"(i) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Binimetinib), or (ii) a product that includes, as an active pharmaceutical ingredient, an agent that is a [ * ] (other than Encorafenib), or grant the right to a licensee or distributor to Commercialize in the Ono Territory any of…
```

- [seq 447](trajectory.jsonl#L447) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"Licensee at-will termination right with delayed commencement and redacted notice period; licensor has no convenience right"}
```

- [seq 448](trajectory.jsonl#L448) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 475](trajectory.jsonl#L475) **drafter → propose_redline**

```json
{"level":"preferred","comment":"[Playbook] Our position is that we must be able to exit for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have removed the delayed start tied to First Commercial Sale, fixed the notice period at thirty (30) days and added the pro-rata refund; Array retains no convenience exit under Article 13. If helpful, we can discuss 60-90 days' notice as a fallback.","summary":"Make Ono's at-will termination right available immediately on 30 days' notice with pro-rata refund of prepaid fees.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono shall have the right to terminate this Agreement at any time, for any reasons by giving thirty (30) days advance written notice to Array which shall be accompanied by the rationale for such termination. Array shall refund to Ono, on a pro rata basis, any fees prepaid by Ono for the period after the effective date of such termination."}]}
```

- [seq 476](trajectory.jsonl#L476) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0628","segments":[{"type":"equal","text":"13.2 Termination by Ono without Cause. "},{"type":"delete","text":"Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to ter…
```

- [seq 505](trajectory.jsonl#L505) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0628","p0627"],"quote":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","rationale":"Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all — walk-away territory under this rule — and the notice period itself is redacted rather than fixed at 30 days. There is also no pro-rata refund of prepaid amounts on such a termination. Array's side is acceptable: Article 13 gives Array only for-cause exits (13.3 material breach, 13.4 bankruptcy) plus the competing-product trigger in Section 8.2, so it has no convenience right during the committed term. The redline therefore makes the smallest change on our side only: it deletes the delayed commencement, fixes 30 days' written notice and adds the pro-rata refund, leaving the rationale requirement and all other termination mechanics untouched.","confidence":0.78,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect","explanation":"Article 13 gives Array only for-cause termination rights (13.3 material breach, 13.4 bankruptcy), so it has no convenience exit."}]},"proposal":{"level":"preferred","summary":"Make Ono's at-will termination right available immediately on 30 days' notice with pro-rata refund of prepaid fees.","comment":"[Playbook] Our position is that we must be able to exit for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have removed the delayed start tied to First Commercial Sale, fixed the notice period at thirty (30) days and added the pro-rata refund; Array retains no convenience exit under Article 13. If helpful, we can discuss 60-90 days' notice as a fallback.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono shall have the right to terminate this Agreement at any time, for any reasons by giving thirty (30) days advance written notice to Array which shall be accompanied by the rationale for such termination. Array shall refund to Ono, on a pro rata basis, any fees prepaid by Ono for the period after the effective date of such termination."}]}}
```

- [seq 506](trajectory.jsonl#L506) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 572](trajectory.jsonl#L572) **drafter → read_section**

```json
{"sectionId":"sec-p0626","limit":25}
```

- [seq 573](trajectory.jsonl#L573) **read_section result**

```json
{"sectionRef":"§ TERM AND TERMINATION","cursor":0,"totalParagraphs":13,"nextCursor":null,"paragraphs":[{"id":"p0626","text":"TERM AND TERMINATION"},{"id":"p0627","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Se…
```

- [seq 594](trajectory.jsonl#L594) **drafter → propose_redline**

```json
{"level":"preferred","comment":"[Playbook] Our position is that we must be able to exit for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have deleted the delayed start tied to First Commercial Sale, stated the right expressly as a termination for convenience exercisable at any time on thirty (30) days' notice, and added the pro-rata refund; Array retains no convenience exit under Article 13. If helpful, we can discuss 60-90 days' notice as a fallback.","summary":"Make Ono's termination for convenience exercisable at any time on 30 days' notice with pro-rata refund of prepaid fees.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono shall have the right to terminate this Agreement for convenience at any time, for any reasons by giving thirty (30) days advance written notice to Array which shall be accompanied by the rationale for such termination. Array shall refund to Ono, on a pro rata basis, any fees prepaid by Ono for the period after the effective date of such termination."}]}
```

- [seq 595](trajectory.jsonl#L595) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0628","segments":[{"type":"equal","text":"13.2 Termination by Ono without Cause. "},{"type":"delete","text":"Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to ter…
```

- [seq 618](trajectory.jsonl#L618) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0628","p0627"],"quote":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","rationale":"Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all — walk-away territory under this rule — and the notice period is redacted rather than fixed at 30 days. There is also no pro-rata refund of prepaid amounts on such a termination. Array's side is acceptable: having read the whole of Article 13 (13.1-13.5), Array's only exits are for cause — 13.3 material breach and 13.4 bankruptcy — with 13.5 giving Ono alone the Safety/Efficacy exits and Section 8.2 a competing-product trigger; Array has no convenience right during the committed term. The redline makes the smallest change on our side only: it deletes the delayed commencement, states the right expressly as a termination for convenience exercisable at any time on thirty (30) days' advance written notice, and adds the pro-rata refund, leaving the rationale requirement and all other termination and wind-down mechanics untouched.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect","explanation":"Article 13 read in full gives Array only for-cause exits (13.3 material breach, 13.4 bankruptcy); 13.5 Safety/Efficacy terminations run to Ono only, so Array has no convenience exit."}]},"proposal":{"level":"preferred","summary":"Make Ono's termination for convenience exercisable at any time on 30 days' notice with pro-rata refund of prepaid fees.","comment":"[Playbook] Our position is that we must be able to exit for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have deleted the delayed start tied to First Commercial Sale, stated the right expressly as a termination for convenience exercisable at any time on thirty (30) days' notice, and added the pro-rata refund; Array retains no convenience exit under Article 13. If helpful, we can discuss 60-90 days' notice as a fallback.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono shall have the right to terminate this Agreement for convenience at any time, for any reasons by giving thirty (30) days advance written notice to Array which shall be accompanied by the rationale for such termination. Array shall refund to Ono, on a pro rata basis, any fees prepaid by Ono for the period after the effective date of such termination."}]}}
```

- [seq 619](trajectory.jsonl#L619) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 690](trajectory.jsonl#L690) **drafter → propose_redline**

```json
{"level":"preferred","comment":"[Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have deleted the delayed start tied to First Commercial Sale, made the right an express termination for convenience exercisable at any time on thirty (30) days' prior written notice, and added the pro-rata refund; Array retains no convenience exit under Article 13. We can discuss 60-90 days' notice as a fallback.","summary":"Ono may terminate for convenience at any time on 30 days' prior written notice, with pro-rata refund of prepaid fees.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees for the period after the effective date of such termination."}]}
```

- [seq 691](trajectory.jsonl#L691) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0628","segments":[{"type":"equal","text":"13.2 Termination by Ono without Cause. "},{"type":"delete","text":"Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to ter…
```

- [seq 722](trajectory.jsonl#L722) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0628","p0627"],"quote":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","rationale":"Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all — walk-away territory under this rule — and the notice period is redacted rather than fixed at 30 days. There is also no pro-rata refund of prepaid amounts. Array's side is acceptable: across the whole of Article 13 (13.1-13.5) Array's only exits are for cause — 13.3 material breach and 13.4 bankruptcy — with 13.5 Safety/Efficacy terminations running to Ono alone and Section 8.2 a competing-product trigger, so Array has no convenience right during the committed term. The redline makes the smallest change on our side only: it deletes the delayed commencement, states an express right for Ono to terminate for convenience at any time on thirty (30) days' prior written notice, and adds the pro-rata refund of prepaid fees, retaining the heading, \"for any reasons\" and the rationale-with-notice requirement and leaving all other termination and wind-down mechanics untouched.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect","explanation":"Article 13 read in full gives Array only for-cause exits (13.3 material breach, 13.4 bankruptcy); the 13.5 Safety/Efficacy terminations run to Ono only, so Array has no convenience exit during the term."}]},"proposal":"{\"level\": \"preferred\", \"summary\": \"Ono may terminate for convenience at any time on 30 days' prior written notice, with pro-rata refund of prepaid fees.\", \"comment\": \"[Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have deleted the delayed start tied to First Commercial Sale, made the right an express termination for convenience exercisable at any time on thirty (30) days' prior written notice, and added the pro-rata refund; Array retains no convenience exit under Article 13. We can discuss 60-90 days' notice as a fallback.\", \"ops\": [{\"kind\": \"replace\", \"paragraphId\": \"p0628\", \"oldText\": \"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.\", \"newText\": \"13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees for the period after the effective date of such termination.\"}]"}
```

- [seq 723](trajectory.jsonl#L723) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"object\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"proposal\"\n ],\n \"message\": \"Invalid input: expected object, received string\"\n }\n]"}
```

- [seq 750](trajectory.jsonl#L750) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0628","p0627"],"quote":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","rationale":"Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all - walk-away territory under this rule - and the notice period is redacted rather than fixed at 30 days. There is also no pro-rata refund of prepaid amounts. Array's side is acceptable: across the whole of Article 13 (13.1-13.5) Array's only exits are for cause - 13.3 material breach and 13.4 bankruptcy - with the 13.5 Safety/Efficacy terminations running to Ono alone and Section 8.2 a competing-product trigger, so Array has no convenience right during the committed term. The redline makes the smallest change, on our side only: it deletes the delayed commencement, states an express right for Ono to terminate for convenience at any time on thirty (30) days' prior written notice, and adds the pro-rata refund of prepaid fees, while retaining the heading, the for-any-reasons language and the rationale-with-notice requirement and leaving all other termination and wind-down mechanics untouched.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect"}]},"proposal":{"level":"preferred","summary":"Ono may terminate for convenience at any time on 30 days' prior written notice, with pro-rata refund of prepaid fees.","comment":"[Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid fees. We have deleted the delayed start tied to First Commercial Sale, made the right an express termination for convenience exercisable at any time on thirty (30) days' prior written notice, and added the pro-rata refund; Array retains no convenience exit under Article 13. We can discuss 60-90 days' notice as a fallback.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees for the period after the effective date of such termination."}]}}
```

- [seq 751](trajectory.jsonl#L751) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 840](trajectory.jsonl#L840) **drafter → search**

```json
{"query":"non-refundable"}
```

- [seq 841](trajectory.jsonl#L841) **search result**

```json
[]
```

- [seq 842](trajectory.jsonl#L842) **drafter → search**

```json
{"query":"nonrefundable non-creditable upfront payment"}
```

- [seq 843](trajectory.jsonl#L843) **search result**

```json
[]
```

- [seq 870](trajectory.jsonl#L870) **drafter → search**

```json
{"query":"refund","limit":30}
```

- [seq 871](trajectory.jsonl#L871) **search result**

```json
[{"paragraphId":"p0384","sectionRef":"§ VI PAYMENTS","snippet":"…bed in Section 7.3. This license fee set forth in this Section 6.1 shall not be refundable or creditable against any future milestone payments, royalties or other pay…"}]
```

- [seq 872](trajectory.jsonl#L872) **drafter → search**

```json
{"query":"Upfront Payment","limit":20}
```

- [seq 873](trajectory.jsonl#L873) **search result**

```json
[]
```

- [seq 898](trajectory.jsonl#L898) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0384"]}
```

- [seq 899](trajectory.jsonl#L899) **read_paragraphs result**

```json
[{"id":"p0384","sectionRef":"§ VI PAYMENTS","text":"6.1 Upfront Fee. Ono shall pay to Array a license fee equal to Three Billion Five Hundred Million Japanese Yen (¥3,500,000,000), on or before the date that is ten (10) Business Days after the receipt by Ono of invoice for such license fee and the taxation documents expressly described in Section 7.3. This license fee set forth in this Section 6.…
```

- [seq 926](trajectory.jsonl#L926) **drafter → propose_redline**

```json
{"level":"preferred","comment":"[Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid amounts. We have deleted the delayed start tied to First Commercial Sale, made 13.2 an express termination for convenience exercisable at any time on thirty (30) days' prior written notice with a pro-rata refund, and carved Section 13.2 out of the Section 6.1 non-refundability sentence so the two provisions read together. Array retains no convenience exit under Article 13; we can discuss 60-90 days' notice as a fallback.","summary":"Ono may terminate for convenience at any time on 30 days' notice with pro-rata refund; conform Section 6.1 non-refundability.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees or other amounts prepaid by Ono for the period after the effective date of such termination."},{"kind":"replace","paragraphId":"p0384","oldText":"This license fee set forth in this Section 6.1 shall not be refundable","newText":"Except as provided in Section 13.2, this license fee set forth in this Section 6.1 shall not be refundable"}]}
```

- [seq 927](trajectory.jsonl#L927) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0628","segments":[{"type":"equal","text":"13.2 Termination by Ono without Cause. "},{"type":"delete","text":"Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to ter…
```

- [seq 956](trajectory.jsonl#L956) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0628","p0627","p0384"],"quote":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","rationale":"Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all - walk-away territory under this rule - the notice period is redacted rather than fixed at 30 days, and no refund of prepaid amounts is provided. Array's side is acceptable: across the whole of Article 13 (13.1-13.5) Array's only exits are for cause (13.3 material breach, 13.4 bankruptcy), the 13.5 Safety/Efficacy terminations run to Ono alone, and Section 8.2 is a competing-product trigger, so Array has no convenience right during the committed term. Operation 1 makes the smallest change on our side: it deletes the delayed commencement, gives Ono an express right to terminate for convenience at any time on thirty (30) days' prior written notice, and adds the pro-rata refund, retaining the heading, the for-any-reasons language and the rationale-with-notice condition. On the verifier's diligence point, the only retained non-refundability language is the Section 6.1 upfront licence fee sentence; operation 2 carves Section 13.2 out of it so the refund is not contradicted, rather than adding a broad notwithstanding override. All other termination and wind-down mechanics are untouched.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1,2]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect"}]},"proposal":{"level":"preferred","summary":"Ono may terminate for convenience at any time on 30 days' notice with pro-rata refund; conform Section 6.1 non-refundability.","comment":"[Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid amounts. We have deleted the delayed start tied to First Commercial Sale, made 13.2 an express termination for convenience exercisable at any time on thirty (30) days' prior written notice with a pro-rata refund, and carved Section 13.2 out of the Section 6.1 non-refundability sentence so the two provisions read together. Array retains no convenience exit under Article 13; we can discuss 60-90 days' notice as a fallback.","ops":[{"kind":"replace","paragraphId":"p0628","oldText":"13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.","newText":"13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees or other amounts prepaid by Ono for the period after the effective date of such termination."},{"kind":"replace","paragraphId":"p0384","oldText":"This license fee set forth in this Section 6.1 shall not be refundable","newText":"Except as provided in Section 13.2, this license fee set forth in this Section 6.1 shall not be refundable"}]}}
```

- [seq 957](trajectory.jsonl#L957) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1003](trajectory.jsonl#L1003)
- Finding: `f-t4c-e69274f5` · **needs_review** · confidence 0.80
- Location: § TERM AND TERMINATION
- Quote: “13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.”
- Rationale: Section 13.2 gives Ono (our side) an at-will exit, but it does not arise until the later of two redacted periods measured from First Commercial Sale of each Product, so for a multi-year stretch of a term running to expiry of the Secondary Royalty Term (13.1) we have no convenience right at all - walk-away territory under this rule - the notice period is redacted rather than fixed at 30 days, and no refund of prepaid amounts is provided. Array's side is acceptable: across the whole of Article 13 (13.1-13.5) Array's only exits are for cause (13.3 material breach, 13.4 bankruptcy), the 13.5 Safety/Efficacy terminations run to Ono alone, and Section 8.2 is a competing-product trigger, so Array has no convenience right during the committed term. Operation 1 makes the smallest change on our side: it deletes the delayed commencement, gives Ono an express right to terminate for convenience at any time on thirty (30) days' prior written notice, and adds the pro-rata refund, retaining the heading, the for-any-reasons language and the rationale-with-notice condition. On the verifier's diligence point, the only retained non-refundability language is the Section 6.1 upfront licence fee sentence; operation 2 carves Section 13.2 out of it so the refund is not contradicted, rather than adding a broad notwithstanding override. All other termination and wind-down mechanics are untouched.
- Proposal: **preferred** — Ono may terminate for convenience at any time on 30 days' notice with pro-rata refund; conform Section 6.1 non-refundability.
- Comment: [Playbook] Our position is that we must be able to terminate for convenience on 30 days' notice with a pro-rata refund of prepaid amounts. We have deleted the delayed start tied to First Commercial Sale, made 13.2 an express termination for convenience exercisable at any time on thirty (30) days' prior written notice with a pro-rata refund, and carved Section 13.2 out of the Section 6.1 non-refundability sentence so the two provisions read together. Array retains no convenience exit under Article 13; we can discuss 60-90 days' notice as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "13.2 Termination by Ono without Cause. Ono may terminate this Agreement for convenience at any time, for any reasons, upon thirty (30) days' prior written notice to Array which shall be accompanied by the rationale for such termination, in which case Array shall refund on a pro rata basis any prepaid fees or other amounts prepaid by Ono for the period after the effective date of such termination.",
    "oldText": "13.2 Termination by Ono without Cause. Commencing on the later of (i) [ * ] of the First Commercial Sale of the Binimetinib Product in the Ono Territory, or (ii) [ * ] of the First Commercial Sale of the Encorafenib Product in the Ono Territory, Ono shall have the right to terminate this Agreement, for any reasons by giving [ * ] advance written notice to Array which shall be accompanied by the rationale for such termination.",
    "paragraphId": "p0628"
  },
  {
    "kind": "replace",
    "newText": "Except as provided in Section 13.2, this license fee set forth in this Section 6.1 shall not be refundable",
    "oldText": "This license fee set forth in this Section 6.1 shall not be refundable",
    "paragraphId": "p0384"
  }
]
```

### Verifier and repair feedback

- [seq 550](trajectory.jsonl#L550) **Verdict: fail** — Customer convenience termination present: failed All four preferred elements are met in the rendered operative language: the delayed commencement tied to the later of two redacted First Commercial Sale periods is deleted so the right is exercisable 'at any time', the redacted notice period is fixed at thirty (30) days' advance written notice, an express pro rata refund of prepaid fees for the post-termination period is added, and Array retains no convenience exit under Article 13. The finding is correctly classified as a deviation: pre-redline, Ono had no convenience right for a multi-year stretch of a term running to expiry of the Secondary Royalty Term, which is walk-away territory under the rule ('No Customer right to terminate for convenience in a multi-year term'), and the notice period was redacted rather than fixed. Minimality holds. The edit touches only Section 13.2, retains the favourable existing 'for any reasons' language and the pre-existing rationale-with-notice mechanic, and adds no survival tail, at-own-expense language, procedures, or extras. The model language's 'in whole or in part' and 'or any Order Form' were correctly omitted because there is no Order Form or partial-termination structure in this license agreement, consistent with the T4C surplus guidance. Section 13.1 is quoted only as evidence of the already-met Vendor element and is left unamended. Intent is preserved. Section 13.1's term, expiry, post-expiry perpetual license, trademark and domain name mechanics survive unchanged; the 'unless terminated earlier pursuant to this Article 13' hook continues to operate; no undefined term, dangling cross-reference, or contradictory retained sentence is created. Array's for-cause exits (13.3, 13.4) and the Section 8.2 competing-product trigger are untouched. The deterministic check 'Customer convenience termination present: false' is a false negative on inspection: revised 13.2 is captioned 'Termination by Ono without Cause' and grants Ono the right to terminate 'at any time, for any reasons', which is an unconditional Customer election and therefore a convenience right under the stated rule boundary. The substance overrides the regex miss. The fallback level is not complete solely because the notice period is 30 days rather than 60-90 days; this is a better-than-fallback outcome and does not affect position completeness, which is achieved at the preferred level. One residual point for the drafter to confirm (not a defect in the rendered text): the preferred Vendor element relies on Article 13.3-13.5 and Section 8.2 containing no Array at-will exit. That was verified against the finding rationale but the full text of those subsections was not supplied; confirm before sending that no Array convenience right survives elsewhere in Article 13. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 551](trajectory.jsonl#L551) **Repair round 1**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nVerifier reasons:\n- All four preferred elements are met in the rendered operative language: the delayed commencement tied to the later of two redacted First Commercial Sale periods is deleted so the right is exercisable 'at any time', the redacted notice period is fixed at thirty (30) days' advance written notice, an express pro rata refund of prepaid fees for the post-termination period is added, and Array retains no convenience exit under Article 13.\n- The finding is correctly classified as a deviation: pre-redline, Ono had no convenience right for a multi-year stretch of a term running to expiry of the Secondary Royalty Term, which is walk-away territory under the rule ('No Customer right to terminate for convenience in a multi-year term'), and the notice period was redacted rather than fixed.\n- Minimality holds. The edit touches only Section 13.2, retains the favourable existing 'for any reasons' language and the pre-existing rationale-with-notice mechanic, and adds no survival tail, at-own-expense language, procedures, or extras. The model language's 'in whole or in part' and 'or any Order Form' were correctly omitted because there is no Order Form or partial-termination structure in this license agreement, consistent with the T4C surplus guidance. Section 13.1 is quoted only as evidence of the already-met Vendor element and is left unamended.\n- Intent is preserved. Section 13.1's term, expiry, post-expiry perpetual license, trademark and domain name mechanics survive unchanged; the 'unless terminated earlier pursuant to this Article 13' hook continues to operate; no undefined term, dangling cross-reference, or contradictory retained sentence is created. Array's for-cause exits (13.3, 13.4) and the Section 8.2 competing-product trigger are untouched.\n- The deterministic check 'Customer convenience termination present: false' is a false negative on inspection: revised 13.2 is captioned 'Termination by Ono without Cause' and grants Ono the right to terminate 'at any time, for any reasons', which is an unconditional Customer election and therefore a convenience right under the stated rule boundary. The substance overrides the regex miss.\n- The fallback level is not complete solely because the notice period is 30 days rather than 60-90 days; this is a better-than-fallback outcome and does not affect position completeness, which is achieved at the preferred level.\n- One residual point for the drafter to confirm (not a defect in the rendered text): the preferred Vendor element relies on Article 13.3-13.5 and Section 8.2 containing no Array at-will exit. That was verified against the finding rationale but the full text of those subsections was not supplied; confirm before sending that no Array convenience right survives elsewhere in Article 13."
- [seq 662](trajectory.jsonl#L662) **Verdict: fail** — Customer convenience termination present: failed Preferred level is complete on the operative text: an unconditional Ono election to terminate "for convenience at any time," 30 days' advance written notice, an express pro-rata refund of prepaid fees, and no Array convenience exit anywhere in Article 13. The deterministic check "Customer convenience termination present: ok=false" is a false negative on substance — the rendered 13.2 contains "Ono shall have the right to terminate this Agreement for convenience at any time... by giving thirty (30) days advance written notice." The regex result should not override the plain language; the remaining gates (operation applies, minimality, element coverage) are consistent with completeness. Fallback is incomplete only on the notice-period element (30 days rather than 60-90); this is immaterial because the proposal sits at the stronger preferred level, and the comment properly flags 60-90 days as a negotiable fallback rather than embedding it. Minimality holds: the only deletions are the delayed-commencement trigger (the later of two redacted periods after First Commercial Sale) and the redacted notice period, both of which must go to reach the preferred notice and at-will elements. Customer-favourable and neutral retained language survives — the heading, "for any reasons," and the requirement that notice be accompanied by the rationale. The drafter correctly omitted the model-language surplus "in whole or in part," which is unnecessary absent an Order Form or partial-termination structure, and added no survival tail, procedure or boilerplate. Intent is preserved: 13.1's term, Product-by-Product/country-by-country expiry, post-expiry licence conversion and trademark/domain rights are untouched; the for-cause (13.3), bankruptcy (13.4) and Safety/Efficacy (13.5) mechanics and Section 8.2 remain operative and are not contradicted by an at-will Ono exit that 13.1 already contemplates ("unless terminated earlier pursuant to this Article 13"). No dangling cross-reference or undefined trigger is introduced. Minor drafting point for the negotiator (rationale-level, not a defect requiring repair): this Agreement's economics are upfront/milestone/royalty payments rather than subscription "fees," so consider confirming that "fees prepaid by Ono" captures the intended prepaid amounts; as drafted it is workable and does not create an undefined term. Finding status "deviation" is correct: the original 13.2 gave Ono no convenience right until the later of two redacted post-First-Commercial-Sale periods in a term running to expiry of the Secondary Royalty Term, i.e. no Customer convenience right for a multi-year stretch — walk-away territory — with a redacted notice period and no refund. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 663](trajectory.jsonl#L663) **Repair round 2**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nVerifier reasons:\n- Preferred level is complete on the operative text: an unconditional Ono election to terminate \"for convenience at any time,\" 30 days' advance written notice, an express pro-rata refund of prepaid fees, and no Array convenience exit anywhere in Article 13.\n- The deterministic check \"Customer convenience termination present: ok=false\" is a false negative on substance — the rendered 13.2 contains \"Ono shall have the right to terminate this Agreement for convenience at any time... by giving thirty (30) days advance written notice.\" The regex result should not override the plain language; the remaining gates (operation applies, minimality, element coverage) are consistent with completeness.\n- Fallback is incomplete only on the notice-period element (30 days rather than 60-90); this is immaterial because the proposal sits at the stronger preferred level, and the comment properly flags 60-90 days as a negotiable fallback rather than embedding it.\n- Minimality holds: the only deletions are the delayed-commencement trigger (the later of two redacted periods after First Commercial Sale) and the redacted notice period, both of which must go to reach the preferred notice and at-will elements. Customer-favourable and neutral retained language survives — the heading, \"for any reasons,\" and the requirement that notice be accompanied by the rationale. The drafter correctly omitted the model-language surplus \"in whole or in part,\" which is unnecessary absent an Order Form or partial-termination structure, and added no survival tail, procedure or boilerplate.\n- Intent is preserved: 13.1's term, Product-by-Product/country-by-country expiry, post-expiry licence conversion and trademark/domain rights are untouched; the for-cause (13.3), bankruptcy (13.4) and Safety/Efficacy (13.5) mechanics and Section 8.2 remain operative and are not contradicted by an at-will Ono exit that 13.1 already contemplates (\"unless terminated earlier pursuant to this Article 13\"). No dangling cross-reference or undefined trigger is introduced.\n- Minor drafting point for the negotiator (rationale-level, not a defect requiring repair): this Agreement's economics are upfront/milestone/royalty payments rather than subscription \"fees,\" so consider confirming that \"fees prepaid by Ono\" captures the intended prepaid amounts; as drafted it is workable and does not create an undefined term.\n- Finding status \"deviation\" is correct: the original 13.2 gave Ono no convenience right until the later of two redacted post-First-Commercial-Sale periods in a term running to expiry of the Secondary Royalty Term, i.e. no Customer convenience right for a multi-year stretch — walk-away territory — with a redacted notice period and no refund."
- [seq 814](trajectory.jsonl#L814) **Verdict: fail** — Customer convenience termination present: failed Position-complete at the preferred level: all four preferred elements are met in operative language (30 days, at any time, express pro rata refund, no Array convenience exit). The fallback level is incomplete only because notice is 30 days rather than 60–90 — that is a Customer-favourable deviation from the fallback band, not a defect. The deterministic check "Customer convenience termination present" returned false, but inspected in substance this is a false negative on the rendered text: revised 13.2 reads "Ono may terminate this Agreement for convenience at any time." The check appears to have been run against the original clause, whose right was delayed until the later of two redacted post-First-Commercial-Sale periods and framed as "for any reasons" rather than "for convenience." Deviation classification is correct: the original 13.2 gave Ono no convenience exit for a multi-year stretch of a term running to expiry of the Secondary Royalty Term, and fixed no notice period (redacted) — walk-away territory under this rule. Minimality holds. Deleting the "Commencing on the later of (i)/(ii)..." trigger is necessary to create a right exercisable during the committed term; the notice figure and pro rata refund are required by elements 2 and 3. The drafter retained the heading, "for any reasons," and the rationale-with-notice condition, added no survival tail, no at-own-expense language, no procedure, and correctly omitted "in whole or in part" (surplus here, as there is no Order Form or partial-termination structure). Intent is preserved: 13.1's "unless terminated earlier pursuant to this Article 13" still resolves, no cross-reference is left dangling, and 13.3–13.5 wind-down mechanics are untouched. One diligence point for the drafter, not a defect on the face of the redline: confirm no retained payment provision (e.g., an upfront/milestone non-refundability sentence in Article 6 or the Article 13 consequences-of-termination section) contradicts the new "Array shall refund on a pro rata basis any prepaid fees" language; if one exists, the refund sentence must be made expressly notwithstanding it or the retained sentence conformed. Optional tightening (not required for completeness): "prepaid fees" is not a defined term in this agreement, which uses upfront, milestone and royalty payments — consider "any amounts prepaid by Ono for the period after the effective date of such termination" to avoid an argument that no "fees" were ever prepaid. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 815](trajectory.jsonl#L815) **Repair round 3**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nVerifier reasons:\n- Position-complete at the preferred level: all four preferred elements are met in operative language (30 days, at any time, express pro rata refund, no Array convenience exit). The fallback level is incomplete only because notice is 30 days rather than 60–90 — that is a Customer-favourable deviation from the fallback band, not a defect.\n- The deterministic check \"Customer convenience termination present\" returned false, but inspected in substance this is a false negative on the rendered text: revised 13.2 reads \"Ono may terminate this Agreement for convenience at any time.\" The check appears to have been run against the original clause, whose right was delayed until the later of two redacted post-First-Commercial-Sale periods and framed as \"for any reasons\" rather than \"for convenience.\"\n- Deviation classification is correct: the original 13.2 gave Ono no convenience exit for a multi-year stretch of a term running to expiry of the Secondary Royalty Term, and fixed no notice period (redacted) — walk-away territory under this rule.\n- Minimality holds. Deleting the \"Commencing on the later of (i)/(ii)...\" trigger is necessary to create a right exercisable during the committed term; the notice figure and pro rata refund are required by elements 2 and 3. The drafter retained the heading, \"for any reasons,\" and the rationale-with-notice condition, added no survival tail, no at-own-expense language, no procedure, and correctly omitted \"in whole or in part\" (surplus here, as there is no Order Form or partial-termination structure).\n- Intent is preserved: 13.1's \"unless terminated earlier pursuant to this Article 13\" still resolves, no cross-reference is left dangling, and 13.3–13.5 wind-down mechanics are untouched. One diligence point for the drafter, not a defect on the face of the redline: confirm no retained payment provision (e.g., an upfront/milestone non-refundability sentence in Article 6 or the Article 13 consequences-of-termination section) contradicts the new \"Array shall refund on a pro rata basis any prepaid fees\" language; if one exists, the refund sentence must be made expressly notwithstanding it or the retained sentence conformed.\n- Optional tightening (not required for completeness): \"prepaid fees\" is not a defined term in this agreement, which uses upfront, milestone and royalty payments — consider \"any amounts prepaid by Ono for the period after the effective date of such termination\" to avoid an argument that no \"fees\" were ever prepaid."
- [seq 1004](trajectory.jsonl#L1004) **Verdict: fail** — Customer convenience termination present: failed Position-complete at the preferred level: all four preferred elements are met in operative language (30-day at-will right, express pro rata refund, no Array convenience exit). The deterministic check "Customer convenience termination present" returned false, but inspected in substance this is a regex artefact — the rendered 13.2 reads "Ono may terminate this Agreement for convenience at any time... upon thirty (30) days' prior written notice", using the party alias (Ono) rather than the generic 'Customer', so the element is in fact present. Minimality holds: only the delayed First-Commercial-Sale commencement was removed, the notice period fixed and the refund sentence added; the heading, the "for any reasons" language and the rationale-with-notice condition are retained, and the model-language surplus "in whole or in part" was correctly omitted (no Order Form or partial-termination structure here). Operation 2 is a narrow "Except as provided in Section 13.2" carve-out rather than a broad notwithstanding override, and it is necessary to prevent the retained Section 6.1 non-refundability sentence from contradicting the new refund obligation. Watch point (not a failure): the refund reaches "prepaid fees or other amounts prepaid by Ono", which is broader than the checklist's "prepaid fees". It is Customer-favourable and stays within the refund element, but if Array pushes back, narrowing to "prepaid fees" and dropping the 6.1 carve-out (the ¥3.5bn upfront licence fee is arguably not a fee "for the period after" termination) would be the cleaner minimal landing. Intent preserved: 13.1's term, expiry and post-expiry licence mechanics, and the 13.3–13.5 for-cause and safety/efficacy exits, are untouched; no dangling cross-reference or undefined term is created (Section 13.2 is a live reference). Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 366](trajectory.jsonl#L366)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Renewal requires mutual written agreement unless every conditional automatic-renewal element below is met.",
  "If renewal is automatic, each renewal term is no longer than 12 months.",
  "If renewal is automatic, Customer may opt out on no more than 30 days' notice.",
  "If renewal is automatic, Vendor must remind Customer at least 60 days before renewal.",
  "If renewal permits price increases, each increase is capped at the lesser of CPI and 3 percent."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "If renewal is automatic, Customer's non-renewal notice window is no more than 60 days.",
  "If renewal permits price increases, each increase is capped at 5 percent."
]

Planner evidence and hints:
{"ruleId":"RENEWAL","candidateSectionIds":["sec-p0626"],"candidateParagraphIds":["p0627"],"likelyAbsent":false,"note":"Section 13.1 Term (p0627) runs from the Effective Date on a Product/country royalty-term basis; no auto-renewal or non-renewal notice window found. Confirm from the full paragraph — likely a note rather than a deviation."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 387](trajectory.jsonl#L387) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0627"]}
```

- [seq 388](trajectory.jsonl#L388) **read_paragraphs result**

```json
[{"id":"p0627","sectionRef":"§ TERM AND TERMINATION","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with respect to such Product expires, at which time this Agreement shall expire in its e…
```

- [seq 389](trajectory.jsonl#L389) **drafter → search**

```json
{"query":"automatically renew renewal term"}
```

- [seq 390](trajectory.jsonl#L390) **search result**

```json
[]
```

- [seq 411](trajectory.jsonl#L411) **drafter → search**

```json
{"query":"renew"}
```

- [seq 412](trajectory.jsonl#L412) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ I DEFINITIONS","snippet":"…egistrations, patent term extensions, supplemental protection certificates, and renewals of any the Patents listed on Exhibit 1.5 or to the extent the same would sat…"},{"paragraphId":"p0109","sectionRef":"§ I DEFINITIONS","snippet":"…egistrations, patent term extensions, supplemental protection certificates, and renewals of any o…
```

- [seq 413](trajectory.jsonl#L413) **drafter → search**

```json
{"query":"extend the term extension of the term"}
```

- [seq 414](trajectory.jsonl#L414) **search result**

```json
[]
```

- [seq 435](trajectory.jsonl#L435) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0672"]}
```

- [seq 436](trajectory.jsonl#L436) **read_paragraphs result**

```json
[{"id":"p0672","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"14.4 No Renewal, Extension or Waiver. Acceptance of any order from, or sale or license of, any Product to Ono after the notice or effective date of expiration or termination of this Agreement in its entirety shall not be construed as a renewal or extension hereof, or as a waiver of expiration or termination of this Agreement in its…
```

- [seq 437](trajectory.jsonl#L437) **drafter → search**

```json
{"query":"then-current term notice prior to expiration"}
```

- [seq 438](trajectory.jsonl#L438) **search result**

```json
[]
```

- [seq 465](trajectory.jsonl#L465) **drafter → get_definition**

```json
{"term":"Secondary Royalty Term"}
```

- [seq 466](trajectory.jsonl#L466) **get_definition result**

```json
{"found":true,"term":"Secondary Royalty Term","paragraphId":"p0121","text":"1.55 \"Secondary Royalty Term\" means on a Product-by-Product and country by country basis within the Ono Territory, the period commencing on the expiration of the Initial Royalty Term for such Product and continuing until the [ * ] of the expiration of the Initial Royalty Term for such Product in such country."}
```

- [seq 467](trajectory.jsonl#L467) **drafter → read_section**

```json
{"sectionId":"sec-p0626","limit":6}
```

- [seq 468](trajectory.jsonl#L468) **read_section result**

```json
{"sectionRef":"§ TERM AND TERMINATION","cursor":0,"totalParagraphs":13,"nextCursor":6,"paragraphs":[{"id":"p0626","text":"TERM AND TERMINATION"},{"id":"p0627","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secon…
```

- [seq 491](trajectory.jsonl#L491) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0627","p0672"],"quote":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with respect to such Product expires, at which time this Agreement shall expire in its entirety with respect to such Product in such country.","rationale":"Section 13.1 sets a single, self-executing term running on a Product-by-Product and country-by-country basis until expiry of the Secondary Royalty Term; there is no automatic renewal, no rolling renewal term, no non-renewal notice window and no renewal price-uplift mechanic anywhere in the Agreement (searches for renewal/extension language return only patent-term references and Section 14.4). Section 14.4 (\"No Renewal, Extension or Waiver\") reinforces this by providing that continued dealings after expiry or termination \"shall not be construed as a renewal or extension hereof,\" so any extension would require a fresh mutual written agreement — the preferred position. The automatic-renewal conditional elements (12-month renewal term, 30-day opt-out, 60-day Vendor reminder) and the price-cap elements are not triggered because renewal is not automatic and no renewal pricing is contemplated. On expiry, Ono's Section 2.1 licences convert to perpetual, fully paid-up, royalty-free licences, which is favourable to us. No redline proposed.","confidence":0.86}
```

- [seq 492](trajectory.jsonl#L492) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 491](trajectory.jsonl#L491)
- Finding: `f-renewal-8020be6b` · **compliant** · confidence 0.86
- Location: § TERM AND TERMINATION
- Quote: “13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with respect to such Product expires, at which time this Agreement shall expire in its entirety with respect to such Product in such country.”
- Rationale: Section 13.1 sets a single, self-executing term running on a Product-by-Product and country-by-country basis until expiry of the Secondary Royalty Term; there is no automatic renewal, no rolling renewal term, no non-renewal notice window and no renewal price-uplift mechanic anywhere in the Agreement (searches for renewal/extension language return only patent-term references and Section 14.4). Section 14.4 ("No Renewal, Extension or Waiver") reinforces this by providing that continued dealings after expiry or termination "shall not be construed as a renewal or extension hereof," so any extension would require a fresh mutual written agreement — the preferred position. The automatic-renewal conditional elements (12-month renewal term, 30-day opt-out, 60-day Vendor reminder) and the price-cap elements are not triggered because renewal is not automatic and no renewal pricing is contemplated. On expiry, Ono's Section 2.1 licences convert to perpetual, fully paid-up, royalty-free licences, which is favourable to us. No redline proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 375](trajectory.jsonl#L375)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "New York law governs the Agreement.",
  "State and federal courts in New York County have exclusive jurisdiction over the merits, subject only to temporary injunctive relief elsewhere."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The governing law is Delaware, California, or England and Wales.",
  "The dispute forum is the corresponding Delaware or California courts, or the courts of London for England and Wales law."
]

Planner evidence and hints:
{"ruleId":"GOVLAW","candidateSectionIds":["sec-p0759","sec-xvii"],"candidateParagraphIds":["p0765","p0744","p0747","p0748","p0749","p0751","p0757"],"likelyAbsent":false,"note":"Section 18.3 Governing Law at p0765 (text truncated in snippet — read in full). Disputes resolved by binding ICC arbitration, three arbitrators (p0747-p0748), seat Osaka if demanded by Array / New York if demanded by Ono, Emergency Arbitrator Provisions disapplied; Expert determination track at p0749/p0757. Assess against accepted-law list and courts-over-arbitration preference; the seat mechanic is symmetric."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 397](trajectory.jsonl#L397) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0765","p0744","p0747","p0748","p0749","p0751","p0757"]}
```

- [seq 398](trajectory.jsonl#L398) **read_paragraphs result**

```json
[{"id":"p0765","sectionRef":"§ GENERAL PROVISIONS","text":"18.3 Governing Law. This Agreement and all questions regarding its validity or interpretation, or the breach or performance of this Agreement, shall be governed by, and construed and enforced in accordance with, the laws of the State of New York, United States, without reference to conflict of law principles. The Parties hereby agree that…
```

- [seq 399](trajectory.jsonl#L399) **drafter → search**

```json
{"query":"governing law"}
```

- [seq 400](trajectory.jsonl#L400) **search result**

```json
[{"paragraphId":"p0749","sectionRef":"§ XVII DISPUTE RESOLUTION","snippet":"…xperts after having consulted with the Parties. For the avoidance of doubt, the governing law set forth in Section 18.3 shall not apply to determine any procedural issues. I…"},{"paragraphId":"p0749","sectionRef":"§ XVII DISPUTE RESOLUTION","snippet":"…generality of the foregoing, the Parties agree that the procedural ru…
```

- [seq 425](trajectory.jsonl#L425) **drafter → read_section**

```json
{"sectionId":"sec-xvii","limit":40}
```

- [seq 426](trajectory.jsonl#L426) **read_section result**

```json
{"sectionRef":"§ XVII DISPUTE RESOLUTION","cursor":0,"totalParagraphs":24,"nextCursor":null,"paragraphs":[{"id":"p0734","text":"ARTICLE XVII DISPUTE RESOLUTION"},{"id":"p0735","text":"17.1 Referral to Senior Executives. The Parties recognize that disputes as to certain matters relating to this Agreement may from time to time arise during the term of this Agreement. Any such dispute which cannot b…
```

- [seq 451](trajectory.jsonl#L451) **drafter → search**

```json
{"query":"Arbitration Tribunal"}
```

- [seq 452](trajectory.jsonl#L452) **search result**

```json
[{"paragraphId":"p0134","sectionRef":"§ I DEFINITIONS","snippet":"… Section Defined Approved Clinical Study 4.4(a)(i) Infringement Actions 11.4(a) Arbitration Tribunal Array Array Indemnitees"},{"paragraphId":"p0748","sectionRef":"§ XVII DISPUTE RESOLUTION","snippet":"…), and the panel of three arbitrators so selected is referred to herein as the \"Arbitration Tribunal.\" The seat of the arbitrat…
```

- [seq 453](trajectory.jsonl#L453) **drafter → search**

```json
{"query":"Section 17.3"}
```

- [seq 454](trajectory.jsonl#L454) **search result**

```json
[{"paragraphId":"p0667","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…ith respect thereto, the agreement shall be referred for resolution pursuant to Section 17.3 applied mutatis mutandis to such agreement."},{"paragraphId":"p0735","sectionRef":"§ XVII DISPUTE RESOLUTION","snippet":"…17.2 shall apply, and (b) with respect to all other disputes, the provisions of Section 17.3 shall apply.…
```

- [seq 479](trajectory.jsonl#L479) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0134"]}
```

- [seq 480](trajectory.jsonl#L480) **read_paragraphs result**

```json
[{"id":"p0134","sectionRef":"§ I DEFINITIONS","text":"Term Section Defined Term Section Defined Approved Clinical Study 4.4(a)(i) Infringement Actions 11.4(a) Arbitration Tribunal Array Array Indemnitees"}]
```

- [seq 481](trajectory.jsonl#L481) **drafter → lookup_precedent**

```json
{"ruleId":"GOVLAW","context":"Replace mandatory ICC arbitration (seat Osaka/New York) with exclusive New York County court jurisdiction; New York law already governs."}
```

- [seq 482](trajectory.jsonl#L482) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 509](trajectory.jsonl#L509) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Replace mandatory ICC arbitration (seat Osaka or New York) with exclusive jurisdiction of the state and federal courts in New York County, subject only to temporary injunctive relief elsewhere; New York governing law in Section 18.3 is unchanged.","comment":"[Playbook] New York law already governs under Section 18.3, but our playbook requires courts rather than mandatory arbitration, and the current seat mechanic can place a Dispute in Osaka. We have therefore replaced the ICC arbitration forum and its tribunal machinery with exclusive jurisdiction of the state and federal courts in New York County, preserving each Party's ability to seek temporary injunctive relief elsewhere and retaining the internal-counsel privilege protection.","ops":[{"kind":"replace","paragraphId":"p0744","oldText":"17.3 Arbitration.","newText":"17.3 Jurisdiction."},{"kind":"replace","paragraphId":"p0747","oldText":"shall be exclusively resolved by final and binding arbitration as follows:","newText":"shall be resolved exclusively as follows:"},{"kind":"replace","paragraphId":"p0748","oldText":"(a) Arbitration under the ICC Rules of Arbitration. The arbitration shall be conducted by three (3) arbitrators according to the ICC Rules of Arbitration (\"Rules\"), and the panel of three arbitrators so selected is referred to herein as the \"Arbitration Tribunal.\" The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location. The Emergency Arbitrator Provisions shall not apply.","newText":"(a) Exclusive Jurisdiction. The state and federal courts located in New York County, New York, USA shall have exclusive jurisdiction over the merits of any Dispute, and each Party irrevocably submits to that jurisdiction; provided that either Party may apply to any other court of competent jurisdiction for temporary injunctive relief."},{"kind":"delete_paragraph","paragraphId":"p0749"},{"kind":"delete_paragraph","paragraphId":"p0750"},{"kind":"delete_paragraph","paragraphId":"p0751"},{"kind":"delete_paragraph","paragraphId":"p0754"},{"kind":"delete_paragraph","paragraphId":"p0755"},{"kind":"delete_paragraph","paragraphId":"p0757"},{"kind":"replace","paragraphId":"p0756","oldText":"(f) Non-Disclosure","newText":"(b) Non-Disclosure"}]}
```

- [seq 510](trajectory.jsonl#L510) **propose_redline result** — **validation rejected**

```json
{"ok":false,"errors":["Operation 4 deletes a whole paragraph; replace only the offending words or sentence","Operation 5 deletes a whole paragraph; replace only the offending words or sentence","Operation 6 deletes a whole paragraph; replace only the offending words or sentence","Operation 7 deletes a whole paragraph; replace only the offending words or sentence","Operation 8 deletes a whole para…
```

- [seq 528](trajectory.jsonl#L528) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Replace mandatory ICC arbitration (seat Osaka or New York) with exclusive jurisdiction of the state and federal courts in New York County, subject only to temporary injunctive relief elsewhere, and disapply the residual arbitration machinery; New York governing law in Section 18.3 is unchanged.","comment":"[Playbook] New York law already governs under Section 18.3, but our position is courts rather than mandatory arbitration, and the current seat mechanic can place a Dispute in Osaka. We have replaced the arbitration forum with exclusive jurisdiction of the state and federal courts in New York County over the merits, preserved each Party's right to seek temporary injunctive relief elsewhere, and switched off the residual tribunal provisions while retaining the internal-counsel privilege protection in Section 17.3(f).","ops":[{"kind":"replace","paragraphId":"p0744","oldText":"17.3 Arbitration.","newText":"17.3 Jurisdiction."},{"kind":"replace","paragraphId":"p0747","oldText":"shall be exclusively resolved by final and binding arbitration as follows:","newText":"shall be resolved exclusively as follows:"},{"kind":"replace","paragraphId":"p0748","oldText":"(a) Arbitration under the ICC Rules of Arbitration. The arbitration shall be conducted by three (3) arbitrators according to the ICC Rules of Arbitration (\"Rules\"), and the panel of three arbitrators so selected is referred to herein as the \"Arbitration Tribunal.\" The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location. The Emergency Arbitrator Provisions shall not apply.","newText":"(a) Exclusive Jurisdiction. The state and federal courts located in New York County, New York, USA shall have exclusive jurisdiction over the merits of any Dispute, and each Party irrevocably submits to that jurisdiction; provided that either Party may apply to any other court of competent jurisdiction for temporary injunctive relief. The remaining provisions of this Section 17.3, other than Section 17.3(f), shall not apply."}]}
```

- [seq 529](trajectory.jsonl#L529) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0744","segments":[{"type":"equal","text":"17.3 "},{"type":"delete","text":"Arbitration"},{"type":"insert","text":"Jurisdiction"},{"type":"equal","text":". Except with respect to (i) those matters subject to determination by the Experts as provided in Section 17.2, or (ii) any dispute between the Parties concerning the inventorship of intellectua…
```

- [seq 560](trajectory.jsonl#L560) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0744","p0747","p0748","p0765","p0757"],"quote":"The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location.","rationale":"Governing law is acceptable at the preferred level: Section 18.3 (p0765) applies the laws of the State of New York. The forum, however, fails both preferred and fallback. Section 17.3 (p0744, p0747) makes every Dispute \"exclusively resolved by final and binding arbitration\" under the ICC Rules, and Section 17.3(a) (p0748) seats that arbitration in Osaka, Japan whenever Array demands it. That is mandatory arbitration that may be seated abroad — walk-away territory under this rule — and there is no court forum for the merits anywhere in the Agreement; Section 17.3(g) (p0757) preserves court access only for provisional relief. Because New York law is already in place, we target the preferred position: we convert the Section 17.3 forum to the exclusive jurisdiction of the state and federal courts in New York County over the merits, retaining each Party's ability to seek temporary injunctive relief in any other court, and expressly disapply the residual tribunal machinery (while preserving the internal-counsel privilege protection in Section 17.3(f)) so no contradictory arbitration mechanic survives. The Expert determination track in Section 17.2 is untouched.","confidence":0.86,"proposal":{"level":"preferred","summary":"Replace mandatory ICC arbitration (seat Osaka or New York) with exclusive jurisdiction of the state and federal courts in New York County, subject only to temporary injunctive relief elsewhere, and disapply the residual arbitration machinery; New York governing law in Section 18.3 is unchanged.","comment":"[Playbook] New York law already governs under Section 18.3, but our position is courts rather than mandatory arbitration, and the current seat mechanic can place a Dispute in Osaka. We have replaced the arbitration forum with exclusive jurisdiction of the state and federal courts in New York County over the merits, preserved each Party's right to seek temporary injunctive relief elsewhere, and switched off the residual tribunal provisions while retaining the internal-counsel privilege protection in Section 17.3(f).","ops":[{"kind":"replace","paragraphId":"p0744","oldText":"17.3 Arbitration.","newText":"17.3 Jurisdiction."},{"kind":"replace","paragraphId":"p0747","oldText":"shall be exclusively resolved by final and binding arbitration as follows:","newText":"shall be resolved exclusively as follows:"},{"kind":"replace","paragraphId":"p0748","oldText":"(a) Arbitration under the ICC Rules of Arbitration. The arbitration shall be conducted by three (3) arbitrators according to the ICC Rules of Arbitration (\"Rules\"), and the panel of three arbitrators so selected is referred to herein as the \"Arbitration Tribunal.\" The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location. The Emergency Arbitrator Provisions shall not apply.","newText":"(a) Exclusive Jurisdiction. The state and federal courts located in New York County, New York, USA shall have exclusive jurisdiction over the merits of any Dispute, and each Party irrevocably submits to that jurisdiction; provided that either Party may apply to any other court of competent jurisdiction for temporary injunctive relief. The remaining provisions of this Section 17.3, other than Section 17.3(f), shall not apply."}]},"elementCoverage":{"level":"preferred","mappings":[{"element":"New York law governs the Agreement.","status":"already_met","quote":"shall be governed by, and construed and enforced in accordance with, the laws of the State of New York, United States, without reference to conflict of law principles"},{"element":"State and federal courts in New York County have exclusive jurisdiction over the merits, subject only to temporary injunctive relief elsewhere.","status":"addressed_by_operation","operationIndexes":[1,2,3]}]}}
```

- [seq 561](trajectory.jsonl#L561) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 560](trajectory.jsonl#L560)
- Finding: `f-govlaw-954cc2fb` · **deviation** · confidence 0.86
- Location: § XVII DISPUTE RESOLUTION
- Quote: “The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location.”
- Rationale: Governing law is acceptable at the preferred level: Section 18.3 (p0765) applies the laws of the State of New York. The forum, however, fails both preferred and fallback. Section 17.3 (p0744, p0747) makes every Dispute "exclusively resolved by final and binding arbitration" under the ICC Rules, and Section 17.3(a) (p0748) seats that arbitration in Osaka, Japan whenever Array demands it. That is mandatory arbitration that may be seated abroad — walk-away territory under this rule — and there is no court forum for the merits anywhere in the Agreement; Section 17.3(g) (p0757) preserves court access only for provisional relief. Because New York law is already in place, we target the preferred position: we convert the Section 17.3 forum to the exclusive jurisdiction of the state and federal courts in New York County over the merits, retaining each Party's ability to seek temporary injunctive relief in any other court, and expressly disapply the residual tribunal machinery (while preserving the internal-counsel privilege protection in Section 17.3(f)) so no contradictory arbitration mechanic survives. The Expert determination track in Section 17.2 is untouched.
- Proposal: **preferred** — Replace mandatory ICC arbitration (seat Osaka or New York) with exclusive jurisdiction of the state and federal courts in New York County, subject only to temporary injunctive relief elsewhere, and disapply the residual arbitration machinery; New York governing law in Section 18.3 is unchanged.
- Comment: [Playbook] New York law already governs under Section 18.3, but our position is courts rather than mandatory arbitration, and the current seat mechanic can place a Dispute in Osaka. We have replaced the arbitration forum with exclusive jurisdiction of the state and federal courts in New York County over the merits, preserved each Party's right to seek temporary injunctive relief elsewhere, and switched off the residual tribunal provisions while retaining the internal-counsel privilege protection in Section 17.3(f).
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "17.3 Jurisdiction.",
    "oldText": "17.3 Arbitration.",
    "paragraphId": "p0744"
  },
  {
    "kind": "replace",
    "newText": "shall be resolved exclusively as follows:",
    "oldText": "shall be exclusively resolved by final and binding arbitration as follows:",
    "paragraphId": "p0747"
  },
  {
    "kind": "replace",
    "newText": "(a) Exclusive Jurisdiction. The state and federal courts located in New York County, New York, USA shall have exclusive jurisdiction over the merits of any Dispute, and each Party irrevocably submits to that jurisdiction; provided that either Party may apply to any other court of competent jurisdiction for temporary injunctive relief. The remaining provisions of this Section 17.3, other than Section 17.3(f), shall not apply.",
    "oldText": "(a) Arbitration under the ICC Rules of Arbitration. The arbitration shall be conducted by three (3) arbitrators according to the ICC Rules of Arbitration (\"Rules\"), and the panel of three arbitrators so selected is referred to herein as the \"Arbitration Tribunal.\" The seat of the arbitration shall be in Osaka, Japan, if it is demanded by Array, and in New York, NY, USA, if it is demanded by Ono, with hearings to held in the same location. The Emergency Arbitrator Provisions shall not apply.",
    "paragraphId": "p0748"
  }
]
```

### Verifier and repair feedback

- [seq 602](trajectory.jsonl#L602) **Verdict: pass** — Position-complete at the preferred level: New York law was already in place under Section 18.3 and required no edit, and the new Section 17.3(a) supplies exclusive New York County state and federal court jurisdiction over the merits with only a temporary injunctive relief carve-out. The finding is correctly classified as a deviation: the original Section 17.3 imposed mandatory ICC arbitration that Array could seat in Osaka, Japan, which is walk-away territory under GOVLAW, and no court forum for the merits existed anywhere in the Agreement (17.3(g) preserved court access only for provisional relief). Minimal: the edit changes only the forum mechanic (heading, the "final and binding arbitration" operative words, and the seat provision in 17.3(a)) and leaves Section 18.3, the Section 17.2 Expert track, the inventorship carve-out, and the Section 17.3(f) internal-counsel privilege protection intact. The disapplication sentence is necessary rather than an unnecessary override, because subsections 17.3(b)-(g) would otherwise survive as contradictory arbitration machinery; a bare jurisdiction sentence would not do the job here. Intent preserved: allocation of Expert-determinable matters, the inventorship remedies carve-out, and each Party's access to provisional relief all survive without contradiction, and the disapplication sentence resolves the conflict with the retained arbitration text. Cleanup recommendation (not a level failure): the replaced Section 17.3(a) contained the definitions of "Arbitration Tribunal" and "Rules", which are still used in the retained-but-disapplied Section 17.3(g) and possibly in the retained Section 17.3(f). Because 17.3(g) is expressly inoperative this creates no operative ambiguity, but the cleaner execution is to strike Sections 17.3(b)-(e) and (g) outright (keeping (f)) rather than leaving disapplied text with orphaned defined terms, and to confirm no other Section of the Agreement cross-refers to "arbitration", the "Arbitration Tribunal", or the "Rules". Fallback is not met by design; no repair is required since the higher preferred level is fully achieved. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"governing law within the accepted set","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 514](trajectory.jsonl#L514)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer may assign to an affiliate without consent.",
  "Customer may assign to a successor in a merger, acquisition, or sale of substantially all assets without consent.",
  "Vendor may not assign without Customer's consent.",
  "Customer's consent to Vendor assignment is not to be unreasonably withheld.",
  "Vendor may never assign to a Customer competitor.",
  "Customer's change of control gives Vendor no termination right."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Both parties may assign to a successor.",
  "A successor assignment requires written notice.",
  "Other assignments require consent.",
  "Consent to other assignments is not to be unreasonably withheld."
]

Planner evidence and hints:
{"ruleId":"ASSIGN","candidateSectionIds":["sec-p0759","sec-i","sec-iv"],"candidateParagraphIds":["p0785","p0786","p0788","p0028","p0034","p0322"],"likelyAbsent":false,"note":"Assignment clause at p0785 (consent required, carve-out for acquirer of substantially all assets) and affiliate assignment requiring consent at p0786. Section 18.10 Change in Control of Array (p0788); definition at p0028/p0034, referenced at p0322. Confirm we may assign to Affiliates/successors freely and Array cannot exit on our change of control."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 532](trajectory.jsonl#L532) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0785","p0786","p0787","p0788","p0028","p0034","p0322"]}
```

- [seq 533](trajectory.jsonl#L533) **read_paragraphs result**

```json
[{"id":"p0785","sectionRef":"§ GENERAL PROVISIONS","text":"18.9 Assignment. This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto; except either Party may assign this Agreement without the other Party's consent to an entity that acquires substantially all of the business or assets of the assigning Party, whether by merger, acqu…
```

- [seq 534](trajectory.jsonl#L534) **drafter → search**

```json
{"query":"assign"}
```

- [seq 535](trajectory.jsonl#L535) **search result**

```json
[{"paragraphId":"p0218","sectionRef":"§ III GOVERNANCE","snippet":"(xiv) perform such other duties as are specifically assigned to the JDRC in this Agreement."},{"paragraphId":"p0227","sectionRef":"§ III GOVERNANCE","snippet":"(i) have such other responsibilities as may be assigned to the JCC pursuant to this Agreement or as may be mutually agreed upon by th…"},{"paragraphId":"p0305","sectionRef"…
```

- [seq 554](trajectory.jsonl#L554) **drafter → search**

```json
{"query":"Change in Control","limit":40}
```

- [seq 555](trajectory.jsonl#L555) **search result**

```json
[{"paragraphId":"p0028","sectionRef":"§ I DEFINITIONS","snippet":"1.6 \"Change in Control\" means, with respect to a Party, that any of the following occurs with respect …"},{"paragraphId":"p0034","sectionRef":"§ I DEFINITIONS","snippet":"For the purpose of this definition of Change in Control:"},{"paragraphId":"p0322","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…s Sectio…
```

- [seq 556](trajectory.jsonl#L556) **drafter → read_section**

```json
{"sectionId":"sec-p0759","cursor":0,"limit":40}
```

- [seq 557](trajectory.jsonl#L557) **read_section result**

```json
{"sectionRef":"§ GENERAL PROVISIONS","cursor":0,"totalParagraphs":41,"nextCursor":40,"paragraphs":[{"id":"p0759","text":"GENERAL PROVISIONS"},{"id":"p0760","text":"18.1 Force Majeure. If the performance of any part of this Agreement (except for any payment obligation under this Agreement) by either Party is prevented, restricted, interfered with or delayed by"},{"id":"p0761","text":"80"},{"id":"p…
```

- [seq 576](trajectory.jsonl#L576) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0785","oldText":"This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto;","newText":"This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto, which shall not be unreasonably withheld or delayed;"}],"comment":"[Playbook] We added the customary reasonableness standard to the consent gate in Section 18.9, so neither Party can arbitrarily block a non-successor assignment. The mutual successor carve-out and the Affiliate assignment mechanic are unchanged.","level":"fallback","summary":"Consent to non-successor assignments not to be unreasonably withheld or delayed."}
```

- [seq 577](trajectory.jsonl#L577) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0785","segments":[{"type":"equal","text":"18.9 Assignment. This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto"},{"type":"insert","text":", which shall not be unreasonably withheld or delayed"},{"type":"equal","text":"; except either Party may assign this Agreement without t…
```

- [seq 598](trajectory.jsonl#L598) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0785","p0786","p0788"],"quote":"18.9 Assignment. This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto; except either Party may assign this Agreement without the other Party's consent to an entity that acquires substantially all of the business or assets of the assigning Party, whether by merger, acquisition or otherwise; provided that the acquiring party agrees in a writing delivered to the non-assigning Party to assume all of the rights and obligations of the assigning Party under this Agreement.","rationale":"Section 18.9 is mutual and already delivers most of the fallback: either Party may assign to an acquirer of substantially all of its business or assets without consent (successor right), that acquirer must deliver a written assumption to the non-assigning Party (written notice), and all other assignments — including to an Affiliate — require the other Party's written consent. The one material gap is that the general consent gate for non-successor assignments is unqualified, so Array could withhold consent arbitrarily; the fallback requires that consent not be unreasonably withheld. We therefore inserted the reasonableness standard into the first sentence only, leaving the successor carve-out and Affiliate mechanic untouched. Change of control is not a concern: Section 18.10 (and the Section 4.5(b) reference at p0322) address only a Change in Control of Array and give Array no termination or re-pricing right on Ono's change of control. We note the Affiliate consent proviso permits refusal where the non-assigning Party reasonably believes material adverse tax consequences would result; that is a reasonableness-based, mutual qualification and we have not disturbed it.","confidence":0.78,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0785","oldText":"This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto;","newText":"This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto, which shall not be unreasonably withheld or delayed;"}],"comment":"[Playbook] We added the customary reasonableness standard to the consent gate in Section 18.9, so neither Party can arbitrarily block a non-successor assignment. The mutual successor carve-out and the Affiliate assignment mechanic are unchanged.","level":"fallback","summary":"Consent to non-successor assignments not to be unreasonably withheld or delayed."},"elementCoverage":{"level":"fallback","mappings":[{"element":"Both parties may assign to a successor.","status":"already_met","quote":"except either Party may assign this Agreement without the other Party's consent to an entity that acquires substantially all of the business or assets of the assigning Party, whether by merger, acquisition or otherwise"},{"element":"A successor assignment requires written notice.","status":"already_met","quote":"provided that the acquiring party agrees in a writing delivered to the non-assigning Party to assume all of the rights and obligations of the assigning Party under this Agreement."},{"element":"Other assignments require consent.","status":"already_met","quote":"This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto"},{"element":"Consent to other assignments is not to be unreasonably withheld.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 599](trajectory.jsonl#L599) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 598](trajectory.jsonl#L598)
- Finding: `f-assign-4c3b3625` · **deviation** · confidence 0.78
- Location: § GENERAL PROVISIONS
- Quote: “18.9 Assignment. This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto; except either Party may assign this Agreement without the other Party's consent to an entity that acquires substantially all of the business or assets of the assigning Party, whether by merger, acquisition or otherwise; provided that the acquiring party agrees in a writing delivered to the non-assigning Party to assume all of the rights and obligations of the assigning Party under this Agreement.”
- Rationale: Section 18.9 is mutual and already delivers most of the fallback: either Party may assign to an acquirer of substantially all of its business or assets without consent (successor right), that acquirer must deliver a written assumption to the non-assigning Party (written notice), and all other assignments — including to an Affiliate — require the other Party's written consent. The one material gap is that the general consent gate for non-successor assignments is unqualified, so Array could withhold consent arbitrarily; the fallback requires that consent not be unreasonably withheld. We therefore inserted the reasonableness standard into the first sentence only, leaving the successor carve-out and Affiliate mechanic untouched. Change of control is not a concern: Section 18.10 (and the Section 4.5(b) reference at p0322) address only a Change in Control of Array and give Array no termination or re-pricing right on Ono's change of control. We note the Affiliate consent proviso permits refusal where the non-assigning Party reasonably believes material adverse tax consequences would result; that is a reasonableness-based, mutual qualification and we have not disturbed it.
- Proposal: **fallback** — Consent to non-successor assignments not to be unreasonably withheld or delayed.
- Comment: [Playbook] We added the customary reasonableness standard to the consent gate in Section 18.9, so neither Party can arbitrarily block a non-successor assignment. The mutual successor carve-out and the Affiliate assignment mechanic are unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto, which shall not be unreasonably withheld or delayed;",
    "oldText": "This Agreement may not be assigned by either Party to any Third Party without the written consent of the other Party hereto;",
    "paragraphId": "p0785"
  }
]
```

### Verifier and repair feedback

- [seq 642](trajectory.jsonl#L642) **Verdict: pass** — Fallback level is complete: mutual successor carve-out, a writing delivered to the non-assigning Party on successor assignment, a consent gate for all other (including affiliate) assignments, and now an express reasonableness standard on that gate. Preferred level fails on three elements the drafter must repair if pressed: (i) affiliate assignments still require the other Party's prior written consent rather than being consent-free for Customer, (ii) Vendor retains a consent-free successor assignment right so "Vendor may not assign without Customer's consent" is untrue, and (iii) no prohibition on Vendor assigning to an Ono competitor exists (18.10 only imposes firewalls on an Array Change in Control). Minimality holds: the only operative change is the eight-word reasonableness qualifier in the first sentence of 18.9. The successor carve-out, the affiliate mechanic (including the guarantee and tax provisos), the competition-law sentence and the successors-and-assigns sentence are all retained verbatim. "or delayed" is a de minimis parallel to the identical formula already used in the affiliate sentence and does not create a new requirement outside the checklist. Intent is preserved: no defined term is orphaned, no cross-reference dangles, and the retained affiliate tax proviso is reasonableness-based, so it does not contradict the newly inserted "not unreasonably withheld or delayed" standard applicable to Third Party assignments. The classification as a deviation is defensible but marginal — the sole fallback gap was the unqualified consent standard; the change-of-control walk-away trigger is absent, so severity should be dialled down. Checks: {"name":"operation 1 applies","ok":true}; {"name":"successor/affiliate carve-out for Customer present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 604](trajectory.jsonl#L604)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer owns Deliverables and work product created for Customer.",
  "Vendor assigns the Deliverables and work product to Customer.",
  "Vendor retains its pre-existing intellectual property.",
  "Customer's licence to Vendor IP embedded in Deliverables is perpetual.",
  "Customer's licence to embedded Vendor IP is irrevocable.",
  "Customer's licence to embedded Vendor IP is royalty-free.",
  "Customer retains all rights in Customer Data.",
  "Any Vendor licence in Customer Data is limited to processing it solely to provide the Services.",
  "The parties do not jointly own intellectual property."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Vendor may retain ownership of generic tools and know-how.",
  "Customer's licence to Deliverables is perpetual.",
  "Customer's licence to Deliverables is irrevocable.",
  "Customer's licence to Deliverables is worldwide.",
  "Customer's licence to Deliverables is royalty-free.",
  "Customer may use and modify Deliverables for its business.",
  "Customer may sublicense Deliverables for its business.",
  "Any Vendor licence in Customer Data is limited to processing it solely to provide the Services."
]

Planner evidence and hints:
{"ruleId":"IP","candidateSectionIds":["sec-p0555","sec-ii","sec-iv","sec-xii","sec-xiv"],"candidateParagraphIds":["p0556","p0557","p0558","p0559","p0560","p0197","p0326","p0329","p0361","p0299","p0600","p0617","p0619","p0661","p0667"],"likelyAbsent":false,"note":"Section 11.1 ownership of inventions (p0556-p0560): sole inventions to the inventing Party, joint inventions jointly owned. Ono owns INDs/Marketing Approvals (p0326, p0329) and patient samples/Data (p0361, p0299). Outbound exposure: Section 2.6 Grant-Back Licence (p0197), Array-owned Product Trademarks/Domain Names pending assignment (p0600, p0617, p0619), post-termination Improvement licences/assignments (p0661, p0667)."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 626](trajectory.jsonl#L626) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0556","p0557","p0558","p0559","p0560","p0197","p0326","p0329","p0361","p0299"]}
```

- [seq 627](trajectory.jsonl#L627) **read_paragraphs result**

```json
[{"id":"p0556","sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","text":"11.1 Ownership of Inventions."},{"id":"p0557","sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","text":"(a) Title to all know-how, inventions and other intellectual property made solely by Ono personnel (or that of any Affiliate) in connection with this Agreement shall be owned by Ono (or its respective Affiliate)."},{"i…
```

- [seq 628](trajectory.jsonl#L628) **drafter → list_sections**

```json
{}
```

- [seq 629](trajectory.jsonl#L629) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 652](trajectory.jsonl#L652) **drafter → read_section**

```json
{"sectionId":"sec-ii","limit":20}
```

- [seq 653](trajectory.jsonl#L653) **read_section result**

```json
{"sectionRef":"§ II GRANT OF LICENSE","cursor":0,"totalParagraphs":39,"nextCursor":20,"paragraphs":[{"id":"p0160","text":"ARTICLE II GRANT OF LICENSE"},{"id":"p0161","text":"2.1 Licenses."},{"id":"p0162","text":"(a) Development License. Subject to the terms and conditions of this Agreement, including without limitation Array's retained rights under Section 2.1(e) below, Array hereby grants to Ono…
```

- [seq 654](trajectory.jsonl#L654) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0600","p0617","p0619","p0661","p0667"]}
```

- [seq 655](trajectory.jsonl#L655) **read_paragraphs result**

```json
[{"id":"p0600","sectionRef":"§ XII TRADEMARKS","text":"12.2 Assignment. Subject to the terms and conditions of this Agreement, following registration of the Product Trademark(s) by Array in the Ono Territory pursuant to Section 12.3 below, Array shall assign, and shall cause its Affiliates to assign, to Ono all rights to the Product Trademark(s) so registered in the Ono Territory at Ono's cost an…
```

- [seq 672](trajectory.jsonl#L672) **drafter → search**

```json
{"query":"assign","limit":40}
```

- [seq 673](trajectory.jsonl#L673) **search result**

```json
[{"paragraphId":"p0218","sectionRef":"§ III GOVERNANCE","snippet":"(xiv) perform such other duties as are specifically assigned to the JDRC in this Agreement."},{"paragraphId":"p0227","sectionRef":"§ III GOVERNANCE","snippet":"(i) have such other responsibilities as may be assigned to the JCC pursuant to this Agreement or as may be mutually agreed upon by th…"},{"paragraphId":"p0305","sectionRef"…
```

- [seq 674](trajectory.jsonl#L674) **drafter → get_definition**

```json
{"term":"Improvements"}
```

- [seq 675](trajectory.jsonl#L675) **get_definition result**

```json
{"found":false,"nearest":["Improvement"]}
```

- [seq 700](trajectory.jsonl#L700) **drafter → get_definition**

```json
{"term":"Improvement"}
```

- [seq 701](trajectory.jsonl#L701) **get_definition result**

```json
{"found":true,"term":"Improvement","paragraphId":"p0073","text":"1.27 \"Improvement\" means any Patent, invention or other intellectual property made or used by or under authority of Ono (including any Ono Know-How) in connection with Development, Manufacture and/or Commercialization of Binimetinib, Encorafenib and/or a Product, in each case, to the extent the same is owned or Controlled by Ono o…
```

- [seq 702](trajectory.jsonl#L702) **drafter → read_section**

```json
{"sectionId":"sec-p0555","limit":10}
```

- [seq 703](trajectory.jsonl#L703) **read_section result**

```json
{"sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","cursor":0,"totalParagraphs":36,"nextCursor":10,"paragraphs":[{"id":"p0555","text":"PATENT PROSECUTION AND ENFORCEMENT"},{"id":"p0556","text":"11.1 Ownership of Inventions."},{"id":"p0557","text":"(a) Title to all know-how, inventions and other intellectual property made solely by Ono personnel (or that of any Affiliate) in connection with this…
```

- [seq 746](trajectory.jsonl#L746) **drafter → search**

```json
{"query":"Exchange of Data and Know-How right of reference","limit":15}
```

- [seq 747](trajectory.jsonl#L747) **search result**

```json
[]
```

- [seq 778](trajectory.jsonl#L778) **drafter → search**

```json
{"query":"4.7 Data","limit":20}
```

- [seq 779](trajectory.jsonl#L779) **search result**

```json
[]
```

- [seq 808](trajectory.jsonl#L808) **drafter → search**

```json
{"query":"Right of Reference","limit":20}
```

- [seq 809](trajectory.jsonl#L809) **search result**

```json
[{"paragraphId":"p0173","sectionRef":"§ II GRANT OF LICENSE","snippet":"4.8 (Right of Reference and Access to Data);"},{"paragraphId":"p0189","sectionRef":"§ II GRANT OF LICENSE","snippet":"…ovide Ono with access to data, know-how and improvements generated by PFM and a right of reference with respect to PFM's Regulatory Filings provided that Ono consents to Array gr…"},{"paragraphId":"p0191","se…
```

- [seq 810](trajectory.jsonl#L810) **drafter → search**

```json
{"query":"Ono Know-How","limit":20}
```

- [seq 811](trajectory.jsonl#L811) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ I DEFINITIONS","snippet":"1.13 \"Data\" means, subject to Section 1.51 (Ono Know-How) and Section 4.4(c)(ii), any and all research data, pharmacology data, preclini…"},{"paragraphId":"p0073","sectionRef":"§ I DEFINITIONS","snippet":"… intellectual property made or used by or under authority of Ono (including any Ono Know-How) in connection with Development,…
```

- [seq 836](trajectory.jsonl#L836) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0351","p0352","p0353","p0354","p0355","p0356","p0357","p0536"]}
```

- [seq 837](trajectory.jsonl#L837) **read_paragraphs result**

```json
[{"id":"p0351","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","text":"by Ono, in each case that is reasonably available to Array and is necessary or materially useful for Ono to Develop, Manufacture and/or Commercialize the Product(s) in accordance with this Agreement, including all Data from the Existing Clinical Studies and any other Clinical Studies and pre-Clinical Studies for the …
```

- [seq 866](trajectory.jsonl#L866) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0626","p0627","p0628","p0629","p0048","p0110"]}
```

- [seq 867](trajectory.jsonl#L867) **read_paragraphs result**

```json
[{"id":"p0626","sectionRef":"§ TERM AND TERMINATION","text":"TERM AND TERMINATION"},{"id":"p0627","sectionRef":"§ TERM AND TERMINATION","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with …
```

- [seq 894](trajectory.jsonl#L894) **drafter → read_section**

```json
{"sectionId":"sec-xiv","limit":30}
```

- [seq 895](trajectory.jsonl#L895) **read_section result**

```json
{"sectionRef":"§ XIV EFFECT OF TERMINATION","cursor":0,"totalParagraphs":40,"nextCursor":30,"paragraphs":[{"id":"p0639","text":"ARTICLE XIV EFFECT OF TERMINATION"},{"id":"p0640","text":"65"},{"id":"p0641","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to Rul…
```

- [seq 920](trajectory.jsonl#L920) **drafter → get_definition**

```json
{"term":"Joint Patents"}
```

- [seq 921](trajectory.jsonl#L921) **get_definition result**

```json
{"found":false,"nearest":["Joint Patent"]}
```

- [seq 922](trajectory.jsonl#L922) **drafter → get_definition**

```json
{"term":"Joint Know-How"}
```

- [seq 923](trajectory.jsonl#L923) **get_definition result**

```json
{"found":true,"term":"Joint Know-How","paragraphId":"p0084","text":"1.34 \"Joint Know-How\" means all know-how arising during the term of the Agreement that (a) is jointly generated by employees, consultants, or contractors of Array or its Affiliates and by employees, consultants, or contractors of Ono or its Affiliates, and (b) relates to Binimetinib, Encorafenib and/or Products."}
```

- [seq 950](trajectory.jsonl#L950) **drafter → get_definition**

```json
{"term":"Joint Patent"}
```

- [seq 951](trajectory.jsonl#L951) **get_definition result**

```json
{"found":true,"term":"Joint Patent","paragraphId":"p0085","text":"1.35 \"Joint Patent\" means a Patent that covers or claims a Joint Invention."}
```

- [seq 952](trajectory.jsonl#L952) **drafter → get_definition**

```json
{"term":"Joint Invention"}
```

- [seq 953](trajectory.jsonl#L953) **get_definition result**

```json
{"found":false,"nearest":["Joint Inventions"]}
```

- [seq 978](trajectory.jsonl#L978) **drafter → get_definition**

```json
{"term":"Joint Inventions"}
```

- [seq 979](trajectory.jsonl#L979) **get_definition result**

```json
{"found":true,"term":"Joint Inventions","paragraphId":"p0083","text":"1.33 \"Joint Inventions\" means all inventions arising during the term of the Agreement that (a) are jointly created or reduced to practice by employees, consultants, or contractors of Array or its Affiliates and by employees, consultants, or contractors of Ono or its Affiliates, and (b) relate to Binimetinib, Encorafenib and/o…
```

- [seq 1000](trajectory.jsonl#L1000) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0627","p0166","p0557","p0558","p0559","p0560","p0326","p0329","p0197"],"quote":"Upon expiration of this Agreement, the licenses granted to Ono under Section 2.1 shall become non-exclusive, fully paid- up, irrevocable, perpetual, royalty free licenses, with sublicensing rights, to Develop, Manufacture, and/or Commercialize the Products in the Ono Territory.","rationale":"Our IP position sits at the fallback and is not redlined. Array keeps only its own pre-existing IP and know-how (Section 2.1(e): \"Except for the rights and licenses expressly granted to Ono in this Agreement, Array retains all rights under the Array Patents and Array Know-How\"; Section 11.1(b)), and Section 13.1 converts our Section 2.1 licences into perpetual, irrevocable, fully paid-up, royalty-free licences with sublicensing rights to Develop, Manufacture and Commercialize the Products. Ono owns everything it puts in: IP made solely by Ono personnel (11.1(a)), all INDs (4.2(b)), Marketing Approvals and all regulatory submissions (4.2(c)), and its Patient Samples and Data (4.10); Array takes no assignment of Ono IP or Data during the term, and the Section 2.6 grant-back is a non-exclusive, royalty-free licence expressly \"subject to the exclusive rights granted to Ono under this Agreement\", with Array's use of Ono Know-How bounded to the Product (Section 10.2). Shortfalls against the preferred position, noted but not flagged: (i) Section 11.1(c) creates joint ownership of jointly-made inventions and 11.1(d) limits practice to internal purposes and requires consent to license, enforce or assign — the restriction is mutual and is carved out for subject matter cross-licensed under the Agreement, so we retain full commercial exploitation of Joint Patents and Joint Know-How in the Ono Territory through the exclusive Section 2.1 licences; (ii) the Development/Commercialization licences are Ono Territory-limited (the Manufacturing licence is worldwide) and Section 2.1(d) excludes a right to modify the compounds — both are the bargained deal architecture, not an IP-direction defect; and (iii) Article XIV reversion (assignment of Regulatory Filings and Product Trademarks, Array's paid-up Data rights) is disapplied and replaced by market-rate negotiation under 14.2(a)(ix) where we terminate for Array's breach or insolvency. None of this reaches the walk-away (no assignment of our IP or Data to Array, and no unexploitable joint ownership), so we would not open Article XI on this rule.","confidence":0.58}
```

- [seq 1001](trajectory.jsonl#L1001) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1000](trajectory.jsonl#L1000)
- Finding: `f-ip-7f1cdbad` · **compliant** · confidence 0.58
- Location: § TERM AND TERMINATION
- Quote: “Upon expiration of this Agreement, the licenses granted to Ono under Section 2.1 shall become non-exclusive, fully paid- up, irrevocable, perpetual, royalty free licenses, with sublicensing rights, to Develop, Manufacture, and/or Commercialize the Products in the Ono Territory.”
- Rationale: Our IP position sits at the fallback and is not redlined. Array keeps only its own pre-existing IP and know-how (Section 2.1(e): "Except for the rights and licenses expressly granted to Ono in this Agreement, Array retains all rights under the Array Patents and Array Know-How"; Section 11.1(b)), and Section 13.1 converts our Section 2.1 licences into perpetual, irrevocable, fully paid-up, royalty-free licences with sublicensing rights to Develop, Manufacture and Commercialize the Products. Ono owns everything it puts in: IP made solely by Ono personnel (11.1(a)), all INDs (4.2(b)), Marketing Approvals and all regulatory submissions (4.2(c)), and its Patient Samples and Data (4.10); Array takes no assignment of Ono IP or Data during the term, and the Section 2.6 grant-back is a non-exclusive, royalty-free licence expressly "subject to the exclusive rights granted to Ono under this Agreement", with Array's use of Ono Know-How bounded to the Product (Section 10.2). Shortfalls against the preferred position, noted but not flagged: (i) Section 11.1(c) creates joint ownership of jointly-made inventions and 11.1(d) limits practice to internal purposes and requires consent to license, enforce or assign — the restriction is mutual and is carved out for subject matter cross-licensed under the Agreement, so we retain full commercial exploitation of Joint Patents and Joint Know-How in the Ono Territory through the exclusive Section 2.1 licences; (ii) the Development/Commercialization licences are Ono Territory-limited (the Manufacturing licence is worldwide) and Section 2.1(d) excludes a right to modify the compounds — both are the bargained deal architecture, not an IP-direction defect; and (iii) Article XIV reversion (assignment of Regulatory Filings and Product Trademarks, Array's paid-up Data rights) is disapplied and replaced by market-rate negotiation under 14.2(a)(ix) where we terminate for Array's breach or insolvency. None of this reaches the walk-away (no assignment of our IP or Data to Array, and no unexploitable joint ownership), so we would not open Article XI on this rule.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 644](trajectory.jsonl#L644)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "The licence extends to Customer's affiliates.",
  "The licence extends to contractors acting on Customer's behalf.",
  "A paid-up licence is perpetual.",
  "A paid-up licence is irrevocable.",
  "A subscription licence is terminable only for uncured material breach.",
  "The licence is transferable to Customer's successors."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Customer's affiliates are covered on written notice.",
  "The licence is transferable to a successor in a merger or acquisition transaction."
]

Planner evidence and hints:
{"ruleId":"LICENSE","candidateSectionIds":["sec-ii","sec-xii"],"candidateParagraphIds":["p0162","p0163","p0164","p0165","p0166","p0173","p0174","p0181","p0182","p0185","p0189","p0190","p0191","p0197","p0617","p0619"],"likelyAbsent":false,"note":"Article II grants: exclusive Development/Commercialization licence in the Ono Territory (p0162, p0164), worldwide non-exclusive Manufacturing licence (p0163), sublicensing per Section 2.2, Array retained rights (p0166), no-modification restriction (p0165), Third Party Technology reimbursement condition (p0181-p0185), Third Party Partner flow-through (p0189-p0191). Confirm reach to Affiliates/Sublicensees/Subcontractors and non-revocability; trademark/domain licences at p0617, p0619."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 666](trajectory.jsonl#L666) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0162","p0163","p0164","p0165","p0166","p0173","p0174","p0181","p0182","p0185","p0189","p0190","p0191","p0197"]}
```

- [seq 667](trajectory.jsonl#L667) **read_paragraphs result**

```json
[{"id":"p0162","sectionRef":"§ II GRANT OF LICENSE","text":"(a) Development License. Subject to the terms and conditions of this Agreement, including without limitation Array's retained rights under Section 2.1(e) below, Array hereby grants to Ono an exclusive license, with the right to grant sublicenses as provided in Section 2.2, under the Array Patents, Array Know-How and Array's interests in …
```

- [seq 668](trajectory.jsonl#L668) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 669](trajectory.jsonl#L669) **get_definition result**

```json
{"found":false,"nearest":["Controlled Affiliates"]}
```

- [seq 694](trajectory.jsonl#L694) **drafter → search**

```json
{"query":"2.2 Sublicense"}
```

- [seq 695](trajectory.jsonl#L695) **search result**

```json
[{"paragraphId":"p0170","sectionRef":"§ II GRANT OF LICENSE","snippet":"2.2 Sublicensees and Distributors."}]
```

- [seq 696](trajectory.jsonl#L696) **drafter → search**

```json
{"query":"Affiliate means"}
```

- [seq 697](trajectory.jsonl#L697) **search result**

```json
[]
```

- [seq 726](trajectory.jsonl#L726) **drafter → read_section**

```json
{"sectionId":"sec-ii","cursor":0,"limit":40}
```

- [seq 727](trajectory.jsonl#L727) **read_section result**

```json
{"sectionRef":"§ II GRANT OF LICENSE","cursor":0,"totalParagraphs":39,"nextCursor":null,"paragraphs":[{"id":"p0160","text":"ARTICLE II GRANT OF LICENSE"},{"id":"p0161","text":"2.1 Licenses."},{"id":"p0162","text":"(a) Development License. Subject to the terms and conditions of this Agreement, including without limitation Array's retained rights under Section 2.1(e) below, Array hereby grants to O…
```

- [seq 754](trajectory.jsonl#L754) **drafter → search**

```json
{"query":"Assignment successor merger consolidation"}
```

- [seq 755](trajectory.jsonl#L755) **search result**

```json
[]
```

- [seq 756](trajectory.jsonl#L756) **drafter → search**

```json
{"query":"irrevocable perpetual license"}
```

- [seq 757](trajectory.jsonl#L757) **search result**

```json
[]
```

- [seq 784](trajectory.jsonl#L784) **drafter → search**

```json
{"query":"assign"}
```

- [seq 785](trajectory.jsonl#L785) **search result**

```json
[{"paragraphId":"p0218","sectionRef":"§ III GOVERNANCE","snippet":"(xiv) perform such other duties as are specifically assigned to the JDRC in this Agreement."},{"paragraphId":"p0227","sectionRef":"§ III GOVERNANCE","snippet":"(i) have such other responsibilities as may be assigned to the JCC pursuant to this Agreement or as may be mutually agreed upon by th…"},{"paragraphId":"p0305","sectionRef"…
```

- [seq 786](trajectory.jsonl#L786) **drafter → search**

```json
{"query":"successor"}
```

- [seq 787](trajectory.jsonl#L787) **search result**

```json
[{"paragraphId":"p0054","sectionRef":"§ I DEFINITIONS","snippet":"1.16 \"EMA\" means the European Medicines Agency, or any successor entity thereto performing similar functions."},{"paragraphId":"p0056","sectionRef":"§ I DEFINITIONS","snippet":"1.18 \"FDA\" means the U.S. Food and Drug Administration, or any successor entity thereto performing similar functions."},{"paragraphId":"p0094","sectionR…
```

- [seq 818](trajectory.jsonl#L818) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0783","p0784","p0785","p0786","p0787"]}
```

- [seq 819](trajectory.jsonl#L819) **read_paragraphs result**

```json
[{"id":"p0783","sectionRef":"§ GENERAL PROVISIONS","text":"82"},{"id":"p0784","sectionRef":"§ GENERAL PROVISIONS","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to Rule 24b-2 of the Securities Exchange Act of 1934, as amended."},{"id":"p0785","sectionRef":"§…
```

- [seq 846](trajectory.jsonl#L846) **drafter → search**

```json
{"query":"terminate this Agreement at will convenience without cause"}
```

- [seq 847](trajectory.jsonl#L847) **search result**

```json
[]
```

- [seq 848](trajectory.jsonl#L848) **drafter → search**

```json
{"query":"Array may terminate this Agreement"}
```

- [seq 849](trajectory.jsonl#L849) **search result**

```json
[]
```

- [seq 876](trajectory.jsonl#L876) **drafter → search**

```json
{"query":"Termination for Breach"}
```

- [seq 877](trajectory.jsonl#L877) **search result**

```json
[]
```

- [seq 878](trajectory.jsonl#L878) **drafter → search**

```json
{"query":"fully paid up royalty-free perpetual license Ono"}
```

- [seq 879](trajectory.jsonl#L879) **search result**

```json
[]
```

- [seq 902](trajectory.jsonl#L902) **drafter → read_section**

```json
{"sectionId":"sec-xii"}
```

- [seq 903](trajectory.jsonl#L903) **read_section result**

```json
{"sectionRef":"§ XII TRADEMARKS","cursor":0,"totalParagraphs":34,"nextCursor":null,"paragraphs":[{"id":"p0591","text":"ARTICLE XII TRADEMARKS"},{"id":"p0592","text":"12.1 Display."},{"id":"p0593","text":"(a) All packaging materials, labels and Marketing Materials for the Products shall display the Product Trademarks in katakana or in other applicable language and no other product-specific tradema…
```

- [seq 930](trajectory.jsonl#L930) **drafter → search**

```json
{"query":"may terminate this Agreement upon written notice","limit":20}
```

- [seq 931](trajectory.jsonl#L931) **search result**

```json
[]
```

- [seq 960](trajectory.jsonl#L960) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 961](trajectory.jsonl#L961) **search result**

```json
[{"paragraphId":"p0080","sectionRef":"§ I DEFINITIONS","snippet":"…such country equals or exceeds [ * ], the Initial Royalty Term will immediately terminate with respect to such Product."},{"paragraphId":"p0322","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…strictions in this Section 4.5(b) shall not apply to PFM, and shall immediately terminate upon a Change in Control of…
```

- [seq 984](trajectory.jsonl#L984) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0627","p0628"]}
```

- [seq 985](trajectory.jsonl#L985) **read_paragraphs result**

```json
[{"id":"p0627","sectionRef":"§ TERM AND TERMINATION","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Secondary Royalty Term with respect to such Product expires, at which time this Agreement shall expire in its e…
```

- [seq 1008](trajectory.jsonl#L1008) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0171","p0163","p0627","p0785"],"quote":"Ono shall have the right, in accordance with this Section 2.2, to grant sublicenses under the Array Patents and Array Know-How to its Affiliates and to Third Parties, provided that Ono shall not engage a Third Party as either (i) a Sublicensee of the Product, or (ii) as a distributor of the Product, without Array's prior written consent.","rationale":"The Article II grants sit at or above our fallback position, so no redline is warranted. (1) Affiliates: Section 2.2(a) lets Ono sublicense the Array Patents and Array Know-How to its Affiliates without Array consent (consent is required only for Third Party Sublicensees/distributors), and Section 2.1(b) expressly permits Affiliate sublicensing of the Manufacturing licence; Section 2.2(d) requires only that executed sublicences be provided to Array, i.e. no more than the written-notice condition our fallback tolerates. (2) Successor transfer: Section 18.9 permits assignment of the Agreement (and hence the licences) without the other Party's consent to an entity acquiring substantially all of the business or assets, whether by merger, acquisition or otherwise. The grants are also not revocable at Array's discretion: Array may terminate only for uncured material breach (13.3), bankruptcy (13.4) or Competing Product, and on expiry Section 13.1 converts the Section 2.1 licences into fully paid-up, irrevocable, perpetual, royalty-free licences with sublicensing rights. Short of the preferred position, third-party contractors are covered expressly only for Manufacturing (\"may be extended by Ono to Third Party manufacturers ... on Ono's behalf\"), with Development/Commercialization sublicences to Third Parties needing Array's consent; we note this rather than flag it, as the bargain meets every fallback element.","confidence":0.82,"elementCoverage":{"level":"fallback","mappings":[{"element":"Customer's affiliates are covered on written notice.","status":"already_met","quote":"Ono shall have the right, in accordance with this Section 2.2, to grant sublicenses under the Array Patents and Array Know-How to its Affiliates and to Third Parties"},{"element":"The licence is transferable to a successor in a merger or acquisition transaction.","status":"already_met","quote":"except either Party may assign this Agreement without the other Party's consent to an entity that acquires substantially all of the business or assets of the assigning Party, whether by merger, acquisition or otherwise"}]}}
```

- [seq 1009](trajectory.jsonl#L1009) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1008](trajectory.jsonl#L1008)
- Finding: `f-license-cde4d8e8` · **compliant** · confidence 0.82
- Location: § II GRANT OF LICENSE
- Quote: “Ono shall have the right, in accordance with this Section 2.2, to grant sublicenses under the Array Patents and Array Know-How to its Affiliates and to Third Parties, provided that Ono shall not engage a Third Party as either (i) a Sublicensee of the Product, or (ii) as a distributor of the Product, without Array's prior written consent.”
- Rationale: The Article II grants sit at or above our fallback position, so no redline is warranted. (1) Affiliates: Section 2.2(a) lets Ono sublicense the Array Patents and Array Know-How to its Affiliates without Array consent (consent is required only for Third Party Sublicensees/distributors), and Section 2.1(b) expressly permits Affiliate sublicensing of the Manufacturing licence; Section 2.2(d) requires only that executed sublicences be provided to Array, i.e. no more than the written-notice condition our fallback tolerates. (2) Successor transfer: Section 18.9 permits assignment of the Agreement (and hence the licences) without the other Party's consent to an entity acquiring substantially all of the business or assets, whether by merger, acquisition or otherwise. The grants are also not revocable at Array's discretion: Array may terminate only for uncured material breach (13.3), bankruptcy (13.4) or Competing Product, and on expiry Section 13.1 converts the Section 2.1 licences into fully paid-up, irrevocable, perpetual, royalty-free licences with sublicensing rights. Short of the preferred position, third-party contractors are covered expressly only for Manufacturing ("may be extended by Ono to Third Party manufacturers ... on Ono's behalf"), with Development/Commercialization sublicences to Third Parties needing Array's consent; we note this rather than flag it, as the bargain meets every fallback element.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 660](trajectory.jsonl#L660)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Vendor may audit no more than once in any 12-month period.",
  "Vendor must give at least 30 days' written notice of an audit.",
  "Audits occur during business hours.",
  "Audits are conducted by an independent auditor.",
  "The auditor is bound by confidentiality obligations.",
  "Audits are conducted off-site where possible.",
  "Vendor bears audit costs unless underpayment exceeds 5 percent.",
  "Vendor has no direct access to Customer systems for an audit."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Vendor may audit no more than once per year.",
  "Vendor must give at least 15 days' notice of an audit.",
  "Vendor bears audit costs unless underpayment exceeds 10 percent."
]

Planner evidence and hints:
{"ruleId":"AUDIT","candidateSectionIds":["sec-vii","sec-iv"],"candidateParagraphIds":["p0481","p0482","p0483","p0340","p0343"],"likelyAbsent":false,"note":"Section 7.4 Records; Inspection (p0481-p0483): independent auditor reasonably acceptable to Ono, three-year retention, once per Calendar Year, reasonable prior notice, one inspection per quarter, confidentiality undertaking; p0483 extends to compliance verification. Confirm cost allocation/error threshold, and review GxP site-audit rights over Ono/Subcontractor 'Audited Sites' at p0340-p0343."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 678](trajectory.jsonl#L678) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0481","p0482","p0483","p0340","p0343"]}
```

- [seq 679](trajectory.jsonl#L679) **read_paragraphs result**

```json
[{"id":"p0481","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","text":"7.4 Records; Inspection. Ono shall keep, and require its Affiliates and Sublicensees to keep, complete, true and accurate books of accounts and records for the purpose of determining the amounts payable to Array pursuant to this Agreement. Such books and records shall be kept for at least three (3) years following the end of …
```

- [seq 680](trajectory.jsonl#L680) **drafter → search**

```json
{"query":"audit inspection records"}
```

- [seq 681](trajectory.jsonl#L681) **search result**

```json
[]
```

- [seq 706](trajectory.jsonl#L706) **drafter → search**

```json
{"query":"inspection"}
```

- [seq 707](trajectory.jsonl#L707) **search result**

```json
[{"paragraphId":"p0340","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"… The Parties shall cooperate in good faith with respect to Regulatory Authority inspections of any site or facility where Clinical Studies, manufacturing or pharmacovigil…"},{"paragraphId":"p0340","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…ble Regulatory Authority) to assist in…
```

- [seq 708](trajectory.jsonl#L708) **drafter → search**

```json
{"query":"audit"}
```

- [seq 709](trajectory.jsonl#L709) **search result**

```json
[{"paragraphId":"p0137","sectionRef":"§ I DEFINITIONS","snippet":"Array Regulatory Filings 4.6(b) JDRC Chairperson 3.3 Audited Site 4.6(d)(ii) Joint Clinical Study Proposal 4.4(a) Auditor AZ 7.4 11.3(a)(i…"},{"paragraphId":"p0137","sectionRef":"§ I DEFINITIONS","snippet":"…RC Chairperson 3.3 Audited Site 4.6(d)(ii) Joint Clinical Study Proposal 4.4(a) Auditor AZ 7.4 11.3(a)(ii) Joint Commercial C…
```

- [seq 730](trajectory.jsonl#L730) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0357","p0358","p0359","p0360","p0361"]}
```

- [seq 731](trajectory.jsonl#L731) **read_paragraphs result**

```json
[{"id":"p0357","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","text":"appropriate notification of such right of the other Party to the applicable Regulatory Authority. Each Party will provide, and cause its Affiliates to provide, cooperation to the other Party to effect the foregoing."},{"id":"p0358","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","text":"4.9 Inspection Right…
```

- [seq 760](trajectory.jsonl#L760) **drafter → search**

```json
{"query":"verify compliance records examine"}
```

- [seq 761](trajectory.jsonl#L761) **search result**

```json
[]
```

- [seq 762](trajectory.jsonl#L762) **drafter → search**

```json
{"query":"business hours advance notice facilities"}
```

- [seq 763](trajectory.jsonl#L763) **search result**

```json
[]
```

- [seq 790](trajectory.jsonl#L790) **drafter → search**

```json
{"query":"verify"}
```

- [seq 791](trajectory.jsonl#L791) **search result**

```json
[{"paragraphId":"p0359","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"… during normal business hours and upon reasonable advance notice to inspect and verify compliance with applicable regulatory and other requirements, as well as with t…"},{"paragraphId":"p0481","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","snippet":"…\"Auditor\"), chosen by Array and reasonably accept…
```

- [seq 792](trajectory.jsonl#L792) **drafter → search**

```json
{"query":"books and records"}
```

- [seq 793](trajectory.jsonl#L793) **search result**

```json
[{"paragraphId":"p0462","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","snippet":"ARTICLE VII PAYMENTS; BOOKS AND RECORDS"},{"paragraphId":"p0481","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","snippet":"…se of determining the amounts payable to Array pursuant to this Agreement. Such books and records shall be kept for at least three (3) years following the end of the calendar qu…"}]
```

- [seq 822](trajectory.jsonl#L822) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a once-per-year cap and 15 days' notice to Array's inspection rights and fix the audit-cost threshold at 10% underpayment.","comment":"[Playbook] We can accept Array's inspection and audit rights, but they need the usual guardrails: a once-per-year cap and at least 15 days' prior written notice for the Section 4.9 facility inspection (today it is unlimited in frequency on merely \"reasonable\" notice), the same 15 days' notice for the Section 7.4 records inspection, and confirmation that Array bears inspection costs unless an underpayment exceeds 10%.","ops":[{"kind":"replace","paragraphId":"p0481","oldText":"Such inspections may be made no more than once each Calendar Year, at reasonable times and on reasonable prior written notice.","newText":"Such inspections may be made no more than once each Calendar Year, at reasonable times and on at least fifteen (15) days' prior written notice."},{"kind":"replace","paragraphId":"p0482","oldText":"exceeding [ * ] of the amount paid","newText":"exceeding ten percent (10%) of the amount paid"},{"kind":"replace","paragraphId":"p0359","oldText":"permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours and upon reasonable advance notice","newText":"permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours, no more than once per year and upon at least fifteen (15) days' prior written notice"}]}
```

- [seq 823](trajectory.jsonl#L823) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0481","segments":[{"type":"equal","text":"7.4 Records; Inspection. Ono shall keep, and require its Affiliates and Sublicensees to keep, complete, true and accurate books of accounts and records for the purpose of determining the amounts payable to Array pursuant to this Agreement. Such books and records shall be kept for at least three (3) years…
```

- [seq 862](trajectory.jsonl#L862) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0359","p0481","p0482"],"quote":"Ono shall, and shall require its Affiliates to, permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours and upon reasonable advance notice to inspect and verify compliance with applicable regulatory and other requirements, as well as with this Agreement","rationale":"Two clauses give Array verification rights against Ono. Section 7.4 (p0481-p0483) is close to the fallback: once each Calendar Year, independent accounting firm reasonably acceptable to Ono, confidentiality undertaking, Array's expense — but the notice is only \"reasonable prior written notice\" and the underpayment cost-shift threshold is left blank (\"[ * ]\"), so neither the 15-day notice nor the 10% cost trigger is secured. Section 4.9 (p0359) is the material failure: Array (or its representative) may enter Ono's facilities and examine internal procedures and records on merely \"reasonable advance notice\" with no frequency limit at all, which is unlimited-audit walk-away territory and survives termination (p0674). We therefore target the fallback: a once-per-year cap and 15 days' prior written notice on the 4.9 inspection, 15 days' notice on the 7.4 records inspection, and the cost threshold fixed at 10% underpayment. We did not press the preferred position (independent auditor, off-site, no facility access) for Section 4.9 because removing the on-site regulatory-compliance inspection would require collateral rewrites of the GxP regime in Article IV.","confidence":0.78,"elementCoverage":{"level":"fallback","mappings":[{"element":"Vendor may audit no more than once per year.","status":"addressed_by_operation","operationIndexes":[3]},{"element":"Vendor must give at least 15 days' notice of an audit.","status":"addressed_by_operation","operationIndexes":[1,3]},{"element":"Vendor bears audit costs unless underpayment exceeds 10 percent.","status":"addressed_by_operation","operationIndexes":[2]}]},"proposal":{"level":"fallback","summary":"Add a once-per-year cap and 15 days' notice to Array's inspection rights and fix the audit-cost threshold at 10% underpayment.","comment":"[Playbook] We can accept Array's inspection and audit rights, but they need the usual guardrails: a once-per-year cap and at least 15 days' prior written notice for the Section 4.9 facility inspection (today it is unlimited in frequency on merely \"reasonable\" notice), the same 15 days' notice for the Section 7.4 records inspection, and confirmation that Array bears inspection costs unless an underpayment exceeds 10%.","ops":[{"kind":"replace","paragraphId":"p0481","oldText":"Such inspections may be made no more than once each Calendar Year, at reasonable times and on reasonable prior written notice.","newText":"Such inspections may be made no more than once each Calendar Year, at reasonable times and on at least fifteen (15) days' prior written notice."},{"kind":"replace","paragraphId":"p0482","oldText":"exceeding [ * ] of the amount paid","newText":"exceeding ten percent (10%) of the amount paid"},{"kind":"replace","paragraphId":"p0359","oldText":"permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours and upon reasonable advance notice","newText":"permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours, no more than once per year and upon at least fifteen (15) days' prior written notice"}]}}
```

- [seq 863](trajectory.jsonl#L863) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 862](trajectory.jsonl#L862)
- Finding: `f-audit-0c0f6f3f` · **deviation** · confidence 0.78
- Location: § IV DEVELOPMENT AND REGULATORY ACTIVITIES
- Quote: “Ono shall, and shall require its Affiliates to, permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours and upon reasonable advance notice to inspect and verify compliance with applicable regulatory and other requirements, as well as with this Agreement”
- Rationale: Two clauses give Array verification rights against Ono. Section 7.4 (p0481-p0483) is close to the fallback: once each Calendar Year, independent accounting firm reasonably acceptable to Ono, confidentiality undertaking, Array's expense — but the notice is only "reasonable prior written notice" and the underpayment cost-shift threshold is left blank ("[ * ]"), so neither the 15-day notice nor the 10% cost trigger is secured. Section 4.9 (p0359) is the material failure: Array (or its representative) may enter Ono's facilities and examine internal procedures and records on merely "reasonable advance notice" with no frequency limit at all, which is unlimited-audit walk-away territory and survives termination (p0674). We therefore target the fallback: a once-per-year cap and 15 days' prior written notice on the 4.9 inspection, 15 days' notice on the 7.4 records inspection, and the cost threshold fixed at 10% underpayment. We did not press the preferred position (independent auditor, off-site, no facility access) for Section 4.9 because removing the on-site regulatory-compliance inspection would require collateral rewrites of the GxP regime in Article IV.
- Proposal: **fallback** — Add a once-per-year cap and 15 days' notice to Array's inspection rights and fix the audit-cost threshold at 10% underpayment.
- Comment: [Playbook] We can accept Array's inspection and audit rights, but they need the usual guardrails: a once-per-year cap and at least 15 days' prior written notice for the Section 4.9 facility inspection (today it is unlimited in frequency on merely "reasonable" notice), the same 15 days' notice for the Section 7.4 records inspection, and confirmation that Array bears inspection costs unless an underpayment exceeds 10%.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Such inspections may be made no more than once each Calendar Year, at reasonable times and on at least fifteen (15) days' prior written notice.",
    "oldText": "Such inspections may be made no more than once each Calendar Year, at reasonable times and on reasonable prior written notice.",
    "paragraphId": "p0481"
  },
  {
    "kind": "replace",
    "newText": "exceeding ten percent (10%) of the amount paid",
    "oldText": "exceeding [ * ] of the amount paid",
    "paragraphId": "p0482"
  },
  {
    "kind": "replace",
    "newText": "permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours, no more than once per year and upon at least fifteen (15) days' prior written notice",
    "oldText": "permit Array, and/or an authorized representative reasonably acceptable to Ono, to enter the relevant facilities of Ono and its Affiliates during normal business hours and upon reasonable advance notice",
    "paragraphId": "p0359"
  }
]
```

### Verifier and repair feedback

- [seq 916](trajectory.jsonl#L916) **Verdict: pass** — Fallback checklist is complete: the once-per-year cap, the 15-day prior written notice (inserted in both the Section 4.9 facility inspection and the Section 7.4 records inspection), and the 10% underpayment cost-shift are all in operative language, not merely promised in the comment. Preferred level fails on multiple elements: notice is 15 days rather than 30; Section 4.9 still permits Array itself (rather than an independent auditor) to enter facilities without a confidentiality undertaking; there is no off-site-where-possible qualifier; the cost trigger is 10% rather than 5%; and direct on-site access to Ono's facilities, internal procedures and records is preserved. Section 7.4 also remains at "reasonable times" rather than business hours, and both clauses use a calendar-year rather than any-12-month cap. Minimality holds: the edits are three targeted insertions (frequency cap and 15-day notice in 4.9, 15-day notice in 7.4, 10% in the previously blank "[ * ]" threshold). Favourable existing language — independent accounting firm, Ono's reasonable acceptance, the Auditor confidentiality agreement, Array-bears-cost default, one inspection per quarter, minimise-disruption undertaking — is retained untouched, and no extras (survival tails, procedures, remedies) were added. Intent is preserved: the interest cross-reference to Section 7.1, the three-year records retention period, the GxP/regulatory purpose of the Section 4.9 inspection and the "shall not relieve Ono of any of its obligations" sentence all survive without contradiction; no defined term is left dangling and "Calendar Year" and "Auditor" remain intact. Deviation classification is correct on the original text: notice was open-ended "reasonable" in both clauses, Section 4.9 had no frequency cap at all, and the cost-shift threshold was left blank, so the fallback was not met on material terms before the redline. If the team later wants the preferred position, the operative repairs are: raise notice to 30 days in both clauses, lower the Section 7.4 threshold to 5%, add "in any twelve (12) month period" in place of the calendar-year measure, subject Section 7.4 inspections to normal business hours, require Section 4.9 inspections to be conducted by an independent representative under a written confidentiality undertaking, and add an off-site/records-copy-first preference limiting direct access to Ono facilities and systems. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"audit frequency limited","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 686](trajectory.jsonl#L686)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer pays no liquidated damages or penalties."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Any Customer-payable liquidated amount is only an early-termination fee.",
  "The early-termination fee is capped at three months of fees.",
  "The early-termination fee is the sole liquidated amount payable by Customer."
]

Planner evidence and hints:
{"ruleId":"LD","candidateSectionIds":["sec-xiv"],"candidateParagraphIds":["p0668"],"likelyAbsent":false,"note":"Section 14.3 Liquidated Damages (p0668) appears to run against Array, i.e. in our favour — do not flag. Confirm direction on full read and that no liquidated damages, penalty or termination fee is payable by Ono elsewhere."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 712](trajectory.jsonl#L712) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0668"]}
```

- [seq 713](trajectory.jsonl#L713) **read_paragraphs result**

```json
[{"id":"p0668","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"14.3 Liquidated Damages. In the event that Array (a) [ * ] during [ * ], or (b) intentionally conceals or falsifies a material result and/or material item of data concerning the safety or efficacy of the Product, which concealment or falsification (i) is undertaken to induce Ono to not terminate this Agreement and (ii) results in a…
```

- [seq 714](trajectory.jsonl#L714) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 715](trajectory.jsonl#L715) **search result**

```json
[{"paragraphId":"p0668","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"14.3 Liquidated Damages. In the event that Array (a) [ * ] during [ * ], or (b) intentionally conceals …"},{"paragraphId":"p0668","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…l be relieved of its due diligence obligations under this Agreement; and (B) as liquidated damages for the breaches described"}]
```

- [seq 734](trajectory.jsonl#L734) **drafter → read_section**

```json
{"sectionId":"\"sec-xiv\"","cursor":0,"limit":10}
```

- [seq 735](trajectory.jsonl#L735) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-xiv\""}
```

- [seq 736](trajectory.jsonl#L736) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 737](trajectory.jsonl#L737) **search result**

```json
[]
```

- [seq 772](trajectory.jsonl#L772) **drafter → list_sections**

```json
{}
```

- [seq 773](trajectory.jsonl#L773) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 774](trajectory.jsonl#L774) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 775](trajectory.jsonl#L775) **search result**

```json
[]
```

- [seq 802](trajectory.jsonl#L802) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0665","p0666","p0667","p0669","p0670","p0671"]}
```

- [seq 803](trajectory.jsonl#L803) **read_paragraphs result**

```json
[{"id":"p0665","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"(vii) Marks and Domains. Effective upon the effective date of termination, Ono hereby assigns and shall cause to be assigned to Array all worldwide rights in and to (i) any Product Trademarks specific to one or more Products that Ono or any of its Affiliates used in connection with Product(s), and (ii) all Internet domain names inc…
```

- [seq 804](trajectory.jsonl#L804) **drafter → search**

```json
{"query":"Ono shall pay"}
```

- [seq 805](trajectory.jsonl#L805) **search result**

```json
[{"paragraphId":"p0384","sectionRef":"§ VI PAYMENTS","snippet":"6.1 Upfront Fee. Ono shall pay to Array a license fee equal to Three Billion Five Hundred Million Japanese Yen…"},{"paragraphId":"p0386","sectionRef":"§ VI PAYMENTS","snippet":"(a) BEACON Milestone Payments. Ono shall pay to Array the milestone payments set out below following the first achievement b…"},{"paragraphId":"p0393","sectio…
```

- [seq 830](trajectory.jsonl#L830) **drafter → search**

```json
{"query":"upon termination Ono shall pay"}
```

- [seq 831](trajectory.jsonl#L831) **search result**

```json
[]
```

- [seq 832](trajectory.jsonl#L832) **drafter → search**

```json
{"query":"minimum annual payment"}
```

- [seq 833](trajectory.jsonl#L833) **search result**

```json
[]
```

- [seq 856](trajectory.jsonl#L856) **drafter → search**

```json
{"query":"non-refundable"}
```

- [seq 857](trajectory.jsonl#L857) **search result**

```json
[]
```

- [seq 858](trajectory.jsonl#L858) **drafter → search**

```json
{"query":"termination by Ono for convenience 13.4"}
```

- [seq 859](trajectory.jsonl#L859) **search result**

```json
[]
```

- [seq 888](trajectory.jsonl#L888) **drafter → read_section**

```json
{"sectionId":"sec-p0626","limit":13}
```

- [seq 889](trajectory.jsonl#L889) **read_section result**

```json
{"sectionRef":"§ TERM AND TERMINATION","cursor":0,"totalParagraphs":13,"nextCursor":null,"paragraphs":[{"id":"p0626","text":"TERM AND TERMINATION"},{"id":"p0627","text":"13.1 Term. This Agreement shall commence on the Effective Date and, unless terminated earlier pursuant to this Article 13, shall continue in full force and effect, on a Product-by-Product and country-by-country basis until the Se…
```

- [seq 906](trajectory.jsonl#L906) **drafter → search**

```json
{"query":"reimburse Array"}
```

- [seq 907](trajectory.jsonl#L907) **search result**

```json
[{"paragraphId":"p0298","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…cation that was the subject of study in such Declined Clinical Study, Ono shall reimburse Array an amount equal to [ * ] of the costs incurred by Array (including by its Affil…"},{"paragraphId":"p0300","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","snippet":"…y Array pursuant to a Declined Cl…
```

- [seq 908](trajectory.jsonl#L908) **drafter → search**

```json
{"query":"as compensation"}
```

- [seq 909](trajectory.jsonl#L909) **search result**

```json
[]
```

- [seq 944](trajectory.jsonl#L944) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0298"]}
```

- [seq 945](trajectory.jsonl#L945) **read_paragraphs result**

```json
[{"id":"p0298","sectionRef":"§ IV DEVELOPMENT AND REGULATORY ACTIVITIES","text":"(ii) Costs of Declined Clinical Studies and Use of related Data. The Performing Party shall bear all costs associated with Declined Clinical Studies it undertakes. If Ono (or an Ono Affiliate or Sublicensee) submits to a Regulatory Authority in Ono Territory Data generated by Array (including its Affiliates) or a Thi…
```

- [seq 946](trajectory.jsonl#L946) **drafter → search**

```json
{"query":"interest rate late payment overdue"}
```

- [seq 947](trajectory.jsonl#L947) **search result**

```json
[]
```

- [seq 970](trajectory.jsonl#L970) **drafter → search**

```json
{"query":"damages","limit":30}
```

- [seq 971](trajectory.jsonl#L971) **search result**

```json
[{"paragraphId":"p0583","sectionRef":"§ PATENT PROSECUTION AND ENFORCEMENT","snippet":"…obtain [ * ] of such excess amount, to the extent such excess amount represents damages relating to Manufacture or sale or use of an Infringing Product in the Ono Terr…"},{"paragraphId":"p0616","sectionRef":"§ XII TRADEMARKS","snippet":"…ry shall be [ * ] between Ono and Array, to the extent such recovery repr…
```

- [seq 994](trajectory.jsonl#L994) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0668","p0671","p0628"],"quote":"then, as an alternative to its right to terminate this Agreement pursuant to Section 13.3 above, Ono may in its discretion elect to continue this Agreement, in which case (A) Ono shall be relieved of its due diligence obligations under this Agreement; and (B) as liquidated damages for the breaches described","rationale":"The only liquidated damages provision, Section 14.3 (p0668, continuing at p0671), runs entirely against Array: it is triggered by Array's misconduct and gives Ono the election to continue the Agreement with relief from its diligence obligations and a reduced royalty rate as liquidated damages. That is a remedy in our favour, so it is not flagged. No provision anywhere requires Ono to pay liquidated damages, a penalty, a minimum fee or an early-termination fee: Section 13.2 lets Ono terminate without cause on notice with no exit payment, and the other Ono payment obligations (upfront, milestones, royalties, Declined Clinical Study cost reimbursement at p0298) are consideration or actual cost reimbursements, not stipulated damages. The Agreement therefore meets the preferred position that Customer pays no liquidated damages or penalties.","confidence":0.9,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer pays no liquidated damages or penalties.","status":"already_met","quote":"then, as an alternative to its right to terminate this Agreement pursuant to Section 13.3 above, Ono may in its discretion elect to continue this Agreement, in which case (A) Ono shall be relieved of its due diligence obligations under this Agreement; and (B) as liquidated damages for the breaches described"}]}}
```

- [seq 995](trajectory.jsonl#L995) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 994](trajectory.jsonl#L994)
- Finding: `f-ld-6ac7c7bc` · **compliant** · confidence 0.90
- Location: § XIV EFFECT OF TERMINATION
- Quote: “then, as an alternative to its right to terminate this Agreement pursuant to Section 13.3 above, Ono may in its discretion elect to continue this Agreement, in which case (A) Ono shall be relieved of its due diligence obligations under this Agreement; and (B) as liquidated damages for the breaches described”
- Rationale: The only liquidated damages provision, Section 14.3 (p0668, continuing at p0671), runs entirely against Array: it is triggered by Array's misconduct and gives Ono the election to continue the Agreement with relief from its diligence obligations and a reduced royalty rate as liquidated damages. That is a remedy in our favour, so it is not flagged. No provision anywhere requires Ono to pay liquidated damages, a penalty, a minimum fee or an early-termination fee: Section 13.2 lets Ono terminate without cause on notice with no exit payment, and the other Ono payment obligations (upfront, milestones, royalties, Declined Clinical Study cost reimbursement at p0298) are consideration or actual cost reimbursements, not stipulated damages. The Agreement therefore meets the preferred position that Customer pays no liquidated damages or penalties.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 720](trajectory.jsonl#L720)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Services are warranted to be performed in a professional and workmanlike manner.",
  "Deliverables or software are warranted to conform to their documentation.",
  "The software conformance warranty lasts 12 months.",
  "The Services warranty lasts 90 days.",
  "Warranty remedies include repair or replacement.",
  "Warranty remedies include a refund.",
  "Vendor warrants compliance with applicable laws.",
  "Vendor warrants that the Services and Deliverables contain no malicious code."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Software is warranted to conform to its documentation for at least 90 days.",
  "Services are warranted for at least 30 days.",
  "Warranty remedies include repair or replacement.",
  "Warranty remedies include a refund."
]

Planner evidence and hints:
{"ruleId":"WARRANTY","candidateSectionIds":["sec-p0680","sec-ix"],"candidateParagraphIds":["p0681","p0703","p0711","p0500","p0501","p0509","p0510"],"likelyAbsent":false,"note":"Article XV: mutual Effective-Date reps (p0681), Array IP ownership/exclusive-licensee rep (p0703), mutual disclaimer of implied warranties including merchantability and fitness (p0711). Product quality/GMP conformance warranties likely sit in the clinical/commercial supply and quality agreements (p0500-p0501, p0509-p0510). Read sec-p0680 in full for any product warranty and remedy."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 740](trajectory.jsonl#L740) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0681","p0703","p0711","p0500","p0501","p0509","p0510"]}
```

- [seq 741](trajectory.jsonl#L741) **read_paragraphs result**

```json
[{"id":"p0681","sectionRef":"§ REPRESENTATIONS, WARRANTIES AND COVENANTS","text":"15.1 Mutual Covenants, Representations and Warranties. Each Party covenants, represents and warrants to the other Party that, as of the Effective Date:"},{"id":"p0703","sectionRef":"§ REPRESENTATIONS, WARRANTIES AND COVENANTS","text":"(j) Array is the sole and exclusive owner, the co-owner, or exclusive licensee wit…
```

- [seq 742](trajectory.jsonl#L742) **drafter → search**

```json
{"query":"warrants that"}
```

- [seq 743](trajectory.jsonl#L743) **search result**

```json
[]
```

- [seq 766](trajectory.jsonl#L766) **drafter → read_section**

```json
{"sectionId":"\"sec-p0680\"","limit":40}
```

- [seq 767](trajectory.jsonl#L767) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-p0680\""}
```

- [seq 768](trajectory.jsonl#L768) **drafter → search**

```json
{"query":"warrant"}
```

- [seq 769](trajectory.jsonl#L769) **search result**

```json
[{"paragraphId":"p0680","sectionRef":"§ REPRESENTATIONS, WARRANTIES AND COVENANTS","snippet":"REPRESENTATIONS, WARRANTIES AND COVENANTS"},{"paragraphId":"p0681","sectionRef":"§ REPRESENTATIONS, WARRANTIES AND COVENANTS","snippet":"15.1 Mutual Covenants, Representations and Warranties. Each Party covenants, represents and warrants to the other Party that, as o…"},{"paragraphId":"p0681","sectionRef…
```

- [seq 796](trajectory.jsonl#L796) **drafter → list_sections**

```json
{}
```

- [seq 797](trajectory.jsonl#L797) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 798](trajectory.jsonl#L798) **drafter → search**

```json
{"query":"GMP specifications conform"}
```

- [seq 799](trajectory.jsonl#L799) **search result**

```json
[]
```

- [seq 826](trajectory.jsonl#L826) **drafter → read_section**

```json
{"sectionId":"sec-p0680","limit":40}
```

- [seq 827](trajectory.jsonl#L827) **read_section result**

```json
{"sectionRef":"§ REPRESENTATIONS, WARRANTIES AND COVENANTS","cursor":0,"totalParagraphs":34,"nextCursor":null,"paragraphs":[{"id":"p0680","text":"REPRESENTATIONS, WARRANTIES AND COVENANTS"},{"id":"p0681","text":"15.1 Mutual Covenants, Representations and Warranties. Each Party covenants, represents and warrants to the other Party that, as of the Effective Date:"},{"id":"p0682","text":"(a) it is a…
```

- [seq 852](trajectory.jsonl#L852) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":30}
```

- [seq 853](trajectory.jsonl#L853) **read_section result**

```json
{"sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","cursor":0,"totalParagraphs":27,"nextCursor":null,"paragraphs":[{"id":"p0493","text":"ARTICLE IX PRODUCT MANUFACTURING AND SUPPLY"},{"id":"p0494","text":"9.1 General."},{"id":"p0495","text":"(a) It is understood that Array procures supplies of Drug Substance and Drug Product (collectively, the \"Materials\") from Subcontractors. Subject to the…
```

- [seq 882](trajectory.jsonl#L882) **drafter → search**

```json
{"query":"refund replace defective non-conforming"}
```

- [seq 883](trajectory.jsonl#L883) **search result**

```json
[]
```

- [seq 884](trajectory.jsonl#L884) **drafter → search**

```json
{"query":"Specifications"}
```

- [seq 885](trajectory.jsonl#L885) **search result**

```json
[{"paragraphId":"p0501","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…all contain forecasting and ordering procedures (including lead times), product specifications, delivery terms and other customary terms, which terms shall in all cases be co…"},{"paragraphId":"p0510","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…all contain forecasting and ordering procedu…
```

- [seq 912](trajectory.jsonl#L912) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"Insert express conformance warranty with repair/replace/refund remedy into pharma license and supply agreement, fallback level"}
```

- [seq 913](trajectory.jsonl#L913) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 934](trajectory.jsonl#L934) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Insert an express conformance warranty with repair/replace/refund remedy as Section 15.5","comment":"[Playbook] Article 15 contains only Effective-Date representations and a mutual disclaimer, with no conformance warranty or remedy for what Array delivers or performs. We have added a short Section 15.5 at our fallback position: 90 days for deliverables/software against documentation, 30 days for services, with repair, replacement or refund.","ops":[{"kind":"insert_after","paragraphId":"p0711","numbering":"15.5","text":"15.5 Performance Warranty. Array warrants that (a) for ninety (90) days following delivery, each deliverable and item of software supplied by Array will conform in all material respects to its documentation and specifications, and (b) for thirty (30) days following performance, services performed by Array under this Agreement will conform in all material respects to the requirements of this Agreement. For any breach of this warranty, Array shall, at Ono's election, repair or replace the non-conforming deliverable, software or services, or refund the amounts paid for them."}]}
```

- [seq 935](trajectory.jsonl#L935) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0711","segments":[{"type":"equal","text":"15.4 Except as otherwise expressly set forth in this Agreement, neither Party makes any representation or extends any warranties of any kind either express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, noninfringement or validity of any patent…
```

- [seq 974](trajectory.jsonl#L974) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0681","p0691","p0711"],"quote":"15.4 Except as otherwise expressly set forth in this Agreement, neither Party makes any representation or extends any warranties of any kind either express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, noninfringement or validity of any patents issued or pending","rationale":"Article 15 contains only mutual corporate/authority representations and Array IP representations, all given solely \\\"as of the Effective Date\\\" (p0681, p0691), plus a mutual disclaimer of implied warranties (p0711). Article IX defers product specifications and quality terms to future supply and quality agreements (p0501, p0510) and contains no conformance warranty or remedy. There is therefore no express performance or conformance warranty anywhere in the document and no repair, replacement or refund remedy, which fails every fallback element. The disclaimer is prefaced by \\\"Except as otherwise expressly set forth in this Agreement\\\", so a new express warranty is not swallowed and no carve-out is needed. We insert a short Section 15.5 at the fallback level (90 days deliverables/software against documentation, 30 days services, repair/replace or refund) rather than the preferred 12-month/professional-and-workmanlike package.","confidence":0.78,"elementCoverage":{"level":"fallback","mappings":[{"element":"Software is warranted to conform to its documentation for at least 90 days.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Services are warranted for at least 30 days.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Warranty remedies include repair or replacement.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Warranty remedies include a refund.","status":"addressed_by_operation","operationIndexes":[1]}]},"proposal":{"level":"fallback","summary":"Insert an express conformance warranty with repair/replace/refund remedy as Section 15.5","comment":"[Playbook] Article 15 contains only Effective-Date representations and a mutual disclaimer, with no conformance warranty or remedy for what Array delivers or performs. We have added a short Section 15.5 at our fallback position: 90 days for deliverables/software against documentation, 30 days for services, with repair, replacement or refund.","ops":[{"kind":"insert_after","paragraphId":"p0711","numbering":"15.5","text":"15.5 Performance Warranty. Array warrants that (a) for ninety (90) days following delivery, each deliverable and item of software supplied by Array will conform in all material respects to its documentation and specifications, and (b) for thirty (30) days following performance, services performed by Array under this Agreement will conform in all material respects to the requirements of this Agreement. For any breach of this warranty, Array shall, at Ono's election, repair or replace the non-conforming deliverable, software or services, or refund the amounts paid for them."}]}}
```

- [seq 975](trajectory.jsonl#L975) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 974](trajectory.jsonl#L974)
- Finding: `f-warranty-4f2634da` · **deviation** · confidence 0.78
- Location: § REPRESENTATIONS, WARRANTIES AND COVENANTS
- Quote: “15.4 Except as otherwise expressly set forth in this Agreement, neither Party makes any representation or extends any warranties of any kind either express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, noninfringement or validity of any patents issued or pending”
- Rationale: Article 15 contains only mutual corporate/authority representations and Array IP representations, all given solely \"as of the Effective Date\" (p0681, p0691), plus a mutual disclaimer of implied warranties (p0711). Article IX defers product specifications and quality terms to future supply and quality agreements (p0501, p0510) and contains no conformance warranty or remedy. There is therefore no express performance or conformance warranty anywhere in the document and no repair, replacement or refund remedy, which fails every fallback element. The disclaimer is prefaced by \"Except as otherwise expressly set forth in this Agreement\", so a new express warranty is not swallowed and no carve-out is needed. We insert a short Section 15.5 at the fallback level (90 days deliverables/software against documentation, 30 days services, repair/replace or refund) rather than the preferred 12-month/professional-and-workmanlike package.
- Proposal: **fallback** — Insert an express conformance warranty with repair/replace/refund remedy as Section 15.5
- Comment: [Playbook] Article 15 contains only Effective-Date representations and a mutual disclaimer, with no conformance warranty or remedy for what Array delivers or performs. We have added a short Section 15.5 at our fallback position: 90 days for deliverables/software against documentation, 30 days for services, with repair, replacement or refund.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "15.5",
    "paragraphId": "p0711",
    "text": "15.5 Performance Warranty. Array warrants that (a) for ninety (90) days following delivery, each deliverable and item of software supplied by Array will conform in all material respects to its documentation and specifications, and (b) for thirty (30) days following performance, services performed by Array under this Agreement will conform in all material respects to the requirements of this Agreement. For any breach of this warranty, Array shall, at Ono's election, repair or replace the non-conforming deliverable, software or services, or refund the amounts paid for them."
  }
]
```

### Verifier and repair feedback

- [seq 1021](trajectory.jsonl#L1021) **Verdict: pass** — The insertion is position-complete at the fallback level: all four fallback elements (90-day software/deliverable conformance to documentation, 30-day services warranty, repair/replace, refund) appear in operative language in new Section 15.5, not merely in the margin comment. Preferred level fails on four elements: no professional-and-workmanlike services standard, a 90-day rather than 12-month software period, a 30-day rather than 90-day services period, and no compliance-with-laws or no-malicious-code warranties. To reach preferred the drafter would need to add (i) "the Services will be performed in a professional and workmanlike manner consistent with industry standards", (ii) extend 15.5(a) to twelve (12) months and 15.5(b) to ninety (90) days, and (iii) add express compliance-with-applicable-laws and no-malicious-code warranties. Minimality holds: the redline is a concise standalone insertion with no deletion or paraphrase of existing text; no carve-out edit to 15.4 was needed because that disclaimer already opens "Except as otherwise expressly set forth in this Agreement," so the new express warranty is not swallowed. Two drafting notes short of a minimality failure: "and specifications" broadens the conformance benchmark beyond the checklist's "documentation" (and Article IX defers product specifications to a future supply/quality agreement, so the reference could read as unfixed), and "at Ono's election" is more favourable than the model's vendor-option remedy — both are customer-favourable and neither adds an out-of-checklist obligation, but the drafter may wish to trim "and specifications" or tie it to specifications agreed under Article IX. Intent is preserved: the Effective-Date representations in 15.1/15.2, the mutual implied-warranty disclaimer in 15.4, and Article IX's supply/quality-agreement mechanics all survive without contradiction; no cross-reference is broken and the warranty runs in the correct direction (Array as counterparty warranting to Ono as our client). The "deviation" classification is correct under the detection guidance: the document contained no express performance or conformance warranty and no repair/replace/refund remedy, so an insertion was warranted rather than a rationale-only note. Checks: {"name":"operation 1 applies","ok":true}; {"name":"warranty period ≥ 90 days or expressed in months/years","ok":true,"detail":"matched after customer/vendor alias normalization"}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 918](trajectory.jsonl#L918)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Commercial general liability coverage is at least USD 1,000,000 per occurrence.",
  "Commercial general liability coverage is at least USD 2,000,000 in the aggregate.",
  "Professional errors and omissions coverage is at least USD 2,000,000.",
  "If Vendor processes Customer Data, cyber and privacy coverage is at least USD 5,000,000.",
  "Vendor maintains workers' compensation coverage as required by law.",
  "Vendor provides certificates of insurance on request."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Professional errors and omissions coverage is at least USD 1,000,000.",
  "Cyber and privacy coverage is at least USD 2,000,000."
]

Planner evidence and hints:
{"ruleId":"INSURANCE","candidateSectionIds":[],"candidateParagraphIds":[],"likelyAbsent":true,"note":"No insurance covenant found; only 'insurance' hits are freight and health-insurance references inside the Net Sales definition (p0101, p0102). Treat as missing and consider requesting product liability insurance/self-insurance support for Array's indemnity in sec-p0715."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 938](trajectory.jsonl#L938) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 939](trajectory.jsonl#L939) **search result**

```json
[{"paragraphId":"p0101","sectionRef":"§ I DEFINITIONS","snippet":"(c) a fixed amount of [ * ] of gross sales to cover freight, postage, insurance costs on shipments to such Third Party, packing costs, and other transportation…"},{"paragraphId":"p0102","sectionRef":"§ I DEFINITIONS","snippet":"…f its pharmaceutical products sold in Japan, and any other governmental, health insurance or other payer…
```

- [seq 940](trajectory.jsonl#L940) **drafter → list_sections**

```json
{}
```

- [seq 941](trajectory.jsonl#L941) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 964](trajectory.jsonl#L964) **drafter → read_section**

```json
{"sectionId":"sec-p0715"}
```

- [seq 965](trajectory.jsonl#L965) **read_section result**

```json
{"sectionRef":"§ INDEMNIFICATION; RECALLS","cursor":0,"totalParagraphs":13,"nextCursor":null,"paragraphs":[{"id":"p0715","text":"INDEMNIFICATION; RECALLS"},{"id":"p0716","text":"16.1 Indemnification of Array. Ono shall indemnify and hold harmless each of Array, its Affiliates and the directors, officers and employees of such entities and the successors and assigns of any of the foregoing (the \"A…
```

- [seq 966](trajectory.jsonl#L966) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"pharma license agreement, no insurance clause; insert fallback E&O 1M and cyber 2M"}
```

- [seq 967](trajectory.jsonl#L967) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 988](trajectory.jsonl#L988) **drafter → read_section**

```json
{"sectionId":"sec-16.6"}
```

- [seq 989](trajectory.jsonl#L989) **read_section result**

```json
{"sectionRef":"§ 16.6 Recalls. To the extent that:","cursor":0,"totalParagraphs":6,"nextCursor":null,"paragraphs":[{"id":"p0728","text":"16.6 Recalls. To the extent that:"},{"id":"p0729","text":"(i) any Regulatory Authority in the Ono Territory issues a directive or order that the Product be recalled or withdrawn in any country within the Ono Territory;"},{"id":"p0730","text":"(ii) a court of com…
```

- [seq 990](trajectory.jsonl#L990) **drafter → read_section**

```json
{"sectionId":"sec-p0759","limit":12}
```

- [seq 991](trajectory.jsonl#L991) **read_section result**

```json
{"sectionRef":"§ GENERAL PROVISIONS","cursor":0,"totalParagraphs":41,"nextCursor":12,"paragraphs":[{"id":"p0759","text":"GENERAL PROVISIONS"},{"id":"p0760","text":"18.1 Force Majeure. If the performance of any part of this Agreement (except for any payment obligation under this Agreement) by either Party is prevented, restricted, interfered with or delayed by"},{"id":"p0761","text":"80"},{"id":"p…
```

- [seq 1012](trajectory.jsonl#L1012) **drafter → read_section**

```json
{"sectionId":"sec-p0759","cursor":12,"limit":30}
```

- [seq 1013](trajectory.jsonl#L1013) **read_section result**

```json
{"sectionRef":"§ GENERAL PROVISIONS","cursor":12,"totalParagraphs":41,"nextCursor":null,"paragraphs":[{"id":"p0771","text":"or unenforceability shall not affect the validity, legality or enforceability of such provision in any other jurisdiction."},{"id":"p0772","text":"18.7 Entire Agreement; Amendments. This Agreement (including the Exhibits attached hereto), together with the pharmacovigilance …
```

- [seq 1038](trajectory.jsonl#L1038) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Insert a short insurance covenant (E&O USD 1M; cyber/privacy USD 2M) as Section 18.15.","comment":"[Playbook] The Agreement contains no insurance covenant, so we have added a short provision requiring Array to carry errors and omissions cover of USD 1,000,000 and cyber and privacy cover of USD 2,000,000. This is our fallback insurance position and supports Array's indemnity obligations in Article 16.","ops":[{"kind":"insert_after","paragraphId":"p0796","numbering":"18.15","text":"Insurance. Array shall maintain professional liability (errors and omissions) insurance of not less than USD 1,000,000 and cyber and privacy liability insurance of not less than USD 2,000,000."}]}
```

- [seq 1039](trajectory.jsonl#L1039) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0796","segments":[{"type":"equal","text":"18.14 Counterparts; Other Matters. This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument. Signatures to this Agreement delivered by facsimile or similar electronic transmission will b…
```

- [seq 1048](trajectory.jsonl#L1048) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0796"],"quote":"18.14 Counterparts; Other Matters. This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.","rationale":"The Agreement has no insurance covenant anywhere: the only \"insurance\" references are freight/insurance costs and health insurance payers inside the Net Sales definition (p0101, p0102), and Article 16 (indemnification and recalls) contains no insurance support for Array's indemnities. We therefore insert a short insurance provision at the fallback level (E&O USD 1,000,000 and cyber/privacy USD 2,000,000) at the end of the General Provisions, keeping the change to the minimum needed and leaving the preferred CGL, workers' compensation and certificate elements out of scope of this fallback target.","confidence":0.72,"proposal":{"level":"fallback","summary":"Insert a short insurance covenant (E&O USD 1M; cyber/privacy USD 2M) as Section 18.15.","comment":"[Playbook] The Agreement contains no insurance covenant, so we have added a short provision requiring Array to carry errors and omissions cover of USD 1,000,000 and cyber and privacy cover of USD 2,000,000. This is our fallback insurance position and supports Array's indemnity obligations in Article 16.","ops":[{"kind":"insert_after","paragraphId":"p0796","numbering":"18.15","text":"Insurance. Array shall maintain professional liability (errors and omissions) insurance of not less than USD 1,000,000 and cyber and privacy liability insurance of not less than USD 2,000,000."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"Professional errors and omissions coverage is at least USD 1,000,000.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Cyber and privacy coverage is at least USD 2,000,000.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 1049](trajectory.jsonl#L1049) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1048](trajectory.jsonl#L1048)
- Finding: `f-insurance-25d2aa3e` · **missing** · confidence 0.72
- Location: § GENERAL PROVISIONS
- Quote: “18.14 Counterparts; Other Matters. This Agreement may be executed in any number of counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.”
- Rationale: The Agreement has no insurance covenant anywhere: the only "insurance" references are freight/insurance costs and health insurance payers inside the Net Sales definition (p0101, p0102), and Article 16 (indemnification and recalls) contains no insurance support for Array's indemnities. We therefore insert a short insurance provision at the fallback level (E&O USD 1,000,000 and cyber/privacy USD 2,000,000) at the end of the General Provisions, keeping the change to the minimum needed and leaving the preferred CGL, workers' compensation and certificate elements out of scope of this fallback target.
- Proposal: **fallback** — Insert a short insurance covenant (E&O USD 1M; cyber/privacy USD 2M) as Section 18.15.
- Comment: [Playbook] The Agreement contains no insurance covenant, so we have added a short provision requiring Array to carry errors and omissions cover of USD 1,000,000 and cyber and privacy cover of USD 2,000,000. This is our fallback insurance position and supports Array's indemnity obligations in Article 16.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "18.15",
    "paragraphId": "p0796",
    "text": "Insurance. Array shall maintain professional liability (errors and omissions) insurance of not less than USD 1,000,000 and cyber and privacy liability insurance of not less than USD 2,000,000."
  }
]
```

### Verifier and repair feedback

- [seq 1082](trajectory.jsonl#L1082) **Verdict: pass** — Finding classification 'missing' is supported: the rendered original (18.14 Counterparts; Other Matters) and the cited context contain no insurance covenant, only unrelated freight/health-insurance references inside Net Sales; insertion is the correct remedy. The fallback checklist is complete on its face: both atomic elements (E&O ≥ USD 1,000,000; cyber and privacy ≥ USD 2,000,000) are expressed as unconditional 'shall maintain' obligations of the counterparty at or above the stated floors, so the redline is position-complete at the fallback level. Preferred level is not reached — CGL per-occurrence and aggregate limits, the USD 2,000,000 E&O limit, the USD 5,000,000 cyber limit, workers' compensation and certificates on request are all absent. That is a deliberate fallback target and is acceptable, but the redline should not be described as meeting the preferred position. Minimality holds: the insertion adds only the two fallback coverages and omits model-language extras (no 'at its own expense', no term-plus-one-year survival tail, no certificate procedure, no CGL). No existing words were deleted or paraphrased, and no favourable retained language was disturbed. Intent preserved: the counterparts, electronic-signature and English-language provisions of 18.14 survive intact; the new covenant creates no undefined term, dangling cross-reference or contradiction with Article 16 indemnities, which it supports. Drafting nit only (not a deviation): the new 'Insurance.' paragraph is appended after 18.14 without its own section number — give it a discrete number (e.g. 18.15) so it does not read as part of the Counterparts clause. Optionally consider adding a duration ('throughout the Term') for enforceability, though no selected element requires it. Checks: {"name":"operation 1 applies","ok":true}; {"name":"insurance obligation present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 1006](trajectory.jsonl#L1006)

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

Preferred atomic elements (copy the JSON string values exactly):
[
  "Customer has no minimum purchase or volume commitment.",
  "Customer pays only for usage or ordered Services."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "The commitment is limited to the current 12-month term.",
  "Customer may reduce the commitment on 30 days' notice.",
  "Any shortfall is handled through a true-up rather than a penalty."
]

Planner evidence and hints:
{"ruleId":"MINCOMMIT","candidateSectionIds":["sec-ix"],"candidateParagraphIds":["p0495","p0499","p0500","p0501","p0508","p0509","p0510","p0516"],"likelyAbsent":false,"note":"No express minimum purchase, take-or-pay or shortfall payment located. Article IX contemplates clinical and commercial supply agreements containing forecasting and ordering procedures (p0500-p0501, p0509-p0510), the likely future home of binding-forecast exposure. Confirm no volume commitment in the body of the Agreement."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 1024](trajectory.jsonl#L1024) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0495","p0499","p0500","p0501","p0508","p0509","p0510","p0516"]}
```

- [seq 1025](trajectory.jsonl#L1025) **read_paragraphs result**

```json
[{"id":"p0495","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","text":"(a) It is understood that Array procures supplies of Drug Substance and Drug Product (collectively, the \"Materials\") from Subcontractors. Subject to the terms and conditions of this Agreement, Array shall supply, or secure supply of, Ono's requirements for Materials for the Ono Territory pursuant to one or more supply a…
```

- [seq 1026](trajectory.jsonl#L1026) **drafter → search**

```json
{"query":"minimum purchase commitment take or pay shortfall"}
```

- [seq 1027](trajectory.jsonl#L1027) **search result**

```json
[]
```

- [seq 1042](trajectory.jsonl#L1042) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 1043](trajectory.jsonl#L1043) **search result**

```json
[]
```

- [seq 1044](trajectory.jsonl#L1044) **drafter → search**

```json
{"query":"binding forecast quantities order"}
```

- [seq 1045](trajectory.jsonl#L1045) **search result**

```json
[]
```

- [seq 1058](trajectory.jsonl#L1058) **drafter → search**

```json
{"query":"forecast"}
```

- [seq 1059](trajectory.jsonl#L1059) **search result**

```json
[{"paragraphId":"p0501","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…ls Manufactured by a Subcontractor. The clinical supply agreement shall contain forecasting and ordering procedures (including lead times), product specifications, deli…"},{"paragraphId":"p0510","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…ments for Materials for the Ono Territory, which S…
```

- [seq 1060](trajectory.jsonl#L1060) **drafter → search**

```json
{"query":"purchase"}
```

- [seq 1061](trajectory.jsonl#L1061) **search result**

```json
[{"paragraphId":"p0483","sectionRef":"§ VII PAYMENTS; BOOKS AND RECORDS","snippet":"… Date, in the event that Ono elects in the future to provide a discount for the purchase of a bundle of products that includes a Product, or if its Affiliates or Sublic…"},{"paragraphId":"p0499","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…or Commercialization in the Ono Territory, at Array's …
```

- [seq 1072](trajectory.jsonl#L1072) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":40}
```

- [seq 1073](trajectory.jsonl#L1073) **read_section result**

```json
{"sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","cursor":0,"totalParagraphs":27,"nextCursor":null,"paragraphs":[{"id":"p0493","text":"ARTICLE IX PRODUCT MANUFACTURING AND SUPPLY"},{"id":"p0494","text":"9.1 General."},{"id":"p0495","text":"(a) It is understood that Array procures supplies of Drug Substance and Drug Product (collectively, the \"Materials\") from Subcontractors. Subject to the…
```

- [seq 1085](trajectory.jsonl#L1085) **drafter → search**

```json
{"query":"royalty","limit":20}
```

- [seq 1086](trajectory.jsonl#L1086) **search result**

```json
[{"paragraphId":"p0078","sectionRef":"§ I DEFINITIONS","snippet":"1.30 \"Initial Royalty Term\" means, on a Product-by-Product and country-by-country basis within the On…"},{"paragraphId":"p0080","sectionRef":"§ I DEFINITIONS","snippet":"…th respect to such Product in such country equals or exceeds [ * ], the Initial Royalty Term will immediately terminate with respect to such Product."},{"paragr…
```

- [seq 1087](trajectory.jsonl#L1087) **drafter → search**

```json
{"query":"obligated to pay regardless"}
```

- [seq 1088](trajectory.jsonl#L1088) **search result**

```json
[]
```

- [seq 1097](trajectory.jsonl#L1097) **drafter → search**

```json
{"query":"exclusively from Array all of its requirements"}
```

- [seq 1098](trajectory.jsonl#L1098) **search result**

```json
[]
```

- [seq 1099](trajectory.jsonl#L1099) **drafter → search**

```json
{"query":"quantities","limit":20}
```

- [seq 1100](trajectory.jsonl#L1100) **search result**

```json
[{"paragraphId":"p0499","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…upply. Upon Ono's written request, Array agrees to supply to Ono from available quantities in its possession (i.e., quantities not otherwise required by Array in its own …"},{"paragraphId":"p0499","sectionRef":"§ IX PRODUCT MANUFACTURING AND SUPPLY","snippet":"…rray agrees to supply to Ono from available quan…
```

- [seq 1109](trajectory.jsonl#L1109) **drafter → search**

```json
{"query":"diligence obligations Commercialize Ono shall","limit":10}
```

- [seq 1110](trajectory.jsonl#L1110) **search result**

```json
[]
```

- [seq 1111](trajectory.jsonl#L1111) **drafter → search**

```json
{"query":"annual","limit":15}
```

- [seq 1112](trajectory.jsonl#L1112) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ I DEFINITIONS","snippet":"1.2 \"Annual Net Sales\" means the Net Sales generated over any given Fiscal Year, or in the …"},{"paragraphId":"p0422","sectionRef":"§ 5 [ * ] ¥[ * ]","snippet":"…quarterly, at the applicable rates set forth in Section 6.3 below, based on the Annual Net Sales of all Products, subject to the adjustments set forth in Sections 6.4…"}…
```

- [seq 1119](trajectory.jsonl#L1119) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0495","p0501","p0508","p0509","p0510","p0422"],"quote":"(b) Without limiting the foregoing, Ono shall have the right to obtain from Array Ono's commercial requirements of Materials for the Ono Territory.","rationale":"The Agreement imposes no minimum purchase, take-or-pay, shortfall or volume commitment on Ono, so it sits at the preferred position. Article IX frames supply entirely as Ono's entitlement: Array must supply \"Ono's requirements\" (9.1(a)), clinical Materials are procured only \"as reasonably requested in writing by Ono\" (9.3(a)), and commercially Ono \"shall have the right to obtain from Array Ono's commercial requirements\" (9.4(b)) while also having \"the right (but not the obligation) to Manufacture\" or source those requirements itself (9.4(a)). Payments are consumption-based only: transfer price for Materials actually ordered, and royalties calculated on Annual Net Sales (Section 6.3) with no minimum annual royalty. The future clinical and commercial supply agreements will contain \"forecasting and ordering procedures\" (9.3(a), 9.4(b)(i)), which is the usual home for binding-forecast exposure, but those are agreements-to-agree on commercially reasonable terms and create no present commitment; we would police any binding forecast when those documents are negotiated. No redline is warranted.","confidence":0.86,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer has no minimum purchase or volume commitment.","status":"already_met","quote":"(b) Without limiting the foregoing, Ono shall have the right to obtain from Array Ono's commercial requirements of Materials for the Ono Territory."},{"element":"Customer pays only for usage or ordered Services.","status":"already_met","quote":"Array shall procure Materials on behalf of and as reasonably requested in writing by Ono, which Materials will be supplied to Ono at transfer price equal to:"}]}}
```

- [seq 1120](trajectory.jsonl#L1120) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1119](trajectory.jsonl#L1119)
- Finding: `f-mincommit-5d0ab09a` · **compliant** · confidence 0.86
- Location: § IX PRODUCT MANUFACTURING AND SUPPLY
- Quote: “(b) Without limiting the foregoing, Ono shall have the right to obtain from Array Ono's commercial requirements of Materials for the Ono Territory.”
- Rationale: The Agreement imposes no minimum purchase, take-or-pay, shortfall or volume commitment on Ono, so it sits at the preferred position. Article IX frames supply entirely as Ono's entitlement: Array must supply "Ono's requirements" (9.1(a)), clinical Materials are procured only "as reasonably requested in writing by Ono" (9.3(a)), and commercially Ono "shall have the right to obtain from Array Ono's commercial requirements" (9.4(b)) while also having "the right (but not the obligation) to Manufacture" or source those requirements itself (9.4(a)). Payments are consumption-based only: transfer price for Materials actually ordered, and royalties calculated on Annual Net Sales (Section 6.3) with no minimum annual royalty. The future clinical and commercial supply agreements will contain "forecasting and ordering procedures" (9.3(a), 9.4(b)(i)), which is the usual home for binding-forecast exposure, but those are agreements-to-agree on commercially reasonable terms and create no present commitment; we would police any binding forecast when those documents are negotiated. No redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 1017](trajectory.jsonl#L1017)

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


Preferred atomic elements (copy the JSON string values exactly):
[
  "Transition obligations apply on expiry or termination.",
  "Vendor provides transition assistance for up to six months.",
  "Transition assistance is charged at then-current rates.",
  "Vendor returns Customer Data within 30 days after expiry or termination.",
  "Customer Data is returned in a standard machine-readable format.",
  "Vendor certifies deletion of Customer Data after its return."
]

Fallback atomic elements (copy the JSON string values exactly):
[
  "Transition obligations apply on expiry or termination.",
  "Vendor provides at least 90 days of transition assistance.",
  "Vendor exports Customer Data within 30 days after expiry or termination."
]

Planner evidence and hints:
{"ruleId":"TRANSITION","candidateSectionIds":["sec-xiv","sec-x"],"candidateParagraphIds":["p0639","p0646","p0647","p0652","p0653","p0654","p0656","p0660","p0661","p0662","p0665","p0666","p0667","p0673"],"likelyAbsent":false,"note":"Article XIV wind-down regime: Wind-down Period and sell-off (p0652-p0654), Clinical Study transition (p0646-p0647), assignment of Regulatory Filings/Marketing Approvals (p0656, p0667), continued commercialization (p0660), Improvement licences to Array (p0661), return/destruction of materials (p0662), domain and Sublicense transfer (p0665-p0666), survival (p0673). Regime runs largely in Array's favour; check reciprocal data return/assistance to Ono and transition cost allocation (p0647)."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 1032](trajectory.jsonl#L1032) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0639","p0646","p0647","p0652","p0653","p0654","p0656","p0660","p0661","p0662","p0665","p0666","p0667","p0673"]}
```

- [seq 1033](trajectory.jsonl#L1033) **read_paragraphs result**

```json
[{"id":"p0639","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"ARTICLE XIV EFFECT OF TERMINATION"},{"id":"p0646","sectionRef":"§ XIV EFFECT OF TERMINATION","text":"In the event Ono is the sponsor of or conducting any on-going Clinical Studies of the Product following the date a notice of termination has been issued by Array or Ono, to the extent requested by Array, Ono agrees to: (A) continue …
```

- [seq 1034](trajectory.jsonl#L1034) **drafter → list_sections**

```json
{}
```

- [seq 1035](trajectory.jsonl#L1035) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"CONFIDENTIAL","level":1,"paragraphCount":1},{"id":"sec-p0002","heading":"EXECUTION VERSION","level":1,"paragraphCount":1},{"id":"sec-p0003","heading":"LICENSE, DEVELOPMENT AND COMMERCIALIZATION AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-p0005","heading":"BACKGROUND","level":1,"paragraphC…
```

- [seq 1052](trajectory.jsonl#L1052) **drafter → read_section**

```json
{"sectionId":"sec-xiv","limit":40}
```

- [seq 1053](trajectory.jsonl#L1053) **read_section result**

```json
{"sectionRef":"§ XIV EFFECT OF TERMINATION","cursor":0,"totalParagraphs":40,"nextCursor":null,"paragraphs":[{"id":"p0639","text":"ARTICLE XIV EFFECT OF TERMINATION"},{"id":"p0640","text":"65"},{"id":"p0641","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to R…
```

- [seq 1054](trajectory.jsonl#L1054) **drafter → search**

```json
{"query":"return or destroy Confidential Information"}
```

- [seq 1055](trajectory.jsonl#L1055) **search result**

```json
[]
```

- [seq 1064](trajectory.jsonl#L1064) **drafter → search**

```json
{"query":"destroy"}
```

- [seq 1065](trajectory.jsonl#L1065) **search result**

```json
[{"paragraphId":"p0662","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…e Wind-down Period, upon request by Array, Ono shall either deliver to Array or destroy all tangible items comprising, bearing or containing trademarks of Array (inclu…"}]
```

- [seq 1066](trajectory.jsonl#L1066) **drafter → search**

```json
{"query":"return all copies"}
```

- [seq 1067](trajectory.jsonl#L1067) **search result**

```json
[]
```

- [seq 1076](trajectory.jsonl#L1076) **drafter → search**

```json
{"query":"transition assistance"}
```

- [seq 1077](trajectory.jsonl#L1077) **search result**

```json
[]
```

- [seq 1078](trajectory.jsonl#L1078) **drafter → search**

```json
{"query":"supply of Product following termination"}
```

- [seq 1079](trajectory.jsonl#L1079) **search result**

```json
[]
```

- [seq 1091](trajectory.jsonl#L1091) **drafter → search**

```json
{"query":"transition","limit":30}
```

- [seq 1092](trajectory.jsonl#L1092) **search result**

```json
[{"paragraphId":"p0174","sectionRef":"§ II GRANT OF LICENSE","snippet":"7.4 (Records), 8.2 (Exclusivity of Efforts) and 14.2 (transition obligations on termination)."},{"paragraphId":"p0646","sectionRef":"§ XIV EFFECT OF TERMINATION","snippet":"…ase of any other termination of this Agreement by either Party, or (B) promptly transition to Array or its designee such sponsorship or Clinical Studies …
```

- [seq 1093](trajectory.jsonl#L1093) **drafter → read_section**

```json
{"sectionId":"sec-x","limit":34}
```

- [seq 1094](trajectory.jsonl#L1094) **read_section result**

```json
{"sectionRef":"§ X CONFIDENTIALITY","cursor":0,"totalParagraphs":34,"nextCursor":null,"paragraphs":[{"id":"p0520","text":"ARTICLE X CONFIDENTIALITY"},{"id":"p0521","text":"51"},{"id":"p0522","text":"[ * ] = Certain confidential information contained in this document, marked by brackets, has been omitted and filed separately with the Securities and Exchange Commission pursuant to Rule 24b-2 of the…
```

- [seq 1103](trajectory.jsonl#L1103) **drafter → get_definition**

```json
{"term":"Data"}
```

- [seq 1104](trajectory.jsonl#L1104) **get_definition result**

```json
{"found":true,"term":"Data","paragraphId":"p0048","text":"1.13 \"Data\" means, subject to Section 1.51 (Ono Know-How) and Section 4.4(c)(ii), any and all research data, pharmacology data, preclinical data, clinical data and/or all Regulatory Filings and/or other regulatory documentation, information and submissions pertaining to, or made in association with an IND, Marketing Approval Application,…
```

- [seq 1105](trajectory.jsonl#L1105) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Pharma license agreement; insert reciprocal Array transition assistance and Ono data return in Article XIV"}
```

- [seq 1106](trajectory.jsonl#L1106) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 1115](trajectory.jsonl#L1115) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Insert reciprocal Array transition-assistance and Ono data-return obligation in Section 14.2(a)","comment":"[Playbook] Article XIV requires Ono to transition everything back to Array but gives us nothing on exit. We have added a short reciprocal provision: on expiry or termination Array provides at least 90 days of transition assistance and exports our Data within 30 days, which is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0667","numbering":"(x)","text":"Transition Assistance and Return of Ono Data. Upon expiration or termination of this Agreement for any reason, Array shall (A) at Ono's request, provide reasonable transition assistance to Ono for a period of at least ninety (90) days, and (B) within thirty (30) days, export and deliver to Ono all Data and other information belonging to, supplied by or generated for Ono that is in Array's possession or control."}]}
```

- [seq 1116](trajectory.jsonl#L1116) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0667","segments":[{"type":"equal","text":"(ix) Following a termination by Ono pursuant to Section 13.3 or 13.4, in the event that Array wishes to have Ono: (A) assign to Array the Regulatory Filings for the Product in the Ono Territory and provide to Array a copy of all Data and Ono Know-How pertaining to the Product as described in 14.2(a)(iii)…
```

- [seq 1123](trajectory.jsonl#L1123) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0660","p0662","p0667"],"quote":"(iv) Transition. Each Party shall use Diligent Efforts to cooperate with the other and/or its designee to effect a smooth and orderly transition in the Development, sale and ongoing marketing, promotion and commercialization of the Product in the Ono Territory during the Wind-down Period and to conduct in an expeditious manner any activities to be conducted under this Section 14.2.","rationale":"Article XIV's wind-down regime runs entirely in Array's favour: Ono must transition Clinical Studies (14.2(a)(i)), assign Regulatory Filings and hand over all Data and Ono Know-How (14.2(a)(iii)), provide customer lists and data (14.2(a)(iv)), and deliver or destroy Array materials (14.2(a)(vi)). The only mutual language, Section 14.2(a)(iv), is a Diligent Efforts cooperation covenant limited to transitioning the Product back to Array during the Wind-down Period; it imposes no fixed assistance period running from expiry or termination and no obligation on Array to return or export Ono's data at all. Article X contains no return-of-Confidential-Information mechanic either. No usable clause therefore exists, so we insert the shortest fallback provision: at least 90 days of transition assistance from Array on any expiry or termination and export of Ono's Data within 30 days. We have not added the preferred six-month/machine-readable/certified-deletion terms.","confidence":0.82,"elementCoverage":{"level":"fallback","mappings":[{"element":"Transition obligations apply on expiry or termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor provides at least 90 days of transition assistance.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor exports Customer Data within 30 days after expiry or termination.","status":"addressed_by_operation","operationIndexes":[1]}]},"proposal":{"level":"fallback","summary":"Insert reciprocal Array transition-assistance and Ono data-return obligation in Section 14.2(a)","comment":"[Playbook] Article XIV requires Ono to transition everything back to Array but gives us nothing on exit. We have added a short reciprocal provision: on expiry or termination Array provides at least 90 days of transition assistance and exports our Data within 30 days, which is our fallback position.","ops":[{"kind":"insert_after","paragraphId":"p0667","numbering":"(x)","text":"Transition Assistance and Return of Ono Data. Upon expiration or termination of this Agreement for any reason, Array shall (A) at Ono's request, provide reasonable transition assistance to Ono for a period of at least ninety (90) days, and (B) within thirty (30) days, export and deliver to Ono all Data and other information belonging to, supplied by or generated for Ono that is in Array's possession or control."}]}}
```

- [seq 1124](trajectory.jsonl#L1124) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1123](trajectory.jsonl#L1123)
- Finding: `f-transition-44e14b29` · **missing** · confidence 0.82
- Location: § XIV EFFECT OF TERMINATION
- Quote: “(iv) Transition. Each Party shall use Diligent Efforts to cooperate with the other and/or its designee to effect a smooth and orderly transition in the Development, sale and ongoing marketing, promotion and commercialization of the Product in the Ono Territory during the Wind-down Period and to conduct in an expeditious manner any activities to be conducted under this Section 14.2.”
- Rationale: Article XIV's wind-down regime runs entirely in Array's favour: Ono must transition Clinical Studies (14.2(a)(i)), assign Regulatory Filings and hand over all Data and Ono Know-How (14.2(a)(iii)), provide customer lists and data (14.2(a)(iv)), and deliver or destroy Array materials (14.2(a)(vi)). The only mutual language, Section 14.2(a)(iv), is a Diligent Efforts cooperation covenant limited to transitioning the Product back to Array during the Wind-down Period; it imposes no fixed assistance period running from expiry or termination and no obligation on Array to return or export Ono's data at all. Article X contains no return-of-Confidential-Information mechanic either. No usable clause therefore exists, so we insert the shortest fallback provision: at least 90 days of transition assistance from Array on any expiry or termination and export of Ono's Data within 30 days. We have not added the preferred six-month/machine-readable/certified-deletion terms.
- Proposal: **fallback** — Insert reciprocal Array transition-assistance and Ono data-return obligation in Section 14.2(a)
- Comment: [Playbook] Article XIV requires Ono to transition everything back to Array but gives us nothing on exit. We have added a short reciprocal provision: on expiry or termination Array provides at least 90 days of transition assistance and exports our Data within 30 days, which is our fallback position.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(x)",
    "paragraphId": "p0667",
    "text": "Transition Assistance and Return of Ono Data. Upon expiration or termination of this Agreement for any reason, Array shall (A) at Ono's request, provide reasonable transition assistance to Ono for a period of at least ninety (90) days, and (B) within thirty (30) days, export and deliver to Ono all Data and other information belonging to, supplied by or generated for Ono that is in Array's possession or control."
  }
]
```

### Verifier and repair feedback

- [seq 1131](trajectory.jsonl#L1131) **Verdict: pass** — Fallback is position-complete: the single inserted paragraph supplies the expiry/termination trigger, a 90-day minimum assistance period running from that trigger, and a 30-day data export obligation on Array. Preferred is not reached (period is 90 days not six months; no then-current-rates basis; no machine-readable format; no certified deletion after return), consistent with the drafter's stated fallback target. Minimal: the clause is a concise insertion for a missing provision, deletes nothing from Article XIV, adds no survival tail, expense allocation, damages, or procedural boilerplate, and does not duplicate the existing 14.2(a)(iv) cooperation covenant (which runs only during the Wind-down Period and only toward Array). Preserves intent: "Data" and "Ono" are defined terms, no cross-reference is broken, and Ono's existing wind-down obligations under 14.2(a)(iii), (iv), (vi) and (ix) survive without contradiction — the new duty runs the other way, on Array. Note for the drafter (rationale only, no redline required): if pressed to preferred, the three repairs are (i) "up to six (6) months" at Array's then-current rates, (ii) "in a commonly used, machine-readable format" in limb (B), and (iii) a limb (C) requiring deletion and written certification thereafter. Checks: {"name":"operation 1 applies","ok":true}; {"name":"data return/transition present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 1136](trajectory.jsonl#L1136) memo LLM request
- [seq 1137](trajectory.jsonl#L1137) memo LLM response (replay)

```markdown
# Issues Memo — Array / Ono Licence, Development and Supply Agreement

**Prepared for:** Client (Ono, as Licensee/Customer)  
**Subject:** Playbook review findings and negotiation posture  
**Status:** Privileged and confidential — attorney work product

---

## 1. Executive summary

We have completed a playbook review of the Agreement. Of the nineteen rules assessed, **eight are compliant** (six at the preferred position, two at the fallback), **seven are deviations** requiring redlines, **two are missing** clauses we need to insert, and **one (termination for convenience) requires further review** because our proposed fix did not verify cleanly.

The two most serious problems are ri[REDACTED] gaps that our playbook treats as walk-away territory:

- **No Vendor IP infringement indemnity (critical).** Article 16 contains mutual indemnities, but Array's indemnity at 16.2 is confined to its own commercialization in the Array Territory, Array-sponsored Clinical Studies and breach of Article 15. Section 11.4 instead leaves each Subject Party to defend Infringement Actions "at its own expense." There is no defence duty and no cover for Array's breach of Law, unauthorized disclosure of our Confidential Information, or gross negligence/willful misconduct. Ono's own indemnity at 16.1 is materially broader than our playbook permits.
- **Mandatory ICC arbitration seated in Osaka (high).** Section 17.3 sends every Dispute to binding ICC arbitration, and 17.3(a) seats it in Osaka whenever Array demands. There is no court forum for the merits; Section 17.3(g) preserves court access only for provisional relief. Governing law (New York, Section 18.3) is acceptable and unchanged.

Also material: **no aggregate liability cap anywhere in the Agreement** (Section 16.5 is only a consequential-damages waiver), leaving Ono's broad 16.1 product-liability indemnity uncapped; **two Ono-side restrictive covenants** in Section 8.2 (class-based, open-ended, with a post-termination tail and an Array termination right); **unlimited on-site audit rights** for Array under Section 4.9; and the **absence of any express performance/conformance warranty, transition-assistance obligation on Array, or insurance covenant**.

On the positive side, our IP, licence-scope, renewal, minimum-commitment, MFN, non-solicitation and liquidated-damages positions are all acceptable as drafted and we do not propose to open them. Notably, Section 13.1 converts our Section 2.1 licences into perpetual, irrevocable, fully paid-up, royalty-free licences on expiry, and Section 14.3's liquidated-damages mechanic runs in our favour.

---

## 2. Findings

| Severity | Rule | Status | Section | Summary / position taken |
|---|---|---|---|---|
| Critical | INDEMN — Indemnification by Vendor | Deviation *(redline repaired)* | INDEMNIFICATION; RECALLS (Art. 16; cf. 11.4) | No Array IP infringement indemnity, no defence duty, no law/confidentiality/GN-WM heads; Ono's 16.1 indemnity too broad. We add a stand-alone IP indemnity at new 16.2A overriding 11.4, the defence duty and heads (e)–(g) in 16.2, and narrow 16.1. Procedure at 16.3 (notice, sole control, cooperation) is already adequate. |
| Critical | IP — Ownership of deliverables and Customer Data | Compliant *(at fallback)* | TERM AND TERMINATION (Art. 11, 13.1; 4.2, 4.10) | Sits at the fallback; not redlined. Array retains only its pre-existing IP (2.1(e), 11.1(b)); Ono owns its inventions, INDs, Marketing Approvals, Patient Samples and Data; 13.1 converts our licences to perpetual/royalty-free. Noted but not flagged: joint ownership under 11.1(c)–(d), territory-limited Development/Commercialization licences, and Article XIV reversion (disapplied by 14.2(a)(ix) on our termination for Array breach/insolvency). |
| High | EXCLUSIVITY — Exclusivity binding Customer | Deviation | § VIII CERTAIN COVENANTS (8.2; 14.2(a)(i)) | Open-ended exclusive-dealing covenant on Ono and Affiliates, with a post-termination tail and an immediate Array termination right; fails the 12-month cap and has no service-failure relief. We strike the Ono-side covenant, the tail and Array's termination right, preserve Array's reciprocal restriction, and conform the 14.2(a)(i) cross-reference. Article IX supply is not exclusivity (Ono retains manufacture/subcontract and technology-transfer rights). |
| High | GOVLAW — Governing law and venue | Deviation | § XVII DISPUTE RESOLUTION (17.3; cf. 18.3) | Mandatory ICC arbitration, seat Osaka at Array's election — walk-away. We convert 17.3 to exclusive jurisdiction of the state and federal courts in New York County over the merits, retain temporary injunctive relief elsewhere, and disapply residual arbitration machinery (preserving the 17.3(f) internal-counsel privilege protection). Section 17.2 Expert track and Section 18.3 New York law untouched. |
| High | LD — Liquidated damages payable by Customer | Compliant *(preferred)* | § XIV EFFECT OF TERMINATION (14.3; cf. 13.2, 6.1) | The only LD provision runs against Array and gives Ono an election plus reduced royalty; no LD, penalty, minimum fee or exit fee is payable by Ono. Not flagged. |
| High | LICENSE — Licence grant scope | Compliant *(at/above fallback)* | § II GRANT OF LICENSE (2.1, 2.2; 18.9; 13.1) | Affiliate sublicensing permitted without consent; successor transfer permitted under 18.9; grants not revocable at Array's discretion and convert to perpetual on expiry. Noted only: Third Party contractor cover is express for Manufacturing, with Development/Commercialization sublicences needing consent. |
| High | NONCOMPETE — Non-compete on Customer | Deviation *(redline repaired)* | § VIII CERTAIN COVENANTS (8.2) | Class-based prohibition on Ono and Affiliates over a redacted compound class, redacted in-term trigger, unspecified post-termination anniversary, no internal-development or acquisition carve-outs — walk-away. We substitute a named-compound covenant (Binimetinib/Encorafenib), term-limited with a 12-month cap and carve-outs, and conform Array's termination trigger. Array's reciprocal restriction and the royalty-termination consequence are preserved. |
| High | T4C — Termination for convenience | **Needs review — verification failed** | TERM AND TERMINATION (13.2; 6.1) | Ono's at-will exit does not arise until the later of two redacted periods from First Commercial Sale, leaving a multi-year stretch with no convenience right (walk-away); notice period redacted; no refund of prepaid amounts. Array has no convenience right (13.3/13.4 for cause only; 13.5 runs to Ono alone). Proposed fix — 30 days' notice at any time with pro-rata refund plus a Section 6.1 carve-out — did not verify and needs manual drafting review before it goes out. |
| Medium | AUDIT — Audit rights against Customer | Deviation | § IV DEVELOPMENT AND REGULATORY ACTIVITIES (4.9; 7.4) | Section 4.9 permits Array facility entry and records examination on "reasonable advance notice" with no frequency limit (walk-away) and survives termination; Section 7.4 lacks a fixed notice period and leaves the underpayment cost-shift blank. We add a once-per-year cap and 15 days' notice to 4.9, 15 days' notice to 7.4, and fix the threshold at 10% underpayment. We did not press the preferred off-site/no-facility-access position, which would require collateral GxP rewrites in Article IV. |
| Medium | LOL-CAP — Limitation of liability | Deviation *(redline repaired)* | INDEMNIFICATION; RECALLS (16.5; new 16.7) | Section 16.5 is only a mutual consequential-damages waiver; no aggregate cap exists, leaving direct exposure (including Ono's 16.1 product-liability indemnity) unlimited. We add new Section 16.7: mutual cap at 12 months' amounts payable by Ono, with indemnification obligations (incl. Article 10, 16.1, 16.2), confidentiality breach and gross negligence/willful misconduct outside the cap. Preferred elements (USD 1,000,000 greater-of floor, "paid or payable", data-protection/fraud carve-outs) not claimed. |
| Medium | MFN — MFN obligations burdening Customer | Compliant *(preferred)* | § IX PRODUCT MANUFACTURING AND SUPPLY (9.3(b)) | No MFN, best-pricing or right-to-match obligation on Ono; the one MFN-flavoured clause (9.3(b)) runs in our favour. No redline. |
| Medium | MINCOMMIT — Minimum commitments / volume restrictions | Compliant *(preferred)* | § IX PRODUCT MANUFACTURING AND SUPPLY (9.1(a), 9.3(a), 9.4) | Supply is framed as Ono's entitlement, not obligation; payments are consumption-based with no minimum annual royalty. Future supply agreements will carry forecasting/ordering procedures — we will police binding-forecast exposure when those are negotiated. |
| Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant *(preferred)* | § VIII CERTAIN COVENANTS | No employee non-solicitation or no-hire covenant anywhere. The only Ono-side restriction is the 8.2 product exclusivity, assessed under the exclusivity/non-compete rules. |
| Medium | RENEWAL — Auto-renewal and notice window | Compliant *(preferred)* | TERM AND TERMINATION (13.1; 14.4) | Single self-executing term to expiry of the Secondary Royalty Term; no auto-renewal, opt-out window or renewal uplift. Section 14.4 confirms continued dealings are not a renewal. On expiry our licences convert to perpetual and royalty-free. |
| Medium | TRANSITION — Transition assistance and data return | **Missing** | § XIV EFFECT OF TERMINATION (14.2(a)) | Wind-down runs entirely in Array's favour (transition of Clinical Studies, assignment of Regulatory Filings, handover of Data and Know-How, customer lists, return/destruction of materials). No fixed assistance period and no Array obligation to return or export Ono data; Article X has no return-of-Confidential-Information mechanic. We insert the fallback: at least 90 days' Array transition assistance on any expiry or termination, and export of Ono Data within 30 days. |
| Medium | WARRANTY — Performance warranty and duration | Deviation | REPRESENTATIONS, WARRANTIES AND COVENANTS (Art. 15; cf. Art. IX) | Article 15 gives only corporate/authority and Array IP representations, all as of the Effective Date, plus a mutual implied-warranty disclaimer; Article IX defers specifications and quality terms to future agreements with no conformance warranty or remedy. We insert new Section 15.5 at the fallback (90 days deliverables/software against documentation, 30 days services; repair/replace or refund). The disclaimer's "Except as otherwise expressly set forth" preface means no carve-out is needed. |
| Low | ASSIGN — Assignment and change of control | Deviation | GENERAL PROVISIONS (18.9; cf. 18.10) | Section 18.9 is mutual and already delivers the successor carve-out and written assumption, but the consent gate for non-successor assignments is unqualified. We insert "not to be unreasonably withheld or delayed" into the first sentence only. Change of control is not a concern: 18.10 addresses only a Change in Control of Array and gives Array no termination or re-pricing right. |
| Low | INSURANCE — Vendor insurance | **Missing** | GENERAL PROVISIONS | No insurance covenant anywhere; the only "insurance" references are freight costs and health insurance payers in the Net Sales definition, and Article 16 provides no insurance support for Array's indemnities. We insert new Section 18.15 at the fallback (E&O USD 1,000,000; cyber/privacy USD 2,000,000), leaving CGL, workers' compensation and certificate requirements out of scope. |

---

## 3. Walk-away items

The following findings reach walk-away territory under the playbook and should be treated as conditions of signature rather than trading chips:

1. **Absence of an Array IP infringement indemnity** (Art. 16; Section 11.4 leaves each party to defend Infringement Actions at its own expense). We need a stand-alone IP indemnity expressed to override 11.4, together with the defence duty. Our stated trade: we can restore the reciprocal product-liability and clinical-study allocation, and the narrowing of Ono's 16.1 indemnity is negotiable, **if** Array grants the IP indemnity.
2. **Mandatory ICC arbitration capable of being seated in Osaka** (Section 17.3, 17.3(a)), with no court forum for the merits. New York law is already agreed, so the ask is confined to forum.
3. **Open-ended, class-based post-termination non-compete on Ono** of undetermined scope and duration (Section 8.2).
4. **No termination-for-convenience right during a multi-year stretch of the term** (Section 13.2 delayed commencement) — subject to the drafting review flagged below.
5. **Unlimited facility-entry and records-inspection right for Array** under Section 4.9, with no frequency cap and surviving termination.

---

## 4. Next steps

1. **Re-draft the T4C redline before issue.** The Section 13.2 operation (delete delayed commencement; 30 days' notice; pro-rata refund) plus the Section 6.1 carve-out for the upfront licence fee failed verification. We will re-cut it manually and re-verify, retaining the heading, the "for any reason" language and the rationale-with-notice condition.
2. **Confirm the three repaired redlines** (INDEMN new 16.2A and amended 16.1/16.2; NONCOMPETE narrowed 8.2; LOL-CAP new 16.7) read cleanly against the surrounding text, and that the 16.7 carve-out cross-references (Article 10, 16.1, 16.2) match the indemnity sources identified in 16.5.
3. **Issue the redline package** covering: INDEMN, GOVLAW, EXCLUSIVITY, NONCOMPETE, AUDIT, LOL-CAP, WARRANTY (new 15.5), TRANSITION (14.2(a)), ASSIGN (18.9) and INSURANCE (new 18.15). No changes to be proposed on IP, LICENSE, LD, MFN, MINCOMMIT, NOSOLICIT or RENEWAL.
4. **Sequence the negotiation** around the five walk-away items, holding the Ono-side 16.1 narrowing and the reciprocal product-liability/clinical-study allocation as the consideration for Array's IP indemnity.
5. **Obtain the redacted figures** underlying Section 8.2 (compound class and periods), Section 13.2 (commencement and notice periods) and Section 7.4 (cost-shift threshold) so the business team can confirm the impact of our proposed substitutions.
6. **Diary the supply-agreement negotiations.** Sections 9.3(a) and 9.4(b)(i) defer forecasting and ordering procedures to future documents; we will police binding-forecast and volume exposure at that stage, since no present commitment exists.
```

## Apply and validation

No apply or output-validation event was recorded.
