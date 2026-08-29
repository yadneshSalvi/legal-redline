# Pre-calibration ladder (recorded 2026-08-30 00:48–03:07 IST)

These results were recorded **before** iteration 5 ("calibration": the playbook preamble now states that a clause meeting the
preferred *or fallback* position is compliant, and the verifier fails redlines that merely upgrade an acceptable fallback).
They are kept as evidence for the changelog: reviewing the false positives of `i3-verifier`/`i4-memory` is what led to the calibration.
Their replay caches are in `evals/cache-precalibration/`; they replay against the prompt text at commit `d7edec5` (the prompts
changed in the calibration commit, so `pnpm eval` on today's code records fresh calls for these configs instead).
