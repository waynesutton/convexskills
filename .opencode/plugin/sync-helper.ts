/**
 * Sync Helper Plugin for OpenCode
 *
 * Provides helpful reminders when content files are edited.
 * Minimal implementation - just logging, no auto-sync.
 */

import type { Plugin } from "@opencode-ai/plugin";

export const SyncHelper: Plugin = async ({ client }) => {
  // Track if we've reminded recently to avoid spam
  let lastReminder = 0;
  const REMINDER_COOLDOWN = 30000; // 30 seconds

  return {
    hooks: {
      // When a file is edited
      "file.edited": async (event) => {
        const path = event.path;

        // Check if it's a content file
        if (
          path.startsWith("content/blog/") ||
          path.startsWith("content/pages/")
        ) {
          const now = Date.now();

          // Only remind if cooldown has passed
          if (now - lastReminder > REMINDER_COOLDOWN) {
            lastReminder = now;
            await client.app.log(
              "info",
              `Content changed: ${path} - Run /sync to publish`
            );
          }
        }
      },

      // When session becomes idle
      "session.idle": async () => {
        // Could add pending sync detection here in the future
      },
    },
  };
};

export default SyncHelper;
