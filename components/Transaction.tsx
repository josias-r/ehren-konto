import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TransactionProps {
  name: string;
  email: string;
  amount: number;
  avatar: { url: string; fallback: string };
}

function Transaction({ name, email, amount, avatar }: TransactionProps) {
  return (
    <div className="flex mb-8 last:mb-0">
      <Avatar className="mr-4">
        <AvatarImage src={avatar.url} />
        <AvatarFallback>{avatar.fallback}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <div className="ml-auto font-medium">+{amount}</div>
      </div>
    </div>
  );
}

export default Transaction;
