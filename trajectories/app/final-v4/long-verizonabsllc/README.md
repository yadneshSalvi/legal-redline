# Trajectory: long-verizonabsllc

| Run | Value |
|---|---|
| Contract | long-verizonabsllc — FORM OF TRANSFER AND SERVICING AGREEMENT |
| Config | final-v4 |
| Parties | Verizon Owner Trust 2020-A, together with Verizon ABS LLC (our party) ↔ Cellco Partnership d/b/a Verizon Wireless |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 1m 0.2s (60,195 ms) |
| Calls | 219 LLM · 312 tool · 4 retries |
| Tokens | 69,398 input · 204,008 output · 3,944,186 cache read · 425,402 cache write |
| Cost | $10.078045 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 90 | 16 | 28 | — | [seq 2](trajectory.jsonl#L2)–[seq 91](trajectory.jsonl#L91) |
| drafters | 954 | 191 | 284 | 18 submitted finding(s) | [seq 92](trajectory.jsonl#L92)–[seq 1092](trajectory.jsonl#L1092) |
| verifier | 33 | 11 | 0 | 11 verdict(s) | [seq 356](trajectory.jsonl#L356)–[seq 1095](trajectory.jsonl#L1095) |
| assembler | 21 | 0 | 0 | — | [seq 343](trajectory.jsonl#L343)–[seq 1103](trajectory.jsonl#L1103) |
| memo | 4 | 1 | 0 | — | [seq 1099](trajectory.jsonl#L1099)–[seq 1102](trajectory.jsonl#L1102) |
| human | 0 | 0 | 0 | 0 decision(s) | — |
| apply | 0 | 0 | 0 | not applied | — |

## LOL-CAP — Limitation of liability — cap, mutuality and carve-outs

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 92](trajectory.jsonl#L92)

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
{"ruleId":"LOL-CAP","candidateSectionIds":["sec-ix","sec-vi","sec-p0441"],"candidateParagraphIds":["p0380","p0381","p0382","p0284","p0286","p0454","p0469"],"likelyAbsent":false,"note":"Section 9.7 Limitation of Liability (p0380-p0382) plus Section 6.2 Liability of Servicer and Marketing Agent (p0284, p0286) are the primary locations; note also the arbitral panel's bar on punitive/consequential damages (p0469) and the Indenture Trustee cost carve-out (p0454). Check for any monetary cap, mutuality of exculpation, and gross negligence/wilful misconduct carve-outs."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 99](trajectory.jsonl#L99) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0380","p0381","p0382","p0284","p0286","p0454","p0469"]}
```

- [seq 100](trajectory.jsonl#L100) **read_paragraphs result**

```json
[{"id":"p0380","sectionRef":"§ IX OTHER AGREEMENTS","text":"Section 9.7 Limitation of Liability."},{"id":"p0381","sectionRef":"§ IX OTHER AGREEMENTS","text":"(a) Owner Trustee. This Agreement has been signed on behalf of the Issuer by Wilmington Trust, National Association not in its individual capacity but solely in its capacity as Owner Trustee of the Issuer. In no event will Wilmington Trust, …
```

- [seq 101](trajectory.jsonl#L101) **drafter → search**

```json
{"query":"limitation of liability aggregate liability"}
```

- [seq 102](trajectory.jsonl#L102) **search result**

```json
[]
```

- [seq 141](trajectory.jsonl#L141) **drafter → search**

```json
{"query":"willful misconduct gross negligence liability"}
```

- [seq 142](trajectory.jsonl#L142) **search result**

```json
[]
```

- [seq 143](trajectory.jsonl#L143) **drafter → search**

```json
{"query":"indemnify indemnification"}
```

- [seq 144](trajectory.jsonl#L144) **search result**

```json
[]
```

- [seq 171](trajectory.jsonl#L171) **drafter → search**

```json
{"query":"liability"}
```

- [seq 172](trajectory.jsonl#L172) **search result**

```json
[{"paragraphId":"p0015","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"…OSITOR 23 Section 5.1 Depositor's Representations and Warranties 23 Section 5.2 Liability of Depositor 24 Section 5.3 Merger, Consolidation, Succession or Assignment 25 …"},{"paragraphId":"p0016","sectionRef":"§ 2.6 Originators' Reacquisition or Ser…
```

- [seq 173](trajectory.jsonl#L173) **drafter → list_sections**

```json
{}
```

- [seq 174](trajectory.jsonl#L174) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 207](trajectory.jsonl#L207) **drafter → read_section**

```json
{"sectionId":"\"sec-vi\"","cursor":0,"limit":40}
```

- [seq 208](trajectory.jsonl#L208) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-vi\""}
```

- [seq 209](trajectory.jsonl#L209) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0242","p0243","p0244","p0245","p0283","p0285","p0287","p0288","p0289","p0290"]}
```

- [seq 210](trajectory.jsonl#L210) **read_paragraphs result**

```json
[{"id":"p0242","sectionRef":"§ V DEPOSITOR","text":"Section 5.2 Liability of Depositor."},{"id":"p0243","sectionRef":"§ V DEPOSITOR","text":"(a) Liability for Specific Obligations. The Depositor will be liable under this Agreement only for its specific obligations under this Agreement. All other liability is expressly waived and released as a condition of, and consideration for, the execution of …
```

- [seq 241](trajectory.jsonl#L241) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0291","p0292","p0293","p0294","p0295","p0296","p0297","p0298","p0299","p0300"]}
```

- [seq 242](trajectory.jsonl#L242) **read_paragraphs result**

```json
[{"id":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(i) The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capacity as Note Paying Agent), and their officers, directors, employees and agents (each, an \"Indemnified Person\") for all fees, expenses, losses, claims, actions, suits, damages and liabilities (including reasonable l…
```

- [seq 275](trajectory.jsonl#L275) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":30}
```

- [seq 276](trajectory.jsonl#L276) **read_section result**

```json
{"sectionRef":"§ IX OTHER AGREEMENTS","cursor":0,"totalParagraphs":26,"nextCursor":null,"paragraphs":[{"id":"p0364","text":"ARTICLE IX OTHER AGREEMENTS"},{"id":"p0365","text":"Section 9.1 Financing Statements."},{"id":"p0366","text":"(a) Filing of Financing Statements. The Depositor will file financing and continuation statements, and amendments to the statements, in the jurisdictions and with th…
```

- [seq 277](trajectory.jsonl#L277) **drafter → search**

```json
{"query":"consequential punitive damages"}
```

- [seq 278](trajectory.jsonl#L278) **search result**

```json
[]
```

- [seq 311](trajectory.jsonl#L311) **drafter → search**

```json
{"query":"consequential"}
```

- [seq 312](trajectory.jsonl#L312) **search result**

```json
[{"paragraphId":"p0469","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","snippet":"…ny way. The arbitral panel will not have the power to award punitive damages or consequential damages in any arbitration conducted by them. In its final determination, the a…"}]
```

- [seq 313](trajectory.jsonl#L313) **drafter → search**

```json
{"query":"exceed"}
```

- [seq 314](trajectory.jsonl#L314) **search result**

```json
[{"paragraphId":"p0201","sectionRef":"§ IV ACCOUNTS, COLLECTIONS AND APPLICATION OF FUNDS","snippet":"Payment Date, exceeds the amounts deposited under Section 4.3(b) for the Collection Period, Cellco w…"},{"paragraphId":"p0201","sectionRef":"§ IV ACCOUNTS, COLLECTIONS AND APPLICATION OF FUNDS","snippet":"…ment Date, the amounts deposited under Section 4.3(b) for the Collection Period exceed the …
```

- [seq 350](trajectory.jsonl#L350) **drafter → search**

```json
{"query":"waived and released"}
```

- [seq 351](trajectory.jsonl#L351) **search result**

```json
[{"paragraphId":"p0243","sectionRef":"§ V DEPOSITOR","snippet":"…its specific obligations under this Agreement. All other liability is expressly waived and released as a condition of, and consideration for, the execution of this Agreement by th…"},{"paragraphId":"p0283","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…its specific obligations under this Agreement. All other liability …
```

- [seq 352](trajectory.jsonl#L352) **drafter → search**

```json
{"query":"confidential"}
```

- [seq 353](trajectory.jsonl#L353) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…ss operations. Any access or review will be subject to the Servicer's security, confidentiality and privacy policies and any regulatory, legal and data protection policies.…"},{"paragraphId":"p0146","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…ons. Any access or review will be subject to the Custodian's…
```

- [seq 381](trajectory.jsonl#L381) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0283","p0243","p0291","p0292","p0378","p0469"],"quote":"Each of the Servicer and the Marketing Agent, severally and not jointly, will be liable under this Agreement only for its specific obligations under this Agreement. All other liability is expressly waived and released as a condition of, and consideration for, the execution of this Agreement by the Servicer or the Marketing Agent, as applicable. Each of the Servicer and the Marketing Agent, severally and not jointly, will be liable only for its own willful misconduct, bad faith or gross negligence in performing its obligations under this Agreement.","rationale":"The liability architecture sits at or above the fallback on its material terms and is not adverse to us. (1) Mutuality: Section 6.2(a) (p0283) limits Cellco as Servicer/Marketing Agent to its specific obligations and to its own willful misconduct, bad faith or gross negligence, and Section 5.2(a) (p0243) applies word-for-word the same limitation to the Depositor — the exculpation is symmetric in structure. (2) No monetary cap: there is no aggregate liability cap, no fee-based ceiling and no \"shall not exceed\" formula anywhere in the document (Section 9.7 is only a trustee capacity carve-out; Section 9.6 is limited recourse). The absence of a cap means the counterparty's exposure — including its Section 6.3 indemnities (p0291–p0292) for willful misconduct, bad faith and gross negligence in favour of the Issuer and the trustees — is uncapped, so the fallback carve-outs for indemnification, gross negligence and wilful misconduct are satisfied a fortiori. Inserting a mutual 12-months-of-fees cap would newly cap Cellco's uncapped indemnity and exculpate it above a Servicing Fee-based ceiling; that would weaken our position, so we do not redline it. (3) Our own exposure is additionally protected, not exposed: Section 9.6 (p0378) confines any claim against the Depositor or the Issuer to the Depositor Transferred Property only — a one-sided de facto limit in our favour, with no equivalent limit for Cellco. Walk-away triggers are absent: our liability is not uncapped while Cellco's is capped, there is no sub-6-month cap, and indemnities are not inside any cap. Noted short of preferred, but not flagged: there is no free-standing mutual exclusion of indirect/consequential damages (the bar on punitive and consequential damages at p0469 binds only the arbitral panel in dispute resolution proceedings), no USD 1,000,000 floor, no express confidentiality/data-protection or IP-infringement super-carve-outs, and no statement that payment obligations are outside the cap. Each of these is a preferred-only refinement that has no adverse effect while no cap exists.","confidence":0.72}
```

- [seq 382](trajectory.jsonl#L382) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 381](trajectory.jsonl#L381)
- Finding: `f-lol-cap-bf0febde` · **compliant** · confidence 0.72
- Location: § VI SERVICER AND MARKETING AGENT
- Quote: “Each of the Servicer and the Marketing Agent, severally and not jointly, will be liable under this Agreement only for its specific obligations under this Agreement. All other liability is expressly waived and released as a condition of, and consideration for, the execution of this Agreement by the Servicer or the Marketing Agent, as applicable. Each of the Servicer and the Marketing Agent, severally and not jointly, will be liable only for its own willful misconduct, bad faith or gross negligence in performing its obligations under this Agreement.”
- Rationale: The liability architecture sits at or above the fallback on its material terms and is not adverse to us. (1) Mutuality: Section 6.2(a) (p0283) limits Cellco as Servicer/Marketing Agent to its specific obligations and to its own willful misconduct, bad faith or gross negligence, and Section 5.2(a) (p0243) applies word-for-word the same limitation to the Depositor — the exculpation is symmetric in structure. (2) No monetary cap: there is no aggregate liability cap, no fee-based ceiling and no "shall not exceed" formula anywhere in the document (Section 9.7 is only a trustee capacity carve-out; Section 9.6 is limited recourse). The absence of a cap means the counterparty's exposure — including its Section 6.3 indemnities (p0291–p0292) for willful misconduct, bad faith and gross negligence in favour of the Issuer and the trustees — is uncapped, so the fallback carve-outs for indemnification, gross negligence and wilful misconduct are satisfied a fortiori. Inserting a mutual 12-months-of-fees cap would newly cap Cellco's uncapped indemnity and exculpate it above a Servicing Fee-based ceiling; that would weaken our position, so we do not redline it. (3) Our own exposure is additionally protected, not exposed: Section 9.6 (p0378) confines any claim against the Depositor or the Issuer to the Depositor Transferred Property only — a one-sided de facto limit in our favour, with no equivalent limit for Cellco. Walk-away triggers are absent: our liability is not uncapped while Cellco's is capped, there is no sub-6-month cap, and indemnities are not inside any cap. Noted short of preferred, but not flagged: there is no free-standing mutual exclusion of indirect/consequential damages (the bar on punitive and consequential damages at p0469 binds only the arbitral panel in dispute resolution proceedings), no USD 1,000,000 floor, no express confidentiality/data-protection or IP-infringement super-carve-outs, and no statement that payment obligations are outside the cap. Each of these is a preferred-only refinement that has no adverse effect while no cap exists.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## INDEMN — Indemnification by Vendor

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 93](trajectory.jsonl#L93)

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
{"ruleId":"INDEMN","candidateSectionIds":["sec-vi","sec-ix"],"candidateParagraphIds":["p0288","p0290","p0291","p0292","p0293","p0372"],"likelyAbsent":false,"note":"Section 6.3 Indemnities of Servicer and the Marketing Agent (p0288-p0293) runs in our favour; Depositor's defence of title in Section 9.2 (p0372) is separate and narrow. Confirm scope, the notice/control-of-Proceeding mechanics at p0293 and survival at p0298. Do not flag provisions benefiting us."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 111](trajectory.jsonl#L111) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0288","p0290","p0291","p0292","p0293","p0372"]}
```

- [seq 112](trajectory.jsonl#L112) **read_paragraphs result**

```json
[{"id":"p0288","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"Section 6.3 Indemnities of Servicer and the Marketing Agent."},{"id":"p0290","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(a) Indemnification."},{"id":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(i) The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including …
```

- [seq 113](trajectory.jsonl#L113) **drafter → search**

```json
{"query":"indemnify hold harmless"}
```

- [seq 114](trajectory.jsonl#L114) **search result**

```json
[]
```

- [seq 147](trajectory.jsonl#L147) **drafter → search**

```json
{"query":"indemnif","limit":50}
```

- [seq 148](trajectory.jsonl#L148) **search result**

```json
[{"paragraphId":"p0290","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"(a) Indemnification."},{"paragraphId":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"(i) The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capa…"},{"paragraphId":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…e Paying Ag…
```

- [seq 149](trajectory.jsonl#L149) **drafter → search**

```json
{"query":"infringe intellectual property"}
```

- [seq 150](trajectory.jsonl#L150) **search result**

```json
[]
```

- [seq 183](trajectory.jsonl#L183) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0286","p0287","p0289","p0294","p0295","p0296","p0297","p0298","p0299","p0300","p0301"]}
```

- [seq 184](trajectory.jsonl#L184) **read_paragraphs result**

```json
[{"id":"p0286","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(d) Force Majeure. Neither the Servicer nor the Marketing Agent will be responsible or liable for any failure or delay in performing its obligations under this Agreement caused by, directly or indirectly, forces beyond its control, including strikes, work stoppages, acts of war, terrorism, civil or military disturbances, fire…
```

- [seq 185](trajectory.jsonl#L185) **drafter → search**

```json
{"query":"limitation of liability"}
```

- [seq 186](trajectory.jsonl#L186) **search result**

```json
[{"paragraphId":"p0020","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"…ation 40 Section 9.5 No Petition 40 Section 9.6 Limited Recourse 40 Section 9.7 Limitation of Liability 41 Section 9.8 Tax Treatment of Notes 41 Section 9.9 Regulation RR Risk Retenti…"},{"paragraphId":"p0380","sectionRef":"§ IX OTHER AGREEMENTS","s…
```

- [seq 219](trajectory.jsonl#L219) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0280","p0281","p0282","p0283","p0284","p0285","p0380","p0381","p0382","p0383"]}
```

- [seq 220](trajectory.jsonl#L220) **read_paragraphs result**

```json
[{"id":"p0280","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"28"},{"id":"p0281","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(viii) No Violation. The execution and delivery of this Agreement by the Marketing Agent, the performance by the Marketing Agent of the transactions contemplated by this Agreement or any other Transaction Document to which it is a party and the fulfil…
```

- [seq 251](trajectory.jsonl#L251) **drafter → search**

```json
{"query":"intellectual property license software trademark"}
```

- [seq 252](trajectory.jsonl#L252) **search result**

```json
[]
```

- [seq 253](trajectory.jsonl#L253) **drafter → search**

```json
{"query":"Servicing Fee","limit":10}
```

- [seq 254](trajectory.jsonl#L254) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…mounts payable as principal of or interest on the Notes, all amounts payable as Servicing Fees under this Agreement and all other amounts payable by the Issuer under the Tra…"},{"paragraphId":"p0120","sectionRef":"§ III SERVICING OF RECEIVABLES","snipp…
```

- [seq 287](trajectory.jsonl#L287) **drafter → search**

```json
{"query":"cooperate"}
```

- [seq 288](trajectory.jsonl#L288) **search result**

```json
[{"paragraphId":"p0157","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"… the original device payment plan agreement that is a Receivable, and (2) shall cooperate with any Successor Servicer to properly bill and credit such Obligor's account …"},{"paragraphId":"p0343","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ooperation on Termination. On i…
```

- [seq 289](trajectory.jsonl#L289) **drafter → get_definition**

```json
{"term":"Proceeding"}
```

- [seq 290](trajectory.jsonl#L290) **get_definition result**

```json
{"found":true,"term":"Proceeding","paragraphId":"p0901","text":"\"Proceeding\" means a suit in equity, action at law or other judicial or administrative proceeding, or governmental investigation."}
```

- [seq 323](trajectory.jsonl#L323) **drafter → submit_finding**

```json
{"status":"needs_review","paragraphIds":["p0288","p0290","p0291","p0292","p0293","p0294","p0298","p0372"],"quote":"The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capacity as Note Paying Agent), and their officers, directors, employees and agents (each, an \"Indemnified Person\") for all fees, expenses, losses, claims, actions, suits, damages and liabilities (including reasonable legal fees and expenses) resulting from the Servicer's (including in its capacity as Custodian) willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents","rationale":"Section 6.3 (p0288-p0299) is a counterparty-side indemnity that runs in our favour: Cellco as Servicer and as Marketing Agent indemnifies the Issuer, Owner Trustee and Indenture Trustee (and their officers, directors, employees and agents) for wilful misconduct, bad faith or gross negligence, uncapped, with claim-notice that is not forfeited absent prejudice (p0293), Servicer-funded defence including separate counsel on conflict (p0294), and survival of termination (p0298). That covers the misconduct, notice and control-of-defence elements of the preferred position. It does not, however, contain an IP-infringement indemnity, a breach-of-law or data-breach limb, or an express duty to defend, so on a literal reading it fails the fallback. We are escalating rather than redlining because (i) this is a receivables transfer and servicing agreement with no services, deliverables, software or IP licence anywhere in the document (searches for intellectual property, licence, software and trademark return nothing), so an IP-infringement/procure-modify-replace-refund construct is inapposite; and (ii) the two remaining fallback/preferred elements would each cut against us - the fallback's 3x annual fees super-cap would newly cap an indemnity that is presently uncapped, and the preferred \"Customer indemnity limited to Customer-provided content and Customer's breach of law\" element would introduce an Issuer/Depositor indemnity where the Agreement currently imposes none. The only genuinely value-adding gaps are an express duty to defend and a data-breach limb covering Obligor data the Servicer/Custodian handles; we recommend a business decision on whether to pursue those before any operative change. Depositor's defence of title in Section 9.2 (p0372) is a separate, narrow title covenant and is not responsive to this rule.","confidence":0.62,"elementCoverage":{"level":"preferred","mappings":[{"element":"Vendor has an express duty to defend Customer and its affiliates.","status":"unaddressed","explanation":"Section 6.3(b) gives the Servicer/Marketing Agent an option ('may participate in and assume the defense'), not a duty to defend; defence costs are reimbursed under 6.3(a). Adding a hard defence duty is a live ask but we have not drafted it pending the business decision described in the rationale."},{"element":"Vendor indemnifies Customer and its affiliates against third-party claims.","status":"already_met","quote":"The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee"},{"element":"Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.","status":"unaddressed","explanation":"The Agreement involves no services, deliverables, software or IP licence (no hits for intellectual property, licence, software or trademark), so an IP-infringement limb has no subject matter here; we have not inserted one without instructions."},{"element":"Vendor indemnity covers Vendor's breach of applicable law.","status":"unaddressed","explanation":"Section 6.3 is limited to wilful misconduct, bad faith and gross negligence; a breach-of-Law limb is absent. Section 6.1 contains only a no-violation-of-Law representation qualified by Material Adverse Effect (p0281), which is not an indemnity."},{"element":"Vendor indemnity covers a data breach caused by Vendor.","status":"unaddressed","explanation":"No unauthorised-access/disclosure limb exists, although Cellco as Servicer and Custodian handles Obligor account and Receivable File data. Flagged for a business decision rather than unilaterally drafted."},{"element":"Vendor indemnity covers Vendor's gross negligence and wilful misconduct.","status":"already_met","quote":"willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents"},{"element":"The indemnification procedure requires notice of a claim.","status":"already_met","quote":"promptly notify the Servicer or the Marketing Agent, as applicable, of the Proceeding"},{"element":"The indemnification procedure allocates control of the defence.","status":"already_met","quote":"The Servicer or the Marketing Agent, as applicable, may participate in and assume the defense and settlement of a Proceeding at its expense."},{"element":"The indemnification procedure requires reasonable cooperation.","status":"unaddressed","explanation":"Section 6.3 imposes no cooperation covenant on the Indemnified Person. Its absence is neutral-to-favourable to us, so we have not volunteered one."},{"element":"Customer indemnity is limited to Customer-provided content and Customer's breach of law.","status":"unaddressed","explanation":"The Agreement contains no Issuer or Depositor indemnity in Cellco's favour at all, so the element is satisfied in substance but there is no verbatim text to cite; drafting any Customer-side indemnity would weaken our position."}]}}
```

- [seq 324](trajectory.jsonl#L324) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 410](trajectory.jsonl#L410) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 411](trajectory.jsonl#L411) **get_definition result**

```json
{"found":true,"term":"Affiliate","paragraphId":"p0579","text":"\"Affiliate\" means, for a specified Person (other than a natural Person), (a) another Person controlling, controlled by or under common control with the specified Person, (b) any other Person beneficially owning or controlling more than fifty percent (50%) of the outstanding voting securities or rights of or interest in the capital, …
```

- [seq 412](trajectory.jsonl#L412) **drafter → get_definition**

```json
{"term":"Law"}
```

- [seq 413](trajectory.jsonl#L413) **get_definition result**

```json
{"found":true,"term":"Law","paragraphId":"p0787","text":"\"Law\" means any law (including common law), constitution, statute, treaty, regulation, rule, ordinance, executive order, order, court order, injunction, writ, decree, directive, judgment, injunction, award or similar item of or by a Governmental Authority or any interpretation, implementation or application thereof."}
```

- [seq 446](trajectory.jsonl#L446) **drafter → get_definition**

```json
{"term":"Receivable File"}
```

- [seq 447](trajectory.jsonl#L447) **get_definition result**

```json
{"found":true,"term":"Receivable File","paragraphId":"p0909","text":"\"Receivable File\" has the meaning stated in Section 3.10(b) of the Transfer and Servicing Agreement."}
```

- [seq 448](trajectory.jsonl#L448) **drafter → get_definition**

```json
{"term":"Obligor"}
```

- [seq 449](trajectory.jsonl#L449) **get_definition result**

```json
{"found":true,"term":"Obligor","paragraphId":"p0837","text":"\"Obligor\" means the Person that has signed the account agreement of which the device payment plan agreement that constitutes the Receivable is a part and who owes payments under the Receivable."}
```

- [seq 482](trajectory.jsonl#L482) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Make Cellco's Section 6.3 indemnity a defence obligation running to the Issuer's Affiliates and add limbs for violation of Law, data breach and IP infringement, plus a cooperation sentence.","comment":"[Playbook] We have made Cellco's Section 6.3 indemnity an express duty to defend, extended the Indemnified Persons to the Issuer's Affiliates, and added limbs for violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files, and third-party intellectual property infringement claims, with a reasonable-cooperation sentence in the Proceedings mechanics. The existing notice, defence-control and settlement provisions and the uncapped nature of the indemnity are unchanged; we have not added any Issuer or Depositor indemnity.","ops":[{"kind":"replace","paragraphId":"p0291","oldText":"The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee","newText":"The Servicer will defend and indemnify the Issuer and its Affiliates, the Owner Trustee and the Indenture Trustee"},{"kind":"replace","paragraphId":"p0292","oldText":"The Marketing Agent will indemnify the Indemnified Persons","newText":"The Marketing Agent will defend and indemnify the Indemnified Persons"},{"kind":"insert_after","paragraphId":"p0292","numbering":"(iii)","text":"Each of the Servicer and the Marketing Agent will also defend and indemnify the Indemnified Persons for such amounts resulting from (A) its violation of applicable Law, (B) any unauthorized access to or disclosure of Obligor data or Receivable Files caused by it (including the Servicer in its capacity as Custodian) or (C) any claim that any services or deliverables it provides under the Transaction Documents infringe or misappropriate any intellectual property right."},{"kind":"insert_after","paragraphId":"p0294","text":"The Indemnified Person will provide reasonable cooperation in the defense of the Proceeding."}]}
```

- [seq 483](trajectory.jsonl#L483) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0291","segments":[{"type":"equal","text":"(i) The Servicer will "},{"type":"insert","text":"defend and "},{"type":"equal","text":"indemnify the Issuer"},{"type":"insert","text":" and its Affiliates"},{"type":"equal","text":", the Owner Trustee and the Indenture Trustee (including in its capacity as Note Paying Agent), and their officers, directo…
```

- [seq 514](trajectory.jsonl#L514) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0291","p0292","p0293","p0294","p0372"],"quote":"The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capacity as Note Paying Agent), and their officers, directors, employees and agents (each, an \"Indemnified Person\") for all fees, expenses, losses, claims, actions, suits, damages and liabilities (including reasonable legal fees and expenses) resulting from the Servicer's (including in its capacity as Custodian) willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents","rationale":"Section 6.3 runs in our favour but is textually short of the preferred position on five counts: the indemnity is not an express duty to defend (Section 6.3(b) is permissive - the Servicer \"may participate in and assume the defense\"), the Indemnified Person definition reaches the Issuer, Owner Trustee, Indenture Trustee and their officers, directors, employees and agents but not the Issuer's Affiliates, and the triggers are exhaustively \"willful misconduct, bad faith or gross negligence\", with no violation-of-Law, data-breach or intellectual-property-infringement limb, and no cooperation covenant. We have repaired each in the shortest operative form: \"will defend and indemnify\" plus \"and its Affiliates\" in Section 6.3(a)(i) and \"will defend and indemnify\" in (a)(ii); a new (a)(iii) adding violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files (Cellco acts as Custodian of the Receivable Files), and third-party IP infringement or misappropriation claims for services or deliverables provided under the Transaction Documents; and a reasonable-cooperation sentence after the defence-assumption mechanics. We deliberately did not touch the permissive assumption of defence in Section 6.3(b), because it allocates control of the defence and the conditional mechanics in the following paragraph (\"If the Servicer ... notifies the Indemnified Person of its intention to assume the defense\") depend on it. We also did not import the fallback's 3x annual fees super-cap - Section 6.3 is presently uncapped, which is better for us - and we added no Issuer or Depositor indemnity, since none exists today (Section 9.2 is a narrow defence-of-title covenant). If the business confirms the transaction has no services, deliverables, software or IP-licence subject matter, limb (C) can be dropped as scoped out.","confidence":0.72,"proposal":{"level":"preferred","summary":"Make Cellco's Section 6.3 indemnity a defence obligation running to the Issuer's Affiliates and add limbs for violation of Law, data breach and IP infringement, plus a cooperation sentence.","comment":"[Playbook] We have made Cellco's Section 6.3 indemnity an express duty to defend, extended the Indemnified Persons to the Issuer's Affiliates, and added limbs for violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files, and third-party intellectual property infringement claims, with a reasonable-cooperation sentence in the Proceedings mechanics. The existing notice, defence-control and settlement provisions and the uncapped nature of the indemnity are unchanged; we have not added any Issuer or Depositor indemnity.","ops":[{"kind":"replace","paragraphId":"p0291","oldText":"The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee","newText":"The Servicer will defend and indemnify the Issuer and its Affiliates, the Owner Trustee and the Indenture Trustee"},{"kind":"replace","paragraphId":"p0292","oldText":"The Marketing Agent will indemnify the Indemnified Persons","newText":"The Marketing Agent will defend and indemnify the Indemnified Persons"},{"kind":"insert_after","paragraphId":"p0292","numbering":"(iii)","text":"Each of the Servicer and the Marketing Agent will also defend and indemnify the Indemnified Persons for such amounts resulting from (A) its violation of applicable Law, (B) any unauthorized access to or disclosure of Obligor data or Receivable Files caused by it (including the Servicer in its capacity as Custodian) or (C) any claim that any services or deliverables it provides under the Transaction Documents infringe or misappropriate any intellectual property right."},{"kind":"insert_after","paragraphId":"p0294","text":"The Indemnified Person will provide reasonable cooperation in the defense of the Proceeding."}]},"elementCoverage":{"level":"preferred","mappings":[{"element":"Vendor has an express duty to defend Customer and its affiliates.","status":"addressed_by_operation","operationIndexes":[1,2]},{"element":"Vendor indemnifies Customer and its affiliates against third-party claims.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.","status":"addressed_by_operation","operationIndexes":[3]},{"element":"Vendor indemnity covers Vendor's breach of applicable law.","status":"addressed_by_operation","operationIndexes":[3]},{"element":"Vendor indemnity covers a data breach caused by Vendor.","status":"addressed_by_operation","operationIndexes":[3]},{"element":"Vendor indemnity covers Vendor's gross negligence and wilful misconduct.","status":"already_met","quote":"willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents"},{"element":"The indemnification procedure requires notice of a claim.","status":"already_met","quote":"promptly notify the Servicer or the Marketing Agent, as applicable, of the Proceeding"},{"element":"The indemnification procedure allocates control of the defence.","status":"already_met","quote":"The Servicer or the Marketing Agent, as applicable, may participate in and assume the defense and settlement of a Proceeding at its expense."},{"element":"The indemnification procedure requires reasonable cooperation.","status":"addressed_by_operation","operationIndexes":[4]},{"element":"Customer indemnity is limited to Customer-provided content and Customer's breach of law.","status":"already_met","quote":"The Depositor will defend the Issuer's interest in the Depositor Transferred Property against claims of third parties claiming through the Depositor."}]}}
```

- [seq 515](trajectory.jsonl#L515) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 514](trajectory.jsonl#L514)
- Finding: `f-indemn-cf3eceff` · **deviation** · confidence 0.72
- Location: § VI SERVICER AND MARKETING AGENT
- Quote: “The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capacity as Note Paying Agent), and their officers, directors, employees and agents (each, an "Indemnified Person") for all fees, expenses, losses, claims, actions, suits, damages and liabilities (including reasonable legal fees and expenses) resulting from the Servicer's (including in its capacity as Custodian) willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents”
- Rationale: Section 6.3 runs in our favour but is textually short of the preferred position on five counts: the indemnity is not an express duty to defend (Section 6.3(b) is permissive - the Servicer "may participate in and assume the defense"), the Indemnified Person definition reaches the Issuer, Owner Trustee, Indenture Trustee and their officers, directors, employees and agents but not the Issuer's Affiliates, and the triggers are exhaustively "willful misconduct, bad faith or gross negligence", with no violation-of-Law, data-breach or intellectual-property-infringement limb, and no cooperation covenant. We have repaired each in the shortest operative form: "will defend and indemnify" plus "and its Affiliates" in Section 6.3(a)(i) and "will defend and indemnify" in (a)(ii); a new (a)(iii) adding violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files (Cellco acts as Custodian of the Receivable Files), and third-party IP infringement or misappropriation claims for services or deliverables provided under the Transaction Documents; and a reasonable-cooperation sentence after the defence-assumption mechanics. We deliberately did not touch the permissive assumption of defence in Section 6.3(b), because it allocates control of the defence and the conditional mechanics in the following paragraph ("If the Servicer ... notifies the Indemnified Person of its intention to assume the defense") depend on it. We also did not import the fallback's 3x annual fees super-cap - Section 6.3 is presently uncapped, which is better for us - and we added no Issuer or Depositor indemnity, since none exists today (Section 9.2 is a narrow defence-of-title covenant). If the business confirms the transaction has no services, deliverables, software or IP-licence subject matter, limb (C) can be dropped as scoped out.
- Proposal: **preferred** — Make Cellco's Section 6.3 indemnity a defence obligation running to the Issuer's Affiliates and add limbs for violation of Law, data breach and IP infringement, plus a cooperation sentence.
- Comment: [Playbook] We have made Cellco's Section 6.3 indemnity an express duty to defend, extended the Indemnified Persons to the Issuer's Affiliates, and added limbs for violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files, and third-party intellectual property infringement claims, with a reasonable-cooperation sentence in the Proceedings mechanics. The existing notice, defence-control and settlement provisions and the uncapped nature of the indemnity are unchanged; we have not added any Issuer or Depositor indemnity.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "The Servicer will defend and indemnify the Issuer and its Affiliates, the Owner Trustee and the Indenture Trustee",
    "oldText": "The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee",
    "paragraphId": "p0291"
  },
  {
    "kind": "replace",
    "newText": "The Marketing Agent will defend and indemnify the Indemnified Persons",
    "oldText": "The Marketing Agent will indemnify the Indemnified Persons",
    "paragraphId": "p0292"
  },
  {
    "kind": "insert_after",
    "numbering": "(iii)",
    "paragraphId": "p0292",
    "text": "Each of the Servicer and the Marketing Agent will also defend and indemnify the Indemnified Persons for such amounts resulting from (A) its violation of applicable Law, (B) any unauthorized access to or disclosure of Obligor data or Receivable Files caused by it (including the Servicer in its capacity as Custodian) or (C) any claim that any services or deliverables it provides under the Transaction Documents infringe or misappropriate any intellectual property right."
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0294",
    "text": "The Indemnified Person will provide reasonable cooperation in the defense of the Proceeding."
  }
]
```

### Verifier and repair feedback

- [seq 385](trajectory.jsonl#L385) **Verdict: fail** — vendor indemnity for IP infringement present: failed Neither level is position-complete. Preferred fails on five elements: no express duty to defend (Section 6.3(b) says the Servicer "may participate in and assume the defense" — permissive), no affiliate coverage in the Indemnified Person definition, no IP-infringement limb, no breach-of-Law limb, no data-breach limb, and no cooperation covenant. Fallback fails on the three load-bearing elements: there is no IP-infringement indemnity trigger, no procure/modify/replace mitigation obligation, and no refund-of-fees backstop. The deterministic check confirming absence of an IP indemnity matches the text in substance, not merely mechanically. The 3x super-cap element is treated as met because Section 6.3 is presently uncapped, which is strictly better for us; the drafter is correct not to import a cap that would newly limit an uncapped indemnity. The Customer-indemnity element is met vacuously — no Issuer or Depositor indemnity runs to Cellco in the rendered language (Section 9.2 is a narrow defence-of-title covenant), so there is nothing to narrow and drafting one would be self-harming. Minimality and intent are preserved because no operative text was changed at all; the submission is an escalation, not a redline. That also means nothing has been repaired. To move to a complete preferred level, the drafter must (i) change "may participate in and assume the defense" to a mandatory "will defend", (ii) add "and its Affiliates" to the Section 6.3(a)(i) Indemnified Person definition, (iii) add express limbs for violation of applicable Law and for unauthorised access to or disclosure of Obligor/Receivable File data caused by the Servicer or Custodian, and (iv) add a reasonable-cooperation sentence to Section 6.3(b). If the business confirms the transaction has no services, deliverables, software or IP-licence subject matter, the IP-infringement/procure-modify-replace-refund construct is inapposite and should be recorded as a scoped-out element rather than left silently unaddressed; the finding should state that conclusion in the operative record, not merely in the rationale. Checks: {"name":"vendor indemnity for IP infringement present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 386](trajectory.jsonl#L386) **Repair round 1**: "Unmet preferred elements (copy these exact strings into the repaired coverage):\n- Vendor has an express duty to defend Customer and its affiliates.\n Verdict: not_met. Evidence: Section 6.3(b) is permissive only: \"The Servicer or the Marketing Agent, as applicable, may participate in and assume the defense and settlement of a Proceeding at its expense.\" Section 6.3(a) merely reimburses amounts \"incurred by such parties in defending themselves\". No mandatory \"will defend\" obligation, and the Indemnified Person definition reaches only the Issuer, Owner Trustee, Indenture Trustee and their officers, directors, employees and agents — not affiliates. Defect to repair: insert \"will defend\" and extend the Indemnified Person list to the Issuer's Affiliates.\n- Vendor indemnifies Customer and its affiliates against third-party claims.\n Verdict: not_met. Evidence: Section 6.3(a)(i)-(ii) indemnifies \"the Issuer, the Owner Trustee and the Indenture Trustee ... and their officers, directors, employees and agents\" for \"claims, actions, suits, damages and liabilities\". Third-party claim cover in Customer's favour exists, but the affiliate limb of the element is absent — no Affiliates of the Issuer are Indemnified Persons. Defect: add \"and its Affiliates\" to the Indemnified Person definition in Section 6.3(a)(i).\n- Vendor indemnity covers claims that Services or Deliverables infringe intellectual property rights.\n Verdict: not_met. Evidence: Section 6.3(a) is limited to losses \"resulting from the Servicer's ... willful misconduct, bad faith or gross negligence in performing its obligations under the Transaction Documents\". No infringement or misappropriation limb appears anywhere in the rendered language, and none was inserted. Defect: no operative IP-infringement indemnity limb exists (subject matter fit is a commercial question, but the element is textually unmet).\n- Vendor indemnity covers Vendor's breach of applicable law.\n Verdict: not_met. Evidence: The trigger in Section 6.3(a)(i) and (ii) is exhaustively \"willful misconduct, bad faith or gross negligence\"; there is no breach-of-Law trigger. Defect: add a limb for the Servicer's/Marketing Agent's violation of applicable Law.\n- Vendor indemnity covers a data breach caused by Vendor.\n Verdict: not_met. Evidence: No unauthorised-access or disclosure trigger appears, notwithstanding that Cellco acts as Custodian of the Receivable Files. Defect: add a limb covering unauthorised access to or disclosure of Obligor/Receivable File data caused by the Servicer or Custodian.\n- The indemnification procedure requires reasonable cooperation.\n Verdict: not_met. Evidence: Section 6.3(b) imposes only a notice obligation on the Indemnified Person; there is no cooperation covenant. The omission is Customer-favourable, but the element is textually unmet — no \"reasonable cooperation\" language exists.\n\nDeterministic failures:\n- vendor indemnity for IP infringement present: failed\n\nVerifier reasons:\n- Neither level is position-complete. Preferred fails on five elements: no express duty to defend (Section 6.3(b) says the Servicer \"may participate in and assume the defense\" — permissive), no affiliate coverage in the Indemnified Person definition, no IP-infringement limb, no breach-of-Law limb, no data-breach limb, and no cooperation covenant.\n- Fallback fails on the three load-bearing elements: there is no IP-infringement indemnity trigger, no procure/modify/replace mitigation obligation, and no refund-of-fees backstop. The deterministic check confirming absence of an IP indemnity matches the text in substance, not merely mechanically.\n- The 3x super-cap element is treated as met because Section 6.3 is presently uncapped, which is strictly better for us; the drafter is correct not to import a cap that would newly limit an uncapped indemnity.\n- The Customer-indemnity element is met vacuously — no Issuer or Depositor indemnity runs to Cellco in the rendered language (Section 9.2 is a narrow defence-of-title covenant), so there is nothing to narrow and drafting one would be self-harming.\n- Minimality and intent are preserved because no operative text was changed at all; the submission is an escalation, not a redline. That also means nothing has been repaired.\n- To move to a complete preferred level, the drafter must (i) change \"may participate in and assume the defense\" to a mandatory \"will defend\", (ii) add \"and its Affiliates\" to the Section 6.3(a)(i) Indemnified Person definition, (iii) add express limbs for violation of applicable Law and for unauthorised access to or disclosure of Obligor/Receivable File data caused by the Servicer or Custodian, and (iv) add a reasonable-cooperation sentence to Section 6.3(b).\n- If the business confirms the transaction has no services, deliverables, software or IP-licence subject matter, the IP-infringement/procure-modify-replace-refund construct is inapposite and should be recorded as a scoped-out element rather than left silently unaddressed; the finding should state that conclusion in the operative record, not merely in the rationale."
- [seq 565](trajectory.jsonl#L565) **Verdict: repaired** — Position-complete at the preferred level: every preferred element is met in operative text — mandatory "will defend and indemnify", extension to the Issuer's Affiliates, three new trigger limbs (violation of Law; unauthorized access to/disclosure of Obligor data or Receivable Files; third-party IP infringement/misappropriation of services or deliverables), retained notice and defence-control mechanics, and an added reasonable-cooperation sentence. The Customer-indemnity element is satisfied by absence: no Issuer or Depositor indemnity of Cellco exists, so there is nothing to narrow. The fallback level is not complete (no procure/modify/replace ladder, no refund remedy, no 3x super-cap), but that is irrelevant because the preferred level is complete, and the missing super-cap and the missing IP carve-outs all leave the Customer better off than the fallback floor. Minimality holds: the edits are confined to the four operative touchpoints needed to reach the preferred checklist. No favourable existing language was deleted (the permissive assumption-of-defence sentence, the non-prejudice notice proviso, the counsel-standard and separate-counsel/conflict provisions and the uncapped nature of the indemnity all survive), no survival tail, expense allocation, damages categories or boilerplate was imported, and the new limbs were drafted as a single sentence applying to both the Servicer and the Marketing Agent rather than duplicated in (a)(i) and (a)(ii). Intent is preserved: the added cooperation sentence sits after the defence-assumption mechanics and does not contradict the retained permissive "may participate in and assume the defense" election; no cross-reference (Section 6.3(a), Section 6.7(b) of the Indenture, Section 7.2(a) of the Trust Agreement, which key off the "Indemnified Person" definition) is broken by widening the (a)(i) list, and Section 9.2 was correctly left intact. Two definitional confirmations the drafter should make before sending, each fixable in the same sentence if wrong: (i) "Affiliates" as used in the new (a)(i) language must be a defined term in the Transaction Documents' definitions annex — if it is not, replace with the defined-term formulation or spell out "its affiliates" to avoid an undefined capitalized term; (ii) confirm "Law" and "Obligor" are likewise defined, since limb (A) and limb (B) rely on them. Scope note on limb (B): the data-breach trigger is drafted to named categories ("Obligor data or Receivable Files") rather than to all data belonging to, supplied by or processed for the Issuer. That is defensible in a servicing/custodial context, but if the business wants belt-and-braces coverage, extend to "any Obligor data, Receivable Files or other information of or provided by the Issuer" — a one-phrase change that would not disturb minimality. The rationale's suggestion that limb (C) could be dropped if there are no services/deliverables with IP subject matter should not be acted on: Cellco provides servicing and custodial services and systems under the Transaction Documents, and the detection guidance treats an indemnity without an IP limb as the deviation being cured. Dropping (C) would break the preferred level. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"operation 3 applies","ok":true}; {"name":"operation 4 applies","ok":true}; {"name":"vendor indemnity for IP infringement present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## NONCOMPETE — Non-compete restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 94](trajectory.jsonl#L94)

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
{"ruleId":"NONCOMPETE","candidateSectionIds":["sec-v","sec-vi","sec-vii"],"candidateParagraphIds":["p0240","p0266","p0279","p0346"],"likelyAbsent":true,"note":"No non-compete or field-of-use restriction located; hits are only 'court of competent jurisdiction' and generic 'contractual restriction' representations. Confirm nothing in Articles V-VII restricts our business activities."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 117](trajectory.jsonl#L117) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0240","p0266","p0279","p0346"]}
```

- [seq 118](trajectory.jsonl#L118) **read_paragraphs result**

```json
[{"id":"p0240","sectionRef":"§ V DEPOSITOR","text":"(g) No Conflict. The execution and delivery of this Agreement or any other Transaction Document to which it is a party by the Depositor, and the performance by it of the transactions contemplated by the Transaction Documents and the fulfillment of the terms hereof and thereof applicable to the Depositor, (i) do not contravene (A) its limited lia…
```

- [seq 119](trajectory.jsonl#L119) **drafter → search**

```json
{"query":"compete OR competing OR competitor"}
```

- [seq 120](trajectory.jsonl#L120) **search result**

```json
[]
```

- [seq 159](trajectory.jsonl#L159) **drafter → search**

```json
{"query":"compete"}
```

- [seq 160](trajectory.jsonl#L160) **search result**

```json
[{"paragraphId":"p0335","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ly unable to act as Successor Servicer, it will appoint, or petition a court of competent jurisdiction to appoint, an institution having a net worth of not less than $…"},{"paragraphId":"p0469","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","snippet":"…ermination wi…
```

- [seq 161](trajectory.jsonl#L161) **drafter → search**

```json
{"query":"competing"}
```

- [seq 162](trajectory.jsonl#L162) **search result**

```json
[]
```

- [seq 195](trajectory.jsonl#L195) **drafter → search**

```json
{"query":"exclusive"}
```

- [seq 196](trajectory.jsonl#L196) **search result**

```json
[{"paragraphId":"p0387","sectionRef":"§ IX OTHER AGREEMENTS","snippet":"Cap Custodian and the Cap Counterparty to the effect that the Issuer shall have exclusive control over the Cap Collateral Account, (y) following delivery of such notice …"},{"paragraphId":"p0387","sectionRef":"§ IX OTHER AGREEMENTS","snippet":"…ntrol over the Cap Collateral Account, (y) following delivery of such notice of ex…
```

- [seq 197](trajectory.jsonl#L197) **drafter → search**

```json
{"query":"will not engage in"}
```

- [seq 198](trajectory.jsonl#L198) **search result**

```json
[]
```

- [seq 223](trajectory.jsonl#L223) **drafter → search**

```json
{"query":"Issuer will not"}
```

- [seq 224](trajectory.jsonl#L224) **search result**

```json
[]
```

- [seq 225](trajectory.jsonl#L225) **drafter → search**

```json
{"query":"any business other than"}
```

- [seq 226](trajectory.jsonl#L226) **search result**

```json
[]
```

- [seq 257](trajectory.jsonl#L257) **drafter → list_sections**

```json
{}
```

- [seq 258](trajectory.jsonl#L258) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 259](trajectory.jsonl#L259) **drafter → search**

```json
{"query":"field of use"}
```

- [seq 260](trajectory.jsonl#L260) **search result**

```json
[]
```

- [seq 293](trajectory.jsonl#L293) **drafter → search**

```json
{"query":"restriction","limit":30}
```

- [seq 294](trajectory.jsonl#L294) **search result**

```json
[{"paragraphId":"p0240","sectionRef":"§ V DEPOSITOR","snippet":"…not contravene (A) its limited liability company agreement, (B) any contractual restriction binding on or affecting it or its property, or (C) any order, writ, judgment, a…"},{"paragraphId":"p0266","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…ontravene (A) the organizational documents of the Servicer, (B) any contrac…
```

- [seq 295](trajectory.jsonl#L295) **drafter → search**

```json
{"query":"prohibited","limit":30}
```

- [seq 296](trajectory.jsonl#L296) **search result**

```json
[]
```

- [seq 317](trajectory.jsonl#L317) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 318](trajectory.jsonl#L318) **search result**

```json
[]
```

- [seq 319](trajectory.jsonl#L319) **drafter → search**

```json
{"query":"engage","limit":30}
```

- [seq 320](trajectory.jsonl#L320) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"ARTICLE III SERVICING OF RECEIVABLES 7 Section 3.1 Engagement 7 Section 3.2 Servicing of Receivables. 7 Section 3.3 Servicer's Acquisitio…"},{"paragraphId":"p0027","sectionRef":"§ BACKGROUND","snippet":"…roperty to the Depositor, who will transfer th…
```

- [seq 339](trajectory.jsonl#L339) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":26}
```

- [seq 340](trajectory.jsonl#L340) **read_section result**

```json
{"sectionRef":"§ IX OTHER AGREEMENTS","cursor":0,"totalParagraphs":26,"nextCursor":null,"paragraphs":[{"id":"p0364","text":"ARTICLE IX OTHER AGREEMENTS"},{"id":"p0365","text":"Section 9.1 Financing Statements."},{"id":"p0366","text":"(a) Filing of Financing Statements. The Depositor will file financing and continuation statements, and amendments to the statements, in the jurisdictions and with th…
```

- [seq 367](trajectory.jsonl#L367) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0080","p0346","p0372"],"quote":"Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement.","rationale":"The agreement contains no non-compete, field-of-use, territory or exclusivity covenant binding the Issuer or the Depositor, so the preferred position is met. Searches for \"compete\", \"competing\", \"exclusive\", \"field of use\", \"engage\", \"solicit\", \"restriction\" and \"prohibited\" across Articles I–XI and the schedules return only (i) \"court of competent jurisdiction\" references (p0335, p0469), (ii) generic no-conflict representations that performance will not contravene \"any contractual restriction binding on or affecting it or its property\" (p0240, p0266, p0279), and (iii) the Cap Collateral Account \"exclusive control\" account-control mechanic (p0387–p0388), none of which limit the businesses we may operate or the products we may buy or build. The Servicer engagement in Section 3.1 is not stated to be exclusive, and the successor-servicer provisions expressly contemplate our engaging another institution to service the Receivables (p0334, p0346). The restrictions we do carry — Section 9.2 (no transfer or Lien on Depositor Transferred Property), Section 9.5 (no petition) and Section 9.6 (limited recourse) — are structural securitization covenants protecting the transaction's bankruptcy-remote status, not restrictive covenants against competing activity, and Section 7.3's limit on the Servicer's obligation to license its own software is a restriction on Cellco's obligations rather than on our business. No redline is proposed.","confidence":0.9}
```

- [seq 368](trajectory.jsonl#L368) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 367](trajectory.jsonl#L367)
- Finding: `f-noncompete-c53470a2` · **compliant** · confidence 0.90
- Location: § III SERVICING OF RECEIVABLES
- Quote: “Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement.”
- Rationale: The agreement contains no non-compete, field-of-use, territory or exclusivity covenant binding the Issuer or the Depositor, so the preferred position is met. Searches for "compete", "competing", "exclusive", "field of use", "engage", "solicit", "restriction" and "prohibited" across Articles I–XI and the schedules return only (i) "court of competent jurisdiction" references (p0335, p0469), (ii) generic no-conflict representations that performance will not contravene "any contractual restriction binding on or affecting it or its property" (p0240, p0266, p0279), and (iii) the Cap Collateral Account "exclusive control" account-control mechanic (p0387–p0388), none of which limit the businesses we may operate or the products we may buy or build. The Servicer engagement in Section 3.1 is not stated to be exclusive, and the successor-servicer provisions expressly contemplate our engaging another institution to service the Receivables (p0334, p0346). The restrictions we do carry — Section 9.2 (no transfer or Lien on Depositor Transferred Property), Section 9.5 (no petition) and Section 9.6 (limited recourse) — are structural securitization covenants protecting the transaction's bankruptcy-remote status, not restrictive covenants against competing activity, and Section 7.3's limit on the Servicer's obligation to license its own software is a restriction on Cellco's obligations rather than on our business. No redline is proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## EXCLUSIVITY — Exclusivity obligations binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 95](trajectory.jsonl#L95)

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
{"ruleId":"EXCLUSIVITY","candidateSectionIds":["sec-ix","sec-x"],"candidateParagraphIds":["p0387","p0388","p0427"],"likelyAbsent":true,"note":"Only uses of 'exclusive' are control over the Cap Collateral Account (p0387-p0388) and non-exclusive jurisdiction (p0427). No sole-source or requirements obligation binds us."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 105](trajectory.jsonl#L105) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0387","p0388","p0427"]}
```

- [seq 106](trajectory.jsonl#L106) **read_paragraphs result**

```json
[{"id":"p0387","sectionRef":"§ IX OTHER AGREEMENTS","text":"Cap Custodian and the Cap Counterparty to the effect that the Issuer shall have exclusive control over the Cap Collateral Account, (y) following delivery of such notice of exclusive control the Cap Custodian shall comply with instructions and entitlement orders originated by the Issuer without further consent by the Cap Counterparty, and…
```

- [seq 107](trajectory.jsonl#L107) **drafter → search**

```json
{"query":"exclusive","limit":50}
```

- [seq 108](trajectory.jsonl#L108) **search result**

```json
[{"paragraphId":"p0387","sectionRef":"§ IX OTHER AGREEMENTS","snippet":"Cap Custodian and the Cap Counterparty to the effect that the Issuer shall have exclusive control over the Cap Collateral Account, (y) following delivery of such notice …"},{"paragraphId":"p0387","sectionRef":"§ IX OTHER AGREEMENTS","snippet":"…ntrol over the Cap Collateral Account, (y) following delivery of such notice of ex…
```

- [seq 135](trajectory.jsonl#L135) **drafter → search**

```json
{"query":"sole supplier|sole source|requirements from|exclusively from|solely from","regex":true,"limit":30}
```

- [seq 136](trajectory.jsonl#L136) **search result**

```json
[{"paragraphId":"p0134","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"… Excluded Receivables Servicing Fee on each Payment Date, which will be payable solely from Collections on the Temporarily Excluded Receivables, as set forth in Section 3.…"}]
```

- [seq 137](trajectory.jsonl#L137) **drafter → search**

```json
{"query":"shall not engage any other|third party provider|other servicer|competing","regex":true,"limit":30}
```

- [seq 138](trajectory.jsonl#L138) **search result**

```json
[{"paragraphId":"p0328","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ination Event will be deemed not to have occurred. No waiver will extend to any other Servicer Termination Event or impair a right relating to any other Servicer Termination …"},{"paragraphId":"p0328","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snipp…
```

- [seq 177](trajectory.jsonl#L177) **drafter → search**

```json
{"query":"appoint|appointment of|hereby engages","regex":true,"limit":30}
```

- [seq 178](trajectory.jsonl#L178) **search result**

```json
[{"paragraphId":"p0105","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(f) Powers of Attorney. The Issuer appoints the Servicer as the Issuer's attorney-in-fact, with full power of substitution…"},{"paragraphId":"p0137","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(a) Appointment of Custodian. To reduce administrative costs and facilitate the servicing o…"},{"paragraphId":"p…
```

- [seq 179](trajectory.jsonl#L179) **drafter → search**

```json
{"query":"shall not, without|will not, without the prior|restrict|prohibited from","regex":true,"limit":30}
```

- [seq 180](trajectory.jsonl#L180) **search result**

```json
[{"paragraphId":"p0240","sectionRef":"§ V DEPOSITOR","snippet":"…not contravene (A) its limited liability company agreement, (B) any contractual restriction binding on or affecting it or its property, or (C) any order, writ, judgment…"},{"paragraphId":"p0266","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…ontravene (A) the organizational documents of the Servicer, (B) any contractua…
```

- [seq 213](trajectory.jsonl#L213) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0150","p0137"]}
```

- [seq 214](trajectory.jsonl#L214) **read_paragraphs result**

```json
[{"id":"p0150","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(a) Appointment of Marketing Agent. The Issuer and the Servicer appoint Cellco to act as Marketing Agent for the Receivables. Cellco accepts the appointment and agrees to perform its obligations set forth in this Agreement."},{"id":"p0137","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(a) Appointment of Custodian. To red…
```

- [seq 215](trajectory.jsonl#L215) **drafter → search**

```json
{"query":"Servicer will service|agrees to service|manage, service, administer","regex":true,"limit":20}
```

- [seq 216](trajectory.jsonl#L216) **search result**

```json
[{"paragraphId":"p0082","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(a) General Servicing Obligations. The Servicer will manage, service, administer and collect on the Receivables with reasonable care using that degree of skill …"}]
```

- [seq 245](trajectory.jsonl#L245) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0082","p0081","p0080"]}
```

- [seq 246](trajectory.jsonl#L246) **read_paragraphs result**

```json
[{"id":"p0082","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(a) General Servicing Obligations. The Servicer will manage, service, administer and collect on the Receivables with reasonable care using that degree of skill and attention that the Servicer exercises for all comparable device payment plan agreement receivables that it services for itself or others according to the Servicing Pr…
```

- [seq 247](trajectory.jsonl#L247) **drafter → search**

```json
{"query":"Section 3.1","limit":10}
```

- [seq 248](trajectory.jsonl#L248) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"ARTICLE III SERVICING OF RECEIVABLES 7 Section 3.1 Engagement 7 Section 3.2 Servicing of Receivables. 7 Section 3.3 Servicer's Acq…"},{"paragraphId":"p0013","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surren…
```

- [seq 281](trajectory.jsonl#L281) **drafter → search**

```json
{"query":"non-compete|noncompete|shall not retain|may not engage|any other Person to perform","regex":true,"limit":30}
```

- [seq 282](trajectory.jsonl#L282) **search result**

```json
[]
```

- [seq 283](trajectory.jsonl#L283) **drafter → search**

```json
{"query":"Successor Servicer appoint institution regular business","limit":10}
```

- [seq 284](trajectory.jsonl#L284) **search result**

```json
[]
```

- [seq 327](trajectory.jsonl#L327) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0080","p0137","p0150","p0387","p0388","p0427"],"quote":"Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement.","rationale":"The Agreement imposes no exclusivity or sole-supplier obligation on our side, so it meets the preferred position and needs no redline. The operative engagement provisions are bare appointments of Cellco as Servicer (p0080), Custodian (p0137) and Marketing Agent (p0150) with no \"sole and exclusive\" designation, no requirements commitment, and no covenant barring the Issuer or Depositor from procuring comparable services from third parties; Article VII expressly permits terminating the Servicer and installing a Successor Servicer. The only instances of \"exclusive\" are unrelated: \"exclusive control\" over the Cap Collateral Account (p0387-p0388) is a securities-account control mechanic held by the Issuer, and p0388 in fact constrains the Issuer's own exercise of it, so it runs in our favour rather than against us; and p0427 refers to \"nonexclusive jurisdiction,\" a forum term outside this rule. Because no exclusivity binds us, the fallback's category, 12-month, and performance-exit limits are not engaged.","confidence":0.93,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer has no exclusivity or sole-supplier obligation.","status":"already_met","quote":"Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement."}]}}
```

- [seq 328](trajectory.jsonl#L328) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 367](trajectory.jsonl#L367)
- Finding: `f-exclusivity-b2aa43a0` · **compliant** · confidence 0.93
- Location: § III SERVICING OF RECEIVABLES
- Quote: “Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement.”
- Rationale: The Agreement imposes no exclusivity or sole-supplier obligation on our side, so it meets the preferred position and needs no redline. The operative engagement provisions are bare appointments of Cellco as Servicer (p0080), Custodian (p0137) and Marketing Agent (p0150) with no "sole and exclusive" designation, no requirements commitment, and no covenant barring the Issuer or Depositor from procuring comparable services from third parties; Article VII expressly permits terminating the Servicer and installing a Successor Servicer. The only instances of "exclusive" are unrelated: "exclusive control" over the Cap Collateral Account (p0387-p0388) is a securities-account control mechanic held by the Issuer, and p0388 in fact constrains the Issuer's own exercise of it, so it runs in our favour rather than against us; and p0427 refers to "nonexclusive jurisdiction," a forum term outside this rule. Because no exclusivity binds us, the fallback's category, 12-month, and performance-exit limits are not engaged.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## MFN — Most-favoured-nation obligations burdening Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 96](trajectory.jsonl#L96)

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
{"ruleId":"MFN","candidateSectionIds":[],"candidateParagraphIds":[],"likelyAbsent":true,"note":"Two search passes ('most favored', 'favorable', 'best terms', 'comparable transaction') returned no hits. No MFN obligation in either direction; record as absent."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 123](trajectory.jsonl#L123) **drafter → search**

```json
{"query":"most favored nation"}
```

- [seq 124](trajectory.jsonl#L124) **search result**

```json
[]
```

- [seq 125](trajectory.jsonl#L125) **drafter → search**

```json
{"query":"no less favorable"}
```

- [seq 126](trajectory.jsonl#L126) **search result**

```json
[]
```

- [seq 165](trajectory.jsonl#L165) **drafter → search**

```json
{"query":"favorable terms third party"}
```

- [seq 166](trajectory.jsonl#L166) **search result**

```json
[]
```

- [seq 167](trajectory.jsonl#L167) **drafter → search**

```json
{"query":"match offer right to match"}
```

- [seq 168](trajectory.jsonl#L168) **search result**

```json
[]
```

- [seq 201](trajectory.jsonl#L201) **drafter → search**

```json
{"query":"favorable"}
```

- [seq 202](trajectory.jsonl#L202) **search result**

```json
[]
```

- [seq 203](trajectory.jsonl#L203) **drafter → search**

```json
{"query":"comparable terms other customers"}
```

- [seq 204](trajectory.jsonl#L204) **search result**

```json
[]
```

- [seq 235](trajectory.jsonl#L235) **drafter → search**

```json
{"query":"favourable best price discount"}
```

- [seq 236](trajectory.jsonl#L236) **search result**

```json
[]
```

- [seq 237](trajectory.jsonl#L237) **drafter → search**

```json
{"query":"terms offered to any other"}
```

- [seq 238](trajectory.jsonl#L238) **search result**

```json
[]
```

- [seq 269](trajectory.jsonl#L269) **drafter → list_sections**

```json
{}
```

- [seq 270](trajectory.jsonl#L270) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 271](trajectory.jsonl#L271) **drafter → search**

```json
{"query":"pricing"}
```

- [seq 272](trajectory.jsonl#L272) **search result**

```json
[{"paragraphId":"p0692","sectionRef":"§ A-13","snippet":"selection and in accordance with customary financial practice, in pricing new issues of corporate debt securities of comparable maturity to the remaining…"}]
```

- [seq 299](trajectory.jsonl#L299) **drafter → search**

```json
{"query":"no less than terms available to others equal or better"}
```

- [seq 300](trajectory.jsonl#L300) **search result**

```json
[]
```

- [seq 301](trajectory.jsonl#L301) **drafter → search**

```json
{"query":"other securitization transactions similar receivables terms"}
```

- [seq 302](trajectory.jsonl#L302) **search result**

```json
[]
```

- [seq 331](trajectory.jsonl#L331) **drafter → search**

```json
{"query":"entire agreement amendment"}
```

- [seq 332](trajectory.jsonl#L332) **search result**

```json
[]
```

- [seq 346](trajectory.jsonl#L346) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":10}
```

- [seq 347](trajectory.jsonl#L347) **read_section result**

```json
{"sectionRef":"§ IX OTHER AGREEMENTS","cursor":0,"totalParagraphs":26,"nextCursor":10,"paragraphs":[{"id":"p0364","text":"ARTICLE IX OTHER AGREEMENTS"},{"id":"p0365","text":"Section 9.1 Financing Statements."},{"id":"p0366","text":"(a) Filing of Financing Statements. The Depositor will file financing and continuation statements, and amendments to the statements, in the jurisdictions and with the …
```

- [seq 371](trajectory.jsonl#L371) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0364","p0372"],"quote":"ARTICLE IX OTHER AGREEMENTS","rationale":"We ran independent searches for each MFN trigger (\"most favored nation\", \"no less favorable\", \"favorable\", \"terms offered to any other\", \"right to match\", \"best price/discount\", \"comparable/other transactions\"). The only near-hit is p0692, which uses \"pricing new issues of corporate debt securities of comparable maturity\" as a discount-rate convention for a note payment calculation, not a terms-comparison mechanic. The covenant articles (Article IX Other Agreements, Article VI Servicer and Marketing Agent) impose transfer, lien, expense and servicing covenants but no obligation on the Issuer or Depositor to extend Cellco terms no less favourable than those given to third parties, and no right-to-match or best-terms disclosure mechanic. There is therefore no MFN obligation burdening our side (and none granted in our favour), which satisfies the preferred position that Customer has no most-favoured-nation obligation benefiting Vendor. No redline is warranted.","confidence":0.9}
```

- [seq 372](trajectory.jsonl#L372) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 371](trajectory.jsonl#L371)
- Finding: `f-mfn-a2344fe4` · **compliant** · confidence 0.90
- Location: § IX OTHER AGREEMENTS
- Quote: “ARTICLE IX OTHER AGREEMENTS”
- Rationale: We ran independent searches for each MFN trigger ("most favored nation", "no less favorable", "favorable", "terms offered to any other", "right to match", "best price/discount", "comparable/other transactions"). The only near-hit is p0692, which uses "pricing new issues of corporate debt securities of comparable maturity" as a discount-rate convention for a note payment calculation, not a terms-comparison mechanic. The covenant articles (Article IX Other Agreements, Article VI Servicer and Marketing Agent) impose transfer, lien, expense and servicing covenants but no obligation on the Issuer or Depositor to extend Cellco terms no less favourable than those given to third parties, and no right-to-match or best-terms disclosure mechanic. There is therefore no MFN obligation burdening our side (and none granted in our favour), which satisfies the preferred position that Customer has no most-favoured-nation obligation benefiting Vendor. No redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## NOSOLICIT — Non-solicitation of employees binding Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 97](trajectory.jsonl#L97)

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
{"ruleId":"NOSOLICIT","candidateSectionIds":["sec-vi"],"candidateParagraphIds":["p0284","p0291"],"likelyAbsent":true,"note":"No non-solicitation or no-hire covenant found; 'employee' appears only in recourse-limitation and Indemnified Person definitions. Record as absent."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 129](trajectory.jsonl#L129) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0284","p0291"]}
```

- [seq 130](trajectory.jsonl#L130) **read_paragraphs result**

```json
[{"id":"p0284","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(b) No Liability of Others. Each of the Servicer's and the Marketing Agent's obligations under this Agreement are corporate obligations. No Person will have recourse, directly or indirectly, to any member, manager, officer, director, employee or agent of the Servicer for the Servicer's obligations or the Marketing Agent for t…
```

- [seq 131](trajectory.jsonl#L131) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 132](trajectory.jsonl#L132) **search result**

```json
[]
```

- [seq 153](trajectory.jsonl#L153) **drafter → search**

```json
{"query":"shall not solicit employ or engage induce to leave"}
```

- [seq 154](trajectory.jsonl#L154) **search result**

```json
[]
```

- [seq 155](trajectory.jsonl#L155) **drafter → search**

```json
{"query":"no-hire"}
```

- [seq 156](trajectory.jsonl#L156) **search result**

```json
[]
```

- [seq 189](trajectory.jsonl#L189) **drafter → search**

```json
{"query":"hire"}
```

- [seq 190](trajectory.jsonl#L190) **search result**

```json
[]
```

- [seq 191](trajectory.jsonl#L191) **drafter → search**

```json
{"query":"employee"}
```

- [seq 192](trajectory.jsonl#L192) **search result**

```json
[{"paragraphId":"p0244","sectionRef":"§ V DEPOSITOR","snippet":"…ve recourse, directly or indirectly, to any member, manager, officer, director, employee or agent of the Depositor for the Depositor's obligations under this Agreement."},{"paragraphId":"p0284","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…ve recourse, directly or indirectly, to any member, manager, officer, director,…
```

- [seq 229](trajectory.jsonl#L229) **drafter → search**

```json
{"query":"personnel recruit staff"}
```

- [seq 230](trajectory.jsonl#L230) **search result**

```json
[]
```

- [seq 231](trajectory.jsonl#L231) **drafter → search**

```json
{"query":"non-compete restrictive covenant"}
```

- [seq 232](trajectory.jsonl#L232) **search result**

```json
[]
```

- [seq 263](trajectory.jsonl#L263) **drafter → list_sections**

```json
{}
```

- [seq 264](trajectory.jsonl#L264) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 265](trajectory.jsonl#L265) **drafter → search**

```json
{"query":"covenants of the Servicer"}
```

- [seq 266](trajectory.jsonl#L266) **search result**

```json
[]
```

- [seq 305](trajectory.jsonl#L305) **drafter → search**

```json
{"query":"induce"}
```

- [seq 306](trajectory.jsonl#L306) **search result**

```json
[]
```

- [seq 307](trajectory.jsonl#L307) **drafter → search**

```json
{"query":"employ"}
```

- [seq 308](trajectory.jsonl#L308) **search result**

```json
[{"paragraphId":"p0244","sectionRef":"§ V DEPOSITOR","snippet":"…ve recourse, directly or indirectly, to any member, manager, officer, director, employee or agent of the Depositor for the Depositor's obligations under this Agreemen…"},{"paragraphId":"p0284","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…ve recourse, directly or indirectly, to any member, manager, officer, director, …
```

- [seq 335](trajectory.jsonl#L335) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0284","p0291"],"quote":"No Person will have recourse, directly or indirectly, to any member, manager, officer, director, employee or agent of the Servicer for the Servicer's obligations or the Marketing Agent for the Marketing Agent's obligations, as applicable, under this Agreement.","rationale":"The Agreement contains no non-solicitation, no-hire, or anti-poaching covenant binding the Issuer or Depositor (our parties), and none binding Cellco either. Targeted searches for \"solicit\", \"no-hire\", \"induce\", \"hire\", \"personnel/recruit/staff\" and \"non-compete/restrictive covenant\" returned no hits anywhere in the document. Every occurrence of \"employee\"/\"employ\" is unrelated to restrictive covenants: the no-recourse-against-individuals clauses (p0244, p0284, quoted above), the \"Indemnified Person\" definition in the Servicer indemnity (p0291), the ERISA/Benefit Plan definitions (p0649, p0651, p0740), and the Independent Manager eligibility definition (p0770). Article VII (Servicer Resignation and Termination; Successor Servicer) — the provision where a servicing-transfer employee restriction would typically sit — likewise contains no such language.\n\nThis meets the preferred position (\"No non-solicit on Customer\") in full, so the fallback's narrowing elements (mutuality, personnel directly involved, 12-month tail, general-advertisement and unsolicited-approach carve-outs, no no-hire) are not reached. The absence of any restriction operates entirely in our favour and is not redlined; no elementCoverage is mapped because a compliant finding proposes no operation and the preferred element is satisfied by the absence of clause text rather than by any quotable provision. No action required.","confidence":0.92}
```

- [seq 336](trajectory.jsonl#L336) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 335](trajectory.jsonl#L335)
- Finding: `f-nosolicit-f71df7ff` · **compliant** · confidence 0.92
- Location: § VI SERVICER AND MARKETING AGENT
- Quote: “No Person will have recourse, directly or indirectly, to any member, manager, officer, director, employee or agent of the Servicer for the Servicer's obligations or the Marketing Agent for the Marketing Agent's obligations, as applicable, under this Agreement.”
- Rationale: The Agreement contains no non-solicitation, no-hire, or anti-poaching covenant binding the Issuer or Depositor (our parties), and none binding Cellco either. Targeted searches for "solicit", "no-hire", "induce", "hire", "personnel/recruit/staff" and "non-compete/restrictive covenant" returned no hits anywhere in the document. Every occurrence of "employee"/"employ" is unrelated to restrictive covenants: the no-recourse-against-individuals clauses (p0244, p0284, quoted above), the "Indemnified Person" definition in the Servicer indemnity (p0291), the ERISA/Benefit Plan definitions (p0649, p0651, p0740), and the Independent Manager eligibility definition (p0770). Article VII (Servicer Resignation and Termination; Successor Servicer) — the provision where a servicing-transfer employee restriction would typically sit — likewise contains no such language.

This meets the preferred position ("No non-solicit on Customer") in full, so the fallback's narrowing elements (mutuality, personnel directly involved, 12-month tail, general-advertisement and unsolicited-approach carve-outs, no no-hire) are not reached. The absence of any restriction operates entirely in our favour and is not redlined; no elementCoverage is mapped because a compliant finding proposes no operation and the preferred element is satisfied by the absence of clause text rather than by any quotable provision. No action required.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 344](trajectory.jsonl#L344)

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
{"ruleId":"T4C","candidateSectionIds":["sec-viii","sec-vii"],"candidateParagraphIds":["p0363","p0314","p0317","p0318","p0351","p0358"],"likelyAbsent":false,"note":"Section 8.3 Termination (p0363) sets the term-end trigger; Section 7.1 No Resignation (p0314) bars the Servicer from walking away; Section 7.2 Servicer Termination Events (p0317-p0318) is our removal right; Optional Acquisition/Redemption (p0351, p0358) are early-exit mechanics. Structure favours us; note absence of a pure convenience right rather than redlining."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 361](trajectory.jsonl#L361) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0363","p0314","p0317","p0318","p0351","p0358"]}
```

- [seq 362](trajectory.jsonl#L362) **read_paragraphs result**

```json
[{"id":"p0363","sectionRef":"§ VIII TERMINATION","text":"Section 8.3 Termination. This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full, settled, sold or written off and any amounts received are applied and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement."},{"id":"p0314","sectionRef":"§ VII SERVICER RES…
```

- [seq 363](trajectory.jsonl#L363) **drafter → search**

```json
{"query":"terminate","limit":40}
```

- [seq 364](trajectory.jsonl#L364) **search result**

```json
[{"paragraphId":"p0059","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…or by the Issuer to the Indenture Trustee under the Indenture, or that has been terminated."},{"paragraphId":"p0147","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…he Issuer have been paid in full and (ii) the date on which such appointment …
```

- [seq 389](trajectory.jsonl#L389) **drafter → read_section**

```json
{"sectionId":"sec-vii","limit":25}
```

- [seq 390](trajectory.jsonl#L390) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":0,"totalParagraphs":36,"nextCursor":25,"paragraphs":[{"id":"p0313","text":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER"},{"id":"p0314","text":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform …
```

- [seq 391](trajectory.jsonl#L391) **drafter → read_section**

```json
{"sectionId":"sec-viii","limit":25}
```

- [seq 392](trajectory.jsonl#L392) **read_section result**

```json
{"sectionRef":"§ VIII TERMINATION","cursor":0,"totalParagraphs":15,"nextCursor":null,"paragraphs":[{"id":"p0349","text":"ARTICLE VIII TERMINATION"},{"id":"p0350","text":"Section 8.1 Optional Acquisition of Receivables; Clean-Up Redemption of Notes."},{"id":"p0351","text":"(a) Optional Acquisition. On each Payment Date following the last day of a Collection Period as of which the aggregate Princip…
```

- [seq 416](trajectory.jsonl#L416) **drafter → search**

```json
{"query":"convenience OR \"without cause\" OR \"for any reason\" OR \"at any time\" termination","limit":30}
```

- [seq 417](trajectory.jsonl#L417) **search result**

```json
[]
```

- [seq 418](trajectory.jsonl#L418) **drafter → search**

```json
{"query":"resign","limit":20}
```

- [seq 419](trajectory.jsonl#L419) **search result**

```json
[{"paragraphId":"p0018","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER 32 Section 7.1 No Resignation 32 Secti…"},{"paragraphId":"p0018","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","s…
```

- [seq 458](trajectory.jsonl#L458) **drafter → read_section**

```json
{"sectionId":"sec-vii","cursor":25,"limit":15}
```

- [seq 459](trajectory.jsonl#L459) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":25,"totalParagraphs":36,"nextCursor":null,"paragraphs":[{"id":"p0338","text":"delinquencies in payments by Obligors, any Written-Off Receivables and any other information related to the Obligors and the Receivables required by Cellco to service the accounts of which any Receivables are a part, including, but n…
```

- [seq 460](trajectory.jsonl#L460) **drafter → search**

```json
{"query":"Servicing Fee paid in advance monthly","limit":15}
```

- [seq 461](trajectory.jsonl#L461) **search result**

```json
[]
```

- [seq 490](trajectory.jsonl#L490) **drafter → search**

```json
{"query":"Servicing Fee","limit":15}
```

- [seq 491](trajectory.jsonl#L491) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…mounts payable as principal of or interest on the Notes, all amounts payable as Servicing Fees under this Agreement and all other amounts payable by the Issuer under the Tra…"},{"paragraphId":"p0120","sectionRef":"§ III SERVICING OF RECEIVABLES","snipp…
```

- [seq 492](trajectory.jsonl#L492) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"Customer convenience termination on 30 days' notice with pro-rata refund of prepaid fees; servicing agreement in ABS structure"}
```

- [seq 493](trajectory.jsonl#L493) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 522](trajectory.jsonl#L522) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add an Issuer right to terminate for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no right to exit this servicing arrangement other than for a Servicer Termination Event, so we add a convenience termination right on thirty (30) days' notice with a pro rata refund of any prepaid Servicing Fees. Section 7.1 already prevents the Servicer from walking away mid-term, so no change is needed there; we can discuss a longer notice period if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0328","numbering":"Section 7.2A","text":"Termination for Convenience. The Issuer may terminate this Agreement, and the Servicer's rights and obligations under this Agreement, for convenience and without cause, upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}
```

- [seq 523](trajectory.jsonl#L523) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0328","segments":[{"type":"equal","text":"(d) Waiver of Servicer Termination Events. The Noteholders of a majority of the Note Balance of the Controlling Class or, if no Notes are Outstanding, the Owner Trustee, at the direction of the Class A Certificateholder, may direct the Indenture Trustee to waive a Servicer Termination Event, except with …
```

- [seq 546](trajectory.jsonl#L546) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0314","p0317","p0318","p0327","p0363"],"quote":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.","rationale":"The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: the Servicer may be removed under Section 7.2(c) solely if a Servicer Termination Event occurs and is continuing, and there is no at-will or convenience termination right anywhere for the Issuer or Depositor. The Optional Acquisition and Optional Redemption mechanics in Sections 8.1 and 8.2 are Class A Certificateholder options subject to threshold, date and pricing conditions, not a Customer convenience right. That is the walk-away case of no Customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side is already better than both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so the preferred no-Vendor-convenience element is already met and we do not touch it (adopting the fallback would actually give the Servicer an end-of-term convenience right it does not have today). We therefore target preferred and add only the missing Customer convenience right on 30 days' notice with a pro rata refund of prepaid Servicing Fees; the new termination feeds the existing Successor Servicer machinery in Section 7.4, which triggers whenever the Servicer \"is terminated under this Agreement\". Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.","confidence":0.78,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]},"proposal":{"level":"preferred","summary":"Add an Issuer right to terminate for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no right to exit this servicing arrangement other than for a Servicer Termination Event, so we add a convenience termination right on thirty (30) days' notice with a pro rata refund of any prepaid Servicing Fees. Section 7.1 already prevents the Servicer from walking away mid-term, so no change is needed there; we can discuss a longer notice period if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0328","numbering":"Section 7.2A","text":"Termination for Convenience. The Issuer may terminate this Agreement, and the Servicer's rights and obligations under this Agreement, for convenience and without cause, upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}}
```

- [seq 547](trajectory.jsonl#L547) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 642](trajectory.jsonl#L642) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0329","p0341"]}
```

- [seq 643](trajectory.jsonl#L643) **read_paragraphs result**

```json
[{"id":"p0329","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"Section 7.3 Continue to Perform. If the Servicer resigns under Section 7.1, it will continue to perform its obligations as Servicer under this Agreement until the earlier to occur of (a) a Successor Servicer accepting its engagement as Servicer under Section 7.4 or (b) the date the Servicer is leg…
```

- [seq 680](trajectory.jsonl#L680) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add numbered Section 7.2A giving the Issuer (as customer) a convenience termination right on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no right to exit this servicing arrangement other than for a Servicer Termination Event, so we add a new Section 7.2A allowing us, as the customer under this Agreement, to terminate for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. Section 7.1 already prevents the Servicer from walking away mid-term, so no change is needed there; we can discuss a longer notice period if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"Section 7.2A Termination for Convenience. The Issuer, as the customer under this Agreement, may terminate this Agreement, and the Servicer's rights and obligations under this Agreement, for convenience and without cause, upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}
```

- [seq 681](trajectory.jsonl#L681) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0328","segments":[{"type":"equal","text":"(d) Waiver of Servicer Termination Events. The Noteholders of a majority of the Note Balance of the Controlling Class or, if no Notes are Outstanding, the Owner Trustee, at the direction of the Class A Certificateholder, may direct the Indenture Trustee to waive a Servicer Termination Event, except with …
```

- [seq 712](trajectory.jsonl#L712) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0314","p0318","p0327","p0329","p0363"],"quote":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.","rationale":"The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: under Section 7.2(c) the Servicer may be removed solely \"[i]f a Servicer Termination Event occurs and is continuing\", and no at-will or convenience termination right exists anywhere for the Issuer or Depositor, who are the customer side here. The Optional Acquisition and Optional Redemption in Sections 8.1 and 8.2 are conditional Class A Certificateholder options (10% pool threshold; February 2021 date plus Make-Whole Payment; Administrator consent), not a customer convenience right. That is the walk-away case of no customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side already exceeds both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so that preferred element is already met and is left untouched (moving to the fallback would hand the Servicer an end-of-term convenience right it does not have). I therefore target preferred and insert only the missing customer convenience right, numbered Section 7.2A so Article VII cross-references stay clean. The new termination is a termination \"under this Agreement\", so it feeds the existing Section 7.4 Successor Servicer machinery; Section 7.3 confirms effectiveness is \"the date stated in the notice of termination\" and is not conditioned on a Successor Servicer accepting engagement, so the 30-day notice operates as drafted. Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.","confidence":0.79,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]},"proposal":{"level":"preferred","summary":"Add numbered Section 7.2A giving the Issuer (as customer) a convenience termination right on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no right to exit this servicing arrangement other than for a Servicer Termination Event, so we add a new Section 7.2A allowing us, as the customer under this Agreement, to terminate for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. Section 7.1 already prevents the Servicer from walking away mid-term, so no change is needed there; we can discuss a longer notice period if that is easier.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"Section 7.2A Termination for Convenience. The Issuer, as the customer under this Agreement, may terminate this Agreement, and the Servicer's rights and obligations under this Agreement, for convenience and without cause, upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}}
```

- [seq 713](trajectory.jsonl#L713) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 806](trajectory.jsonl#L806) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}
```

- [seq 807](trajectory.jsonl#L807) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0328","segments":[{"type":"equal","text":"(d) Waiver of Servicer Termination Events. The Noteholders of a majority of the Note Balance of the Controlling Class or, if no Notes are Outstanding, the Owner Trustee, at the direction of the Class A Certificateholder, may direct the Indenture Trustee to waive a Servicer Termination Event, except with …
```

- [seq 837](trajectory.jsonl#L837) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0314","p0318","p0327","p0329","p0363"],"quote":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.","rationale":"The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: under Section 7.2(c) the Servicer may be removed solely \"[i]f a Servicer Termination Event occurs and is continuing\", and no at-will or convenience right exists anywhere for the Issuer or Depositor, who are the customer side here. The Optional Acquisition and Optional Redemption in Sections 8.1 and 8.2 are conditional Class A Certificateholder options (10% pool threshold; February 2021 date plus Make-Whole Payment; Administrator consent), not a customer convenience right. That is the walk-away case of no customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side already exceeds both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so that preferred element is already met and is left untouched (moving to the fallback would hand the Servicer an end-of-term convenience right it does not have). I therefore target preferred and insert only the missing customer convenience right, drafted as a new Section 7.2(e) removal that reaches the Servicer's rights and obligations under this Agreement. Drafting it inside Section 7.2 means it is a removal \"pursuant to this Section 7.2\", so the Cellco reassumption in Section 7.2(c) and the Successor Servicer machinery in Section 7.4 engage, and it leaves the exhaustive Agreement-level termination triggers in Section 8.3 intact rather than contradicting them. Section 7.3 confirms effectiveness is \"the date stated in the notice of termination\" and is not conditioned on a Successor Servicer accepting engagement, so the 30-day notice operates as drafted. Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]},"proposal":"{\"level\": \"preferred\", \"summary\": \"Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees\", \"comment\": \"[Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.\", \"ops\": [{\"kind\": \"insert_after\", \"paragraphId\": \"p0328\", \"text\": \"(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination.\"}]"}
```

- [seq 838](trajectory.jsonl#L838) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"object\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"proposal\"\n ],\n \"message\": \"Invalid input: expected object, received string\"\n }\n]"}
```

- [seq 873](trajectory.jsonl#L873) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0314","p0318","p0327","p0329","p0363"],"quote":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.","rationale":"The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: under Section 7.2(c) the Servicer may be removed solely if a Servicer Termination Event occurs and is continuing, and no at-will or convenience right exists anywhere for the Issuer or Depositor, who are the customer side here. The Optional Acquisition and Optional Redemption in Sections 8.1 and 8.2 are conditional Class A Certificateholder options (10% pool threshold; February 2021 date plus Make-Whole Payment; Administrator consent), not a customer convenience right. That is the walk-away case of no customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side already exceeds both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so that preferred element is already met and is left untouched (moving to the fallback would hand the Servicer an end-of-term convenience right it does not have). I therefore target preferred and insert only the missing customer convenience right, drafted as a new Section 7.2(e) removal reaching the Servicer's rights and obligations under this Agreement. Placing it inside Section 7.2 makes it a removal pursuant to that Section, so the Cellco reassumption in Section 7.2(c) and the Successor Servicer machinery in Section 7.4 engage, and it leaves the exhaustive Agreement-level termination triggers in Section 8.3 intact rather than contradicting them. Section 7.3 confirms effectiveness is the date stated in the notice of termination and is not conditioned on a Successor Servicer accepting engagement. Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.","confidence":0.8,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]},"proposal":{"level":"preferred","summary":"Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}}
```

- [seq 874](trajectory.jsonl#L874) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

- [seq 957](trajectory.jsonl#L957) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0334","p0326"]}
```

- [seq 958](trajectory.jsonl#L958) **read_paragraphs result**

```json
[{"id":"p0334","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"(i) If the Servicer resigns or is terminated under this Agreement, the Indenture Trustee will promptly engage an institution having a net worth of not less than $50,000,000 whose regular business and operations includes the servicing of consumer receivables and can accommodate the servicing of dev…
```

- [seq 959](trajectory.jsonl#L959) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}
```

- [seq 960](trajectory.jsonl#L960) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0328","segments":[{"type":"equal","text":"(d) Waiver of Servicer Termination Events. The Noteholders of a majority of the Note Balance of the Controlling Class or, if no Notes are Outstanding, the Owner Trustee, at the direction of the Class A Certificateholder, may direct the Indenture Trustee to waive a Servicer Termination Event, except with …
```

- [seq 984](trajectory.jsonl#L984) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0314","p0318","p0327","p0329","p0334","p0363"],"quote":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.","rationale":"The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: under Section 7.2(c) the Servicer may be removed solely if a Servicer Termination Event occurs and is continuing, and no at-will or convenience right exists anywhere for the Issuer or Depositor, who are the customer side here. The Optional Acquisition and Optional Redemption in Sections 8.1 and 8.2 are conditional Class A Certificateholder options (10% pool threshold; February 2021 date plus Make-Whole Payment; Administrator consent), not a customer convenience right. That is the walk-away case of no customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side already exceeds both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so that preferred element is already met and is left untouched (moving to the fallback would hand the Servicer an end-of-term convenience right it does not have). I therefore target preferred and insert only the missing customer convenience right, drafted as a new Section 7.2(e) removal reaching the Servicer's rights and obligations under this Agreement. Placing it inside Section 7.2 makes it a removal pursuant to that Section, so the Cellco reassumption in Section 7.2(c) engages, and Section 7.4(a)(i) is triggered whenever the Servicer \"resigns or is terminated under this Agreement\", which is party-agnostic and needs no conforming language for an Issuer-initiated removal. Section 8.3's Agreement-level triggers are untouched, and Section 7.3 fixes effectiveness at the date stated in the notice of termination. Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.","confidence":0.81,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may terminate the Agreement or an Order Form for convenience.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's convenience termination requires no more than 30 days' written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor refunds prepaid fees pro rata after Customer's convenience termination.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor has no right to terminate for convenience during a committed term.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]},"proposal":{"level":"preferred","summary":"Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees","comment":"[Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.","ops":[{"kind":"insert_after","paragraphId":"p0328","text":"(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."}]}}
```

- [seq 985](trajectory.jsonl#L985) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1026](trajectory.jsonl#L1026)
- Finding: `f-t4c-5fc74b00` · **needs_review** · confidence 0.81
- Location: § VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER
- Quote: “Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement.”
- Rationale: The Agreement runs until the last Receivable is paid in full or the Issuer is terminated (Section 8.3), a multi-year term. Our only exit is cause-based: under Section 7.2(c) the Servicer may be removed solely if a Servicer Termination Event occurs and is continuing, and no at-will or convenience right exists anywhere for the Issuer or Depositor, who are the customer side here. The Optional Acquisition and Optional Redemption in Sections 8.1 and 8.2 are conditional Class A Certificateholder options (10% pool threshold; February 2021 date plus Make-Whole Payment; Administrator consent), not a customer convenience right. That is the walk-away case of no customer convenience right in a term longer than 12 months, so the fallback is not met on its material terms. The Vendor side already exceeds both levels: Section 7.1 bars the Servicer from resigning except on legal inability, so that preferred element is already met and is left untouched (moving to the fallback would hand the Servicer an end-of-term convenience right it does not have). I therefore target preferred and insert only the missing customer convenience right, drafted as a new Section 7.2(e) removal reaching the Servicer's rights and obligations under this Agreement. Placing it inside Section 7.2 makes it a removal pursuant to that Section, so the Cellco reassumption in Section 7.2(c) engages, and Section 7.4(a)(i) is triggered whenever the Servicer "resigns or is terminated under this Agreement", which is party-agnostic and needs no conforming language for an Issuer-initiated removal. Section 8.3's Agreement-level triggers are untouched, and Section 7.3 fixes effectiveness at the date stated in the notice of termination. Servicing Fees are payable in arrears on each Payment Date, so the refund limb is protective only.
- Proposal: **preferred** — Add Section 7.2(e) letting the Issuer, as customer, remove the Servicer for convenience on 30 days' notice with pro rata refund of prepaid Servicing Fees
- Comment: [Playbook] We have no exit other than for a Servicer Termination Event, so we add a new Section 7.2(e) allowing us, as the customer, to remove the Servicer for convenience on thirty (30) days' written notice with a pro rata refund of any prepaid Servicing Fees. We have drafted it as a removal under Section 7.2 affecting the Servicer's rights and obligations only, so the Cellco reassumption, Continue to Perform and Successor Servicer mechanics engage and Section 8.3 is untouched; Section 7.1 already prevents the Servicer from walking away mid-term.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "paragraphId": "p0328",
    "text": "(e) Termination for Convenience. The Issuer, as the customer under this Agreement, may, for convenience and without cause, remove the Servicer and terminate the Servicer's rights and obligations under this Agreement upon thirty (30) days' prior written notice to the Servicer, and the Servicer will refund, pro rata, any Servicing Fees paid in advance for any period after the effective date of the termination."
  }
]
```

### Verifier and repair feedback

- [seq 604](trajectory.jsonl#L604) **Verdict: fail** — Customer convenience termination present: failed Preferred level is position-complete: the single inserted sentence supplies the Customer convenience right, the 30-day written notice, and the express pro rata refund of prepaid Servicing Fees, while retained Section 7.1 already denies the Servicer any convenience exit. The deterministic check "Customer convenience termination present: false" reflects the ORIGINAL text (and a literal search for the alias "Customer"); the operative party here is the defined "Issuer". Inspected in substance, the rendered redline plainly contains an unconditional Issuer election to terminate for convenience, so the finding of deviation on the original and completeness of the redline both stand. Minimality holds: nothing is deleted, no survival tail, expense, procedure or damages language is added, and the drafter correctly dropped the model clause's "in whole or in part" (no Order Form or partial-termination structure exists here). The added phrase "and the Servicer's rights and obligations under this Agreement" tracks the existing Section 7.2(c) removal formula so the new termination feeds the Section 7.4 Successor Servicer machinery, so it is functional rather than cosmetic. Intent is preserved: the for-cause removal mechanics in Section 7.2(c)-(d), the Section 7.1 resignation bar, and the Section 8.3 natural termination trigger all survive without contradiction, and no defined term or cross-reference is left dangling. Housekeeping only (not an element defect): the insertion is rendered without a section number. Number it (e.g. Section 7.3) or state where it sits so later cross-references to Article VII remain clean. Optional confirmation, not required for completeness: verify that Section 7.4 conditions effectiveness of any termination on appointment of a Successor Servicer; if it does, the 30-day notice will operate subject to that, which is consistent with the retained structure and should be flagged to the client rather than redlined. Fallback is not independently complete because the notice period is 30 days rather than 60–90; this is more favourable to us and is irrelevant given the preferred level is met. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 605](trajectory.jsonl#L605) **Repair round 1**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nVerifier reasons:\n- Preferred level is position-complete: the single inserted sentence supplies the Customer convenience right, the 30-day written notice, and the express pro rata refund of prepaid Servicing Fees, while retained Section 7.1 already denies the Servicer any convenience exit.\n- The deterministic check \"Customer convenience termination present: false\" reflects the ORIGINAL text (and a literal search for the alias \"Customer\"); the operative party here is the defined \"Issuer\". Inspected in substance, the rendered redline plainly contains an unconditional Issuer election to terminate for convenience, so the finding of deviation on the original and completeness of the redline both stand.\n- Minimality holds: nothing is deleted, no survival tail, expense, procedure or damages language is added, and the drafter correctly dropped the model clause's \"in whole or in part\" (no Order Form or partial-termination structure exists here). The added phrase \"and the Servicer's rights and obligations under this Agreement\" tracks the existing Section 7.2(c) removal formula so the new termination feeds the Section 7.4 Successor Servicer machinery, so it is functional rather than cosmetic.\n- Intent is preserved: the for-cause removal mechanics in Section 7.2(c)-(d), the Section 7.1 resignation bar, and the Section 8.3 natural termination trigger all survive without contradiction, and no defined term or cross-reference is left dangling.\n- Housekeeping only (not an element defect): the insertion is rendered without a section number. Number it (e.g. Section 7.3) or state where it sits so later cross-references to Article VII remain clean.\n- Optional confirmation, not required for completeness: verify that Section 7.4 conditions effectiveness of any termination on appointment of a Successor Servicer; if it does, the 30-day notice will operate subject to that, which is consistent with the retained structure and should be flagged to the client rather than redlined.\n- Fallback is not independently complete because the notice period is 30 days rather than 60–90; this is more favourable to us and is irrelevant given the preferred level is met."
- [seq 776](trajectory.jsonl#L776) **Verdict: fail** — Customer convenience termination present: failed Preferred level is complete on the operative text: Section 7.2A supplies the Customer convenience right, the 30-day written notice and the pro rata prepaid-fee refund, and retained Section 7.1 already denies the Servicer any resignation/convenience right during the term. The fallback is not met only because the notice period is 30 days rather than 60–90; that is immaterial since the preferred level is complete, and staying at preferred correctly avoids gifting the Servicer an end-of-term convenience right it does not have. Minimality is satisfied: the change is a single concise insertion with no deletions, no survival tail, no at-own-expense or procedural boilerplate, and it correctly omits the model language's "in whole or in part" (no Order Form or partial-termination structure exists here). The appositive "as the customer under this Agreement" and "without cause" are descriptive only and impose no new obligation. Intent fails on a contradictory retained sentence: Section 8.3 provides that "This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full ... and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement" — an exhaustive statement of when the Agreement ends. Section 7.2A purports to terminate "this Agreement" on 30 days' notice, which directly conflicts. Repair in operative language: either add to Section 8.3 the words "unless earlier terminated in accordance with Section 7.2A", or narrow Section 7.2A to terminate only "the Servicer's rights and obligations under this Agreement" (which is all the checklist requires and matches the Section 7.2(c) removal construct). Second intent defect to repair: Section 7.2(c) provides that Cellco reassumes the Receivables-acquisition obligations "immediately upon the removal of Cellco as Servicer pursuant to this Section 7.2", and the Successor Servicer machinery in Section 7.4 is triggered by resignation/removal under Sections 7.1 and 7.2. A termination under a new, separately numbered Section 7.2A is not a removal "pursuant to this Section 7.2" and may fall outside those triggers. Fix by drafting the new right as Section 7.2(e) (or expressly deeming termination under it a removal under Section 7.2 for purposes of Sections 7.2(c), 7.3 and 7.4) so the Successor Servicer and Cellco reassumption mechanics engage. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 777](trajectory.jsonl#L777) **Repair round 2**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nIntent defect: restore unrelated commercial language and remove contradictions introduced by the redline.\n\nVerifier reasons:\n- Preferred level is complete on the operative text: Section 7.2A supplies the Customer convenience right, the 30-day written notice and the pro rata prepaid-fee refund, and retained Section 7.1 already denies the Servicer any resignation/convenience right during the term.\n- The fallback is not met only because the notice period is 30 days rather than 60–90; that is immaterial since the preferred level is complete, and staying at preferred correctly avoids gifting the Servicer an end-of-term convenience right it does not have.\n- Minimality is satisfied: the change is a single concise insertion with no deletions, no survival tail, no at-own-expense or procedural boilerplate, and it correctly omits the model language's \"in whole or in part\" (no Order Form or partial-termination structure exists here). The appositive \"as the customer under this Agreement\" and \"without cause\" are descriptive only and impose no new obligation.\n- Intent fails on a contradictory retained sentence: Section 8.3 provides that \"This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full ... and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement\" — an exhaustive statement of when the Agreement ends. Section 7.2A purports to terminate \"this Agreement\" on 30 days' notice, which directly conflicts. Repair in operative language: either add to Section 8.3 the words \"unless earlier terminated in accordance with Section 7.2A\", or narrow Section 7.2A to terminate only \"the Servicer's rights and obligations under this Agreement\" (which is all the checklist requires and matches the Section 7.2(c) removal construct).\n- Second intent defect to repair: Section 7.2(c) provides that Cellco reassumes the Receivables-acquisition obligations \"immediately upon the removal of Cellco as Servicer pursuant to this Section 7.2\", and the Successor Servicer machinery in Section 7.4 is triggered by resignation/removal under Sections 7.1 and 7.2. A termination under a new, separately numbered Section 7.2A is not a removal \"pursuant to this Section 7.2\" and may fall outside those triggers. Fix by drafting the new right as Section 7.2(e) (or expressly deeming termination under it a removal under Section 7.2 for purposes of Sections 7.2(c), 7.3 and 7.4) so the Successor Servicer and Cellco reassumption mechanics engage."
- [seq 929](trajectory.jsonl#L929) **Verdict: fail** — Customer convenience termination present: failed Position-complete at the preferred level: the single inserted Section 7.2(e) supplies the Customer convenience right, the 30-day written notice, and the pro rata prepaid-fee refund, and retained Section 7.1 already denies the Servicer any convenience exit. The deterministic "Customer convenience termination present" miss is a wording artefact, not a substantive gap: the insertion terminates the Servicer's rights and obligations under the Agreement at the Issuer's unconditional election, which is the vendor-side exit the rule protects. Terminating the whole Agreement was not available without contradicting the exhaustive Section 8.3 triggers, so the targeted removal is the correct implementation. Minimality holds: one concise insertion, no deletions, no re-drafting of Sections 7.1, 7.2(c)-(d), 7.3 or 8.3, and none of the usual model-language extras (no "in whole or in part" surplus, no survival tail, no at-own-expense or procedural add-ons). The apposition "as the customer under this Agreement" is descriptive filler that could be trimmed ("customer" is not a defined term here), but it imposes no obligation and does not create a dangling reference. Intent preserved: Section 7.3 already fixes effectiveness at "the date stated in the notice of termination" for any termination, so the 30-day notice operates without conflict; the Section 7.2(c) Cellco reassumption is drafted to fire on any "removal ... pursuant to this Section 7.2" and therefore engages consistently and in the Customer's favour; Section 8.3's Agreement-level triggers are untouched. Residual point to confirm outside the four elements (not a checklist defect): Section 7.4's Successor Servicer machinery and the Indenture's covenants were not supplied in full, so the drafter should verify that a removal initiated by the Issuer rather than the Indenture Trustee does not require conforming language in Section 7.4(a)(i) or Rating Agency/Indenture Trustee notice, to avoid a later argument that the new right is inoperative. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.
- [seq 930](trajectory.jsonl#L930) **Repair round 3**: "Deterministic failures:\n- Customer convenience termination present: failed\n\nVerifier reasons:\n- Position-complete at the preferred level: the single inserted Section 7.2(e) supplies the Customer convenience right, the 30-day written notice, and the pro rata prepaid-fee refund, and retained Section 7.1 already denies the Servicer any convenience exit.\n- The deterministic \"Customer convenience termination present\" miss is a wording artefact, not a substantive gap: the insertion terminates the Servicer's rights and obligations under the Agreement at the Issuer's unconditional election, which is the vendor-side exit the rule protects. Terminating the whole Agreement was not available without contradicting the exhaustive Section 8.3 triggers, so the targeted removal is the correct implementation.\n- Minimality holds: one concise insertion, no deletions, no re-drafting of Sections 7.1, 7.2(c)-(d), 7.3 or 8.3, and none of the usual model-language extras (no \"in whole or in part\" surplus, no survival tail, no at-own-expense or procedural add-ons). The apposition \"as the customer under this Agreement\" is descriptive filler that could be trimmed (\"customer\" is not a defined term here), but it imposes no obligation and does not create a dangling reference.\n- Intent preserved: Section 7.3 already fixes effectiveness at \"the date stated in the notice of termination\" for any termination, so the 30-day notice operates without conflict; the Section 7.2(c) Cellco reassumption is drafted to fire on any \"removal ... pursuant to this Section 7.2\" and therefore engages consistently and in the Customer's favour; Section 8.3's Agreement-level triggers are untouched.\n- Residual point to confirm outside the four elements (not a checklist defect): Section 7.4's Successor Servicer machinery and the Indenture's covenants were not supplied in full, so the drafter should verify that a removal initiated by the Issuer rather than the Indenture Trustee does not require conforming language in Section 7.4(a)(i) or Rating Agency/Indenture Trustee notice, to avoid a later argument that the new right is inoperative."
- [seq 1027](trajectory.jsonl#L1027) **Verdict: fail** — Customer convenience termination present: failed Position-complete at the preferred level: the single inserted Section 7.2(e) supplies the Customer convenience right, the 30-day notice, and the pro rata prepaid-fee refund, and retained Section 7.1 already denies the Servicer any convenience exit. The deterministic flag "Customer convenience termination present: false" is a false negative on substance. The insertion grants the Issuer an unconditional, cause-free election to end the Servicer's engagement; that is a convenience right under the rule's own boundary. If the drafter wants belt-and-braces, the phrase "terminate the Servicer's rights and obligations under this Agreement" could be expanded to "...and, at the Issuer's election, this Agreement as it relates to the Servicer", but no repair is required for completeness. Minimality holds: nothing is deleted, no favourable retained language (Section 7.1 No Resignation, Section 7.2(c) Cellco reassumption, Section 7.3, Section 7.4(a)(i), Section 8.3) is touched, no survival tail, expense allocation, procedure or damages language is added, and no duplicate convenience mechanic is created. The descriptor "as the customer under this Agreement" is a short identifying gloss rather than an added operative requirement. Intent preserved: placing the right in Section 7.2 makes the exercise a "removal ... pursuant to this Section 7.2", so the Cellco reassumption sentence, the Section 7.3 continue-to-perform date-stated-in-notice mechanic, and the party-agnostic Section 7.4(a)(i) Successor Servicer engagement all engage without conforming edits; Section 8.3's Agreement-level triggers and the Section 8.1/8.2 Certificateholder options are untouched, leaving no dangling cross-reference, undefined term, or contradictory retained sentence. Deviation finding is correct: before the edit the only Customer-side exit was cause-based removal on a continuing Servicer Termination Event under Section 7.2(c), in a term running until the last Receivable is paid (Section 8.3) — walk-away territory under this rule. Fallback is deliberately not targeted and is not met (30 days is shorter than the 60–90 day band); that is a Customer-favourable overshoot within the preferred position and not a defect. Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":false}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 359](trajectory.jsonl#L359)

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
{"ruleId":"RENEWAL","candidateSectionIds":["sec-viii","sec-v"],"candidateParagraphIds":["p0363","p0252"],"likelyAbsent":true,"note":"No auto-renewal or non-renewal notice window; the deal runs to the Section 8.3 termination trigger (p0363). Confirm against Article VIII and record as not applicable to this term structure."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 375](trajectory.jsonl#L375) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0363","p0252"]}
```

- [seq 376](trajectory.jsonl#L376) **read_paragraphs result**

```json
[{"id":"p0363","sectionRef":"§ VIII TERMINATION","text":"Section 8.3 Termination. This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full, settled, sold or written off and any amounts received are applied and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement."},{"id":"p0252","sectionRef":"§ V DEPOSITOR","te…
```

- [seq 377](trajectory.jsonl#L377) **drafter → search**

```json
{"query":"automatically renew renewal term"}
```

- [seq 378](trajectory.jsonl#L378) **search result**

```json
[]
```

- [seq 404](trajectory.jsonl#L404) **drafter → search**

```json
{"query":"renew"}
```

- [seq 405](trajectory.jsonl#L405) **search result**

```json
[]
```

- [seq 406](trajectory.jsonl#L406) **drafter → search**

```json
{"query":"term of this Agreement"}
```

- [seq 407](trajectory.jsonl#L407) **search result**

```json
[{"paragraphId":"p0252","sectionRef":"§ V DEPOSITOR","snippet":"Section 5.6 Company Existence. During the term of this Agreement, the Depositor shall keep in full force and effect its existence, rights and fr…"},{"paragraphId":"p0392","sectionRef":"§ X MISCELLANEOUS","snippet":"…endix A) to clarify an ambiguity, correct an error or correct or supplement any term of this Agreement that may be defe…
```

- [seq 434](trajectory.jsonl#L434) **drafter → read_section**

```json
{"sectionId":"sec-viii"}
```

- [seq 435](trajectory.jsonl#L435) **read_section result**

```json
{"sectionRef":"§ VIII TERMINATION","cursor":0,"totalParagraphs":15,"nextCursor":null,"paragraphs":[{"id":"p0349","text":"ARTICLE VIII TERMINATION"},{"id":"p0350","text":"Section 8.1 Optional Acquisition of Receivables; Clean-Up Redemption of Notes."},{"id":"p0351","text":"(a) Optional Acquisition. On each Payment Date following the last day of a Collection Period as of which the aggregate Princip…
```

- [seq 436](trajectory.jsonl#L436) **drafter → search**

```json
{"query":"extend|extension|expiration|successive|anniversary|price increase","regex":true}
```

- [seq 437](trajectory.jsonl#L437) **search result**

```json
[{"paragraphId":"p0086","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(iv) processing requests for extensions, modifications and adjustments;"},{"paragraphId":"p0091","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(b) Collection of Payments; Extensions and Amendments. The Servicer shall take, or cause to be taken, all actions nec…"},{"paragraphId":"p0098","sectionRef":"§ III …
```

- [seq 470](trajectory.jsonl#L470) **drafter → search**

```json
{"query":"amendment in writing signed"}
```

- [seq 471](trajectory.jsonl#L471) **search result**

```json
[]
```

- [seq 472](trajectory.jsonl#L472) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0392"]}
```

- [seq 473](trajectory.jsonl#L473) **read_paragraphs result**

```json
[{"id":"p0392","sectionRef":"§ X MISCELLANEOUS","text":"(a) Amendments to Clarify and Correct Errors and Defects. The parties may amend this Agreement (including Appendix A) to clarify an ambiguity, correct an error or correct or supplement any term of this Agreement that may be defective or inconsistent with the other terms of this Agreement, or to make Benchmark Replacement Conforming Changes, …
```

- [seq 508](trajectory.jsonl#L508) **drafter → search**

```json
{"query":"Servicing Fee increase adjust rate"}
```

- [seq 509](trajectory.jsonl#L509) **search result**

```json
[]
```

- [seq 510](trajectory.jsonl#L510) **drafter → search**

```json
{"query":"successor Servicer fee not exceed"}
```

- [seq 511](trajectory.jsonl#L511) **search result**

```json
[]
```

- [seq 536](trajectory.jsonl#L536) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0363","p0392"],"quote":"Section 8.3 Termination. This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full, settled, sold or written off and any amounts received are applied and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement.","rationale":"This is a securitization transfer and servicing agreement with no term-and-renewal structure. Searches for \"renew\", \"automatically renew\", \"extension/expiration/successive/anniversary\" and any fee-uplift mechanic returned no renewal provision anywhere: Article VIII (Sections 8.1-8.3) provides only optional acquisition/redemption and a single termination trigger, and Section 8.3 runs the Agreement until the last Receivable is paid in full, settled, sold or written off or the Issuer is terminated under the Trust Agreement. Because there is no automatic renewal, every conditional element of the preferred position (12-month renewal terms, 30-day opt-out, 60-day Vendor reminder, CPI/3% uplift cap) is satisfied vacuously, and there is no non-renewal notice window or price-escalation mechanic that could fall into fallback or walk-away territory (no multi-year auto-renewal, no >90-day notice window). Any extension of the deal would have to be effected by amendment, which Section 10.1(a) frames as an act of \"the parties\", i.e., by mutual written agreement, consistent with the preferred position. Nothing here is adverse to us, so no redline is warranted; we record RENEWAL as not applicable to this term structure.","confidence":0.9}
```

- [seq 537](trajectory.jsonl#L537) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 536](trajectory.jsonl#L536)
- Finding: `f-renewal-57c46a06` · **compliant** · confidence 0.90
- Location: § VIII TERMINATION
- Quote: “Section 8.3 Termination. This Agreement will terminate on the earlier to occur of (a) the date upon which the last remaining Receivable is paid in full, settled, sold or written off and any amounts received are applied and (b) the Issuer is terminated under Section 8.1 of the Trust Agreement.”
- Rationale: This is a securitization transfer and servicing agreement with no term-and-renewal structure. Searches for "renew", "automatically renew", "extension/expiration/successive/anniversary" and any fee-uplift mechanic returned no renewal provision anywhere: Article VIII (Sections 8.1-8.3) provides only optional acquisition/redemption and a single termination trigger, and Section 8.3 runs the Agreement until the last Receivable is paid in full, settled, sold or written off or the Issuer is terminated under the Trust Agreement. Because there is no automatic renewal, every conditional element of the preferred position (12-month renewal terms, 30-day opt-out, 60-day Vendor reminder, CPI/3% uplift cap) is satisfied vacuously, and there is no non-renewal notice window or price-escalation mechanic that could fall into fallback or walk-away territory (no multi-year auto-renewal, no >90-day notice window). Any extension of the deal would have to be effected by amendment, which Section 10.1(a) frames as an act of "the parties", i.e., by mutual written agreement, consistent with the preferred position. Nothing here is adverse to us, so no redline is warranted; we record RENEWAL as not applicable to this term structure.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 396](trajectory.jsonl#L396)

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
{"ruleId":"GOVLAW","candidateSectionIds":["sec-x","sec-p0441"],"candidateParagraphIds":["p0426","p0427","p0429","p0450","p0453","p0455","p0457","p0458","p0463","p0469","p0474","p0476"],"likelyAbsent":false,"note":"Section 10.5 GOVERNING LAW is New York (p0426), Section 10.6 non-exclusive SDNY/New York courts (p0427), Section 10.7 jury waiver (p0429) — within accepted parameters. Section 11.2 dispute resolution (p0450-p0476) adds elective mediation/binding arbitration for reacquisition disputes; confirm it is elective and US-seated."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 422](trajectory.jsonl#L422) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0426","p0427","p0429"]}
```

- [seq 423](trajectory.jsonl#L423) **read_paragraphs result**

```json
[{"id":"p0426","sectionRef":"§ X MISCELLANEOUS","text":"Section 10.5 GOVERNING LAW. THIS AGREEMENT, INCLUDING THE RIGHTS AND DUTIES OF THE PARTIES HERETO, SHALL BE GOVERNED BY, AND CONSTRUED IN ACCORDANCE WITH, THE INTERNAL LAWS OF THE STATE OF NEW YORK (INCLUDING SECTIONS 5-1401 AND 5-1402 OF THE GENERAL OBLIGATIONS LAW OF THE STATE OF NEW YORK, BUT WITHOUT REGARD TO ANY OTHERWISE APPLICABLE CON…
```

- [seq 424](trajectory.jsonl#L424) **drafter → search**

```json
{"query":"governing law jurisdiction courts arbitration"}
```

- [seq 425](trajectory.jsonl#L425) **search result**

```json
[]
```

- [seq 452](trajectory.jsonl#L452) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 453](trajectory.jsonl#L453) **search result**

```json
[{"paragraphId":"p0450","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","snippet":"…refer the matter, at its discretion, to either mediation (including non-binding arbitration) or third-party binding arbitration pursuant to this Section 11.2."},{"paragraphId":"p0450","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","snippet":"… to either mediation (including non…
```

- [seq 454](trajectory.jsonl#L454) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0450","p0453","p0455","p0457","p0458","p0463","p0469","p0474","p0476"]}
```

- [seq 455](trajectory.jsonl#L455) **read_paragraphs result**

```json
[{"id":"p0450","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","text":"(a) If (i) the Issuer or the Indenture Trustee (acting on behalf of the Noteholders) or (ii) any Noteholder or Verified Note Owner requests, by written notice to (x) the Indenture Trustee (which will be forwarded to the related Originator or the Servicer as applicable) or (y) the related Originator or the Ser…
```

- [seq 486](trajectory.jsonl#L486) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0451","p0452","p0454","p0456","p0459","p0460","p0461","p0462","p0464","p0465","p0466","p0467","p0468","p0470","p0471","p0472"]}
```

- [seq 487](trajectory.jsonl#L487) **read_paragraphs result**

```json
[{"id":"p0451","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","text":"Dispute resolution to resolve reacquisition or acquisition requests will be available regardless of whether Noteholders and Note Owners voted to direct an Asset Representations Review or whether the Delinquency Trigger occurred."},{"id":"p0452","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION"…
```

- [seq 518](trajectory.jsonl#L518) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0473","p0475","p0477","p0428"]}
```

- [seq 519](trajectory.jsonl#L519) **read_paragraphs result**

```json
[{"id":"p0473","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","text":"(i) Any mediation or arbitration will be held in New York, New York; and"},{"id":"p0475","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","text":"50"},{"id":"p0477","sectionRef":"§ ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION","text":"[Remainder of Page Left Blank]"},{"id":"p0428","sectio…
```

- [seq 542](trajectory.jsonl#L542) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0426","p0427","p0450","p0473"],"quote":"Section 10.6 Submission to Jurisdiction. Each party submits to the nonexclusive jurisdiction of the United States District Court for the Southern District of New York and of any New York State Court sitting in New York, New York for legal proceedings relating to this Agreement.","rationale":"Section 10.5 (p0426) makes the internal laws of the State of New York the governing law (expressly invoking N.Y. Gen. Oblig. Law §§ 5-1401/5-1402) and even bars amendment to any other governing law, so the preferred law element is satisfied outright. Section 10.6 (p0427) submits both parties to the SDNY and New York State courts sitting in New York, New York, with waiver of venue and forum non conveniens objections; that submission is non-exclusive rather than exclusive, which is a minor shortfall from the preferred wording only and is noted rather than redlined — the forum sits well above the fallback (Delaware/California/London) and nowhere near walk-away territory. The Section 11.2 dispute resolution mechanic (p0450) is elective, available only to a Requesting Party for unresolved reacquisition/acquisition requests after 180 days, and any mediation or arbitration is seated in New York, New York (p0473) under JAMS/AAA rules, so there is no mandatory or foreign-seated arbitration. No redline proposed.","confidence":0.88}
```

- [seq 543](trajectory.jsonl#L543) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 542](trajectory.jsonl#L542)
- Finding: `f-govlaw-79330f7a` · **compliant** · confidence 0.88
- Location: § X MISCELLANEOUS
- Quote: “Section 10.6 Submission to Jurisdiction. Each party submits to the nonexclusive jurisdiction of the United States District Court for the Southern District of New York and of any New York State Court sitting in New York, New York for legal proceedings relating to this Agreement.”
- Rationale: Section 10.5 (p0426) makes the internal laws of the State of New York the governing law (expressly invoking N.Y. Gen. Oblig. Law §§ 5-1401/5-1402) and even bars amendment to any other governing law, so the preferred law element is satisfied outright. Section 10.6 (p0427) submits both parties to the SDNY and New York State courts sitting in New York, New York, with waiver of venue and forum non conveniens objections; that submission is non-exclusive rather than exclusive, which is a minor shortfall from the preferred wording only and is noted rather than redlined — the forum sits well above the fallback (Delaware/California/London) and nowhere near walk-away territory. The Section 11.2 dispute resolution mechanic (p0450) is elective, available only to a Requesting Party for unresolved reacquisition/acquisition requests after 180 days, and any mediation or arbitration is seated in New York, New York (p0473) under JAMS/AAA rules, so there is no mandatory or foreign-seated arbitration. No redline proposed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 399](trajectory.jsonl#L399)

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
{"ruleId":"ASSIGN","candidateSectionIds":["sec-x","sec-v","sec-vii","sec-vi"],"candidateParagraphIds":["p0249","p0348","p0300","p0372","p0021"],"likelyAbsent":false,"note":"Section 10.2 Assignment; Benefit of Agreement; Third-Party Beneficiary sits in Article X (see TOC p0021) — paginate sec-x to capture its paragraph ids. Also Section 5.3 (p0249) and Section 7.6 (p0348) merger/succession permissions and the Servicer's no-delegation-without-consent covenant (p0300)."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 428](trajectory.jsonl#L428) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0249","p0348","p0300","p0372","p0021"]}
```

- [seq 429](trajectory.jsonl#L429) **read_paragraphs result**

```json
[{"id":"p0249","sectionRef":"§ V DEPOSITOR","text":"Section 5.3 Merger, Consolidation, Succession or Assignment. Any Person (a) into which the Depositor is merged or consolidated, (b) resulting from a merger or consolidation to which the Depositor is a party, (c) succeeding to the Depositor's business or (d) that is an Affiliate of the Depositor to whom the Depositor has assigned this Agreement, …
```

- [seq 430](trajectory.jsonl#L430) **drafter → search**

```json
{"query":"Assignment; Benefit of Agreement"}
```

- [seq 431](trajectory.jsonl#L431) **search result**

```json
[{"paragraphId":"p0021","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"ARTICLE X MISCELLANEOUS 42 Section 10.1 Amendments 42 Section 10.2 Assignment; Benefit of Agreement; Third-Party Beneficiary 44 Section 10.3 Notices 44 Section 10.4 Agent for Serv…"},{"paragraphId":"p0405","sectionRef":"§ X MISCELLANEOUS","snippet":"…
```

- [seq 464](trajectory.jsonl#L464) **drafter → read_section**

```json
{"sectionId":"sec-x","limit":12}
```

- [seq 465](trajectory.jsonl#L465) **read_section result**

```json
{"sectionRef":"§ X MISCELLANEOUS","cursor":0,"totalParagraphs":50,"nextCursor":12,"paragraphs":[{"id":"p0390","text":"ARTICLE X MISCELLANEOUS"},{"id":"p0391","text":"Section 10.1 Amendments."},{"id":"p0392","text":"(a) Amendments to Clarify and Correct Errors and Defects. The parties may amend this Agreement (including Appendix A) to clarify an ambiguity, correct an error or correct or supplement…
```

- [seq 466](trajectory.jsonl#L466) **drafter → search**

```json
{"query":"may not assign"}
```

- [seq 467](trajectory.jsonl#L467) **search result**

```json
[]
```

- [seq 496](trajectory.jsonl#L496) **drafter → read_section**

```json
{"sectionId":"sec-x","cursor":12,"limit":10}
```

- [seq 497](trajectory.jsonl#L497) **read_section result**

```json
{"sectionRef":"§ X MISCELLANEOUS","cursor":12,"totalParagraphs":50,"nextCursor":22,"paragraphs":[{"id":"p0402","text":"(g) Noteholder Consent. For any amendment to this Agreement (or Appendix A) requiring the consent of any Noteholders, the Indenture Trustee will, when directed by Issuer Order, notify the Noteholders to request consent and follow its reasonable procedures to obtain consent. It sh…
```

- [seq 498](trajectory.jsonl#L498) **drafter → search**

```json
{"query":"assign","limit":40}
```

- [seq 499](trajectory.jsonl#L499) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…fers of Depositor Transferred Property 1 Section 2.2 Acknowledgement of Further Assignments 3 Section 2.3 Savings Clause 3 Section 2.4 Representations and Warranties …"},{"paragraphId":"p0015","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer'…
```

- [seq 530](trajectory.jsonl#L530) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 531](trajectory.jsonl#L531) **search result**

```json
[]
```

- [seq 532](trajectory.jsonl#L532) **drafter → search**

```json
{"query":"Section 7.4 Successor Servicer"}
```

- [seq 533](trajectory.jsonl#L533) **search result**

```json
[{"paragraphId":"p0018","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"…2 Section 7.2 Servicer Termination Events 33 Section 7.3 Continue to Perform 34 Section 7.4 Successor Servicer 35 Section 7.5 Transition of Servicing 36 Section 7.6 Merger, Consolidation, Su…"},{"paragraphId":"p0332","sectionRef":"§ VII SERVICER RES…
```

- [seq 550](trajectory.jsonl#L550) **drafter → search**

```json
{"query":"Section 7.1 Resignation of Servicer"}
```

- [seq 551](trajectory.jsonl#L551) **search result**

```json
[]
```

- [seq 552](trajectory.jsonl#L552) **drafter → search**

```json
{"query":"is entered into by and among"}
```

- [seq 553](trajectory.jsonl#L553) **search result**

```json
[]
```

- [seq 574](trajectory.jsonl#L574) **drafter → read_section**

```json
{"sectionId":"sec-vii","limit":6}
```

- [seq 575](trajectory.jsonl#L575) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":0,"totalParagraphs":36,"nextCursor":6,"paragraphs":[{"id":"p0313","text":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER"},{"id":"p0314","text":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform i…
```

- [seq 576](trajectory.jsonl#L576) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0332","p0333","p0025","p0026","p0027"]}
```

- [seq 577](trajectory.jsonl#L577) **read_paragraphs result**

```json
[{"id":"p0332","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"Section 7.4 Successor Servicer."},{"id":"p0333","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"(a) Engagement of Successor Servicer; Indenture Trustee to Act."},{"id":"p0025","sectionRef":"§ BACKGROUND","text":"BACKGROUND"},{"id":"p0026","sectionRef":"§ BACKG…
```

- [seq 608](trajectory.jsonl#L608) **drafter → search**

```json
{"query":"Section 7.6"}
```

- [seq 609](trajectory.jsonl#L609) **search result**

```json
[{"paragraphId":"p0018","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"…orm 34 Section 7.4 Successor Servicer 35 Section 7.5 Transition of Servicing 36 Section 7.6 Merger, Consolidation, Succession or Assignment 37"},{"paragraphId":"p0348","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","sn…
```

- [seq 610](trajectory.jsonl#L610) **drafter → search**

```json
{"query":"Issuer, Cellco Partnership d/b/a Verizon Wireless"}
```

- [seq 611](trajectory.jsonl#L611) **search result**

```json
[]
```

- [seq 646](trajectory.jsonl#L646) **drafter → search**

```json
{"query":"TRANSFER AND SERVICING AGREEMENT, dated"}
```

- [seq 647](trajectory.jsonl#L647) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"TRANSFER AND SERVICING AGREEMENT, dated as of January 29, 2020 (this \"Agreement\"), among VERIZON OWNER TRUST 2020-A, a …"},{"paragraphId":"p1009","sectionRef":"§ A-38","snippet":"\"Transfer and Servicing Agreement\" means the Transfer and Servicing…
```

- [seq 648](trajectory.jsonl#L648) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0022","p0023","p0024"]}
```

- [seq 649](trajectory.jsonl#L649) **read_paragraphs result**

```json
[{"id":"p0022","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","text":"ARTICLE XI ASSET REPRESENTATIONS REVIEW; DISPUTE RESOLUTION 47 Section 11.1 Asset Representations Review 47 Section 11.2 Dispute Resolution 47"},{"id":"p0023","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Rece…
```

- [seq 684](trajectory.jsonl#L684) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Require the Issuer's reasonable consent to any Servicer assignment (including to a Cellco Affiliate) and bar assignment to a competitor, leaving the Depositor's Section 5.3 affiliate/successor rights untouched.","comment":"[Playbook] Our position is that the Servicer may not assign without our consent (not unreasonably withheld) and never to a competitor, while we keep our Section 5.3 affiliate and successor rights. We therefore removed the Section 7.6 carve-out that lets Cellco assign to its own Affiliate consent-free and added the Issuer's reasonable consent plus a competitor bar.","ops":[{"kind":"replace","paragraphId":"p0406","oldText":"Except as stated in Sections 5.3, 7.4 and 7.6, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class.","newText":"Except as stated in Sections 5.3 and 7.4, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class, and, for the Servicer, the Issuer, whose consent will not be unreasonably withheld."},{"kind":"insert_after","paragraphId":"p0406","text":"The Servicer may not assign this Agreement to a competitor of the Issuer or the Depositor."}]}
```

- [seq 685](trajectory.jsonl#L685) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0406","segments":[{"type":"equal","text":"(a) Assignment. Except as stated in Sections 5.3"},{"type":"delete","text":", 7.4 and 7.6"},{"type":"insert","text":" and 7.4"},{"type":"equal","text":", this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificatehol…
```

- [seq 716](trajectory.jsonl#L716) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0406","p0249","p0348","p0314"],"quote":"Except as stated in Sections 5.3, 7.4 and 7.6, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class.","rationale":"Section 10.2(a) is the operative assignment clause. Our side is protected on the outbound leg: Section 5.3 (p0249) lets the Depositor pass this Agreement to a merger/consolidation successor, a person succeeding to its business, or an Affiliate, and Section 10.2(a) expressly excepts Section 5.3 from the consent requirement. Section 7.1 (p0314) also bars the Servicer from resigning except on legal inability, so a change of control on our side gives Cellco no exit. The clause fails on the inbound leg. Section 10.2(a) requires consents from the Owner Trustee, Indenture Trustee, Certificateholders and Noteholders, but not from the Issuer or the Depositor, so we hold no consent right over a Servicer assignment; the consent standard is unqualified rather than \"not unreasonably withheld\"; there is no bar on assignment to a competitor; and the Section 7.6 carve-out (p0348) lets Cellco assign to any Cellco Affiliate with no consent or notice at all, which also defeats the fallback requirement that every non-successor assignment need consent. The redline removes the Section 7.6 exception for the Servicer only, adds the Issuer's reasonable consent, and adds a competitor bar, leaving Section 5.3 and the Section 7.4 successor-servicer mechanics intact. Ancillary point noted but not flagged: Section 6.4 (p0300) allows consent-free delegation while Cellco remains Servicer, but delegation does not relieve Cellco of responsibility.","confidence":0.78,"proposal":{"level":"preferred","summary":"Require the Issuer's reasonable consent to any Servicer assignment (including to a Cellco Affiliate) and bar assignment to a competitor, leaving the Depositor's Section 5.3 affiliate/successor rights untouched.","comment":"[Playbook] Our position is that the Servicer may not assign without our consent (not unreasonably withheld) and never to a competitor, while we keep our Section 5.3 affiliate and successor rights. We therefore removed the Section 7.6 carve-out that lets Cellco assign to its own Affiliate consent-free and added the Issuer's reasonable consent plus a competitor bar.","ops":[{"kind":"replace","paragraphId":"p0406","oldText":"Except as stated in Sections 5.3, 7.4 and 7.6, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class.","newText":"Except as stated in Sections 5.3 and 7.4, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class, and, for the Servicer, the Issuer, whose consent will not be unreasonably withheld."},{"kind":"insert_after","paragraphId":"p0406","text":"The Servicer may not assign this Agreement to a competitor of the Issuer or the Depositor."}]},"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer may assign to an affiliate without consent.","status":"already_met","quote":"(d) that is an Affiliate of the Depositor to whom the Depositor has assigned this Agreement, will be the successor to the Depositor under this Agreement."},{"element":"Customer may assign to a successor in a merger, acquisition, or sale of substantially all assets without consent.","status":"already_met","quote":"Any Person (a) into which the Depositor is merged or consolidated, (b) resulting from a merger or consolidation to which the Depositor is a party, (c) succeeding to the Depositor's business"},{"element":"Vendor may not assign without Customer's consent.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's consent to Vendor assignment is not to be unreasonably withheld.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor may never assign to a Customer competitor.","status":"addressed_by_operation","operationIndexes":[2]},{"element":"Customer's change of control gives Vendor no termination right.","status":"already_met","quote":"The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform its obligations under this Agreement."}]}}
```

- [seq 717](trajectory.jsonl#L717) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 716](trajectory.jsonl#L716)
- Finding: `f-assign-f2b1dab4` · **deviation** · confidence 0.78
- Location: § X MISCELLANEOUS
- Quote: “Except as stated in Sections 5.3, 7.4 and 7.6, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class.”
- Rationale: Section 10.2(a) is the operative assignment clause. Our side is protected on the outbound leg: Section 5.3 (p0249) lets the Depositor pass this Agreement to a merger/consolidation successor, a person succeeding to its business, or an Affiliate, and Section 10.2(a) expressly excepts Section 5.3 from the consent requirement. Section 7.1 (p0314) also bars the Servicer from resigning except on legal inability, so a change of control on our side gives Cellco no exit. The clause fails on the inbound leg. Section 10.2(a) requires consents from the Owner Trustee, Indenture Trustee, Certificateholders and Noteholders, but not from the Issuer or the Depositor, so we hold no consent right over a Servicer assignment; the consent standard is unqualified rather than "not unreasonably withheld"; there is no bar on assignment to a competitor; and the Section 7.6 carve-out (p0348) lets Cellco assign to any Cellco Affiliate with no consent or notice at all, which also defeats the fallback requirement that every non-successor assignment need consent. The redline removes the Section 7.6 exception for the Servicer only, adds the Issuer's reasonable consent, and adds a competitor bar, leaving Section 5.3 and the Section 7.4 successor-servicer mechanics intact. Ancillary point noted but not flagged: Section 6.4 (p0300) allows consent-free delegation while Cellco remains Servicer, but delegation does not relieve Cellco of responsibility.
- Proposal: **preferred** — Require the Issuer's reasonable consent to any Servicer assignment (including to a Cellco Affiliate) and bar assignment to a competitor, leaving the Depositor's Section 5.3 affiliate/successor rights untouched.
- Comment: [Playbook] Our position is that the Servicer may not assign without our consent (not unreasonably withheld) and never to a competitor, while we keep our Section 5.3 affiliate and successor rights. We therefore removed the Section 7.6 carve-out that lets Cellco assign to its own Affiliate consent-free and added the Issuer's reasonable consent plus a competitor bar.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Except as stated in Sections 5.3 and 7.4, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class, and, for the Servicer, the Issuer, whose consent will not be unreasonably withheld.",
    "oldText": "Except as stated in Sections 5.3, 7.4 and 7.6, this Agreement may not be assigned by the Depositor or the Servicer without the consent of the Owner Trustee, the Indenture Trustee, the Certificateholders and the Noteholders of at least 66-2/3% of the Note Balance of the Controlling Class.",
    "paragraphId": "p0406"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0406",
    "text": "The Servicer may not assign this Agreement to a competitor of the Issuer or the Depositor."
  }
]
```

### Verifier and repair feedback

- [seq 770](trajectory.jsonl#L770) **Verdict: pass** — Position-complete at the preferred level: all six preferred elements are met in operative language. The outbound leg was already compliant (Section 5.3 affiliate/successor route excepted from Section 10.2(a); Section 7.1 bars Servicer resignation absent legal inability), and the three edits cure the inbound leg (Issuer consent, reasonableness standard, competitor bar) and close the Section 7.6 consent-free Affiliate transfer. The fallback checklist is not satisfied (successor right is no longer mutual; the Section 5.3 affiliate carve-out remains a no-consent non-successor exception; the reasonableness standard is confined to the Issuer's consent for Servicer assignments). That is immaterial to completeness because the preferred level is fully met, and the "deviation" finding status is correct \u2013 in the original text the Section 7.6 Affiliate carve-out, absence of any Issuer consent right and absence of a competitor bar failed the fallback on material terms. Minimality holds. Three targeted operations, each traceable to a selected element: striking "7.6" from the Section 10.2(a) exception list (needed for "Vendor may not assign without Customer's consent"), inserting the Issuer's consent with the not-unreasonably-withheld qualifier (elements 3 and 4), and one short competitor-bar sentence (element 5). No survival tail, no procedure, no notice period, no expense language, no deletion of favourable retained text: Sections 5.3, 7.1, 7.4 and the existing trustee/Noteholder consents are all preserved verbatim. Intent is preserved. The Section 10.2(a) cross-references to Sections 5.3 and 7.4 still resolve, Section 7.6 remains a live successorship-consequence provision (it defines who becomes successor once a permitted merger/succession/assignment occurs) rather than a standing consent-free permission, so no dangling reference or contradictory retained sentence is created. The Section 7.4 Successor Servicer mechanics and the Section 6.4 delegation regime are untouched. Residual points for the drafter (not defects requiring repair, but worth a conforming tweak): (i) because Section 7.6 is no longer excepted, a Cellco merger or consolidation now triggers the full 66-2/3% Controlling Class consent \u2013 if that is broader than intended, add an express successor-only carve-back rather than reinstating the Affiliate limb; (ii) consider conforming Section 7.6's opening words to "Subject to Section 10.2(a)" to remove any argument that it self-authorises an Affiliate assignment; (iii) the added competitor bar has no defined-term anchor for "competitor" \u2013 acceptable as a plain-meaning standard, but a definition would remove interpretive risk. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"successor/affiliate carve-out for Customer present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 402](trajectory.jsonl#L402)

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
{"ruleId":"IP","candidateSectionIds":["sec-ix","sec-iii","sec-vii"],"candidateParagraphIds":["p0374","p0138","p0141","p0142","p0144","p0146","p0147","p0131","p0346"],"likelyAbsent":false,"note":"Section 9.4 Receivables Information (p0374) and the Custodian provisions (p0138-p0147) govern the files and data we own; Section 7.5 (p0346) expressly says the Servicer need not license or assign its processes, models or servicing software — the key direction issue. Also review the data-protection qualifiers at p0131 and p0146 limiting our access."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 440](trajectory.jsonl#L440) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0374","p0346","p0131","p0138","p0141","p0142","p0144","p0146","p0147"]}
```

- [seq 441](trajectory.jsonl#L441) **read_paragraphs result**

```json
[{"id":"p0374","sectionRef":"§ IX OTHER AGREEMENTS","text":"Section 9.4 Receivables Information."},{"id":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"predecessor Servicer and (ii) deliver to the Successor Servicer the Receivable Files and the accounts and records maintained by the Servicer. The Servicer will not be obligated to provide, license or …
```

- [seq 442](trajectory.jsonl#L442) **drafter → search**

```json
{"query":"license grant intellectual property ownership"}
```

- [seq 443](trajectory.jsonl#L443) **search result**

```json
[]
```

- [seq 476](trajectory.jsonl#L476) **drafter → read_section**

```json
{"sectionId":"\"sec-ix\"","limit":40}
```

- [seq 477](trajectory.jsonl#L477) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-ix\""}
```

- [seq 478](trajectory.jsonl#L478) **drafter → search**

```json
{"query":"own ownership property"}
```

- [seq 479](trajectory.jsonl#L479) **search result**

```json
[]
```

- [seq 502](trajectory.jsonl#L502) **drafter → list_sections**

```json
{}
```

- [seq 503](trajectory.jsonl#L503) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 504](trajectory.jsonl#L504) **drafter → search**

```json
{"query":"ownership"}
```

- [seq 505](trajectory.jsonl#L505) **search result**

```json
[{"paragraphId":"p0057","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…y in any jurisdiction to give the Depositor a first priority, validly perfected ownership and security interest in the Originator Transferred Property and the Master Tru…"},{"paragraphId":"p0057","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR…
```

- [seq 526](trajectory.jsonl#L526) **drafter → read_section**

```json
{"sectionId":"sec-ix","limit":30}
```

- [seq 527](trajectory.jsonl#L527) **read_section result**

```json
{"sectionRef":"§ IX OTHER AGREEMENTS","cursor":0,"totalParagraphs":26,"nextCursor":null,"paragraphs":[{"id":"p0364","text":"ARTICLE IX OTHER AGREEMENTS"},{"id":"p0365","text":"Section 9.1 Financing Statements."},{"id":"p0366","text":"(a) Filing of Financing Statements. The Depositor will file financing and continuation statements, and amendments to the statements, in the jurisdictions and with th…
```

- [seq 556](trajectory.jsonl#L556) **drafter → search**

```json
{"query":"license"}
```

- [seq 557](trajectory.jsonl#L557) **search result**

```json
[{"paragraphId":"p0234","sectionRef":"§ V DEPOSITOR","snippet":"…ty company (or is exempt from such requirements) and has obtained all necessary licenses and approvals in each jurisdiction in which the conduct of its business requir…"},{"paragraphId":"p0234","sectionRef":"§ V DEPOSITOR","snippet":"… jurisdiction in which the conduct of its business requires such qualification, licenses or approva…
```

- [seq 558](trajectory.jsonl#L558) **drafter → search**

```json
{"query":"software"}
```

- [seq 559](trajectory.jsonl#L559) **search result**

```json
[{"paragraphId":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide …"}]
```

- [seq 580](trajectory.jsonl#L580) **drafter → read_section**

```json
{"sectionId":"sec-vii","cursor":20,"limit":16}
```

- [seq 581](trajectory.jsonl#L581) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":20,"totalParagraphs":36,"nextCursor":null,"paragraphs":[{"id":"p0333","text":"(a) Engagement of Successor Servicer; Indenture Trustee to Act."},{"id":"p0334","text":"(i) If the Servicer resigns or is terminated under this Agreement, the Indenture Trustee will promptly engage an institution having a net worth o…
```

- [seq 582](trajectory.jsonl#L582) **drafter → search**

```json
{"query":"Receivable Files property of the Issuer"}
```

- [seq 583](trajectory.jsonl#L583) **search result**

```json
[]
```

- [seq 620](trajectory.jsonl#L620) **drafter → search**

```json
{"query":"confidential information use"}
```

- [seq 621](trajectory.jsonl#L621) **search result**

```json
[]
```

- [seq 622](trajectory.jsonl#L622) **drafter → search**

```json
{"query":"Monthly Investor Report prepare deliver"}
```

- [seq 623](trajectory.jsonl#L623) **search result**

```json
[]
```

- [seq 652](trajectory.jsonl#L652) **drafter → search**

```json
{"query":"confidentiality"}
```

- [seq 653](trajectory.jsonl#L653) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…ss operations. Any access or review will be subject to the Servicer's security, confidentiality and privacy policies and any regulatory, legal and data protection policies. No…"},{"paragraphId":"p0146","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…ons. Any access or review will be subject to the Custodia…
```

- [seq 654](trajectory.jsonl#L654) **drafter → search**

```json
{"query":"Monthly Investor Report"}
```

- [seq 655](trajectory.jsonl#L655) **search result**

```json
[{"paragraphId":"p0090","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(viii) preparing and providing Monthly Investor Reports and any other periodic reports required to be prepared by the Servicer under t…"},{"paragraphId":"p0122","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(a) Monthly Investor Report."},{"paragraphId":"p0123","sectionRef":"§ III SERVICING OF RECEIVABLES",…
```

- [seq 688](trajectory.jsonl#L688) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0090","p0123","p0375","p0376","p1043","p0139","p0140"]}
```

- [seq 689](trajectory.jsonl#L689) **read_paragraphs result**

```json
[{"id":"p0090","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(viii) preparing and providing Monthly Investor Reports and any other periodic reports required to be prepared by the Servicer under this Agreement or any other Transaction Document."},{"id":"p0123","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(i) On or about the 15th day of each month, and in no case later than at leas…
```

- [seq 690](trajectory.jsonl#L690) **drafter → search**

```json
{"query":"purposes of servicing the Receivables"}
```

- [seq 691](trajectory.jsonl#L691) **search result**

```json
[{"paragraphId":"p0146","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"… will promptly release any document in the Receivable Files to the Servicer for purposes of servicing the Receivables. The Custodian will give the Depositor, the Issuer and the Indenture Trustee ac…"}]
```

- [seq 726](trajectory.jsonl#L726) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a perpetual, irrevocable, worldwide, royalty-free licence for the Issuer to use, modify and sublicense the Servicer's reports, files and records.","comment":"[Playbook] The Agreement gives us no licence to the reports, files and records the Servicer prepares for us, while Section 7.5(b) preserves the Servicer's own processes and software. We have added a short perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those deliverables for our business, which is our fallback position and leaves the Servicer's tools untouched.","ops":[{"kind":"insert_after","paragraphId":"p0376","numbering":"(c)","text":"License to Reports and Records. The Servicer grants the Issuer a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the Monthly Investor Reports, the Receivable Files and the other reports, accounts and records prepared or maintained by the Servicer under this Agreement for the Issuer's business purposes."}]}
```

- [seq 727](trajectory.jsonl#L727) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0376","segments":[{"type":"equal","text":"(b) List of Receivables. If requested by the Owner Trustee or the Indenture Trustee, the Servicer will furnish a list of Receivables (by loan number) to the Owner Trustee and the Indenture Trustee."}]}],"minimality":{"ok":true,"errors":[]}}
```

- [seq 748](trajectory.jsonl#L748) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0346","p0146","p0376","p0374"],"quote":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","rationale":"There is no walk-away problem: nothing assigns our IP or the Receivables data to Cellco, the Receivables are expressly marked as \"owned by the Issuer\" (p0375), the Receivable Files are held for the benefit of the Issuer and Indenture Trustee, and no joint ownership is created. However, the Agreement fails the fallback: the Servicer prepares and delivers Monthly Investor Reports, Receivable Files, accounts and records for us, yet we receive no licence at all in them, while Section 7.5(b) expressly preserves the Servicer's processes, models and servicing software (which satisfies the fallback element allowing Vendor to keep its generic tools and know-how). The Servicer's access to our data is already confined to servicing purposes (p0146), so the only gap is the deliverables licence. We therefore add one short subsection to Section 9.4 granting the Issuer a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those deliverables for its business, without disturbing the Servicer's retained tools.","confidence":0.72,"proposal":{"level":"fallback","summary":"Add a perpetual, irrevocable, worldwide, royalty-free licence for the Issuer to use, modify and sublicense the Servicer's reports, files and records.","comment":"[Playbook] The Agreement gives us no licence to the reports, files and records the Servicer prepares for us, while Section 7.5(b) preserves the Servicer's own processes and software. We have added a short perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those deliverables for our business, which is our fallback position and leaves the Servicer's tools untouched.","ops":[{"kind":"insert_after","paragraphId":"p0376","numbering":"(c)","text":"License to Reports and Records. The Servicer grants the Issuer a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the Monthly Investor Reports, the Receivable Files and the other reports, accounts and records prepared or maintained by the Servicer under this Agreement for the Issuer's business purposes."}]},"elementCoverage":{"level":"fallback","mappings":[{"element":"Vendor may retain ownership of generic tools and know-how.","status":"already_met","quote":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party"},{"element":"Customer's licence to Deliverables is perpetual.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's licence to Deliverables is irrevocable.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's licence to Deliverables is worldwide.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer's licence to Deliverables is royalty-free.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer may use and modify Deliverables for its business.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Customer may sublicense Deliverables for its business.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Any Vendor licence in Customer Data is limited to processing it solely to provide the Services.","status":"already_met","quote":"the Custodian will promptly release any document in the Receivable Files to the Servicer for purposes of servicing the Receivables"}]}}
```

- [seq 749](trajectory.jsonl#L749) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 953](trajectory.jsonl#L953)
- Finding: `f-ip-811e3e75` · **deviation** · confidence 0.72
- Location: § VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER
- Quote: “The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.”
- Rationale: There is no walk-away problem: nothing assigns our IP or the Receivables data to Cellco, the Receivables are expressly marked as "owned by the Issuer" (p0375), the Receivable Files are held for the benefit of the Issuer and Indenture Trustee, and no joint ownership is created. However, the Agreement fails the fallback: the Servicer prepares and delivers Monthly Investor Reports, Receivable Files, accounts and records for us, yet we receive no licence at all in them, while Section 7.5(b) expressly preserves the Servicer's processes, models and servicing software (which satisfies the fallback element allowing Vendor to keep its generic tools and know-how). The Servicer's access to our data is already confined to servicing purposes (p0146), so the only gap is the deliverables licence. We therefore add one short subsection to Section 9.4 granting the Issuer a perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those deliverables for its business, without disturbing the Servicer's retained tools.
- Proposal: **fallback** — Add a perpetual, irrevocable, worldwide, royalty-free licence for the Issuer to use, modify and sublicense the Servicer's reports, files and records.
- Comment: [Playbook] The Agreement gives us no licence to the reports, files and records the Servicer prepares for us, while Section 7.5(b) preserves the Servicer's own processes and software. We have added a short perpetual, irrevocable, worldwide, royalty-free licence to use, modify and sublicense those deliverables for our business, which is our fallback position and leaves the Servicer's tools untouched.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "(c)",
    "paragraphId": "p0376",
    "text": "License to Reports and Records. The Servicer grants the Issuer a perpetual, irrevocable, worldwide, royalty-free license to use, modify and sublicense the Monthly Investor Reports, the Receivable Files and the other reports, accounts and records prepared or maintained by the Servicer under this Agreement for the Issuer's business purposes."
  }
]
```

### Verifier and repair feedback

- [seq 802](trajectory.jsonl#L802) **Verdict: pass** — Fallback is complete: the single inserted subsection supplies every deliverables-licence element (perpetual, irrevocable, worldwide, royalty-free, use/modify/sublicense for the Issuer's business), while retained Section 7.5(b) leaves the Servicer's tools and software owned and unlicensed, and retained Section 3.10(e) confines the Servicer's data access to servicing purposes. Preferred is not complete: there is no ownership or assignment of the reports, accounts and records to the Issuer, and no express 'Issuer retains all rights in Customer Data' sentence in the rendered text. To reach preferred, add (i) 'The Issuer owns all Monthly Investor Reports, Receivable Files, accounts and records prepared for the Issuer under this Agreement, and the Servicer assigns all right, title and interest in them to the Issuer', and (ii) an express retention sentence for the Receivables data. Minimality holds: one concise insertion into Section 9.4, no deletions, no survival tail, no at-own-expense or procedural extras, and no requirement outside the fallback checklist. The licence scope words track the checklist verbatim rather than adding examples. Intent is preserved: the grant runs one way (Servicer to Issuer), does not contradict Section 7.5(b)'s carve-out for processes, models and servicing software (which are not 'reports, accounts and records'), does not disturb the Successor Servicer delivery mechanics, and creates no undefined term or dangling cross-reference. Drafting nit for the drafter, not a failure: the inserted subsection has no letter designation while Section 9.4 uses '(b)'; label it '(c) License to Reports and Records' so internal numbering stays clean. Minor overlap to confirm: the Receivable Files are already held by the Custodian for the benefit of the Issuer, so the licence in them is belt-and-braces rather than duplicative of an existing operative grant; it does not create conflicting title language and so does not defeat minimality. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 563](trajectory.jsonl#L563)

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
{"ruleId":"LICENSE","candidateSectionIds":["sec-vii","sec-iii","sec-ix"],"candidateParagraphIds":["p0346","p0105","p0381"],"likelyAbsent":false,"note":"No affirmative licence grant to us; closest provisions are the Servicer's express refusal to license servicing software or models (p0346) and the revocable power of attorney granted to the Servicer (p0105, referenced at p0381). Evaluate whether the lack of a transition licence is material."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 586](trajectory.jsonl#L586) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0346","p0105","p0381"]}
```

- [seq 587](trajectory.jsonl#L587) **read_paragraphs result**

```json
[{"id":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"predecessor Servicer and (ii) deliver to the Successor Servicer the Receivable Files and the accounts and records maintained by the Servicer. The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successo…
```

- [seq 588](trajectory.jsonl#L588) **drafter → search**

```json
{"query":"license","limit":40}
```

- [seq 589](trajectory.jsonl#L589) **search result**

```json
[{"paragraphId":"p0234","sectionRef":"§ V DEPOSITOR","snippet":"…ty company (or is exempt from such requirements) and has obtained all necessary licenses and approvals in each jurisdiction in which the conduct of its business requir…"},{"paragraphId":"p0234","sectionRef":"§ V DEPOSITOR","snippet":"… jurisdiction in which the conduct of its business requires such qualification, licenses or approva…
```

- [seq 614](trajectory.jsonl#L614) **drafter → search**

```json
{"query":"grants a non-exclusive right to use","limit":30}
```

- [seq 615](trajectory.jsonl#L615) **search result**

```json
[]
```

- [seq 616](trajectory.jsonl#L616) **drafter → search**

```json
{"query":"intellectual property trademark software","limit":30}
```

- [seq 617](trajectory.jsonl#L617) **search result**

```json
[]
```

- [seq 658](trajectory.jsonl#L658) **drafter → search**

```json
{"query":"software","limit":30}
```

- [seq 659](trajectory.jsonl#L659) **search result**

```json
[{"paragraphId":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide …"}]
```

- [seq 660](trajectory.jsonl#L660) **drafter → search**

```json
{"query":"grant","limit":40}
```

- [seq 661](trajectory.jsonl#L661) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…g or is determined not to be an absolute transfer and assignment, the Depositor Grants to the Issuer a security interest in the Depositor's right, title and interest…"},{"paragraphId":"p0059","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRA…
```

- [seq 694](trajectory.jsonl#L694) **drafter → read_section**

```json
{"sectionId":"\"sec-vii\"","cursor":0,"limit":12}
```

- [seq 695](trajectory.jsonl#L695) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"sec-vii\""}
```

- [seq 696](trajectory.jsonl#L696) **drafter → get_definition**

```json
{"term":"Affiliate"}
```

- [seq 697](trajectory.jsonl#L697) **get_definition result**

```json
{"found":true,"term":"Affiliate","paragraphId":"p0579","text":"\"Affiliate\" means, for a specified Person (other than a natural Person), (a) another Person controlling, controlled by or under common control with the specified Person, (b) any other Person beneficially owning or controlling more than fifty percent (50%) of the outstanding voting securities or rights of or interest in the capital, …
```

- [seq 720](trajectory.jsonl#L720) **drafter → list_sections**

```json
{}
```

- [seq 721](trajectory.jsonl#L721) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 722](trajectory.jsonl#L722) **drafter → get_definition**

```json
{"term":"Successor Servicer"}
```

- [seq 723](trajectory.jsonl#L723) **get_definition result**

```json
{"found":true,"term":"Successor Servicer","paragraphId":"p0989","text":"\"Successor Servicer\" has the meaning stated in Section 7.4(a)(i) of the Transfer and Servicing Agreement."}
```

- [seq 744](trajectory.jsonl#L744) **drafter → search**

```json
{"query":"Successor Servicer transition Receivable Files deliver","limit":20}
```

- [seq 745](trajectory.jsonl#L745) **search result**

```json
[]
```

- [seq 766](trajectory.jsonl#L766) **drafter → read_section**

```json
{"sectionId":"sec-vii","cursor":0,"limit":40}
```

- [seq 767](trajectory.jsonl#L767) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":0,"totalParagraphs":36,"nextCursor":null,"paragraphs":[{"id":"p0313","text":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER"},{"id":"p0314","text":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perfor…
```

- [seq 790](trajectory.jsonl#L790) **drafter → search**

```json
{"query":"right to use","limit":20}
```

- [seq 791](trajectory.jsonl#L791) **search result**

```json
[]
```

- [seq 792](trajectory.jsonl#L792) **drafter → search**

```json
{"query":"irrevocable","limit":20}
```

- [seq 793](trajectory.jsonl#L793) **search result**

```json
[]
```

- [seq 831](trajectory.jsonl#L831) **drafter → search**

```json
{"query":"will not be obligated to provide","limit":20}
```

- [seq 832](trajectory.jsonl#L832) **search result**

```json
[{"paragraphId":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"…ble Files and the accounts and records maintained by the Servicer. The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or oth…"}]
```

- [seq 833](trajectory.jsonl#L833) **drafter → search**

```json
{"query":"processes, procedures, models","limit":20}
```

- [seq 834](trajectory.jsonl#L834) **search result**

```json
[{"paragraphId":"p0346","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","snippet":"… Servicer. The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any thir…"}]
```

- [seq 869](trajectory.jsonl#L869) **drafter → lookup_precedent**

```json
{"ruleId":"LICENSE","context":"Servicing agreement; no licence grant; Servicer refuses to license servicing software to Successor Servicer"}
```

- [seq 870](trajectory.jsonl#L870) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 897](trajectory.jsonl#L897) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Convert the Servicer's express refusal to license servicing software into a licence to the Issuer, extended to Issuer Affiliates on written notice and transferable to an M&A successor.","comment":"[Playbook] The Agreement gives us no licence to the Servicer's servicing software, models and processes and expressly disclaims one, so servicing cannot be continued on a servicer transition. We have replaced that disclaimer with a licence to the Issuer covering our Affiliates on written notice and transferable to a successor by merger or acquisition (our fallback position), while preserving the existing carve-out for materials restricted by confidentiality or by legal, regulatory, privacy or data protection policies.","ops":[{"kind":"replace","paragraphId":"p0346","oldText":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","newText":"The Servicer grants the Issuer a license to use its processes, procedures, models, servicing software and other applications to service the Receivables, which license extends to the Issuer's Affiliates on written notice to the Servicer and is transferable to any successor to the Issuer by merger or acquisition; provided that the Servicer need not provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies."}]}
```

- [seq 898](trajectory.jsonl#L898) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0346","segments":[{"type":"equal","text":"predecessor Servicer and (ii) deliver to the Successor Servicer the Receivable Files and the accounts and records maintained by the Servicer. The Servicer "},{"type":"delete","text":"will not be obligated to provide, license or assign"},{"type":"insert","text":"grants the Issuer a license to use"},{"type…
```

- [seq 925](trajectory.jsonl#L925) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0346"],"quote":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","rationale":"The Agreement contains no licence grant in our favour anywhere: searches for \"license\", \"grant\", \"right to use\", \"software\" and \"irrevocable\" return only qualification/regulatory licences, security-interest \"Grants\" (defined at p0763 as a pledge, not an IP licence) and the transition provision at p0346. The only responsive provision is an express refusal: the Servicer \"will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party.\" That is worse than walk-away territory (no licence at all, no path to add Affiliates or a successor), so the fallback fails on its material terms. The power of attorney at p0105 runs from the Issuer to the Servicer and is revocable by us, so it benefits our side and is not flagged. We therefore convert the disclaimer sentence in p0346 into a licence to the Issuer at the fallback level (Affiliates on written notice; transferable to an M&A successor), preserving verbatim the retained carve-out for materials restricted by confidentiality or by legal, regulatory, privacy or data protection policies so no contradictory mechanic survives. We did not add the preferred perpetual/irrevocable, subscription-termination or contractor elements, which have no counterpart in this servicing structure.","confidence":0.72,"elementCoverage":{"level":"fallback","mappings":[{"element":"Customer's affiliates are covered on written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The licence is transferable to a successor in a merger or acquisition transaction.","status":"addressed_by_operation","operationIndexes":[1]}]},"proposal":{"level":"fallback","summary":"Convert the Servicer's express refusal to license servicing software into a licence to the Issuer, extended to Issuer Affiliates on written notice and transferable to an M&A successor.","comment":"[Playbook] The Agreement gives us no licence to the Servicer's servicing software, models and processes and expressly disclaims one, so servicing cannot be continued on a servicer transition. We have replaced that disclaimer with a licence to the Issuer covering our Affiliates on written notice and transferable to a successor by merger or acquisition (our fallback position), while preserving the existing carve-out for materials restricted by confidentiality or by legal, regulatory, privacy or data protection policies.","ops":[{"kind":"replace","paragraphId":"p0346","oldText":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","newText":"The Servicer grants the Issuer a license to use its processes, procedures, models, servicing software and other applications to service the Receivables, which license extends to the Issuer's Affiliates on written notice to the Servicer and is transferable to any successor to the Issuer by merger or acquisition; provided that the Servicer need not provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies."}]}}
```

- [seq 926](trajectory.jsonl#L926) **submit_finding result**

```json
{"ok":false,"errors":["A missing clause must use insert_after operations only"]}
```

- [seq 953](trajectory.jsonl#L953) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0346"],"quote":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","rationale":"The only licence-responsive provision is p0346, and it is an express refusal to license: the Servicer \"will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party.\" Searches for \"license\", \"grant\", \"right to use\", \"software\" and \"irrevocable\" surface nothing else in our favour: the other hits are regulatory qualification licences and security-interest \"Grants\" (defined at p0763 as a pledge, not an IP licence). The power of attorney at p0105 runs from the Issuer to the Servicer and is revocable by us, so it benefits our side and is not flagged. With no grant at all, our Affiliates are excluded with no path to add them and nothing is transferable to a successor, so the clause fails both fallback elements and sits in walk-away territory. We convert the disclaimer sentence into a licence to the Issuer at the fallback level (Affiliates on written notice; transferable to an M&A successor) and keep the retained carve-out for confidentiality- and law-restricted materials verbatim so no contradictory mechanic survives. The preferred perpetual/irrevocable, subscription-termination and contractor elements are not pursued, as this servicing structure has no paid-up or subscription licence construct.","confidence":0.72,"elementCoverage":{"level":"fallback","mappings":[{"element":"Customer's affiliates are covered on written notice.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"The licence is transferable to a successor in a merger or acquisition transaction.","status":"addressed_by_operation","operationIndexes":[1]}]},"proposal":{"level":"fallback","summary":"Convert the Servicer's express refusal to license servicing software into a licence to the Issuer, extended to Issuer Affiliates on written notice and transferable to an M&A successor.","comment":"[Playbook] The Agreement gives us no licence to the Servicer's servicing software, models and processes and expressly disclaims one, so servicing cannot be continued on a servicer transition. We have replaced that disclaimer with a licence to the Issuer covering our Affiliates on written notice and transferable to a successor by merger or acquisition (our fallback position), while preserving the existing carve-out for materials restricted by confidentiality or by legal, regulatory, privacy or data protection policies.","ops":[{"kind":"replace","paragraphId":"p0346","oldText":"The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.","newText":"The Servicer grants the Issuer a license to use its processes, procedures, models, servicing software and other applications to service the Receivables, which license extends to the Issuer's Affiliates on written notice to the Servicer and is transferable to any successor to the Issuer by merger or acquisition; provided that the Servicer need not provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies."}]}}
```

- [seq 954](trajectory.jsonl#L954) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 953](trajectory.jsonl#L953)
- Finding: `f-license-2438dd24` · **deviation** · confidence 0.72
- Location: § VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER
- Quote: “The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.”
- Rationale: The only licence-responsive provision is p0346, and it is an express refusal to license: the Servicer "will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party." Searches for "license", "grant", "right to use", "software" and "irrevocable" surface nothing else in our favour: the other hits are regulatory qualification licences and security-interest "Grants" (defined at p0763 as a pledge, not an IP licence). The power of attorney at p0105 runs from the Issuer to the Servicer and is revocable by us, so it benefits our side and is not flagged. With no grant at all, our Affiliates are excluded with no path to add them and nothing is transferable to a successor, so the clause fails both fallback elements and sits in walk-away territory. We convert the disclaimer sentence into a licence to the Issuer at the fallback level (Affiliates on written notice; transferable to an M&A successor) and keep the retained carve-out for confidentiality- and law-restricted materials verbatim so no contradictory mechanic survives. The preferred perpetual/irrevocable, subscription-termination and contractor elements are not pursued, as this servicing structure has no paid-up or subscription licence construct.
- Proposal: **fallback** — Convert the Servicer's express refusal to license servicing software into a licence to the Issuer, extended to Issuer Affiliates on written notice and transferable to an M&A successor.
- Comment: [Playbook] The Agreement gives us no licence to the Servicer's servicing software, models and processes and expressly disclaims one, so servicing cannot be continued on a servicer transition. We have replaced that disclaimer with a licence to the Issuer covering our Affiliates on written notice and transferable to a successor by merger or acquisition (our fallback position), while preserving the existing carve-out for materials restricted by confidentiality or by legal, regulatory, privacy or data protection policies.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "The Servicer grants the Issuer a license to use its processes, procedures, models, servicing software and other applications to service the Receivables, which license extends to the Issuer's Affiliates on written notice to the Servicer and is transferable to any successor to the Issuer by merger or acquisition; provided that the Servicer need not provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.",
    "oldText": "The Servicer will not be obligated to provide, license or assign its processes, procedures, models, servicing software or other applications to any Successor Servicer or any third party, or provide anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies.",
    "paragraphId": "p0346"
  }
]
```

### Verifier and repair feedback

- [seq 1010](trajectory.jsonl#L1010) **Verdict: pass** — Position-complete at the fallback: both fallback elements are met in operative language (Affiliates on written notice; transfer to an M&A successor), so the redline is sufficient even though the preferred level fails. Preferred level fails on contractors: the grant names only the Issuer and its Affiliates. To reach preferred, insert "and to contractors acting on the Issuer's behalf, including any Successor Servicer", and add "perpetual and irrevocable" (or a termination-only-for-uncured-material-breach limit) since the grant currently has no stated term or revocation standard. Minimality holds: the edit converts the single anti-licence sentence in p0346 into a grant and retains the Servicer-favourable carve-out for materials restricted by transfer/assignment restrictions, confidentiality agreements or legal, regulatory, privacy or data protection policies essentially verbatim. No survival tail, expense, remedy, procedure or personnel/access boilerplate was added, and the scope phrase "to service the Receivables" is an inherent part of defining a licence grant rather than an extra requirement. No duplicate coverage: "Issuer" is a single trust entity and does not itself include Affiliates, so the affiliate extension is not redundant; a separate authorized-personnel edit was correctly omitted. Intent preserved: the delivery obligations in clause (i)/(ii) (Receivable Files, accounts and records) and the restricted-materials carve-out survive without contradiction, and the grant runs in the correct direction (Servicer to Issuer). Repair note (non-fatal): confirm that "Affiliate" is a defined term in the Transfer and Servicing Agreement; it was not returned by the definition resolver, and if undefined the inserted "Issuer's Affiliates" would be a dangling term requiring a definition cross-reference. Practical note for negotiation: because the licence runs to the Issuer only, servicing continuity on a transition depends on the Successor Servicer being able to use it; the contractor language above is the targeted fix and should be offered as the ask before falling back to the current text. Checks: {"name":"operation 1 applies","ok":true}; {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 567](trajectory.jsonl#L567)

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
{"ruleId":"AUDIT","candidateSectionIds":["sec-iii"],"candidateParagraphIds":["p0131","p0146"],"likelyAbsent":false,"note":"Section 3.6 Review of Servicer's Records (p0131) is an audit right running in our favour, qualified by the Servicer's security/confidentiality/privacy policies; p0146 applies the same limits to the Custodian. No audit right against us was found; assess only whether the policy qualifiers gut our access."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 592](trajectory.jsonl#L592) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0131","p0146"]}
```

- [seq 593](trajectory.jsonl#L593) **read_paragraphs result**

```json
[{"id":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"Section 3.6 Review of Servicer's Records. The Servicer will maintain records and documents relating to its performance under this Agreement according to its customary business practices. Upon reasonable request not more than once during any calendar year, and with reasonable notice, the Servicer will give the Issuer, the Deposit…
```

- [seq 594](trajectory.jsonl#L594) **drafter → search**

```json
{"query":"audit"}
```

- [seq 595](trajectory.jsonl#L595) **search result**

```json
[]
```

- [seq 626](trajectory.jsonl#L626) **drafter → search**

```json
{"query":"inspect"}
```

- [seq 627](trajectory.jsonl#L627) **search result**

```json
[]
```

- [seq 628](trajectory.jsonl#L628) **drafter → search**

```json
{"query":"examine records"}
```

- [seq 629](trajectory.jsonl#L629) **search result**

```json
[]
```

- [seq 630](trajectory.jsonl#L630) **drafter → search**

```json
{"query":"access to the records"}
```

- [seq 631](trajectory.jsonl#L631) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…strator, the Owner Trustee and the Indenture Trustee (or their representatives) access to the records and documents to conduct a review of the Servicer's performance under this Agre…"}]
```

- [seq 632](trajectory.jsonl#L632) **drafter → search**

```json
{"query":"review of the"}
```

- [seq 633](trajectory.jsonl#L633) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…tee (or their representatives) access to the records and documents to conduct a review of the Servicer's performance under this Agreement. Any access or review will be condu…"},{"paragraphId":"p0144","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…eivable Files for the Additional Receivables. No initial re…
```

- [seq 664](trajectory.jsonl#L664) **drafter → search**

```json
{"query":"books and records"}
```

- [seq 665](trajectory.jsonl#L665) **search result**

```json
[]
```

- [seq 666](trajectory.jsonl#L666) **drafter → search**

```json
{"query":"verification"}
```

- [seq 667](trajectory.jsonl#L667) **search result**

```json
[]
```

- [seq 668](trajectory.jsonl#L668) **drafter → search**

```json
{"query":"Issuer will give"}
```

- [seq 669](trajectory.jsonl#L669) **search result**

```json
[]
```

- [seq 670](trajectory.jsonl#L670) **drafter → search**

```json
{"query":"normal business hours"}
```

- [seq 671](trajectory.jsonl#L671) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"… conducted by all parties at the same time at the Servicer's offices during its normal business hours at a time reasonably convenient to the Servicer and in a manner that will minim…"},{"paragraphId":"p0146","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…ables. Any access or review will be conducted at th…
```

- [seq 700](trajectory.jsonl#L700) **drafter → search**

```json
{"query":"records","limit":30}
```

- [seq 701](trajectory.jsonl#L701) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"… Servicer Reports and Compliance Statements 11 Section 3.6 Review of Servicer's Records 12 Section 3.7 Servicer's Authorized and Responsible Persons 13 Section 3.8 Ser…"},{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet"…
```

- [seq 702](trajectory.jsonl#L702) **drafter → search**

```json
{"query":"access","limit":30}
```

- [seq 703](trajectory.jsonl#L703) **search result**

```json
[{"paragraphId":"p0089","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"(vii) providing to the Custodian copies, or access to, any documents that modify or supplement information in the Receivable Files…"},{"paragraphId":"p0095","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…luding, but not limited to, insurance premium payments and purchases (including accessories) billed to …
```

- [seq 730](trajectory.jsonl#L730) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0437","p0446","p0447","p0144"]}
```

- [seq 731](trajectory.jsonl#L731) **read_paragraphs result**

```json
[{"id":"p0437","sectionRef":"§ X MISCELLANEOUS","text":"In connection with this transaction, the Servicer shall cooperate fully with the Administrator and the Issuer to deliver to the Administrator or Issuer, as applicable (including any of its assignees or designees), any and all statements, reports, certifications, records and any other information necessary in the good faith determination of t…
```

- [seq 752](trajectory.jsonl#L752) **drafter → search**

```json
{"query":"Servicer will have the right"}
```

- [seq 753](trajectory.jsonl#L753) **search result**

```json
[]
```

- [seq 754](trajectory.jsonl#L754) **drafter → search**

```json
{"query":"Issuer will give the Servicer"}
```

- [seq 755](trajectory.jsonl#L755) **search result**

```json
[]
```

- [seq 756](trajectory.jsonl#L756) **drafter → search**

```json
{"query":"reasonable notice"}
```

- [seq 757](trajectory.jsonl#L757) **search result**

```json
[{"paragraphId":"p0131","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…. Upon reasonable request not more than once during any calendar year, and with reasonable notice, the Servicer will give the Issuer, the Depositor, the Parent Support Provider,…"}]
```

- [seq 780](trajectory.jsonl#L780) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0131","p0146"],"quote":"Upon reasonable request not more than once during any calendar year, and with reasonable notice, the Servicer will give the Issuer, the Depositor, the Parent Support Provider, the Administrator, the Owner Trustee and the Indenture Trustee (or their representatives) access to the records and documents to conduct a review of the Servicer's performance under this Agreement.","rationale":"The AUDIT rule constrains audit/inspection rights that bind us. Searching the full document for audit, inspection, examination, verification, records and access surfaced only two review clauses, and both run in our favour rather than against us. Section 3.6 (p0131) obliges the Servicer (Cellco, the counterparty) to give the Issuer, Depositor, Administrator, Owner Trustee and Indenture Trustee access to its records to review the Servicer's performance, and Section 3.9(e) (p0146) obliges the Custodian (also Cellco) to give the Depositor, Issuer and Indenture Trustee access to the Receivable Files and receivables systems. The remaining hits are the same direction: p0437 requires the Servicer to deliver records to the Administrator and Issuer for Regulation AB compliance, and p0446-p0447 require the Servicer to grant the Asset Representations Reviewer access. Cellco has no reciprocal right to audit, inspect or access the Issuer's or Depositor's records or systems, so none of the walk-away triggers (unlimited or unannounced audits, remote access to our systems) is present and there is no counterparty audit right to which the frequency, notice and cost parameters could attach. Nothing here is adverse to us and no redline is warranted. Two observations noted but not flagged: the planner's question whether the policy qualifiers gut our access, i.e. that our review rights under Sections 3.6 and 3.9(e) are \"subject to the Servicer's security, confidentiality and privacy policies and any regulatory, legal and data protection policies\", concerns the strength of our own inspection rights and is outside this rule's checklist, which only limits audits against us; expanding our access would fall under a separate audit-rights-in-our-favour position. Likewise the requirement that access be exercised \"by all parties at the same time\" at the Servicer's offices is a constraint on our own right, not an obligation imposed on us.","confidence":0.9}
```

- [seq 781](trajectory.jsonl#L781) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 780](trajectory.jsonl#L780)
- Finding: `f-audit-11082b8c` · **compliant** · confidence 0.90
- Location: § III SERVICING OF RECEIVABLES
- Quote: “Upon reasonable request not more than once during any calendar year, and with reasonable notice, the Servicer will give the Issuer, the Depositor, the Parent Support Provider, the Administrator, the Owner Trustee and the Indenture Trustee (or their representatives) access to the records and documents to conduct a review of the Servicer's performance under this Agreement.”
- Rationale: The AUDIT rule constrains audit/inspection rights that bind us. Searching the full document for audit, inspection, examination, verification, records and access surfaced only two review clauses, and both run in our favour rather than against us. Section 3.6 (p0131) obliges the Servicer (Cellco, the counterparty) to give the Issuer, Depositor, Administrator, Owner Trustee and Indenture Trustee access to its records to review the Servicer's performance, and Section 3.9(e) (p0146) obliges the Custodian (also Cellco) to give the Depositor, Issuer and Indenture Trustee access to the Receivable Files and receivables systems. The remaining hits are the same direction: p0437 requires the Servicer to deliver records to the Administrator and Issuer for Regulation AB compliance, and p0446-p0447 require the Servicer to grant the Asset Representations Reviewer access. Cellco has no reciprocal right to audit, inspect or access the Issuer's or Depositor's records or systems, so none of the walk-away triggers (unlimited or unannounced audits, remote access to our systems) is present and there is no counterparty audit right to which the frequency, notice and cost parameters could attach. Nothing here is adverse to us and no redline is warranted. Two observations noted but not flagged: the planner's question whether the policy qualifiers gut our access, i.e. that our review rights under Sections 3.6 and 3.9(e) are "subject to the Servicer's security, confidentiality and privacy policies and any regulatory, legal and data protection policies", concerns the strength of our own inspection rights and is outside this rule's checklist, which only limits audits against us; expanding our access would fall under a separate audit-rights-in-our-favour position. Likewise the requirement that access be exercised "by all parties at the same time" at the Servicer's offices is a constraint on our own right, not an obligation imposed on us.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 570](trajectory.jsonl#L570)

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
{"ruleId":"LD","candidateSectionIds":["sec-viii","sec-iii","sec-x"],"candidateParagraphIds":["p0351","p0354","p0355","p0358","p0359","p0362","p0398","p0094"],"likelyAbsent":false,"note":"No liquidated damages or termination fee payable by us. Make-Whole Payment on Optional Redemption (p0358-p0359, p0398) is noteholder economics; late fees (p0094) are collected from Obligors and flow to the Servicer as Supplemental Servicing Fee. Confirm the Make-Whole is not a penalty borne by the Issuer outside the agreed waterfall."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 598](trajectory.jsonl#L598) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0351","p0354","p0355","p0358","p0359","p0362","p0398","p0094"]}
```

- [seq 599](trajectory.jsonl#L599) **read_paragraphs result**

```json
[{"id":"p0351","sectionRef":"§ VIII TERMINATION","text":"(a) Optional Acquisition. On each Payment Date following the last day of a Collection Period as of which the aggregate Principal Balance of the Receivables shall be equal to or less than 10% of the aggregate Principal Balance of the Receivables as of the Closing Date, the Class A Certificateholder (for as long as the Class A Certificatehold…
```

- [seq 600](trajectory.jsonl#L600) **drafter → search**

```json
{"query":"liquidated damages penalty"}
```

- [seq 601](trajectory.jsonl#L601) **search result**

```json
[]
```

- [seq 636](trajectory.jsonl#L636) **drafter → search**

```json
{"query":"Make-Whole Payment"}
```

- [seq 637](trajectory.jsonl#L637) **search result**

```json
[{"paragraphId":"p0351","sectionRef":"§ VIII TERMINATION","snippet":"…eem the Notes, in whole but not in part (the \"Clean-Up Redemption\") without any Make-Whole Payment (other than any Make-Whole Payments already due and payable on such date)."},{"paragraphId":"p0351","sectionRef":"§ VIII TERMINATION","snippet":"…part (the \"Clean-Up Redemption\") without any Make-Whole Payment (other than any …
```

- [seq 638](trajectory.jsonl#L638) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 639](trajectory.jsonl#L639) **search result**

```json
[]
```

- [seq 674](trajectory.jsonl#L674) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0791","p0792","p0797","p0800"]}
```

- [seq 675](trajectory.jsonl#L675) **read_paragraphs result**

```json
[{"id":"p0791","sectionRef":"§ A-20","text":"\"Make-Whole Payment\" means, for any payment of principal of the Notes on any Payment Date:"},{"id":"p0792","sectionRef":"§ A-20","text":"(a) for any Make-Whole Payment due, other than with respect to an Optional Redemption,"},{"id":"p0797","sectionRef":"§ A-21","text":"(b) for any Make-Whole Payment due with respect to an Optional Redemption,"},{"id"…
```

- [seq 676](trajectory.jsonl#L676) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 677](trajectory.jsonl#L677) **search result**

```json
[]
```

- [seq 706](trajectory.jsonl#L706) **drafter → read_section**

```json
{"sectionId":"\"§ A-20\""}
```

- [seq 707](trajectory.jsonl#L707) **read_section result**

```json
{"ok":false,"error":"Unknown section: \"§ A-20\""}
```

- [seq 708](trajectory.jsonl#L708) **drafter → search**

```json
{"query":"Servicer Termination Event successor servicer transition expenses"}
```

- [seq 709](trajectory.jsonl#L709) **search result**

```json
[]
```

- [seq 734](trajectory.jsonl#L734) **drafter → list_sections**

```json
{}
```

- [seq 735](trajectory.jsonl#L735) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 736](trajectory.jsonl#L736) **drafter → search**

```json
{"query":"shall pay as damages"}
```

- [seq 737](trajectory.jsonl#L737) **search result**

```json
[]
```

- [seq 760](trajectory.jsonl#L760) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0793","p0794","p0795","p0796","p0798","p0799"]}
```

- [seq 761](trajectory.jsonl#L761) **read_paragraphs result**

```json
[{"id":"p0793","sectionRef":"§ A-20","text":"(i) for each Class of Notes other than the Class A-1b Notes, the excess of (a) the present value of (i) the amount of all future interest payments that would otherwise accrue on the principal payment until the Payment Date in February 2022 and (ii) the principal payment, each such payment discounted from the Payment Date in February 2022 to such Paymen…
```

- [seq 762](trajectory.jsonl#L762) **drafter → search**

```json
{"query":"indemnify the Issuer losses damages costs"}
```

- [seq 763](trajectory.jsonl#L763) **search result**

```json
[]
```

- [seq 784](trajectory.jsonl#L784) **drafter → search**

```json
{"query":"Issuer will indemnify"}
```

- [seq 785](trajectory.jsonl#L785) **search result**

```json
[]
```

- [seq 786](trajectory.jsonl#L786) **drafter → search**

```json
{"query":"Supplemental Servicing Fee late fees"}
```

- [seq 787](trajectory.jsonl#L787) **search result**

```json
[]
```

- [seq 813](trajectory.jsonl#L813) **drafter → search**

```json
{"query":"indemnif","limit":30}
```

- [seq 814](trajectory.jsonl#L814) **search result**

```json
[{"paragraphId":"p0290","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"(a) Indemnification."},{"paragraphId":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"(i) The Servicer will indemnify the Issuer, the Owner Trustee and the Indenture Trustee (including in its capa…"},{"paragraphId":"p0291","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"…e Paying Ag…
```

- [seq 815](trajectory.jsonl#L815) **drafter → search**

```json
{"query":"Supplemental Servicing Fee"}
```

- [seq 816](trajectory.jsonl#L816) **search result**

```json
[{"paragraphId":"p0120","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"Receivable will be Recoveries. Any Recoveries will be paid to the Servicer as Supplemental Servicing Fees and will not be a part of Available Funds. If the Servicer elects to sell a Wr…"},{"paragraphId":"p0134","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…rding to Section 8.2 of the Indenture. In additio…
```

- [seq 847](trajectory.jsonl#L847) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0990","p0120","p0134"]}
```

- [seq 848](trajectory.jsonl#L848) **read_paragraphs result**

```json
[{"id":"p0990","sectionRef":"§ A-37","text":"\"Supplemental Servicing Fee\" means, for a Collection Period, all net Recoveries, late fees, prepayment charges, extension fees and other administrative fees or similar charges on the Receivables."},{"id":"p0120","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"Receivable will be Recoveries. Any Recoveries will be paid to the Servicer as Suppleme…
```

- [seq 849](trajectory.jsonl#L849) **drafter → search**

```json
{"query":"premium prepayment charge"}
```

- [seq 850](trajectory.jsonl#L850) **search result**

```json
[]
```

- [seq 877](trajectory.jsonl#L877) **drafter → read_section**

```json
{"sectionId":"sec-vii","limit":40}
```

- [seq 878](trajectory.jsonl#L878) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":0,"totalParagraphs":36,"nextCursor":null,"paragraphs":[{"id":"p0313","text":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER"},{"id":"p0314","text":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perfor…
```

- [seq 903](trajectory.jsonl#L903) **drafter → search**

```json
{"query":"Issuer will pay","limit":20}
```

- [seq 904](trajectory.jsonl#L904) **search result**

```json
[{"paragraphId":"p0134","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"…reement, the Servicer will be paid the Servicing Fee. On each Payment Date, the Issuer will pay the Servicing Fee to the Servicer according to Section 8.2 of the Indenture. In…"}]
```

- [seq 905](trajectory.jsonl#L905) **drafter → search**

```json
{"query":"default interest additional amount payable by the Depositor"}
```

- [seq 906](trajectory.jsonl#L906) **search result**

```json
[]
```

- [seq 933](trajectory.jsonl#L933) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0351","p0358","p0791","p0347","p0339","p0990","p0291"],"quote":"redeem the Notes, in whole but not in part (the \"Clean-Up Redemption\") without any Make-Whole Payment (other than any Make-Whole Payments already due and payable on such date)","rationale":"The agreement imposes no liquidated damages, penalty, or minimum/early-termination fee on the Issuer or Depositor in favour of Cellco, so the preferred position is met. The only premium-style amount is the Make-Whole Payment (Sections 8.1-8.2; definition at Appendix A), which is a yield-maintenance amount payable to Noteholders on a voluntary Optional Redemption elected by the Class A Certificateholder and funded through the agreed waterfall — it is investor economics, not a breach-triggered liquidated sum payable to the counterparty, and the Clean-Up Redemption is expressly available without any Make-Whole Payment. The other amounts we reviewed run the right way or are ordinary compensation: late fees, prepayment charges and other Supplemental Servicing Fees are collected from Obligors rather than paid by us; servicing-transition expenses are \"paid by the resigning or terminated Servicer\"; the Successor Servicer's $150,000 appointment fee is third-party compensation paid from the waterfall, not a penalty; and the indemnities in Section 6.3 run from the Servicer and Marketing Agent to us. No redline is warranted.","confidence":0.85,"elementCoverage":{"level":"preferred","mappings":[{"element":"Customer pays no liquidated damages or penalties.","status":"already_met","quote":"redeem the Notes, in whole but not in part (the \"Clean-Up Redemption\") without any Make-Whole Payment (other than any Make-Whole Payments already due and payable on such date)"}]}}
```

- [seq 934](trajectory.jsonl#L934) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 933](trajectory.jsonl#L933)
- Finding: `f-ld-b5ee025a` · **compliant** · confidence 0.85
- Location: § VIII TERMINATION
- Quote: “redeem the Notes, in whole but not in part (the "Clean-Up Redemption") without any Make-Whole Payment (other than any Make-Whole Payments already due and payable on such date)”
- Rationale: The agreement imposes no liquidated damages, penalty, or minimum/early-termination fee on the Issuer or Depositor in favour of Cellco, so the preferred position is met. The only premium-style amount is the Make-Whole Payment (Sections 8.1-8.2; definition at Appendix A), which is a yield-maintenance amount payable to Noteholders on a voluntary Optional Redemption elected by the Class A Certificateholder and funded through the agreed waterfall — it is investor economics, not a breach-triggered liquidated sum payable to the counterparty, and the Clean-Up Redemption is expressly available without any Make-Whole Payment. The other amounts we reviewed run the right way or are ordinary compensation: late fees, prepayment charges and other Supplemental Servicing Fees are collected from Obligors rather than paid by us; servicing-transition expenses are "paid by the resigning or terminated Servicer"; the Successor Servicer's $150,000 appointment fee is third-party compensation paid from the waterfall, not a penalty; and the indemnities in Section 6.3 run from the Servicer and Marketing Agent to us. No redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 772](trajectory.jsonl#L772)

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
{"ruleId":"WARRANTY","candidateSectionIds":["sec-vi","sec-iii","sec-ii-2","sec-v"],"candidateParagraphIds":["p0257","p0270","p0232","p0068","p0071","p0072","p0073","p0082","p0091","p0115","p0138"],"likelyAbsent":false,"note":"Servicer and Marketing Agent reps at p0257 and p0270; servicing standard (reasonable care / commercially reasonable care and diligence) at p0082, p0091, p0138. Remedy architecture is Section 2.5 reacquisition for breach of Eligibility Representations (p0068-p0073) — check the sole-remedy language at p0073, the no-warranty transfer at p0115, and whether reps repeat on each Acquisition Date."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 796](trajectory.jsonl#L796) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0257","p0270","p0232","p0068","p0071","p0072","p0073","p0082","p0091","p0115","p0138"]}
```

- [seq 797](trajectory.jsonl#L797) **read_paragraphs result**

```json
[{"id":"p0257","sectionRef":"§ VI SERVICER AND MARKETING AGENT","text":"(a) The Servicer represents and warrants to the Issuer as of the Closing Date and as of each Acquisition Date, on which representations and warranties the Issuer is relying in purchasing the Depositor Transferred Property and which will survive the transfer and assignment of the Depositor Transferred Property by the Depositor…
```

- [seq 798](trajectory.jsonl#L798) **drafter → list_sections**

```json
{}
```

- [seq 799](trajectory.jsonl#L799) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 819](trajectory.jsonl#L819) **drafter → search**

```json
{"query":"disclaim warranty express implied AS IS merchantability"}
```

- [seq 820](trajectory.jsonl#L820) **search result**

```json
[]
```

- [seq 821](trajectory.jsonl#L821) **drafter → search**

```json
{"query":"without recourse, representation or warranty"}
```

- [seq 822](trajectory.jsonl#L822) **search result**

```json
[{"paragraphId":"p0115","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"… will not require any action by the Issuer or the Indenture Trustee and will be without recourse, representation or warranty by the Issuer except the representation that the Issuer owns the Receivable fre…"}]
```

- [seq 853](trajectory.jsonl#L853) **drafter → read_section**

```json
{"sectionId":"sec-vi","cursor":0,"limit":40}
```

- [seq 854](trajectory.jsonl#L854) **read_section result**

```json
{"sectionRef":"§ VI SERVICER AND MARKETING AGENT","cursor":0,"totalParagraphs":59,"nextCursor":40,"paragraphs":[{"id":"p0254","text":"ARTICLE VI SERVICER AND MARKETING AGENT"},{"id":"p0255","text":"Section 6.1 Servicer's and Marketing Agent's Representations and Warranties."},{"id":"p0256","text":"25"},{"id":"p0257","text":"(a) The Servicer represents and warrants to the Issuer as of the Closing …
```

- [seq 881](trajectory.jsonl#L881) **drafter → search**

```json
{"query":"professional and workmanlike manner industry standards"}
```

- [seq 882](trajectory.jsonl#L882) **search result**

```json
[]
```

- [seq 883](trajectory.jsonl#L883) **drafter → search**

```json
{"query":"warrants"}
```

- [seq 884](trajectory.jsonl#L884) **search result**

```json
[{"paragraphId":"p0232","sectionRef":"§ V DEPOSITOR","snippet":"…on 5.1 Depositor's Representations and Warranties. The Depositor represents and warrants to the Issuer as of the Closing Date and as of each Acquisition Date, on which …"},{"paragraphId":"p0257","sectionRef":"§ VI SERVICER AND MARKETING AGENT","snippet":"(a) The Servicer represents and warrants to the Issuer as of the Closing Date a…
```

- [seq 909](trajectory.jsonl#L909) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0069","p0070","p0074","p0075","p0076"]}
```

- [seq 910](trajectory.jsonl#L910) **read_paragraphs result**

```json
[{"id":"p0069","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","text":"(a) Representations and Warranties from Receivables Transfer Agreements. Each Originator and the Servicer, severally has made, as of the Closing Date, and each Originator or the Servicer, as applicable, severally will make, as of each Acquisition Date, the Eligibil…
```

- [seq 911](trajectory.jsonl#L911) **drafter → search**

```json
{"query":"Servicer will acquire the Receivable Acquisition Amount breach of obligations"}
```

- [seq 912](trajectory.jsonl#L912) **search result**

```json
[]
```

- [seq 937](trajectory.jsonl#L937) **drafter → search**

```json
{"query":"Servicer will be required to acquire the Receivable if it modifies"}
```

- [seq 938](trajectory.jsonl#L938) **search result**

```json
[]
```

- [seq 939](trajectory.jsonl#L939) **drafter → search**

```json
{"query":"Servicer's Acquisition of Receivables"}
```

- [seq 940](trajectory.jsonl#L940) **search result**

```json
[{"paragraphId":"p0011","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…ut Depositor Transferred Property. 3 Section 2.5 Originators' Reacquisition and Servicer's Acquisition of Receivables for Breach of Representations 5"},{"paragraphId":"p0013","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of B…
```

- [seq 966](trajectory.jsonl#L966) **drafter → read_section**

```json
{"sectionId":"sec-iii","cursor":25,"limit":15}
```

- [seq 967](trajectory.jsonl#L967) **read_section result**

```json
{"sectionRef":"§ III SERVICING OF RECEIVABLES","cursor":25,"totalParagraphs":86,"nextCursor":40,"paragraphs":[{"id":"p0104","text":"(e) Assignment for Enforcement. Effective as of the related Cutoff Date, the Receivables are assigned to the Servicer solely for the purpose of permitting the Servicer to perform its servicing and administrative obligations under this Agreement, including the start o…
```

- [seq 994](trajectory.jsonl#L994) **drafter → read_section**

```json
{"sectionId":"sec-iii","cursor":14,"limit":12}
```

- [seq 995](trajectory.jsonl#L995) **read_section result**

```json
{"sectionRef":"§ III SERVICING OF RECEIVABLES","cursor":14,"totalParagraphs":86,"nextCursor":26,"paragraphs":[{"id":"p0093","text":"3.12(b)) will be applied to the related account by the Servicer based on invoice aging, so that such amounts are applied to the oldest invoiced balances first, then the second oldest invoiced balances, etc., and finally to current billing amounts, in each case, in th…
```

- [seq 1019](trajectory.jsonl#L1019) **drafter → search**

```json
{"query":"Servicer Termination Event breach of any representation warranty cure period","limit":10}
```

- [seq 1020](trajectory.jsonl#L1020) **search result**

```json
[]
```

- [seq 1042](trajectory.jsonl#L1042) **drafter → read_section**

```json
{"sectionId":"sec-vii","cursor":0,"limit":14}
```

- [seq 1043](trajectory.jsonl#L1043) **read_section result**

```json
{"sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","cursor":0,"totalParagraphs":36,"nextCursor":14,"paragraphs":[{"id":"p0313","text":"ARTICLE VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER"},{"id":"p0314","text":"Section 7.1 No Resignation. The Servicer will not resign as Servicer under this Agreement unless it determines it is legally unable to perform …
```

- [seq 1052](trajectory.jsonl#L1052) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0080","p0081","p0082","p0269","p0112"]}
```

- [seq 1053](trajectory.jsonl#L1053) **read_paragraphs result**

```json
[{"id":"p0080","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"Section 3.1 Engagement. The Issuer engages Cellco as the Servicer of the Receivables for the Issuer and the Indenture Trustee, and Cellco accepts this engagement."},{"id":"p0081","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"Section 3.2 Servicing of Receivables."},{"id":"p0082","sectionRef":"§ III SERVICING OF RECEIVABLE…
```

- [seq 1069](trajectory.jsonl#L1069) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0082","p0257","p0268","p0269","p0112","p0114","p0073","p0321"],"quote":"Indenture Trustee of a breach of the Servicer's obligations in Section 3.2(c) or (d), and the Servicer fails to correct such failure or impairment in all material respects by the end of the second month following the month in which the Servicer received such written notice, the Servicer will acquire all Receivables with respect to which such breach was not so cured as set forth in Section 3.3(d).","rationale":"This is a transfer and servicing agreement with no software, deliverables or licensed technology, so the software-conformance element has no subject matter here; the performance bargain sits at the fallback and we would not redline it. (1) Services standard: Section 3.2(a) requires Cellco to \"manage, service, administer and collect on the Receivables with reasonable care using that degree of skill and attention that the Servicer exercises for all comparable device payment plan agreement receivables that it services for itself or others according to the Servicing Procedures\", and Section 6.1(a) repeats the Servicer's representations and warranties, including compliance with Law applicable to the servicing and that \"It has complied in all material respects with the Servicing Procedures with respect to the Receivables\", as of the Closing Date and as of each Acquisition Date, expressly surviving transfer — coverage for the life of the deal, well beyond the 30-day fallback floor. (2) Repair/replacement: Section 3.3(b) gives us a notice-and-correct mechanic (quoted), and Section 7.2(a)(ii) allows removal and replacement of the Servicer for any unperformed obligation having a material adverse effect that is uncured after ninety (90) days. (3) Refund: Sections 2.5 and 3.3(d) require the Originator or Servicer to reacquire/acquire the affected Receivables by remitting the Acquisition Amount — the economic equivalent of a refund for non-conforming assets. Notably, there is no \"AS IS\" or blanket warranty disclaimer anywhere, so the walk-away position is not in play; the only no-warranty language (Section 3.3(e)) runs in our favour, being a transfer by the Issuer without recourse or warranty. Short of preferred, and noted rather than flagged: there is no express \"professional and workmanlike\" or no-malicious-code warranty, and the reacquisition/acquisition remedies are expressed as sole remedies (Sections 2.5(c), 3.3(g)). The separate liability floor of willful misconduct, bad faith or gross negligence in Section 6.2(a) is a limitation-of-liability point and is left to that rule rather than flagged twice here.","confidence":0.6}
```

- [seq 1070](trajectory.jsonl#L1070) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1069](trajectory.jsonl#L1069)
- Finding: `f-warranty-4f4d7ed3` · **compliant** · confidence 0.60
- Location: § III SERVICING OF RECEIVABLES
- Quote: “Indenture Trustee of a breach of the Servicer's obligations in Section 3.2(c) or (d), and the Servicer fails to correct such failure or impairment in all material respects by the end of the second month following the month in which the Servicer received such written notice, the Servicer will acquire all Receivables with respect to which such breach was not so cured as set forth in Section 3.3(d).”
- Rationale: This is a transfer and servicing agreement with no software, deliverables or licensed technology, so the software-conformance element has no subject matter here; the performance bargain sits at the fallback and we would not redline it. (1) Services standard: Section 3.2(a) requires Cellco to "manage, service, administer and collect on the Receivables with reasonable care using that degree of skill and attention that the Servicer exercises for all comparable device payment plan agreement receivables that it services for itself or others according to the Servicing Procedures", and Section 6.1(a) repeats the Servicer's representations and warranties, including compliance with Law applicable to the servicing and that "It has complied in all material respects with the Servicing Procedures with respect to the Receivables", as of the Closing Date and as of each Acquisition Date, expressly surviving transfer — coverage for the life of the deal, well beyond the 30-day fallback floor. (2) Repair/replacement: Section 3.3(b) gives us a notice-and-correct mechanic (quoted), and Section 7.2(a)(ii) allows removal and replacement of the Servicer for any unperformed obligation having a material adverse effect that is uncured after ninety (90) days. (3) Refund: Sections 2.5 and 3.3(d) require the Originator or Servicer to reacquire/acquire the affected Receivables by remitting the Acquisition Amount — the economic equivalent of a refund for non-conforming assets. Notably, there is no "AS IS" or blanket warranty disclaimer anywhere, so the walk-away position is not in play; the only no-warranty language (Section 3.3(e)) runs in our favour, being a transfer by the Issuer without recourse or warranty. Short of preferred, and noted rather than flagged: there is no express "professional and workmanlike" or no-malicious-code warranty, and the reacquisition/acquisition remedies are expressed as sole remedies (Sections 2.5(c), 3.3(g)). The separate liability floor of willful misconduct, bad faith or gross negligence in Section 6.2(a) is a limitation-of-liability point and is left to that rule rather than flagged twice here.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 804](trajectory.jsonl#L804)

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
{"ruleId":"INSURANCE","candidateSectionIds":["sec-iii"],"candidateParagraphIds":["p0095"],"likelyAbsent":true,"note":"No vendor insurance covenant (no E&O, cyber or fidelity bond requirement). Only 'insurance' references are Obligor premium billing (p0095) and FDIC deposit insurance in the definitions. Treat as missing and assess materiality given the Servicer handles Obligor data."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 825](trajectory.jsonl#L825) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 826](trajectory.jsonl#L826) **search result**

```json
[{"paragraphId":"p0095","sectionRef":"§ III SERVICING OF RECEIVABLES","snippet":"• service and all other charges, including, but not limited to, insurance premium payments and purchases (including accessories) billed to the account, o…"},{"paragraphId":"p0903","sectionRef":"§ A-30","snippet":"…he laws of the United States, whose deposits are insured by the Federal Deposit Insurance Corporation."}]
```

- [seq 827](trajectory.jsonl#L827) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0095"]}
```

- [seq 828](trajectory.jsonl#L828) **read_paragraphs result**

```json
[{"id":"p0095","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"• service and all other charges, including, but not limited to, insurance premium payments and purchases (including accessories) billed to the account, other than amounts due under any device payment plan agreement, including any Receivable; and"}]
```

- [seq 857](trajectory.jsonl#L857) **drafter → search**

```json
{"query":"fidelity bond errors and omissions policy"}
```

- [seq 858](trajectory.jsonl#L858) **search result**

```json
[]
```

- [seq 859](trajectory.jsonl#L859) **drafter → search**

```json
{"query":"Servicer shall maintain"}
```

- [seq 860](trajectory.jsonl#L860) **search result**

```json
[]
```

- [seq 887](trajectory.jsonl#L887) **drafter → list_sections**

```json
{}
```

- [seq 888](trajectory.jsonl#L888) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 915](trajectory.jsonl#L915) **drafter → read_section**

```json
{"sectionId":"sec-x","limit":40}
```

- [seq 916](trajectory.jsonl#L916) **read_section result**

```json
{"sectionRef":"§ X MISCELLANEOUS","cursor":0,"totalParagraphs":50,"nextCursor":40,"paragraphs":[{"id":"p0390","text":"ARTICLE X MISCELLANEOUS"},{"id":"p0391","text":"Section 10.1 Amendments."},{"id":"p0392","text":"(a) Amendments to Clarify and Correct Errors and Defects. The parties may amend this Agreement (including Appendix A) to clarify an ambiguity, correct an error or correct or supplement…
```

- [seq 943](trajectory.jsonl#L943) **drafter → read_section**

```json
{"sectionId":"sec-x","cursor":40,"limit":10}
```

- [seq 944](trajectory.jsonl#L944) **read_section result**

```json
{"sectionRef":"§ X MISCELLANEOUS","cursor":40,"totalParagraphs":50,"nextCursor":null,"paragraphs":[{"id":"p0430","text":"Section 10.8 No Waiver; Remedies. No party's failure or delay in exercising a power, right or remedy under this Agreement will operate as a waiver. No single or partial exercise of a power, right or remedy will preclude any other or further exercise of the power, right or remed…
```

- [seq 970](trajectory.jsonl#L970) **drafter → search**

```json
{"query":"Section 10.14"}
```

- [seq 971](trajectory.jsonl#L971) **search result**

```json
[]
```

- [seq 972](trajectory.jsonl#L972) **drafter → lookup_precedent**

```json
{"ruleId":"INSURANCE","context":"Insert insurance covenant for Servicer in miscellaneous article of transfer and servicing agreement; fallback E&O 1M and cyber 2M"}
```

- [seq 973](trajectory.jsonl#L973) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 998](trajectory.jsonl#L998) **drafter → propose_redline**

```json
{"ops":[{"kind":"insert_after","paragraphId":"p0439","numbering":"Section 10.14","text":"Section 10.14 Insurance. The Servicer will maintain professional liability (errors and omissions) insurance of not less than $1,000,000 and cyber and privacy liability insurance of not less than $2,000,000."}],"comment":"[Playbook] We add a short insurance covenant in Article X because the Agreement has none, even though the Servicer handles Obligor account and payment data. This sits at our fallback position (E&O of $1,000,000 and cyber/privacy of $2,000,000); we can discuss our preferred limits if you prefer a fuller programme.","level":"fallback","summary":"Insert Section 10.14 requiring Servicer E&O insurance of $1,000,000 and cyber/privacy insurance of $2,000,000."}
```

- [seq 999](trajectory.jsonl#L999) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0439","segments":[{"type":"equal","text":"the Receivables, or the servicing of the Receivables, reasonably believed by the Issuer or the Administrator to be necessary in order to effect such compliance."}]}],"minimality":{"ok":true,"errors":[]}}
```

- [seq 1023](trajectory.jsonl#L1023) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0439","p0095"],"quote":"• service and all other charges, including, but not limited to, insurance premium payments and purchases (including accessories) billed to the account, other than amounts due under any device payment plan agreement, including any Receivable; and","rationale":"The Agreement contains no insurance covenant of any kind for the Servicer/Marketing Agent/Custodian. The only occurrences of \\\"insurance\\\" are Obligor premium charges billed to wireless accounts (p0095) and FDIC deposit insurance in the account-eligibility definition (p0903); neither imposes any coverage obligation on Cellco. Cellco services the Receivables and holds Obligor account, payment and Receivable File data, so the absence of any E&O or cyber cover falls in walk-away territory under this rule. We therefore insert a short covenant at the end of Article X (Miscellaneous) at the fallback level only — errors and omissions of $1,000,000 and cyber/privacy of $2,000,000 — rather than the preferred CGL/E&O/cyber/workers' compensation programme, which is the smallest complete change.","confidence":0.82,"proposal":{"ops":[{"kind":"insert_after","paragraphId":"p0439","numbering":"Section 10.14","text":"Section 10.14 Insurance. The Servicer will maintain professional liability (errors and omissions) insurance of not less than $1,000,000 and cyber and privacy liability insurance of not less than $2,000,000."}],"comment":"[Playbook] We add a short insurance covenant in Article X because the Agreement has none, even though the Servicer handles Obligor account and payment data. This sits at our fallback position (E&O of $1,000,000 and cyber/privacy of $2,000,000); we can discuss our preferred limits if you prefer a fuller programme.","level":"fallback","summary":"Insert Section 10.14 requiring Servicer E&O insurance of $1,000,000 and cyber/privacy insurance of $2,000,000."},"elementCoverage":{"level":"fallback","mappings":[{"element":"Professional errors and omissions coverage is at least USD 1,000,000.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Cyber and privacy coverage is at least USD 2,000,000.","status":"addressed_by_operation","operationIndexes":[1]}]}}
```

- [seq 1024](trajectory.jsonl#L1024) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1023](trajectory.jsonl#L1023)
- Finding: `f-insurance-75a8cf0d` · **missing** · confidence 0.82
- Location: § X MISCELLANEOUS
- Quote: “• service and all other charges, including, but not limited to, insurance premium payments and purchases (including accessories) billed to the account, other than amounts due under any device payment plan agreement, including any Receivable; and”
- Rationale: The Agreement contains no insurance covenant of any kind for the Servicer/Marketing Agent/Custodian. The only occurrences of \"insurance\" are Obligor premium charges billed to wireless accounts (p0095) and FDIC deposit insurance in the account-eligibility definition (p0903); neither imposes any coverage obligation on Cellco. Cellco services the Receivables and holds Obligor account, payment and Receivable File data, so the absence of any E&O or cyber cover falls in walk-away territory under this rule. We therefore insert a short covenant at the end of Article X (Miscellaneous) at the fallback level only — errors and omissions of $1,000,000 and cyber/privacy of $2,000,000 — rather than the preferred CGL/E&O/cyber/workers' compensation programme, which is the smallest complete change.
- Proposal: **fallback** — Insert Section 10.14 requiring Servicer E&O insurance of $1,000,000 and cyber/privacy insurance of $2,000,000.
- Comment: [Playbook] We add a short insurance covenant in Article X because the Agreement has none, even though the Servicer handles Obligor account and payment data. This sits at our fallback position (E&O of $1,000,000 and cyber/privacy of $2,000,000); we can discuss our preferred limits if you prefer a fuller programme.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "Section 10.14",
    "paragraphId": "p0439",
    "text": "Section 10.14 Insurance. The Servicer will maintain professional liability (errors and omissions) insurance of not less than $1,000,000 and cyber and privacy liability insurance of not less than $2,000,000."
  }
]
```

### Verifier and repair feedback

- [seq 1062](trajectory.jsonl#L1062) **Verdict: pass** — Fallback checklist is complete: both the E&O $1,000,000 and cyber/privacy $2,000,000 limits are stated as unconditional 'will maintain' covenants in new Section 10.14, with no undefined trigger and nothing merely promised in the margin comment. Preferred level is not reached on five of six elements (no CGL 1M/2M, E&O only 1M rather than 2M, cyber only 2M rather than 5M, no workers' compensation, no certificates on request); the drafter correctly targeted fallback only, so this is not a defect in the chosen level. Minimality holds: the insertion is a two-limb sentence with no model-language extras — no 'at its own expense', no term-plus-one-year survival tail, no certificate procedure, no CGL or workers' compensation add-ons beyond the fallback checklist. For a missing clause, wholly new wording is permissible. Intent is preserved: nothing existing was deleted or paraphrased. The two cited paragraphs (Obligor insurance premium charges at p0095 and the compliance language at p0439) are reproduced unchanged, and no defined term, cross-reference or commercial mechanic is disturbed. Drafting note (not a failure of the fallback checklist): the covenant binds 'the Servicer' only, while Cellco also acts as Marketing Agent and Custodian and holds Receivable Files in the custodial capacity. If you want the cover to follow the data in every capacity, change the subject to 'Cellco, in each of its capacities under this Agreement'. Also confirm that Section 10.14 is the next unused number in Article X so the insertion does not collide with an existing section. Checks: {"name":"operation 1 applies","ok":true}; {"name":"insurance obligation present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 811](trajectory.jsonl#L811)

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
{"ruleId":"MINCOMMIT","candidateSectionIds":["sec-iv","sec-p0591"],"candidateParagraphIds":["p0211","p0595"],"likelyAbsent":true,"note":"No minimum purchase or take-or-pay obligation on us. 'Shortfall' hits are Marketing Agent deposit obligations for Credits (p0211), which run in our favour, and an upgrade-offer condition on Obligors (p0595). Record as not applicable."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 841](trajectory.jsonl#L841) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0211","p0595"]}
```

- [seq 842](trajectory.jsonl#L842) **read_paragraphs result**

```json
[{"id":"p0211","sectionRef":"§ IV ACCOUNTS, COLLECTIONS AND APPLICATION OF FUNDS","text":"(h) Deposit of Credit Payments. If an Obligor is granted a Credit and the application of such Credit to the related Obligor's account results in a shortfall in Collections for the related Collection Period, the Marketing Agent shall deposit, or shall cause the related Originator to deposit, into the Collecti…
```

- [seq 843](trajectory.jsonl#L843) **drafter → search**

```json
{"query":"minimum purchase commitment take or pay shortfall"}
```

- [seq 844](trajectory.jsonl#L844) **search result**

```json
[]
```

- [seq 863](trajectory.jsonl#L863) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 864](trajectory.jsonl#L864) **search result**

```json
[]
```

- [seq 865](trajectory.jsonl#L865) **drafter → search**

```json
{"query":"shortfall"}
```

- [seq 866](trajectory.jsonl#L866) **search result**

```json
[{"paragraphId":"p0211","sectionRef":"§ IV ACCOUNTS, COLLECTIONS AND APPLICATION OF FUNDS","snippet":"…nd the application of such Credit to the related Obligor's account results in a shortfall in Collections for the related Collection Period, the Marketing Agent shall dep…"},{"paragraphId":"p0557","sectionRef":"§ A-1","snippet":"… and a Payment Date, the sum of the Note Monthly Interest and the N…
```

- [seq 891](trajectory.jsonl#L891) **drafter → search**

```json
{"query":"commit"}
```

- [seq 892](trajectory.jsonl#L892) **search result**

```json
[{"paragraphId":"p0924","sectionRef":"§ A-32","snippet":"…ans the Federal Reserve Board and/or the Federal Reserve Bank of New York, or a committee officially endorsed or convened by the Federal Reserve Board and/or the Fede…"},{"paragraphId":"p0983","sectionRef":"§ A-36","snippet":"… its assets and pay its debts and other liabilities, contingent obligations and commitments as they mature and bec…
```

- [seq 893](trajectory.jsonl#L893) **drafter → search**

```json
{"query":"volume"}
```

- [seq 894](trajectory.jsonl#L894) **search result**

```json
[]
```

- [seq 919](trajectory.jsonl#L919) **drafter → search**

```json
{"query":"obligated to purchase"}
```

- [seq 920](trajectory.jsonl#L920) **search result**

```json
[]
```

- [seq 921](trajectory.jsonl#L921) **drafter → search**

```json
{"query":"fees payable services rendered compensation"}
```

- [seq 922](trajectory.jsonl#L922) **search result**

```json
[]
```

- [seq 947](trajectory.jsonl#L947) **drafter → search**

```json
{"query":"Servicing Fee"}
```

- [seq 948](trajectory.jsonl#L948) **search result**

```json
[{"paragraphId":"p0048","sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","snippet":"…mounts payable as principal of or interest on the Notes, all amounts payable as Servicing Fees under this Agreement and all other amounts payable by the Issuer under the Tra…"},{"paragraphId":"p0120","sectionRef":"§ III SERVICING OF RECEIVABLES","snipp…
```

- [seq 949](trajectory.jsonl#L949) **drafter → list_sections**

```json
{}
```

- [seq 950](trajectory.jsonl#L950) **list_sections result**

```json
[{"id":"sec-preamble","heading":"Preamble","level":0,"paragraphCount":1},{"id":"sec-p0001","heading":"FORM OF TRANSFER AND SERVICING AGREEMENT","level":1,"paragraphCount":7},{"id":"sec-p0008","heading":"TABLE OF CONTENTS","level":1,"paragraphCount":1},{"id":"sec-i","number":"I","heading":"USAGE AND DEFINITIONS 1 Section 1.1 Usage and Definitions 1","level":1,"paragraphCount":1},{"id":"sec-ii","nu…
```

- [seq 976](trajectory.jsonl#L976) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0134","p0975","p0976","p0977","p0978"]}
```

- [seq 977](trajectory.jsonl#L977) **read_paragraphs result**

```json
[{"id":"p0134","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"Section 3.8 Servicer's Fees. As compensation for performing its obligations under this Agreement, the Servicer will be paid the Servicing Fee. On each Payment Date, the Issuer will pay the Servicing Fee to the Servicer according to Section 8.2 of the Indenture. In addition, the Servicer may retain any Supplemental Servicing Fees…
```

- [seq 978](trajectory.jsonl#L978) **drafter → search**

```json
{"query":"Issuer will acquire Additional Receivables"}
```

- [seq 979](trajectory.jsonl#L979) **search result**

```json
[]
```

- [seq 1004](trajectory.jsonl#L1004) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0569","p0570","p0992","p0993","p0994"]}
```

- [seq 1005](trajectory.jsonl#L1005) **read_paragraphs result**

```json
[{"id":"p0569","sectionRef":"§ A-3","text":"\"Additional Receivables Transfer Amount\" means, for an Acquisition Date, an amount equal to the discounted present value of the remaining payments (after the end of the calendar day on the related Cutoff Date) for the remaining term of such Additional Receivable discounted using the Discount Rate."},{"id":"p0570","sectionRef":"§ A-3","text":"\"Additio…
```

- [seq 1006](trajectory.jsonl#L1006) **drafter → search**

```json
{"query":"Acquisition Amount acquire Receivables from Depositor"}
```

- [seq 1007](trajectory.jsonl#L1007) **search result**

```json
[]
```

- [seq 1030](trajectory.jsonl#L1030) **drafter → search**

```json
{"query":"Acquisition Date the Depositor will transfer"}
```

- [seq 1031](trajectory.jsonl#L1031) **search result**

```json
[]
```

- [seq 1032](trajectory.jsonl#L1032) **drafter → search**

```json
{"query":"required to acquire"}
```

- [seq 1033](trajectory.jsonl#L1033) **search result**

```json
[]
```

- [seq 1048](trajectory.jsonl#L1048) **drafter → read_section**

```json
{"sectionId":"sec-ii-2","limit":12}
```

- [seq 1049](trajectory.jsonl#L1049) **read_section result**

```json
{"sectionRef":"§ II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES","cursor":0,"totalParagraphs":48,"nextCursor":12,"paragraphs":[{"id":"p0031","text":"ARTICLE II TRANSFER AND ACQUISITION OF DEPOSITOR TRANSFERRED PROPERTY; REPRESENTATIONS AND WARRANTIES"},{"id":"p0032","text":"Section 2.1 Transfers of Depositor Transferred Property."},{"id":"p0033","tex…
```

- [seq 1065](trajectory.jsonl#L1065) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0134","p0975","p0976","p0977","p0034","p0037","p0211","p0595"],"quote":"Section 3.8 Servicer's Fees. As compensation for performing its obligations under this Agreement, the Servicer will be paid the Servicing Fee. On each Payment Date, the Issuer will pay the Servicing Fee to the Servicer according to Section 8.2 of the Indenture.","rationale":"The agreement imposes no minimum purchase or volume commitment on us. Our only compensation obligation to Cellco is the Servicing Fee, payable solely \"As compensation for performing its obligations under this Agreement\" and calculated as \"one-twelfth of the Servicing Fee Rate\" (0.75%) times \"the Adjusted Pool Balance\" — i.e., a purely usage/asset-based fee for services actually rendered, with no floor, minimum, take-or-pay, or shortfall penalty. Likewise the Supplemental Servicing Fee and Temporarily Excluded Receivables Servicing Fee are computed on actual Recoveries and actual Principal Balances. Acquisitions of Additional Receivables (Sections 2.1(b) and 2.1(d)) are conditional transfers with no committed minimum volume or frequency, and no volume cap restricts us. Searches for \"minimum\", \"commit\", \"volume\", \"take or pay\" and \"obligated to purchase\" returned no obligation running against us. The two \"shortfall\" hits confirm the planner's read and run in our favour or against third parties: the Marketing Agent's Credit Payment deposit obligation on a \"shortfall in Collections\" (p0211) is a payment to us, and the requirement that \"The customer is required to purchase a new qualifying device\" (p0595) is an upgrade-offer condition on Obligors, not on the Issuer or Depositor. This sits at the preferred position (no minimum commitment; fees for services actually performed), so no redline is warranted.","confidence":0.9}
```

- [seq 1066](trajectory.jsonl#L1066) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1065](trajectory.jsonl#L1065)
- Finding: `f-mincommit-8a1b2105` · **compliant** · confidence 0.90
- Location: § III SERVICING OF RECEIVABLES
- Quote: “Section 3.8 Servicer's Fees. As compensation for performing its obligations under this Agreement, the Servicer will be paid the Servicing Fee. On each Payment Date, the Issuer will pay the Servicing Fee to the Servicer according to Section 8.2 of the Indenture.”
- Rationale: The agreement imposes no minimum purchase or volume commitment on us. Our only compensation obligation to Cellco is the Servicing Fee, payable solely "As compensation for performing its obligations under this Agreement" and calculated as "one-twelfth of the Servicing Fee Rate" (0.75%) times "the Adjusted Pool Balance" — i.e., a purely usage/asset-based fee for services actually rendered, with no floor, minimum, take-or-pay, or shortfall penalty. Likewise the Supplemental Servicing Fee and Temporarily Excluded Receivables Servicing Fee are computed on actual Recoveries and actual Principal Balances. Acquisitions of Additional Receivables (Sections 2.1(b) and 2.1(d)) are conditional transfers with no committed minimum volume or frequency, and no volume cap restricts us. Searches for "minimum", "commit", "volume", "take or pay" and "obligated to purchase" returned no obligation running against us. The two "shortfall" hits confirm the planner's read and run in our favour or against third parties: the Marketing Agent's Credit Payment deposit obligation on a "shortfall in Collections" (p0211) is a payment to us, and the requirement that "The customer is required to purchase a new qualifying device" (p0595) is an upgrade-offer condition on Obligors, not on the Issuer or Depositor. This sits at the preferred position (no minimum commitment; fees for services actually performed), so no redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 964](trajectory.jsonl#L964)

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
{"ruleId":"TRANSITION","candidateSectionIds":["sec-vii","sec-iii"],"candidateParagraphIds":["p0342","p0343","p0346","p0347","p0147","p0157","p0335","p0338"],"likelyAbsent":false,"note":"Section 7.5 Transition of Servicing (p0342-p0347) is the core: cooperation on termination (p0343), the carve-out refusing to provide software/processes or anything restricted by confidentiality or data-protection policies (p0346), and cost allocation (p0347). Also Custodian file delivery on termination (p0147) and Successor Servicer mechanics (p0335, p0338). Assess whether p0346 materially undermines our data-return and migration rights."}

Investigate every responsive location, choose one target level, validate the smallest complete proposal, map every target element, and submit one finding.
```

### Tool trace

- [seq 988](trajectory.jsonl#L988) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0342","p0343","p0344","p0345","p0346","p0347"]}
```

- [seq 989](trajectory.jsonl#L989) **read_paragraphs result**

```json
[{"id":"p0342","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"Section 7.5 Transition of Servicing."},{"id":"p0343","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER","text":"(a) Cooperation on Termination. On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and th…
```

- [seq 990](trajectory.jsonl#L990) **drafter → search**

```json
{"query":"transition of servicing"}
```

- [seq 991](trajectory.jsonl#L991) **search result**

```json
[{"paragraphId":"p0018","sectionRef":"§ 2.6 Originators' Reacquisition or Servicer's Acquisition of Bankruptcy Surrendered Receivables 6","snippet":"…ection 7.3 Continue to Perform 34 Section 7.4 Successor Servicer 35 Section 7.5 Transition of Servicing 36 Section 7.6 Merger, Consolidation, Succession or Assignment 37"},{"paragraphId":"p0342","sectionRef":"§ VII SERVICER RESIGNATION AND TERMINATI…
```

- [seq 1013](trajectory.jsonl#L1013) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0147","p0157","p0335","p0338","p0336","p0337","p0339","p0340","p0341"]}
```

- [seq 1014](trajectory.jsonl#L1014) **read_paragraphs result**

```json
[{"id":"p0147","sectionRef":"§ III SERVICING OF RECEIVABLES","text":"(f) Effective Period and Termination. Cellco's appointment as custodian is effective as of the Initial Cutoff Date and will continue until the later of (i) the date on which all obligations of the Issuer have been paid in full and (ii) the date on which such appointment is terminated under this Section 3.10(f). If the Servicer r…
```

- [seq 1015](trajectory.jsonl#L1015) **drafter → search**

```json
{"query":"deliver Receivable Files termination custodian"}
```

- [seq 1016](trajectory.jsonl#L1016) **search result**

```json
[]
```

- [seq 1036](trajectory.jsonl#L1036) **drafter → lookup_precedent**

```json
{"ruleId":"TRANSITION","context":"Servicer resignation/termination transition of servicing; 90 days assistance and 30-day file delivery"}
```

- [seq 1037](trajectory.jsonl#L1037) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 1038](trajectory.jsonl#L1038) **drafter → search**

```json
{"query":"machine-readable format export data delete certify"}
```

- [seq 1039](trajectory.jsonl#L1039) **search result**

```json
[]
```

- [seq 1056](trajectory.jsonl#L1056) **drafter → search**

```json
{"query":"ninety days"}
```

- [seq 1057](trajectory.jsonl#L1057) **search result**

```json
[]
```

- [seq 1058](trajectory.jsonl#L1058) **drafter → search**

```json
{"query":"records maintained by the Servicer delivery"}
```

- [seq 1059](trajectory.jsonl#L1059) **search result**

```json
[]
```

- [seq 1073](trajectory.jsonl#L1073) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a 90-day transition assistance period and a 30-day outside date for delivery of funds, Receivable Files and records on Servicer resignation or termination.","comment":"[Playbook] Section 7.5 requires cooperation but sets no minimum assistance period and only an open-ended \\\"as soon as practicable\\\" delivery date, so we have added our fallback position: at least 90 days of transition assistance and delivery of the funds, Receivable Files and records within 30 days of the effective date of resignation or termination.","ops":[{"kind":"replace","paragraphId":"p0343","oldText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer.","newText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer, and will provide such transition assistance for at least ninety (90) days after the effective date of its resignation or termination."},{"kind":"replace","paragraphId":"p0344","oldText":"As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will","newText":"Within thirty (30) days after the effective date of its resignation or termination, the predecessor Servicer will"}]}
```

- [seq 1074](trajectory.jsonl#L1074) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0343","segments":[{"type":"equal","text":"(a) Cooperation on Termination. On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such ri…
```

- [seq 1081](trajectory.jsonl#L1081) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0343","p0344","p0346"],"quote":"(b) Transfer of Cash, Receivable Files and Records. As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will (i) transfer to the Successor Servicer all funds relating to the Receivables that are held or later received by the","rationale":"Section 7.5 does contain a transition regime: the Servicer must cooperate in an orderly transition on resignation or termination (p0343) and must transfer funds and deliver the Receivable Files and records to the Successor Servicer (p0344/p0346), with the custodian delivering Receivable Files on termination of that appointment (p0147). However it fails the fallback on two material terms: there is no minimum transition assistance period (no 90 days, or any period), and delivery of files and records is only \"as soon as practicable\", with no 30-day outside date. We therefore target the fallback with the two shortest conforming edits: a 90-day assistance floor in 7.5(a) and a 30-day delivery deadline in 7.5(b). We have not pursued the preferred position (six months, machine-readable format, certified deletion), which is not required where fallback is met. We note but do not redline the 7.5(b) carve-out (p0346) refusing to license servicing software or provide items restricted by confidentiality or data protection policies; it is directed at Servicer processes and third-party-restricted materials rather than the express Receivable Files and records delivery obligation, and the cost allocation in 7.5(c) sits with the terminated Servicer.","confidence":0.78,"elementCoverage":{"level":"fallback","mappings":[{"element":"Transition obligations apply on expiry or termination.","status":"already_met","quote":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer."},{"element":"Vendor provides at least 90 days of transition assistance.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor exports Customer Data within 30 days after expiry or termination.","status":"addressed_by_operation","operationIndexes":[2]}]},"proposal":{"level":"fallback","summary":"Add a 90-day transition assistance period and a 30-day outside date for delivery of funds, Receivable Files and records on Servicer resignation or termination.","comment":"[Playbook] Section 7.5 requires cooperation but sets no minimum assistance period and only an open-ended \"as soon as practicable\" delivery date, so we have added our fallback position: at least 90 days of transition assistance and delivery of the funds, Receivable Files and records within 30 days of the effective date of resignation or termination.","ops":[{"kind":"replace","paragraphId":"p0343","oldText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer.","newText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer, and will provide such transition assistance for at least ninety (90) days after the effective date of its resignation or termination."},{"kind":"replace","paragraphId":"p0344","oldText":"As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will","newText":"Within thirty (30) days after the effective date of its resignation or termination, the predecessor Servicer will"}]}}
```

- [seq 1082](trajectory.jsonl#L1082) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 1085](trajectory.jsonl#L1085) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Add a 90-day transition assistance period and a 30-day outside date for delivery of funds, Receivable Files and records on Servicer resignation or termination.","comment":"[Playbook] Section 7.5 requires cooperation but sets no minimum assistance period and only an open-ended as-soon-as-practicable delivery date, so we have added our fallback position: at least 90 days of transition assistance and delivery of the funds, Receivable Files and records within 30 days of the effective date of resignation or termination.","ops":[{"kind":"replace","paragraphId":"p0343","oldText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer.","newText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer, and will provide such transition assistance for at least ninety (90) days after the effective date of its resignation or termination."},{"kind":"replace","paragraphId":"p0344","oldText":"As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will","newText":"Within thirty (30) days after the effective date of its resignation or termination, the predecessor Servicer will"}]}
```

- [seq 1086](trajectory.jsonl#L1086) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0343","segments":[{"type":"equal","text":"(a) Cooperation on Termination. On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such ri…
```

- [seq 1089](trajectory.jsonl#L1089) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0343","p0344","p0346"],"quote":"(b) Transfer of Cash, Receivable Files and Records. As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will (i) transfer to the Successor Servicer all funds relating to the Receivables that are held or later received by the","rationale":"Section 7.5 does contain a transition regime: the Servicer must cooperate in an orderly transition on resignation or termination (p0343) and must transfer funds and deliver the Receivable Files and records to the Successor Servicer (p0344/p0346), with the custodian delivering Receivable Files on termination of that appointment (p0147). It fails the fallback on two material terms: there is no minimum transition assistance period, and delivery of files and records is only \"as soon as practicable\", with no 30-day outside date. We therefore target the fallback with the two shortest conforming edits: a 90-day assistance floor in 7.5(a) and a 30-day delivery deadline in 7.5(b). We have not pursued the preferred position (six months, machine-readable format, certified deletion), which is not required where the fallback is met. We note but do not redline the 7.5(b) carve-out (p0346) refusing to license servicing software or provide items restricted by confidentiality or data protection policies; it is directed at Servicer processes and third-party-restricted materials rather than the express Receivable Files and records delivery obligation, and 7.5(c) already places transition expenses on the terminated Servicer.","confidence":0.78,"elementCoverage":{"level":"fallback","mappings":[{"element":"Transition obligations apply on expiry or termination.","status":"already_met","quote":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer."},{"element":"Vendor provides at least 90 days of transition assistance.","status":"addressed_by_operation","operationIndexes":[1]},{"element":"Vendor exports Customer Data within 30 days after expiry or termination.","status":"addressed_by_operation","operationIndexes":[2]}]},"proposal":{"level":"fallback","summary":"Add a 90-day transition assistance period and a 30-day outside date for delivery of funds, Receivable Files and records on Servicer resignation or termination.","comment":"[Playbook] Section 7.5 requires cooperation but sets no minimum assistance period and only an open-ended as-soon-as-practicable delivery date, so we have added our fallback position: at least 90 days of transition assistance and delivery of the funds, Receivable Files and records within 30 days of the effective date of resignation or termination.","ops":[{"kind":"replace","paragraphId":"p0343","oldText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer.","newText":"On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer, and will provide such transition assistance for at least ninety (90) days after the effective date of its resignation or termination."},{"kind":"replace","paragraphId":"p0344","oldText":"As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will","newText":"Within thirty (30) days after the effective date of its resignation or termination, the predecessor Servicer will"}]}}
```

- [seq 1090](trajectory.jsonl#L1090) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 1089](trajectory.jsonl#L1089)
- Finding: `f-transition-d8bab96d` · **deviation** · confidence 0.78
- Location: § VII SERVICER RESIGNATION AND TERMINATION; SUCCESSOR SERVICER
- Quote: “(b) Transfer of Cash, Receivable Files and Records. As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will (i) transfer to the Successor Servicer all funds relating to the Receivables that are held or later received by the”
- Rationale: Section 7.5 does contain a transition regime: the Servicer must cooperate in an orderly transition on resignation or termination (p0343) and must transfer funds and deliver the Receivable Files and records to the Successor Servicer (p0344/p0346), with the custodian delivering Receivable Files on termination of that appointment (p0147). It fails the fallback on two material terms: there is no minimum transition assistance period, and delivery of files and records is only "as soon as practicable", with no 30-day outside date. We therefore target the fallback with the two shortest conforming edits: a 90-day assistance floor in 7.5(a) and a 30-day delivery deadline in 7.5(b). We have not pursued the preferred position (six months, machine-readable format, certified deletion), which is not required where the fallback is met. We note but do not redline the 7.5(b) carve-out (p0346) refusing to license servicing software or provide items restricted by confidentiality or data protection policies; it is directed at Servicer processes and third-party-restricted materials rather than the express Receivable Files and records delivery obligation, and 7.5(c) already places transition expenses on the terminated Servicer.
- Proposal: **fallback** — Add a 90-day transition assistance period and a 30-day outside date for delivery of funds, Receivable Files and records on Servicer resignation or termination.
- Comment: [Playbook] Section 7.5 requires cooperation but sets no minimum assistance period and only an open-ended as-soon-as-practicable delivery date, so we have added our fallback position: at least 90 days of transition assistance and delivery of the funds, Receivable Files and records within 30 days of the effective date of resignation or termination.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer, and will provide such transition assistance for at least ninety (90) days after the effective date of its resignation or termination.",
    "oldText": "On its resignation or termination, the Servicer will cooperate with the Issuer, the Owner Trustee, the Indenture Trustee and the Successor Servicer in effecting (i) the termination of its rights and obligations under this Agreement and (ii) an orderly transition of such rights and obligations to the Successor Servicer.",
    "paragraphId": "p0343"
  },
  {
    "kind": "replace",
    "newText": "Within thirty (30) days after the effective date of its resignation or termination, the predecessor Servicer will",
    "oldText": "As soon as practicable after the effective date of its resignation or termination, the predecessor Servicer will",
    "paragraphId": "p0344"
  }
]
```

### Verifier and repair feedback

- [seq 1095](trajectory.jsonl#L1095) **Verdict: pass** — Fallback is position-complete: the trigger element was already met by retained 7.5(a), operation 1 supplies the 90-day assistance floor, and operation 2 converts "as soon as practicable" into a fixed 30-day delivery deadline. Preferred is not complete and is correctly not claimed: no six-month period, no then-current-rates term, no machine-readable format, and no certified deletion after return. Minimality holds. Only two edits were made, each traceable to a fallback element; "at least ninety (90) days" sits exactly at the threshold without exceeding it, and replacing "As soon as practicable" is necessary because retaining it alongside a 30-day outside date would create competing timing standards. No survival tail, expense language, format, deletion or certification extras were bolted on. Intent preserved: the 7.5(b) carve-out for processes, models and servicing software, the funds-transfer limb, and the 7.5(c) expense allocation all survive unchanged; no defined term is orphaned and no cross-reference dangles. Residual risk to note for the drafter (not a fallback failure, and not a defect the fallback checklist requires curing): the retained sentence excusing delivery of "anything covered by a restriction on transfer or assignment or a confidentiality agreement or otherwise restricted by legal, regulatory, privacy or data protection policies" is broad enough to be argued against Receivable Files containing obligor data. If the team wants belt-and-braces, the minimal cure is a carve-back such as "except that this sentence does not limit clause (ii) above," but adding it now would be an extra beyond the selected checklist. If the preferred position is later pursued, the exact repairs are: extend 7.5(a) assistance to six months at the Servicer's then-current rates, specify a commonly used machine-readable format in 7.5(b)(ii), and add a post-delivery deletion-and-written-certification limb. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"data return/transition present","ok":true}; {"name":"minimality gate","ok":true}; {"name":"element coverage gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 1100](trajectory.jsonl#L1100) memo LLM request
- [seq 1101](trajectory.jsonl#L1101) memo LLM response (replay)

```markdown
# Issues Memo — Form of Transfer and Servicing Agreement

**To:** Deal team  
**From:** In-house counsel (Customer side — Issuer / Depositor)  
**Re:** Playbook review findings, redline priorities and walk-away exposure

---

## 1. Executive summary

We have completed the playbook review of the Form of Transfer and Servicing Agreement. The document is structurally favourable to us on most commercial-protection rules: there is no exclusivity, non-compete, non-solicit, MFN, minimum-commitment or liquidated-damages obligation binding our side; governing law and venue are New York; audit and inspection rights run in our favour only; and the liability architecture is symmetric and uncapped, with Cellco's Section 6.3 indemnities sitting outside any ceiling. We are not proposing a liability cap, because introducing one would newly cap Cellco's presently uncapped exposure.

Six items require action. Two of them sit in walk-away territory as scored: the **licence position** (Section 7.5(b) is an express refusal to license servicing software, with no grant of any kind to the Issuer) and the **absence of any Servicer insurance covenant**, notwithstanding that Cellco holds Obligor account, payment and Receivable File data. The remaining action items are **assignment** (no Issuer consent right over a Servicer assignment, plus an unrestricted Cellco-Affiliate carve-out in Section 7.6), **Vendor indemnification** (no duty to defend; no Affiliates; no violation-of-Law, data-breach or IP limbs), **transition assistance** (no minimum assistance period and no outside delivery date) and **deliverables/data licence** (no licence in reports, files and records prepared for us).

One further item — **termination for convenience** — was scored as a walk-away case (our only exit is cause-based under Section 7.2(c) in a multi-year term), but the finding did not pass verification. We flag it for internal confirmation before it is raised with the counterparty.

---

## 2. Findings

| # | Severity | Rule | Status | Section | Position |
|---|---|---|---|---|---|
| 1 | Critical | LOL-CAP — Limitation of liability | Compliant | § VI Servicer and Marketing Agent | Exculpation is symmetric (§ 6.2(a) / § 5.2(a)); no monetary cap anywhere, so Cellco's § 6.3 indemnities are uncapped. § 9.6 limited recourse is one-sided in our favour. No redline — a cap would weaken us. |
| 2 | High | ASSIGN — Assignment and change of control | **Deviation** | § X Miscellaneous | § 10.2(a) requires trustee/holder consents but not the Issuer's or Depositor's; consent standard unqualified; no competitor bar; § 7.6 permits consent-free assignment to any Cellco Affiliate. Our outbound leg is protected by § 5.3. |
| 3 | High | EXCLUSIVITY | Compliant | § III Servicing of Receivables | Bare appointments of Cellco as Servicer, Custodian and Marketing Agent; no sole/exclusive designation and no requirements commitment. |
| 4 | High | LD — Liquidated damages / penalties | Compliant | § VIII Termination | No LDs, penalties or early-termination fees payable by us. Make-Whole Payment is investor yield maintenance on a voluntary Optional Redemption, not a breach-triggered sum. |
| 5 | High | LICENSE — Licence grant scope | **Deviation (walk-away)** | § VII Servicer Resignation and Termination; Successor Servicer | § 7.5(b) expressly refuses to license or assign Servicer processes, models or servicing software to any Successor Servicer or third party. No grant exists; Affiliates excluded; nothing transferable to a successor. |
| 6 | High | NONCOMPETE | Compliant | § III Servicing of Receivables | No non-compete, field-of-use or territory covenant binds the Issuer or Depositor. Successor-servicer provisions expressly contemplate engaging another servicer. |
| 7 | High | T4C — Termination for convenience | **Needs review (verification failed)** | § VII Servicer Resignation and Termination; Successor Servicer | Scored as walk-away: removal only for a continuing Servicer Termination Event (§ 7.2(c)) in a term running to final Receivable payment (§ 8.3). Proposed § 7.2(e) convenience right requires internal verification before use. |
| 8 | Medium | AUDIT — Audit rights against Customer | Compliant | § III Servicing of Receivables | All access rights (§ 3.6, § 3.9(e)) run in our favour; Cellco has no reciprocal audit or access right over our records or systems. |
| 9 | Medium | GOVLAW — Governing law and venue | Compliant | § X Miscellaneous | § 10.5 New York law (with an anti-amendment lock); § 10.6 SDNY / New York State courts. Submission is non-exclusive — noted only, well above fallback. |
| 10 | Medium | INDEMN — Indemnification by Vendor | **Deviation** | § VI Servicer and Marketing Agent | § 6.3 runs our way but lacks an express duty to defend, omits Issuer Affiliates from Indemnified Persons, and is limited to willful misconduct, bad faith or gross negligence with no violation-of-Law, data-breach or IP limb and no cooperation covenant. |
| 11 | Medium | MFN | Compliant | § IX Other Agreements | No most-favoured-nation, right-to-match or best-terms obligation burdening our side. |
| 12 | Medium | MINCOMMIT — Minimum commitments | Compliant | § III Servicing of Receivables | Servicing Fee is purely asset-based (one-twelfth of the 0.75% rate on Adjusted Pool Balance); no floor, take-or-pay or volume cap. |
| 13 | Medium | NOSOLICIT | Compliant | § VI Servicer and Marketing Agent | No non-solicit, no-hire or anti-poaching covenant anywhere, including in Article VII servicing-transfer provisions. |
| 14 | Medium | RENEWAL — Auto-renewal | Compliant | § VIII Termination | No term-and-renewal structure; § 8.3 runs to final Receivable payment. Extension would require amendment by the parties under § 10.1(a). |
| 15 | Medium | TRANSITION — Transition assistance and data return | **Deviation** | § VII Servicer Resignation and Termination; Successor Servicer | § 7.5 requires orderly cooperation and delivery of funds, Receivable Files and records, but sets no minimum assistance period and only "as soon as practicable" for delivery. |
| 16 | Medium | WARRANTY — Performance warranty | Compliant | § III Servicing of Receivables | § 3.2(a) reasonable-care/comparable-portfolio standard, § 6.1(a) representations repeated at each Acquisition Date, § 3.3(b) notice-and-correct, and Acquisition Amount reacquisition under §§ 2.5 / 3.3(d). No "AS IS" disclaimer. Sits at the fallback. |
| 17 | Low | INSURANCE — Vendor insurance | **Missing (walk-away)** | § X Miscellaneous | No insurance covenant of any kind for the Servicer, Marketing Agent or Custodian, despite Cellco holding Obligor account, payment and Receivable File data. |
| 18 | Low | IP — Ownership of deliverables and Customer Data | **Deviation** | § VII Servicer Resignation and Termination; Successor Servicer | Ownership is safe (Receivables owned by the Issuer; Files held for Issuer/Indenture Trustee benefit), but we receive no licence in the Monthly Investor Reports, Receivable Files, accounts and records prepared for us. |

---

## 3. Walk-away items

These sit in walk-away territory under the playbook and should be resolved before signature:

1. **No licence of any kind (LICENSE, § 7.5(b)).** The Agreement affirmatively disclaims any obligation to license or assign Servicer processes, models or servicing software. Nothing is available to our Affiliates and nothing is transferable to a successor. *Position:* convert the disclaimer sentence into a licence to the Issuer at the fallback level — Affiliates on written notice, transferable to an M&A successor — retaining verbatim the carve-out for confidentiality- and law-restricted materials. We are not pursuing perpetual/irrevocable or subscription-linked preferred elements, which have no subject matter in this structure.
2. **No Servicer insurance (INSURANCE).** Cellco services the Receivables and holds Obligor data with no E&O or cyber cover required. *Position:* insert a short fallback-level covenant at the end of Article X — E&O of $1,000,000 and cyber/privacy of $2,000,000 — rather than the full preferred programme.
3. **No customer termination for convenience (T4C) — subject to verification.** As scored, our only exit is cause-based in a term longer than 12 months, which is the walk-away case. The finding did not pass verification, so we should confirm the analysis (including that the Optional Acquisition and Optional Redemption in §§ 8.1–8.2 are conditional Class A Certificateholder options rather than a convenience right) before tabling the proposed § 7.2(e).

We would not treat the assignment, indemnity, transition or IP deviations as walk-aways; each is a fallback-level repair.

---

## 4. Next steps

1. **Confirm the T4C finding internally** before it goes to the counterparty; the verification failure means we should not rely on it in negotiation as drafted.
2. **Issue the redline package** covering the five verified action items, in this order of priority:
   - **§ 7.5(b)** — convert the licence disclaimer into an Issuer licence (Affiliates on notice; transferable to an M&A successor).
   - **§ 10.2(a) / § 7.6** — add the Issuer's reasonable consent to any Servicer assignment (including to a Cellco Affiliate), add a competitor bar, and remove the § 7.6 exception for the Servicer only, leaving § 5.3 and the § 7.4 successor-servicer mechanics intact.
   - **§ 6.3** — "will defend and indemnify", extend Indemnified Persons to the Issuer's Affiliates, add limbs for violation of Law, unauthorized access to or disclosure of Obligor data or Receivable Files, and third-party IP infringement, plus a reasonable-cooperation sentence. We deliberately leave the permissive assumption of defence in § 6.3(b) untouched and import no super-cap, since § 6.3 is presently uncapped.
   - **§ 7.5(a)–(b)** — add a 90-day transition assistance floor and a 30-day outside date for delivery of funds, Receivable Files and records.
   - **New § 10.14** — Servicer E&O ($1,000,000) and cyber/privacy ($2,000,000) insurance.
   - **§ 9.4** — add a perpetual, irrevocable, worldwide, royalty-free licence for the Issuer to use, modify and sublicense the Servicer's reports, files and records, without disturbing the Servicer's retained tools.
3. **Confirm with the business whether the transaction involves any services, deliverables, software or IP-licence subject matter.** If not, the IP-infringement limb of the proposed § 6.3(a)(iii) can be dropped as scoped out.
4. **No action** on the twelve compliant rules. In particular, we will not propose a liability cap (it would cap Cellco's uncapped indemnity), will not seek an exclusive-forum amendment (§ 10.6 sits well above fallback), and will not move § 7.1 on Servicer resignation, which already exceeds our preferred position.
5. **Note for the negotiation record:** the § 3.6 and § 3.9(e) access rights we hold are qualified by the Servicer's security, confidentiality, privacy and data-protection policies and must be exercised by all parties at the same time at the Servicer's offices. That concerns the strength of our own inspection rights rather than any audit obligation on us, so it is outside the AUDIT rule; raise it separately if the business wants broader access.
```

## Apply and validation

No apply or output-validation event was recorded.
