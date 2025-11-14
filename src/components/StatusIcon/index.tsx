import { FilterStatus } from "@/types/FilterStatus";

import { CircleDashed, CircleCheck } from "lucide-react-native";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.PENDING ? (
    <CircleDashed color="#000000" />
  ) : (
    <CircleCheck color="#34C759" />
  );
}
