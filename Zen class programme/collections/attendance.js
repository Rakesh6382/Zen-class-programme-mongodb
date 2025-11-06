// attendance
db.attendance.insertMany([
  { user_id: 1, topic_id: 1, date: "2020-10-05", status: "Present" },
  { user_id: 2, topic_id: 2, date: "2020-10-10", status: "Absent" },
  { user_id: 3, topic_id: 1, date: "2020-10-20", status: "Absent" }
]);
