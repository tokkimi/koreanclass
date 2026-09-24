# KoreanClass

French-language Korean learning app, built with React and Vite; Vercel Functions and private Vercel Blob store accounts and progress.

## Run

`npm ci`, `npm run dev`, `npm test`, `npm run build`.
Use `vercel dev` for the authenticated app locally. Vite alone serves the interface but not the account API.

## Accounts and persistence

`api/account.ts` handles registration, session creation/revocation, profile updates and progress. Passwords use salted scrypt. Random session tokens are stored only as hashes on the server and delivered in HttpOnly, SameSite cookies (Secure in production). Profiles are private. Progress is graded server-side. Request IDs make quiz retries idempotent. Each update reads fresh private storage and uses an ETag conditional write; weak read ETags are normalized before writing. The JSON account store is intended for a small pilot, not a large-scale school deployment.

The linked project needs `BLOB_READ_WRITE_TOKEN`, managed through Vercel environment settings. Never expose it as a VITE variable. `scripts/seed.ts` creates the requested demo account only if absent and reads its password from `DEMO_PASSWORD`; it never resets an existing account. Do not commit credentials or `.env` files.

The old local-only prototype profiles are not automatically migrated. Existing browser data is left untouched. New profiles save to the server and work across devices. Browser storage is used only for voice preferences.

## Learning and oral practice

49 lessons across six levels: the original 43 lessons have additional vocabulary recall exercises and review guidance; six 50-minute workshops add contextual explanations, dialogues and 12 exercises each. `/pratique` provides six four-turn scenario quizzes plus guided repetition and free-speech exercises. Scores, practice history and saved transcripts belong to the signed-in account.

Web Speech recognition must be supported by the browser and requires explicit microphone consent. The browser provider may process audio remotely. No audio is stored by this app. Textual similarity is NOT a phonetic pronunciation score. Free speech is transcribed without an automatic grammar or pronunciation grade. Voice choices depend on the operating system and browser. No external paid speech API is configured.

Private lessons remain requests, not payments or confirmed bookings. Demo requests do not send email or invoke payment links. A pack request does not mint credits without payment confirmation.

Photo credits: `public/images/CREDITS.md`.

## Deploy

`npm test` and `npm run build`, then deploy to the linked Vercel project `koreanclass`. Production alias: https://koreanclass-nu.vercel.app/.
