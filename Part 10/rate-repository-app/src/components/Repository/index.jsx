import { useState } from "react";
import { View } from "react-native";
import { useDebounce } from "use-debounce";
import useRepositories from "../../hooks/useRepositories";
import Text from "../Text";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sort, setSort] = useState({
    orderDirection: "DESC",
    orderBy: "CREATED_AT",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 600);

  const { repositories, loading, fetchMore } = useRepositories({
    first: 3,
    orderDirection: sort.orderDirection,
    orderBy: sort.orderBy,
    searchQuery: debouncedSearch,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      setSort={setSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
