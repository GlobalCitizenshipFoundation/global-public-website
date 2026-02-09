import type { TitledListValue } from "sanity";
import type { AttendanceMode } from "../helpers/getDoc";

export const ATTENDANCE_LIST = [
  { title: "On Site", value: "onSite" },
  { title: "Online", value: "online" },
  { title: "Hybrid", value: "hybrid" },
] as const satisfies readonly TitledListValue<AttendanceMode>[];
