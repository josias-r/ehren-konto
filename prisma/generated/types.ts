import type { ColumnType, GeneratedAlways } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const GroupMemberRole = {
    ADMIN: "ADMIN",
    MEMBER: "MEMBER"
} as const;
export type GroupMemberRole = (typeof GroupMemberRole)[keyof typeof GroupMemberRole];
export const FriendshipStatus = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    DECLINED: "DECLINED"
} as const;
export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus];
export const ActivityColor = {
    SUNSET: "SUNSET",
    MARS: "MARS"
} as const;
export type ActivityColor = (typeof ActivityColor)[keyof typeof ActivityColor];
export const HappeningType = {
    ACTIVITY_PARTICIPATION: "ACTIVITY_PARTICIPATION",
    ACTIVITY_PARTICIPATION_CONFIRMED: "ACTIVITY_PARTICIPATION_CONFIRMED",
    ACTIVITY_PARTICIPATION_REMOVED: "ACTIVITY_PARTICIPATION_REMOVED",
    GROUP_CREATED: "GROUP_CREATED",
    GROUP_DELETED: "GROUP_DELETED",
    GROUP_MEMBER_ADDED: "GROUP_MEMBER_ADDED",
    GROUP_MEMBER_REMOVED: "GROUP_MEMBER_REMOVED",
    FRIENDSHIP_REQUEST: "FRIENDSHIP_REQUEST",
    FRIENDSHIP_ACCEPTED: "FRIENDSHIP_ACCEPTED"
} as const;
export type HappeningType = (typeof HappeningType)[keyof typeof HappeningType];
export type Activity = {
    activityId: Generated<number>;
    createdAt: Generated<Timestamp>;
    from: Timestamp;
    to: Timestamp | null;
    name: string;
    emoji: string;
    color: ActivityColor;
    groupId: number;
};
export type ActivityParticipant = {
    activityParticipantId: Generated<number>;
    createdAt: Generated<Timestamp>;
    activityId: number;
    userId: string;
    confirmed: Generated<boolean>;
};
export type Friendship = {
    friendshipId: Generated<number>;
    createdAt: Generated<Timestamp>;
    outgoingUserId: string;
    incomingUserId: string;
    status: Generated<FriendshipStatus>;
};
export type Group = {
    groupId: Generated<number>;
    createdAt: Generated<Timestamp>;
    name: string;
    description: string;
};
export type GroupMember = {
    groupMemberId: Generated<number>;
    createdAt: Generated<Timestamp>;
    role: Generated<GroupMemberRole>;
    ehre: Generated<number>;
    groupId: number;
    userId: string;
};
export type Happening = {
    happeningsId: Generated<number>;
    createdAt: Generated<Timestamp>;
    type: HappeningType;
    happeningData: unknown;
    relatedGroupId: number | null;
    relatedActivityId: number | null;
    relatedUserId: string | null;
};
export type User = {
    userId: Generated<string>;
    createdAt: Generated<Timestamp>;
    email: string;
    name: string;
    passwordHash: string;
    confirmedEmail: Generated<boolean>;
    nick: string;
    avatar: string | null;
    inviteLink: string | null;
    inviteLinkCreateDate: Timestamp | null;
};
export type DB = {
    Activity: Activity;
    ActivityParticipant: ActivityParticipant;
    Friendship: Friendship;
    Group: Group;
    GroupMember: GroupMember;
    Happening: Happening;
    User: User;
};
