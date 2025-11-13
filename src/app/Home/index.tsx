import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
const ITEMS = [
  { id: "1", status: FilterStatus.PENDING, description: "Café" },
  { id: "2", status: FilterStatus.DONE, description: "Maçã" },
  { id: "3", status: FilterStatus.PENDING, description: "Banana" },
  
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="Oque você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status: FilterStatus) => (
            <Filter
              key={status}
              status={status}
              isActive={status === FilterStatus.PENDING}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => {
                console.log(`${item.description} removido`);
              }}
              onStatusChange={() => {
                console.log(`Status do ${item.description} alterado`);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.empty}>Não há itens para mostrar</Text>}
        />
      </View>
    </View>
  );
}
