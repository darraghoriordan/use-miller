# create-miller

Create a new Miller application with the template version bundled in this package.

```bash
pnpm create miller@latest my-app
```

For deterministic agent and CI usage:

```bash
pnpm create miller@latest my-app \
    --name "My App" \
    --slug my-app \
    --yes \
    --json
```

Use `--no-install` to create the project without installing dependencies or running
`mill doctor`.

## Maintainer workflow

From the Miller workspace:

```bash
pnpm --filter create-miller test
pnpm --filter create-miller pack --pack-destination /tmp
```

The `prepack` hook builds a clean template from the workspace. The `postpack` hook removes
the temporary package contents again.

Releases run through semantic-release from the workspace root. Conventional commits on
`main` publish to npm with tags such as `create-miller-v1.2.0`; `release/*` branches publish
release candidates to the `next` channel.

The first release needs an npm automation token in the repository secret `NPM_TOKEN` because
the package does not yet have an npm settings page. After that release, configure the npm
trusted publisher for `darraghoriordan/use-miller` and `publish.yaml`, then remove the token.
