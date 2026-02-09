export type PricingStatus = "free" | "paid";
export type AttendanceMode = "onSite" | "online" | "hybrid";

export type EventDoc = Partial<{
  pricing: PricingStatus;
  startDateTime: string;
  endDateTime: string;
  attendanceMode: AttendanceMode;
}>;

export function getDoc(ctx: { document?: unknown }): EventDoc {
  return (ctx.document ?? {}) as EventDoc;
}
