interface ITask {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
  collaborators: ICollaborator[];
  createdAt: string;
  updatedAt: string;
}

interface ICollaborator {
  id: string;
  taskId: string;
  userId: string;
  users: IUser;
  createdAt: string;
  updatedAt: string;
  deleteddAt: string;
}

interface IUser {
  id: string;
  googleId: string;
  controlToken: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleteddAt: string;
}

type ITaskCreating = {
  title: string;
  dueDate: string;
  dueTime: string;
};

type ITaskDescriptionCreating = {
  description: string;
};

type ITaskUpdating = {
  id: string;
  title?: string;
  dueDate?: string;
  dueTime?: string;
  description?: string;
};
