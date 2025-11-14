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
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/index";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.DONE
  );
  const [items, setItems] = useState<ItemStorage[]>([]);

  function UpdateStatus(status: FilterStatus) {
    setFilterStatus(status);
  }

  const [description, setDescription] = useState("");

  async function handleAddItem() {
    if (!description.trim()) {
      Alert.alert(
        "Descrição inválida",
        "Por favor, insira uma descrição válida."
      );
      return;
    }

    const newItem = {
      id: String(new Date().getTime()),
      status: FilterStatus.PENDING,
      description: description.trim(),
    };

    await itemsStorage.add(newItem);

    Alert.alert(
      "Item adicionado",
      `"${newItem.description}" foi adicionado à lista.`
    );
    setDescription("");
    setFilterStatus(FilterStatus.PENDING);
  }

  async function ItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filterStatus);
      setItems(response);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    ItemsByStatus();
  }, [filterStatus]);

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
            onPress={async () => {
              if (items.length === 0) {
                Alert.alert("A lista já está vazia.");
                return;
              }
              Alert.alert(
                "Limpar lista",
                "Tem certeza que deseja limpar todos os itens?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Limpar",
                    onPress: async () => {
                      await itemsStorage.clearAllItems();
                      setItems([]);
                    },
                    style: "destructive",
                  },
                ]
              );
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
                Alert.alert(
                  "Remover item",
                  `Tem certeza que deseja remover "${item.description}"?`,
                  [
                    {
                      text: "Cancelar",
                    },
                    {
                      text: "Remover",
                      onPress: async () => {
                        const updatedItems = await itemsStorage.remove(item.id);
                        setItems(updatedItems);
                        console.log(`Item ${item.description} removido`);
                      },
                      style: "destructive",
                    },
                  ]
                );
              }}
              onStatusChange={async () => {
                const newStatus =
                  item.status === FilterStatus.PENDING
                    ? FilterStatus.DONE
                    : FilterStatus.PENDING;
                const updatedItems = await itemsStorage.toggleStausItems(
                  item.id,
                  newStatus
                );
                setItems(updatedItems);
                console.log(
                  `Item ${item.description} status alterado para ${newStatus}`
                );
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
