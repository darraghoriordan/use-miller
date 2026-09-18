# Miller Local Dev Tools

Miller Local Dev Tools is a desktop collection of everyday developer utilities for macOS and
Windows. Most tools work entirely on the user's computer so business and client data does not
need to be pasted into unrelated websites.

## What it includes

- JSON formatting, validation, escaping, and form encoding
- JWT inspection and optional HMAC verification
- Base64, URI, HTML entity, and Unicode encoding tools
- Regex testing, string case conversion, and line manipulation
- URL parsing and curl command generation
- Timestamp conversion, cron inspection, and timezone comparison
- Color conversion and Tailwind color matching
- Git URL conversion and repository identity checks
- Optional AI-assisted tools using local LM Studio models or the user's own provider key

## AI agent skills

Eight installable Agent Skills give coding agents access to 16 local tools through a
standalone Rust CLI. They cover JWT, JSON, encoding, text, time, colors, URLs and Git.
The desktop app is optional. Install with:

```sh
npx skills add darraghoriordan/localdevtools-skills -g
```

Then ask the agent to set up the LocalDevTools CLI. Setup downloads a verified native
binary if needed. Requires Node.js 20+; the CLI supports macOS, Windows and Linux on
x64 and ARM64. Clipboard operations require a desktop session. See the skills repository
for Linux requirements and available output options.

For example, copy a JWT and ask: “Check whether the JWT on my clipboard has expired.”
The CLI reads and processes the clipboard locally. Sensitive results default to local
files or limited findings; requested findings and explicitly shared results can enter
the agent's context. Skills guide behavior rather than enforcing a security boundary.

## Data model

The core utilities run locally. Features that use a cloud AI provider are optional and use the
user's own API credentials; the product documentation identifies when data leaves the device.

## Pricing

The free trial can be downloaded without buying a license. Perpetual licenses include one
year of updates and cost $29 USD for 5 computers, $49 USD for 10 computers, or $79 USD for
20 computers. Purchases include a 30-day money-back guarantee.

## Links

- Product and downloads: https://usemiller.dev/local-dev-tools
- AI agent skills: https://github.com/darraghoriordan/localdevtools-skills
- Documentation: https://usemiller.dev/docs/local-dev-tools/get-started/quick-start
- Source preview: https://github.com/darraghoriordan/ssh-tool-new-electron
