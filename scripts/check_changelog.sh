#!/usr/bin/env bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Get all staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)

# Initialize arrays to track packages with code changes and changelog updates
declare -A packages_with_code_changes
declare -A packages_with_changelog_updates

# Function to get package name from file path
get_package_name() {
    local file_path=$1
    # Assuming packages are in packages/package-name structure
    echo $file_path | grep -o "packages/[^/]*" | cut -d'/' -f2
}

# Function to check if file is a code file
is_code_file() {
    local file=$1
    # Add or modify extensions based on your project needs
    [[ $file =~ \.(js|jsx|ts|tsx|css)$ ]]
}

# Scan all staged files
for file in $STAGED_FILES; do
    # Skip if file doesn't exist
    [ ! -f "$file" ] && continue
    
    # Get package name
    package_name=$(get_package_name "$file")
    
    # Skip if not in a package directory
    [ -z "$package_name" ] && continue
    
    # Check if it's a code file
    if is_code_file "$file"; then
        packages_with_code_changes[$package_name]=1
    fi
    
    # Check if it's a changelog file
    if [[ $file =~ CHANGELOG\.md$ ]]; then
        packages_with_changelog_updates[$package_name]=1
    fi
done

# Check if packages with code changes have changelog updates
error_found=0
for package in "${!packages_with_code_changes[@]}"; do
    if [ -z "${packages_with_changelog_updates[$package]}" ]; then
        echo -e "${RED}Error: Package '$package' has code changes but no CHANGELOG.md update${NC}"
        error_found=1
    else
        echo -e "${GREEN}✓ Package '$package' has both code changes and CHANGELOG.md update${NC}"
    fi
done

# Exit with error if any package is missing changelog updates
if [ $error_found -eq 1 ]; then
    echo -e "\n${RED}Commit rejected: Please update packages/web3-xxx/CHANGELOG.md for all modified packages${NC}"
    exit 1
else
    echo -e "\n${GREEN}All package changes have corresponding changelog updates${NC}"
    exit 0
fi