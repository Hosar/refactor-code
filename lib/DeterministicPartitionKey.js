const crypto = require("crypto");

const createHash = (info) => {
  return crypto.createHash("sha3-512").update(info).digest("hex");
};

class CandidateHandler {
  constructor() {
    this.candidate = null;
  }

  createCandidate(event) {
    if (!event.partitionKey) {
      const data = JSON.stringify(event);
      this.candidate = createHash(data);
      return this;
    }
    this.candidate = event.partitionKey;
    return this;
  }

  getCandidateAsString() {
    if (typeof this.candidate === "string") {
      return this;
    }

    this.candidate = JSON.stringify(this.candidate);
    return this;
  }

  getCandidateWithMaxLength() {
    const MAX_PARTITION_KEY_LENGTH = 256;
    if (this.candidate.length > MAX_PARTITION_KEY_LENGTH) {
      this.candidate = createHash(this.candidate);
    }

    return this;
  }

  build() {
    return this.candidate;
  }
}

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidateHandler = new CandidateHandler();
  const candidate = candidateHandler
    .createCandidate(event)
    .getCandidateAsString()
    .getCandidateWithMaxLength()
    .build();

  return candidate;
};

module.exports = { deterministicPartitionKey };
