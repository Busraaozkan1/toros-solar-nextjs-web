import assert from "node:assert/strict";
import test from "node:test";
import {
  buildApplianceQuoteMessage,
  buildBillQuoteMessage,
  buildPumpQuoteMessage,
  estimateApplianceNeeds,
  estimateMonthlyNeeds,
  estimatePanelCount,
  estimatePumpNeeds,
} from "../lib/solarEstimator.ts";

test("summer panel estimates use a conservative 600 W basis and always round up", () => {
  assert.equal(estimatePanelCount(3), 1);
  assert.equal(estimatePanelCount(3.01), 2);
});

test("appliance estimates keep power and energy separate", () => {
  const result = estimateApplianceNeeds({ buzdolabi: 1, klima: 1 });

  assert.equal(result.loadKw, 1.8);
  assert.equal(result.dailyKwh, 7.5);
  assert.equal(result.panelCount, 3);
});

test("bill estimates treat the input as a 12-month monthly average", () => {
  const result = estimateMonthlyNeeds(350);

  assert.equal(result.dailyKwh, 11.5);
  assert.equal(result.panelCount, 4);
});

test("pump estimates account for motor efficiency, operating hours, and array headroom", () => {
  const result = estimatePumpNeeds(3, 6);

  assert.equal(result.electricalKw, 2.8);
  assert.equal(result.panelCount, 6);
});

test("appliance WhatsApp message lists inputs and explicitly requests a quote", () => {
  const message = buildApplianceQuoteMessage({ buzdolabi: 1, klima: 2 });

  assert.match(message, /güneş enerjisi sistemi teklifi almak istiyorum/i);
  assert.match(message, /1× Buzdolabı \/ dondurucu/);
  assert.match(message, /2× Klima/);
  assert.doesNotMatch(message, /600\s*W|panel|inverter|batarya|marka|model/i);
});

test("bill and pump WhatsApp messages clearly request a quote without product suggestions", () => {
  const billMessage = buildBillQuoteMessage(350);
  const pumpMessage = buildPumpQuoteMessage(3, 6, "trifaze");

  assert.match(billMessage, /350 kWh/);
  assert.match(billMessage, /teklif almak istiyorum/i);
  assert.match(pumpMessage, /3 HP/);
  assert.match(pumpMessage, /6 saat\/gün/);
  assert.match(pumpMessage, /trifaze/i);
  assert.match(pumpMessage, /teklif almak istiyorum/i);
  assert.doesNotMatch(`${billMessage}\n${pumpMessage}`, /600\s*W|panel|inverter|batarya|marka|model/i);
});
