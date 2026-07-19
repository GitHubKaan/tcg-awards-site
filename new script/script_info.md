# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This directory contains a single Word document (`Embed Script für TCG Award final voting.docx`) with an HTML/CSS/JavaScript embed code for the **2026 TCG Awards final community voting**, built on the **CleverReach** email marketing platform.

The embed code is intended to be pasted into a website or CMS to render the voting form inline. It is **not** a standalone deployable application.

## Embed code structure

The document contains three distinct parts in sequence:

1. **JavaScript** — A jQuery-based form validation script that:
   - Lazy-loads jQuery 1.4.4 from Google CDN if not already present
   - Validates required fields (`musthave` class) on submit
   - Checks email uniqueness against CleverReach's API (`check_email` endpoint)
   - Validates captcha via `check_captcha` endpoint
   - Handles numeric input bounds (`cr_number` class)

2. **CSS** — Two `<style>` blocks:
   - The first block: base CleverReach styles (`.cr_site`, `.cr_body`, `.cr_form`, etc.)
   - The second block (`id="style"`): override styles for this specific form (white background, auto-width page)

3. **HTML form** — Posts to `https://seu2.cleverreach.com/f/394092-429427/wcs/` with `target="_blank"`. Contains 9 voting category dropdowns + a country selector + a required email field.

## Voting categories and field names (CleverReach field IDs)

| Category | HTML `name` attribute |
|---|---|
| Game of the Year | `1196083` |
| Newcomer of the Year | `1196084` |
| Set of the Year | `1196085` |
| Accessory of the Year | `1196086` |
| Artwork of the Year | `1196087` |
| Event of the Year | `1196088` |
| Local Game Store of the Year | (next field) |
| Content Creator of the Year | (next field) |
| Equality Impact of the Year | (next field) |
| Country | separate `select` |
| Email | `name="email"` (required) |

## Known typos in the source document

- "Set of the Year" default option reads `"Select yout vote!"` (should be `"Select your vote!"`)
- "Secrets of Strixhaven" is spelled `"Secrtes of Strixhaven"` in the Set of the Year options

## Embedding

To use the form, copy all three sections (script, style, form HTML) together and paste them into the target page's HTML. The form is self-contained and requires no additional files — jQuery is loaded on demand if missing.

The voting deadline is **August 21, 2026**. One vote per email address (enforced server-side by CleverReach).
