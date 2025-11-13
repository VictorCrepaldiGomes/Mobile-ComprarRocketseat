import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

import { FilterStatus } from "@/types/FilterStatus";
type Props = TouchableOpacityProps & {
  status: FilterStatus;
  isActive?: boolean;
};

export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={[styles.title, !isActive && styles.opacity]}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
