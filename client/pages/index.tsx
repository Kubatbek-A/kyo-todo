/* eslint-disable react/jsx-key */
import BigTableWithControls from "@/UI/BigTableWithControls/BigTableWithControls";
import { Button } from "@/UI/Button/Button";
import Modal from "@/UI/CustomModal/Modal";
import { Icon } from "@/UI/Icon/Icon";
import Select from "@/UI/RoundSelect/Select";
import Search from "@/UI/Search/Search";
import SortButton from "@/UI/SortButton/SortButton";
import TaskItem from "@/components/TaskItem/TaskItem";
import { GetTasksVariables } from "@/api/task/getTasks";
import AddDescription from "@/components/AddDescription/AddDescription";
import NewTask from "@/components/NewTask/NewTask";
import { DeepPartial } from "@/helpers/deepPartial";
import { TaskStatus } from "@/helpers/enums";
import { useGetTasks } from "@/hooks/task/useGetTasks";
import { useLastRoute } from "@/hooks/useLastRoute/useLastRoute";
import Layout from "@/layouts/Layout";
import { useState } from "react";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";
import Header from "@/components/Header/Header";

const Page = {
  FastButtons: styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Table: styled.div`
    margin-top: 32px;
  `,
  AlignRight: styled.div<{ $withOffset: boolean }>`
    margin-left: auto;
    padding-right: ${({ $withOffset }) => ($withOffset ? "10px" : "")};
  `,
  StyledHeaderButton: styled(Button)`
    height: 54px;
  `,
};

const getCurrentShowCount = (meta: IPagination) => {
  if (meta.itemCount < meta.limit) {
    return meta.itemCount;
  }

  return meta.limit;
};

