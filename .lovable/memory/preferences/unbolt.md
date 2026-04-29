---
name: Unbolt = hide, don't change
description: When user says "unbolt", hide/comment out only — never delete, rename, or modify the underlying code
type: preference
---
"Unbolt it" = hide it / put it away. NEVER delete, rename, refactor, or modify the code itself. Comment out, conditionally hide, or unmount only. Must remain plug-and-play to restore later by simply un-hiding.

**How to apply:** Comment out the JSX/import or wrap in `{false && ...}`. Leave file, component, table, and logic fully intact.
