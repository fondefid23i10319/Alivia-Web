import moment from "moment-timezone";

function formatAlarmTime(
  nextMed: {
    name: string;
    scheduledAt: string;
    time: string;
    timeZone: string;
  } | null
): string {
  if (!nextMed) return "-";

  const { scheduledAt, time, timeZone } = nextMed;

  if (scheduledAt) {
    const tz = timeZone || "UTC";
    const inst = moment.tz(scheduledAt, tz);
    if (inst.isValid()) return inst.format("HH:mm");
  }

  if (time) {
    const tz = timeZone || "UTC";
    const today = moment().tz(tz).format("YYYY-MM-DD");

    const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"];
    const inst = moment.tz(`${today} ${time}`, formats, tz);
    if (inst.isValid()) {
      return inst.format("HH:mm");
    }

    const parts = time.split(":");
    if (parts.length >= 2) {
      const hhmm = `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
      const inst2 = moment.tz(`${today} ${hhmm}`, "YYYY-MM-DD HH:mm", tz);
      if (inst2.isValid()) return inst2.format("HH:mm");
    }

    return time.slice(0, 5);
  }

  return "-";
}

export default formatAlarmTime;
