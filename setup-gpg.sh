#!/bin/bash
# Abort script on error
set -e

# Debugging: Show the first and last 30 characters of the GPG key
echo "Debugging: Start -> ${GPG_KEY:0:30} ... End -> ${GPG_KEY: -30}"

echo "Importing GPG key..."

# Import the GPG key
echo "$GPG_KEY" | gpg --batch --import

# Add loopback pinentry configuration
echo "allow-loopback-pinentry" >> ~/.gnupg/gpg-agent.conf
gpgconf --reload gpg-agent

# Configure Git to use the GPG key
git config --global user.signingkey "$(gpg --list-secret-keys --keyid-format LONG --with-colons | grep sec | awk -F: '{print $5}')"
git config --global commit.gpgsign true
