// For advice details
export const handleUpvoteRendering = (upvotes) => {
  // const numberOfUpvotes = upvotes.length - 1; //minus the author
  const numberOfUpvotes = upvotes - 1;
  switch (true) {
    case 0:
      return "No upvotes";

    case numberOfUpvotes === 1:
      return `${numberOfUpvotes} upvote`;

    case numberOfUpvotes > 1:
      return `${numberOfUpvotes} upvotes`;
    // by ${upvotes[1]} and ${
    //   upvotes.length - 1
    // } others

    default:
      return "No upvotes";
  }
};

// For advice card
export const handleVotes = (upvotes) => {
  switch (upvotes) {
    case 0:
      return "";

    default:
      return upvotes;
  }
};
