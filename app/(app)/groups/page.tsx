import GroupCard from "@/lib/group/GroupCard";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import getAllFriendsForUser from "@/lib/friend/getAllFriendsForUser";
import CreateGroupSheet from "@/lib/group/CreateGroupSheet";
import getAllGroupsForUser from "@/lib/group/getAllGroupsForUser";
import { getUserId } from "@/lib/auth/getUserId";

export const metadata = {
  title: "Groups",
  description: "All groups you are a member of.",
};

export default async function Groups() {
  const userId = await getUserId();

  // get all groups from prisma where user with id "X" is in
  const groups = await getAllGroupsForUser(userId);

  const { userGroups, userFriends } = await getAllFriendsForUser(userId);

  return (
    <main className="relative">
      <h1 className="text-2xl font-bold mb-4 mx-auto max-w-md pt-6 px-4 flex justify-between">
        <span>Groups</span>
        <CreateGroupSheet friends={userFriends} friendGroups={userGroups}>
          <Button variant="outline">Create group</Button>
        </CreateGroupSheet>
      </h1>
      <section className="mx-auto p-4 max-w-md grid gap-4">
        {!groups?.length && (
          <EmptyState
            title="No groups"
            message={
              <>
                <p>You are not in any group yet.</p>
                <p>Create one now:</p>
              </>
            }
            className="h-[calc(100vh-10rem)]"
          >
            <CreateGroupSheet friends={userFriends} friendGroups={userGroups}>
              <Button>Create group</Button>
            </CreateGroupSheet>
          </EmptyState>
        )}
        {groups?.map((group) => (
          <GroupCard
            key={group.groupId}
            groupId={group.groupId}
            name={group.name}
            description={group.description}
            members={group.members}
            activities={group.activities}
            friends={userFriends}
            friendGroups={userGroups}
          />
        ))}
      </section>
    </main>
  );
}
