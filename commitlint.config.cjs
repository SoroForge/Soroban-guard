/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "contract",
        "security",
      ],
    ],
    "scope-enum": [
      1,
      "always",
      [
        "sdk",
        "ui",
        "contracts",
        "timelock",
        "multisig-governance",
        "upgrade-proxy",
        "docs",
        "examples",
        "ci",
        "deps",
        "release",
      ],
    ],
  },
};
