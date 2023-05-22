import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUserId } from "@/app/(auth)/getUserId";
import getRelevantHappenings from "@/app/@app/(with-profile)/(profile)/@happenings/getRelevantHappenings";
import HappeningItem from "./HappeningItem";
import { EmptyState } from "@/components/ui/empty-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

async function Happenings() {
  const userId = getUserId();
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Happenings</CardTitle>
        <CardDescription>What is happening?</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>disabled</AlertTitle>
          <AlertDescription>
            Due to a bug this feature is currently disabled.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
  // const relevantHappenings = await getRelevantHappenings(userId);
  // return (
  //   <Card className="mx-auto max-w-md">
  //     <CardHeader>
  //       <CardTitle>Happenings</CardTitle>
  //       <CardDescription>What is happening?</CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       {!!relevantHappenings.length && (
  //         <div className="space-y-4">
  //           {relevantHappenings.map((happening) => (
  //             <HappeningItem
  //               key={happening.happeningsId}
  //               happening={happening}
  //             />
  //           ))}
  //         </div>
  //       )}
  //       {!relevantHappenings.length && (
  //         <div className="mt-6">
  //           <EmptyState
  //             title="Empty"
  //             message="Nothing is happening right now"
  //           />
  //         </div>
  //       )}
  //     </CardContent>
  //   </Card>
  // );
}

export default Happenings;
