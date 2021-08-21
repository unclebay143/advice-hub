// For advice details
export const handleUpvoteRendering = (upvotes) => {
  const numberOfUpvotes = upvotes;
  switch (true) {
    case 0:
      return "No upvotes";

    case numberOfUpvotes === 1:
      return `${numberOfUpvotes} upvote`;

    case numberOfUpvotes > 1:
      // `${numberOfUpvotes} upvotes`;
      return `by ${upvotes[1]} and ${upvotes.length - 1} others`;

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
