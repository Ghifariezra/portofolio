type Check = "available" | "location" | "social-media";

export interface ChildrenProps {
    children: React.ReactNode;
    check?: Check;
}