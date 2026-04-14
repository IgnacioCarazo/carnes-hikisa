module.exports = (report) => {
  if (report.valid) return "";

  return `
Invalid commit message.

Expected format:
  <type>: <description>

Example:
  feat: add authentication service

Allowed types:
  feat, fix, chore, docs, refactor, test, build, ci, perf, revert
`;
};
