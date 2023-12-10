import StyledLayout from "@/components/server/layout";

interface IProtectedLayout {
    children: React.ReactNode,
}

export default function ProtectedLayout ({ children } : IProtectedLayout) {
    return (
        <StyledLayout>
            {children}
        </StyledLayout>
    )
}