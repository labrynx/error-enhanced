#!/bin/bash
# Abort script on error
set -e

echo "Importing GPG key..."

# Decode the GPG key
echo "$GPG_BASE64" | base64 --decode > ./gpg_key.gpg

# Import the GPG key
gpg --batch --import ./gpg_key.gpg

# Configure Git to use the GPG key
git config --global user.signingkey "$(gpg --list-secret-keys --keyid-format LONG --with-colons | grep sec | awk -F: '{print $5}')"
git config --global commit.gpgsign true
