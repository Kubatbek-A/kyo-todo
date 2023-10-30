export const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

export const isEditorsText = (content: string) => {
  try {
    const parsedContent = JSON.parse(content);

    return (
      Object.hasOwn(parsedContent, "time") &&
      Object.hasOwn(parsedContent, "blocks")
    );
  } catch {
    return false;
  }
};

export const isEditorContent = (
  content: object,
): content is typeof DEFAULT_INITIAL_DATA => {
  return Object.hasOwn(content, "time") && Object.hasOwn(content, "blocks");
};
