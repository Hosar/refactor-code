const { CandidateHandler } = require('./CandidateHandler');

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
