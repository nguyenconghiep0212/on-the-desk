import React from "react";
import { useLocation } from "react-router-dom";

export function useQuery(property: string) {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  return query.get(property);
}
