type CookingTimeRange = {
  min: number;
  max: number;
};
export default function shortenCookingTimeRanges(selectedCheckboxes: string[]) {
  if (selectedCheckboxes.length > 0) {
    const ranges: CookingTimeRange[] = selectedCheckboxes.map((checkbox) => {
      const [min, max] = checkbox.split("-").map(Number);
      return { min, max } as CookingTimeRange;
    });

    ranges.sort((a, b) => a.min - b.min);

    const combinedRanges: CookingTimeRange[] = [ranges[0]!];

    for (let i = 1; i < ranges.length; i++) {
      const currentRange = ranges[i]!;
      const lastCombinedRange = combinedRanges[combinedRanges.length - 1]!;

      if (currentRange.min <= lastCombinedRange.max)
        lastCombinedRange.max = Math.max(
          lastCombinedRange.max,
          currentRange.max,
        );
      else combinedRanges.push(currentRange);
    }

    return combinedRanges.map((range) => `${range.min}-${range.max}`);
    // .join(",");
  } else return [];
}
