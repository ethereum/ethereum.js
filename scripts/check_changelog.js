const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for output
const colors = {
	red: text => `\x1b[31m${text}\x1b[0m`,
	green: text => `\x1b[32m${text}\x1b[0m`,
};

try {
	// Get all staged files
	const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
		.trim()
		.split('\n')
		.filter(Boolean);

	// Initialize map to track packages with code changes and changelog updates
	const packagesWithChanges = new Map();

	// Scan all staged files
	stagedFiles.forEach(file => {
		// Get package name
		const packageMatch = file.match(/packages\/([^/]+)/);
		if (!packageMatch) return;

		const packageName = packageMatch[1];

		// Check if it's a code file
		const isCodeFile = /\.(js|jsx|ts|tsx|css|json)$/.test(file);
		// Check if it's a changelog file
		const isChangelog = file.endsWith('CHANGELOG.md');

		if (!packagesWithChanges.has(packageName)) {
			packagesWithChanges.set(packageName, {
				hasCodeChanges: false,
				hasChangelogUpdate: false,
			});
		}

		const packageInfo = packagesWithChanges.get(packageName);

		if (isCodeFile && !isChangelog) {
			packageInfo.hasCodeChanges = true;
		}

		if (isChangelog) {
			packageInfo.hasChangelogUpdate = true;
		}
	});

	// Check if packages with code changes have changelog updates
	let hasError = false;

	for (const [packageName, info] of packagesWithChanges) {
		if (info.hasCodeChanges) {
			if (!info.hasChangelogUpdate) {
				console.log(
					colors.red(
						`Error: Package '${packageName}' has code changes but no CHANGELOG.md update`,
					),
				);
				hasError = true;
			} else {
				console.log(
					colors.green(
						`✓ Package '${packageName}' has both code changes and CHANGELOG.md update`,
					),
				);
			}
		}
	}

	if (hasError) {
		console.log(
			colors.red(
				'\nCommit rejected: Please update packages/web3-xxx/CHANGELOG.md for all modified packages',
			),
		);
		process.exit(1);
	} else if (packagesWithChanges.size > 0) {
		console.log(colors.green('\nAll package changes have corresponding changelog updates'));
	}
} catch (error) {
	console.error(colors.red('Error executing script:'), error);
	// Skip this check and return 0 if something goes wrong
	process.exit(0);
}
