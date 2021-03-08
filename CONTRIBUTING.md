---
title: Contributing
---

## Translations

All translations are contributed by the community. To aid with translation, visit our [Transifex project](https://www.transifex.com/mirumee/saleor-1/).

## Managing dependencies

After modifying dependencies, commit updated `package-lock.json`.

## Coding style

When creating new components, use `plop` which will create needed files:

```bash
npm run generate
```

TypeScript types can be checked with:

```bash
npm run check-types
```

To apply code formatting:

```bash
npm run lint
```

## Git commit messages

To speed up the review process and to keep the logs tidy, we recommend the following simple rules on how to write good commit messages:

### Summary line

- It should contain less than 50 characters. It is best to make it short
- Introduce what has changed, using imperatives: fix, add, modify, etc.

### Description

- Add extra explanation if you feel it will help others to understand the summary content
- If you want, use bullet points (each bullet beginning with a hyphen or an asterisk)
- Avoid writing in one line. Use line breaks so the reader does not have to scroll horizontally

*Tip*: To ease review, try to limit your commits to a single, self-contained issue. This will also help others to understand and manage them in the future.


For more information and tips on how to write good commit messages, see the GitHub [guide](https://github.com/erlang/otp/wiki/writing-good-commit-messages).

## Changelog

Add new entry in _[Unreleased]_ section and link opened PR. For example:

```
## [Unreleased]
- Add EditorJS renderer - #947 by @krzysztofwolski
```

## Checklist and PR template

All PR should use default template. Please update checklist according to changes you introduced.
