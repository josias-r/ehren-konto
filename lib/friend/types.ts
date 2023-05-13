type FriendShape = {
  id: string;
  user: Pick<UserShape, "avatar" | "nick" | "name">;
};
