import { FlatList, Pressable, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { ItemSeparator } from "./ItemSeparator";
import Repository from "./Repository";
import RepositorySort from "./RepositorySort";

const RepositoryListContainer = ({
  repositories,
  sort,
  setSort,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories?.edges?.map((edge) => edge.node)
    : [];

  const singleRepository = ({ id }) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => singleRepository(item)}>
          <Repository item={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <RepositorySort sort={sort} setSort={setSort} />
        </View>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryListContainer;
