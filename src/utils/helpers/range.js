function range(start, end, step) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => step * (start + idx));
}

export default range;
