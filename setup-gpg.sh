#!/bin/bash
# Abort script on error
set -e

echo "Importing GPG key..."

#!/bin/bash
# Abort script on error
set -e

echo "Debugging: Start -> ${GPG_KEY:0:30} ... End -> ${GPG_KEY: -30}"
echo "Importing GPG key..."

# Import the GPG key
echo "$GPG_KEY" | gpg --batch --import

# Configure Git to use the GPG key
git config --global user.signingkey "$(gpg --list-secret-keys --keyid-format LONG --with-colons | grep sec | awk -F: '{print $5}')"
git config --global commit.gpgsign true
