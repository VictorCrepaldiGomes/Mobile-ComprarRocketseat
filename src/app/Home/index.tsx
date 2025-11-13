import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState } from "react";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export default function Home() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.DONE
  );
  const [items, setItems] = useState<
    {
      id: string;
      description: string;
      status: FilterStatus;
    }[]
  >([]);

  function UpdateStatus(status: FilterStatus) {
    setFilterStatus(status);
  }

  const [description, setDescription] = useState("");

  function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Erro", "A descrição do item não pode ser vazia.");
    }
    const newItem = {
      id: new Date().getTime().toString(),
      description: description,
      status: FilterStatus.PENDING,
    };
    console.log("Item adicionado:", newItem);
    setItems((prevItems) => {
      const next = [...prevItems, newItem];
      console.log("Lista atualizada de itens:", next);
      return next;
    });
    setDescription("");
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder="Oque você precisa comprar?"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          title="Adicionar"
          onPress={() => {
            handleAddItem();
          }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status: FilterStatus) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filterStatus}
              onPress={() => {
                UpdateStatus(status);
              }}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setItems([]);
            }}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => {
                setItems((prev) => prev.filter((i) => i.id !== item.id));
                console.log(`${item.description} removido`);
              }}
              onStatusChange={() => {
                setItems((prev) =>
                  prev.map((i) =>
                    i.id === item.id
                      ? {
                          ...i,
                          status:
                            i.status === FilterStatus.PENDING
                              ? FilterStatus.DONE
                              : FilterStatus.PENDING,
                        }
                      : i
                  )
                );
                console.log(`Status do ${item.description} alterado`);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>Não há itens para mostrar</Text>
          }
        />
      </View>
    </View>
  );
}
