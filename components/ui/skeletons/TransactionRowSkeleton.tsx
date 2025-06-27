import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full"/>
                    <div>
                        <Skeleton className="h-5 w-32 mb-1"/>
                        <Skeleton className="h-4 w-40"/>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-32 mb-1"/>
                <Skeleton className="h-4 w-24"/>
            </TableCell>
            <TableCell><Skeleton className="h-4 w-40"/></TableCell>
            <TableCell><Skeleton className="h-4 w-24"/></TableCell>
            <TableCell><Skeleton className="h-6 w-20"/></TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-8 w-20 ml-auto"/>
            </TableCell>
        </TableRow>
    );
}