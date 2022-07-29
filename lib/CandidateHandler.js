const { createHash } = require('./Utils');

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

  module.exports = { CandidateHandler };