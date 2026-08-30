# Trajectory: synth-11

| Run | Value |
|---|---|
| Contract | synth-11 — MASTER SERVICES AGREEMENT |
| Config | final-v4 |
| Parties | Redwood Commerce Group, Inc. (our party) ↔ Silverline Systems Ltd. |
| Playbook | Customer-side Vendor Services Playbook (customer-vendor-services-v1) |
| Wall clock | 8.0s (7,968 ms) |
| Calls | 111 LLM · 123 tool · 6 retries |
| Tokens | 81,810 input · 88,008 output · 856,323 cache read · 206,226 cache write |
| Cost | $4.326324 |

## How to read this

Read the timeline first, then follow each playbook rule from the exact instructions through tool responses, validation, verifier feedback, the human checkpoint, and applied operations. Every `seq` link opens the corresponding raw JSONL line. Tool results are whitespace-compacted and capped at 400 characters here; `trajectory.jsonl` is the complete redacted record. Exact first system prompts are in `prompts.md`.

## Stage timeline

| Stage | Events | LLM calls | Tool calls | Outcome | Raw events |
|---|---:|---:|---:|---|---|
| ingest | 1 | 0 | 0 | — | [seq 1](trajectory.jsonl#L1)–[seq 1](trajectory.jsonl#L1) |
| planner | 4 | 1 | 0 | — | [seq 2](trajectory.jsonl#L2)–[seq 5](trajectory.jsonl#L5) |
| drafters | 444 | 96 | 123 | 18 submitted finding(s) | [seq 6](trajectory.jsonl#L6)–[seq 499](trajectory.jsonl#L499) |
| verifier | 39 | 13 | 0 | 13 verdict(s) | [seq 139](trajectory.jsonl#L139)–[seq 505](trajectory.jsonl#L505) |
| assembler | 21 | 0 | 0 | — | [seq 121](trajectory.jsonl#L121)–[seq 513](trajectory.jsonl#L513) |
| memo | 4 | 1 | 0 | — | [seq 509](trajectory.jsonl#L509)–[seq 512](trajectory.jsonl#L512) |
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

- [seq 49](trajectory.jsonl#L49) **drafter → read_section**

```json
{"sectionId":"sec-21.1"}
```

- [seq 50](trajectory.jsonl#L50) **read_section result**

```json
{"sectionRef":"§ 21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","paragraphs":[{"id":"p…
```

- [seq 51](trajectory.jsonl#L51) **drafter → read_section**

```json
{"sectionId":"sec-21.3"}
```

- [seq 52](trajectory.jsonl#L52) **read_section result**

```json
{"sectionRef":"§ 21.3 “Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property. Customer's obligation to pay undisputed Fees for conforming Services is not damages and is not limited by this Sec…
```

- [seq 93](trajectory.jsonl#L93) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0088","p0089","p0090","p0091"],"quote":"21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","rationale":"Section 21 meets the preferred position. The cap in 21.1 is expressly mutual and set at the greater of (a) Fees paid or payable by Customer in the twelve months preceding the claim event and (b) USD 1,000,000. \"Fees\" (§1.5) covers recurring subscription, professional services and usage fees, so the base is meaningful rather than illusory. Section 21.2 is a mutual exclusion of indirect/consequential damages and helpfully confirms that data restoration, replacement services, notification and incident-response costs are direct damages. Section 21.3 places outside the cap each Party's breach of confidentiality, data-protection and security obligations, indemnification obligations, gross negligence, wilful misconduct or fraud, and infringement of the other Party's IP, and confirms Customer's obligation to pay undisputed Fees is not \"damages\" subject to the cap — the latter is a benefit to neither side unfairly and mirrors our model language. Section 21.4 preserves independence of each cap/exclusion and survival of failure of essential purpose, and §18.2 confirms insurance does not limit Vendor's liabilities. No one-sided cap, no indemnities inside the cap. No redline required.","confidence":0.93}
```

- [seq 94](trajectory.jsonl#L94) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 93](trajectory.jsonl#L93)
- Finding: `f-lol-cap-85b7fb6d` · **compliant** · confidence 0.93
- Location: § 21.1 Except for Excluded Claims, each Party's total aggregate li…
- Quote: “21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.”
- Rationale: Section 21 meets the preferred position. The cap in 21.1 is expressly mutual and set at the greater of (a) Fees paid or payable by Customer in the twelve months preceding the claim event and (b) USD 1,000,000. "Fees" (§1.5) covers recurring subscription, professional services and usage fees, so the base is meaningful rather than illusory. Section 21.2 is a mutual exclusion of indirect/consequential damages and helpfully confirms that data restoration, replacement services, notification and incident-response costs are direct damages. Section 21.3 places outside the cap each Party's breach of confidentiality, data-protection and security obligations, indemnification obligations, gross negligence, wilful misconduct or fraud, and infringement of the other Party's IP, and confirms Customer's obligation to pay undisputed Fees is not "damages" subject to the cap — the latter is a benefit to neither side unfairly and mirrors our model language. Section 21.4 preserves independence of each cap/exclusion and survival of failure of essential purpose, and §18.2 confirms insurance does not limit Vendor's liabilities. No one-sided cap, no indemnities inside the cap. No redline required.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

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
{"sectionRef":"§ 20 INDEMNIFICATION","paragraphs":[{"id":"p0081","text":"20. INDEMNIFICATION"}]}
```

- [seq 21](trajectory.jsonl#L21) **drafter → list_sections**

```json
{}
```

- [seq 22](trajectory.jsonl#L22) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 61](trajectory.jsonl#L61) **drafter → read_section**

```json
{"sectionId":"sec-20.1"}
```

- [seq 62](trajectory.jsonl#L62) **read_section result**

```json
{"sectionRef":"§ 20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.","pa…
```

- [seq 63](trajectory.jsonl#L63) **drafter → read_section**

```json
{"sectionId":"sec-20.2"}
```

- [seq 64](trajectory.jsonl#L64) **read_section result**

```json
{"sectionRef":"§ 20.2 Vendor shall also defend, indemnify, and hold harmless the Customer indemnified parties from third-party claims to the extent arising from Vendor's breach of Applicable Law; bodily injury, death, or tangible property damage caused by Vendor; unauthorized access to or disclosure of Customer Data caused by Vendor; or Vendor's gross negligence, wilful misconduct, or fraud.","pa…
```

- [seq 65](trajectory.jsonl#L65) **drafter → read_section**

```json
{"sectionId":"sec-20.3"}
```

- [seq 66](trajectory.jsonl#L66) **read_section result**

```json
{"sectionRef":"§ 20.3 Customer shall defend and indemnify Vendor from a third-party claim alleging that unmodified Customer material supplied by Customer and used by Vendor strictly as authorized infringes an intellectual property right, or arising from Customer's violation of Applicable Law in its authorized use of the Services. Customer has no obligation to the extent a claim arises from Vendor…
```

- [seq 67](trajectory.jsonl#L67) **drafter → read_section**

```json
{"sectionId":"sec-20.4"}
```

- [seq 68](trajectory.jsonl#L68) **read_section result**

```json
{"sectionRef":"§ 20.4 The indemnified Party shall give prompt notice, reasonable cooperation at the indemnifying Party's expense, and control of the defence, except delay excuses obligations only to the extent of material prejudice. The indemnifying Party may not settle a claim by admitting fault of, imposing non-monetary obligations on, or failing to fully release the indemnified Party without p…
```

- [seq 69](trajectory.jsonl#L69) **drafter → read_section**

```json
{"sectionId":"sec-20.5"}
```

- [seq 70](trajectory.jsonl#L70) **read_section result**

```json
{"sectionRef":"§ 20.5 For an infringement claim, Vendor shall, at its expense and in addition to its defence obligations, procure continued use, modify or replace the affected item without materially reducing functionality, or, if neither is commercially reasonable, terminate the item and refund prepaid and implementation Fees on a straight-line three-year basis. Vendor may not terminate unaffect…
```

- [seq 97](trajectory.jsonl#L97) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0082","p0083","p0084","p0085","p0086"],"quote":"20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.","rationale":"Section 20 meets the preferred position in full. Vendor defends and indemnifies Customer and its Affiliates for third-party IP infringement/misappropriation claims arising from the Services or Deliverables (20.1), and for Vendor's breach of Applicable Law, bodily injury/property damage, unauthorized access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud (20.2). Customer's reciprocal indemnity in 20.3 is appropriately narrow (unmodified Customer-supplied material and Customer's violation of law in authorized use), with carve-outs for Vendor Technology, modifications, combinations and instructions. Standard procedure (prompt notice, cooperation at the indemnifying Party's expense, control of defence, settlement-consent protections) appears in 20.4, and the infringement remedies (procure, modify/replace, refund) in 20.5, with a matching termination right in 9.3. Notably, indemnification obligations are Excluded Claims under 21.3, so Vendor's indemnity is not subject to the general cap or to a super-cap — better than the fallback and favourable to us. No redline warranted.","confidence":0.93}
```

- [seq 98](trajectory.jsonl#L98) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 97](trajectory.jsonl#L97)
- Finding: `f-indemn-27af6fdd` · **compliant** · confidence 0.93
- Location: § 20.1 Vendor shall defend, indemnify, and hold harmless Customer,…
- Quote: “20.1 Vendor shall defend, indemnify, and hold harmless Customer, its Affiliates, and their directors, officers, employees, and agents from each third-party claim and resulting damages, settlements, judgments, penalties, costs, and reasonable attorneys' fees arising from an allegation that the Services or Deliverables infringe or misappropriate an intellectual property right.”
- Rationale: Section 20 meets the preferred position in full. Vendor defends and indemnifies Customer and its Affiliates for third-party IP infringement/misappropriation claims arising from the Services or Deliverables (20.1), and for Vendor's breach of Applicable Law, bodily injury/property damage, unauthorized access to or disclosure of Customer Data caused by Vendor, and Vendor's gross negligence, wilful misconduct or fraud (20.2). Customer's reciprocal indemnity in 20.3 is appropriately narrow (unmodified Customer-supplied material and Customer's violation of law in authorized use), with carve-outs for Vendor Technology, modifications, combinations and instructions. Standard procedure (prompt notice, cooperation at the indemnifying Party's expense, control of defence, settlement-consent protections) appears in 20.4, and the infringement remedies (procure, modify/replace, refund) in 20.5, with a matching termination right in 9.3. Notably, indemnification obligations are Excluded Claims under 21.3, so Vendor's indemnity is not subject to the general cap or to a super-cap — better than the fallback and favourable to us. No redline warranted.

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

- [seq 43](trajectory.jsonl#L43) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 44](trajectory.jsonl#L44) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 45](trajectory.jsonl#L45) **drafter → read_section**

```json
{"sectionId":"sec-2.2"}
```

- [seq 46](trajectory.jsonl#L46) **read_section result**

```json
{"sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","paragraphs":[{"id":"p0013","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}
```

- [seq 83](trajectory.jsonl#L83) **drafter → search**

```json
{"query":"compet","limit":30}
```

- [seq 84](trajectory.jsonl#L84) **search result**

```json
[{"paragraphId":"p0050","sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-…
```

- [seq 85](trajectory.jsonl#L85) **drafter → search**

```json
{"query":"shall not develop","limit":20}
```

- [seq 86](trajectory.jsonl#L86) **search result**

```json
[]
```

- [seq 111](trajectory.jsonl#L111) **drafter → search**

```json
{"query":"Customer shall not","limit":20}
```

- [seq 112](trajectory.jsonl#L112) **search result**

```json
[{"paragraphId":"p0056","sectionRef":"§ 13.4 Customer shall not knowingly reverse engineer hosted source code except to the extent a restriction is prohibited by Applicable Law, interfere with the Services, bypass documented security controls, or use the Services to violate Applicable Law. These restrictions do not limit testing authorized by the security exhibit or use of Customer Data and outpu…
```

- [seq 113](trajectory.jsonl#L113) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 114](trajectory.jsonl#L114) **read_section result**

```json
{"sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","paragraphs":[{"id":"p0012","text":"2.1 This Agreemen…
```

- [seq 131](trajectory.jsonl#L131) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0050"],"quote":"12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","rationale":"§ 12.3 expressly preserves our freedom to develop, acquire, license, sell or use any product or service and to operate in any field or territory, and records that we have given no non-compete or field-of-use commitment. This meets the preferred position (no non-compete restriction on Customer). No other clause binds us competitively: § 2.1 confirms no purchase commitment, § 13.4 is a standard acceptable-use restriction rather than a competitive covenant, and § 24.2 restricts Vendor, not us. § 2.2 (sole and exclusive provider of hosted analytics services) is a supply-exclusivity term that sits under the separate exclusivity rule and is addressed there rather than double-flagged here.","confidence":0.86}
```

- [seq 132](trajectory.jsonl#L132) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 131](trajectory.jsonl#L131)
- Finding: `f-noncompete-f6f22fb5` · **compliant** · confidence 0.86
- Location: § 12.3 Nothing restricts Customer from developing, acquiring, lice…
- Quote: “12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.”
- Rationale: § 12.3 expressly preserves our freedom to develop, acquire, license, sell or use any product or service and to operate in any field or territory, and records that we have given no non-compete or field-of-use commitment. This meets the preferred position (no non-compete restriction on Customer). No other clause binds us competitively: § 2.1 confirms no purchase commitment, § 13.4 is a standard acceptable-use restriction rather than a competitive covenant, and § 24.2 restricts Vendor, not us. § 2.2 (sole and exclusive provider of hosted analytics services) is a supply-exclusivity term that sits under the separate exclusivity rule and is addressed there rather than double-flagged here.

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

- [seq 25](trajectory.jsonl#L25) **drafter → read_section**

```json
{"sectionId":"sec-2.2"}
```

- [seq 26](trajectory.jsonl#L26) **read_section result**

```json
{"sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","paragraphs":[{"id":"p0013","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}
```

- [seq 27](trajectory.jsonl#L27) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 28](trajectory.jsonl#L28) **read_section result**

```json
{"sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","paragraphs":[{"id":"p0012","text":"2.1 This Agreemen…
```

- [seq 77](trajectory.jsonl#L77) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 78](trajectory.jsonl#L78) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 79](trajectory.jsonl#L79) **drafter → search**

```json
{"query":"exclusive"}
```

- [seq 80](trajectory.jsonl#L80) **search result**

```json
[{"paragraphId":"p0013","sectionRef":"§ 2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","snippet":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."},{"paragraphId":"p0053","sectionRef":"§ 13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and co…
```

- [seq 101](trajectory.jsonl#L101) **drafter → list_sections**

```json
{}
```

- [seq 102](trajectory.jsonl#L102) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 103](trajectory.jsonl#L103) **drafter → lookup_precedent**

```json
{"ruleId":"EXCLUSIVITY","context":"Vendor as sole and exclusive provider of hosted analytics services for the term"}
```

- [seq 104](trajectory.jsonl#L104) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 127](trajectory.jsonl#L127) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete full-term sole-source exclusivity obligation on Customer in 2.2","comment":"[Playbook] We have deleted the sole-and-exclusive-provider commitment: our playbook does not permit exclusivity or sole-supplier obligations on us, and this clause also contradicts Sections 2.1 and 12.3, which confirm no purchase commitment or exclusivity. If Silverline needs some protection, we could consider exclusivity limited to a defined product category for twelve months that ends automatically if service levels or delivery dates are missed.","ops":[{"kind":"delete_paragraph","paragraphId":"p0013"}]}
```

- [seq 128](trajectory.jsonl#L128) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0013","segments":[{"type":"delete","text":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term."}]}]}
```

- [seq 153](trajectory.jsonl#L153) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0013"],"quote":"2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.","rationale":"Section 2.2 binds Customer to use Vendor as its sole and exclusive provider of hosted analytics services for the entire three-year term, with no category limitation, no 12-month cap, and no performance-based exit. That is walk-away territory under this rule and fails the fallback on every material term. It also conflicts directly with Section 2.1 (no minimum quantity or purchase commitment) and Section 12.3 (Vendor acknowledges Customer has made no exclusivity commitment), so deletion both meets the preferred position and resolves the internal inconsistency. Exclusivity running in our favour (e.g., the non-exclusive licence in 13.1) is unaffected.","confidence":0.95,"proposal":{"level":"preferred","summary":"Delete full-term sole-source exclusivity obligation on Customer in 2.2","comment":"[Playbook] We have deleted the sole-and-exclusive-provider commitment: our playbook does not permit exclusivity or sole-supplier obligations on us, and this clause also contradicts Sections 2.1 and 12.3, which confirm no purchase commitment or exclusivity. If Silverline needs some protection, we could consider exclusivity limited to a defined product category for twelve months that ends automatically if service levels or delivery dates are missed.","ops":[{"kind":"delete_paragraph","paragraphId":"p0013"}]}}
```

- [seq 154](trajectory.jsonl#L154) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 153](trajectory.jsonl#L153)
- Finding: `f-exclusivity-d350eef7` · **deviation** · confidence 0.95
- Location: § 2.2 Vendor will be Customer's sole and exclusive provider of ho…
- Quote: “2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.”
- Rationale: Section 2.2 binds Customer to use Vendor as its sole and exclusive provider of hosted analytics services for the entire three-year term, with no category limitation, no 12-month cap, and no performance-based exit. That is walk-away territory under this rule and fails the fallback on every material term. It also conflicts directly with Section 2.1 (no minimum quantity or purchase commitment) and Section 12.3 (Vendor acknowledges Customer has made no exclusivity commitment), so deletion both meets the preferred position and resolves the internal inconsistency. Exclusivity running in our favour (e.g., the non-exclusive licence in 13.1) is unaffected.
- Proposal: **preferred** — Convert 2.2 sole-and-exclusive provider commitment to non-exclusive
- Comment: [Playbook] We have changed the sole-and-exclusive-provider commitment to a non-exclusive one, so no exclusivity or sole-supplier obligation binds us; this also aligns 2.2 with Section 2.1 (no purchase commitment). If Silverline needs protection, we could discuss exclusivity limited to a defined product category for 12 months ending automatically on any failure to meet service levels or delivery dates.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Vendor will be a non-exclusive provider of hosted analytics services throughout the term.",
    "oldText": "Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.",
    "paragraphId": "p0013"
  }
]
```

### Verifier and repair feedback

- [seq 202](trajectory.jsonl#L202) **Verdict: fail** — official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence Locked target is preferred, and the preferred position (no exclusivity or sole-supplier obligation on Customer) is fully achieved by deleting the only sentence imposing it. The fallback bargain is not satisfied and does not need to be; the drafter correctly offers it only in the non-operative margin comment. On minimality, the paragraph consisted solely of the offending exclusivity commitment ('Vendor will be Customer's sole and exclusive provider ... throughout the term.'); there was no unrelated commercial term to preserve, so deletion changes no more than necessary. The official minimality gate's whole-paragraph flag is not substantively offending here. Intent preserved: no defined term is orphaned and no cross-reference depends on the deleted sentence; Sections 2.1 and 12.3 (no purchase commitment or exclusivity) remain consistent and no dangling mechanic is created. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 deletes a whole paragraph; replace only the offending words or sentence"}.
- [seq 203](trajectory.jsonl#L203) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence\n\nVerifier reasons:\n- Locked target is preferred, and the preferred position (no exclusivity or sole-supplier obligation on Customer) is fully achieved by deleting the only sentence imposing it.\n- The fallback bargain is not satisfied and does not need to be; the drafter correctly offers it only in the non-operative margin comment.\n- On minimality, the paragraph consisted solely of the offending exclusivity commitment ('Vendor will be Customer's sole and exclusive provider ... throughout the term.'); there was no unrelated commercial term to preserve, so deletion changes no more than necessary. The official minimality gate's whole-paragraph flag is not substantively offending here.\n- Intent preserved: no defined term is orphaned and no cross-reference depends on the deleted sentence; Sections 2.1 and 12.3 (no purchase commitment or exclusivity) remain consistent and no dangling mechanic is created."
- [seq 251](trajectory.jsonl#L251) **Verdict: repaired** — The single replacement converts the sole-and-exclusive commitment into a non-exclusive one, so no exclusivity or sole-supplier obligation binds Customer — the preferred (locked) level is fully met. Change is a short in-place phrase substitution; no fallback mechanics, boilerplate, or unrelated terms were added, and Section 2.1's no-commitment language is untouched. Fallback elements (12-month cap, automatic SLA/delivery-date termination) are absent, but that is irrelevant since the preferred level is achieved and the two levels are not combined. No undefined terms, contradictions, or dangling mechanics introduced; 2.2 now reads consistently with 2.1. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: no requirements/sole-supplier obligation on Customer remains","ok":true}; {"name":"official minimality gate","ok":true}.

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

- [seq 31](trajectory.jsonl#L31) **drafter → read_section**

```json
{"sectionId":"sec-7.2"}
```

- [seq 32](trajectory.jsonl#L32) **read_section result**

```json
{"sectionRef":"§ 7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","paragraphs":[{"id":"p0027","text":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]}
```

- [seq 33](trajectory.jsonl#L33) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 34](trajectory.jsonl#L34) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 55](trajectory.jsonl#L55) **drafter → search**

```json
{"query":"no less favourable"}
```

- [seq 56](trajectory.jsonl#L56) **search result**

```json
[{"paragraphId":"p0027","sectionRef":"§ 7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","snippet":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]
```

- [seq 57](trajectory.jsonl#L57) **drafter → lookup_precedent**

```json
{"ruleId":"MFN","context":"Customer-side MFN obligation to vendor; delete"}
```

- [seq 58](trajectory.jsonl#L58) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 89](trajectory.jsonl#L89) **drafter → propose_redline**

```json
{"ops":[{"kind":"delete_paragraph","paragraphId":"p0027"}],"comment":"[Playbook] We have deleted the most-favoured-nation obligation at 7.2: our playbook does not accept an open-ended commitment to extend Vendor the best terms we give any other supplier, and it directly contradicts Section 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. If some price assurance is needed, we could consider a narrow MFN limited to a defined product for 12 months with reasonable-comparison carve-outs.","level":"preferred","summary":"Delete Customer-side MFN obligation in 7.2"}
```

- [seq 90](trajectory.jsonl#L90) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0027","segments":[{"type":"delete","text":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier."}]}]}
```

- [seq 117](trajectory.jsonl#L117) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0027","p0050"],"quote":"7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.","rationale":"Section 7.2 imposes an MFN running against us: we would have to give Vendor terms no less favourable than the best terms we offer any other technology supplier. It is unlimited in scope, duration and product, with no comparison carve-outs, so it fails the fallback (defined product, 12 months, reasonable-comparison carve-outs) and sits in walk-away territory. It also conflicts with Section 12.3, where Vendor acknowledges we have made no most-favoured-customer commitment. Preferred position is no MFN burden on Customer, so we delete 7.2; no Vendor-granted MFN in our favour exists to preserve.","confidence":0.93,"proposal":{"ops":[{"kind":"delete_paragraph","paragraphId":"p0027"}],"comment":"[Playbook] We have deleted the most-favoured-nation obligation at 7.2: our playbook does not accept an open-ended commitment to extend Vendor the best terms we give any other supplier, and it directly contradicts Section 12.3, in which Vendor acknowledges we have made no most-favoured-customer commitment. If some price assurance is needed, we could consider a narrow MFN limited to a defined product for 12 months with reasonable-comparison carve-outs.","level":"preferred","summary":"Delete Customer-side MFN obligation in 7.2"}}
```

- [seq 118](trajectory.jsonl#L118) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 117](trajectory.jsonl#L117)
- Finding: `f-mfn-2931a78e` · **deviation** · confidence 0.93
- Location: § 7.2 Customer shall offer Vendor terms no less favourable than t…
- Quote: “7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.”
- Rationale: Section 7.2 imposes an MFN running against us: we would have to give Vendor terms no less favourable than the best terms we offer any other technology supplier. It is unlimited in scope, duration and product, with no comparison carve-outs, so it fails the fallback (defined product, 12 months, reasonable-comparison carve-outs) and sits in walk-away territory. It also conflicts with Section 12.3, where Vendor acknowledges we have made no most-favoured-customer commitment. Preferred position is no MFN burden on Customer, so we delete 7.2; no Vendor-granted MFN in our favour exists to preserve.
- Proposal: **preferred** — Negate Customer-side MFN obligation in 7.2
- Comment: [Playbook] We have flipped the operator in 7.2 so that Customer is not required to offer Vendor terms no less favourable than those given to any other supplier, leaving no MFN obligation on us. This matches our preferred position and removes the conflict with Section 12.3, where Vendor acknowledges we have made no most-favoured-customer commitment.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer shall not be required to offer Vendor terms no less favourable",
    "oldText": "Customer shall offer Vendor terms no less favourable",
    "paragraphId": "p0027"
  }
]
```

### Verifier and repair feedback

- [seq 162](trajectory.jsonl#L162) **Verdict: fail** — official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence Locked target is the preferred level, which requires the absence of any MFN obligation on Customer; deleting clause 7.2 in full achieves exactly that and nothing else was altered. Clause 7.2 consisted solely of the single offending MFN sentence, so paragraph deletion is the smallest available edit — no operator, number, or short phrase could cure an obligation whose entire content is the MFN. The deterministic minimality gate's generic objection to whole-paragraph deletion does not apply on these facts. Fallback elements (defined product, 12-month term, reasonable-comparison carve-outs) are unmet, but that is irrelevant because the preferred bargain is fully satisfied; the two levels are not combined. Intent preserved: 12.3 remains fully effective and the deletion removes the contradiction between 7.2 and Vendor's acknowledgement that Customer made no most-favoured-customer commitment. No defined term, cross-reference, or mechanic is left dangling by the removal. No unrelated commercial term was touched and no new exception or boilerplate was introduced. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 deletes a whole paragraph; replace only the offending words or sentence"}.
- [seq 163](trajectory.jsonl#L163) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence\n\nVerifier reasons:\n- Locked target is the preferred level, which requires the absence of any MFN obligation on Customer; deleting clause 7.2 in full achieves exactly that and nothing else was altered.\n- Clause 7.2 consisted solely of the single offending MFN sentence, so paragraph deletion is the smallest available edit — no operator, number, or short phrase could cure an obligation whose entire content is the MFN. The deterministic minimality gate's generic objection to whole-paragraph deletion does not apply on these facts.\n- Fallback elements (defined product, 12-month term, reasonable-comparison carve-outs) are unmet, but that is irrelevant because the preferred bargain is fully satisfied; the two levels are not combined.\n- Intent preserved: 12.3 remains fully effective and the deletion removes the contradiction between 7.2 and Vendor's acknowledgement that Customer made no most-favoured-customer commitment. No defined term, cross-reference, or mechanic is left dangling by the removal.\n- No unrelated commercial term was touched and no new exception or boilerplate was introduced."
- [seq 220](trajectory.jsonl#L220) **Verdict: repaired** — The single operator flip ("shall not be required to offer") eliminates the Customer-side MFN in 7.2, achieving the locked preferred position with no MFN burden on Customer. Fallback elements (defined product, 12-month term, comparison carve-outs) are absent, but that is irrelevant since the preferred level is fully met and the two levels are separate bargains. Change is confined to a short phrase within one sentence; no whole-clause rewrite, new exception, or boilerplate added. Section 12.3's acknowledgement that Customer made no most-favoured-customer commitment is untouched and now consistent rather than contradictory; no undefined terms or dangling mechanics introduced. Drafting note only: the resulting double negative ("shall not be required to offer ... no less favourable") reads awkwardly; a cleaner deletion of the sentence would be equally minimal, but the operative effect is unambiguous. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official minimality gate","ok":true}.

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
{"sectionRef":"§ 12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","paragraphs":[{"id":"p0051","text":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term."}]}
```

- [seq 39](trajectory.jsonl#L39) **drafter → read_section**

```json
{"sectionId":"sec-12.3"}
```

- [seq 40](trajectory.jsonl#L40) **read_section result**

```json
{"sectionRef":"§ 12.3 Nothing restricts Customer from developing, acquiring, licensing, selling, or using any product or service, engaging any supplier, hiring any person who responds to general recruitment, or conducting business in any field or territory. Vendor acknowledges that Customer has made no exclusivity, non-compete, most-favoured-customer, minimum-volume, or no-hire commitment.","para…
```

- [seq 73](trajectory.jsonl#L73) **drafter → lookup_precedent**

```json
{"ruleId":"NOSOLICIT","context":"One-way 18-month non-solicit and no-engage on Customer covering all Vendor employees; narrow to mutual 12-month solicitation-only with general advertising and unsolicited approach carve-outs"}
```

- [seq 74](trajectory.jsonl#L74) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 107](trajectory.jsonl#L107) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0051","oldText":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","newText":"12.4 For twelve months after the end of a person's involvement in the Services, neither party will knowingly solicit for employment any employee of the other party who was directly involved in performing or receiving the Services. Nothing in this Section 12.4 restricts either party from hiring or engaging any person who responds to a general advertisement or other recruitment activity not specifically targeted at the other party's personnel, or who approaches that party on an unsolicited basis."}],"comment":"[Playbook] We have narrowed this to a mutual, solicitation-only restriction limited to personnel directly involved in the Services, running twelve months from the end of that involvement, with the usual general-advertising and unsolicited-approach carve-outs. Our playbook does not accept one-way no-hire style restrictions on us covering all Vendor personnel, and this also sits awkwardly with Section 12.3.","level":"fallback","summary":"Narrow one-way 18-month no-solicit/no-engage to mutual 12-month solicitation-only with carve-outs"}
```

- [seq 108](trajectory.jsonl#L108) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0051","segments":[{"type":"equal","text":"12.4 For "},{"type":"delete","text":"eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term"},{"type":"insert","text":"twelve months after the end of a person's involvement in the Services, neither party will knowingly solicit for e…
```

- [seq 135](trajectory.jsonl#L135) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0051"],"quote":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","rationale":"Section 12.4 binds only the Customer, runs eighteen months from termination (not from the end of a person's involvement), covers every person employed by Vendor at any time during the term rather than only personnel directly involved in the Services, bars \"engage\" as well as solicit (a de facto no-hire), and contains no general-advertising or unsolicited-approach carve-out. That fails the fallback on every material term (mutuality, scope, duration trigger, carve-outs, no no-hire). Section 12.3's general-recruitment language sits in tension with it but does not cure the defect, since 12.4 still bars engaging Vendor personnel however sourced. Following the rule's redline guidance we narrowed to the fallback rather than deleting outright: mutual, solicitation-only, limited to personnel directly involved in the Services, twelve months from the end of that involvement, with general-advertising and unsolicited-approach carve-outs.","confidence":0.88,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0051","oldText":"12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.","newText":"12.4 For twelve months after the end of a person's involvement in the Services, neither party will knowingly solicit for employment any employee of the other party who was directly involved in performing or receiving the Services. Nothing in this Section 12.4 restricts either party from hiring or engaging any person who responds to a general advertisement or other recruitment activity not specifically targeted at the other party's personnel, or who approaches that party on an unsolicited basis."}],"comment":"[Playbook] We have narrowed this to a mutual, solicitation-only restriction limited to personnel directly involved in the Services, running twelve months from the end of that involvement, with the usual general-advertising and unsolicited-approach carve-outs. Our playbook does not accept one-way no-hire style restrictions on us covering all Vendor personnel, and this also sits awkwardly with Section 12.3.","level":"fallback","summary":"Narrow one-way 18-month no-solicit/no-engage to mutual 12-month solicitation-only with carve-outs"}}
```

- [seq 136](trajectory.jsonl#L136) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 135](trajectory.jsonl#L135)
- Finding: `f-nosolicit-0d12d799` · **deviation** · confidence 0.88
- Location: § 12.4 For eighteen months after termination Customer will not sol…
- Quote: “12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.”
- Rationale: Section 12.4 binds only the Customer, runs eighteen months from termination (not from the end of a person's involvement), covers every person employed by Vendor at any time during the term rather than only personnel directly involved in the Services, bars "engage" as well as solicit (a de facto no-hire), and contains no general-advertising or unsolicited-approach carve-out. That fails the fallback on every material term (mutuality, scope, duration trigger, carve-outs, no no-hire). Section 12.3's general-recruitment language sits in tension with it but does not cure the defect, since 12.4 still bars engaging Vendor personnel however sourced. Following the rule's redline guidance we narrowed to the fallback rather than deleting outright: mutual, solicitation-only, limited to personnel directly involved in the Services, twelve months from the end of that involvement, with general-advertising and unsolicited-approach carve-outs.
- Proposal: **fallback** — Cut no-hire wording, set 12 months from end of involvement, and add a mutual, directly-involved-only sentence with both carve-outs
- Comment: [Playbook] We cut "engage" so this is solicitation only, and reset the period to 12 months from the end of a person's involvement rather than 18 months from termination. The added sentence makes the restriction mutual, limits it to personnel directly involved in the Services, and adds the general-advertisement and unsolicited-approach carve-outs, which is our fallback position on non-solicits.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "12.4 For 12 months after the end of their involvement Customer will not solicit any person employed by Vendor at any time.",
    "oldText": "12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.",
    "paragraphId": "p0051"
  },
  {
    "kind": "insert_after",
    "numbering": "12.5",
    "paragraphId": "p0051",
    "text": "12.5 Vendor is subject to the same restriction with respect to Customer's personnel, so that neither Party will solicit the other Party's personnel who are directly involved in the Services, in each case only for 12 months from the end of that person's involvement in the Services. Neither Section 12.4 nor this Section 12.5 applies to a person who responds to a general advertisement not targeted at the other Party's personnel or who makes an unsolicited approach."
  }
]
```

### Verifier and repair feedback

- [seq 186](trajectory.jsonl#L186) **Verdict: fail** — official check: non-solicit duration ≤ 12 months: number not found by the official literal pattern precision position: fallback non-solicit includes 12 months from the end of involvement: State the 12 months from the end of involvement expressly. precision position: fallback non-solicit includes unsolicited-approach carve-out: State the unsolicited-approach carve-out expressly. official minimality gate: Operation 1 expands 23 words to 78 words (ratio 3.39 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.826 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Locked target is the fallback, and every atomic fallback element is present in operative text: mutuality, scope limited to personnel directly involved in performing or receiving the Services, twelve months measured from the end of involvement, general-advertisement carve-out, unsolicited-approach carve-out, and solicitation-only (no no-hire). The official literal checks for '12 months from the end of involvement' and the unsolicited-approach carve-out appear to be pattern artefacts (the clause spells 'twelve' and uses 'approaches that party on an unsolicited basis'); the operative language satisfies both requirements read literally. Preferred position (no non-solicit on Customer) is not achieved because Customer remains restricted, but that is consistent with the drafter's locked fallback target. The official word/character-ratio minimality gate fails, but the original clause was defective on every fallback element (one-way, eighteen months, all Vendor personnel, no-hire, no carve-outs), so no operator, number, or short-phrase edit would suffice; a single replacement of the sentence is the tightest available route. Minor, non-fatal softening: 'knowingly' qualifies the solicitation duty. It is symmetrical and does not weaken our position, so it is noted rather than flagged. No undefined terms, contradictions, or dangling mechanics are introduced; surrounding sections remain untouched and effective. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: non-solicit duration ≤ 12 months","ok":false,"detail":"number not found by the official literal pattern"}; {"name":"official check: general-solicitation carve-out present","ok":true}; {"name":"precision position: fallback non-solicit includes mutual restriction","ok":true}; {"name":"precision position: fallback non-solicit includes personnel directly involved in the Services","ok":true}; {"name":"precision position: fallback non-solicit includes 12 months from the end of involvement","ok":false,"detail":"State the 12 months from the end of involvement expressly."}; {"name":"precision position: fallback non-solicit includes general-advertisement carve-out","ok":true}; {"name":"precision position: fallback non-solicit includes unsolicited-approach carve-out","ok":false,"detail":"State the unsolicited-approach carve-out expressly."}; {"name":"precision position: fallback non-solicit has no no-hire prohibition","ok":true}; {"name":"precision position: fallback non-solicit period cannot run independently for the full Agreement term","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 23 words to 78 words (ratio 3.39 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.826 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 187](trajectory.jsonl#L187) **Repair round 1**: "Current target level: fallback. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official check: non-solicit duration ≤ 12 months: number not found by the official literal pattern\n- precision position: fallback non-solicit includes 12 months from the end of involvement: State the 12 months from the end of involvement expressly.\n- precision position: fallback non-solicit includes unsolicited-approach carve-out: State the unsolicited-approach carve-out expressly.\n- official minimality gate: Operation 1 expands 23 words to 78 words (ratio 3.39 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.826 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nVerifier reasons:\n- Locked target is the fallback, and every atomic fallback element is present in operative text: mutuality, scope limited to personnel directly involved in performing or receiving the Services, twelve months measured from the end of involvement, general-advertisement carve-out, unsolicited-approach carve-out, and solicitation-only (no no-hire).\n- The official literal checks for '12 months from the end of involvement' and the unsolicited-approach carve-out appear to be pattern artefacts (the clause spells 'twelve' and uses 'approaches that party on an unsolicited basis'); the operative language satisfies both requirements read literally.\n- Preferred position (no non-solicit on Customer) is not achieved because Customer remains restricted, but that is consistent with the drafter's locked fallback target.\n- The official word/character-ratio minimality gate fails, but the original clause was defective on every fallback element (one-way, eighteen months, all Vendor personnel, no-hire, no carve-outs), so no operator, number, or short-phrase edit would suffice; a single replacement of the sentence is the tightest available route.\n- Minor, non-fatal softening: 'knowingly' qualifies the solicitation duty. It is symmetrical and does not weaken our position, so it is noted rather than flagged.\n- No undefined terms, contradictions, or dangling mechanics are introduced; surrounding sections remain untouched and effective."
- [seq 255](trajectory.jsonl#L255) **Verdict: fail** — The Customer-side covenant in 12.4 was not narrowed to service personnel: it still covers "any person employed by Vendor at any time", which is broader than the fallback's "personnel directly involved in the services" and is the very asymmetry we are trying to fix. 12.4 and 12.5 now conflict on scope: 12.5 says "neither Party will solicit the other Party's personnel who are directly involved in the Services" while 12.4 covers any Vendor employee, creating an ambiguity a vendor will read against us. The revised 12.4 uses "the end of their involvement" with no antecedent — "their" is dangling because 12.4 no longer identifies personnel involved in the Services; the involvement concept only appears in 12.5. Fix minimally by editing 12.4 to read: "For 12 months after the end of a person's involvement in the Services, Customer will not solicit any Vendor personnel directly involved in the Services," and deleting "at any time", so the mutual sentence in 12.5 sits on a matching Customer-side obligation. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: non-solicit duration ≤ 12 months","ok":true,"detail":"value=12"}; {"name":"official check: general-solicitation carve-out present","ok":true}; {"name":"precision position: fallback non-solicit includes mutual restriction","ok":true}; {"name":"precision position: fallback non-solicit includes personnel directly involved in the Services","ok":true}; {"name":"precision position: fallback non-solicit includes 12 months from the end of involvement","ok":true}; {"name":"precision position: fallback non-solicit includes general-advertisement carve-out","ok":true}; {"name":"precision position: fallback non-solicit includes unsolicited-approach carve-out","ok":true}; {"name":"precision position: fallback non-solicit has no no-hire prohibition","ok":true}; {"name":"precision position: fallback non-solicit period cannot run independently for the full Agreement term","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## T4C — Termination for convenience

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 122](trajectory.jsonl#L122)

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

- [seq 147](trajectory.jsonl#L147) **drafter → read_section**

```json
{"sectionId":"sec-9"}
```

- [seq 148](trajectory.jsonl#L148) **read_section result**

```json
{"sectionRef":"§ 9 TERMINATION","paragraphs":[{"id":"p0037","text":"9. TERMINATION"}]}
```

- [seq 149](trajectory.jsonl#L149) **drafter → list_sections**

```json
{}
```

- [seq 150](trajectory.jsonl#L150) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 172](trajectory.jsonl#L172) **drafter → search**

```json
{"query":"convenience"}
```

- [seq 173](trajectory.jsonl#L173) **search result**

```json
[{"paragraphId":"p0008","sectionRef":"§ 1.6 “Order Form” means a written ordering document signed by authorized representatives of both Parties that references this Agreement and describes the Services, Deliverables, subscription quantities, service levels, Fees, and term purchased by Customer. A purchase order is an administrative convenience only and does not amend an Order Form or this Agreeme…
```

- [seq 174](trajectory.jsonl#L174) **drafter → search**

```json
{"query":"terminate","limit":30}
```

- [seq 175](trajectory.jsonl#L175) **search result**

```json
[{"paragraphId":"p0024","sectionRef":"§ 6.2 If Customer rejects a Deliverable, Vendor shall promptly correct the nonconformities at no additional charge and resubmit it for a new acceptance period. After two unsuccessful correction cycles, Customer may terminate the affected Order Form and receive a refund of Fees paid for the rejected Deliverable and dependent Services Customer cannot reasonably…
```

- [seq 194](trajectory.jsonl#L194) **drafter → lookup_precedent**

```json
{"ruleId":"T4C","context":"No customer termination for convenience in 3-year MSA; insert 9.4 with 30 days notice and pro-rata refund per 10.2"}
```

- [seq 195](trajectory.jsonl#L195) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 196](trajectory.jsonl#L196) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0040","p0041","p0044","p0035"]}
```

- [seq 197](trajectory.jsonl#L197) **read_paragraphs result**

```json
[{"id":"p0040","sectionRef":"§ 9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.","text":"9.3 Customer may terminate an Order Form immediately …
```

- [seq 224](trajectory.jsonl#L224) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Insert Customer termination for convenience on 30 days' notice with pro-rata refund of prepaid Fees (new § 9.4)","comment":"[Playbook] The Agreement runs for three years but gives us no right to exit without cause, so we have added a Customer-only termination for convenience on 30 days' notice with a pro-rata refund of prepaid Fees, consistent with Section 10.2. If Vendor needs more runway, we can discuss 60 days' notice, but we cannot accept a multi-year commitment with no convenience exit.","ops":[{"kind":"insert_after","paragraphId":"p0040","numbering":"9.4","text":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor, without penalty, early-termination charge, or other liability, in which case Vendor shall refund prepaid Fees covering the period after the effective date of termination in accordance with Section 10.2. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."}]}
```

- [seq 225](trajectory.jsonl#L225) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0040","segments":[{"type":"equal","text":"9.3 Customer may terminate an Order Form immediately if Vendor suffers a material Security Incident, repeatedly misses a critical service level, violates Applicable Law in performing the Services, or infringes a third party's intellectual property and cannot provide the remedies required by Section 20.5.…
```

- [seq 244](trajectory.jsonl#L244) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0034","p0035","p0038","p0039","p0040","p0041"],"quote":"This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms.","rationale":"Section 9 provides only for-cause triggers (material breach in 9.1, insolvency in 9.2, Vendor security/service/legal/IP failures in 9.3), and Sections 8.2 (180 days' non-renewal notice) and 27.3 (force-majeure exit) do not give a convenience right. No provision anywhere lets Customer terminate without cause during the three-year term, which is walk-away territory under the rule (no Customer convenience right in a multi-year term). Vendor likewise has no convenience right, so only the Customer-side gap needs fixing; we propose the preferred position — 30 days' notice with a pro-rata refund keyed to Section 10.2 — inserted as new Section 9.4 (the number is currently unused).</rationale>\n<parameter name=\"confidence\">0.86","proposal":{"level":"preferred","summary":"Insert Customer termination for convenience on 30 days' notice with pro-rata refund of prepaid Fees (new § 9.4)","comment":"[Playbook] The Agreement runs for three years but gives us no right to exit without cause, so we have added a Customer-only termination for convenience on 30 days' notice with a pro-rata refund of prepaid Fees, consistent with Section 10.2. If Vendor needs more runway, we can discuss 60 days' notice, but we cannot accept a multi-year commitment with no convenience exit.","ops":[{"kind":"insert_after","paragraphId":"p0040","numbering":"9.4","text":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor, without penalty, early-termination charge, or other liability, in which case Vendor shall refund prepaid Fees covering the period after the effective date of termination in accordance with Section 10.2. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."}]}}
```

- [seq 245](trajectory.jsonl#L245) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 273](trajectory.jsonl#L273) **drafter → submit_finding**

```json
{"status":"missing","paragraphIds":["p0034","p0035","p0038","p0039","p0040","p0041"],"quote":"This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms.","rationale":"Section 9 provides only for-cause triggers (material breach in 9.1, insolvency in 9.2, Vendor security/service/legal/IP failures in 9.3), and Sections 8.2 (180 days' non-renewal notice) and 27.3 (force-majeure exit) do not give a convenience right. No provision anywhere lets Customer terminate without cause during the three-year term, which is walk-away territory under the rule (no Customer convenience right in a multi-year term). Vendor likewise has no convenience right, so only the Customer-side gap needs fixing; we propose the preferred position — 30 days' notice with a pro-rata refund keyed to Section 10.2 — inserted as new Section 9.4 (the number is currently unused).","confidence":0.86,"proposal":{"level":"preferred","summary":"Insert Customer termination for convenience on 30 days' notice with pro-rata refund of prepaid Fees (new § 9.4)","comment":"[Playbook] The Agreement runs for three years but gives us no right to exit without cause, so we have added a Customer-only termination for convenience on 30 days' notice with a pro-rata refund of prepaid Fees, consistent with Section 10.2. If Vendor needs more runway, we can discuss 60 days' notice, but we cannot accept a multi-year commitment with no convenience exit.","ops":[{"kind":"insert_after","paragraphId":"p0040","numbering":"9.4","text":"9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor, without penalty, early-termination charge, or other liability, in which case Vendor shall refund prepaid Fees covering the period after the effective date of termination in accordance with Section 10.2. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."}]}}
```

- [seq 274](trajectory.jsonl#L274) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 273](trajectory.jsonl#L273)
- Finding: `f-t4c-74f2f5df` · **missing** · confidence 0.86
- Location: § 9.3 Customer may terminate an Order Form immediately if Vendor…
- Quote: “This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms.”
- Rationale: Section 9 provides only for-cause triggers (material breach in 9.1, insolvency in 9.2, Vendor security/service/legal/IP failures in 9.3), and Sections 8.2 (180 days' non-renewal notice) and 27.3 (force-majeure exit) do not give a convenience right. No provision anywhere lets Customer terminate without cause during the three-year term, which is walk-away territory under the rule (no Customer convenience right in a multi-year term). Vendor likewise has no convenience right, so only the Customer-side gap needs fixing; we propose the preferred position — 30 days' notice with a pro-rata refund keyed to Section 10.2 — inserted as new Section 9.4 (the number is currently unused).
- Proposal: **preferred** — Insert Customer termination for convenience on 30 days' notice with pro-rata refund of prepaid Fees (new § 9.4)
- Comment: [Playbook] The Agreement runs for three years but gives us no right to exit without cause, so we have added a Customer-only termination for convenience on 30 days' notice with a pro-rata refund of prepaid Fees, consistent with Section 10.2. If Vendor needs more runway, we can discuss 60 days' notice, but we cannot accept a multi-year commitment with no convenience exit.
- Proposed ops:

```json
[
  {
    "kind": "insert_after",
    "numbering": "9.4",
    "paragraphId": "p0040",
    "text": "9.4 Customer may terminate this Agreement or any Order Form for convenience, in whole or in part, upon thirty days' prior written notice to Vendor, without penalty, early-termination charge, or other liability, in which case Vendor shall refund prepaid Fees covering the period after the effective date of termination in accordance with Section 10.2. Vendor has no right to terminate this Agreement or an Order Form for convenience during a term."
  }
]
```

### Verifier and repair feedback

- [seq 327](trajectory.jsonl#L327) **Verdict: pass** — All four atomic elements of the preferred position are satisfied by the single inserted Section 9.4: Customer-only convenience right, thirty days' written notice, refund of prepaid Fees for the post-termination period (pro-rata in substance), and an express bar on Vendor convenience termination during a term. The fallback bargain is not (and need not be) met; its terms are less favourable to Customer and the locked target is preferred. Minimality holds: the rule expected a clause that was wholly absent, and the fix is one concise new subsection numbered 9.4 inserted in sequence, with no rewrite of Sections 8.1–8.2, 9.1–9.3 or 9.5. The qualifiers "in whole or in part" and "without penalty, early-termination charge, or other liability" are integral to expressing a pro-rata, fee-free convenience exit rather than surplus boilerplate. Intent preserved: renewal notice in 8.2, cause, insolvency and Customer-specific termination triggers, and the cumulative-remedies sentence all remain effective; no defined term is disturbed. The only residual point is the cross-reference to "Section 10.2", which is not in the supplied excerpt — confirm it is the refund/credit mechanic so the reference is not dangling. Margin comment is on-tone, cites the position and offers the 60-day fallback; it is non-operative and was not credited. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: Customer convenience termination present","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## RENEWAL — Auto-renewal and non-renewal notice window

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 125](trajectory.jsonl#L125)

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

- [seq 141](trajectory.jsonl#L141) **drafter → read_section**

```json
{"sectionId":"sec-8.2"}
```

- [seq 142](trajectory.jsonl#L142) **read_section result**

```json
{"sectionRef":"§ 8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.","paragraphs":[{"id":"p0035","text":"8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice."}]}
```

- [seq 143](trajectory.jsonl#L143) **drafter → read_section**

```json
{"sectionId":"sec-8.3"}
```

- [seq 144](trajectory.jsonl#L144) **read_section result**

```json
{"sectionRef":"§ 8.3 On renewal, Vendor may increase recurring Fees only by the lesser of the increase in the United States Consumer Price Index for All Urban Consumers during the preceding twelve months and three percent. Vendor must give at least ninety days' written notice of an increase. No increase applies to prepaid periods.","paragraphs":[{"id":"p0036","text":"8.3 On renewal, Vendor may in…
```

- [seq 166](trajectory.jsonl#L166) **drafter → read_section**

```json
{"sectionId":"sec-8.1"}
```

- [seq 167](trajectory.jsonl#L167) **read_section result**

```json
{"sectionRef":"§ 8.1 This Agreement begins on the Effective Date and continues for three years unless earlier terminated in accordance with its terms. Expiration of this Agreement does not itself terminate an Order Form then in effect; this Agreement continues to govern that Order Form until the Order Form expires or is terminated.","paragraphs":[{"id":"p0034","text":"8.1 This Agreement begins on…
```

- [seq 168](trajectory.jsonl#L168) **drafter → lookup_precedent**

```json
{"ruleId":"RENEWAL","context":"auto-renewal 12 months, 180-day non-renewal notice window, shorten to 30 days"}
```

- [seq 169](trajectory.jsonl#L169) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 190](trajectory.jsonl#L190) **drafter → propose_redline**

```json
{"ops":[{"kind":"replace","paragraphId":"p0035","oldText":"unless either Party gives one hundred eighty days' advance written notice.","newText":"unless either Party gives thirty days' advance written notice prior to the end of the then-current term. Vendor will notify Customer of the upcoming renewal at least sixty days before the renewal date."}],"comment":"[Playbook] We have shortened the non-renewal notice window from 180 days to 30 days and added a 60-day renewal reminder, consistent with our position that renewals must be easy to exit; a window beyond 90 days is not something we can accept. If helpful, we can live with 60 days' notice as a fallback.","level":"preferred","summary":"Shorten non-renewal notice to 30 days and add Vendor renewal reminder."}
```

- [seq 191](trajectory.jsonl#L191) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0035","segments":[{"type":"equal","text":"8.2 Each Order Form renews for twelve months unless either Party gives "},{"type":"delete","text":"one hundred eighty "},{"type":"insert","text":"thirty "},{"type":"equal","text":"days' advance written notice"},{"type":"delete","text":"."},{"type":"insert","text":" prior to the end of the then-current te…
```

- [seq 216](trajectory.jsonl#L216) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0035"],"quote":"8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.","rationale":"Order Forms auto-renew for twelve months (acceptable term length) and § 8.3 already caps uplift at the lesser of CPI and 3% with 90 days' notice, which meets our preferred pricing position and is not flagged. However, the non-renewal notice window is 180 days, well beyond the 60-day fallback and past the 90-day walk-away threshold, so exit is impractical. Redline shortens the window to 30 days and adds a 60-day Vendor renewal reminder to reach the preferred position; 60 days remains an acceptable fallback.","confidence":0.93,"proposal":{"ops":[{"kind":"replace","paragraphId":"p0035","oldText":"unless either Party gives one hundred eighty days' advance written notice.","newText":"unless either Party gives thirty days' advance written notice prior to the end of the then-current term. Vendor will notify Customer of the upcoming renewal at least sixty days before the renewal date."}],"comment":"[Playbook] We have shortened the non-renewal notice window from 180 days to 30 days and added a 60-day renewal reminder, consistent with our position that renewals must be easy to exit; a window beyond 90 days is not something we can accept. If helpful, we can live with 60 days' notice as a fallback.","level":"preferred","summary":"Shorten non-renewal notice to 30 days and add Vendor renewal reminder."}}
```

- [seq 217](trajectory.jsonl#L217) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 216](trajectory.jsonl#L216)
- Finding: `f-renewal-1a3830ee` · **deviation** · confidence 0.93
- Location: § 8.2 Each Order Form renews for twelve months unless either Part…
- Quote: “8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.”
- Rationale: Order Forms auto-renew for twelve months (acceptable term length) and § 8.3 already caps uplift at the lesser of CPI and 3% with 90 days' notice, which meets our preferred pricing position and is not flagged. However, the non-renewal notice window is 180 days, well beyond the 60-day fallback and past the 90-day walk-away threshold, so exit is impractical. Redline shortens the window to 30 days and adds a 60-day Vendor renewal reminder to reach the preferred position; 60 days remains an acceptable fallback.
- Proposal: **preferred** — Cut non-renewal notice to 30 days and add a 60-day Vendor renewal reminder.
- Comment: [Playbook] We have shortened the non-renewal notice window from 180 days to 30 days and added a 60-day Vendor renewal reminder, so renewals stay easy to exit; the existing § 8.3 cap at the lesser of CPI and 3% already meets our pricing position. We can live with 60 days' notice if that is easier.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "unless either Party gives 30 days' advance written notice.",
    "oldText": "unless either Party gives one hundred eighty days' advance written notice.",
    "paragraphId": "p0035"
  },
  {
    "kind": "insert_after",
    "numbering": "8.2A",
    "paragraphId": "p0035",
    "text": "Vendor will notify Customer of the upcoming renewal at least 60 days before the renewal date."
  }
]
```

### Verifier and repair feedback

- [seq 259](trajectory.jsonl#L259) **Verdict: fail** — official check: non-renewal notice window ≤ 60 days: number not found by the official literal pattern official minimality gate: Operation 1 expands 11 words to 33 words (ratio 3.00 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.771 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters Locked target is preferred, but the preferred automatic-renewal branch bundles a price cap at the lesser of CPI and 3%, and no such cap was inserted; the preferred level is therefore incomplete. The edit does land on the fallback on its material terms: a 30-day non-renewal window (≤60 days) with automatic renewal and no uncapped escalation mechanic. Minimality fails: the operation rewrites 11 words into 33 (ratio 3.00) and changes 77% of the characters. The window change needed only replacing "one hundred eighty" with "thirty"; the reminder should have been a separate concise insertion. "prior to the end of the then-current term" is surplus to completing the preferred/fallback element — the original notice mechanic already ran to the renewal — and inflates the edit. Intent is preserved: mutual notice rights, the twelve-month renewal term, and the Order Form structure remain effective, and no undefined term or dangling mechanic is introduced. To reach the locked preferred level, add a short cap such as "Fees may increase on renewal by no more than the lesser of CPI and 3%." while trimming the notice edit to the single number. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: non-renewal notice window ≤ 60 days","ok":false,"detail":"number not found by the official literal pattern"}; {"name":"precision position: preferred automatic renewal includes the lesser-of-CPI-and-3% price cap","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 11 words to 33 words (ratio 3.00 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.771 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 260](trajectory.jsonl#L260) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nUnmet prose-derived preferred elements (repair these exact requirements):\n- Renewal price increases capped at the lesser of CPI and 3%\n Verdict: not_met. Evidence: No price language in the redline: clause ends at \"...sixty days before the renewal date.\" with no CPI/3% cap\n\nDeterministic official failures:\n- official check: non-renewal notice window ≤ 60 days: number not found by the official literal pattern\n- official minimality gate: Operation 1 expands 11 words to 33 words (ratio 3.00 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.771 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- prior to the end of the then-current term\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- Locked target is preferred, but the preferred automatic-renewal branch bundles a price cap at the lesser of CPI and 3%, and no such cap was inserted; the preferred level is therefore incomplete.\n- The edit does land on the fallback on its material terms: a 30-day non-renewal window (≤60 days) with automatic renewal and no uncapped escalation mechanic.\n- Minimality fails: the operation rewrites 11 words into 33 (ratio 3.00) and changes 77% of the characters. The window change needed only replacing \"one hundred eighty\" with \"thirty\"; the reminder should have been a separate concise insertion.\n- \"prior to the end of the then-current term\" is surplus to completing the preferred/fallback element — the original notice mechanic already ran to the renewal — and inflates the edit.\n- Intent is preserved: mutual notice rights, the twelve-month renewal term, and the Order Form structure remain effective, and no undefined term or dangling mechanic is introduced.\n- To reach the locked preferred level, add a short cap such as \"Fees may increase on renewal by no more than the lesser of CPI and 3%.\" while trimming the notice edit to the single number."
- [seq 331](trajectory.jsonl#L331) **Verdict: repaired** — The notice window edit is a pure numeric substitution (180 → 30 days), the minimum change needed to reach the preferred opt-out standard. The inserted reminder sentence is a concise addition supplying the only absent preferred element (60-day Vendor renewal reminder) and introduces no new exception or undefined term. The pre-existing § 8.3 cap at the lesser of CPI and 3% was correctly left untouched, so the preferred pricing element is satisfied without duplication. All unrelated terms (90 days' notice of increase, no increase on prepaid periods) remain effective; no dangling mechanic is created. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: non-renewal notice window ≤ 60 days","ok":true,"detail":"value=30"}; {"name":"precision position: preferred automatic renewal includes the lesser-of-CPI-and-3% price cap","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## GOVLAW — Governing law and venue

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 158](trajectory.jsonl#L158)

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

- [seq 180](trajectory.jsonl#L180) **drafter → read_section**

```json
{"sectionId":"sec-28"}
```

- [seq 181](trajectory.jsonl#L181) **read_section result**

```json
{"sectionRef":"§ 28 GOVERNING LAW AND DISPUTE RESOLUTION","paragraphs":[{"id":"p0113","text":"28. GOVERNING LAW AND DISPUTE RESOLUTION"}]}
```

- [seq 182](trajectory.jsonl#L182) **drafter → search**

```json
{"query":"arbitration"}
```

- [seq 183](trajectory.jsonl#L183) **search result**

```json
[]
```

- [seq 206](trajectory.jsonl#L206) **drafter → read_section**

```json
{"sectionId":"sec-28.1"}
```

- [seq 207](trajectory.jsonl#L207) **read_section result**

```json
{"sectionRef":"§ 28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.","paragraphs":[{"id":"p0114","text":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New Yo…
```

- [seq 208](trajectory.jsonl#L208) **drafter → read_section**

```json
{"sectionId":"sec-28.2"}
```

- [seq 209](trajectory.jsonl#L209) **read_section result**

```json
{"sectionRef":"§ 28.2 The state and federal courts located in New York County, New York have exclusive jurisdiction, and each Party irrevocably submits to personal jurisdiction and waives any objection based on venue or inconvenient forum. Nothing prevents a Party from seeking temporary injunctive relief in another court with jurisdiction to protect confidential information or intellectual proper…
```

- [seq 210](trajectory.jsonl#L210) **drafter → read_section**

```json
{"sectionId":"sec-28.3"}
```

- [seq 211](trajectory.jsonl#L211) **read_section result**

```json
{"sectionRef":"§ 28.3 Before filing an ordinary commercial claim, a Party shall give notice and permit executives with settlement authority to meet in good faith within fifteen business days. This process does not delay urgent relief or a filing needed to preserve a limitations period. Discussions are compromise negotiations to the extent allowed by law.","paragraphs":[{"id":"p0116","text":"28.3 …
```

- [seq 228](trajectory.jsonl#L228) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0114","p0115","p0116"],"quote":"28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.","rationale":"Section 28.1 selects New York law (with CISG excluded) and 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, with each Party submitting to personal jurisdiction and waiving venue/forum objections. That matches our preferred position exactly. No arbitration provision exists anywhere in the document, so there is no foreign seat concern. The carve-out permitting temporary injunctive relief elsewhere and the 28.3 executive escalation (which expressly does not delay urgent relief or limitations-period filings) are mutual and do not displace the New York courts. Compliant at the preferred position; no redline.","confidence":0.95}
```

- [seq 229](trajectory.jsonl#L229) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 228](trajectory.jsonl#L228)
- Finding: `f-govlaw-26d881b7` · **compliant** · confidence 0.95
- Location: § 28.1 This Agreement and each dispute arising from it are governe…
- Quote: “28.1 This Agreement and each dispute arising from it are governed by the laws of the State of New York, without regard to conflict-of-law principles.”
- Rationale: Section 28.1 selects New York law (with CISG excluded) and 28.2 confers exclusive jurisdiction on the state and federal courts in New York County, with each Party submitting to personal jurisdiction and waiving venue/forum objections. That matches our preferred position exactly. No arbitration provision exists anywhere in the document, so there is no foreign seat concern. The carve-out permitting temporary injunctive relief elsewhere and the 28.3 executive escalation (which expressly does not delay urgent relief or limitations-period filings) are mutual and do not displace the New York courts. Compliant at the preferred position; no redline.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## ASSIGN — Assignment and change of control

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 222](trajectory.jsonl#L222)

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

- [seq 238](trajectory.jsonl#L238) **drafter → read_section**

```json
{"sectionId":"sec-24"}
```

- [seq 239](trajectory.jsonl#L239) **read_section result**

```json
{"sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","paragraphs":[{"id":"p0097","text":"24. ASSIGNMENT AND CHANGE OF CONTROL"}]}
```

- [seq 240](trajectory.jsonl#L240) **drafter → read_section**

```json
{"sectionId":"sec-13.3"}
```

- [seq 241](trajectory.jsonl#L241) **read_section result**

```json
{"sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","paragraphs":[{"id":"p0055","text":"13.3 Customer may transfer its l…
```

- [seq 263](trajectory.jsonl#L263) **drafter → read_section**

```json
{"sectionId":"sec-24.1"}
```

- [seq 264](trajectory.jsonl#L264) **read_section result**

```json
{"sectionRef":"§ 24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates. Customer shall give prompt written notice, and the assignee shall assume the applicable obligations.","paragraphs":[{"id":"p0098","text":…
```

- [seq 265](trajectory.jsonl#L265) **drafter → read_section**

```json
{"sectionId":"sec-24.2"}
```

- [seq 266](trajectory.jsonl#L266) **read_section result**

```json
{"sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and financial standing. Vendor may never assign to a direct Customer competitor without Customer's consent.","paragraphs":[{"id":"p0099","text":"24.2 Vendor …
```

- [seq 267](trajectory.jsonl#L267) **drafter → read_section**

```json
{"sectionId":"sec-24.3"}
```

- [seq 268](trajectory.jsonl#L268) **read_section result**

```json
{"sectionRef":"§ 24.3 For other assignments, neither Party may assign without the other's prior written consent, not to be unreasonably withheld, conditioned, or delayed. A permitted assignment does not relieve accrued obligations. An attempted assignment contrary to this Section is void to the extent permitted by law.","paragraphs":[{"id":"p0100","text":"24.3 For other assignments, neither Party…
```

- [seq 269](trajectory.jsonl#L269) **drafter → read_section**

```json
{"sectionId":"sec-24.4"}
```

- [seq 270](trajectory.jsonl#L270) **read_section result**

```json
{"sectionRef":"§ 24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees, or reduce service. Vendor shall cooperate with reasonable administrative changes needed to reflect a permitted successor.","paragraphs":[{"id":"p0101","text":"24.4 Customer's change of control does not give Vendor a right to terminate, suspend, reprice, accelerate Fees,…
```

- [seq 297](trajectory.jsonl#L297) **drafter → search**

```json
{"query":"change of control"}
```

- [seq 298](trajectory.jsonl#L298) **search result**

```json
[{"paragraphId":"p0097","sectionRef":"§ 24 ASSIGNMENT AND CHANGE OF CONTROL","snippet":"24. ASSIGNMENT AND CHANGE OF CONTROL"},{"paragraphId":"p0099","sectionRef":"§ 24.2 Vendor may not assign this Agreement, delegate material performance, or transfer it by change of control without Customer's prior written consent, not to be unreasonably withheld for an assignee with adequate capability and fina…
```

- [seq 299](trajectory.jsonl#L299) **drafter → search**

```json
{"query":"assign"}
```

- [seq 300](trajectory.jsonl#L300) **search result**

```json
[{"paragraphId":"p0039","sectionRef":"§ 9.2 Either Party may terminate immediately by written notice if the other becomes insolvent, makes a general assignment for creditors, enters liquidation, or becomes subject to a bankruptcy proceeding not dismissed within sixty days. A lawful reorganization that does not impair performance is not, by itself, grounds for termination.","snippet":"…e immediate…
```

- [seq 335](trajectory.jsonl#L335) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0098","p0099","p0100","p0101","p0055"],"quote":"24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.","rationale":"Section 24 meets our preferred position on every material term. 24.1 gives Customer a consent-free affiliate/successor (M&A and asset-sale) carve-out, subject only to prompt notice and assignee assumption. 24.2 restricts Vendor assignment, delegation of material performance and change-of-control transfers to Customer's prior written consent (not unreasonably withheld for a capable, financially sound assignee) and bars assignment to a direct Customer competitor. 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on Customer's change of control. 24.3's catch-all is expressly limited to \"other assignments\" and so does not undercut the 24.1 carve-out, and 13.3 carries the licence rights across a permitted assignment. No Vendor exit or re-pricing trigger appears elsewhere in the document (9.2 is an ordinary insolvency clause that expressly excludes lawful reorganizations). No redline needed.","confidence":0.95}
```

- [seq 336](trajectory.jsonl#L336) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 335](trajectory.jsonl#L335)
- Finding: `f-assign-506eac42` · **compliant** · confidence 0.95
- Location: § 24.1 Customer may assign this Agreement or an Order Form without…
- Quote: “24.1 Customer may assign this Agreement or an Order Form without Vendor's consent to an Affiliate or to a successor in a merger, reorganization, acquisition, or sale of all or substantially all assets or business to which the Agreement relates.”
- Rationale: Section 24 meets our preferred position on every material term. 24.1 gives Customer a consent-free affiliate/successor (M&A and asset-sale) carve-out, subject only to prompt notice and assignee assumption. 24.2 restricts Vendor assignment, delegation of material performance and change-of-control transfers to Customer's prior written consent (not unreasonably withheld for a capable, financially sound assignee) and bars assignment to a direct Customer competitor. 24.4 expressly denies Vendor any right to terminate, suspend, reprice, accelerate Fees or reduce service on Customer's change of control. 24.3's catch-all is expressly limited to "other assignments" and so does not undercut the 24.1 carve-out, and 13.3 carries the licence rights across a permitted assignment. No Vendor exit or re-pricing trigger appears elsewhere in the document (9.2 is an ordinary insolvency clause that expressly excludes lawful reorganizations). No redline needed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## IP — Ownership of deliverables and Customer Data

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 249](trajectory.jsonl#L249)

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

- [seq 283](trajectory.jsonl#L283) **drafter → read_section**

```json
{"sectionId":"sec-14"}
```

- [seq 284](trajectory.jsonl#L284) **read_section result**

```json
{"sectionRef":"§ 14 INTELLECTUAL PROPERTY AND DELIVERABLES","paragraphs":[{"id":"p0057","text":"14. INTELLECTUAL PROPERTY AND DELIVERABLES"}]}
```

- [seq 285](trajectory.jsonl#L285) **drafter → list_sections**

```json
{}
```

- [seq 286](trajectory.jsonl#L286) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 311](trajectory.jsonl#L311) **drafter → read_section**

```json
{"sectionId":"sec-14.2"}
```

- [seq 312](trajectory.jsonl#L312) **read_section result**

```json
{"sectionRef":"§ 14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","paragraphs":[…
```

- [seq 313](trajectory.jsonl#L313) **drafter → search**

```json
{"query":"assigns to Vendor"}
```

- [seq 314](trajectory.jsonl#L314) **search result**

```json
[]
```

- [seq 315](trajectory.jsonl#L315) **drafter → search**

```json
{"query":"jointly owned"}
```

- [seq 316](trajectory.jsonl#L316) **search result**

```json
[{"paragraphId":"p0061","sectionRef":"§ 14.4 No jointly owned intellectual property is created unless the Parties sign a separate instrument identifying it and their exploitation rights. Feedback is voluntary; Vendor may use generalized suggestions without identifying Customer or disclosing Customer Confidential Information, and Customer retains the unrestricted right to use its own feedback.","s…
```

- [seq 343](trajectory.jsonl#L343) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0058","p0060","p0061"]}
```

- [seq 344](trajectory.jsonl#L344) **read_paragraphs result**

```json
[{"id":"p0058","sectionRef":"§ 14.1 As between the Parties, Customer owns all Customer Data, Customer Confidential Information, Customer-provided material, and intellectual property Customer owned or developed independently of the Services. No right transfers to Vendor except the limited right to process that material solely to provide, secure, support, and improve the Services for Customer.","te…
```

- [seq 345](trajectory.jsonl#L345) **drafter → search**

```json
{"query":"Vendor owns"}
```

- [seq 346](trajectory.jsonl#L346) **search result**

```json
[]
```

- [seq 370](trajectory.jsonl#L370) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0058","p0059","p0060","p0061"],"quote":"14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.","rationale":"Section 14 meets our preferred position in full. 14.1 confirms Customer owns Customer Data, Customer Confidential Information and Customer pre-existing IP, with no transfer to Vendor beyond a limited processing right (reinforced by 15.1's no-sale/no-model-training restriction). 14.2 vests ownership of Deliverables in Customer on creation with a present assignment from Vendor and personnel-level assignments. 14.3 leaves Vendor Technology with Vendor (acceptable) but applies the Section 13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to any Vendor Technology embedded in or required to use a Deliverable, including modification and contractor support. 14.4 excludes joint ownership absent a signed instrument and preserves Customer's unrestricted rights in its own feedback. No walk-away triggers (no assignment of Customer IP/Data, no joint ownership, no vendor-owned deliverables without licence back). Minor note only, not a deviation: the 13.2 licence lists contractor support rather than an express sublicensing right, which is immaterial given Customer owns the Deliverables outright.","confidence":0.93}
```

- [seq 371](trajectory.jsonl#L371) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 370](trajectory.jsonl#L370)
- Finding: `f-ip-9dea1dac` · **compliant** · confidence 0.93
- Location: § 14.1 As between the Parties, Customer owns all Customer Data, Cu…
- Quote: “14.2 Upon creation and subject to payment of the applicable Fees, Customer owns each Deliverable created specifically for Customer. Vendor hereby assigns to Customer all worldwide right, title, and interest in those Deliverables and shall obtain equivalent assignments from its personnel. Vendor will execute further documents reasonably needed to confirm ownership.”
- Rationale: Section 14 meets our preferred position in full. 14.1 confirms Customer owns Customer Data, Customer Confidential Information and Customer pre-existing IP, with no transfer to Vendor beyond a limited processing right (reinforced by 15.1's no-sale/no-model-training restriction). 14.2 vests ownership of Deliverables in Customer on creation with a present assignment from Vendor and personnel-level assignments. 14.3 leaves Vendor Technology with Vendor (acceptable) but applies the Section 13.2 perpetual, irrevocable, worldwide, royalty-free, fully paid licence to any Vendor Technology embedded in or required to use a Deliverable, including modification and contractor support. 14.4 excludes joint ownership absent a signed instrument and preserves Customer's unrestricted rights in its own feedback. No walk-away triggers (no assignment of Customer IP/Data, no joint ownership, no vendor-owned deliverables without licence back). Minor note only, not a deviation: the 13.2 licence lists contractor support rather than an express sublicensing right, which is immaterial given Customer owns the Deliverables outright.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## LICENSE — Licence grant scope

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 253](trajectory.jsonl#L253)

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

- [seq 277](trajectory.jsonl#L277) **drafter → read_section**

```json
{"sectionId":"sec-13"}
```

- [seq 278](trajectory.jsonl#L278) **read_section result**

```json
{"sectionRef":"§ 13 ACCESS RIGHTS AND LICENCE","paragraphs":[{"id":"p0052","text":"13. ACCESS RIGHTS AND LICENCE"}]}
```

- [seq 279](trajectory.jsonl#L279) **drafter → list_sections**

```json
{}
```

- [seq 280](trajectory.jsonl#L280) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 305](trajectory.jsonl#L305) **drafter → search**

```json
{"query":"suspend"}
```

- [seq 306](trajectory.jsonl#L306) **search result**

```json
[{"paragraphId":"p0055","sectionRef":"§ 13.3 Customer may transfer its licence rights to an Affiliate or successor in connection with an assignment permitted by Section 24. Vendor shall not revoke or suspend a licence except during a material uncured payment or use breach affecting the licensed item, after notice and a reasonable opportunity to cure.","snippet":"…nnection with an assignment permi…
```

- [seq 307](trajectory.jsonl#L307) **drafter → read_paragraphs**

```json
{"paragraphIds":["p0053","p0054","p0055","p0056"]}
```

- [seq 308](trajectory.jsonl#L308) **read_paragraphs result**

```json
[{"id":"p0053","sectionRef":"§ 13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer. Customer may permit Authorized Users to exercise thos…
```

- [seq 339](trajectory.jsonl#L339) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0053","p0054","p0055","p0056"],"quote":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.","rationale":"Section 13 satisfies the preferred position in full. 13.1 extends the subscription grant to our Affiliates and to contractors acting on their behalf (with Authorized User rights), without any \"revocable\" or \"non-transferable\" language. 13.2 gives a perpetual, irrevocable, royalty-free, fully paid licence to Customer and its Affiliates for paid-up software and embedded Vendor Technology, including contractor support rights, and 14.3 confirms that licence covers Vendor Technology needed to use a Deliverable. 13.3 permits transfer to an Affiliate or successor under the Section 24 assignment right (24.1 allows M&A assignment without consent; 24.4 bars Vendor termination/suspension on our change of control) and limits revocation or suspension to a material uncured payment or use breach after notice and a reasonable cure opportunity — so the licence is not revocable at will. 13.4's use restrictions are ordinary (reverse engineering, interference, security bypass, unlawful use), are qualified by \"knowingly\" and by Applicable Law, and expressly do not limit authorized security testing or our use of Customer Data and output; they do not undermine the grant. No redline needed.</parationale>\n<parameter name=\"confidence\">0.9"}
```

- [seq 340](trajectory.jsonl#L340) **submit_finding result**

```json
{"ok":false,"error":"[\n {\n \"expected\": \"number\",\n \"code\": \"invalid_type\",\n \"path\": [\n \"confidence\"\n ],\n \"message\": \"Invalid input: expected number, received undefined\"\n }\n]"}
```

- [seq 374](trajectory.jsonl#L374) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0053","p0054","p0055","p0056"],"quote":"13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.","rationale":"Section 13 satisfies the preferred position in full. 13.1 extends the subscription grant to our Affiliates and to contractors acting on their behalf (plus Authorized Users), with no \"revocable\" or \"non-transferable\" language. 13.2 grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence for paid-up software and Vendor Technology embedded in Deliverables, including contractor support; 14.3 confirms that licence covers Vendor Technology required to use a Deliverable. 13.3 permits transfer to an Affiliate or successor under Section 24 (24.1 allows M&A/asset-sale assignment without consent; 24.4 bars Vendor from terminating or suspending on our change of control) and limits revocation or suspension to a material uncured payment or use breach after notice and a reasonable cure period, so the licence is not revocable at will. 13.4's use restrictions are ordinary and qualified (\"knowingly\", subject to Applicable Law, with carve-outs for authorized security testing and Customer Data/output) and do not cut back the grant. No redline needed.","confidence":0.9}
```

- [seq 375](trajectory.jsonl#L375) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 374](trajectory.jsonl#L374)
- Finding: `f-license-549eeb36` · **compliant** · confidence 0.90
- Location: § 13.1 Subject to payment of applicable Fees, Vendor grants Custom…
- Quote: “13.1 Subject to payment of applicable Fees, Vendor grants Customer, its Affiliates, and contractors acting on their behalf a worldwide, non-exclusive right during the subscription term to access and use the hosted Services and documentation for their internal business purposes and to provide services to Customer.”
- Rationale: Section 13 satisfies the preferred position in full. 13.1 extends the subscription grant to our Affiliates and to contractors acting on their behalf (plus Authorized Users), with no "revocable" or "non-transferable" language. 13.2 grants Customer and its Affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid licence for paid-up software and Vendor Technology embedded in Deliverables, including contractor support; 14.3 confirms that licence covers Vendor Technology required to use a Deliverable. 13.3 permits transfer to an Affiliate or successor under Section 24 (24.1 allows M&A/asset-sale assignment without consent; 24.4 bars Vendor from terminating or suspending on our change of control) and limits revocation or suspension to a material uncured payment or use breach after notice and a reasonable cure period, so the licence is not revocable at will. 13.4's use restrictions are ordinary and qualified ("knowingly", subject to Applicable Law, with carve-outs for authorized security testing and Customer Data/output) and do not cut back the grant. No redline needed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## AUDIT — Audit rights against Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 257](trajectory.jsonl#L257)

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

- [seq 289](trajectory.jsonl#L289) **drafter → read_section**

```json
{"sectionId":"sec-22"}
```

- [seq 290](trajectory.jsonl#L290) **read_section result**

```json
{"sectionRef":"§ 22 AUDIT RIGHTS","paragraphs":[{"id":"p0092","text":"22. AUDIT RIGHTS"}]}
```

- [seq 291](trajectory.jsonl#L291) **drafter → read_section**

```json
{"sectionId":"sec-23"}
```

- [seq 292](trajectory.jsonl#L292) **read_section result**

```json
{"sectionRef":"§ 23 RECORDS AND CUSTOMER ASSURANCE","paragraphs":[{"id":"p0096","text":"23. RECORDS AND CUSTOMER ASSURANCE"}]}
```

- [seq 319](trajectory.jsonl#L319) **drafter → read_section**

```json
{"sectionId":"sec-22.1"}
```

- [seq 320](trajectory.jsonl#L320) **read_section result**

```json
{"sectionRef":"§ 22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","paragraphs":[{"id":"p0093","text":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose."}]}
```

- [seq 321](trajectory.jsonl#L321) **drafter → read_section**

```json
{"sectionId":"sec-22.2"}
```

- [seq 322](trajectory.jsonl#L322) **read_section result**

```json
{"sectionRef":"§ 22.2 Vendor bears audit costs unless the audit establishes an underpayment exceeding five percent for the audited period, in which case Customer will pay reasonable audit costs and the undisputed shortfall. Vendor and its auditor may not access Customer systems directly, Customer Data unrelated to usage, privileged material, or another supplier's confidential information.","parag…
```

- [seq 323](trajectory.jsonl#L323) **drafter → read_section**

```json
{"sectionId":"sec-22.3"}
```

- [seq 324](trajectory.jsonl#L324) **read_section result**

```json
{"sectionRef":"§ 22.3 Audit findings are Customer Confidential Information and may be used only to enforce this Agreement. Vendor shall provide a copy of the final report. Payment of a shortfall resolves the audited quantity issue absent fraud or demonstrable error.","paragraphs":[{"id":"p0095","text":"22.3 Audit findings are Customer Confidential Information and may be used only to enforce this …
```

- [seq 349](trajectory.jsonl#L349) **drafter → search**

```json
{"query":"audit","limit":30}
```

- [seq 350](trajectory.jsonl#L350) **search result**

```json
[{"paragraphId":"p0092","sectionRef":"§ 22 AUDIT RIGHTS","snippet":"22. AUDIT RIGHTS"},{"paragraphId":"p0093","sectionRef":"§ 22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","snippet":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems …"},{"paragraphId":"p0094","s…
```

- [seq 351](trajectory.jsonl#L351) **drafter → list_sections**

```json
{}
```

- [seq 352](trajectory.jsonl#L352) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 378](trajectory.jsonl#L378) **drafter → lookup_precedent**

```json
{"ruleId":"AUDIT","context":"Vendor audit of Customer usage; frequency, notice, no system access"}
```

- [seq 379](trajectory.jsonl#L379) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 404](trajectory.jsonl#L404) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Limit Vendor audits to once per 12 months on 30 days' notice, during business hours, by an independent auditor, and remove remote system access.","comment":"[Playbook] We can accommodate usage verification, but our playbook requires audits to be no more than once every twelve months on 30 days' written notice, during business hours, by an independent auditor bound by confidentiality, and without access to our systems. We have also removed the remote-access right, which conflicts with Section 22.2's existing no-direct-access protection.","ops":[{"kind":"replace","paragraphId":"p0093","oldText":"Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","newText":"Vendor may audit Customer's use of the Services no more than once in any twelve-month period, on at least thirty days' prior written notice, during Customer's normal business hours and without unreasonably disrupting Customer's operations. Each audit shall be conducted by an independent auditor bound by written confidentiality obligations, and Vendor and its auditor shall have no remote or direct access to Customer's systems; Customer will instead provide relevant usage records."}]}
```

- [seq 405](trajectory.jsonl#L405) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0093","segments":[{"type":"equal","text":"22.1 Vendor may audit Customer"},{"type":"delete","text":" at any time without notice and may remotely access Customer's systems and records for that purpose"},{"type":"insert","text":"'s use of the Services no more than once in any twelve-month period, on at least thirty days' prior written notice, duri…
```

- [seq 430](trajectory.jsonl#L430) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0093","p0094"],"quote":"22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","rationale":"Section 22.1 grants unlimited, unannounced audits plus remote access to our systems — squarely within the rule's walk-away territory and failing the fallback on frequency, notice and system access. Sections 22.2 and 22.3 are protective (Vendor bears cost unless underpayment exceeds five percent, no direct system access, findings are our Confidential Information) and meet the preferred cost position, but they do not cure 22.1 and in fact conflict with its remote-access grant. We therefore redline 22.1 only, to once per twelve months on 30 days' written notice, during business hours, by an independent auditor bound by confidentiality, with no system access; cost allocation is left to 22.2.","confidence":0.93,"proposal":{"level":"preferred","summary":"Limit Vendor audits to once per 12 months on 30 days' notice, during business hours, by an independent auditor, and remove remote system access.","comment":"[Playbook] We can accommodate usage verification, but our playbook requires audits to be no more than once every twelve months on 30 days' written notice, during business hours, by an independent auditor bound by confidentiality, and without access to our systems. We have also removed the remote-access right, which conflicts with Section 22.2's existing no-direct-access protection.","ops":[{"kind":"replace","paragraphId":"p0093","oldText":"Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.","newText":"Vendor may audit Customer's use of the Services no more than once in any twelve-month period, on at least thirty days' prior written notice, during Customer's normal business hours and without unreasonably disrupting Customer's operations. Each audit shall be conducted by an independent auditor bound by written confidentiality obligations, and Vendor and its auditor shall have no remote or direct access to Customer's systems; Customer will instead provide relevant usage records."}]}}
```

- [seq 431](trajectory.jsonl#L431) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 430](trajectory.jsonl#L430)
- Finding: `f-audit-32443d92` · **deviation** · confidence 0.93
- Location: § 22.1 Vendor may audit Customer at any time without notice and ma…
- Quote: “22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.”
- Rationale: Section 22.1 grants unlimited, unannounced audits plus remote access to our systems — squarely within the rule's walk-away territory and failing the fallback on frequency, notice and system access. Sections 22.2 and 22.3 are protective (Vendor bears cost unless underpayment exceeds five percent, no direct system access, findings are our Confidential Information) and meet the preferred cost position, but they do not cure 22.1 and in fact conflict with its remote-access grant. We therefore redline 22.1 only, to once per twelve months on 30 days' written notice, during business hours, by an independent auditor bound by confidentiality, with no system access; cost allocation is left to 22.2.
- Proposal: **preferred** — Limit Vendor audits to once per 12 months on 30 days' written notice, remove remote system access, and require a business-hours, off-site audit by an independent auditor bound by confidentiality.
- Comment: [Playbook] We have changed 22.1 so audits occur no more than once per 12 months on 30 days' written notice and so the remote-access grant becomes a prohibition consistent with 22.2, and added one sentence requiring audits during business hours, off-site where possible, by an independent auditor bound by confidentiality. Our fallback is one audit per year on 15 days' notice with Vendor bearing cost unless underpayment exceeds 10%.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Vendor may audit Customer no more than once per 12 months on 30 days' written notice, and may not remotely access Customer's systems and records for that purpose.",
    "oldText": "Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.",
    "paragraphId": "p0093"
  },
  {
    "kind": "insert_after",
    "paragraphId": "p0093",
    "text": "Each audit shall be conducted during business hours, off-site where possible, and by an independent auditor bound by confidentiality obligations."
  }
]
```

### Verifier and repair feedback

- [seq 482](trajectory.jsonl#L482) **Verdict: fail** — official minimality gate: Operation 1 expands 20 words to 71 words (ratio 3.55 > 1.50); use a tighter edit or a separate insertion official minimality gate: Operation 1 changed-character ratio 0.812 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters All seven atomic preferred elements are satisfied: frequency cap, 30 days' written notice, business hours, independent auditor, written confidentiality, Vendor-cost-unless-5% underpayment (untouched 22.2), and no direct/remote system access. Minimality fails: the rewrite adds a non-disruption covenant and a new Customer obligation to provide usage records, neither of which the preferred position requires; the scope narrowing to "use of the Services" is also beyond the needed edit. Deterministic gates confirm the excess: 20 words expanded to 71 (ratio 3.55) and changed-character ratio 0.812, indicating a whole-clause rewrite where a tighter edit striking "at any time without notice" and the remote-access right plus inserting the frequency/notice/auditor conditions would suffice. Intent preserved: 22.2's cost allocation and access carve-outs remain effective, no undefined terms or contradictions introduced, and the removal of the remote-access right is consistent with 22.2 rather than duplicative in substance. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official check: audit frequency limited","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 expands 20 words to 71 words (ratio 3.55 > 1.50); use a tighter edit or a separate insertion"}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 changed-character ratio 0.812 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters"}.
- [seq 483](trajectory.jsonl#L483) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 expands 20 words to 71 words (ratio 3.55 > 1.50); use a tighter edit or a separate insertion\n- official minimality gate: Operation 1 changed-character ratio 0.812 exceeds the official 0.600 limit; anchor a larger unchanged surrounding span or change fewer operative characters\n\nOffending extra words to remove verbatim:\n- and without unreasonably disrupting Customer's operations\n- ; Customer will instead provide relevant usage records\n- Customer's use of the Services\n\nMinimality failed: remove every word or operation not needed for the complete locked level; do not rewrite an untouched sentence.\n\nVerifier reasons:\n- All seven atomic preferred elements are satisfied: frequency cap, 30 days' written notice, business hours, independent auditor, written confidentiality, Vendor-cost-unless-5% underpayment (untouched 22.2), and no direct/remote system access.\n- Minimality fails: the rewrite adds a non-disruption covenant and a new Customer obligation to provide usage records, neither of which the preferred position requires; the scope narrowing to \"use of the Services\" is also beyond the needed edit.\n- Deterministic gates confirm the excess: 20 words expanded to 71 (ratio 3.55) and changed-character ratio 0.812, indicating a whole-clause rewrite where a tighter edit striking \"at any time without notice\" and the remote-access right plus inserting the frequency/notice/auditor conditions would suffice.\n- Intent preserved: 22.2's cost allocation and access carve-outs remain effective, no undefined terms or contradictions introduced, and the removal of the remote-access right is consistent with 22.2 rather than duplicative in substance."
- [seq 502](trajectory.jsonl#L502) **Verdict: fail** — All six preferred atomic elements are present: 12-month frequency cap, 30 days' written notice, business hours, independent confidentiality-bound auditor, Vendor-borne cost subject to the 5% underpayment trigger, and an express prohibition on direct/remote system access. The pre-existing cost-allocation and access-carve-out language in 22.2 was left untouched, so unrelated commercial terms and the 5% threshold remain effective; converting the remote-access grant into a prohibition removes the contradiction with 22.2. Minimality fails only narrowly: "off-site where possible" adds a location restriction that the preferred position does not require and that duplicates the no-direct-access protection already secured in 22.1 and 22.2. Deleting that phrase would make the edit fully minimal. No undefined terms or dangling mechanics are introduced; the inserted sentence uses defined parties and existing concepts. Checks: {"name":"operation 1 applies","ok":true}; {"name":"operation 2 applies","ok":true}; {"name":"official check: audit frequency limited","ok":true}; {"name":"official minimality gate","ok":true}.

### Human checkpoint and applied ops

No human decision was recorded.

## LD — Liquidated damages and penalties payable by Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 329](trajectory.jsonl#L329)

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

- [seq 355](trajectory.jsonl#L355) **drafter → read_section**

```json
{"sectionId":"sec-7.6"}
```

- [seq 356](trajectory.jsonl#L356) **read_section result**

```json
{"sectionRef":"§ 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","paragraphs":[{"id":"p0032","text":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency."}]}
```

- [seq 357](trajectory.jsonl#L357) **drafter → read_section**

```json
{"sectionId":"sec-7.3"}
```

- [seq 358](trajectory.jsonl#L358) **read_section result**

```json
{"sectionRef":"§ 7.3 Customer may withhold a genuinely disputed amount by notifying Vendor before its due date and explaining the basis. The Parties will work promptly and in good faith to resolve the dispute. Vendor shall continue the Services while a payment dispute is pending and shall not charge interest on an amount ultimately found not due.","paragraphs":[{"id":"p0029","text":"7.3 Customer …
```

- [seq 382](trajectory.jsonl#L382) **drafter → read_section**

```json
{"sectionId":"sec-21.1"}
```

- [seq 383](trajectory.jsonl#L383) **read_section result**

```json
{"sectionRef":"§ 21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of the Fees paid or payable by Customer during the twelve months preceding the event giving rise to the claim and USD 1,000,000. The cap is mutual and applies regardless of the form of action or number of claims.","paragraphs":[{"id":"p…
```

- [seq 384](trajectory.jsonl#L384) **drafter → search**

```json
{"query":"liquidated damages"}
```

- [seq 385](trajectory.jsonl#L385) **search result**

```json
[{"paragraphId":"p0032","sectionRef":"§ 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","snippet":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency."}]
```

- [seq 386](trajectory.jsonl#L386) **drafter → search**

```json
{"query":"termination fee"}
```

- [seq 387](trajectory.jsonl#L387) **search result**

```json
[]
```

- [seq 414](trajectory.jsonl#L414) **drafter → get_definition**

```json
{"term":"Excluded Claims"}
```

- [seq 415](trajectory.jsonl#L415) **get_definition result**

```json
{"found":true,"term":"Excluded Claims","paragraphId":"p0090","text":"21.3 “Excluded Claims” means a Party's breach of confidentiality, data-protection, or security obligations; its indemnification obligations; gross negligence, wilful misconduct, or fraud; or infringement or misappropriation of the other Party's intellectual property. Customer's obligation to pay undisputed Fees for conforming Se…
```

- [seq 416](trajectory.jsonl#L416) **drafter → search**

```json
{"query":"penalty"}
```

- [seq 417](trajectory.jsonl#L417) **search result**

```json
[{"paragraphId":"p0112","sectionRef":"§ 27.3 If a force-majeure event materially prevents an affected Service for more than fifteen consecutive days, Customer may procure substitute services and suspend affected Fees. After thirty consecutive days, Customer may terminate the affected Order Form without penalty and receive a refund of prepaid Fees for the unavailable period.","snippet":"…thirty co…
```

- [seq 418](trajectory.jsonl#L418) **drafter → lookup_precedent**

```json
{"ruleId":"LD","context":"Customer-payable liquidated damages of USD 25,000/day for dependency delay"}
```

- [seq 419](trajectory.jsonl#L419) **lookup_precedent result**

```json
{"precedents":[]}
```

- [seq 446](trajectory.jsonl#L446) **drafter → propose_redline**

```json
{"level":"preferred","summary":"Delete the USD 25,000/day liquidated damages payable by Customer for dependency delays","comment":"[Playbook] We have deleted the USD 25,000 per day liquidated damages against us: our playbook does not accept liquidated damages or penalties payable by the Customer, and this one is uncapped, applies to any delay however minor, and carries no notice or cure period. If Vendor needs protection for dependency delays, we can instead agree a day-for-day extension of affected timelines and relief from related Vendor service commitments.","ops":[{"kind":"delete_paragraph","paragraphId":"p0032"}]}
```

- [seq 447](trajectory.jsonl#L447) **propose_redline result** — **validation accepted**

```json
{"ok":true,"errors":[],"rendered":[{"paragraphId":"p0032","segments":[{"type":"delete","text":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency."}]}]}
```

- [seq 470](trajectory.jsonl#L470) **drafter → submit_finding**

```json
{"status":"deviation","paragraphIds":["p0032"],"quote":"7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.","rationale":"Section 7.6 imposes liquidated damages payable by us (Customer) to Vendor at USD 25,000 per day for \"any delay in providing a dependency\" — no materiality threshold, no notice or cure period, and no aggregate cap. This fails the preferred position (no Customer-payable liquidated damages or penalties) and also fails the fallback, which tolerates only an early-termination fee capped at 3 months' fees as the sole liquidated amount; this is a per-day penalty untethered to termination. It is close to walk-away territory because an accumulating daily amount triggered by minor delays can exceed remaining contract value, and the mutual cap in § 21.1 gives limited comfort (it is set at the greater of 12 months' Fees and USD 1,000,000, i.e. potentially well above annual spend, and the § 7.3 withholding right covers disputed Fees rather than damages claims). We propose deleting the clause, offering day-for-day schedule relief instead.","confidence":0.93,"proposal":{"level":"preferred","summary":"Delete the USD 25,000/day liquidated damages payable by Customer for dependency delays","comment":"[Playbook] We have deleted the USD 25,000 per day liquidated damages against us: our playbook does not accept liquidated damages or penalties payable by the Customer, and this one is uncapped, applies to any delay however minor, and carries no notice or cure period. If Vendor needs protection for dependency delays, we can instead agree a day-for-day extension of affected timelines and relief from related Vendor service commitments.","ops":[{"kind":"delete_paragraph","paragraphId":"p0032"}]}}
```

- [seq 471](trajectory.jsonl#L471) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 470](trajectory.jsonl#L470)
- Finding: `f-ld-e4497af0` · **deviation** · confidence 0.93
- Location: § 7.6 Customer shall pay Vendor USD 25,000 per day as agreed liqu…
- Quote: “7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.”
- Rationale: Section 7.6 imposes liquidated damages payable by us (Customer) to Vendor at USD 25,000 per day for "any delay in providing a dependency" — no materiality threshold, no notice or cure period, and no aggregate cap. This fails the preferred position (no Customer-payable liquidated damages or penalties) and also fails the fallback, which tolerates only an early-termination fee capped at 3 months' fees as the sole liquidated amount; this is a per-day penalty untethered to termination. It is close to walk-away territory because an accumulating daily amount triggered by minor delays can exceed remaining contract value, and the mutual cap in § 21.1 gives limited comfort (it is set at the greater of 12 months' Fees and USD 1,000,000, i.e. potentially well above annual spend, and the § 7.3 withholding right covers disputed Fees rather than damages claims). We propose deleting the clause, offering day-for-day schedule relief instead.
- Proposal: **preferred** — Turn 7.6 into a no-liquidated-damages-or-penalties-payable-by-Customer provision, removing the USD 25,000 per day charge
- Comment: [Playbook] We have flipped the operator in 7.6 so that no liquidated damages or penalties are payable by us for dependency delays, rather than USD 25,000 per day; our playbook does not accept liquidated damages or penalties payable by the Customer. If Vendor needs protection here, we can discuss a day-for-day extension of affected timelines instead.
- Proposed ops:

```json
[
  {
    "kind": "replace",
    "newText": "Customer shall not pay Vendor any liquidated damages or penalties for any delay in providing a dependency.",
    "oldText": "Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.",
    "paragraphId": "p0032"
  }
]
```

### Verifier and repair feedback

- [seq 494](trajectory.jsonl#L494) **Verdict: fail** — official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence The locked preferred level is fully achieved: the sole operative provision imposing liquidated damages on Customer (USD 25,000 per day for any dependency delay) is struck, leaving no liquidated damages or penalties payable by Customer. Fallback is not met and need not be: no early-termination fee, no 3-month cap, and no sole-liquidated-amount statement. Preferred and fallback are separate bargains, so this is not a defect at the locked target. Minimality: the deterministic gate objects to a whole-paragraph deletion, but paragraph 7.6 consists exclusively of the offending liquidated-damages obligation — every word (the payer, the daily rate, the trigger) is the objectionable term. There is no narrower operator, number, or phrase edit that removes a Customer-payable liquidated damages mechanic; a reduced rate or cap would still leave liquidated damages against us, which the preferred position forbids. No new words, exceptions, or boilerplate were added. Preserves intent: the deletion is confined to 7.6; the substantive dependency obligation itself is not defined in that paragraph, no cross-reference is orphaned, and no undefined term or dangling mechanic is created. The day-for-day extension alternative is offered only in the non-operative comment, correctly kept out of the operative text. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official minimality gate","ok":false,"detail":"Operation 1 deletes a whole paragraph; replace only the offending words or sentence"}.
- [seq 495](trajectory.jsonl#L495) **Repair round 1**: "Current target level: preferred. Keep one complete level with no hybrid. Switch the whole proposal to the other level only when a deterministic official failure makes the current level unable to pass.\n\nDeterministic official failures:\n- official minimality gate: Operation 1 deletes a whole paragraph; replace only the offending words or sentence\n\nVerifier reasons:\n- The locked preferred level is fully achieved: the sole operative provision imposing liquidated damages on Customer (USD 25,000 per day for any dependency delay) is struck, leaving no liquidated damages or penalties payable by Customer.\n- Fallback is not met and need not be: no early-termination fee, no 3-month cap, and no sole-liquidated-amount statement. Preferred and fallback are separate bargains, so this is not a defect at the locked target.\n- Minimality: the deterministic gate objects to a whole-paragraph deletion, but paragraph 7.6 consists exclusively of the offending liquidated-damages obligation — every word (the payer, the daily rate, the trigger) is the objectionable term. There is no narrower operator, number, or phrase edit that removes a Customer-payable liquidated damages mechanic; a reduced rate or cap would still leave liquidated damages against us, which the preferred position forbids. No new words, exceptions, or boilerplate were added.\n- Preserves intent: the deletion is confined to 7.6; the substantive dependency obligation itself is not defined in that paragraph, no cross-reference is orphaned, and no undefined term or dangling mechanic is created. The day-for-day extension alternative is offered only in the non-operative comment, correctly kept out of the operative text."
- [seq 505](trajectory.jsonl#L505) **Verdict: repaired** — The redline flips the operative obligation so no liquidated damages or penalties are payable by Customer for dependency delay, satisfying both atomic elements of the preferred position at the locked target level. Change is confined to the single sentence: the operator was negated and the USD 25,000 per-day figure removed; adding "or penalties" is necessary to cover the second preferred element and is not surplus. No unrelated term, defined term, or surrounding mechanic is disturbed; the dependency-delay subject matter is retained so no dangling reference arises. Fallback is not satisfied (no early-termination fee capped at 3 months' fees), but that is irrelevant since the preferred level is fully met and the levels are separate bargains. Checks: {"name":"operation 1 applies","ok":true}; {"name":"official minimality gate","ok":true}.

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

- [seq 361](trajectory.jsonl#L361) **drafter → read_section**

```json
{"sectionId":"sec-19"}
```

- [seq 362](trajectory.jsonl#L362) **read_section result**

```json
{"sectionRef":"§ 19 WARRANTIES","paragraphs":[{"id":"p0075","text":"19. WARRANTIES"}]}
```

- [seq 363](trajectory.jsonl#L363) **drafter → list_sections**

```json
{}
```

- [seq 364](trajectory.jsonl#L364) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 390](trajectory.jsonl#L390) **drafter → read_section**

```json
{"sectionId":"sec-19.2"}
```

- [seq 391](trajectory.jsonl#L391) **read_section result**

```json
{"sectionRef":"§ 19.2 For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term. Vendor warrants it has authority to enter the Agreement and grant the rights stated here.","paragraphs":[{"id":"p0077","text":"19.2 For ninety days after deliver…
```

- [seq 392](trajectory.jsonl#L392) **drafter → read_section**

```json
{"sectionId":"sec-19.4"}
```

- [seq 393](trajectory.jsonl#L393) **read_section result**

```json
{"sectionRef":"§ 19.4 For breach of Section 19.1 or 19.2, Vendor shall promptly re-perform, repair, or replace the nonconforming item at no charge. If Vendor cannot do so within a reasonable period, Customer may terminate the affected item and receive a refund of Fees paid for it. This remedy is not exclusive for fraud, infringement, confidentiality, privacy, security, or indemnified claims.","pa…
```

- [seq 394](trajectory.jsonl#L394) **drafter → read_section**

```json
{"sectionId":"sec-19.5"}
```

- [seq 395](trajectory.jsonl#L395) **read_section result**

```json
{"sectionRef":"§ 19.5 Except for the express warranties in this Agreement, neither Party makes an implied warranty to the maximum extent lawful. No disclaimer limits an express warranty, service level, indemnity, confidentiality duty, data-protection duty, or remedy expressly provided here.","paragraphs":[{"id":"p0080","text":"19.5 Except for the express warranties in this Agreement, neither Part…
```

- [seq 422](trajectory.jsonl#L422) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0076","p0077","p0078","p0079","p0080"],"quote":"19.2 For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.","rationale":"Section 19 meets or exceeds the preferred position. 19.1 gives a professional and workmanlike services warranty by qualified personnel plus material conformity of Services and Deliverables to documentation and specifications; 19.2 runs ninety days from the later of delivery or acceptance for Deliverables and for the full subscription term for hosted Services (better than the 12-month software benchmark); 19.3 adds no-malicious-code, compliance with Applicable Law, no functionality diminution and open-source protection. 19.4 supplies the required remedy ladder — prompt re-performance, repair or replacement at no charge, with termination and refund of Fees paid if Vendor cannot cure in a reasonable period — and expressly preserves other remedies for fraud, infringement, confidentiality, privacy, security and indemnified claims. The 19.5 disclaimer is mutual and expressly does not limit any express warranty, so it does not swallow the warranty. No redline needed.","confidence":0.9}
```

- [seq 423](trajectory.jsonl#L423) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 422](trajectory.jsonl#L422)
- Finding: `f-warranty-5eb920ef` · **compliant** · confidence 0.90
- Location: § 19.1 Vendor warrants that Services will be performed in a profes…
- Quote: “19.2 For ninety days after delivery or acceptance, whichever is later, each Deliverable will materially conform to its documentation and acceptance criteria. Hosted Services will conform throughout the subscription term.”
- Rationale: Section 19 meets or exceeds the preferred position. 19.1 gives a professional and workmanlike services warranty by qualified personnel plus material conformity of Services and Deliverables to documentation and specifications; 19.2 runs ninety days from the later of delivery or acceptance for Deliverables and for the full subscription term for hosted Services (better than the 12-month software benchmark); 19.3 adds no-malicious-code, compliance with Applicable Law, no functionality diminution and open-source protection. 19.4 supplies the required remedy ladder — prompt re-performance, repair or replacement at no charge, with termination and refund of Fees paid if Vendor cannot cure in a reasonable period — and expressly preserves other remedies for fraud, infringement, confidentiality, privacy, security and indemnified claims. The 19.5 disclaimer is mutual and expressly does not limit any express warranty, so it does not swallow the warranty. No redline needed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## INSURANCE — Vendor insurance

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 368](trajectory.jsonl#L368)

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

- [seq 398](trajectory.jsonl#L398) **drafter → read_section**

```json
{"sectionId":"sec-18"}
```

- [seq 399](trajectory.jsonl#L399) **read_section result**

```json
{"sectionRef":"§ 18 INSURANCE","paragraphs":[{"id":"p0072","text":"18. INSURANCE"}]}
```

- [seq 400](trajectory.jsonl#L400) **drafter → search**

```json
{"query":"insurance"}
```

- [seq 401](trajectory.jsonl#L401) **search result**

```json
[{"paragraphId":"p0072","sectionRef":"§ 18 INSURANCE","snippet":"18. INSURANCE"},{"paragraphId":"p0073","sectionRef":"§ 18.1 Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000…
```

- [seq 426](trajectory.jsonl#L426) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0073","p0074"],"quote":"Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.","rationale":"Section 18 imposes the insurance obligation on Vendor (Silverline) and matches our preferred position on every material term: CGL of USD 1M per occurrence / USD 2M aggregate, professional E&O of USD 2M, cyber and privacy liability of USD 5M, and workers' compensation as required by law, all maintained throughout the term and for one year afterward. Section 18.2 adds certificates of insurance on request, reputable insurers, primary coverage, cancellation notice, and confirms insurance does not limit Vendor's liabilities — all favourable to us. No redline needed.","confidence":0.95}
```

- [seq 427](trajectory.jsonl#L427) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 426](trajectory.jsonl#L426)
- Finding: `f-insurance-12d90118` · **compliant** · confidence 0.95
- Location: § 18.1 Vendor shall maintain, at its own expense throughout the te…
- Quote: “Vendor shall maintain, at its own expense throughout the term and for one year afterward, commercial general liability insurance of at least USD 1,000,000 per occurrence and USD 2,000,000 aggregate, workers' compensation as required by law, employer's liability of USD 1,000,000, professional errors and omissions insurance of USD 2,000,000, and cyber and privacy liability insurance of USD 5,000,000.”
- Rationale: Section 18 imposes the insurance obligation on Vendor (Silverline) and matches our preferred position on every material term: CGL of USD 1M per occurrence / USD 2M aggregate, professional E&O of USD 2M, cyber and privacy liability of USD 5M, and workers' compensation as required by law, all maintained throughout the term and for one year afterward. Section 18.2 adds certificates of insurance on request, reputable insurers, primary coverage, cancellation notice, and confirms insurance does not limit Vendor's liabilities — all favourable to us. No redline needed.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## MINCOMMIT — Minimum purchase commitments and volume restrictions on Customer

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 409](trajectory.jsonl#L409)

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

- [seq 440](trajectory.jsonl#L440) **drafter → read_section**

```json
{"sectionId":"sec-2.1"}
```

- [seq 441](trajectory.jsonl#L441) **read_section result**

```json
{"sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","paragraphs":[{"id":"p0012","text":"2.1 This Agreemen…
```

- [seq 442](trajectory.jsonl#L442) **drafter → read_section**

```json
{"sectionId":"sec-7.1"}
```

- [seq 443](trajectory.jsonl#L443) **read_section result**

```json
{"sectionRef":"§ 7.1 Customer shall pay the Fees stated in each Order Form. Fees are fixed during the initial term unless an Order Form expressly provides a usage-based unit price. Vendor may not impose a platform, support, administration, minimum-use, or similar charge that the Order Form does not identify.","paragraphs":[{"id":"p0026","text":"7.1 Customer shall pay the Fees stated in each Order…
```

- [seq 464](trajectory.jsonl#L464) **drafter → search**

```json
{"query":"minimum"}
```

- [seq 465](trajectory.jsonl#L465) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","snippet":"…s under which Cust…
```

- [seq 466](trajectory.jsonl#L466) **drafter → search**

```json
{"query":"shortfall|commit|take-or-pay|volume","regex":true}
```

- [seq 467](trajectory.jsonl#L467) **search result**

```json
[{"paragraphId":"p0012","sectionRef":"§ 2.1 This Agreement establishes the legal terms under which Customer and its Affiliates may purchase Services from Vendor. No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","snippet":"…s Affiliates may p…
```

- [seq 474](trajectory.jsonl#L474) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0012","p0026","p0050"],"quote":"No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.","rationale":"The Agreement meets our preferred position: § 2.1 (p0012) expressly disclaims any minimum quantity or purchase commitment and confirms that declining a further Order Form is neither a breach nor a shortfall, so fees are payable only for Services actually ordered. § 7.1 (p0026) reinforces this by barring any minimum-use or similar charge not identified in an Order Form, and § 12.3 (p0050) records that we have made no minimum-volume commitment. No take-or-pay, volume floor, or shortfall penalty is imposed on us anywhere in the document; the only \"shortfall\" references (§§ 22.2–22.3) concern audit underpayments for usage actually consumed, which is not a purchase commitment. No redline required.","confidence":0.93}
```

- [seq 475](trajectory.jsonl#L475) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 474](trajectory.jsonl#L474)
- Finding: `f-mincommit-9508e255` · **compliant** · confidence 0.93
- Location: § 2.1 This Agreement establishes the legal terms under which Cust…
- Quote: “No minimum quantity or purchase commitment applies. Customer pays only for Services ordered in a mutually executed Order Form, and its decision not to enter another Order Form is not a breach or shortfall.”
- Rationale: The Agreement meets our preferred position: § 2.1 (p0012) expressly disclaims any minimum quantity or purchase commitment and confirms that declining a further Order Form is neither a breach nor a shortfall, so fees are payable only for Services actually ordered. § 7.1 (p0026) reinforces this by barring any minimum-use or similar charge not identified in an Order Form, and § 12.3 (p0050) records that we have made no minimum-volume commitment. No take-or-pay, volume floor, or shortfall penalty is imposed on us anywhere in the document; the only "shortfall" references (§§ 22.2–22.3) concern audit underpayments for usage actually consumed, which is not a purchase commitment. No redline required.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## TRANSITION — Post-termination transition assistance and data return

### Drafter instructions

[drafter system prompt](prompts.md#prompt-drafter) · [seq 412](trajectory.jsonl#L412)

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

- [seq 434](trajectory.jsonl#L434) **drafter → read_section**

```json
{"sectionId":"sec-11"}
```

- [seq 435](trajectory.jsonl#L435) **read_section result**

```json
{"sectionRef":"§ 11 TRANSITION ASSISTANCE AND DATA RETURN","paragraphs":[{"id":"p0045","text":"11. TRANSITION ASSISTANCE AND DATA RETURN"}]}
```

- [seq 436](trajectory.jsonl#L436) **drafter → list_sections**

```json
{}
```

- [seq 437](trajectory.jsonl#L437) **list_sections result**

```json
[{"id":"sec-p0000","heading":"MASTER SERVICES AGREEMENT","level":1,"paragraphCount":2},{"id":"sec-1","number":"1","heading":"DEFINITIONS","level":1,"paragraphCount":1},{"id":"sec-1.1","number":"1.1","heading":"“Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by, or is under common control with that Party. “Control” means ownership of more …
```

- [seq 456](trajectory.jsonl#L456) **drafter → read_section**

```json
{"sectionId":"sec-11.1"}
```

- [seq 457](trajectory.jsonl#L457) **read_section result**

```json
{"sectionRef":"§ 11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.","paragrap…
```

- [seq 458](trajectory.jsonl#L458) **drafter → read_section**

```json
{"sectionId":"sec-11.2"}
```

- [seq 459](trajectory.jsonl#L459) **read_section result**

```json
{"sectionRef":"§ 11.2 Within thirty days after Customer's request, Vendor shall return all Customer Data in a complete, commonly used, documented, machine-readable format, with relationships and metadata reasonably necessary for use. Vendor shall not withhold Customer Data because of a fee dispute.","paragraphs":[{"id":"p0047","text":"11.2 Within thirty days after Customer's request, Vendor shall…
```

- [seq 460](trajectory.jsonl#L460) **drafter → read_section**

```json
{"sectionId":"sec-11.3"}
```

- [seq 461](trajectory.jsonl#L461) **read_section result**

```json
{"sectionRef":"§ 11.3 After Customer confirms successful return, Vendor shall securely delete remaining Customer Data from active systems and, as backups cycle, from backups, except for a copy required by Applicable Law. An authorized officer shall certify deletion in writing. Any retained copy remains protected and may not be used for another purpose.","paragraphs":[{"id":"p0048","text":"11.3 Af…
```

- [seq 478](trajectory.jsonl#L478) **drafter → submit_finding**

```json
{"status":"compliant","paragraphIds":["p0046","p0047","p0048"],"quote":"11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.","rationale":"Section 11 contains a full exit package that meets the preferred position: 11.1 gives up to six months' transition assistance on any expiry or termination at the expiring Order Form rates (better for us than \"then-current rates\"), including knowledge transfer, migration and cooperation with a replacement supplier; 11.2 requires return of all Customer Data within thirty days in a complete, documented, machine-readable format and bars withholding data over a fee dispute; and 11.3 requires secure deletion after confirmed return with written officer certification, with any legally retained copy remaining protected. Section 16.5 expressly leaves Customer Data governed by Sections 11 and 15, so the confidentiality return/destroy provision does not cut across these rights. No walk-away features (no immediate deletion, no data hostage) are present, so no redline is warranted.","confidence":0.93}
```

- [seq 479](trajectory.jsonl#L479) **submit_finding result**

```json
{"ok":true,"errors":[]}
```

### Submitted finding

- Source: [seq 478](trajectory.jsonl#L478)
- Finding: `f-transition-8d62b42e` · **compliant** · confidence 0.93
- Location: § 11.1 Upon expiry or termination for any reason, Vendor shall, at…
- Quote: “11.1 Upon expiry or termination for any reason, Vendor shall, at Customer's request, provide reasonable transition assistance for up to six months at the rates in the expiring Order Form. Assistance includes knowledge transfer, export support, cooperation with a replacement supplier, orderly migration, and continued service at the then-current scope and service levels.”
- Rationale: Section 11 contains a full exit package that meets the preferred position: 11.1 gives up to six months' transition assistance on any expiry or termination at the expiring Order Form rates (better for us than "then-current rates"), including knowledge transfer, migration and cooperation with a replacement supplier; 11.2 requires return of all Customer Data within thirty days in a complete, documented, machine-readable format and bars withholding data over a fee dispute; and 11.3 requires secure deletion after confirmed return with written officer certification, with any legally retained copy remaining protected. Section 16.5 expressly leaves Customer Data governed by Sections 11 and 15, so the confidentiality return/destroy provision does not cut across these rights. No walk-away features (no immediate deletion, no data hostage) are present, so no redline is warranted.

### Verifier and repair feedback

No independent verifier or repair event was recorded for this configuration.

### Human checkpoint and applied ops

No human decision was recorded.

## Memo

- [seq 510](trajectory.jsonl#L510) memo LLM request
- [seq 511](trajectory.jsonl#L511) memo LLM response (replay)

```markdown
# Issues Memo — Master Services Agreement

**To:** Deal team
**From:** In-house counsel (Customer-side)
**Re:** Playbook review of Master Services Agreement (Vendor: Silverline)

---

## Executive summary

We have completed a playbook review of the Master Services Agreement. The core ri[REDACTED] architecture is strong and, in several respects, better than our preferred position: indemnification (§ 20), IP and Customer Data ownership (§ 14), limitation of liability (§ 21), assignment and change of control (§ 24), licence scope (§ 13), warranties (§ 19), transition assistance and data return (§ 11), insurance (§ 18), and governing law/venue (§ 28) are all compliant. Notably, indemnification obligations sit outside the liability cap as Excluded Claims (§ 21.3), and the cap itself is mutual at the greater of twelve months' Fees and USD 1,000,000.

The problems are concentrated in a cluster of Customer-burdening commercial terms that are inconsistent with the balance of the document and, in several cases, with each other. Six items require change:

- **Exclusivity (§ 2.2)** — a three-year sole-and-exclusive supply commitment binding us, which directly contradicts § 2.1 (no purchase commitment) and § 12.3 (no exclusivity commitment).
- **Customer-payable liquidated damages (§ 7.6)** — USD 25,000 per day for any delay in providing a dependency, uncapped and with no materiality threshold or cure period.
- **Most-favoured-nation obligation running against us (§ 7.2)** — unlimited in scope and duration, and contradicted by § 12.3.
- **Vendor audit rights (§ 22.1)** — unlimited, unannounced audits with remote access to our systems.
- **Non-solicitation (§ 12.4)** — one-way, eighteen-month, de facto no-hire covering all Vendor personnel.
- **Non-renewal notice (§ 8.2)** — 180 days, which is past our walk-away threshold and makes exit impractical.
- **Termination for convenience** — absent entirely for a three-year term (§ 9 is for-cause only).

Four of the internally inconsistent clauses (§§ 2.2, 7.2, 7.6, 8.2) should be straightforward to resolve because the Agreement's own provisions already disclaim the commitments they impose. Two redlines (§ 12.4 and § 22.1) did not verify cleanly and require drafting attention before the turn goes out.

---

## Findings

| Severity | Rule | Status | Section | Note |
|---|---|---|---|---|
| Critical | Indemnification by Vendor | Compliant | § 20.1 (with §§ 20.2–20.5, 9.3, 21.3) | Preferred position in full; indemnities are Excluded Claims outside the cap. |
| Critical | Ownership of deliverables and Customer Data | Compliant | § 14.1 (with §§ 14.2–14.4, 13.2, 15.1) | Preferred position; Deliverables vest in Customer on creation. |
| Critical | Limitation of liability — cap, mutuality and carve-outs | Compliant | § 21.1 (with §§ 21.2–21.4, 18.2) | Mutual cap at greater of 12 months' Fees or USD 1,000,000; full carve-outs. |
| High | Assignment and change of control | Compliant | § 24.1 (with §§ 24.2–24.4, 13.3) | Consent-free affiliate/successor carve-out; no Vendor repricing on our change of control. |
| **High** | **Exclusivity obligations binding Customer** | **Deviation** | **§ 2.2** | **Three-year sole-and-exclusive supply commitment; no category limit, no cap, no performance exit. Walk-away territory; conflicts with §§ 2.1 and 12.3.** |
| High | Licence grant scope | Compliant | § 13.1 (with §§ 13.2–13.4, 14.3, 24.1, 24.4) | Extends to Affiliates, contractors and Authorized Users; not revocable at will. |
| High | Non-compete restrictions on Customer | Compliant | § 12.3 | Expressly preserves our commercial freedom; § 2.2 addressed under the exclusivity rule. |
| Medium | Governing law and venue | Compliant | § 28.1 (with §§ 28.2–28.3) | New York law and New York County courts; CISG excluded; no arbitration clause. |
| Medium | Minimum purchase commitments | Compliant | § 2.1 (with §§ 7.1, 12.3) | No minimum quantity, volume floor or shortfall penalty. |
| **Medium** | **Non-solicitation of employees binding Customer** | **Deviation** | **§ 12.4** | **One-way, 18 months post-termination, all Vendor personnel, "engage" as well as solicit, no carve-outs. Fails fallback on every material term. Redline did not verify.** |
| **Medium** | **Auto-renewal and non-renewal notice window** | **Deviation** | **§ 8.2** | **180-day non-renewal notice, past the 90-day walk-away threshold. Uplift cap in § 8.3 already meets our preferred position and is not flagged.** |
| Medium | Post-termination transition assistance and data return | Compliant | § 11.1 (with §§ 11.2–11.3, 16.5) | Six months' assistance at expiring Order Form rates; data return in 30 days; no data-hostage right. |
| Medium | Performance warranty and duration | Compliant | § 19.1 (with §§ 19.2–19.5) | Meets or exceeds preferred position, including remedy ladder and mutual disclaimer. |
| **Low** | **Audit rights against Customer** | **Deviation** | **§ 22.1** | **Unlimited, unannounced audits plus remote system access — walk-away territory. §§ 22.2–22.3 are protective but do not cure § 22.1. Redline did not verify.** |
| Low | Vendor insurance | Compliant | § 18.1 (with § 18.2) | CGL, E&O and cyber limits all at preferred position; insurance does not limit liability. |
| **Low** | **Liquidated damages payable by Customer** | **Deviation** | **§ 7.6** | **USD 25,000/day for any dependency delay; no materiality threshold, notice, cure or aggregate cap. Fails preferred and fallback positions.** |
| **Low** | **Most-favoured-nation obligations burdening Customer** | **Deviation** | **§ 7.2** | **Unlimited MFN running against us, no scope, duration or comparison carve-outs. Walk-away territory; conflicts with § 12.3.** |
| **Low** | **Termination for convenience** | **Missing** | § 9.3 (for-cause only; §§ 9.1–9.2, 8.2, 27.3 do not supply a convenience right) | **No Customer right to terminate without cause in a three-year term. Walk-away territory.** |

---

## Walk-away items

The following sit in walk-away territory under the playbook and should be treated as conditions of signature rather than negotiating preferences:

1. **§ 2.2 — Exclusivity.** A three-year sole-and-exclusive supply commitment with no category limitation, no 12-month cap and no performance-based exit. Our position is non-exclusivity; deletion also resolves the direct conflict with §§ 2.1 and 12.3.
2. **§ 7.2 — Customer-side MFN.** Unlimited in scope, duration and product, with no comparison carve-outs. Our position is no MFN burden on Customer. § 12.3 already records that we have made no most-favoured-customer commitment.
3. **§ 22.1 — Vendor audit rights.** Audits at any time without notice, with remote access to our systems. Our position is once per twelve months, 30 days' written notice, business hours, independent auditor bound by confidentiality, no system access; cost allocation can remain with § 22.2.
4. **Termination for convenience (absent).** No provision permits us to exit without cause during the three-year term. Our position is 30 days' notice with a pro-rata refund of prepaid Fees, keyed to § 10.2, inserted as a new § 9.4.
5. **§ 8.2 — 180-day non-renewal notice.** Past the 90-day walk-away threshold; exit is impractical as drafted. We seek 30 days plus a 60-day Vendor renewal reminder; 60 days remains an acceptable fallback.
6. **§ 7.6 — Daily liquidated damages against us.** Close to walk-away: an accumulating uncapped daily amount triggered by any dependency delay can exceed remaining contract value, and the mutual cap in § 21.1 gives limited comfort because it is set at the *greater* of twelve months' Fees and USD 1,000,000.

---

## Next steps

1. **Issue the first turn on the four verified redlines.** §§ 2.2 (non-exclusive), 7.2 (negate the Customer-side MFN), 7.6 (remove the USD 25,000/day charge, offering day-for-day schedule relief instead) and 8.2 (30-day non-renewal notice plus 60-day Vendor reminder) are drafted and verified. In each case we should lead with the internal inconsistency — §§ 2.1, 7.1 and 12.3 already disclaim the very commitments these clauses impose — which should make these low-friction asks.
2. **Re-draft the two unverified redlines before they leave the building.** The § 12.4 non-solicitation redline (mutual, solicitation-only, personnel directly involved in the Services, twelve months from the end of that involvement, with general-advertising and unsolicited-approach carve-outs) and the § 22.1 audit redline (once per twelve months, 30 days' notice, business hours, off-site, independent auditor, no system access) both failed verification and need a further drafting pass.
3. **Insert the new § 9.4 termination-for-convenience clause.** 30 days' notice with a pro-rata refund of prepaid Fees keyed to § 10.2. The section number 9.4 is currently unused. Note for the business: Vendor has no convenience right either, so only the Customer-side gap needs closing — we should resist any reciprocal Vendor exit right offered in exchange.
4. **Confirm the commercial position on exclusivity with the business owner.** If Vendor pushes back on § 2.2, we need to know whether any exclusivity was in fact negotiated, given § 12.3 states the opposite.
5. **Hold the compliant provisions.** §§ 11, 13, 14, 18, 19, 20, 21, 24 and 28 meet or exceed our positions. We should avoid reopening them and, in particular, protect the Excluded Claims list in § 21.3 and the six-month transition package in § 11.1 if Vendor seeks trade-offs for the changes above.

*Minor points noted for the record but not redlined: the § 13.2 licence lists contractor support rather than an express sublicensing right (immaterial given we own the Deliverables outright).*
```

## Apply and validation

No apply or output-validation event was recorded.
