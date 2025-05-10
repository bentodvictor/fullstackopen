import { FlatList, View } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import Text from "../Text";
import { ItemSeparator } from "./ItemSeparator";
import Repository from "./Repository";
import RepositoryReview from "./RepositoryReview";

const singleRepository = () => {
  const { id } = useParams();
  const { loading, repository, fetchMore } = useRepository({ id, first: 3 });

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
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <RepositoryReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <Repository showUrl={true} item={repository} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default singleRepository;
