# Trajectory: synth-13

| Run | Value |
|---|---|
| Contract | synth-13 — MASTER SERVICES AGREEMENT |
| Config | final-v4 |
| Parties | Meridian Fieldworks, Inc. (our party) ↔ Copperleaf Technology Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 2.6s (2,585 ms) |
| Calls | 117 LLM · 132 tool · 8 retries |
| Tokens | 106,429 input · 126,503 output · 776,493 cache read · 155,733 cache write |
| Cost | $5.056298 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 472 | 100 | 132 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 536](trajectory.jsonl#L536) |
| verifier | 45 | 15 | 0 | 15 verdict(s) | [seq 140](trajectory.jsonl#L140)–[seq 539](trajectory.jsonl#L539) |
| assembler | 21 | 0 | 0 | — | [seq 133](trajectory.jsonl#L133)–[seq 547](trajectory.jsonl#L547) |
| memo | 4 | 1 | 0 | — | [seq 543](trajectory.jsonl#L543)–[seq 546](trajectory.jsonl#L546) |
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
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0081","text":"21. LIMITATION OF LIABILITY"}]}
```

- [seq 15](trajectory.jsonl#L15) **drafter → list_sections**

```json
{}
```

- [seq 16](trajectory.jsonl#L16) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-21.1"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","paragraphs":[{"id":"p0082","text":"21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception."}]}
```

- [seq 51](trajectory.jsonl#L51) **drafter → read_section**

```json
{"sectionId":"sec-21.3"}
```

- [seq 52](trajectory.jsonl#L52) **read_section result**

```json
{"sectionRef":"§ 21.3 “Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property. Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Sec…
```

- [seq 53](trajectory.jsonl#L53) **drafter → lookup_precedent**

```json
{"ruleId":"LOL-CAP","context":"One-month fee cap \"without exception\" conflicting with Excluded Claims regime"}
```

- [seq 54](trajectory.jsonl#L54) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 97](trajectory.jsonl#L97) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0082","oldText":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","newText":"Except for Excluded Claims, which are not subject to this limitation, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000."}],"comment":"[Playbook] We have moved the cap to the greater of twelve months' Fees and USD 1,000,000, as a one-month fee cap is not a meaningful remedy for either Party. We have also removed \"without exception\" so that the Excluded Claims in Section 21.3 (confidentiality, data protection and security, indemnities, gross negligence, wilful misconduct, fraud and IP infringement) sit outside the cap, as Section 21.3 already contemplates.","level":"preferred","summary":"Raise the mutual liability cap to the greater of 12 months' Fees and USD 1,000,000 and carve out Excluded Claims."}
```

- [seq 98](trajectory.jsonl#L98) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0082","segments":[{"type":"equal","text":"21.1 "},{"type":"delete","text":"Each Party's aggregate liability "},{"type":"insert","text":"Except for Excluded Claims, which are not subject to this limitation, each Party's total aggregate liability arising out of or relating to this Agreement "},{"type":"equal","text":"shall not exceed "},{"type":"d…
```

- [seq 123](trajectory.jsonl#L123) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0082","p0084"],"quote":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","rationale":"The cap in 21.1 is mutual, but its basis is only one month of Fees actually paid — far below the fallback of 12 months' fees and inside walk-away territory (a cap below six months' fees). The words \"without exception\" also override the Excluded Claims regime in 21.3, placing indemnification, confidentiality, data-protection/security, gross negligence, wilful misconduct, fraud and IP infringement inside a one-month cap with no super-cap, which the playbook treats as walk-away. Sections 21.2 (mutual exclusion of indirect damages, with restoration/replacement costs preserved as direct) and 21.3 (Excluded Claims definition; Customer's payment obligation is not damages) are otherwise at the preferred position, so the minimal fix is to correct 21.1's cap basis and reinstate the carve-out.","confidence":0.93,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0082","oldText":"Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.","newText":"Except for Excluded Claims, which are not subject to this limitation, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the Fees paid or payable by Customer under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000."}],"comment":"[Playbook] We have moved the cap to the greater of twelve months' Fees and USD 1,000,000, as a one-month fee cap is not a meaningful remedy for either Party. We have also removed \"without exception\" so that the Excluded Claims in Section 21.3 (confidentiality, data protection and security, indemnities, gross negligence, wilful misconduct, fraud and IP infringement) sit outside the cap, as Section 21.3 already contemplates.","level":"preferred","summary":"Raise the mutual liability cap to the greater of 12 months' Fees and USD 1,000,000 and carve out Excluded Claims."}}
```

- [seq 124](trajectory.jsonl#L124) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 123](trajectory.jsonl#L123)
- Finding: `f-lol-cap-15076c27` · **deviation** · confidence 0.93
- Location: § 21.1 Each Party's aggregate liability shall not exceed Fees actu…
- Quote: “Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.”
- Rationale: The cap in 21.1 is mutual, but its basis is only one month of Fees actually paid — far below the fallback of 12 months' fees and inside walk-away territory (a cap below six months' fees). The words "without exception" also override the Excluded Claims regime in 21.3, placing indemnification, confidentiality, data-protection/security, gross negligence, wilful misconduct, fraud and IP infringement inside a one-month cap with no super-cap, which the playbook treats as walk-away. Sections 21.2 (mutual exclusion of indirect damages, with restoration/replacement costs preserved as direct) and 21.3 (Excluded Claims definition; Customer's payment obligation is not damages) are otherwise at the preferred position, so the minimal fix is to correct 21.1's cap basis and reinstate the carve-out.
- Proposal: **preferred** — Change 21.1's cap to the greater of fees paid or payable in the 12 months preceding the claim or USD 1,000,000, carve out Excluded Claims, and confirm Customer's payment obligations are not damages.
- Comment: [Playbook] We have changed the cap basis in 21.1 to the greater of fees paid or payable in the 12 months preceding the claim or USD 1,000,000 and replaced "without exception" with a carve-out for Excluded Claims, since a one-month fee cap covering indemnities, confidentiality and IP infringement is below our walk-away line. We also broadened the saving in 21.3 so that Customer's payment obligations generally, not just undisputed Fees, sit outside the cap.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Each Party's aggregate liability shall not exceed the greater of fees paid or payable in the 12 months preceding the claim or USD 1,000,000, except for Excluded Claims.",
    "oldText": "Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.",
    "paragraphId": "p0082"
  },
  {
    "kind": "replace",
    "newText": "Customer's obligation to pay all amounts due is not damages and is not limited by this Section.",
    "oldText": "Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Section.",
    "paragraphId": "p0084"
  }
]
```

### Verifier and repair feedback

- [seq 168](trajectory.jsonl#L168) **Verdict: fail** — precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor. precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow. official minimality gate: Operation 1 expands 19 words to 59 words (ratio 3.11 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.754 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Preferred level is incomplete: the fee limb is anchored to "the event giving rise to the claim" rather than the claim, and uses the defined capital-F "Fees" (which excludes taxes, expenses and implementation charges), so it does not deliver "fees paid or payable in the 12 months preceding the claim". No mutual exclusion of indirect/consequential damages was inserted, a required preferred element that is absent from the document as rendered. The "not damages" saving is limited to "undisputed Fees for conforming Services" and was left untouched; the preferred position requires Customer's payment obligations generally to sit outside the cap. Minimality fails: the rewrite expands 19 words to 59 (ratio 3.11) with unnecessary boilerplate ("arising out of or relating to this Agreement", "total", "by Customer under this Agreement") when replacing the cap basis and deleting "without exception" would suffice. Intent is preserved: 21.3's Excluded Claims and the payment-obligation sentence remain effective and the carve-out cross-reference is coherent; the clause sits materially at or above the fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: cap references 12 months of fees or a fixed floor","ok":true}; {"name":"official check: no unlimited Customer liability language remains","ok":true}; {"name":"precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor","ok":false,"detail":"Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor."}; {"name":"precision position: preferred cap includes USD 1,000,000","ok":true}; {"name":"precision position: Customer payment obligations are not damages","ok":false,"detail":"State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 19 words to 59 words (ratio 3.11 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.754 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 169](trajectory.jsonl#L169) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Fee limb measured as fees paid or payable in the 12 months preceding the claim\n Verdict: not_met. Evidence: \"the Fees paid or payable by Customer under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim\" — event anchor, and defined capital-F \"Fees\" excludes taxes, expenses, implementation charges\n- Mutual exclusion of indirect/consequential damages\n Verdict: not_met. Evidence: No exclusion of indirect, consequential, incidental or special damages appears anywhere in 21.1 or 21.3 as rendered\n- Customer's payment obligations are not \"damages\" for cap purposes\n Verdict: not_met. Evidence: \"Customer's obligation to pay undisputed Fees for conforming Services is not damages\" — narrower than Customer's payment obligations generally\n\nDeterministic official failures:\n- precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor: Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor.\n- precision position: Customer payment obligations are not damages: State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow.\n- official minimality gate: Operation 1 expands 19 words to 59 words (ratio 3.11 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.754 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- arising out of or relating to this Agreement\n- total\n- by Customer under this Agreement\n- immediately\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level is incomplete: the fee limb is anchored to \"the event giving rise to the claim\" rather than the claim, and uses the defined capital-F \"Fees\" (which excludes taxes, expenses and implementation charges), so it does not deliver \"fees paid or payable in the 12 months preceding the claim\".\n- No mutual exclusion of indirect/consequential damages was inserted, a required preferred element that is absent from the document as rendered.\n- The \"not damages\" saving is limited to \"undisputed Fees for conforming Services\" and was left untouched; the preferred position requires Customer's payment obligations generally to sit outside the cap.\n- Minimality fails: the rewrite expands 19 words to 59 (ratio 3.11) with unnecessary boilerplate (\"arising out of or relating to this Agreement\", \"total\", \"by Customer under this Agreement\") when replacing the cap basis and deleting \"without exception\" would suffice.\n- Intent is preserved: 21.3's Excluded Claims and the payment-obligation sentence remain effective and the carve-out cross-reference is coherent; the clause sits materially at or above the fallback."
- [seq 211](trajectory.jsonl#L211) **Verdict: fail** — Preferred level is complete: the cap is now the greater of fees paid or payable in the 12 months preceding the claim and USD 1,000,000, mutual, with an uncapped Excluded Claims carve-out covering confidentiality, data protection, security, indemnities, gross negligence, wilful misconduct, fraud and the other Party's IP, plus a mutual consequential-damages exclusion. Operation 2 was unnecessary to complete the rule: the original 21.3 already stated that Customer's payment obligation is not damages, so the preferred element on payment obligations was satisfied before the edit. Rewriting the sentence is a change beyond what the level required. The rewrite also works against us: replacing "undisputed Fees for conforming Services" with "all amounts due" strips the customer-favourable qualifiers, so disputed amounts and amounts for non-conforming Services are now placed outside the liability cap and its protections. That degrades an untouched commercial protection rather than preserving it. Recommended fix: revert 21.3 to "Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Section." and keep only the 21.1 cap edit. Note (rationale only, not a deviation): the fallback would not be satisfied on its own terms because the cap is a greater-of construction rather than a flat 12 months' fees; this is immaterial as the drafted position sits at the preferred level. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: cap references 12 months of fees or a fixed floor","ok":true}; {"name":"official check: no unlimited Customer liability language remains","ok":true}; {"name":"precision position: preferred fee limb uses the exact lowercase fee basis and claim anchor","ok":true}; {"name":"precision position: preferred cap includes USD 1,000,000","ok":true}; {"name":"precision position: Customer payment obligations are not damages","ok":true}; {"name":"official minimality gate","ok":true}.

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
{"sectionId":"sec-20"}
```

- [seq 20](trajectory.jsonl#L20) **read_section result**

```json
{"sectionRef":"§ 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","paragraphs":[{"id":"p0080","text":"20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services."}]}
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 57](trajectory.jsonl#L57) **drafter → lookup_precedent**

```json
{"ruleId":"INDEMN","context":"No Vendor indemnity; Section 20 has only broad Customer indemnity; Sec 9.3 cross-references non-existent Section 20.5 remedies"}
```

- [seq 58](trajectory.jsonl#L58) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 101](trajectory.jsonl#L101) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Vendor IP/misconduct indemnity with standard procedure and infringement remedies; narrow Customer's indemnity","comment":"[Playbook] Section 20 currently contains only an unlimited Customer indemnity and no Vendor indemnity, which is our walk-away position; we have added a Vendor indemnity for IP infringement, breach of Applicable Law, Vendor-caused data breach and wilful misconduct, with customary exclusions, defence procedure and procure/modify/replace/refund remedies. We also narrowed Customer's indemnity to Customer-provided content and Customer's breach of law, and the new Section 20.5 supplies the remedies Section 9.3 already cross-references.","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","newText":"20.1 Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.2","text":"20.2 Section 20.1(a) does not apply to the extent a claim arises from Customer's unauthorized modification of the Services or Deliverables, their combination with items not supplied or recommended by Vendor where the claim would have been avoided absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.3","text":"20.3 The indemnified Party shall give prompt written notice of the claim, permit the indemnifying Party to control the defence and settlement (provided that no settlement imposing liability or an admission on the indemnified Party is made without its prior written consent), and provide reasonable cooperation at the indemnifying Party's expense. The indemnified Party may participate with its own counsel at its own cost."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.4","text":"20.4 Customer shall defend, indemnify, and hold harmless Vendor from and against third-party claims to the extent arising out of Customer Data or other content Customer provides to the Services in breach of this Agreement, or Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.5","text":"20.5 If the Services or Deliverables are, or in Vendor's reasonable opinion may become, the subject of a claim under Section 20.1(a), Vendor shall at its own expense procure for Customer the right to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item. If neither remedy is reasonably available, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees and Fees paid for the affected Deliverables."}]}
```

- [seq 102](trajectory.jsonl#L102) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0080","segments":[{"type":"equal","text":"20. INDEMNIFICATION 20.1 "},{"type":"delete","text":"Customer"},{"type":"insert","text":"Vendor"},{"type":"equal","text":" shall defend, indemnify, and hold harmless "},{"type":"delete","text":"Vendor from every claim relating in any way to Customer's use of the Services"},{"type":"insert","text":"Custom…
```

- [seq 136](trajectory.jsonl#L136) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0080"],"quote":"20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","rationale":"Section 20 contains only a one-way, unlimited Customer indemnity (\"every claim relating in any way to Customer's use of the Services\") and no Vendor indemnity at all — neither the preferred position (Vendor IP/breach-of-law/data-breach/wilful-misconduct indemnity with narrow Customer indemnity) nor the fallback (Vendor IP indemnity with usual exclusions and procure/modify/replace/refund remedies) is met; this is squarely the walk-away case. Section 9.3 also cross-references remedies \"required by Section 20.5\" that do not exist. The redline inserts the Vendor indemnity, customary exclusions, a standard notice/control/cooperation procedure, and infringement remedies (restoring the 20.5 cross-reference), and narrows Customer's indemnity to Customer-provided content and Customer's breach of Applicable Law.","confidence":0.95,"proposal":{"level":"preferred","summary":"Add Vendor IP/misconduct indemnity with standard procedure and infringement remedies; narrow Customer's indemnity","comment":"[Playbook] Section 20 currently contains only an unlimited Customer indemnity and no Vendor indemnity, which is our walk-away position; we have added a Vendor indemnity for IP infringement, breach of Applicable Law, Vendor-caused data breach and wilful misconduct, with customary exclusions, defence procedure and procure/modify/replace/refund remedies. We also narrowed Customer's indemnity to Customer-provided content and Customer's breach of law, and the new Section 20.5 supplies the remedies Section 9.3 already cross-references.","ops":[{"kind":"replace","paragraphId":"p0080","oldText":"20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.","newText":"20.1 Vendor shall defend, indemnify, and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, costs, and expenses (including reasonable attorneys' fees), to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.2","text":"20.2 Section 20.1(a) does not apply to the extent a claim arises from Customer's unauthorized modification of the Services or Deliverables, their combination with items not supplied or recommended by Vendor where the claim would have been avoided absent the combination, or Vendor's compliance with Customer's written specifications."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.3","text":"20.3 The indemnified Party shall give prompt written notice of the claim, permit the indemnifying Party to control the defence and settlement (provided that no settlement imposing liability or an admission on the indemnified Party is made without its prior written consent), and provide reasonable cooperation at the indemnifying Party's expense. The indemnified Party may participate with its own counsel at its own cost."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.4","text":"20.4 Customer shall defend, indemnify, and hold harmless Vendor from and against third-party claims to the extent arising out of Customer Data or other content Customer provides to the Services in breach of this Agreement, or Customer's breach of Applicable Law."},{"kind":"insert_after","paragraphId":"p0080","numbering":"20.5","text":"20.5 If the Services or Deliverables are, or in Vendor's reasonable opinion may become, the subject of a claim under Section 20.1(a), Vendor shall at its own expense procure for Customer the right to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item. If neither remedy is reasonably available, Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees and Fees paid for the affected Deliverables."}]}}
```

- [seq 137](trajectory.jsonl#L137) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 136](trajectory.jsonl#L136)
- Finding: `f-indemn-af20a8b9` · **deviation** · confidence 0.95
- Location: § 20 INDEMNIFICATION 20.1 Customer shall defend, indemnify, and…
- Quote: “20. INDEMNIFICATION 20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.”
- Rationale: Section 20 contains only a one-way, unlimited Customer indemnity ("every claim relating in any way to Customer's use of the Services") and no Vendor indemnity at all — neither the preferred position (Vendor IP/breach-of-law/data-breach/wilful-misconduct indemnity with narrow Customer indemnity) nor the fallback (Vendor IP indemnity with usual exclusions and procure/modify/replace/refund remedies) is met; this is squarely the walk-away case. Section 9.3 also cross-references remedies "required by Section 20.5" that do not exist. The redline inserts the Vendor indemnity, customary exclusions, a standard notice/control/cooperation procedure, and infringement remedies (restoring the 20.5 cross-reference), and narrows Customer's indemnity to Customer-provided content and Customer's breach of Applicable Law.
- Proposal: **preferred** — Add Vendor IP/misconduct indemnity for Customer and Affiliates with notice/control/cooperation procedure; narrow Customer's indemnity
- Comment: [Playbook] Section 20 contained only a one-way, unlimited Customer indemnity and no Vendor indemnity, which is our walk-away position; we added Vendor's defence and indemnity of Customer and its Affiliates for third-party IP claims, Vendor's breach of Applicable Law, Vendor-caused Customer Data breaches and gross negligence or wilful misconduct, with a standard notice, control, and cooperation procedure, and narrowed Customer's indemnity to Customer-provided content and Customer's breach of Applicable Law.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's content provided to the Services or Customer's breach of Applicable Law.",
    "oldText": "20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.",
    "paragraphId": "p0080"
  },
  {
    "kind": "insert_after",
    "numbering": "20.2",
    "paragraphId": "p0080",
    "text": "20.2 Vendor shall defend and indemnify Customer and its Affiliates against any third-party claim to the extent arising out of (a) an allegation that the Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor's breach of Applicable Law; (c) any unauthorized access to or disclosure of Customer Data caused by Vendor; or (d) Vendor's gross negligence or wilful misconduct."
  },
  {
    "kind": "insert_after",
    "numbering": "20.3",
    "paragraphId": "p0080",
    "text": "20.3 The indemnified Party shall give the indemnifying Party prompt written notice of the claim, the indemnifying Party shall control the defence, and the indemnified Party shall provide reasonable cooperation."
  }
]
```

### Verifier and repair feedback

- [seq 185](trajectory.jsonl#L185) **Verdict: fail** — precision position: preferred indemnity adds no hold-harmless language: Remove hold-harmless language; it is outside the preferred prose and fails strict minimality. precision position: preferred indemnity adds no a Customer defence duty: Remove a Customer defence duty; it is outside the preferred prose and fails strict minimality. precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation: Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality. precision position: preferred indemnity adds no fallback infringement remedies: Remove fallback infringement remedies; it is outside the preferred prose and fails strict minimality. official minimality gate: Operation 1 expands 22 words to 77 words (ratio 3.50 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.819 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters All atomic elements of the preferred position are present and operative: Vendor defence/indemnity to Customer and Affiliates for the four listed triggers, notice/control/cooperation procedure, and a Customer indemnity narrowed to Customer-provided content and Customer's breach of law. The fallback level is incomplete because no 3× annual fees super-cap on Vendor's indemnity obligation is inserted; only the preferred bargain is satisfied. Minimality fails: the edit imports fallback-only procure/modify/replace/refund remedies (20.5), adds hold-harmless language, an affirmative Customer defence duty, settlement-consent mechanics and an own-counsel participation right that are outside the preferred prose, and rewrites 20.1 wholesale (22 to 77 words, changed-character ratio 0.819). Intent is preserved: no undefined terms, all defined terms resolve, the Customer indemnity survives in narrowed form, and no dangling cross-reference is created (20.5 in fact supplies the remedies Section 9.3 references). Tighten by dropping 20.5 and the settlement/own-counsel add-ons, and by editing 20.1 with a narrower party-direction change rather than a full rewrite. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"operation 5 applies","ok":true}; {"name":"official check: vendor indemnity for IP infringement present","ok":true}; {"name":"precision position: preferred indemnity adds no hold-harmless language","ok":false,"detail":"Remove hold-harmless language; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates","ok":true}; {"name":"precision position: preferred indemnity adds no a Customer defence duty","ok":false,"detail":"Remove a Customer defence duty; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation","ok":false,"detail":"Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality."}; {"name":"precision position: preferred indemnity adds no fallback infringement remedies","ok":false,"detail":"Remove fallback infringement remedies; it is outside the preferred prose and fails strict minimality."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 22 words to 77 words (ratio 3.50 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.819 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 186](trajectory.jsonl#L186) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- precision position: preferred indemnity adds no hold-harmless language: Remove hold-harmless language; it is outside the preferred prose and fails strict minimality.\n- precision position: preferred indemnity adds no a Customer defence duty: Remove a Customer defence duty; it is outside the preferred prose and fails strict minimality.\n- precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation: Remove settlement mechanics beyond notice, control, and cooperation; it is outside the preferred prose and fails strict minimality.\n- precision position: preferred indemnity adds no fallback infringement remedies: Remove fallback infringement remedies; it is outside the preferred prose and fails strict minimality.\n- official minimality gate: Operation 1 expands 22 words to 77 words (ratio 3.50 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.819 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- and hold harmless\n- Customer shall defend, indemnify, and hold harmless Vendor\n- provided that no settlement imposing liability or an admission on the indemnified Party is made without its prior written consent\n- The indemnified Party may participate with its own counsel at its own cost.\n- Vendor shall at its own expense procure for Customer the right to continue using the affected item, or modify or replace it with a functionally equivalent non-infringing item\n- Customer may terminate the affected Services or Deliverables and Vendor shall refund prepaid Fees and Fees paid for the affected Deliverables\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All atomic elements of the preferred position are present and operative: Vendor defence/indemnity to Customer and Affiliates for the four listed triggers, notice/control/cooperation procedure, and a Customer indemnity narrowed to Customer-provided content and Customer's breach of law.\n- The fallback level is incomplete because no 3× annual fees super-cap on Vendor's indemnity obligation is inserted; only the preferred bargain is satisfied.\n- Minimality fails: the edit imports fallback-only procure/modify/replace/refund remedies (20.5), adds hold-harmless language, an affirmative Customer defence duty, settlement-consent mechanics and an own-counsel participation right that are outside the preferred prose, and rewrites 20.1 wholesale (22 to 77 words, changed-character ratio 0.819).\n- Intent is preserved: no undefined terms, all defined terms resolve, the Customer indemnity survives in narrowed form, and no dangling cross-reference is created (20.5 in fact supplies the remedies Section 9.3 references).\n- Tighten by dropping 20.5 and the settlement/own-counsel add-ons, and by editing 20.1 with a narrower party-direction change rather than a full rewrite."
- [seq 231](trajectory.jsonl#L231) **Verdict: repaired** — All atomic elements of the preferred position are present in operative text: Vendor defence and indemnity of Customer and Affiliates across the four required triggers, the notice/control/cooperation procedure, and the narrowing of Customer's indemnity to Customer-provided content and Customer's breach of Applicable Law. The fallback bargain is incomplete (no exclusions, no procure/modify/replace/refund remedies, no 3x super-cap), but that is irrelevant since the locked target level is preferred and it is fully satisfied. Edits are minimal: a targeted replacement of the Customer indemnity scope plus two concise insertions supplying the wholly absent Vendor indemnity and procedure; no fallback remedies, hold-harmless additions, extra indemnitees, or settlement mechanics were imported. Intent preserved: 19.5 and Section 21 are untouched, numbering follows sequentially, and all terms used (Affiliates, Applicable Law, Customer Data, Services, Deliverables) are defined. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"official check: vendor indemnity for IP infringement present","ok":true}; {"name":"precision position: preferred indemnity adds no hold-harmless language","ok":true}; {"name":"precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates","ok":true}; {"name":"precision position: preferred indemnity adds no a Customer defence duty","ok":true}; {"name":"precision position: preferred indemnity adds no settlement mechanics beyond notice, control, and cooperation","ok":true}; {"name":"precision position: preferred indemnity adds no fallback infringement remedies","ok":true}; {"name":"official minimality gate","ok":true}.

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

- [seq 61](trajectory.jsonl#L61) **drafter → search**

```json
{"query":"compet"}
```

- [seq 62](trajectory.jsonl#L62) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 63](trajectory.jsonl#L63) **drafter → lookup_precedent**

```json
{"ruleId":"NONCOMPETE","context":"24-month post-term worldwide non-compete on Customer; conflicts with prior no-restriction clause"}
```

- [seq 64](trajectory.jsonl#L64) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 89](trajectory.jsonl#L89) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete the 24-month worldwide non-compete imposed on Customer in § 12.4","comment":"[Playbook] We cannot accept restrictions on the businesses we operate or the products we build, buy or sell, so we have deleted § 12.4 — an undefined, worldwide, 24-month post-term non-compete is outside our playbook and also directly contradicts § 12.3. If you need protection for a specific offering, we could consider a narrow restriction limited to one named competing product, during the term only, with carve-outs for internal development and acquisitions.","ops":[{"kind":"delete_paragraph","paragraphId":"p0050"}]}
```

- [seq 90](trajectory.jsonl#L90) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0050","segments":[{"type":"delete","text":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory."}]}]}
```

- [seq 119](trajectory.jsonl#L119) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0050","p0049"],"quote":"12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.","rationale":"§ 12.4 binds us (Customer) with a non-compete that is post-term for 24 months, worldwide (\"in any territory\"), and undefined in scope (\"any product or service that competes with Vendor\"), with no carve-out for internal development or acquisitions — indeed it expressly captures acquisitions. That is walk-away territory under this rule and fails the fallback on every material term (duration, scope, carve-outs). It also directly contradicts § 12.3, in which Vendor acknowledges we have made no exclusivity or non-compete commitment. Deleting § 12.4 restores the preferred position and resolves the internal conflict; a narrowed fallback (single named product, term only, with carve-outs) is offered in the comment if Copperleaf needs protection.","confidence":0.95,"proposal":{"level":"preferred","summary":"Delete the 24-month worldwide non-compete imposed on Customer in § 12.4","comment":"[Playbook] We cannot accept restrictions on the businesses we operate or the products we build, buy or sell, so we have deleted § 12.4 — an undefined, worldwide, 24-month post-term non-compete is outside our playbook and also directly contradicts § 12.3. If you need protection for a specific offering, we could consider a narrow restriction limited to one named competing product, during the term only, with carve-outs for internal development and acquisitions.","ops":[{"kind":"delete_paragraph","paragraphId":"p0050"}]}}
```

- [seq 120](trajectory.jsonl#L120) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 119](trajectory.jsonl#L119)
- Finding: `f-noncompete-768576ee` · **deviation** · confidence 0.95
- Location: § 12.4 During the term and for twenty-four months thereafter, Cust…
- Quote: “12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.”
- Rationale: § 12.4 binds us (Customer) with a non-compete that is post-term for 24 months, worldwide ("in any territory"), and undefined in scope ("any product or service that competes with Vendor"), with no carve-out for internal development or acquisitions — indeed it expressly captures acquisitions. That is walk-away territory under this rule and fails the fallback on every material term (duration, scope, carve-outs). It also directly contradicts § 12.3, in which Vendor acknowledges we have made no exclusivity or non-compete commitment. Deleting § 12.4 restores the preferred position and resolves the internal conflict; a narrowed fallback (single named product, term only, with carve-outs) is offered in the comment if Copperleaf needs protection.
- Proposal: **preferred** — Flip § 12.4's prohibition so no non-compete or territory restriction binds Customer
- Comment: [Playbook] We cannot accept restrictions on the businesses we operate or the products we build, buy or sell, so we have flipped the operator in § 12.4 so that it confirms Customer may develop, market, sell or acquire competing products in any territory, consistent with § 12.3. If you need protection for a specific offering, we could discuss a narrow restriction limited to one named competing product, during the term only, with carve-outs for internal development and acquisitions.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer may develop",
    "oldText": "Customer shall not develop",
    "paragraphId": "p0050"
  }
]
```

### Verifier and repair feedback

- [seq 164](trajectory.jsonl#L164) **Verdict: fail** — official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence The single operation deletes § 12.4, the only operative non-compete on Customer, achieving the locked preferred level of no non-compete or field-of-use restriction. Minimality holds notwithstanding the official gate: the entire paragraph consists of nothing but the offending restriction (trigger, duty, worldwide scope and 24-month post-term tail), so no operator, number or short phrase edit could reach the preferred position — narrowing it would import fallback terms. No new words, exceptions or defined terms were introduced; § 12.3 was left untouched and its internal contradiction with § 12.4 is resolved rather than created. No dangling cross-references or mechanics depend on the deleted paragraph on the face of the rendered clause; unrelated commercial terms are unaffected. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no open-ended compete restriction on Customer remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 deletes a whole paragraph; replace only the offending words or sentence"}.
- [seq 165](trajectory.jsonl#L165) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence\n\nVerifier reasons:\n- The single operation deletes § 12.4, the only operative non-compete on Customer, achieving the locked preferred level of no non-compete or field-of-use restriction.\n- Minimality holds notwithstanding the official gate: the entire paragraph consists of nothing but the offending restriction (trigger, duty, worldwide scope and 24-month post-term tail), so no operator, number or short phrase edit could reach the preferred position — narrowing it would import fallback terms.\n- No new words, exceptions or defined terms were introduced; § 12.3 was left untouched and its internal contradiction with § 12.4 is resolved rather than created.\n- No dangling cross-references or mechanics depend on the deleted paragraph on the face of the rendered clause; unrelated commercial terms are unaffected."
- [seq 219](trajectory.jsonl#L219) **Verdict: repaired** — The single operator swap ("shall not develop" → "may develop") removes the only compete restriction on Customer, achieving the preferred position of no non-compete or field-of-use restriction. Fallback limiting conditions are vacuously satisfied because no restriction on Customer remains. Minimal: one short-phrase replacement in § 12.4; no other language touched, no new exceptions or boilerplate added. Intent preserved: § 12.3 remains effective and § 12.4 as flipped is consistent with it; no undefined terms or dangling mechanics. The residual permissive time framing ("During the term and for twenty-four months thereafter") is harmless surplus, not an operative restriction, and is noted rather than treated as a defect. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no open-ended compete restriction on Customer remains","ok":true}; {"name":"official minimality gate","ok":true}.

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

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"exclusiv","limit":30}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","snippet":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."},{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using a…
```

- [seq 69](trajectory.jsonl#L69) **drafter → search**

```json
{"query":"requirements from"}
```

- [seq 70](trajectory.jsonl#L70) **search result**

```json
[]
```

- [seq 93](trajectory.jsonl#L93) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Vendor named sole and exclusive provider of hosted analytics for full term; conflicting no-exclusivity clause in Sec 12.3"}
```

- [seq 94](trajectory.jsonl#L94) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 115](trajectory.jsonl#L115) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make Vendor's appointment non-exclusive and confirm Customer may source elsewhere","comment":"[Playbook] We cannot commit to Copperleaf as our sole and exclusive provider for the full term, so we have made the appointment non-exclusive; this also removes the conflict with Section 12.3, which already confirms we have given no exclusivity commitment. If some exclusivity is important to you, we could discuss a 12-month term limited to hosted analytics that ends automatically if service levels or delivery dates are missed.","ops":[{"kind":"replace","paragraphId":"p0013","oldText":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"2.2 Vendor's appointment is non-exclusive. Customer may obtain hosted analytics services, or any other products or services, from any third party at any time."}]}
```

- [seq 116](trajectory.jsonl#L116) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0013","segments":[{"type":"equal","text":"2.2 Vendor"},{"type":"delete","text":" will be Customer's sole and exclusive provider of "},{"type":"insert","text":"'s appointment is non-exclusive. Customer may obtain "},{"type":"equal","text":"hosted analytics services"},{"type":"delete","text":" throughout the term"},{"type":"insert","text":", or an…
```

- [seq 144](trajectory.jsonl#L144) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0013","p0049"],"quote":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","rationale":"Section 2.2 binds Customer to use Vendor as its sole and exclusive provider of hosted analytics for the entire term, with no category carve-outs and no performance-based exit — this is the walk-away position under the rule (exclusive dealing for the full term without a service-level/delivery exit), and it fails even the 12-month, performance-terminable fallback. It also directly contradicts Section 12.3 (p0049), in which Vendor acknowledges Customer has made no exclusivity commitment, creating an interpretive conflict that should be resolved in favour of the no-exclusivity position. Redline makes the appointment non-exclusive (preferred position); a 12-month, category-limited exclusivity with automatic termination on SLA/delivery failure is offered as fallback in the comment.</parationale>\n<parameter name=\"confidence\">0.9","proposal":{"level":"preferred","summary":"Make Vendor's appointment non-exclusive and confirm Customer may source elsewhere","comment":"[Playbook] We cannot commit to Copperleaf as our sole and exclusive provider for the full term, so we have made the appointment non-exclusive; this also removes the conflict with Section 12.3, which already confirms we have given no exclusivity commitment. If some exclusivity is important to you, we could discuss a 12-month term limited to hosted analytics that ends automatically if service levels or delivery dates are missed.","ops":[{"kind":"replace","paragraphId":"p0013","oldText":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"2.2 Vendor's appointment is non-exclusive. Customer may obtain hosted analytics services, or any other products or services, from any third party at any time."}]}}
```

- [seq 145](trajectory.jsonl#L145) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 160](trajectory.jsonl#L160) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0013","p0049"],"quote":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","rationale":"Section 2.2 binds Customer to use Vendor as its sole and exclusive provider of hosted analytics for the entire term, with no performance-based exit — the rule's walk-away position, and it fails the 12-month, SLA-terminable fallback. It also contradicts Section 12.3 (p0049), where Vendor acknowledges Customer has made no exclusivity commitment. Redline restores the preferred position (non-exclusive appointment); the comment offers the fallback.","confidence":0.9,"proposal":{"level":"preferred","summary":"Make Vendor's appointment non-exclusive and confirm Customer may source elsewhere","comment":"[Playbook] We cannot commit to Copperleaf as our sole and exclusive provider for the full term, so we have made the appointment non-exclusive; this also removes the conflict with Section 12.3, which already confirms we have given no exclusivity commitment. If some exclusivity is important to you, we could discuss a 12-month term limited to hosted analytics that ends automatically if service levels or delivery dates are missed.","ops":[{"kind":"replace","paragraphId":"p0013","oldText":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"2.2 Vendor's appointment is non-exclusive. Customer may obtain hosted analytics services, or any other products or services, from any third party at any time."}]}}
```

- [seq 161](trajectory.jsonl#L161) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 160](trajectory.jsonl#L160)
- Finding: `f-exclusivity-75577550` · **deviation** · confidence 0.90
- Location: § 2.2 Vendor will be Customer's sole and exclusive provider of ho…
- Quote: “2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.”
- Rationale: Section 2.2 binds Customer to use Vendor as its sole and exclusive provider of hosted analytics for the entire term, with no performance-based exit — the rule's walk-away position, and it fails the 12-month, SLA-terminable fallback. It also contradicts Section 12.3 (p0049), where Vendor acknowledges Customer has made no exclusivity commitment. Redline restores the preferred position (non-exclusive appointment); the comment offers the fallback.
- Proposal: **preferred** — Change Vendor's appointment in 2.2 from sole and exclusive to non-exclusive
- Comment: [Playbook] We have changed Copperleaf's appointment in 2.2 from sole and exclusive provider to a non-exclusive provider, so no exclusivity or sole-supplier obligation binds us; this also removes the conflict with Section 12.3, which already records that we have made no exclusivity commitment. If some exclusivity matters to you, we could discuss a 12-month arrangement limited to hosted analytics that ends automatically if service levels or delivery dates are missed.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "will be a non-exclusive provider of hosted analytics services",
    "oldText": "will be Customer's sole and exclusive provider of hosted analytics services",
    "paragraphId": "p0013"
  }
]
```

### Verifier and repair feedback

- [seq 215](trajectory.jsonl#L215) **Verdict: fail** — official minimality gate: Operation 1 changed-character ratio 0.741 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Preferred level is fully achieved: the sole-and-exclusive appointment in 2.2 is converted to non-exclusive, leaving no exclusivity or sole-supplier duty on Customer, and 12.3 is untouched. Minimality fails: the edit rewrites the whole of 2.2 and adds an affirmative purchasing freedom broader than the rule requires ('or any other products or services', 'at any time'), duplicating protection already granted by 12.3's untouched 'Nothing restricts Customer from ... engaging any supplier'. The official minimality gate also flagged a 0.741 changed-character ratio. A tighter edit — e.g. replacing 'sole and exclusive' with 'non-exclusive' in the original sentence — would complete the preferred level with far fewer changed characters. Intent is preserved: no undefined terms, no dangling mechanics, and the change removes the prior contradiction between 2.2 and 12.3. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.741 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 216](trajectory.jsonl#L216) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 changed-character ratio 0.741 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- or any other products or services\n- at any time\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Preferred level is fully achieved: the sole-and-exclusive appointment in 2.2 is converted to non-exclusive, leaving no exclusivity or sole-supplier duty on Customer, and 12.3 is untouched.\n- Minimality fails: the edit rewrites the whole of 2.2 and adds an affirmative purchasing freedom broader than the rule requires ('or any other products or services', 'at any time'), duplicating protection already granted by 12.3's untouched 'Nothing restricts Customer from ... engaging any supplier'. The official minimality gate also flagged a 0.741 changed-character ratio.\n- A tighter edit — e.g. replacing 'sole and exclusive' with 'non-exclusive' in the original sentence — would complete the preferred level with far fewer changed characters.\n- Intent is preserved: no undefined terms, no dangling mechanics, and the change removes the prior contradiction between 2.2 and 12.3."
- [seq 291](trajectory.jsonl#L291) **Verdict: repaired** — The redline achieves the locked preferred level: Vendor's appointment in 2.2 is now non-exclusive, so no exclusivity or sole-supplier obligation binds Customer. Fallback limits are satisfied vacuously because no exclusivity obligation remains. Change is a single targeted phrase replacement within 2.2; 12.3 and all other commercial terms are untouched and the prior conflict between 2.2 and 12.3 is resolved without new undefined terms or dangling mechanics. Fallback offer appears only in the non-operative margin comment, which is appropriate and does not affect the operative text. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"official minimality gate","ok":true}.

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
{"query":"most favoured|most favored|no less favorable|no less favourable|best pricing|MFN","regex":true}
```

- [seq 40](trajectory.jsonl#L40) **search result**

```json
[]
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"favourable"}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[]
```

- [seq 75](trajectory.jsonl#L75) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 76](trajectory.jsonl#L76) **search result**

```json
[]
```

- [seq 77](trajectory.jsonl#L77) **drafter → search**

```json
{"query":"pricing"}
```

- [seq 78](trajectory.jsonl#L78) **search result**

```json
[{"paragraphId":"p0065","sectionRef":"§ 16.1 “Confidential Information” means non-public information disclosed by or for a Party that is marked confidential or that a reasonable recipient would understand to be confidential given its nature and the circumstances. Customer Data, security information, product plans, pricing, personnel data, and the terms of this Agreement are Confidential Informati…
```

- [seq 105](trajectory.jsonl#L105) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 106](trajectory.jsonl#L106) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 107](trajectory.jsonl#L107) **drafter → read_section**

```json
{"sectionId":"sec-8.3"}
```

- [seq 108](trajectory.jsonl#L108) **read_section result**

```json
{"sectionRef":"§ 8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urban Consumers during the preceding twelve months and three percent. Vendor must give at least ninety days' written notice of an increase. No increase applies to prepaid periods.","paragraphs":[{"id":"p0034","text":"8.3 On renewal, Vendor may in…
```

- [seq 127](trajectory.jsonl#L127) **drafter → search**

```json
{"query":"no less"}
```

- [seq 128](trajectory.jsonl#L128) **search result**

```json
[]
```

- [seq 129](trajectory.jsonl#L129) **drafter → search**

```json
{"query":"any other customer"}
```

- [seq 130](trajectory.jsonl#L130) **search result**

```json
[]
```

- [seq 148](trajectory.jsonl#L148) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0049"],"quote":"Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"The Agreement imposes no most-favoured-nation or most-favoured-customer obligation on us. Section 12.3 expressly confirms that we have made no most-favoured-customer commitment, and the pricing provisions (§ 7.1 fixed Fees; § 8.3 capped renewal uplift) run in our favour against Vendor rather than obliging us to extend Vendor any better terms given to third parties. Searches for MFN, \"no less favourable\", best-pricing and third-party-matching language returned nothing. This meets the preferred position (no MFN burden on Customer), so no redline is warranted.","confidence":0.9}
```

- [seq 149](trajectory.jsonl#L149) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 148](trajectory.jsonl#L148)
- Finding: `f-mfn-e6e5a72a` · **compliant** · confidence 0.90
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: The Agreement imposes no most-favoured-nation or most-favoured-customer obligation on us. Section 12.3 expressly confirms that we have made no most-favoured-customer commitment, and the pricing provisions (§ 7.1 fixed Fees; § 8.3 capped renewal uplift) run in our favour against Vendor rather than obliging us to extend Vendor any better terms given to third parties. Searches for MFN, "no less favourable", best-pricing and third-party-matching language returned nothing. This meets the preferred position (no MFN burden on Customer), so no redline is warranted.

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

- [seq 43](trajectory.jsonl#L43) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 44](trajectory.jsonl#L44) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 45](trajectory.jsonl#L45) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 46](trajectory.jsonl#L46) **search result**

```json
[]
```

- [seq 81](trajectory.jsonl#L81) **drafter → search**

```json
{"query":"employ"}
```

- [seq 82](trajectory.jsonl#L82) **search result**

```json
[{"paragraphId":"p0004","sectionRef":"§ 1.2 “Applicable Law” means every statute, regulation, binding regulatory requirement, court order, and governmental rule applicable to a Party's performance under this Agreement, including laws concerning privacy, information security, export controls, employment, anti-bribery, and accessibility. Applicable Law does not include a private standard unless an …
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"induce"}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[]
```

- [seq 85](trajectory.jsonl#L85) **drafter → search**

```json
{"query":"hire"}
```

- [seq 86](trajectory.jsonl#L86) **search result**

```json
[{"paragraphId":"p0049","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 111](trajectory.jsonl#L111) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0049"],"quote":"Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"Searches for \"solicit\", \"induce\", \"employ or engage\" and \"hire\" return no restrictive covenant binding Meridian Fieldworks (the only hits are an Applicable Law definition and the insurance clause). The agreement therefore imposes no non-solicit or no-hire on us, which is the playbook's preferred position. § 12.3 reinforces this by expressly preserving our freedom to hire any person responding to general recruitment and confirming we have given no no-hire commitment. No redline warranted.","confidence":0.9}
```

- [seq 112](trajectory.jsonl#L112) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 148](trajectory.jsonl#L148)
- Finding: `f-nosolicit-d2128ed3` · **compliant** · confidence 0.90
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: Searches for "solicit", "induce", "employ or engage" and "hire" return no restrictive covenant binding Meridian Fieldworks (the only hits are an Applicable Law definition and the insurance clause). The agreement therefore imposes no non-solicit or no-hire on us, which is the playbook's preferred position. § 12.3 reinforces this by expressly preserving our freedom to hire any person responding to general recruitment and confirming we have given no no-hire commitment. No redline warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 134](trajectory.jsonl#L134)

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

- [seq 154](trajectory.jsonl#L154) **drafter → read_section**

```json
{"sectionId":"sec-9.4"}
```

- [seq 155](trajectory.jsonl#L155) **read_section result**

```json
{"sectionRef":"§ 9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-terminatio…
```

- [seq 156](trajectory.jsonl#L156) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 157](trajectory.jsonl#L157) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 175](trajectory.jsonl#L175) **drafter → read_section**

```json
{"sectionId":"sec-9.1"}
```

- [seq 176](trajectory.jsonl#L176) **read_section result**

```json
{"sectionRef":"§ 9.1 Either Party may terminate this Agreement or an affected Order Form for the other Party's material breach if the breach remains uncured thirty days after written notice describing it in reasonable detail. If a breach cannot reasonably be cured within thirty days, the cure period extends up to sixty additional days while the breaching Party diligently pursues cure.","paragraph…
```

- [seq 177](trajectory.jsonl#L177) **drafter → read_section**

```json
{"sectionId":"sec-9.3"}
```

- [seq 178](trajectory.jsonl#L178) **read_section result**

```json
{"sectionRef":"§ 9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.","paragraphs":[{"id":"p0038","text":"9.3 Customer may terminate an Order For…
```

- [seq 179](trajectory.jsonl#L179) **drafter → read_section**

```json
{"sectionId":"sec-9.5"}
```

- [seq 180](trajectory.jsonl#L180) **read_section result**

```json
{"sectionRef":"§ 9.5 Termination of one Order Form does not terminate another Order Form unless Customer states that the affected Services are operationally inseparable. A termination right is in addition to, and does not exclude, any other remedy available under this Agreement or Applicable Law.","paragraphs":[{"id":"p0040","text":"9.5 Termination of one Order Form does not terminate another Ord…
```

- [seq 181](trajectory.jsonl#L181) **drafter → read_section**

```json
{"sectionId":"sec-10.2"}
```

- [seq 182](trajectory.jsonl#L182) **read_section result**

```json
{"sectionRef":"§ 10.2 Vendor shall deliver all completed and in-process Deliverables for which Customer has paid or agrees to pay the applicable proportionate Fees. Vendor shall refund prepaid recurring Fees covering the period after termination, together with Fees paid for Services Customer cannot reasonably use because of Vendor's uncured breach.","paragraphs":[{"id":"p0043","text":"10.2 Vendor…
```

- [seq 195](trajectory.jsonl#L195) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 196](trajectory.jsonl#L196) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 6.2 If Customer rejects a Deliverable, Vendor shall promptly correct the nonconformities at no additional charge and resubmit it for a new acceptance period. After two unsuccessful correction cycles, Customer may terminate the affected Order Form and receive a refund of Fees paid for the rejected Deliverable and dependent Services Customer cannot reasonably…
```

- [seq 197](trajectory.jsonl#L197) **drafter → search**

```json
{"query":"early termination fee convenience","limit":20}
```

- [seq 198](trajectory.jsonl#L198) **search result**

```json
[]
```

- [seq 223](trajectory.jsonl#L223) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0039"],"quote":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-termination right during a committed term.","rationale":"Section 9.4 meets the preferred position on every material term: (i) Customer may terminate the Agreement or any Order Form for convenience, in whole or in part, on thirty days' prior written notice; (ii) Vendor must promptly refund prepaid Fees allocable to the post-termination period, with Customer owing Fees only for conforming Services rendered through the termination date; and (iii) Vendor is expressly denied any corresponding convenience-termination right during a committed term. No early-termination fee or penalty is imposed. A full sweep of the termination provisions (§§ 9.1-9.5, 10.1-10.2) and the balance of the document found no Vendor convenience right anywhere — the Vendor's only exit routes are mutual ones for material breach (§ 9.1) and insolvency (§ 9.2), and § 24.4 further bars Vendor from terminating on Customer's change of control. This is favourable to us and is not redlined.\n\nOne tension to note without flagging here: § 2.1 commits Customer to USD 2,000,000 per year for three years on a take-or-pay basis \"without reduction or termination rights,\" which economically undercuts the § 9.4 convenience right even though it does not remove it. That is a minimum-commitment problem rather than a termination-clause defect, and per the playbook's no-double-flagging principle it belongs under the MINCOMMIT rule, not T4C. The termination architecture itself sits at the preferred position.","confidence":0.92}
```

- [seq 224](trajectory.jsonl#L224) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 223](trajectory.jsonl#L223)
- Finding: `f-t4c-572bf3ca` · **compliant** · confidence 0.92
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenience-termination right during a committed term.”
- Rationale: Section 9.4 meets the preferred position on every material term: (i) Customer may terminate the Agreement or any Order Form for convenience, in whole or in part, on thirty days' prior written notice; (ii) Vendor must promptly refund prepaid Fees allocable to the post-termination period, with Customer owing Fees only for conforming Services rendered through the termination date; and (iii) Vendor is expressly denied any corresponding convenience-termination right during a committed term. No early-termination fee or penalty is imposed. A full sweep of the termination provisions (§§ 9.1-9.5, 10.1-10.2) and the balance of the document found no Vendor convenience right anywhere — the Vendor's only exit routes are mutual ones for material breach (§ 9.1) and insolvency (§ 9.2), and § 24.4 further bars Vendor from terminating on Customer's change of control. This is favourable to us and is not redlined.

One tension to note without flagging here: § 2.1 commits Customer to USD 2,000,000 per year for three years on a take-or-pay basis "without reduction or termination rights," which economically undercuts the § 9.4 convenience right even though it does not remove it. That is a minimum-commitment problem rather than a termination-clause defect, and per the playbook's no-double-flagging principle it belongs under the MINCOMMIT rule, not T4C. The termination architecture itself sits at the preferred position.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 173](trajectory.jsonl#L173)

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

- [seq 205](trajectory.jsonl#L205) **drafter → read_section**

```json
{"sectionId":"sec-8.1"}
```

- [seq 206](trajectory.jsonl#L206) **read_section result**

```json
{"sectionRef":"§ 8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Order Form expires or is terminated.","paragraphs":[{"id":"p0032","text":"8.1 This Agreement begins on…
```

- [seq 227](trajectory.jsonl#L227) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0033","p0034"],"quote":"8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.","rationale":"The renewal regime meets the preferred position in full. § 8.2 provides automatic twelve-month (not multi-year) renewal terms that Customer may exit on only thirty days' written notice, with a Vendor reminder due sixty days before renewal and an extension of Customer's opt-out deadline if the reminder is not sent — a mechanic that is more favourable to us than the playbook requires. § 8.3 caps renewal uplift at the lesser of CPI and three percent, matching the preferred cap, requires ninety days' notice of any increase, and protects prepaid periods. The three-year initial term in § 8.1 is a negotiated committed term, not an automatic multi-year renewal, so it does not trigger the walk-away test. No redline warranted.","confidence":0.93}
```

- [seq 228](trajectory.jsonl#L228) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 227](trajectory.jsonl#L227)
- Finding: `f-renewal-efa4e44f` · **compliant** · confidence 0.93
- Location: § 8.2 Each Order Form has the initial term stated in it and there…
- Quote: “8.2 Each Order Form has the initial term stated in it and thereafter renews for successive twelve-month periods unless Customer gives Vendor at least thirty days' written notice of non-renewal. Vendor shall remind Customer of an upcoming renewal at least sixty days beforehand. Failure to send the reminder extends Customer's opt-out deadline until thirty days after the reminder is received.”
- Rationale: The renewal regime meets the preferred position in full. § 8.2 provides automatic twelve-month (not multi-year) renewal terms that Customer may exit on only thirty days' written notice, with a Vendor reminder due sixty days before renewal and an extension of Customer's opt-out deadline if the reminder is not sent — a mechanic that is more favourable to us than the playbook requires. § 8.3 caps renewal uplift at the lesser of CPI and three percent, matching the preferred cap, requires ninety days' notice of any increase, and protects prepaid periods. The three-year initial term in § 8.1 is a negotiated committed term, not an automatic multi-year renewal, so it does not trigger the walk-away test. No redline warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 213](trajectory.jsonl#L213)

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

- [seq 245](trajectory.jsonl#L245) **drafter → read_section**

```json
{"sectionId":"sec-28.1"}
```

- [seq 246](trajectory.jsonl#L246) **read_section result**

```json
{"sectionRef":"§ 28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.","paragraphs":[{"id":"p0108","text":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New Yo…
```

- [seq 247](trajectory.jsonl#L247) **drafter → read_section**

```json
{"sectionId":"sec-28.2"}
```

- [seq 248](trajectory.jsonl#L248) **read_section result**

```json
{"sectionRef":"§ 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum. Nothing prevents a Party from seeking temporary injunctive relief in another court with jurisdiction to protect confidential information or intellectual proper…
```

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-28.3"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 28.3 Before filing an ordinary commercial claim, a Party shall give notice and permit executives with settlement authority to meet in good faith within fifteen business days. This process does not delay urgent relief or a filing needed to preserve a limitations period. Discussions are compromise negotiations to the extent allowed by law.","paragraphs":[{"id":"p0110","text":"28.3 …
```

- [seq 271](trajectory.jsonl#L271) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 272](trajectory.jsonl#L272) **search result**

```json
[]
```

- [seq 311](trajectory.jsonl#L311) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0108","p0109","p0110"],"quote":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.","rationale":"Section 28.1 selects New York law and Section 28.2 gives exclusive jurisdiction to the state and federal courts in New York County, which is exactly our preferred position. No arbitration provision appears anywhere in the document, so there is no foreign seat concern. The pre-suit executive escalation in Section 28.3 is mutual and expressly does not delay urgent relief or limitations-period filings, so it does not impair access to the agreed courts. The carve-out permitting temporary injunctive relief in another court is mutual and benefits both parties equally.","confidence":0.95}
```

- [seq 312](trajectory.jsonl#L312) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 311](trajectory.jsonl#L311)
- Finding: `f-govlaw-7f10df38` · **compliant** · confidence 0.95
- Location: § 28.1 This Agreement and each dispute arising from it are governe…
- Quote: “28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.”
- Rationale: Section 28.1 selects New York law and Section 28.2 gives exclusive jurisdiction to the state and federal courts in New York County, which is exactly our preferred position. No arbitration provision appears anywhere in the document, so there is no foreign seat concern. The pre-suit executive escalation in Section 28.3 is mutual and expressly does not delay urgent relief or limitations-period filings, so it does not impair access to the agreed courts. The carve-out permitting temporary injunctive relief in another court is mutual and benefits both parties equally.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 221](trajectory.jsonl#L221)

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

- [seq 235](trajectory.jsonl#L235) **drafter → read_section**

```json
{"sectionId":"sec-24.1"}
```

- [seq 236](trajectory.jsonl#L236) **read_section result**

```json
{"sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Customer shall give prompt written notice, and the assignee shall assume the applicable obligations.","paragraphs":[{"id":"p0092","text":…
```

- [seq 237](trajectory.jsonl#L237) **drafter → read_section**

```json
{"sectionId":"sec-24.2"}
```

- [seq 238](trajectory.jsonl#L238) **read_section result**

```json
{"sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and financial standing. Vendor may never assign to a direct Customer competitor without Customer's consent.","paragraphs":[{"id":"p0093","text":"24.2 Vendor …
```

- [seq 239](trajectory.jsonl#L239) **drafter → read_section**

```json
{"sectionId":"sec-24.3"}
```

- [seq 240](trajectory.jsonl#L240) **read_section result**

```json
{"sectionRef":"§ 24.3 For other assignments, neither Party may assign without the other's prior written consent, not to be unreasonably withheld, conditioned, or delayed. A permitted assignment does not relieve accrued obligations. An attempted assignment contrary to this Section is void to the extent permitted by law.","paragraphs":[{"id":"p0094","text":"24.3 For other assignments, neither Party…
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_section**

```json
{"sectionId":"sec-24.4"}
```

- [seq 242](trajectory.jsonl#L242) **read_section result**

```json
{"sectionRef":"§ 24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service. Vendor shall cooperate with reasonable administrative changes needed to reflect a permitted successor.","paragraphs":[{"id":"p0095","text":"24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees,…
```

- [seq 275](trajectory.jsonl#L275) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 276](trajectory.jsonl#L276) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0054","text":"13.3 Customer may transfer its l…
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[{"paragraphId":"p0091","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0093","sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and fina…
```

- [seq 315](trajectory.jsonl#L315) **drafter → search**

```json
{"query":"assign","limit":20}
```

- [seq 316](trajectory.jsonl#L316) **search result**

```json
[{"paragraphId":"p0037","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 354](trajectory.jsonl#L354) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0092","p0093","p0094","p0095"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets the preferred position in full: § 24.1 gives Customer a consent-free affiliate/successor (M&A) assignment right subject only to prompt notice; § 24.2 restricts Vendor assignment, delegation and transfer by change of control to Customer's prior written consent (not unreasonably withheld) and bars assignment to a direct Customer competitor; § 24.3 applies a reasonable-consent standard to other assignments; and § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on Customer's change of control. Section 13.3 mirrors this for licence transfers, and no other provision (including the § 9.2 insolvency right) creates a change-of-control exit or re-pricing trigger against us. No redline required.","confidence":0.95}
```

- [seq 355](trajectory.jsonl#L355) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 354](trajectory.jsonl#L354)
- Finding: `f-assign-77a5f935` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets the preferred position in full: § 24.1 gives Customer a consent-free affiliate/successor (M&A) assignment right subject only to prompt notice; § 24.2 restricts Vendor assignment, delegation and transfer by change of control to Customer's prior written consent (not unreasonably withheld) and bars assignment to a direct Customer competitor; § 24.3 applies a reasonable-consent standard to other assignments; and § 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on Customer's change of control. Section 13.3 mirrors this for licence transfers, and no other provision (including the § 9.2 insolvency right) creates a change-of-control exit or re-pricing trigger against us. No redline required.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 233](trajectory.jsonl#L233)

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

- [seq 261](trajectory.jsonl#L261) **drafter → read_section**

```json
{"sectionId":"sec-14.1"}
```

- [seq 262](trajectory.jsonl#L262) **read_section result**

```json
{"sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer.","paragraphs":[{"i…
```

- [seq 263](trajectory.jsonl#L263) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 264](trajectory.jsonl#L264) **read_section result**

```json
{"sectionRef":"§ 14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","paragraphs":[…
```

- [seq 265](trajectory.jsonl#L265) **drafter → read_section**

```json
{"sectionId":"sec-14.3"}
```

- [seq 266](trajectory.jsonl#L266) **read_section result**

```json
{"sectionRef":"§ 14.3 Vendor retains Vendor Technology. To the extent Vendor Technology is incorporated in or required to use a Deliverable, the perpetual licence in Section 13.2 applies. Vendor shall identify material Vendor Technology in a Deliverable before delivery and may not incorporate third-party material that materially restricts Customer's intended use without written approval.","paragr…
```

- [seq 267](trajectory.jsonl#L267) **drafter → read_section**

```json
{"sectionId":"sec-14.4"}
```

- [seq 268](trajectory.jsonl#L268) **read_section result**

```json
{"sectionRef":"§ 14.4 No jointly owned intellectual property is created unless the Parties sign a separate instrument identifying it and their exploitation rights. Feedback is voluntary; Vendor may use generalized suggestions without identifying Customer or disclosing Customer Confidential Information, and Customer retains the unrestricted right to use its own feedback.","paragraphs":[{"id":"p006…
```

- [seq 305](trajectory.jsonl#L305) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 306](trajectory.jsonl#L306) **read_section result**

```json
{"sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for Customer's business.","…
```

- [seq 307](trajectory.jsonl#L307) **drafter → read_section**

```json
{"sectionId":"sec-15.1"}
```

- [seq 308](trajectory.jsonl#L308) **read_section result**

```json
{"sectionRef":"§ 15.1 Vendor shall process Customer Data only on Customer's documented instructions, to provide the Services, and as permitted by this Agreement. Vendor shall not sell Customer Data, use it for advertising, combine it with another customer's identifiable data, or train a generally available model on it without Customer's express written consent.","paragraphs":[{"id":"p0062","text"…
```

- [seq 337](trajectory.jsonl#L337) **drafter → search**

```json
{"query":"assign","limit":20}
```

- [seq 338](trajectory.jsonl#L338) **search result**

```json
[{"paragraphId":"p0037","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 339](trajectory.jsonl#L339) **drafter → search**

```json
{"query":"aggregated","limit":10}
```

- [seq 340](trajectory.jsonl#L340) **search result**

```json
[]
```

- [seq 362](trajectory.jsonl#L362) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0057","p0058","p0059","p0060","p0053"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.","rationale":"The IP package meets our preferred position. §14.1 confirms Customer owns all Customer Data, Confidential Information and independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by §15.1's no-sale/no-model-training limits). §14.2 vests ownership of Deliverables in Customer with a present assignment from Vendor plus personnel assignments and further-assurances. §14.3 leaves Vendor only its pre-existing Vendor Technology, which is covered by the §13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, modify, create derivative works and have contractors support it for Customer's business. §14.4 excludes joint ownership absent a signed instrument and keeps feedback use anonymised while preserving Customer's unrestricted rights. No assignment of Customer IP or data to Vendor appears anywhere in the document. The only minor points — Deliverable ownership being conditioned on payment of Fees and the §13.2 licence not expressly saying \"sublicense\" (though it permits contractor support and derivative works) — are sub-elements short of ideal wording and are noted rather than redlined.","confidence":0.9}
```

- [seq 363](trajectory.jsonl#L363) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 362](trajectory.jsonl#L362)
- Finding: `f-ip-95ec5438` · **compliant** · confidence 0.90
- Location: § 14.1 As between the Parties, Customer owns all Customer Data, Cu…
- Quote: “14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel.”
- Rationale: The IP package meets our preferred position. §14.1 confirms Customer owns all Customer Data, Confidential Information and independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by §15.1's no-sale/no-model-training limits). §14.2 vests ownership of Deliverables in Customer with a present assignment from Vendor plus personnel assignments and further-assurances. §14.3 leaves Vendor only its pre-existing Vendor Technology, which is covered by the §13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, modify, create derivative works and have contractors support it for Customer's business. §14.4 excludes joint ownership absent a signed instrument and keeps feedback use anonymised while preserving Customer's unrestricted rights. No assignment of Customer IP or data to Vendor appears anywhere in the document. The only minor points — Deliverable ownership being conditioned on payment of Fees and the §13.2 licence not expressly saying "sublicense" (though it permits contractor support and derivative works) — are sub-elements short of ideal wording and are noted rather than redlined.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 256](trajectory.jsonl#L256)

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

- [seq 281](trajectory.jsonl#L281) **drafter → read_section**

```json
{"sectionId":"sec-13.1"}
```

- [seq 282](trajectory.jsonl#L282) **read_section result**

```json
{"sectionRef":"§ 13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","paragraphs":[{"id":"p0052","text":"13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors."}]}
```

- [seq 283](trajectory.jsonl#L283) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 284](trajectory.jsonl#L284) **read_section result**

```json
{"sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for Customer's business.","…
```

- [seq 285](trajectory.jsonl#L285) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 286](trajectory.jsonl#L286) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0054","text":"13.3 Customer may transfer its l…
```

- [seq 287](trajectory.jsonl#L287) **drafter → read_section**

```json
{"sectionId":"sec-13.4"}
```

- [seq 288](trajectory.jsonl#L288) **read_section result**

```json
{"sectionRef":"§ 13.4 Customer shall not knowingly reverse engineer hosted source code except to the extent a restriction is prohibited by Applicable Law, interfere with the Services, bypass documented security controls, or use the Services to violate Applicable Law. These restrictions do not limit testing authorized by the security exhibit or use of Customer Data and output.","paragraphs":[{"id"…
```

- [seq 325](trajectory.jsonl#L325) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Services licence grant excluding Affiliates/contractors and revocable at Vendor's discretion"}
```

- [seq 326](trajectory.jsonl#L326) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 327](trajectory.jsonl#L327) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 328](trajectory.jsonl#L328) **get_definition result**

```json
{"found":true,"term":"Affiliate","paragraphId":"p0003","text":"1.1 “Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more than fifty percent of the voting interests of an entity or the power to direct its management. An entity is an Affiliate only while that relati…
```

- [seq 366](trajectory.jsonl#L366) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend the Services licence to Affiliates and contractors and remove revocation at Vendor's discretion","comment":"[Playbook] We have extended the Services licence in 13.1 to our Affiliates and to contractors acting on our behalf, and removed revocation at Vendor's sole discretion so that revocation is governed by the uncured material breach standard already agreed in 13.3. Our playbook requires affiliate and contractor coverage and no at-will revocation; if helpful, we can instead cover Affiliates on written notice to Vendor.","ops":[{"kind":"replace","paragraphId":"p0052","oldText":"Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","newText":"Vendor grants Customer and its Affiliates, and contractors acting on Customer's behalf, a licence to use the Services, transferable as provided in Section 13.3 and revocable or suspendable only as provided in Section 13.3."}]}
```

- [seq 367](trajectory.jsonl#L367) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0052","segments":[{"type":"equal","text":"13.1 Vendor grants Customer "},{"type":"delete","text":"alone a non-transferable licence, revocable at Vendor's sole discretion, "},{"type":"insert","text":"and its Affiliates, and contractors acting on Customer's behalf, a licence "},{"type":"equal","text":"to use the Services"},{"type":"delete","text":…
```

- [seq 398](trajectory.jsonl#L398) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0052","p0053","p0054"],"quote":"13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","rationale":"The Services licence in 13.1 is granted to Customer alone, expressly excludes Affiliates and contractors, is non-transferable, and is revocable at Vendor's sole discretion — squarely in walk-away territory on affiliate/contractor exclusion. Sections 13.2 and 13.3 only partially cure it: 13.2's perpetual, irrevocable Affiliate- and contractor-enabled grant is limited to paid-up software and Vendor Technology embedded in Deliverables, not the subscription Services, and while 13.3 provides successor/Affiliate transfer and limits revocation to uncured material breach after notice (which meets the fallback on those two points), it gives no path for Affiliates or contractors to use the Services themselves. Redline extends the 13.1 grant to Affiliates and contractors acting on our behalf and ties revocation and transfer to 13.3.","confidence":0.83,"proposal":{"level":"preferred","summary":"Extend the Services licence to Affiliates and contractors and remove revocation at Vendor's discretion","comment":"[Playbook] We have extended the Services licence in 13.1 to our Affiliates and to contractors acting on our behalf, and removed revocation at Vendor's sole discretion so that revocation is governed by the uncured material breach standard already agreed in 13.3. Our playbook requires affiliate and contractor coverage and no at-will revocation; if helpful, we can instead cover Affiliates on written notice to Vendor.","ops":[{"kind":"replace","paragraphId":"p0052","oldText":"Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.","newText":"Vendor grants Customer and its Affiliates, and contractors acting on Customer's behalf, a licence to use the Services, transferable as provided in Section 13.3 and revocable or suspendable only as provided in Section 13.3."}]}}
```

- [seq 399](trajectory.jsonl#L399) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 398](trajectory.jsonl#L398)
- Finding: `f-license-8dd04f65` · **deviation** · confidence 0.83
- Location: § 13.1 Vendor grants Customer alone a non-transferable licence, re…
- Quote: “13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.”
- Rationale: The Services licence in 13.1 is granted to Customer alone, expressly excludes Affiliates and contractors, is non-transferable, and is revocable at Vendor's sole discretion — squarely in walk-away territory on affiliate/contractor exclusion. Sections 13.2 and 13.3 only partially cure it: 13.2's perpetual, irrevocable Affiliate- and contractor-enabled grant is limited to paid-up software and Vendor Technology embedded in Deliverables, not the subscription Services, and while 13.3 provides successor/Affiliate transfer and limits revocation to uncured material breach after notice (which meets the fallback on those two points), it gives no path for Affiliates or contractors to use the Services themselves. Redline extends the 13.1 grant to Affiliates and contractors acting on our behalf and ties revocation and transfer to 13.3.
- Proposal: **preferred** — Extend the Services licence to Affiliates and contractors and remove revocation at Vendor's discretion
- Comment: [Playbook] We have extended the Services licence in 13.1 to our Affiliates and to contractors acting on our behalf, and removed revocation at Vendor's sole discretion so that revocation is governed by the uncured material breach standard already agreed in 13.3. Our playbook requires affiliate and contractor coverage and no at-will revocation; if helpful, we can instead cover Affiliates on written notice to Vendor.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Vendor grants Customer and its Affiliates, and contractors acting on Customer's behalf, a licence to use the Services, transferable as provided in Section 13.3 and revocable or suspendable only as provided in Section 13.3.",
    "oldText": "Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.",
    "paragraphId": "p0052"
  }
]
```

### Verifier and repair feedback

- [seq 442](trajectory.jsonl#L442) **Verdict: fail** — official minimality gate: Operation 1 expands 20 words to 34 words (ratio 1.70 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.847 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Locked preferred level is fully satisfied: 13.1 as amended adds Affiliate and contractor coverage and removes at-will revocation; 13.2 supplies perpetual/irrevocable paid-up rights; 13.3 supplies successor transferability and an uncured-material-breach-only revocation standard. Minimality fails: the 13.1 rewrite grew 20 words to 34 (official ratio 1.70 > 1.50, changed-character ratio 0.847 > 0.600). The added cross-references duplicate protection already granted in 13.3 (transferability and the revocation standard), so they are unnecessary to complete the preferred level. Tighter alternative: replace only the offending words, e.g. "Vendor grants Customer, its Affiliates, and contractors acting on Customer's behalf a licence to use the Services," deleting "alone", "non-transferable", "revocable at Vendor's sole discretion" and "without Affiliates or contractors" without restating Section 13.3. Intent preserved: Section 13.3 exists and is untouched, no undefined terms or dangling mechanics are introduced, and unrelated commercial terms remain effective. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: affiliates covered by the licence","ok":true}; {"name":"official check: no at-will revocation remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 20 words to 34 words (ratio 1.70 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.847 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 443](trajectory.jsonl#L443) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 expands 20 words to 34 words (ratio 1.70 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.847 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- transferable as provided in Section 13.3 and revocable or suspendable only as provided in Section 13.3\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Locked preferred level is fully satisfied: 13.1 as amended adds Affiliate and contractor coverage and removes at-will revocation; 13.2 supplies perpetual/irrevocable paid-up rights; 13.3 supplies successor transferability and an uncured-material-breach-only revocation standard.\n- Minimality fails: the 13.1 rewrite grew 20 words to 34 (official ratio 1.70 > 1.50, changed-character ratio 0.847 > 0.600). The added cross-references duplicate protection already granted in 13.3 (transferability and the revocation standard), so they are unnecessary to complete the preferred level.\n- Tighter alternative: replace only the offending words, e.g. \"Vendor grants Customer, its Affiliates, and contractors acting on Customer's behalf a licence to use the Services,\" deleting \"alone\", \"non-transferable\", \"revocable at Vendor's sole discretion\" and \"without Affiliates or contractors\" without restating Section 13.3.\n- Intent preserved: Section 13.3 exists and is untouched, no undefined terms or dangling mechanics are introduced, and unrelated commercial terms remain effective."

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 259](trajectory.jsonl#L259)

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

- [seq 295](trajectory.jsonl#L295) **drafter → read_section**

```json
{"sectionId":"sec-22.1"}
```

- [seq 296](trajectory.jsonl#L296) **read_section result**

```json
{"sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","paragraphs":[{"id":"p0…
```

- [seq 297](trajectory.jsonl#L297) **drafter → read_section**

```json
{"sectionId":"sec-22.2"}
```

- [seq 298](trajectory.jsonl#L298) **read_section result**

```json
{"sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidential information.","parag…
```

- [seq 299](trajectory.jsonl#L299) **drafter → read_section**

```json
{"sectionId":"sec-22.3"}
```

- [seq 300](trajectory.jsonl#L300) **read_section result**

```json
{"sectionRef":"§ 22.3 Audit findings are Customer Confidential Information and may be used only to enforce this Agreement. Vendor shall provide a copy of the final report. Payment of a shortfall resolves the audited quantity issue absent fraud or demonstrable error.","paragraphs":[{"id":"p0089","text":"22.3 Audit findings are Customer Confidential Information and may be used only to enforce this …
```

- [seq 301](trajectory.jsonl#L301) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 302](trajectory.jsonl#L302) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0090","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 331](trajectory.jsonl#L331) **drafter → search**

```json
{"query":"audit","limit":30}
```

- [seq 332](trajectory.jsonl#L332) **search result**

```json
[{"paragraphId":"p0086","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0087","sectionRef":"§ 22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be cond…
```

- [seq 333](trajectory.jsonl#L333) **drafter → search**

```json
{"query":"inspect|verif|monitor|remote access|telemetry","regex":true,"limit":30}
```

- [seq 334](trajectory.jsonl#L334) **search result**

```json
[{"paragraphId":"p0005","sectionRef":"§ 1.3 “Customer Data” means all data, records, files, content, personal information, and other materials submitted to, stored in, transmitted through, or otherwise made available to the Services by or for Customer or its Authorized Users, together with output specifically derived from that material. Customer Data excludes anonymized operational telemetry that…
```

- [seq 358](trajectory.jsonl#L358) **drafter → search**

```json
{"query":"23.","limit":20}
```

- [seq 359](trajectory.jsonl#L359) **search result**

```json
[{"paragraphId":"p0090","sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","snippet":"23. RECORDS AND CUSTOMER ASSURANCE"}]
```

- [seq 391](trajectory.jsonl#L391) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0090","p0091","p0092","p0093","p0086"]}
```

- [seq 392](trajectory.jsonl#L392) **read_paragraphs result**

```json
[{"id":"p0090","sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","text":"23. RECORDS AND CUSTOMER ASSURANCE"},{"id":"p0091","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"id":"p0092","sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization,…
```

- [seq 420](trajectory.jsonl#L420) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0087","p0088","p0089"],"quote":"22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.","rationale":"Section 22 is the only audit/verification right binding us, and it meets the preferred position on every material term: frequency limited to once in any twelve-month period; at least thirty days' prior written notice; normal business hours with no unreasonable disruption; off-site where practicable via an independent auditor bound by confidentiality (§ 22.1); Vendor bears audit costs unless underpayment exceeds five percent, in which case we pay reasonable costs plus the undisputed shortfall (§ 22.2). The walk-away risk is expressly excluded — Vendor and its auditor may not access Customer systems directly, nor unrelated Customer Data, privileged material, or another supplier's confidential information. Section 22.3 adds customer-favourable protections (findings are our Confidential Information, use limited to enforcement, copy of the final report, and payment of a shortfall resolves the issue). No other inspection, verification, monitoring or remote-access right binding us appears elsewhere in the document. No redline needed.","confidence":0.93}
```

- [seq 421](trajectory.jsonl#L421) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 420](trajectory.jsonl#L420)
- Finding: `f-audit-a71ed49f` · **compliant** · confidence 0.93
- Location: § 22.1 Vendor may audit Customer's compliance with licence quantit…
- Quote: “22.1 Vendor may audit Customer's compliance with licence quantities no more than once in any twelve-month period, on at least thirty days' prior written notice, during normal business hours, and in a manner that does not unreasonably disrupt Customer. An audit will be conducted off-site where practicable by an independent auditor bound by confidentiality.”
- Rationale: Section 22 is the only audit/verification right binding us, and it meets the preferred position on every material term: frequency limited to once in any twelve-month period; at least thirty days' prior written notice; normal business hours with no unreasonable disruption; off-site where practicable via an independent auditor bound by confidentiality (§ 22.1); Vendor bears audit costs unless underpayment exceeds five percent, in which case we pay reasonable costs plus the undisputed shortfall (§ 22.2). The walk-away risk is expressly excluded — Vendor and its auditor may not access Customer systems directly, nor unrelated Customer Data, privileged material, or another supplier's confidential information. Section 22.3 adds customer-favourable protections (findings are our Confidential Information, use limited to enforcement, copy of the final report, and payment of a shortfall resolves the issue). No other inspection, verification, monitoring or remote-access right binding us appears elsewhere in the document. No redline needed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 293](trajectory.jsonl#L293)

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

- [seq 319](trajectory.jsonl#L319) **drafter → list_sections**

```json
{}
```

- [seq 320](trajectory.jsonl#L320) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 321](trajectory.jsonl#L321) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 322](trajectory.jsonl#L322) **search result**

```json
[]
```

- [seq 343](trajectory.jsonl#L343) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 344](trajectory.jsonl#L344) **search result**

```json
[{"paragraphId":"p0106","sectionRef":"§ 27.3 If a force-majeure event materially prevents an affected Service for more than fifteen consecutive days, Customer may procure substitute services and suspend affected Fees. After thirty consecutive days, Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.","snippet":"…thirty co…
```

- [seq 345](trajectory.jsonl#L345) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 346](trajectory.jsonl#L346) **search result**

```json
[]
```

- [seq 347](trajectory.jsonl#L347) **drafter → search**

```json
{"query":"remaining|accelerat|early termination|shortfall|minimum","regex":true}
```

- [seq 348](trajectory.jsonl#L348) **search result**

```json
[{"paragraphId":"p0026","sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","snippet":"…ge-based unit price. Vendor may not impose a platform…
```

- [seq 370](trajectory.jsonl#L370) **drafter → search**

```json
{"query":"interest"}
```

- [seq 371](trajectory.jsonl#L371) **search result**

```json
[{"paragraphId":"p0003","sectionRef":"§ 1.1 “Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more than fifty percent of the voting interests of an entity or the power to direct its management. An entity is an Affiliate only while that relationship continues.","sni…
```

- [seq 372](trajectory.jsonl#L372) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0009","p0040"]}
```

- [seq 373](trajectory.jsonl#L373) **read_paragraphs result**

```json
[{"id":"p0009","sectionRef":"§ 1.7 “Services” means the hosted software, implementation, configuration, support, maintenance, consulting, and related services described in an Order Form. Services include all corrections, updates, and generally released improvements Vendor provides without an additional licence fee to similarly situated customers purchasing the same service tier.","text":"1.7 “Ser…
```

- [seq 416](trajectory.jsonl#L416) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0039","p0012"]}
```

- [seq 417](trajectory.jsonl#L417) **read_paragraphs result**

```json
[{"id":"p0039","sectionRef":"§ 9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor. Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date. Vendor has no corresponding convenie…
```

- [seq 438](trajectory.jsonl#L438) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0039","p0028","p0106"],"quote":"Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date.","rationale":"No liquidated damages, penalty, or early-termination/minimum fee is payable by Customer anywhere in the Agreement, which meets the preferred position. Section 9.4 gives Customer convenience termination with payment limited to conforming Services rendered plus a refund of prepaid Fees; Section 27.3 confirms force-majeure termination is \"without penalty\"; and Section 7.3 bars interest on amounts ultimately found not due. The take-or-pay commitment in Section 2.1 is a minimum-commitment issue addressed under the MINCOMMIT rule rather than a liquidated-damages clause, so we do not flag it twice here.","confidence":0.86}
```

- [seq 439](trajectory.jsonl#L439) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 438](trajectory.jsonl#L438)
- Finding: `f-ld-9d16f9c1` · **compliant** · confidence 0.86
- Location: § 9.4 Customer may terminate this Agreement or any Order Form for…
- Quote: “Customer owes Fees only for conforming Services provided through the effective termination date, and Vendor shall promptly refund prepaid Fees allocable to the period after that date.”
- Rationale: No liquidated damages, penalty, or early-termination/minimum fee is payable by Customer anywhere in the Agreement, which meets the preferred position. Section 9.4 gives Customer convenience termination with payment limited to conforming Services rendered plus a refund of prepaid Fees; Section 27.3 confirms force-majeure termination is "without penalty"; and Section 7.3 bars interest on amounts ultimately found not due. The take-or-pay commitment in Section 2.1 is a minimum-commitment issue addressed under the MINCOMMIT rule rather than a liquidated-damages clause, so we do not flag it twice here.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 352](trajectory.jsonl#L352)

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

- [seq 376](trajectory.jsonl#L376) **drafter → read_section**

```json
{"sectionId":"sec-19.1"}
```

- [seq 377](trajectory.jsonl#L377) **read_section result**

```json
{"sectionRef":"§ 19.1 Vendor warrants that Services will be performed in a professional and workmanlike manner by qualified personnel, in accordance with industry standards, this Agreement, and each Order Form. Vendor further warrants that Services and Deliverables will materially conform to their documentation and agreed specifications.","paragraphs":[{"id":"p0075","text":"19.1 Vendor warrants t…
```

- [seq 378](trajectory.jsonl#L378) **drafter → read_section**

```json
{"sectionId":"sec-19.2"}
```

- [seq 379](trajectory.jsonl#L379) **read_section result**

```json
{"sectionRef":"§ 19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","paragraphs":[{"id":"p0076","text":"19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation."}]}
```

- [seq 380](trajectory.jsonl#L380) **drafter → read_section**

```json
{"sectionId":"sec-19.3"}
```

- [seq 381](trajectory.jsonl#L381) **read_section result**

```json
{"sectionRef":"§ 19.3 Vendor warrants the Services and Deliverables will not contain malicious code intentionally introduced by Vendor, and that Vendor will comply with Applicable Law. Vendor will not materially diminish functionality during a term or use open-source software in a way that requires disclosure or licensing of Customer source code.","paragraphs":[{"id":"p0077","text":"19.3 Vendor w…
```

- [seq 382](trajectory.jsonl#L382) **drafter → read_section**

```json
{"sectionId":"sec-19.4"}
```

- [seq 383](trajectory.jsonl#L383) **read_section result**

```json
{"sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","pa…
```

- [seq 384](trajectory.jsonl#L384) **drafter → read_section**

```json
{"sectionId":"sec-19.5"}
```

- [seq 385](trajectory.jsonl#L385) **read_section result**

```json
{"sectionRef":"§ 19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here.","paragraphs":[{"id":"p0079","text":"19.5 Except for the express warranties in this Agreement, neither Part…
```

- [seq 402](trajectory.jsonl#L402) **drafter → read_section**

```json
{"sectionId":"sec-6.1"}
```

- [seq 403](trajectory.jsonl#L403) **read_section result**

```json
{"sectionRef":"§ 6.1 Customer will have fifteen business days after delivery of a Deliverable to test it against the acceptance criteria in the applicable Order Form. Customer may accept it in writing or reject it by describing material nonconformities. Payment, productive use needed for testing, or silence does not constitute acceptance.","paragraphs":[{"id":"p0023","text":"6.1 Customer will hav…
```

- [seq 404](trajectory.jsonl#L404) **drafter → read_section**

```json
{"sectionId":"sec-6.2"}
```

- [seq 405](trajectory.jsonl#L405) **read_section result**

```json
{"sectionRef":"§ 6.2 If Customer rejects a Deliverable, Vendor shall promptly correct the nonconformities at no additional charge and resubmit it for a new acceptance period. After two unsuccessful correction cycles, Customer may terminate the affected Order Form and receive a refund of Fees paid for the rejected Deliverable and dependent Services Customer cannot reasonably use.","paragraphs":[{"…
```

- [seq 406](trajectory.jsonl#L406) **drafter → search**

```json
{"query":"warrant","limit":30}
```

- [seq 407](trajectory.jsonl#L407) **search result**

```json
[{"paragraphId":"p0074","sectionRef":"§ 19 WARRANTIES","snippet":"19. WARRANTIES"},{"paragraphId":"p0075","sectionRef":"§ 19.1 Vendor warrants that Services will be performed in a professional and workmanlike manner by qualified personnel, in accordance with industry standards, this Agreement, and each Order Form. Vendor further warrants that Services and Deliverables will materially conform to t…
```

- [seq 432](trajectory.jsonl#L432) **drafter → get_definition**

```json
{"term":"Deliverable"}
```

- [seq 433](trajectory.jsonl#L433) **get_definition result**

```json
{"found":true,"term":"Deliverable","paragraphId":"p0006","text":"1.4 “Deliverable” means each report, configuration, integration, specification, design, workflow, training material, and other work product that an Order Form identifies as being created specifically for Customer. Deliverables exclude Vendor Technology and generally applicable ideas, methods, skills, and know-how retained in the una…
```

- [seq 434](trajectory.jsonl#L434) **drafter → lookup_precedent**

```json
{"ruleId":"WARRANTY","context":"15-day deliverable conformity warranty with no obligation after; extend duration"}
```

- [seq 435](trajectory.jsonl#L435) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 461](trajectory.jsonl#L461) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Extend the Deliverable conformity warranty from 15 to 90 days and confine the cut-off to this Section","comment":"[Playbook] We have extended the Deliverable conformity warranty from fifteen to ninety days, which is our standard period for services deliverables, and confirmed the cut-off applies only to this warranty rather than to Section 19.3, the service levels or the indemnities. A fifteen-day window essentially expires with the acceptance-testing period in Section 6.1 and leaves us no remedy for defects that surface in normal use; we can discuss thirty days as a fallback if the longer period is difficult.","ops":[{"kind":"replace","paragraphId":"p0076","oldText":"For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","newText":"For ninety (90) days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation under this Section 19.2, without limiting any other warranty, service level, indemnity, or remedy in this Agreement."}]}
```

- [seq 462](trajectory.jsonl#L462) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0076","segments":[{"type":"equal","text":"19.2 For "},{"type":"delete","text":"fifteen "},{"type":"insert","text":"ninety (90) "},{"type":"equal","text":"days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation"},{"type":"delete","text":"."},{"type":"insert"…
```

- [seq 479](trajectory.jsonl#L479) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0076"],"quote":"19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","rationale":"The warranty package is otherwise good: § 19.1 gives professional/workmanlike performance plus material conformity to documentation and specifications, § 19.3 adds no-malicious-code and compliance with Applicable Law, § 19.4 supplies the full repair/re-perform/replace-then-refund remedy, and § 19.5 expressly prevents the disclaimer from swallowing the express warranties. The single material failure is duration. § 19.2 limits the Deliverable conformity warranty to fifteen days after delivery and then states Vendor \"has no correction or refund obligation,\" which cuts off the untimed § 19.1 conformity warranty and the § 19.4 remedy. Fifteen days is below the fallback of 30 days for services (Deliverables are defined in § 1.4 as custom work product, so the services benchmark applies) and it is effectively consumed by the fifteen-business-day acceptance test in § 6.1, leaving no warranty coverage for defects appearing in productive use. Redline extends the period to ninety (90) days, the preferred position for services deliverables, and confines the cut-off to this Section so it does not override § 19.3, the service levels or the indemnities. Thirty days remains available as a fallback.","confidence":0.83,"proposal":{"level":"preferred","summary":"Extend the Deliverable conformity warranty from 15 to 90 days and confine the cut-off to this Section","comment":"[Playbook] We have extended the Deliverable conformity warranty from fifteen to ninety days, which is our standard period for services deliverables, and confirmed the cut-off applies only to this warranty rather than to Section 19.3, the service levels or the indemnities. A fifteen-day window essentially expires with the acceptance-testing period in Section 6.1 and leaves us no remedy for defects that surface in normal use; we can discuss thirty days as a fallback if the longer period is difficult.","ops":[{"kind":"replace","paragraphId":"p0076","oldText":"For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.","newText":"For ninety (90) days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation under this Section 19.2, without limiting any other warranty, service level, indemnity, or remedy in this Agreement."}]}}
```

- [seq 480](trajectory.jsonl#L480) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 479](trajectory.jsonl#L479)
- Finding: `f-warranty-06b7d53f` · **deviation** · confidence 0.83
- Location: § 19.2 For fifteen days after delivery, each Deliverable will mate…
- Quote: “19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.”
- Rationale: The warranty package is otherwise good: § 19.1 gives professional/workmanlike performance plus material conformity to documentation and specifications, § 19.3 adds no-malicious-code and compliance with Applicable Law, § 19.4 supplies the full repair/re-perform/replace-then-refund remedy, and § 19.5 expressly prevents the disclaimer from swallowing the express warranties. The single material failure is duration. § 19.2 limits the Deliverable conformity warranty to fifteen days after delivery and then states Vendor "has no correction or refund obligation," which cuts off the untimed § 19.1 conformity warranty and the § 19.4 remedy. Fifteen days is below the fallback of 30 days for services (Deliverables are defined in § 1.4 as custom work product, so the services benchmark applies) and it is effectively consumed by the fifteen-business-day acceptance test in § 6.1, leaving no warranty coverage for defects appearing in productive use. Redline extends the period to ninety (90) days, the preferred position for services deliverables, and confines the cut-off to this Section so it does not override § 19.3, the service levels or the indemnities. Thirty days remains available as a fallback.
- Proposal: **preferred** — Set unqualified 90-day Deliverable conformance and add professional and workmanlike Services performance plus 12-month software and 90-day Services conformance warranties under Section 19.2
- Comment: [Playbook] We extended the Deliverable conformance window from fifteen to 90 days and removed the "materially" qualifier, and added our standard professional and workmanlike standard for the Services generally together with 12-month software and 90-day Services conformance periods under the same Section, so the existing repair, replacement, and refund remedy in Section 19.4 continues to apply. A fifteen-day window expires with acceptance testing and leaves us no remedy for defects appearing in productive use.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "For 90 days after delivery, each Deliverable will conform",
    "oldText": "For fifteen days after delivery, each Deliverable will materially conform",
    "paragraphId": "p0076"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0076",
    "text": "Vendor further warrants under this Section 19.2 that the Services generally will be performed in a professional and workmanlike manner, that software will conform to its documentation for 12 months after delivery, and that Services will conform to their documentation for 90 days after performance."
  }
]
```

### Verifier and repair feedback

- [seq 507](trajectory.jsonl#L507) **Verdict: fail** — official check: warranty period ≥ 90 days or expressed in months/years: failed precision position: preferred warranty includes professional Services: State professional Services expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes workmanlike Services: State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes software conformance to documentation: State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes repair remedy: State repair remedy expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes replacement remedy: State replacement remedy expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 12-month software period: State 12-month software period expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification. precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification. official minimality gate: Operation 1 expands 23 words to 41 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion Locked target is preferred, but the redline only lengthens the Deliverable conformance window; it adds none of the preferred elements — professional and workmanlike services, software conformance for 12 months, a 90-day services warranty, repair and replacement remedies, compliance with laws, or no malicious code. Conformance remains qualified as "materially conform", which the preferred position (documentation conformance) does not permit. Fallback also fails: no software-specific 90-day period, no 30-day services warranty, and no replacement remedy. Minimality fails: changing "fifteen" to "ninety (90)" sufficed, yet the operation rewrote the sentence and appended a non-limitation carve-out ("under this Section 19.2, without limiting any other warranty, service level, indemnity, or remedy in this Agreement"), expanding 23 words to 41 (ratio 1.78). Intent is preserved — the untouched cut-off mechanic and other sections remain effective and no undefined term is introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":false}; {"name":"precision position: preferred warranty includes professional Services","ok":false,"detail":"State professional Services expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":false,"detail":"State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":false,"detail":"State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":false,"detail":"State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes repair remedy","ok":false,"detail":"State repair remedy expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes replacement remedy","ok":false,"detail":"State replacement remedy expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":false,"detail":"State 12-month software period expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":false,"detail":"State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":false,"detail":"State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification."}; {"name":"precision position: warranty adds no re-performance remedy","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 23 words to 41 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion"}.
- [seq 508](trajectory.jsonl#L508) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Services performed in a professional manner\n Verdict: not_met. Evidence: Clause addresses only that \"each Deliverable will materially conform to its documentation\"; no services performance standard anywhere in the edit.\n- Services performed in a workmanlike manner\n Verdict: not_met. Evidence: No \"workmanlike\" standard appears: \"For ninety (90) days after delivery, each Deliverable will materially conform to its documentation\".\n- Software/deliverables conform to documentation (unqualified conformance)\n Verdict: not_met. Evidence: \"will materially conform to its documentation\" — conformance is qualified by \"materially\", short of the preferred conformance position.\n- 12-month warranty period for software\n Verdict: not_met. Evidence: \"For ninety (90) days after delivery\" — no 12-month software period stated.\n- 90-day warranty period for services, measured from performance/completion\n Verdict: not_met. Evidence: Period runs \"after delivery\" of a Deliverable; no services warranty or performance-based measurement.\n- Repair remedy\n Verdict: not_met. Evidence: \"Vendor has no correction or refund obligation\" after the period; no affirmative repair remedy is granted.\n- Replacement remedy\n Verdict: not_met. Evidence: No replacement remedy appears in the revised text.\n- Compliance with laws warranty\n Verdict: not_met. Evidence: No compliance-with-laws language in the clause as redlined.\n- No malicious code warranty\n Verdict: not_met. Evidence: No malicious code warranty in the clause as redlined.\n\nDeterministic official failures:\n- official check: warranty period ≥ 90 days or expressed in months/years: failed\n- precision position: preferred warranty includes professional Services: State professional Services expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes workmanlike Services: State workmanlike Services expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes professional and workmanlike coverage of the Services generally: State professional and workmanlike coverage of the Services generally expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes software conformance to documentation: State software conformance to documentation expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes repair remedy: State repair remedy expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes replacement remedy: State replacement remedy expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 12-month software period: State 12-month software period expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period: State 90-day Services period expressly and without replacing conformance with a materially-conforms qualification.\n- precision position: preferred warranty includes 90-day Services period measured from performance or completion: State 90-day Services period measured from performance or completion expressly and without replacing conformance with a materially-conforms qualification.\n- official minimality gate: Operation 1 expands 23 words to 41 words (ratio 1.78 > 1.50); use a tighter edit or a separate insertion\n\nOffending extra words to remove verbatim:\n- under this Section 19.2\n- without limiting any other warranty, service level, indemnity, or remedy in this Agreement\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Locked target is preferred, but the redline only lengthens the Deliverable conformance window; it adds none of the preferred elements — professional and workmanlike services, software conformance for 12 months, a 90-day services warranty, repair and replacement remedies, compliance with laws, or no malicious code.\n- Conformance remains qualified as \"materially conform\", which the preferred position (documentation conformance) does not permit.\n- Fallback also fails: no software-specific 90-day period, no 30-day services warranty, and no replacement remedy.\n- Minimality fails: changing \"fifteen\" to \"ninety (90)\" sufficed, yet the operation rewrote the sentence and appended a non-limitation carve-out (\"under this Section 19.2, without limiting any other warranty, service level, indemnity, or remedy in this Agreement\"), expanding 23 words to 41 (ratio 1.78).\n- Intent is preserved — the untouched cut-off mechanic and other sections remain effective and no undefined term is introduced."
- [seq 534](trajectory.jsonl#L534) **Verdict: fail** — All preferred atomic elements now appear in operative text: professional and workmanlike standard (19.1), 12-month software conformance and 90-day Services conformance (insertion), repair/replace/refund (19.4), Applicable Law compliance and no malicious code (19.3). Minimality fails: the insertion re-states the professional and workmanlike standard already granted verbatim in 19.1, duplicating protection where only the missing conformance periods needed to be added. Preserves intent fails: the insertion is expressly placed "under this Section 19.2", whose retained sunset ("after that date Vendor has no correction or refund obligation", now keyed to 90 days) contradicts the new 12-month software warranty and leaves the 12-month period without any correction or refund mechanic — a dangling/contradictory remedy carve-out. Suggested fix: leave 19.1 untouched, insert only the period language (software 12 months from delivery; Services 90 days from performance) and conform or delete the 19.2 sunset sentence so it does not cut off remedies before the longer periods expire. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: warranty period ≥ 90 days or expressed in months/years","ok":true}; {"name":"precision position: preferred warranty includes professional Services","ok":true}; {"name":"precision position: preferred warranty includes workmanlike Services","ok":true}; {"name":"precision position: preferred warranty includes professional and workmanlike coverage of the Services generally","ok":true}; {"name":"precision position: preferred warranty includes software conformance to documentation","ok":true}; {"name":"precision position: preferred warranty includes repair remedy","ok":true}; {"name":"precision position: preferred warranty includes replacement remedy","ok":true}; {"name":"precision position: preferred warranty includes refund remedy","ok":true}; {"name":"precision position: preferred warranty includes 12-month software period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period","ok":true}; {"name":"precision position: preferred warranty includes 90-day Services period measured from performance or completion","ok":true}; {"name":"precision position: warranty adds no re-performance remedy","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 389](trajectory.jsonl#L389)

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

- [seq 410](trajectory.jsonl#L410) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 411](trajectory.jsonl#L411) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0071","text":"18. INSURANCE"}]}
```

- [seq 412](trajectory.jsonl#L412) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 413](trajectory.jsonl#L413) **search result**

```json
[{"paragraphId":"p0071","sectionRef":"§ 18 INSURANCE","snippet":"18. INSURANCE"},{"paragraphId":"p0072","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000…
```

- [seq 455](trajectory.jsonl#L455) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0072","p0073"],"quote":"Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18 obliges Copperleaf (Vendor) to carry exactly the preferred coverages: CGL USD 1M per occurrence / USD 2M aggregate, workers' compensation as required by law, E&O USD 2M, and cyber/privacy USD 5M, maintained through the term plus one year, with certificates of insurance available on request (18.2). Section 18.2 also adds favourable extras for us — reputable insurers, primary coverage, notice of cancellation, and confirmation that insurance does not cap Vendor's liabilities. This is at or above the preferred position, so no redline is warranted.","confidence":0.95}
```

- [seq 456](trajectory.jsonl#L456) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 455](trajectory.jsonl#L455)
- Finding: `f-insurance-41b18954` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18 obliges Copperleaf (Vendor) to carry exactly the preferred coverages: CGL USD 1M per occurrence / USD 2M aggregate, workers' compensation as required by law, E&O USD 2M, and cyber/privacy USD 5M, maintained through the term plus one year, with certificates of insurance available on request (18.2). Section 18.2 also adds favourable extras for us — reputable insurers, primary coverage, notice of cancellation, and confirmation that insurance does not cap Vendor's liabilities. This is at or above the preferred position, so no redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 396](trajectory.jsonl#L396)

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

- [seq 426](trajectory.jsonl#L426) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 427](trajectory.jsonl#L427) **read_section result**

```json
{"sectionRef":"§ 2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","paragraphs":[{"id":"p0012","text":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights."}]}
```

- [seq 428](trajectory.jsonl#L428) **drafter → list_sections**

```json
{}
```

- [seq 429](trajectory.jsonl#L429) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 446](trajectory.jsonl#L446) **drafter → lookup_precedent**

```json
{"ruleId":"MINCOMMIT","context":"Sec 2.1 three-year USD 2m take-or-pay with no reduction or termination right; conflicts with Customer convenience termination (9.4) and no-minimum-volume acknowledgement (12.3)"}
```

- [seq 447](trajectory.jsonl#L447) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 448](trajectory.jsonl#L448) **drafter → search**

```json
{"query":"minimum","limit":15}
```

- [seq 449](trajectory.jsonl#L449) **search result**

```json
[{"paragraphId":"p0026","sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","snippet":"…ge-based unit price. Vendor may not impose a platform…
```

- [seq 465](trajectory.jsonl#L465) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Remove the three-year USD 2m take-or-pay minimum in Sec 2.1; Fees payable only for Services ordered and used.","comment":"[Playbook] We do not accept multi-year take-or-pay commitments, so we have replaced the three-year USD 2,000,000 minimum with payment for Services actually ordered and used - this also aligns Sec 2.1 with our termination-for-convenience right in Sec 9.4 and the no-minimum-volume acknowledgement in Sec 12.3. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a shortfall penalty.","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"Customer has no minimum purchase, take-or-pay, or volume commitment. Customer pays only for Services ordered under a signed Order Form and, where an Order Form provides usage-based pricing, actually used."}]}
```

- [seq 466](trajectory.jsonl#L466) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0012","segments":[{"type":"equal","text":"2.1 Customer "},{"type":"delete","text":"commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights"},{"type":"insert","text":"has no minimum purchase, take-or-pay, or volume commitment. Customer pays only for Ser…
```

- [seq 483](trajectory.jsonl#L483) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0012","p0049"],"quote":"2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","rationale":"Sec 2.1 imposes a three-year USD 2,000,000 per year take-or-pay commitment on us expressly \"without reduction or termination rights\" — squarely in the rule's walk-away territory (multi-year take-or-pay with no reduction or termination right) and well short of the fallback (single 12-month commitment, reducible on 30 days' notice, true-up not penalty). It also conflicts with our termination-for-convenience right in Sec 9.4, Sec 12.3's acknowledgement that Customer has made no minimum-volume commitment, and Sec 7.1's bar on undisclosed minimum-use charges. We propose the preferred position — no minimum commitment, payment for Services ordered/used — which is consistent with the rest of the bargain, with the 12-month reducible commitment plus true-up offered as a fallback.","confidence":0.95,"proposal":{"level":"preferred","summary":"Remove the three-year USD 2m take-or-pay minimum in Sec 2.1; Fees payable only for Services ordered and used.","comment":"[Playbook] We do not accept multi-year take-or-pay commitments, so we have replaced the three-year USD 2,000,000 minimum with payment for Services actually ordered and used - this also aligns Sec 2.1 with our termination-for-convenience right in Sec 9.4 and the no-minimum-volume acknowledgement in Sec 12.3. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a shortfall penalty.","ops":[{"kind":"replace","paragraphId":"p0012","oldText":"Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.","newText":"Customer has no minimum purchase, take-or-pay, or volume commitment. Customer pays only for Services ordered under a signed Order Form and, where an Order Form provides usage-based pricing, actually used."}]}}
```

- [seq 484](trajectory.jsonl#L484) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 483](trajectory.jsonl#L483)
- Finding: `f-mincommit-3ec59926` · **deviation** · confidence 0.95
- Location: § 2.1 Customer commits to purchase at least USD 2,000,000 of Serv…
- Quote: “2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.”
- Rationale: Sec 2.1 imposes a three-year USD 2,000,000 per year take-or-pay commitment on us expressly "without reduction or termination rights" — squarely in the rule's walk-away territory (multi-year take-or-pay with no reduction or termination right) and well short of the fallback (single 12-month commitment, reducible on 30 days' notice, true-up not penalty). It also conflicts with our termination-for-convenience right in Sec 9.4, Sec 12.3's acknowledgement that Customer has made no minimum-volume commitment, and Sec 7.1's bar on undisclosed minimum-use charges. We propose the preferred position — no minimum commitment, payment for Services ordered/used — which is consistent with the rest of the bargain, with the 12-month reducible commitment plus true-up offered as a fallback.
- Proposal: **preferred** — Sec 2.1 amended so Customer commits to no minimum amount and pays only for Services ordered or used.
- Comment: [Playbook] We do not accept take-or-pay minimums, so we have changed the USD 2,000,000 annual commitment to no minimum amount and payment only for Services ordered or used, consistent with Vendor's acknowledgement in Sec 12.3 that Customer has made no minimum-volume commitment. If a commitment is commercially necessary, we can discuss one limited to the current 12-month term, reducible on 30 days' notice, with a true-up rather than a penalty.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.1 Customer commits to purchase no minimum amount of Services in each of the next three years and pays only for Services ordered or used.",
    "oldText": "2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.",
    "paragraphId": "p0012"
  }
]
```

### Verifier and repair feedback

- [seq 503](trajectory.jsonl#L503) **Verdict: fail** — official minimality gate: Operation 1 changed-character ratio 1.010 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters The locked preferred level is fully achieved: the take-or-pay minimum is deleted and replaced with an express no-minimum statement plus payment for ordered/actually-used Services only, matching "No minimum commitment; fees are for usage or ordered services only." Fallback elements (12-month limit, 30-day reduction, true-up) are absent, but the fallback is a separate, lesser bargain and is correctly left to the margin comment rather than mixed into the operative text. The rewrite is confined to the single offending sentence in 2.1; because the entire operative obligation was the take-or-pay commitment, no operator, number, or short phrase could cure it, so the sentence-level replacement is the minimum necessary. The official ratio gate failure reflects sentence length, not surplus concessions or added rights. No free-standing reduction or termination rights, exceptions, or new defined terms were introduced; Sec 12.3 and the definitions of Order Form and Services remain intact and consistent with the new 2.1. Checks: {"name":"operation 1 applies","ok":true}; {"name":"precision position: preferred no-minimum cure adds no free-standing reduction or termination rights","ok":true}; {"name":"precision position: preferred no-minimum operation adds no reduction or termination right","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 1.010 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 504](trajectory.jsonl#L504) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 changed-character ratio 1.010 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nVerifier reasons:\n- The locked preferred level is fully achieved: the take-or-pay minimum is deleted and replaced with an express no-minimum statement plus payment for ordered/actually-used Services only, matching \"No minimum commitment; fees are for usage or ordered services only.\"\n- Fallback elements (12-month limit, 30-day reduction, true-up) are absent, but the fallback is a separate, lesser bargain and is correctly left to the margin comment rather than mixed into the operative text.\n- The rewrite is confined to the single offending sentence in 2.1; because the entire operative obligation was the take-or-pay commitment, no operator, number, or short phrase could cure it, so the sentence-level replacement is the minimum necessary. The official ratio gate failure reflects sentence length, not surplus concessions or added rights.\n- No free-standing reduction or termination rights, exceptions, or new defined terms were introduced; Sec 12.3 and the definitions of Order Form and Services remain intact and consistent with the new 2.1."
- [seq 525](trajectory.jsonl#L525) **Verdict: repaired** — The locked preferred level is fully met: the USD 2,000,000 take-or-pay minimum is replaced with an express no-minimum obligation and payment only for Services ordered or used. No free-standing reduction or termination right, true-up, or other fallback-only mechanic was imported, so the two bargains are not blended. Edit is confined to the single offending sentence in 2.1; the residual phrase "in each of the next three years" is inherited from the original and adds no obligation, so the change remains minimal. Section 12.3, including Vendor's acknowledgement of no minimum-volume commitment, is untouched and now reinforces rather than contradicts 2.1; no undefined terms or dangling mechanics are introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"precision position: preferred no-minimum cure adds no free-standing reduction or termination rights","ok":true}; {"name":"precision position: preferred no-minimum operation adds no reduction or termination right","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 453](trajectory.jsonl#L453)

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

- [seq 471](trajectory.jsonl#L471) **drafter → list_sections**

```json
{}
```

- [seq 472](trajectory.jsonl#L472) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 473](trajectory.jsonl#L473) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 474](trajectory.jsonl#L474) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0044","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"}]}
```

- [seq 487](trajectory.jsonl#L487) **drafter → read_section**

```json
{"sectionId":"sec-11.1"}
```

- [seq 488](trajectory.jsonl#L488) **read_section result**

```json
{"sectionRef":"§ 11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","paragraphs":[{"id":"p0045","text":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support."}]}
```

- [seq 489](trajectory.jsonl#L489) **drafter → read_section**

```json
{"sectionId":"sec-11.2"}
```

- [seq 490](trajectory.jsonl#L490) **read_section result**

```json
{"sectionRef":"§ 11.2 Within thirty days after Customer's request, Vendor shall return all Customer Data in a complete, commonly used, documented, machine-readable format, with relationships and metadata reasonably necessary for use. Vendor shall not withhold Customer Data because of a fee dispute.","paragraphs":[{"id":"p0046","text":"11.2 Within thirty days after Customer's request, Vendor shall…
```

- [seq 491](trajectory.jsonl#L491) **drafter → read_section**

```json
{"sectionId":"sec-11.3"}
```

- [seq 492](trajectory.jsonl#L492) **read_section result**

```json
{"sectionRef":"§ 11.3 After Customer confirms successful return, Vendor shall securely delete remaining Customer Data from active systems and, as backups cycle, from backups, except for a copy required by Applicable Law. An authorized officer shall certify deletion in writing. Any retained copy remains protected and may not be used for another purpose.","paragraphs":[{"id":"p0047","text":"11.3 Af…
```

- [seq 499](trajectory.jsonl#L499) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Sec 11.1 requires immediate cessation of assistance and deletion of Customer Data with no export; conflicts with 11.2/11.3"}
```

- [seq 500](trajectory.jsonl#L500) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 511](trajectory.jsonl#L511) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0045","oldText":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","newText":"11.1 Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates, including migration support and export of Customer Data. Vendor shall not delete or render inaccessible any Customer Data except in accordance with Sections 11.2 and 11.3."}],"comment":"[Playbook] We cannot accept immediate cessation of assistance and deletion of Customer Data with no export, which is a walk-away position for us and also contradicts Sections 11.2 and 11.3. We have replaced it with our standard exit provision: up to six months of transition assistance at your then-current rates, with deletion occurring only under the Section 11.2/11.3 return-and-certification mechanics (we can discuss a 90-day assistance period if six months is difficult).","level":"preferred","summary":"Replace immediate-deletion/no-assistance clause with 6-month transition assistance and preserve the 11.2/11.3 data-return and certified-deletion sequence."}
```

- [seq 512](trajectory.jsonl#L512) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0045","segments":[{"type":"equal","text":"11.1 "},{"type":"delete","text":"Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support."},{"type":"insert","text":"Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall,…
```

- [seq 517](trajectory.jsonl#L517) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0045","p0046","p0047"],"quote":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","rationale":"Section 11.1 sits squarely in walk-away territory: it mandates immediate cessation of all assistance and permanent deletion of Customer Data with no export or migration support, so the Agreement provides no transition-assistance period at all (Section 10.1 only assumes \"any agreed transition period\" without obliging Vendor to grant one). Sections 11.2 and 11.3 do supply compliant 30-day return and certified-deletion mechanics, but 11.1 directly contradicts them and, as the first-stated rule for the moment of termination, creates a material internal conflict Vendor could exploit to delete data before any return request. The clause therefore fails even the fallback (90 days of assistance plus 30-day export). The minimal fix replaces 11.1 with the preferred six-month transition-assistance obligation at Vendor's then-current rates and subordinates any deletion to the existing 11.2/11.3 sequence, leaving those compliant paragraphs untouched.","confidence":0.86,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0045","oldText":"11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.","newText":"11.1 Upon expiry or termination of this Agreement or any Order Form for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six (6) months at Vendor's then-current rates, including migration support and export of Customer Data. Vendor shall not delete or render inaccessible any Customer Data except in accordance with Sections 11.2 and 11.3."}],"comment":"[Playbook] We cannot accept immediate cessation of assistance and deletion of Customer Data with no export, which is a walk-away position for us and also contradicts Sections 11.2 and 11.3. We have replaced it with our standard exit provision: up to six months of transition assistance at your then-current rates, with deletion occurring only under the Section 11.2/11.3 return-and-certification mechanics (we can discuss a 90-day assistance period if six months is difficult).","level":"preferred","summary":"Replace immediate-deletion/no-assistance clause with 6-month transition assistance and preserve the 11.2/11.3 data-return and certified-deletion sequence."}}
```

- [seq 518](trajectory.jsonl#L518) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 517](trajectory.jsonl#L517)
- Finding: `f-transition-3e7ce3f7` · **deviation** · confidence 0.86
- Location: § 11.1 Immediately on termination Vendor shall discontinue all ass…
- Quote: “11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.”
- Rationale: Section 11.1 sits squarely in walk-away territory: it mandates immediate cessation of all assistance and permanent deletion of Customer Data with no export or migration support, so the Agreement provides no transition-assistance period at all (Section 10.1 only assumes "any agreed transition period" without obliging Vendor to grant one). Sections 11.2 and 11.3 do supply compliant 30-day return and certified-deletion mechanics, but 11.1 directly contradicts them and, as the first-stated rule for the moment of termination, creates a material internal conflict Vendor could exploit to delete data before any return request. The clause therefore fails even the fallback (90 days of assistance plus 30-day export). The minimal fix replaces 11.1 with the preferred six-month transition-assistance obligation at Vendor's then-current rates and subordinates any deletion to the existing 11.2/11.3 sequence, leaving those compliant paragraphs untouched.
- Proposal: **preferred** — Flip 11.1 to 6 months' transition assistance at then-current rates with no deletion before export, and run 11.2's 30-day standard machine-readable return from expiry or termination.
- Comment: [Playbook] We cannot accept immediate cessation of assistance and permanent deletion of Customer Data, so 11.1 is flipped to transition assistance for up to 6 months at then-current rates with no deletion before an export. In 11.2 we anchor the 30-day return to expiry or termination (rather than a later request) and to a standard machine-readable format, leaving 11.3's deletion and officer certification intact; a 90-day assistance period is our fallback if 6 months is difficult.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "11.1 On expiry or termination Vendor shall continue transition assistance for up to 6 months at then-current rates and not permanently delete Customer Data without offering an export or migration support.",
    "oldText": "11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.",
    "paragraphId": "p0045"
  },
  {
    "kind": "replace",
    "newText": "11.2 Within 30 days after expiry or termination, Vendor shall return all Customer Data in a complete, commonly used, documented, standard machine-readable format",
    "oldText": "11.2 Within thirty days after Customer's request, Vendor shall return all Customer Data in a complete, commonly used, documented, machine-readable format",
    "paragraphId": "p0046"
  }
]
```

### Verifier and repair feedback

- [seq 530](trajectory.jsonl#L530) **Verdict: fail** — precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation. precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation. precision position: transition duties do not newly trigger on termination of an individual Order Form: Trigger the new data-return, deletion, and transition duties on expiry or termination of the Agreement only; an individual Order Form trigger could disrupt continuing Services. official minimality gate: Operation 1 expands 21 words to 60 words (ratio 2.86 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.823 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters The locked preferred level is incomplete: the 30-day return obligation in 11.2 was left running from "Customer's request" rather than from expiry or termination, so the mandatory post-termination return remains swallowed by a request condition. A one-phrase edit to 11.2 (e.g. "Within thirty days after expiry or termination, or earlier on Customer's request") would have closed this. The machine-readable format, deletion and officer certification elements are satisfied by the untouched 11.2/11.3 mechanics, and the 6-month, then-current-rate assistance is expressly stated. Minimality fails: the replacement expands 21 words to 60 (ratio 2.86) with a wholesale paragraph rewrite plus added descriptors ("reasonable", "including migration support and export of Customer Data") and a duplicative no-deletion cross-reference that repeats protection already given by 11.2 and 11.3. Intent is not fully preserved: extending the trigger to "any Order Form" makes transition, deletion and return duties fire on termination of a single Order Form, which can disrupt Services continuing under other Order Forms; the trigger should be limited to the Agreement. Fallback is also not cleanly met on the export deadline for the same request-condition reason, so the clause cannot be defended as sitting at the fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: data return/transition present","ok":true}; {"name":"precision position: preferred transition includes then-current rates","ok":true}; {"name":"precision position: preferred transition includes standard machine-readable format","ok":false,"detail":"State standard machine-readable format expressly in the transition obligation."}; {"name":"precision position: preferred transition includes 30-day return after expiry or termination","ok":false,"detail":"State 30-day return after expiry or termination expressly in the transition obligation."}; {"name":"precision position: preferred transition includes deletion after return","ok":true}; {"name":"precision position: preferred transition includes certification of deletion","ok":true}; {"name":"precision position: preferred transition return deadline runs from expiry or termination, not a later request","ok":true}; {"name":"precision position: transition duties do not newly trigger on termination of an individual Order Form","ok":false,"detail":"Trigger the new data-return, deletion, and transition duties on expiry or termination of the Agreement only; an individual Order Form trigger could disrupt continuing Services."}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 21 words to 60 words (ratio 2.86 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.823 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 531](trajectory.jsonl#L531) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Return within 30 days of expiry or termination (not a later Customer request)\n Verdict: not_met. Evidence: 11.2 (untouched) \"Within thirty days after Customer's request, Vendor shall return all Customer Data\" — the 30-day clock still runs from a request, not from expiry or termination\n\nDeterministic official failures:\n- precision position: preferred transition includes standard machine-readable format: State standard machine-readable format expressly in the transition obligation.\n- precision position: preferred transition includes 30-day return after expiry or termination: State 30-day return after expiry or termination expressly in the transition obligation.\n- precision position: transition duties do not newly trigger on termination of an individual Order Form: Trigger the new data-return, deletion, and transition duties on expiry or termination of the Agreement only; an individual Order Form trigger could disrupt continuing Services.\n- official minimality gate: Operation 1 expands 21 words to 60 words (ratio 2.86 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.823 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- or any Order Form\n- reasonable\n- including migration support and export of Customer Data\n- Vendor shall not delete or render inaccessible any Customer Data except in accordance with Sections 11.2 and 11.3.\n- for any reason\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nIntent failed: restore the exact unrelated language and eliminate the named contradiction or dangling mechanic.\n\nVerifier reasons:\n- The locked preferred level is incomplete: the 30-day return obligation in 11.2 was left running from \"Customer's request\" rather than from expiry or termination, so the mandatory post-termination return remains swallowed by a request condition. A one-phrase edit to 11.2 (e.g. \"Within thirty days after expiry or termination, or earlier on Customer's request\") would have closed this.\n- The machine-readable format, deletion and officer certification elements are satisfied by the untouched 11.2/11.3 mechanics, and the 6-month, then-current-rate assistance is expressly stated.\n- Minimality fails: the replacement expands 21 words to 60 (ratio 2.86) with a wholesale paragraph rewrite plus added descriptors (\"reasonable\", \"including migration support and export of Customer Data\") and a duplicative no-deletion cross-reference that repeats protection already given by 11.2 and 11.3.\n- Intent is not fully preserved: extending the trigger to \"any Order Form\" makes transition, deletion and return duties fire on termination of a single Order Form, which can disrupt Services continuing under other Order Forms; the trigger should be limited to the Agreement.\n- Fallback is also not cleanly met on the export deadline for the same request-condition reason, so the clause cannot be defended as sitting at the fallback."
- [seq 539](trajectory.jsonl#L539) **Verdict: repaired** — All four preferred atomic duties are express in operative text: 6-month assistance window, then-current rates, 30-day return in a standard machine-readable format anchored to expiry or termination, and deletion followed by officer certification. The former request-condition was removed so the 30-day return obligation is mandatory rather than triggered by a Customer request; 11.3's deletion-and-certification sequence remains untouched. Edits are confined to two sentences (flipping 11.1's discontinuation/deletion and re-anchoring 11.2's deadline and format word); no new exceptions, undefined terms, or dangling mechanics are introduced, and the fee-dispute non-withholding and retained-copy protections survive. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: data return/transition present","ok":true}; {"name":"precision position: preferred transition includes then-current rates","ok":true}; {"name":"precision position: preferred transition includes standard machine-readable format","ok":true}; {"name":"precision position: preferred transition includes 30-day return after expiry or termination","ok":true}; {"name":"precision position: preferred transition includes deletion after return","ok":true}; {"name":"precision position: preferred transition includes certification of deletion","ok":true}; {"name":"precision position: preferred transition return deadline runs from expiry or termination, not a later request","ok":true}; {"name":"precision position: transition duties do not newly trigger on termination of an individual Order Form","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 544](trajectory.jsonl#L544) memo LLM request
- [seq 545](trajectory.jsonl#L545) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement (Copperleaf / Vendor)

**Prepared by:** In-house counsel (Customer side) 
**Subject:** Playbook review of the Master Services Agreement — 19 rules assessed

---

## 1. Executive summary

We reviewed the Master Services Agreement against 19 playbook rules. **Eleven clauses are compliant** — several materially better than our preferred position — and **eight are deviations**, seven of which sit in walk-away territory.

The good news is that the structural bargain is sound. Customer owns all Customer Data, Confidential Information and Deliverables, with a present assignment from Vendor and a perpetual, irrevocable, royalty-free licence to residual Vendor Technology (§§ 13.2, 14.1–14.4, 15.1). We have a consent-free affiliate and successor assignment right, and Vendor is barred from assigning, transferring on change of control, or repricing on our change of control (§§ 24.1–24.4). We hold an unconditional convenience-termination right with a refund of prepaid Fees and no penalty (§ 9.4), automatic renewal is limited to twelve-month terms exitable on thirty days' notice with a capped uplift (§§ 8.2–8.3), audit rights against us are tightly bounded with no system access (§§ 22.1–22.3), governing law and venue are New York with no arbitration (§§ 28.1–28.3), and Vendor's insurance programme meets our preferred limits (§§ 18.1–18.2). No liquidated damages, MFN, or non-solicit burden us.

The deviations are concentrated in a small number of clauses that, taken together, would transfer nearly all commercial risk to us. The liability cap is one month of Fees actually paid "without exception," which overrides the Excluded Claims regime (§ 21.1). There is **no Vendor indemnity at all** — only a one-way, unlimited Customer indemnity (§ 20.1), and § 9.3 cross-references a non-existent § 20.5. Section 11.1 requires immediate deletion of Customer Data with no export or migration support, contradicting the otherwise-compliant return mechanics in §§ 11.2–11.3. We are locked into a three-year, USD 2,000,000 per year take-or-pay commitment "without reduction or termination rights" (§ 2.1), sole-source exclusivity for hosted analytics (§ 2.2), and a worldwide, 24-month post-term non-compete (§ 12.4) — each of which flatly contradicts § 12.3, in which Vendor acknowledges we have made no exclusivity, non-compete, most-favoured-customer, minimum-volume or no-hire commitment. The Services licence excludes Affiliates and contractors and is revocable at Vendor's discretion (§ 13.1), and the Deliverable warranty runs only fifteen days — a period effectively consumed by the fifteen-business-day acceptance test in § 6.1 (§ 19.2).

Several of these internal contradictions (§ 12.3 versus §§ 2.1, 2.2 and 12.4; § 11.1 versus §§ 11.2–11.3; § 9.3's dangling cross-reference) suggest drafting error rather than negotiated intent, which should make them straightforward to resolve.

---

## 2. Findings

| # | Severity | Rule | Status | Section | Note |
|---|---|---|---|---|---|
| 1 | Critical | IP — Ownership of deliverables and Customer Data | Compliant | § 14.1 (with §§ 13.2, 14.2–14.4, 15.1) | Preferred position. Payment condition on Deliverable ownership and absence of express "sublicense" noted only. |
| 2 | High | ASSIGN — Assignment and change of control | Compliant | § 24.1 (with §§ 24.2–24.4, 13.3) | Preferred position in full. |
| 3 | High | LD — Liquidated damages payable by Customer | Compliant | § 9.4 (with §§ 7.3, 27.3) | No LDs or early-termination fee. Take-or-pay handled under MINCOMMIT. |
| 4 | High | T4C — Termination for convenience | Compliant | § 9.4 | Preferred position; no Vendor convenience right. Economic tension with § 2.1 noted under MINCOMMIT. |
| 5 | Medium | AUDIT — Audit rights against Customer | Compliant | § 22.1 (with §§ 22.2–22.3) | Preferred position; no system or third-party data access. |
| 6 | Medium | GOVLAW — Governing law and venue | Compliant | § 28.1 (with §§ 28.2–28.3) | Preferred position; no arbitration. |
| 7 | Medium | **LOL-CAP — Limitation of liability** | **Deviation** | § 21.1 | One month of Fees paid, "without exception," overriding § 21.3 Excluded Claims. **Walk-away.** Redline drafted; verification failed — needs manual drafting. |
| 8 | Medium | MFN — Most-favoured-nation burdening Customer | Compliant | § 12.3 (with §§ 7.1, 8.3) | No MFN/MFC obligation on us. |
| 9 | Medium | NOSOLICIT — Non-solicitation binding Customer | Compliant | § 12.3 | No no-hire or non-solicit binds us. |
| 10 | Medium | RENEWAL — Auto-renewal and notice window | Compliant | § 8.2 (with §§ 8.1, 8.3) | Preferred position; reminder mechanic exceeds requirement. |
| 11 | Medium | **TRANSITION — Transition assistance and data return** | **Deviation** | § 11.1 (conflicting with §§ 11.2–11.3) | Immediate deletion, no export or migration support. **Walk-away.** Redline drafted and verified. |
| 12 | Medium | **WARRANTY — Performance warranty and duration** | **Deviation** | § 19.2 | Fifteen-day Deliverable warranty consumed by § 6.1 acceptance testing; below 30-day fallback. Redline drafted; verification failed — needs manual drafting. |
| 13 | Low | **EXCLUSIVITY — Exclusivity binding Customer** | **Deviation** | § 2.2 (conflicting with § 12.3) | Sole and exclusive provider for full term, no performance exit. **Walk-away.** Redline drafted and verified. |
| 14 | Low | **INDEMN — Indemnification by Vendor** | **Deviation** | § 20.1 (and § 9.3 cross-reference) | No Vendor indemnity; one-way unlimited Customer indemnity. **Walk-away.** Redline drafted and verified. |
| 15 | Low | INSURANCE — Vendor insurance | Compliant | § 18.1 (with § 18.2) | At or above preferred limits. |
| 16 | Low | **LICENSE — Licence grant scope** | **Deviation** | § 13.1 (partially cured by §§ 13.2–13.3) | Affiliates and contractors excluded; revocable at Vendor's discretion. **Walk-away.** Redline drafted; verification failed — needs manual drafting. |
| 17 | Low | **MINCOMMIT — Minimum purchase commitments** | **Deviation** | § 2.1 (conflicting with §§ 7.1, 9.4, 12.3) | Three-year USD 2M/year take-or-pay, no reduction or termination. **Walk-away.** Redline drafted and verified. |
| 18 | Low | **NONCOMPETE — Non-compete on Customer** | **Deviation** | § 12.4 (conflicting with § 12.3) | 24 months post-term, any territory, undefined scope, no carve-outs. **Walk-away.** Redline drafted and verified. |

---

## 3. Walk-away items

The following seven positions are identified in our playbook as walk-away and should be treated as conditions to signature rather than negotiable trade-offs:

1. **§ 21.1 — Liability cap of one month of Fees actually paid, "without exception."** The cap is below the six-month walk-away floor, and the "without exception" language pulls indemnification, confidentiality, data-protection and security, gross negligence, wilful misconduct, fraud and IP infringement inside it with no super-cap. Our ask: the greater of Fees paid or payable in the preceding 12 months or USD 1,000,000, with Excluded Claims carved out and our payment obligations confirmed not to be damages.
2. **§ 20 — No Vendor indemnity.** Neither the preferred nor the fallback position is met. Our ask: a Vendor IP, breach-of-law, data-breach and wilful-misconduct indemnity for Customer and its Affiliates, with a notice/control/cooperation procedure and procure/modify/replace/refund remedies (restoring the § 9.3 reference to § 20.5), and Customer's indemnity narrowed to Customer-provided content and our breach of Applicable Law.
3. **§ 11.1 — Immediate cessation of assistance and permanent deletion of Customer Data.** Fails even the fallback (90 days' assistance plus 30-day export) and contradicts §§ 11.2–11.3. Our ask: six months' transition assistance at then-current rates, no deletion before export, with the § 11.2 30-day machine-readable return running from expiry or termination.
4. **§ 2.1 — Three-year, USD 2,000,000 per year take-or-pay with no reduction or termination right.** Our ask: no minimum commitment; payment for Services ordered or used. Fallback: a single 12-month commitment, reducible on 30 days' notice, with a true-up rather than a penalty.
5. **§ 2.2 — Sole and exclusive provider of hosted analytics for the full term.** Our ask: non-exclusive appointment. Fallback: 12 months, terminable on SLA failure.
6. **§ 12.4 — Worldwide 24-month post-term non-compete capturing acquisitions.** Our ask: deletion. Fallback: a single named product, term only, with internal-development and acquisition carve-outs.
7. **§ 13.1 — Services licence excluding Affiliates and contractors and revocable at Vendor's sole discretion.** Our ask: extend the grant to Affiliates and contractors acting on our behalf, and tie revocation and transfer to § 13.3 (uncured material breach after notice).

---

## 4. Next steps

1. **Issue the redline.** Five proposals (§§ 2.1, 2.2, 11.1, 12.4, 20) are drafted and verified and can go out as-is. Four require attention before circulation: the § 21.1, § 19.2 and § 13.1 redlines failed verification and need manual drafting, and the § 19.2 proposal as currently drafted reaches beyond the identified defect — it should be tightened to extend the Deliverable conformance period to 90 days (30 days as fallback) and confine the cut-off to that Section so it does not override § 19.3, the service levels or the indemnities.
2. **Lead with the internal contradictions.** Sections 2.1, 2.2 and 12.4 are each expressly disclaimed by § 12.3, and § 11.1 contradicts §§ 11.2–11.3. Framing these as conforming edits rather than commercial asks should shorten the negotiation.
3. **Fix the § 9.3 cross-reference to § 20.5**, which currently points to remedies that do not exist; this resolves automatically if the Vendor indemnity is inserted.
4. **Escalate the walk-away items as a package.** The liability cap and the absent Vendor indemnity compound one another and should be conceded together or not at all; we recommend flagging both to the business owner as conditions to signature before the next Vendor call.
5. **Confirm no further trade requests.** Do not reopen the compliant clauses in §§ 8, 9.4, 13.2–13.3, 14, 18, 22, 24 or 28 — several are materially better than our preferred position and are the strongest part of this bargain.
6. **Request certificates of insurance** under § 18.2 as part of onboarding.

*This memo reflects only the findings supplied and the sections cited in them; no other provisions have been assessed.*
```

## Apply and validation

No apply or output-validation event was recorded.
