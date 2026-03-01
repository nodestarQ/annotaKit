---
name: annotakit
description: Interpret Annotakit structured markdown output to locate and modify Svelte/SvelteKit code
trigger: When input contains "## Annotakit Feedback" or mentions annotakit output/annotations
---

# Annotakit Feedback Interpreter

When you receive Annotakit-formatted feedback, use these rules to locate and modify code:

## Reading the output

Annotakit generates markdown with annotations in three possible formats. Each annotation contains:

- **Selector:** A CSS selector that uniquely identifies the DOM element (e.g., `button.primary`, `#submit-btn`, `[data-testid="login"]`)
- **Component:** The Svelte component name and file path (e.g., `Button (src/lib/Button.svelte)`)
- **Selected text:** Text the developer highlighted on the page
- **Comment:** The developer's feedback/instructions for what to change
- **Accessibility:** ARIA roles and labels on the element
- **Styles:** Current computed CSS styles (in detailed format)

## How to find the code

1. **From `Component:` lines** — Open the file path directly (e.g., `src/lib/Button.svelte:42`)
2. **From `Selector:` lines** — Search the codebase for the selector pattern:
   - `#id` → search for `id="..."` in templates
   - `.class` → search for `class="... class ..."` in templates
   - `[data-testid="x"]` → search for `data-testid="x"`
   - `tag:nth-of-type(n)` → find the nth occurrence of that tag in the parent
3. **From `Selected text:`** — Search for the literal text string in template files

## How to apply feedback

- Read the **Comment** field for the developer's intent
- The **Selector** tells you which element to modify
- The **Component** tells you which file contains the element
- The **Styles** section shows current visual state (helps understand context)
- Apply changes to the source Svelte component, not to generated CSS

## Example

Input:
```markdown
### 1. button#submit

- **Selector:** `button#submit`
- **Component:** SubmitButton (`src/lib/SubmitButton.svelte:15`)
- **Comment:** Change the background color to green and increase padding
```

Action: Open `src/lib/SubmitButton.svelte`, find the `<button id="submit">` element around line 15, and modify its classes/styles to use a green background with more padding.
