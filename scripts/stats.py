import json
import sys


class StudyStats:
    def __init__(self, sessions):
        self.sessions = sessions

    def summarize(self):
        totals = {"focus": 0, "break": 0, "count": 0}
        for item in self.sessions:
            mode = item.get("mode", "focus")
            mins = int(item.get("minutes", 0))
            if mode == "focus":
                totals["focus"] += mins
            elif mode == "break":
                totals["break"] += mins
            else:
                continue
            totals["count"] += 1
        return totals

    def format_report(self):
        data = self.summarize()
        return f"Sessions: {data['count']} | Focus: {data['focus']}m | Break: {data['break']}m"


if __name__ == "__main__":
    raw = sys.stdin.read().strip() or "[]"
    try:
        records = json.loads(raw)
    except json.JSONDecodeError:
        records = []
    stats = StudyStats(records)
    print(stats.format_report())
