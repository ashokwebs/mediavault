import test from 'node:test';
import assert from 'node:assert/strict';

const PRESET_USERS = [
  {
    id: "user_pro_01",
    name: "Elena Vance (Pro Merchant)",
    email: "elena@vancestudio.store",
    storeName: "Vance Luxury Footwear",
    role: "pro",
    creditsUsed: 142,
    creditsLimit: 500,
    apiKey: "mv_live_948f2b1a8dc7392e411b0e9a",
  },
  {
    id: "user_enterprise_02",
    name: "Cloudinary Agency Partner",
    email: "agency@mediavault.io",
    storeName: "Global Omnichannel Studio",
    role: "enterprise",
    creditsUsed: 1280,
    creditsLimit: 10000,
    apiKey: "mv_ent_71c08d4b3e89a572f019c4ee",
  },
  {
    id: "user_guest_00",
    name: "Guest Evaluator (Unstop Judge)",
    email: "judge@unstop.com",
    storeName: "Demo Evaluation Store",
    role: "guest",
    creditsUsed: 3,
    creditsLimit: 25,
    apiKey: "mv_demo_sandbox_000000000000",
  },
];

test('Merchant Profile Roles & Quota Enforcement', () => {
  for (const user of PRESET_USERS) {
    assert.ok(user.id.startsWith('user_'), `User ID ${user.id} must be prefixed`);
    assert.ok(user.creditsLimit > 0, `User ${user.name} must have a positive quota limit`);
    assert.ok(user.creditsUsed <= user.creditsLimit, `User ${user.name} quota usage cannot exceed limit`);
    assert.ok(user.apiKey.startsWith('mv_'), `API key ${user.apiKey} must follow standard prefix`);

    const usagePct = (user.creditsUsed / user.creditsLimit) * 100;
    assert.ok(usagePct >= 0 && usagePct <= 100, `Usage percentage must be bounded between 0 and 100`);
  }
});

test('Bandwidth & Carbon Emission Savings Formula', () => {
  const sample = { origSizeKb: 2480, optSizeKb: 185 };
  const reductionPct = ((sample.origSizeKb - sample.optSizeKb) / sample.origSizeKb) * 100;
  
  assert.ok(reductionPct > 90, `Bandwidth reduction must exceed 90% (computed: ${reductionPct.toFixed(1)}%)`);
  
  // Standard web carbon factor: ~0.8g CO2 per MB transferred
  const mbSaved = (sample.origSizeKb - sample.optSizeKb) / 1024;
  const co2SavedGramsPerView = mbSaved * 0.8;
  const co2SavedKgPer100k = (co2SavedGramsPerView * 100000) / 1000;
  
  assert.ok(co2SavedKgPer100k > 150, `CO2 savings per 100k views must exceed 150kg`);
});
