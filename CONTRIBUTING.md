# Contributing to vectara-answer

Thank you for your interest in vectara-answer and considering contributing to our project!
Whether it's a bugfix, improving the look and feel, new user interface component, updates to the documentation or anything else - we truly appreciate your time and effort.

This document provides guidelines and best practices to help you contribute effectively.

## Getting started

1. Fork the repository and clone your fork.
2. Create a new branch for your changes (e.g. `bug-fix-1234`)
3. Make your changes in the new branch and test.
4. Commit and push your changes to your fork. Add useful comments to describe your changes.
5. Create a pull request following the guidelines in the [Submitting Pull Requests](#submitting-pull-requests) section.

## Contributing

### Reporting bugs

If you find a bug in the project, please create an issue on GitHub with the following information:

- A clear, descriptive title for the issue.
- A description of the problem, including steps to reproduce the issue.
- Any relevant logs, screenshots, or other supporting information.

### Suggesting enhancements

If you have an idea for a new feature or improvement, please create an issue on GitHub with the following information:

- A clear, descriptive title for the issue.
- A detailed description of the proposed enhancement, including any benefits and potential drawbacks.
- Any relevant examples, mockups, or supporting information.

### Submitting pull requests

When submitting a pull request, please ensure that your changes meet the following criteria:

- Your pull request should be atomic and focus on a single change.
- You should have thoroughly tested your changes with multiple different scenarios.
- You should have considered potential risks and mitigations for your changes.
- You should have documented your changes clearly and comprehensively.
- Please do not include any unrelated or "extra" small tweaks or changes.

## Versioning and releases

As you submit changes, note the changes in the [CHANGELOG](./CHANGELOG.md) under the `main` section.

### Release process

1. Submit a PR that updates the `package.json` version and moves the `main` content into a new section for the new version. We follow semver, so breaking changes should result in a major version bump.
2. Publish a new release tagged with the version number.
