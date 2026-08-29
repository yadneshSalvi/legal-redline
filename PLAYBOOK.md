# PLAYBOOK.md — what a playbook is and how the agent uses it

A **playbook** is a company's pre-agreed negotiating position, rule by rule: what we *prefer*, what we'll
*accept as a fallback*, and what we *walk away* from. In-house teams review every vendor contract against
it; the redlines and margin comments they send back are the playbook applied to that document. This is the
"skill" the agent carries: **`data/playbooks/customer-vendor-services.yaml`**, validated by
`src/playbook/schema.ts`.

## Rules (v1, customer side, 18 rules)

| Id | Title | Kind | Sev | CUAD categories (gold source) |
|---|---|---|---|---|
| LOL-CAP | Limitation of liability — cap, mutuality, carve-outs | parametric | critical | Cap On Liability, Uncapped Liability |
| INDEMN | Indemnification by Vendor | missing | critical | — (synthetic + human gold) |
| NONCOMPETE | Non-compete restrictions on Customer | presence | high | Non-Compete |
| EXCLUSIVITY | Exclusivity obligations binding Customer | presence | high | Exclusivity |
| MFN | MFN obligations burdening Customer | direction | medium | Most Favored Nation |
| NOSOLICIT | Non-solicitation binding Customer | presence | medium | No-Solicit Of Employees |
| T4C | Termination for convenience | parametric | high | Termination For Convenience |
| RENEWAL | Auto-renewal and notice window | parametric | medium | Renewal Term, Notice Period To Terminate Renewal |
| GOVLAW | Governing law and venue | parametric | medium | Governing Law |
| ASSIGN | Assignment and change of control | parametric | high | Anti-Assignment, Change Of Control |
| IP | Ownership of deliverables and Customer Data | direction | critical | Ip Ownership Assignment, Joint Ip Ownership |
| LICENSE | Licence grant scope | parametric | high | License Grant, Non-Transferable License, Affiliate License-Licensee, Irrevocable Or Perpetual License |
| AUDIT | Audit rights against Customer | parametric | medium | Audit Rights |
| LD | Liquidated damages payable by Customer | direction | high | Liquidated Damages |
| WARRANTY | Performance warranty and duration | parametric | medium | Warranty Duration |
| INSURANCE | Vendor insurance | missing | low | Insurance |
| MINCOMMIT | Minimum commitments / volume restrictions on Customer | presence | medium | Minimum Commitment, Volume Restriction |
| TRANSITION | Post-termination transition and data return | missing | medium | Post-Termination Services |

Kinds: **presence** (a clause binding us is a deviation) · **parametric** (expected clause; parameters must fit)
· **missing** (absence is the deviation; redline = insertion) · **direction** (deviation only when the obligation
runs against our party — the agent must work out who is bound).

## How the agent uses it

- The **planner** gets the rule list (id, title, kind, summary) and the document outline to map rules to sections.
- Each **drafter** worker gets exactly one rule in full (positions, detect/redline guidance, model language, examples)
  plus the parties, and reads only what it needs through tools. It must quote the clause verbatim, decide the status,
  and — for deviations/missing clauses — propose the smallest redline that reaches the preferred position (or the
  fallback where the guidance says so), with a margin comment in the playbook's tone.
- The **verifier** gets the same rule and judges the rendered redline; `checks` run deterministically first.
- **Precedents** are keyed by rule id; approved redlines are stored as `{ clauseBefore, clauseAfter, comment, level }`
  and offered to drafters as model language for consistency.

## Adding a playbook

Drop a YAML file in `data/playbooks/`; it is validated on load. Rule ids are stable identifiers used by gold files,
precedents and the UI; never rename them.
