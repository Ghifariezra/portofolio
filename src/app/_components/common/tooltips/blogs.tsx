import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/app/_components/ui/tooltip";

export function BlogsTooltip({
    description
}: {
    description: string
}) {
    return (

        <Tooltip>
            <TooltipTrigger asChild>
                <p className="text-sm line-clamp-2 cursor-help">
                    {description}
                </p>
            </TooltipTrigger>
            <TooltipContent className="w-80">
                <p className="p-4 max-w-xs text-sm">{description}</p>
            </TooltipContent>
        </Tooltip>
    );
}