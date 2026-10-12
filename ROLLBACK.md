# Restore the previous portfolio

The original website is preserved on `master` at commit `3f655ec84c055919839c9210ffc7e9086ad7fb1a` and at the annotated tag `site-before-redesign-2026-10-12`. Promotion of the redesign creates `main` without rewriting or deleting the old history.

## Restore the original site

1. In the GitHub repository, open **Settings → Pages**.
2. Change **Source** to **Deploy from a branch**.
3. Select **master** and **/ (root)**, then save.
4. Wait for the Pages build to finish and verify https://tritammohanty.github.io/.

Keep `main` unchanged while the original site is active. A production workflow on `main` should not be dispatched during this rollback. If `master` has subsequently changed, restore the tagged original files to a separate recovery branch and select that branch as the Pages source. No force push or history deletion is needed.

## Restore the redesign afterward

Change Pages **Source** back to **GitHub Actions**, then run **Deploy portfolio to GitHub Pages** from `main` in the Actions tab. Verify the completed deployment before treating it as restored.

Rollback is available on request; it is not automatic. Future redesign versions also remain in Git history and can be reverted through new commits on `main`.
