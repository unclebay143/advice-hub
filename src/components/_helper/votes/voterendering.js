// For advice card
export const handleVotes = (upvotes) => {
  switch (upvotes) {
    case 0:
      return "";

    default:
      return upvotes;
  }
};
