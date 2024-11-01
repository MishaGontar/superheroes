export const fullIncludeData = {
    images: {
        include: {image: true},
    },
};

export const findAllPagination = (skip: number, limit: number) => ({
    skip,
    take: limit,
    select: {
        id: true,
        nickname: true,
        images: {
            take: 1,
            include: {image: true},
        },
    },
});