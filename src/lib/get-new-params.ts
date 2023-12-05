export default function getNewParams(
  pathname: string,
  newParams: Record<string, string[] | string>,
) {
  const urlSearchParams = new URLSearchParams();
  for (const paramKey in newParams)
    newParams[paramKey]!.length > 0 &&
      urlSearchParams.set(paramKey, newParams[paramKey]!.toString());

  return `${pathname}?${urlSearchParams.toString().replace(/%2C/g, ",")}`;
  // return ${}
}
