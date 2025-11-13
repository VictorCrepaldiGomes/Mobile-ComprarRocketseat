import { View, Image } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="Oque você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <Filter status={FilterStatus.DONE} isActive />
        <Filter status={FilterStatus.PENDING} />
      </View>
    </View>
  );
}
