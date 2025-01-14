module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json'
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unused-vars': ['error', { 
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_' 
		}],
		'import/order': ['error', {
			'groups': [
				'builtin',
				'external',
				'internal',
				'parent',
				'sibling',
				'index'
			],
			'newlines-between': 'always'
		}]
	}
}
