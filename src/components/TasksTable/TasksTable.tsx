import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from "antd";

import { AppDispatch, RootState } from "../../state/store";
import { getTasks, Task, updateTask } from "../../state/tasksSlice";

function TasksTable() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const userIds = useMemo(() => {
    const ids = Array.from(
      new Set(tasks.map((task: { userId: string }) => task.userId))
    );

    return ids.map((id) => {
      return {
        text: `${id}`,
        value: id,
      };
    });
  }, [tasks]);

  const tasksTitles = useMemo(() => {
    const ids = Array.from(
      new Set(tasks.map((task: { title: string }) => task.title))
    );

    return ids.map((title) => {
      return {
        text: `${title}`,
        value: title,
      };
    });
  }, [tasks]);

  const handleChange = useCallback(
    (checked: boolean, record: Task) => {
      dispatch(updateTask({ ...record, completed: checked }));
      setEditingRow(null);
    },
    [dispatch]
  );

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      filters: userIds,
      onFilter: (value: boolean, record: { userId: boolean }) =>
        record.userId === value,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: tasksTitles,
      onFilter: (value: boolean, record: { title: boolean }) =>
        record.title === value,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean, record: Task) => {
        if (editingRow === record.id) {
          return (
            <Checkbox
              autoFocus
              checked={completed}
              title={completed ? "Completed" : "Not Completed"}
              onChange={(e) => {
                handleChange(e.target.checked, record);
              }}
            >
              Completed
            </Checkbox>
          );
        } else {
          return (
            <div onDoubleClick={() => setEditingRow(record.id)}>
              {completed ? "Completed" : "Not Completed"}
            </div>
          );
        }
      },
      filters: [
        { text: "Completed", value: true },
        { text: "Not Completed", value: false },
      ],
      onFilter: (value: boolean, record: { completed: boolean }) =>
        record.completed === value,
    },
  ];

  return (
    <Table
      dataSource={tasks}
      columns={columns}
      pagination={{ pageSize: 10 }}
      className="tasks-table"
    />
  );
}

export default TasksTable;
