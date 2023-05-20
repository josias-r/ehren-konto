import { EmptyState } from "@/components/ui/empty-state";
import GroupCard from "@/app/@app/groups/GroupCard";
import getAllGroupsForUser from "@/app/@app/groups/getAllGroupsForUser";
import { getUserId } from "@/app/(auth)/getUserId";

async function Groups() {
  const userId = getUserId();
  const groups = await getAllGroupsForUser(userId);
  return (
    <>
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
            {/* <CreateGroupSheet friends={userFriends} friendGroups={userGroups}>
              <Button>Create group</Button>
            </CreateGroupSheet> */}
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
            totalActivities={group.totalActivities}
            totalMembers={group.totalMembers}
          />
        ))}
      </section>
    </>
  );
}

export default Groups;
