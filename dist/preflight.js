import { constants } from 'os';
import './suppress-warnings.js';

if (process.send) {
  let relaySignal = function(signal) {
    process.send({
      type: "kill",
      signal
    });
    if (process.rawListeners(signal).length === 1) {
      process.stdin.write("\n");
      process.exit(128 + constants.signals[signal]);
    }
  };
  process.on("SIGINT", relaySignal);
  process.on("SIGTERM", relaySignal);
}
