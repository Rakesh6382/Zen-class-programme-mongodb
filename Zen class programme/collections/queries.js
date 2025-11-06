// --- Queries ---

// 1️⃣ Find all the topics and tasks which are taught in the month of October
db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });
db.tasks.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });

// 2️⃣ Find all the company drives between 15-Oct-2020 and 31-Oct-2020
db.company_drives.find({ date: { $gte: "2020-10-15", $lte: "2020-10-31" } });

// 3️⃣ Find all the company drives and students who are appeared for the placement
db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "students_appeared",
      foreignField: "user_id",
      as: "appeared_students"
    }
  }
]);

// 4️⃣ Find the number of problems solved by the user in codekata
db.codekata.aggregate([
  { $group: { _id: "$user_id", total_problems: { $sum: "$problems_solved" } } }
]);

// 5️⃣ Find all the mentors with mentee count more than 15
db.mentors.find({ mentee_count: { $gt: 15 } });

// 6️⃣ Find the number of users who were absent and task not submitted between 15-Oct-2020 and 31-Oct-2020
db.attendance.aggregate([
  {
    $match: {
      date: { $gte: "2020-10-15", $lte: "2020-10-31" },
      status: "Absent"
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "user_id",
      foreignField: "user_id",
      as: "user_tasks"
    }
  },
  {
    $match: { "user_tasks.submitted": false }
  },
  {
    $count: "absent_and_not_submitted"
  }
]);
