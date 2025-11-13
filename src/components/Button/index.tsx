import { TouchableOpacity, Text, View} from "react-native";

import { styles } from "./styles";

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

export function Button({title, onPress}: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}