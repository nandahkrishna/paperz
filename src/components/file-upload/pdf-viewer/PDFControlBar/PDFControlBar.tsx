import { ActionIcon, Box, Group, Text, rem } from "@mantine/core";
// MUI
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";

const PDFControlBar = ({
    scale = 1,
    numPages,
    currentPage,
    onClose,
    onScaleUp,
    onScaleDown,
}: {
    scale?: number;
    numPages?: number;
    currentPage?: number;
    onClose?: () => void;
    onScaleUp?: () => void;
    onScaleDown?: () => void;
}) => {
    return (
        <Group
            w="100%"
            px="md"
            justify="space-between"
            style={{ minHeight: rem(36) }}
        >
            <Text c="white" size="sm">
                {currentPage} / {numPages}
            </Text>

            <Group gap="xs">
                <ActionIcon
                    variant="subtle"
                    color="gray.0"
                    onClick={onScaleDown}
                    size="sm"
                    aria-label="Zoom out"
                >
                    <IconMinus style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>

                <Box
                    px="xs"
                    py={4}
                    bg="gray.8"
                    style={(theme) => ({
                        borderRadius: theme.radius.sm,
                        border: `1px solid ${theme.colors.dark[7]}`,
                    })}
                >
                    <Text size="sm" c="white">
                        {Math.floor(scale * 100)}%
                    </Text>
                </Box>

                <ActionIcon
                    variant="subtle"
                    color="gray.0"
                    onClick={onScaleUp}
                    size="sm"
                    aria-label="Zoom in"
                >
                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            </Group>

            <ActionIcon
                variant="subtle"
                color="gray.0"
                onClick={onClose}
                size="sm"
                aria-label="Close PDF viewer"
            >
                <IconX style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
        </Group>
    );
};

export default PDFControlBar;
