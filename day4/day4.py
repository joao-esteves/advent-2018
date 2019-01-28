import re
from collections import defaultdict, namedtuple
from datetime import datetime

Event = namedtuple('Event', ['date', 'type', 'guard_id'])

event_regex = re.compile(r"\[(.+)\] (.+)")
desc_specification = [
    ('BEGINS_SHIFT', r'Guard #(\d+) begins shift'),
    ('WAKES_UP', r'wakes up'),
    ('FALLS_ASLEEP', r'falls asleep')
]
event_desc_regex = re.compile('|'.join('(?P<%s>%s)' % pair for pair in desc_specification))

# [YYYY-MM-DD HH:mm] Desc
# Desc = "Guard #N begins shift" or "falls asleep" or "wakes up"
def parse_event(line: str) -> Event:
    matched = event_regex.match(line)
    date = datetime.strptime(matched.group(1), "%Y-%m-%d %H:%M")
    desc = event_desc_regex.match(matched.group(2))
    type = desc.lastgroup
    if type == 'BEGINS_SHIFT':
        guard_id = desc.group(2)
    else:
        guard_id = -1

    return Event(date, type, guard_id)

def parse_events(lines):
    events = []
    for line in lines:
        events.append(parse_event(line))
    return events

def read_input(filename):
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    events = parse_events(lines)
    events.sort(key=lambda event: event.date)
    assign_guards(events)
    return events

def assign_guards(events):
    previous_id = -1
    for event in events:
        if event.guard_id == -1:
            event = event._replace(guard_id = previous_id)
            print(event)
        else:
            previous_id = event.guard_id

def get_strat1(events):
    # {guard_id: {minute: freq}}
    d = defaultdict(lambda: defaultdict(lambda: 0))

    for i, event in enumerate(events):
        if event.type == 'WAKES_UP':
            lower_min = events[i-1].date.minute
            max_min = event.date.minute - 1
            d[event.guard_id][minute] for minute in range(lower_min, max_min)
    print(d)
    return

ordered_events = read_input("input.txt")
print("Strategy 1: " + get_strat1(ordered_events))