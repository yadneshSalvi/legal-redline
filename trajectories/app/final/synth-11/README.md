# Trajectory: synth-11

| Run | Value |
|---|---|
| Contract | synth-11 — MASTER SERVICES AGREEMENT |
| Config | final |
| Parties | Redwood Commerce Group, Inc. (our party) ↔ Silverline Systems Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 3m 19.1s (199,076 ms) |
| Calls | 111 LLM · 122 tool · 0 retries |
| Tokens | 68,378 input · 51,427 output · 833,114 cache read · 187,441 cache write |
| Cost | $3.215628 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 426 | 91 | 122 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 493](trajectory.jsonl#L493) |
| verifier | 54 | 18 | 0 | 18 verdict(s) | [seq 107](trajectory.jsonl#L107)–[seq 502](trajectory.jsonl#L502) |
| assembler | 21 | 0 | 0 | — | [seq 130](trajectory.jsonl#L130)–[seq 510](trajectory.jsonl#L510) |
| memo | 4 | 1 | 0 | — | [seq 506](trajectory.jsonl#L506)–[seq 509](trajectory.jsonl#L509) |
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
{"sectionRef":"§ 21 LIMITATION OF LIABILITY","paragraphs":[{"id":"p0087","text":"21. LIMITATION OF LIABILITY"}]}
```

- [seq 15](trajectory.jsonl#L15) **drafter → list_sections**

```json
{}
```

- [seq 16](trajectory.jsonl#L16) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 67](trajectory.jsonl#L67) **drafter → search**

```json
{"query":"liability","limit":25}
```

- [seq 68](trajectory.jsonl#L68) **search result**

```json
[{"paragraphId":"p0073","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber an…
```

- [seq 69](trajectory.jsonl#L69) **drafter → search**

```json
{"query":"unlimited"}
```

- [seq 70](trajectory.jsonl#L70) **search result**

```json
[]
```

- [seq 87](trajectory.jsonl#L87) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0088","p0089","p0090","p0091"],"quote":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","rationale":"Section 21 meets the preferred position. The cap is expressly mutual and set at the greater of Fees paid or payable in the twelve months preceding the event and USD 1,000,000; \"Fees\" (§1.5) covers recurring subscription, professional services and usage fees, so the base is meaningful rather than illusory. Section 21.2 excludes indirect/consequential damages mutually while confirming data restoration, replacement services, notice and incident-response costs are direct damages. Section 21.3 carves out (uncapped) confidentiality, data-protection and security breaches, indemnification obligations, gross negligence, wilful misconduct, fraud and infringement of the other Party's IP, and confirms Customer's obligation to pay undisputed Fees is not \"damages\" subject to the cap. Section 21.4 preserves the caps against failure of exclusive remedy, and §18.2 confirms insurance does not limit Vendor's liabilities. No one-sided or hidden liability language appears elsewhere. No redline needed.","confidence":0.93}
```

- [seq 88](trajectory.jsonl#L88) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 87](trajectory.jsonl#L87)
- Finding: `f-lol-cap-85b7fb6d` · **compliant** · confidence 0.93
- Location: § 21.1 Except for Excluded Claims, each Party's total aggregate li…
- Quote: “21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.”
- Rationale: Section 21 meets the preferred position. The cap is expressly mutual and set at the greater of Fees paid or payable in the twelve months preceding the event and USD 1,000,000; "Fees" (§1.5) covers recurring subscription, professional services and usage fees, so the base is meaningful rather than illusory. Section 21.2 excludes indirect/consequential damages mutually while confirming data restoration, replacement services, notice and incident-response costs are direct damages. Section 21.3 carves out (uncapped) confidentiality, data-protection and security breaches, indemnification obligations, gross negligence, wilful misconduct, fraud and infringement of the other Party's IP, and confirms Customer's obligation to pay undisputed Fees is not "damages" subject to the cap. Section 21.4 preserves the caps against failure of exclusive remedy, and §18.2 confirms insurance does not limit Vendor's liabilities. No one-sided or hidden liability language appears elsewhere. No redline needed.

### Verifier and repair feedback

- [seq 129](trajectory.jsonl#L129) **Verdict: pass** — Cited §21.1–21.4 match the preferred position: mutual aggregate cap at the greater of Fees paid or payable in the preceding twelve months and USD 1,000,000, with 'Fees' defined broadly (recurring subscription, professional services, usage fees), so the base is not illusory. Mutual exclusion of indirect/consequential damages (§21.2) plus uncapped Excluded Claims (§21.3) covering confidentiality, data protection/security, indemnification, gross negligence, wilful misconduct, fraud and infringement of the other Party's IP — the full carve-out set the rule requires. §21.3 also confirms Customer's obligation to pay undisputed Fees is not 'damages' subject to the cap, matching the preferred position's final element. Consistent with a compliant finding, no redline or comment was proposed; the rendered redline is identical to the original paragraphs and both deterministic checks pass. Checks: {"name":"cap references 12 months of fees or a fixed floor","ok":true}; {"name":"no unlimited Customer liability language remains","ok":true}.

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
{"sectionId":"sec-20"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 20 INDEMNIFICATION","paragraphs":[{"id":"p0081","text":"20. INDEMNIFICATION"}]}
```

- [seq 27](trajectory.jsonl#L27) **drafter → read_section**

```json
{"sectionId":"sec-21.3"}
```

- [seq 28](trajectory.jsonl#L28) **read_section result**

```json
{"sectionRef":"§ 21.3 “Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property. Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Sec…
```

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-20.1"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.","pa…
```

- [seq 51](trajectory.jsonl#L51) **drafter → read_section**

```json
{"sectionId":"sec-20.2"}
```

- [seq 52](trajectory.jsonl#L52) **read_section result**

```json
{"sectionRef":"§ 20.2 Vendor shall also defend, indemnify, and hold harmless the Customer indemnified parties from third-party claims to the extent arising from Vendor's breach of Applicable Law; bodily injury, death, or tangible property damage caused by Vendor; unauthorized access to or disclosure of Customer Data caused by Vendor; or Vendor's gross negligence, wilful misconduct, or fraud.","pa…
```

- [seq 53](trajectory.jsonl#L53) **drafter → read_section**

```json
{"sectionId":"sec-20.3"}
```

- [seq 54](trajectory.jsonl#L54) **read_section result**

```json
{"sectionRef":"§ 20.3 Customer shall defend and indemnify Vendor from a third-party claim alleging that unmodified Customer material supplied by Customer and used by Vendor strictly as authorized infringes an intellectual property right, or arising from Customer's violation of Applicable Law in its authorized use of the Services. Customer has no obligation to the extent a claim arises from Vendor…
```

- [seq 55](trajectory.jsonl#L55) **drafter → read_section**

```json
{"sectionId":"sec-20.4"}
```

- [seq 56](trajectory.jsonl#L56) **read_section result**

```json
{"sectionRef":"§ 20.4 The indemnified Party shall give prompt notice, reasonable cooperation at the indemnifying Party's expense, and control of the defence, except delay excuses obligations only to the extent of material prejudice. The indemnifying Party may not settle a claim by admitting fault of, imposing non-monetary obligations on, or failing to fully release the indemnified Party without p…
```

- [seq 57](trajectory.jsonl#L57) **drafter → read_section**

```json
{"sectionId":"sec-20.5"}
```

- [seq 58](trajectory.jsonl#L58) **read_section result**

```json
{"sectionRef":"§ 20.5 For an infringement claim, Vendor shall, at its expense and in addition to its defence obligations, procure continued use, modify or replace the affected item without materially reducing functionality, or, if neither is commercially reasonable, terminate the item and refund prepaid and implementation Fees on a straight-line three-year basis. Vendor may not terminate unaffect…
```

- [seq 101](trajectory.jsonl#L101) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0082","p0083","p0084","p0085","p0086","p0090"],"quote":"20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.","rationale":"The clause meets the preferred position in full. Section 20.1 gives an unqualified Vendor defence and indemnity for third-party IP infringement/misappropriation claims covering Customer, its Affiliates and their personnel, with no carve-outs for modifications, combinations or specifications (better than the fallback). Section 20.2 adds Vendor indemnities for breach of Applicable Law, bodily injury/property damage, unauthorised access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud. Section 20.3 keeps our indemnity narrow — limited to unmodified Customer-supplied material used strictly as authorised and Customer's own violation of Applicable Law — with express carve-outs for Vendor Technology, modification, combination or instructions. Section 20.4 sets out standard mutual procedure (prompt notice, cooperation at the indemnifying party's expense, control of defence, prejudice-based delay standard, settlement consent), and 20.5 provides the procure/modify/replace/refund remedies with a bar on terminating unaffected Services. Section 21.3 treats indemnification obligations as Excluded Claims, so Vendor's indemnities sit outside the liability cap rather than being subject to a 3× super-cap. No deviation; nothing to redline.","confidence":0.94}
```

- [seq 102](trajectory.jsonl#L102) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 101](trajectory.jsonl#L101)
- Finding: `f-indemn-56e30d01` · **compliant** · confidence 0.94
- Location: § 20.1 Vendor shall defend, indemnify, and hold harmless Customer,…
- Quote: “20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.”
- Rationale: The clause meets the preferred position in full. Section 20.1 gives an unqualified Vendor defence and indemnity for third-party IP infringement/misappropriation claims covering Customer, its Affiliates and their personnel, with no carve-outs for modifications, combinations or specifications (better than the fallback). Section 20.2 adds Vendor indemnities for breach of Applicable Law, bodily injury/property damage, unauthorised access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud. Section 20.3 keeps our indemnity narrow — limited to unmodified Customer-supplied material used strictly as authorised and Customer's own violation of Applicable Law — with express carve-outs for Vendor Technology, modification, combination or instructions. Section 20.4 sets out standard mutual procedure (prompt notice, cooperation at the indemnifying party's expense, control of defence, prejudice-based delay standard, settlement consent), and 20.5 provides the procure/modify/replace/refund remedies with a bar on terminating unaffected Services. Section 21.3 treats indemnification obligations as Excluded Claims, so Vendor's indemnities sit outside the liability cap rather than being subject to a 3× super-cap. No deviation; nothing to redline.

### Verifier and repair feedback

- [seq 143](trajectory.jsonl#L143) **Verdict: pass** — Claimed status is compliant and the cited text supports it: Section 20.1 provides an unqualified Vendor defence/indemnity for third-party IP infringement or misappropriation claims covering Customer, Affiliates and their personnel, satisfying the core of the preferred position. Section 20.2 adds the remaining preferred triggers (Vendor's breach of Applicable Law, unauthorized access/disclosure of Customer Data caused by Vendor, gross negligence/wilful misconduct/fraud), 20.4 supplies standard notice/control/cooperation/settlement-consent procedure, and 20.5 gives procure/modify/replace/refund remedies. Customer's reciprocal indemnity in 20.3 is appropriately narrow (unmodified Customer-supplied material used as authorized and Customer's own violation of law, with carve-outs for Vendor Technology, modification, combination or instructions), consistent with the playbook. Section 21.3 places indemnification obligations in Excluded Claims, so Vendor's indemnity sits outside the liability cap — better than the fallback's 3x super-cap and favourable to us, so nothing to flag. No redline or comment was proposed, which is correct for a compliant finding; the deterministic check confirms Vendor IP indemnity is present. Checks: {"name":"vendor indemnity for IP infringement present","ok":true}.

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

- [seq 31](trajectory.jsonl#L31) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 32](trajectory.jsonl#L32) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 33](trajectory.jsonl#L33) **drafter → read_section**

```json
{"sectionId":"sec-2.2"}
```

- [seq 34](trajectory.jsonl#L34) **read_section result**

```json
{"sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","paragraphs":[{"id":"p0013","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}
```

- [seq 73](trajectory.jsonl#L73) **drafter → search**

```json
{"query":"compet","limit":20}
```

- [seq 74](trajectory.jsonl#L74) **search result**

```json
[{"paragraphId":"p0050","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 75](trajectory.jsonl#L75) **drafter → search**

```json
{"query":"shall not develop","limit":20}
```

- [seq 76](trajectory.jsonl#L76) **search result**

```json
[]
```

- [seq 95](trajectory.jsonl#L95) **drafter → search**

```json
{"query":"field of use","limit":10}
```

- [seq 96](trajectory.jsonl#L96) **search result**

```json
[]
```

- [seq 97](trajectory.jsonl#L97) **drafter → search**

```json
{"query":"Customer shall not","limit":20}
```

- [seq 98](trajectory.jsonl#L98) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 13.4 Customer shall not knowingly reverse engineer hosted source code except to the extent a restriction is prohibited by Applicable Law, interfere with the Services, bypass documented security controls, or use the Services to violate Applicable Law. These restrictions do not limit testing authorized by the security exhibit or use of Customer Data and outpu…
```

- [seq 113](trajectory.jsonl#L113) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0050"],"quote":"Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"Section 12.3 affirmatively preserves our freedom to develop, acquire, license, sell or use any product or service, engage any supplier and operate in any field or territory, and has Vendor acknowledge that we have given no non-compete commitment. That matches the preferred position (no non-compete or field-of-use restriction on Customer). No other provision binds us competitively: § 13.4 contains only ordinary use restrictions (no reverse engineering, no interference), and § 24.2's competitor reference restricts Vendor assignment, which benefits us. The exclusivity language in § 2.2 is a separate commercial term reviewed under the EXCLUSIVITY rule and is not double-flagged here.","confidence":0.9}
```

- [seq 114](trajectory.jsonl#L114) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 113](trajectory.jsonl#L113)
- Finding: `f-noncompete-c29e9151` · **compliant** · confidence 0.90
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: Section 12.3 affirmatively preserves our freedom to develop, acquire, license, sell or use any product or service, engage any supplier and operate in any field or territory, and has Vendor acknowledge that we have given no non-compete commitment. That matches the preferred position (no non-compete or field-of-use restriction on Customer). No other provision binds us competitively: § 13.4 contains only ordinary use restrictions (no reverse engineering, no interference), and § 24.2's competitor reference restricts Vendor assignment, which benefits us. The exclusivity language in § 2.2 is a separate commercial term reviewed under the EXCLUSIVITY rule and is not double-flagged here.

### Verifier and repair feedback

- [seq 155](trajectory.jsonl#L155) **Verdict: pass** — The cited § 12.3 expressly preserves Customer's freedom to develop, acquire, license, sell or use any product or service, engage any supplier and operate in any field or territory, and has Vendor acknowledge no non-compete or exclusivity commitment — this meets the preferred position (no non-compete or field-of-use restriction on Customer). Consistent with a compliant claim, no redline or counterparty comment was proposed, and the paragraph is returned unchanged; the deterministic check confirming no open-ended compete restriction on Customer passed. Declining to double-flag the § 2.2 exclusivity language (routed to the EXCLUSIVITY rule) and treating § 13.4 use restrictions and the Vendor-side § 24.2 competitor assignment limit as out of scope is correct under the playbook's no-double-flag and 'restrictions binding the Vendor are fine' guidance. Finding is properly retained as internal evidence rather than raised as a negotiation issue; no actionable proposal is required for a compliant status. Checks: {"name":"no open-ended compete restriction on Customer remains","ok":true}.

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

- [seq 19](trajectory.jsonl#L19) **drafter → read_section**

```json
{"sectionId":"sec-2.2"}
```

- [seq 20](trajectory.jsonl#L20) **read_section result**

```json
{"sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","paragraphs":[{"id":"p0013","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}
```

- [seq 21](trajectory.jsonl#L21) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 22](trajectory.jsonl#L22) **read_section result**

```json
{"sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","paragraphs":[{"id":"p0012","text":"2.1 This Agreemen…
```

- [seq 61](trajectory.jsonl#L61) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 62](trajectory.jsonl#L62) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 63](trajectory.jsonl#L63) **drafter → search**

```json
{"query":"exclusive","limit":30}
```

- [seq 64](trajectory.jsonl#L64) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","snippet":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."},{"paragraphId":"p0053","sectionRef":"§ 13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and co…
```

- [seq 105](trajectory.jsonl#L105) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Sec 2.2 makes Vendor Customer's sole and exclusive provider of hosted analytics for the term; conflicts with 2.1 and 12.3"}
```

- [seq 116](trajectory.jsonl#L116) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-exclusive","source":"Atlas Procurement Agreement (Apr 2025)","clauseAfter":"Supplier will be a non-exclusive provider of hosting services.","comment":"[Playbook] We retained flexibility to source services from other suppliers.","level":"preferred"}]}
```

- [seq 135](trajectory.jsonl#L135) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-exclusive","summary":"Make Vendor a non-exclusive provider, removing the sole-supplier commitment on Customer","comment":"[Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor a non-exclusive provider; this also removes the conflict with Sections 2.1 and 12.3, which confirm we have given no exclusivity or minimum-volume commitment.","ops":[{"kind":"replace","paragraphId":"p0013","oldText":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"2.2 Vendor will be a non-exclusive provider of hosted analytics services, and Customer may procure the same or similar services from any third party at any time."}]}
```

- [seq 136](trajectory.jsonl#L136) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0013","segments":[{"type":"equal","text":"2.2 Vendor will be "},{"type":"delete","text":"Customer's sole and "},{"type":"insert","text":"a non-"},{"type":"equal","text":"exclusive provider of hosted analytics services"},{"type":"delete","text":" throughout the term"},{"type":"insert","text":", and Customer may procure the same or similar service…
```

- [seq 159](trajectory.jsonl#L159) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0013"],"quote":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","rationale":"Section 2.2 imposes a sole-supplier obligation on us covering hosted analytics services for the entire term, with no category narrowing beyond that, no 12-month limit and no automatic exit on Vendor's service level or delivery failures — i.e. exclusive dealing for the full term with no performance-based exit, which is walk-away territory under the rule and fails the fallback. Sections 2.1 (no minimum or purchase commitment) and 12.3 (Vendor acknowledges no exclusivity commitment) contradict 2.2, so the redline both reaches the preferred position (non-exclusive supply) and resolves the internal conflict.","confidence":0.93,"proposal":{"level":"preferred","precedentId":"seed-exclusive","summary":"Make Vendor a non-exclusive provider, removing the sole-supplier commitment on Customer","comment":"[Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor a non-exclusive provider; this also removes the conflict with Sections 2.1 and 12.3, which confirm we have given no exclusivity or minimum-volume commitment.","ops":[{"kind":"replace","paragraphId":"p0013","oldText":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","newText":"2.2 Vendor will be a non-exclusive provider of hosted analytics services, and Customer may procure the same or similar services from any third party at any time."}]}}
```

- [seq 160](trajectory.jsonl#L160) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 159](trajectory.jsonl#L159)
- Finding: `f-exclusivity-d350eef7` · **deviation** · confidence 0.93
- Location: § 2.2 Vendor will be Customer's sole and exclusive provider of ho…
- Quote: “2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.”
- Rationale: Section 2.2 imposes a sole-supplier obligation on us covering hosted analytics services for the entire term, with no category narrowing beyond that, no 12-month limit and no automatic exit on Vendor's service level or delivery failures — i.e. exclusive dealing for the full term with no performance-based exit, which is walk-away territory under the rule and fails the fallback. Sections 2.1 (no minimum or purchase commitment) and 12.3 (Vendor acknowledges no exclusivity commitment) contradict 2.2, so the redline both reaches the preferred position (non-exclusive supply) and resolves the internal conflict.
- Proposal: **preferred** — Make Vendor a non-exclusive provider, removing the sole-supplier commitment on Customer
- Comment: [Playbook] We cannot commit to a sole-supplier arrangement, so we have made Vendor a non-exclusive provider; this also removes the conflict with Sections 2.1 and 12.3, which confirm we have given no exclusivity or minimum-volume commitment.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "2.2 Vendor will be a non-exclusive provider of hosted analytics services, and Customer may procure the same or similar services from any third party at any time.",
    "oldText": "2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.",
    "paragraphId": "p0013"
  }
]
```

### Verifier and repair feedback

- [seq 203](trajectory.jsonl#L203) **Verdict: pass** — The cited clause imposes a sole-and-exclusive supplier obligation on Customer for the full term with no category narrowing, no 12-month limit and no performance-based exit — this fails the fallback and sits in walk-away territory, so 'deviation' is correctly classified. The redline reaches the preferred position (non-exclusive supply, express right to procure from third parties) while preserving the underlying supply arrangement; the high changed-character ratio is justified because the exclusivity grant itself must be reversed, and no residual requirements/sole-supplier language remains. The comment is accurate, concise, in the required voice and prefix, cites the playbook position, and correctly notes the conflict with Sections 2.1 and 12.3; no exclusivity benefiting Customer was removed. Checks: {"name":"operation 1 applies","ok":true}; {"name":"no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"minimal edit p0013","ok":false,"detail":"changed-character ratio=0.634 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

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
{"sectionId":"sec-7.2"}
```

- [seq 38](trajectory.jsonl#L38) **read_section result**

```json
{"sectionRef":"§ 7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","paragraphs":[{"id":"p0027","text":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]}
```

- [seq 39](trajectory.jsonl#L39) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 40](trajectory.jsonl#L40) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"no less favourable"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[{"paragraphId":"p0027","sectionRef":"§ 7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","snippet":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]
```

- [seq 81](trajectory.jsonl#L81) **drafter → lookup_precedent**

```json
{"ruleId":"MFN","context":"Customer-side MFN obligation to be deleted; Vendor-granted MFN preserved"}
```

- [seq 90](trajectory.jsonl#L90) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-mfn","source":"Cedar Marketplace Agreement (May 2025)","clauseAfter":"","comment":"[Playbook] We removed the open-ended obligation to match terms offered to third parties.","level":"preferred"}]}
```

- [seq 109](trajectory.jsonl#L109) **drafter → propose_redline**

```json
{"ops":[{"kind":"delete_paragraph","paragraphId":"p0027"}],"comment":"[Playbook] We removed the open-ended obligation to give Vendor our best terms offered to any other technology supplier; our playbook does not accept MFN obligations running against the customer, and this clause also contradicts § 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. Any MFN pricing granted by Vendor in our favour is unaffected.","level":"preferred","summary":"Delete Customer-side most-favoured-nation obligation in § 7.2","precedentId":"seed-mfn"}
```

- [seq 110](trajectory.jsonl#L110) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0027","segments":[{"type":"delete","text":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]}]}
```

- [seq 125](trajectory.jsonl#L125) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0027","p0050"],"quote":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","rationale":"§ 7.2 imposes the MFN on us, not on Vendor: we would have to extend to Vendor the best terms we offer any other technology supplier. It is unlimited as to product, term and comparison methodology, which is the rule's walk-away position rather than the fallback (a defined product, 12 months, with reasonable-comparison carve-outs). It also directly conflicts with § 12.3, where Vendor acknowledges that we have made no most-favoured-customer commitment. We therefore delete § 7.2; nothing in the redline touches any MFN pricing granted by Vendor in our favour.","confidence":0.93,"proposal":{"ops":[{"kind":"delete_paragraph","paragraphId":"p0027"}],"comment":"[Playbook] We removed the open-ended obligation to give Vendor our best terms offered to any other technology supplier; our playbook does not accept MFN obligations running against the customer, and this clause also contradicts § 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. Any MFN pricing granted by Vendor in our favour is unaffected.","level":"preferred","precedentId":"seed-mfn","summary":"Delete Customer-side most-favoured-nation obligation in § 7.2"}}
```

- [seq 126](trajectory.jsonl#L126) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 125](trajectory.jsonl#L125)
- Finding: `f-mfn-2931a78e` · **deviation** · confidence 0.93
- Location: § 7.2 Customer shall offer Vendor terms no less favourable than t…
- Quote: “7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.”
- Rationale: § 7.2 imposes the MFN on us, not on Vendor: we would have to extend to Vendor the best terms we offer any other technology supplier. It is unlimited as to product, term and comparison methodology, which is the rule's walk-away position rather than the fallback (a defined product, 12 months, with reasonable-comparison carve-outs). It also directly conflicts with § 12.3, where Vendor acknowledges that we have made no most-favoured-customer commitment. We therefore delete § 7.2; nothing in the redline touches any MFN pricing granted by Vendor in our favour.
- Proposal: **preferred** — Delete Customer-side most-favoured-nation obligation in § 7.2
- Comment: [Playbook] We removed the open-ended obligation to give Vendor our best terms offered to any other technology supplier; our playbook does not accept MFN obligations running against the customer, and this clause also contradicts § 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. Any MFN pricing granted by Vendor in our favour is unaffected.
- Proposed ops:

```json
[
  {
    "kind": "delete_paragraph",
    "paragraphId": "p0027"
  }
]
```

### Verifier and repair feedback

- [seq 171](trajectory.jsonl#L171) **Verdict: pass** — § 7.2 plainly runs against us — Customer must offer Vendor terms no less favourable than the best given to any other technology supplier — with no product, term, or comparison limits, so it fails the fallback and sits in the rule's walk-away territory; the deviation classification is correct. The redline deletes p0027 in full, which is exactly the redline guidance ('delete the obligation on Customer; keep any Vendor-granted MFN') and is the minimal edit that reaches the preferred position; no Vendor-granted MFN language is disturbed. The comment is accurate, correctly cites the playbook position, and the noted conflict with § 12.3 (Vendor acknowledges no most-favoured-customer commitment) is supported by the quoted text; tone and prefix conform. Checks: {"name":"operation 1 applies","ok":true}.

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
{"sectionId":"sec-12.4"}
```

- [seq 44](trajectory.jsonl#L44) **read_section result**

```json
{"sectionRef":"§ 12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","paragraphs":[{"id":"p0051","text":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term."}]}
```

- [seq 45](trajectory.jsonl#L45) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 46](trajectory.jsonl#L46) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"solicit"}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[{"paragraphId":"p0051","sectionRef":"§ 12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","snippet":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term."}]
```

- [seq 85](trajectory.jsonl#L85) **drafter → lookup_precedent**

```json
{"ruleId":"NOSOLICIT","context":"One-sided 18-month non-solicit and no-hire binding Customer covering all Vendor personnel"}
```

- [seq 92](trajectory.jsonl#L92) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-nosolicit","source":"Harbor Consulting SOW (Aug 2025)","clauseAfter":"Neither party shall directly solicit personnel involved in the Services for twelve months; general advertising and unsolicited approaches are excluded.","comment":"[Playbook] We made this mutual, limited it to involved personnel and added customary carve-outs.","level":"fallback"}]}
```

- [seq 119](trajectory.jsonl#L119) **drafter → propose_redline**

```json
{"level":"fallback","summary":"Make § 12.4 mutual, limit to personnel directly involved in the Services for 12 months, delete the no-hire (\"engage\") element and add general-advertising/unsolicited-approach carve-outs.","comment":"[Playbook] We do not accept non-solicits binding the Customer, and this one is one-sided, runs eighteen months, reaches every Vendor employee and bars engagement as well as solicitation, which also conflicts with § 12.3. As a fallback we have made it mutual, limited it to personnel directly involved in the Services for twelve months, removed the no-hire element and added the customary general-advertising and unsolicited-approach carve-outs.","precedentId":"seed-nosolicit","ops":[{"kind":"replace","paragraphId":"p0051","oldText":"For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","newText":"For twelve months after the end of a person's involvement in the Services, neither party will directly solicit for employment any personnel of the other party who were directly involved in the Services. This restriction does not apply to general advertisements or other recruitment not specifically targeted at such personnel, or to unsolicited approaches by such personnel, and neither party is restricted from hiring or engaging any person."}]}
```

- [seq 120](trajectory.jsonl#L120) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0051","segments":[{"type":"equal","text":"12.4 For "},{"type":"delete","text":"eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term."},{"type":"insert","text":"twelve months after the end of a person's involvement in the Services, neither party will directly solicit for e…
```

- [seq 139](trajectory.jsonl#L139) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0051","p0050"],"quote":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","rationale":"§ 12.4 binds only the Customer, runs eighteen months from termination, covers any person employed by Vendor at any time during the term (not just personnel involved in the Services), bars \"engaging\" as well as soliciting (a no-hire), and has no general-advertising or unsolicited-approach carve-out. That fails the fallback on every material term and the no-hire/all-personnel scope is walk-away territory; it also conflicts with § 12.3, in which Vendor acknowledges Customer has made no no-hire commitment. Redline follows the redline guidance and precedent by narrowing to the fallback: mutual, limited to personnel directly involved in the Services, twelve months from the end of involvement, no-hire deleted and customary carve-outs added.","confidence":0.9,"proposal":{"level":"fallback","precedentId":"seed-nosolicit","summary":"Make § 12.4 mutual, limit to personnel directly involved in the Services for 12 months, delete the no-hire (\"engage\") element and add general-advertising/unsolicited-approach carve-outs.","comment":"[Playbook] We do not accept non-solicits binding the Customer, and this one is one-sided, runs eighteen months, reaches every Vendor employee and bars engagement as well as solicitation, which also conflicts with § 12.3. As a fallback we have made it mutual, limited it to personnel directly involved in the Services for twelve months, removed the no-hire element and added the customary general-advertising and unsolicited-approach carve-outs.","ops":[{"kind":"replace","paragraphId":"p0051","oldText":"For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","newText":"For twelve months after the end of a person's involvement in the Services, neither party will directly solicit for employment any personnel of the other party who were directly involved in the Services. This restriction does not apply to general advertisements or other recruitment not specifically targeted at such personnel, or to unsolicited approaches by such personnel, and neither party is restricted from hiring or engaging any person."}]}}
```

- [seq 140](trajectory.jsonl#L140) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 139](trajectory.jsonl#L139)
- Finding: `f-nosolicit-240e75f0` · **deviation** · confidence 0.90
- Location: § 12.4 For eighteen months after termination Customer will not sol…
- Quote: “12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.”
- Rationale: § 12.4 binds only the Customer, runs eighteen months from termination, covers any person employed by Vendor at any time during the term (not just personnel involved in the Services), bars "engaging" as well as soliciting (a no-hire), and has no general-advertising or unsolicited-approach carve-out. That fails the fallback on every material term and the no-hire/all-personnel scope is walk-away territory; it also conflicts with § 12.3, in which Vendor acknowledges Customer has made no no-hire commitment. Redline follows the redline guidance and precedent by narrowing to the fallback: mutual, limited to personnel directly involved in the Services, twelve months from the end of involvement, no-hire deleted and customary carve-outs added.
- Proposal: **fallback** — Make § 12.4 mutual, limit to personnel directly involved in the Services for 12 months, delete the no-hire ("engage") element and add general-advertising/unsolicited-approach carve-outs.
- Comment: [Playbook] We do not accept non-solicits binding the Customer, and this one is one-sided, runs eighteen months, reaches every Vendor employee and bars engagement as well as solicitation, which also conflicts with § 12.3. As a fallback we have made it mutual, limited it to personnel directly involved in the Services for twelve months, removed the no-hire element and added the customary general-advertising and unsolicited-approach carve-outs.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "For twelve months after the end of a person's involvement in the Services, neither party will directly solicit for employment any personnel of the other party who were directly involved in the Services. This restriction does not apply to general advertisements or other recruitment not specifically targeted at such personnel, or to unsolicited approaches by such personnel, and neither party is restricted from hiring or engaging any person.",
    "oldText": "For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.",
    "paragraphId": "p0051"
  }
]
```

### Verifier and repair feedback

- [seq 189](trajectory.jsonl#L189) **Verdict: pass** — Deviation classification is correct: § 12.4 is one-sided (binds only Customer), runs 18 months from termination, covers every Vendor employee rather than personnel involved in the Services, bars 'engaging' (a no-hire) and lacks any general-advertising or unsolicited-approach carve-out — it fails the fallback on every material term and the no-hire/all-personnel scope is walk-away territory. Redline lands squarely on the fallback: mutual, limited to personnel directly involved in the Services, twelve months from the end of involvement, no-hire deleted, and general-advertising plus unsolicited-approach carve-outs added. The failed 'minimal edit' heuristic (ratio 0.819) is expected here — the original clause could not reach the fallback without a full rewrite, and no unrelated terms were altered. Comment is accurate, concise and in the required voice; the noted conflict with § 12.3 (Vendor's acknowledgement that Customer made no no-hire commitment) is a genuine internal inconsistency supporting the edit. No double-flagging or benefit-to-our-party issue; the mutualised restriction is the playbook-sanctioned fallback rather than a self-inflicted burden. Checks: {"name":"operation 1 applies","ok":true}; {"name":"non-solicit duration ≤ 12 months","ok":true,"detail":"value=12"}; {"name":"general-solicitation carve-out present","ok":true}; {"name":"minimal edit p0051","ok":false,"detail":"changed-character ratio=0.819 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 131](trajectory.jsonl#L131)

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

- [seq 147](trajectory.jsonl#L147) **drafter → list_sections**

```json
{}
```

- [seq 148](trajectory.jsonl#L148) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 149](trajectory.jsonl#L149) **drafter → search**

```json
{"query":"convenience"}
```

- [seq 150](trajectory.jsonl#L150) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ 1.6 “Order Form” means a written ordering document signed by authorized representatives of both Parties that references this Agreement and describes the Services, Deliverables, subscription quantities, service levels, Fees, and term purchased by Customer. A purchase order is an administrative convenience only and does not amend an Order Form or this Agreeme…
```

- [seq 175](trajectory.jsonl#L175) **drafter → search**

```json
{"query":"without cause"}
```

- [seq 176](trajectory.jsonl#L176) **search result**

```json
[]
```

- [seq 177](trajectory.jsonl#L177) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 178](trajectory.jsonl#L178) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0037","text":"9. TERMINATION"}]}
```

- [seq 197](trajectory.jsonl#L197) **drafter → read_section**

```json
{"sectionId":"sec-9.5"}
```

- [seq 198](trajectory.jsonl#L198) **read_section result**

```json
{"sectionRef":"§ 9.5 Termination of one Order Form does not terminate another Order Form unless Customer states that the affected Services are operationally inseparable. A termination right is in addition to, and does not exclude, any other remedy available under this Agreement or Applicable Law.","paragraphs":[{"id":"p0041","text":"9.5 Termination of one Order Form does not terminate another Ord…
```

- [seq 199](trajectory.jsonl#L199) **drafter → read_section**

```json
{"sectionId":"sec-9.3"}
```

- [seq 200](trajectory.jsonl#L200) **read_section result**

```json
{"sectionRef":"§ 9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.","paragraphs":[{"id":"p0040","text":"9.3 Customer may terminate an Order For…
```

- [seq 201](trajectory.jsonl#L201) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"No customer termination for convenience in 3-year MSA; add 30 days notice with pro-rata refund"}
```

- [seq 228](trajectory.jsonl#L228) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-t4c","source":"Pioneer Services MSA (Mar 2025)","clauseAfter":"Customer may terminate an Order for convenience on thirty days' notice and will receive a pro-rata refund of prepaid fees.","comment":"[Playbook] We added a practical convenience exit and refund for unused prepaid services.","level":"preferred"}]}
```

- [seq 261](trajectory.jsonl#L261) **drafter → propose_redline**

```json
{"ops":[{"kind":"insert_after","paragraphId":"p0040","numbering":"9.4","text":"Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination and no early-termination fee or other penalty applies. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."}],"comment":"[Playbook] We added a Customer termination-for-convenience right on 30 days' notice with a pro-rata refund of prepaid Fees, as our playbook requires an exit in any term longer than twelve months; the three-year term in Section 8.1 currently offers no no-fault exit. If helpful, we can move to 60 days' notice as a fallback.","level":"preferred","summary":"Add Section 9.4 giving Customer a 30-day convenience termination right with pro-rata refund and no Vendor convenience right.","precedentId":"seed-t4c"}
```

- [seq 262](trajectory.jsonl#L262) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0040","segments":[{"type":"equal","text":"9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.…
```

- [seq 289](trajectory.jsonl#L289) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0037","p0040","p0041"],"quote":"9.5 Termination of one Order Form does not terminate another Order Form unless Customer states that the affected Services are operationally inseparable. A termination right is in addition to, and does not exclude, any other remedy available under this Agreement or Applicable Law.","rationale":"Section 9 provides only for-cause (9.1), insolvency (9.2) and Vendor-default/security (9.3) termination rights, and there is no 9.4; nothing in Sections 8 (three-year term, 180-day renewal notice), 10.2, 11 or 27.3 gives Customer a no-fault exit. A search for \"convenience\"/\"without cause\" returns no termination right for either Party. With a three-year Agreement term and auto-renewing Order Forms, the absence of any Customer convenience right falls below the fallback (60–90 days' notice) and into walk-away territory. Vendor likewise has no convenience right, so only the Customer-side gap needs fixing. We propose new 9.4 at the preferred position: 30 days' notice, pro-rata refund of prepaid Fees, no penalty, and confirmation that Vendor has no mid-term convenience right.","confidence":0.88,"proposal":{"ops":[{"kind":"insert_after","paragraphId":"p0040","numbering":"9.4","text":"Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination and no early-termination fee or other penalty applies. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."}],"comment":"[Playbook] We added a Customer termination-for-convenience right on 30 days' notice with a pro-rata refund of prepaid Fees, as our playbook requires an exit in any term longer than twelve months; the three-year term in Section 8.1 currently offers no no-fault exit. If helpful, we can move to 60 days' notice as a fallback.","level":"preferred","precedentId":"seed-t4c","summary":"Add Section 9.4 giving Customer a 30-day convenience termination right with pro-rata refund and no Vendor convenience right."}}
```

- [seq 290](trajectory.jsonl#L290) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 289](trajectory.jsonl#L289)
- Finding: `f-t4c-976b8b67` · **missing** · confidence 0.88
- Location: § 9 TERMINATION
- Quote: “9.5 Termination of one Order Form does not terminate another Order Form unless Customer states that the affected Services are operationally inseparable. A termination right is in addition to, and does not exclude, any other remedy available under this Agreement or Applicable Law.”
- Rationale: Section 9 provides only for-cause (9.1), insolvency (9.2) and Vendor-default/security (9.3) termination rights, and there is no 9.4; nothing in Sections 8 (three-year term, 180-day renewal notice), 10.2, 11 or 27.3 gives Customer a no-fault exit. A search for "convenience"/"without cause" returns no termination right for either Party. With a three-year Agreement term and auto-renewing Order Forms, the absence of any Customer convenience right falls below the fallback (60–90 days' notice) and into walk-away territory. Vendor likewise has no convenience right, so only the Customer-side gap needs fixing. We propose new 9.4 at the preferred position: 30 days' notice, pro-rata refund of prepaid Fees, no penalty, and confirmation that Vendor has no mid-term convenience right.
- Proposal: **preferred** — Add Section 9.4 giving Customer a 30-day convenience termination right with pro-rata refund and no Vendor convenience right.
- Comment: [Playbook] We added a Customer termination-for-convenience right on 30 days' notice with a pro-rata refund of prepaid Fees, as our playbook requires an exit in any term longer than twelve months; the three-year term in Section 8.1 currently offers no no-fault exit. If helpful, we can move to 60 days' notice as a fallback.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "9.4",
    "paragraphId": "p0040",
    "text": "Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty (30) days' prior written notice to Vendor, in which case Vendor shall refund any prepaid Fees for the period after the effective date of termination and no early-termination fee or other penalty applies. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."
  }
]
```

### Verifier and repair feedback

- [seq 331](trajectory.jsonl#L331) **Verdict: pass** — The rule's detection guidance treats the absence of any Customer convenience right in a term longer than 12 months as a missing-behaviour deviation; the cited Section 9 paragraphs (for-cause/security-based Order Form termination in 9.3, survival/severability of termination rights in 9.5) contain no no-fault exit, and the consecutive paragraph IDs (p0040 → p0041) corroborate that no 9.4 clause sits between 9.3 and 9.5. Redline reaches the preferred position with a single targeted insertion: Customer convenience termination on 30 days' notice, pro-rata refund of prepaid Fees, express no early-termination penalty, and no Vendor mid-term convenience right — matching the model language and using defined terms (Agreement, Order Form, Fees, Vendor) correctly. Nothing in the existing clauses is deleted or degraded, so this is the smallest edit that achieves the playbook position; the added Vendor-side sentence merely confirms the status quo and does not disadvantage us. Comment is accurate, concise, in the required voice with the [Playbook] prefix, cites the three-year term and the playbook rationale, and offers the 60-day fallback. Only minor nits, not grounds for failure: the inserted sentence is appended to p0040 without its own '9.4' numbering, and it does not restate the fee-cap fallback in the text (the fallback is offered in the comment instead). Checks: {"name":"operation 1 applies","ok":true}; {"name":"Customer convenience termination present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 145](trajectory.jsonl#L145)

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

- [seq 165](trajectory.jsonl#L165) **drafter → read_section**

```json
{"sectionId":"sec-8"}
```

- [seq 166](trajectory.jsonl#L166) **read_section result**

```json
{"sectionRef":"§ 8 TERM AND RENEWAL","paragraphs":[{"id":"p0033","text":"8. TERM AND RENEWAL"}]}
```

- [seq 167](trajectory.jsonl#L167) **drafter → list_sections**

```json
{}
```

- [seq 168](trajectory.jsonl#L168) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 193](trajectory.jsonl#L193) **drafter → read_section**

```json
{"sectionId":"sec-8.2"}
```

- [seq 194](trajectory.jsonl#L194) **read_section result**

```json
{"sectionRef":"§ 8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.","paragraphs":[{"id":"p0035","text":"8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice."}]}
```

- [seq 195](trajectory.jsonl#L195) **drafter → lookup_precedent**

```json
{"ruleId":"RENEWAL","context":"Order Form auto-renewal 12 months, 180-day non-renewal notice; uplift capped at lesser of CPI and 3%"}
```

- [seq 220](trajectory.jsonl#L220) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-renewal","source":"Summit Software Order (Sep 2025)","clauseAfter":"The Order renews for successive twelve-month terms unless Customer gives thirty days' notice before expiry.","comment":"[Playbook] We shortened the opt-out window and limited renewals to twelve months.","level":"preferred"}]}
```

- [seq 241](trajectory.jsonl#L241) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Shorten non-renewal notice window from 180 to 30 days and add a 60-day Vendor renewal reminder","comment":"[Playbook] We shortened the non-renewal notice window from 180 days to 30 days and added a 60-day renewal reminder, since our playbook allows automatic twelve-month renewals only where we can exit on short notice (60 days at the outside). The renewal term and the Section 8.3 uplift cap are unchanged.","precedentId":"seed-renewal","ops":[{"kind":"replace","paragraphId":"p0035","oldText":"unless either Party gives one hundred eighty days' advance written notice.","newText":"unless either Party gives thirty days' advance written notice before the end of the then-current term. Vendor shall notify Customer of the upcoming renewal at least sixty days before the renewal date."}]}
```

- [seq 242](trajectory.jsonl#L242) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0035","segments":[{"type":"equal","text":"8.2 Each Order Form renews for twelve months unless either Party gives "},{"type":"delete","text":"one hundred eighty "},{"type":"insert","text":"thirty "},{"type":"equal","text":"days' advance written notice"},{"type":"delete","text":"."},{"type":"insert","text":" before the end of the then-current term…
```

- [seq 275](trajectory.jsonl#L275) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0035","p0036"],"quote":"8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.","rationale":"Section 8.2 auto-renews each Order Form for twelve months (acceptable term length) but requires 180 days' advance non-renewal notice. That exceeds both the preferred window (30 days) and the fallback (no more than 60 days) and falls squarely in walk-away territory (windows longer than 90 days). Pricing risk is already mitigated by Section 8.3, which caps renewal uplift at the lesser of CPI and three percent with 90 days' notice and no increase on prepaid periods, so no pricing change is needed. We therefore made the minimal edit to reach the preferred position: a 30-day opt-out window plus a Vendor reminder 60 days before renewal; a 60-day window would be an acceptable fallback.","confidence":0.9,"proposal":{"level":"preferred","summary":"Shorten non-renewal notice window from 180 to 30 days and add a 60-day Vendor renewal reminder","comment":"[Playbook] We shortened the non-renewal notice window from 180 days to 30 days and added a 60-day renewal reminder, since our playbook allows automatic twelve-month renewals only where we can exit on short notice (60 days at the outside). The renewal term and the Section 8.3 uplift cap are unchanged.","precedentId":"seed-renewal","ops":[{"kind":"replace","paragraphId":"p0035","oldText":"unless either Party gives one hundred eighty days' advance written notice.","newText":"unless either Party gives thirty days' advance written notice before the end of the then-current term. Vendor shall notify Customer of the upcoming renewal at least sixty days before the renewal date."}]}}
```

- [seq 276](trajectory.jsonl#L276) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 275](trajectory.jsonl#L275)
- Finding: `f-renewal-81304192` · **deviation** · confidence 0.90
- Location: § 8.2 Each Order Form renews for twelve months unless either Part…
- Quote: “8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.”
- Rationale: Section 8.2 auto-renews each Order Form for twelve months (acceptable term length) but requires 180 days' advance non-renewal notice. That exceeds both the preferred window (30 days) and the fallback (no more than 60 days) and falls squarely in walk-away territory (windows longer than 90 days). Pricing risk is already mitigated by Section 8.3, which caps renewal uplift at the lesser of CPI and three percent with 90 days' notice and no increase on prepaid periods, so no pricing change is needed. We therefore made the minimal edit to reach the preferred position: a 30-day opt-out window plus a Vendor reminder 60 days before renewal; a 60-day window would be an acceptable fallback.
- Proposal: **preferred** — Shorten non-renewal notice window from 180 to 30 days and add a 60-day Vendor renewal reminder
- Comment: [Playbook] We shortened the non-renewal notice window from 180 days to 30 days and added a 60-day renewal reminder, since our playbook allows automatic twelve-month renewals only where we can exit on short notice (60 days at the outside). The renewal term and the Section 8.3 uplift cap are unchanged.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "unless either Party gives thirty days' advance written notice before the end of the then-current term. Vendor shall notify Customer of the upcoming renewal at least sixty days before the renewal date.",
    "oldText": "unless either Party gives one hundred eighty days' advance written notice.",
    "paragraphId": "p0035"
  }
]
```

### Verifier and repair feedback

- [seq 325](trajectory.jsonl#L325) **Verdict: pass** — Classification is correct: Section 8.2's 180-day non-renewal notice window exceeds both the preferred (30 days) and fallback (≤60 days) thresholds and sits in walk-away territory (>90 days), so a deviation finding with a redline is warranted. The redline reaches the preferred position with a targeted edit: notice window set to 30 days, the acceptable 12-month renewal term left intact, and a 60-day Vendor renewal reminder added as the preferred position expressly requires. The advisory changed-character ratio (0.770) is explained by the added reminder sentence, which the rule's preferred wording calls for; no unnecessary rewriting of unrelated language occurred. Correctly refrains from touching Section 8.3, which already caps renewal uplift at the lesser of CPI and 3% with no increase on prepaid periods — avoiding an over-flag of a compliant pricing term. Comment is accurate, concise, in the required first-person-plural tone with the [Playbook] prefix, states what changed and why, and cites the 60-day fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}; {"name":"minimal edit p0035","ok":false,"detail":"changed-character ratio=0.770 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 157](trajectory.jsonl#L157)

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

- [seq 181](trajectory.jsonl#L181) **drafter → read_section**

```json
{"sectionId":"sec-28"}
```

- [seq 182](trajectory.jsonl#L182) **read_section result**

```json
{"sectionRef":"§ 28 GOVERNING LAW AND DISPUTE RESOLUTION","paragraphs":[{"id":"p0113","text":"28. GOVERNING LAW AND DISPUTE RESOLUTION"}]}
```

- [seq 183](trajectory.jsonl#L183) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 184](trajectory.jsonl#L184) **search result**

```json
[]
```

- [seq 207](trajectory.jsonl#L207) **drafter → read_section**

```json
{"sectionId":"sec-28.1"}
```

- [seq 208](trajectory.jsonl#L208) **read_section result**

```json
{"sectionRef":"§ 28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.","paragraphs":[{"id":"p0114","text":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New Yo…
```

- [seq 209](trajectory.jsonl#L209) **drafter → read_section**

```json
{"sectionId":"sec-28.2"}
```

- [seq 210](trajectory.jsonl#L210) **read_section result**

```json
{"sectionRef":"§ 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum. Nothing prevents a Party from seeking temporary injunctive relief in another court with jurisdiction to protect confidential information or intellectual proper…
```

- [seq 211](trajectory.jsonl#L211) **drafter → read_section**

```json
{"sectionId":"sec-28.3"}
```

- [seq 212](trajectory.jsonl#L212) **read_section result**

```json
{"sectionRef":"§ 28.3 Before filing an ordinary commercial claim, a Party shall give notice and permit executives with settlement authority to meet in good faith within fifteen business days. This process does not delay urgent relief or a filing needed to preserve a limitations period. Discussions are compromise negotiations to the extent allowed by law.","paragraphs":[{"id":"p0116","text":"28.3 …
```

- [seq 231](trajectory.jsonl#L231) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0114","p0115","p0116"],"quote":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.","rationale":"Section 28.1 selects New York law (with CISG expressly excluded) and Section 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, with mutual submission to personal jurisdiction and a venue-objection waiver. That matches the preferred position exactly; there is no arbitration provision anywhere in the document, so no foreign seat concern. The mutual carve-out in 28.2 for temporary injunctive relief to protect confidential information or IP and the non-blocking executive escalation in 28.3 (which expressly does not delay urgent relief or limitations-period filings) are standard and reciprocal, and do not displace New York law or venue. No redline required.","confidence":0.95}
```

- [seq 232](trajectory.jsonl#L232) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 231](trajectory.jsonl#L231)
- Finding: `f-govlaw-18bb22b0` · **compliant** · confidence 0.95
- Location: § 28.1 This Agreement and each dispute arising from it are governe…
- Quote: “28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.”
- Rationale: Section 28.1 selects New York law (with CISG expressly excluded) and Section 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, with mutual submission to personal jurisdiction and a venue-objection waiver. That matches the preferred position exactly; there is no arbitration provision anywhere in the document, so no foreign seat concern. The mutual carve-out in 28.2 for temporary injunctive relief to protect confidential information or IP and the non-blocking executive escalation in 28.3 (which expressly does not delay urgent relief or limitations-period filings) are standard and reciprocal, and do not displace New York law or venue. No redline required.

### Verifier and repair feedback

- [seq 293](trajectory.jsonl#L293) **Verdict: pass** — Cited text matches the preferred position exactly: Section 28.1 selects New York law and Section 28.2 grants exclusive jurisdiction to state and federal courts in New York County with submission to personal jurisdiction and waiver of venue objections. No arbitration provision is present, so there is no foreign-seat walk-away concern; the mutual injunctive-relief carve-out and non-blocking executive escalation do not displace New York law or venue. Consistent with a compliant finding, no redline or comment was proposed and the rendered text is unchanged; deterministic check confirms governing law is within the accepted set. Checks: {"name":"governing law within the accepted set","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 173](trajectory.jsonl#L173)

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

- [seq 215](trajectory.jsonl#L215) **drafter → read_section**

```json
{"sectionId":"sec-24"}
```

- [seq 216](trajectory.jsonl#L216) **read_section result**

```json
{"sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","paragraphs":[{"id":"p0097","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"}]}
```

- [seq 217](trajectory.jsonl#L217) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 218](trajectory.jsonl#L218) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0055","text":"13.3 Customer may transfer its l…
```

- [seq 245](trajectory.jsonl#L245) **drafter → read_section**

```json
{"sectionId":"sec-24.1"}
```

- [seq 246](trajectory.jsonl#L246) **read_section result**

```json
{"sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Customer shall give prompt written notice, and the assignee shall assume the applicable obligations.","paragraphs":[{"id":"p0098","text":…
```

- [seq 247](trajectory.jsonl#L247) **drafter → read_section**

```json
{"sectionId":"sec-24.2"}
```

- [seq 248](trajectory.jsonl#L248) **read_section result**

```json
{"sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and financial standing. Vendor may never assign to a direct Customer competitor without Customer's consent.","paragraphs":[{"id":"p0099","text":"24.2 Vendor …
```

- [seq 249](trajectory.jsonl#L249) **drafter → read_section**

```json
{"sectionId":"sec-24.3"}
```

- [seq 250](trajectory.jsonl#L250) **read_section result**

```json
{"sectionRef":"§ 24.3 For other assignments, neither Party may assign without the other's prior written consent, not to be unreasonably withheld, conditioned, or delayed. A permitted assignment does not relieve accrued obligations. An attempted assignment contrary to this Section is void to the extent permitted by law.","paragraphs":[{"id":"p0100","text":"24.3 For other assignments, neither Party…
```

- [seq 251](trajectory.jsonl#L251) **drafter → read_section**

```json
{"sectionId":"sec-24.4"}
```

- [seq 252](trajectory.jsonl#L252) **read_section result**

```json
{"sectionRef":"§ 24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service. Vendor shall cooperate with reasonable administrative changes needed to reflect a permitted successor.","paragraphs":[{"id":"p0101","text":"24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees,…
```

- [seq 279](trajectory.jsonl#L279) **drafter → search**

```json
{"query":"change of control","limit":20}
```

- [seq 280](trajectory.jsonl#L280) **search result**

```json
[{"paragraphId":"p0097","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0099","sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and fina…
```

- [seq 301](trajectory.jsonl#L301) **drafter → search**

```json
{"query":"assign","limit":20}
```

- [seq 302](trajectory.jsonl#L302) **search result**

```json
[{"paragraphId":"p0039","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 319](trajectory.jsonl#L319) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0098","p0099","p0100","p0101","p0055"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets the preferred position in full. 24.1 gives Customer a consent-free right to assign to an Affiliate or to an M&A successor (notice only). 24.2 binds Vendor asymmetrically in our favour: no assignment, delegation of material performance, or transfer by change of control without our prior written consent (reasonableness qualified), and never to a direct Customer competitor. 24.3 applies a mutual not-unreasonably-withheld standard to other assignments. 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control, and 13.3 lets us move licence rights in step with a permitted Section 24 assignment. No deemed-assignment trap or change-of-control exit exists elsewhere (the 9.2 insolvency right is mutual and carves out lawful reorganizations). No redline warranted.","confidence":0.95}
```

- [seq 320](trajectory.jsonl#L320) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 319](trajectory.jsonl#L319)
- Finding: `f-assign-506eac42` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets the preferred position in full. 24.1 gives Customer a consent-free right to assign to an Affiliate or to an M&A successor (notice only). 24.2 binds Vendor asymmetrically in our favour: no assignment, delegation of material performance, or transfer by change of control without our prior written consent (reasonableness qualified), and never to a direct Customer competitor. 24.3 applies a mutual not-unreasonably-withheld standard to other assignments. 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees, or reduce service on our change of control, and 13.3 lets us move licence rights in step with a permitted Section 24 assignment. No deemed-assignment trap or change-of-control exit exists elsewhere (the 9.2 insolvency right is mutual and carves out lawful reorganizations). No redline warranted.

### Verifier and repair feedback

- [seq 365](trajectory.jsonl#L365) **Verdict: pass** — Claimed status is 'compliant' and the cited text supports it: 24.1 gives Customer a consent-free assignment right to Affiliates and M&A successors (notice only), matching the preferred position. 24.2 restricts Vendor assignment, delegation of material performance and transfer by change of control to Customer's prior written consent (reasonableness-qualified) and bars assignment to a direct Customer competitor; 24.3 supplies a mutual not-unreasonably-withheld standard for other assignments. 24.4 expressly denies Vendor any termination, suspension, repricing, fee-acceleration or service-reduction right on Customer's change of control, eliminating the walk-away trigger; 13.3 aligns licence transfer with permitted Section 24 assignments. No deemed-assignment trap or Vendor change-of-control exit was identified elsewhere, and the rationale correctly notes the mutual insolvency right in 9.2 carves out lawful reorganizations. Consistent with a compliant finding, the redline is unchanged from the original paragraphs and no counterparty comment was proposed; the deterministic check for the successor/affiliate carve-out passes. Checks: {"name":"successor/affiliate carve-out for Customer present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 191](trajectory.jsonl#L191)

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

- [seq 223](trajectory.jsonl#L223) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 224](trajectory.jsonl#L224) **read_section result**

```json
{"sectionRef":"§ 14 INTELLECTUAL PROPERTY AND DELIVERABLES","paragraphs":[{"id":"p0057","text":"14. INTELLECTUAL PROPERTY AND DELIVERABLES"}]}
```

- [seq 225](trajectory.jsonl#L225) **drafter → list_sections**

```json
{}
```

- [seq 226](trajectory.jsonl#L226) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 255](trajectory.jsonl#L255) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 256](trajectory.jsonl#L256) **read_section result**

```json
{"sectionRef":"§ 14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","paragraphs":[…
```

- [seq 257](trajectory.jsonl#L257) **drafter → search**

```json
{"query":"assigns to Vendor"}
```

- [seq 258](trajectory.jsonl#L258) **search result**

```json
[]
```

- [seq 283](trajectory.jsonl#L283) **drafter → search**

```json
{"query":"owns","limit":20}
```

- [seq 284](trajectory.jsonl#L284) **search result**

```json
[{"paragraphId":"p0058","sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Custo…
```

- [seq 285](trajectory.jsonl#L285) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0058","p0060","p0061"]}
```

- [seq 286](trajectory.jsonl#L286) **read_paragraphs result**

```json
[{"id":"p0058","sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer.","te…
```

- [seq 307](trajectory.jsonl#L307) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0058","p0059","p0060","p0061"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","rationale":"The IP provisions meet our preferred position. Section 14.1 confirms Customer owns all Customer Data, Customer Confidential Information and pre-existing/independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by 15.1's bar on selling Customer Data or training models on it). Section 14.2 vests Deliverables in Customer on creation with a present assignment from Vendor and personnel assignments. Section 14.3 lets Vendor retain only Vendor Technology while back-licensing anything embedded in a Deliverable through the perpetual, irrevocable, worldwide, royalty-free, fully paid licence in Section 13.2 (which includes modify and derivative-work rights). Section 14.4 excludes joint ownership absent a signed instrument and keeps feedback rights with Customer. No assignment of Customer IP or data to Vendor and no vendor-owned deliverables without licence-back, so nothing to redline; the payment condition in 14.2 and the telemetry carve-out in the Customer Data definition (1.3) are ordinary and noted only for awareness.","confidence":0.9}
```

- [seq 308](trajectory.jsonl#L308) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 307](trajectory.jsonl#L307)
- Finding: `f-ip-9dea1dac` · **compliant** · confidence 0.90
- Location: § 14.1 As between the Parties, Customer owns all Customer Data, Cu…
- Quote: “14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.”
- Rationale: The IP provisions meet our preferred position. Section 14.1 confirms Customer owns all Customer Data, Customer Confidential Information and pre-existing/independently developed IP, with no transfer to Vendor beyond a limited processing right (reinforced by 15.1's bar on selling Customer Data or training models on it). Section 14.2 vests Deliverables in Customer on creation with a present assignment from Vendor and personnel assignments. Section 14.3 lets Vendor retain only Vendor Technology while back-licensing anything embedded in a Deliverable through the perpetual, irrevocable, worldwide, royalty-free, fully paid licence in Section 13.2 (which includes modify and derivative-work rights). Section 14.4 excludes joint ownership absent a signed instrument and keeps feedback rights with Customer. No assignment of Customer IP or data to Vendor and no vendor-owned deliverables without licence-back, so nothing to redline; the payment condition in 14.2 and the telemetry carve-out in the Customer Data definition (1.3) are ordinary and noted only for awareness.

### Verifier and repair feedback

- [seq 355](trajectory.jsonl#L355) **Verdict: pass** — Claimed status is compliant and the cited paragraphs support it: 14.1 vests Customer Data, Customer Confidential Information and pre-existing/independently developed IP in Customer with only a limited processing right to Vendor; 14.2 gives Customer ownership of Deliverables with a present assignment from Vendor plus personnel assignments; 14.3 limits Vendor retention to Vendor Technology and routes embedded Vendor Technology through the perpetual licence in 13.2; 14.4 bars joint ownership absent a signed instrument and preserves Customer's feedback rights. No assignment of Customer IP or Customer Data to Vendor, no Vendor-owned deliverables without licence-back, and no joint ownership — none of the walk-away triggers are present, so the preferred position is met. Consistent with a compliant finding, no redline text was changed and no counterparty comment was raised; the deterministic check ('no assignment of Customer Data/IP to Vendor remains') passes. Rationale appropriately notes the payment condition in 14.2 and the anonymized telemetry carve-out in the Customer Data definition as awareness items rather than escalating them to deviations, which matches the playbook's treatment of minor sub-elements. Checks: {"name":"no assignment of Customer Data/IP to Vendor remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 205](trajectory.jsonl#L205)

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

- [seq 235](trajectory.jsonl#L235) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 236](trajectory.jsonl#L236) **read_section result**

```json
{"sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","paragraphs":[{"id":"p0052","text":"13. ACCESS RIGHTS AND LICENCE"}]}
```

- [seq 237](trajectory.jsonl#L237) **drafter → list_sections**

```json
{}
```

- [seq 238](trajectory.jsonl#L238) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 265](trajectory.jsonl#L265) **drafter → read_section**

```json
{"sectionId":"sec-13.1"}
```

- [seq 266](trajectory.jsonl#L266) **read_section result**

```json
{"sectionRef":"§ 13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer. Customer may permit Authorized Users to exercise those rights.","pa…
```

- [seq 267](trajectory.jsonl#L267) **drafter → read_section**

```json
{"sectionId":"sec-13.2"}
```

- [seq 268](trajectory.jsonl#L268) **read_section result**

```json
{"sectionRef":"§ 13.2 For software and Vendor Technology delivered to Customer on a paid-up basis or embedded in a Deliverable, Vendor grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence to use, execute, reproduce, display, perform, modify, create derivative works from, and permit contractors to support that material for Customer's business.","…
```

- [seq 269](trajectory.jsonl#L269) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 270](trajectory.jsonl#L270) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0055","text":"13.3 Customer may transfer its l…
```

- [seq 297](trajectory.jsonl#L297) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0053","p0054","p0055"],"quote":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.","rationale":"The grant meets the preferred position on every material term. Section 13.1 extends the subscription licence to Customer, its Affiliates, and contractors acting on their behalf (no notice condition needed), with Authorized User rights. Section 13.2 gives Customer and its Affiliates a perpetual, irrevocable, royalty-free, fully paid licence for paid-up or embedded Vendor Technology, including contractor support rights, and Section 14.3 confirms that licence applies to Vendor Technology needed to use a Deliverable. Section 13.3 makes the licence transferable to an Affiliate or successor under the Section 24 assignment right (which permits M&A/successor assignment without consent) and bars revocation or suspension except for a material uncured payment or use breach after notice and a reasonable cure opportunity — i.e., not revocable at Vendor's will. Section 13.4 restrictions are narrow and carve out lawful reverse engineering, authorized security testing, and use of Customer Data and output. No redline required.","confidence":0.93}
```

- [seq 298](trajectory.jsonl#L298) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 297](trajectory.jsonl#L297)
- Finding: `f-license-2c49f4e8` · **compliant** · confidence 0.93
- Location: § 13.1 Subject to payment of applicable Fees, Vendor grants Custom…
- Quote: “13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.”
- Rationale: The grant meets the preferred position on every material term. Section 13.1 extends the subscription licence to Customer, its Affiliates, and contractors acting on their behalf (no notice condition needed), with Authorized User rights. Section 13.2 gives Customer and its Affiliates a perpetual, irrevocable, royalty-free, fully paid licence for paid-up or embedded Vendor Technology, including contractor support rights, and Section 14.3 confirms that licence applies to Vendor Technology needed to use a Deliverable. Section 13.3 makes the licence transferable to an Affiliate or successor under the Section 24 assignment right (which permits M&A/successor assignment without consent) and bars revocation or suspension except for a material uncured payment or use breach after notice and a reasonable cure opportunity — i.e., not revocable at Vendor's will. Section 13.4 restrictions are narrow and carve out lawful reverse engineering, authorized security testing, and use of Customer Data and output. No redline required.

### Verifier and repair feedback

- [seq 351](trajectory.jsonl#L351) **Verdict: pass** — Cited text supports the compliant classification: Section 13.1 expressly extends the subscription grant to Customer, its Affiliates, and contractors acting on their behalf, satisfying the preferred position on affiliate/contractor scope without any notice condition. Section 13.2 provides a perpetual, irrevocable, royalty-free, fully paid licence for paid-up or embedded Vendor Technology, and Section 13.3 permits transfer to an Affiliate or successor under the Section 24 assignment right, matching the preferred transferability and perpetuity terms. Section 13.3 bars revocation or suspension except for a material uncured payment or use breach after notice and a reasonable cure period, so the licence is not revocable at Vendor's discretion (no walk-away trigger); deterministic checks for affiliate coverage and absence of at-will revocation both pass. Consistent with a compliant finding, no redline or counterparty comment was proposed, and none is warranted — raising an edit here would be over-flagging a clause that already meets the preferred position. Checks: {"name":"affiliates covered by the licence","ok":true}; {"name":"no at-will revocation remains","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 295](trajectory.jsonl#L295)

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
{"sectionRef":"§ 22 AUDIT RIGHTS","paragraphs":[{"id":"p0092","text":"22. AUDIT RIGHTS"}]}
```

- [seq 315](trajectory.jsonl#L315) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 316](trajectory.jsonl#L316) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0096","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 337](trajectory.jsonl#L337) **drafter → read_section**

```json
{"sectionId":"sec-22.1"}
```

- [seq 338](trajectory.jsonl#L338) **read_section result**

```json
{"sectionRef":"§ 22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","paragraphs":[{"id":"p0093","text":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose."}]}
```

- [seq 339](trajectory.jsonl#L339) **drafter → read_section**

```json
{"sectionId":"sec-22.2"}
```

- [seq 340](trajectory.jsonl#L340) **read_section result**

```json
{"sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidential information.","parag…
```

- [seq 341](trajectory.jsonl#L341) **drafter → read_section**

```json
{"sectionId":"sec-22.3"}
```

- [seq 342](trajectory.jsonl#L342) **read_section result**

```json
{"sectionRef":"§ 22.3 Audit findings are Customer Confidential Information and may be used only to enforce this Agreement. Vendor shall provide a copy of the final report. Payment of a shortfall resolves the audited quantity issue absent fraud or demonstrable error.","paragraphs":[{"id":"p0095","text":"22.3 Audit findings are Customer Confidential Information and may be used only to enforce this …
```

- [seq 369](trajectory.jsonl#L369) **drafter → search**

```json
{"query":"audit","limit":25}
```

- [seq 370](trajectory.jsonl#L370) **search result**

```json
[{"paragraphId":"p0092","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0093","sectionRef":"§ 22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","snippet":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems …"},{"paragraphId":"p0094","s…
```

- [seq 371](trajectory.jsonl#L371) **drafter → lookup_precedent**

```json
{"ruleId":"AUDIT","context":"Vendor audit of Customer usage; frequency, notice, off-site, cost"}
```

- [seq 392](trajectory.jsonl#L392) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-audit","source":"Granite Usage Terms (Feb 2025)","clauseAfter":"Vendor may conduct one off-site audit per calendar year on thirty days' notice through an independent auditor bound by confidentiality.","comment":"[Playbook] We limited audit frequency, notice and access to protect operations and sensitive systems.","level":"preferred"}]}
```

- [seq 413](trajectory.jsonl#L413) **drafter → propose_redline**

```json
{"level":"preferred","precedentId":"seed-audit","summary":"Limit Vendor audits to once per 12 months on 30 days' notice, off-site via an independent auditor, and delete remote system access.","comment":"[Playbook] We limited audits to one off-site audit per 12 months on 30 days' written notice during business hours by an independent auditor bound by confidentiality, and removed remote access to our systems, consistent with our playbook position and § 22.2's existing bar on direct system access. We can accept 15 days' notice if that helps.","ops":[{"kind":"replace","paragraphId":"p0093","oldText":"Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","newText":"Vendor may audit Customer's usage no more than once in any twelve (12) month period, on at least thirty (30) days' prior written notice, during Customer's normal business hours and with minimal disruption, and such audit shall be conducted off-site by an independent auditor bound by written obligations of confidentiality. Vendor and its auditor shall have no remote or direct access to Customer's systems, and Customer shall instead provide relevant usage records reasonably required for the audit."}]}
```

- [seq 414](trajectory.jsonl#L414) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0093","segments":[{"type":"equal","text":"22.1 Vendor may audit Customer"},{"type":"delete","text":" at any time without notice and may remotely access Customer's systems and records for that purpose"},{"type":"insert","text":"'s usage no more than once in any twelve (12) month period, on at least thirty (30) days' prior written notice, during C…
```

- [seq 443](trajectory.jsonl#L443) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0093","p0094"],"quote":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","rationale":"Section 22.1 grants unlimited, unannounced audits with remote access to our systems — squarely in walk-away territory and failing the fallback on frequency, notice and system access. It also conflicts with § 22.2, which bars direct access to Customer systems. Cost allocation in § 22.2 (Vendor bears cost unless underpayment exceeds 5%) and confidentiality of findings in § 22.3 already meet the preferred position, so the redline only fixes frequency, notice and access in § 22.1.","confidence":0.95,"proposal":{"level":"preferred","precedentId":"seed-audit","summary":"Limit Vendor audits to once per 12 months on 30 days' notice, off-site via an independent auditor, and delete remote system access.","comment":"[Playbook] We limited audits to one off-site audit per 12 months on 30 days' written notice during business hours by an independent auditor bound by confidentiality, and removed remote access to our systems, consistent with our playbook position and § 22.2's existing bar on direct system access. We can accept 15 days' notice if that helps.","ops":[{"kind":"replace","paragraphId":"p0093","oldText":"Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","newText":"Vendor may audit Customer's usage no more than once in any twelve (12) month period, on at least thirty (30) days' prior written notice, during Customer's normal business hours and with minimal disruption, and such audit shall be conducted off-site by an independent auditor bound by written obligations of confidentiality. Vendor and its auditor shall have no remote or direct access to Customer's systems, and Customer shall instead provide relevant usage records reasonably required for the audit."}]}}
```

- [seq 444](trajectory.jsonl#L444) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 443](trajectory.jsonl#L443)
- Finding: `f-audit-32443d92` · **deviation** · confidence 0.95
- Location: § 22.1 Vendor may audit Customer at any time without notice and ma…
- Quote: “22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.”
- Rationale: Section 22.1 grants unlimited, unannounced audits with remote access to our systems — squarely in walk-away territory and failing the fallback on frequency, notice and system access. It also conflicts with § 22.2, which bars direct access to Customer systems. Cost allocation in § 22.2 (Vendor bears cost unless underpayment exceeds 5%) and confidentiality of findings in § 22.3 already meet the preferred position, so the redline only fixes frequency, notice and access in § 22.1.
- Proposal: **preferred** — Limit Vendor audits to once per 12 months on 30 days' notice, off-site via an independent auditor, and delete remote system access.
- Comment: [Playbook] We limited audits to one off-site audit per 12 months on 30 days' written notice during business hours by an independent auditor bound by confidentiality, and removed remote access to our systems, consistent with our playbook position and § 22.2's existing bar on direct system access. We can accept 15 days' notice if that helps.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Vendor may audit Customer's usage no more than once in any twelve (12) month period, on at least thirty (30) days' prior written notice, during Customer's normal business hours and with minimal disruption, and such audit shall be conducted off-site by an independent auditor bound by written obligations of confidentiality. Vendor and its auditor shall have no remote or direct access to Customer's systems, and Customer shall instead provide relevant usage records reasonably required for the audit.",
    "oldText": "Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.",
    "paragraphId": "p0093"
  }
]
```

### Verifier and repair feedback

- [seq 489](trajectory.jsonl#L489) **Verdict: pass** — Section 22.1 as drafted permits audits 'at any time without notice' with remote access to Customer systems — squarely in the rule's walk-away territory and failing the fallback on frequency, notice and system access, so 'deviation' is the correct classification. The redline reaches the preferred position (once per 12 months, 30 days' written notice, business hours, off-site independent auditor bound by confidentiality, no remote/direct system access) while leaving the already-compliant cost allocation in § 22.2 untouched — no over-flagging of acceptable terms. The failed 'minimal edit' heuristic (0.798 changed-character ratio) is acceptable here: the original sentence grants unlimited, unannounced audits plus remote access, so the limits cannot be inserted without rewriting the sentence; no extraneous obligations were added. Comment is accurate, concise, in the required voice and prefix, cites the playbook position, notes consistency with § 22.2's existing bar on direct system access, and offers the 15-day fallback. Checks: {"name":"operation 1 applies","ok":true}; {"name":"audit frequency limited","ok":true}; {"name":"minimal edit p0093","ok":false,"detail":"changed-character ratio=0.798 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 327](trajectory.jsonl#L327)

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

- [seq 345](trajectory.jsonl#L345) **drafter → read_section**

```json
{"sectionId":"sec-7.6"}
```

- [seq 346](trajectory.jsonl#L346) **read_section result**

```json
{"sectionRef":"§ 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","paragraphs":[{"id":"p0032","text":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency."}]}
```

- [seq 347](trajectory.jsonl#L347) **drafter → list_sections**

```json
{}
```

- [seq 348](trajectory.jsonl#L348) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 373](trajectory.jsonl#L373) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 374](trajectory.jsonl#L374) **search result**

```json
[{"paragraphId":"p0032","sectionRef":"§ 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","snippet":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency."}]
```

- [seq 375](trajectory.jsonl#L375) **drafter → lookup_precedent**

```json
{"ruleId":"LD","context":"Customer-payable liquidated damages of USD 25,000 per day for dependency delay in fees section"}
```

- [seq 394](trajectory.jsonl#L394) **lookup_precedent result**

```json
{"precedents":[{"id":"seed-ld","source":"Willow Managed Services Order (May 2025)","clauseAfter":"Customer's sole early-termination fee shall not exceed three months' fees.","comment":"[Playbook] We replaced the remaining-term penalty with the accepted three-month cap.","level":"fallback"}]}
```

- [seq 421](trajectory.jsonl#L421) **drafter → search**

```json
{"query":"penalt"}
```

- [seq 422](trajectory.jsonl#L422) **search result**

```json
[{"paragraphId":"p0082","sectionRef":"§ 20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectu…
```

- [seq 439](trajectory.jsonl#L439) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Remove Customer-payable liquidated damages for dependency delay; substitute equitable schedule adjustment","comment":"[Playbook] We cannot accept liquidated damages or penalties payable by us, and an uncapped USD 25,000 per day charge for any dependency delay is far beyond our position. We have replaced it with an equitable adjustment of the affected dates; if a fixed amount is essential, we could consider an early-termination fee capped at three months' Fees as the sole liquidated amount.","ops":[{"kind":"replace","paragraphId":"p0032","oldText":"Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","newText":"Customer is not liable for liquidated damages or penalties under this Agreement. If Customer's delay in providing an agreed dependency materially affects Vendor's performance, the affected dates and, where applicable, the affected Fees will be equitably adjusted through a change order, provided Vendor promptly notifies Customer of the delay and mitigates its effect."}]}
```

- [seq 440](trajectory.jsonl#L440) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0032","segments":[{"type":"equal","text":"7.6 Customer "},{"type":"delete","text":"shall pay Vendor USD 25,000 per day as agreed liquidated damages for any"},{"type":"insert","text":"is not liable for liquidated damages or penalties under this Agreement. If Customer's"},{"type":"equal","text":" delay in providing "},{"type":"delete","text":"a de…
```

- [seq 464](trajectory.jsonl#L464) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0032"],"quote":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","rationale":"Section 7.6 imposes liquidated damages payable by Customer of USD 25,000 per day for \"any delay in providing a dependency\" — uncapped in amount and duration, and triggered by even minor or immaterial delays. This fails the preferred position (no liquidated damages or penalties payable by Customer) and also fails the fallback, which permits only a capped early-termination fee of three months' Fees as the sole liquidated amount; an unbounded daily charge can readily exceed remaining contract value, which is walk-away territory. No offsetting service credits or Vendor-side liquidated damages appear elsewhere in the document, and the liability cap in Section 21.1 does not clearly shield Customer from this fee obligation. Redline deletes the Customer-payable LD and substitutes an equitable schedule/Fee adjustment via change order, with the three-month early-termination-fee cap offered as fallback.","confidence":0.93,"proposal":{"level":"preferred","summary":"Remove Customer-payable liquidated damages for dependency delay; substitute equitable schedule adjustment","comment":"[Playbook] We cannot accept liquidated damages or penalties payable by us, and an uncapped USD 25,000 per day charge for any dependency delay is far beyond our position. We have replaced it with an equitable adjustment of the affected dates; if a fixed amount is essential, we could consider an early-termination fee capped at three months' Fees as the sole liquidated amount.","precedentId":"seed-ld","ops":[{"kind":"replace","paragraphId":"p0032","oldText":"Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","newText":"Customer is not liable for liquidated damages or penalties under this Agreement. If Customer's delay in providing an agreed dependency materially affects Vendor's performance, the affected dates and, where applicable, the affected Fees will be equitably adjusted through a change order, provided Vendor promptly notifies Customer of the delay and mitigates its effect."}]}}
```

- [seq 465](trajectory.jsonl#L465) **submit_finding result**

```json
{"ok":false,"errors":["Submitted proposal differs from the validated proposal"]}
```

- [seq 482](trajectory.jsonl#L482) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0032"],"quote":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","rationale":"Section 7.6 imposes liquidated damages payable by Customer of USD 25,000 per day for \"any delay in providing a dependency\" — uncapped in amount and duration, and triggered by even minor or immaterial delays. This fails the preferred position (no liquidated damages or penalties payable by Customer) and also fails the fallback, which permits only a capped early-termination fee of three months' Fees as the sole liquidated amount; an unbounded daily charge can readily exceed remaining contract value, which is walk-away territory. No offsetting service credits or Vendor-side liquidated damages appear elsewhere in the document. Redline deletes the Customer-payable LD and substitutes an equitable schedule/Fee adjustment via change order, with the three-month early-termination-fee cap offered as fallback.","confidence":0.93,"proposal":{"level":"preferred","summary":"Remove Customer-payable liquidated damages for dependency delay; substitute equitable schedule adjustment","comment":"[Playbook] We cannot accept liquidated damages or penalties payable by us, and an uncapped USD 25,000 per day charge for any dependency delay is far beyond our position. We have replaced it with an equitable adjustment of the affected dates; if a fixed amount is essential, we could consider an early-termination fee capped at three months' Fees as the sole liquidated amount.","ops":[{"kind":"replace","paragraphId":"p0032","oldText":"Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","newText":"Customer is not liable for liquidated damages or penalties under this Agreement. If Customer's delay in providing an agreed dependency materially affects Vendor's performance, the affected dates and, where applicable, the affected Fees will be equitably adjusted through a change order, provided Vendor promptly notifies Customer of the delay and mitigates its effect."}]}}
```

- [seq 483](trajectory.jsonl#L483) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 482](trajectory.jsonl#L482)
- Finding: `f-ld-e4497af0` · **deviation** · confidence 0.93
- Location: § 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liqu…
- Quote: “7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.”
- Rationale: Section 7.6 imposes liquidated damages payable by Customer of USD 25,000 per day for "any delay in providing a dependency" — uncapped in amount and duration, and triggered by even minor or immaterial delays. This fails the preferred position (no liquidated damages or penalties payable by Customer) and also fails the fallback, which permits only a capped early-termination fee of three months' Fees as the sole liquidated amount; an unbounded daily charge can readily exceed remaining contract value, which is walk-away territory. No offsetting service credits or Vendor-side liquidated damages appear elsewhere in the document. Redline deletes the Customer-payable LD and substitutes an equitable schedule/Fee adjustment via change order, with the three-month early-termination-fee cap offered as fallback.
- Proposal: **preferred** — Remove Customer-payable liquidated damages for dependency delay; substitute equitable schedule adjustment
- Comment: [Playbook] We cannot accept liquidated damages or penalties payable by us, and an uncapped USD 25,000 per day charge for any dependency delay is far beyond our position. We have replaced it with an equitable adjustment of the affected dates; if a fixed amount is essential, we could consider an early-termination fee capped at three months' Fees as the sole liquidated amount.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer is not liable for liquidated damages or penalties under this Agreement. If Customer's delay in providing an agreed dependency materially affects Vendor's performance, the affected dates and, where applicable, the affected Fees will be equitably adjusted through a change order, provided Vendor promptly notifies Customer of the delay and mitigates its effect.",
    "oldText": "Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.",
    "paragraphId": "p0032"
  }
]
```

### Verifier and repair feedback

- [seq 502](trajectory.jsonl#L502) **Verdict: pass** — Section 7.6 plainly imposes liquidated damages payable by Customer (USD 25,000/day for 'any delay'), with no cap on amount or duration and no materiality threshold — this fails both the preferred position (no Customer-payable LDs) and the fallback (single capped early-termination fee), and the unbounded daily accrual is squarely in walk-away territory, so the 'deviation' status is correct. Direction is right: the rule flags only Customer-payable LDs, and here Customer is the payer; no Vendor-side service credits or offsetting LDs exist to make the clause acceptable. Redline is actionable and reaches the playbook position: it removes Customer liability for liquidated damages/penalties and substitutes a neutral equitable schedule/Fee adjustment via change order conditioned on notice and mitigation — a defensible substitute rather than an unnecessary expansion of Customer obligations (any Fee change requires a change order). The failed minimal-edit check (0.880 changed-character ratio) is expected here: deleting a Customer-payable LD obligation necessarily rewrites the whole clause, so the advisory heuristic does not indicate over-editing. Comment is accurate, concise, in our voice, states what changed and why, cites the playbook position, and offers the three-month early-termination-fee fallback without lecturing. Checks: {"name":"operation 1 applies","ok":true}; {"name":"minimal edit p0032","ok":false,"detail":"changed-character ratio=0.880 (advisory: whole-clause rewrites are acceptable when the rule requires them)"}.

### Human checkpoint and applied ops

No human decision was recorded.

## WARRANTY — Performance warranty and duration

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 333](trajectory.jsonl#L333)

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

- [seq 359](trajectory.jsonl#L359) **drafter → read_section**

```json
{"sectionId":"sec-19"}
```

- [seq 360](trajectory.jsonl#L360) **read_section result**

```json
{"sectionRef":"§ 19 WARRANTIES","paragraphs":[{"id":"p0075","text":"19. WARRANTIES"}]}
```

- [seq 361](trajectory.jsonl#L361) **drafter → list_sections**

```json
{}
```

- [seq 362](trajectory.jsonl#L362) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 389](trajectory.jsonl#L389) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["sec-19.1","sec-19.2","sec-19.3","sec-19.4","sec-19.5"],"quote":"For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Sections 19.1–19.5 meet or exceed the preferred position. Vendor warrants Services performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after the later of delivery or acceptance, and hosted Services conform throughout the whole subscription term, which is stronger than the preferred 12-month software period (19.2); Vendor also warrants no intentionally introduced malicious code and compliance with Applicable Law (19.3). The remedy in 19.4 is prompt re-performance, repair or replacement at no charge, then termination and refund of Fees paid if Vendor cannot cure in a reasonable period, and it is expressly non-exclusive for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is limited to implied warranties and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty. Section 6.2 adds a further refund right after two failed correction cycles. This sits at or above preferred; no redline needed."}
```

- [seq 390](trajectory.jsonl#L390) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 417](trajectory.jsonl#L417) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["sec-19.1","sec-19.2","sec-19.3","sec-19.4","sec-19.5"],"quote":"For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Sections 19.1–19.5 meet or exceed the preferred position. Vendor warrants Services performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after the later of delivery or acceptance, and hosted Services conform throughout the entire subscription term, which is stronger than the preferred 12-month software period (19.2); Vendor also warrants no intentionally introduced malicious code and compliance with Applicable Law (19.3). The remedy in 19.4 is prompt re-performance, repair or replacement at no charge, then termination of the affected item and refund of Fees paid if Vendor cannot cure within a reasonable period, and it is expressly non-exclusive for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is confined to implied warranties and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty. Section 6.2 adds a further refund right after two failed correction cycles. No redline needed.","confidence":0.93}
```

- [seq 418](trajectory.jsonl#L418) **submit_finding result**

```json
{"ok":false,"errors":["Unknown paragraph: sec-19.1","Unknown paragraph: sec-19.2","Unknown paragraph: sec-19.3","Unknown paragraph: sec-19.4","Unknown paragraph: sec-19.5","quote is not a verbatim substring of a cited paragraph"]}
```

- [seq 447](trajectory.jsonl#L447) **drafter → read_section**

```json
{"sectionId":"sec-19.2"}
```

- [seq 448](trajectory.jsonl#L448) **read_section result**

```json
{"sectionRef":"§ 19.2 For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term. Vendor warrants it has authority to enter the Agreement and grant the rights stated here.","paragraphs":[{"id":"p0077","text":"19.2 For ninety days after deliver…
```

- [seq 449](trajectory.jsonl#L449) **drafter → read_section**

```json
{"sectionId":"sec-19.4"}
```

- [seq 450](trajectory.jsonl#L450) **read_section result**

```json
{"sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","pa…
```

- [seq 468](trajectory.jsonl#L468) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0077","p0079"],"quote":"For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Sections 19.1–19.5 meet or exceed the preferred position. Vendor warrants the Services will be performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after the later of delivery or acceptance, and hosted Services conform throughout the entire subscription term, which is stronger than the preferred 12-month software period (19.2); Vendor also warrants no intentionally introduced malicious code and compliance with Applicable Law (19.3). The remedy in 19.4 is prompt re-performance, repair or replacement at no charge, then termination of the affected item and refund of Fees paid if Vendor cannot cure within a reasonable period, and it is expressly non-exclusive for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is confined to implied warranties and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty. Section 6.2 adds a further refund right after two failed correction cycles. No redline needed.","confidence":0.93}
```

- [seq 469](trajectory.jsonl#L469) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 468](trajectory.jsonl#L468)
- Finding: `f-warranty-489c31f9` · **compliant** · confidence 0.93
- Location: § 19.2 For ninety days after delivery or acceptance, whichever is…
- Quote: “For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.”
- Rationale: Sections 19.1–19.5 meet or exceed the preferred position. Vendor warrants the Services will be performed in a professional and workmanlike manner by qualified personnel to industry standards (19.1); Deliverables materially conform to documentation and acceptance criteria for ninety days after the later of delivery or acceptance, and hosted Services conform throughout the entire subscription term, which is stronger than the preferred 12-month software period (19.2); Vendor also warrants no intentionally introduced malicious code and compliance with Applicable Law (19.3). The remedy in 19.4 is prompt re-performance, repair or replacement at no charge, then termination of the affected item and refund of Fees paid if Vendor cannot cure within a reasonable period, and it is expressly non-exclusive for fraud, infringement, confidentiality, privacy, security and indemnified claims. The disclaimer in 19.5 is confined to implied warranties and expressly does not limit any express warranty, service level, indemnity or remedy, so it does not swallow the express warranty. Section 6.2 adds a further refund right after two failed correction cycles. No redline needed.

### Verifier and repair feedback

- [seq 496](trajectory.jsonl#L496) **Verdict: pass** — Claimed status is compliant and the cited text supports it: Section 19.2 gives a 90-day conformance warranty for Deliverables (and conformance for hosted Services throughout the subscription term), which meets the preferred/fallback period, and Section 19.4 supplies the full remedy ladder (re-performance, repair or replacement, then termination and refund of Fees paid), matching the model remedy language. No redline or counterparty comment was proposed, which is the correct output for a compliant finding — the clause is not over-flagged as a deviation. The failed deterministic check ('warranty period ≥ 90 days') is a false negative caused by the period being spelled out in words ('For ninety days after delivery or acceptance, whichever is later'); substantively the period requirement is satisfied. Rationale statements about Sections 19.1, 19.3, 19.5 and 6.2 (workmanlike standard, malicious code, disclaimer carve-out, extra refund right) are not verifiable from the two supplied paragraphs, but they are additive and the cited material terms alone establish compliance, so this does not change the verdict. Checks: {"name":"warranty period ≥ 90 days or expressed in months/years","ok":false}.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 353](trajectory.jsonl#L353)

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

- [seq 377](trajectory.jsonl#L377) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 378](trajectory.jsonl#L378) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0072","text":"18. INSURANCE"}]}
```

- [seq 379](trajectory.jsonl#L379) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 380](trajectory.jsonl#L380) **search result**

```json
[{"paragraphId":"p0072","sectionRef":"§ 18 INSURANCE","snippet":"18. INSURANCE"},{"paragraphId":"p0073","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000…
```

- [seq 397](trajectory.jsonl#L397) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0073","p0074"],"quote":"Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18.1 obliges Vendor, at its own expense for the term plus one year, to carry CGL of USD 1M per occurrence / USD 2M aggregate, workers' compensation as required by law, employer's liability USD 1M, E&O USD 2M and cyber/privacy USD 5M — matching the playbook's preferred limits in full. Section 18.2 adds reputable insurers, primary status, certificates of insurance on request, notice of cancellation, and confirmation that insurance does not limit Vendor's liability, which is favourable to us. No deviation; nothing to redline.","confidence":0.95}
```

- [seq 398](trajectory.jsonl#L398) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 397](trajectory.jsonl#L397)
- Finding: `f-insurance-12d90118` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18.1 obliges Vendor, at its own expense for the term plus one year, to carry CGL of USD 1M per occurrence / USD 2M aggregate, workers' compensation as required by law, employer's liability USD 1M, E&O USD 2M and cyber/privacy USD 5M — matching the playbook's preferred limits in full. Section 18.2 adds reputable insurers, primary status, certificates of insurance on request, notice of cancellation, and confirmation that insurance does not limit Vendor's liability, which is favourable to us. No deviation; nothing to redline.

### Verifier and repair feedback

- [seq 453](trajectory.jsonl#L453) **Verdict: pass** — Section 18.1 matches the playbook's preferred limits exactly (CGL USD 1M/2M, E&O USD 2M, cyber/privacy USD 5M, workers' compensation as required by law), plus employer's liability and a one-year tail. Section 18.2 supplies certificates on request, reputable insurers, primary coverage and non-limitation of liability — all favourable to us; correctly classified as compliant. No redline or comment proposed, which is the expected posture for a compliant finding; deterministic check confirms an insurance obligation is present. Checks: {"name":"insurance obligation present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 357](trajectory.jsonl#L357)

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

- [seq 383](trajectory.jsonl#L383) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 384](trajectory.jsonl#L384) **read_section result**

```json
{"sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","paragraphs":[{"id":"p0012","text":"2.1 This Agreemen…
```

- [seq 385](trajectory.jsonl#L385) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 386](trajectory.jsonl#L386) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 407](trajectory.jsonl#L407) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 408](trajectory.jsonl#L408) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 409](trajectory.jsonl#L409) **drafter → search**

```json
{"query":"minimum","limit":30}
```

- [seq 410](trajectory.jsonl#L410) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","snippet":"…s under which Cust…
```

- [seq 435](trajectory.jsonl#L435) **drafter → search**

```json
{"query":"shortfall|take-or-pay|commit to purchase|volume|true-up","regex":true,"limit":20}
```

- [seq 436](trajectory.jsonl#L436) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","snippet":"…Order Form, and it…
```

- [seq 460](trajectory.jsonl#L460) **drafter → read_section**

```json
{"sectionId":"sec-1.6"}
```

- [seq 461](trajectory.jsonl#L461) **read_section result**

```json
{"sectionRef":"§ 1.6 “Order Form” means a written ordering document signed by authorized representatives of both Parties that references this Agreement and describes the Services, Deliverables, subscription quantities, service levels, Fees, and term purchased by Customer. A purchase order is an administrative convenience only and does not amend an Order Form or this Agreement.","paragraphs":[{"id…
```

- [seq 476](trajectory.jsonl#L476) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0012","p0026","p0050"],"quote":"No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","rationale":"The Agreement meets the preferred position: § 2.1 expressly disclaims any minimum quantity or purchase commitment, confirms Customer pays only for Services ordered under an executed Order Form, and provides that declining to place further orders is not a breach or shortfall. § 7.1 bars any minimum-use or similar charge not identified in the Order Form, and § 12.3 confirms Customer has made no minimum-volume commitment. No take-or-pay, shortfall penalty, or volume cap on Customer usage appears anywhere; the only \"shortfall\" references (§§ 22.2–22.3) are usage-audit true-ups for actual underpayment, which is consistent with the playbook's true-up approach. No redline required.","confidence":0.93}
```

- [seq 477](trajectory.jsonl#L477) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 476](trajectory.jsonl#L476)
- Finding: `f-mincommit-9508e255` · **compliant** · confidence 0.93
- Location: § 2.1 This Agreement establishes the legal terms under which Cust…
- Quote: “No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.”
- Rationale: The Agreement meets the preferred position: § 2.1 expressly disclaims any minimum quantity or purchase commitment, confirms Customer pays only for Services ordered under an executed Order Form, and provides that declining to place further orders is not a breach or shortfall. § 7.1 bars any minimum-use or similar charge not identified in the Order Form, and § 12.3 confirms Customer has made no minimum-volume commitment. No take-or-pay, shortfall penalty, or volume cap on Customer usage appears anywhere; the only "shortfall" references (§§ 22.2–22.3) are usage-audit true-ups for actual underpayment, which is consistent with the playbook's true-up approach. No redline required.

### Verifier and repair feedback

- [seq 499](trajectory.jsonl#L499) **Verdict: pass** — Claimed status is compliant and the cited text supports it: § 2.1 expressly disclaims any minimum quantity or purchase commitment and confirms Customer pays only for ordered Services, matching the MINCOMMIT preferred position. Corroborating clauses are correctly read: § 7.1 bars unidentified minimum-use charges and § 12.3 confirms no minimum-volume commitment; no take-or-pay, shortfall penalty, or usage cap on Customer appears. No redline or comment was proposed, which is the expected output for a compliant finding; the rendered redline is identical to the original paragraphs and no deterministic checks failed. Rationale correctly distinguishes the §§ 22.2–22.3 audit 'shortfall' references as true-ups for actual underpayment rather than a take-or-pay penalty. Checks: .

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 367](trajectory.jsonl#L367)

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

- [seq 401](trajectory.jsonl#L401) **drafter → list_sections**

```json
{}
```

- [seq 402](trajectory.jsonl#L402) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 403](trajectory.jsonl#L403) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 404](trajectory.jsonl#L404) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0045","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"}]}
```

- [seq 427](trajectory.jsonl#L427) **drafter → read_section**

```json
{"sectionId":"sec-11.1"}
```

- [seq 428](trajectory.jsonl#L428) **read_section result**

```json
{"sectionRef":"§ 11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.","paragrap…
```

- [seq 429](trajectory.jsonl#L429) **drafter → read_section**

```json
{"sectionId":"sec-11.2"}
```

- [seq 430](trajectory.jsonl#L430) **read_section result**

```json
{"sectionRef":"§ 11.2 Within thirty days after Customer's request, Vendor shall return all Customer Data in a complete, commonly used, documented, machine-readable format, with relationships and metadata reasonably necessary for use. Vendor shall not withhold Customer Data because of a fee dispute.","paragraphs":[{"id":"p0047","text":"11.2 Within thirty days after Customer's request, Vendor shall…
```

- [seq 431](trajectory.jsonl#L431) **drafter → read_section**

```json
{"sectionId":"sec-11.3"}
```

- [seq 432](trajectory.jsonl#L432) **read_section result**

```json
{"sectionRef":"§ 11.3 After Customer confirms successful return, Vendor shall securely delete remaining Customer Data from active systems and, as backups cycle, from backups, except for a copy required by Applicable Law. An authorized officer shall certify deletion in writing. Any retained copy remains protected and may not be used for another purpose.","paragraphs":[{"id":"p0048","text":"11.3 Af…
```

- [seq 456](trajectory.jsonl#L456) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0046","p0047","p0048"],"quote":"11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.","rationale":"Section 11 meets the preferred position in full: (a) §11.1 gives us up to six months' transition assistance on request, priced at the rates in the expiring Order Form (marginally better for us than \"then-current rates\") and expressly including knowledge transfer, export support, cooperation with a replacement supplier and continued service at existing scope and service levels; (b) §11.2 requires return of all Customer Data within thirty days in a complete, commonly used, documented, machine-readable format with metadata, and bars withholding data over a fee dispute; and (c) §11.3 requires secure deletion only after we confirm successful return, with written officer certification and continued protection of any legally required retained copy. Section 16.5 confirms Customer Data remains governed by Sections 11 and 15, so the confidentiality return/destroy mechanic does not override these terms. Nothing approaches the walk-away scenario of no data return or immediate deletion, so no redline is warranted.","confidence":0.93}
```

- [seq 457](trajectory.jsonl#L457) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 456](trajectory.jsonl#L456)
- Finding: `f-transition-8d62b42e` · **compliant** · confidence 0.93
- Location: § 11.1 Upon expiry or termination for any reason, Vendor shall, at…
- Quote: “11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.”
- Rationale: Section 11 meets the preferred position in full: (a) §11.1 gives us up to six months' transition assistance on request, priced at the rates in the expiring Order Form (marginally better for us than "then-current rates") and expressly including knowledge transfer, export support, cooperation with a replacement supplier and continued service at existing scope and service levels; (b) §11.2 requires return of all Customer Data within thirty days in a complete, commonly used, documented, machine-readable format with metadata, and bars withholding data over a fee dispute; and (c) §11.3 requires secure deletion only after we confirm successful return, with written officer certification and continued protection of any legally required retained copy. Section 16.5 confirms Customer Data remains governed by Sections 11 and 15, so the confidentiality return/destroy mechanic does not override these terms. Nothing approaches the walk-away scenario of no data return or immediate deletion, so no redline is warranted.

### Verifier and repair feedback

- [seq 486](trajectory.jsonl#L486) **Verdict: pass** — Cited §§11.1–11.3 satisfy the preferred position: up to six months' transition assistance on request, return of all Customer Data within thirty days in a commonly used machine-readable format, and secure deletion with written officer certification thereafter. Rate basis (rates in the expiring Order Form) is equal or better for the customer than 'then-current rates', and deletion is conditioned on confirmed successful return — no walk-away risk (no immediate deletion, no refusal to return, no fee-dispute hold-back). Consistent with a compliant claim, no redline or comment was proposed and the rendered text is unchanged; deterministic check confirms a data-return/transition clause is present. Checks: {"name":"data return/transition present","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 507](trajectory.jsonl#L507) memo LLM request
- [seq 508](trajectory.jsonl#L508) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement

**To:** Deal team  
**From:** In-house counsel (Customer side)  
**Re:** Playbook review of the Master Services Agreement — verified findings

---

## 1. Executive summary

We have completed a playbook review of the Master Services Agreement. The core ri[REDACTED] architecture is strong for us: Vendor's IP and other indemnities are unqualified and sit outside the liability cap (§§ 20.1–20.5, 21.3); we own Customer Data and Deliverables with a perpetual licence-back of embedded Vendor Technology (§§ 13.2, 14.1–14.4); the liability cap is mutual with meaningful carve-outs (§ 21); assignment is asymmetric in our favour (§ 24); and warranty, insurance, transition assistance and governing law all meet our preferred positions.

The problems are concentrated in the commercial-restriction and exit provisions, and several of them sit in walk-away territory:

- **Exclusivity (§ 2.2)** — full-term sole-supplier obligation on us, with no performance-based exit, and directly contradicting §§ 2.1 and 12.3.
- **Customer-payable liquidated damages (§ 7.6)** — USD 25,000 per day, uncapped in amount and duration, for "any delay in providing a dependency".
- **No termination for convenience (§ 9)** — no no-fault exit for us in a three-year term with auto-renewing Order Forms.
- **Audit (§ 22.1)** — unlimited, unannounced audits with remote access to our systems, conflicting with § 22.2.
- **Customer-side MFN (§ 7.2)**, **one-sided 18-month no-hire (§ 12.4)** and **180-day non-renewal notice (§ 8.2)** each fail the applicable fallback.

Notably, §§ 2.1, 7.1 and 12.3 already record that we have made no exclusivity, most-favoured-customer, minimum-volume or no-hire commitment, so four of our redlines also resolve internal inconsistencies in Vendor's own draft. We recommend proceeding on the basis that the seven items below are addressed.

---

## 2. Findings

| Severity | Rule | Status | Section | Note |
|---|---|---|---|---|
| Critical | INDEMN — Indemnification by Vendor | Compliant | § 20.1 (with §§ 20.2–20.5, 21.3) | Meets preferred position in full; Vendor indemnities are uncapped as Excluded Claims. |
| Critical | IP — Ownership of deliverables and Customer Data | Compliant | § 14.1 (with §§ 13.2, 14.2–14.4, 15.1) | Customer owns Data and Deliverables; perpetual licence-back of embedded Vendor Technology. |
| Critical | LOL-CAP — Limitation of liability | Compliant | § 21.1 (with §§ 21.2–21.4, 18.2) | Mutual cap at greater of 12 months' Fees paid or payable and USD 1,000,000, with full carve-outs. |
| High | ASSIGN — Assignment and change of control | Compliant | § 24.1 (with §§ 24.2–24.4, 13.3) | Consent-free Affiliate/M&A assignment for us; Vendor restricted. Asymmetric in our favour. |
| High | EXCLUSIVITY — Exclusivity binding Customer | **Deviation** | § 2.2 | Full-term sole-supplier obligation, no category narrowing, no 12-month limit, no performance exit. Walk-away; conflicts with §§ 2.1 and 12.3. |
| High | LD — Liquidated damages payable by Customer | **Deviation** | § 7.6 | USD 25,000/day, uncapped in amount and duration, triggered by any delay. Fails fallback (capped three-month early-termination fee only). |
| High | LICENSE — Licence grant scope | Compliant | § 13.1 (with §§ 13.2–13.4, 14.3) | Extends to Affiliates and contractors; transferable; not revocable at Vendor's will. |
| High | NONCOMPETE — Non-compete on Customer | Compliant | § 12.3 | Freedom to operate expressly preserved; exclusivity handled separately under EXCLUSIVITY, not double-flagged. |
| High | T4C — Termination for convenience | **Missing** | § 9 (Termination) | Only for-cause, insolvency and Vendor-default rights; no Customer no-fault exit anywhere. Walk-away given three-year term. |
| Medium | AUDIT — Audit rights against Customer | **Deviation** | § 22.1 | Unlimited, unannounced audits plus remote system access. Walk-away; conflicts with § 22.2. Cost allocation and confidentiality (§§ 22.2–22.3) already compliant. |
| Medium | GOVLAW — Governing law and venue | Compliant | § 28.1 (with §§ 28.2–28.3) | New York law, CISG excluded, exclusive New York County venue; no arbitration clause. |
| Medium | MFN — Most-favoured-nation burdening Customer | **Deviation** | § 7.2 | MFN runs against us, unlimited as to product, term and comparison method. Walk-away; conflicts with § 12.3. |
| Medium | MINCOMMIT — Minimum purchase commitments | Compliant | § 2.1 (with §§ 7.1, 12.3) | No minimum or take-or-pay; audit "shortfall" references are true-ups only. |
| Medium | NOSOLICIT — Non-solicitation binding Customer | **Deviation** | § 12.4 | One-sided, 18 months, all Vendor personnel, no-hire element, no carve-outs. Fails fallback on every material term; conflicts with § 12.3. |
| Medium | RENEWAL — Auto-renewal and notice window | **Deviation** | § 8.2 | 180-day non-renewal notice exceeds preferred (30 days) and fallback (60 days); walk-away above 90 days. Renewal uplift already capped at § 8.3. |
| Medium | TRANSITION — Transition assistance and data return | Compliant | § 11.1 (with §§ 11.2–11.3, 16.5) | Six months' assistance at expiring Order Form rates; 30-day machine-readable data return; deletion only after confirmed return. |
| Medium | WARRANTY — Performance warranty and duration | Compliant | § 19.2 (with §§ 19.1, 19.3–19.5, 6.2) | Hosted Services warranted for the full subscription term; disclaimer confined to implied warranties. |
| Low | INSURANCE — Vendor insurance | Compliant | § 18.1 (with § 18.2) | Meets preferred limits in full; insurance does not limit Vendor's liability. |

---

## 3. Walk-away items

The following fall into walk-away territory under the playbook and must be resolved before signature:

1. **§ 2.2 — Exclusivity.** Exclusive dealing for the full term with no performance-based exit. We require non-exclusive supply.
2. **§ 7.6 — Customer-payable liquidated damages.** An unbounded daily charge that can readily exceed remaining contract value; no offsetting service credits or Vendor-side liquidated damages exist in the document.
3. **§ 9 — No termination for convenience for Customer.** No no-fault exit below even the 60–90 day fallback, against a three-year term and auto-renewing Order Forms.
4. **§ 22.1 — Audit.** Unlimited, unannounced audits with remote access to our systems.
5. **§ 7.2 — Customer-side MFN.** Unlimited as to product, term and comparison methodology.
6. **§ 12.4 — No-hire scope.** A no-hire covering all Vendor personnel employed at any time during the term.
7. **§ 8.2 — 180-day non-renewal notice window.** Materially longer than the 90-day outer limit.

---

## 4. Next steps

1. **Issue the redline** covering the seven items above:
   - § 2.2 — make Vendor a non-exclusive provider and delete the sole-supplier commitment on us.
   - § 7.6 — delete Customer-payable liquidated damages and substitute an equitable schedule/Fee adjustment via change order; fallback is a capped early-termination fee of three months' Fees as the sole liquidated amount.
   - New § 9.4 — Customer convenience termination on 30 days' notice with pro-rata refund of prepaid Fees, no penalty, and no Vendor convenience right; fallback 60–90 days' notice.
   - § 22.1 — limit audits to once per 12 months on 30 days' notice, off-site via an independent auditor, and delete remote system access (retaining §§ 22.2–22.3 as drafted).
   - § 7.2 — delete the Customer-side MFN; no change to any MFN pricing granted in our favour.
   - § 12.4 — make mutual, limit to personnel directly involved in the Services, 12 months from the end of involvement, delete the "engage" (no-hire) element and add general-advertising and unsolicited-approach carve-outs.
   - § 8.2 — shorten the non-renewal window to 30 days and add a Vendor reminder 60 days before renewal; 60 days is an acceptable fallback. No change needed to § 8.3 pricing protection.
2. **Use Vendor's own drafting as leverage.** Sections 2.1, 7.1 and 12.3 already state that we have made no exclusivity, most-favoured-customer, minimum-volume or no-hire commitment, and § 22.2 bars direct access to our systems. We should present the exclusivity, MFN, no-hire and audit edits as conforming changes that remove internal contradictions.
3. **Confirm no further changes are sought** to the compliant provisions (indemnity, IP, liability cap, assignment, licence, governing law, minimum commitments, transition, warranty, insurance), so the negotiation stays focused on the seven open items.
4. **Escalate** if Vendor declines on § 2.2, § 7.6, § 9 or § 22.1, given their walk-away status; report back with Vendor's response before conceding any of the four.
5. **Housekeeping for awareness only** (not redlined): the payment condition in § 14.2 and the telemetry carve-out in the Customer Data definition (§ 1.3).
```

## Apply and validation

No apply or output-validation event was recorded.
