export default function SortBy() {
  return (
    <div className="flex w-min items-center gap-4">
      <label htmlFor="sort-by" className="whitespace-nowrap">
        sort by
      </label>
      <select name="sort-by" id="sort-by">
        <option value="views">most likes</option>
        <option value="rating">rating</option>
        <option value="latest">latest</option>
        <option value="name">by name</option>
      </select>
    </div>
  );
}
