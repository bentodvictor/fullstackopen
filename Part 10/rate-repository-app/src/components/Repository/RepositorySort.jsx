import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

export default function RepositorySort({ sort, setSort }) {
  return (
    <View>
      <Picker
        selectedValue={sort}
        onValueChange={(value) => {
          setSort(value);
        }}
      >
        <Picker.Item
          label="Earliest repositories"
          value={{ orderDirection: "ASC", orderBy: "CREATED_AT" }}
        />
        <Picker.Item
          label="Latest repositories"
          value={{ orderDirection: "DESC", orderBy: "CREATED_AT" }}
        />
        <Picker.Item
          label="Highest rated repositories"
          value={{ orderDirection: "DESC", orderBy: "RATING_AVERAGE" }}
        />
        <Picker.Item
          label="Lowest rated repositories"
          value={{ orderDirection: "ASC", orderBy: "RATING_AVERAGE" }}
        />
      </Picker>
    </View>
  );
}
