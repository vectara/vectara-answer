export const getTrackingProps = (track?: boolean) => {
  if (track) {
    return {
      // Protect against tabnabbing.
      rel: "noopener",
      // Provide information for tracking, e.g. to docs.
      referrerpolicy: "no-referrer-when-downgrade"
    };
  }
  // Protect against tabnabbing and strip information from the referrer header.
  return {
    rel: "noopener"
    // Default referrer policy is set by a meta tag in index.html.
  };
};