const INITIAL_TASK = {
  title: "",
  dueDate: "",
  id: "",
  status: "",
  description: "",
  collaborators: [],
  createdAt: "",
  updatedAt: "",
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;

  if (!req.cookies.accessToken) {
    return {
      redirect: {
        destination: `/auth/login`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function HomePage() {
  const [rules, setRules] = useState<DeepPartial<GetTasksVariables>>({});
  const [searchValue, setSearchValue] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCompleteTaskModalOpen, setIsCompleteTaskModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"create" | "edit">("create");
  const [taskToEdit, setTaskToEdit] = useState<ITask>(INITIAL_TASK);

  const {
    data: tasksData,
    isRefetching,
    isLoading,
    isFetching,
    refetch,
  } = useGetTasks(rules);

  const tasks = tasksData?.data ?? [];

  const { updateQuery, resetQuery } = useLastRoute(
    {
      filter: ["dueDate", "status"],
    },
    setRules,
    [["search", setSearchValue]],
  );

  const handleEdit = (task: ITask) => {
    setActionType("edit");
    setIsTaskModalOpen(true);
    setTaskToEdit(task);
  };

  const handleCreate = () => {
    setActionType("create");
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(INITIAL_TASK);
  };

  const handleAddDescription = (task: ITask) => {
    setIsCompleteTaskModalOpen(true);
    setTaskToEdit(task);
  };

  const handleCloseDescriptionModal = () => {
    setIsCompleteTaskModalOpen(false);
    setTaskToEdit(INITIAL_TASK);
  };

  const isResetVisible = Object.keys(rules).every((key) => {
    const nested = rules[key as keyof typeof rules];
    if (typeof nested === "object") {
      return !Object.keys(nested).length;
    }
    return !!nested;
  });

  return (
    <>
      <Modal
        isVisible={isTaskModalOpen}
        onClose={handleCloseModal}
        contentProps={{ $width: "760px" }}
      >
        <NewTask
          refetch={refetch}
          actionType={actionType}
          taskToEdit={taskToEdit}
          onClose={handleCloseModal}
        ></NewTask>
      </Modal>
      <Modal
        isVisible={isCompleteTaskModalOpen}
        onClose={handleCloseDescriptionModal}
        contentProps={{ $width: "760px" }}
      >
        <AddDescription
          refetch={refetch}
          taskToEdit={taskToEdit}
          onClose={handleCloseDescriptionModal}
        ></AddDescription>
      </Modal>
      <Layout isLoading={isLoading}>
        <Header />
        <Page.FastButtons>
          <Page.StyledHeaderButton
            type="primary"
            onClick={handleCreate}
            aria-label="New Task"
            icon={<Icon name="icon-17-big-plus" className="icon-primary" />}
          >
            New Task
          </Page.StyledHeaderButton>
        </Page.FastButtons>
        <Page.Table>
          <BigTableWithControls
            onResetControls={() => {
              setRules({});
              setSearchValue("");
              resetQuery();
            }}
            hideResetControls={isResetVisible}
            isLoading={isRefetching || isLoading || isFetching}
            headerSearch={
              <Search
                onSearch={(search) => {
                  setRules((old) => {
                    const queries = {
                      ...old,
                      filter: { ...old.filter, search },
                      page: old.page?.page ? { page: 1 } : {},
                    };
                    if (!search.trim()) {
                      // @ts-ignore
                      delete queries.filter.search;
                    }
                    return queries;
                  });
                  updateQuery({ search, page: "" });
                }}
                outerValue={searchValue}
                onChange={(value) => setSearchValue(value)}
              ></Search>
            }
            headerButtons={[
              <Select
                onSelect={(option) => {
                  setRules((old) => ({
                    ...old,
                    filter: {
                      ...old.filter,
                      status: option.value as TaskStatus,
                    },
                    page: old.page?.page ? { page: 1 } : {},
                  }));
                  updateQuery({ status: option.value, page: "" });
                }}
                activeOption={rules.filter?.status || ""}
                options={[
                  {
                    value: "todo",
                    label: "Todo",
                  },
                  {
                    value: "completed",
                    label: "Completed",
                  },
                ]}
                placeholder="Status"
              ></Select>,
            ]}
            sortButtons={[
              <SortButton isDecorative></SortButton>,

              <SortButton isDecorative>Title</SortButton>,
              <SortButton
                onClick={(isToLarge) => {
                  setRules((old) => ({
                    ...old,
                    sort: {
                      sortBy: "dueDate",
                      sortAt: isToLarge ? "ASC" : "DESC",
                    },
                  }));
                  updateQuery({
                    sortBy: "dueDate",
                    sortAt: isToLarge ? "ASC" : "DESC",
                  });
                }}
                defaultIsToLarge={rules.sort?.sortAt === "ASC"}
                isActive={rules.sort?.sortBy === "dueDate"}
              >
                Due date
              </SortButton>,
              <SortButton
                onClick={(isToLarge) => {
                  setRules((old) => ({
                    ...old,
                    sort: {
                      sortBy: "status",
                      sortAt: isToLarge ? "ASC" : "DESC",
                    },
                  }));
                  updateQuery({
                    sortBy: "status",
                    sortAt: isToLarge ? "ASC" : "DESC",
                  });
                }}
                defaultIsToLarge={rules.sort?.sortAt === "ASC"}
                isActive={rules.sort?.sortBy === "status"}
              >
                Status
              </SortButton>,
              <SortButton isDecorative>Result</SortButton>,
              <SortButton isDecorative>Collaborators</SortButton>,

              <Page.AlignRight $withOffset={Object.keys(rules).length !== 0}>
                <SortButton isDecorative>
                  {`${
                    tasksData
                      ? `Showing ${getCurrentShowCount(tasksData.meta)} out
                    of ${tasksData?.meta.itemCount}`
                      : ""
                  }`}
                </SortButton>
              </Page.AlignRight>,
            ]}
            items={() =>
              tasks.map((task) => (
                <TaskItem
                  refetch={refetch}
                  task={task}
                  editTask={handleEdit}
                  addDescription={handleAddDescription}
                ></TaskItem>
              ))
            }
            pagination={tasksData?.meta}
            onChangePage={(page) => {
              setRules((prev) => ({
                ...prev,
                page: {
                  ...prev.page,
                  page,
                },
              }));
              updateQuery({ page });
            }}
          ></BigTableWithControls>
        </Page.Table>
      </Layout>
    </>
  );
}
