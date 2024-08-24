import { Status } from "@/@types";
import { COLORS } from "@/constants/colors";

const colors: Record<Status, string> = {
  [Status.pending]: COLORS.yellow,
  [Status.done]: COLORS.green,
  [Status.wontdo]: COLORS.red,
};

export const getStatusColor = (status: Status): string => colors[status];
