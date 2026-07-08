// Pulls the `causes` collection from Firestore and writes it into _data/canapi.json, which is what the 11ty build actually reads from.
// Test causes (isTest: true) are dropped here so no page/script in this site ever has to filter them out itself.

// On failure, this script leaves _data/canapi.json untouched

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const DATA_PATH = path.join(__dirname, "../_data/canapi.json");
const PROJECT_ID = "terrabyte-canapi";

// Firestore Timestamps don't survive JSON.stringify — convert to ISO strings.
function serializeCause(data) {
  const result = {};
  for (const [key, val] of Object.entries(data)) {
    result[key] = val && typeof val.toDate === "function" ? val.toDate().toISOString() : val;
  }
  return result;
}

async function main() {
  const existing = fs.existsSync(DATA_PATH) ? JSON.parse(fs.readFileSync(DATA_PATH, "utf8")) : {};

  let causes;
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: PROJECT_ID,
    });

    const snapshot = await admin.firestore().collection("causes").get();

    if (snapshot.empty) {
      throw new Error("The `causes` collection returned zero documents — refusing to overwrite existing data with an empty set.");
    }

    causes = snapshot.docs
      .map(doc => ({ causeId: doc.id, ...serializeCause(doc.data()) }))
      .filter(cause => !cause.isTest);

    if (causes.length === 0) {
      throw new Error("Every cause returned was a test cause — refusing to overwrite existing data with an empty set.");
    }
  } catch (err) {
    console.warn(`[sync-causes] Could not sync from Firestore — keeping the existing _data/canapi.json as-is.\n[sync-causes] Reason: ${err.message}`);
    return;
  }

  const updated = { ...existing, causes };

  // Write to a temp file first, then rename, so a crash mid-write can't
  // corrupt the committed data file.
  const tmpPath = `${DATA_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(updated, null, 2) + "\n");
  fs.renameSync(tmpPath, DATA_PATH);

  console.log(`[sync-causes] Synced ${causes.length} cause(s) from Firestore into _data/canapi.json`);
}

main().then(() => process.exit(0));
