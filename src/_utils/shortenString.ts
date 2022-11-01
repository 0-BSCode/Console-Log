const shortenString = (content: string, limit: number) => {
  return content.length > limit ? `${content.slice(0, limit)}...` : content;
};

export default shortenString;
